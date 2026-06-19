import type { ItemId } from '@/domain/types';

// アイテム/装備スプライト画像（ファイルは public/sprites/items/<id>.png）。
// 装備 (equip_*) と アイテム (item_*) のどちらの ItemId も同じ場所に配置されている。
export const itemSpriteUrl = (id: ItemId): string =>
  `${import.meta.env.BASE_URL}sprites/items/${id}.png`;
