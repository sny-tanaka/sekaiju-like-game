import type { SkillId, UnionSkillDef } from '@/domain/types';

// ============================================================================
// ユニオンスキル（必殺技）の効果定義（[03 §9]）。種族固有の切り札。
// ユニオンゲージを消費し、通常行動とは別枠でターン冒頭に解決する。
// データ駆動: level で倍率/回復量を返す。バランス調整＝この値の編集で完結。
// requiredParticipants は発動者を含む必要人数。各参加者から gaugeCostPerParticipant を消費する。
// ============================================================================

export const UNION_SKILLS: Record<SkillId, UnionSkillDef> = {
  // ヒト（バランス）: 全体回復＋攻撃力上昇。単独発動できる立て直しの要。
  skill_union_rally: {
    id: 'skill_union_rally',
    name: '結束の鬨',
    description: '味方全体を大回復し、物理攻撃力を高める。単独で発動できる。',
    raceId: 'race_human',
    requiredParticipants: 1,
    gaugeCostPerParticipant: 100,
    element: 'almighty',
    target: 'allyAll',
    effects: [
      { kind: 'heal', amount: (lv) => 60 + 25 * lv },
      {
        kind: 'buff',
        stat: 'patk',
        modifier: (lv) => 1.2 + 0.05 * lv,
        turns: 3,
        stackGroup: 'union',
      },
    ],
  },
  // ガロン（物理）: 敵全体に強烈な壊打。協力者1名が必要。
  skill_union_smash: {
    id: 'skill_union_smash',
    name: '豪砕',
    description: '2名のユニオンで敵全体に強力な壊打ダメージを与える。',
    raceId: 'race_garon',
    requiredParticipants: 2,
    gaugeCostPerParticipant: 50,
    element: 'bash',
    target: 'enemyAll',
    effects: [{ kind: 'damage', statBase: 'str', power: (lv) => 2.2 + 0.4 * lv }],
  },
  // ピクス（魔法）: 敵全体に火属性大魔法。協力者1名が必要。
  skill_union_nova: {
    id: 'skill_union_nova',
    name: '魔光爆裂',
    description: '2名のユニオンで敵全体に大きな火属性魔法ダメージを与える。',
    raceId: 'race_pix',
    requiredParticipants: 2,
    gaugeCostPerParticipant: 50,
    element: 'fire',
    target: 'enemyAll',
    effects: [{ kind: 'damage', statBase: 'int', power: (lv) => 2.4 + 0.5 * lv }],
  },
  // テリアン（速・獣）: 単体へ貫通3連撃。単独発動できるとどめ役。
  skill_union_fang: {
    id: 'skill_union_fang',
    name: '連牙',
    description: '単体に貫通の3連撃を浴びせる。単独で発動できる。',
    raceId: 'race_therian',
    requiredParticipants: 1,
    gaugeCostPerParticipant: 100,
    element: 'pierce',
    target: 'enemyOne',
    effects: [{ kind: 'damage', statBase: 'str', power: (lv) => 1.4 + 0.3 * lv, hits: 3 }],
  },
};

/** ユニオンスキルか。 */
export function isUnionSkill(skillId: SkillId): boolean {
  return skillId in UNION_SKILLS;
}
