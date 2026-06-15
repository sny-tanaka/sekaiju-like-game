import type { RaceId, RaceMaster } from '@/domain/types';

// ============================================================================
// 種族マスター（[01 §3]）。
// 基本ステータスは種族で決まり、成長傾向が異なる。固有名詞は本作オリジナル。
// defaultClassId は作成時に割り当てる既定職業（[01 §4]・Phase 0 の初期パーティ用）。
// ============================================================================

export const RACES: Record<RaceId, RaceMaster> = {
  // バランス型
  race_human: {
    id: 'race_human',
    name: 'ヒト',
    baseStatsAtLv1: { hp: 40, tp: 20, str: 8, vit: 8, agi: 8, int: 8, mnd: 8, luc: 8 },
    statGrowth: { hp: 8, tp: 4, str: 2, vit: 2, agi: 2, int: 2, mnd: 2, luc: 2 },
    // 種族スキル: ユニオン＋採集（バランス型は採掘・採取が得意）
    raceSkillTree: {
      skills: [
        { skillId: 'skill_union_rally', maxLevel: 3 },
        { skillId: 'skill_mining', maxLevel: 1 },
        { skillId: 'skill_gathering', maxLevel: 1 },
      ],
    },
    defaultClassId: 'class_warrior',
  },
  // 物理特化の大型種
  race_garon: {
    id: 'race_garon',
    name: 'ガロン',
    baseStatsAtLv1: { hp: 55, tp: 12, str: 11, vit: 11, agi: 5, int: 4, mnd: 6, luc: 6 },
    statGrowth: { hp: 12, tp: 2, str: 3, vit: 3, agi: 1, int: 1, mnd: 2, luc: 2 },
    // 種族スキル: ユニオン＋採集（力自慢は伐採・狩猟が得意）
    raceSkillTree: {
      skills: [
        { skillId: 'skill_union_smash', maxLevel: 3 },
        { skillId: 'skill_logging', maxLevel: 1 },
        { skillId: 'skill_hunting', maxLevel: 1 },
      ],
    },
    defaultClassId: 'class_guardian',
  },
  // 魔法特化の小型種
  race_pix: {
    id: 'race_pix',
    name: 'ピクス',
    baseStatsAtLv1: { hp: 28, tp: 32, str: 4, vit: 5, agi: 9, int: 12, mnd: 11, luc: 7 },
    statGrowth: { hp: 5, tp: 7, str: 1, vit: 1, agi: 2, int: 3, mnd: 3, luc: 2 },
    // 種族スキル: ユニオン＋採集（自然に親しむ種は採取・収穫が得意）
    raceSkillTree: {
      skills: [
        { skillId: 'skill_union_nova', maxLevel: 3 },
        { skillId: 'skill_gathering', maxLevel: 1 },
        { skillId: 'skill_harvest', maxLevel: 1 },
      ],
    },
    defaultClassId: 'class_mage',
  },
  // 獣使い種
  race_therian: {
    id: 'race_therian',
    name: 'テリアン',
    baseStatsAtLv1: { hp: 38, tp: 18, str: 9, vit: 7, agi: 11, int: 6, mnd: 6, luc: 9 },
    statGrowth: { hp: 7, tp: 3, str: 2, vit: 2, agi: 3, int: 1, mnd: 1, luc: 3 },
    // 種族スキル: ユニオン＋採集（獣使い種は釣り・狩猟・収穫に長ける食料の要）
    raceSkillTree: {
      skills: [
        { skillId: 'skill_union_fang', maxLevel: 3 },
        { skillId: 'skill_fishing', maxLevel: 1 },
        { skillId: 'skill_hunting', maxLevel: 1 },
        { skillId: 'skill_harvest', maxLevel: 1 },
      ],
    },
    defaultClassId: 'class_ranger',
  },
  // 月の民（魔法・幸運寄りの癒し手）
  race_lunar: {
    id: 'race_lunar',
    name: 'ルーナ',
    baseStatsAtLv1: { hp: 30, tp: 28, str: 5, vit: 6, agi: 8, int: 10, mnd: 12, luc: 10 },
    statGrowth: { hp: 5, tp: 6, str: 1, vit: 1, agi: 2, int: 3, mnd: 3, luc: 3 },
    // 種族スキル: ユニオン＋採集（採取・収穫に長ける）
    raceSkillTree: {
      skills: [
        { skillId: 'skill_union_moonlight', maxLevel: 3 },
        { skillId: 'skill_gathering', maxLevel: 1 },
        { skillId: 'skill_harvest', maxLevel: 1 },
      ],
    },
    defaultClassId: 'class_medic',
  },
  // 岩の民（高耐久・剛力）
  race_golan: {
    id: 'race_golan',
    name: 'ゴラン',
    baseStatsAtLv1: { hp: 60, tp: 10, str: 12, vit: 13, agi: 4, int: 3, mnd: 6, luc: 5 },
    statGrowth: { hp: 13, tp: 2, str: 3, vit: 3, agi: 1, int: 1, mnd: 1, luc: 2 },
    // 種族スキル: ユニオン＋採集（採掘・伐採に長ける）
    raceSkillTree: {
      skills: [
        { skillId: 'skill_union_quake', maxLevel: 3 },
        { skillId: 'skill_mining', maxLevel: 1 },
        { skillId: 'skill_logging', maxLevel: 1 },
      ],
    },
    defaultClassId: 'class_monk',
  },
};
