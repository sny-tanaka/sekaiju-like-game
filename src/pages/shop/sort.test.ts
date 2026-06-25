import { describe, expect, test } from 'vitest';

import { buyRowStats, compareRows, instanceRowStats } from './sort';

import type { EquipInstance } from '@/domain/types';

describe('compareRows', () => {
  const make = (price: number, qty: number, atk = 0, mat = 0, def = 0, mdf = 0) => ({
    price,
    qty,
    stats: { atk, mat, def, mdf },
  });

  test('priceAsc は安い順', () => {
    expect(compareRows('priceAsc', make(100, 1), make(200, 1))).toBeLessThan(0);
  });

  test('priceDesc は高い順', () => {
    expect(compareRows('priceDesc', make(200, 1), make(100, 1))).toBeLessThan(0);
  });

  test('qtyDesc は所持数多い順', () => {
    expect(compareRows('qtyDesc', make(0, 5), make(0, 1))).toBeLessThan(0);
  });

  test('atkDesc は ATK 高い順', () => {
    expect(compareRows('atkDesc', make(0, 0, 100), make(0, 0, 50))).toBeLessThan(0);
  });

  test('matDesc は MAT 高い順', () => {
    expect(compareRows('matDesc', make(0, 0, 0, 100), make(0, 0, 0, 50))).toBeLessThan(0);
  });

  test('defDesc は DEF 高い順', () => {
    expect(compareRows('defDesc', make(0, 0, 0, 0, 100), make(0, 0, 0, 0, 50))).toBeLessThan(0);
  });

  test('mdfDesc は MDF 高い順', () => {
    expect(compareRows('mdfDesc', make(0, 0, 0, 0, 0, 100), make(0, 0, 0, 0, 0, 50))).toBeLessThan(
      0
    );
  });

  test('能力値同値時は price 昇順でタイブレーク', () => {
    expect(compareRows('atkDesc', make(100, 0, 50), make(200, 0, 50))).toBeLessThan(0);
  });

  test('能力値 0 の装備外行は降順ソートで末尾へ', () => {
    // atk 0 vs atk 100 で降順 → atk 100 が先
    expect(compareRows('atkDesc', make(0, 0, 0), make(0, 0, 100))).toBeGreaterThan(0);
  });
});

describe('buyRowStats / instanceRowStats', () => {
  test('buyRowStats は gradedBaseBonuses 経由で grade を反映', () => {
    // equip_golem_blade: base atk 13, grade=2 → atk ≈ 146 (140〜150 の範囲)
    const s = buyRowStats('equip_golem_blade', 2);
    expect(s.atk).toBeGreaterThanOrEqual(140);
    expect(s.atk).toBeLessThanOrEqual(150);
    expect(s.mat).toBe(0);
    expect(s.def).toBe(0);
  });

  test('instanceRowStats は forgeLevel も加算する', () => {
    const inst: EquipInstance = {
      id: 'i1',
      masterId: 'equip_short_sword',
      forgeLevel: 5,
      grade: 1,
    } as EquipInstance;
    const s = instanceRowStats(inst);
    // base atk 8 + forgeBonusFor(short_sword, 5): forgeIncPerLevel(0) = round(2*1.6^0) = 2, inc = 5*2 = 10 → 合計 18
    expect(s.atk).toBe(18);
  });
});
