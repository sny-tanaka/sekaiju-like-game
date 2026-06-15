import { isBossFloor } from '@/data/balance';
import { ENEMIES } from '@/data/enemies';
import { GATHER_TYPE_LIST } from '@/data/gather';
import type {
  Cell,
  Dir,
  EnemyId,
  FloorMaster,
  FoeSpawn,
  GatheringPoint,
  Rng,
} from '@/domain/types';

/** その帯の FOE プール（雑魚と同プール。ボスは除外）。 */
function FOE_POOL_BY_BAND(band: number): EnemyId[] {
  return Object.values(ENEMIES)
    .filter((e) => e.tierBand === band && !e.id.startsWith('enemy_boss'))
    .map((e) => e.id);
}

// ============================================================================
// 階層自動生成（設計書 06 §2.1 / 02 §2）。
// - 決定論的（同一 seed → 同一 FloorMaster）。
// - 壁は隣接セルと必ず整合（A.E === B.W）。穴掘り法（再帰的バックトラッカ）で
//   全域木を作るため、全セルが相互到達可能になる（孤立なし）。
// - 乱数消費順を固定: ①地形（迷路生成→ループ追加）→ ②階段。
//   配置物（採集/イベント/FOE/ボス）は今後ここから末尾に追加する（既存階の再現を壊さない）。
// ============================================================================

const DELTA: Record<Dir, { dx: number; dy: number }> = {
  N: { dx: 0, dy: -1 },
  E: { dx: 1, dy: 0 },
  S: { dx: 0, dy: 1 },
  W: { dx: -1, dy: 0 },
};
const OPPOSITE: Record<Dir, Dir> = { N: 'S', E: 'W', S: 'N', W: 'E' };

/** 一辺のサイズ（depth 依存・暫定。06 §2.1 の式を MVP 向けに調整）。 */
function floorSize(depth: number): number {
  return Math.min(25, 15 + Math.floor(depth / 5));
}

function makeCell(): Cell {
  return {
    walls: { N: true, E: true, S: true, W: true },
    floorType: 'normal',
    passable: true,
  };
}

const inBounds = (x: number, y: number, w: number, h: number) => x >= 0 && y >= 0 && x < w && y < h;

/** 2セル間の壁を取り除く（両側に反映して整合を保つ）。 */
function carve(cells: Cell[][], x: number, y: number, dir: Dir): void {
  const { dx, dy } = DELTA[dir];
  cells[y][x].walls[dir] = false;
  cells[y + dy][x + dx].walls[OPPOSITE[dir]] = false;
}

/** 入口から全セルへの最短距離を BFS で求める（壁の開口のみ通行）。到達不能は -1。 */
function bfsDistances(cells: Cell[][], sx: number, sy: number): number[][] {
  const h = cells.length;
  const w = cells[0].length;
  const dist = Array.from({ length: h }, () => Array<number>(w).fill(-1));
  const queue: { x: number; y: number }[] = [{ x: sx, y: sy }];
  dist[sy][sx] = 0;
  for (let i = 0; i < queue.length; i++) {
    const { x, y } = queue[i];
    for (const dir of ['N', 'E', 'S', 'W'] as Dir[]) {
      if (cells[y][x].walls[dir]) continue;
      const nx = x + DELTA[dir].dx;
      const ny = y + DELTA[dir].dy;
      if (!inBounds(nx, ny, w, h) || dist[ny][nx] !== -1) continue;
      dist[ny][nx] = dist[y][x] + 1;
      queue.push({ x: nx, y: ny });
    }
  }
  return dist;
}

/**
 * 自動生成された階を返す（初回生成時に確定保存して以後は再生成しない）。
 */
