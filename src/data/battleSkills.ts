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
    // 物理防御を高めつつ、敵の攻撃を自身へ引きつける（挑発＝decoy。[03 §6.5]）。
    effects: [
      { kind: 'buff', stat: 'pdef', modifier: () => 1.3, turns: 2, stackGroup: 'defBuff' },
      { kind: 'decoy', weight: (lv) => 2 + lv, turns: 2 },
    ],
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

  // ============================================================================
  // Phase 6-2b: スキル類型のエンジン拡張（連携追撃 / 反撃 / 障壁 / 治療など）
  // ============================================================================

  // ---- 戦士（連携・反攻） ----
  skill_chain_slash: {
    id: 'skill_chain_slash',
    name: '連刃の構え',
    tree: 'master',
    tpCost: () => 5,
    element: 'slash', // この属性のダメージに反応して追撃する
    target: 'self',
    effects: [{ kind: 'chase', statBase: 'str', power: (lv) => 0.6 + 0.1 * lv, turns: 3 }],
  },
  skill_riposte: {
    id: 'skill_riposte',
    name: '反攻の構え',
    tree: 'master',
    tpCost: () => 5,
    element: 'almighty',
    target: 'self',
    effects: [
      {
        kind: 'counter',
        chance: (lv) => 0.4 + 0.05 * lv,
        power: (lv) => 1.0 + 0.1 * lv,
        statBase: 'str',
        turns: 3,
      },
    ],
  },

  // ---- 守護兵（守りの障壁・反撃） ----
  skill_line_guard: {
    id: 'skill_line_guard',
    name: 'ラインガード',
    tree: 'master',
    tpCost: (lv) => 6 + lv,
    element: 'almighty',
    target: 'allyAll',
    effects: [{ kind: 'barrier', absorb: (lv) => 30 + 15 * lv, turns: 2 }],
  },
  skill_counter_guard: {
    id: 'skill_counter_guard',
    name: 'カウンターガード',
    tree: 'master',
    tpCost: () => 5,
    element: 'almighty',
    target: 'self',
    effects: [
      {
        kind: 'counter',
        chance: (lv) => 0.5 + 0.04 * lv,
        power: (lv) => 1.1 + 0.1 * lv,
        statBase: 'str',
        turns: 3,
      },
    ],
  },

  // ---- 魔導士（属性殲滅） ----
  skill_fire_storm: {
    id: 'skill_fire_storm',
    name: 'ファイアストーム',
    tree: 'master',
    tpCost: (lv) => 6 + lv,
    element: 'fire',
    target: 'enemyAll',
    effects: [{ kind: 'damage', statBase: 'int', power: (lv) => 0.9 + 0.15 * lv }],
  },

  // ---- 狩人（救護） ----
  skill_first_aid: {
    id: 'skill_first_aid',
    name: '救護指示',
    tree: 'master',
    tpCost: (lv) => 4 + lv,
    element: 'almighty',
    target: 'allyOne',
    effects: [{ kind: 'heal', amount: (lv) => 30 + 15 * lv }],
  },

  // ---- 薬師（治療・スモーク） ----
  skill_refresh_herb: {
    id: 'skill_refresh_herb',
    name: 'リフレシュハーブ',
    tree: 'master',
    tpCost: (lv) => 5 + lv,
    element: 'almighty',
    target: 'allyAll',
    effects: [{ kind: 'cleanse' }],
  },
  skill_poison_smoke: {
    id: 'skill_poison_smoke',
    name: 'ポイズンスモーク',
    tree: 'master',
    tpCost: (lv) => 5 + lv,
    element: 'almighty',
    target: 'enemyAll',
    effects: [{ kind: 'ailment', ailment: 'poison', chance: (lv) => 0.4 + 0.04 * lv, turns: 3 }],
  },

  // ---- 剣舞士（守りの舞・癒しの歌） ----
  skill_guard_dance: {
    id: 'skill_guard_dance',
    name: '守りの舞',
    tree: 'master',
    tpCost: () => 6,
    element: 'almighty',
    target: 'allyAll',
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
  skill_healing_song: {
    id: 'skill_healing_song',
    name: '癒しの歌',
    tree: 'master',
    tpCost: (lv) => 6 + lv,
    element: 'almighty',
    target: 'allyAll',
    effects: [{ kind: 'heal', amount: (lv) => 18 + 10 * lv }],
  },

  // ---- 拳聖（封じ拳・反撃） ----
  skill_arm_break: {
    id: 'skill_arm_break',
    name: 'アームブレイク',
    tree: 'master',
    tpCost: (lv) => 4 + lv,
    element: 'bash',
    target: 'enemyOne',
    effects: [
      { kind: 'damage', statBase: 'str', power: (lv) => 1.0 + 0.15 * lv },
      { kind: 'ailment', ailment: 'armBind', chance: (lv) => 0.4 + 0.05 * lv, turns: 3 },
    ],
  },
  skill_cross_counter: {
    id: 'skill_cross_counter',
    name: 'クロスカウンター',
    tree: 'master',
    tpCost: () => 5,
    element: 'almighty',
    target: 'self',
    effects: [
      {
        kind: 'counter',
        chance: (lv) => 0.5 + 0.04 * lv,
        power: (lv) => 1.3 + 0.1 * lv,
        statBase: 'str',
        turns: 3,
      },
    ],
  },

  // ---- 呪術士（盲目・防弱） ----
  skill_blind_hex: {
    id: 'skill_blind_hex',
    name: '盲目の呪',
    tree: 'master',
    tpCost: (lv) => 6 + lv,
    element: 'almighty',
    target: 'enemyAll',
    effects: [{ kind: 'ailment', ailment: 'blind', chance: (lv) => 0.35 + 0.03 * lv, turns: 3 }],
  },
  skill_armor_hex: {
    id: 'skill_armor_hex',
    name: '鎧弱の呪',
    tree: 'master',
    tpCost: (lv) => 5 + lv,
    element: 'almighty',
    target: 'enemyOne',
    effects: [
      {
        kind: 'buff',
        stat: 'pdef',
        modifier: (lv) => 0.8 - 0.03 * lv,
        turns: 3,
        stackGroup: 'pdefDebuff',
      },
    ],
  },

  // ---- 降霊術士（死霊召喚・障壁・爆裂） ----
  skill_call_wraith: {
    id: 'skill_call_wraith',
    name: '死霊召喚',
    tree: 'base',
    tpCost: (lv) => 6 + lv,
    element: 'almighty',
    target: 'self',
    effects: [{ kind: 'summon', summonKind: 'summon_wraith' }],
  },
  skill_soul_barrier: {
    id: 'skill_soul_barrier',
    name: '無慈悲な盾',
    tree: 'base',
    tpCost: (lv) => 5 + lv,
    element: 'almighty',
    target: 'allyAll',
    effects: [{ kind: 'barrier', absorb: (lv) => 25 + 12 * lv, turns: 2 }],
  },
  skill_call_sentinel: {
    id: 'skill_call_sentinel',
    name: '亡者の壁',
    tree: 'master',
    tpCost: (lv) => 6 + lv,
    element: 'almighty',
    target: 'self',
    effects: [{ kind: 'summon', summonKind: 'summon_revenant' }],
  },
  skill_soul_burst: {
    id: 'skill_soul_burst',
    name: '死霊爆裂',
    tree: 'master',
    tpCost: (lv) => 7 + lv,
    element: 'almighty',
    target: 'enemyAll',
    effects: [{ kind: 'damage', statBase: 'int', power: (lv) => 0.9 + 0.15 * lv }],
  },

  // ---- 称号アクティブ（第2ツリー） ----
  skill_cleanse_draft: {
    id: 'skill_cleanse_draft',
    name: '解毒の秘薬',
    tree: 'title',
    tpCost: (lv) => 4 + lv,
    element: 'almighty',
    target: 'allyAll',
    effects: [{ kind: 'cleanse' }],
  },
  skill_counter_throw: {
    id: 'skill_counter_throw',
    name: '当て身投げ',
    tree: 'title',
    tpCost: () => 5,
    element: 'almighty',
    target: 'self',
    effects: [
      {
        kind: 'counter',
        chance: (lv) => 0.45 + 0.05 * lv,
        power: (lv) => 1.2 + 0.1 * lv,
        statBase: 'str',
        turns: 3,
      },
    ],
  },
};

/** 戦闘効果を持つスキルか。 */
export function isBattleSkill(skillId: SkillId): boolean {
  return skillId in BATTLE_SKILLS;
}
