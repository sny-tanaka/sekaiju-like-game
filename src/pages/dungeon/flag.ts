// ============================================================================
// flag.ts — ダンジョン旗システムの純粋関数（issue #80）
// ============================================================================

/** 旗の座標、または未設置（null） */
export type Flag = { x: number; y: number } | null;

/**
 * マスをタップしたときの旗 state 遷移。
 * - 同じマスを再タップ → 旗を解除（null）
 * - 別のマスをタップ → 旗を上書き or 新規設置
 */
export function nextFlagOnCellTap(current: Flag, tapped: { x: number; y: number }): Flag {
  if (current && current.x === tapped.x && current.y === tapped.y) {
    return null; // 同じマス → 解除
  }
  return tapped; // 上書き or 新規
}

/**
 * 「自動移動」ボタンの disabled 判定。
 * - 旗が未設置 → disabled
 * - 自動移動中 → disabled
 */
export function isAutoMoveDisabled(flag: Flag, walking: boolean): boolean {
  return !flag || walking;
}

/**
 * セーブデータの変化によって旗をクリアすべきかを判定。
 * 以下の場合に true を返す:
 * - diveState が null になった（帰還の糸等で拠点へ戻った）
 * - diveState の depth が変わった（階段移動）
 */
export function shouldClearFlagOnSaveChange(
  prevDiveState: { depth: number } | null | undefined,
  nextDiveState: { depth: number } | null | undefined
): boolean {
  // 前も後も拠点にいる（diveState = null）場合はクリア不要
  if (!prevDiveState && !nextDiveState) return false;
  // 帰還の糸等で diveState が null になった
  if (!nextDiveState) return true;
  // 以前は拠点にいて今はダイブ中（ダイブ開始）→ クリア不要
  if (!prevDiveState) return false;
  // depth が変化した（階段移動）
  return prevDiveState.depth !== nextDiveState.depth;
}
