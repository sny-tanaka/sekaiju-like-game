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
  // 狩人: 部位封じの矢（[03 §6]）。物理ダメージ＋確率で対応部位をバインド。
  skill_leg_snipe: {
    id: 'skill_leg_snipe',
    name: '脚封じの矢',
    tree: 'base',
    tpCost: (lv) => 4 + lv,
    element: 'pierce',
    target: 'enemyOne',
    effects: [
      { kind: 'damage', statBase: 'str', power: (lv) => 1.0 + 0.15 * lv },
      { kind: 'ailment', ailment: 'legBind', chance: (lv) => 0.35 + 0.05 * lv, turns: 3 },
    ],
  },
  skill_arm_snipe: {
    id: 'skill_arm_snipe',
    name: '腕封じの矢',
    tree: 'base',
    tpCost: (lv) => 4 + lv,
    element: 'pierce',
    target: 'enemyOne',
    effects: [
      { kind: 'damage', statBase: 'str', power: (lv) => 1.0 + 0.15 * lv },
      { kind: 'ailment', ailment: 'armBind', chance: (lv) => 0.35 + 0.05 * lv, turns: 3 },
    ],
  },
  skill_head_snipe: {
    id: 'skill_head_snipe',
    name: '頭封じの矢',
    tree: 'base',
    tpCost: (lv) => 4 + lv,
    element: 'pierce',
    target: 'enemyOne',
    effects: [
      { kind: 'damage', statBase: 'str', power: (lv) => 1.0 + 0.15 * lv },
      { kind: 'ailment', ailment: 'headBind', chance: (lv) => 0.35 + 0.05 * lv, turns: 3 },
    ],
  },
  // 召喚スキル（[03 §8]）。対象は self（最前列へ設置）。
  skill_summon_wolf: {
    id: 'skill_summon_wolf',
    name: '狼を召喚',
    tree: 'base',
    tpCost: (lv) => 6 + lv,
    element: 'almighty',
    target: 'self',
    effects: [{ kind: 'summon', summonKind: 'summon_wolf' }],
  },
  skill_summon_bulwark: {
    id: 'skill_summon_bulwark',
    name: '石像を召喚',
    tree: 'base',
    tpCost: (lv) => 6 + lv,
    element: 'almighty',
    target: 'self',
    effects: [{ kind: 'summon', summonKind: 'summon_bulwark' }],
  },
  skill_summon_familiar: {
    id: 'skill_summon_familiar',
    name: '使い魔を召喚',
    tree: 'base',
    tpCost: (lv) => 7 + lv,
    element: 'almighty',
    target: 'self',
    effects: [{ kind: 'summon', summonKind: 'summon_familiar' }],
  },

  // ---- 既存職業の追加スキル（Phase 6-2） ----
  skill_cleave: {
    id: 'skill_cleave',
    name: 'なぎ払い',
    tree: 'master',
    tpCost: (lv) => 5 + lv,
    element: 'slash',
    target: 'enemyAll',
    effects: [{ kind: 'damage', statBase: 'str', power: (lv) => 0.7 + 0.12 * lv }],
  },
  skill_volt_bolt: {
    id: 'skill_volt_bolt',
    name: 'ボルトショック',
    tree: 'master',
    tpCost: (lv) => 4 + lv,
    element: 'volt',
    target: 'enemyOne',
    effects: [{ kind: 'damage', statBase: 'int', power: (lv) => 1.5 + 0.25 * lv }],
  },

  // ---- 薬師（class_medic） ----
  skill_heal: {
    id: 'skill_heal',
    name: 'ヒール',
    tree: 'base',
    tpCost: (lv) => 4 + lv,
    element: 'almighty',
    target: 'allyOne',
    effects: [{ kind: 'heal', amount: (lv) => 40 + 20 * lv }],
  },
  skill_mass_heal: {
    id: 'skill_mass_heal',
    name: 'マスヒール',
    tree: 'base',
    tpCost: (lv) => 8 + lv,
    element: 'almighty',
    target: 'allyAll',
    effects: [{ kind: 'heal', amount: (lv) => 25 + 15 * lv }],
  },
  skill_protect_hymn: {
    id: 'skill_protect_hymn',
    name: '守りの聖歌',
    tree: 'base',
    tpCost: () => 6,
    element: 'almighty',
    target: 'allyAll',
    effects: [
      {
        kind: 'buff',
        stat: 'mdef',
        modifier: (lv) => 1.2 + 0.05 * lv,
        turns: 3,
        stackGroup: 'defBuff',
      },
    ],
  },

  // ---- 剣舞士（class_dancer） ----
  skill_war_dance: {
    id: 'skill_war_dance',
    name: '戦いの舞',
    tree: 'base',
    tpCost: () => 6,
    element: 'almighty',
    target: 'allyAll',
    effects: [
      {
        kind: 'buff',
        stat: 'patk',
        modifier: (lv) => 1.2 + 0.05 * lv,
        turns: 3,
        stackGroup: 'atkBuff',
      },
    ],
  },
  skill_evasion_dance: {
    id: 'skill_evasion_dance',
    name: '回避の舞',
    tree: 'base',
    tpCost: () => 6,
    element: 'almighty',
    target: 'allyAll',
    effects: [
      {
        kind: 'buff',
        stat: 'eva',
        modifier: (lv) => 1.2 + 0.05 * lv,
        turns: 3,
        stackGroup: 'evaBuff',
      },
    ],
  },
  skill_weaken_song: {
    id: 'skill_weaken_song',
    name: '弱体の歌',
    tree: 'base',
    tpCost: (lv) => 6 + lv,
    element: 'almighty',
    target: 'enemyAll',
    effects: [
      {
        kind: 'buff',
        stat: 'patk',
        modifier: (lv) => 0.85 - 0.03 * lv,
        turns: 3,
        stackGroup: 'atkDebuff',
      },
    ],
  },

  // ---- 拳聖（class_monk） ----
  skill_triple_strike: {
    id: 'skill_triple_strike',
    name: '三段突き',
    tree: 'base',
    tpCost: (lv) => 4 + lv,
    element: 'bash',
    target: 'enemyOne',
    effects: [{ kind: 'damage', statBase: 'str', power: (lv) => 0.7 + 0.1 * lv, hits: 3 }],
  },
  skill_focus_ki: {
    id: 'skill_focus_ki',
    name: '練気',
    tree: 'base',
    tpCost: () => 4,
    element: 'almighty',
    target: 'self',
    effects: [
      {
        kind: 'buff',
        stat: 'patk',
        modifier: (lv) => 1.3 + 0.05 * lv,
        turns: 3,
        stackGroup: 'atkBuff',
      },
    ],
  },
  skill_iron_body: {
    id: 'skill_iron_body',
    name: '鉄身',
    tree: 'base',
    tpCost: () => 4,
    element: 'almighty',
    target: 'self',
    effects: [
      {
        kind: 'buff',
        stat: 'pdef',
        modifier: (lv) => 1.4 + 0.05 * lv,
        turns: 3,
        stackGroup: 'defBuff',
      },
    ],
  },

  // ---- 呪術士（class_hexer） ----
  skill_venom_hex: {
    id: 'skill_venom_hex',
    name: '毒の呪',
    tree: 'base',
    tpCost: (lv) => 5 + lv,
    element: 'almighty',
    target: 'enemyOne',
    effects: [
      { kind: 'damage', statBase: 'int', power: (lv) => 0.8 + 0.1 * lv },
      { kind: 'ailment', ailment: 'poison', chance: (lv) => 0.5 + 0.05 * lv, turns: 3 },
    ],
  },
  skill_sleep_hex: {
    id: 'skill_sleep_hex',
    name: '眠りの呪',
    tree: 'base',
    tpCost: (lv) => 7 + lv,
    element: 'almighty',
    target: 'enemyAll',
    effects: [{ kind: 'ailment', ailment: 'sleep', chance: (lv) => 0.35 + 0.03 * lv, turns: 2 }],
  },
  skill_weaken_hex: {
    id: 'skill_weaken_hex',
    name: '魔弱の呪',
    tree: 'base',
    tpCost: (lv) => 5 + lv,
    element: 'almighty',
    target: 'enemyOne',
    effects: [
      {
        kind: 'buff',
        stat: 'matk',
        modifier: (lv) => 0.8 - 0.03 * lv,
        turns: 3,
        stackGroup: 'matkDebuff',
      },
    ],
  },
};

/** 戦闘効果を持つスキルか。 */
export function isBattleSkill(skillId: SkillId): boolean {
  return skillId in BATTLE_SKILLS;
}
