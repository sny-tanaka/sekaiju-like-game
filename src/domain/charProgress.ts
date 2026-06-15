import { BALANCE, CLASS_CHANGE_LEVEL_PENALTY, TITLE_BONUS_SP, UNLOCK } from '@/data/balance';
import { CLASSES } from '@/data/classes';
import { RACES } from '@/data/races';
import { canEquip, unequipItem } from '@/domain/inventory';
import { createCharacter } from '@/domain/saveData';
import { skillSpCost } from '@/domain/skillTree';
import type {
  Character,
  ClassId,
  EquipSlotKey,
  RaceId,
  RebirthBonus,
  SaveData,
  TitleId,
} from '@/domain/types';

const EQUIP_SLOTS: EquipSlotKey[] = ['weapon', 'armor', 'accessory'];

function replaceMember(save: SaveData, charId: string, char: Character): SaveData {
  return {
    ...save,
    guild: { ...save.guild, members: save.guild.members.map((m) => (m.id === charId ? char : m)) },
  };
}

// ============================================================================
// 転職・転生・称号（[01 §6-8]）。すべて純関数。
// ============================================================================

/** その職業の基本ツリー先頭スキル（開始スキル）。 */
function starterSkillId(classId: ClassId): string | undefined {
  return CLASSES[classId]?.skillTree.skills[0]?.skillId;
}

/** 種族スキルツリー（ユニオン・採集等）のスキル ID 集合。転職で保持する。 */
function raceSkillIds(raceId: RaceId): Set<string> {
  return new Set((RACES[raceId]?.raceSkillTree.skills ?? []).map((n) => n.skillId));
}

/** 学習済みスキルの消費SP合計（深さ別コスト加重）。char は SP コスト算出のための文脈。 */
const spentForLearned = (char: Character, learned: Record<string, number>): number => {
  const ctx: Character = { ...char, learnedSkills: learned };
  let sp = 0;
  for (const [sid, lv] of Object.entries(learned)) sp += skillSpCost(ctx, sid) * lv;
  return sp;
};

/**
 * 転職（[01 §6]）。職業を変更し、レベルを一定値下げ、職業/称号スキルを振り直す。
 * 種族（ユニオン）スキルは保持。称号は外れる。SP 総量は維持（振り直し可能に）。
 * 対象職業は「解放済み」前提（条件付き職業の判定は呼び出し側 / 将来）。
 */
export function transferClass(char: Character, newClassId: ClassId): Character {
  if (!CLASSES[newClassId]) return char;
  const keepIds = raceSkillIds(char.raceId);
  let learned: Record<string, number> = {};
  for (const [sid, lv] of Object.entries(char.learnedSkills)) {
    if (keepIds.has(sid)) learned[sid] = lv;
  }
  // 新職業の開始スキルを無料付与（Lv1）
  const starter = starterSkillId(newClassId);
  if (starter && !learned[starter]) learned[starter] = 1;

  const level = Math.max(1, char.level - CLASS_CHANGE_LEVEL_PENALTY);
  // SP 総量は新レベル基準に再計算（転職コスト=レベル低下を SP にも反映。増殖を防ぐ）。
  const total = BALANCE.SP_PER_LEVEL * Math.max(0, level - 1);
  // 深さ別コストで消費SPを再計算。開始スキルの無料 Lv1 は spent に含めない。
  const ctx: Character = { ...char, classId: newClassId, titleId: null, learnedSkills: learned };
  let spent =
    spentForLearned(ctx, learned) - (starter && learned[starter] ? skillSpCost(ctx, starter) : 0);
  // 低レベル化で種族スキル投資を払い切れない場合は剥奪（負の SP を作らない）
  if (spent > total) {
    learned = starter ? { [starter]: 1 } : {};
    spent = 0;
  }

  return {
    ...char,
    classId: newClassId,
    titleId: null,
    level,
    exp: 0, // MVP: 新レベル開始時点に丸める（設計の「該当Lvに合わせて再計算」の簡略）
    learnedSkills: learned,
    skillPoints: { total, spent },
  };
}

/**
 * 転職を SaveData に適用する。職業変更後、新職業で装備不可になった装備は外して倉庫へ戻す。
 */
export function transferClassInSave(save: SaveData, charId: string, newClassId: ClassId): SaveData {
  const char = save.guild.members.find((m) => m.id === charId);
  if (!char) return save;
  let next = replaceMember(save, charId, transferClass(char, newClassId));
  const changed = next.guild.members.find((m) => m.id === charId)!;
  for (const slot of EQUIP_SLOTS) {
    const inst = changed.equipment[slot];
    if (inst && !canEquip(changed, inst.masterId)) {
      next = unequipItem(next, charId, slot); // 所有プールへ返却
    }
  }
  return next;
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

/**
 * 転生を SaveData に適用する。装備は失わず倉庫へ戻してから作り直す。
 */
export function reincarnateInSave(
  save: SaveData,
  charId: string,
  next: { raceId: RaceId; classId: ClassId; name: string }
): SaveData {
  const char = save.guild.members.find((m) => m.id === charId);
  if (!char || !canReincarnate(char)) return save;
  // 装備を全て倉庫へ返却してから作り直す（資産消失を防ぐ）
  let s = save;
  for (const slot of EQUIP_SLOTS) {
    if (char.equipment[slot]) s = unequipItem(s, charId, slot);
  }
  const updated = s.guild.members.find((m) => m.id === charId)!;
  return replaceMember(s, charId, reincarnate(updated, next));
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
