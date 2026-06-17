/**
 * スキルTP消費算定モデル（設計書: dev-docs/tp-cost-model.md §1）
 *
 * computeSkillTpCost(def, lv) = max(1, round( Σ_e effectValue(e, lv) ))
 *
 * 各効果の TP 価値を合算して消費TP を算出する統一モデル。
 * 係数は balance.ts の SKILL_TP / AILMENT_SEVERITY を参照。
 */

import { AILMENT_SEVERITY, SKILL_TP } from '@/data/balance';
import type { SkillEffectDef, TargetType } from '@/domain/types';

// ----------------------------------------------------------------------------
// 対象範囲倍率 T(target)
// ----------------------------------------------------------------------------

function targetMultiplier(target: TargetType): number {
  switch (target) {
    case 'enemyRow':
      return 1.5;
    case 'enemyAll':
    case 'allyAll':
      return 2.0;
    case 'enemyOne':
    case 'allyOne':
    case 'self':
    default:
      return 1.0;
  }
}

// ----------------------------------------------------------------------------
// 効果別 TP 価値
// ----------------------------------------------------------------------------

function effectValue(e: SkillEffectDef, lv: number, target: TargetType): number {
  const T = targetMultiplier(target);

  switch (e.kind) {
    case 'damage': {
      const power = e.power(lv);
      const hits = e.hits ?? 1;
      const drain = e.drain ?? 0;
      return SKILL_TP.Kd * Math.pow(power * hits, SKILL_TP.Pd) * (1 + 0.6 * drain) * T;
    }
    case 'heal': {
      return SKILL_TP.Kh * e.amount(lv) * T;
    }
    case 'restoreTp': {
      // self=純増可（0.5倍）、それ以外=全体付与で本人実質マイナス（2.0倍）。T は掛けない。
      // ratio 指定時は最大TPを 100 と仮定した代理値で見積もる（ratio スキルの過小評価を防ぐ）。
      const base = e.ratio ? e.ratio * 100 : e.amount(lv);
      return (target === 'self' ? 0.5 : 2.0) * base;
    }
    case 'ailment': {
      const sev = AILMENT_SEVERITY[e.ailment] ?? 1.0;
      return SKILL_TP.Ka * e.chance(lv) * e.turns * sev * T;
    }
    case 'buff': {
      return SKILL_TP.Kb * Math.abs(e.modifier(lv) - 1) * e.turns * T;
    }
    case 'summon': {
      return SKILL_TP.Ksummon;
    }
    case 'counter': {
      return SKILL_TP.Kcounter * e.chance(lv) * e.power(lv) * e.turns;
    }
    case 'chase': {
      return SKILL_TP.Kchase * e.power(lv) * e.turns;
    }
    case 'decoy': {
      return SKILL_TP.Kdecoy * e.turns;
    }
    case 'barrier': {
      return SKILL_TP.Kbarrier * e.absorb(lv);
    }
    case 'regen': {
      return SKILL_TP.Kregen * e.amount(lv) * e.turns * T;
    }
    case 'cleanse': {
      return SKILL_TP.Kcleanse * T;
    }
    case 'revive': {
      return SKILL_TP.Krevive + SKILL_TP.Kreviveratio * e.ratio(lv) * 100;
    }
    default:
      return 0;
  }
}

// ----------------------------------------------------------------------------
// 公開API
// ----------------------------------------------------------------------------

/**
 * スキルのTP消費を効果別TP価値の合算で算出する。
 *
 * @param def - effects と target を持つスキル定義（BattleSkillDef 等）
 * @param lv  - 使用するスキルレベル
 * @returns 消費TP（最低1）
 */
export function computeSkillTpCost(
  def: { effects: SkillEffectDef[]; target: TargetType },
  lv: number
): number {
  let total = 0;
  for (const e of def.effects) {
    total += effectValue(e, lv, def.target);
  }
  return Math.max(1, Math.round(total));
}
