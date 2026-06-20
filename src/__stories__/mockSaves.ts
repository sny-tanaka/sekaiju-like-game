/**
 * Storybook 用 mock SaveData プリセット集。
 * ページストーリーの decorator で GameStateProvider に注入して使う。
 * ゲームロジック・永続化には触らない（純粋なオブジェクト生成のみ）。
 */

import { startDive } from '@/domain/dive';
import { rollEncounter } from '@/domain/encounterTable';
import { createRng } from '@/domain/rng';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
import type { EquipInstance, SaveData } from '@/domain/types';

const GUILD_NAME = 'うつくしき台帳';

// ============================================================
// mockEmpty — 新規開始直後（団員ゼロ）
// ============================================================
export const mockEmpty: SaveData = (() => {
  return createInitialSaveData(GUILD_NAME);
})();

// ============================================================
// mockWithParty — フル編成 5 名（前衛3 + 後衛2 = PARTY_MAX）。
// Storybook で「各要素が最大の表示領域を必要とする」状態を作るため、
// 種族・職業を多様化しつつ PARTY_MAX まで埋める（[01]の最大編成）。
// addCharacterToGuild が前衛→後衛の順に詰めるので、最初の 3 人が前衛、
// 続く 2 人が後衛に入る。
// ============================================================
export const mockWithParty: SaveData = (() => {
  let save = createInitialSaveData(GUILD_NAME);

  // 前衛 3 名: 物理近接系
  const warrior = createCharacter({
    raceId: 'race_human',
    classId: 'class_warrior',
    name: 'ランス',
    id: 'char_mock_warrior',
  });
  const guardian = createCharacter({
    raceId: 'race_golan',
    classId: 'class_guardian',
    name: 'ブロン',
    id: 'char_mock_guardian',
  });
  const monk = createCharacter({
    raceId: 'race_therian',
    classId: 'class_monk',
    name: 'リオン',
    id: 'char_mock_monk',
  });
  // 後衛 2 名: 回復・遠隔火力
  const healer = createCharacter({
    raceId: 'race_human',
    classId: 'class_medic',
    name: 'セラ',
    id: 'char_mock_healer',
  });
  const mage = createCharacter({
    raceId: 'race_pix',
    classId: 'class_mage',
    name: 'オン',
    id: 'char_mock_mage',
  });

  save = addCharacterToGuild(save, warrior);
  save = addCharacterToGuild(save, guardian);
  save = addCharacterToGuild(save, monk);
  save = addCharacterToGuild(save, healer);
  save = addCharacterToGuild(save, mage);

  return save;
})();

// ============================================================
// mockMidDive — mockWithParty を元に F2 探索中状態
// ============================================================
export const mockMidDive: SaveData = (() => {
  // startDive で第2階へ潜行（generateFloor が走る）
  const save = startDive(mockWithParty, 2);
  return save;
})();

// ============================================================
// mockPostBoss — F5 ボス撃破後（codex に到達履歴あり）
// ============================================================
export const mockPostBoss: SaveData = (() => {
  let save = startDive(mockWithParty, 5);
  // ボス撃破状態を記録
  save = {
    ...save,
    towerState: {
      ...save.towerState,
      record: {
        ...save.towerState.record,
        deepestReached: 5,
        highestBossDefeated: 5,
        totalDives: 2,
        bossDefeatLog: [
          { depth: 5, at: Date.now(), enemyId: 'enemy_boss_gatekeeper' },
          { depth: 10, at: Date.now() - 3600_000 }, // enemyId なし（後方互換確認用）
        ],
      },
      bossGates: {
        ...save.towerState.bossGates,
        5: { depth: 5, defeated: true },
      },
      warp: {
        unlockedCheckpoints: [5],
      },
    },
    bestiary: {
      monsters: {
        enemy_boss_gatekeeper: { seen: true, defeated: true, dropsFound: [] },
        enemy_slime: { seen: true, defeated: true, dropsFound: [] },
        enemy_giant_rat: { seen: true, defeated: false, dropsFound: [] },
      },
      items: {},
    },
    // diveState は null に戻って拠点にいる状態
    diveState: null,
  };
  return save;
})();

