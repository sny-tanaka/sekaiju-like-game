import { rollEncounter } from '@/domain/encounterTable';
import { createRng } from '@/domain/rng';

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
