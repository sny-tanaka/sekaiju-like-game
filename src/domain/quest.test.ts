import { BALANCE } from '@/data/balance';
import type { QuestMaster } from '@/data/quests';
import { addItem, itemCount } from '@/domain/inventory';
import {
  abandonQuest,
  acceptQuest,
  activeQuests,
  formatQuestGoal,
  formatQuestRewards,
  isQuestComplete,
  questBoard,
  questProgress,
  reportableCount,
  turnInQuest,
} from '@/domain/quest';
import { createInitialSaveData } from '@/domain/saveData';
import type { SaveData } from '@/domain/types';

/** formatQuestGoal のテスト用に最小限の QuestMaster を組み立てる。 */
function makeQuest(overrides: Partial<QuestMaster> & Pick<QuestMaster, 'kind'>): QuestMaster {
  return {
    id: 'quest_test',
    name: 'テスト依頼',
    client: 'テスト依頼主',
    description: 'テスト用の依頼。',
    target: {},
    unlockDepth: 0,
    repeatable: false,
    rewards: {},
    ...overrides,
  };
}

function withDepth(save: SaveData, deepestReached: number): SaveData {
  return {
    ...save,
    towerState: { ...save.towerState, record: { ...save.towerState.record, deepestReached } },
  };
}

function withKills(save: SaveData, enemyId: string, kills: number): SaveData {
  return {
    ...save,
    bestiary: {
      ...save.bestiary,
      monsters: {
        ...save.bestiary.monsters,
        [enemyId]: { seen: true, defeated: true, dropsFound: [], kills },
      },
    },
  };
}

function withBossDefeated(save: SaveData, depth: number, defeated: boolean): SaveData {
  return {
    ...save,
    towerState: {
      ...save.towerState,
      bossGates: { ...save.towerState.bossGates, [depth]: { depth, defeated } },
    },
  };
}

describe('questBoard', () => {
  test('掲示条件: unlockDepth <= deepestReached の依頼のみ掲示される', () => {
    const save = withDepth(createInitialSaveData('g'), 0);
    const ids = questBoard(save).map((e) => e.quest.id);
    expect(ids).toContain('quest_first_hunt'); // unlockDepth 0
    expect(ids).toContain('quest_reach_f5'); // unlockDepth 0
    expect(ids).not.toContain('quest_ore_order'); // unlockDepth 3
    expect(ids).not.toContain('quest_treant_cull'); // unlockDepth 5
  });

  test('深度が進むと未掲示だった依頼が掲示されるようになる', () => {
    const save = withDepth(createInitialSaveData('g'), 5);
    const ids = questBoard(save).map((e) => e.quest.id);
    expect(ids).toContain('quest_ore_order'); // unlockDepth 3
    expect(ids).toContain('quest_treant_cull'); // unlockDepth 5
    expect(ids).not.toContain('quest_boss_f20'); // unlockDepth 15
  });

  test('一回限りの依頼は done になると掲示から除外される', () => {
    let save = withDepth(createInitialSaveData('g'), 0);
    expect(questBoard(save).map((e) => e.quest.id)).toContain('quest_first_hunt');
    save = {
      ...save,
      questStates: [{ id: 'quest_first_hunt', status: 'done' }],
    };
    expect(questBoard(save).map((e) => e.quest.id)).not.toContain('quest_first_hunt');
  });

  test('repeatable な依頼は達成回数があっても常に掲示される', () => {
    let save = withDepth(createInitialSaveData('g'), 3);
    save = {
      ...save,
      questStates: [
        { id: 'quest_r_hunt_t0', status: 'unaccepted', progress: { timesCompleted: 4 } },
      ],
    };
    const entry = questBoard(save).find((e) => e.quest.id === 'quest_r_hunt_t0');
    expect(entry).toBeDefined();
    expect(entry?.timesCompleted).toBe(4);
    expect(entry?.status).toBe('unaccepted');
  });
});

