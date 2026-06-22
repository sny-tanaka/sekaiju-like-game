// ============================================================================
// battleLogFormat.test — fmt(event, state) の出力を検証する
// ============================================================================

import { describe, expect, test } from 'vitest';

import type {
  BuffResult,
  DebuffResult,
  HealResult,
  HitResult,
  NormalAttackEvent,
  SkillEvent,
  DefendEvent,
  FleeEvent,
  ItemUseEvent,
  TickEvent,
  SummonEvent,
} from './battleEvent';
import { fmt } from './battleLogFormat';
import type { BattleState, Combatant } from './types';

// ----------------------------------------------------------------------------
// テスト用ヘルパー
// ----------------------------------------------------------------------------

/** 最小限の Combatant スタブを作る。 */
function mkCombatant(id: string, name: string, side: 'ally' | 'enemy' = 'ally'): Combatant {
  return {
    id,
    name,
    side,
    row: 'front',
    stats: { hp: 50, tp: 20, str: 10, vit: 5, agi: 8, int: 3, mnd: 3, luc: 3 },
    equip: {},
    hp: 50,
    maxHp: 50,
    tp: 20,
    maxTp: 20,
    buffs: [],
    ailments: [],
    unionGauge: 0,
    isDown: false,
  };
}

/** テスト用 BattleState スタブを作る。 */
function mockState(opts: {
  allies?: Combatant[];
  enemies?: Combatant[];
  summons?: Combatant[];
}): BattleState {
  return {
    turn: 1,
    depth: 1,
    allies: opts.allies ?? [],
    enemies: opts.enemies ?? [],
    summons: opts.summons ?? [],
    events: [],
    outcome: 'ongoing',
    firstStrike: 'none',
    drops: [],
    consumedItems: [],
  };
}

// ----------------------------------------------------------------------------
// normal-attack
// ----------------------------------------------------------------------------

describe('fmt: normal-attack', () => {
  test('pre にアクター名 + 「の攻撃！」', () => {
    const state = mockState({
      allies: [mkCombatant('alice', 'アリス')],
      enemies: [mkCombatant('gob', 'ゴブリン', 'enemy')],
    });
    const event: NormalAttackEvent = {
      kind: 'normal-attack',
      actorId: 'alice',
      hits: [],
      reactions: [],
    };
    expect(fmt(event, state).pre).toBe('アリスの攻撃！');
  });

  test('hit: ダメージ行が post に出る', () => {
    const state = mockState({
      allies: [mkCombatant('alice', 'アリス')],
      enemies: [mkCombatant('gob', 'ゴブリン', 'enemy')],
    });
    const event: NormalAttackEvent = {
      kind: 'normal-attack',
      actorId: 'alice',
      hits: [{ targetId: 'gob', result: 'hit', damage: 25, defeated: false }],
      reactions: [],
    };
    const { post } = fmt(event, state);
    expect(post).toContain('ゴブリンに25のダメージ！');
  });

  test('hit + defeated: ダメージ→倒れた の順で post に出る', () => {
    const state = mockState({
      allies: [mkCombatant('alice', 'アリス')],
      enemies: [mkCombatant('gob', 'ゴブリン', 'enemy')],
    });
    const event: NormalAttackEvent = {
      kind: 'normal-attack',
      actorId: 'alice',
      hits: [{ targetId: 'gob', result: 'hit', damage: 30, defeated: true }],
      reactions: [],
    };
    const { post } = fmt(event, state);
    expect(post).toEqual(['ゴブリンに30のダメージ！', 'ゴブリンは倒れた！']);
  });

  test('miss: かわした行が post に出る', () => {
    const state = mockState({
      allies: [mkCombatant('alice', 'アリス')],
      enemies: [mkCombatant('gob', 'ゴブリン', 'enemy')],
    });
    const event: NormalAttackEvent = {
      kind: 'normal-attack',
      actorId: 'alice',
      hits: [{ targetId: 'gob', result: 'miss', damage: 0, defeated: false }],
      reactions: [],
    };
    expect(fmt(event, state).post).toEqual(['ゴブリンは攻撃をかわした！']);
  });

  test('crit: クリティカル行がダメージ行の前に出る', () => {
    const state = mockState({
      allies: [mkCombatant('alice', 'アリス')],
      enemies: [mkCombatant('gob', 'ゴブリン', 'enemy')],
    });
    const event: NormalAttackEvent = {
      kind: 'normal-attack',
      actorId: 'alice',
      hits: [{ targetId: 'gob', result: 'crit', damage: 60, defeated: false }],
      reactions: [],
    };
    const { post } = fmt(event, state);
    expect(post[0]).toBe('クリティカル！');
    expect(post[1]).toBe('ゴブリンに60のダメージ！');
  });

  test('複数ヒット: すべて post に順番通り出る', () => {
    const state = mockState({
      allies: [mkCombatant('alice', 'アリス')],
      enemies: [
        mkCombatant('gob1', 'ゴブリンA', 'enemy'),
        mkCombatant('gob2', 'ゴブリンB', 'enemy'),
      ],
    });
    const event: NormalAttackEvent = {
      kind: 'normal-attack',
      actorId: 'alice',
      hits: [
        { targetId: 'gob1', result: 'hit', damage: 10, defeated: false },
        { targetId: 'gob2', result: 'hit', damage: 15, defeated: true },
      ],
      reactions: [],
    };
    const { post } = fmt(event, state);
    expect(post).toEqual([
      'ゴブリンAに10のダメージ！',
      'ゴブリンBに15のダメージ！',
      'ゴブリンBは倒れた！',
    ]);
  });
});

