import { findEventCell, generateFloor } from '@/domain/generateFloor';
import { createRng } from '@/domain/rng';
import type { Dir, FloorMaster } from '@/domain/types';

const DELTA: Record<Dir, { dx: number; dy: number }> = {
  N: { dx: 0, dy: -1 },
  E: { dx: 1, dy: 0 },
  S: { dx: 0, dy: 1 },
  W: { dx: -1, dy: 0 },
};

/** 入口から到達できるセル数を数える。 */
function reachableCount(floor: FloorMaster, sx: number, sy: number): number {
  const seen = new Set<string>([`${sx},${sy}`]);
  const stack = [{ x: sx, y: sy }];
  while (stack.length) {
    const { x, y } = stack.pop()!;
    for (const dir of ['N', 'E', 'S', 'W'] as Dir[]) {
      if (floor.cells[y][x].walls[dir]) continue;
      const nx = x + DELTA[dir].dx;
      const ny = y + DELTA[dir].dy;
      const key = `${nx},${ny}`;
      if (!seen.has(key)) {
        seen.add(key);
        stack.push({ x: nx, y: ny });
      }
    }
  }
  return seen.size;
}

describe('generateFloor', () => {
  test('同一シードからは同一の階が生成される（決定論）', () => {
    const a = generateFloor(1, createRng(42).fork('floor:1'));
    const b = generateFloor(1, createRng(42).fork('floor:1'));
    expect(a).toEqual(b);
  });

  test('全セルが入口から到達可能（孤立なし）', () => {
    const floor = generateFloor(3, createRng(100).fork('floor:3'));
    const entrance = findEventCell(floor, 'stairsDown')!;
    expect(reachableCount(floor, entrance.x, entrance.y)).toBe(floor.width * floor.height);
  });

  test('壁は隣接セルと整合する（A.E === B.W 等）', () => {
    const floor = generateFloor(2, createRng(7).fork('floor:2'));
    for (let y = 0; y < floor.height; y++) {
      for (let x = 0; x < floor.width; x++) {
        const c = floor.cells[y][x];
        if (x + 1 < floor.width) {
          expect(c.walls.E).toBe(floor.cells[y][x + 1].walls.W);
        }
        if (y + 1 < floor.height) {
          expect(c.walls.S).toBe(floor.cells[y + 1][x].walls.N);
        }
      }
    }
  });

  test('外周は壁で閉じている', () => {
    const floor = generateFloor(1, createRng(1).fork('floor:1'));
    for (let x = 0; x < floor.width; x++) {
      expect(floor.cells[0][x].walls.N).toBe(true);
      expect(floor.cells[floor.height - 1][x].walls.S).toBe(true);
    }
    for (let y = 0; y < floor.height; y++) {
      expect(floor.cells[y][0].walls.W).toBe(true);
      expect(floor.cells[y][floor.width - 1].walls.E).toBe(true);
    }
  });

  test('入口（stairsDown）と出口（stairsUp）が別セルに存在する', () => {
    const floor = generateFloor(1, createRng(55).fork('floor:1'));
    const down = findEventCell(floor, 'stairsDown')!;
    const up = findEventCell(floor, 'stairsUp')!;
    expect(down).not.toBeNull();
    expect(up).not.toBeNull();
    expect(`${down.x},${down.y}`).not.toBe(`${up.x},${up.y}`);
  });

  test('深いほど広くなる（上限 25）', () => {
    expect(generateFloor(1, createRng(1).fork('a')).width).toBe(15);
    expect(generateFloor(50, createRng(1).fork('b')).width).toBe(25);
  });
});
