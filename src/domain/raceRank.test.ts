import { describe, expect, it } from 'vitest';

import { raceStatRanks } from './raceRank';
import type { StatRank } from './raceRank';

const VALID_RANKS: StatRank[] = ['S', 'A', 'B', 'C', 'D'];
const STAT_KEYS = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'] as const;
const RACE_IDS = [
  'race_human',
  'race_garon',
  'race_pix',
  'race_therian',
  'race_lunar',
  'race_golan',
] as const;

describe('raceStatRanks', () => {
  it('全種族・全 stat で S/A/B/C/D のいずれかを返す', () => {
    for (const raceId of RACE_IDS) {
      const ranks = raceStatRanks(raceId);
      for (const key of STAT_KEYS) {
        expect(VALID_RANKS).toContain(ranks[key]);
      }
    }
  });

  it('HP 最大は golan が S ランク', () => {
    const golanRanks = raceStatRanks('race_golan');
    expect(golanRanks.hp).toBe('S');
  });

  it('HP が低い pix と lunar は D ランク', () => {
    const pixRanks = raceStatRanks('race_pix');
    const lunarRanks = raceStatRanks('race_lunar');
    // pix: hp=28+5*19=123, lunar: hp=30+5*19=125 — 最小グループ
    expect(pixRanks.hp).toBe('D');
    expect(lunarRanks.hp).toBe('D');
  });

  it('int が高い pix は S ランク', () => {
    const pixRanks = raceStatRanks('race_pix');
    // pix: int=12+3*19=69 — 6種族中最高
    expect(pixRanks.int).toBe('S');
  });

  it('不明な raceId は例外を投げる', () => {
    expect(() => raceStatRanks('race_unknown')).toThrow();
  });
});
