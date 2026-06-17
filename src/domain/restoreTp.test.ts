/**
 * TP回復スキル（restoreTp エフェクト）のテスト（issue #57）。
 * resolveTurn / applySkillEffect を通じて挙動を検証する。
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

  test('使用者のTPは回復されず（むしろ tpCost 分減る）、他の生存味方のTPが回復する', () => {
    // Lv1 の skill_medic_tp_tonic: tpCost = 10+2*1=12, amount = 5+2*1=7
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

    // 使用者は tpCost(12) 減るがTP回復対象外。ターン終了のTP自然回復: Math.ceil(100*0.04)=4
    // tp: 60 - 12 + 4 = 52
    expect(afterActor.tp).toBe(52);

    // 他の味方は amount(7) 回復 + 自然回復(4)
    // ally1: 20 + 7 + 4 = 31
    expect(afterAlly1.tp).toBe(31);
    // ally2: 10 + 7 + 4 = 21
    expect(afterAlly2.tp).toBe(21);
  });

  test('回復量が maxTp でクランプされる', () => {
    const actor = makeCombatant('medic', { tp: 60, maxTp: 100 });
    actor.skillLevels = { [skillId]: 1 };

    // 既にほぼ満タンの味方
    const ally1 = makeCombatant('ally1', { tp: 96, maxTp: 100 });
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
    // 96 + 7 + 自然回復(4) = 107 → maxTp=100 でクランプ
    expect(afterAlly1.tp).toBe(100);
  });
});

// ============================================================================
// 自己回復スキル（self: skill_monk_breathing）テスト
// ============================================================================

describe('restoreTp: 自己回復スキル（self）', () => {
  const skillId = 'skill_monk_breathing';

  test('使用者のTPが net 0（消費と回復が相殺）になる（自然回復は別途加算）', () => {
    // Lv1 の skill_monk_breathing: tpCost = 4+1=5, amount = 4+1=5
    // ターン終了時のTP自然回復: Math.ceil(100 * 0.04) = 4
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
    // tp: 50 - cost(5) + amount(5) + 自然回復(4) = 54
    // net 0 とは「スキル効果自体が cost と amount を相殺する」という意味（自然回復は別途加算）
    expect(afterActor.tp).toBe(54);
  });

  test('Lv3 でも消費と回復が相殺（net 0）、自然回復は別途加算', () => {
    // Lv3: tpCost = 4+3=7, amount = 4+3=7
    // ターン終了時のTP自然回復: Math.ceil(100 * 0.04) = 4
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
    // tp: 50 - cost(7) + amount(7) + 自然回復(4) = 54（net スキル分は 0）
    expect(afterActor.tp).toBe(54);
  });
});

// ============================================================================
// resolveTurn 経由での順序確認（actor.tp -= cost → restoreTp 適用）
// ============================================================================

describe('restoreTp: resolveTurn 経由での TP 変化順序', () => {
  test('全体TP回復の使用者はコスト消費のみで回復されない', () => {
    // skill_summoner_tp_offering: Lv1 tpCost=12, amount=7
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

    // 使用者: 30 - 12 + 自然回復(Math.ceil(100*0.04)=4) = 22（TP回復スキルは使用者に適用されない）
    expect(afterActor.tp).toBe(22);
    // 味方: 0 + 7 + 自然回復(4) = 11
    expect(afterAlly.tp).toBe(11);
  });
});