describe('acceptQuest', () => {
  test('受注すると active になり、hunt は baseKills が現在の kills で記録される', () => {
    const save = withKills(withDepth(createInitialSaveData('g'), 0), 'enemy_slime', 5);
    const after = acceptQuest(save, 'quest_first_hunt');
    const state = after.questStates.find((s) => s.id === 'quest_first_hunt');
    expect(state?.status).toBe('active');
    expect(state?.progress?.baseKills).toBe(5);
  });

  test('受注上限（QUEST_MAX_ACTIVE=3）に達していると no-op', () => {
    let save = withDepth(createInitialSaveData('g'), 0);
    save = acceptQuest(save, 'quest_first_hunt');
    save = acceptQuest(save, 'quest_rat_patrol');
    save = acceptQuest(save, 'quest_herb_delivery');
    expect(save.questStates.filter((s) => s.status === 'active')).toHaveLength(
      BALANCE.QUEST_MAX_ACTIVE
    );

    const after = acceptQuest(save, 'quest_reach_f5');
    expect(after).toBe(save); // 変更なし（同一参照）
    expect(after.questStates.some((s) => s.id === 'quest_reach_f5')).toBe(false);
  });

  test('未定義の依頼IDは no-op', () => {
    const save = withDepth(createInitialSaveData('g'), 0);
    const after = acceptQuest(save, 'quest_does_not_exist');
    expect(after).toBe(save);
  });
});

describe('questProgress', () => {
  test('hunt: baseKills を起点に現在の討伐数との差分を count でクランプして返す', () => {
    let save = withKills(withDepth(createInitialSaveData('g'), 0), 'enemy_slime', 5);
    save = acceptQuest(save, 'quest_first_hunt'); // baseKills=5, count=3

    expect(questProgress(save, 'quest_first_hunt')).toEqual({ current: 0, required: 3 });

    save = withKills(save, 'enemy_slime', 7); // +2
    expect(questProgress(save, 'quest_first_hunt')).toEqual({ current: 2, required: 3 });

    save = withKills(save, 'enemy_slime', 20); // +15 だが count=3 でクランプ
    expect(questProgress(save, 'quest_first_hunt')).toEqual({ current: 3, required: 3 });
  });

  test('delivery: 倉庫の全 grade 合算所持数を count でクランプして返す', () => {
    let save = withDepth(createInitialSaveData('g'), 3);
    save = addItem(save, 'item_ore', 3, 1);
    save = addItem(save, 'item_ore', 1, 2);
    // quest_ore_order は item_ore x5
    expect(questProgress(save, 'quest_ore_order')).toEqual({ current: 4, required: 5 });

    save = addItem(save, 'item_ore', 10, 2);
    expect(questProgress(save, 'quest_ore_order')).toEqual({ current: 5, required: 5 });
  });

  test('reach: deepestReached を depth でクランプして返す', () => {
    expect(questProgress(withDepth(createInitialSaveData('g'), 3), 'quest_reach_f5')).toEqual({
      current: 3,
      required: 5,
    });
    expect(questProgress(withDepth(createInitialSaveData('g'), 9), 'quest_reach_f5')).toEqual({
      current: 5,
      required: 5,
    });
  });

  test('boss: ゲート撃破済みなら 1/1、未撃破なら 0/1', () => {
    const notDefeated = withDepth(createInitialSaveData('g'), 5);
    expect(questProgress(notDefeated, 'quest_boss_f10')).toEqual({ current: 0, required: 1 });

    const defeated = withBossDefeated(notDefeated, 10, true);
    expect(questProgress(defeated, 'quest_boss_f10')).toEqual({ current: 1, required: 1 });
  });
});

