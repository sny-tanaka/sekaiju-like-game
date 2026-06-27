import { findEventCell } from '@/domain/generateFloor';
import type { FloorMaster } from '@/domain/types';

/**
 * 未踏の下り階段 (= 深層方向, kind: 'stairsUp') の座標を返す。
 * 下り階段が探索済み or 存在しない場合は null。
 * 「マップ上で霧の中でも下り階段アイコンだけは表示する」のための判定。
 */
export function shouldShowUnexploredStairs(
  floor: FloorMaster,
  exploredSet: Set<string>
): { x: number; y: number } | null {
  const c = findEventCell(floor, 'stairsUp');
  if (!c) return null;
  if (exploredSet.has(`${c.x},${c.y}`)) return null;
  return c;
}
