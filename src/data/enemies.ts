import type { EnemyId, EnemyMaster } from '@/domain/types';

// ============================================================================
// 敵マスター（[03]・[06 §3]）。
// baseStats は refDepth での等倍値。出現階に応じて effectiveEnemyStats でスケールする。
// exp/gold も refDepth 基準（敵スケールに合わせて報酬もスケールさせる）。
// Phase 0-2 は第1帯（1〜10階）の最小プール＋第10階ボス。
// ============================================================================

export const ENEMIES: Record<EnemyId, EnemyMaster> = {
  enemy_slime: {
    id: 'enemy_slime',
    name: 'スライム',
    baseStats: { hp: 18, tp: 0, str: 5, vit: 4, agi: 4, int: 2, mnd: 3, luc: 3 },
    refDepth: 1,
    tierBand: 0,
    exp: 6,
    gold: 4,
    attackElement: 'bash',
    resist: { fire: 1.5, ice: 0.5 }, // 火に弱く氷に強い
    drops: [{ itemId: 'item_slime_jelly', rate: 0.6 }],
  },
  enemy_giant_rat: {
    id: 'enemy_giant_rat',
    name: 'おおねずみ',
    baseStats: { hp: 14, tp: 0, str: 6, vit: 3, agi: 7, int: 2, mnd: 2, luc: 4 },
    refDepth: 1,
    tierBand: 0,
    exp: 5,
    gold: 5,
    attackElement: 'slash',
    drops: [{ itemId: 'item_rat_tail', rate: 0.5 }],
  },
  enemy_cave_bat: {
    id: 'enemy_cave_bat',
    name: 'どうくつコウモリ',
    baseStats: { hp: 12, tp: 0, str: 5, vit: 2, agi: 9, int: 3, mnd: 2, luc: 5 },
    refDepth: 1,
    tierBand: 0,
    exp: 5,
    gold: 3,
    attackElement: 'pierce',
    resist: { volt: 1.5 },
    drops: [{ itemId: 'item_bat_wing', rate: 0.5 }],
  },
  // 第10階ボス（[06 §4]）の暫定枠。
  enemy_boss_gatekeeper: {
    id: 'enemy_boss_gatekeeper',
    name: '門番のゴーレム',
    baseStats: { hp: 220, tp: 0, str: 18, vit: 16, agi: 6, int: 4, mnd: 10, luc: 6 },
    refDepth: 10,
    tierBand: 0,
    exp: 120,
    gold: 200,
    attackElement: 'bash',
    resist: { slash: 0.5, pierce: 0.5, ice: 1.5 }, // 物理に硬く氷に弱い
    drops: [{ itemId: 'item_golem_core', rate: 1 }],
  },
};
