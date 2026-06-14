import {
  ensureFloor,
  goDeeper,
  goShallower,
  moveStep,
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

  test('returnToTown で潜行終了', () => {
    const save = startDive(saveWithParty(), 1);
    expect(returnToTown(save).diveState).toBeNull();
  });

  test('stairsAt は入口セルで stairsDown を返す', () => {
    const save = startDive(saveWithParty(), 1);
    // startDive は入口（stairsDown）に立つ
    expect(stairsAt(save)).toBe('stairsDown');
  });
});
