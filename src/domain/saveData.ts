import {
  FORMATION_BACK_SLOTS,
  FORMATION_FRONT_SLOTS,
  STARTER_PARTY_SIZE,
  STARTING_GOLD,
} from '@/data/balance';
import { RACES } from '@/data/races';
import { randomSeed } from '@/domain/rng';
import type {
  BestiaryState,
  Character,
  ClassId,
  EquipmentSlots,
  GameSettings,
  PartyFormation,
  Rng,
  SaveData,
  TowerRecord,
} from '@/domain/types';

// ============================================================================
// ニューゲーム初期化（設計書 05 §4.1）。Phase 0 で最初に必要なもの。
// ============================================================================

/** SaveData の論理バージョン（migration 用。IndexedDB の DB バージョンとは別物）。 */
export const CURRENT_SCHEMA_VERSION = 1;

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

/** 職業ごとの初期装備（[05 §4.1] 暫定の初級装備）。 */
const STARTER_EQUIPMENT: Record<ClassId, Partial<EquipmentSlots>> = {
  class_warrior: { weapon: 'equip_short_sword', armor: 'equip_iron_armor' },
  class_guardian: { weapon: 'equip_iron_spear', armor: 'equip_iron_armor' },
  class_mage: { weapon: 'equip_oak_staff', armor: 'equip_cloth_robe' },
  class_ranger: { weapon: 'equip_short_bow', armor: 'equip_leather_armor' },
};

/** 初期パーティに使う種族の並び（バランス・物理・魔法・敏捷の4枠）。 */
const STARTER_RACE_ORDER = ['race_human', 'race_garon', 'race_pix', 'race_therian'];

const STARTER_DEFAULT_NAMES = ['アレン', 'ボルグ', 'ミラ', 'カイ'];

/** Lv1・既定職業のキャラを1体生成する。 */
function createStarterCharacter(raceId: string, name: string, idSuffix: string): Character {
  const race = RACES[raceId];
  const classId = race.defaultClassId;
  return {
    id: `char_${idSuffix}`,
    name,
    raceId,
    classId,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: {},
    equipment: { ...emptyEquipment(), ...STARTER_EQUIPMENT[classId] },
  };
}

/**
 * 初期パーティを自動生成する（[07 §4]: フルキャラメイク強制はしない）。
 * 決定論的にしたい場合は rng を渡す。省略時はキャラ ID にタイムスタンプを使う。
 */
export function createStarterParty(rng?: Rng): Character[] {
  return Array.from({ length: STARTER_PARTY_SIZE }, (_, i) => {
    const raceId = STARTER_RACE_ORDER[i % STARTER_RACE_ORDER.length];
    const name = STARTER_DEFAULT_NAMES[i] ?? `冒険者${i + 1}`;
    const idSuffix = rng ? rng.int(0xffffffff).toString(36) + i : `${Date.now().toString(36)}_${i}`;
    return createStarterCharacter(raceId, name, idSuffix);
  });
}

/** パーティ編成の初期配置（前衛/後衛スロットに順に詰める）。 */
export function defaultFormation(party: Character[]): PartyFormation {
  const front: (string | null)[] = Array(FORMATION_FRONT_SLOTS).fill(null);
  const back: (string | null)[] = Array(FORMATION_BACK_SLOTS).fill(null);
  party.forEach((char, i) => {
    if (i < FORMATION_FRONT_SLOTS) {
      front[i] = char.id;
    } else if (i - FORMATION_FRONT_SLOTS < FORMATION_BACK_SLOTS) {
      back[i - FORMATION_FRONT_SLOTS] = char.id;
    }
  });
  return { front, back };
}

/**
 * 新規セーブの初期状態を作る（[05 §4.1]）。
 * savedAt は呼び出し側（永続化層）でスタンプする方針なので 0 で初期化する。
 */
export function createInitialSaveData(guildName: string, starterParty: Character[]): SaveData {
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    savedAt: 0,
    masterSeed: randomSeed(),
    settings: { ...DEFAULT_SETTINGS },
    guild: {
      name: guildName,
      gold: STARTING_GOLD,
      members: starterParty,
      party: defaultFormation(starterParty),
      storage: [],
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
    shopStock: { unlockedTiers: [0] },
    flags: {},
  };
}
