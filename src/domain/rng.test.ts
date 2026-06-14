import { createRng, restoreRng } from '@/domain/rng';

describe('rng', () => {
  test('同一シードからは同一の数列が再現される', () => {
    const a = createRng(12345);
    const b = createRng(12345);
    const seqA = Array.from({ length: 10 }, () => a.next());
    const seqB = Array.from({ length: 10 }, () => b.next());
    expect(seqA).toEqual(seqB);
  });

  test('異なるシードは異なる数列になる', () => {
    const a = createRng(1);
    const b = createRng(2);
    expect(a.next()).not.toEqual(b.next());
  });

  test('next() は [0,1) の範囲を返す', () => {
    const r = createRng(999);
    for (let i = 0; i < 1000; i++) {
      const v = r.next();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  test('int(n) は 0..n-1 を返す', () => {
    const r = createRng(7);
    for (let i = 0; i < 1000; i++) {
      const v = r.int(6);
      expect(Number.isInteger(v)).toBe(true);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(6);
    }
  });

  test('range(min,max) は両端を含む', () => {
    const r = createRng(42);
    let sawMin = false;
    let sawMax = false;
    for (let i = 0; i < 2000; i++) {
      const v = r.range(3, 5);
      expect(v).toBeGreaterThanOrEqual(3);
      expect(v).toBeLessThanOrEqual(5);
      if (v === 3) sawMin = true;
      if (v === 5) sawMax = true;
    }
    expect(sawMin).toBe(true);
    expect(sawMax).toBe(true);
  });

  test('pick は配列の要素を返し、空配列では例外', () => {
    const r = createRng(3);
    expect(['a', 'b', 'c']).toContain(r.pick(['a', 'b', 'c']));
    expect(() => r.pick([])).toThrow();
  });

  test('fork はラベルごとに独立・決定論的な子 Rng を返す', () => {
    const master = createRng(1000);
    const floor5a = master.fork('floor:5');
    const floor5b = master.fork('floor:5');
    const floor6 = master.fork('floor:6');

    // 同じラベル → 同じ数列
    expect(floor5a.next()).toEqual(floor5b.next());
    // 異なるラベル → 異なる数列（極めて高確率）
    expect(master.fork('floor:5').next()).not.toEqual(floor6.next());
  });

  test('fork は親の消費量に依存しない', () => {
    const m1 = createRng(2024);
    const child1 = m1.fork('battle:1');

    const m2 = createRng(2024);
    m2.next();
    m2.next();
    m2.next();
    const child2 = m2.fork('battle:1');

    expect(child1.next()).toEqual(child2.next());
  });

  test('state を保存して restoreRng で続きを再現できる', () => {
    const r = createRng(555);
    r.next();
    r.next();
    const saved = r.state;
    const expected = [r.next(), r.next(), r.next()];

    const restored = restoreRng(saved);
    const actual = [restored.next(), restored.next(), restored.next()];
    expect(actual).toEqual(expected);
  });
});
