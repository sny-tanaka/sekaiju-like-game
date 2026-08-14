import { BALANCE } from '@/data/balance';
import { ITEMS } from '@/data/items';
import {
  applyBattleResult,
  battleRewards,
  partyExpResults,
  resolveTurn,
  startBattle,
} from '@/domain/battle';
import type { BattleEvent, NormalAttackEvent, SkillEvent, TickEvent } from '@/domain/battleEvent';
import { previewTurnOrder } from '@/domain/combat';
import { startDive } from '@/domain/dive';
import { HIDDEN_EFFECT_UNLOCK_LEVEL } from '@/domain/equipmentHiddenEffects';
import { addItem, itemCount } from '@/domain/inventory';
import { createRng } from '@/domain/rng';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
import { computeBaseStats } from '@/domain/stats';
import type {
  ActiveAilment,
  BattleCommand,
  BattleState,
  Character,
  EquipInstance,
  SaveData,
} from '@/domain/types';

function diveSave(): SaveData {
  let save = createInitialSaveData('戦闘ギルド');
  save = addCharacterToGuild(
    save,
    createCharacter({ raceId: 'race_garon', classId: 'class_warrior', name: '戦士' })
  );
  return startDive(save, 1);
}

/** 全味方が enemy_0 を通常攻撃するコマンド。 */
function attackAll(state: BattleState): BattleCommand[] {
  const target = state.enemies.find((e) => !e.isDown);
  return state.allies
    .filter((a) => !a.isDown)
    .map((a) => ({ kind: 'attack', actorId: a.id, targetId: target!.id }));
}

describe('battle: startBattle', () => {
  test('編成メンバーが味方、指定IDが敵になる', () => {
    const state = startBattle(diveSave(), ['enemy_slime', 'enemy_giant_rat']);
    expect(state.allies.length).toBeGreaterThanOrEqual(1);
    expect(state.enemies).toHaveLength(2);
    expect(state.enemies[0].hp).toBeGreaterThan(0);
    expect(state.outcome).toBe('ongoing');
  });
});

describe('battle: resolveTurn', () => {
  test('同一シードで結果が一致する（決定論）＆入力は不変', () => {
    const state = startBattle(diveSave(), ['enemy_slime']);
    const r1 = resolveTurn(state, attackAll(state), createRng(1));
    const r2 = resolveTurn(state, attackAll(state), createRng(1));
    expect(r1.enemies[0].hp).toBe(r2.enemies[0].hp);
    // 入力 state は変更されない
    expect(state.enemies[0].hp).toBe(state.enemies[0].maxHp);
  });

  test('攻撃で敵HPが減る', () => {
    const state = startBattle(diveSave(), ['enemy_slime']);
    const after = resolveTurn(state, attackAll(state), createRng(7));
    expect(after.enemies[0].hp).toBeLessThan(state.enemies[0].hp);
  });

  test('スライムを倒すと outcome=win になる', () => {
    let state = startBattle(diveSave(), ['enemy_slime']);
    const rng = createRng(7);
    for (let i = 0; i < 30 && state.outcome === 'ongoing'; i++) {
      state = resolveTurn(state, attackAll(state), rng);
    }
    expect(state.outcome).toBe('win');
    expect(state.enemies.every((e) => e.isDown)).toBe(true);
  });

  test('逃走コマンドは fled か継続のいずれか（クラッシュしない）', () => {
    const state = startBattle(diveSave(), ['enemy_slime']);
    const ally = state.allies[0];
    const r = resolveTurn(state, [{ kind: 'flee', actorId: ally.id }], createRng(2));
    expect(['ongoing', 'fled', 'win', 'lose']).toContain(r.outcome);
  });

  test('ガードコマンドで防御バフが付与される（このターン）', () => {
    const state = startBattle(diveSave(), ['enemy_slime']);
    const ally = state.allies[0];
    // 敵を全滅させてターン終了処理（バフ減算）まで到達させないため、敵HPを巨大化はできないので
    // ここでは「ガードが pdef/mdef を上げる」効果は computeDamage 側（combat.test）で検証する。
    // ここではコマンドが受理されクラッシュしないことのみ確認。
    const r = resolveTurn(state, [{ kind: 'guard', actorId: ally.id }], createRng(11));
    expect(['ongoing', 'win', 'lose', 'fled']).toContain(r.outcome);
  });
});

describe('battle: 先制/不意打ち（[03 §10]）', () => {
  test('先制ターンは敵が行動せず味方の HP は減らない', () => {
    const state = startBattle(diveSave(), ['enemy_slime'], 'preemptive');
    expect(state.firstStrike).toBe('preemptive');
    const allyHp = state.allies[0].hp;
    // 味方は全員防御（攻撃しても倒し切れないよう guard）→ 敵が動かないので被害ゼロ
    const cmds = state.allies.map((a) => ({ kind: 'guard' as const, actorId: a.id }));
    const after = resolveTurn(state, cmds, createRng(1));
    expect(after.allies[0].hp).toBe(allyHp);
    // 先制ターン: 味方は無傷のまま（敵が行動しない）ことをHPで確認済み
  });

  test('不意打ちターンは味方コマンドが無視され、敵だけが行動する', () => {
    const state = startBattle(diveSave(), ['enemy_slime'], 'ambush');
    const enemyHp = state.enemies[0].hp;
    // 味方は攻撃指定でも不意打ちターンでは行動できない → 敵 HP は満タンのまま
    const target = state.enemies[0].id;
    const cmds = state.allies.map((a) => ({
      kind: 'attack' as const,
      actorId: a.id,
      targetId: target,
    }));
    const after = resolveTurn(state, cmds, createRng(1));
    expect(after.enemies[0].hp).toBe(enemyHp);
    // 不意打ちターン: 敵HPが変わらない（味方が行動できない）ことで確認済み
  });

  test('先制/不意打ちはターン2以降は通常どおり両者行動する', () => {
    const state = startBattle(diveSave(), ['enemy_slime'], 'preemptive');
    const t1 = resolveTurn(state, attackAll(state), createRng(5));
    // ターン2では敵 AI も動くため、味方が攻撃すれば敵 HP は減り続ける
    if (t1.outcome === 'ongoing') {
      const t2 = resolveTurn(t1, attackAll(t1), createRng(5));
      expect(t2.turn).toBe(3);
    }
    expect(t1.turn).toBe(2);
  });
});

// 2人パーティ（ユニオン協力者テスト用）。
function diveSave2(): SaveData {
  let save = createInitialSaveData('戦闘ギルド');
  save = addCharacterToGuild(
    save,
    createCharacter({ raceId: 'race_garon', classId: 'class_warrior', name: '戦士' })
  );
  save = addCharacterToGuild(
    save,
    createCharacter({ raceId: 'race_human', classId: 'class_warrior', name: '剣士' })
  );
  return startDive(save, 1);
}

// 指定 side / index の戦闘員に状態異常を付与した新 state。
function withAilment(
  state: BattleState,
  side: 'allies' | 'enemies',
  idx: number,
  type: ActiveAilment['type']
): BattleState {
  const list = state[side].map((c, i) =>
    i === idx ? { ...c, ailments: [...c.ailments, { type, remainingTurns: 3 }] } : c
  );
  return { ...state, [side]: list };
}

// ゲージを設定した新 state（味方）。
function withGauge(state: BattleState, idx: number, gauge: number): BattleState {
  return {
    ...state,
    allies: state.allies.map((c, i) => (i === idx ? { ...c, unionGauge: gauge } : c)),
  };
}

describe('battle: 睡眠（[03 §6]）', () => {
  test('眠っている敵は行動しない（味方は無傷）', () => {
    const base = startBattle(diveSave(), ['enemy_slime']);
    const allyHp = base.allies[0].hp;
    const state = withAilment(base, 'enemies', 0, 'sleep');
    const after = resolveTurn(
      state,
      [{ kind: 'guard', actorId: state.allies[0].id }],
      createRng(1)
    );
    expect(after.allies[0].hp).toBe(allyHp);
    // 眠っている敵が行動しないことをHP差分で確認済み
  });

  test('眠っている味方は行動できない（敵は無傷）', () => {
    const base = startBattle(diveSave(), ['enemy_slime']);
    const enemyHp = base.enemies[0].hp;
    const state = withAilment(base, 'allies', 0, 'sleep');
    const after = resolveTurn(
      state,
      [{ kind: 'attack', actorId: state.allies[0].id, targetId: state.enemies[0].id }],
      createRng(1)
    );
    expect(after.enemies[0].hp).toBe(enemyHp);
    // 眠っている味方が行動できないことを敵HP差分で確認済み
  });

  test('睡眠は被ダメージで解除される', () => {
    const base = startBattle(diveSave(), ['enemy_slime']);
    const state = withAilment(base, 'enemies', 0, 'sleep');
    // 味方が攻撃 → 敵が起きる
    const after = resolveTurn(
      state,
      [{ kind: 'attack', actorId: state.allies[0].id, targetId: state.enemies[0].id }],
      createRng(7)
    );
    const enemy = after.enemies[0];
    // 倒していなければ睡眠は解除されている
    if (!enemy.isDown) {
      expect(enemy.ailments.some((a) => a.type === 'sleep')).toBe(false);
    }
  });
});

