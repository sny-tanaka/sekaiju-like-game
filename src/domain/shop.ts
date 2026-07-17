import { CLASSES } from '@/data/classes';
import { EQUIPMENT, isPreciousEquip } from '@/data/equipment';
import { ITEMS, sellPrice as itemSellPrice } from '@/data/items';
import { gradeMult, gradedBaseBonuses } from '@/domain/forge';
import { addEquipment, addItem, itemCount, removeItem } from '@/domain/inventory';
import type { EquipInstance, ItemId, SaveData } from '@/domain/types';

// ============================================================================
// ショップ（[04 §8]）。装備・消費アイテムの売買。
// 品揃えは到達階の10層帯ティアで解放（装備のみティア制。消費は常時）。
// 在庫・解放は単一セーブに永続。
// ============================================================================

export interface ShopEntry {
  id: ItemId;
  name: string;
  price: number;
  kind: 'item' | 'equip';
  /** 装備の場合の概要（ATK+6 等）。 */
  note?: string;
}

/** 到達階から解放済みの最大ティア（floor(deepest/10)）。第1帯=0 は常時。 */
export function unlockedTier(save: SaveData): number {
  return Math.max(0, Math.floor(save.towerState.record.deepestReached / 10));
}

/**
 * 素材を売ると並ぶ装備（[04 §8]）。素材 ID → 解放される装備 ID。
 * 売却すると shopStock.unlockedItemIds に恒久追加され、ティア未到達でも購入できる。
 */
export const SELL_UNLOCKS: Record<ItemId, ItemId[]> = {
  item_slime_jelly: ['equip_slime_shield'],
  item_rat_tail: ['equip_rat_dagger'],
  item_bat_wing: ['equip_bat_cloak'],
  item_golem_core: ['equip_golem_blade'],
  // Phase 6-3: 帯素材を売ると、その帯〜次帯の装備が早期に並ぶ（ティア未到達でも購入可）。
  item_mat_t1_coarse_hide: ['equip_t2_light'],
  item_mat_t1_lord_pelt: ['equip_t2_sword', 'equip_t2_heavy'],
  item_mat_t2_frost_pelt: ['equip_t3_light'],
  item_mat_t2_monarch_diadem: ['equip_t3_staff', 'equip_t3_clothes'],
  item_mat_t3_charged_hide: ['equip_t4_light'],
  item_mat_t3_sovereign_horn: ['equip_t4_sword', 'equip_t4_heavy'],
  item_mat_t4_corroded_plate: ['equip_t5_light'],
  item_mat_t4_sovereign_crown: ['equip_t5_sword', 'equip_t5_heavy'],
};

const STAT_MOD_LABEL: Record<string, string> = {
  hp: 'HP',
  tp: 'TP',
  str: 'STR',
  vit: 'VIT',
  agi: 'AGI',
  int: 'INT',
  mnd: 'MND',
  luc: 'LUC',
};

const equipNote = (id: ItemId, grade = 1): string => {
  const b = gradedBaseBonuses(id, grade);
  const parts: string[] = [];
  if (b.atk) parts.push(`ATK+${b.atk}`);
  if (b.mat) parts.push(`MAT+${b.mat}`);
  if (b.def) parts.push(`DEF+${b.def}`);
  if (b.mdf) parts.push(`MDF+${b.mdf}`);
  // v3.0.0 §6: ジェム限定装備は statMods（STR+5 等）を持つため note に含める。
  if (b.statMods) {
    for (const [k, v] of Object.entries(b.statMods)) {
      if (v) parts.push(`${STAT_MOD_LABEL[k] ?? k.toUpperCase()}+${v}`);
    }
  }
  return parts.join(' ');
};

/** その装備のショップ表示グレード（素材売却で解放した最大グレード。既定1）。 */
export function shopEquipGrade(save: SaveData, equipId: ItemId): number {
  return save.shopStock.unlockedGrades?.[equipId] ?? 1;
}

