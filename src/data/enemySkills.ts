import type { EnemyActionDef } from '@/domain/types';

// ============================================================================
// 敵スキルアクション・ライブラリ＆キット（§4）。
// 共有アクションを定義し、アーキタイプ kit に束ねる。
// 各敵は kit を1つ持つ（ボスは actions 直書き）。
// 威力(power)は通常攻撃=1.0 基準の倍率。statBase は物理='str' / 魔法='int'。
// ============================================================================

/** 暗黙の通常攻撃の重み（全敵共通。§4）。 */
export const BASIC_WEIGHT = 10;

// ---- 雑魚向け（軽量・危険技なし） ----

/** 二連撃: 物理2ヒット×0.7（power 合計1.4相当） */
export const ea_double_strike: EnemyActionDef = {
  id: 'ea_double_strike',
  name: '二連撃',
  element: 'bash',
  target: 'enemyOne',
  effects: [{ kind: 'damage', statBase: 'str', power: () => 0.7, hits: 2 }],
  weight: 5,
  cond: { cooldown: 3 },
};

/** 身構え: 自身の物理防御を1.3倍・2ターン */
export const ea_guard_up: EnemyActionDef = {
  id: 'ea_guard_up',
  name: '身構え',
  element: 'almighty',
  target: 'self',
  effects: [{ kind: 'buff', stat: 'pdef', modifier: () => 1.3, turns: 2, stackGroup: 'defBuff' }],
  weight: 3,
  cond: { cooldown: 4 },
};

/** 毒牙: 物理攻撃0.8＋毒付与40% */
export const ea_weak_poison: EnemyActionDef = {
  id: 'ea_weak_poison',
  name: '毒牙',
  element: 'pierce',
  target: 'enemyOne',
  effects: [
    { kind: 'damage', statBase: 'str', power: () => 0.8 },
    { kind: 'ailment', ailment: 'poison', chance: () => 0.4, turns: 3 },
  ],
  weight: 4,
  cond: { cooldown: 3 },
};

/** 威嚇: 全体物理攻撃力0.85デバフ・2ターン */
export const ea_screech: EnemyActionDef = {
  id: 'ea_screech',
  name: '威嚇',
  element: 'almighty',
  target: 'enemyAll',
  effects: [
    { kind: 'buff', stat: 'patk', modifier: () => 0.85, turns: 2, stackGroup: 'atkDebuff' },
  ],
  weight: 3,
  cond: { cooldown: 4 },
};

// ---- FOE 向け（中量・強技1＋自己バフ、激昂なし） ----

/** 強打: 強力な単体物理×1.6 */
export const ea_heavy_blow: EnemyActionDef = {
  id: 'ea_heavy_blow',
  name: '強打',
  element: 'bash',
  target: 'enemyOne',
  effects: [{ kind: 'damage', statBase: 'str', power: () => 1.6 }],
  weight: 5,
  cond: { cooldown: 3 },
};

/** 薙ぎ払い: 全体物理×0.9 */
export const ea_sweep: EnemyActionDef = {
  id: 'ea_sweep',
  name: '薙ぎ払い',
  element: 'bash',
  target: 'enemyAll',
  effects: [{ kind: 'damage', statBase: 'str', power: () => 0.9 }],
  weight: 4,
  cond: { cooldown: 4 },
};

/** 戦吼: 自身物理攻撃1.3倍・3ターン */
export const ea_war_roar: EnemyActionDef = {
  id: 'ea_war_roar',
  name: '戦吼',
  element: 'almighty',
  target: 'self',
  effects: [{ kind: 'buff', stat: 'patk', modifier: () => 1.3, turns: 3, stackGroup: 'atkBuff' }],
  weight: 3,
  cond: { cooldown: 5 },
};

/** 噛み砕き: 物理×1.0＋腕封じ40% */
export const ea_bind_bite: EnemyActionDef = {
  id: 'ea_bind_bite',
  name: '噛み砕き',
  element: 'bash',
  target: 'enemyOne',
  effects: [
    { kind: 'damage', statBase: 'str', power: () => 1.0 },
    { kind: 'ailment', ailment: 'armBind', chance: () => 0.4, turns: 2 },
  ],
  weight: 3,
  cond: { cooldown: 4 },
};

