import { canMove, turnLeft, turnRight } from '@/domain/movement';
import type { CellEventRef, Dir, FloorMaster } from '@/domain/types';

// ============================================================================
// 擬似3D（ファーストパーソン）用の視界キャスト（純関数）。
// 現在地から向いている方向へ、壁にぶつかるまで（最大 maxDepth マス）の
// 各マスについて「左・右・前の開口」と「セル上のイベント（階段等）」を返す。
// 本物の3Dは使わず、この結果を canvas に簡易投影して描く（FirstPersonView）。
// ============================================================================

export interface ViewSlice {
  x: number;
  y: number;
  /** そのマスから見て、進行方向の左/右に通路があるか。 */
  leftOpen: boolean;
  rightOpen: boolean;
  /** さらに前方へ進めるか（前方に壁が無く場内）。 */
  frontOpen: boolean;
  /** セル上のイベント（階段など。FOE は将来別レイヤーで重ねる）。 */
  event?: CellEventRef;
}

const FORWARD: Record<Dir, { dx: number; dy: number }> = {
  N: { dx: 0, dy: -1 },
  E: { dx: 1, dy: 0 },
  S: { dx: 0, dy: 1 },
  W: { dx: -1, dy: 0 },
};

/**
 * 正面方向の見通しを返す。手前（index 0 = 現在地）から奥の順。
 * 前方が壁でふさがれたマスを最後に含めて打ち切る。
 */
export function castView(
  floor: FloorMaster,
  pos: { x: number; y: number },
  dir: Dir,
  maxDepth = 4
): ViewSlice[] {
  const left = turnLeft(dir);
  const right = turnRight(dir);
  const slices: ViewSlice[] = [];
  let { x, y } = pos;

  for (let k = 0; k < maxDepth; k++) {
    const frontOpen = canMove(floor, x, y, dir);
    slices.push({
      x,
      y,
      leftOpen: !floor.cells[y][x].walls[left],
      rightOpen: !floor.cells[y][x].walls[right],
      frontOpen,
      event: floor.cells[y][x].event,
    });
    if (!frontOpen) break;
    x += FORWARD[dir].dx;
    y += FORWARD[dir].dy;
  }
  return slices;
}