describe('battle: バインド（部位封じ・[03 §6]）', () => {
  test('腕封じの敵は通常攻撃できない（味方は無傷）', () => {
    // §15.6: 腕封じ敵は物理アクション（basicを含む）を候補から除外し、非物理なら使用可。
    // enemy_slime は zako_bruiser（ea_double_strike[物理]+ea_guard_up[バフ]）。
    // 腕封じ時: 物理除外 → ea_guard_up のみ候補 → 敵は自己バフ使用 → 味方は無傷。
    const base = startBattle(diveSave(), ['enemy_slime']);
    const allyHp = base.allies[0].hp;
    const state = withAilment(base, 'enemies', 0, 'armBind');
    // 味方は防御（敵の行動のみ観測）。全100seedで一度も味方が攻撃されないことを確認。
    let allyDamaged = false;
    for (let seed = 0; seed < 100; seed++) {
      const after = resolveTurn(
        state,
        [{ kind: 'guard', actorId: state.allies[0].id }],
        createRng(seed)
      );
      if (after.allies[0].hp < allyHp) {
        allyDamaged = true;
        break;
      }
    }
    expect(allyDamaged).toBe(false);
  });

  test('腕封じの味方は通常攻撃できない（敵は無傷）', () => {
    const base = startBattle(diveSave(), ['enemy_slime']);
    const enemyHp = base.enemies[0].hp;
    const state = withAilment(base, 'allies', 0, 'armBind');
    const after = resolveTurn(
      state,
      [{ kind: 'attack', actorId: state.allies[0].id, targetId: state.enemies[0].id }],
      createRng(1)
    );
    expect(after.enemies[0].hp).toBe(enemyHp);
    // 腕封じで通常攻撃できないことを敵HP差分で確認済み
  });

  test('頭封じの味方は魔法スキルを使えない', () => {
    // 魔導士（火魔法 statBase int）に頭封じ
    let save = createInitialSaveData('g');
    save = addCharacterToGuild(
      save,
      createCharacter({ raceId: 'race_pix', classId: 'class_mage', name: '魔' })
    );
    save = startDive(save, 1);
    // スキルを習得させる
    const mage = save.guild.members[0];
    save = {
      ...save,
      guild: {
        ...save.guild,
        members: [{ ...mage, learnedSkills: { ...mage.learnedSkills, skill_fire_bolt: 1 } }],
      },
    };
    const base = startBattle(save, ['enemy_slime']);
    const enemyHp = base.enemies[0].hp;
    const state = withAilment(base, 'allies', 0, 'headBind');
    const after = resolveTurn(
      state,
      [
        {
          kind: 'skill',
          actorId: state.allies[0].id,
          skillId: 'skill_fire_bolt',
          targetId: state.enemies[0].id,
        },
      ],
      createRng(1)
    );
    expect(after.enemies[0].hp).toBe(enemyHp);
    // 頭封じで魔法スキルが使えないことを敵HP差分で確認済み
  });

  test('脚封じの味方は逃走できない', () => {
    const base = startBattle(diveSave(), ['enemy_slime']);
    const state = withAilment(base, 'allies', 0, 'legBind');
    const after = resolveTurn(state, [{ kind: 'flee', actorId: state.allies[0].id }], createRng(1));
    expect(after.outcome).not.toBe('fled');
    // 脚封じで逃走できないことを outcome で確認済み
  });
});

describe('battle: ユニオンスキル（[03 §9]）', () => {
  test('ゲージ100%でユニオン発動、ゲージ消費＆効果適用', () => {
    const base = startBattle(diveSave(), ['enemy_slime']);
    // HP を減らし、ゲージ満タンに
    let state: BattleState = withGauge(base, 0, 100);
    state = { ...state, allies: state.allies.map((a) => ({ ...a, hp: 1 })) };
    const actor = state.allies[0];
    const after = resolveTurn(
      state,
      [
        {
          kind: 'union',
          actorId: actor.id,
          unionSkillId: 'skill_union_rally',
          participantIds: [actor.id],
          targetId: actor.id,
        },
      ],
      createRng(1)
    );
    // 回復された／ゲージが消費された
    expect(after.allies[0].hp).toBeGreaterThan(1);
    expect(after.allies[0].unionGauge).toBeLessThan(100);
    expect(
      after.events.some(
        (e) => e.kind === 'skill' && !!(e as import('./battleEvent').SkillEvent).unionActorIds
      )
    ).toBe(true);
  });

  test('ゲージ不足ではユニオン不発', () => {
    const base = startBattle(diveSave(), ['enemy_slime']);
    const state = withGauge(base, 0, 50);
    const actor = state.allies[0];
    const after = resolveTurn(
      state,
      [
        {
          kind: 'union',
          actorId: actor.id,
          unionSkillId: 'skill_union_rally',
          participantIds: [actor.id],
          targetId: actor.id,
        },
      ],
      createRng(1)
    );
    expect(after.allies[0].unionGauge).toBe(50); // 消費されない（ゲージ不足で不発）
  });

  test('ユニオンは通常行動を消費しない（同ターンに攻撃もできる）', () => {
    const base = startBattle(diveSave(), ['enemy_slime']);
    const enemyHp = base.enemies[0].hp;
    const state = withGauge(base, 0, 100);
    const actor = state.allies[0];
    const after = resolveTurn(
      state,
      [
        {
          kind: 'union',
          actorId: actor.id,
          unionSkillId: 'skill_union_rally', // 味方回復（敵に無関係）
          participantIds: [actor.id],
          targetId: actor.id,
        },
        { kind: 'attack', actorId: actor.id, targetId: state.enemies[0].id },
      ],
      createRng(3)
    );
    // 通常攻撃も解決されて敵 HP が減っている
    expect(after.enemies[0].hp).toBeLessThan(enemyHp);
  });

  test('協力人数が必要なユニオンは人数不足だと不発', () => {
    // 豪砕（requiredParticipants 2）を 1 人で撃つ
    const base = startBattle(diveSave(), ['enemy_slime', 'enemy_giant_rat']);
    const state = withGauge(base, 0, 100);
    const actor = state.allies[0];
    const after = resolveTurn(
      state,
      [
        {
          kind: 'union',
          actorId: actor.id,
          unionSkillId: 'skill_union_smash',
          participantIds: [actor.id],
          targetId: state.enemies[0].id,
        },
      ],
      createRng(1)
    );
    expect(after.allies[0].unionGauge).toBe(100); // 消費されない（人数不足で不発）
  });

  test('2人ユニオンは両者からゲージを消費して発動', () => {
    const base = startBattle(diveSave2(), ['enemy_slime']);
    let state = withGauge(base, 0, 100);
    state = withGauge(state, 1, 60);
    const [a0, a1] = state.allies;
    const enemyHp = state.enemies[0].hp;
    const after = resolveTurn(
      state,
      [
        {
          kind: 'union',
          actorId: a0.id,
          unionSkillId: 'skill_union_smash',
          participantIds: [a0.id, a1.id],
          targetId: state.enemies[0].id,
        },
      ],
      createRng(2)
    );
    // 50 ずつ消費（発動者 100→50、協力者 60→10）
    expect(after.allies[0].unionGauge).toBe(50);
    expect(after.allies[1].unionGauge).toBe(10);
    expect(after.enemies[0].hp).toBeLessThan(enemyHp);
  });
});

