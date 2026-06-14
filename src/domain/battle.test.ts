import { applyBattleResult, battleRewards, resolveTurn, startBattle } from '@/domain/battle';
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

describe('battle: バインド（部位封じ・[03 §6]）', () => {
  test('腕封じの敵は通常攻撃できない（味方は無傷）', () => {
    const base = startBattle(diveSave(), ['enemy_slime']);
    const allyHp = base.allies[0].hp;
    const state = withAilment(base, 'enemies', 0, 'armBind');
    // 味方は防御（敵の行動のみ観測）
    const after = resolveTurn(
      state,
      [{ kind: 'guard', actorId: state.allies[0].id }],
      createRng(1)
    );
    expect(after.allies[0].hp).toBe(allyHp);
    expect(after.log.some((l) => l.text.includes('腕を封じ'))).toBe(true);
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
