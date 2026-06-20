/**
 * 蘇生システム（issue #41）のテスト。
 * revive 効果が:
 * - 戦闘不能の味方 → isDown=false かつ hp=round(maxHp*ratio) になること
 * - 生存者 → 無効（hp・isDown に変化なし）
 * を検証する。resolveTurn 経由で確認する。
 */
import { buildSimBattleState, resolveTurn } from '@/domain/battle';
import { createRng } from '@/domain/rng';
import type { BattleCommand, Combatant } from '@/domain/types';

/** テスト用の最小 Combatant を生成するファクトリ。 */
function makeCombatant(id: string, overrides: Partial<Combatant> = {}): Combatant {
  const base: Combatant = {
    id,
    name: id,
    side: 'ally',
    row: 'front',
    stats: { hp: 100, tp: 50, str: 10, vit: 10, agi: 10, int: 10, mnd: 10, luc: 10 },
    equip: {},
    hp: 100,
    maxHp: 100,
    tp: 50,
    maxTp: 50,
    buffs: [],
    ailments: [],
    states: [],
    unionGauge: 0,
    isDown: false,
  };
  return { ...base, ...overrides };
}

/** テスト用の敵 Combatant（ダミー）。 */
function makeEnemy(id: string): Combatant {
  return {
    id,
    name: id,
    side: 'enemy',
    row: 'front',
    stats: { hp: 999, tp: 0, str: 1, vit: 1, agi: 1, int: 1, mnd: 1, luc: 1 },
    equip: {},
    hp: 999,
    maxHp: 999,
    tp: 0,
    maxTp: 0,
    buffs: [],
    ailments: [],
    unionGauge: 0,
    isDown: false,
    enemyId: 'enemy_slime',
  };
}

describe('revive: 蘇生効果', () => {
  test('戦闘不能の味方に revive 効果を適用すると isDown=false かつ hp=round(maxHp*ratio) になる', () => {
    // 回復役 (actor) と戦闘不能の対象
    const actor = makeCombatant('healer', { hp: 50, tp: 50 });
    const target = makeCombatant('fallen', { hp: 0, isDown: true, maxHp: 200 });
    const enemy = makeEnemy('enemy_0');

    // ratio=0.3 の蘇生スキルをスクラッチで定義
    // BATTLE_SKILLS を使わず直接 BattleSkillDef 相当を渡す代わりに、
    // resolveTurn に渡せる 'skill' コマンドを使う。
    // ただし BATTLE_SKILLS に登録されたスキルのみ使えるため、
    // 実際に登録されている skill_medic_revive_draft（Lv1: ratio=0.3）を使用する。
    // target.id を commandTarget として渡す（allyOne で fallen を指す）。

    actor.skillLevels = { skill_medic_revive_draft: 1 };

    const state = buildSimBattleState([actor, target], [enemy], 1);
    const cmd: BattleCommand = {
      kind: 'skill',
      actorId: actor.id,
      skillId: 'skill_medic_revive_draft',
      targetId: target.id,
    };

    const rng = createRng(42);
    const next = resolveTurn(state, [cmd], rng);

    const revived = next.allies.find((a) => a.id === 'fallen')!;
    expect(revived.isDown).toBe(false);
    // ratio = 0.2 + 0.1 * 1 = 0.3, maxHp = 200 → round(200 * 0.3) = 60
    expect(revived.hp).toBe(Math.round(200 * 0.3));
  });

  test('生存者に revive 効果を使うと HP・isDown に変化がない', () => {
    const actor = makeCombatant('healer', { hp: 100, tp: 50 });
    // target は生存中（isDown=false）
    const target = makeCombatant('alive', { hp: 80, isDown: false, maxHp: 100 });
    const enemy = makeEnemy('enemy_0');

    actor.skillLevels = { skill_medic_revive_draft: 1 };

    const state = buildSimBattleState([actor, target], [enemy], 1);
    const cmd: BattleCommand = {
      kind: 'skill',
      actorId: actor.id,
      skillId: 'skill_medic_revive_draft',
      targetId: target.id,
    };

    const rng = createRng(42);
    const next = resolveTurn(state, [cmd], rng);

    const after = next.allies.find((a) => a.id === 'alive')!;
    // 生存者には無効: isDown はそのまま false のまま（HP は敵攻撃で減る可能性があるが、revive は適用されない）
    expect(after.isDown).toBe(false);
    // target.hp は revive では変化しない（生存者スキップ）。
    // ※ ターン内で敵の通常攻撃を受けると HP が変わるため、「revive 適用前と同じ」だけ検証するのは困難。
    // 代わりに events の heal 対象に 'alive' が含まれないことで無効を確認する。
    const hasReviveHeal = next.events.some(
      (e) =>
        e.kind === 'skill' &&
        (e as import('./battleEvent').SkillEvent).heals.some((h) => h.targetId === 'alive')
    );
    expect(hasReviveHeal).toBe(false);
  });
});
