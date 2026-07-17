import { describe, expect, test } from 'vitest';

import { itemSpriteUrl } from '@/sprites/itemSpriteUrl';

// ============================================================================
// itemSpriteUrl — 秘宝（collectible）判定は ITEMS マスタの collectible フラグで行う
// （item_col_ prefix 判定から移行。B5）。
// ============================================================================

describe('itemSpriteUrl', () => {
  test('collectible: true のアイテムは共通の秘宝アイコン（collection_treasure）を返す', () => {
    const url = itemSpriteUrl('item_col_slime');
    expect(url).not.toBeNull();
    expect(url).toContain('collection_treasure');
  });

  test('collectible ではない通常アイテムは自身の ID ベースの画像を返す（存在すれば）', () => {
    const collectibleUrl = itemSpriteUrl('item_col_slime');
    const normalUrl = itemSpriteUrl('item_potion');
    // 通常アイテムは秘宝共通アイコンとは異なる（None の場合もあり得るが、秘宝アイコンとは一致しない）。
    expect(normalUrl).not.toBe(collectibleUrl);
  });
});
