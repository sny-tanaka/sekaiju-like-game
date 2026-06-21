import { canWarpReturnFromHere, isReturnThreadDisabled } from './checkpointWarp';

describe('canWarpReturnFromHere', () => {
  test('stairsUp かつ checkpoint 階 → true', () => {
    expect(canWarpReturnFromHere([5, 10, 15], 10, 'stairsUp')).toBe(true);
  });

  test('stairsUp だが checkpoint 階でない → false', () => {
    expect(canWarpReturnFromHere([5, 10, 15], 3, 'stairsUp')).toBe(false);
  });

  test('stairsDown かつ checkpoint 階 → false（下り階段のみ対象）', () => {
    expect(canWarpReturnFromHere([5, 10, 15], 10, 'stairsDown')).toBe(false);
  });

  test('stairKind が null → false', () => {
    expect(canWarpReturnFromHere([5, 10], 5, null)).toBe(false);
  });

  test('unlockedCheckpoints が空 → false', () => {
    expect(canWarpReturnFromHere([], 1, 'stairsUp')).toBe(false);
  });

  test('第1階かつ checkpoint かつ stairsUp → true', () => {
    // 第1階がチェックポイントに入っている場合も同様に動く
    expect(canWarpReturnFromHere([1, 5], 1, 'stairsUp')).toBe(true);
  });
});

describe('isReturnThreadDisabled', () => {
  test('所持数 0 → disabled（true）', () => {
    expect(isReturnThreadDisabled(0)).toBe(true);
  });

  test('所持数 1 → 有効（false）', () => {
    expect(isReturnThreadDisabled(1)).toBe(false);
  });

  test('所持数 3 → 有効（false）', () => {
    expect(isReturnThreadDisabled(3)).toBe(false);
  });

  test('負値 → disabled（true）', () => {
    // 通常ありえないが防御的に
    expect(isReturnThreadDisabled(-1)).toBe(true);
  });
});
