import { BALANCE } from '@/data/balance';
import { ENEMIES } from '@/data/enemies';
import type { BattleState, EnemyId, SaveData } from '@/domain/types';

// ============================================================================
// 討伐勲章（トロフィー。v3.0.0 §4）。敵ごとの累計討伐数で 銅→銀→金→虹 の4段階。
// しきい値・付与ジェムは BALANCE.TROPHY_THRESHOLDS / BALANCE.TROPHY_GEMS（kind 別）。
// ============================================================================

export type TrophyRank = 0 | 1 | 2 | 3 | 4; // 0=なし 1=銅 2=銀 3=金 4=虹

export type TrophyKind = 'zako' | 'foe' | 'boss';

/** kills 数から到達済みの勲章ランクを返す。しきい値は BALANCE.TROPHY_THRESHOLDS[kind] の [銅,銀,金,虹]。 */
export function trophyRank(kind: TrophyKind, kills: number): TrophyRank {
  const thresholds = BALANCE.TROPHY_THRESHOLDS[kind];
  let rank: TrophyRank = 0;
  for (let i = 0; i < thresholds.length; i++) {
    if (kills >= thresholds[i]) rank = (i + 1) as TrophyRank;
  }
  return rank;
}

/** before→after で新たに越えた勲章ランク分の TROPHY_GEMS を合算する。 */
export function trophyGemsForCrossing(kind: TrophyKind, before: number, after: number): number {
  const beforeRank = trophyRank(kind, before);
  const afterRank = trophyRank(kind, after);
  if (afterRank <= beforeRank) return 0;
  let gems = 0;
  for (let rank = beforeRank + 1; rank <= afterRank; rank++) {
    gems += BALANCE.TROPHY_GEMS[rank - 1];
  }
  return gems;
}

export interface TrophyGain {
  enemyId: EnemyId;
  name: string;
  rank: TrophyRank;
  gems: number;
}

export interface TrophyCounts {
  bronze: number;
  silver: number;
  gold: number;
  rainbow: number;
}

/**
 * 図鑑サマリ用（v3.0.0 §10.4）: 全モンスターの勲章ランク集計。
 * 各ランクは「そのランク以上に到達したモンスターの数」（銀に到達していれば銅の数にも含む）。
 * しきい値は単調増加のため、ある敵が銀に到達していれば必ず銅も通過済み。
 */
export function trophyCounts(save: SaveData): TrophyCounts {
  let bronze = 0;
  let silver = 0;
  let gold = 0;
  let rainbow = 0;
  for (const enemy of Object.values(ENEMIES)) {
    const kind: TrophyKind = enemy.kind ?? 'zako';
    const kills = save.bestiary.monsters[enemy.id]?.kills ?? 0;
    const rank = trophyRank(kind, kills);
    if (rank >= 1) bronze += 1;
    if (rank >= 2) silver += 1;
    if (rank >= 3) gold += 1;
    if (rank >= 4) rainbow += 1;
  }
  return { bronze, silver, gold, rainbow };
}

/** この戦闘で新たに倒した敵の enemyId ごとの撃破数を集計する（勝敗を問わない）。 */
function newlyDefeatedCounts(state: BattleState): Map<EnemyId, number> {
  const counts = new Map<EnemyId, number>();
  for (const e of state.enemies) {
    if (!e.isDown || !e.enemyId) continue;
    counts.set(e.enemyId, (counts.get(e.enemyId) ?? 0) + 1);
  }
  return counts;
}

/**
 * 表示用の純関数。applyBattleResult と同一ロジックで
 * 「この戦闘で新たに到達した勲章」を返す（ジェム付与が発生したものだけ）。
 */
export function trophyGains(save: SaveData, state: BattleState): TrophyGain[] {
  const counts = newlyDefeatedCounts(state);
  const gains: TrophyGain[] = [];
  for (const [enemyId, count] of counts) {
    const master = ENEMIES[enemyId];
    if (!master) continue;
    const kind: TrophyKind = master.kind ?? 'zako';
    const before = save.bestiary.monsters[enemyId]?.kills ?? 0;
    const after = before + count;
    const gems = trophyGemsForCrossing(kind, before, after);
    if (gems > 0) {
      gains.push({ enemyId, name: master.name, rank: trophyRank(kind, after), gems });
    }
  }
  return gains;
}
