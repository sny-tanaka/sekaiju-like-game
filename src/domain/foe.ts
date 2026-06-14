import { canMove, DELTA } from '@/domain/movement';
import type { Dir, EnemyId, FirstStrike, FloorMaster, FoeRuntimeState, Rng } from '@/domain/types';

// ============================================================================
// 徘徊型エネミー（FOE）の移動 AI（設計書 02 §6）。純関数・乱数注入。
// 「プレイヤー1歩＝全FOE1手」。spawnId 昇順で1体ずつ解決。
// 感知（sightRange 内）で追跡（alerted）→ 最短方向へ moveSpeed 分前進、接触で戦闘。
// 非追跡は patrol（wander/charge/static）。FOE は特殊床の影響を受けない（MVP）。
//
// MVP 簡略化（設計書との既知の乖離。将来精緻化の余地。06 §2.1 実装メモ参照）:
//  - 感知は壁透過の manhattan 距離のみ（02 §6.1③「壁で遮られなければ」は未考慮）。
//  - 追跡は BFS ではなく貪欲（manhattan を縮める1歩）。袋小路では同距離移動せず停止しうる。
//  - alerted は一度立つと解除しない（プレイヤーが離れても追尾を続ける）。
// ============================================================================

export interface FoeStepResult {
  foes: FoeRuntimeState[];
  /** このステップで接触した FOE（戦闘開始）。先に到達した1体のみ。 */
  contact: { spawnId: string; enemyId: EnemyId; firstStrike: FirstStrike } | null;
}

const DIRS: Dir[] = ['N', 'E', 'S', 'W'];
const manhattan = (a: { x: number; y: number }, b: { x: number; y: number }) =>
  Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

/**
 * 全 FOE を1手進める。
 * @param playerDir プレイヤーの向き（不意打ち判定に使用）
 */
export function stepFoes(
  floor: FloorMaster,
  runtime: FoeRuntimeState[],
  playerPos: { x: number; y: number },
  playerDir: Dir,
  rng: Rng
): FoeStepResult {
  const foes = runtime.map((f) => ({ ...f, cell: { ...f.cell } }));
  const byId = new Map(floor.foeSpawns.map((s) => [s.id, s]));
  // 衝突用の占有セル（生存 FOE のみ）
  const occupied = new Set(foes.filter((f) => !f.defeated).map((f) => `${f.cell.x},${f.cell.y}`));
  let contact: FoeStepResult['contact'] = null;

  // spawnId 昇順で解決（処理順を固定）。数値サフィックス（foe_2 < foe_10）を考慮する。
  const sorted = [...foes].sort((a, b) =>
    a.spawnId.localeCompare(b.spawnId, undefined, { numeric: true })
  );
  for (const foe of sorted) {
    if (contact) break; // 接触＝戦闘開始。残りは動かさない
    if (foe.defeated) continue;
    const spawn = byId.get(foe.spawnId);
    if (!spawn) continue;

    // 感知
    if (!foe.alerted && manhattan(foe.cell, playerPos) <= spawn.sightRange) {
      foe.alerted = true;
    }

    const tryMove = (dir: Dir): 'moved' | 'contact' | 'blocked' => {
      if (!canMove(floor, foe.cell.x, foe.cell.y, dir)) return 'blocked';
      const nx = foe.cell.x + DELTA[dir].dx;
      const ny = foe.cell.y + DELTA[dir].dy;
      if (nx === playerPos.x && ny === playerPos.y) {
        // 接触: FOE がプレイヤーへ進入。プレイヤーの背後（dir===playerDir）からなら不意打ち（[03 §10]）。
        // それ以外（正面/側面）は通常戦闘。プレイヤー側からの接触＝先制は移動側で扱う。
        const ambush = dir === playerDir;
        contact = {
          spawnId: foe.spawnId,
          enemyId: spawn.enemyId,
          firstStrike: ambush ? 'ambush' : 'none',
        };
        return 'contact';
      }
      if (occupied.has(`${nx},${ny}`)) return 'blocked';
      occupied.delete(`${foe.cell.x},${foe.cell.y}`);
      foe.cell = { x: nx, y: ny };
      occupied.add(`${nx},${ny}`);
      return 'moved';
    };

    if (foe.alerted) {
      // 追跡: manhattan を最も縮める方向へ moveSpeed 分
      for (let step = 0; step < spawn.moveSpeed; step++) {
        let bestDir: Dir | null = null;
        let bestDist = manhattan(foe.cell, playerPos);
        let reach = false;
        for (const dir of DIRS) {
          const nx = foe.cell.x + DELTA[dir].dx;
          const ny = foe.cell.y + DELTA[dir].dy;
          if (
            nx === playerPos.x &&
            ny === playerPos.y &&
            canMove(floor, foe.cell.x, foe.cell.y, dir)
          ) {
            bestDir = dir;
            reach = true;
            break;
          }
          if (!canMove(floor, foe.cell.x, foe.cell.y, dir)) continue;
          if (occupied.has(`${nx},${ny}`)) continue;
          const d = manhattan({ x: nx, y: ny }, playerPos);
          if (d < bestDist) {
            bestDist = d;
            bestDir = dir;
          }
        }
        if (!bestDir) break;
        const r = tryMove(bestDir);
        if (r === 'contact' || r === 'blocked') break;
        if (reach) break;
      }
    } else {
      // 巡回
      const patrol = spawn.patrol;
      if (patrol.kind === 'wander') {
        const opts = DIRS.filter(
          (d) =>
            canMove(floor, foe.cell.x, foe.cell.y, d) &&
            !occupied.has(`${foe.cell.x + DELTA[d].dx},${foe.cell.y + DELTA[d].dy}`)
        );
        if (opts.length > 0) tryMove(rng.pick(opts));
      } else if (patrol.kind === 'charge') {
        tryMove(patrol.dir);
      }
      // static / loop は MVP では移動しない
    }
  }

  return { foes, contact };
}
