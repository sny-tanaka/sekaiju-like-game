import { resurrectCurrentFloor, startDive } from '@/domain/dive';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
import type { SaveData, TowerFloor } from '@/domain/types';

// 界層還元香の効果（現在階のボス・FOE・採取ポイントの復活）を検証する。
// 手作りの最小フロア（gather.test.ts の diveWithGather と同じ方式）で
// FOE・採取・宝箱・イベント・ボスゲート・記録の状態を作り込み、
// resurrectCurrentFloor が「敵と採取だけ」を戻すことを確認する。

/** FOE 1体・採取ポイント1つを持つ非ボス階（depth=1）にダイブした状態を作る。 */
function diveWithFoeAndGather(): SaveData {
  let save = createInitialSaveData('探索団');
  save = addCharacterToGuild(
    save,
    createCharacter({ raceId: 'race_human', classId: 'class_warrior', name: 'A' })
  );
  const cell = {
    walls: { N: true, E: true, S: true, W: true },
    floorType: 'normal' as const,
    passable: true,
  };
  const generated = {
    depth: 1,
    width: 1,
    height: 1,
    cells: [[cell]],
    encounterTable: 'band_0',
    foeSpawns: [
      {
        id: 'foe_0',
        enemyId: 'enemy_test',
        startCell: { x: 0, y: 0 },
        patrol: { kind: 'static' as const },
        moveSpeed: 0,
        sightRange: 0,
        respawn: false,
      },
    ],
    gatheringPoints: [{ id: 'gather_0', cell: { x: 0, y: 0 }, type: 'mining' as const }],
    bgmId: 'bgm_dungeon',
  };
  const floor: TowerFloor = {
    depth: 1,
    seed: save.masterSeed,
    generated,
    isBossFloor: false,
    encounterTier: 0,
    // 撃破済み・移動済み・警戒中にしておき、復活で初期状態に戻ることを確認する
    foeRuntime: [{ spawnId: 'foe_0', cell: { x: 5, y: 5 }, defeated: true, alerted: true }],
    openedChests: ['chest_a'],
    depletedGathers: ['gather_0'],
    consumedEvents: ['ev_a'],
  };
  return {
    ...save,
    towerState: {
      ...save.towerState,
      floors: { 1: floor },
      bossGates: { 10: { depth: 10, defeated: true } }, // 無関係の既存ゲート（変化しないこと確認用）
      record: {
        deepestReached: 5,
        highestBossDefeated: 10,
        totalDives: 3,
        bossDefeatLog: [{ depth: 10, at: 123, enemyId: 'boss_x' }],
      },
    },
    diveState: {
      depth: 1,
      pos: { x: 0, y: 0 },
      dir: 'N',
      party: [{ charId: save.guild.members[0].id, hp: 30, tp: 20, unionGauge: 0, ailments: [] }],
      persistentSummons: [],
      encounter: { stepsUntilEncounter: 10 },
      pendingFoeBattle: {
        spawnId: 'foe_0',
        enemyId: 'enemy_test',
        firstStrike: 'preemptive',
      },
    },
  };
}

describe('resurrectCurrentFloor（界層還元香）', () => {
  test('通常階: FOE が初期位置・未撃破に戻り、採取ポイントが復活する。宝箱/イベント/記録/他ゲートは不変', () => {
    const save = diveWithFoeAndGather();
    const next = resurrectCurrentFloor(save);

    const floor = next.towerState.floors[1];
    expect(floor.foeRuntime).toEqual([
      { spawnId: 'foe_0', cell: { x: 0, y: 0 }, defeated: false, alerted: false },
    ]);
    expect(floor.depletedGathers).toEqual([]);

    // 据え置き項目
    expect(floor.openedChests).toEqual(['chest_a']);
    expect(floor.consumedEvents).toEqual(['ev_a']);
    expect(next.towerState.bossGates).toBe(save.towerState.bossGates); // 非ボス階なのでゲートは触らない
    expect(next.towerState.record).toBe(save.towerState.record); // 戦績は不変

    // FOE 戦の予約はクリアされる
    expect(next.diveState!.pendingFoeBattle).toBeNull();
  });

  test('ボス階（depth=10）: ボスの FOE と bossGates[10].defeated が false に戻り、record は不変', () => {
    let save = startDive(createInitialSaveData('探索団'), 10);
    save = addCharacterToGuild(
      save,
      createCharacter({ raceId: 'race_human', classId: 'class_warrior', name: 'A' })
    );
    const floor = save.towerState.floors[10];
    const bossSpawnId = floor.foeRuntime.find((f) => f.spawnId === 'boss')!.spawnId;
    // ボス撃破済み・ゲート解放済みの状態を作る
    save = {
      ...save,
      towerState: {
        ...save.towerState,
        floors: {
          ...save.towerState.floors,
          10: {
            ...floor,
            foeRuntime: floor.foeRuntime.map((f) =>
              f.spawnId === bossSpawnId ? { ...f, defeated: true } : f
            ),
          },
        },
        bossGates: { 10: { depth: 10, defeated: true } },
        record: {
          deepestReached: 10,
          highestBossDefeated: 10,
          totalDives: 1,
          bossDefeatLog: [{ depth: 10, at: 999, enemyId: 'boss_enemy' }],
        },
      },
    };

    const next = resurrectCurrentFloor(save);

    const bossFoe = next.towerState.floors[10].foeRuntime.find((f) => f.spawnId === bossSpawnId)!;
    expect(bossFoe.defeated).toBe(false);
    expect(next.towerState.bossGates[10].defeated).toBe(false);

    // 戦績（highestBossDefeated / bossDefeatLog）は据え置き
    expect(next.towerState.record).toEqual(save.towerState.record);
  });

  test('diveState=null（拠点）では no-op（入力 save をそのまま返す）', () => {
    const save = createInitialSaveData('探索団');
    expect(resurrectCurrentFloor(save)).toBe(save);
  });

  test('該当階の TowerFloor が未生成のときは no-op（入力 save をそのまま返す）', () => {
    let save = createInitialSaveData('探索団');
    // floors[5] を生成せずに diveState.depth=5 だけを人工的に作る
    save = {
      ...save,
      diveState: {
        depth: 5,
        pos: { x: 0, y: 0 },
        dir: 'N',
        party: [],
        persistentSummons: [],
        encounter: { stepsUntilEncounter: 10 },
        pendingFoeBattle: null,
      },
    };
    expect(resurrectCurrentFloor(save)).toBe(save);
  });
});