/**
 * 購入できる商品一覧（消費アイテム＋解放ティア以下の装備＋素材売却で解放済みの装備）。
 * 売却で解放した装備は、その素材の周回グレードに応じて LvN として並ぶ（[06 §3]）。
 */
export function shopCatalog(save: SaveData): ShopEntry[] {
  const tier = unlockedTier(save);
  const unlockedIds = new Set(save.shopStock.unlockedItemIds);
  const items: ShopEntry[] = Object.values(ITEMS)
    .filter((it) => it.buyPrice > 0)
    .map((it) => ({ id: it.id, name: it.name, price: it.buyPrice, kind: 'item' }));
  const equips: ShopEntry[] = Object.values(EQUIPMENT)
    // v3.0.0 §6: gemPrice を持つ装備（ジェム限定）は通常カタログに出さない（交換所のみ）。
    // buyPrice <= 0（蒐集王の宝冠など、購入経路を持たない装備）も除外する。
    .filter(
      (eq) =>
        eq.gemPrice === undefined && eq.buyPrice > 0 && (eq.tier <= tier || unlockedIds.has(eq.id))
    )
    .map((eq) => {
      const grade = shopEquipGrade(save, eq.id);
      return {
        id: eq.id,
        name: grade > 1 ? `${eq.name} Lv${grade}` : eq.name,
        price: Math.round(eq.buyPrice * gradeMult(grade)),
        kind: 'equip' as const,
        note: equipNote(eq.id, grade),
      };
    });
  return [...equips, ...items];
}

/** 素材売却で解放される装備 ID（無ければ空）。 */
export function unlocksFromSelling(itemId: ItemId): ItemId[] {
  return SELL_UNLOCKS[itemId] ?? [];
}

/** 購入価格（ITEMS / EQUIPMENT 共通）。装備は周回グレードで上昇。存在しなければ null。 */
export function buyPriceOf(id: ItemId, grade = 1): number | null {
  if (ITEMS[id]) return ITEMS[id].buyPrice;
  if (EQUIPMENT[id]) return Math.round(EQUIPMENT[id].buyPrice * gradeMult(grade));
  return null;
}

/** 売却価格。装備は買値の半額、アイテムは items.sellPrice（いずれも周回グレードで gradeMult 上昇）。 */
export function sellPriceOf(id: ItemId, grade = 1): number {
  if (ITEMS[id]) return Math.round(itemSellPrice(ITEMS[id]) * gradeMult(grade));
  if (EQUIPMENT[id]) return Math.floor((EQUIPMENT[id].buyPrice * gradeMult(grade)) / 2);
  return 0;
}

/** 購入: 所持金が足りれば 1 個購入。装備は解放グレードの個体としてプールへ、消費品は倉庫へ。maxStack 到達済みなら購入不可。 */
export function buy(save: SaveData, id: ItemId): SaveData {
  const grade = EQUIPMENT[id] ? shopEquipGrade(save, id) : 1;
  const price = buyPriceOf(id, grade);
  if (price === null || price <= 0) return save;
  if (save.guild.gold < price) return save;
  // 消費アイテムで maxStack に達していれば購入不可
  if (!EQUIPMENT[id] && ITEMS[id]) {
    const maxStack = ITEMS[id].maxStack;
    if (maxStack !== undefined && itemCount(save, id) >= maxStack) return save;
  }
  const next = EQUIPMENT[id] ? addEquipment(save, id, 0, grade) : addItem(save, id, 1);
  return { ...next, guild: { ...next.guild, gold: next.guild.gold - price } };
}

/** 装備個体の売却額（[04 §8]）。買値（周回グレード込み）の半額＋強化値ぶんの上乗せ。 */
export function equipSellValue(inst: EquipInstance): number {
  const buyPrice = (EQUIPMENT[inst.masterId]?.buyPrice ?? 0) * gradeMult(inst.grade);
  return Math.floor(buyPrice / 2) + inst.forgeLevel * 10;
}

