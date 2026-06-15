import { canMove, pathTo, step, turnBack, turnLeft, turnRight } from '@/domain/movement';
import type { Cell, FloorMaster } from '@/domain/types';

// 2x1 の小さな床。左(0,0)と右(1,0)が東西で繋がっている。
function tinyFloor(): FloorMaster {
  const cell = (over: Partial<Cell['walls']>): Cell => ({
    walls: { N: true, E: true, S: true, W: true, ...over },
    floorType: 'normal',
    passable: true,
  });
  return {
    depth: 1,
    width: 2,
    height: 1,
    cells: [[cell({ E: false }), cell({ W: false })]],
    encounterTable: 't',
    foeSpawns: [],
    gatheringPoints: [],
    bgmId: 'b',
  };
}

describe('movement', () => {
  test('回転は90度ずつ正しく回る', () => {
    expect(turnRight('N')).toBe('E');
    expect(turnRight('W')).toBe('N');
    expect(turnLeft('N')).toBe('W');
    expect(turnBack('N')).toBe('S');
  });

  test('開口のある方向へは進める', () => {
    const f = tinyFloor();
    expect(canMove(f, 0, 0, 'E')).toBe(true);
    expect(step(f, { x: 0, y: 0 }, 'E')).toEqual({ x: 1, y: 0 });
  });

  test('壁・場外へは進めない', () => {
    const f = tinyFloor();
    expect(canMove(f, 0, 0, 'N')).toBe(false); // 壁
    expect(canMove(f, 0, 0, 'W')).toBe(false); // 場外
    expect(step(f, { x: 0, y: 0 }, 'N')).toBeNull();
  });

  test('進入不可セルへは進めない', () => {
    const f = tinyFloor();
    f.cells[0][1].passable = false;
    expect(canMove(f, 0, 0, 'E')).toBe(false);
  });

  // 3x1 の廊下（(0,0)-(1,0)-(2,0) が東西で連結）でタップ自動移動の経路を検証。
  function corridor(): FloorMaster {
    const cell = (over: Partial<Cell['walls']>): Cell => ({
      walls: { N: true, E: true, S: true, W: true, ...over },
      floorType: 'normal',
      passable: true,
    });
    return {
      depth: 1,
      width: 3,
      height: 1,
      cells: [[cell({ E: false }), cell({ W: false, E: false }), cell({ W: false })]],
      encounterTable: 't',
      foeSpawns: [],
      gatheringPoints: [],
      bgmId: 'b',
    };
  }

  test('pathTo は壁を考慮した最短の向き列を返す', () => {
    const f = corridor();
    expect(pathTo(f, { x: 0, y: 0 }, { x: 0, y: 0 })).toEqual([]); // 同一セル
    expect(pathTo(f, { x: 0, y: 0 }, { x: 2, y: 0 })).toEqual(['E', 'E']);
    expect(pathTo(f, { x: 2, y: 0 }, { x: 0, y: 0 })).toEqual(['W', 'W']);
  });

  test('pathTo は到達不能なら null', () => {
    const f = corridor();
    f.cells[0][1].passable = false; // 中央を塞ぐと右端へ行けない
    expect(pathTo(f, { x: 0, y: 0 }, { x: 2, y: 0 })).toBeNull();
  });
});
