/**
 * TP回復スキル（restoreTp エフェクト）のテスト（issue #57）。
 * resolveTurn / applySkillEffect を通じて挙動を検証する。
 *
 * 新仕様:
 *   - 全体回復(allyAll): 使用者を含む全員を回復。使用者の tpCost は amount の約2倍で設定されているため
 *     実質マイナス（tpCost - amount > 0 ぶん減る）。
 *   - 自己回復(self): 回復量 > 消費TP（純増OK）。
 */
import { buildSimBattleState, resolveTurn } from '@/domain/battle';
import { createRng } from '@/domain/rng';
import type { BattleCommand, Combatant } from '@/domain/types';

/** テスト用の最小 Combatant を生成するファクトリ。 */
function makeCombatant(id: string, overrides: Partial<Combatant> = {}): Combatant {
  const base: Combatant = {
    id,
    name: id,
    side: 'ally',
    row: 'front',
    stats: { hp: 200, tp: 100, str: 10, vit: 10, agi: 10, int: 10, mnd: 10, luc: 10 },
    equip: {},
    hp: 200,
    maxHp: 200,
    tp: 50,
    maxTp: 100,
    buffs: [],
    ailments: [],
    states: [],
    unionGauge: 0,
    isDown: false,
  };
  return { ...base, ...overrides };
}

/** テスト用の敵 Combatant（HPが大きいので通常攻撃では倒れない）。 */
function makeDummyEnemy(id: string): Combatant {
  return {
    id,
    name: id,
    side: 'enemy',
    row: 'front',
    stats: { hp: 9999, tp: 0, str: 1, vit: 100, agi: 1, int: 1, mnd: 100, luc: 1 },
    equip: {},
    hp: 9999,
    maxHp: 9999,
    tp: 0,
    maxTp: 0,
    buffs: [],
    ailments: [],
    states: [],
    unionGauge: 0,
    isDown: false,
    enemyId: 'enemy_slime',
  };
}

// ============================================================================
// 全体TP回復スキル（allyAll: skill_medic_tp_tonic）テスト
// ============================================================================

describe('restoreTp: 全体TP回復スキル（allyAll）', () => {
  const skillId = 'skill_medic_tp_tonic';

  test('使用者を含む全員のTPが回復されるが、使用者は実質マイナス（消費 > 回復）になる', () => {
    // Lv1 の skill_medic_tp_tonic: tpCost = 16+4*1=20, amount = 8+2*1=10
    // TP自然回復: Math.ceil(100 * 0.04) = 4
    const actor = makeCombatant('medic', { tp: 60, maxTp: 100 });
    actor.skillLevels = { [skillId]: 1 };

    const ally1 = makeCombatant('ally1', { tp: 20, maxTp: 100 });
    const ally2 = makeCombatant('ally2', { tp: 10, maxTp: 100 });
    const enemy = makeDummyEnemy('enemy_0');

    const state = buildSimBattleState([actor, ally1, ally2], [enemy], 1);
    const cmd: BattleCommand = {
      kind: 'skill',
      actorId: actor.id,
      skillId,
      targetId: '',
    };
    const after = resolveTurn(state, [cmd], createRng(1));

    const afterActor = after.allies.find((a) => a.id === 'medic')!;
    const afterAlly1 = after.allies.find((a) => a.id === 'ally1')!;
    const afterAlly2 = after.allies.find((a) => a.id === 'ally2')!;

    // 使用者: 60 - 20(tpCost) + 10(amount) = 50
    // TP自然回復は廃止（issue #57 第2弾）のため自然回復なし
    // tpCost(20) - amount(10) = 10 の実質マイナス（消費 > 回復）
    expect(afterActor.tp).toBe(50);

    // 他の味方: amount(10) 回復のみ（自然回復なし）
    // ally1: 20 + 10 = 30
    expect(afterAlly1.tp).toBe(30);
    // ally2: 10 + 10 = 20
    expect(afterAlly2.tp).toBe(20);
  });

  test('回復量が maxTp でクランプされる', () => {
    // Lv1: tpCost=20, amount=10
    const actor = makeCombatant('medic', { tp: 60, maxTp: 100 });
    actor.skillLevels = { [skillId]: 1 };

    // 既にほぼ満タンの味方
    const ally1 = makeCombatant('ally1', { tp: 94, maxTp: 100 });
    const enemy = makeDummyEnemy('enemy_0');

    const state = buildSimBattleState([actor, ally1], [enemy], 1);
    const cmd: BattleCommand = {
      kind: 'skill',
      actorId: actor.id,
      skillId,
      targetId: '',
    };
    const after = resolveTurn(state, [cmd], createRng(1));

    const afterAlly1 = after.allies.find((a) => a.id === 'ally1')!;
    // 94 + 10(amount) = 104 → maxTp=100 でクランプ（自然回復廃止）
    expect(afterAlly1.tp).toBe(100);
  });
});

// ============================================================================
// 自己回復スキル（self: skill_monk_breathing）テスト
// ============================================================================

