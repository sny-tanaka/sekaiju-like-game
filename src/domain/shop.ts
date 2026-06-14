import { EQUIPMENT } from '@/data/equipment';
import { ITEMS, sellPrice as itemSellPrice } from '@/data/items';
import { addItem, removeItem } from '@/domain/inventory';
import type { ItemId, SaveData } from '@/domain/types';

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
};

const equipNote = (id: ItemId): string => {
  const b = EQUIPMENT[id].bonuses;
  const parts: string[] = [];
  if (b.atk) parts.push(`ATK+${b.atk}`);
  if (b.mat) parts.push(`MAT+${b.mat}`);
  if (b.def) parts.push(`DEF+${b.def}`);
  if (b.mdf) parts.push(`MDF+${b.mdf}`);
  return parts.join(' ');
};

/**
 * 購入できる商品一覧（消費アイテム＋解放ティア以下の装備＋素材売却で解放済みの装備）。
 */
export function shopCatalog(save: SaveData): ShopEntry[] {
  const tier = unlockedTier(save);
  const unlockedIds = new Set(save.shopStock.unlockedItemIds);
  const items: ShopEntry[] = Object.values(ITEMS)
    .filter((it) => it.buyPrice > 0)
    .map((it) => ({ id: it.id, name: it.name, price: it.buyPrice, kind: 'item' }));
  const equips: ShopEntry[] = Object.values(EQUIPMENT)
    .filter((eq) => eq.tier <= tier || unlockedIds.has(eq.id))
    .map((eq) => ({
      id: eq.id,
      name: eq.name,
      price: eq.buyPrice,
      kind: 'equip',
      note: equipNote(eq.id),
    }));
  return [...equips, ...items];
}

/** 素材売却で解放される装備 ID（無ければ空）。 */
export function unlocksFromSelling(itemId: ItemId): ItemId[] {
  return SELL_UNLOCKS[itemId] ?? [];
}

/** 購入価格（ITEMS / EQUIPMENT 共通）。存在しなければ null。 */
export function buyPriceOf(id: ItemId): number | null {
  return ITEMS[id]?.buyPrice ?? EQUIPMENT[id]?.buyPrice ?? null;
}

/** 売却価格。装備は買値の半額、アイテムは items.sellPrice。 */
export function sellPriceOf(id: ItemId): number {
  if (ITEMS[id]) return itemSellPrice(ITEMS[id]);
  if (EQUIPMENT[id]) return Math.floor(EQUIPMENT[id].buyPrice / 2);
  return 0;
}

/** 購入: 所持金が足りれば 1 個購入して倉庫へ。 */
export function buy(save: SaveData, id: ItemId): SaveData {
  const price = buyPriceOf(id);
  if (price === null || price <= 0) return save;
  if (save.guild.gold < price) return save;
  const next = addItem(save, id, 1);
  return { ...next, guild: { ...next.guild, gold: next.guild.gold - price } };
}

/** 売却: 倉庫から qty 個売って所持金を得る。素材なら関連装備を恒久解放する。 */
export function sell(save: SaveData, id: ItemId, qty = 1): SaveData {
  const have = save.guild.storage.find((s) => s.itemId === id)?.qty ?? 0;
  if (have < qty) return save;
  const gain = sellPriceOf(id) * qty;
  const next = removeItem(save, id, qty);
  // 素材売却での品揃え解放（[04 §8]）
  const newlyUnlocked = unlocksFromSelling(id).filter(
    (eid) => !next.shopStock.unlockedItemIds.includes(eid)
  );
  const unlockedItemIds = [...next.shopStock.unlockedItemIds, ...newlyUnlocked];
  return {
    ...next,
    guild: { ...next.guild, gold: next.guild.gold + gain },
    shopStock: { ...next.shopStock, unlockedItemIds },
  };
}
