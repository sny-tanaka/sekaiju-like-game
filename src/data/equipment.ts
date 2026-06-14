import type { EquipmentMaster, ItemId } from '@/domain/types';

// ============================================================================
// 装備マスター（[04]）。Phase 0 は初期装備に使う初級品のみ。
// 装備は素ステではなく戦闘派生値（EquipBonuses）を加算する（[05 §0.2]）。
// ============================================================================

export const EQUIPMENT: Record<ItemId, EquipmentMaster> = {
  equip_short_sword: {
    id: 'equip_short_sword',
    name: 'ショートソード',
    slot: 'weapon',
    weaponType: 'sword',
    bonuses: { atk: 6 },
  },
  equip_iron_spear: {
    id: 'equip_iron_spear',
    name: '鉄の槍',
    slot: 'weapon',
    weaponType: 'spear',
    bonuses: { atk: 7 },
  },
  equip_oak_staff: {
    id: 'equip_oak_staff',
    name: '樫の杖',
    slot: 'weapon',
    weaponType: 'staff',
    bonuses: { mat: 7 },
  },
  equip_short_bow: {
    id: 'equip_short_bow',
    name: 'ショートボウ',
    slot: 'weapon',
    weaponType: 'bow',
    bonuses: { atk: 5 },
  },
  equip_leather_armor: {
    id: 'equip_leather_armor',
    name: 'レザーアーマー',
    slot: 'armor',
    armorType: 'light',
    bonuses: { def: 5 },
  },
  equip_iron_armor: {
    id: 'equip_iron_armor',
    name: '鉄の鎧',
    slot: 'armor',
    armorType: 'heavy',
    bonuses: { def: 8 },
  },
  equip_cloth_robe: {
    id: 'equip_cloth_robe',
    name: '布のローブ',
    slot: 'armor',
    armorType: 'clothes',
    bonuses: { def: 2, mdf: 4 },
  },
};
