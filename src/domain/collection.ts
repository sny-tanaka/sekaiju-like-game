import { BALANCE } from '@/data/balance';
import { COLLECTIBLE_BY_ENEMY } from '@/data/collectibles';
import { ENEMIES } from '@/data/enemies';
import { addEquipment } from '@/domain/inventory';
import type { ItemId, SaveData } from '@/domain/types';

// ============================================================================
// 秘宝コレクション（v3.0.0 §5）。帯（tierBand）コンプ・全種コンプ報酬の付与と、
// 図鑑 UI 向けの集計を扱う純関数群。
// ============================================================================

/** tierBand（0..4）ごとの秘宝 itemId 一覧。COLLECTIBLE_BY_ENEMY と ENEMIES.tierBand から動的に算出する。 */
function bandItemIds(): ItemId[][] {
  const bands: ItemId[][] = [[], [], [], [], []];
  for (const [enemyId, itemId] of Object.entries(COLLECTIBLE_BY_ENEMY)) {
    const band = ENEMIES[enemyId]?.tierBand;
    if (band === undefined || !bands[band]) continue;
    bands[band].push(itemId);
  }
  return bands;
}

const bandFlagKey = (band: number): string => `collectionBand${band}`;
const ALL_COMPLETE_FLAG = 'collectionAll';

/**
 * 秘宝コレクションの進捗に応じた報酬を付与する純関数。
 * - 帯（tierBand）12種すべて所持で ✦COLLECT_BAND_GEMS（flags でランク帯ごとに1回のみ）。
 * - 60種すべて所持で ✦COLLECT_ALL_GEMS + 限定装備 equip_collector_crown（flags で1回のみ）。
 * save.collection 更新後、applyBattleResult から呼び出す想定。
 */
export function applyCollectionRewards(save: SaveData): SaveData {
  let next = save;
  const bands = bandItemIds();
  let gems = next.guild.gems;
  const flags = { ...next.flags };
  let flagsChanged = false;

  for (let band = 0; band < bands.length; band++) {
    const key = bandFlagKey(band);
    if (flags[key]) continue;
    const ids = bands[band];
    if (ids.length === 0) continue;
    const complete = ids.every((id) => (next.collection[id] ?? 0) >= 1);
    if (complete) {
      gems += BALANCE.COLLECT_BAND_GEMS;
      flags[key] = true;
      flagsChanged = true;
    }
  }

  const allIds = Object.values(COLLECTIBLE_BY_ENEMY);
  if (!flags[ALL_COMPLETE_FLAG] && allIds.every((id) => (next.collection[id] ?? 0) >= 1)) {
    gems += BALANCE.COLLECT_ALL_GEMS;
    flags[ALL_COMPLETE_FLAG] = true;
    flagsChanged = true;
    next = addEquipment(next, 'equip_collector_crown', 0, 1);
  }

  if (!flagsChanged) return next;
  return { ...next, guild: { ...next.guild, gems }, flags };
}

export interface CollectionBandSummary {
  band: number;
  owned: number;
  total: number;
  complete: boolean;
}

export interface CollectionSummary {
  bands: CollectionBandSummary[];
  totalOwned: number;
  totalAll: number;
  allComplete: boolean;
}

/** 図鑑 UI 用の集計。帯ごとの所持数・総所持数・全コンプ達成を返す。 */
export function collectionSummary(save: SaveData): CollectionSummary {
  const bands = bandItemIds().map((ids, band) => {
    const owned = ids.filter((id) => (save.collection[id] ?? 0) >= 1).length;
    return { band, owned, total: ids.length, complete: ids.length > 0 && owned === ids.length };
  });
  const totalAll = Object.keys(COLLECTIBLE_BY_ENEMY).length;
  const totalOwned = bands.reduce((a, b) => a + b.owned, 0);
  return { bands, totalOwned, totalAll, allComplete: totalAll > 0 && totalOwned === totalAll };
}
