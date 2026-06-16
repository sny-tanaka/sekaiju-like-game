import { RACES } from '@/data/races';
import type { RaceId, StatKey } from '@/domain/types';

// ============================================================================
// 種族能力ランク算出（issue #29）。
// 6種族間の相対を min-max 正規化してレター（S/A/B/C/D）で示す。
// RANK_REF_LEVEL=20 時点の能力値を比較基準とする。
// ============================================================================

export type StatRank = 'S' | 'A' | 'B' | 'C' | 'D';

const RANK_REF_LEVEL = 20;

const STAT_KEYS: StatKey[] = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];

/** 種族 ID 一覧 */
const RACE_IDS = Object.keys(RACES) as RaceId[];

/**
 * RANK_REF_LEVEL 時点の能力値を算出する。
 * statValue = baseStatsAtLv1[key] + statGrowth[key] * (RANK_REF_LEVEL - 1)
 */
function statValue(raceId: RaceId, key: StatKey): number {
  const race = RACES[raceId];
  return race.baseStatsAtLv1[key] + race.statGrowth[key] * (RANK_REF_LEVEL - 1);
}

/** 正規化値 t からレターランクへ変換する。 */
function toRank(t: number): StatRank {
  if (t >= 0.84) return 'S';
  if (t >= 0.63) return 'A';
  if (t >= 0.42) return 'B';
  if (t >= 0.21) return 'C';
  return 'D';
}

/** モジュールロード時に全種族・全 stat の min/max を計算してメモ化する。 */
const minMaxCache: Record<StatKey, { min: number; max: number }> = {} as Record<
  StatKey,
  { min: number; max: number }
>;

for (const key of STAT_KEYS) {
  const values = RACE_IDS.map((id) => statValue(id, key));
  minMaxCache[key] = {
    min: Math.min(...values),
    max: Math.max(...values),
  };
}

/** 全種族・全 stat のランクをメモ化する。 */
const rankCache: Record<RaceId, Record<StatKey, StatRank>> = {} as Record<
  RaceId,
  Record<StatKey, StatRank>
>;

for (const raceId of RACE_IDS) {
  const ranks = {} as Record<StatKey, StatRank>;
  for (const key of STAT_KEYS) {
    const v = statValue(raceId, key);
    const { min, max } = minMaxCache[key];
    const t = max === min ? 0.5 : (v - min) / (max - min);
    ranks[key] = toRank(t);
  }
  rankCache[raceId] = ranks;
}

/**
 * 指定種族の各能力のレターランクを返す。
 * ランクは6種族間の相対的な min-max 正規化で決定する。
 */
export function raceStatRanks(raceId: RaceId): Record<StatKey, StatRank> {
  const cached = rankCache[raceId];
  if (!cached) {
    throw new Error(`Unknown raceId: ${raceId}`);
  }
  return cached;
}
