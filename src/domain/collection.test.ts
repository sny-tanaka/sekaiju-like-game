import { BALANCE } from '@/data/balance';
import { COLLECTIBLE_BY_ENEMY } from '@/data/collectibles';
import { ENEMIES } from '@/data/enemies';
import { startBattle } from '@/domain/battle';
import {
  applyCollectionRewards,
  battleCollectibleGains,
  bossGatePrismGain,
  collectionEntries,
  collectionSummary,
} from '@/domain/collection';
import { startDive } from '@/domain/dive';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
import type { BattleState, ItemId, SaveData } from '@/domain/types';

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

describe('collectionEntries', () => {
  test('60エントリを tierBand 昇順で返し、未入手は owned=0', () => {
    const save = createInitialSaveData('g');
    const entries = collectionEntries(save);
    expect(entries).toHaveLength(60);
    expect(entries.every((e) => e.owned === 0)).toBe(true);
    // tierBand 昇順であること
    for (let i = 1; i < entries.length; i++) {
      expect(entries[i].band).toBeGreaterThanOrEqual(entries[i - 1].band);
    }
  });

  test('collection に記録済みのアイテムは owned にその累計数が反映される', () => {
    const itemId = COLLECTIBLE_BY_ENEMY.enemy_slime;
    const save = withCollection([itemId]);
    const entries = collectionEntries({
      ...save,
      collection: { ...save.collection, [itemId]: 3 },
    });
    const slimeEntry = entries.find((e) => e.enemyId === 'enemy_slime');
    expect(slimeEntry?.owned).toBe(3);
    expect(slimeEntry?.itemId).toBe(itemId);
  });
});

function diveSave(): SaveData {
  let save = createInitialSaveData('秘宝ギルド2');
  save = addCharacterToGuild(
    save,
    createCharacter({ raceId: 'race_garon', classId: 'class_warrior', name: '戦士' })
  );
  return startDive(save, 1);
}

function winState(base: BattleState, drops: { enemyId: string; itemId: ItemId }[]): BattleState {
  return {
    ...base,
    outcome: 'win',
    enemies: base.enemies.map((e) => ({ ...e, isDown: true, hp: 0 })),
    drops: drops as BattleState['drops'],
  };
}

describe('battleCollectibleGains（applyBattleResult と同一ロジックの表示用純関数）', () => {
  test('未勝利（outcome !== win）なら空配列', () => {
    const save = diveSave();
    const base = startBattle(save, ['enemy_slime']);
    const state: BattleState = {
      ...base,
      drops: [{ enemyId: 'enemy_slime', itemId: 'item_col_slime' }],
    };
    expect(battleCollectibleGains(save, state)).toEqual([]);
  });

  test('未所持アイテムを1個ドロップ: 新規入手のみでジェム変換は0', () => {
    const save = diveSave();
    const base = startBattle(save, ['enemy_slime']);
    const state = winState(base, [{ enemyId: 'enemy_slime', itemId: 'item_col_slime' }]);
    const gains = battleCollectibleGains(save, state);
    expect(gains).toEqual([
      { itemId: 'item_col_slime', name: 'ぷるぷるの核', count: 1, dupCount: 0, gems: 0 },
    ]);
  });

  test('未所持アイテムを同戦闘で2個ドロップ: 2個目のみ重複ジェムに変換される', () => {
    const save = diveSave();
    const base = startBattle(save, ['enemy_slime', 'enemy_slime']);
    const state = winState(base, [
      { enemyId: 'enemy_slime', itemId: 'item_col_slime' },
      { enemyId: 'enemy_slime', itemId: 'item_col_slime' },
    ]);
    const gains = battleCollectibleGains(save, state);
    expect(gains).toEqual([
      {
        itemId: 'item_col_slime',
        name: 'ぷるぷるの核',
        count: 2,
        dupCount: 1,
        gems: BALANCE.COLLECT_DUP_GEMS,
      },
    ]);
  });

  test('既に所持済みのアイテムをドロップ: 1個目からすべて重複ジェムに変換される', () => {
    const itemId = COLLECTIBLE_BY_ENEMY.enemy_slime;
    const save = { ...diveSave(), collection: { [itemId]: 1 } };
    const base = startBattle(save, ['enemy_slime']);
    const state = winState(base, [{ enemyId: 'enemy_slime', itemId }]);
    const gains = battleCollectibleGains(save, state);
    expect(gains).toEqual([
      { itemId, name: 'ぷるぷるの核', count: 1, dupCount: 1, gems: BALANCE.COLLECT_DUP_GEMS },
    ]);
  });

  test('collectible でないドロップは含まれない', () => {
    const save = diveSave();
    const base = startBattle(save, ['enemy_slime']);
    const state = winState(base, [{ enemyId: 'enemy_slime', itemId: 'item_gem_shard' }]);
    expect(battleCollectibleGains(save, state)).toEqual([]);
  });
});

describe('bossGatePrismGain（虹輝の宝珠・ボスゲート初回撃破ボーナスの表示用純関数）', () => {
  function bossSave(gateDefeated: boolean): SaveData {
    let save = createInitialSaveData('宝珠ギルド');
    save = addCharacterToGuild(
      save,
      createCharacter({ raceId: 'race_garon', classId: 'class_warrior', name: '戦士' })
    );
    save = startDive(save, 5);
    if (!save.diveState) throw new Error('diveState is null');
    return {
      ...save,
      towerState: gateDefeated
        ? {
            ...save.towerState,
            bossGates: { ...save.towerState.bossGates, 5: { depth: 5, defeated: true } },
          }
        : save.towerState,
      diveState: {
        ...save.diveState,
        pendingFoeBattle: {
          spawnId: 'foe_boss',
          enemyId: 'enemy_boss_gatekeeper',
          firstStrike: 'none',
          isBoss: true,
        },
      },
    };
  }

  test('未撃破ゲートのボスに勝利すると true', () => {
    const save = bossSave(false);
    const base = startBattle(save, ['enemy_boss_gatekeeper']);
    const state: BattleState = { ...base, outcome: 'win' };
    expect(bossGatePrismGain(save, state)).toBe(true);
  });

  test('既に撃破済みのゲートなら2回目以降は false', () => {
    const save = bossSave(true);
    const base = startBattle(save, ['enemy_boss_gatekeeper']);
    const state: BattleState = { ...base, outcome: 'win' };
    expect(bossGatePrismGain(save, state)).toBe(false);
  });

  test('敗北・逃走なら false', () => {
    const save = bossSave(false);
    const base = startBattle(save, ['enemy_boss_gatekeeper']);
    expect(bossGatePrismGain(save, { ...base, outcome: 'lose' })).toBe(false);
    expect(bossGatePrismGain(save, { ...base, outcome: 'fled' })).toBe(false);
  });

  test('pendingFoeBattle が無い、またはボスでないなら false', () => {
    const save = diveSave();
    const base = startBattle(save, ['enemy_slime']);
    const state: BattleState = { ...base, outcome: 'win' };
    expect(bossGatePrismGain(save, state)).toBe(false);
  });
});
