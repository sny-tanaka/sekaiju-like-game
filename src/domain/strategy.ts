/**
 * おまかせ戦闘の作戦システム（issue #61）。
 * キャラごとの作戦に従って自動コマンドを決定する純関数群。
 */

import { BATTLE_SKILLS } from '@/data/battleSkills';
import { computeSkillTpCost } from '@/domain/skillCost';
import type { BattleSkillDef, BattleState, Combatant, Element, SkillId } from '@/domain/types';

export type Strategy = 'gungan' | 'batchiri' | 'inochi' | 'tpKeep' | 'meirei';

/** UI の commands に積む値。battle/index.tsx の AllyCmd と同一構造。 */
export type AutoCmd =
  | { kind: 'attack' }
  | { kind: 'guard' }
  | { kind: 'skill'; skillId: SkillId; targetId?: string };

/** 作戦の表示名リスト（作戦変更UIで使用）。 */
export const STRATEGY_LIST: { id: Strategy; label: string }[] = [
  { id: 'gungan', label: 'ガンガンいこうぜ' },
  { id: 'batchiri', label: 'バッチリがんばれ' },
  { id: 'inochi', label: 'いのちをだいじに' },
  { id: 'tpKeep', label: 'TPつかうな' },
  { id: 'meirei', label: 'めいれいさせろ' },
];

/** 作戦の短縮ラベル（キャラカード内表示用）。 */
export const STRATEGY_SHORT_LABEL: Record<Strategy, string> = {
  gungan: 'ガンガン',
  batchiri: 'バッチリ',
  inochi: 'いのち',
  tpKeep: 'TP温存',
  meirei: 'めいれい',
};

// ============================================================================
// ヘルパ関数
// ============================================================================

/** actor が使用可能なスキル ID の配列。TP が足りるものだけ。 */
function usableSkills(actor: Combatant, learnedSkills: Record<SkillId, number>): SkillId[] {
  return Object.keys(learnedSkills).filter((sid) => {
    const def = BATTLE_SKILLS[sid];
    if (!def) return false;
    const lv = learnedSkills[sid] ?? 1;
    return actor.tp >= computeSkillTpCost(def, lv);
  });
}

/** 生存している敵の配列。 */
function aliveEnemies(state: BattleState): Combatant[] {
  return state.enemies.filter((e) => !e.isDown);
}

/** 生存している味方の配列。 */
function aliveAllies(state: BattleState): Combatant[] {
  return state.allies.filter((a) => !a.isDown);
}

/** 戦闘不能の味方の配列。 */
function downedAllies(state: BattleState): Combatant[] {
  return state.allies.filter((a) => a.isDown);
}

/** スキルに damage 効果が含まれるか。 */
function isAttack(def: BattleSkillDef): boolean {
  return def.effects.some((e) => e.kind === 'damage');
}

/** スキルに heal 効果が含まれ revive が含まれないか。 */
function isHeal(def: BattleSkillDef): boolean {
  return (
    def.effects.some((e) => e.kind === 'heal') && !def.effects.some((e) => e.kind === 'revive')
  );
}

/** スキルに revive 効果が含まれるか。 */
function isRevive(def: BattleSkillDef): boolean {
  return def.effects.some((e) => e.kind === 'revive');
}

/** スキルに cleanse 効果が含まれるか。 */
function isCleanse(def: BattleSkillDef): boolean {
  return def.effects.some((e) => e.kind === 'cleanse');
}

/** 属性倍率（耐性）を返す。未指定は 1.0。 */
function elementMult(target: Combatant, element: Element): number {
  return target.resist?.[element] ?? 1.0;
}

/** ダメージ期待値の概算スコア。 */
function damageScore(
  def: BattleSkillDef,
  actor: Combatant,
  target: Combatant,
  level: number
): number {
  let score = 0;
  for (const effect of def.effects) {
    if (effect.kind !== 'damage') continue;
    const power = effect.power(level);
    const hits = effect.hits ?? 1;
    const mult = elementMult(target, def.element);
    const stat = effect.statBase === 'str' ? actor.stats.str : actor.stats.int;
    score += power * hits * mult * stat;
  }
  return score;
}

