import { ENEMIES } from '@/data/enemies';
import type { EnemyId, Rng } from '@/domain/types';

// ============================================================================
// 出現エンカウントの抽選（[02 §5]・[06 §3]）。
// 階層の帯（tierBand）に属する「雑魚」プールから 1〜3 体を抽選。
// ★ボスはランダムエンカウントには出さない（[06 §4]）。ボスは generateFloor が
//   ボス階に固定遭遇（isBoss の FOE）として配置し、撃破でゲートを解放する。
// 乱数注入で再現可能。帯ごとの敵プール拡充は Phase 6-3。
// ============================================================================

/** その階の雑魚プール（tierBand 一致・ボスは isBoss で除外）。 */
function zakoPool(depth: number): EnemyId[] {
  const band = Math.floor((depth - 1) / 10);
  return Object.values(ENEMIES)
    .filter((e) => e.tierBand === band && !e.isBoss)
    .map((e) => e.id);
}

/** 1戦闘分の雑魚 ID 配列を抽選する（ボス階でもランダムは雑魚のみ。ボスは固定遭遇）。 */
export function rollEncounter(depth: number, rng: Rng): EnemyId[] {
  const pool = zakoPool(depth);
  if (pool.length === 0) return [];
  const count = rng.range(1, 3);
  return Array.from({ length: count }, () => rng.pick(pool));
}
