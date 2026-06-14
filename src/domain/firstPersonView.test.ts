import { castView } from '@/domain/firstPersonView';
import type { Cell, Dir, FloorMaster } from '@/domain/types';

// 縦1列の通路: (0,0)-(0,1)-(0,2) が南北で繋がり、(0,1) は東に開口あり。
function corridor(): FloorMaster {
  const c = (over: Partial<Cell['walls']>): Cell => ({
    walls: { N: true, E: true, S: true, W: true, ...over },
    floorType: 'normal',
    passable: true,
  });
  return {
    depth: 1,
    width: 2,
    height: 3,
    cells: [
      [c({ S: false }), c({})],
      [c({ N: false, S: false, E: false }), c({ W: false })],
      [c({ N: false, E: false }), c({ W: false })],
    ],
    encounterTable: 't',
    foeSpawns: [],
    bgmId: 'b',
  };
}

describe('castView', () => {
  test('南向きに見ると壁まで連続して見通せる', () => {
    const f = corridor();
    const slices = castView(f, { x: 0, y: 0 }, 'S' as Dir, 4);
    // (0,0)->(0,1)->(0,2) の3マス。(0,2) の南は壁なので打ち切り。
    expect(slices).toHaveLength(3);
    expect(slices[0]).toMatchObject({ x: 0, y: 0, frontOpen: true });
    expect(slices[2]).toMatchObject({ x: 0, y: 2, frontOpen: false });
  });

  test('側面の開口を検出する（(0,1) は南向きで左=東に開口）', () => {
    const f = corridor();
    const slices = castView(f, { x: 0, y: 0 }, 'S' as Dir, 4);
    // 南を向くと「左」は東。(0,1) は東に開口 → leftOpen=true
    expect(slices[1]).toMatchObject({ x: 0, y: 1, leftOpen: true });
    // (0,0) は東が壁 → leftOpen=false
    expect(slices[0].leftOpen).toBe(false);
  });

  test('正面が即壁なら現在地1マスだけ返す', () => {
    const f = corridor();
    const slices = castView(f, { x: 0, y: 0 }, 'N' as Dir, 4);
    expect(slices).toHaveLength(1);
    expect(slices[0].frontOpen).toBe(false);
  });

  test('maxDepth を超えて見通さない', () => {
    const f = corridor();
    const slices = castView(f, { x: 0, y: 0 }, 'S' as Dir, 2);
    expect(slices).toHaveLength(2);
  });
});
