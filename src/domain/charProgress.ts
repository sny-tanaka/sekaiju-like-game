import {
  CLASS_CHANGE_LEVEL_PENALTY,
  REBIRTH,
  spTotalForLevel,
  TITLE_BONUS_SP,
  UNLOCK,
} from '@/data/balance';
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
  SaveData,
  StatKey,
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
  const total = spTotalForLevel(level);
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

/** 転生1回ぶんの種族別ステ配分（[01 §7]）。種族の成長傾向に比例して STAT_TOTAL を按分する。 */
export function rebirthStatBonusForRace(raceId: RaceId): Partial<Record<StatKey, number>> {
  const races = Object.values(RACES);
  const keys: StatKey[] = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
  const avg: Record<string, number> = {};
  for (const k of keys) avg[k] = races.reduce((s, r) => s + r.statGrowth[k], 0) / races.length;
  const target = RACES[raceId];
  const w: Record<string, number> = {};
  let sumW = 0;
  for (const k of keys) {
    w[k] = avg[k] > 0 ? target.statGrowth[k] / avg[k] : 0;
    sumW += w[k];
  }
  const out: Partial<Record<StatKey, number>> = {};
  // 全種族の成長が 0 等で sumW=0 になった場合は均等配分にフォールバック（0除算=NaN を防ぐ）。
  if (sumW === 0) {
    for (const k of keys) out[k] = Math.round(REBIRTH.STAT_TOTAL / keys.length);
    return out;
  }
  for (const k of keys) out[k] = Math.round((REBIRTH.STAT_TOTAL * w[k]) / sumW);
  return out;
}

/** 転生可能か（Lv上限=100到達時のみ）。 */
export function canReincarnate(char: Character): boolean {
  return char.level >= UNLOCK.REBIRTH_MIN_LEVEL;
}

/**
 * 転生（[01 §7]）。Lv100到達時のみ可能。Lv1再スタート。永続ボーナスは累積。
 * ボーナスは転生時に選んだ種族の成長傾向に応じて配分。
 * 同じ id を維持し、種族・職業・名前は再選択する（引き継がない）。
 */
export function reincarnate(
  char: Character,
  next: { raceId: RaceId; classId: ClassId; name: string }
): Character {
  if (!canReincarnate(char)) return char;
  const inc = rebirthStatBonusForRace(next.raceId);
  const prev = char.rebirthBonus;
  // 各ステを累積加算
  const stats: Partial<Record<StatKey, number>> = { ...(prev?.stats ?? {}) };
  for (const [k, v] of Object.entries(inc)) {
    stats[k as StatKey] = (stats[k as StatKey] ?? 0) + (v ?? 0);
  }
  const bonusSp = (prev?.bonusSp ?? 0) + REBIRTH.BONUS_SP;
  const count = (prev?.count ?? 0) + 1;

  const base = createCharacter({ ...next, id: char.id });
  // Lv1 再スタート。SP は Lv1分(=0) ＋ 累積ボーナスSP。
  const total = spTotalForLevel(1) + bonusSp; // = bonusSp
  return {
    ...base,
    level: 1,
    exp: 0,
    rebirthBonus: { stats, bonusSp, count },
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
