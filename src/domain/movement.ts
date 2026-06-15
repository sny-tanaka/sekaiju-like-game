import type { Dir, FloorMaster } from '@/domain/types';

// ============================================================================
// 探索の移動・回転（純関数）。1歩=1ステップの確定型（[07 §3.1]）。
// ============================================================================

export const DELTA: Record<Dir, { dx: number; dy: number }> = {
  N: { dx: 0, dy: -1 },
  E: { dx: 1, dy: 0 },
  S: { dx: 0, dy: 1 },
  W: { dx: -1, dy: 0 },
};

const CW: Dir[] = ['N', 'E', 'S', 'W']; // 時計回り

export function turnRight(dir: Dir): Dir {
  return CW[(CW.indexOf(dir) + 1) % 4];
}
export function turnLeft(dir: Dir): Dir {
  return CW[(CW.indexOf(dir) + 3) % 4];
}
export function turnBack(dir: Dir): Dir {
  return CW[(CW.indexOf(dir) + 2) % 4];
}

const inBounds = (x: number, y: number, floor: FloorMaster) =>
  x >= 0 && y >= 0 && x < floor.width && y < floor.height;

/** その方向へ進めるか（壁が無く・場内・進入可能なセル）。 */
export function canMove(floor: FloorMaster, x: number, y: number, dir: Dir): boolean {
  if (floor.cells[y][x].walls[dir]) return false;
  const nx = x + DELTA[dir].dx;
  const ny = y + DELTA[dir].dy;
  if (!inBounds(nx, ny, floor)) return false;
  return floor.cells[ny][nx].passable;
}

/** 1歩移動した座標を返す。進めなければ null。 */
export function step(
  floor: FloorMaster,
  pos: { x: number; y: number },
  dir: Dir
): { x: number; y: number } | null {
  if (!canMove(floor, pos.x, pos.y, dir)) return null;
  return { x: pos.x + DELTA[dir].dx, y: pos.y + DELTA[dir].dy };
}

/** セルから出られる方向の一覧（視界・自動マップの開口判定に使う）。 */
export function openDirs(floor: FloorMaster, x: number, y: number): Dir[] {
  return (['N', 'E', 'S', 'W'] as Dir[]).filter((d) => !floor.cells[y][x].walls[d]);
}

/**
 * from から to への最短経路を「向きの並び」で返す（壁を考慮した BFS。[02 §3]・issue #20）。
 * 同一セルなら空配列、到達不能なら null。タップ移動の自動歩行に使う。
 */
export function pathTo(
  floor: FloorMaster,
  from: { x: number; y: number },
  to: { x: number; y: number }
): Dir[] | null {
  if (from.x === to.x && from.y === to.y) return [];
  if (!inBounds(to.x, to.y, floor) || !floor.cells[to.y][to.x].passable) return null;
  const key = (x: number, y: number) => `${x},${y}`;
  const prev = new Map<string, { x: number; y: number; dir: Dir } | null>();
  prev.set(key(from.x, from.y), null);
  const queue: { x: number; y: number }[] = [{ ...from }];
  while (queue.length > 0) {
    const cur = queue.shift()!;
    for (const d of ['N', 'E', 'S', 'W'] as Dir[]) {
      if (!canMove(floor, cur.x, cur.y, d)) continue;
      const nx = cur.x + DELTA[d].dx;
      const ny = cur.y + DELTA[d].dy;
      const k = key(nx, ny);
      if (prev.has(k)) continue;
      prev.set(k, { x: cur.x, y: cur.y, dir: d });
      if (nx === to.x && ny === to.y) {
        const dirs: Dir[] = [];
        let ck = k;
        for (;;) {
          const p = prev.get(ck);
          if (!p) break;
          dirs.unshift(p.dir);
          ck = key(p.x, p.y);
        }
        return dirs;
      }
      queue.push({ x: nx, y: ny });
    }
  }
  return null;
}
