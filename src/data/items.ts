import type { ItemId, ItemMaster } from '@/domain/types';

// ============================================================================
// アイテムマスター（[04]）。Phase 0 は最小限の消耗品のみ。
// ============================================================================

export const ITEMS: Record<ItemId, ItemMaster> = {
  item_potion: { id: 'item_potion', name: 'やくそう', description: 'HP を少し回復する。' },
  item_tp_herb: { id: 'item_tp_herb', name: 'まほうのは', description: 'TP を少し回復する。' },
  item_return_thread: {
    id: 'item_return_thread',
    name: '帰還の糸',
    description: '使用すると拠点へ帰還する。',
  },
};
