import type { ItemId } from '@/domain/types';

// アイテム/装備スプライト画像（ファイルは src/assets/items/<id>.png）。
// 装備 (equip_*) と アイテム (item_*) のどちらも同じ場所に配置されている。
const ITEM_SPRITES = import.meta.glob('/src/assets/items/*.png', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

export const itemSpriteUrl = (id: ItemId): string | null => {
  const key = `/src/assets/items/${id}.png`;
  return ITEM_SPRITES[key] ?? null;
};
