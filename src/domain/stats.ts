import { BALANCE } from '@/data/balance';
import { RACES } from '@/data/races';
import { TITLES } from '@/data/titles';
import type { Character, StatKey, Stats } from '@/domain/types';

// ============================================================================
// ステータス算出（[01 §2.2 / §5]）。
// 素ステは保存せず常に導出する。式の形:
//   stat(Lv) = baseStatsAtLv1 + (statGrowth + titleGrowthModifier) * (Lv-1) + rebirthBonus
// 線形成長（敵も線形スケールなので相対関係を保ちやすい）。
// ============================================================================

const STAT_KEYS: StatKey[] = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];

/** キャラの素ステータスを種族成長テーブル・Lv・転生ボーナス・称号補正から導出する。 */
export function computeBaseStats(char: Character): Stats {
  const race = RACES[char.raceId];
  if (!race) {
    throw new Error(`computeBaseStats: 未定義の種族 "${char.raceId}"`);
  }

  const level = Math.max(1, Math.min(char.level, BALANCE.LEVEL_CAP));
  const levelSteps = level - 1;
  const titleGrowth = char.titleId ? TITLES[char.titleId]?.growthModifier : undefined;
  const rebirthAll = char.rebirthBonus?.allStats ?? 0;

  const result = {} as Stats;
  for (const key of STAT_KEYS) {
    const growth = race.statGrowth[key] + (titleGrowth?.[key] ?? 0);
    result[key] = race.baseStatsAtLv1[key] + growth * levelSteps + rebirthAll;
  }
  return result;
}
