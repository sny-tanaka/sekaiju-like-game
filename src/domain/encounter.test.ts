import { GAUGE_LEVELS, gaugeLevel, initEncounter, onStep } from '@/domain/encounter';
import { createRng } from '@/domain/rng';

describe('encounter', () => {
  test('initEncounter は 8..16 を返す（decay なし）', () => {
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

  describe('encounterRateDecay オプション', () => {
    test('decay 0.5 で歩数が約 2 倍になる', () => {
      // 同じシードで decay なしと decay=0.5 を比較
      const seed = 42;
      const r1 = createRng(seed);
      const r2 = createRng(seed);
      const normal = initEncounter(r1);
      const halved = initEncounter(r2, { encounterRateDecay: 0.5 });
      // round(base / 0.5) = round(base * 2)
      expect(halved).toBe(Math.round(normal * 2));
    });

    test('decay 0.1 では下限 0.25 が適用され歩数が 4 倍止まりになる', () => {
      const seed = 99;
      const r1 = createRng(seed);
      const r2 = createRng(seed);
      const normal = initEncounter(r1);
      // effective = max(0.25, 0.1) = 0.25 → round(base / 0.25) = round(base * 4)
      const floored = initEncounter(r2, { encounterRateDecay: 0.1 });
      expect(floored).toBe(Math.round(normal / 0.25));
    });

    test('decay 1.0（減衰なし）は opts 未指定と同じ結果', () => {
      const seed = 7;
      const r1 = createRng(seed);
      const r2 = createRng(seed);
      const without = initEncounter(r1);
      const withOne = initEncounter(r2, { encounterRateDecay: 1.0 });
      expect(withOne).toBe(without);
    });
  });
});
