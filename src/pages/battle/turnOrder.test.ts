// ============================================================================
// turnOrder.test.ts — 行動順帯 slideout 挙動の単体テスト
// ユーザー要望: 「行動が進むと順番に左に抜けていき、倒れた場合は列からいなくなる」
// ============================================================================

import { describe, expect, test } from 'vitest';

import {
  computeCompletedActorIds,
  computeDisplayedTurnOrder,
  isActorCompleted,
  isFirstNonCompletedAt,
} from './turnOrder';

import type { BattleEvent, NormalAttackEvent, TickEvent } from '@/domain/battleEvent';
import { previewTurnOrder } from '@/domain/combat';
import { createRng } from '@/domain/rng';
import type { BattleState, Combatant, Stats } from '@/domain/types';

// ---------------------------------------------------------------------------
// テスト用ヘルパー
// ---------------------------------------------------------------------------

const baseStats: Stats = {
  hp: 40,
  tp: 20,
  str: 10,
  vit: 10,
  agi: 10,
  int: 10,
  mnd: 10,
  luc: 10,
};

function makeCombatant(over: Partial<Combatant> = {}): Combatant {
  return {
    id: 'c',
    name: 'c',
    side: 'ally',
    row: 'front',
    stats: { ...baseStats },
    equip: {},
    hp: 40,
    maxHp: 40,
    tp: 20,
    maxTp: 20,
    buffs: [],
    ailments: [],
    unionGauge: 0,
    isDown: false,
    ...over,
  };
}

function makeBattleState(over: Partial<BattleState> = {}): BattleState {
  return {
    turn: 1,
    depth: 1,
    allies: [],
    enemies: [],
    summons: [],
    events: [],
    outcome: 'ongoing',
    firstStrike: 'none',
    drops: [],
    consumedItems: [],
    ...over,
  };
}

function makeAttackEvent(actorId: string): NormalAttackEvent {
  return { kind: 'normal-attack', actorId, hits: [], reactions: [] };
}

function makeTickEvent(targetId: string): TickEvent {
  return { kind: 'tick', targetId, effectType: 'poison', amount: 5 };
}

// ---------------------------------------------------------------------------
// computeCompletedActorIds
// ---------------------------------------------------------------------------

describe('computeCompletedActorIds', () => {
  const events: BattleEvent[] = [makeAttackEvent('B'), makeAttackEvent('C'), makeAttackEvent('A')];

  test('eventIdx=0 では誰も完了していない', () => {
    expect(computeCompletedActorIds(events, 0)).toEqual(new Set());
  });

  test('eventIdx=1 で 1 人目だけが完了', () => {
    expect(computeCompletedActorIds(events, 1)).toEqual(new Set(['B']));
  });

  test('eventIdx=2 で 2 人目まで完了', () => {
    expect(computeCompletedActorIds(events, 2)).toEqual(new Set(['B', 'C']));
  });

  test('eventIdx=3 で全員完了', () => {
    expect(computeCompletedActorIds(events, 3)).toEqual(new Set(['B', 'C', 'A']));
  });

  test('tick event (actorId なし) は完了済み扱いにならない', () => {
    const eventsWithTick: BattleEvent[] = [makeTickEvent('B'), makeAttackEvent('B')];
    // idx=1 まで: tick のみ → B はまだ完了していない
    expect(computeCompletedActorIds(eventsWithTick, 1)).toEqual(new Set());
    // idx=2 まで: attack も含む → B が完了
    expect(computeCompletedActorIds(eventsWithTick, 2)).toEqual(new Set(['B']));
  });

  test('空の events 配列でクラッシュしない', () => {
    expect(computeCompletedActorIds([], 0)).toEqual(new Set());
  });

  test('eventIdx が events.length と等しいとき全イベント分が完了済みになる', () => {
    const e: BattleEvent[] = [makeAttackEvent('A')];
    expect(computeCompletedActorIds(e, e.length)).toEqual(new Set(['A']));
  });
});

// ---------------------------------------------------------------------------
// computeCompletedActorIds — シナリオ: 行動が進むと順番に slideout
// ---------------------------------------------------------------------------

describe('行動が進むと順番に completedActorIds に追加される (slideout シナリオ)', () => {
  test('eventIdx が増えるごとに完了済み actor が 1 人ずつ増える', () => {
    const events: BattleEvent[] = [
      makeAttackEvent('B'),
      makeAttackEvent('C'),
      makeAttackEvent('A'),
    ];
    const completedAt = (idx: number) => Array.from(computeCompletedActorIds(events, idx));

    expect(completedAt(0)).toEqual([]);
    expect(completedAt(1)).toEqual(['B']); // 1 人目が左にスライドアウト
    expect(completedAt(2)).toEqual(['B', 'C']); // 2 人目もスライドアウト
    expect(completedAt(3)).toEqual(['B', 'C', 'A']); // 全員完了
  });
});

// ---------------------------------------------------------------------------
// computeDisplayedTurnOrder
// ---------------------------------------------------------------------------