/** 通常攻撃のダメージスコア（bash 属性・str ベース）。 */
function attackScore(actor: Combatant, target: Combatant): number {
  const mult = elementMult(target, 'bash');
  return 1.0 * 1 * mult * actor.stats.str;
}

/**
 * ダメージスキル候補の中でスコアが最大のスキルを選ぶ。
 * enemyAll / enemyRow は aliveEnemies 数を加味する。
 */
function bestDamageSkill(
  skillIds: SkillId[],
  actor: Combatant,
  target: Combatant,
  learnedSkills: Record<SkillId, number>,
  aliveEnemiesCount: number
): { skillId: SkillId; score: number } | null {
  let best: { skillId: SkillId; score: number } | null = null;
  for (const sid of skillIds) {
    const def = BATTLE_SKILLS[sid];
    if (!def || !isAttack(def)) continue;
    const lv = learnedSkills[sid] ?? 1;
    let score = damageScore(def, actor, target, lv);
    // enemyAll / enemyRow は複数体ヒットを概算（最大3体）
    if (def.target === 'enemyAll' || def.target === 'enemyRow') {
      score *= Math.min(aliveEnemiesCount, 3);
    }
    if (best === null || score >= best.score) {
      best = { skillId: sid, score };
    }
  }
  return best;
}

// ============================================================================
// pickAutoCommand: 作戦に従って actor の自動行動を1件決定する純関数。
// ============================================================================

/**
 * 作戦に従って actor の自動行動を1件決定する純関数。
 * @param strategy - 作戦種別
 * @param actor - 行動するキャラの Combatant
 * @param state - 現在の戦闘状態
 * @param learnedSkills - キャラの習得スキル（skillId -> Lv）
 */
export function pickAutoCommand(
  strategy: Strategy,
  actor: Combatant,
  state: BattleState,
  learnedSkills: Record<SkillId, number>
): AutoCmd {
  switch (strategy) {
    case 'gungan':
      return pickGungan(actor, state, learnedSkills);
    case 'batchiri':
      return pickBatchiri(actor, state, learnedSkills);
    case 'inochi':
      return pickInochi(actor, state, learnedSkills);
    case 'tpKeep':
      return pickTpKeep(actor, state, learnedSkills);
    case 'meirei':
      // めいれいキャラは UI 側で手動入力。安全フォールバックとして通常攻撃を返す。
      return { kind: 'attack' };
  }
}

// ---- ガンガンいこうぜ ----
function pickGungan(
  actor: Combatant,
  state: BattleState,
  learnedSkills: Record<SkillId, number>
): AutoCmd {
  const enemies = aliveEnemies(state);
  const target = enemies[0];
  if (!target) return { kind: 'attack' };

  const skills = usableSkills(actor, learnedSkills);
  const attackSc = attackScore(actor, target);
  const best = bestDamageSkill(skills, actor, target, learnedSkills, enemies.length);

  if (best && best.score >= attackSc) {
    return { kind: 'skill', skillId: best.skillId, targetId: target.id };
  }
  return { kind: 'attack' };
}

