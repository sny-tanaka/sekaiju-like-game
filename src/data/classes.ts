import type { ClassId, ClassMaster } from '@/domain/types';

// ============================================================================
// 職業マスター（[01 §4]）。
// ゲーム開始時は種族の既定職業が割り当てられ、転職解放後（[06 §8]）に自由化。
// スキルツリーは「基本（active）＋達人（master）＋パッシブ（[03 §5.4]）」で構成する。
// 各ツリーの先頭ノードは作成/転職時に無料付与される起点アクティブにする（charProgress）。
// 役割の幅は本家『世界樹の迷宮V』の職業類型を参考に拡充（固有名詞は本作オリジナル）。
// ============================================================================

export const CLASSES: Record<ClassId, ClassMaster> = {
  // 戦士: 剣の連携追撃と反撃を備えた前衛物理アタッカー。
  class_warrior: {
    id: 'class_warrior',
    name: '戦士',
    skillTree: {
      skills: [
        { skillId: 'skill_power_slash', maxLevel: 5 },
        { skillId: 'passive_warrior_blade_mastery', maxLevel: 3 },
        { skillId: 'passive_warrior_phys_boost', maxLevel: 3 },
        { skillId: 'skill_guard_stance', maxLevel: 3 },
        {
          skillId: 'skill_cleave',
          maxLevel: 5,
          requires: [{ skillId: 'skill_power_slash', level: 2 }],
        },
        {
          skillId: 'skill_chain_slash',
          maxLevel: 3,
          requires: [{ skillId: 'passive_warrior_blade_mastery', level: 1 }],
        },
        {
          skillId: 'skill_riposte',
          maxLevel: 3,
          requires: [{ skillId: 'skill_guard_stance', level: 1 }],
        },
      ],
    },
    equipableWeaponTypes: ['sword', 'axe'],
    equipableArmorTypes: ['heavy', 'light'],
    titleOptions: ['title_berserker', 'title_sentinel'],
  },
  // 守護兵: 盾と挑発で敵を引きつけ、障壁と反撃で味方を守るタンク。
  class_guardian: {
    id: 'class_guardian',
    name: '守護兵',
    skillTree: {
      skills: [
        { skillId: 'skill_shield_bash', maxLevel: 5 },
        { skillId: 'passive_guardian_shield_mastery', maxLevel: 3 },
        { skillId: 'passive_guardian_hp_boost', maxLevel: 3 },
        { skillId: 'skill_provoke', maxLevel: 3 },
        { skillId: 'skill_summon_bulwark', maxLevel: 3 },
        {
          skillId: 'skill_line_guard',
          maxLevel: 3,
          requires: [{ skillId: 'passive_guardian_shield_mastery', level: 1 }],
        },
        {
          skillId: 'skill_counter_guard',
          maxLevel: 3,
          requires: [{ skillId: 'skill_provoke', level: 1 }],
        },
      ],
    },
    equipableWeaponTypes: ['spear', 'sword'],
    equipableArmorTypes: ['heavy'],
    titleOptions: ['title_bulwark', 'title_vanguard'],
  },
  // 魔導士: 火・氷・雷の属性魔法で敵を殲滅する後衛アタッカー。
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
        { skillId: 'passive_mage_staff_mastery', maxLevel: 3 },
        { skillId: 'passive_mage_tp_boost', maxLevel: 3 },
        {
          skillId: 'skill_fire_storm',
          maxLevel: 5,
          requires: [{ skillId: 'skill_fire_bolt', level: 3 }],
        },
        { skillId: 'skill_summon_familiar', maxLevel: 2 },
      ],
    },
    equipableWeaponTypes: ['staff'],
    equipableArmorTypes: ['clothes'],
    titleOptions: ['title_pyromancer', 'title_sage'],
  },
  // 狩人: 弓の射撃・部位封じ・召喚獣・救護をこなす器用な後衛。
  class_ranger: {
    id: 'class_ranger',
    name: '狩人',
    skillTree: {
      skills: [
        { skillId: 'skill_aimed_shot', maxLevel: 5 },
        { skillId: 'passive_ranger_bow_mastery', maxLevel: 3 },
        { skillId: 'passive_ranger_agi_boost', maxLevel: 3 },
        { skillId: 'skill_spread_shot', maxLevel: 5 },
        { skillId: 'skill_leg_snipe', maxLevel: 3 },
        { skillId: 'skill_arm_snipe', maxLevel: 3 },
        {
          skillId: 'skill_head_snipe',
          maxLevel: 3,
          requires: [{ skillId: 'skill_aimed_shot', level: 1 }],
        },
        { skillId: 'skill_first_aid', maxLevel: 3 },
        { skillId: 'skill_summon_wolf', maxLevel: 3 },
      ],
    },
    equipableWeaponTypes: ['bow', 'fist'],
    equipableArmorTypes: ['light', 'clothes'],
    titleOptions: ['title_sniper', 'title_tracker'],
  },

  // 薬師: 回復・状態異常治療・防御支援の要となるメインヒーラー。
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
        { skillId: 'passive_medic_tp_boost', maxLevel: 3 },
        { skillId: 'passive_medic_mdef_boost', maxLevel: 3 },
        { skillId: 'skill_refresh_herb', maxLevel: 3 },
        { skillId: 'skill_poison_smoke', maxLevel: 3 },
      ],
    },
    equipableWeaponTypes: ['staff', 'fist'],
    equipableArmorTypes: ['clothes', 'light'],
    titleOptions: ['title_saint', 'title_apothecary'],
  },
  // 剣舞士: 舞と歌でパーティを強化・回復する支援職。
  class_dancer: {
    id: 'class_dancer',
    name: '剣舞士',
    skillTree: {
      skills: [
        { skillId: 'skill_war_dance', maxLevel: 3 },
        { skillId: 'skill_evasion_dance', maxLevel: 3 },
        { skillId: 'skill_weaken_song', maxLevel: 3 },
        { skillId: 'passive_dancer_agi_boost', maxLevel: 3 },
        { skillId: 'passive_dancer_tp_boost', maxLevel: 3 },
        { skillId: 'skill_guard_dance', maxLevel: 3 },
        {
          skillId: 'skill_healing_song',
          maxLevel: 3,
          requires: [{ skillId: 'skill_war_dance', level: 1 }],
        },
      ],
    },
    equipableWeaponTypes: ['sword', 'fist'],
    equipableArmorTypes: ['light', 'clothes'],
    titleOptions: ['title_blade_dancer', 'title_muse'],
  },
  // 拳聖: 素手の多段攻撃・部位封じ・反撃を操る近接アタッカー。
  class_monk: {
    id: 'class_monk',
    name: '拳聖',
    skillTree: {
      skills: [
        { skillId: 'skill_triple_strike', maxLevel: 5 },
        { skillId: 'passive_monk_fist_mastery', maxLevel: 3 },
        { skillId: 'passive_monk_crit_boost', maxLevel: 3 },
        { skillId: 'skill_focus_ki', maxLevel: 3 },
        { skillId: 'skill_iron_body', maxLevel: 3 },
        {
          skillId: 'skill_arm_break',
          maxLevel: 5,
          requires: [{ skillId: 'skill_triple_strike', level: 2 }],
        },
        {
          skillId: 'skill_cross_counter',
          maxLevel: 3,
          requires: [{ skillId: 'skill_focus_ki', level: 1 }],
        },
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
        { skillId: 'passive_hexer_matk_boost', maxLevel: 3 },
        { skillId: 'passive_hexer_mdef_boost', maxLevel: 3 },
        { skillId: 'skill_blind_hex', maxLevel: 3 },
        { skillId: 'skill_armor_hex', maxLevel: 3 },
      ],
    },
    equipableWeaponTypes: ['staff'],
    equipableArmorTypes: ['clothes'],
    titleOptions: ['title_plague', 'title_warlock'],
  },
  // 降霊術士: 死霊を召喚・使役し、障壁と爆裂で戦う変則召喚職。
  class_summoner: {
    id: 'class_summoner',
    name: '降霊術士',
    skillTree: {
      skills: [
        { skillId: 'skill_call_wraith', maxLevel: 3 },
        { skillId: 'skill_soul_barrier', maxLevel: 3 },
        { skillId: 'passive_summoner_staff_mastery', maxLevel: 3 },
        { skillId: 'passive_summoner_tp_boost', maxLevel: 3 },
        {
          skillId: 'skill_call_sentinel',
          maxLevel: 3,
          requires: [{ skillId: 'skill_call_wraith', level: 1 }],
        },
        {
          skillId: 'skill_soul_burst',
          maxLevel: 5,
          requires: [{ skillId: 'passive_summoner_staff_mastery', level: 1 }],
        },
      ],
    },
    equipableWeaponTypes: ['staff'],
    equipableArmorTypes: ['clothes', 'light'],
    titleOptions: ['title_necromancer', 'title_puppeteer'],
  },
};