// ============================================================
// mockShop — mockWithParty + 所持 G 5000 + 装備プールに 5 個
// ============================================================
export const mockShop: SaveData = (() => {
  const equipment: EquipInstance[] = [
    { id: 'equip_inst_1', masterId: 'equip_short_sword', forgeLevel: 0 },
    { id: 'equip_inst_2', masterId: 'equip_iron_spear', forgeLevel: 0 },
    { id: 'equip_inst_3', masterId: 'equip_leather_armor', forgeLevel: 0 },
    { id: 'equip_inst_4', masterId: 'equip_oak_staff', forgeLevel: 0 },
    { id: 'equip_inst_5', masterId: 'equip_short_bow', forgeLevel: 0 },
  ];
  return {
    ...mockWithParty,
    guild: {
      ...mockWithParty.guild,
      gold: 5000,
      equipment,
    },
  };
})();

// ============================================================
// mockShopWithEquipped — mockShop + 先頭メンバーが equip_inst_1 を装備済み
// 売るタブのロック行テスト用
// ============================================================
export const mockShopWithEquipped: SaveData = (() => {
  const equippedInst = mockShop.guild.equipment[0]; // equip_inst_1 (short_sword)
  if (!equippedInst) return mockShop;
  return {
    ...mockShop,
    guild: {
      ...mockShop.guild,
      members: mockShop.guild.members.map((m, i) =>
        i === 0
          ? {
              ...m,
              equipment: {
                ...m.equipment,
                weapon: equippedInst,
              },
            }
          : m
      ),
    },
  };
})();

// ============================================================
// mockForge — mockWithParty + インゴット (銅3/銀1/金0) + 装備プールに 4 個
// ============================================================
export const mockForge: SaveData = (() => {
  const equipment: EquipInstance[] = [
    { id: 'equip_inst_f1', masterId: 'equip_short_sword', forgeLevel: 0 },
    { id: 'equip_inst_f2', masterId: 'equip_iron_spear', forgeLevel: 1 },
    { id: 'equip_inst_f3', masterId: 'equip_leather_armor', forgeLevel: 0 },
    { id: 'equip_inst_f4', masterId: 'equip_oak_staff', forgeLevel: 2 },
  ];
  return {
    ...mockWithParty,
    guild: {
      ...mockWithParty.guild,
      equipment,
    },
    forgeInventory: {
      fragments: { frag_copper: 5 },
      ingots: { copper: 3, silver: 1, gold: 0 },
    },
  };
})();

// ============================================================
// mockBattle — F2 探索中 + pendingFoeBattle（スライム1体と遭遇）
// ============================================================
export const mockBattle: SaveData = (() => {
  if (!mockMidDive.diveState) return mockMidDive;

  // 固定シードの rng で敵を抽選（決定論的）
  const rng = createRng(0xdeadbeef);
  const depth = mockMidDive.diveState.depth;
  const enemies = rollEncounter(depth, rng);
  const enemyId = enemies[0] ?? 'enemy_slime';

  return {
    ...mockMidDive,
    diveState: {
      ...mockMidDive.diveState,
      pendingFoeBattle: {
        spawnId: 'mock_foe_0',
        enemyId,
        firstStrike: 'none',
        isBoss: false,
      },
    },
  };
})();

// ============================================================
// mockBossBattle — F5 ボス階 + pendingFoeBattle（門番のゴーレムと遭遇直前）
// ============================================================
export const mockBossBattle: SaveData = (() => {
  const f5Save = startDive(mockWithParty, 5);
  if (!f5Save.diveState) return f5Save;

  return {
    ...f5Save,
    diveState: {
      ...f5Save.diveState,
      pendingFoeBattle: {
        spawnId: 'mock_boss_0',
        enemyId: 'enemy_boss_gatekeeper',
        firstStrike: 'none',
        isBoss: true,
      },
    },
  };
})();

// ============================================================
// mockBattleSkillMenu — mockBattle と同じ状況だが、戦士が複数スキルを習得済み
// （スキル選択画面のスクショ用。2列レイアウト + TP 不足のグレーアウトを確認できる）
// ============================================================
export const mockBattleSkillMenu: SaveData = {
  ...mockBattle,
  guild: {
    ...mockBattle.guild,
    members: mockBattle.guild.members.map((m) =>
      m.classId === 'class_warrior'
        ? {
            ...m,
            learnedSkills: {
              skill_power_slash: 1, // 使える
              skill_cleave: 1, // 使える
              skill_chain_slash: 1, // 使える
              skill_warrior_war_cry: 1, // 使える
              skill_warrior_blade_storm: 1, // 高 TP (使えない想定)
              skill_warrior_executioner: 1, // 高 TP (使えない想定)
            },
          }
        : m
    ),
  },
};
