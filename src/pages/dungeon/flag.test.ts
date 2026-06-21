// ============================================================================
// flag.test.ts — ダンジョン旗システムのロジック単体テスト（issue #80）
// ============================================================================

import { describe, expect, test } from 'vitest';

import { isAutoMoveDisabled, nextFlagOnCellTap, shouldClearFlagOnSaveChange } from './flag';

// ---------------------------------------------------------------------------
// nextFlagOnCellTap
// ---------------------------------------------------------------------------

describe('nextFlagOnCellTap', () => {
  test('旗が未設置（null）の状態でタップ → 新しい旗を設置', () => {
    expect(nextFlagOnCellTap(null, { x: 3, y: 5 })).toEqual({ x: 3, y: 5 });
  });

  test('既存の旗と同じマスをタップ → 旗を解除（null）', () => {
    const current = { x: 3, y: 5 };
    expect(nextFlagOnCellTap(current, { x: 3, y: 5 })).toBeNull();
  });

  test('既存の旗と異なるマスをタップ → 旗を上書き', () => {
    const current = { x: 3, y: 5 };
    expect(nextFlagOnCellTap(current, { x: 7, y: 2 })).toEqual({ x: 7, y: 2 });
  });

  test('x のみ異なるマスをタップ → 上書き（y が同じでも同マスとみなさない）', () => {
    const current = { x: 3, y: 5 };
    expect(nextFlagOnCellTap(current, { x: 4, y: 5 })).toEqual({ x: 4, y: 5 });
  });

  test('y のみ異なるマスをタップ → 上書き（x が同じでも同マスとみなさない）', () => {
    const current = { x: 3, y: 5 };
    expect(nextFlagOnCellTap(current, { x: 3, y: 6 })).toEqual({ x: 3, y: 6 });
  });

  test('旗が (0,0) の場合、同じ (0,0) をタップ → 解除', () => {
    expect(nextFlagOnCellTap({ x: 0, y: 0 }, { x: 0, y: 0 })).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// isAutoMoveDisabled
// ---------------------------------------------------------------------------

describe('isAutoMoveDisabled', () => {
  test('旗が null（未設置）→ disabled', () => {
    expect(isAutoMoveDisabled(null, false)).toBe(true);
  });

  test('旗があり、移動中でない → 有効（false）', () => {
    expect(isAutoMoveDisabled({ x: 3, y: 5 }, false)).toBe(false);
  });

  test('旗があり、移動中 → disabled', () => {
    expect(isAutoMoveDisabled({ x: 3, y: 5 }, true)).toBe(true);
  });

  test('旗が null かつ移動中 → disabled', () => {
    expect(isAutoMoveDisabled(null, true)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// shouldClearFlagOnSaveChange
// ---------------------------------------------------------------------------

describe('shouldClearFlagOnSaveChange', () => {
  test('両方 null（ダイブ中でない）→ クリア不要', () => {
    expect(shouldClearFlagOnSaveChange(null, null)).toBe(false);
  });

  test('undefined → undefined → クリア不要', () => {
    expect(shouldClearFlagOnSaveChange(undefined, undefined)).toBe(false);
  });

  test('ダイブ中 → null（帰還の糸で拠点へ）→ クリアすべき', () => {
    expect(shouldClearFlagOnSaveChange({ depth: 3 }, null)).toBe(true);
  });

  test('ダイブ中 → undefined（帰還）→ クリアすべき', () => {
    expect(shouldClearFlagOnSaveChange({ depth: 3 }, undefined)).toBe(true);
  });

  test('null → ダイブ中（ダイブ開始）→ クリア不要', () => {
    expect(shouldClearFlagOnSaveChange(null, { depth: 1 })).toBe(false);
  });

  test('depth が同じ（同階層内移動）→ クリア不要', () => {
    expect(shouldClearFlagOnSaveChange({ depth: 3 }, { depth: 3 })).toBe(false);
  });

  test('depth が増加（goDeeper: 階段を上る）→ クリアすべき', () => {
    expect(shouldClearFlagOnSaveChange({ depth: 3 }, { depth: 4 })).toBe(true);
  });

  test('depth が減少（goShallower: 階段を下る）→ クリアすべき', () => {
    expect(shouldClearFlagOnSaveChange({ depth: 3 }, { depth: 2 })).toBe(true);
  });

  test('depth 1 → depth 2（1階から2階へ）→ クリアすべき', () => {
    expect(shouldClearFlagOnSaveChange({ depth: 1 }, { depth: 2 })).toBe(true);
  });
});
