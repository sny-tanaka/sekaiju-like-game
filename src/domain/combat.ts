import { BALANCE, enemyScale } from '@/data/balance';
import type {
  ActiveBuff,
  BuffStatTarget,
  Combatant,
  DamageResult,
  DerivedCombat,
  Element,
  EnemyMaster,
  EquipBonuses,
  PassiveMods,
  PhysElement,
  Rng,
  Stats,
} from '@/domain/types';

// ============================================================================
// 戦闘計算（設計書 03 §7 / 06 §3）。すべて純関数・乱数注入でテスト再現可能。
// ダメージは除算型（深層でも防御が一定割合効く）。係数は BALANCE（06 §3.1）に集約。
// ============================================================================

const STAT_KEYS = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'] as const;
const PHYS: PhysElement[] = ['slash', 'pierce', 'bash'];

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

/** ステータスを係数倍する（敵スケール用）。 */
export function scaleStats(base: Stats, factor: number): Stats {
  const out = {} as Stats;
  for (const k of STAT_KEYS) out[k] = Math.round(base[k] * factor);
  return out;
}

/** 出現階に応じた敵の最終ステータス（[06 §3]）。 */
export function effectiveEnemyStats(enemy: EnemyMaster, depth: number): Stats {
  return scaleStats(enemy.baseStats, enemyScale(depth, enemy.refDepth));
}

/**
 * 指定ステータス対象のバフ合成倍率（[03 §6.3]）。
 * 同 stackGroup 内は「1.0 からの乖離が最大」のものだけ採用、group をまたいで乗算。
 * 各要素 0.5〜1.5、最終 0.25〜2.0 にクランプ。
 */
export function buffMultiplier(buffs: ActiveBuff[], stat: BuffStatTarget): number {
  const byGroup = new Map<string, number>();
  for (const b of buffs) {
    if (b.stat !== stat) continue;
    const m = clamp(b.modifier, 0.5, 1.5);
    const cur = byGroup.get(b.stackGroup);
    if (cur === undefined || Math.abs(m - 1) > Math.abs(cur - 1)) {
      byGroup.set(b.stackGroup, m);
    }
  }
  let mult = 1;
  for (const m of byGroup.values()) mult *= m;
  return clamp(mult, 0.25, 2.0);
}

/**
 * 素ステータス＋装備＋バフ＋パッシブから戦闘派生値を算出（[03 §7]）。
 * patk = str*2 + 装備atk、… にバフ倍率とパッシブ常時倍率（[03 §5.4]）を乗算。命中/回避/クリ率も算出。
 */
export function deriveCombat(
  stats: Stats,
  equip: EquipBonuses,
  buffs: ActiveBuff[],
  passive?: PassiveMods
): DerivedCombat {
  const p = (k: keyof PassiveMods) => passive?.[k] ?? 1;
  const patk = (stats.str * 2 + (equip.atk ?? 0)) * buffMultiplier(buffs, 'patk') * p('patk');
  const pdef = (stats.vit * 2 + (equip.def ?? 0)) * buffMultiplier(buffs, 'pdef') * p('pdef');
  const matk = (stats.int * 2 + (equip.mat ?? 0)) * buffMultiplier(buffs, 'matk') * p('matk');
  const mdef = (stats.mnd * 2 + (equip.mdf ?? 0)) * buffMultiplier(buffs, 'mdef') * p('mdef');
  return {
    patk,
    pdef,
    matk,
    mdef,
    hit: stats.agi,
    acc: stats.agi * buffMultiplier(buffs, 'acc') * p('acc'),
    eva: stats.agi * buffMultiplier(buffs, 'eva') * p('eva'),
    crit: stats.luc,
  };
}

const isBlind = (c: Combatant) => c.ailments.some((a) => a.type === 'blind');
const isLegBound = (c: Combatant) => c.ailments.some((a) => a.type === 'legBind');

