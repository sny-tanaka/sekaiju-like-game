import { CLASSES } from '@/data/classes';
import { EQUIPMENT } from '@/data/equipment';
import { ITEMS } from '@/data/items';
import type { Character, EquipInstance, EquipSlotKey, ItemId, SaveData } from '@/domain/types';

// ============================================================================
// 所持品（倉庫）と装備の純関数（[04 §2-3]）。
// 倉庫は guild.storage: ItemStack[]。装備は Character.equipment（itemId or null）。
// 鍛冶(+N)は Phase 4 のため、ここでは masterId のみを扱う簡易モデル。
// ============================================================================

/** スタックの周回グレード（未指定=1）。grade 違いは別スタック（[06 §3]）。 */
const stackGrade = (s: { grade?: number }): number => s.grade ?? 1;

/** 所持数。grade 指定時はそのグレードのみ、未指定は全グレード合計。 */
export function itemCount(save: SaveData, itemId: ItemId, grade?: number): number {
  return save.guild.storage
    .filter((s) => s.itemId === itemId && (grade === undefined || stackGrade(s) === grade))
    .reduce((a, s) => a + s.qty, 0);
}

/** 倉庫にアイテムを加える（grade 既定=1。grade>1 は周回グレード素材）。maxStack を超える分は切り捨てる。 */
export function addItem(save: SaveData, itemId: ItemId, qty = 1, grade = 1): SaveData {
  if (qty <= 0) return save;
  const maxStack = ITEMS[itemId]?.maxStack;
  const storage = [...save.guild.storage];
  const idx = storage.findIndex((s) => s.itemId === itemId && stackGrade(s) === grade);
  const currentQty = idx >= 0 ? storage[idx].qty : 0;
  // maxStack が指定されている場合、上限を超えないようにクランプ
  const addQty = maxStack !== undefined ? Math.min(qty, Math.max(0, maxStack - currentQty)) : qty;
  if (addQty <= 0) return save;
  if (idx >= 0) storage[idx] = { ...storage[idx], qty: currentQty + addQty };
  else storage.push(grade > 1 ? { itemId, qty: addQty, grade } : { itemId, qty: addQty });
  return { ...save, guild: { ...save.guild, storage } };
}

/** 倉庫からアイテムを減らす（grade 既定=1）。足りなければ変更しない。 */
export function removeItem(save: SaveData, itemId: ItemId, qty = 1, grade = 1): SaveData {
  if (qty <= 0) return save;
  const idx = save.guild.storage.findIndex((s) => s.itemId === itemId && stackGrade(s) === grade);
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

// ---- 装備個体（[04 §4]・鍛冶のため装備はインスタンスで所有） -----------------

function generateEquipId(): string {
  return `eq_${Date.now().toString(36)}_${Math.floor(Math.random() * 0xffffff).toString(36)}`;
}

/** 新しい装備個体を所有プール（guild.equipment）に加える。 */
export function addEquipment(
  save: SaveData,
  masterId: ItemId,
  forgeLevel = 0,
  grade = 1
): SaveData {
  if (!EQUIPMENT[masterId]) return save;
  const inst: EquipInstance = { id: generateEquipId(), masterId, forgeLevel };
  if (grade > 1) inst.grade = grade;
  return { ...save, guild: { ...save.guild, equipment: [...save.guild.equipment, inst] } };
}

/** 所有プール・全メンバーの装備中スロットから個体を探す。 */
export function findEquipInstance(save: SaveData, instanceId: string): EquipInstance | undefined {
  const pooled = save.guild.equipment.find((e) => e.id === instanceId);
  if (pooled) return pooled;
  for (const m of save.guild.members) {
    for (const slot of ['weapon', 'armor', 'accessory'] as EquipSlotKey[]) {
      const e = m.equipment[slot];
      if (e?.id === instanceId) return e;
    }
  }
  return undefined;
}

/** その装備をこの職業が装備できるか（[04 §3]・[01 §4]）。 */
export function canEquip(char: Character, masterId: ItemId): boolean {
  const eq = EQUIPMENT[masterId];
  if (!eq) return false;
  const cls = CLASSES[char.classId];
  if (!cls) return false;
  if (eq.slot === 'weapon')
    return !!eq.weaponType && cls.equipableWeaponTypes.includes(eq.weaponType);
  if (eq.slot === 'armor') return !!eq.armorType && cls.equipableArmorTypes.includes(eq.armorType);
  return true; // accessory は職業を問わない
}

/**
 * 所有プールの装備個体をキャラに装備する。元の装備個体はプールへ戻す。
 * プールに無い／装備不可なら変更しない。
 */
export function equipItem(save: SaveData, charId: string, instanceId: string): SaveData {
  const inst = save.guild.equipment.find((e) => e.id === instanceId);
  const char = save.guild.members.find((m) => m.id === charId);
  if (!inst || !char || !canEquip(char, inst.masterId)) return save;
  const eq = EQUIPMENT[inst.masterId];
  let pool = save.guild.equipment.filter((e) => e.id !== instanceId);
  const prev = char.equipment[eq.slot];
  if (prev) pool = [...pool, prev];
  const next: SaveData = { ...save, guild: { ...save.guild, equipment: pool } };
  return updateMember(next, charId, (c) => ({
    ...c,
    equipment: { ...c.equipment, [eq.slot]: inst },
  }));
}

/** キャラの指定スロットの装備を外して所有プールへ戻す。 */
export function unequipItem(save: SaveData, charId: string, slot: EquipSlotKey): SaveData {
  const char = save.guild.members.find((m) => m.id === charId);
  if (!char) return save;
  const cur = char.equipment[slot];
  if (!cur) return save;
  const next: SaveData = {
    ...save,
    guild: { ...save.guild, equipment: [...save.guild.equipment, cur] },
  };
  return updateMember(next, charId, (c) => ({
    ...c,
    equipment: { ...c.equipment, [slot]: null },
  }));
}
