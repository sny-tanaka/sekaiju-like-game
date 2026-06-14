import { GAUGE_LEVELS, gaugeLevel, initEncounter, onStep } from '@/domain/encounter';
import { createRng } from '@/domain/rng';

describe('encounter', () => {
  test('initEncounter は 8..16 を返す', () => {
    const r = createRng(1);
    for (let i = 0; i < 200; i++) {
      const v = initEncounter(r);
      expect(v).toBeGreaterThanOrEqual(8);
      expect(v).toBeLessThanOrEqual(16);
    }
  });

  test('歩くごとに残り歩数が減り、0でエンカウント発生＆リセット', () => {
    const r = createRng(5);
    const steps = 3;
    let res = onStep(steps, r);
    expect(res.triggered).toBe(false);
    expect(res.stepsUntilEncounter).toBe(2);

    res = onStep(res.stepsUntilEncounter, r); // 2 -> 1
    expect(res.triggered).toBe(false);
    res = onStep(res.stepsUntilEncounter, r); // 1 -> 0 で発生
    expect(res.triggered).toBe(true);
    // リセットされ 8..16 に戻る
    expect(res.stepsUntilEncounter).toBeGreaterThanOrEqual(8);
  });

  test('満タン前は安全（triggered=false が続く）', () => {
    const r = createRng(9);
    let steps = initEncounter(r);
    let triggers = 0;
    for (let i = 0; i < steps - 1; i++) {
      const res = onStep(steps, r);
      steps = res.stepsUntilEncounter;
      if (res.triggered) triggers++;
    }
    expect(triggers).toBe(0);
  });

  test('gaugeLevel は 0..5 で、残りが少ないほど大きい', () => {
    expect(gaugeLevel(16)).toBe(0);
    expect(gaugeLevel(1)).toBe(GAUGE_LEVELS);
    expect(gaugeLevel(8)).toBeGreaterThan(0);
    expect(gaugeLevel(8)).toBeLessThan(GAUGE_LEVELS);
  });
});