/** 装備個体を売却する（[04 §8]）。 */
export function sellEquipment(save: SaveData, instanceId: string): SaveData {
  const inst = save.guild.equipment.find((e) => e.id === instanceId);
  if (!inst) return save;
  // v3.0.0 §6: ジェム限定装備・蒐集王の宝冠は再入手不可のため売却不可（no-op）。
  if (isPreciousEquip(inst.masterId)) return save;
  const gain = equipSellValue(inst);
  const equipment = save.guild.equipment.filter((e) => e.id !== instanceId);
  return { ...save, guild: { ...save.guild, equipment, gold: save.guild.gold + gain } };
}

/**
 * 購入数を「現在の所持数と maxStack から算出した空き」に収める純粋関数。
 *
 * - maxStack が undefined（上限なし）の場合は requested をそのまま返す。
 * - currentStock >= maxStack の場合は 0（所持上限到達済み）。
 * - currentStock + requested > maxStack の場合は maxStack - currentStock に丸める。
 * - それ以外は requested をそのまま返す。
 */
export function clampPurchaseQty(
  currentStock: number,
  maxStack: number | undefined,
  requested: number
): number {
  if (maxStack === undefined) return requested;
  const room = Math.max(0, maxStack - currentStock);
  return Math.min(requested, room);
}

/**
 * 複数購入: 所持金で買える上限（floor(gold/price) と qty の小さい方）まで購入する。
 * 消費アイテムは maxStack を超える分は購入しない（代金もその分だけ）。
 * 0個なら save をそのまま返す。装備は個体プールへ、消費品は倉庫へ qty 個追加。
 */
export function buyMany(save: SaveData, id: ItemId, qty: number): SaveData {
  const grade = EQUIPMENT[id] ? shopEquipGrade(save, id) : 1;
  const price = buyPriceOf(id, grade);
  if (price === null || price <= 0 || qty <= 0) return save;
  const maxAffordable = Math.floor(save.guild.gold / price);
  let actualQty = Math.min(qty, maxAffordable);
  // 消費アイテムで maxStack が設定されている場合、上限を超えないよう制限
  if (!EQUIPMENT[id] && ITEMS[id]) {
    const maxStack = ITEMS[id].maxStack;
    if (maxStack !== undefined) {
      const current = itemCount(save, id);
      const room = Math.max(0, maxStack - current);
      actualQty = Math.min(actualQty, room);
    }
  }
  if (actualQty <= 0) return save;
  const totalCost = price * actualQty;
  let next = save;
  if (EQUIPMENT[id]) {
    for (let i = 0; i < actualQty; i++) {
      next = addEquipment(next, id, 0, grade);
    }
  } else {
    next = addItem(next, id, actualQty);
  }
  return { ...next, guild: { ...next.guild, gold: next.guild.gold - totalCost } };
}

/**
 * 売却: 倉庫から指定グレードの素材/アイテムを qty 個売って所持金を得る。
 * 素材なら関連装備を恒久解放し、その装備のショップ表示グレードを「売った素材の周回グレード」に引き上げる（[06 §3]）。
 */
export function sell(save: SaveData, id: ItemId, qty = 1, grade = 1): SaveData {
  // v3.0.0 §3: 換金アイテム・秘宝（category:'valuable'）はゴールド売却不可（換金はジェムのみ）。
  if (ITEMS[id]?.category === 'valuable') return save;
  const have = save.guild.storage
    .filter((s) => s.itemId === id && (s.grade ?? 1) === grade)
    .reduce((a, s) => a + s.qty, 0);
  if (have < qty) return save;
  const gain = sellPriceOf(id, grade) * qty;
  const next = removeItem(save, id, qty, grade);
  // 素材売却での品揃え解放（[04 §8]）。解放装備のグレードを素材グレードまで引き上げる。
  const unlocks = unlocksFromSelling(id);
  const unlockedItemIds = [
    ...next.shopStock.unlockedItemIds,
    ...unlocks.filter((eid) => !next.shopStock.unlockedItemIds.includes(eid)),
  ];
  const unlockedGrades = { ...(next.shopStock.unlockedGrades ?? {}) };
  for (const eid of unlocks) {
    unlockedGrades[eid] = Math.max(unlockedGrades[eid] ?? 1, grade);
  }
  return {
    ...next,
    guild: { ...next.guild, gold: next.guild.gold + gain },
    shopStock: { ...next.shopStock, unlockedItemIds, unlockedGrades },
  };
}

