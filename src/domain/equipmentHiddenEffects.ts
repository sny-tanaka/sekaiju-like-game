import type {
  AilmentType,
  ArmorType,
  Element,
  EquipmentEffect,
  EquipmentMaster,
  StatKey,
  WeaponType,
} from '@/domain/types';

// ============================================================================
// 隠し能力（鍛冶で開花。[04 §3-4]）。
// 装備マスタ66件は全て武器種/防具種の式で自動生成されているため、隠し能力も
// 種別キー（weaponType / armorType / 'accessory'）ごとに1種類を対応づけ、
// 倍率/数値だけティアで伸ばす。個々の装備データに手打ちはしない（都度導出する）。
// ============================================================================

/**
 * 隠し能力（elementResist/ailmentResist/statMod）が開花する forgeLevel 下限（[04 §3-4]）。
 * 本来の置き場所は src/data/balance.ts の FORGE だが、balance.ts は「B: 専用素材での強化ルート」
 * 担当が並行編集するファイルのため、A担当（本ファイル）側にこの定数を置く。
 */
export const HIDDEN_EFFECT_UNLOCK_LEVEL = 3;

const STAT_MOD_BASE = 3;
const STAT_MOD_MULT = 1.5; // round(3 * 1.5^tier) → T0:3 T1:5 T2:7 T3:10 T4:15 T5:23
const RESIST_RATE_WEAK = 0.85; // 15%軽減（重装/軽装の単一属性耐性）
const RESIST_RATE_MED = 0.9; // 10%軽減（衣の魔法3属性・複数属性まとめて軽減するため単体は控えめ）
const RESIST_RATE_ACCESSORY = 0.85; // 状態異常全種15%軽減

const WEAPON_STAT: Record<WeaponType, StatKey> = {
  sword: 'agi',
  spear: 'str',
  axe: 'str',
  bow: 'agi',
  staff: 'int',
  fist: 'luc',
};

const ARMOR_ELEMENT: Record<ArmorType, Element[]> = {
  heavy: ['bash'],
  light: ['slash'],
  clothes: ['fire', 'ice', 'volt'],
};

const ALL_AILMENTS: AilmentType[] = [
  'poison',
  'paralysis',
  'sleep',
  'confusion',
  'curse',
  'blind',
  'instantDeath',
  'headBind',
  'armBind',
  'legBind',
];

/** ティア(0-5)から statMod の数値（隠し能力の STR+N 等）を導出する。 */
export function statModMagnitude(tier: number): number {
  return Math.round(STAT_MOD_BASE * Math.pow(STAT_MOD_MULT, tier));
}

/**
 * 装備マスタから隠し能力を導出する（データに手打ちしない。式で自動導出）。
 * - 武器: 武器種に対応するステータス1種を +statModMagnitude(tier)
 * - 防具: 防具種に対応する属性（複数の場合あり）の被ダメを RESIST_RATE で軽減
 * - 装飾品: 状態異常全種を RESIST_RATE_ACCESSORY で軽減
 */
export function deriveHiddenEffects(eq: EquipmentMaster): EquipmentEffect[] {
  const tier = eq.tier ?? 0;
  if (eq.slot === 'weapon' && eq.weaponType) {
    return [{ kind: 'statMod', stat: WEAPON_STAT[eq.weaponType], value: statModMagnitude(tier) }];
  }
  if (eq.slot === 'armor' && eq.armorType) {
    const rate = eq.armorType === 'clothes' ? RESIST_RATE_MED : RESIST_RATE_WEAK;
    return ARMOR_ELEMENT[eq.armorType].map((element) => ({
      kind: 'elementResist' as const,
      element,
      rate,
    }));
  }
  if (eq.slot === 'accessory') {
    return ALL_AILMENTS.map((ailment) => ({
      kind: 'ailmentResist' as const,
      ailment,
      rate: RESIST_RATE_ACCESSORY,
    }));
  }
  return [];
}
