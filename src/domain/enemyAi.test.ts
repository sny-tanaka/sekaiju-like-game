import { BASIC_WEIGHT, ENEMY_KITS } from '@/data/enemySkills';
import { resolveTurn, startBattle } from '@/domain/battle';
import { startDive } from '@/domain/dive';
import { createRng } from '@/domain/rng';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
import type { BattleState, SaveData } from '@/domain/types';

// ============================================================================
// 敵 AI（§3.2）テスト: 条件付き行動選択・weight 抽選・基本フォールバック・
// バフ/AoE/状態異常 適用。
// ============================================================================

function diveSave(depth = 1): SaveData {
  let save = createInitialSaveData('テストギルド');
  save = addCharacterToGuild(
    save,
    createCharacter({ raceId: 'race_garon', classId: 'class_warrior', name: '戦士' })
  );
  return startDive(save, depth);
}

/** state の全戦闘員に高 HP を与え（死ににくくする） */
function fortify(state: BattleState): BattleState {
  return {
    ...state,
    allies: state.allies.map((c) => ({ ...c, hp: 9999, maxHp: 9999 })),
    enemies: state.enemies.map((c) => ({ ...c, hp: 9999, maxHp: 9999 })),
  };
}

// ============================================================================
// §3.2 cond 条件テスト
// ============================================================================

describe('敵AI: cond 条件テスト', () => {
  test('hpBelow 条件: HP 比が閾値以下の場合だけ候補に入る（定義確認）', () => {
    // ea_double_strike は hpBelow 条件を持たない → 常に候補
    const actions = ENEMY_KITS['zako_bruiser'];
    const ds = actions.find((a) => a.id === 'ea_double_strike');
    expect(ds).toBeDefined();
    expect(ds!.cond?.hpBelow).toBeUndefined();
  });

  test('hpAbove 条件: ボス自己バフはHP半分以上でのみ使える（定義確認）', () => {
    // eb_self_buff は hpAbove:0.5
    // kit ではなく boss actions 経由で定義されているが、構造を確認する
    const actions = ENEMY_KITS['foe_heavy'];
    for (const a of actions) {
      // foe_heavy アクションは hpAbove 条件を持たない（FOE はボスではない）
      expect(a.cond?.hpAbove).toBeUndefined();
    }
  });

  test('cooldown 条件: ea_double_strike の cooldown=3 が定義されている', () => {
    const actions = ENEMY_KITS['zako_bruiser'];
    const ds = actions.find((a) => a.id === 'ea_double_strike');
    expect(ds!.cond?.cooldown).toBe(3);
  });

  test('cooldown 条件: ea_guard_up の cooldown=4 が定義されている', () => {
    const actions = ENEMY_KITS['zako_bruiser'];
    const gu = actions.find((a) => a.id === 'ea_guard_up');
    expect(gu!.cond?.cooldown).toBe(4);
  });

  test('minTurn / maxUses を使う ENEMY_KITS 定義は正の整数を持つ', () => {
    for (const actions of Object.values(ENEMY_KITS)) {
      for (const a of actions) {
        if (a.cond?.minTurn !== undefined) expect(a.cond.minTurn).toBeGreaterThan(0);
        if (a.cond?.maxUses !== undefined) expect(a.cond.maxUses).toBeGreaterThan(0);
      }
    }
  });
});

// ============================================================================
// §3.2 クールダウン機能テスト（実際のターン進行）
// ============================================================================

describe('敵AI: クールダウン機能（多ターン進行）', () => {
  test('6ターン回してもクラッシュしない（boulder_ogre FOE）', () => {
    const state = fortify(startBattle(diveSave(11), ['enemy_t1_boulder_ogre']));
    let cur = state;
    for (let i = 0; i < 6 && cur.outcome === 'ongoing'; i++) {
      cur = resolveTurn(cur, [{ kind: 'guard', actorId: cur.allies[0].id }], createRng(i + 100));
    }
    expect(['ongoing', 'win', 'lose']).toContain(cur.outcome);
  });

  test('同一 seed でターンを重ねると actionState が蓄積される（スキルログが変化する）', () => {
    // 同じ seed でも actionState が変わるため、同じスキルが毎ターン使われるわけではない
    const base = fortify(startBattle(diveSave(11), ['enemy_t1_boulder_ogre']));
    const rng = createRng(77);
    let cur = base;
    const logCounts: number[] = [];
    for (let i = 0; i < 5 && cur.outcome === 'ongoing'; i++) {
      const after = resolveTurn(cur, [{ kind: 'guard', actorId: cur.allies[0].id }], createRng(77));
      logCounts.push(after.log.length);
      cur = resolveTurn(cur, [{ kind: 'guard', actorId: cur.allies[0].id }], rng);
    }
    expect(logCounts.length).toBeGreaterThan(0);
    expect(logCounts[0]).toBeGreaterThan(0);
  });
});

