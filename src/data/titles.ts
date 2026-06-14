import type { StatGrowth, TitleId, TitleMaster } from '@/domain/types';

// ============================================================================
// 称号（二つ名 / 第2スキルツリー）マスター（[01 §8]）。
// 1職業につき2種。称号で成長傾向（growthModifier）が変化する。
// Phase 0 はスキルツリーは空でよく、成長補正と参照整合のみ用意する。
// ============================================================================

const noGrowth = (over: Partial<StatGrowth>): StatGrowth => ({
  hp: 0,
  tp: 0,
  str: 0,
  vit: 0,
  agi: 0,
  int: 0,
  mnd: 0,
  luc: 0,
  ...over,
});

export const TITLES: Record<TitleId, TitleMaster> = {
  // 戦士
  title_berserker: {
    id: 'title_berserker',
    name: '狂戦士',
    parentClassId: 'class_warrior',
    skillTree: { skills: [] },
    growthModifier: noGrowth({ str: 1 }),
  },
  title_sentinel: {
    id: 'title_sentinel',
    name: '哨戒兵',
    parentClassId: 'class_warrior',
    skillTree: { skills: [] },
    growthModifier: noGrowth({ vit: 1 }),
  },
  // 守護兵
  title_bulwark: {
    id: 'title_bulwark',
    name: '城壁',
    parentClassId: 'class_guardian',
    skillTree: { skills: [] },
    growthModifier: noGrowth({ vit: 1, hp: 2 }),
  },
  title_vanguard: {
    id: 'title_vanguard',
    name: '先鋒',
    parentClassId: 'class_guardian',
    skillTree: { skills: [] },
    growthModifier: noGrowth({ str: 1 }),
  },
  // 魔導士
  title_pyromancer: {
    id: 'title_pyromancer',
    name: '紅蓮術士',
    parentClassId: 'class_mage',
    skillTree: { skills: [] },
    growthModifier: noGrowth({ int: 1 }),
  },
  title_sage: {
    id: 'title_sage',
    name: '賢者',
    parentClassId: 'class_mage',
    skillTree: { skills: [] },
    growthModifier: noGrowth({ tp: 2, mnd: 1 }),
  },
  // 狩人
  title_sniper: {
    id: 'title_sniper',
    name: '狙撃手',
    parentClassId: 'class_ranger',
    skillTree: { skills: [] },
    growthModifier: noGrowth({ agi: 1, luc: 1 }),
  },
  title_tracker: {
    id: 'title_tracker',
    name: '追跡者',
    parentClassId: 'class_ranger',
    skillTree: { skills: [] },
    growthModifier: noGrowth({ agi: 1 }),
  },
};
