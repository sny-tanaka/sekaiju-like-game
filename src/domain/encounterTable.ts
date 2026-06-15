import { BALANCE } from '@/data/balance';
import { ENEMIES } from '@/data/enemies';
import type { EnemyId, Rng } from '@/domain/types';

// ============================================================================
// 出現エンカウントの抽選（[02 §5]・[06 §3]）。
// 階層の帯（tierBand）に属する「雑魚」プールから 1〜3 体を抽選。
// ★ボス／FOE はランダムエンカウントには出さない（[06 §4]）。ボスは generateFloor が
//   ボス階に固定遭遇、FOE はフィールド徘徊として配置する。
// ★最深帯（authored 済みの最大 tierBand）より深い帯は、全帯（tier1〜最深）を循環して再利用し、
//   強さは enemyScale（出現階係数）で伸ばす（[06 §3] 無限タワー）。周回ごとに敵名へ LvN を付す。
//   例: 5tier 構成なら 1-50階=1周目 / 51-60=tier1の2周目 / 61-70=tier2の2周目 / … 。
// 乱数注入で再現可能。
// ============================================================================

/** authored 済みの最大帯（敵データに存在する tierBand の最大）。 */
const maxBand = (): number => Math.max(0, ...Object.values(ENEMIES).map((e) => e.tierBand));

/** 生帯（0 始まり。floor((depth-1)/10)）。 */
const rawBand = (depth: number): number => Math.floor((depth - 1) / BALANCE.BAND_SIZE);

/**
 * その深さの実効帯（敵プール選択用）。全帯（0〜最深）を循環する。
 * 例: 最深=4 なら band 0..4=1周目、band5→0 / band6→1 …（2周目）。
 * 強さ自体は enemyScale（出現階 × 敵 refDepth）で継続的に伸びる。
 */
export function poolBandForDepth(depth: number): number {
  return rawBand(depth) % (maxBand() + 1);
}

/** 周回数（1 始まり）。1周目=最初の全帯、2周目以降は敵名に LvN を付す。 */
export function enemyLapForDepth(depth: number): number {
  return Math.floor(rawBand(depth) / (maxBand() + 1)) + 1;
}

/** その階の雑魚プール（実効帯一致・kind=zako。ボス/FOE は除外）。 */
function zakoPool(depth: number): EnemyId[] {
  const band = poolBandForDepth(depth);
  return Object.values(ENEMIES)
    .filter((e) => e.tierBand === band && !e.isBoss && e.kind !== 'foe')
    .map((e) => e.id);
}

/** 1戦闘分の雑魚 ID 配列を抽選する（ボス階でもランダムは雑魚のみ。ボスは固定遭遇）。 */
export function rollEncounter(depth: number, rng: Rng): EnemyId[] {
  const pool = zakoPool(depth);
  if (pool.length === 0) return [];
  const count = rng.range(1, 3);
  return Array.from({ length: count }, () => rng.pick(pool));
}