export function generateFloor(depth: number, rng: Rng): FloorMaster {
  const size = floorSize(depth);
  const width = size;
  const height = size;
  const cells: Cell[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => makeCell())
  );

  // ① 地形: 再帰的バックトラッカで全域木の迷路を掘る
  const visited = Array.from({ length: height }, () => Array<boolean>(width).fill(false));
  const startX = rng.int(width);
  const startY = rng.int(height);
  const stack: { x: number; y: number }[] = [{ x: startX, y: startY }];
  visited[startY][startX] = true;
  while (stack.length > 0) {
    const cur = stack[stack.length - 1];
    const candidates: Dir[] = [];
    for (const dir of ['N', 'E', 'S', 'W'] as Dir[]) {
      const nx = cur.x + DELTA[dir].dx;
      const ny = cur.y + DELTA[dir].dy;
      if (inBounds(nx, ny, width, height) && !visited[ny][nx]) candidates.push(dir);
    }
    if (candidates.length === 0) {
      stack.pop();
      continue;
    }
    const dir = rng.pick(candidates);
    carve(cells, cur.x, cur.y, dir);
    const nx = cur.x + DELTA[dir].dx;
    const ny = cur.y + DELTA[dir].dy;
    visited[ny][nx] = true;
    stack.push({ x: nx, y: ny });
  }

  // ① 地形（続き）: ループを少し追加して一本道感を減らす（壁を数枚だけ抜く）
  const loopCount = Math.floor((width * height) / 25);
  for (let i = 0; i < loopCount; i++) {
    const x = rng.int(width);
    const y = rng.int(height);
    const dir = rng.pick(['N', 'E', 'S', 'W'] as Dir[]);
    const nx = x + DELTA[dir].dx;
    const ny = y + DELTA[dir].dy;
    if (inBounds(nx, ny, width, height) && cells[y][x].walls[dir]) {
      carve(cells, x, y, dir);
    }
  }

  // ② 階段: 入口（前階からの降り口）を1セル選び、そこから最も遠いセルを出口にする
  const entranceX = rng.int(width);
  const entranceY = rng.int(height);
  const dist = bfsDistances(cells, entranceX, entranceY);
  let exitX = entranceX;
  let exitY = entranceY;
  let best = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (dist[y][x] > best) {
        best = dist[y][x];
        exitX = x;
        exitY = y;
      }
    }
  }
  cells[entranceY][entranceX].event = { kind: 'stairsDown' }; // 拠点/前階へ戻る入口
  cells[exitY][exitX].event = { kind: 'stairsUp' }; // 次の階へ進む出口

  const band = Math.floor((depth - 1) / 10);

  // ⑤ FOE（徘徊敵）配置（[02 §6]）。ボス階には置かない。入口/出口と入口隣接は避ける。
  const foeSpawns: FoeSpawn[] = [];
  if (!isBossFloor(depth)) {
    const pool = FOE_POOL_BY_BAND(band);
    const foeCount = 1 + Math.floor(depth / 8);
    for (let i = 0; i < foeCount && pool.length > 0; i++) {
      // 入口から少し離れた床セルを抽選
      let fx = rng.int(width);
      let fy = rng.int(height);
      for (let tries = 0; tries < 20; tries++) {
        fx = rng.int(width);
        fy = rng.int(height);
        const ev = cells[fy][fx].event;
        const farFromEntrance = Math.abs(fx - entranceX) + Math.abs(fy - entranceY) >= 3;
        if (!ev && farFromEntrance) break;
      }
      foeSpawns.push({
        id: `foe_${i}`,
        enemyId: rng.pick(pool),
        startCell: { x: fx, y: fy },
        patrol: { kind: 'wander' },
        moveSpeed: 1,
        sightRange: 3,
        respawn: false,
      });
    }
  }

  // ⑥ 採集ポイント＋調理地点（[04 §5-6]）。乱数消費順は FOE の後（末尾追加で既存階の再現を壊さない）。
  // ※ 設計の論理順（採集→FOE）とは異なるが、既存生成の決定論を保つため末尾に置く（06 §2.1 実装メモ）。
  const gatheringPoints: GatheringPoint[] = [];
  const placeOnFreeCell = (): { x: number; y: number } | null => {
    for (let tries = 0; tries < 25; tries++) {
      const gx = rng.int(width);
      const gy = rng.int(height);
      const farFromEntrance = Math.abs(gx - entranceX) + Math.abs(gy - entranceY) >= 2;
      if (!cells[gy][gx].event && farFromEntrance) return { x: gx, y: gy };
    }
    return null;
  };
  const gatherCount = 2 + Math.floor(depth / 10);
  for (let i = 0; i < gatherCount; i++) {
    const pos = placeOnFreeCell();
    if (!pos) break;
    const type = rng.pick(GATHER_TYPE_LIST);
    const id = `gather_${i}`;
    cells[pos.y][pos.x].event = { kind: 'gather', gatherId: id };
    gatheringPoints.push({ id, cell: pos, type });
  }
  // 調理地点を1つ（ボス階以外）。
  if (!isBossFloor(depth)) {
    const pos = placeOnFreeCell();
    if (pos) cells[pos.y][pos.x].event = { kind: 'cookingSpot', spotId: 'cook_0' };
  }

  return {
    depth,
    width,
    height,
    cells,
    encounterTable: `band_${band}`,
    foeSpawns,
    gatheringPoints,
    bgmId: isBossFloor(depth) ? 'bgm_boss' : 'bgm_dungeon',
  };
}

/** 指定 event 種別のセル座標を返す（最初の1件）。入口/出口の取得に使う。 */
export function findEventCell(
  floor: FloorMaster,
  kind: 'stairsUp' | 'stairsDown'
): { x: number; y: number } | null {
  for (let y = 0; y < floor.height; y++) {
    for (let x = 0; x < floor.width; x++) {
      if (floor.cells[y][x].event?.kind === kind) return { x, y };
    }
  }
  return null;
}
