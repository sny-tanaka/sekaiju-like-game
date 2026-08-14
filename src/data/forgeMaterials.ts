import type { ItemId } from '@/domain/types';

// ============================================================================
// 鍛冶: 専用素材での強化ルート（[04 §4] B）。
// forgeLevel が FORGE.MATERIAL_REQUIRED_LEVEL を新たに跨ぐ強化で、装備の
// tier に対応する専用素材（各ティア確定ドロップのボス素材）を追加消費する。
// tier0 はエントリなし＝素材不要。tier5 は専用素材が無いため tier4 を流用する。
// ============================================================================

/** 装備 tier → 強化で要求する専用素材の ItemId。未定義の tier（0）は素材不要。 */
export const FORGE_MATERIAL_BY_TIER: Partial<Record<number, ItemId>> = {
  1: 'item_mat_t1_lord_pelt',
  2: 'item_mat_t2_monarch_diadem',
  3: 'item_mat_t3_sovereign_horn',
  4: 'item_mat_t4_sovereign_crown',
  5: 'item_mat_t4_sovereign_crown', // tier5専用素材が無いためtier4を流用
};
