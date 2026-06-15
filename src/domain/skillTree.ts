import { CLASSES } from '@/data/classes';
import { RACES } from '@/data/races';
import { TITLES } from '@/data/titles';
import type { Character, SkillId, SkillTreeNode } from '@/domain/types';

// ============================================================================
// スキル習得・SP 振り分け（[01 §5]・[03 §5]）。
// SP は レベルアップで total が増える。1 Lv 習得に必要な SP は「ツリーの深さ」で逓増する
// （前提チェーンの深い＝強力なスキルほど高コスト）。これにより Lv 上限 100 でようやく
// 自職の全ツリーを取り切れる程度の取捨選択が生まれる（[01 §5] の設計意図）。
// 習得可能なノードは 職業ツリー＋種族(ユニオン)ツリー＋称号ツリー。
// ============================================================================

/** スキル1Lvあたりの消費SP（前提チェーンの深さ別）。深いほど高い（[01 §5]）。 */
const SP_COST_BY_DEPTH = [2, 2, 4, 5, 6] as const;

/** 深さ（前提チェーン段数）→ 1Lvあたりの消費SP。 */
export function spCostForDepth(depth: number): number {
  return SP_COST_BY_DEPTH[Math.min(Math.max(0, depth), SP_COST_BY_DEPTH.length - 1)];
}

/** そのキャラが触れるスキルツリーの全ノード（職業＋種族＋称号）。 */
export function skillNodesFor(char: Character): SkillTreeNode[] {
  const nodes: SkillTreeNode[] = [
    ...(CLASSES[char.classId]?.skillTree.skills ?? []),
    ...(RACES[char.raceId]?.raceSkillTree.skills ?? []),
  ];
  if (char.titleId && TITLES[char.titleId]) {
    nodes.push(...TITLES[char.titleId].skillTree.skills);
  }
  return nodes;
}

/**
 * ノードの前提チェーンの深さ（0 = 前提なし）。ツリーをまたぐ前提は無いので、
 * skillNodesFor の合成グラフ上で算出してよい。
 */
export function skillDepth(nodes: SkillTreeNode[], skillId: SkillId): number {
  const byId = new Map(nodes.map((n) => [n.skillId, n]));
  const memo = new Map<string, number>();
  const visit = (id: string, guard = 0): number => {
    const cached = memo.get(id);
    if (cached !== undefined) return cached;
    const node = byId.get(id);
    if (!node || !node.requires?.length || guard > 30) {
      memo.set(id, 0);
      return 0;
    }
    const d =
      1 +
      Math.max(
        ...node.requires.map((r) => (byId.has(r.skillId) ? visit(r.skillId, guard + 1) : 0))
      );
    memo.set(id, d);
    return d;
  };
  return visit(skillId);
}

/** そのスキルを1Lv習得/強化するのに必要な SP（深さ別コスト）。 */
export function skillSpCost(char: Character, skillId: SkillId): number {
  return spCostForDepth(skillDepth(skillNodesFor(char), skillId));
}

export function skillLevel(char: Character, skillId: SkillId): number {
  return char.learnedSkills[skillId] ?? 0;
}

/** 未使用 SP。 */
export function availableSP(char: Character): number {
  return char.skillPoints.total - char.skillPoints.spent;
}

/** 前提スキルを満たしているか。 */
export function prereqsMet(char: Character, node: SkillTreeNode): boolean {
  return (node.requires ?? []).every((r) => skillLevel(char, r.skillId) >= r.level);
}

/** そのスキルを今 1Lv 習得/強化できるか。 */
export function canLearnSkill(char: Character, skillId: SkillId): boolean {
  const node = skillNodesFor(char).find((n) => n.skillId === skillId);
  if (!node) return false;
  if (skillLevel(char, skillId) >= node.maxLevel) return false;
  if (availableSP(char) < skillSpCost(char, skillId)) return false;
  return prereqsMet(char, node);
}

/** スキルを 1Lv 習得/強化する（深さ別の SP を消費）。不可なら変更しない。 */
export function learnSkill(char: Character, skillId: SkillId): Character {
  if (!canLearnSkill(char, skillId)) return char;
  return {
    ...char,
    learnedSkills: { ...char.learnedSkills, [skillId]: skillLevel(char, skillId) + 1 },
    skillPoints: {
      ...char.skillPoints,
      spent: char.skillPoints.spent + skillSpCost(char, skillId),
    },
  };
}
