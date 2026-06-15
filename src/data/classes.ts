import type { ClassId, ClassMaster } from '@/domain/types';

// ============================================================================
// 職業マスター（[01 §4]）。
// ゲーム開始時は種族の既定職業が割り当てられ、転職解放後（[06 §8]）に自由化。
// Phase 0 はスキルツリーは最小限。装備適性・称号オプションを定義する。
// ============================================================================

export const CLASSES: Record<ClassId, ClassMaster> = {
  class_warrior: {
    id: 'class_warrior',
    name: '戦士',
    skillTree: {
      skills: [
        { skillId: 'skill_power_slash', maxLevel: 5 },
        { skillId: 'skill_guard_stance', maxLevel: 3 },
        {
          skillId: 'skill_cleave',
          maxLevel: 5,
          requires: [{ skillId: 'skill_power_slash', level: 2 }],
        },
      ],
    },
    equipableWeaponTypes: ['sword', 'axe'],
    equipableArmorTypes: ['heavy', 'light'],
    titleOptions: ['title_berserker', 'title_sentinel'],
  },
  class_guardian: {
    id: 'class_guardian',
    name: '守護兵',
    skillTree: {
      skills: [
        { skillId: 'skill_shield_bash', maxLevel: 5 },
        { skillId: 'skill_provoke', maxLevel: 3 },
        { skillId: 'skill_summon_bulwark', maxLevel: 3 },
      ],
    },
    equipableWeaponTypes: ['spear', 'sword'],
    equipableArmorTypes: ['heavy'],
    titleOptions: ['title_bulwark', 'title_vanguard'],
  },
  class_mage: {
    id: 'class_mage',
    name: '魔導士',
    skillTree: {
      skills: [
        { skillId: 'skill_fire_bolt', maxLevel: 5 },
        {
          skillId: 'skill_ice_bolt',
          maxLevel: 5,
          requires: [{ skillId: 'skill_fire_bolt', level: 1 }],
        },
        {
          skillId: 'skill_volt_bolt',
          maxLevel: 5,
          requires: [{ skillId: 'skill_ice_bolt', level: 1 }],
        },
        { skillId: 'skill_summon_familiar', maxLevel: 2 },
      ],
    },
    equipableWeaponTypes: ['staff'],
    equipableArmorTypes: ['clothes'],
    titleOptions: ['title_pyromancer', 'title_sage'],
  },
  class_ranger: {
    id: 'class_ranger',
    name: '狩人',
    skillTree: {
      skills: [
        { skillId: 'skill_aimed_shot', maxLevel: 5 },
        { skillId: 'skill_spread_shot', maxLevel: 5 },
        { skillId: 'skill_leg_snipe', maxLevel: 3 },
        { skillId: 'skill_arm_snipe', maxLevel: 3 },
        {
          skillId: 'skill_head_snipe',
          maxLevel: 3,
          requires: [{ skillId: 'skill_aimed_shot', level: 1 }],
        },
        { skillId: 'skill_summon_wolf', maxLevel: 3 },
      ],
    },
    equipableWeaponTypes: ['bow', 'fist'],
    equipableArmorTypes: ['light', 'clothes'],
    titleOptions: ['title_sniper', 'title_tracker'],
  },

  // ---- Phase 6-2 追加職業 ----
  // 薬師: 回復・防御支援の要。
  class_medic: {
    id: 'class_medic',
    name: '薬師',
    skillTree: {
      skills: [
        { skillId: 'skill_heal', maxLevel: 5 },
        {
          skillId: 'skill_mass_heal',
          maxLevel: 5,
          requires: [{ skillId: 'skill_heal', level: 2 }],
        },
        { skillId: 'skill_protect_hymn', maxLevel: 3 },
      ],
    },
    equipableWeaponTypes: ['staff', 'fist'],
    equipableArmorTypes: ['clothes', 'light'],
    titleOptions: ['title_saint', 'title_apothecary'],
  },
  // 剣舞士: 舞でパーティを強化しつつ斬る支援アタッカー。
  class_dancer: {
    id: 'class_dancer',
    name: '剣舞士',
    skillTree: {
      skills: [
        { skillId: 'skill_war_dance', maxLevel: 3 },
        { skillId: 'skill_evasion_dance', maxLevel: 3 },
        { skillId: 'skill_weaken_song', maxLevel: 3 },
      ],
    },
    equipableWeaponTypes: ['sword', 'fist'],
    equipableArmorTypes: ['light', 'clothes'],
    titleOptions: ['title_blade_dancer', 'title_muse'],
  },
  // 拳聖: 素手で多段攻撃する近接アタッカー。自己強化が得意。
  class_monk: {
    id: 'class_monk',
    name: '拳聖',
    skillTree: {
      skills: [
        { skillId: 'skill_triple_strike', maxLevel: 5 },
        { skillId: 'skill_focus_ki', maxLevel: 3 },
        { skillId: 'skill_iron_body', maxLevel: 3 },
      ],
    },
    equipableWeaponTypes: ['fist'],
    equipableArmorTypes: ['light', 'heavy'],
    titleOptions: ['title_grappler', 'title_zen'],
  },
  // 呪術士: 状態異常と弱体で敵を崩すデバッファー。
  class_hexer: {
    id: 'class_hexer',
    name: '呪術士',
    skillTree: {
      skills: [
        { skillId: 'skill_venom_hex', maxLevel: 5 },
        { skillId: 'skill_sleep_hex', maxLevel: 3 },
        { skillId: 'skill_weaken_hex', maxLevel: 3 },
      ],
    },
    equipableWeaponTypes: ['staff'],
    equipableArmorTypes: ['clothes'],
    titleOptions: ['title_plague', 'title_warlock'],
  },
};
