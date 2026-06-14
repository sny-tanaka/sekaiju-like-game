import { FORMATION_BACK_SLOTS, FORMATION_FRONT_SLOTS } from '@/data/balance';
import type { Character, Row, SaveData } from '@/domain/types';

// ============================================================================
// パーティ編成（隊列）の変更（[01 §9]）。前衛3 + 後衛5 の最大5人。
// 同一キャラが複数スロットに入らないよう、配置時に既存スロットから除外する。
// 編成に入っていないメンバーは「控え」（ダイブに参加しない）。
// ============================================================================

export function isInFormation(save: SaveData, charId: string): boolean {
  return save.guild.party.front.includes(charId) || save.guild.party.back.includes(charId);
}

/** 編成に入っていないメンバー（控え）。 */
export function benchedMembers(save: SaveData): Character[] {
  return save.guild.members.filter((m) => !isInFormation(save, m.id));
}

/** 編成中の人数。 */
export function formationCount(save: SaveData): number {
  return [...save.guild.party.front, ...save.guild.party.back].filter((id) => id !== null).length;
}

const slotLen = (row: Row) => (row === 'front' ? FORMATION_FRONT_SLOTS : FORMATION_BACK_SLOTS);

/**
 * row[idx] に charId を配置する（charId=null でクリア）。
 * charId は他スロットから取り除いてから配置（重複防止）。範囲外/非メンバーは無視。
 */
export function setSlot(save: SaveData, row: Row, idx: number, charId: string | null): SaveData {
  if (idx < 0 || idx >= slotLen(row)) return save;
  if (charId !== null && !save.guild.members.some((m) => m.id === charId)) return save;

  // 全スロットから charId を除去
  const front = save.guild.party.front.map((id) => (id === charId ? null : id));
  const back = save.guild.party.back.map((id) => (id === charId ? null : id));
  // 長さを正規化（不足分を null 埋め）
  while (front.length < FORMATION_FRONT_SLOTS) front.push(null);
  while (back.length < FORMATION_BACK_SLOTS) back.push(null);

  if (row === 'front') front[idx] = charId;
  else back[idx] = charId;

  return { ...save, guild: { ...save.guild, party: { front, back } } };
}

/** charId を編成から外して控えにする。 */
export function removeFromFormation(save: SaveData, charId: string): SaveData {
  const front = save.guild.party.front.map((id) => (id === charId ? null : id));
  const back = save.guild.party.back.map((id) => (id === charId ? null : id));
  return { ...save, guild: { ...save.guild, party: { front, back } } };
}

/** charId を指定列の最初の空きスロットへ入れる。空きが無ければ変更しない。 */
export function placeInRow(save: SaveData, charId: string, row: Row): SaveData {
  if (!save.guild.members.some((m) => m.id === charId)) return save;
  const slots = row === 'front' ? save.guild.party.front : save.guild.party.back;
  // すでにその列に居れば何もしない
  if (slots.includes(charId)) return save;
  const cleared = removeFromFormation(save, charId);
  const target = row === 'front' ? cleared.guild.party.front : cleared.guild.party.back;
  let idx = target.indexOf(null);
  if (idx < 0) {
    if (target.length < slotLen(row)) idx = target.length;
    else return save; // 満員
  }
  return setSlot(cleared, row, idx, charId);
}
