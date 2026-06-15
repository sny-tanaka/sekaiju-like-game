import { CLASSES } from '@/data/classes';
import { EQUIPMENT } from '@/data/equipment';
import type { Character, EquipSlotKey, ItemId, SaveData } from '@/domain/types';

// ============================================================================
// 所持品（倉庫）と装備の純関数（[04 §2-3]）。
// 倉庫は guild.storage: ItemStack[]。装備は Character.equipment（itemId or null）。
// 鍛冶(+N)は Phase 4 のため、ここでは masterId のみを扱う簡易モデル。
// ============================================================================

export function itemCount(save: SaveData, itemId: ItemId): number {
  return save.guild.storage.find((s) => s.itemId === itemId)?.qty ?? 0;
}

/** 倉庫にアイテムを加える。 */
export function addItem(save: SaveData, itemId: ItemId, qty = 1): SaveData {
  if (qty <= 0) return save;
  const storage = [...save.guild.storage];
  const idx = storage.findIndex((s) => s.itemId === itemId);
  if (idx >= 0) storage[idx] = { ...storage[idx], qty: storage[idx].qty + qty };
  else storage.push({ itemId, qty });
  return { ...save, guild: { ...save.guild, storage } };
}

/** 倉庫からアイテムを減らす。足りなければ変更しない。 */
export function removeItem(save: SaveData, itemId: ItemId, qty = 1): SaveData {
  if (qty <= 0) return save;
  const idx = save.guild.storage.findIndex((s) => s.itemId === itemId);
  if (idx < 0 || save.guild.storage[idx].qty < qty) return save;
  const storage = [...save.guild.storage];
  const left = storage[idx].qty - qty;
  if (left <= 0) storage.splice(idx, 1);
  else storage[idx] = { ...storage[idx], qty: left };
  return { ...save, guild: { ...save.guild, storage } };
}

// ---- 食材・料理（[04 §6]・別枠 foodStorage・最大60個） --------------------

/** 食材の保管上限（合計個数）。 */
export const FOOD_STORAGE_LIMIT = 60;

const foodStorageOf = (save: SaveData) => save.guild.foodStorage ?? [];

/** 食材の合計個数。 */
export function foodTotal(save: SaveData): number {
  return foodStorageOf(save).reduce((s, x) => s + x.qty, 0);
}

export function foodCount(save: SaveData, itemId: ItemId): number {
  return foodStorageOf(save).find((s) => s.itemId === itemId)?.qty ?? 0;
}

/**
 * 食材を加える。上限(60)を超える分は切り捨てる。実際に追加できた個数を反映した save を返す。
 */
export function addFood(save: SaveData, itemId: ItemId, qty = 1): SaveData {
  if (qty <= 0) return save;
  const room = FOOD_STORAGE_LIMIT - foodTotal(save);
  const add = Math.min(qty, Math.max(0, room));
  if (add <= 0) return save;
  const foodStorage = [...foodStorageOf(save)];
  const idx = foodStorage.findIndex((s) => s.itemId === itemId);
  if (idx >= 0) foodStorage[idx] = { ...foodStorage[idx], qty: foodStorage[idx].qty + add };
  else foodStorage.push({ itemId, qty: add });
  return { ...save, guild: { ...save.guild, foodStorage } };
}

/** 食材を減らす。足りなければ変更しない。 */
export function removeFood(save: SaveData, itemId: ItemId, qty = 1): SaveData {
  if (qty <= 0) return save;
  const foodStorage = [...foodStorageOf(save)];
  const idx = foodStorage.findIndex((s) => s.itemId === itemId);
  if (idx < 0 || foodStorage[idx].qty < qty) return save;
  const left = foodStorage[idx].qty - qty;
  if (left <= 0) foodStorage.splice(idx, 1);
  else foodStorage[idx] = { ...foodStorage[idx], qty: left };
  return { ...save, guild: { ...save.guild, foodStorage } };
}

function updateMember(save: SaveData, charId: string, fn: (c: Character) => Character): SaveData {
  return {
    ...save,
    guild: {
      ...save.guild,
      members: save.guild.members.map((m) => (m.id === charId ? fn(m) : m)),
    },
  };
}

/** その装備をこの職業が装備できるか（[04 §3]・[01 §4]）。 */
export function canEquip(char: Character, itemId: ItemId): boolean {
  const eq = EQUIPMENT[itemId];
  if (!eq) return false;
  const cls = CLASSES[char.classId];
  if (!cls) return false;
  if (eq.slot === 'weapon')
    return !!eq.weaponType && cls.equipableWeaponTypes.includes(eq.weaponType);
  if (eq.slot === 'armor') return !!eq.armorType && cls.equipableArmorTypes.includes(eq.armorType);
  return true; // accessory は職業を問わない
}

/**
 * 倉庫の装備をキャラに装備する。元の装備品は倉庫へ戻す。
 * 倉庫に無い／装備不可なら変更しない。
 */
export function equipItem(save: SaveData, charId: string, itemId: ItemId): SaveData {
  const eq = EQUIPMENT[itemId];
  const char = save.guild.members.find((m) => m.id === charId);
  if (!eq || !char || !canEquip(char, itemId)) return save;
  if (itemCount(save, itemId) <= 0) return save;

  let next = removeItem(save, itemId, 1);
  const prev = char.equipment[eq.slot];
  if (prev) next = addItem(next, prev, 1);
  return updateMember(next, charId, (c) => ({
    ...c,
    equipment: { ...c.equipment, [eq.slot]: itemId },
  }));
}

/** キャラの指定スロットの装備を外して倉庫へ戻す。 */
export function unequipItem(save: SaveData, charId: string, slot: EquipSlotKey): SaveData {
  const char = save.guild.members.find((m) => m.id === charId);
  if (!char) return save;
  const cur = char.equipment[slot];
  if (!cur) return save;
  const next = addItem(save, cur, 1);
  return updateMember(next, charId, (c) => ({
    ...c,
    equipment: { ...c.equipment, [slot]: null },
  }));
}