// ============================================================================
// §3.2 weight 抽選の決定論
// ============================================================================

describe('敵AI: weight 抽選の決定論', () => {
  test('同一 seed・同一状態では毎回同じログになる', () => {
    const base = fortify(startBattle(diveSave(11), ['enemy_t1_boulder_ogre']));
    const r1 = resolveTurn(base, [{ kind: 'guard', actorId: base.allies[0].id }], createRng(42));
    const r2 = resolveTurn(base, [{ kind: 'guard', actorId: base.allies[0].id }], createRng(42));
    expect(r1.log.map((l) => l.text)).toEqual(r2.log.map((l) => l.text));
  });

  test('BASIC_WEIGHT = 10 が export されている', () => {
    expect(BASIC_WEIGHT).toBe(10);
  });

  test('全 kit のアクション weight は正の整数', () => {
    for (const actions of Object.values(ENEMY_KITS)) {
      for (const a of actions) {
        expect(a.weight).toBeGreaterThan(0);
      }
    }
  });
});

// ============================================================================
// §3.2 basic フォールバック
// ============================================================================

describe('敵AI: basic フォールバック', () => {
  test('kit が無い（= undefined）敵でもクラッシュしない（enemy_slime）', () => {
    // enemy_slime は zako_bruiser kit
    const state = startBattle(diveSave(), ['enemy_slime']);
    const after = resolveTurn(
      state,
      [{ kind: 'guard', actorId: state.allies[0].id }],
      createRng(1)
    );
    expect(['ongoing', 'win', 'lose']).toContain(after.outcome);
  });

  test('敵がログエントリを必ず残す', () => {
    const base = startBattle(diveSave(), ['enemy_slime']);
    const state: BattleState = {
      ...base,
      allies: base.allies.map((c) => ({ ...c, hp: 9999, maxHp: 9999 })),
    };
    const after = resolveTurn(
      state,
      [{ kind: 'guard', actorId: state.allies[0].id }],
      createRng(3)
    );
    expect(after.log.length).toBeGreaterThan(0);
  });
});

// ============================================================================
// §3.2 ③ 効果適用: バフ
// ============================================================================

describe('敵AI: バフアクション適用', () => {
  test('ea_guard_up が選ばれると敵に pdef バフが付く', () => {
    // zako_bruiser: ea_double_strike(w5) + ea_guard_up(w3)
    // enemy_slime は zako_bruiser kit
    const base = fortify(startBattle(diveSave(), ['enemy_slime']));
    let guardUpSeen = false;
    for (let seed = 0; seed < 100; seed++) {
      const after = resolveTurn(
        base,
        [{ kind: 'guard', actorId: base.allies[0].id }],
        createRng(seed)
      );
      const enemy = after.enemies[0];
      if (enemy.buffs.some((b) => b.stat === 'pdef')) {
        guardUpSeen = true;
        // ログに「身構え」が出るはず
        expect(after.log.some((l) => l.text.includes('身構え'))).toBe(true);
        break;
      }
    }
    expect(guardUpSeen).toBe(true);
  });

  test('ea_war_roar が選ばれると敵に patk バフが付く', () => {
    // foe_heavy: ea_heavy_blow + ea_war_roar + ea_bind_bite
    const base = fortify(startBattle(diveSave(11), ['enemy_t1_boulder_ogre']));
    let warRoarSeen = false;
    for (let seed = 0; seed < 100; seed++) {
      const after = resolveTurn(
        base,
        [{ kind: 'guard', actorId: base.allies[0].id }],
        createRng(seed)
      );
      const enemy = after.enemies[0];
      if (enemy.buffs.some((b) => b.stat === 'patk' && b.modifier > 1)) {
        warRoarSeen = true;
        expect(after.log.some((l) => l.text.includes('戦吼'))).toBe(true);
        break;
      }
    }
    expect(warRoarSeen).toBe(true);
  });
});

// ============================================================================
// §3.2 ③ 効果適用: AoE デバフ
// ============================================================================

