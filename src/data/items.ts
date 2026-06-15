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
  // 売却用素材（ドロップ。売ると関連装備がショップに並ぶ [04 §8]）
  item_slime_jelly: {
    id: 'item_slime_jelly',
    name: 'スライムゼリー',
    description: 'スライムの素材。売ると新しい装備が並ぶことがある。',
    category: 'material',
    buyPrice: 0,
  },
  item_rat_tail: {
    id: 'item_rat_tail',
    name: 'ねずみのしっぽ',
    description: 'おおねずみの素材。売ると新しい装備が並ぶことがある。',
    category: 'material',
    buyPrice: 0,
  },
  item_bat_wing: {
    id: 'item_bat_wing',
    name: 'コウモリの翼',
    description: 'どうくつコウモリの素材。売ると新しい装備が並ぶことがある。',
    category: 'material',
    buyPrice: 0,
  },
  item_golem_core: {
    id: 'item_golem_core',
    name: 'ゴーレムの核',
    description: '門番のゴーレムの素材。売ると強力な装備が並ぶ。',
    category: 'material',
    buyPrice: 0,
  },
  // 採集素材（[04 §5]・鉱石/採取/伐採）。売却可・鍛冶（4-5b）でも使う。
  item_ore: {
    id: 'item_ore',
    name: '鉄鉱石',
    description: '採掘で得られる鉱石。',
    category: 'material',
    buyPrice: 0,
  },
  item_medic_herb: {
    id: 'item_medic_herb',
    name: '薬の葉',
    description: '採取で得られる薬草。',
    category: 'material',
    buyPrice: 0,
  },
  item_lumber: {
    id: 'item_lumber',
    name: '良質な木材',
    description: '伐採で得られる木材。',
    category: 'material',
    buyPrice: 0,
  },
  // 食材（[04 §6]・探索専用・別枠保管60個・売却不可）。生の食材。
  item_food_fish: {
    id: 'item_food_fish',
    name: '川魚',
    description: '釣りで得た食材。探索中に食べて HP を 25 回復。',
    category: 'food',
    buyPrice: 0,
    useContext: ['field'],
    effects: [{ kind: 'heal', amount: () => 25 }],
  },
  item_food_nuts: {
    id: 'item_food_nuts',
    name: '木の実',
    description: '収穫で得た食材。探索中に食べて TP を 12 回復。',
    category: 'food',
    buyPrice: 0,
    useContext: ['field'],
    effects: [{ kind: 'restoreTp', amount: () => 12 }],
  },
  item_food_meat: {
    id: 'item_food_meat',
    name: '生肉',
    description: '狩猟で得た食材。探索中に食べて HP を 30 回復。',
    category: 'food',
    buyPrice: 0,
    useContext: ['field'],
    effects: [{ kind: 'heal', amount: () => 30 }],
  },
  // 料理（[04 §6]・調理で作る上位食材）。
  item_dish_grilled_fish: {
    id: 'item_dish_grilled_fish',
    name: '焼き魚',
    description: '川魚を焼いた料理。探索中に食べて HP を 70 回復。',
    category: 'food',
    buyPrice: 0,
    useContext: ['field'],
    effects: [{ kind: 'heal', amount: () => 70 }],
  },
  item_dish_nut_platter: {
    id: 'item_dish_nut_platter',
    name: '木の実の盛り合わせ',
    description: '木の実を調理した一品。探索中に食べて TP を 35 回復。',
    category: 'food',
    buyPrice: 0,
    useContext: ['field'],
    effects: [{ kind: 'restoreTp', amount: () => 35 }],
  },
  item_dish_grilled_meat: {
    id: 'item_dish_grilled_meat',
    name: '焼き肉',
    description: '生肉を焼いた料理。探索中に食べて HP を 90 回復。',
    category: 'food',
    buyPrice: 0,
    useContext: ['field'],
    effects: [{ kind: 'heal', amount: () => 90 }],
  },
};

/** 売却価格（買値の半額・切り捨て）。食材は売却不可（0）、素材は一律最低額。 */
export function sellPrice(item: ItemMaster): number {
  if (item.category === 'food') return 0; // 食材・料理は売却不可（[04 §6]）
  if (item.category === 'material') return 8; // 素材の一律売却額（暫定）
  return Math.floor(item.buyPrice / 2);
}

/** 食材・料理か（foodStorage 管理対象）。 */
export function isFood(itemId: ItemId): boolean {
  return ITEMS[itemId]?.category === 'food';
}
