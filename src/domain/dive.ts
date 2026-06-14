import { isBossFloor } from '@/data/balance';
import { initEncounter, onStep } from '@/domain/encounter';
import { findEventCell, generateFloor } from '@/domain/generateFloor';
import { createRng } from '@/domain/rng';
import { computeBaseStats } from '@/domain/stats';
import { openDirs, step } from '@/domain/movement';
import { cellKey } from '@/domain/types';
import type { Dir, DivePartyMember, FloorMaster, Rng, SaveData, TowerFloor } from '@/domain/types';

// ============================================================================
// ダイブ（潜行）管理（設計書 06 §2 / 05 §4 / 02）。
// 階の自動生成（初回固定保存）、潜行開始、1歩移動＋探索記録＋エンカウント、
// 階段の昇降、帰還を扱う純関数群。乱数は注入（masterSeed から fork）。
// ============================================================================

/** その階の生成シード（masterSeed から決定論的に派生）。 */
function floorRng(masterSeed: number, depth: number): Rng {
  return createRng(masterSeed).fork(`floor:${depth}`);
}

/** depth の TowerFloor を取得（無ければ生成して保存した新 save も返す）。 */
export function ensureFloor(save: SaveData, depth: number): { save: SaveData; floor: TowerFloor } {
  const existing = save.towerState.floors[depth];
  if (existing) return { save, floor: existing };

  const generated: FloorMaster = generateFloor(depth, floorRng(save.masterSeed, depth));
  const floor: TowerFloor = {
    depth,
    seed: save.masterSeed,
    generated,
    isBossFloor: isBossFloor(depth),
    encounterTier: Math.floor((depth - 1) / 10),
    foeRuntime: [],
    openedChests: [],
    depletedGathers: [],
    consumedEvents: [],
  };
  const nextSave: SaveData = {
    ...save,
    towerState: {
      ...save.towerState,
      floors: { ...save.towerState.floors, [depth]: floor },
    },
  };
  return { save: nextSave, floor };
}

/** 出撃編成から潜行パーティ（現在HP/TP）を組む。HP/TP は満タンで開始。 */
function buildDiveParty(save: SaveData): DivePartyMember[] {
  const ids = [...save.guild.party.front, ...save.guild.party.back].filter(
    (id): id is string => id !== null
  );
  const members: DivePartyMember[] = [];
  for (const id of ids) {
    const char = save.guild.members.find((m) => m.id === id);
    if (!char) continue;
    const stats = computeBaseStats(char);
    members.push({ charId: id, hp: stats.hp, tp: stats.tp, unionGauge: 0, ailments: [] });
  }
  return members;
}

/** exploredCells[depth] に現在セルとその開口先（隣接通路）を加える。 */
function reveal(save: SaveData, depth: number, x: number, y: number): SaveData {
  const floor = save.towerState.floors[depth].generated;
  const set = new Set(save.exploredCells[depth] ?? []);
  set.add(cellKey(x, y));
  for (const dir of openDirs(floor, x, y)) {
    const nx = x + (dir === 'E' ? 1 : dir === 'W' ? -1 : 0);
    const ny = y + (dir === 'S' ? 1 : dir === 'N' ? -1 : 0);
    set.add(cellKey(nx, ny));
  }
  return {
    ...save,
    exploredCells: { ...save.exploredCells, [depth]: [...set] },
  };
}

/** 階に入った瞬間の diveState を作る（入口に立ち、最初の開口方向を向く）。 */
function enterFloor(save: SaveData, depth: number, encounterRng: Rng): SaveData {
  const ensured = ensureFloor(save, depth);
  let next = ensured.save;
  const floor = ensured.floor.generated;
  const entrance = findEventCell(floor, 'stairsDown') ?? { x: 0, y: 0 };
  const facing: Dir = openDirs(floor, entrance.x, entrance.y)[0] ?? 'N';

  // 最深到達記録の更新
  if (depth > next.towerState.record.deepestReached) {
    next = {
      ...next,
      towerState: {
        ...next.towerState,
        record: { ...next.towerState.record, deepestReached: depth },
      },
    };
  }

  next = {
    ...next,
    diveState: {
      depth,
      pos: { x: entrance.x, y: entrance.y },
      dir: facing,
      party: next.diveState?.party ?? buildDiveParty(next),
      persistentSummons: next.diveState?.persistentSummons ?? [],
      encounter: { stepsUntilEncounter: initEncounter(encounterRng) },
    },
  };
  return reveal(next, depth, entrance.x, entrance.y);
}

