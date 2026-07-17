import type { QuestMaster } from '@/data/quests';
import { validateMasters, validateQuestMasters } from '@/data/validateMasters';

describe('validateMasters', () => {
  test('同梱マスターデータは整合性検証を通過する', () => {
    const result = validateMasters();
    expect(result.errors).toEqual([]);
    expect(result.ok).toBe(true);
  });
});

describe('validateQuestMasters', () => {
  const enemyIds = new Set(['enemy_slime']);
  const itemIds = new Set(['item_potion']);

  function baseQuest(overrides: Partial<QuestMaster>): QuestMaster {
    return {
      id: 'quest_x',
      name: 'テスト依頼',
      client: 'テスト依頼主',
      description: 'テスト依頼主からの依頼。テストせよ。',
      kind: 'hunt',
      target: { enemyId: 'enemy_slime', count: 1 },
      unlockDepth: 0,
      repeatable: false,
      rewards: { gold: 100 },
      ...overrides,
    };
  }

  test('正しい依頼データはエラー無し', () => {
    const errors = validateQuestMasters({ quest_x: baseQuest({}) }, enemyIds, itemIds);
    expect(errors).toEqual([]);
  });

  test('キーと id が不一致だとエラー', () => {
    const errors = validateQuestMasters({ quest_other_key: baseQuest({}) }, enemyIds, itemIds);
    expect(errors).toEqual(['[quests] キー "quest_other_key" と id "quest_x" が不一致']);
  });

  test('hunt: 未定義の enemyId はエラー', () => {
    const errors = validateQuestMasters(
      { quest_x: baseQuest({ target: { enemyId: 'enemy_unknown', count: 1 } }) },
      enemyIds,
      itemIds
    );
    expect(errors).toContain('[quests] "quest_x" の target.enemyId "enemy_unknown" が未定義');
  });

  test('hunt: count が1未満だとエラー', () => {
    const errors = validateQuestMasters(
      { quest_x: baseQuest({ target: { enemyId: 'enemy_slime', count: 0 } }) },
      enemyIds,
      itemIds
    );
    expect(errors).toContain('[quests] "quest_x" (hunt) の target.count が 1 未満');
  });

  test('delivery: 未定義の itemId はエラー', () => {
    const errors = validateQuestMasters(
      {
        quest_x: baseQuest({
          kind: 'delivery',
          target: { itemId: 'item_unknown', count: 1 },
        }),
      },
      enemyIds,
      itemIds
    );
    expect(errors).toContain('[quests] "quest_x" の target.itemId "item_unknown" が未定義');
  });

  test('delivery: count が1未満だとエラー', () => {
    const errors = validateQuestMasters(
      {
        quest_x: baseQuest({
          kind: 'delivery',
          target: { itemId: 'item_potion', count: 0 },
        }),
      },
      enemyIds,
      itemIds
    );
    expect(errors).toContain('[quests] "quest_x" (delivery) の target.count が 1 未満');
  });

  test('reach/boss: depth が1未満だとエラー', () => {
    const reachErrors = validateQuestMasters(
      { quest_x: baseQuest({ kind: 'reach', target: { depth: 0 } }) },
      enemyIds,
      itemIds
    );
    expect(reachErrors).toContain('[quests] "quest_x" (reach) の target.depth が 1 未満');

    const bossErrors = validateQuestMasters(
      { quest_x: baseQuest({ kind: 'boss', target: { depth: 0 } }) },
      enemyIds,
      itemIds
    );
    expect(bossErrors).toContain('[quests] "quest_x" (boss) の target.depth が 1 未満');
  });

  test('rewards.items に未定義のアイテムがあるとエラー', () => {
    const errors = validateQuestMasters(
      {
        quest_x: baseQuest({
          rewards: { gold: 100, items: [{ itemId: 'item_unknown', qty: 1 }] },
        }),
      },
      enemyIds,
      itemIds
    );
    expect(errors).toContain('[quests] "quest_x" の報酬アイテム "item_unknown" が未定義');
  });
});