describe('isQuestComplete / turnInQuest', () => {
  test('未達成なら turnInQuest は no-op', () => {
    let save = withKills(withDepth(createInitialSaveData('g'), 0), 'enemy_slime', 0);
    save = acceptQuest(save, 'quest_first_hunt');
    expect(isQuestComplete(save, 'quest_first_hunt')).toBe(false);

    const after = turnInQuest(save, 'quest_first_hunt');
    expect(after).toBe(save);
  });

  test('達成済みで報告すると gold + items が付与され、一回限りは done になる', () => {
    let save = withKills(withDepth(createInitialSaveData('g'), 0), 'enemy_slime', 0);
    save = acceptQuest(save, 'quest_first_hunt');
    save = withKills(save, 'enemy_slime', 3); // baseKills=0, count=3 達成

    const goldBefore = save.guild.gold;
    const potionBefore = itemCount(save, 'item_potion');
    const after = turnInQuest(save, 'quest_first_hunt');

    expect(after.guild.gold).toBe(goldBefore + 100);
    expect(itemCount(after, 'item_potion')).toBe(potionBefore + 3);
    expect(after.questStates.find((s) => s.id === 'quest_first_hunt')?.status).toBe('done');
  });

  test('gems 報酬が guild.gems に加算される', () => {
    let save = withKills(withDepth(createInitialSaveData('g'), 0), 'enemy_giant_rat', 0);
    save = acceptQuest(save, 'quest_rat_patrol'); // enemy_giant_rat x5, gold200+gems3
    save = withKills(save, 'enemy_giant_rat', 5);

    const gemsBefore = save.guild.gems;
    const after = turnInQuest(save, 'quest_rat_patrol');
    expect(after.guild.gems).toBe(gemsBefore + 3);
  });

  test('delivery の報告は対象アイテムを grade 昇順に count 個消費する', () => {
    let save = withDepth(createInitialSaveData('g'), 3);
    save = addItem(save, 'item_ore', 3, 1); // grade1: 3個
    save = addItem(save, 'item_ore', 4, 2); // grade2: 4個（合計7、count=5必要）
    save = acceptQuest(save, 'quest_ore_order');

    expect(isQuestComplete(save, 'quest_ore_order')).toBe(true);
    const after = turnInQuest(save, 'quest_ore_order');

    // grade1(3個)を使い切り、grade2から2個消費 → grade2に2個残る
    expect(itemCount(after, 'item_ore', 1)).toBe(0);
    expect(itemCount(after, 'item_ore', 2)).toBe(2);
    expect(itemCount(after, 'item_ore')).toBe(2);
    expect(after.guild.gold).toBe(save.guild.gold + 400);
  });

  test('repeatable は turnInQuest 後 unaccepted に戻り timesCompleted が加算される', () => {
    let save = withKills(withDepth(createInitialSaveData('g'), 3), 'enemy_t0_forest_rabbit', 0);
    save = acceptQuest(save, 'quest_r_hunt_t0'); // count 10
    save = withKills(save, 'enemy_t0_forest_rabbit', 10);

    const after = turnInQuest(save, 'quest_r_hunt_t0');
    const state = after.questStates.find((s) => s.id === 'quest_r_hunt_t0');
    expect(state?.status).toBe('unaccepted');
    expect(state?.progress).toEqual({ timesCompleted: 1 });

    // 再受注 → 再達成でさらに加算される
    let save2 = acceptQuest(after, 'quest_r_hunt_t0');
    save2 = withKills(save2, 'enemy_t0_forest_rabbit', 20);
    const after2 = turnInQuest(save2, 'quest_r_hunt_t0');
    expect(after2.questStates.find((s) => s.id === 'quest_r_hunt_t0')?.progress).toEqual({
      timesCompleted: 2,
    });
  });
});

describe('abandonQuest', () => {
  test('active な依頼を破棄すると unaccepted に戻り baseKills 等の進捗が破棄される', () => {
    let save = withKills(withDepth(createInitialSaveData('g'), 0), 'enemy_slime', 5);
    save = acceptQuest(save, 'quest_first_hunt');
    expect(save.questStates.find((s) => s.id === 'quest_first_hunt')?.progress?.baseKills).toBe(5);

    const after = abandonQuest(save, 'quest_first_hunt');
    const state = after.questStates.find((s) => s.id === 'quest_first_hunt');
    expect(state?.status).toBe('unaccepted');
    expect(state?.progress?.baseKills).toBeUndefined();
  });

  test('repeatable を破棄しても timesCompleted の累計は保持される', () => {
    let save = withDepth(createInitialSaveData('g'), 3);
    save = {
      ...save,
      questStates: [
        { id: 'quest_r_hunt_t0', status: 'active', progress: { baseKills: 0, timesCompleted: 2 } },
      ],
    };
    const after = abandonQuest(save, 'quest_r_hunt_t0');
    const state = after.questStates.find((s) => s.id === 'quest_r_hunt_t0');
    expect(state?.status).toBe('unaccepted');
    expect(state?.progress).toEqual({ timesCompleted: 2 });
  });

  test('active でない依頼への abandon は no-op', () => {
    const save = withDepth(createInitialSaveData('g'), 0);
    const after = abandonQuest(save, 'quest_first_hunt');
    expect(after).toBe(save);
  });
});