/** 拠点から第 startDepth 階へ潜行開始。挑戦回数を加算。 */
export function startDive(save: SaveData, startDepth = 1): SaveData {
  const rng = createRng(save.masterSeed).fork(`dive:${save.towerState.record.totalDives}`);
  const withCount: SaveData = {
    ...save,
    diveState: null,
    towerState: {
      ...save.towerState,
      record: { ...save.towerState.record, totalDives: save.towerState.record.totalDives + 1 },
    },
  };
  return enterFloor(withCount, startDepth, rng);
}

/** 向きだけ変える（移動・エンカウントなし）。 */
export function turnTo(save: SaveData, dir: Dir): SaveData {
  if (!save.diveState) return save;
  return { ...save, diveState: { ...save.diveState, dir } };
}

/**
 * dir 方向へ1歩進む。進めれば探索記録を更新し、エンカウント判定を行う。
 * 戻り値 triggered=true なら戦闘へ遷移する（呼び出し側でダミー戦闘画面へ）。
 */
export function moveStep(
  save: SaveData,
  dir: Dir,
  rng: Rng
): { save: SaveData; moved: boolean; triggered: boolean } {
  const dive = save.diveState;
  if (!dive) return { save, moved: false, triggered: false };
  const floor = save.towerState.floors[dive.depth].generated;
  const dest = step(floor, dive.pos, dir);
  if (!dest) {
    // 進めない場合でも向きは変える
    return { save: turnTo(save, dir), moved: false, triggered: false };
  }
  const enc = onStep(dive.encounter.stepsUntilEncounter, rng);
  let next: SaveData = {
    ...save,
    diveState: {
      ...dive,
      pos: dest,
      dir,
      encounter: { stepsUntilEncounter: enc.stepsUntilEncounter },
    },
  };
  next = reveal(next, dive.depth, dest.x, dest.y);
  return { save: next, moved: true, triggered: enc.triggered };
}

/** 現在セルの階段種別（上り/下り/なし）。 */
export function stairsAt(save: SaveData): 'stairsUp' | 'stairsDown' | null {
  const dive = save.diveState;
  if (!dive) return null;
  const ev = save.towerState.floors[dive.depth].generated.cells[dive.pos.y][dive.pos.x].event;
  if (ev?.kind === 'stairsUp' || ev?.kind === 'stairsDown') return ev.kind;
  return null;
}

/** 出口（stairsUp）から1つ深い階へ。次階の入口に立つ。 */
export function goDeeper(save: SaveData): SaveData {
  if (!save.diveState) return save;
  const nextDepth = save.diveState.depth + 1;
  const rng = createRng(save.masterSeed).fork(
    `enc:${nextDepth}:${save.towerState.record.totalDives}`
  );
  return enterFloor(save, nextDepth, rng);
}

/** 入口（stairsDown）から1つ浅い階へ。第1階なら拠点へ帰還。 */
export function goShallower(save: SaveData): SaveData {
  if (!save.diveState) return save;
  const depth = save.diveState.depth;
  if (depth <= 1) return returnToTown(save);
  const prevDepth = depth - 1;
  const ensured = ensureFloor(save, prevDepth);
  const exit = findEventCell(ensured.floor.generated, 'stairsUp') ?? { x: 0, y: 0 };
  const rng = createRng(save.masterSeed).fork(
    `enc:${prevDepth}:${save.towerState.record.totalDives}`
  );
  let next = ensured.save;
  const floor = ensured.floor.generated;
  const facing: Dir = openDirs(floor, exit.x, exit.y)[0] ?? 'N';
  next = {
    ...next,
    diveState: {
      ...next.diveState!,
      depth: prevDepth,
      pos: { x: exit.x, y: exit.y },
      dir: facing,
      encounter: { stepsUntilEncounter: initEncounter(rng) },
    },
  };
  return reveal(next, prevDepth, exit.x, exit.y);
}

/** 拠点へ帰還（潜行終了。diveState を破棄）。 */
export function returnToTown(save: SaveData): SaveData {
  return { ...save, diveState: null };
}
