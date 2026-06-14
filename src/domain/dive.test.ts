import {
  ensureFloor,
  goDeeper,
  goShallower,
  moveStep,
  resolveFoeBattle,
  returnToTown,
  startDive,
  stairsAt,
} from '@/domain/dive';
import { openDirs } from '@/domain/movement';
import { createRng } from '@/domain/rng';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
import type { Dir, SaveData } from '@/domain/types';

function saveWithParty(): SaveData {
  let save = createInitialSaveData('探索ギルド');
  save = addCharacterToGuild(
    save,
    createCharacter({ raceId: 'race_human', classId: 'class_warrior', name: 'A' })
  );
  save = addCharacterToGuild(
    save,
    createCharacter({ raceId: 'race_pix', classId: 'class_mage', name: 'B' })
  );
  return save;
}

describe('dive', () => {
  test('ensureFloor は初回生成し、2回目は同じ階を返す（再生成しない）', () => {
    const save = saveWithParty();
    const first = ensureFloor(save, 1);
    expect(first.save.towerState.floors[1]).toBeDefined();
    const second = ensureFloor(first.save, 1);
    expect(second.floor).toBe(first.save.towerState.floors[1]);
  });

  test('startDive で入口に立ち、パーティ・エンカウント・記録が初期化される', () => {
    const save = startDive(saveWithParty(), 1);
    const dive = save.diveState!;
    expect(dive).not.toBeNull();
    expect(dive.depth).toBe(1);
    expect(dive.party).toHaveLength(2);
    expect(dive.party[0].hp).toBeGreaterThan(0);
    expect(dive.encounter.stepsUntilEncounter).toBeGreaterThanOrEqual(8);
    expect(save.towerState.record.totalDives).toBe(1);
    expect(save.towerState.record.deepestReached).toBe(1);
    // 入口セルは探索済み
    expect(save.exploredCells[1].length).toBeGreaterThan(0);
  });

  test('moveStep は開口方向へ進み、探索記録が増える', () => {
    const save = startDive(saveWithParty(), 1);
    const floor = save.towerState.floors[1].generated;
    const { x, y } = save.diveState!.pos;
    const dir = openDirs(floor, x, y)[0] as Dir;
    const before = save.exploredCells[1].length;
    const rng = createRng(1);
    const res = moveStep(save, dir, rng);
    expect(res.moved).toBe(true);
    expect(res.save.diveState!.pos).not.toEqual({ x, y });
    expect(res.save.exploredCells[1].length).toBeGreaterThanOrEqual(before);
  });

  test('壁方向へは進めず向きだけ変わる', () => {
    const save = startDive(saveWithParty(), 1);
    const floor = save.towerState.floors[1].generated;
    const { x, y } = save.diveState!.pos;
    const wallDir = (['N', 'E', 'S', 'W'] as Dir[]).find((d) => floor.cells[y][x].walls[d])!;
    const res = moveStep(save, wallDir, createRng(1));
    expect(res.moved).toBe(false);
    expect(res.save.diveState!.pos).toEqual({ x, y });
    expect(res.save.diveState!.dir).toBe(wallDir);
  });

  test('goDeeper で次階の入口に立ち、最深記録が更新される', () => {
    const save = startDive(saveWithParty(), 1);
    const next = goDeeper(save);
    expect(next.diveState!.depth).toBe(2);
    expect(next.towerState.floors[2]).toBeDefined();
    expect(next.towerState.record.deepestReached).toBe(2);
  });

  test('第1階で goShallower すると拠点へ帰還（diveState=null）', () => {
    const save = startDive(saveWithParty(), 1);
    const next = goShallower(save);
    expect(next.diveState).toBeNull();
  });

  test('2階から goShallower すると1階の出口（stairsUp）に立つ', () => {
    const save = goDeeper(startDive(saveWithParty(), 1)); // 1F -> 2F
    const back = goShallower(save); // 2F -> 1F
    expect(back.diveState!.depth).toBe(1);
    const floor1 = back.towerState.floors[1].generated;
    const cell = floor1.cells[back.diveState!.pos.y][back.diveState!.pos.x];
    expect(cell.event?.kind).toBe('stairsUp');
    // 戻った階の現在セルは探索済みに含まれる
    expect(back.exploredCells[1]).toContain(`${back.diveState!.pos.x},${back.diveState!.pos.y}`);
  });

  test('returnToTown で潜行終了', () => {
    const save = startDive(saveWithParty(), 1);
    expect(returnToTown(save).diveState).toBeNull();
  });

  test('stairsAt は入口セルで stairsDown を返す', () => {
    const save = startDive(saveWithParty(), 1);
    // startDive は入口（stairsDown）に立つ
    expect(stairsAt(save)).toBe('stairsDown');
  });

  test('ensureFloor は foeRuntime を初期配置から構築する', () => {
    const save = saveWithParty();
    const { floor } = ensureFloor(save, 1);
    expect(floor.foeRuntime.length).toBe(floor.generated.foeSpawns.length);
    for (const fr of floor.foeRuntime) {
      const spawn = floor.generated.foeSpawns.find((s) => s.id === fr.spawnId)!;
      expect(fr.cell).toEqual(spawn.startCell);
      expect(fr.defeated).toBe(false);
      expect(fr.alerted).toBe(false);
    }
  });

  test('FOE セルへ踏み込むと先制戦闘が予約される', () => {
    let save = startDive(saveWithParty(), 1);
    const depth = save.diveState!.depth;
    const floor = save.towerState.floors[depth].generated;
    // FOE を現在地の開口先へ移動させて、その方向へ踏み込ませる
    const { x, y } = save.diveState!.pos;
    const dir = openDirs(floor, x, y)[0] as Dir;
    const dx = dir === 'E' ? 1 : dir === 'W' ? -1 : 0;
    const dy = dir === 'S' ? 1 : dir === 'N' ? -1 : 0;
    save = {
      ...save,
      towerState: {
        ...save.towerState,
        floors: {
          ...save.towerState.floors,
          [depth]: {
            ...save.towerState.floors[depth],
            foeRuntime: [
              { spawnId: 'foe_0', cell: { x: x + dx, y: y + dy }, defeated: false, alerted: false },
            ],
            generated: {
              ...floor,
              foeSpawns: [
                {
                  id: 'foe_0',
                  enemyId: 'enemy_slime',
                  startCell: { x: x + dx, y: y + dy },
                  patrol: { kind: 'static' },
                  moveSpeed: 1,
                  sightRange: 0,
                  respawn: false,
                },
              ],
            },
          },
        },
      },
    };
    const res = moveStep(save, dir, createRng(1));
    expect(res.triggered).toBe(true);
    expect(res.save.diveState!.pendingFoeBattle).not.toBeNull();
    expect(res.save.diveState!.pendingFoeBattle!.firstStrike).toBe('preemptive');
    expect(res.save.diveState!.pendingFoeBattle!.enemyId).toBe('enemy_slime');
  });

  test('resolveFoeBattle は勝利で FOE を撃破扱いにし予約をクリアする', () => {
    let save = startDive(saveWithParty(), 1);
    const depth = save.diveState!.depth;
    save = {
      ...save,
      towerState: {
        ...save.towerState,
        floors: {
          ...save.towerState.floors,
          [depth]: {
            ...save.towerState.floors[depth],
            foeRuntime: [
              { spawnId: 'foe_0', cell: { x: 0, y: 0 }, defeated: false, alerted: true },
            ],
          },
        },
      },
      diveState: {
        ...save.diveState!,
        pendingFoeBattle: { spawnId: 'foe_0', enemyId: 'enemy_slime', firstStrike: 'preemptive' },
      },
    };
    const win = resolveFoeBattle(save, true);
    expect(win.diveState!.pendingFoeBattle).toBeNull();
    expect(win.towerState.floors[depth].foeRuntime[0].defeated).toBe(true);

    // 敗走（win=false）なら撃破されず予約のみクリア
    const fled = resolveFoeBattle(save, false);
    expect(fled.diveState!.pendingFoeBattle).toBeNull();
    expect(fled.towerState.floors[depth].foeRuntime[0].defeated).toBe(false);
  });
});
