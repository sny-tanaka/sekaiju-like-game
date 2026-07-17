import { BALANCE } from '@/data/balance';
import { COLLECTIBLE_BY_ENEMY } from '@/data/collectibles';
import { ENEMIES } from '@/data/enemies';
import { applyCollectionRewards, collectionSummary } from '@/domain/collection';
import { createInitialSaveData } from '@/domain/saveData';
import type { ItemId, SaveData } from '@/domain/types';

/** tierBand ごとの秘宝 itemId 一覧（collection.ts の bandItemIds と同じロジックをテスト側でも構築）。 */
function bandItemIds(): ItemId[][] {
  const bands: ItemId[][] = [[], [], [], [], []];
  for (const [enemyId, itemId] of Object.entries(COLLECTIBLE_BY_ENEMY)) {
    bands[ENEMIES[enemyId].tierBand].push(itemId);
  }
  return bands;
}

const ALL_ITEM_IDS = Object.values(COLLECTIBLE_BY_ENEMY);

function withCollection(ids: ItemId[]): SaveData {
  const save = createInitialSaveData('秘宝ギルド');
  const collection = Object.fromEntries(ids.map((id) => [id, 1]));
  return { ...save, collection };
}

describe('applyCollectionRewards', () => {
  test('未コンプなら変更しない（同一参照を返す）', () => {
    const save = withCollection([bandItemIds()[0][0]]); // 1種だけ所持
    const after = applyCollectionRewards(save);
    expect(after).toBe(save);
  });

  test('帯（tierBand）を12種すべて所持すると COLLECT_BAND_GEMS が付与されフラグが立つ', () => {
    const band0 = bandItemIds()[0];
    expect(band0).toHaveLength(12);
    const save = withCollection(band0);
    const after = applyCollectionRewards(save);
    expect(after.guild.gems).toBe(save.guild.gems + BALANCE.COLLECT_BAND_GEMS);
    expect(after.flags.collectionBand0).toBe(true);
  });

  test('帯コンプ報酬は1回きり（再度適用しても増えない）', () => {
    const band0 = bandItemIds()[0];
    const save = withCollection(band0);
    const once = applyCollectionRewards(save);
    const twice = applyCollectionRewards(once);
    expect(twice.guild.gems).toBe(once.guild.gems);
  });

  test('60種すべて所持すると COLLECT_ALL_GEMS + equip_collector_crown が付与される', () => {
    const save = withCollection(ALL_ITEM_IDS);
    const after = applyCollectionRewards(save);
    // 全種コンプは各帯コンプも同時に満たすため、5帯ぶん + 全コンプぶんが加算される
    const expectedGems = BALANCE.COLLECT_BAND_GEMS * 5 + BALANCE.COLLECT_ALL_GEMS;
    expect(after.guild.gems).toBe(save.guild.gems + expectedGems);
    expect(after.flags.collectionAll).toBe(true);
    expect(
      after.guild.equipment.filter((e) => e.masterId === 'equip_collector_crown')
    ).toHaveLength(1);
  });

  test('全コンプ報酬は1回きり（再度適用しても crown が増えない）', () => {
    const save = withCollection(ALL_ITEM_IDS);
    const once = applyCollectionRewards(save);
    const twice = applyCollectionRewards(once);
    expect(twice.guild.gems).toBe(once.guild.gems);
    expect(
      twice.guild.equipment.filter((e) => e.masterId === 'equip_collector_crown')
    ).toHaveLength(1);
  });
});

describe('collectionSummary', () => {
  test('初期状態はすべて0/未コンプ', () => {
    const save = createInitialSaveData('g');
    const sum = collectionSummary(save);
    expect(sum.totalAll).toBe(60);
    expect(sum.totalOwned).toBe(0);
    expect(sum.allComplete).toBe(false);
    expect(sum.bands.every((b) => b.owned === 0 && !b.complete)).toBe(true);
    expect(sum.bands.map((b) => b.total)).toEqual([12, 12, 12, 12, 12]);
  });

  test('帯を1種所持すると owned が増え、12種でその帯が complete になる', () => {
    const band0 = bandItemIds()[0];
    const save = withCollection(band0.slice(0, 1));
    const partial = collectionSummary(save);
    expect(partial.bands[0].owned).toBe(1);
    expect(partial.bands[0].complete).toBe(false);

    const fullSave = withCollection(band0);
    const full = collectionSummary(fullSave);
    expect(full.bands[0].owned).toBe(12);
    expect(full.bands[0].complete).toBe(true);
    expect(full.allComplete).toBe(false);
  });

  test('60種すべて所持すると allComplete になる', () => {
    const save = withCollection(ALL_ITEM_IDS);
    const sum = collectionSummary(save);
    expect(sum.totalOwned).toBe(60);
    expect(sum.allComplete).toBe(true);
    expect(sum.bands.every((b) => b.complete)).toBe(true);
  });
});
