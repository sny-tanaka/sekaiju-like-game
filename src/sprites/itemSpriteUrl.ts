import { ITEMS } from '@/data/items';
import type { ItemId } from '@/domain/types';

// アイテム/装備スプライト画像（ファイルは src/assets/items/<id>.png）。
// 装備 (equip_*) と アイテム (item_*) のどちらも同じ場所に配置されている。
const ITEM_SPRITES = import.meta.glob('/src/assets/items/*.png', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

export const itemSpriteUrl = (id: ItemId): string | null => {
  // v3.0.0 §9: 秘宝（collectible）は個別画像を持たず、共通の秘宝アイコンを使う。
  // ITEMS マスタの collectible フラグで判定する（item_col_ prefix 前提を廃止）。
  if (ITEMS[id]?.collectible === true) {
    return ITEM_SPRITES['/src/assets/items/collection_treasure.png'] ?? null;
  }
  const key = `/src/assets/items/${id}.png`;
  return ITEM_SPRITES[key] ?? null;
};