// ----------------------------------------------------------------------------
// skill
// ----------------------------------------------------------------------------

describe('fmt: skill', () => {
  test('通常スキル: pre に「〜は〜を放った！」', () => {
    const state = mockState({
      allies: [mkCombatant('alice', 'アリス')],
      enemies: [mkCombatant('gob', 'ゴブリン', 'enemy')],
    });
    const event: SkillEvent = {
      kind: 'skill',
      actorId: 'alice',
      skillId: 'skill_power_slash',
      targetIds: ['gob'],
      hits: [],
      heals: [],
      buffs: [],
      debuffs: [],
      reactions: [],
    };
    expect(fmt(event, state).pre).toBe('アリスはパワースラッシュを放った！');
  });

  test('ユニオン技: pre に「ユニオン！」が入る', () => {
    const state = mockState({
      allies: [mkCombatant('alice', 'アリス'), mkCombatant('bob', 'ボブ')],
      enemies: [mkCombatant('gob', 'ゴブリン', 'enemy')],
    });
    const event: SkillEvent = {
      kind: 'skill',
      actorId: 'alice',
      skillId: 'skill_power_slash',
      unionActorIds: ['alice', 'bob'],
      targetIds: ['gob'],
      hits: [],
      heals: [],
      buffs: [],
      debuffs: [],
      reactions: [],
    };
    expect(fmt(event, state).pre).toMatch(/^ユニオン！/);
  });

  test('ヒール: post に回復行が出る', () => {
    const state = mockState({
      allies: [mkCombatant('alice', 'アリス'), mkCombatant('bob', 'ボブ')],
      enemies: [],
    });
    const heals: HealResult[] = [{ targetId: 'bob', amount: 40 }];
    const event: SkillEvent = {
      kind: 'skill',
      actorId: 'alice',
      skillId: 'skill_guard_stance',
      targetIds: ['bob'],
      hits: [],
      heals,
      buffs: [],
      debuffs: [],
      reactions: [],
    };
    expect(fmt(event, state).post).toContain('ボブのHPが40回復！');
  });

  test('バフ: post にバフ付与行が出る', () => {
    const state = mockState({
      allies: [mkCombatant('alice', 'アリス')],
      enemies: [],
    });
    const buffs: BuffResult[] = [{ targetId: 'alice', effect: 'patk', turns: 3 }];
    const event: SkillEvent = {
      kind: 'skill',
      actorId: 'alice',
      skillId: 'skill_guard_stance',
      targetIds: ['alice'],
      hits: [],
      heals: [],
      buffs,
      debuffs: [],
      reactions: [],
    };
    expect(fmt(event, state).post).toContain('アリスに物理攻撃力アップが付与された！');
  });

  test('デバフ: post にデバフ付与行が出る', () => {
    const state = mockState({
      allies: [mkCombatant('alice', 'アリス')],
      enemies: [mkCombatant('gob', 'ゴブリン', 'enemy')],
    });
    const debuffs: DebuffResult[] = [{ targetId: 'gob', effect: 'poison', turns: 3 }];
    const event: SkillEvent = {
      kind: 'skill',
      actorId: 'alice',
      skillId: 'skill_power_slash',
      targetIds: ['gob'],
      hits: [],
      heals: [],
      buffs: [],
      debuffs,
      reactions: [],
    };
    expect(fmt(event, state).post).toContain('ゴブリンは毒になった！');
  });

  test('miss + crit + defeated が post にすべて含まれる', () => {
    const state = mockState({
      allies: [mkCombatant('alice', 'アリス')],
      enemies: [
        mkCombatant('gob1', 'ゴブリンA', 'enemy'),
        mkCombatant('gob2', 'ゴブリンB', 'enemy'),
        mkCombatant('gob3', 'ゴブリンC', 'enemy'),
      ],
    });
    const hits: HitResult[] = [
      { targetId: 'gob1', result: 'miss', damage: 0, defeated: false },
      { targetId: 'gob2', result: 'crit', damage: 80, defeated: true },
      { targetId: 'gob3', result: 'hit', damage: 30, defeated: false },
    ];
    const event: SkillEvent = {
      kind: 'skill',
      actorId: 'alice',
      skillId: 'skill_power_slash',
      targetIds: ['gob1', 'gob2', 'gob3'],
      hits,
      heals: [],
      buffs: [],
      debuffs: [],
      reactions: [],
    };
    const { post } = fmt(event, state);
    expect(post).toContain('ゴブリンAは攻撃をかわした！');
    expect(post).toContain('クリティカル！');
    expect(post).toContain('ゴブリンBに80のダメージ！');
    expect(post).toContain('ゴブリンBは倒れた！');
    expect(post).toContain('ゴブリンCに30のダメージ！');
  });
});

