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
  // 種族（ユニオン系の枠）
  skill_union_rally: {
    id: 'skill_union_rally',
    name: 'ラリー',
    description: '味方全体を鼓舞するユニオンスキル。',
  },
};
