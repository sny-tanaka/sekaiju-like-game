// ============================================================================
// buffExpire.test.ts — 防御バフ切れ判定の単体テスト
// ============================================================================

import { describe, expect, test } from 'vitest';

import { isGuardBuffExpire } from './buffExpire';

import type { TickEvent } from '@/domain/battleEvent';

// ---------------------------------------------------------------------------
// テスト用ヘルパー
// ---------------------------------------------------------------------------

function makeTickEvent(
  effectType: TickEvent['effectType'],
  effect?: TickEvent['effect']
): TickEvent {
  const base: TickEvent = { kind: 'tick', targetId: 'target-1', effectType };
  if (effect !== undefined) {
    return { ...base, effect };
  }
  return base;
}

// ---------------------------------------------------------------------------
// isGuardBuffExpire
// ---------------------------------------------------------------------------

describe('isGuardBuffExpire', () => {
  // ---- 防御バフ（pdef/mdef）のとき true ----

  test("buff-expire かつ effect='pdef' のとき true を返す（物理防御バフ切れ）", () => {
    const event = makeTickEvent('buff-expire', 'pdef');
    expect(isGuardBuffExpire(event)).toBe(true);
  });

  test("buff-expire かつ effect='mdef' のとき true を返す（魔法防御バフ切れ）", () => {
    const event = makeTickEvent('buff-expire', 'mdef');
    expect(isGuardBuffExpire(event)).toBe(true);
  });

  // ---- 防御バフ以外のとき false ----

  test("buff-expire かつ effect='patk' のとき false を返す（物理攻撃バフ切れ）", () => {
    const event = makeTickEvent('buff-expire', 'patk');
    expect(isGuardBuffExpire(event)).toBe(false);
  });

  test("buff-expire かつ effect='matk' のとき false を返す（魔法攻撃バフ切れ）", () => {
    const event = makeTickEvent('buff-expire', 'matk');
    expect(isGuardBuffExpire(event)).toBe(false);
  });

  test("buff-expire かつ effect='acc' のとき false を返す（命中バフ切れ）", () => {
    const event = makeTickEvent('buff-expire', 'acc');
    expect(isGuardBuffExpire(event)).toBe(false);
  });

  test("buff-expire かつ effect='eva' のとき false を返す（回避バフ切れ）", () => {
    const event = makeTickEvent('buff-expire', 'eva');
    expect(isGuardBuffExpire(event)).toBe(false);
  });

  test("buff-expire かつ effect='elementResist' のとき false を返す", () => {
    const event = makeTickEvent('buff-expire', 'elementResist');
    expect(isGuardBuffExpire(event)).toBe(false);
  });

  test('buff-expire かつ effect が undefined のとき false を返す', () => {
    const event = makeTickEvent('buff-expire');
    expect(isGuardBuffExpire(event)).toBe(false);
  });

  // ---- buff-expire 以外の effectType はすべて false ----

  test("effectType='regen' のとき false を返す", () => {
    const event = makeTickEvent('regen');
    expect(isGuardBuffExpire(event)).toBe(false);
  });

  test("effectType='poison' のとき false を返す", () => {
    const event = makeTickEvent('poison');
    expect(isGuardBuffExpire(event)).toBe(false);
  });

  test("effectType='debuff-expire' のとき false を返す（デバフ切れは対象外）", () => {
    const event = makeTickEvent('debuff-expire');
    expect(isGuardBuffExpire(event)).toBe(false);
  });

  // ---- 複数の effect を切り替えた場合（シナリオ確認） ----

  test('pdef と matk の両ケースで期待値が異なることを一括確認', () => {
    expect(isGuardBuffExpire(makeTickEvent('buff-expire', 'pdef'))).toBe(true);
    expect(isGuardBuffExpire(makeTickEvent('buff-expire', 'mdef'))).toBe(true);
    expect(isGuardBuffExpire(makeTickEvent('buff-expire', 'matk'))).toBe(false);
    expect(isGuardBuffExpire(makeTickEvent('buff-expire', 'patk'))).toBe(false);
  });
});