// ----------------------------------------------------------------------------
// defend
// ----------------------------------------------------------------------------

describe('fmt: defend', () => {
  test('pre のみ返す', () => {
    const state = mockState({ allies: [mkCombatant('alice', 'アリス')] });
    const event: DefendEvent = { kind: 'defend', actorId: 'alice' };
    const { pre, post } = fmt(event, state);
    expect(pre).toBe('アリスは構えを取った！');
    expect(post).toEqual([]);
  });
});

// ----------------------------------------------------------------------------
// flee
// ----------------------------------------------------------------------------

describe('fmt: flee', () => {
  test('成功: pre に「うまく逃げ切れた！」', () => {
    const state = mockState({ allies: [mkCombatant('alice', 'アリス')] });
    const event: FleeEvent = { kind: 'flee', actorId: 'alice', success: true };
    expect(fmt(event, state).pre).toBe('うまく逃げ切れた！');
    expect(fmt(event, state).post).toEqual([]);
  });

  test('失敗: pre にアクター名 + 失敗メッセージ', () => {
    const state = mockState({ allies: [mkCombatant('alice', 'アリス')] });
    const event: FleeEvent = { kind: 'flee', actorId: 'alice', success: false };
    expect(fmt(event, state).pre).toBe('アリスは逃げ出そうとしたが失敗した！');
    expect(fmt(event, state).post).toEqual([]);
  });
});

// ----------------------------------------------------------------------------
// item-use
// ----------------------------------------------------------------------------

