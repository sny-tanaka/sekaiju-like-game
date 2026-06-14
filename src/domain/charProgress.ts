import { BALANCE, CLASS_CHANGE_LEVEL_PENALTY, TITLE_BONUS_SP, UNLOCK } from '@/data/balance';
import { CLASSES } from '@/data/classes';
import { RACES } from '@/data/races';
import { createCharacter } from '@/domain/saveData';
import type { Character, ClassId, RaceId, RebirthBonus, TitleId } from '@/domain/types';

// ============================================================================
// 転職・転生・称号（[01 §6-8]）。すべて純関数。
// ============================================================================

/** その職業の基本ツリー先頭スキル（開始スキル）。 */
function starterSkillId(classId: ClassId): string | undefined {
  return CLASSES[classId]?.skillTree.skills[0]?.skillId;
}

/** 種族（ユニオン）ツリーのスキル ID 集合。転職で保持する。 */
function raceSkillIds(raceId: RaceId): Set<string> {
  return new Set((RACES[raceId]?.unionSkillTree.skills ?? []).map((n) => n.skillId));
}

const sumLevels = (learned: Record<string, number>) =>
  Object.values(learned).reduce((s, v) => s + v, 0);

/**
 * 転職（[01 §6]）。職業を変更し、レベルを一定値下げ、職業/称号スキルを振り直す。
 * 種族（ユニオン）スキルは保持。称号は外れる。SP 総量は維持（振り直し可能に）。
 * 対象職業は「解放済み」前提（条件付き職業の判定は呼び出し側 / 将来）。
 */
export function transferClass(char: Character, newClassId: ClassId): Character {
  if (!CLASSES[newClassId]) return char;
  const keepIds = raceSkillIds(char.raceId);
  const learned: Record<string, number> = {};
  for (const [sid, lv] of Object.entries(char.learnedSkills)) {
    if (keepIds.has(sid)) learned[sid] = lv;
  }
  // 新職業の開始スキルを無料付与（Lv1）
  const starter = starterSkillId(newClassId);
  if (starter && !learned[starter]) learned[starter] = 1;

  const level = Math.max(1, char.level - CLASS_CHANGE_LEVEL_PENALTY);
  // spent は保持スキル分だけに再計算（職業/称号分の SP を払い戻す）
  const spent = sumLevels(learned) - (starter && learned[starter] ? 1 : 0);

  return {
    ...char,
    classId: newClassId,
    titleId: null,
    level,
    exp: 0,
    learnedSkills: learned,
    skillPoints: { ...char.skillPoints, spent: Math.max(0, spent) },
  };
}

// ---- 転生 ----------------------------------------------------------------

interface RebirthRow {
  min: number;
  max: number;
  allStats: number;
  bonusSp: number;
}
// [01 §7.2] 転生ボーナステーブル
const REBIRTH_TABLE: RebirthRow[] = [
  { min: 30, max: 34, allStats: 2, bonusSp: 4 },
  { min: 35, max: 39, allStats: 3, bonusSp: 4 },
  { min: 40, max: 44, allStats: 4, bonusSp: 5 },
  { min: 45, max: 49, allStats: 5, bonusSp: 5 },
  { min: 50, max: 54, allStats: 6, bonusSp: 6 },
  { min: 55, max: 59, allStats: 7, bonusSp: 6 },
  { min: 60, max: 64, allStats: 8, bonusSp: 7 },
  { min: 65, max: 69, allStats: 9, bonusSp: 7 },
  { min: 70, max: 99, allStats: 10, bonusSp: 8 },
  { min: 100, max: 100, allStats: 20, bonusSp: 10 },
];

/** 転生ボーナス（[01 §7.2]）。最低レベル未満は null。 */
export function lookupRebirthBonus(level: number): RebirthBonus | null {
  const row = REBIRTH_TABLE.find((r) => level >= r.min && level <= r.max);
  return row ? { allStats: row.allStats, bonusSp: row.bonusSp } : null;
}

/** 転生可能か（レベル下限）。 */
export function canReincarnate(char: Character): boolean {
  return char.level >= UNLOCK.REBIRTH_MIN_LEVEL;
}

/**
 * 転生（[01 §7]）。レベル上限到達/到達前のキャラを作り直し、ボーナス付きの新人にする。
 * 開始レベルは転生時の半分（上限30）。ボーナスは直前転生分のみ（累積しない）。
 * 同じ id を維持し、種族・職業・名前は再選択する（引き継がない）。
 */
export function reincarnate(
  char: Character,
  next: { raceId: RaceId; classId: ClassId; name: string }
): Character {
  const bonus = lookupRebirthBonus(char.level);
  if (!bonus) return char; // 下限未満
  const startLv = Math.min(30, Math.floor(char.level / 2));
  const base = createCharacter({ ...next, id: char.id });
  // startLv 分の通常 SP ＋ ボーナス SP
  const total = BALANCE.SP_PER_LEVEL * Math.max(0, startLv - 1) + bonus.bonusSp;
  return {
    ...base,
    level: Math.max(1, startLv),
    exp: 0,
    rebirthBonus: bonus,
    skillPoints: { total, spent: base.skillPoints.spent },
  };
}

// ---- 称号 ----------------------------------------------------------------

/** 称号を習得できるか（到達階・職業の称号候補・未習得）。 */
export function canAcquireTitle(
  char: Character,
  titleId: TitleId,
  deepestReached: number
): boolean {
  if (deepestReached < UNLOCK.TITLE_DEPTH) return false;
  if (char.titleId) return false; // 既に習得済み（MVP は付け替え不可）
  const options = CLASSES[char.classId]?.titleOptions ?? [];
  return options.includes(titleId);
}

/** 称号を習得する（[01 §8]）。SP+5。成長傾向の補正・第2ツリーが有効になる。 */
export function acquireTitle(char: Character, titleId: TitleId, deepestReached: number): Character {
  if (!canAcquireTitle(char, titleId, deepestReached)) return char;
  return {
    ...char,
    titleId,
    skillPoints: { ...char.skillPoints, total: char.skillPoints.total + TITLE_BONUS_SP },
  };
}
