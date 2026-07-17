/**
 * Storybook 用 mock SaveData プリセット集。
 * ページストーリーの decorator で GameStateProvider に注入して使う。
 * ゲームロジック・永続化には触らない（純粋なオブジェクト生成のみ）。
 */

import { startDive } from '@/domain/dive';
import { rollEncounter } from '@/domain/encounterTable';
import { createRng } from '@/domain/rng';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
import type { EquipInstance, QuestState, SaveData } from '@/domain/types';

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
//
// 武器網羅（Battle Storybook で全攻撃属性 FX を確認できるよう設計）:
//   1 ランス  (戦士)   sword  → slash  通常攻撃
//   2 ブロン  (守護兵) spear  → pierce 通常攻撃
//   3 リオン  (拳聖)   fist   → bash   通常攻撃
//   4 セラ    (薬師)   staff  → bash   通常攻撃 + 回復スキル
//   5 オン    (魔導士) staff  → bash   通常攻撃 + fire/ice/volt/almighty スキル
// ============================================================

// 装備インスタンス（guild.equipment プールにも追加し、各キャラに装備させる）
const WEAPON_SWORD: EquipInstance = {
  id: 'equip_party_sword',
  masterId: 'equip_short_sword',
  forgeLevel: 0,
};
const WEAPON_SPEAR: EquipInstance = {
  id: 'equip_party_spear',
  masterId: 'equip_iron_spear',
  forgeLevel: 0,
};
const WEAPON_FIST: EquipInstance = {
  id: 'equip_party_fist',
  masterId: 'equip_iron_knuckle',
  forgeLevel: 0,
};
const WEAPON_STAFF_MEDIC: EquipInstance = {
  id: 'equip_party_staff_medic',
  masterId: 'equip_oak_staff',
  forgeLevel: 0,
};
const WEAPON_STAFF_MAGE: EquipInstance = {
  id: 'equip_party_staff_mage',
  masterId: 'equip_oak_staff',
  forgeLevel: 0,
};
const ARMOR_LEATHER: EquipInstance = {
  id: 'equip_party_armor',
  masterId: 'equip_leather_armor',
  forgeLevel: 0,
};

