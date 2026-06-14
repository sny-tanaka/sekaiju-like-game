import { CLASSES } from '@/data/classes';
import { RACES } from '@/data/races';
import { TITLES } from '@/data/titles';
import type { Character, SkillId, SkillTreeNode } from '@/domain/types';

// ============================================================================
// スキル習得・SP 振り分け（[01 §5]・[03 §5]）。
// SP は レベルアップで total が増え、1 Lv 習得につき 1 SP 消費（MVP）。
// 習得可能なノードは 職業ツリー＋種族(ユニオン)ツリー＋称号ツリー。
// ============================================================================

/** そのキャラが触れるスキルツリーの全ノード（職業＋種族＋称号）。 */
export function skillNodesFor(char: Character): SkillTreeNode[] {
  const nodes: SkillTreeNode[] = [
    ...(CLASSES[char.classId]?.skillTree.skills ?? []),
    ...(RACES[char.raceId]?.unionSkillTree.skills ?? []),
  ];
  if (char.titleId && TITLES[char.titleId]) {
    nodes.push(...TITLES[char.titleId].skillTree.skills);
  }
  return nodes;
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
  if (availableSP(char) <= 0) return false;
  return prereqsMet(char, node);
}

/** スキルを 1Lv 習得/強化する（SP を 1 消費）。不可なら変更しない。 */
export function learnSkill(char: Character, skillId: SkillId): Character {
  if (!canLearnSkill(char, skillId)) return char;
  return {
    ...char,
    learnedSkills: { ...char.learnedSkills, [skillId]: skillLevel(char, skillId) + 1 },
    skillPoints: { ...char.skillPoints, spent: char.skillPoints.spent + 1 },
  };
}