// ---- バッチリがんばれ ----
function pickBatchiri(
  actor: Combatant,
  state: BattleState,
  learnedSkills: Record<SkillId, number>
): AutoCmd {
  const skills = usableSkills(actor, learnedSkills);
  const enemies = aliveEnemies(state);
  const target = enemies[0];
  const allies = aliveAllies(state);
  const downed = downedAllies(state);

  // 1. 戦闘不能の味方がいる かつ revive スキルが使える → 蘇生
  if (downed.length > 0) {
    const reviveSkill = skills.find((sid) => {
      const def = BATTLE_SKILLS[sid];
      return def && isRevive(def);
    });
    if (reviveSkill) {
      return { kind: 'skill', skillId: reviveSkill, targetId: downed[0].id };
    }
  }

  // 2. 味方の HP% が 0.3 未満の味方がいる → heal
  const criticalAlly = allies
    .filter((a) => a.hp / a.maxHp < 0.3)
    .sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp)[0];
  if (criticalAlly) {
    const healSkill = skills.find((sid) => {
      const def = BATTLE_SKILLS[sid];
      return def && isHeal(def);
    });
    if (healSkill) {
      return { kind: 'skill', skillId: healSkill, targetId: criticalAlly.id };
    }
  }

  // 3. 状態異常の味方がいる かつ cleanse スキルがある
  const ailmentedAlly = allies.find((a) => a.ailments.length > 0);
  if (ailmentedAlly) {
    const cleanseSkill = skills.find((sid) => {
      const def = BATTLE_SKILLS[sid];
      return def && isCleanse(def);
    });
    if (cleanseSkill) {
      return { kind: 'skill', skillId: cleanseSkill, targetId: ailmentedAlly.id };
    }
  }

  // 4. 味方全員 HP% ≥ 0.8 かつ actor.tp / actor.maxTp ≤ 0.25 → 通常攻撃（TP温存）
  const allHealthy = allies.every((a) => a.hp / a.maxHp >= 0.8);
  const tpLow = actor.maxTp > 0 && actor.tp / actor.maxTp <= 0.25;
  if (allHealthy && tpLow) {
    return { kind: 'attack' };
  }

  // 5. damage スキル候補からスコア最大を選ぶ
  if (target) {
    const best = bestDamageSkill(skills, actor, target, learnedSkills, enemies.length);
    const attackSc = attackScore(actor, target);
    if (best && best.score >= attackSc) {
      return { kind: 'skill', skillId: best.skillId, targetId: target.id };
    }
  }

  return { kind: 'attack' };
}

// ---- いのちをだいじに ----
function pickInochi(
  actor: Combatant,
  state: BattleState,
  learnedSkills: Record<SkillId, number>
): AutoCmd {
  const skills = usableSkills(actor, learnedSkills);
  const allies = aliveAllies(state);
  const downed = downedAllies(state);

  // 1. 戦闘不能の味方 ≥ 1 かつ revive 使用可 → 蘇生
  if (downed.length > 0) {
    const reviveSkill = skills.find((sid) => {
      const def = BATTLE_SKILLS[sid];
      return def && isRevive(def);
    });
    if (reviveSkill) {
      return { kind: 'skill', skillId: reviveSkill, targetId: downed[0].id };
    }
  }

  // 2. 味方の最低 HP% が 0.8 未満 → heal 使用可なら heal
  const lowestHpAlly = allies.sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp)[0];
  if (lowestHpAlly && lowestHpAlly.hp / lowestHpAlly.maxHp < 0.8) {
    const healSkill = skills.find((sid) => {
      const def = BATTLE_SKILLS[sid];
      return def && isHeal(def);
    });
    if (healSkill) {
      return { kind: 'skill', skillId: healSkill, targetId: lowestHpAlly.id };
    }
  }

  // 3. それ以外 → 防御
  return { kind: 'guard' };
}

// ---- TPつかうな ----
function pickTpKeep(
  actor: Combatant,
  state: BattleState,
  learnedSkills: Record<SkillId, number>
): AutoCmd {
  const enemies = aliveEnemies(state);
  const target = enemies[0];

  // TP消費0のスキルのみ対象
  const zeroCostSkills = Object.keys(learnedSkills).filter((sid) => {
    const def = BATTLE_SKILLS[sid];
    if (!def) return false;
    const lv = learnedSkills[sid] ?? 1;
    return computeSkillTpCost(def, lv) === 0;
  });

  if (target && zeroCostSkills.length > 0) {
    const best = bestDamageSkill(zeroCostSkills, actor, target, learnedSkills, enemies.length);
    if (best) {
      return { kind: 'skill', skillId: best.skillId, targetId: target.id };
    }
  }

  return { kind: 'attack' };
}