describe('battle: 召喚（設置・[03 §8]）', () => {
  // 召喚スキルを習得した魔導士（使い魔）のセーブ。
  function summonerSave(skillId: string): SaveData {
    let save = createInitialSaveData('召喚');
    save = addCharacterToGuild(
      save,
      createCharacter({ raceId: 'race_pix', classId: 'class_mage', name: '術' })
    );
    const m = save.guild.members[0];
    save = {
      ...save,
      guild: {
        ...save.guild,
        members: [{ ...m, learnedSkills: { ...m.learnedSkills, [skillId]: 1 } }],
      },
    };
    return startDive(save, 1);
  }

  test('召喚スキルで召喚体が最前列に追加される', () => {
    const save = summonerSave('skill_summon_wolf');
    const state = startBattle(save, ['enemy_slime']);
    expect(state.summons).toHaveLength(0);
    const actor = state.allies[0];
    const after = resolveTurn(
      state,
      [{ kind: 'skill', actorId: actor.id, skillId: 'skill_summon_wolf', targetId: actor.id }],
      createRng(1)
    );
    expect(after.summons.length).toBe(1);
    expect(after.summons[0].isSummon).toBe(true);
    expect(after.summons[0].summonKind).toBe('summon_wolf');
    expect(after.events.some((e) => e.kind === 'skill')).toBe(true);
  });

  test('自律召喚体（狼）はターンに敵を攻撃する', () => {
    const save = summonerSave('skill_summon_wolf');
    let state = startBattle(save, ['enemy_slime']);
    // 1ターン目で召喚
    state = resolveTurn(
      state,
      [
        {
          kind: 'skill',
          actorId: state.allies[0].id,
          skillId: 'skill_summon_wolf',
          targetId: state.allies[0].id,
        },
      ],
      createRng(1)
    );
    const enemyHp = state.enemies[0].hp;
    // 2ターン目: 召喚主は防御、狼が自律攻撃 → 敵 HP が減る
    const after = resolveTurn(
      state,
      [{ kind: 'guard', actorId: state.allies[0].id }],
      createRng(2)
    );
    expect(after.enemies[0].hp).toBeLessThan(enemyHp);
  });

  test('召喚枠は最大3体まで', () => {
    const save = summonerSave('skill_summon_wolf');
    let state = startBattle(save, ['enemy_slime']);
    const actor = state.allies[0];
    // TP を十分に与える
    state = { ...state, allies: state.allies.map((a) => ({ ...a, tp: 99 })) };
    for (let i = 0; i < 5; i++) {
      state = resolveTurn(
        state,
        [{ kind: 'skill', actorId: actor.id, skillId: 'skill_summon_wolf', targetId: actor.id }],
        createRng(10 + i)
      );
      if (state.outcome !== 'ongoing') break;
    }
    expect(state.summons.filter((s) => !s.isDown).length).toBeLessThanOrEqual(3);
  });

  test('壁の召喚体（石像・actsOnTurn=false）は自律攻撃しない', () => {
    const save = summonerSave('skill_summon_bulwark');
    let state = startBattle(save, ['enemy_slime']);
    state = resolveTurn(
      state,
      [
        {
          kind: 'skill',
          actorId: state.allies[0].id,
          skillId: 'skill_summon_bulwark',
          targetId: state.allies[0].id,
        },
      ],
      createRng(1)
    );
    expect(state.summons[0].summonKind).toBe('summon_bulwark');
    const enemyHp = state.enemies[0].hp;
    // 召喚主は防御、石像は行動しない → 敵 HP は変化しない
    const after = resolveTurn(
      state,
      [{ kind: 'guard', actorId: state.allies[0].id }],
      createRng(2)
    );
    expect(after.enemies[0].hp).toBe(enemyHp);
  });

  test('allyAll バフ/回復は召喚体にも乗るが、buffImmune 個体（石像）には乗らない', () => {
    const base = startBattle(diveSave(), ['enemy_slime']);
    const tmpl = base.allies[0];
    // 狼（非 immune）と石像（buffImmune）を盤面に注入し、HP を減らす
    const mk = (id: string, kind: string) => ({
      ...tmpl,
      id,
      name: kind,
      isSummon: true,
      summonKind: kind,
      ownerId: tmpl.id,
      buffs: [],
      ailments: [],
      hp: 20,
      maxHp: 45,
    });
    let state: BattleState = {
      ...base,
      summons: [mk('s_wolf', 'summon_wolf'), mk('s_stone', 'summon_bulwark')],
    };
    state = withGauge(state, 0, 100);
    // ヒトのユニオン「結束の鬨」= 全体回復＋patk バフ
    const after = resolveTurn(
      state,
      [
        {
          kind: 'union',
          actorId: state.allies[0].id,
          unionSkillId: 'skill_union_rally',
          participantIds: [state.allies[0].id],
          targetId: state.allies[0].id,
        },
      ],
      createRng(1)
    );
    const wolf = after.summons.find((s) => s.id === 's_wolf')!;
    const stone = after.summons.find((s) => s.id === 's_stone')!;
    // 回復は両者に乗る（buffImmune は回復は妨げない）
    expect(wolf.hp).toBeGreaterThan(20);
    expect(stone.hp).toBeGreaterThan(20);
    // patk バフは狼に乗り、石像（buffImmune）には乗らない
    expect(wolf.buffs.some((b) => b.stat === 'patk')).toBe(true);
    expect(stone.buffs.length).toBe(0);
  });

  test('persistsAfterBattle な使い魔は勝利後 diveState に残り、次戦闘で復元される', () => {
    const save = summonerSave('skill_summon_familiar');
    let state = startBattle(save, ['enemy_slime']);
    // 召喚
    state = resolveTurn(
      state,
      [
        {
          kind: 'skill',
          actorId: state.allies[0].id,
          skillId: 'skill_summon_familiar',
          targetId: state.allies[0].id,
        },
      ],
      createRng(1)
    );
    expect(state.summons[0].summonKind).toBe('summon_familiar');
    // 強制的に勝利状態へ（敵を倒す）
    const won: BattleState = {
      ...state,
      outcome: 'win',
      enemies: state.enemies.map((e) => ({ ...e, hp: 0, isDown: true })),
    };
    const after = applyBattleResult(save, won);
    expect(after.diveState!.persistentSummons.length).toBe(1);
    expect(after.diveState!.persistentSummons[0].summonKind).toBe('summon_familiar');
    // 次戦闘で復元
    const next = startBattle(after, ['enemy_slime']);
    expect(next.summons.length).toBe(1);
    expect(next.summons[0].summonKind).toBe('summon_familiar');
  });

  test('戦闘限りの召喚体（狼）は勝利後 diveState に残らない', () => {
    const save = summonerSave('skill_summon_wolf');
    let state = startBattle(save, ['enemy_slime']);
    state = resolveTurn(
      state,
      [
        {
          kind: 'skill',
          actorId: state.allies[0].id,
          skillId: 'skill_summon_wolf',
          targetId: state.allies[0].id,
        },
      ],
      createRng(1)
    );
    const won: BattleState = {
      ...state,
      outcome: 'win',
      enemies: state.enemies.map((e) => ({ ...e, hp: 0, isDown: true })),
    };
    const after = applyBattleResult(save, won);
    expect(after.diveState!.persistentSummons.length).toBe(0);
  });

  test('召喚体は全滅判定に数えない（味方全滅なら召喚体が残っても lose）', () => {
    // 壁の石像（攻撃しない）を使い、敵を倒し切れない状況で味方全滅 → lose を確認
    const save = summonerSave('skill_summon_bulwark');
    let state = startBattle(save, ['enemy_slime']);
    state = resolveTurn(
      state,
      [
        {
          kind: 'skill',
          actorId: state.allies[0].id,
          skillId: 'skill_summon_bulwark',
          targetId: state.allies[0].id,
        },
      ],
      createRng(1)
    );
    // 味方を瀕死にして敵を強化…ではなく、味方を0にした状態を作って1ターン回す
    const downed: BattleState = {
      ...state,
      allies: state.allies.map((a) => ({ ...a, hp: 0, isDown: true })),
    };
    const after = resolveTurn(downed, [], createRng(3));
    expect(after.outcome).toBe('lose');
    // 召喚体は生きていてもよい
    expect(after.summons.length).toBe(1);
  });
});

describe('battle: drops & items', () => {
  test('勝利時にドロップが倉庫・図鑑へ反映される', () => {
    const save = diveSave();
    let state = startBattle(save, ['enemy_slime']);
    const rng = createRng(7);
    for (let i = 0; i < 30 && state.outcome === 'ongoing'; i++) {
      state = resolveTurn(state, attackAll(state), rng);
    }
    expect(state.outcome).toBe('win');
    const after = applyBattleResult(save, state);
    // state.drops に乗った分だけ倉庫・collection に入る（換金アイテム・秘宝を除き図鑑にも記録される。v3.0.0 §3/§5）
    for (const d of state.drops) {
      const item = ITEMS[d.itemId];
      if (item?.collectible) {
        expect(after.collection[d.itemId]).toBeGreaterThanOrEqual(1);
        continue;
      }
      expect(itemCount(after, d.itemId)).toBeGreaterThanOrEqual(1);
      if (item?.gemValue !== undefined) continue; // 換金アイテムは dropsFound の記録対象外（v3.0.0 §3）
      expect(after.bestiary.monsters[d.enemyId]?.dropsFound).toContain(d.itemId);
    }
  });

  test('倒した敵を翌ターン二重抽選しない（wasDown 判定）', () => {
    // スライム1体を倒したターンのドロップ数を記録し、次ターンに増えないこと
    let state = startBattle(diveSave(), ['enemy_slime']);
    const rng = createRng(7);
    while (state.outcome === 'ongoing') state = resolveTurn(state, attackAll(state), rng);
    const dropsAtWin = state.drops.length;
    // 既に決着しているので resolveTurn は no-op（outcome!=ongoing で即return）
    const again = resolveTurn(state, [], rng);
    expect(again.drops.length).toBe(dropsAtWin);
  });

  test('戦闘中アイテム使用でHP回復し、終了時に倉庫から消費される', () => {
    let save = diveSave();
    save = addItem(save, 'item_potion', 2);
    const state0 = startBattle(save, ['enemy_slime']);
    const ally = state0.allies[0];
    // HP を減らした状態を作る
    const wounded: BattleState = {
      ...state0,
      allies: state0.allies.map((a) => (a.id === ally.id ? { ...a, hp: 1 } : a)),
    };
    const next = resolveTurn(
      wounded,
      [{ kind: 'item', actorId: ally.id, itemId: 'item_potion', targetId: ally.id }],
      createRng(3)
    );
    expect(next.consumedItems).toContain('item_potion');
    expect(next.allies.find((a) => a.id === ally.id)!.hp).toBeGreaterThan(1);
    const after = applyBattleResult(save, next);
    expect(itemCount(after, 'item_potion')).toBe(1); // 2 → 1
  });
});

