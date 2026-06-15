import type { StatGrowth, TitleId, TitleMaster } from '@/domain/types';

// ============================================================================
// 称号（二つ名 / 第2スキルツリー）マスター（[01 §8]）。
// 1職業につき2種。称号で成長傾向（growthModifier）が変化し、第2スキルツリーが解放される。
// 第2ツリーは代表スキル1種（多くはパッシブ。一部はアクティブ）でビルドを方向づける。
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
    skillTree: { skills: [{ skillId: 'passive_title_berserker', maxLevel: 3 }] },
    growthModifier: noGrowth({ str: 1 }),
  },
  title_sentinel: {
    id: 'title_sentinel',
    name: '哨戒兵',
    parentClassId: 'class_warrior',
    skillTree: { skills: [{ skillId: 'passive_title_sentinel', maxLevel: 3 }] },
    growthModifier: noGrowth({ vit: 1 }),
  },
  // 守護兵
  title_bulwark: {
    id: 'title_bulwark',
    name: '城壁',
    parentClassId: 'class_guardian',
    skillTree: { skills: [{ skillId: 'passive_title_bulwark', maxLevel: 3 }] },
    growthModifier: noGrowth({ vit: 1, hp: 2 }),
  },
  title_vanguard: {
    id: 'title_vanguard',
    name: '先鋒',
    parentClassId: 'class_guardian',
    skillTree: { skills: [{ skillId: 'passive_title_vanguard', maxLevel: 3 }] },
    growthModifier: noGrowth({ str: 1 }),
  },
  // 魔導士
  title_pyromancer: {
    id: 'title_pyromancer',
    name: '紅蓮術士',
    parentClassId: 'class_mage',
    skillTree: { skills: [{ skillId: 'passive_title_pyromancer', maxLevel: 3 }] },
    growthModifier: noGrowth({ int: 1 }),
  },
  title_sage: {
    id: 'title_sage',
    name: '賢者',
    parentClassId: 'class_mage',
    skillTree: { skills: [{ skillId: 'passive_title_sage', maxLevel: 3 }] },
    growthModifier: noGrowth({ tp: 2, mnd: 1 }),
  },
  // 狩人
  title_sniper: {
    id: 'title_sniper',
    name: '狙撃手',
    parentClassId: 'class_ranger',
    skillTree: { skills: [{ skillId: 'passive_title_sniper', maxLevel: 3 }] },
    growthModifier: noGrowth({ agi: 1, luc: 1 }),
  },
  title_tracker: {
    id: 'title_tracker',
    name: '追跡者',
    parentClassId: 'class_ranger',
    skillTree: { skills: [{ skillId: 'passive_title_tracker', maxLevel: 3 }] },
    growthModifier: noGrowth({ agi: 1 }),
  },
  // 薬師
  title_saint: {
    id: 'title_saint',
    name: '聖者',
    parentClassId: 'class_medic',
    skillTree: { skills: [{ skillId: 'passive_title_saint', maxLevel: 3 }] },
    growthModifier: noGrowth({ mnd: 1, tp: 2 }),
  },
  title_apothecary: {
    id: 'title_apothecary',
    name: '調薬師',
    parentClassId: 'class_medic',
    // アクティブ: 味方1人の状態異常を治療する秘薬。
    skillTree: { skills: [{ skillId: 'skill_cleanse_draft', maxLevel: 3 }] },
    growthModifier: noGrowth({ luc: 1, tp: 1 }),
  },
  // 剣舞士
  title_blade_dancer: {
    id: 'title_blade_dancer',
    name: '剣の舞手',
    parentClassId: 'class_dancer',
    skillTree: { skills: [{ skillId: 'passive_title_blade_dancer', maxLevel: 3 }] },
    growthModifier: noGrowth({ agi: 1, str: 1 }),
  },
  title_muse: {
    id: 'title_muse',
    name: '舞姫',
    parentClassId: 'class_dancer',
    skillTree: { skills: [{ skillId: 'passive_title_muse', maxLevel: 3 }] },
    growthModifier: noGrowth({ mnd: 1, tp: 1 }),
  },
  // 拳聖
  title_grappler: {
    id: 'title_grappler',
    name: '組手家',
    parentClassId: 'class_monk',
    // アクティブ: 反撃の構え（当て身投げ）。
    skillTree: { skills: [{ skillId: 'skill_counter_throw', maxLevel: 3 }] },
    growthModifier: noGrowth({ str: 1, agi: 1 }),
  },
  title_zen: {
    id: 'title_zen',
    name: '禅僧',
    parentClassId: 'class_monk',
    skillTree: { skills: [{ skillId: 'passive_title_zen', maxLevel: 3 }] },
    growthModifier: noGrowth({ vit: 1, tp: 1 }),
  },
  // 呪術士
  title_plague: {
    id: 'title_plague',
    name: '疫病使い',
    parentClassId: 'class_hexer',
    skillTree: { skills: [{ skillId: 'passive_title_plague', maxLevel: 3 }] },
    growthModifier: noGrowth({ int: 1 }),
  },
  title_warlock: {
    id: 'title_warlock',
    name: '魔道師',
    parentClassId: 'class_hexer',
    skillTree: { skills: [{ skillId: 'passive_title_warlock', maxLevel: 3 }] },
    growthModifier: noGrowth({ int: 1, luc: 1 }),
  },
  // 降霊術士
  title_necromancer: {
    id: 'title_necromancer',
    name: '降霊師',
    parentClassId: 'class_summoner',
    skillTree: { skills: [{ skillId: 'passive_title_necromancer', maxLevel: 3 }] },
    growthModifier: noGrowth({ int: 1, tp: 1 }),
  },
  title_puppeteer: {
    id: 'title_puppeteer',
    name: '傀儡師',
    parentClassId: 'class_summoner',
    skillTree: { skills: [{ skillId: 'passive_title_puppeteer', maxLevel: 3 }] },
    growthModifier: noGrowth({ mnd: 1, vit: 1 }),
  },
};
