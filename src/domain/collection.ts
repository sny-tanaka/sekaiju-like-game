import { BALANCE } from '@/data/balance';
import { COLLECTIBLE_BY_ENEMY } from '@/data/collectibles';
import { ENEMIES } from '@/data/enemies';
import { ITEMS } from '@/data/items';
import { addEquipment } from '@/domain/inventory';
import type { BattleState, EnemyId, ItemId, SaveData } from '@/domain/types';

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

export interface CollectionEntry {
  band: number;
  itemId: ItemId;
  enemyId: EnemyId;
  name: string;
  /** 累計入手数（0=未入手）。 */
  owned: number;
}

/**
 * 図鑑「秘宝コレクション」グリッド用の全 60 エントリ（v3.0.0 §10.4）。
 * tierBand 昇順・同帯内は itemId 昇順で安定ソートする。
 */
export function collectionEntries(save: SaveData): CollectionEntry[] {
  return Object.entries(COLLECTIBLE_BY_ENEMY)
    .map(([enemyId, itemId]) => ({
      band: ENEMIES[enemyId]?.tierBand ?? 0,
      itemId,
      enemyId: enemyId as EnemyId,
      name: ITEMS[itemId]?.name ?? itemId,
      owned: save.collection[itemId] ?? 0,
    }))
    .sort((a, b) => a.band - b.band || a.itemId.localeCompare(b.itemId));
}

export interface CollectibleGain {
  itemId: ItemId;
  name: string;
  /** この戦闘でドロップした数。 */
  count: number;
  /** うち重複入手（applyBattleResult の COLLECT_DUP_GEMS 変換対象）としてジェムに変わった個数。 */
  dupCount: number;
  gems: number;
}

/**
 * 戦闘リザルト表示用の純関数（v3.0.0 §10.5）。この戦闘でドロップした秘宝（collectible）を
 * itemId ごとに集計し、applyBattleResult と同一ロジックで重複入手ジェムを算出する。
 * 呼び出しは applyBattleResult 適用前の save（save.collection が戦闘前の値）を渡すこと。
 */
export function battleCollectibleGains(save: SaveData, state: BattleState): CollectibleGain[] {
  if (state.outcome !== 'win') return [];
  const counts = new Map<ItemId, number>();
  for (const d of state.drops) {
    if (!ITEMS[d.itemId]?.collectible) continue;
    counts.set(d.itemId, (counts.get(d.itemId) ?? 0) + 1);
  }
  const gains: CollectibleGain[] = [];
  for (const [itemId, count] of counts) {
    const before = save.collection[itemId] ?? 0;
    // applyBattleResult は drops を1件ずつ処理し「加算前の値が1以上」の回にだけジェム変換する。
    // 初期所持0なら最初の1個は新規入手（無変換）、2個目以降が重複としてジェムに変わる。
    const dupCount = before >= 1 ? count : Math.max(0, count - 1);
    gains.push({
      itemId,
      name: ITEMS[itemId]?.name ?? itemId,
      count,
      dupCount,
      gems: dupCount * BALANCE.COLLECT_DUP_GEMS,
    });
  }
  return gains;
}

/**
 * 戦闘リザルト表示用の純関数（v3.0.0 §10.5・§3）。この戦闘の勝利で「虹輝の宝珠」の
 * ボスゲート初回撃破ボーナス（domain/dive.ts の defeatBoss と同一判定）が発生するかを判定する。
 * 呼び出しは resolveFoeBattle/defeatBoss 適用前の save を渡すこと。
 */
export function bossGatePrismGain(save: SaveData, state: BattleState): boolean {
  if (state.outcome !== 'win') return false;
  const dive = save.diveState;
  if (!dive?.pendingFoeBattle?.isBoss) return false;
  return save.towerState.bossGates[dive.depth]?.defeated !== true;
}
