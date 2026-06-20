import { APPROPRIATE, BALANCE, getRecommendedLevel, levelDecay } from '@/data/balance';

describe('getRecommendedLevel', () => {
  test('1〜10F は APPROPRIATE[10].lv を返す', () => {
    expect(getRecommendedLevel(1)).toBe(APPROPRIATE[10].lv);
    expect(getRecommendedLevel(5)).toBe(APPROPRIATE[10].lv);
    expect(getRecommendedLevel(10)).toBe(APPROPRIATE[10].lv);
  });

  test('11〜20F は APPROPRIATE[20].lv を返す', () => {
    expect(getRecommendedLevel(11)).toBe(APPROPRIATE[20].lv);
    expect(getRecommendedLevel(15)).toBe(APPROPRIATE[20].lv);
    expect(getRecommendedLevel(20)).toBe(APPROPRIATE[20].lv);
  });

  test('21〜30F は APPROPRIATE[30].lv を返す', () => {
    expect(getRecommendedLevel(21)).toBe(APPROPRIATE[30].lv);
    expect(getRecommendedLevel(30)).toBe(APPROPRIATE[30].lv);
  });

  test('91〜100F は APPROPRIATE[100].lv を返す', () => {
    expect(getRecommendedLevel(91)).toBe(APPROPRIATE[100].lv);
    expect(getRecommendedLevel(100)).toBe(APPROPRIATE[100].lv);
  });

  test('100F を超える深層は APPROPRIATE[100].lv で頭打ち（無限タワー対応）', () => {
    expect(getRecommendedLevel(101)).toBe(APPROPRIATE[100].lv);
    expect(getRecommendedLevel(200)).toBe(APPROPRIATE[100].lv);
    expect(getRecommendedLevel(500)).toBe(APPROPRIATE[100].lv);
    expect(getRecommendedLevel(9999)).toBe(APPROPRIATE[100].lv);
  });
});

describe('levelDecay', () => {
  // 1F の推奨レベルは APPROPRIATE[10].lv = 12
  const depth = 1;
  const rec = APPROPRIATE[10].lv; // 12

  test('excess 0（推奨内）→ 1.00', () => {
    expect(levelDecay(rec, depth)).toBe(1.0);
  });

  test('excess 5 → 0.33', () => {
    expect(levelDecay(rec + 5, depth)).toBeCloseTo(0.33, 10);
  });

  test('excess 10 → 0.20', () => {
    expect(levelDecay(rec + 10, depth)).toBeCloseTo(0.2, 10);
  });

  test('excess 15 → 0.10（下限）', () => {
    expect(levelDecay(rec + 15, depth)).toBeCloseTo(0.1, 10);
  });

  test('excess 20 → 0.10（下限維持）', () => {
    expect(levelDecay(rec + 20, depth)).toBeCloseTo(0.1, 10);
  });

  test('excess 100 → 0.10（下限維持）', () => {
    expect(levelDecay(rec + 100, depth)).toBeCloseTo(0.1, 10);
  });

  test('excess 7.5 → 線形補間（≈ 0.265）', () => {
    // 5→0.33, 10→0.20: t = (7.5 - 5) / (10 - 5) = 0.5, y = 0.33 + 0.5*(0.20 - 0.33) = 0.265
    expect(levelDecay(rec + 7.5, depth)).toBeCloseTo(0.265, 5);
  });

  test('推奨レベルより低い場合も 1.00（下限で減衰なし）', () => {
    expect(levelDecay(rec - 3, depth)).toBe(1.0);
  });

  test('BOSS_INTERVAL の境界で APPROPRIATE を正しく参照する', () => {
    // 10F ボス → APPROPRIATE[10].lv
    const recAt10 = APPROPRIATE[10].lv;
    expect(levelDecay(recAt10, 10)).toBe(1.0);
    expect(levelDecay(recAt10 + 5, 10)).toBeCloseTo(0.33, 10);

    // 11F → APPROPRIATE[20].lv
    const recAt11 = APPROPRIATE[20].lv;
    expect(levelDecay(recAt11, 11)).toBe(1.0);
  });

  test('BOSS_INTERVAL 定数が正しく使われている（10階刻み）', () => {
    expect(BALANCE.BOSS_INTERVAL).toBe(10);
  });
});