describe('computeDisplayedTurnOrder', () => {
  const a = makeCombatant({ id: 'A', name: 'A', side: 'ally' });
  const b = makeCombatant({ id: 'B', name: 'B', side: 'ally' });
  const e1 = makeCombatant({ id: 'e1', name: 'e1', side: 'enemy' });

  test('anim なし (animActorOrder=null) のとき turnOrderPreview をそのまま返す', () => {
    const state = makeBattleState({ allies: [a, b], enemies: [e1] });
    const preview = [b, a, e1];
    const result = computeDisplayedTurnOrder(state, null, preview);
    expect(result).toBe(preview); // 参照同一
  });

  test('animActorOrder が空配列のとき turnOrderPreview をそのまま返す', () => {
    const state = makeBattleState({ allies: [a], enemies: [e1] });
    const preview = [a, e1];
    const result = computeDisplayedTurnOrder(state, [], preview);
    expect(result).toBe(preview);
  });

  test('anim ありのとき anim.actorOrder の id 配列を Combatant に解決する', () => {
    const state = makeBattleState({ allies: [a, b], enemies: [e1] });
    const result = computeDisplayedTurnOrder(state, [a.id, e1.id, b.id], []);
    expect(result.map((c) => c.id)).toEqual([a.id, e1.id, b.id]);
  });

  test('anim ありで actorOrder に存在しない id が含まれていてもクラッシュせず除外される', () => {
    const state = makeBattleState({ allies: [a], enemies: [] });
    const result = computeDisplayedTurnOrder(state, [a.id, 'ghost', 'phantom'], []);
    expect(result.map((c) => c.id)).toEqual([a.id]);
  });

  test('summons の combatant も actorOrder から解決できる', () => {
    const s1 = makeCombatant({ id: 's1', name: 's1', side: 'ally', isSummon: true });
    const state = makeBattleState({ allies: [a], enemies: [e1], summons: [s1] });
    const result = computeDisplayedTurnOrder(state, [s1.id, a.id, e1.id], []);
    expect(result.map((c) => c.id)).toEqual([s1.id, a.id, e1.id]);
  });
});

// ---------------------------------------------------------------------------
// isActorCompleted
// ---------------------------------------------------------------------------

describe('isActorCompleted', () => {
  test('完了済みセットに含まれる actor は true', () => {
    expect(isActorCompleted('A', new Set(['A', 'B']))).toBe(true);
  });

  test('完了済みセットに含まれない actor は false', () => {
    expect(isActorCompleted('C', new Set(['A', 'B']))).toBe(false);
  });

  test('空のセットは常に false', () => {
    expect(isActorCompleted('A', new Set())).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// isFirstNonCompletedAt
// ---------------------------------------------------------------------------

describe('isFirstNonCompletedAt', () => {
  test('index=0 で完了済みでないとき true (次マーカーを付ける)', () => {
    expect(isFirstNonCompletedAt(0, 'A', new Set())).toBe(true);
  });

  test('index=0 で完了済みのとき false (slideout を阻害しない)', () => {
    expect(isFirstNonCompletedAt(0, 'A', new Set(['A']))).toBe(false);
  });

  test('index=1 のとき常に false (先頭でない)', () => {
    expect(isFirstNonCompletedAt(1, 'A', new Set())).toBe(false);
  });

  test('index=1 かつ完了済みでも false', () => {
    expect(isFirstNonCompletedAt(1, 'B', new Set(['A']))).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// previewTurnOrder — 倒れた actor は次ターン preview から消える
// ---------------------------------------------------------------------------

describe('倒れた actor は previewTurnOrder から除外される', () => {
  test('isDown=true の actor は次ターン行動順予測に含まれない', () => {
    const state = makeBattleState({
      allies: [
        makeCombatant({ id: 'A', name: 'A', stats: { ...baseStats, agi: 80 }, isDown: false }),
        makeCombatant({ id: 'B', name: 'B', stats: { ...baseStats, agi: 90 }, isDown: true }),
      ],
      enemies: [
        makeCombatant({
          id: 'e1',
          name: 'e1',
          side: 'enemy',
          stats: { ...baseStats, agi: 70 },
          isDown: false,
        }),
      ],
    });
    const rng = createRng(12345);
    const result = previewTurnOrder(state, rng);
    const ids = result.map((c) => c.id);
    expect(ids).not.toContain('B'); // 倒れた B は除外
    expect(ids).toContain('A');
    expect(ids).toContain('e1');
  });

  test('全員 isDown=true なら空配列が返る', () => {
    const state = makeBattleState({
      allies: [makeCombatant({ id: 'A', name: 'A', isDown: true })],
      enemies: [makeCombatant({ id: 'e1', name: 'e1', side: 'enemy', isDown: true })],
    });
    const rng = createRng(1);
    expect(previewTurnOrder(state, rng)).toEqual([]);
  });

  test('isDown=false の actor のみが返り、AGI 降順に並ぶ', () => {
    const state = makeBattleState({
      allies: [
        makeCombatant({
          id: 'slow',
          name: 'slow',
          stats: { ...baseStats, agi: 20 },
          isDown: false,
        }),
        makeCombatant({ id: 'down', name: 'down', stats: { ...baseStats, agi: 99 }, isDown: true }),
      ],
      enemies: [
        makeCombatant({
          id: 'fast',
          name: 'fast',
          side: 'enemy',
          stats: { ...baseStats, agi: 50 },
          isDown: false,
        }),
      ],
    });
    const rng = createRng(999);
    const result = previewTurnOrder(state, rng);
    const ids = result.map((c) => c.id);
    expect(ids).not.toContain('down');
    expect(ids[0]).toBe('fast'); // agi=50 > agi=20
    expect(ids[1]).toBe('slow');
  });
});
