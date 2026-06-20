import {
  applyBattleResult,
  battleRewards,
  partyExpResults,
  resolveTurn,
  startBattle,
} from '@/domain/battle';
import { startDive } from '@/domain/dive';
import { addItem, itemCount } from '@/domain/inventory';
import { createRng } from '@/domain/rng';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
import type { ActiveAilment, BattleCommand, BattleState, SaveData } from '@/domain/types';

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
    expect(after.log.some((l) => l.text.includes('先制'))).toBe(true);
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
    expect(after.log.some((l) => l.text.includes('不意打ち'))).toBe(true);
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
    expect(after.log.some((l) => l.text.includes('眠っている'))).toBe(true);
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
    expect(after.log.some((l) => l.text.includes('眠っている'))).toBe(true);
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
    expect(after.log.some((l) => l.text.includes('腕を封じ'))).toBe(true);
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
    expect(after.log.some((l) => l.text.includes('頭を封じ'))).toBe(true);
  });

  test('脚封じの味方は逃走できない', () => {
    const base = startBattle(diveSave(), ['enemy_slime']);
    const state = withAilment(base, 'allies', 0, 'legBind');
    const after = resolveTurn(state, [{ kind: 'flee', actorId: state.allies[0].id }], createRng(1));
    expect(after.outcome).not.toBe('fled');
    expect(after.log.some((l) => l.text.includes('脚を封じ'))).toBe(true);
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
    expect(after.log.some((l) => l.text.includes('ユニオン'))).toBe(true);
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
    expect(after.allies[0].unionGauge).toBe(50); // 消費されない
    expect(after.log.some((l) => l.text.includes('ゲージが足りない'))).toBe(true);
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
    expect(after.allies[0].unionGauge).toBe(100); // 消費されない
    expect(after.log.some((l) => l.text.includes('人数が足りない'))).toBe(true);
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
    expect(after.log.some((l) => l.text.includes('召喚した'))).toBe(true);
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
    // state.drops に乗った分だけ倉庫に入る
    for (const d of state.drops) {
      expect(itemCount(after, d.itemId)).toBeGreaterThanOrEqual(1);
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

describe('battle: ログのHPスナップショット（issue #18 逐次再生）', () => {
  test('各ログ行に全戦闘員のHPスナップショットが付く', () => {
    const state = startBattle(diveSave(), ['enemy_slime']);
    const after = resolveTurn(state, attackAll(state), createRng(7));
    expect(after.log.length).toBeGreaterThan(0);
    for (const l of after.log) {
      expect(l.snapshot).toBeDefined();
      // 味方・敵の双方の id がスナップショットに含まれる
      expect(l.snapshot![state.allies[0].id]).toBeDefined();
      expect(l.snapshot![state.enemies[0].id]).toBeDefined();
    }
  });

  test('ダメージを与えたログ行のスナップショットでは敵HPが減っている', () => {
    const state = startBattle(diveSave(), ['enemy_slime']);
    const after = resolveTurn(state, attackAll(state), createRng(7));
    const eid = state.enemies[0].id;
    const last = after.log[after.log.length - 1];
    expect(last.snapshot![eid].hp).toBeLessThanOrEqual(state.enemies[0].hp);
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