export const mockWithParty: SaveData = (() => {
  let save = createInitialSaveData(GUILD_NAME);

  // 前衛 3 名: 物理近接系
  const warrior = createCharacter({
    raceId: 'race_human',
    classId: 'class_warrior',
    name: 'ランス',
    id: 'char_mock_warrior',
  });
  // 戦士: sword 装備（slash） + slash 系・全体斬スキル
  warrior.equipment = {
    weapon: WEAPON_SWORD,
    armor: ARMOR_LEATHER,
    accessory: null,
  };
  warrior.learnedSkills = {
    skill_power_slash: 1,
    skill_cleave: 1,
    skill_chain_slash: 1,
    skill_warrior_war_cry: 1,
    skill_warrior_double_slash: 1,
    skill_warrior_blade_storm: 1,
  };

  const guardian = createCharacter({
    raceId: 'race_golan',
    classId: 'class_guardian',
    name: 'ブロン',
    id: 'char_mock_guardian',
  });
  // 守護兵: spear 装備（pierce） + 盾スキル
  guardian.equipment = {
    weapon: WEAPON_SPEAR,
    armor: ARMOR_LEATHER,
    accessory: null,
  };
  guardian.learnedSkills = {
    skill_shield_bash: 1,
    skill_provoke: 1,
    skill_guardian_shield_press: 1,
    skill_guardian_taunt_roar: 1,
    skill_guardian_t_lance_charge: 1,
  };

  const monk = createCharacter({
    raceId: 'race_therian',
    classId: 'class_monk',
    name: 'リオン',
    id: 'char_mock_monk',
  });
  // 拳聖: fist 装備（bash） + bash 系スキル
  monk.equipment = {
    weapon: WEAPON_FIST,
    armor: ARMOR_LEATHER,
    accessory: null,
  };
  monk.learnedSkills = {
    skill_triple_strike: 1,
    skill_focus_ki: 1,
    skill_iron_body: 1,
    skill_monk_palm_strike: 1,
    skill_monk_flurry: 1,
    skill_monk_rising_dragon: 1,
  };

  // 後衛 2 名: 回復・遠隔火力
  const healer = createCharacter({
    raceId: 'race_human',
    classId: 'class_medic',
    name: 'セラ',
    id: 'char_mock_healer',
  });
  // 薬師: staff 装備（bash） + 回復スキル
  healer.equipment = {
    weapon: WEAPON_STAFF_MEDIC,
    armor: ARMOR_LEATHER,
    accessory: null,
  };
  healer.learnedSkills = {
    skill_heal: 1,
    skill_mass_heal: 1,
    skill_first_aid: 1,
    skill_refresh_herb: 1,
    skill_medic_full_heal: 1,
    skill_medic_party_cure: 1,
  };

  const mage = createCharacter({
    raceId: 'race_pix',
    classId: 'class_mage',
    name: 'オン',
    id: 'char_mock_mage',
  });
  // 魔導士: staff 装備（bash） + fire/ice/volt/almighty 属性魔法スキル
  mage.equipment = {
    weapon: WEAPON_STAFF_MAGE,
    armor: ARMOR_LEATHER,
    accessory: null,
  };
  mage.learnedSkills = {
    // fire
    skill_fire_bolt: 1,
    skill_fire_storm: 1,
    skill_mage_t_hellfire: 1,
    // ice
    skill_ice_bolt: 1,
    skill_mage_ice_storm: 1,
    skill_mage_frost_lance: 1,
    // volt
    skill_volt_bolt: 1,
    skill_mage_volt_storm: 1,
    skill_mage_thunderbolt: 1,
    // almighty (meteor は全体貫通属性として使う)
    skill_mage_meteor: 1,
    skill_mage_ragnarok: 1,
    // バフ・ユーティリティ
    skill_mage_focus: 1,
  };

  save = addCharacterToGuild(save, warrior);
  save = addCharacterToGuild(save, guardian);
  save = addCharacterToGuild(save, monk);
  save = addCharacterToGuild(save, healer);
  save = addCharacterToGuild(save, mage);

  // guild.equipment プールに使用装備インスタンスを登録
  // （Shop / Forge ストーリーが参照するプールとは独立して追加する）
  save = {
    ...save,
    guild: {
      ...save.guild,
      equipment: [
        ...save.guild.equipment,
        WEAPON_SWORD,
        WEAPON_SPEAR,
        WEAPON_FIST,
        WEAPON_STAFF_MEDIC,
        WEAPON_STAFF_MAGE,
        ARMOR_LEATHER,
      ],
    },
  };

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
        enemy_boss_gatekeeper: { seen: true, defeated: true, dropsFound: [], kills: 1 },
        enemy_slime: { seen: true, defeated: true, dropsFound: [], kills: 3 },
        enemy_giant_rat: { seen: true, defeated: false, dropsFound: [], kills: 0 },
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
// mockSubClass — mockWithParty + 先頭メンバー（戦士）に副業「薬師」を設定済み
// GuildChar の副業タブ確認用。
// ============================================================
export const mockSubClass: SaveData = (() => {
  return {
    ...mockWithParty,
    guild: {
      ...mockWithParty.guild,
      members: mockWithParty.guild.members.map((m, i) =>
        i === 0 ? { ...m, subClassId: 'class_medic' } : m
      ),
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

// ============================================================
// mockTavern — mockWithParty + 依頼の受注/達成/完了/くり返し済み状態
// 酒場（tavern）ストーリー用。掲示板・受注中（達成済み+進行中+上限3件目）・
// 記録（一回限り完了1件 + くり返し累計2件）の各タブを一目で確認できる構成。
// ============================================================
const MOCK_TAVERN_QUEST_STATES: QuestState[] = [
  // 達成済み（報告する導線の確認用）
  { id: 'quest_first_hunt', status: 'active', progress: { baseKills: 0 } },
  // 進行中（破棄導線の確認用）
  { id: 'quest_rat_patrol', status: 'active', progress: { baseKills: 0 } },
  // reach 系の達成済み（受注3件目 = 同時上限の確認用）
  { id: 'quest_reach_f15', status: 'active' },
  // 完了済みの一回限り依頼（記録タブの確認用）
  { id: 'quest_reach_f5', status: 'done' },
  // くり返し依頼の累計達成（記録タブ + 掲示板の「達成N回」表示の確認用）
  { id: 'quest_r_hunt_t0', status: 'unaccepted', progress: { timesCompleted: 3 } },
  { id: 'quest_r_ore', status: 'unaccepted', progress: { timesCompleted: 1 } },
];

export const mockTavern: SaveData = (() => {
  return {
    ...mockWithParty,
    guild: {
      ...mockWithParty.guild,
      gems: 25,
    },
    towerState: {
      ...mockWithParty.towerState,
      record: {
        ...mockWithParty.towerState.record,
        deepestReached: 20,
      },
      bossGates: {
        ...mockWithParty.towerState.bossGates,
        10: { depth: 10, defeated: true },
      },
    },
    bestiary: {
      monsters: {
        // quest_first_hunt（スライム×3）: baseKills 0 起点で 5 討伐 → 達成済み
        enemy_slime: { seen: true, defeated: true, dropsFound: [], kills: 5 },
        // quest_rat_patrol（おおねずみ×5）: baseKills 0 起点で 2 討伐 → 進行中
        enemy_giant_rat: { seen: true, defeated: true, dropsFound: [], kills: 2 },
      },
      items: {},
    },
    questStates: MOCK_TAVERN_QUEST_STATES,
  };
})();
