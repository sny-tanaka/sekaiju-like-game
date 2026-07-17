import { startBattle } from '@/domain/battle';
import { startDive } from '@/domain/dive';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
import { trophyGains, trophyGemsForCrossing, trophyRank } from '@/domain/trophy';
import type { BattleState, SaveData } from '@/domain/types';

function diveSave(): SaveData {
  let save = createInitialSaveData('勲章ギルド');
  save = addCharacterToGuild(
    save,
    createCharacter({ raceId: 'race_garon', classId: 'class_warrior', name: '戦士' })
  );
  return startDive(save, 1);
}

describe('trophyRank（境界値）', () => {
  test('zako [10,50,150,400]: しきい値ちょうどでランクが上がる', () => {
    expect(trophyRank('zako', 0)).toBe(0);
    expect(trophyRank('zako', 9)).toBe(0);
    expect(trophyRank('zako', 10)).toBe(1);
    expect(trophyRank('zako', 49)).toBe(1);
    expect(trophyRank('zako', 50)).toBe(2);
    expect(trophyRank('zako', 149)).toBe(2);
    expect(trophyRank('zako', 150)).toBe(3);
    expect(trophyRank('zako', 399)).toBe(3);
    expect(trophyRank('zako', 400)).toBe(4);
    expect(trophyRank('zako', 1000)).toBe(4);
  });

  test('foe [3,10,30,80]: しきい値ちょうどでランクが上がる', () => {
    expect(trophyRank('foe', 2)).toBe(0);
    expect(trophyRank('foe', 3)).toBe(1);
    expect(trophyRank('foe', 9)).toBe(1);
    expect(trophyRank('foe', 10)).toBe(2);
    expect(trophyRank('foe', 29)).toBe(2);
    expect(trophyRank('foe', 30)).toBe(3);
    expect(trophyRank('foe', 79)).toBe(3);
    expect(trophyRank('foe', 80)).toBe(4);
  });

  test('boss [1,5,15,40]: しきい値ちょうどでランクが上がる', () => {
    expect(trophyRank('boss', 0)).toBe(0);
    expect(trophyRank('boss', 1)).toBe(1);
    expect(trophyRank('boss', 4)).toBe(1);
    expect(trophyRank('boss', 5)).toBe(2);
    expect(trophyRank('boss', 14)).toBe(2);
    expect(trophyRank('boss', 15)).toBe(3);
    expect(trophyRank('boss', 39)).toBe(3);
    expect(trophyRank('boss', 40)).toBe(4);
  });
});

describe('trophyGemsForCrossing（境界値・複数ランク跨ぎ）', () => {
  test('ランクを跨がなければ 0', () => {
    expect(trophyGemsForCrossing('zako', 0, 9)).toBe(0);
    expect(trophyGemsForCrossing('zako', 11, 49)).toBe(0);
  });

  test('しきい値ちょうどを跨ぐと該当ランクのジェムを返す（銅=+2）', () => {
    expect(trophyGemsForCrossing('zako', 9, 10)).toBe(2);
  });

  test('複数ランクを一度に跨ぐと合算される（銅+銀=2+5=7）', () => {
    expect(trophyGemsForCrossing('zako', 9, 50)).toBe(7);
  });

  test('全ランクを一度に跨ぐと 2+5+15+50=72', () => {
    expect(trophyGemsForCrossing('zako', 0, 400)).toBe(72);
  });

  test('既に最高ランクに到達済みならそれ以上増えても 0', () => {
    expect(trophyGemsForCrossing('zako', 400, 1000)).toBe(0);
  });

  test('after <= before（減少・同値）なら 0', () => {
    expect(trophyGemsForCrossing('zako', 50, 49)).toBe(0);
    expect(trophyGemsForCrossing('zako', 10, 10)).toBe(0);
  });
});

describe('trophyGains（表示用・applyBattleResult と同一ロジック）', () => {
  test('新たに倒した敵の勲章ランク到達のみを返す（未到達は含まない）', () => {
    let save = diveSave();
    // enemy_slime を9体討伐済みにしておく（銅=10まであと1）
    save = {
      ...save,
      bestiary: {
        ...save.bestiary,
        monsters: {
          enemy_slime: { seen: true, defeated: true, dropsFound: [], kills: 9 },
        },
      },
    };
    const base = startBattle(save, ['enemy_slime', 'enemy_giant_rat']);
    const state: BattleState = {
      ...base,
      outcome: 'win',
      enemies: base.enemies.map((e) => ({ ...e, isDown: true, hp: 0 })),
    };
    const gains = trophyGains(save, state);
    // enemy_slime: 9→10 で銅到達（+2）。enemy_giant_rat: 0→1 は未到達（zako銅は10体必要）。
    expect(gains).toHaveLength(1);
    expect(gains[0]).toMatchObject({ enemyId: 'enemy_slime', rank: 1, gems: 2 });
  });

  test('倒していない敵は含まれない', () => {
    const save = diveSave();
    const base = startBattle(save, ['enemy_slime']);
    // isDown のまま変更しない（撃破していない）
    const gains = trophyGains(save, base);
    expect(gains).toEqual([]);
  });
});