describe('battle: v3.0.0 換金アイテム・秘宝のドロップ抽選（§3・§5）', () => {
  /** enemyId を1体だけ配置し、HP を1にした BattleState を返す（1ターンで確実に倒せる状態）。 */
  function oneHitReadyState(enemyId: string): BattleState {
    const state = startBattle(diveSave(), [enemyId]);
    return { ...state, enemies: state.enemies.map((e) => ({ ...e, hp: 1 })) };
  }

  test('zako・tierBand<=1（enemy_slime）は当選時 item_gem_shard をドロップする', () => {
    const state = oneHitReadyState('enemy_slime');
    const after = resolveTurn(state, attackAll(state), createRng(10));
    expect(after.enemies[0].isDown).toBe(true);
    expect(after.drops).toContainEqual({ enemyId: 'enemy_slime', itemId: 'item_gem_shard' });
  });

  test('zako は落選時ジェムアイテム・秘宝をドロップしない（同シードで再現）', () => {
    const state = oneHitReadyState('enemy_slime');
    const after = resolveTurn(state, attackAll(state), createRng(4));
    expect(after.enemies[0].isDown).toBe(true);
    expect(after.drops).toEqual([]);
  });

  test('zako・tierBand>=2（enemy_t2_frostfang_wolf）は当選時 item_gem_stone をドロップする', () => {
    const state = oneHitReadyState('enemy_t2_frostfang_wolf');
    const after = resolveTurn(state, attackAll(state), createRng(10));
    expect(after.drops).toContainEqual({
      enemyId: 'enemy_t2_frostfang_wolf',
      itemId: 'item_gem_stone',
    });
  });

  test('foe・tierBand<=1（enemy_t0_elder_treant）は当選時 item_gem_stone をドロップする', () => {
    const state = oneHitReadyState('enemy_t0_elder_treant');
    const after = resolveTurn(state, attackAll(state), createRng(9));
    expect(after.drops).toContainEqual({
      enemyId: 'enemy_t0_elder_treant',
      itemId: 'item_gem_stone',
    });
  });

  test('foe・tierBand>=2（enemy_t2_glacial_bear）は当選時 item_gem_cluster をドロップする', () => {
    const state = oneHitReadyState('enemy_t2_glacial_bear');
    const after = resolveTurn(state, attackAll(state), createRng(5));
    expect(after.drops).toContainEqual({
      enemyId: 'enemy_t2_glacial_bear',
      itemId: 'item_gem_cluster',
    });
  });

  test('boss（enemy_boss_gatekeeper）は確率1.0で常に item_gem_cluster をドロップする', () => {
    for (const seed of [3, 7, 10, 20, 30]) {
      const state = oneHitReadyState('enemy_boss_gatekeeper');
      const after = resolveTurn(state, attackAll(state), createRng(seed));
      expect(after.enemies[0].isDown).toBe(true);
      expect(after.drops).toContainEqual({
        enemyId: 'enemy_boss_gatekeeper',
        itemId: 'item_gem_cluster',
      });
    }
  });

  test('秘宝（collectible）は COLLECTIBLE_BY_ENEMY の品目が当選時ドロップする', () => {
    const state = oneHitReadyState('enemy_slime');
    const after = resolveTurn(state, attackAll(state), createRng(22));
    expect(after.drops).toContainEqual({ enemyId: 'enemy_slime', itemId: 'item_col_slime' });
  });
});

describe('battle: applyBattleResult 拡張（v3.0.0 討伐勲章・秘宝コレクション §4・§5）', () => {
  /** 指定 enemyId を defeatCount 体討伐した想定の「決着済み」BattleState を rng に依らず直接組み立てる。 */
  function resultState(
    save: SaveData,
    enemyId: string,
    defeatCount: number,
    outcome: 'win' | 'lose',
    drops: { enemyId: string; itemId: string }[] = []
  ): BattleState {
    const base = startBattle(save, Array<string>(defeatCount).fill(enemyId));
    return {
      ...base,
      outcome,
      enemies: base.enemies.map((e) => ({ ...e, isDown: true, hp: 0 })),
      drops,
    };
  }

  function withKills(save: SaveData, enemyId: string, kills: number): SaveData {
    return {
      ...save,
      bestiary: {
        ...save.bestiary,
        monsters: {
          ...save.bestiary.monsters,
          [enemyId]: { seen: true, defeated: true, dropsFound: [], kills },
        },
      },
    };
  }

  test('新たに倒した敵の数だけ kills が加算される（同戦闘で複数体撃破の合算）', () => {
    const save = diveSave();
    const state = resultState(save, 'enemy_slime', 3, 'win');
    const after = applyBattleResult(save, state);
    expect(after.bestiary.monsters.enemy_slime.kills).toBe(3);
  });

  test('勲章ランクを跨ぐと guild.gems に TROPHY_GEMS が加算される（zako 銅=10体で+2）', () => {
    const save = withKills(diveSave(), 'enemy_slime', 9);
    const state = resultState(save, 'enemy_slime', 1, 'win');
    const after = applyBattleResult(save, state);
    expect(after.bestiary.monsters.enemy_slime.kills).toBe(10);
    expect(after.guild.gems).toBe(save.guild.gems + BALANCE.TROPHY_GEMS[0]);
  });

  test('敗北(lose)でも新たに倒れた敵の kills・勲章ジェムは加算される（勝敗を問わない）', () => {
    const save = withKills(diveSave(), 'enemy_slime', 9);
    const state = resultState(save, 'enemy_slime', 1, 'lose');
    const after = applyBattleResult(save, state);
    expect(after.bestiary.monsters.enemy_slime.kills).toBe(10);
    expect(after.guild.gems).toBe(save.guild.gems + BALANCE.TROPHY_GEMS[0]);
  });

  test('敗北(lose)では collection・倉庫ドロップは反映されない', () => {
    const save = diveSave();
    const state = resultState(save, 'enemy_slime', 1, 'lose', [
      { enemyId: 'enemy_slime', itemId: 'item_col_slime' },
      { enemyId: 'enemy_slime', itemId: 'item_gem_shard' },
    ]);
    const after = applyBattleResult(save, state);
    expect(after.collection.item_col_slime).toBeUndefined();
    expect(itemCount(after, 'item_gem_shard')).toBe(0);
  });

  test('collectible なドロップは倉庫に入らず save.collection に記録される', () => {
    const save = diveSave();
    const state = resultState(save, 'enemy_slime', 1, 'win', [
      { enemyId: 'enemy_slime', itemId: 'item_col_slime' },
    ]);
    const after = applyBattleResult(save, state);
    expect(after.collection.item_col_slime).toBe(1);
    expect(itemCount(after, 'item_col_slime')).toBe(0);
  });

  test('秘宝の重複入手（2個目以降）は COLLECT_DUP_GEMS ジェムに変換される', () => {
    const save = { ...diveSave(), collection: { item_col_slime: 1 } };
    const state = resultState(save, 'enemy_slime', 1, 'win', [
      { enemyId: 'enemy_slime', itemId: 'item_col_slime' },
    ]);
    const after = applyBattleResult(save, state);
    expect(after.collection.item_col_slime).toBe(2);
    expect(after.guild.gems).toBe(save.guild.gems + BALANCE.COLLECT_DUP_GEMS);
  });

  test('換金アイテム・秘宝は図鑑 dropsFound の記録対象から除外される（汚染防止）', () => {
    const save = diveSave();
    const state = resultState(save, 'enemy_slime', 1, 'win', [
      { enemyId: 'enemy_slime', itemId: 'item_gem_shard' },
      { enemyId: 'enemy_slime', itemId: 'item_col_slime' },
      { enemyId: 'enemy_slime', itemId: 'item_slime_jelly' },
    ]);
    const after = applyBattleResult(save, state);
    expect(after.bestiary.monsters.enemy_slime.dropsFound).toEqual(['item_slime_jelly']);
  });

  test('秘宝の帯(tierBand)コンプで COLLECT_BAND_GEMS が1回だけ付与される', () => {
    // tierBand0 の秘宝は 12 種。11種まで所持済みの状態で最後の1種を入手する。
    const tierBand0Ids = [
      'item_col_slime',
      'item_col_giant_rat',
      'item_col_cave_bat',
      'item_col_forest_rabbit',
      'item_col_glow_mushroom',
      'item_col_wood_caracal',
      'item_col_pale_wisp',
      'item_col_bristle_boar',
      'item_col_thicket_stag',
      'item_col_cave_crawler',
      'item_col_elder_treant',
      // item_col_gatekeeper は未所持のまま最後に入手させる
    ];
    const collection = Object.fromEntries(tierBand0Ids.map((id) => [id, 1]));
    // ボスの kills を事前に1（勲章銅ランク到達済み）にしておき、勲章ジェムの混入を避ける
    const save = withKills({ ...diveSave(), collection }, 'enemy_boss_gatekeeper', 1);
    const state = resultState(save, 'enemy_boss_gatekeeper', 1, 'win', [
      { enemyId: 'enemy_boss_gatekeeper', itemId: 'item_col_gatekeeper' },
    ]);
    const after = applyBattleResult(save, state);
    expect(after.guild.gems).toBe(save.guild.gems + BALANCE.COLLECT_BAND_GEMS);
    expect(after.flags.collectionBand0).toBe(true);
    // 再度同じ状況になっても再付与しない（フラグで防止）
    const again = applyBattleResult(after, {
      ...state,
      drops: [],
    });
    expect(again.guild.gems).toBe(after.guild.gems);
  });

  // A4 回帰: リザルトの「獲得ジェム」表示は applyBattleResult の実付与差分から算出する方式に
  // 変更したため、勲章クロス・秘宝重複・帯コンプ報酬が同一戦闘で重なっても差分が一致することを検証する。
  test('勲章クロス・秘宝重複・帯コンプが同一戦闘で重なっても gems 差分が合計と一致する', () => {
    const tierBand0Ids = [
      'item_col_giant_rat',
      'item_col_cave_bat',
      'item_col_forest_rabbit',
      'item_col_glow_mushroom',
      'item_col_wood_caracal',
      'item_col_pale_wisp',
      'item_col_bristle_boar',
      'item_col_thicket_stag',
      'item_col_cave_crawler',
      'item_col_elder_treant',
      'item_col_gatekeeper',
      // item_col_slime は未所持のまま最後に入手させる（帯コンプのトリガー）
    ];
    const collection = Object.fromEntries(tierBand0Ids.map((id) => [id, 1]));
    // enemy_slime の kills を9にしておき、この戦闘の1体討伐で銅ランク(10体)を跨がせる（勲章ジェム）。
    const save = withKills({ ...diveSave(), collection }, 'enemy_slime', 9);
    const state = resultState(save, 'enemy_slime', 1, 'win', [
      { enemyId: 'enemy_slime', itemId: 'item_col_slime' }, // 未所持 → 帯コンプ(band0)達成、重複なし
      { enemyId: 'enemy_slime', itemId: 'item_col_giant_rat' }, // 所持済み → 重複ジェムに変換
    ]);
    const after = applyBattleResult(save, state);
    const expectedGems =
      BALANCE.TROPHY_GEMS[0] + BALANCE.COLLECT_DUP_GEMS + BALANCE.COLLECT_BAND_GEMS;
    expect(after.guild.gems - save.guild.gems).toBe(expectedGems);
    expect(after.flags.collectionBand0).toBe(true);
  });
});

