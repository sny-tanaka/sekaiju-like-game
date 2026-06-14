import type { ItemId, ItemMaster } from '@/domain/types';

// ============================================================================
// アイテムマスター（[04]）。Phase 3 は最小限の消耗品＋売却用素材。
// 消費アイテムの効果は SkillEffectDef を再利用（[03 §5]）。
// ============================================================================

export const ITEMS: Record<ItemId, ItemMaster> = {
  item_potion: {
    id: 'item_potion',
    name: 'やくそう',
    description: 'HP を 30 回復する。',
    category: 'consumable',
    buyPrice: 30,
    useContext: ['battle', 'field'],
    effects: [{ kind: 'heal', amount: () => 30 }],
  },
  item_hi_potion: {
    id: 'item_hi_potion',
    name: 'よいやくそう',
    description: 'HP を 80 回復する。',
    category: 'consumable',
    buyPrice: 90,
    useContext: ['battle', 'field'],
    effects: [{ kind: 'heal', amount: () => 80 }],
  },
  item_tp_herb: {
    id: 'item_tp_herb',
    name: 'まほうのは',
    description: 'TP を 15 回復する。',
    category: 'consumable',
    buyPrice: 40,
    useContext: ['battle', 'field'],
    effects: [{ kind: 'restoreTp', amount: () => 15 }],
  },
  item_return_thread: {
    id: 'item_return_thread',
    name: '帰還の糸',
    description: '使用すると拠点へ帰還する（探索中のみ）。',
    category: 'consumable',
    buyPrice: 50,
    useContext: ['field'],
    // 帰還処理は使用側で item id 判定して実行（special 効果）
  },
  // 売却用素材（ドロップ等。Phase 4 で生産に使用）
  item_slime_jelly: {
    id: 'item_slime_jelly',
    name: 'スライムゼリー',
    description: 'スライムの素材。売却できる。',
    category: 'material',
    buyPrice: 0,
  },
};

/** 売却価格（買値の半額・切り捨て。0=売却不可だが素材は別途最低額）。 */
export function sellPrice(item: ItemMaster): number {
  if (item.category === 'material') return 8; // 素材の一律売却額（暫定）
  return Math.floor(item.buyPrice / 2);
}
