import { isBossFloor, levelDecay, partyAverageLevelFromDive } from '@/data/balance';
import { initEncounter, onStep } from '@/domain/encounter';
import { stepFoes } from '@/domain/foe';
import { findEventCell, generateFloor } from '@/domain/generateFloor';
import { openDirs, step } from '@/domain/movement';
import { createRng } from '@/domain/rng';
import { computeBaseStats } from '@/domain/stats';
import { cellKey } from '@/domain/types';
import type {
  Dir,
  DivePartyMember,
  EnemyId,
  FloorMaster,
  FoeRuntimeState,
  PendingFoeBattle,
  Rng,
  SaveData,
  TowerFloor,
} from '@/domain/types';

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
  // FOE のランタイム状態を初期配置から構築（[02 §6]）。
  const foeRuntime: FoeRuntimeState[] = generated.foeSpawns.map((s) => ({
    spawnId: s.id,
    cell: { ...s.startCell },
    defeated: false,
    alerted: false,
  }));
  const floor: TowerFloor = {
    depth,
    seed: save.masterSeed,
    generated,
    isBossFloor: isBossFloor(depth),
    encounterTier: Math.floor((depth - 1) / 10),
    foeRuntime,
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
      encounter: {
        stepsUntilEncounter: initEncounter(encounterRng, {
          encounterRateDecay: levelDecay(partyAverageLevelFromDive(next), depth),
        }),
      },
      pendingFoeBattle: null,
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

/** towerState.floors[depth].foeRuntime を差し替えた新 save を返す。 */
function setFoeRuntime(save: SaveData, depth: number, foeRuntime: FoeRuntimeState[]): SaveData {
  const floor = save.towerState.floors[depth];
  return {
    ...save,
    towerState: {
      ...save.towerState,
      floors: { ...save.towerState.floors, [depth]: { ...floor, foeRuntime } },
    },
  };
}

/**
 * dir 方向へ1歩進む。進めれば探索記録を更新し、FOE を1手動かし、エンカウント判定を行う（[02 §6]）。
 * 戻り値 triggered=true なら戦闘へ遷移する。FOE 接触時は diveState.pendingFoeBattle に予約を入れる。
 * 解決順: ①プレイヤー移動 → ②プレイヤーが FOE セルへ踏込＝先制戦闘 →
 *         ③エンカウント抽選 → ④FOE 1手（接触＝通常/不意打ち戦闘）。
 *
 * 設計判断（手番制の例外）: ②でプレイヤーが FOE に踏み込んだターンは早期 return し、
 * 他の FOE は動かさない（④をスキップ）。「プレイヤーから攻めに行った1手」は即戦闘に入る
 * 方が自然なため。複数 FOE 誘導パズルへの影響は軽微とみなす。
 *
 * MVP 簡略化（[03 §10] との既知の乖離）: FOE には向きの概念が無い（FoeRuntimeState に dir 無し）
 * ため、②のプレイヤー踏込は接触方向（背後/側面/正面）を判定できず一律 'preemptive' とする。
 * 設計書の「背後/側面から接触＝先制、正面＝通常」は将来 FOE に向きを持たせたら精緻化する。
 */
export function moveStep(
  save: SaveData,
  dir: Dir,
  rng: Rng
): { save: SaveData; moved: boolean; triggered: boolean } {
  const dive = save.diveState;
  if (!dive) return { save, moved: false, triggered: false };
  const towerFloor = save.towerState.floors[dive.depth];
  const floor = towerFloor.generated;
  const dest = step(floor, dive.pos, dir);
  if (!dest) {
    // 進めない場合でも向きは変える
    return { save: turnTo(save, dir), moved: false, triggered: false };
  }

  // ② プレイヤーが FOE のいるセルへ踏み込んだ → 先制で戦闘（[03 §10]）
  const hitFoe = towerFloor.foeRuntime.find(
    (f) => !f.defeated && f.cell.x === dest.x && f.cell.y === dest.y
  );
  if (hitFoe) {
    const spawn = floor.foeSpawns.find((s) => s.id === hitFoe.spawnId);
    const pending: PendingFoeBattle | null = spawn
      ? {
          spawnId: hitFoe.spawnId,
          enemyId: spawn.enemyId,
          // ボスには先制を許さない（正面突破の歯ごたえ。[06 §4]）。
          firstStrike: spawn.isBoss ? 'none' : 'preemptive',
          isBoss: spawn.isBoss,
        }
      : null;
    let next: SaveData = {
      ...save,
      diveState: { ...dive, pos: dest, dir, pendingFoeBattle: pending },
    };
    next = reveal(next, dive.depth, dest.x, dest.y);
    return { save: next, moved: true, triggered: pending !== null };
  }

  // ③ 通常移動＋エンカウント抽選
  const enc = onStep(dive.encounter.stepsUntilEncounter, rng);
  let next: SaveData = {
    ...save,
    diveState: {
      ...dive,
      pos: dest,
      dir,
      encounter: { stepsUntilEncounter: enc.stepsUntilEncounter },
      pendingFoeBattle: null,
    },
  };
  next = reveal(next, dive.depth, dest.x, dest.y);

  // ④ FOE を1手動かす（プレイヤー1歩＝全FOE1手・[02 §6]）
  const fr = stepFoes(floor, towerFloor.foeRuntime, dest, dir, rng);
  next = setFoeRuntime(next, dive.depth, fr.foes);
  if (fr.contact) {
    next = {
      ...next,
      diveState: {
        ...next.diveState!,
        pendingFoeBattle: {
          spawnId: fr.contact.spawnId,
          enemyId: fr.contact.enemyId,
          firstStrike: fr.contact.firstStrike,
        },
      },
    };
    return { save: next, moved: true, triggered: true };
  }

  return { save: next, moved: true, triggered: enc.triggered };
}

/**
 * FOE 戦闘の決着を反映する（[02 §6]）。
 * - 勝利: 該当 FOE を defeated にしてマップから消す。
 * - いずれの結果でも pendingFoeBattle をクリアする（接触は消費済み）。
 * 戦闘結果（HP/経験値等）の反映は applyBattleResult が別途行う。
 */
export function resolveFoeBattle(save: SaveData, win: boolean): SaveData {
  const dive = save.diveState;
  if (!dive) return save;
  const pending = dive.pendingFoeBattle;
  let next: SaveData = { ...save, diveState: { ...dive, pendingFoeBattle: null } };
  if (pending && win) {
    const floor = next.towerState.floors[dive.depth];
    const foeRuntime = floor.foeRuntime.map((f) =>
      f.spawnId === pending.spawnId ? { ...f, defeated: true } : f
    );
    next = setFoeRuntime(next, dive.depth, foeRuntime);
    // 階層ボス撃破（[06 §4-5・§7]）: ゲート解放・ワープ解放・記録更新。
    if (pending.isBoss) next = defeatBoss(next, dive.depth, Date.now(), pending.enemyId);
  }
  return next;
}

/**
 * 階層ボスの撃破を反映する（[06 §4-5・§7]）。
 * - BossGateState.defeated=true（出口階段の封鎖解除）
 * - WarpState にチェックポイント追加
 * - TowerRecord（最高撃破ボス階・撃破履歴）更新
 */
export function defeatBoss(
  save: SaveData,
  depth: number,
  at: number = Date.now(),
  enemyId?: EnemyId
): SaveData {
  const ts = save.towerState;
  const bossGates = { ...ts.bossGates, [depth]: { depth, defeated: true } };
  const unlockedCheckpoints = ts.warp.unlockedCheckpoints.includes(depth)
    ? ts.warp.unlockedCheckpoints
    : [...ts.warp.unlockedCheckpoints, depth].sort((a, b) => a - b);
  const alreadyLogged = ts.record.bossDefeatLog.some((b) => b.depth === depth);
  const record = {
    ...ts.record,
    highestBossDefeated: Math.max(ts.record.highestBossDefeated, depth),
    bossDefeatLog: alreadyLogged
      ? ts.record.bossDefeatLog
      : [...ts.record.bossDefeatLog, { depth, at, enemyId }],
  };
  return {
    ...save,
    towerState: { ...ts, bossGates, warp: { ...ts.warp, unlockedCheckpoints }, record },
  };
}

/** その階の出口（上り階段）を通れるか（[06 §4]）。ボス階は撃破済みのみ通行可。 */
export function canAscend(save: SaveData, depth: number): boolean {
  if (!isBossFloor(depth)) return true;
  return save.towerState.bossGates[depth]?.defeated === true;
}

/** 現在セルの階段種別（上り/下り/なし）。 */
export function stairsAt(save: SaveData): 'stairsUp' | 'stairsDown' | null {
  const dive = save.diveState;
  if (!dive) return null;
  const ev = save.towerState.floors[dive.depth].generated.cells[dive.pos.y][dive.pos.x].event;
  if (ev?.kind === 'stairsUp' || ev?.kind === 'stairsDown') return ev.kind;
  return null;
}

/**
 * 出口（stairsUp）から1つ深い階へ。次階の入口に立つ。
 * ボス階はボス撃破（canAscend）まで封鎖（[06 §4]）。封鎖中は変更せず返す。
 */
export function goDeeper(save: SaveData): SaveData {
  if (!save.diveState) return save;
  if (!canAscend(save, save.diveState.depth)) return save; // ゲート封鎖中
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
      encounter: {
        stepsUntilEncounter: initEncounter(rng, {
          encounterRateDecay: levelDecay(partyAverageLevelFromDive(next), prevDepth),
        }),
      },
      pendingFoeBattle: null,
    },
  };
  return reveal(next, prevDepth, exit.x, exit.y);
}

/** 拠点へ帰還（潜行終了。diveState を破棄）。 */
export function returnToTown(save: SaveData): SaveData {
  return { ...save, diveState: null };
}