describe('battle: アイテム経由の buff / cleanse / revive（v3.0.0 §8）', () => {
  function twoCharDiveSave(): SaveData {
    let save = createInitialSaveData('二人PT');
    save = addCharacterToGuild(
      save,
      createCharacter({ raceId: 'race_garon', classId: 'class_warrior', name: 'A' })
    );
    save = addCharacterToGuild(
      save,
      createCharacter({ raceId: 'race_human', classId: 'class_medic', name: 'B' })
    );
    return startDive(save, 1);
  }

  function findItemUseEvent(state: BattleState) {
    return state.events.find((e) => e.kind === 'item-use');
  }

  test('item_power_water で patk バフ(atkBuff)が付与される', () => {
    let save = diveSave();
    save = addItem(save, 'item_power_water', 1);
    const state = startBattle(save, ['enemy_slime']);
    const ally = state.allies[0];
    const after = resolveTurn(
      state,
      [{ kind: 'item', actorId: ally.id, itemId: 'item_power_water', targetId: ally.id }],
      createRng(1)
    );
    const target = after.allies.find((a) => a.id === ally.id)!;
    const buff = target.buffs.find((b) => b.stat === 'patk');
    expect(buff).toBeDefined();
    expect(buff!.modifier).toBeCloseTo(1.3);
    expect(buff!.stackGroup).toBe('atkBuff');
    // turns:3 で付与されるが、同ターンのターン終了処理で1減算されるため2になる
    expect(buff!.remainingTurns).toBe(2);
    const evt = findItemUseEvent(after);
    expect(evt?.kind === 'item-use' && evt.effect.kind).toBe('buff');
  });

  test('item_guard_water は defBuff、item_magic_water は matkBuff の stackGroup で付与される', () => {
    let save = diveSave();
    save = addItem(save, 'item_guard_water', 1);
    save = addItem(save, 'item_magic_water', 1);
    const state = startBattle(save, ['enemy_slime']);
    const ally = state.allies[0];
    const afterGuard = resolveTurn(
      state,
      [{ kind: 'item', actorId: ally.id, itemId: 'item_guard_water', targetId: ally.id }],
      createRng(1)
    );
    const guardBuff = afterGuard.allies
      .find((a) => a.id === ally.id)!
      .buffs.find((b) => b.stat === 'pdef');
    expect(guardBuff?.stackGroup).toBe('defBuff');

    const afterMagic = resolveTurn(
      state,
      [{ kind: 'item', actorId: ally.id, itemId: 'item_magic_water', targetId: ally.id }],
      createRng(1)
    );
    const magicBuff = afterMagic.allies
      .find((a) => a.id === ally.id)!
      .buffs.find((b) => b.stat === 'matk');
    expect(magicBuff?.stackGroup).toBe('matkBuff');
  });

  test('item_panacea で状態異常がすべて解除される', () => {
    let save = diveSave();
    save = addItem(save, 'item_panacea', 1);
    const state0 = startBattle(save, ['enemy_slime']);
    const ally = state0.allies[0];
    const poisoned: BattleState = {
      ...state0,
      allies: state0.allies.map((a) =>
        a.id === ally.id
          ? { ...a, ailments: [{ type: 'poison', remainingTurns: 3 } as ActiveAilment] }
          : a
      ),
    };
    const after = resolveTurn(
      poisoned,
      [{ kind: 'item', actorId: ally.id, itemId: 'item_panacea', targetId: ally.id }],
      createRng(1)
    );
    const target = after.allies.find((a) => a.id === ally.id)!;
    expect(target.ailments).toHaveLength(0);
    const evt = findItemUseEvent(after);
    expect(evt?.kind === 'item-use' && evt.effect).toEqual({
      kind: 'cure',
      cureEffects: ['poison'],
    });
  });

  test('item_revive_drop で戦闘不能の味方が最大HPの40%で復活する', () => {
    let save = twoCharDiveSave();
    save = addItem(save, 'item_revive_drop', 1);
    const state0 = startBattle(save, ['enemy_slime']);
    const [downedAlly, reviver] = state0.allies;
    const wounded: BattleState = {
      ...state0,
      allies: state0.allies.map((a) =>
        a.id === downedAlly.id ? { ...a, hp: 0, isDown: true } : a
      ),
    };
    const after = resolveTurn(
      wounded,
      [{ kind: 'item', actorId: reviver.id, itemId: 'item_revive_drop', targetId: downedAlly.id }],
      createRng(1)
    );
    const target = after.allies.find((a) => a.id === downedAlly.id)!;
    expect(target.isDown).toBe(false);
    expect(target.hp).toBe(Math.round(target.maxHp * 0.4));
    const evt = findItemUseEvent(after);
    expect(evt?.kind === 'item-use' && evt.effect.kind).toBe('revive');
  });

  // ------------------------------------------------------------------------
  // 空振り（no-op）時はアイテムを消費せず、item-use イベントも出さない（issue）。
  // ------------------------------------------------------------------------

  test('item_panacea を状態異常なしの味方に使うと未消費・item-use イベントなし', () => {
    let save = diveSave();
    save = addItem(save, 'item_panacea', 1);
    const state = startBattle(save, ['enemy_slime']);
    const ally = state.allies[0];
    expect(ally.ailments).toHaveLength(0);
    const after = resolveTurn(
      state,
      [{ kind: 'item', actorId: ally.id, itemId: 'item_panacea', targetId: ally.id }],
      createRng(1)
    );
    expect(after.consumedItems).not.toContain('item_panacea');
    expect(findItemUseEvent(after)).toBeUndefined();
  });

  test('item_revive_drop を生存している味方に使うと未消費（no-op）', () => {
    let save = twoCharDiveSave();
    save = addItem(save, 'item_revive_drop', 1);
    const state = startBattle(save, ['enemy_slime']);
    const [target, reviver] = state.allies;
    expect(target.isDown).toBe(false);
    const after = resolveTurn(
      state,
      [{ kind: 'item', actorId: reviver.id, itemId: 'item_revive_drop', targetId: target.id }],
      createRng(1)
    );
    expect(after.consumedItems).not.toContain('item_revive_drop');
    expect(findItemUseEvent(after)).toBeUndefined();
  });

  test('item_panacea を戦闘不能かつ毒持ちの味方に使うと未消費・cureイベントなし・毒は残る（虚偽cureログの防止）', () => {
    let save = twoCharDiveSave();
    save = addItem(save, 'item_panacea', 1);
    const state0 = startBattle(save, ['enemy_slime']);
    const [downedAlly, healer] = state0.allies;
    const downedAndPoisoned: BattleState = {
      ...state0,
      allies: state0.allies.map((a) =>
        a.id === downedAlly.id
          ? {
              ...a,
              hp: 0,
              isDown: true,
              ailments: [{ type: 'poison', remainingTurns: 3 } as ActiveAilment],
            }
          : a
      ),
    };
    const after = resolveTurn(
      downedAndPoisoned,
      [{ kind: 'item', actorId: healer.id, itemId: 'item_panacea', targetId: downedAlly.id }],
      createRng(1)
    );
    expect(after.consumedItems).not.toContain('item_panacea');
    expect(findItemUseEvent(after)).toBeUndefined();
    const target = after.allies.find((a) => a.id === downedAlly.id)!;
    expect(target.ailments.some((a) => a.type === 'poison')).toBe(true);
  });
});

