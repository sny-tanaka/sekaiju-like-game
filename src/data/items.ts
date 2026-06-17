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
    maxStack: 30,
    useContext: ['battle', 'field'],
    effects: [{ kind: 'heal', amount: () => 30 }],
  },
  item_hi_potion: {
    id: 'item_hi_potion',
    name: 'よいやくそう',
    description: 'HP を 80 回復する。',
    category: 'consumable',
    buyPrice: 90,
    maxStack: 15,
    useContext: ['battle', 'field'],
    effects: [{ kind: 'heal', amount: () => 80 }],
  },
  item_tp_herb: {
    id: 'item_tp_herb',
    name: 'まほうのは',
    description: 'TP を最大値の10%回復する。',
    category: 'consumable',
    buyPrice: 20,
    maxStack: 30,
    useContext: ['battle', 'field'],
    effects: [{ kind: 'restoreTp', amount: () => 0, ratio: 0.1 }],
  },
  item_tp_herb_mid: {
    id: 'item_tp_herb_mid',
    name: 'よいまほうのは',
    description: 'TP を最大値の20%回復する。',
    category: 'consumable',
    buyPrice: 60,
    maxStack: 15,
    useContext: ['battle', 'field'],
    effects: [{ kind: 'restoreTp', amount: () => 0, ratio: 0.2 }],
  },
  item_tp_herb_hi: {
    id: 'item_tp_herb_hi',
    name: 'とくぶつまほうのは',
    description: 'TP を最大値の30%回復する。',
    category: 'consumable',
    buyPrice: 140,
    maxStack: 8,
    useContext: ['battle', 'field'],
    effects: [{ kind: 'restoreTp', amount: () => 0, ratio: 0.3 }],
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

  // ============================================================================
  // Phase 6-3: 帯（tier）ドロップ素材。売ると対応装備がショップに並ぶ（[04 §8]）。
  // ============================================================================
  // tier0（森/洞窟）
  item_mat_t0_soft_pelt: {
    id: 'item_mat_t0_soft_pelt',
    name: 'やわらかな毛皮',
    description: '森の小動物の素材。売ると新しい装備が並ぶことがある。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t0_spore_cap: {
    id: 'item_mat_t0_spore_cap',
    name: 'ひかるかさ',
    description: '光るきのこの素材。売ると新しい装備が並ぶことがある。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t0_faint_ember: {
    id: 'item_mat_t0_faint_ember',
    name: 'かすかな残り火',
    description: '亡霊が残した素材。売ると新しい装備が並ぶことがある。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t0_great_antler: {
    id: 'item_mat_t0_great_antler',
    name: 'りっぱな角',
    description: '森の大型獣の素材。売ると新しい装備が並ぶことがある。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t0_chitin_plate: {
    id: 'item_mat_t0_chitin_plate',
    name: '硬い甲殻板',
    description: '洞窟の蟲の素材。売ると新しい装備が並ぶことがある。',
    category: 'material',
    buyPrice: 0,
  },
  // tier1（岩山/獣）
  item_mat_t1_coarse_hide: {
    id: 'item_mat_t1_coarse_hide',
    name: 'あらい獣皮',
    description: '山岳の獣の素材。売ると新しい装備が並ぶことがある。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t1_stone_scale: {
    id: 'item_mat_t1_stone_scale',
    name: '岩のうろこ',
    description: '岩トカゲ類の素材。売ると新しい装備が並ぶことがある。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t1_sharp_feather: {
    id: 'item_mat_t1_sharp_feather',
    name: 'するどい風切羽',
    description: '高地の猛禽の素材。売ると新しい装備が並ぶことがある。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t1_ogre_fang: {
    id: 'item_mat_t1_ogre_fang',
    name: 'オーガの牙',
    description: '岩のオーガの素材。売ると強めの装備が並ぶことがある。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t1_drake_horn: {
    id: 'item_mat_t1_drake_horn',
    name: '竜トカゲの角',
    description: 'マグマの竜トカゲの素材。売ると強めの装備が並ぶことがある。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t1_lord_pelt: {
    id: 'item_mat_t1_lord_pelt',
    name: '猿王の毛皮',
    description: '山嶺の大猿王の素材。売ると強力な装備が並ぶ。',
    category: 'material',
    buyPrice: 0,
  },
  // tier2（氷雪）
  item_mat_t2_frost_pelt: {
    id: 'item_mat_t2_frost_pelt',
    name: '霜降りの毛皮',
    description: '氷雪の獣の毛皮。売ると新しい装備が並ぶことがある。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t2_ice_crystal: {
    id: 'item_mat_t2_ice_crystal',
    name: '凍てつく結晶',
    description: '溶けない氷の結晶。売ると新しい装備が並ぶことがある。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t2_chill_core: {
    id: 'item_mat_t2_chill_core',
    name: '冷気の核',
    description: '氷霊から採れる冷気の核。売ると新しい装備が並ぶことがある。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t2_monarch_diadem: {
    id: 'item_mat_t2_monarch_diadem',
    name: '女王の氷冠',
    description: '氷晶の女王の冠。極めて貴重な素材。',
    category: 'material',
    buyPrice: 0,
  },
  // tier3（雷雨/嵐）
  item_mat_t3_charged_hide: {
    id: 'item_mat_t3_charged_hide',
    name: '帯電した獣皮',
    description: '雷を帯びた獣の皮。売ると新しい装備が並ぶことがある。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t3_storm_feather: {
    id: 'item_mat_t3_storm_feather',
    name: '嵐鳥の風切羽',
    description: '嵐をまとう鳥の羽。売ると新しい装備が並ぶことがある。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t3_thunder_carapace: {
    id: 'item_mat_t3_thunder_carapace',
    name: '雷甲の外殻',
    description: '放電する虫や結晶の外殻。売ると新しい装備が並ぶことがある。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t3_sovereign_horn: {
    id: 'item_mat_t3_sovereign_horn',
    name: '覇王の雷角',
    description: '雷霆の覇王の角。至高の素材。',
    category: 'material',
    buyPrice: 0,
  },
  // tier4（瘴気/不死/機械）
  item_mat_t4_rotflesh: {
    id: 'item_mat_t4_rotflesh',
    name: '腐肉のかけら',
    description: '瘴気に侵され朽ちた肉片。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t4_grave_dust: {
    id: 'item_mat_t4_grave_dust',
    name: '墓場の灰塵',
    description: '墓土と骨の粉。不死の素材。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t4_cursed_marrow: {
    id: 'item_mat_t4_cursed_marrow',
    name: '呪詛の髄液',
    description: '呪われた骸から滲む粘液。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t4_toxic_scale: {
    id: 'item_mat_t4_toxic_scale',
    name: '毒鱗の粉',
    description: '瘴気蟲の猛毒の鱗粉。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t4_spectral_ash: {
    id: 'item_mat_t4_spectral_ash',
    name: '亡霊の燐灰',
    description: '鬼火が遺す青白い灰。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t4_steel_gear: {
    id: 'item_mat_t4_steel_gear',
    name: '鋼の歯車',
    description: '機械兵の精密な駆動部品。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t4_corroded_plate: {
    id: 'item_mat_t4_corroded_plate',
    name: '腐食した装甲板',
    description: '瘴気で錆びた重装甲の破片。',
    category: 'material',
    buyPrice: 0,
  },
  item_mat_t4_sovereign_crown: {
    id: 'item_mat_t4_sovereign_crown',
    name: '腐王の冠',
    description: '瘴気を統べる者の朽ちた王冠。',
    category: 'material',
    buyPrice: 0,
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
