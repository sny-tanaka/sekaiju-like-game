import { EQUIPMENT } from '@/data/equipment';
import { ITEMS, sellPrice as itemSellPrice } from '@/data/items';
import { gradeMult, gradedBaseBonuses } from '@/domain/forge';
import { addEquipment, addItem, removeItem } from '@/domain/inventory';
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

const equipNote = (id: ItemId, grade = 1): string => {
  const b = gradedBaseBonuses(id, grade);
  const parts: string[] = [];
  if (b.atk) parts.push(`ATK+${b.atk}`);
  if (b.mat) parts.push(`MAT+${b.mat}`);
  if (b.def) parts.push(`DEF+${b.def}`);
  if (b.mdf) parts.push(`MDF+${b.mdf}`);
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
    .filter((eq) => eq.tier <= tier || unlockedIds.has(eq.id))
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

/** 購入: 所持金が足りれば 1 個購入。装備は解放グレードの個体としてプールへ、消費品は倉庫へ。 */
export function buy(save: SaveData, id: ItemId): SaveData {
  const grade = EQUIPMENT[id] ? shopEquipGrade(save, id) : 1;
  const price = buyPriceOf(id, grade);
  if (price === null || price <= 0) return save;
  if (save.guild.gold < price) return save;
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
  const gain = equipSellValue(inst);
  const equipment = save.guild.equipment.filter((e) => e.id !== instanceId);
  return { ...save, guild: { ...save.guild, equipment, gold: save.guild.gold + gain } };
}

/**
 * 売却: 倉庫から指定グレードの素材/アイテムを qty 個売って所持金を得る。
 * 素材なら関連装備を恒久解放し、その装備のショップ表示グレードを「売った素材の周回グレード」に引き上げる（[06 §3]）。
 */
export function sell(save: SaveData, id: ItemId, qty = 1, grade = 1): SaveData {
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