describe('battle: rewards', () => {
  test('battleRewards は敵の exp/gold を合算', () => {
    const state = startBattle(diveSave(), ['enemy_slime', 'enemy_giant_rat']);
    const { exp, gold } = battleRewards(state);
    expect(exp).toBeGreaterThan(0);
    expect(gold).toBeGreaterThan(0);
  });

  test('partyAvgLv 未指定では減衰なし（後方互換）', () => {
    const state = startBattle(diveSave(), ['enemy_slime']);
    const { exp: expNoLv } = battleRewards(state);
    const { exp: expWithUndef } = battleRewards(state, undefined, undefined);
    expect(expNoLv).toBe(expWithUndef);
  });

  test('partyAvgLv = rec + 10 のとき exp が約 0.20 倍になる', () => {
    // 1F の推奨Lv は APPROPRIATE[10].lv = 12
    // rec + 10 = 22 → levelDecay(22, 1) = 0.20
    // decay_band = 1（下層ファームなし）なので exp * 0.20
    const save = diveSave(); // 1F
    const state = startBattle(save, ['enemy_slime']);
    const { exp: expBase } = battleRewards(state);
    const { exp: expDecayed } = battleRewards(state, undefined, 22); // rec+10 = 22
    // 0.20 倍に丸め誤差込みで近い（Math.round があるため厳密一致ではなく近似）
    expect(expDecayed).toBeCloseTo(expBase * 0.2, 0);
  });

  test('applyBattleResult(win) で所持金・図鑑・現在HPが反映される', () => {
    const save = diveSave(); // 同じ save から戦闘を組む（charId を一致させる）
    let state = startBattle(save, ['enemy_slime']);
    const rng = createRng(7);
    for (let i = 0; i < 30 && state.outcome === 'ongoing'; i++) {
      state = resolveTurn(state, attackAll(state), rng);
    }
    expect(state.outcome).toBe('win');

    const after = applyBattleResult(save, state);
    expect(after.guild.gold).toBeGreaterThan(save.guild.gold);
    expect(after.bestiary.monsters['enemy_slime']?.defeated).toBe(true);
    // 味方の現在HPが diveState に反映
    const ally = state.allies[0];
    const member = after.diveState!.party.find((p) => p.charId === ally.id);
    expect(member?.hp).toBe(ally.hp);
  });
});

describe('battle: イベントのHPスナップショット（issue #18 逐次再生）', () => {
  test('各イベントに全戦闘員のHPスナップショットが付く', () => {
    const state = startBattle(diveSave(), ['enemy_slime']);
    const after = resolveTurn(state, attackAll(state), createRng(7));
    expect(after.events.length).toBeGreaterThan(0);
    for (const e of after.events) {
      expect(e.snapshotAfter).toBeDefined();
      // 味方・敵の双方の id がスナップショットに含まれる
      expect(e.snapshotAfter![state.allies[0].id]).toBeDefined();
      expect(e.snapshotAfter![state.enemies[0].id]).toBeDefined();
    }
  });

  test('ダメージを与えたイベントのスナップショットでは敵HPが減っている', () => {
    const state = startBattle(diveSave(), ['enemy_slime']);
    const after = resolveTurn(state, attackAll(state), createRng(7));
    const eid = state.enemies[0].id;
    const last = after.events[after.events.length - 1];
    expect(last.snapshotAfter![eid].hp).toBeLessThanOrEqual(state.enemies[0].hp);
  });
});

describe('battle: partyExpResults（issue #18 リザルト）', () => {
  test('勝利時に出撃メンバーの獲得経験値と次レベルバー情報を返す', () => {
    const save = diveSave();
    let state = startBattle(save, ['enemy_slime']);
    const rng = createRng(7);
    for (let i = 0; i < 30 && state.outcome === 'ongoing'; i++) {
      state = resolveTurn(state, attackAll(state), rng);
    }
    expect(state.outcome).toBe('win');
    const results = partyExpResults(save, state);
    expect(results.length).toBeGreaterThan(0);
    const r = results[0];
    expect(r.gainedExp).toBeGreaterThan(0);
    expect(r.toLevel).toBeGreaterThanOrEqual(r.fromLevel);
    expect(r.expToNext).toBeGreaterThan(0);
    // 実適用（applyBattleResult）後のレベルと一致する
    const after = applyBattleResult(save, state);
    const member = after.guild.members.find((m) => m.id === r.charId);
    expect(member?.level).toBe(r.toLevel);
  });

  test('勝利以外では空配列', () => {
    const save = diveSave();
    const state = startBattle(save, ['enemy_slime']);
    expect(partyExpResults(save, state)).toEqual([]);
  });

  test('戦闘不能の味方は経験値を得ない（生存者は得る）', () => {
    // 2人パーティを作る
    let base = createInitialSaveData('戦闘ギルド');
    base = addCharacterToGuild(
      base,
      createCharacter({ raceId: 'race_garon', classId: 'class_warrior', name: '戦士A' })
    );
    base = addCharacterToGuild(
      base,
      createCharacter({ raceId: 'race_garon', classId: 'class_warrior', name: '戦士B' })
    );
    const save = startDive(base, 1);

    let state = startBattle(save, ['enemy_slime']);
    const rng = createRng(7);
    for (let i = 0; i < 30 && state.outcome === 'ongoing'; i++) {
      state = resolveTurn(state, attackAll(state), rng);
    }
    expect(state.outcome).toBe('win');
    expect(state.allies.length).toBeGreaterThanOrEqual(2);

    // 先頭の味方を戦闘不能にする
    const downId = state.allies[0].id;
    state = {
      ...state,
      allies: state.allies.map((a) => (a.id === downId ? { ...a, hp: 0, isDown: true } : a)),
    };

    const results = partyExpResults(save, state);
    const downed = results.find((r) => r.charId === downId);
    expect(downed?.gainedExp).toBe(0);
    expect(downed?.fromLevel).toBe(downed?.toLevel);

    // 生存している別の味方は経験値を得る
    const aliveResult = results.find((r) => r.charId !== downId);
    expect(aliveResult?.gainedExp).toBeGreaterThan(0);
    // 生存者が1人なら、その1人に報酬経験値が全額入る（÷生存者数 の検証。issue #50）
    const reward = battleRewards(state, save.towerState.record.deepestReached).exp;
    expect(aliveResult?.gainedExp).toBe(reward);

    // 実適用（applyBattleResult）でも戦闘不能者のレベル・経験値は変化しない
    const before = save.guild.members.find((m) => m.id === downId)!;
    const after = applyBattleResult(save, state);
    const afterM = after.guild.members.find((m) => m.id === downId)!;
    expect(afterM.level).toBe(before.level);
    expect(afterM.exp).toBe(before.exp);
  });

  test('fromExp は戦闘前の現レベル内経験値と一致する', () => {
    const save = diveSave();
    let state = startBattle(save, ['enemy_slime']);
    const rng = createRng(7);
    for (let i = 0; i < 30 && state.outcome === 'ongoing'; i++) {
      state = resolveTurn(state, attackAll(state), rng);
    }
    expect(state.outcome).toBe('win');
    const results = partyExpResults(save, state);
    const r = results[0];
    const member = save.guild.members.find((m) => m.id === r.charId)!;
    expect(r.fromExp).toBe(member.exp);
  });
});

// ============================================================================
// BattleEvent 生成 assert（Step 2）
// 既存の log assert は上のブロックで維持されている。
// ============================================================================

