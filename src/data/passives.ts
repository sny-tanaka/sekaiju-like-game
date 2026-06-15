import type { PassiveSkillDef, SkillId } from '@/domain/types';

// ============================================================================
// パッシブスキル（[03 §5.4]）。戦闘中に「撃つ」ものではなく、習得していると常時効果を持つ。
// BATTLE_SKILLS / UNION_SKILLS とは別レジストリ（戦闘UIのスキル一覧に出さないため）。
// 効果は PassiveMods の「倍率」（1.0=無効果）。戦闘員生成時に computePassiveMods で合算する。
// 武器マスタリーは weaponType 指定の武器を装備中のみ有効（[03 §5.4]）。
// ============================================================================

export const PASSIVE_SKILLS: Record<SkillId, PassiveSkillDef> = {
  // ---- 種族パッシブ（種族ツリー。転職しても保持される） ----
  passive_race_human_adapt: {
    id: 'passive_race_human_adapt',
    name: '適応力',
    tree: 'race',
    mods: (lv) => ({ maxHp: 1 + 0.02 * lv, acc: 1 + 0.02 * lv }),
  },
  passive_race_garon_might: {
    id: 'passive_race_garon_might',
    name: '剛力',
    tree: 'race',
    mods: (lv) => ({ patk: 1 + 0.03 * lv, maxHp: 1 + 0.02 * lv }),
  },
  passive_race_pix_focus: {
    id: 'passive_race_pix_focus',
    name: '魔力集中',
    tree: 'race',
    mods: (lv) => ({ matk: 1 + 0.03 * lv, maxTp: 1 + 0.03 * lv }),
  },
  passive_race_therian_swift: {
    id: 'passive_race_therian_swift',
    name: '俊足',
    tree: 'race',
    mods: (lv) => ({ acc: 1 + 0.03 * lv, eva: 1 + 0.03 * lv }),
  },
  passive_race_lunar_grace: {
    id: 'passive_race_lunar_grace',
    name: '月の加護',
    tree: 'race',
    mods: (lv) => ({ mdef: 1 + 0.03 * lv, maxTp: 1 + 0.02 * lv }),
  },
  passive_race_golan_fortitude: {
    id: 'passive_race_golan_fortitude',
    name: '頑健',
    tree: 'race',
    mods: (lv) => ({ pdef: 1 + 0.03 * lv, maxHp: 1 + 0.03 * lv }),
  },

  // ---- 戦士（剣の連携・反攻アタッカー） ----
  passive_warrior_blade_mastery: {
    id: 'passive_warrior_blade_mastery',
    name: '剣の心得',
    tree: 'base',
    weaponType: 'sword',
    mods: (lv) => ({ patk: 1 + 0.04 * lv }),
  },
  passive_warrior_phys_boost: {
    id: 'passive_warrior_phys_boost',
    name: '剛腕',
    tree: 'base',
    mods: (lv) => ({ patk: 1 + 0.03 * lv }),
  },

  // ---- 守護兵（盾と挑発の壁） ----
  passive_guardian_shield_mastery: {
    id: 'passive_guardian_shield_mastery',
    name: '盾の心得',
    tree: 'base',
    mods: (lv) => ({ pdef: 1 + 0.04 * lv }),
  },
  passive_guardian_hp_boost: {
    id: 'passive_guardian_hp_boost',
    name: '頑強',
    tree: 'base',
    mods: (lv) => ({ maxHp: 1 + 0.04 * lv }),
  },

  // ---- 魔導士（属性魔法アタッカー） ----
  passive_mage_staff_mastery: {
    id: 'passive_mage_staff_mastery',
    name: '杖の心得',
    tree: 'base',
    weaponType: 'staff',
    mods: (lv) => ({ matk: 1 + 0.04 * lv }),
  },
  passive_mage_tp_boost: {
    id: 'passive_mage_tp_boost',
    name: '精神統一',
    tree: 'base',
    mods: (lv) => ({ maxTp: 1 + 0.04 * lv }),
  },

  // ---- 狩人（弓と封じ・召喚の後衛） ----
  passive_ranger_bow_mastery: {
    id: 'passive_ranger_bow_mastery',
    name: '弓の心得',
    tree: 'base',
    weaponType: 'bow',
    mods: (lv) => ({ patk: 1 + 0.04 * lv }),
  },
  passive_ranger_agi_boost: {
    id: 'passive_ranger_agi_boost',
    name: '機敏',
    tree: 'base',
    mods: (lv) => ({ acc: 1 + 0.03 * lv, eva: 1 + 0.02 * lv }),
  },

  // ---- 薬師（回復と治療の要） ----
  passive_medic_tp_boost: {
    id: 'passive_medic_tp_boost',
    name: '薬学の知識',
    tree: 'base',
    mods: (lv) => ({ maxTp: 1 + 0.04 * lv }),
  },
  passive_medic_mdef_boost: {
    id: 'passive_medic_mdef_boost',
    name: '抗体',
    tree: 'base',
    mods: (lv) => ({ mdef: 1 + 0.03 * lv }),
  },

  // ---- 剣舞士（舞で支援するバッファー） ----
  passive_dancer_agi_boost: {
    id: 'passive_dancer_agi_boost',
    name: '舞踏の足捌き',
    tree: 'base',
    mods: (lv) => ({ eva: 1 + 0.03 * lv, acc: 1 + 0.02 * lv }),
  },
  passive_dancer_tp_boost: {
    id: 'passive_dancer_tp_boost',
    name: '高揚',
    tree: 'base',
    mods: (lv) => ({ maxTp: 1 + 0.03 * lv }),
  },

  // ---- 拳聖（多段と反撃の格闘家） ----
  passive_monk_fist_mastery: {
    id: 'passive_monk_fist_mastery',
    name: '拳の心得',
    tree: 'base',
    weaponType: 'fist',
    mods: (lv) => ({ patk: 1 + 0.04 * lv }),
  },
  passive_monk_crit_boost: {
    id: 'passive_monk_crit_boost',
    name: '練達',
    tree: 'base',
    mods: (lv) => ({ crit: 0.015 * lv }),
  },

  // ---- 呪術士（状態異常と弱体のデバッファー） ----
  passive_hexer_matk_boost: {
    id: 'passive_hexer_matk_boost',
    name: '呪詛',
    tree: 'base',
    mods: (lv) => ({ matk: 1 + 0.03 * lv }),
  },
  passive_hexer_mdef_boost: {
    id: 'passive_hexer_mdef_boost',
    name: '瘴気の衣',
    tree: 'base',
    mods: (lv) => ({ mdef: 1 + 0.03 * lv }),
  },

  // ---- 降霊術士（死霊召喚の万能職） ----
  passive_summoner_staff_mastery: {
    id: 'passive_summoner_staff_mastery',
    name: '霊媒の心得',
    tree: 'base',
    weaponType: 'staff',
    mods: (lv) => ({ matk: 1 + 0.04 * lv }),
  },
  passive_summoner_tp_boost: {
    id: 'passive_summoner_tp_boost',
    name: '死霊術の知識',
    tree: 'base',
    mods: (lv) => ({ maxTp: 1 + 0.04 * lv }),
  },

  // ---- 称号パッシブ（第2スキルツリー。[01 §8]） ----
  passive_title_berserker: {
    id: 'passive_title_berserker',
    name: '狂気の力',
    tree: 'title',
    mods: (lv) => ({ patk: 1 + 0.03 * lv, crit: 0.01 * lv }),
  },
  passive_title_sentinel: {
    id: 'passive_title_sentinel',
    name: '警戒',
    tree: 'title',
    mods: (lv) => ({ pdef: 1 + 0.03 * lv, acc: 1 + 0.02 * lv }),
  },
  passive_title_bulwark: {
    id: 'passive_title_bulwark',
    name: '鉄壁',
    tree: 'title',
    mods: (lv) => ({ pdef: 1 + 0.03 * lv, maxHp: 1 + 0.03 * lv }),
  },
  passive_title_vanguard: {
    id: 'passive_title_vanguard',
    name: '突撃',
    tree: 'title',
    mods: (lv) => ({ patk: 1 + 0.04 * lv }),
  },
  passive_title_pyromancer: {
    id: 'passive_title_pyromancer',
    name: '業火',
    tree: 'title',
    mods: (lv) => ({ matk: 1 + 0.04 * lv }),
  },
  passive_title_sage: {
    id: 'passive_title_sage',
    name: '英知',
    tree: 'title',
    mods: (lv) => ({ maxTp: 1 + 0.04 * lv, mdef: 1 + 0.02 * lv }),
  },
  passive_title_sniper: {
    id: 'passive_title_sniper',
    name: '精密射撃',
    tree: 'title',
    mods: (lv) => ({ crit: 0.015 * lv, acc: 1 + 0.02 * lv }),
  },
  passive_title_tracker: {
    id: 'passive_title_tracker',
    name: '隠密',
    tree: 'title',
    mods: (lv) => ({ eva: 1 + 0.04 * lv }),
  },
  passive_title_saint: {
    id: 'passive_title_saint',
    name: '慈愛',
    tree: 'title',
    mods: (lv) => ({ maxTp: 1 + 0.03 * lv, mdef: 1 + 0.03 * lv }),
  },
  passive_title_blade_dancer: {
    id: 'passive_title_blade_dancer',
    name: '剣の舞',
    tree: 'title',
    mods: (lv) => ({ patk: 1 + 0.03 * lv, eva: 1 + 0.02 * lv }),
  },
  passive_title_muse: {
    id: 'passive_title_muse',
    name: '詩心',
    tree: 'title',
    mods: (lv) => ({ maxTp: 1 + 0.04 * lv }),
  },
  passive_title_zen: {
    id: 'passive_title_zen',
    name: '不動',
    tree: 'title',
    mods: (lv) => ({ pdef: 1 + 0.03 * lv, maxHp: 1 + 0.03 * lv }),
  },
  passive_title_plague: {
    id: 'passive_title_plague',
    name: '疫病',
    tree: 'title',
    mods: (lv) => ({ matk: 1 + 0.04 * lv }),
  },
  passive_title_warlock: {
    id: 'passive_title_warlock',
    name: '魔道の極み',
    tree: 'title',
    mods: (lv) => ({ matk: 1 + 0.03 * lv, crit: 0.01 * lv }),
  },
  passive_title_necromancer: {
    id: 'passive_title_necromancer',
    name: '降霊',
    tree: 'title',
    mods: (lv) => ({ matk: 1 + 0.03 * lv, maxTp: 1 + 0.03 * lv }),
  },
  passive_title_puppeteer: {
    id: 'passive_title_puppeteer',
    name: '傀儡操糸',
    tree: 'title',
    mods: (lv) => ({ maxHp: 1 + 0.03 * lv, maxTp: 1 + 0.02 * lv }),
  },
};

/** パッシブスキルか。 */
export function isPassiveSkill(skillId: SkillId): boolean {
  return skillId in PASSIVE_SKILLS;
}
