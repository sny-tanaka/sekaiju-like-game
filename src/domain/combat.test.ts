import { BALANCE } from '@/data/balance';
import {
  buffMultiplier,
  computeDamage,
  deriveCombat,
  effectiveEnemyStats,
  resolveTurnOrder,
  scaleStats,
} from '@/domain/combat';
import { createRng } from '@/domain/rng';
import type { ActiveBuff, Combatant, Stats } from '@/domain/types';

const baseStats: Stats = { hp: 40, tp: 20, str: 10, vit: 10, agi: 10, int: 10, mnd: 10, luc: 10 };

function combatant(over: Partial<Combatant> = {}): Combatant {
  return {
    id: 'c',
    name: 'c',
    side: 'ally',
    row: 'front',
    stats: { ...baseStats },
    equip: {},
    hp: 40,
    maxHp: 40,
    tp: 20,
    maxTp: 20,
    buffs: [],
    ailments: [],
    unionGauge: 0,
    isDown: false,
    ...over,
  };
}

describe('combat: scale', () => {
  test('scaleStats は係数倍して丸める', () => {
    expect(scaleStats(baseStats, 1).str).toBe(10);
    expect(scaleStats(baseStats, 1.5).str).toBe(15);
  });

  test('effectiveEnemyStats は refDepth で等倍、深いほど強い', () => {
    const enemy = {
      id: 'enemy_x',
      name: 'x',
      baseStats,
      refDepth: 1,
      tierBand: 0,
      exp: 1,
      gold: 1,
    };
    expect(effectiveEnemyStats(enemy, 1)).toEqual(baseStats);
    const deeper = effectiveEnemyStats(enemy, 11); // +10階
    expect(deeper.str).toBeGreaterThan(baseStats.str);
    // k=0.05 → 11階で 1 + 0.05*10 = 1.5 倍
    expect(deeper.str).toBe(Math.round(10 * (1 + BALANCE.ENEMY_SCALE_K * 10)));
  });
});

describe('combat: buffs', () => {
  test('バフ無しは等倍', () => {
    expect(buffMultiplier([], 'patk')).toBe(1);
  });

  test('同 group は乖離が大きい方を採用、別 group は乗算', () => {
    const buffs: ActiveBuff[] = [
      { stat: 'patk', modifier: 1.2, remainingTurns: 3, stackGroup: 'atkBuff' },
      { stat: 'patk', modifier: 1.5, remainingTurns: 3, stackGroup: 'atkBuff' }, // 強い方
      { stat: 'patk', modifier: 0.7, remainingTurns: 3, stackGroup: 'atkDebuff' },
    ];
    // 1.5 * 0.7 = 1.05
    expect(buffMultiplier(buffs, 'patk')).toBeCloseTo(1.05, 5);
  });

  test('各要素は 0.5〜1.5 にクランプ', () => {
    const buffs: ActiveBuff[] = [{ stat: 'pdef', modifier: 5, remainingTurns: 1, stackGroup: 'g' }];
    expect(buffMultiplier(buffs, 'pdef')).toBe(1.5);
  });
});

describe('combat: deriveCombat', () => {
  test('patk = str*2 + 装備atk、バフ倍率を乗算', () => {
    const d = deriveCombat(baseStats, { atk: 6 }, [
      { stat: 'patk', modifier: 1.5, remainingTurns: 1, stackGroup: 'atkBuff' },
    ]);
    expect(d.patk).toBe((10 * 2 + 6) * 1.5);
  });
});

