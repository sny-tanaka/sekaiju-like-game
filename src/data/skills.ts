import type { SkillId, SkillMaster } from '@/domain/types';

// ============================================================================
// スキルマスター（[03] 本格実装は Phase 2-3）。
// Phase 0 はスキルツリーの参照整合を検証できるよう、最小限の定義のみ用意する。
// ============================================================================

export const SKILLS: Record<SkillId, SkillMaster> = {
  // 戦士
  skill_power_slash: {
    id: 'skill_power_slash',
    name: 'パワースラッシュ',
    description: '単体に強力な斬撃。',
  },
  skill_guard_stance: {
    id: 'skill_guard_stance',
    name: 'ガードスタンス',
    description: '物理防御を一時的に高める。',
  },
  // 守護兵
  skill_shield_bash: {
    id: 'skill_shield_bash',
    name: 'シールドバッシュ',
    description: '盾で殴り行動を遅延させる。',
  },
  skill_provoke: { id: 'skill_provoke', name: '挑発', description: '敵の攻撃を自身へ引きつける。' },
  // 魔導士
  skill_fire_bolt: {
    id: 'skill_fire_bolt',
    name: 'ファイアボルト',
    description: '単体に火属性魔法ダメージ。',
  },
  skill_ice_bolt: {
    id: 'skill_ice_bolt',
    name: 'アイスボルト',
    description: '単体に氷属性魔法ダメージ。',
  },
  // 狩人
  skill_aimed_shot: {
    id: 'skill_aimed_shot',
    name: '狙撃',
    description: '命中とクリティカルに優れた射撃。',
  },
  skill_spread_shot: {
    id: 'skill_spread_shot',
    name: '拡散射撃',
    description: '敵1列に射撃ダメージ。',
  },
  skill_leg_snipe: {
    id: 'skill_leg_snipe',
    name: '脚封じの矢',
    description: '射撃ダメージを与え、確率で脚を封じる（回避低下・逃走不可）。',
  },
  skill_arm_snipe: {
    id: 'skill_arm_snipe',
    name: '腕封じの矢',
    description: '射撃ダメージを与え、確率で腕を封じる（通常攻撃・物理スキル不可）。',
  },
  skill_head_snipe: {
    id: 'skill_head_snipe',
    name: '頭封じの矢',
    description: '射撃ダメージを与え、確率で頭を封じる（魔法・補助スキル不可）。',
  },
  // 召喚スキル（[03 §8]）
  skill_summon_wolf: {
    id: 'skill_summon_wolf',
    name: '狼を召喚',
    description: '自律して敵を攻撃する召喚獣・狼を最前列に呼ぶ（戦闘限り）。',
  },
  skill_summon_bulwark: {
    id: 'skill_summon_bulwark',
    name: '石像を召喚',
    description: '敵の攻撃を引き受ける高耐久の石像を最前列に呼ぶ（戦闘限り）。',
  },
  skill_summon_familiar: {
    id: 'skill_summon_familiar',
    name: '使い魔を召喚',
    description: '自律攻撃する使い魔を呼ぶ。戦闘をまたいで残る（拠点帰還で消える）。',
  },
  // 採集スキル（[04 §5]・探索用パッシブ。戦闘では使わない）
  skill_mining: {
    id: 'skill_mining',
    name: '採掘',
    description: '採掘ポイントから鉱石を採取できる。',
  },
  skill_gathering: {
    id: 'skill_gathering',
    name: '採取',
    description: '採取ポイントから薬草などを集められる。',
  },
  skill_logging: {
    id: 'skill_logging',
    name: '伐採',
    description: '伐採ポイントから木材を得られる。',
  },
  skill_fishing: {
    id: 'skill_fishing',
    name: '釣り',
    description: '釣りポイントから食材（魚）を得られる。',
  },
  skill_harvest: {
    id: 'skill_harvest',
    name: '収穫',
    description: '収穫ポイントから食材（木の実）を得られる。',
  },
  skill_hunting: {
    id: 'skill_hunting',
    name: '狩猟',
    description: '狩猟ポイントから食材（肉）を得られる。',
  },
  // 種族ユニオンスキル（効果は data/unionSkills.ts）
  skill_union_rally: {
    id: 'skill_union_rally',
    name: '結束の鬨',
    description: '味方全体を大回復し攻撃力を高めるユニオンスキル（ヒト）。',
  },
  skill_union_smash: {
    id: 'skill_union_smash',
    name: '豪砕',
    description: '敵全体に強力な壊打を与えるユニオンスキル（ガロン・2名）。',
  },
  skill_union_nova: {
    id: 'skill_union_nova',
    name: '魔光爆裂',
    description: '敵全体に大きな火属性魔法を与えるユニオンスキル（ピクス・2名）。',
  },
  skill_union_fang: {
    id: 'skill_union_fang',
    name: '連牙',
    description: '単体に貫通3連撃を浴びせるユニオンスキル（テリアン）。',
  },
  skill_union_moonlight: {
    id: 'skill_union_moonlight',
    name: '月光の癒し',
    description: '味方全体を回復し魔法防御を高めるユニオンスキル（ルーナ）。',
  },
  skill_union_quake: {
    id: 'skill_union_quake',
    name: '大震撃',
    description: '敵全体に大きな壊打を与えるユニオンスキル（ゴラン・2名）。',
  },

  // ---- Phase 6-2 追加スキル ----
  skill_cleave: { id: 'skill_cleave', name: 'なぎ払い', description: '敵全体に斬撃ダメージ。' },
  skill_volt_bolt: {
    id: 'skill_volt_bolt',
    name: 'ボルトショック',
    description: '単体に雷属性魔法ダメージ。',
  },
  // 薬師
  skill_heal: { id: 'skill_heal', name: 'ヒール', description: '味方1人の HP を回復する。' },
  skill_mass_heal: {
    id: 'skill_mass_heal',
    name: 'マスヒール',
    description: '味方全体の HP を回復する。',
  },
  skill_protect_hymn: {
    id: 'skill_protect_hymn',
    name: '守りの聖歌',
    description: '味方全体の魔法防御を高める。',
  },
  // 剣舞士
  skill_war_dance: {
    id: 'skill_war_dance',
    name: '戦いの舞',
    description: '味方全体の物理攻撃力を高める。',
  },
  skill_evasion_dance: {
    id: 'skill_evasion_dance',
    name: '回避の舞',
    description: '味方全体の回避を高める。',
  },
  skill_weaken_song: {
    id: 'skill_weaken_song',
    name: '弱体の歌',
    description: '敵全体の物理攻撃力を下げる。',
  },
  // 拳聖
  skill_triple_strike: {
    id: 'skill_triple_strike',
    name: '三段突き',
    description: '単体に壊打の3連撃。',
  },
  skill_focus_ki: { id: 'skill_focus_ki', name: '練気', description: '自身の物理攻撃力を高める。' },
  skill_iron_body: { id: 'skill_iron_body', name: '鉄身', description: '自身の物理防御を高める。' },
  // 呪術士
  skill_venom_hex: {
    id: 'skill_venom_hex',
    name: '毒の呪',
    description: '単体に魔法ダメージを与え毒を付与する。',
  },
  skill_sleep_hex: {
    id: 'skill_sleep_hex',
    name: '眠りの呪',
    description: '敵全体を眠らせる（被ダメで解除）。',
  },
  skill_weaken_hex: {
    id: 'skill_weaken_hex',
    name: '魔弱の呪',
    description: '単体の魔法攻撃力を下げる。',
  },
};
