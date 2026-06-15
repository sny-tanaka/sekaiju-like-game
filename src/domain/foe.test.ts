import { stepFoes } from '@/domain/foe';
import { createRng } from '@/domain/rng';
import type { Cell, FloorMaster, FoeRuntimeState, FoeSpawn } from '@/domain/types';

// 壁の無い開けた N×N 階を作る（境界は inBounds で塞がる）。
function openFloor(size: number, foeSpawns: FoeSpawn[]): FloorMaster {
  const cells: Cell[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      walls: { N: false, E: false, S: false, W: false },
      floorType: 'normal' as const,
      passable: true,
    }))
  );
  return {
    depth: 1,
    width: size,
    height: size,
    cells,
    encounterTable: 'band_0',
    foeSpawns,
    gatheringPoints: [],
    bgmId: 'bgm_dungeon',
  };
}

// 壁で仕切った1セルを作るためのユーティリティ（指定方向だけ閉じる）。
const spawn = (over: Partial<FoeSpawn> = {}): FoeSpawn => ({
  id: 'foe_0',
  enemyId: 'enemy_slime',
  startCell: { x: 0, y: 0 },
  patrol: { kind: 'wander' },
  moveSpeed: 1,
  sightRange: 3,
  respawn: false,
  ...over,
});

const runtime = (over: Partial<FoeRuntimeState> = {}): FoeRuntimeState => ({
  spawnId: 'foe_0',
  cell: { x: 0, y: 0 },
  defeated: false,
  alerted: false,
  ...over,
});

describe('stepFoes: 感知と追跡', () => {
  test('sightRange 内に入ると alerted になりプレイヤーへ近づく', () => {
    const s = spawn({ startCell: { x: 5, y: 5 }, sightRange: 3 });
    const floor = openFloor(10, [s]);
    const r = stepFoes(
      floor,
      [runtime({ cell: { x: 5, y: 5 } })],
      { x: 5, y: 8 },
      'N',
      createRng(1)
    );
    const foe = r.foes[0];
    expect(foe.alerted).toBe(true);
    // manhattan が 3 → 2 に縮む（1歩近づく）
    expect(Math.abs(foe.cell.x - 5) + Math.abs(foe.cell.y - 8)).toBe(2);
    expect(r.contact).toBeNull();
  });

  test('sightRange 外なら alerted にならない（巡回のみ）', () => {
    const s = spawn({ startCell: { x: 0, y: 0 }, sightRange: 2 });
    const floor = openFloor(10, [s]);
    const r = stepFoes(
      floor,
      [runtime({ cell: { x: 0, y: 0 } })],
      { x: 9, y: 9 },
      'N',
      createRng(1)
    );
    expect(r.foes[0].alerted).toBe(false);
  });

  test('moveSpeed 分だけ近づく', () => {
    const s = spawn({ startCell: { x: 5, y: 0 }, sightRange: 9, moveSpeed: 2 });
    const floor = openFloor(10, [s]);
    const r = stepFoes(
      floor,
      [runtime({ cell: { x: 5, y: 0 }, alerted: true })],
      { x: 5, y: 5 },
      'N',
      createRng(1)
    );
    // y=0 から 2歩近づいて y=2
    expect(r.foes[0].cell).toEqual({ x: 5, y: 2 });
  });
});

describe('stepFoes: 接触と先制/不意打ち', () => {
  test('正面/側面からの接触は通常戦闘（firstStrike none）', () => {
    const s = spawn({ startCell: { x: 5, y: 6 }, sightRange: 9 });
    const floor = openFloor(10, [s]);
    // プレイヤー(5,5) は S を向く（FOE は N から進入＝背後ではない）
    const r = stepFoes(
      floor,
      [runtime({ cell: { x: 5, y: 6 }, alerted: true })],
      { x: 5, y: 5 },
      'S',
      createRng(1)
    );
    expect(r.contact).not.toBeNull();
    expect(r.contact!.firstStrike).toBe('none');
    expect(r.contact!.enemyId).toBe('enemy_slime');
  });

  test('プレイヤーの背後からの接触は不意打ち（ambush）', () => {
    const s = spawn({ startCell: { x: 5, y: 6 }, sightRange: 9 });
    const floor = openFloor(10, [s]);
    // プレイヤー(5,5) は N を向く。背後は S=(5,6)。FOE は N へ進入＝背後から → 不意打ち
    const r = stepFoes(
      floor,
      [runtime({ cell: { x: 5, y: 6 }, alerted: true })],
      { x: 5, y: 5 },
      'N',
      createRng(1)
    );
    expect(r.contact!.firstStrike).toBe('ambush');
  });

  test('接触したらそのセルには進入しない（プレイヤー位置に重ならない）', () => {
    const s = spawn({ startCell: { x: 5, y: 6 }, sightRange: 9 });
    const floor = openFloor(10, [s]);
    const r = stepFoes(
      floor,
      [runtime({ cell: { x: 5, y: 6 }, alerted: true })],
      { x: 5, y: 5 },
      'S',
      createRng(1)
    );
    expect(r.foes[0].cell).toEqual({ x: 5, y: 6 });
  });
});