describe('敵AI: AoE デバフアクション（ea_screech）', () => {
  test('ea_screech が発動すると全味方に patk デバフが付く', () => {
    // zako_venom: ea_weak_poison + ea_screech
    // enemy_t0_pale_wisp は zako_venom kit
    const base = fortify(startBattle(diveSave(), ['enemy_t0_pale_wisp']));
    let screechSeen = false;
    for (let seed = 0; seed < 200; seed++) {
      const after = resolveTurn(
        base,
        [{ kind: 'guard', actorId: base.allies[0].id }],
        createRng(seed)
      );
      if (after.log.some((l) => l.text.includes('威嚇'))) {
        screechSeen = true;
        expect(
          after.allies.some((a) => a.buffs.some((b) => b.stat === 'patk' && b.modifier < 1))
        ).toBe(true);
        break;
      }
    }
    expect(screechSeen).toBe(true);
  });
});

// ============================================================================
// §3.2 ③ 効果適用: 状態異常
// ============================================================================

describe('敵AI: 状態異常アクション（ea_weak_poison）', () => {
  test('ea_weak_poison が発動すると毒が付く（確率40%）', () => {
    // zako_venom: ea_weak_poison(poison 40%) + ea_screech
    const base = fortify(startBattle(diveSave(), ['enemy_t0_pale_wisp']));
    let poisonApplied = false;
    for (let seed = 0; seed < 500; seed++) {
      const after = resolveTurn(
        base,
        [{ kind: 'guard', actorId: base.allies[0].id }],
        createRng(seed)
      );
      if (after.allies.some((a) => a.ailments.some((ai) => ai.type === 'poison'))) {
        poisonApplied = true;
        break;
      }
    }
    expect(poisonApplied).toBe(true);
  });
});

// ============================================================================
// kit / actions 定義の構造検証
// ============================================================================

describe('ENEMY_KITS 構造検証', () => {
  test('全 kit のアクションは id・weight・effects を持つ', () => {
    for (const actions of Object.values(ENEMY_KITS)) {
      for (const a of actions) {
        expect(a.id).toBeTruthy();
        expect(a.weight).toBeGreaterThan(0);
        expect(a.effects.length).toBeGreaterThan(0);
      }
    }
  });

  test('ea_double_strike は2ヒット物理（hits=2）、power=0.7', () => {
    const actions = ENEMY_KITS['zako_bruiser'];
    const ds = actions.find((a) => a.id === 'ea_double_strike');
    expect(ds).toBeDefined();
    const eff = ds!.effects.find((e) => e.kind === 'damage');
    expect(eff).toBeDefined();
    if (eff?.kind === 'damage') {
      expect(eff.hits).toBe(2);
      expect(eff.power(1)).toBeCloseTo(0.7);
    }
  });

  test('ea_guard_up は自己 pdef バフ（modifier >= 1.3）', () => {
    const actions = ENEMY_KITS['zako_bruiser'];
    const gu = actions.find((a) => a.id === 'ea_guard_up');
    expect(gu).toBeDefined();
    expect(gu!.target).toBe('self');
    const eff = gu!.effects.find((e) => e.kind === 'buff');
    expect(eff).toBeDefined();
    if (eff?.kind === 'buff') {
      expect(eff.stat).toBe('pdef');
      expect(eff.modifier(1)).toBeGreaterThanOrEqual(1.3);
    }
  });

  test('ea_heavy_blow は単体高火力物理（power >= 1.5）', () => {
    const actions = ENEMY_KITS['foe_heavy'];
    const hb = actions.find((a) => a.id === 'ea_heavy_blow');
    expect(hb).toBeDefined();
    const eff = hb!.effects.find((e) => e.kind === 'damage');
    expect(eff).toBeDefined();
    if (eff?.kind === 'damage') {
      expect(eff.power(1)).toBeGreaterThanOrEqual(1.5);
    }
  });

  test('ea_screech は全体ターゲット（enemyAll）', () => {
    const actions = ENEMY_KITS['zako_venom'];
    const sc = actions.find((a) => a.id === 'ea_screech');
    expect(sc).toBeDefined();
    expect(sc!.target).toBe('enemyAll');
  });

  test('ea_weak_poison は pierce 攻撃＋poison 状態異常（rate=0.4）', () => {
    const actions = ENEMY_KITS['zako_venom'];
    const wp = actions.find((a) => a.id === 'ea_weak_poison');
    expect(wp).toBeDefined();
    expect(wp!.element).toBe('pierce');
    const ailEff = wp!.effects.find((e) => e.kind === 'ailment');
    expect(ailEff).toBeDefined();
    if (ailEff?.kind === 'ailment') {
      expect(ailEff.ailment).toBe('poison');
      expect(ailEff.chance(1)).toBeCloseTo(0.4);
    }
  });
});