describe('fmt: item-use', () => {
  test('heal: pre + HP回復行', () => {
    const state = mockState({
      allies: [mkCombatant('alice', 'アリス'), mkCombatant('bob', 'ボブ')],
    });
    const event: ItemUseEvent = {
      kind: 'item-use',
      actorId: 'alice',
      itemId: 'item_potion',
      targetId: 'bob',
      effect: { kind: 'heal', amount: 30 },
    };
    const { pre, post } = fmt(event, state);
    expect(pre).toBe('アリスはきずぐすりを使った！');
    expect(post).toEqual(['ボブのHPが30回復！']);
  });

  test('cure: 解けた状態異常が post に並ぶ', () => {
    const state = mockState({
      allies: [mkCombatant('alice', 'アリス'), mkCombatant('bob', 'ボブ')],
    });
    const event: ItemUseEvent = {
      kind: 'item-use',
      actorId: 'alice',
      itemId: 'item_potion',
      targetId: 'bob',
      effect: { kind: 'cure', cureEffects: ['poison', 'paralysis'] },
    };
    const { post } = fmt(event, state);
    expect(post).toEqual(['ボブの毒が解けた！', 'ボブの麻痺が解けた！']);
  });

  test('tp-restore: post に TP 回復行', () => {
    const state = mockState({
      allies: [mkCombatant('alice', 'アリス')],
    });
    const event: ItemUseEvent = {
      kind: 'item-use',
      actorId: 'alice',
      itemId: 'item_tp_herb',
      targetId: 'alice',
      effect: { kind: 'tp-restore', amount: 10 },
    };
    expect(fmt(event, state).post).toEqual(['アリスのTPが10回復！']);
  });

  test('revive: post に蘇生行', () => {
    const state = mockState({
      allies: [mkCombatant('alice', 'アリス'), mkCombatant('bob', 'ボブ')],
    });
    const event: ItemUseEvent = {
      kind: 'item-use',
      actorId: 'alice',
      itemId: 'item_revive',
      targetId: 'bob',
      effect: { kind: 'revive', hpRestore: 1 },
    };
    expect(fmt(event, state).post).toEqual(['ボブが蘇生した！(HP+1)']);
  });

  test('targetId 未指定: actorId を対象にする', () => {
    const state = mockState({
      allies: [mkCombatant('alice', 'アリス')],
    });
    const event: ItemUseEvent = {
      kind: 'item-use',
      actorId: 'alice',
      itemId: 'item_potion',
      // targetId 未指定
      effect: { kind: 'heal', amount: 30 },
    };
    expect(fmt(event, state).post).toEqual(['アリスのHPが30回復！']);
  });
});

// ----------------------------------------------------------------------------
// tick
// ----------------------------------------------------------------------------

describe('fmt: tick', () => {
  test('poison: pre="" / post に毒ダメージ行', () => {
    const state = mockState({ allies: [mkCombatant('alice', 'アリス')] });
    const event: TickEvent = {
      kind: 'tick',
      targetId: 'alice',
      effectType: 'poison',
      amount: 5,
    };
    const { pre, post } = fmt(event, state);
    expect(pre).toBe('');
    expect(post).toEqual(['アリスは毒のダメージを受けた！(5)']);
  });

  test('regen: post に HP 回復行', () => {
    const state = mockState({ allies: [mkCombatant('alice', 'アリス')] });
    const event: TickEvent = {
      kind: 'tick',
      targetId: 'alice',
      effectType: 'regen',
      amount: 8,
    };
    expect(fmt(event, state).post).toEqual(['アリスのHPが8回復！']);
  });

  test('buff-expire: バフ効果切れ行', () => {
    const state = mockState({ allies: [mkCombatant('alice', 'アリス')] });
    const event: TickEvent = {
      kind: 'tick',
      targetId: 'alice',
      effectType: 'buff-expire',
      effect: 'regen',
    };
    expect(fmt(event, state).post).toEqual(['アリスのHP再生の効果が切れた！']);
  });

  test('debuff-expire: デバフ解除行', () => {
    const state = mockState({ enemies: [mkCombatant('gob', 'ゴブリン', 'enemy')] });
    const event: TickEvent = {
      kind: 'tick',
      targetId: 'gob',
      effectType: 'debuff-expire',
      effect: 'sleep',
    };
    expect(fmt(event, state).post).toEqual(['ゴブリンの睡眠が解けた！']);
  });

  test('poison + defeated: ダメージ行 + 倒れた行の順', () => {
    const state = mockState({ allies: [mkCombatant('alice', 'アリス')] });
    const event: TickEvent = {
      kind: 'tick',
      targetId: 'alice',
      effectType: 'poison',
      amount: 20,
      defeated: true,
    };
    expect(fmt(event, state).post).toEqual([
      'アリスは毒のダメージを受けた！(20)',
      'アリスは倒れた！',
    ]);
  });
});

// ----------------------------------------------------------------------------
// summon-appear / summon-dispel
// ----------------------------------------------------------------------------

