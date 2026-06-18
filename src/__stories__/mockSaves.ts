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
// mockWithParty — 戦士/癒術士/陰陽士 3 名作成・全員前衛 Lv1
// ============================================================
export const mockWithParty: SaveData = (() => {
  let save = createInitialSaveData(GUILD_NAME);

  const warrior = createCharacter({
    raceId: 'race_human',
    classId: 'class_warrior',
    name: 'ランス',
    id: 'char_mock_warrior',
  });
  const healer = createCharacter({
    raceId: 'race_human',
    classId: 'class_medic',
    name: 'セラ',
    id: 'char_mock_healer',
  });
  const mage = createCharacter({
    raceId: 'race_human',
    classId: 'class_mage',
    name: 'オン',
    id: 'char_mock_mage',
  });

  save = addCharacterToGuild(save, warrior);
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
        bossDefeatLog: [{ depth: 5, at: Date.now() }],
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
