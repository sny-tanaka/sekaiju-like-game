/**
 * checkpoint 階の「下り階段（stairsUp = 深く進む方向）」で
 * 帰還の糸を消費せずに拠点へ戻れるかどうかを判定する純粋関数。
 *
 * 判定条件:
 * - 現在地のセルが stairsUp（コード上の "stairsUp" = 概念上の「下り階段・深く進む方向」）
 * - かつ currentDepth が unlockedCheckpoints に含まれる
 *
 * Note: stairsUp = 深く進む方向（UI表示は「▼ 下り階段」）
 *       stairsDown = 浅く戻る方向（UI表示は「▲ 上り階段」）
 */
export function canWarpReturnFromHere(
  unlockedCheckpoints: number[],
  currentDepth: number,
  stairKind: 'stairsUp' | 'stairsDown' | null
): boolean {
  return stairKind === 'stairsUp' && unlockedCheckpoints.includes(currentDepth);
}

/**
 * 探索メニューの「帰還の糸」ボタンを disabled にすべきか判定する純粋関数。
 * 所持数が 0 以下なら disabled。
 */
export function isReturnThreadDisabled(stockCount: number): boolean {
  return stockCount <= 0;
}
