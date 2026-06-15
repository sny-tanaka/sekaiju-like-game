import { ENEMIES } from '@/data/enemies';
import { ITEMS } from '@/data/items';
import type { EnemyId, SaveData } from '@/domain/types';

// ============================================================================
// 図鑑・到達記録の集計（[05 §1-2]）。表示用の純関数。
// ============================================================================

export interface MonsterCodexEntry {
  id: EnemyId;
  name: string;
  tierBand: number;
  seen: boolean;
  defeated: boolean;
  /** この敵の全ドロップ（itemId）と、入手済みか。 */
  drops: { itemId: string; name: string; found: boolean }[];
}

/** 全モンスターの図鑑エントリ（tierBand 昇順）。未遭遇は名前を伏せる前提で seen を返す。 */
export function monsterCodex(save: SaveData): MonsterCodexEntry[] {
  const rec = save.bestiary.monsters;
  return Object.values(ENEMIES)
    .slice()
    .sort((a, b) => a.tierBand - b.tierBand || a.id.localeCompare(b.id))
    .map((e) => {
      const r = rec[e.id];
      const foundSet = new Set(r?.dropsFound ?? []);
      return {
        id: e.id,
        name: e.name,
        tierBand: e.tierBand,
        seen: r?.seen ?? false,
        defeated: r?.defeated ?? false,
        drops: (e.drops ?? []).map((d) => ({
          itemId: d.itemId,
          name: ITEMS[d.itemId]?.name ?? d.itemId,
          found: foundSet.has(d.itemId),
        })),
      };
    });
}

export interface CodexSummary {
  monstersTotal: number;
  monstersSeen: number;
  monstersDefeated: number;
  dropsTotal: number;
  dropsFound: number;
  completionPct: number; // 撃破＋ドロップ収集の総合達成率（0..100）
}

/** 図鑑の収集サマリ。 */
export function codexSummary(save: SaveData): CodexSummary {
  const entries = monsterCodex(save);
  const monstersTotal = entries.length;
  const monstersSeen = entries.filter((e) => e.seen).length;
  const monstersDefeated = entries.filter((e) => e.defeated).length;
  let dropsTotal = 0;
  let dropsFound = 0;
  for (const e of entries) {
    for (const d of e.drops) {
      dropsTotal += 1;
      if (d.found) dropsFound += 1;
    }
  }
  const denom = monstersTotal + dropsTotal;
  const numer = monstersDefeated + dropsFound;
  const completionPct = denom === 0 ? 0 : Math.round((numer / denom) * 100);
  return { monstersTotal, monstersSeen, monstersDefeated, dropsTotal, dropsFound, completionPct };
}