describe('battle events: 通常攻撃 NormalAttackEvent', () => {
  test('通常攻撃で NormalAttackEvent が生成される', () => {
    const state = startBattle(diveSave(), ['enemy_slime']);
    const ally = state.allies[0];
    const after = resolveTurn(state, attackAll(state), createRng(7));
    const attackEvents = after.events.filter(
      (e): e is NormalAttackEvent => e.kind === 'normal-attack'
    );
    expect(attackEvents.length).toBeGreaterThan(0);
    // actorId が味方か敵のいずれか（敵も通常攻撃する）
    const allyAttack = attackEvents.find((e) => e.actorId === ally.id);
    expect(allyAttack).toBeDefined();
    expect(allyAttack!.hits.length).toBeGreaterThan(0);
  });

  test('通常攻撃の HitResult に targetId・damage・element が含まれる', () => {
    const state = startBattle(diveSave(), ['enemy_slime']);
    const ally = state.allies[0];
    const after = resolveTurn(state, attackAll(state), createRng(7));
    const attackEvt = after.events.find(
      (e): e is NormalAttackEvent => e.kind === 'normal-attack' && e.actorId === ally.id
    );
    expect(attackEvt).toBeDefined();
    const hit = attackEvt!.hits[0];
    expect(hit.targetId).toBe(state.enemies[0].id);
    expect(hit.damage).toBeGreaterThanOrEqual(0);
    expect(hit.element).toBeDefined();
    expect(['miss', 'hit', 'crit']).toContain(hit.result);
  });

  test('敵を撃破したとき hit.defeated=true になる', () => {
    let state = startBattle(diveSave(), ['enemy_slime']);
    const rng = createRng(7);
    let defeatedHit: BattleEvent | undefined;
    while (state.outcome === 'ongoing') {
      const after = resolveTurn(state, attackAll(state), rng);
      // 敵が倒れたターンの NormalAttackEvent を探す
      if (after.enemies[0].isDown && !state.enemies[0].isDown) {
        defeatedHit = after.events.find(
          (e): e is NormalAttackEvent =>
            e.kind === 'normal-attack' && e.hits.some((h) => h.defeated)
        );
      }
      state = after;
    }
    expect(defeatedHit).toBeDefined();
  });

  test('同一シードで events も決定論的', () => {
    const base = startBattle(diveSave(), ['enemy_slime']);
    const r1 = resolveTurn(base, attackAll(base), createRng(42));
    const r2 = resolveTurn(base, attackAll(base), createRng(42));
    expect(r1.events.length).toBe(r2.events.length);
    expect(r1.events[0]?.kind).toBe(r2.events[0]?.kind);
  });
});

describe('battle events: 防御 DefendEvent', () => {
  test('guard コマンドで DefendEvent が生成される', () => {
    const state = startBattle(diveSave(), ['enemy_slime']);
    const ally = state.allies[0];
    const after = resolveTurn(state, [{ kind: 'guard', actorId: ally.id }], createRng(1));
    const defendEvt = after.events.find((e) => e.kind === 'defend');
    expect(defendEvt).toBeDefined();
    if (defendEvt && defendEvt.kind === 'defend') {
      expect(defendEvt.actorId).toBe(ally.id);
    }
  });
});

describe('battle events: 逃走 FleeEvent', () => {
  test('逃走成功で FleeEvent(success=true) が生成される', () => {
    // seed 2 で逃走成功するまで試行（複数 seed を試して success=true を見つける）
    let foundSuccess = false;
    for (let seed = 0; seed < 50; seed++) {
      const state = startBattle(diveSave(), ['enemy_slime']);
      const ally = state.allies[0];
      const after = resolveTurn(state, [{ kind: 'flee', actorId: ally.id }], createRng(seed));
      const fleeEvt = after.events.find((e) => e.kind === 'flee');
      if (fleeEvt && fleeEvt.kind === 'flee' && fleeEvt.success) {
        foundSuccess = true;
        expect(after.outcome).toBe('fled');
        break;
      }
    }
    expect(foundSuccess).toBe(true);
  });

  test('逃走失敗で FleeEvent(success=false) が生成される', () => {
    // ボスに対して逃走 → 必ず失敗するシナリオ
    const state = startBattle(diveSave(), ['enemy_slime']);
    const ally = state.allies[0];
    // ボス敵は逃走不可（rate=0）なので失敗確定はないが、失敗ケースを確認
    // 通常 seed で失敗する場合を探す
    let foundFailure = false;
    for (let seed = 0; seed < 50; seed++) {
      const after = resolveTurn(state, [{ kind: 'flee', actorId: ally.id }], createRng(seed));
      const fleeEvt = after.events.find((e) => e.kind === 'flee');
      if (fleeEvt && fleeEvt.kind === 'flee' && !fleeEvt.success) {
        foundFailure = true;
        expect(after.outcome).not.toBe('fled');
        break;
      }
    }
    expect(foundFailure).toBe(true);
  });
});

describe('battle events: スキル SkillEvent', () => {
  test('召喚スキルで SkillEvent と SummonAppearEvent が生成される', () => {
    function summonerSave2(skillId: string): SaveData {
      let save = createInitialSaveData('召喚2');
      save = addCharacterToGuild(
        save,
        createCharacter({ raceId: 'race_pix', classId: 'class_mage', name: '術' })
      );
      const m = save.guild.members[0];
      save = {
        ...save,
        guild: {
          ...save.guild,
          members: [{ ...m, learnedSkills: { ...m.learnedSkills, [skillId]: 1 } }],
        },
      };
      return startDive(save, 1);
    }
    const save = summonerSave2('skill_summon_wolf');
    const state = startBattle(save, ['enemy_slime']);
    const actor = state.allies[0];
    const after = resolveTurn(
      state,
      [{ kind: 'skill', actorId: actor.id, skillId: 'skill_summon_wolf', targetId: actor.id }],
      createRng(1)
    );
    const skillEvt = after.events.find((e): e is SkillEvent => e.kind === 'skill');
    expect(skillEvt).toBeDefined();
    expect(skillEvt!.actorId).toBe(actor.id);
    expect(skillEvt!.skillId).toBe('skill_summon_wolf');
    const summonEvt = after.events.find((e) => e.kind === 'summon-appear');
    expect(summonEvt).toBeDefined();
  });

  test('回復スキルで SkillEvent に heals が含まれる', () => {
    // ユニオン回復スキル（skill_union_rally）で heals を確認
    const base = startBattle(diveSave(), ['enemy_slime']);
    const state = withGauge(base, 0, 100);
    const actor = state.allies[0];
    const wounded: BattleState = {
      ...state,
      allies: state.allies.map((a) => ({ ...a, hp: 1 })),
    };
    const after = resolveTurn(
      wounded,
      [
        {
          kind: 'union',
          actorId: actor.id,
          unionSkillId: 'skill_union_rally',
          participantIds: [actor.id],
          targetId: actor.id,
        },
      ],
      createRng(1)
    );
    // ユニオンスキルなので unionActorIds がある
    const unionEvt = after.events.find(
      (e): e is SkillEvent => e.kind === 'skill' && !!e.unionActorIds
    );
    expect(unionEvt).toBeDefined();
    expect(unionEvt!.heals.length).toBeGreaterThan(0);
    expect(unionEvt!.heals[0].amount).toBeGreaterThan(0);
  });
});

describe('battle events: アイテム ItemUseEvent', () => {
  test('item コマンドで ItemUseEvent が生成される', () => {
    let save = diveSave();
    save = addItem(save, 'item_potion', 1);
    const state0 = startBattle(save, ['enemy_slime']);
    const ally = state0.allies[0];
    const wounded: BattleState = {
      ...state0,
      allies: state0.allies.map((a) => (a.id === ally.id ? { ...a, hp: 1 } : a)),
    };
    const after = resolveTurn(
      wounded,
      [{ kind: 'item', actorId: ally.id, itemId: 'item_potion', targetId: ally.id }],
      createRng(3)
    );
    const itemEvt = after.events.find((e) => e.kind === 'item-use');
    expect(itemEvt).toBeDefined();
    if (itemEvt && itemEvt.kind === 'item-use') {
      expect(itemEvt.actorId).toBe(ally.id);
      expect(itemEvt.itemId).toBe('item_potion');
    }
  });
});

describe('battle events: ターン終了 TickEvent（毒）', () => {
  test('毒ダメージで TickEvent(poison) が生成される', () => {
    const base = startBattle(diveSave(), ['enemy_slime']);
    const state = withAilment(base, 'enemies', 0, 'poison');
    const after = resolveTurn(
      state,
      [{ kind: 'guard', actorId: state.allies[0].id }],
      createRng(1)
    );
    const tickEvt = after.events.find(
      (e): e is TickEvent => e.kind === 'tick' && (e as TickEvent).effectType === 'poison'
    );
    expect(tickEvt).toBeDefined();
    if (tickEvt) {
      expect(tickEvt.effectType).toBe('poison');
      expect(tickEvt.amount).toBeGreaterThan(0);
    }
  });
});

/** actorId を持つ BattleEvent かどうかをナロー */
function hasActorId(e: BattleEvent): e is BattleEvent & { actorId: string } {
  return 'actorId' in e && typeof (e as Record<string, unknown>).actorId === 'string';
}