/**
 * 装備マスター ID から装備可能な職業名一覧を返す（CLASSES の定義順）。
 * - accessory（装飾品）は全職業。
 * - weapon は equipableWeaponTypes に eq.weaponType を含む職業。
 * - armor は equipableArmorTypes に eq.armorType を含む職業。
 */
export function equipableClassNames(masterId: ItemId): string[] {
  const eq = EQUIPMENT[masterId];
  if (!eq) return [];
  if (eq.slot === 'accessory') {
    return Object.values(CLASSES).map((c) => c.name);
  }
  if (eq.slot === 'weapon') {
    return Object.values(CLASSES)
      .filter((c) => eq.weaponType !== undefined && c.equipableWeaponTypes.includes(eq.weaponType))
      .map((c) => c.name);
  }
  // armor
  return Object.values(CLASSES)
    .filter((c) => eq.armorType !== undefined && c.equipableArmorTypes.includes(eq.armorType))
    .map((c) => c.name);
}

// ============================================================================
// v3.0.0 §6: ジェム交換所。換金アイテム→ジェム／ジェムでのみ購入できる限定装備。
// ============================================================================

export interface GemExchangeEntry {
  itemId: ItemId;
  name: string;
  qty: number;
  gemValue: number;
}

/** 倉庫内の gemValue 付きアイテム（換金アイテム）一覧。grade は無視し qty を合算する。 */
export function gemExchangeList(save: SaveData): GemExchangeEntry[] {
  const totals = new Map<ItemId, number>();
  for (const s of save.guild.storage) {
    if (!ITEMS[s.itemId]?.gemValue) continue;
    totals.set(s.itemId, (totals.get(s.itemId) ?? 0) + s.qty);
  }
  return [...totals.entries()].map(([itemId, qty]) => ({
    itemId,
    name: ITEMS[itemId].name,
    qty,
    gemValue: ITEMS[itemId].gemValue!,
  }));
}

/** 該当アイテムを（grade 問わず）全数消費し、gems += gemValue * qty する。所持していなければ変更しない。 */
export function exchangeForGems(save: SaveData, itemId: ItemId): SaveData {
  const gemValue = ITEMS[itemId]?.gemValue;
  if (!gemValue) return save;
  const totalQty = itemCount(save, itemId);
  if (totalQty <= 0) return save;
  const storage = save.guild.storage.filter((s) => s.itemId !== itemId);
  return {
    ...save,
    guild: { ...save.guild, storage, gems: save.guild.gems + gemValue * totalQty },
  };
}

export interface GemEquipEntry {
  id: ItemId;
  name: string;
  note: string;
  gemPrice: number;
}

/** gemPrice を持つ装備一覧（ジェム限定装備。§6）。equip_collector_crown は gemPrice 無しなので自然に除外される。 */
export function gemEquipCatalog(): GemEquipEntry[] {
  return Object.values(EQUIPMENT)
    .filter((eq) => eq.gemPrice !== undefined)
    .map((eq) => ({ id: eq.id, name: eq.name, note: equipNote(eq.id, 1), gemPrice: eq.gemPrice! }));
}

/** ジェムでジェム限定装備を購入する。gems が不足、または gemPrice 未設定の装備なら変更しない。 */
export function buyWithGems(save: SaveData, equipId: ItemId): SaveData {
  const eq = EQUIPMENT[equipId];
  if (!eq || eq.gemPrice === undefined) return save;
  if (save.guild.gems < eq.gemPrice) return save;
  const next = addEquipment(save, equipId, 0, 1);
  return { ...next, guild: { ...next.guild, gems: next.guild.gems - eq.gemPrice } };
}
