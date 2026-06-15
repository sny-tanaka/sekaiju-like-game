import { ENEMIES } from '@/data/enemies';
import { enemyLapForDepth, poolBandForDepth, rollEncounter } from '@/domain/encounterTable';
import { createRng } from '@/domain/rng';

describe('帯の循環と周回（[06 §3]）', () => {
  const top = Math.max(...Object.values(ENEMIES).map((e) => e.tierBand)); // 現状 4（tier0〜4）

  test('1周目（1〜50階）は帯がそのまま', () => {
    expect(poolBandForDepth(1)).toBe(0);
    expect(poolBandForDepth(15)).toBe(1);
    expect(poolBandForDepth(50)).toBe(4);
    expect(enemyLapForDepth(1)).toBe(1);
    expect(enemyLapForDepth(50)).toBe(1);
  });

  test('最深帯より深い階は全帯を循環し、周回数が増える', () => {
    // top=4 想定: 51-60階=band5→tier0(2周目)、61-70=band6→tier1、…
    expect(poolBandForDepth(51)).toBe(0);
    expect(poolBandForDepth(61)).toBe(1);
    expect(enemyLapForDepth(51)).toBe(2);
    expect(enemyLapForDepth(61)).toBe(2);
    // 3周目
    expect(poolBandForDepth(10 * (top + 1) * 2 + 1)).toBe(0);
    expect(enemyLapForDepth(10 * (top + 1) * 2 + 1)).toBe(3);
  });

  test('深い階でも雑魚プールが空にならない（循環で常に出現）', () => {
    expect(rollEncounter(75, createRng(3)).length).toBeGreaterThanOrEqual(1);
    expect(rollEncounter(140, createRng(3)).length).toBeGreaterThanOrEqual(1);
  });
});

describe('rollEncounter', () => {
  test('第1帯では雑魚を1〜3体抽選（決定論）', () => {
    const a = rollEncounter(1, createRng(1));
    const b = rollEncounter(1, createRng(1));
    expect(a).toEqual(b);
    expect(a.length).toBeGreaterThanOrEqual(1);
    expect(a.length).toBeLessThanOrEqual(3);
    expect(a.every((id) => id.startsWith('enemy_') && !id.startsWith('enemy_boss'))).toBe(true);
  });

  test('ボス階でもランダムは雑魚のみ（ボスは固定遭遇でランダムに出さない）', () => {
    const enc = rollEncounter(10, createRng(5));
    expect(enc.every((id) => !id.startsWith('enemy_boss'))).toBe(true);
  });
});
