import {
  FORMATION_BACK_SLOTS,
  FORMATION_FRONT_SLOTS,
  GUILD_MEMBER_LIMIT,
  PARTY_MAX,
  STARTING_GOLD,
} from '@/data/balance';
import { CLASSES } from '@/data/classes';
import { RACES } from '@/data/races';
import { defaultUnlockedRecipeIds } from '@/data/recipes';
import { randomSeed } from '@/domain/rng';
import type {
  BestiaryState,
  Character,
  ClassId,
  EquipmentSlots,
  GameSettings,
  PartyFormation,
  RaceId,
  SaveData,
  TowerRecord,
} from '@/domain/types';

// ============================================================================
// ニューゲーム初期化（設計書 05 §4.1 ＋ ユーザー確定事項）。
// 初期パーティは 0 人。キャラはプレイヤーがギルドで作成する。
// ============================================================================

/** SaveData の論理バージョン（migration 用。IndexedDB の DB バージョンとは別物）。 */
// v2: 装備のインスタンス化（Phase 4-5b）。採集/食材枠（4-5a）も v2 で正規化する。
// v3: 転生ボーナスを per-stat 化（issue #55）。
// v4: Character.strategy を追加（issue #61）。
// v5: Character.subClassId を追加（v2.0.0 副業システム）。
export const CURRENT_SCHEMA_VERSION = 5;

export const DEFAULT_SETTINGS: GameSettings = {
  autoMap: 'on',
  bgmVolume: 0.6,
  seVolume: 0.6,
};

export function emptyBestiary(): BestiaryState {
  return { monsters: {}, items: {} };
}

export function emptyTowerRecord(): TowerRecord {
  return {
    deepestReached: 0,
    highestBossDefeated: 0,
    totalDives: 0,
    bossDefeatLog: [],
  };
}

const emptyEquipment = (): EquipmentSlots => ({ weapon: null, armor: null, accessory: null });

/** ランダムなキャラ ID を発番する。 */
function generateCharId(): string {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 0xffffff).toString(36)}`;
}

/**
 * Lv1 のキャラクターを1体作る（キャラ作成 UI から呼ぶ。Phase 3 で本格利用）。
 * 種族・職業・名前を指定。装備は空（拠点で整える）。
 */
export function createCharacter(params: {
  raceId: RaceId;
  classId: ClassId;
  name: string;
  id?: string;
}): Character {
  const { raceId, classId, name, id } = params;
  if (!RACES[raceId]) throw new Error(`createCharacter: 未定義の種族 "${raceId}"`);
  if (!CLASSES[classId]) throw new Error(`createCharacter: 未定義の職業 "${classId}"`);
  // 開始スキル: 職業の基本ツリー先頭スキルを Lv1 で習得済みにする（戦闘で即使える）。
  // 本格的な SP 振り分けは Phase 3。
  const starterSkillId = CLASSES[classId].skillTree.skills[0]?.skillId;
  const learnedSkills: Record<string, number> = starterSkillId ? { [starterSkillId]: 1 } : {};
  return {
    id: id ?? generateCharId(),
    name,
    raceId,
    classId,
    titleId: null,
    subClassId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills,
    equipment: emptyEquipment(),
    strategy: 'batchiri' as const,
  };
}

/** 空のパーティ編成（全スロット null）。 */
export function emptyFormation(): PartyFormation {
  return {
    front: Array<string | null>(FORMATION_FRONT_SLOTS).fill(null),
    back: Array<string | null>(FORMATION_BACK_SLOTS).fill(null),
  };
}

/** 編成に空きがあれば charId を配置する（前衛→後衛の順）。空きが無いか合計が PARTY_MAX に達していれば返す。 */
function placeInFormation(formation: PartyFormation, charId: string): PartyFormation {
  const current = [...formation.front, ...formation.back].filter((id) => id !== null).length;
  if (current >= PARTY_MAX) return formation;
  const frontIdx = formation.front.indexOf(null);
  if (frontIdx !== -1) {
    const front = [...formation.front];
    front[frontIdx] = charId;
    return { ...formation, front };
  }
  const backIdx = formation.back.indexOf(null);
  if (backIdx !== -1) {
    const back = [...formation.back];
    back[backIdx] = charId;
    return { ...formation, back };
  }
  return formation;
}

/**
 * ギルドに新メンバーを加えた新しい SaveData を返す（純粋）。
 * 出撃枠に空きがあれば自動で編成にも配置する。上限超過時は変更せず返す。
 */
export function addCharacterToGuild(save: SaveData, char: Character): SaveData {
  if (save.guild.members.length >= GUILD_MEMBER_LIMIT) return save;
  return {
    ...save,
    guild: {
      ...save.guild,
      members: [...save.guild.members, char],
      party: placeInFormation(save.guild.party, char.id),
    },
  };
}

/**
 * ギルドから団員を追放する（[01 §9]・issue #26）。純粋。
 * members から除外し、編成（party）と潜行中パーティ（diveState）からも取り除く。
 * 該当 ID が居なければそのまま返す。
 */
export function removeCharacterFromGuild(save: SaveData, charId: string): SaveData {
  if (!save.guild.members.some((m) => m.id === charId)) return save;
  const front = save.guild.party.front.map((id) => (id === charId ? null : id));
  const back = save.guild.party.back.map((id) => (id === charId ? null : id));
  const diveState = save.diveState
    ? { ...save.diveState, party: save.diveState.party.filter((p) => p.charId !== charId) }
    : save.diveState;
  return {
    ...save,
    guild: {
      ...save.guild,
      members: save.guild.members.filter((m) => m.id !== charId),
      party: { front, back },
    },
    diveState,
  };
}

/**
 * 新規セーブの初期状態を作る（[05 §4.1]）。
 * 団員 0 人・拠点（diveState=null）で開始する。
 * savedAt は永続化層でスタンプするため 0 で初期化する。
 */
export function createInitialSaveData(guildName: string): SaveData {
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    savedAt: 0,
    masterSeed: randomSeed(),
    settings: { ...DEFAULT_SETTINGS },
    guild: {
      name: guildName,
      gold: STARTING_GOLD,
      members: [], // 初期 0 人。プレイヤーが作成する
      party: emptyFormation(),
      storage: [],
      equipment: [],
      foodStorage: [],
      bestiary: emptyBestiary(),
    },
    towerState: {
      floors: {},
      bossGates: {},
      warp: { unlockedCheckpoints: [] },
      record: emptyTowerRecord(),
    },
    diveState: null, // 開始時は拠点
    bestiary: emptyBestiary(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTier: 0, unlockedItemIds: [] },
    unlockedRecipeIds: defaultUnlockedRecipeIds(),
    flags: {},
  };
}
