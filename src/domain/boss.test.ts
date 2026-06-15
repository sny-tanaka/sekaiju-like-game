import { canAscend, defeatBoss, goDeeper, resolveFoeBattle, startDive } from '@/domain/dive';
import { generateFloor } from '@/domain/generateFloor';
import { createRng } from '@/domain/rng';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
import type { SaveData } from '@/domain/types';

function saveWithParty(): SaveData {
  let save = createInitialSaveData('ボス団');
  save = addCharacterToGuild(
    save,
    createCharacter({ raceId: 'race_human', classId: 'class_warrior', name: 'A' })
  );
  return save;
}

describe('generateFloor: 階層ボス配置（[06 §4]）', () => {
  test('ボス階（10F）は isBoss の固定 FOE を1体だけ持つ', () => {
    const floor = generateFloor(10, createRng(1).fork('floor:10'));
    const bosses = floor.foeSpawns.filter((s) => s.isBoss);
    expect(bosses).toHaveLength(1);
    expect(bosses[0].id).toBe('boss');
    expect(bosses[0].patrol.kind).toBe('static');
  });

  test('通常階（1F）はボスを持たない', () => {
    const floor = generateFloor(1, createRng(1).fork('floor:1'));
    expect(floor.foeSpawns.some((s) => s.isBoss)).toBe(false);
  });
});

describe('canAscend / defeatBoss（[06 §4-5・§7]）', () => {
  test('ボス階は未撃破だと上昇不可、通常階は常に可', () => {
    const save = createInitialSaveData('g');
    expect(canAscend(save, 5)).toBe(true); // 通常階
    expect(canAscend(save, 10)).toBe(false); // ボス階・未撃破
  });

  test('defeatBoss でゲート解放・ワープ解放・記録更新', () => {
    const save = createInitialSaveData('g');
    const next = defeatBoss(save, 10);
    expect(canAscend(next, 10)).toBe(true);
    expect(next.towerState.bossGates[10].defeated).toBe(true);
    expect(next.towerState.warp.unlockedCheckpoints).toContain(10);
    expect(next.towerState.record.highestBossDefeated).toBe(10);
    expect(next.towerState.record.bossDefeatLog.some((b) => b.depth === 10)).toBe(true);
  });

  test('同じボスを再撃破してもログ・チェックポイントが重複しない', () => {
    let save = defeatBoss(createInitialSaveData('g'), 10);
    save = defeatBoss(save, 10);
    expect(save.towerState.warp.unlockedCheckpoints.filter((d) => d === 10)).toHaveLength(1);
    expect(save.towerState.record.bossDefeatLog.filter((b) => b.depth === 10)).toHaveLength(1);
  });
});

describe('goDeeper のボスゲート封鎖（[06 §4]）', () => {
  test('ボス階はボス撃破まで goDeeper が封鎖される', () => {
    // 第10階に潜行中の状態を作る
    let save = startDive(saveWithParty(), 10);
    expect(save.diveState!.depth).toBe(10);
    // 未撃破では goDeeper しても階が変わらない
    const blocked = goDeeper(save);
    expect(blocked.diveState!.depth).toBe(10);
    // ボス撃破後は次階へ進める
    save = defeatBoss(save, 10);
    const ascended = goDeeper(save);
    expect(ascended.diveState!.depth).toBe(11);
  });
});

describe('resolveFoeBattle: ボス勝利で撃破処理（[06 §4]）', () => {
  test('isBoss の pendingFoeBattle に勝利するとボス撃破が反映される', () => {
    let save = startDive(saveWithParty(), 10);
    const bossSpawn = save.towerState.floors[10].generated.foeSpawns.find((s) => s.isBoss)!;
    save = {
      ...save,
      diveState: {
        ...save.diveState!,
        pendingFoeBattle: {
          spawnId: bossSpawn.id,
          enemyId: bossSpawn.enemyId,
          firstStrike: 'none',
          isBoss: true,
        },
      },
    };
    const win = resolveFoeBattle(save, true);
    expect(win.diveState!.pendingFoeBattle).toBeNull();
    expect(win.towerState.bossGates[10].defeated).toBe(true);
    expect(win.towerState.warp.unlockedCheckpoints).toContain(10);
    // 該当 FOE は撃破済み
    const rt = win.towerState.floors[10].foeRuntime.find((f) => f.spawnId === bossSpawn.id)!;
    expect(rt.defeated).toBe(true);
  });

  test('ボス戦に敗北するとゲートは開かない', () => {
    let save = startDive(saveWithParty(), 10);
    const bossSpawn = save.towerState.floors[10].generated.foeSpawns.find((s) => s.isBoss)!;
    save = {
      ...save,
      diveState: {
        ...save.diveState!,
        pendingFoeBattle: {
          spawnId: bossSpawn.id,
          enemyId: bossSpawn.enemyId,
          firstStrike: 'none',
          isBoss: true,
        },
      },
    };
    const lose = resolveFoeBattle(save, false);
    expect(canAscend(lose, 10)).toBe(false);
  });
});
