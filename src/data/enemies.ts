import type { EnemyId, EnemyMaster } from '@/domain/types';

// ============================================================================
// 敵マスター（[03]・[06 §3]）。
// baseStats は refDepth での等倍値。出現階に応じて effectiveEnemyStats でスケールする。
// Phase 0 は第1帯（1〜10階）の最小プールのみ。本格的な敵設計は Phase 2+。
// ============================================================================

export const ENEMIES: Record<EnemyId, EnemyMaster> = {
  enemy_slime: {
    id: 'enemy_slime',
    name: 'スライム',
    baseStats: { hp: 18, tp: 0, str: 5, vit: 4, agi: 4, int: 2, mnd: 3, luc: 3 },
    refDepth: 1,
    tierBand: 0,
  },
  enemy_giant_rat: {
    id: 'enemy_giant_rat',
    name: 'おおねずみ',
    baseStats: { hp: 14, tp: 0, str: 6, vit: 3, agi: 7, int: 2, mnd: 2, luc: 4 },
    refDepth: 1,
    tierBand: 0,
  },
  enemy_cave_bat: {
    id: 'enemy_cave_bat',
    name: 'どうくつコウモリ',
    baseStats: { hp: 12, tp: 0, str: 5, vit: 2, agi: 9, int: 3, mnd: 2, luc: 5 },
    refDepth: 1,
    tierBand: 0,
  },
  // 第10階ボス（[06 §4]）の暫定枠。
  enemy_boss_gatekeeper: {
    id: 'enemy_boss_gatekeeper',
    name: '門番のゴーレム',
    baseStats: { hp: 220, tp: 0, str: 18, vit: 16, agi: 6, int: 4, mnd: 10, luc: 6 },
    refDepth: 10,
    tierBand: 0,
  },
};
