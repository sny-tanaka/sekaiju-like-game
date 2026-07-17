import type { EquipmentMaster, ItemId } from '@/domain/types';

// ============================================================================
// 装備マスター（[04]）。Phase 3 は第1ティア（tier 0）の初級品。
// 装備は素ステではなく戦闘派生値（EquipBonuses）を加算する（[05 §0.2]）。
// buyPrice はショップ価格。売却は半額（shop で算出）。
//
// Phase 6-4 §7.2 リバランス済み:
//   標準武器 atk(tier) = round(8 * 1.62^tier) → T0:8 T1:13 T2:21 T3:34 T4:55 T5:89
//   標準重装 def(tier) = round(8 * 1.55^tier) → T0:8 T1:12 T2:19 T3:30 T4:46 T5:72
//   武器種係数: 斧×1.05/槍×1.0/剣×0.97/杖(mat)×1.0/弓×0.9/拳×0.85
//   防具種係数: 重装 def×1.0,mdf×0.4 / 軽装 def×0.7,mdf×0.55 / 衣 def×0.4,mdf×0.95 / 装飾 def×0.25,mdf×0.25
//   buyPrice(tier) = round(基準価格 * 2.2^tier)
// ============================================================================

export const EQUIPMENT: Record<ItemId, EquipmentMaster> = {
  // --------------------------------------------------------------------------
  // tier 0 装備
  // --------------------------------------------------------------------------
  equip_short_sword: {
    id: 'equip_short_sword',
    name: 'ショートソード',
    slot: 'weapon',
    tier: 0,
    buyPrice: 120, // 基準120, round(120*2.2^0)=120
    weaponType: 'sword',
    bonuses: { atk: 8 }, // round(round(8*1.62^0)*0.97)=round(8*0.97)=8
  },
  equip_iron_spear: {
    id: 'equip_iron_spear',
    name: '鉄の槍',
    slot: 'weapon',
    tier: 0,
    buyPrice: 150, // 基準150
    weaponType: 'spear',
    bonuses: { atk: 8 }, // round(8*1.0)=8
  },
  equip_oak_staff: {
    id: 'equip_oak_staff',
    name: '樫の杖',
    slot: 'weapon',
    tier: 0,
    buyPrice: 150, // 基準150
    weaponType: 'staff',
    bonuses: { mat: 8 }, // round(8*1.0)=8
  },
  equip_short_bow: {
    id: 'equip_short_bow',
    name: 'ショートボウ',
    slot: 'weapon',
    tier: 0,
    buyPrice: 110, // 基準110
    weaponType: 'bow',
    bonuses: { atk: 7 }, // round(8*0.9)=7
  },
  // 拳（拳聖・剣舞士・薬師・狩人向け）
  equip_iron_knuckle: {
    id: 'equip_iron_knuckle',
    name: '鉄甲',
    slot: 'weapon',
    tier: 0,
    buyPrice: 100, // 基準100
    weaponType: 'fist',
    bonuses: { atk: 7 }, // round(8*0.85)=7
  },
  // 斧（戦士向け・重い一撃）
  equip_battle_axe: {
    id: 'equip_battle_axe',
    name: 'バトルアックス',
    slot: 'weapon',
    tier: 0,
    buyPrice: 160, // 基準160
    weaponType: 'axe',
    bonuses: { atk: 8 }, // round(8*1.05)=8
  },
  equip_leather_armor: {
    id: 'equip_leather_armor',
    name: 'レザーアーマー',
    slot: 'armor',
    tier: 0,
    buyPrice: 100, // 基準100
    armorType: 'light',
    bonuses: { def: 6, mdf: 4 }, // 軽装: def=round(8*0.7)=6, mdf=round(8*0.55)=4
  },
  equip_iron_armor: {
    id: 'equip_iron_armor',
    name: '鉄の鎧',
    slot: 'armor',
    tier: 0,
    buyPrice: 180, // 基準180
    armorType: 'heavy',
    bonuses: { def: 8, mdf: 3 }, // 重装: def=round(8*1.0)=8, mdf=round(8*0.4)=3
  },
  equip_cloth_robe: {
    id: 'equip_cloth_robe',
    name: '布のローブ',
    slot: 'armor',
    tier: 0,
    buyPrice: 120, // 基準120
    armorType: 'clothes',
    bonuses: { def: 3, mdf: 8 }, // 衣: def=round(8*0.4)=3, mdf=round(8*0.95)=8
  },
  equip_amulet: {
    id: 'equip_amulet',
    name: 'まもりのお守り',
    slot: 'accessory',
    tier: 0,
    buyPrice: 140, // 基準140
    bonuses: { def: 2, mdf: 2 }, // 装飾: def=round(8*0.25)=2, mdf=round(8*0.25)=2
  },
  // --------------------------------------------------------------------------
  // 素材売却で解放される装備（tier1。通常はティア解放だが素材売却でも並ぶ [04 §8]）
  // --------------------------------------------------------------------------
  equip_slime_shield: {
    id: 'equip_slime_shield',
    name: 'スライムの盾',
    slot: 'armor',
    tier: 1,
    buyPrice: 220, // 基準100, round(100*2.2^1)=220
    armorType: 'heavy',
    bonuses: { def: 12, mdf: 5 }, // 重装T1: def=12, mdf=5
  },
  equip_rat_dagger: {
    id: 'equip_rat_dagger',
    name: 'ねずみ牙の短剣',
    slot: 'weapon',
    tier: 1,
    buyPrice: 231, // 基準105, round(105*2.2^1)=231
    weaponType: 'sword',
    bonuses: { atk: 13 }, // 剣T1: round(round(8*1.62)*0.97)=round(13*0.97)=13
  },
  equip_bat_cloak: {
    id: 'equip_bat_cloak',
    name: 'コウモリのマント',
    slot: 'armor',
    tier: 1,
    buyPrice: 209, // 基準95, round(95*2.2^1)=209
    armorType: 'light',
    bonuses: { def: 8, mdf: 7 }, // 軽装T1: def=8, mdf=7
  },
  equip_golem_blade: {
    id: 'equip_golem_blade',
    name: 'ゴーレムの大剣',
    slot: 'weapon',
    tier: 1,
    buyPrice: 480, // 基準218, round(218*2.2^1)=480
    weaponType: 'sword',
    bonuses: { atk: 13 }, // 剣T1: 13
  },

  // ============================================================================
  // Phase 6-3: 帯ティア装備（tier=解放階/10 目安。武器6種＋防具3種＋装飾）
  // ============================================================================
  // ---- tier2（21階〜・鋼） ----
  equip_t2_sword: {
    id: 'equip_t2_sword',
    name: '鋼の剣',
    slot: 'weapon',
    tier: 2,
    buyPrice: 581, // 基準120, round(120*2.2^2)=581
    weaponType: 'sword',
    bonuses: { atk: 20 }, // 剣T2: round(round(8*1.62^2)*0.97)=round(21*0.97)=20
  },
  equip_t2_spear: {
    id: 'equip_t2_spear',
    name: '鋼の槍',
    slot: 'weapon',
    tier: 2,
    buyPrice: 726, // 基準150, round(150*2.2^2)=726
    weaponType: 'spear',
    bonuses: { atk: 21 }, // 槍T2: round(8*1.62^2)=21
  },
  equip_t2_axe: {
    id: 'equip_t2_axe',
    name: '鋼の戦斧',
    slot: 'weapon',
    tier: 2,
    buyPrice: 774, // 基準160, round(160*2.2^2)=774
    weaponType: 'axe',
    bonuses: { atk: 22 }, // 斧T2: round(round(8*1.62^2)*1.05)=round(21*1.05)=22
  },
  equip_t2_bow: {
    id: 'equip_t2_bow',
    name: '狩人の弓',
    slot: 'weapon',
    tier: 2,
    buyPrice: 532, // 基準110, round(110*2.2^2)=532
    weaponType: 'bow',
    bonuses: { atk: 19 }, // 弓T2: round(round(8*1.62^2)*0.9)=round(21*0.9)=19
  },
  equip_t2_fist: {
    id: 'equip_t2_fist',
    name: '鋼の籠手',
    slot: 'weapon',
    tier: 2,
    buyPrice: 484, // 基準100, round(100*2.2^2)=484
    weaponType: 'fist',
    bonuses: { atk: 18 }, // 拳T2: round(round(8*1.62^2)*0.85)=round(21*0.85)=18
  },
  equip_t2_staff: {
    id: 'equip_t2_staff',
    name: '銀飾りの杖',
    slot: 'weapon',
    tier: 2,
    buyPrice: 726, // 基準150, round(150*2.2^2)=726
    weaponType: 'staff',
    bonuses: { mat: 21 }, // 杖T2: round(8*1.62^2)=21
  },
  equip_t2_heavy: {
    id: 'equip_t2_heavy',
    name: '鋼の鎧',
    slot: 'armor',
    tier: 2,
    buyPrice: 871, // 基準180, round(180*2.2^2)=871
    armorType: 'heavy',
    bonuses: { def: 19, mdf: 8 }, // 重装T2: def=19, mdf=8
  },
  equip_t2_light: {
    id: 'equip_t2_light',
    name: '鎖かたびら',
    slot: 'armor',
    tier: 2,
    buyPrice: 484, // 基準100, round(100*2.2^2)=484
    armorType: 'light',
    bonuses: { def: 13, mdf: 10 }, // 軽装T2: def=13, mdf=10
  },
  equip_t2_clothes: {
    id: 'equip_t2_clothes',
    name: '魔導のローブ',
    slot: 'armor',
    tier: 2,
    buyPrice: 581, // 基準120, round(120*2.2^2)=581
    armorType: 'clothes',
    bonuses: { def: 8, mdf: 18 }, // 衣T2: def=8, mdf=18
  },
  equip_t2_accessory: {
    id: 'equip_t2_accessory',
    name: '守りの護符',
    slot: 'accessory',
    tier: 2,
    buyPrice: 678, // 基準140, round(140*2.2^2)=678
    bonuses: { def: 5, mdf: 5 }, // 装飾T2: def=5, mdf=5
  },
  // ---- tier3（31階〜・銀） ----
  equip_t3_sword: {
    id: 'equip_t3_sword',
    name: '銀の剣',
    slot: 'weapon',
    tier: 3,
    buyPrice: 1278, // 基準120, round(120*2.2^3)=1278
    weaponType: 'sword',
    bonuses: { atk: 33 }, // 剣T3: round(round(8*1.62^3)*0.97)=round(34*0.97)=33
  },
  equip_t3_spear: {
    id: 'equip_t3_spear',
    name: '銀の槍',
    slot: 'weapon',
    tier: 3,
    buyPrice: 1597, // 基準150, round(150*2.2^3)=1597
    weaponType: 'spear',
    bonuses: { atk: 34 }, // 槍T3: round(8*1.62^3)=34
  },
  equip_t3_axe: {
    id: 'equip_t3_axe',
    name: '銀の大斧',
    slot: 'weapon',
    tier: 3,
    buyPrice: 1704, // 基準160, round(160*2.2^3)=1704
    weaponType: 'axe',
    bonuses: { atk: 36 }, // 斧T3: round(round(8*1.62^3)*1.05)=round(34*1.05)=36
  },
  equip_t3_bow: {
    id: 'equip_t3_bow',
    name: '精霊の弓',
    slot: 'weapon',
    tier: 3,
    buyPrice: 1171, // 基準110, round(110*2.2^3)=1171
    weaponType: 'bow',
    bonuses: { atk: 31 }, // 弓T3: round(round(8*1.62^3)*0.9)=round(34*0.9)=31
  },
  equip_t3_fist: {
    id: 'equip_t3_fist',
    name: '銀の籠手',
    slot: 'weapon',
    tier: 3,
    buyPrice: 1065, // 基準100, round(100*2.2^3)=1065
    weaponType: 'fist',
    bonuses: { atk: 29 }, // 拳T3: round(round(8*1.62^3)*0.85)=round(34*0.85)=29
  },
  equip_t3_staff: {
    id: 'equip_t3_staff',
    name: '賢者の杖',
    slot: 'weapon',
    tier: 3,
    buyPrice: 1597, // 基準150, round(150*2.2^3)=1597
    weaponType: 'staff',
    bonuses: { mat: 34 }, // 杖T3: round(8*1.62^3)=34
  },
  equip_t3_heavy: {
    id: 'equip_t3_heavy',
    name: '銀の鎧',
    slot: 'armor',
    tier: 3,
    buyPrice: 1917, // 基準180, round(180*2.2^3)=1917
    armorType: 'heavy',
    bonuses: { def: 30, mdf: 12 }, // 重装T3: def=30, mdf=12
  },
  equip_t3_light: {
    id: 'equip_t3_light',
    name: '精霊布の服',
    slot: 'armor',
    tier: 3,
    buyPrice: 1065, // 基準100, round(100*2.2^3)=1065
    armorType: 'light',
    bonuses: { def: 21, mdf: 17 }, // 軽装T3: def=21, mdf=17
  },
  equip_t3_clothes: {
    id: 'equip_t3_clothes',
    name: '大魔導のローブ',
    slot: 'armor',
    tier: 3,
    buyPrice: 1278, // 基準120, round(120*2.2^3)=1278
    armorType: 'clothes',
    bonuses: { def: 12, mdf: 29 }, // 衣T3: def=12, mdf=29
  },
  equip_t3_accessory: {
    id: 'equip_t3_accessory',
    name: '精霊の指輪',
    slot: 'accessory',
    tier: 3,
    buyPrice: 1491, // 基準140, round(140*2.2^3)=1491
    bonuses: { def: 8, mdf: 8 }, // 装飾T3: def=8, mdf=8
  },
  // ---- tier4（41階〜・ミスリル） ----
  equip_t4_sword: {
    id: 'equip_t4_sword',
    name: 'ミスリルソード',
    slot: 'weapon',
    tier: 4,
    buyPrice: 2811, // 基準120, round(120*2.2^4)=2811
    weaponType: 'sword',
    bonuses: { atk: 53 }, // 剣T4: round(round(8*1.62^4)*0.97)=round(55*0.97)=53
  },
  equip_t4_spear: {
    id: 'equip_t4_spear',
    name: 'ミスリルランス',
    slot: 'weapon',
    tier: 4,
    buyPrice: 3514, // 基準150, round(150*2.2^4)=3514
    weaponType: 'spear',
    bonuses: { atk: 55 }, // 槍T4: round(8*1.62^4)=55
  },
  equip_t4_axe: {
    id: 'equip_t4_axe',
    name: 'ミスリルアックス',
    slot: 'weapon',
    tier: 4,
    buyPrice: 3748, // 基準160, round(160*2.2^4)=3748
    weaponType: 'axe',
    bonuses: { atk: 58 }, // 斧T4: round(round(8*1.62^4)*1.05)=round(55*1.05)=58
  },
  equip_t4_bow: {
    id: 'equip_t4_bow',
    name: '月光の弓',
    slot: 'weapon',
    tier: 4,
    buyPrice: 2577, // 基準110, round(110*2.2^4)=2577
    weaponType: 'bow',
    bonuses: { atk: 50 }, // 弓T4: round(round(8*1.62^4)*0.9)=round(55*0.9)=50
  },
  equip_t4_fist: {
    id: 'equip_t4_fist',
    name: 'ミスリルの籠手',
    slot: 'weapon',
    tier: 4,
    buyPrice: 2343, // 基準100, round(100*2.2^4)=2343
    weaponType: 'fist',
    bonuses: { atk: 47 }, // 拳T4: round(round(8*1.62^4)*0.85)=round(55*0.85)=47
  },
  equip_t4_staff: {
    id: 'equip_t4_staff',
    name: '星見の杖',
    slot: 'weapon',
    tier: 4,
    buyPrice: 3514, // 基準150, round(150*2.2^4)=3514
    weaponType: 'staff',
    bonuses: { mat: 55 }, // 杖T4: round(8*1.62^4)=55
  },
  equip_t4_heavy: {
    id: 'equip_t4_heavy',
    name: 'ミスリルメイル',
    slot: 'armor',
    tier: 4,
    buyPrice: 4217, // 基準180, round(180*2.2^4)=4217
    armorType: 'heavy',
    bonuses: { def: 46, mdf: 18 }, // 重装T4: def=46, mdf=18
  },
  equip_t4_light: {
    id: 'equip_t4_light',
    name: '月光の装束',
    slot: 'armor',
    tier: 4,
    buyPrice: 2343, // 基準100, round(100*2.2^4)=2343
    armorType: 'light',
    bonuses: { def: 32, mdf: 25 }, // 軽装T4: def=32, mdf=25
  },
  equip_t4_clothes: {
    id: 'equip_t4_clothes',
    name: '賢者のローブ',
    slot: 'armor',
    tier: 4,
    buyPrice: 2811, // 基準120, round(120*2.2^4)=2811
    armorType: 'clothes',
    bonuses: { def: 18, mdf: 44 }, // 衣T4: def=18, mdf=44
  },
  equip_t4_accessory: {
    id: 'equip_t4_accessory',
    name: '星詠みの護符',
    slot: 'accessory',
    tier: 4,
    buyPrice: 3280, // 基準140, round(140*2.2^4)=3280
    bonuses: { def: 12, mdf: 12 }, // 装飾T4: def=12, mdf=12
  },
  // ---- tier5（51階〜・竜鱗） ----
  equip_t5_sword: {
    id: 'equip_t5_sword',
    name: '竜鱗の剣',
    slot: 'weapon',
    tier: 5,
    buyPrice: 6184, // 基準120, round(120*2.2^5)=6184
    weaponType: 'sword',
    bonuses: { atk: 86 }, // 剣T5: round(round(8*1.62^5)*0.97)=round(89*0.97)=86
  },
  equip_t5_spear: {
    id: 'equip_t5_spear',
    name: '竜牙の槍',
    slot: 'weapon',
    tier: 5,
    buyPrice: 7730, // 基準150, round(150*2.2^5)=7730
    weaponType: 'spear',
    bonuses: { atk: 89 }, // 槍T5: round(8*1.62^5)=89
  },
  equip_t5_axe: {
    id: 'equip_t5_axe',
    name: '竜骨の大斧',
    slot: 'weapon',
    tier: 5,
    buyPrice: 8246, // 基準160, round(160*2.2^5)=8246
    weaponType: 'axe',
    bonuses: { atk: 93 }, // 斧T5: round(round(8*1.62^5)*1.05)=round(89*1.05)=93
  },
  equip_t5_bow: {
    id: 'equip_t5_bow',
    name: '竜骨の弓',
    slot: 'weapon',
    tier: 5,
    buyPrice: 5669, // 基準110, round(110*2.2^5)=5669
    weaponType: 'bow',
    bonuses: { atk: 80 }, // 弓T5: round(round(8*1.62^5)*0.9)=round(89*0.9)=80
  },
  equip_t5_fist: {
    id: 'equip_t5_fist',
    name: '竜鱗の籠手',
    slot: 'weapon',
    tier: 5,
    buyPrice: 5154, // 基準100, round(100*2.2^5)=5154
    weaponType: 'fist',
    bonuses: { atk: 76 }, // 拳T5: round(round(8*1.62^5)*0.85)=round(89*0.85)=76
  },
  equip_t5_staff: {
    id: 'equip_t5_staff',
    name: '竜詠みの杖',
    slot: 'weapon',
    tier: 5,
    buyPrice: 7730, // 基準150, round(150*2.2^5)=7730
    weaponType: 'staff',
    bonuses: { mat: 89 }, // 杖T5: round(8*1.62^5)=89
  },
  equip_t5_heavy: {
    id: 'equip_t5_heavy',
    name: '竜鱗の鎧',
    slot: 'armor',
    tier: 5,
    buyPrice: 9277, // 基準180, round(180*2.2^5)=9277
    armorType: 'heavy',
    bonuses: { def: 72, mdf: 29 }, // 重装T5: def=72, mdf=29
  },
  equip_t5_light: {
    id: 'equip_t5_light',
    name: '竜革の装束',
    slot: 'armor',
    tier: 5,
    buyPrice: 5154, // 基準100, round(100*2.2^5)=5154
    armorType: 'light',
    bonuses: { def: 50, mdf: 40 }, // 軽装T5: def=50, mdf=40
  },
  equip_t5_clothes: {
    id: 'equip_t5_clothes',
    name: '竜詠みのローブ',
    slot: 'armor',
    tier: 5,
    buyPrice: 6184, // 基準120, round(120*2.2^5)=6184
    armorType: 'clothes',
    bonuses: { def: 29, mdf: 68 }, // 衣T5: def=29, mdf=68
  },
  equip_t5_accessory: {
    id: 'equip_t5_accessory',
    name: '竜の紋章',
    slot: 'accessory',
    tier: 5,
    buyPrice: 7215, // 基準140, round(140*2.2^5)=7215
    bonuses: { def: 18, mdf: 18 }, // 装飾T5: def=18, mdf=18
  },

  // ============================================================================
  // v3.0.0 §6: ジェム限定装備（12種）。tier:5・buyPrice:0・gemPrice 付き。
  // 通常カタログ（shopCatalog）からは gemPrice !== undefined を除外し、交換所でのみ購入可。
  // equip_collector_crown のみ gemPrice 無し（入手経路は秘宝全種コンプ報酬のみ）。
  // ============================================================================
  equip_gem_sword: {
    id: 'equip_gem_sword',
    name: '星走りの剣',
    slot: 'weapon',
    tier: 5,
    buyPrice: 0,
    weaponType: 'sword',
    bonuses: { atk: 93, statMods: { agi: 5 } },
    gemPrice: 120,
  },
  equip_gem_spear: {
    id: 'equip_gem_spear',
    name: '極光の槍',
    slot: 'weapon',
    tier: 5,
    buyPrice: 0,
    weaponType: 'spear',
    bonuses: { atk: 96, statMods: { vit: 5 } },
    gemPrice: 120,
  },
  equip_gem_axe: {
    id: 'equip_gem_axe',
    name: '隕鉄の大斧',
    slot: 'weapon',
    tier: 5,
    buyPrice: 0,
    weaponType: 'axe',
    bonuses: { atk: 101, statMods: { str: 5 } },
    gemPrice: 120,
  },
  equip_gem_bow: {
    id: 'equip_gem_bow',
    name: '流星の弓',
    slot: 'weapon',
    tier: 5,
    buyPrice: 0,
    weaponType: 'bow',
    bonuses: { atk: 86, statMods: { luc: 5 } },
    gemPrice: 120,
  },
  equip_gem_fist: {
    id: 'equip_gem_fist',
    name: '彗星の拳甲',
    slot: 'weapon',
    tier: 5,
    buyPrice: 0,
    weaponType: 'fist',
    bonuses: { atk: 82, statMods: { str: 3, agi: 3 } },
    gemPrice: 120,
  },
  equip_gem_staff: {
    id: 'equip_gem_staff',
    name: '銀河の杖',
    slot: 'weapon',
    tier: 5,
    buyPrice: 0,
    weaponType: 'staff',
    bonuses: { mat: 96, statMods: { int: 5 } },
    gemPrice: 120,
  },
  equip_gem_heavy: {
    id: 'equip_gem_heavy',
    name: '星鎧',
    slot: 'armor',
    tier: 5,
    buyPrice: 0,
    armorType: 'heavy',
    bonuses: { def: 78, mdf: 31, statMods: { hp: 20 } },
    gemPrice: 150,
  },
  equip_gem_light: {
    id: 'equip_gem_light',
    name: 'オーロラコート',
    slot: 'armor',
    tier: 5,
    buyPrice: 0,
    armorType: 'light',
    bonuses: { def: 54, mdf: 43, statMods: { agi: 4 } },
    gemPrice: 150,
  },
  equip_gem_clothes: {
    id: 'equip_gem_clothes',
    name: '虹紡ぎのローブ',
    slot: 'armor',
    tier: 5,
    buyPrice: 0,
    armorType: 'clothes',
    bonuses: { def: 31, mdf: 73, statMods: { tp: 15 } },
    gemPrice: 150,
  },
  equip_gem_ring: {
    id: 'equip_gem_ring',
    name: '七色の指輪',
    slot: 'accessory',
    tier: 5,
    buyPrice: 0,
    bonuses: {
      def: 20,
      mdf: 20,
      statMods: { str: 3, vit: 3, agi: 3, int: 3, mnd: 3, luc: 3 },
    },
    gemPrice: 200,
  },
  equip_gem_charm: {
    id: 'equip_gem_charm',
    name: '輝晶の護符',
    slot: 'accessory',
    tier: 5,
    buyPrice: 0,
    bonuses: { def: 12, mdf: 24, statMods: { luc: 8, hp: 10 } },
    gemPrice: 160,
  },
  equip_collector_crown: {
    id: 'equip_collector_crown',
    name: '蒐集王の宝冠',
    slot: 'accessory',
    tier: 5,
    buyPrice: 0,
    bonuses: {
      def: 25,
      mdf: 25,
      statMods: { str: 5, vit: 5, agi: 5, int: 5, mnd: 5, luc: 5, hp: 25, tp: 15 },
    },
    // gemPrice なし: 入手経路は秘宝全種コンプ報酬のみ（v3.0.0 §5）。
  },
};

/**
 * 恒久的に希少な装備か（ジェム限定装備・蒐集王の宝冠）。buyPrice が 0 の装備がこれに該当する
 * （通常ショップでの購入経路を持たない = 分解/売却で失うと再入手できない）。
 * 鍛冶の分解・ショップの売却対象からこれらを除外するために使う（v3.0.0 §6）。
 */
export function isPreciousEquip(masterId: ItemId): boolean {
  return EQUIPMENT[masterId]?.buyPrice === 0;
}
