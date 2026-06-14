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