describe('combat: computeDamage', () => {
  test('決定論: 同一シードで同じ結果', () => {
    const a = combatant({ stats: { ...baseStats, str: 20 } });
    const b = combatant({ side: 'enemy' });
    const p = {
      statBase: 'str' as const,
      power: 1,
      element: 'slash' as const,
      elementMultiplier: 1,
    };
    const r1 = computeDamage(a, b, p, createRng(1));
    const r2 = computeDamage(a, b, p, createRng(1));
    expect(r1).toEqual(r2);
  });

  test('弱点(1.5倍)は耐性(0.5倍)よりダメージが大きい', () => {
    const a = combatant({ stats: { ...baseStats, str: 30 } });
    const b = combatant({ side: 'enemy' });
    const mk = (m: number) =>
      computeDamage(
        a,
        b,
        { statBase: 'str', power: 2, element: 'fire', elementMultiplier: m },
        createRng(5)
      ).damage;
    expect(mk(1.5)).toBeGreaterThan(mk(0.5));
  });

  test('属性無効(0倍)はダメージ0', () => {
    const a = combatant({ stats: { ...baseStats, str: 30 } });
    const b = combatant({ side: 'enemy' });
    const r = computeDamage(
      a,
      b,
      { statBase: 'str', power: 2, element: 'fire', elementMultiplier: 0 },
      createRng(5)
    );
    expect(r.damage).toBe(0);
  });

  test('魔法は必中（命中判定をしない）', () => {
    const a = combatant({ stats: { ...baseStats, int: 30, agi: 1 } });
    const b = combatant({ side: 'enemy', stats: { ...baseStats, agi: 99 } });
    for (let i = 0; i < 20; i++) {
      const r = computeDamage(
        a,
        b,
        { statBase: 'int', power: 1, element: 'fire', elementMultiplier: 1 },
        createRng(i)
      );
      expect(r.hit).toBe(true);
    }
  });

  test('防御バフ（ガード）は被ダメージを軽減する', () => {
    const a = combatant({ side: 'enemy', stats: { ...baseStats, str: 30 } });
    const plain = combatant();
    const guarded = combatant({
      buffs: [{ stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }],
    });
    const p = {
      statBase: 'str' as const,
      power: 2,
      element: 'bash' as const,
      elementMultiplier: 1,
    };
    expect(computeDamage(a, guarded, p, createRng(9)).damage).toBeLessThan(
      computeDamage(a, plain, p, createRng(9)).damage
    );
  });

  test('隊列補正は攻撃側後衛・防御側後衛で独立に乗算される（近接物理）', () => {
    const p = {
      statBase: 'str' as const,
      power: 2,
      element: 'bash' as const,
      elementMultiplier: 1,
    };
    // 攻撃側 agi を高くして必中にし、隊列補正だけを比較する
    const front = combatant({ stats: { ...baseStats, str: 30, agi: 100 }, row: 'front' });
    const backAtk = combatant({ stats: { ...baseStats, str: 30, agi: 100 }, row: 'back' });
    const defFront = combatant({ side: 'enemy', row: 'front' });
    const defBack = combatant({ side: 'enemy', row: 'back' });
    const d = (a: typeof front, t: typeof defFront) => computeDamage(a, t, p, createRng(4)).damage;
    // 前衛→前衛=等倍 が最大。後衛攻撃 or 後衛被弾で減り、両方後衛が最小。
    expect(d(front, defFront)).toBeGreaterThan(d(backAtk, defFront));
    expect(d(front, defFront)).toBeGreaterThan(d(front, defBack));
    expect(d(backAtk, defBack)).toBeLessThan(d(backAtk, defFront));
  });

  test('命中は acc/eva バフを反映する（回避バフで当たりにくくなる）', () => {
    const atk = combatant({ side: 'enemy', stats: { ...baseStats, agi: 12 } });
    const evasive = combatant({
      stats: { ...baseStats, agi: 12 },
      buffs: [{ stat: 'eva', modifier: 1.5, remainingTurns: 3, stackGroup: 'evaBuff' }],
    });
    const plain = combatant({ stats: { ...baseStats, agi: 12 } });
    const p = {
      statBase: 'str' as const,
      power: 1,
      element: 'slash' as const,
      elementMultiplier: 1,
    };
    let evHits = 0;
    let plHits = 0;
    for (let i = 0; i < 300; i++) {
      if (computeDamage(atk, evasive, p, createRng(i)).hit) evHits++;
      if (computeDamage(atk, plain, p, createRng(i)).hit) plHits++;
    }
    expect(evHits).toBeLessThan(plHits);
  });

  test('防御が高いほどダメージが減る（除算型）', () => {
    const a = combatant({ stats: { ...baseStats, str: 30 } });
    const lowDef = combatant({ side: 'enemy', stats: { ...baseStats, vit: 1 } });
    const highDef = combatant({ side: 'enemy', stats: { ...baseStats, vit: 100 } });
    const p = {
      statBase: 'str' as const,
      power: 2,
      element: 'slash' as const,
      elementMultiplier: 1,
    };
    expect(computeDamage(a, lowDef, p, createRng(3)).damage).toBeGreaterThan(
      computeDamage(a, highDef, p, createRng(3)).damage
    );
  });
});

describe('combat: turn order', () => {
  test('AGI 降順、戦闘不能は除外', () => {
    const fast = combatant({ id: 'fast', stats: { ...baseStats, agi: 30 } });
    const slow = combatant({ id: 'slow', stats: { ...baseStats, agi: 5 } });
    const down = combatant({ id: 'down', isDown: true, stats: { ...baseStats, agi: 99 } });
    const order = resolveTurnOrder([slow, down, fast], createRng(1));
    expect(order.map((c) => c.id)).toEqual(['fast', 'slow']);
  });
});