describe('stepFoes: 巡回・撃破・衝突', () => {
  test('defeated な FOE は動かず接触もしない', () => {
    const s = spawn({ startCell: { x: 5, y: 6 }, sightRange: 9 });
    const floor = openFloor(10, [s]);
    const r = stepFoes(
      floor,
      [runtime({ cell: { x: 5, y: 6 }, alerted: true, defeated: true })],
      { x: 5, y: 5 },
      'N',
      createRng(1)
    );
    expect(r.contact).toBeNull();
    expect(r.foes[0].cell).toEqual({ x: 5, y: 6 });
  });

  test('wander は rng で1マス移動する（壁内には出ない）', () => {
    const s = spawn({ startCell: { x: 5, y: 5 }, sightRange: 0, patrol: { kind: 'wander' } });
    const floor = openFloor(10, [s]);
    const r = stepFoes(
      floor,
      [runtime({ cell: { x: 5, y: 5 } })],
      { x: 0, y: 0 },
      'N',
      createRng(7)
    );
    const foe = r.foes[0];
    const moved = foe.cell.x !== 5 || foe.cell.y !== 5;
    expect(moved).toBe(true);
    // 隣接1マスのみ
    expect(Math.abs(foe.cell.x - 5) + Math.abs(foe.cell.y - 5)).toBe(1);
  });

  test('charge は指定方向へ進む', () => {
    const s = spawn({
      startCell: { x: 5, y: 5 },
      sightRange: 0,
      patrol: { kind: 'charge', dir: 'E' },
    });
    const floor = openFloor(10, [s]);
    const r = stepFoes(
      floor,
      [runtime({ cell: { x: 5, y: 5 } })],
      { x: 0, y: 0 },
      'N',
      createRng(1)
    );
    expect(r.foes[0].cell).toEqual({ x: 6, y: 5 });
  });

  test('static は移動しない', () => {
    const s = spawn({ startCell: { x: 5, y: 5 }, sightRange: 0, patrol: { kind: 'static' } });
    const floor = openFloor(10, [s]);
    const r = stepFoes(
      floor,
      [runtime({ cell: { x: 5, y: 5 } })],
      { x: 0, y: 0 },
      'N',
      createRng(1)
    );
    expect(r.foes[0].cell).toEqual({ x: 5, y: 5 });
  });

  test('FOE 同士は同じセルに重ならない', () => {
    // foe_0 は静止（sightRange 0 で alerted にならない）。foe_1 はプレイヤーを追って北上したいが
    // foe_0 のいる (5,1) が塞がれているため進入できない。
    const a = spawn({
      id: 'foe_0',
      startCell: { x: 5, y: 1 },
      sightRange: 0,
      patrol: { kind: 'static' },
    });
    const b = spawn({ id: 'foe_1', startCell: { x: 5, y: 2 }, sightRange: 9 });
    const floor = openFloor(10, [a, b]);
    const r = stepFoes(
      floor,
      [
        runtime({ spawnId: 'foe_0', cell: { x: 5, y: 1 }, alerted: false }),
        runtime({ spawnId: 'foe_1', cell: { x: 5, y: 2 }, alerted: true }),
      ],
      { x: 5, y: 0 }, // foe_1 は (5,1) 経由で北上したいが foe_0 が塞ぐ
      'E',
      createRng(1)
    );
    const f0 = r.foes.find((f) => f.spawnId === 'foe_0')!;
    const f1 = r.foes.find((f) => f.spawnId === 'foe_1')!;
    expect(f0.cell).toEqual({ x: 5, y: 1 });
    expect(f1.cell).not.toEqual(f0.cell);
  });
});