// ---- ボス向け（強技・全体バフ・激昂） ----
// 各ボスの専用アクションは enemies.ts の actions 直書きで定義する。
// ここではボスアクションのファクトリを提供（属性/名前を引数化）。

/** ボス専用大技ファクトリ: 単体物理×2.2 */
export function eb_signature(
  id: string,
  name: string,
  element: EnemyActionDef['element']
): EnemyActionDef {
  return {
    id,
    name,
    element,
    target: 'enemyOne',
    effects: [{ kind: 'damage', statBase: 'str', power: () => 2.2 }],
    weight: 6,
    cond: { cooldown: 4 },
  };
}

/** ボス全体攻撃ファクトリ: 全体物理×1.0 */
export function eb_aoe(
  id: string,
  name: string,
  element: EnemyActionDef['element']
): EnemyActionDef {
  return {
    id,
    name,
    element,
    target: 'enemyAll',
    effects: [{ kind: 'damage', statBase: 'str', power: () => 1.0 }],
    weight: 7,
    cond: { cooldown: 2 },
  };
}

/** ボス自己バフ（HP50%以上）: patk×1.35・3ターン */
export function eb_self_buff(id: string): EnemyActionDef {
  return {
    id,
    name: '力を溜める',
    element: 'almighty',
    target: 'self',
    effects: [
      { kind: 'buff', stat: 'patk', modifier: () => 1.35, turns: 3, stackGroup: 'atkBuff' },
    ],
    weight: 4,
    cond: { cooldown: 5, hpAbove: 0.5 },
  };
}

/** ボス防御バフ: pdef×1.4・3ターン */
export function eb_def_buff(id: string): EnemyActionDef {
  return {
    id,
    name: '守りを固める',
    element: 'almighty',
    target: 'self',
    effects: [{ kind: 'buff', stat: 'pdef', modifier: () => 1.4, turns: 3, stackGroup: 'defBuff' }],
    weight: 3,
    cond: { cooldown: 6 },
  };
}

/** 激昂ファクトリ（HP65%以下）: 全体×1.4 */
export function eb_enrage_aoe(
  id: string,
  name: string,
  element: EnemyActionDef['element']
): EnemyActionDef {
  return {
    id,
    name,
    element,
    target: 'enemyAll',
    effects: [{ kind: 'damage', statBase: 'str', power: () => 1.4 }],
    weight: 8,
    cond: { hpBelow: 0.65, cooldown: 3 },
  };
}

/** 状態異常AoEファクトリ（HP60%以下） */
export function eb_status_aoe(
  id: string,
  name: string,
  ailment: 'poison' | 'paralysis' | 'blind'
): EnemyActionDef {
  return {
    id,
    name,
    element: 'almighty',
    target: 'enemyAll',
    effects: [{ kind: 'ailment', ailment, chance: () => 0.4, turns: 3 }],
    weight: 4,
    cond: { hpBelow: 0.6, cooldown: 5 },
  };
}

// ============================================================================
// Kit 定義（§4.2）
// ============================================================================

export const ENEMY_KITS: Record<string, EnemyActionDef[]> = {
  /** 物理寄り雑魚（獣・ゴーレム系）: 二連撃＋身構え */
  zako_bruiser: [ea_double_strike, ea_guard_up],
  /** 蟲・毒・不死系雑魚: 毒牙＋威嚇 */
  zako_venom: [ea_weak_poison, ea_screech],
  /** 鳥・結晶・霊・タケ等の非接近テーマ: 威嚇＋身構え */
  zako_caster: [ea_screech, ea_guard_up],
  /** 物理 FOE（重量級）: 強打＋戦吼＋噛み砕き */
  foe_heavy: [ea_heavy_blow, ea_war_roar, ea_bind_bite],
  /** 機動 FOE（AGI 最大系）: 強打＋薙ぎ払い */
  foe_striker: [ea_heavy_blow, ea_sweep],
};
