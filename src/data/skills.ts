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
};