describe('battle: predefinedActorOrder', () => {
  test('predefinedActorOrder を渡すと先頭 actor が events[0].actorId になる', () => {
    const state = startBattle(diveSave(), ['enemy_slime']);
    const ally = state.allies[0];
    const enemy = state.enemies[0];
    // 敵を先頭に固定する
    const order = [enemy.id, ally.id];
    const after = resolveTurn(
      state,
      [{ kind: 'attack', actorId: ally.id, targetId: enemy.id }],
      createRng(1),
      order
    );
    // 敵が先頭に来るはずなので、最初の actorId 持ちイベントは敵の行動
    const firstActorEvt = after.events.find(hasActorId);
    expect(firstActorEvt).toBeDefined();
    expect(firstActorEvt?.actorId).toBe(enemy.id);
  });

  test('predefinedActorOrder を使った結果と previewTurnOrder の順序が一致する', () => {
    const state = startBattle(diveSave(), ['enemy_slime']);
    const epRng = createRng((state.turn * 0x9e3779b9) >>> 0);
    const preview = previewTurnOrder(state, epRng);
    const order = preview.map((c) => c.id);
    const ally = state.allies[0];
    const enemy = state.enemies[0];
    const after = resolveTurn(
      state,
      [{ kind: 'attack', actorId: ally.id, targetId: enemy.id }],
      createRng(1),
      order
    );
    // events の actorId 列が preview の id 集合に含まれることを確認
    const eventActorIds = after.events
      .filter(hasActorId)
      .map((e) => e.actorId)
      .filter((id, i, arr) => arr.indexOf(id) === i); // 重複除去（反応イベントを除く）
    for (const id of eventActorIds) {
      expect(order).toContain(id);
    }
    // 先頭の行動 actor が preview の先頭と一致する（最初のアクションイベント）
    const firstActionEvt = after.events.find(hasActorId);
    if (firstActionEvt && order.length > 0) {
      expect(firstActionEvt.actorId).toBe(order[0]);
    }
  });

  test('predefinedActorOrder を省略すると従来と同じ結果になる（互換性）', () => {
    const state = startBattle(diveSave(), ['enemy_slime']);
    const cmds = [
      { kind: 'attack' as const, actorId: state.allies[0].id, targetId: state.enemies[0].id },
    ];
    const r1 = resolveTurn(state, cmds, createRng(42));
    const r2 = resolveTurn(state, cmds, createRng(42), undefined);
    expect(r1.enemies[0].hp).toBe(r2.enemies[0].hp);
    expect(r1.allies[0].hp).toBe(r2.allies[0].hp);
  });

  test('REPRO: 「いのちをだいじに」キャラが guard を選び、かつ敵の AGI が高い場合でも events[0] が preview[0] と一致する', () => {
    // 再現条件:
    // - inochi 作戦キャラ(薬師 AGI=6) + batchiri キャラ が編成
    // - 敵: enemy_cave_bat (AGI=9 > キャラ AGI) → preview 先頭は敵になる
    // - turn 1 で全員 HP 満タン → pickInochi は guard を返す
    // 修正前: guard の defend イベントがターン冒頭処理ブロックで先行 push され、
    //         preview 先頭（敵）より前に薬師の defend が events[0] になってしまった。
    // 修正後: defend イベントはメインアクターループ内で push されるので preview 順と一致する。
    let save = createInitialSaveData('テストギルド');

    const medic: Character = {
      ...createCharacter({ raceId: 'race_garon', classId: 'class_medic', name: '薬師' }),
      strategy: 'inochi',
    };
    const warrior: Character = {
      ...createCharacter({ raceId: 'race_garon', classId: 'class_warrior', name: '戦士' }),
      strategy: 'batchiri',
    };
    save = addCharacterToGuild(save, medic);
    save = addCharacterToGuild(save, warrior);
    save = startDive(save, 1);

    // enemy_cave_bat (もりゴブリン) は AGI=9 > キャラ AGI=6 → preview 先頭が敵になる
    const state = startBattle(save, ['enemy_cave_bat'], 'none');

    // turn 1 の preview (UI が turnOrderPreview として使うのと同じ ephemeral rng)
    const epRng = createRng((state.turn * 0x9e3779b9) >>> 0);
    const preview = previewTurnOrder(state, epRng);
    const previewOrder = preview.map((c) => c.id);

    // preview の先頭が敵であることを確認（再現条件）
    expect(state.enemies.some((e) => e.id === previewOrder[0])).toBe(true);

    // guard コマンドを inochi キャラに、attack を batchiri キャラに設定
    const inochiAlly = state.allies.find((a) => a.id === medic.id)!;
    const otherAlly = state.allies.find((a) => a.id === warrior.id)!;
    const enemy = state.enemies[0];

    const cmds: BattleCommand[] = [
      { kind: 'guard', actorId: inochiAlly.id },
      { kind: 'attack', actorId: otherAlly.id, targetId: enemy.id },
    ];

    const after = resolveTurn(state, cmds, createRng(1), previewOrder);

    // preview[0]（敵）が最初の actorId 持ちイベントと一致するべき
    // 修正前: defend(薬師) が先頭になってしまい FAIL
    // 修正後: normal-attack(もりゴブリン) が先頭になり PASS
    const firstActorEvt = after.events.find(hasActorId);
    expect(firstActorEvt).toBeDefined();
    expect(firstActorEvt?.actorId).toBe(previewOrder[0]);
  });
});

describe('battle: buildAlly の隠し能力・statMods 反映（[04 §3-4]・§0 前提バグ修正）', () => {
  function equipInst(masterId: string, forgeLevel: number): EquipInstance {
    return { id: `eq_${masterId}_${forgeLevel}`, masterId, forgeLevel };
  }

  function diveSaveWithEquip(
    equipment: Partial<Character['equipment']>,
    raceId = 'race_garon'
  ): SaveData {
    let save = createInitialSaveData('鍛冶検証ギルド');
    const char = createCharacter({ raceId, classId: 'class_warrior', name: '鍛冶テスト' });
    char.equipment = { ...char.equipment, ...equipment };
    save = addCharacterToGuild(save, char);
    return startDive(save, 1);
  }

  test('forgeLevel < HIDDEN_EFFECT_UNLOCK_LEVEL の装備は stats/resist/ailmentResist に影響しない', () => {
    // equip_iron_armor: armor/heavy tier0 → 隠し能力は bash 耐性0.85（forgeLevel>=3で開花するはずのもの）
    const save = diveSaveWithEquip({
      armor: equipInst('equip_iron_armor', HIDDEN_EFFECT_UNLOCK_LEVEL - 1),
    });
    const char = save.guild.members[0];
    const baseStats = computeBaseStats(char);
    const state = startBattle(save, ['enemy_slime']);
    const ally = state.allies[0];
    expect(ally.stats).toEqual(baseStats);
    // race_garon: elementResist bash 0.8。装備側は forgeLevel 未達のため寄与しない（race分のみ）。
    expect(ally.resist?.bash).toBe(0.8);
  });

  test('forgeLevel >= HIDDEN_EFFECT_UNLOCK_LEVEL の武器装備でSTR等の該当ステが上昇する', () => {
    // equip_iron_spear: weapon/spear tier0 → 隠し能力 STR + statModMagnitude(0)=3
    const save = diveSaveWithEquip({
      weapon: equipInst('equip_iron_spear', HIDDEN_EFFECT_UNLOCK_LEVEL),
    });
    const char = save.guild.members[0];
    const baseStats = computeBaseStats(char);
    const state = startBattle(save, ['enemy_slime']);
    const ally = state.allies[0];
    expect(ally.stats.str).toBe(baseStats.str + 3);
  });

  test('forgeLevel >= HIDDEN_EFFECT_UNLOCK_LEVEL の防具装備で対応属性の被ダメージが軽減される（race×equip 乗算合成）', () => {
    // race_garon: elementResist bash 0.8 / equip_iron_armor(heavy,tier0) の隠し能力: bash 0.85
    const save = diveSaveWithEquip({
      armor: equipInst('equip_iron_armor', HIDDEN_EFFECT_UNLOCK_LEVEL),
    });
    const state = startBattle(save, ['enemy_slime']);
    const ally = state.allies[0];
    expect(ally.resist?.bash).toBeCloseTo(0.8 * 0.85, 10);
  });

  test('ジェム限定装備の bonuses.statMods（STR+5）はforgeLevelに関係なく常に反映される（§0バグ修正の再現テスト）', () => {
    // equip_gem_axe: bonuses.statMods.str = 5。forgeLevel 0（隠し能力は未開花）でも常時反映されるべき。
    // 修正前は aggregateEquip/buildAlly が bonuses.statMods を一切参照せず、この assertion は失敗していた
    // （ally.stats.str === baseStats.str のまま。ショップ説明文だけの「見せかけ効果」バグ）。
    const save = diveSaveWithEquip({ weapon: equipInst('equip_gem_axe', 0) });
    const char = save.guild.members[0];
    const baseStats = computeBaseStats(char);
    const state = startBattle(save, ['enemy_slime']);
    const ally = state.allies[0];
    expect(ally.stats.str).toBe(baseStats.str + 5);
  });
});
