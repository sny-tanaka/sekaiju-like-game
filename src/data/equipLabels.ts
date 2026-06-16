import type { ArmorType, EquipSlotKey, WeaponType } from '@/domain/types';

// ============================================================================
// 装備の種別ラベル（UI 表示用の日本語名）。
// ショップの装備詳細（#31）・冒険者作成の職業カード（#29）など複数画面で共有する。
// ============================================================================

export const WEAPON_TYPE_LABEL: Record<WeaponType, string> = {
  sword: '剣',
  spear: '槍',
  axe: '斧',
  bow: '弓',
  staff: '杖',
  fist: '拳',
};

export const ARMOR_TYPE_LABEL: Record<ArmorType, string> = {
  heavy: '重装',
  light: '軽装',
  clothes: '衣',
};

export const EQUIP_SLOT_LABEL: Record<EquipSlotKey, string> = {
  weapon: '武器',
  armor: '防具',
  accessory: '装飾品',
};
