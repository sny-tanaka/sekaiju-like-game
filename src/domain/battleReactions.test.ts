import { resolveTurn, startBattle } from '@/domain/battle';
import { startDive } from '@/domain/dive';
import { createRng } from '@/domain/rng';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
import { computeBaseStats } from '@/domain/stats';
import type { SaveData } from '@/domain/types';

// ============================================================================
// Phase 6-2b: 反応系（反撃/連携追撃/挑発/障壁）・治療・パッシブ最大HP の戦闘テスト。
// 反応の確率・命中は注入状態で固定し、決定論的に検証する。
// ============================================================================

function diveSaveN(classes: string[]): SaveData {
  let save = createInitialSaveData('反応ギルド');
  for (let i = 0; i < classes.length; i++) {
    save = addCharacterToGuild(
      save,
      createCharacter({ raceId: 'race_garon', classId: classes[i], name: `C${i}` })
    );
  }
  return startDive(save, 1);
}

describe('battle: パッシブ最大HP（[03 §5.4]）', () => {
  test('最大HPブースト習得で Combatant の maxHp が素ステより増える', () => {
    const c = createCharacter({ raceId: 'race_human', classId: 'class_guardian', name: '守' });
    c.learnedSkills = { passive_guardian_hp_boost: 3 };
    let save = createInitialSaveData('G');
    save = addCharacterToGuild(save, c);
    save = startDive(save, 1);
    const state = startBattle(save, ['enemy_slime']);
    const ally = state.allies[0];
    expect(ally.maxHp).toBeGreaterThan(computeBaseStats(c).hp);
    expect(ally.passive?.maxHp).toBeGreaterThan(1);
  });
});

describe('battle: 反撃（counter・[03 §6.5]）', () => {
  test('反撃状態の味方が被弾すると敵に反撃する', () => {
    const state = startBattle(diveSaveN(['class_warrior']), ['enemy_slime']);
    const ally = state.allies[0];
    const enemy = state.enemies[0];
    ally.hp = ally.maxHp = 9999; // 反撃前に倒れない
    ally.stats.agi = 1; // 回避を下げ、敵の攻撃を必ず受ける
    ally.stats.int = 60; // 魔法反撃で必中・高威力
    enemy.stats.agi = 500; // 命中を上げる
    ally.states = [{ kind: 'counter', chance: 1, power: 3, statBase: 'int', remainingTurns: 2 }];
    const before = enemy.hp;
    const after = resolveTurn(state, [{ kind: 'guard', actorId: ally.id }], createRng(1));
    expect(after.log.some((l) => l.text.includes('反撃'))).toBe(true);
    expect(after.enemies[0].hp).toBeLessThan(before);
  });
});

describe('battle: 連携追撃（chase・[03 §6.5]）', () => {
  test('連携状態の味方は、別の味方が同属性で敵を攻撃すると追撃する', () => {
    const state = startBattle(diveSaveN(['class_warrior', 'class_warrior']), ['enemy_slime']);
    const [a, b] = state.allies;
    const enemy = state.enemies[0];
    enemy.hp = enemy.maxHp = 9999; // 追撃を観測するため倒れないように
    enemy.stats.agi = 1;
    b.stats.agi = 500; // b の通常攻撃（壊）を必中させる
    a.states = [{ kind: 'chase', element: 'bash', power: 2, statBase: 'int', remainingTurns: 2 }];
    const after = resolveTurn(
      state,
      [
        { kind: 'attack', actorId: b.id, targetId: enemy.id },
        { kind: 'guard', actorId: a.id },
      ],
      createRng(3)
    );
    expect(after.log.some((l) => l.text.includes('連携追撃'))).toBe(true);
  });

  test('多段ヒットのスキルでも連携追撃は対象につき1回だけ（[03 §6.5]）', () => {
    const state = startBattle(diveSaveN(['class_warrior', 'class_monk']), ['enemy_slime']);
    const [a, b] = state.allies;
    const enemy = state.enemies[0];
    enemy.hp = enemy.maxHp = 99999; // 3ヒット＋追撃でも倒れない
    enemy.stats.agi = 1;
    b.stats.agi = 500; // 三段突き（3ヒット）を必中させる
    b.tp = 50;
    a.states = [{ kind: 'chase', element: 'bash', power: 1, statBase: 'int', remainingTurns: 2 }];
    const after = resolveTurn(
      state,
      [
        { kind: 'skill', actorId: b.id, skillId: 'skill_triple_strike', targetId: enemy.id },
        { kind: 'guard', actorId: a.id },
      ],
      createRng(3)
    );
    const chases = after.log.filter((l) => l.text.includes('連携追撃')).length;
    expect(chases).toBe(1);
  });
});

describe('battle: 挑発（decoy・[03 §6.5]）', () => {
  test('挑発した味方に敵の攻撃が集中し、別の味方は狙われない', () => {
    const state = startBattle(diveSaveN(['class_guardian', 'class_mage']), ['enemy_slime']);
    const [a, b] = state.allies;
    a.hp = a.maxHp = 9999;
    b.hp = b.maxHp = 9999;
    a.states = [{ kind: 'decoy', weight: 1000, remainingTurns: 2 }];
    const after = resolveTurn(
      state,
      [
        { kind: 'guard', actorId: a.id },
        { kind: 'guard', actorId: b.id },
      ],
      createRng(1)
    );
    const bAfter = after.allies.find((x) => x.id === b.id)!;
    expect(bAfter.hp).toBe(9999); // 挑発していない b は狙われていない
  });
});

describe('battle: 障壁（barrier・[03 §6.5]）', () => {
  test('障壁は被弾ダメージを肩代わりする', () => {
    const state = startBattle(diveSaveN(['class_guardian']), ['enemy_slime']);
    const ally = state.allies[0];
    const enemy = state.enemies[0];
    ally.stats.agi = 1;
    enemy.stats.agi = 500; // 敵の攻撃を必中させる
    ally.states = [{ kind: 'barrier', absorb: 99999, remainingTurns: 2 }];
    const before = ally.hp;
    const after = resolveTurn(state, [{ kind: 'guard', actorId: ally.id }], createRng(1));
    expect(after.log.some((l) => l.text.includes('障壁'))).toBe(true);
    expect(after.allies[0].hp).toBe(before); // 全吸収で HP 不変
  });
});

describe('battle: 状態異常治療（cleanse・[03 §6.6]）', () => {
  test('リフレシュハーブで味方の状態異常が解除される', () => {
    const state = startBattle(diveSaveN(['class_medic']), ['enemy_slime']);
    const ally = state.allies[0];
    ally.tp = 50;
    ally.ailments = [{ type: 'blind', remainingTurns: 5 }];
    const after = resolveTurn(
      state,
      [{ kind: 'skill', actorId: ally.id, skillId: 'skill_refresh_herb', targetId: ally.id }],
      createRng(1)
    );
    expect(after.allies[0].ailments.some((a) => a.type === 'blind')).toBe(false);
  });
});
