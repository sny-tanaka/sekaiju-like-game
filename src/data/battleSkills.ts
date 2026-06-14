import type { BattleSkillDef, SkillId } from '@/domain/types';

// ============================================================================
// 戦闘スキルの効果定義（[03 §5]）。Phase 0 の SKILLS（名前/説明）に戦闘効果を与える。
// データ駆動: level を引数に倍率/消費/確率を返す。バランス調整＝この値の編集で完結。
// ============================================================================

export const BATTLE_SKILLS: Record<SkillId, BattleSkillDef> = {
  // 戦士
  skill_power_slash: {
    id: 'skill_power_slash',
    name: 'パワースラッシュ',
    tree: 'base',
    tpCost: (lv) => 3 + lv,
    element: 'slash',
    target: 'enemyOne',
    effects: [{ kind: 'damage', statBase: 'str', power: (lv) => 1.4 + 0.2 * lv }],
  },
  skill_guard_stance: {
    id: 'skill_guard_stance',
    name: 'ガードスタンス',
    tree: 'base',
    tpCost: () => 4,
    element: 'almighty',
    target: 'self',
    effects: [
      {
        kind: 'buff',
        stat: 'pdef',
        modifier: (lv) => 1.2 + 0.05 * lv,
        turns: 3,
        stackGroup: 'defBuff',
      },
    ],
  },
  // 守護兵
  skill_shield_bash: {
    id: 'skill_shield_bash',
    name: 'シールドバッシュ',
    tree: 'base',
    tpCost: (lv) => 3 + lv,
    element: 'bash',
    target: 'enemyOne',
    effects: [
      { kind: 'damage', statBase: 'str', power: (lv) => 1.0 + 0.15 * lv },
      { kind: 'ailment', ailment: 'paralysis', chance: (lv) => 0.2 + 0.05 * lv, turns: 2 },
    ],
  },
  skill_provoke: {
    id: 'skill_provoke',
    name: '挑発',
    tree: 'base',
    tpCost: () => 3,
    element: 'almighty',
    target: 'self',
    effects: [{ kind: 'buff', stat: 'pdef', modifier: () => 1.3, turns: 2, stackGroup: 'defBuff' }],
  },
  // 魔導士
  skill_fire_bolt: {
    id: 'skill_fire_bolt',
    name: 'ファイアボルト',
    tree: 'base',
    tpCost: (lv) => 4 + lv,
    element: 'fire',
    target: 'enemyOne',
    effects: [{ kind: 'damage', statBase: 'int', power: (lv) => 1.5 + 0.25 * lv }],
  },
  skill_ice_bolt: {
    id: 'skill_ice_bolt',
    name: 'アイスボルト',
    tree: 'base',
    tpCost: (lv) => 4 + lv,
    element: 'ice',
    target: 'enemyOne',
    effects: [{ kind: 'damage', statBase: 'int', power: (lv) => 1.5 + 0.25 * lv }],
  },
  // 狩人
  skill_aimed_shot: {
    id: 'skill_aimed_shot',
    name: '狙撃',
    tree: 'base',
    tpCost: (lv) => 3 + lv,
    element: 'pierce',
    target: 'enemyOne',
    effects: [{ kind: 'damage', statBase: 'str', power: (lv) => 1.3 + 0.2 * lv }],
  },
  skill_spread_shot: {
    id: 'skill_spread_shot',
    name: '拡散射撃',
    tree: 'base',
    tpCost: (lv) => 5 + lv,
    element: 'pierce',
    target: 'enemyAll',
    effects: [{ kind: 'damage', statBase: 'str', power: (lv) => 0.8 + 0.12 * lv }],
  },
  // 種族ユニオン枠（Phase 4 で本実装。MVP は簡易回復）
  skill_union_rally: {
    id: 'skill_union_rally',
    name: 'ラリー',
    tree: 'race',
    tpCost: () => 0,
    element: 'almighty',
    target: 'allyAll',
    effects: [{ kind: 'heal', amount: (lv) => 10 + 5 * lv }],
  },
};

/** 戦闘効果を持つスキルか。 */
export function isBattleSkill(skillId: SkillId): boolean {
  return skillId in BATTLE_SKILLS;
}
