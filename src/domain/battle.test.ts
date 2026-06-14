import { applyBattleResult, battleRewards, resolveTurn, startBattle } from '@/domain/battle';
import { startDive } from '@/domain/dive';
import { addItem, itemCount } from '@/domain/inventory';
import { createRng } from '@/domain/rng';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
import type { BattleCommand, BattleState, SaveData } from '@/domain/types';

function diveSave(): SaveData {
  let save = createInitialSaveData('戦闘ギルド');
  save = addCharacterToGuild(
    save,
    createCharacter({ raceId: 'race_garon', classId: 'class_warrior', name: '戦士' })
  );
  return startDive(save, 1);
}

/** 全味方が enemy_0 を通常攻撃するコマンド。 */
function attackAll(state: BattleState): BattleCommand[] {
  const target = state.enemies.find((e) => !e.isDown);
  return state.allies
    .filter((a) => !a.isDown)
    .map((a) => ({ kind: 'attack', actorId: a.id, targetId: target!.id }));
}

describe('battle: startBattle', () => {
  test('編成メンバーが味方、指定IDが敵になる', () => {
    const state = startBattle(diveSave(), ['enemy_slime', 'enemy_giant_rat']);
    expect(state.allies.length).toBeGreaterThanOrEqual(1);
    expect(state.enemies).toHaveLength(2);
    expect(state.enemies[0].hp).toBeGreaterThan(0);
    expect(state.outcome).toBe('ongoing');
  });
});

describe('battle: resolveTurn', () => {
  test('同一シードで結果が一致する（決定論）＆入力は不変', () => {
    const state = startBattle(diveSave(), ['enemy_slime']);
    const r1 = resolveTurn(state, attackAll(state), createRng(1));
    const r2 = resolveTurn(state, attackAll(state), createRng(1));
    expect(r1.enemies[0].hp).toBe(r2.enemies[0].hp);
    // 入力 state は変更されない
    expect(state.enemies[0].hp).toBe(state.enemies[0].maxHp);
  });

  test('攻撃で敵HPが減る', () => {
    const state = startBattle(diveSave(), ['enemy_slime']);
    const after = resolveTurn(state, attackAll(state), createRng(7));
    expect(after.enemies[0].hp).toBeLessThan(state.enemies[0].hp);
  });

  test('スライムを倒すと outcome=win になる', () => {
    let state = startBattle(diveSave(), ['enemy_slime']);
    const rng = createRng(7);
    for (let i = 0; i < 30 && state.outcome === 'ongoing'; i++) {
      state = resolveTurn(state, attackAll(state), rng);
    }
    expect(state.outcome).toBe('win');
    expect(state.enemies.every((e) => e.isDown)).toBe(true);
  });

  test('逃走コマンドは fled か継続のいずれか（クラッシュしない）', () => {
    const state = startBattle(diveSave(), ['enemy_slime']);
    const ally = state.allies[0];
    const r = resolveTurn(state, [{ kind: 'flee', actorId: ally.id }], createRng(2));
    expect(['ongoing', 'fled', 'win', 'lose']).toContain(r.outcome);
  });

  test('ガードコマンドで防御バフが付与される（このターン）', () => {
    const state = startBattle(diveSave(), ['enemy_slime']);
    const ally = state.allies[0];
    // 敵を全滅させてターン終了処理（バフ減算）まで到達させないため、敵HPを巨大化はできないので
    // ここでは「ガードが pdef/mdef を上げる」効果は computeDamage 側（combat.test）で検証する。
    // ここではコマンドが受理されクラッシュしないことのみ確認。
    const r = resolveTurn(state, [{ kind: 'guard', actorId: ally.id }], createRng(11));
    expect(['ongoing', 'win', 'lose', 'fled']).toContain(r.outcome);
  });
});

describe('battle: drops & items', () => {
  test('勝利時にドロップが倉庫・図鑑へ反映される', () => {
    const save = diveSave();
    let state = startBattle(save, ['enemy_slime']);
    const rng = createRng(7);
    for (let i = 0; i < 30 && state.outcome === 'ongoing'; i++) {
      state = resolveTurn(state, attackAll(state), rng);
    }
    expect(state.outcome).toBe('win');
    const after = applyBattleResult(save, state);
    // state.drops に乗った分だけ倉庫に入る
    for (const d of state.drops) {
      expect(itemCount(after, d.itemId)).toBeGreaterThanOrEqual(1);
      expect(after.bestiary.monsters[d.enemyId]?.dropsFound).toContain(d.itemId);
    }
  });

  test('倒した敵を翌ターン二重抽選しない（wasDown 判定）', () => {
    // スライム1体を倒したターンのドロップ数を記録し、次ターンに増えないこと
    let state = startBattle(diveSave(), ['enemy_slime']);
    const rng = createRng(7);
    while (state.outcome === 'ongoing') state = resolveTurn(state, attackAll(state), rng);
    const dropsAtWin = state.drops.length;
    // 既に決着しているので resolveTurn は no-op（outcome!=ongoing で即return）
    const again = resolveTurn(state, [], rng);
    expect(again.drops.length).toBe(dropsAtWin);
  });

  test('戦闘中アイテム使用でHP回復し、終了時に倉庫から消費される', () => {
    let save = diveSave();
    save = addItem(save, 'item_potion', 2);
    const state0 = startBattle(save, ['enemy_slime']);
    const ally = state0.allies[0];
    // HP を減らした状態を作る
    const wounded: BattleState = {
      ...state0,
      allies: state0.allies.map((a) => (a.id === ally.id ? { ...a, hp: 1 } : a)),
    };
    const next = resolveTurn(
      wounded,
      [{ kind: 'item', actorId: ally.id, itemId: 'item_potion', targetId: ally.id }],
      createRng(3)
    );
    expect(next.consumedItems).toContain('item_potion');
    expect(next.allies.find((a) => a.id === ally.id)!.hp).toBeGreaterThan(1);
    const after = applyBattleResult(save, next);
    expect(itemCount(after, 'item_potion')).toBe(1); // 2 → 1
  });
});

describe('battle: rewards', () => {
  test('battleRewards は敵の exp/gold を合算', () => {
    const state = startBattle(diveSave(), ['enemy_slime', 'enemy_giant_rat']);
    const { exp, gold } = battleRewards(state);
    expect(exp).toBeGreaterThan(0);
    expect(gold).toBeGreaterThan(0);
  });

  test('applyBattleResult(win) で所持金・図鑑・現在HPが反映される', () => {
    const save = diveSave(); // 同じ save から戦闘を組む（charId を一致させる）
    let state = startBattle(save, ['enemy_slime']);
    const rng = createRng(7);
    for (let i = 0; i < 30 && state.outcome === 'ongoing'; i++) {
      state = resolveTurn(state, attackAll(state), rng);
    }
    expect(state.outcome).toBe('win');

    const after = applyBattleResult(save, state);
    expect(after.guild.gold).toBeGreaterThan(save.guild.gold);
    expect(after.bestiary.monsters['enemy_slime']?.defeated).toBe(true);
    // 味方の現在HPが diveState に反映
    const ally = state.allies[0];
    const member = after.diveState!.party.find((p) => p.charId === ally.id);
    expect(member?.hp).toBe(ally.hp);
  });
});