describe('fmt: summon', () => {
  test('summon-appear: pre に出現メッセージ', () => {
    const state = mockState({ allies: [mkCombatant('alice', 'アリス')] });
    const event: SummonEvent = {
      kind: 'summon-appear',
      summonId: 's_wolf',
      summonName: 'ウルフ',
    };
    const { pre, post } = fmt(event, state);
    expect(pre).toBe('ウルフが現れた！');
    expect(post).toEqual([]);
  });

  test('summon-dispel: pre に消えたメッセージ', () => {
    const state = mockState({ allies: [mkCombatant('alice', 'アリス')] });
    const event: SummonEvent = {
      kind: 'summon-dispel',
      summonId: 's_wolf',
      summonName: 'ウルフ',
    };
    const { pre, post } = fmt(event, state);
    expect(pre).toBe('ウルフは消えた！');
    expect(post).toEqual([]);
  });

  test('summonName 未指定: デフォルト「召喚体」', () => {
    const state = mockState({ allies: [mkCombatant('alice', 'アリス')] });
    const event: SummonEvent = {
      kind: 'summon-appear',
      summonId: 's_unknown',
    };
    expect(fmt(event, state).pre).toBe('召喚体が現れた！');
  });

  test('summon-dispel: summonName 未指定', () => {
    const state = mockState({ allies: [mkCombatant('alice', 'アリス')] });
    const event: SummonEvent = {
      kind: 'summon-dispel',
      summonId: 's_unknown',
    };
    expect(fmt(event, state).pre).toBe('召喚体は消えた！');
  });
});

// ----------------------------------------------------------------------------
// resolveSkillName: 敵スキル名解決
// ----------------------------------------------------------------------------

describe('fmt: resolveSkillName — 敵スキル名解決', () => {
  test('雑魚スキル ea_double_strike が日本語名「二連撃」で表示される', () => {
    const state = mockState({
      allies: [],
      enemies: [mkCombatant('gob', 'ゴブリン', 'enemy')],
    });
    const event: SkillEvent = {
      kind: 'skill',
      actorId: 'gob',
      skillId: 'ea_double_strike',
      targetIds: [],
      hits: [],
      heals: [],
      buffs: [],
      debuffs: [],
      reactions: [],
    };
    expect(fmt(event, state).pre).toBe('ゴブリンは二連撃を放った！');
  });

  test('ボス専用スキル eb_gk_sig が日本語名「大地割り」で表示される', () => {
    const state = mockState({
      allies: [],
      enemies: [mkCombatant('boss', '門番', 'enemy')],
    });
    const event: SkillEvent = {
      kind: 'skill',
      actorId: 'boss',
      skillId: 'eb_gk_sig',
      targetIds: [],
      hits: [],
      heals: [],
      buffs: [],
      debuffs: [],
      reactions: [],
    };
    expect(fmt(event, state).pre).toBe('門番は大地割りを放った！');
  });

  test('未定義スキル ID はそのまま pre に含まれる（フォールバック維持）', () => {
    const state = mockState({
      allies: [],
      enemies: [mkCombatant('gob', 'ゴブリン', 'enemy')],
    });
    const event: SkillEvent = {
      kind: 'skill',
      actorId: 'gob',
      skillId: 'totally_unknown_skill',
      targetIds: [],
      hits: [],
      heals: [],
      buffs: [],
      debuffs: [],
      reactions: [],
    };
    expect(fmt(event, state).pre).toContain('totally_unknown_skill');
  });
});

// ----------------------------------------------------------------------------
// resolveName: summons からも解決できるか
// ----------------------------------------------------------------------------

describe('fmt: resolveName from summons', () => {
  test('summons に居るキャラクターを名前解決できる', () => {
    const summon = mkCombatant('s_wolf', 'ウルフ');
    const state = mockState({ summons: [summon] });
    const event: TickEvent = {
      kind: 'tick',
      targetId: 's_wolf',
      effectType: 'regen',
      amount: 5,
    };
    expect(fmt(event, state).post).toEqual(['ウルフのHPが5回復！']);
  });

  test('未知の id は「?」になる', () => {
    const state = mockState({ allies: [] });
    const event: TickEvent = {
      kind: 'tick',
      targetId: 'unknown_id',
      effectType: 'regen',
      amount: 3,
    };
    expect(fmt(event, state).post).toEqual(['?のHPが3回復！']);
  });
});
