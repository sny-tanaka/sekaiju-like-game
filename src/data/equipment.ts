import type { EquipmentMaster, ItemId } from '@/domain/types';

// ============================================================================
// 装備マスター（[04]）。Phase 3 は第1ティア（tier 0）の初級品。
// 装備は素ステではなく戦闘派生値（EquipBonuses）を加算する（[05 §0.2]）。
// buyPrice はショップ価格。売却は半額（shop で算出）。
// ============================================================================

export const EQUIPMENT: Record<ItemId, EquipmentMaster> = {
  equip_short_sword: {
    id: 'equip_short_sword',
    name: 'ショートソード',
    slot: 'weapon',
    tier: 0,
    buyPrice: 120,
    weaponType: 'sword',
    bonuses: { atk: 6 },
  },
  equip_iron_spear: {
    id: 'equip_iron_spear',
    name: '鉄の槍',
    slot: 'weapon',
    tier: 0,
    buyPrice: 150,
    weaponType: 'spear',
    bonuses: { atk: 7 },
  },
  equip_oak_staff: {
    id: 'equip_oak_staff',
    name: '樫の杖',
    slot: 'weapon',
    tier: 0,
    buyPrice: 150,
    weaponType: 'staff',
    bonuses: { mat: 7 },
  },
  equip_short_bow: {
    id: 'equip_short_bow',
    name: 'ショートボウ',
    slot: 'weapon',
    tier: 0,
    buyPrice: 110,
    weaponType: 'bow',
    bonuses: { atk: 5 },
  },
  equip_leather_armor: {
    id: 'equip_leather_armor',
    name: 'レザーアーマー',
    slot: 'armor',
    tier: 0,
    buyPrice: 100,
    armorType: 'light',
    bonuses: { def: 5 },
  },
  equip_iron_armor: {
    id: 'equip_iron_armor',
    name: '鉄の鎧',
    slot: 'armor',
    tier: 0,
    buyPrice: 180,
    armorType: 'heavy',
    bonuses: { def: 8 },
  },
  equip_cloth_robe: {
    id: 'equip_cloth_robe',
    name: '布のローブ',
    slot: 'armor',
    tier: 0,
    buyPrice: 120,
    armorType: 'clothes',
    bonuses: { def: 2, mdf: 4 },
  },
  equip_amulet: {
    id: 'equip_amulet',
    name: 'まもりのお守り',
    slot: 'accessory',
    tier: 0,
    buyPrice: 140,
    bonuses: { def: 2, mdf: 2 },
  },
};
