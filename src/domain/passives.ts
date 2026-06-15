import { EQUIPMENT } from '@/data/equipment';
import { PASSIVE_SKILLS } from '@/data/passives';
import type { Character, PassiveMods, WeaponType } from '@/domain/types';

// ============================================================================
// パッシブスキルの常時倍率を合算する（[03 §5.4]）。
// 学習中のパッシブを乗算合成（武器マスタリーは対応武器の装備中のみ）。crit は加算。
// 戦闘員生成（buildAlly）時に1回だけ評価し、Combatant.passive に格納する。
// ============================================================================

const MULT_KEYS = ['patk', 'matk', 'pdef', 'mdef', 'acc', 'eva', 'maxHp', 'maxTp'] as const;

/** 装備中の武器種（無ければ undefined）。 */
function equippedWeaponType(char: Character): WeaponType | undefined {
  const inst = char.equipment.weapon;
  if (!inst) return undefined;
  return EQUIPMENT[inst.masterId]?.weaponType;
}

/**
 * キャラの学習済みパッシブから常時倍率を合算する。
 * 倍率系（patk..maxTp）は乗算、crit は加算。マスタリーは対応武器装備中のみ反映。
 */
export function computePassiveMods(char: Character): PassiveMods {
  const weapon = equippedWeaponType(char);
  const out: PassiveMods = {};
  let crit = 0;
  for (const [sid, lv] of Object.entries(char.learnedSkills)) {
    if (lv <= 0) continue;
    const def = PASSIVE_SKILLS[sid];
    if (!def) continue;
    if (def.weaponType && def.weaponType !== weapon) continue; // マスタリーは武器条件付き
    const mods = def.mods(lv);
    for (const k of MULT_KEYS) {
      if (mods[k] !== undefined) out[k] = (out[k] ?? 1) * mods[k];
    }
    if (mods.crit !== undefined) crit += mods.crit;
  }
  if (crit !== 0) out.crit = crit;
  return out;
}