/**
 * 物理/魔法スキル1ヒットのダメージを算出（[03 §7]）。
 * 乱数消費順を固定: ①命中 → ②ダメージ振れ → ③クリ。
 * elementMultiplier は属性相性（弱点1.5/等倍1.0/耐性0.5/無効0）を呼び出し側で解決して渡す。
 */
export function computeDamage(
  attacker: Combatant,
  defender: Combatant,
  params: {
    statBase: 'str' | 'int'; // 物理=str / 魔法=int
    power: number; // スキル倍率
    element: Element;
    elementMultiplier: number;
  },
  rng: Rng
): DamageResult {
  const isPhysical = params.statBase === 'str';
  const atkD = deriveCombat(attacker.stats, attacker.equip, attacker.buffs, attacker.passive);
  const defD = deriveCombat(defender.stats, defender.equip, defender.buffs, defender.passive);
  const atk = isPhysical ? atkD.patk : atkD.matk;
  const def = isPhysical ? defD.pdef : defD.mdef;

  // ① 命中判定（物理のみ。魔法は必中＝属性補正のみ）。acc/eva バフを反映する。
  let hit = true;
  if (isPhysical) {
    const blind = isBlind(attacker) ? BALANCE.BLIND_ACC_PENALTY : 0;
    // 脚封じ（legBind）は回避をほぼ無効化する（[03 §6]）。
    const eva = isLegBound(defender) ? 0 : defD.eva;
    const hitChance = clamp(
      BALANCE.BASE_HIT + (atkD.acc - eva) * BALANCE.HIT_AGI_K - blind,
      BALANCE.HIT_MIN,
      1.0
    );
    hit = rng.next() < hitChance;
  }
  if (!hit) return { damage: 0, hit: false, critical: false };

  // 基礎ダメージ → 除算型で防御反映
  const base = atk * params.power;
  const mitigated = (base * BALANCE.DAMAGE_DEF_K) / (BALANCE.DAMAGE_DEF_K + Math.max(0, def));

  // 隊列補正（近接物理）: 攻撃側後衛＝与ダメ減、防御側後衛＝被ダメ減を独立に乗算（[03 §3/§7]）
  const physicalMelee = isPhysical && PHYS.includes(params.element as PhysElement);
  const atkRowMult = physicalMelee && attacker.row === 'back' ? BALANCE.BACK_ROW_MELEE_MULT : 1;
  const defRowMult = physicalMelee && defender.row === 'back' ? BALANCE.BACK_ROW_MELEE_MULT : 1;
  const rowMult = atkRowMult * defRowMult;

  // ② ダメージ振れ
  const [lo, hi] = BALANCE.DMG_VARIANCE;
  const variance = lo + rng.next() * (hi - lo);

  let dmg = mitigated * params.elementMultiplier * rowMult * variance;

  // ③ クリティカル（パッシブ crit は加算補正。[03 §5.4]）
  const critRate = clamp(
    BALANCE.CRIT_BASE +
      (attacker.stats.luc - defender.stats.luc) * BALANCE.CRIT_LUC_K +
      (attacker.passive?.crit ?? 0),
    BALANCE.CRIT_MIN,
    BALANCE.CRIT_MAX
  );
  const critical = rng.next() < critRate;
  if (critical) dmg *= BALANCE.CRIT_MULT;

  // 無効(0倍)なら 0、それ以外は最低1
  const final = params.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor(dmg));
  return { damage: final, hit: true, critical };
}

/**
 * 行動順を実効 AGI 降順で決める（[03 §10]）。同値は rng でタイブレーク（消費順固定）。
 * 戦闘不能（isDown）は除外。
 */
export function resolveTurnOrder(combatants: Combatant[], rng: Rng): Combatant[] {
  return combatants
    .filter((c) => !c.isDown)
    .map((c) => ({ c, agi: c.stats.agi, tie: rng.next() }))
    .sort((a, b) => b.agi - a.agi || b.tie - a.tie)
    .map((x) => x.c);
}