describe('restoreTp: 自己回復スキル（self）', () => {
  const skillId = 'skill_monk_breathing';

  test('使用者のTPが純増する（回復 > 消費）', () => {
    // Lv1 の skill_monk_breathing: tpCost = 3+1=4, amount = 6+2*1=8
    // TP自然回復: Math.ceil(100 * 0.04) = 4
    // スキル純増分: amount(8) - tpCost(4) = +4
    const actor = makeCombatant('monk', { tp: 50, maxTp: 100 });
    actor.skillLevels = { [skillId]: 1 };

    const enemy = makeDummyEnemy('enemy_0');

    const state = buildSimBattleState([actor], [enemy], 1);
    const cmd: BattleCommand = {
      kind: 'skill',
      actorId: actor.id,
      skillId,
      targetId: actor.id,
    };
    const after = resolveTurn(state, [cmd], createRng(1));

    const afterActor = after.allies.find((a) => a.id === 'monk')!;
    // tp: 50 - 4(tpCost) + 8(amount) = 54
    // TP自然回復は廃止（issue #57 第2弾）のため自然回復なし
    // スキルによる純増: +4（回復8 - 消費4 = 4）
    expect(afterActor.tp).toBe(54);
  });

  test('Lv3 でも純増する（回復 > 消費）', () => {
    // Lv3: tpCost = 0.5*(6+2*3) = 0.5*12 = 6（computeSkillTpCost で算出）, amount = 6+2*3=12
    // スキル純増分: amount(12) - tpCost(6) = +6
    // TP自然回復は廃止（issue #57 第2弾）
    const actor = makeCombatant('monk', { tp: 50, maxTp: 100 });
    actor.skillLevels = { [skillId]: 3 };

    const enemy = makeDummyEnemy('enemy_0');

    const state = buildSimBattleState([actor], [enemy], 1);
    const cmd: BattleCommand = {
      kind: 'skill',
      actorId: actor.id,
      skillId,
      targetId: actor.id,
    };
    const after = resolveTurn(state, [cmd], createRng(1));

    const afterActor = after.allies.find((a) => a.id === 'monk')!;
    // tp: 50 - 6(tpCost) + 12(amount) = 56
    // スキルによる純増: +6（回復12 - 消費6 = 6）
    expect(afterActor.tp).toBe(56);
  });

  test('maxTp でクランプされる', () => {
    // Lv1: tpCost=4, amount=8
    const actor = makeCombatant('monk', { tp: 98, maxTp: 100 });
    actor.skillLevels = { [skillId]: 1 };

    const enemy = makeDummyEnemy('enemy_0');

    const state = buildSimBattleState([actor], [enemy], 1);
    const cmd: BattleCommand = {
      kind: 'skill',
      actorId: actor.id,
      skillId,
      targetId: actor.id,
    };
    const after = resolveTurn(state, [cmd], createRng(1));

    const afterActor = after.allies.find((a) => a.id === 'monk')!;
    // 98 - 4(tpCost) + 8(amount) = 102 → maxTp=100 でクランプ（自然回復廃止）
    expect(afterActor.tp).toBe(100);
  });
});

// ============================================================================
// resolveTurn 経由での順序確認（actor.tp -= cost → restoreTp 適用）
// ============================================================================

describe('restoreTp: resolveTurn 経由での TP 変化順序', () => {
  test('全体TP回復の使用者もTPが回復されるが実質マイナス（消費 > 回復）', () => {
    // skill_summoner_tp_offering: Lv1 tpCost=16+4=20, amount=8+2=10
    // TP自然回復: Math.ceil(100 * 0.04) = 4
    const skillId = 'skill_summoner_tp_offering';
    const actor = makeCombatant('summoner', { tp: 30, maxTp: 100 });
    actor.skillLevels = { [skillId]: 1 };

    const ally = makeCombatant('ally1', { tp: 0, maxTp: 100 });
    const enemy = makeDummyEnemy('enemy_0');

    const state = buildSimBattleState([actor, ally], [enemy], 1);
    const cmd: BattleCommand = {
      kind: 'skill',
      actorId: actor.id,
      skillId,
      targetId: '',
    };
    const after = resolveTurn(state, [cmd], createRng(1));

    const afterActor = after.allies.find((a) => a.id === 'summoner')!;
    const afterAlly = after.allies.find((a) => a.id === 'ally1')!;

    // 使用者: 30 - 20(tpCost) + 10(amount) = 20
    // TP自然回復は廃止（issue #57 第2弾）のため自然回復なし
    // 実質マイナス: tpCost(20) - amount(10) = 10 ぶんTP減
    expect(afterActor.tp).toBe(20);
    // 味方: 0 + 10(amount) = 10（自然回復なし）
    expect(afterAlly.tp).toBe(10);
  });

  test('TP不足（actor.tp < tpCost）では全体TP回復スキルが発動しない', () => {
    // skill_medic_tp_tonic Lv1: tpCost=20
    const skillId = 'skill_medic_tp_tonic';
    const actor = makeCombatant('medic', { tp: 10, maxTp: 100 }); // tp < tpCost(20)
    actor.skillLevels = { [skillId]: 1 };

    const ally = makeCombatant('ally1', { tp: 0, maxTp: 100 });
    const enemy = makeDummyEnemy('enemy_0');

    const state = buildSimBattleState([actor, ally], [enemy], 1);
    const cmd: BattleCommand = {
      kind: 'skill',
      actorId: actor.id,
      skillId,
      targetId: '',
    };
    const after = resolveTurn(state, [cmd], createRng(1));

    const afterActor = after.allies.find((a) => a.id === 'medic')!;
    const afterAlly = after.allies.find((a) => a.id === 'ally1')!;

    // スキル不発：actor は TP消費なし（自然回復廃止）のみ
    // TP自然回復は廃止（issue #57 第2弾）のため自然回復なし
    expect(afterActor.tp).toBe(10); // 変化なし
    // ally も回復されない（自然回復なし）
    expect(afterAlly.tp).toBe(0); // 変化なし
  });
});
