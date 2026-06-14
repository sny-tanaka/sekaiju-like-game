import { isBossFloor } from '@/data/balance';
import { ENEMIES } from '@/data/enemies';
import type { EnemyId, Rng } from '@/domain/types';

// ============================================================================
// 出現エンカウントの抽選（[02 §5]・[06 §3]）。
// 階層の帯（tierBand）に属する敵プールから 1〜3 体を抽選。ボス階はボス単体。
// 乱数注入で再現可能。Phase 2 は第1帯のみ。
// ============================================================================

const BOSS_BY_DEPTH: Record<number, EnemyId> = {
  10: 'enemy_boss_gatekeeper',
};

/** その階の雑魚プール（tierBand 一致・ボスは除外）。 */
function zakoPool(depth: number): EnemyId[] {
  const band = Math.floor((depth - 1) / 10);
  return Object.values(ENEMIES)
    .filter((e) => e.tierBand === band && !e.id.startsWith('enemy_boss'))
    .map((e) => e.id);
}

/** 1戦闘分の敵 ID 配列を抽選する。 */
export function rollEncounter(depth: number, rng: Rng): EnemyId[] {
  if (isBossFloor(depth)) {
    const boss = BOSS_BY_DEPTH[depth];
    if (boss) return [boss];
  }
  const pool = zakoPool(depth);
  if (pool.length === 0) return [];
  const count = rng.range(1, 3);
  return Array.from({ length: count }, () => rng.pick(pool));
}
