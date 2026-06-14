import type { Rng } from '@/domain/types';

// ============================================================================
// 決定論的乱数 Rng（設計書 05 §0.4）
//
// - PRNG は mulberry32（32bit seed・高速・再現可能）。
// - シード派生ツリー: masterSeed → fork('floor:'+depth) で階生成シード、
//   fork('battle:'+id) で戦闘シード…と用途別に分岐する。
// - fork は「生成元の baseSeed × ラベル」から決定論的に子シードを作るため、
//   親 Rng をどれだけ消費していても同じラベルなら同じ子 Rng が得られる。
// - 全ドメイン関数はこの Rng を注入で受け取り、Math.random は直接使わない。
// ============================================================================

const UINT32 = 0x100000000; // 2^32

/** 文字列 + シードから 32bit シードを導出するハッシュ（cyrb53 ベースを簡略化）。 */
function deriveSeed(baseSeed: number, label: string): number {
  let h1 = 0xdeadbeef ^ baseSeed;
  let h2 = 0x41c6ce57 ^ baseSeed;
  for (let i = 0; i < label.length; i++) {
    const ch = label.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0) ^ (h1 >>> 0);
}

class Mulberry32 implements Rng {
  /** fork のための不変な基準シード。 */
  private readonly baseSeed: number;
  /** next() で前進する内部状態（シリアライズ対象）。 */
  private _state: number;

  constructor(seed: number, baseSeed?: number) {
    this._state = seed >>> 0;
    this.baseSeed = (baseSeed ?? seed) >>> 0;
  }

  get state(): number {
    return this._state;
  }

  next(): number {
    this._state = (this._state + 0x6d2b79f5) >>> 0;
    let t = this._state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / UINT32;
  }

  int(maxExclusive: number): number {
    if (maxExclusive <= 0) return 0;
    return Math.floor(this.next() * maxExclusive);
  }

  range(minInclusive: number, maxInclusive: number): number {
    if (maxInclusive < minInclusive) {
      [minInclusive, maxInclusive] = [maxInclusive, minInclusive];
    }
    const span = maxInclusive - minInclusive + 1;
    return minInclusive + this.int(span);
  }

  pick<T>(items: T[]): T {
    if (items.length === 0) {
      throw new Error('Rng.pick: 空配列は選択できません');
    }
    return items[this.int(items.length)];
  }

  fork(label: string): Rng {
    const childSeed = deriveSeed(this.baseSeed, label);
    return new Mulberry32(childSeed, childSeed);
  }
}

/** 新しい Rng を seed から生成する（baseSeed=seed）。 */
export function createRng(seed: number): Rng {
  return new Mulberry32(seed, seed);
}

/**
 * シリアライズした state から Rng を復元する。
 * 復元後は数列の続きを再現できる。fork を消費後も正しく再現したい場合は、
 * 生成元の baseSeed（例: SaveData.masterSeed）を渡すこと。
 * 省略時は state を baseSeed とみなす（fork は復元時点の状態起点になる）。
 */
export function restoreRng(state: number, baseSeed?: number): Rng {
  return new Mulberry32(state, baseSeed ?? state);
}

/** 非決定的に 32bit のマスターシードを作る（ニューゲーム時の masterSeed 生成用）。 */
export function randomSeed(): number {
  return Math.floor(Math.random() * 0x100000000) >>> 0;
}
