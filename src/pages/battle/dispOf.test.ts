// ============================================================================
// dispOf.test.ts — 表示用 HP/isDown 判定の単体テスト
// ============================================================================

import { describe, expect, test } from 'vitest';

import { applyDeadDisp } from './dispOf';

import type { CombatantSnapshot } from '@/domain/battleEvent';
import type { Combatant, Stats } from '@/domain/types';

// ---------------------------------------------------------------------------
// テスト用ヘルパー
// ---------------------------------------------------------------------------

const baseStats: Stats = {
  hp: 100,
  tp: 30,
  str: 10,
  vit: 10,
  agi: 10,
  int: 10,
  mnd: 10,
  luc: 10,
};

function makeCombatant(over: Partial<Combatant> = {}): Combatant {
  return {
    id: 'c1',
    name: 'テスト戦闘員',
    side: 'enemy',
    row: 'front',
    stats: { ...baseStats },
    equip: {},
    hp: 80,
    maxHp: 100,
    tp: 20,
    maxTp: 30,
    buffs: [],
    ailments: [],
    unionGauge: 0,
    isDown: false,
    ...over,
  };
}

// ---------------------------------------------------------------------------
// applyDeadDisp — dispMap=null の場合（anim 外）
// ---------------------------------------------------------------------------

describe('applyDeadDisp — dispMap が null のとき（anim 外）', () => {
  test('生存 actor は c.hp / c.isDown の実値を返す', () => {
    const c = makeCombatant({ id: 'e1', hp: 60, isDown: false });
    const result = applyDeadDisp(c, null, new Set());
    expect(result).toEqual({ hp: 60, isDown: false });
  });

  test('戦闘不能 actor も c.hp / c.isDown の実値を返す', () => {
    const c = makeCombatant({ id: 'e1', hp: 0, isDown: true });
    const result = applyDeadDisp(c, null, new Set());
    expect(result).toEqual({ hp: 0, isDown: true });
  });

  test('dispMap=null のとき deadActorIds に含まれていても強制上書きされない', () => {
    // anim 外なので deadActorIds は関係ない（dispMap=null が優先）
    const c = makeCombatant({ id: 'e1', hp: 80, isDown: false });
    const result = applyDeadDisp(c, null, new Set(['e1']));
    // dispMap が null なので実値を使う
    expect(result).toEqual({ hp: 80, isDown: false });
  });
});

// ---------------------------------------------------------------------------
// applyDeadDisp — dispMap あり・deadActorIds なし（anim 再生中・死亡なし）
// ---------------------------------------------------------------------------

describe('applyDeadDisp — dispMap あり・deadActorIds が空のとき', () => {
  test('dispMap にスナップショットがある actor はその値を返す', () => {
    const c = makeCombatant({ id: 'e1', hp: 80, isDown: false });
    const dispMap: CombatantSnapshot = { e1: { hp: 45, isDown: false } };
    const result = applyDeadDisp(c, dispMap, new Set());
    expect(result).toEqual({ hp: 45, isDown: false });
  });

  test('dispMap にスナップショットがない actor は c.hp / c.isDown の実値を返す', () => {
    const c = makeCombatant({ id: 'e1', hp: 80, isDown: false });
    const dispMap: CombatantSnapshot = { e2: { hp: 10, isDown: false } };
    const result = applyDeadDisp(c, dispMap, new Set());
    expect(result).toEqual({ hp: 80, isDown: false });
  });

  test('dispMap が空 Object のとき実値を返す', () => {
    const c = makeCombatant({ id: 'e1', hp: 70, isDown: false });
    const result = applyDeadDisp(c, {}, new Set());
    expect(result).toEqual({ hp: 70, isDown: false });
  });
});

// ---------------------------------------------------------------------------
// applyDeadDisp — deadActorIds に含まれる actor の強制上書き（issue #78 コア仕様）
// ---------------------------------------------------------------------------

describe('applyDeadDisp — deadActorIds に含まれる actor は HP=0/isDown=true 強制', () => {
  test('dispMap あり・dead actor は baseSnapshot 参照中でも HP=0/isDown=true', () => {
    // reactions イベントの再生中に dispMap が baseSnapshot を参照し、
    // 倒した敵の HP が一瞬元に戻るのを防ぐケース
    const c = makeCombatant({ id: 'e1', hp: 80, isDown: false });
    // dispMap は baseSnapshot（ターン開始値）を参照中 → HP=80 と返りそうなところを強制上書き
    const dispMap: CombatantSnapshot = { e1: { hp: 80, isDown: false } };
    const result = applyDeadDisp(c, dispMap, new Set(['e1']));
    expect(result).toEqual({ hp: 0, isDown: true });
  });

  test('dead actor のスナップショットが dispMap にない場合でも HP=0/isDown=true を強制', () => {
    const c = makeCombatant({ id: 'e1', hp: 50, isDown: false });
    const dispMap: CombatantSnapshot = {}; // snapshotAfter が付かない reaction イベント
    const result = applyDeadDisp(c, dispMap, new Set(['e1']));
    expect(result).toEqual({ hp: 0, isDown: true });
  });

  test('dead に含まれない actor は通常通り dispMap の値を返す', () => {
    const c1 = makeCombatant({ id: 'e1', hp: 80, isDown: false });
    const c2 = makeCombatant({ id: 'e2', hp: 30, isDown: false });
    const dispMap: CombatantSnapshot = {
      e1: { hp: 80, isDown: false },
      e2: { hp: 30, isDown: false },
    };
    // e1 だけが dead
    expect(applyDeadDisp(c1, dispMap, new Set(['e1']))).toEqual({ hp: 0, isDown: true });
    expect(applyDeadDisp(c2, dispMap, new Set(['e1']))).toEqual({ hp: 30, isDown: false });
  });

  test('dispMap=null かつ deadActorIds に含まれても強制上書きしない（anim 外）', () => {
    // dispMap=null のとき（anim 外）は deadActorIds は無視する
    const c = makeCombatant({ id: 'e1', hp: 80, isDown: false });
    const result = applyDeadDisp(c, null, new Set(['e1']));
    expect(result).toEqual({ hp: 80, isDown: false });
  });
});

// ---------------------------------------------------------------------------
// applyDeadDisp — エッジケース
// ---------------------------------------------------------------------------

describe('applyDeadDisp — エッジケース', () => {
  test('dispMap のスナップショットが既に isDown=true の actor も正しく返す', () => {
    const c = makeCombatant({ id: 'e1', hp: 0, isDown: true });
    const dispMap: CombatantSnapshot = { e1: { hp: 0, isDown: true } };
    const result = applyDeadDisp(c, dispMap, new Set());
    expect(result).toEqual({ hp: 0, isDown: true });
  });

  test('味方が deadActorIds に含まれる場合も HP=0/isDown=true を強制する', () => {
    const ally = makeCombatant({ id: 'ally1', side: 'ally', hp: 100, isDown: false });
    const dispMap: CombatantSnapshot = { ally1: { hp: 100, isDown: false } };
    const result = applyDeadDisp(ally, dispMap, new Set(['ally1']));
    expect(result).toEqual({ hp: 0, isDown: true });
  });

  test('deadActorIds が大きいセットのとき、含まれない actor は影響を受けない', () => {
    const c = makeCombatant({ id: 'safe', hp: 90, isDown: false });
    const dispMap: CombatantSnapshot = { safe: { hp: 90, isDown: false } };
    const deadIds = new Set(['e1', 'e2', 'e3', 'e4', 'e5']);
    const result = applyDeadDisp(c, dispMap, deadIds);
    expect(result).toEqual({ hp: 90, isDown: false });
  });
});
