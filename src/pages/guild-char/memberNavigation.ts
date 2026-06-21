/** 前後の団員 ID を返す。1 人のみ・見つからない場合は null。 */
export function getSiblingCharIds(
  memberIds: string[],
  currentId: string
): { prev: string | null; next: string | null; hasSiblings: boolean } {
  if (memberIds.length <= 1) {
    return { prev: null, next: null, hasSiblings: false };
  }
  const idx = memberIds.indexOf(currentId);
  if (idx < 0) {
    return { prev: null, next: null, hasSiblings: false };
  }
  const len = memberIds.length;
  return {
    prev: memberIds[(idx - 1 + len) % len],
    next: memberIds[(idx + 1) % len],
    hasSiblings: true,
  };
}