describe('activeQuests / reportableCount', () => {
  test('activeQuests は進捗と完了フラグ付きで受注中の依頼を返す', () => {
    let save = withKills(withDepth(createInitialSaveData('g'), 0), 'enemy_slime', 0);
    save = acceptQuest(save, 'quest_first_hunt');
    save = withKills(save, 'enemy_slime', 3);

    const entries = activeQuests(save);
    expect(entries).toHaveLength(1);
    expect(entries[0].quest.id).toBe('quest_first_hunt');
    expect(entries[0].progress).toEqual({ current: 3, required: 3 });
    expect(entries[0].complete).toBe(true);
  });

  test('reportableCount は達成済み active の数を返す', () => {
    let save = withKills(withDepth(createInitialSaveData('g'), 0), 'enemy_slime', 0);
    save = withKills(save, 'enemy_giant_rat', 0);
    save = acceptQuest(save, 'quest_first_hunt'); // 未達成のまま
    save = acceptQuest(save, 'quest_rat_patrol');
    save = withKills(save, 'enemy_giant_rat', 5); // quest_rat_patrol は達成

    expect(reportableCount(save)).toBe(1);
  });
});

describe('formatQuestGoal', () => {
  test('hunt: 敵名を引いて「◯◯討伐 3/5」になる', () => {
    const quest = makeQuest({ kind: 'hunt', target: { enemyId: 'enemy_slime', count: 5 } });
    expect(formatQuestGoal(quest, 3, 5)).toBe('スライム討伐 3/5');
  });

  test('delivery: アイテム名を引いて「◯◯納品 2/3」になる', () => {
    const quest = makeQuest({ kind: 'delivery', target: { itemId: 'item_potion', count: 3 } });
    expect(formatQuestGoal(quest, 2, 3)).toBe('きずぐすり納品 2/3');
  });

  test('reach: 「地下15階到達 10/15」になる', () => {
    const quest = makeQuest({ kind: 'reach', target: { depth: 15 } });
    expect(formatQuestGoal(quest, 10, 15)).toBe('地下15階到達 10/15');
  });

  test('boss: 「地下10階ボス撃破 0/1」になる', () => {
    const quest = makeQuest({ kind: 'boss', target: { depth: 10 } });
    expect(formatQuestGoal(quest, 0, 1)).toBe('地下10階ボス撃破 0/1');
  });

  test('不明な enemyId/itemId は「？」にフォールバックする', () => {
    const huntQuest = makeQuest({
      kind: 'hunt',
      target: { enemyId: 'enemy_does_not_exist', count: 5 },
    });
    expect(formatQuestGoal(huntQuest, 0, 5)).toBe('？討伐 0/5');

    const deliveryQuest = makeQuest({
      kind: 'delivery',
      target: { itemId: 'item_does_not_exist', count: 3 },
    });
    expect(formatQuestGoal(deliveryQuest, 0, 3)).toBe('？納品 0/3');
  });
});

describe('formatQuestRewards', () => {
  test('gold+gems+items のフルセットを断片配列に分解する', () => {
    const parts = formatQuestRewards({
      gold: 800,
      gems: 5,
      items: [{ itemId: 'item_potion', qty: 3 }],
    });
    expect(parts).toEqual(['800G', '✦5', 'きずぐすり×3']);
  });

  test('plusSign=true のとき gold に + が付く', () => {
    expect(formatQuestRewards({ gold: 800 }, true)).toEqual(['+800G']);
  });

  test('gold のみのときは gold の断片だけを返す', () => {
    expect(formatQuestRewards({ gold: 800 })).toEqual(['800G']);
  });

  test('空の rewards は空配列を返す', () => {
    expect(formatQuestRewards({})).toEqual([]);
  });

  test('未知の itemId はそのまま名前として使う', () => {
    const parts = formatQuestRewards({ items: [{ itemId: 'item_does_not_exist', qty: 2 }] });
    expect(parts).toEqual(['item_does_not_exist×2']);
  });
});
