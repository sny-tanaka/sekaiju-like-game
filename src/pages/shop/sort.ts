import { forgeBonusFor, gradedBaseBonuses } from '@/domain/forge';
import type { EquipInstance } from '@/domain/types';

// ============================================================================
// ショップ並び替え純関数（§「4-6」設計書準拠）。
// ============================================================================

export type SortKey =
  | 'priceDesc'
  | 'priceAsc'
  | 'qtyDesc'
  | 'atkDesc'
  | 'matDesc'
  | 'defDesc'
  | 'mdfDesc';

export const SORT_LABEL: Record<SortKey, string> = {
  priceDesc: '金額が高い順',
  priceAsc: '金額が安い順',
  qtyDesc: '所持数が多い順',
  atkDesc: '攻撃力が高い順',
  matDesc: '魔力が高い順',
  defDesc: '物理防御が高い順',
  mdfDesc: '魔法防御が高い順',
};

export type RowStats = { atk: number; mat: number; def: number; mdf: number };

export const EMPTY_STATS: RowStats = { atk: 0, mat: 0, def: 0, mdf: 0 };

/** 装備マスター ID + grade から RowStats を計算（購入カタログ向け、forge 強化なし）。 */
export function buyRowStats(masterId: string, grade: number): RowStats {
  const b = gradedBaseBonuses(masterId, grade);
  return {
    atk: b.atk ?? 0,
    mat: b.mat ?? 0,
    def: b.def ?? 0,
    mdf: b.mdf ?? 0,
  };
}

/** 装備個体から RowStats を計算（売却向け、grade + forgeLevel 反映）。 */
export function instanceRowStats(inst: EquipInstance): RowStats {
  const base = gradedBaseBonuses(inst.masterId, inst.grade);
  const forge = forgeBonusFor(inst.masterId, inst.forgeLevel);
  return {
    atk: (base.atk ?? 0) + (forge.atk ?? 0),
    mat: (base.mat ?? 0) + (forge.mat ?? 0),
    def: (base.def ?? 0) + (forge.def ?? 0),
    mdf: (base.mdf ?? 0) + (forge.mdf ?? 0),
  };
}

/**
 * ソート比較関数。装備中（locked）は外側で末尾固定するため、ここでは通常行のみ扱う。
 * 降順能力値で同値の場合は price 昇順でタイブレーク。
 */
export function compareRows<T extends { price: number; qty: number; stats: RowStats }>(
  sort: SortKey,
  a: T,
  b: T
): number {
  let primary: number;
  switch (sort) {
    case 'priceAsc':
      return a.price - b.price;
    case 'priceDesc':
      return b.price - a.price;
    case 'qtyDesc':
      primary = b.qty - a.qty;
      break;
    case 'atkDesc':
      primary = b.stats.atk - a.stats.atk;
      break;
    case 'matDesc':
      primary = b.stats.mat - a.stats.mat;
      break;
    case 'defDesc':
      primary = b.stats.def - a.stats.def;
      break;
    case 'mdfDesc':
      primary = b.stats.mdf - a.stats.mdf;
      break;
  }
  return primary !== 0 ? primary : a.price - b.price;
}
