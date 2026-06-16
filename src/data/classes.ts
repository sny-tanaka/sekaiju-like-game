import type { ClassId, ClassMaster } from '@/domain/types';

// ============================================================================
// 職業マスター（[01 §4]）。本家『世界樹の迷宮V』相当の厚み（各20前後・4段）。
// スキルツリーは T1（前提なし）→ T2（T1 を Lv2-3）→ T3（T2 を Lv3）→ T4（T3 を Lv3・奥義）。
// 各ツリーの先頭ノードは作成/転職時に Lv1 で無料付与される起点アクティブ（charProgress）。
// 役割の幅は本家の職業類型を参考に拡充（固有名詞は本作オリジナル）。
// ============================================================================

export const CLASSES: Record<ClassId, ClassMaster> = {
  // 戦士: 剣/斧の連携追撃・反撃を備えた前衛物理アタッカー。
  class_warrior: {
    id: 'class_warrior',
    name: '戦士',
    description: '剣と斧の連携追撃・反撃を備えた前衛物理アタッカー。剣／斧で攻め筋が分岐する。',
    skillTree: {
      skills: [
        { skillId: 'skill_power_slash', maxLevel: 5 },
        { skillId: 'passive_warrior_blade_mastery', maxLevel: 3 },
        { skillId: 'passive_warrior_axe_mastery', maxLevel: 3 },
        { skillId: 'passive_warrior_phys_boost', maxLevel: 3 },
        { skillId: 'skill_guard_stance', maxLevel: 3 },
        { skillId: 'skill_warrior_war_cry', maxLevel: 3 },
        {
          skillId: 'skill_cleave',
          maxLevel: 5,
          requires: [{ skillId: 'skill_power_slash', level: 2 }],
        },
        {
          skillId: 'skill_warrior_double_slash',
          maxLevel: 5,
          requires: [{ skillId: 'passive_warrior_blade_mastery', level: 2 }],
        },
        {
          skillId: 'skill_warrior_heavy_swing',
          maxLevel: 5,
          requires: [{ skillId: 'passive_warrior_axe_mastery', level: 2 }],
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
        {
          skillId: 'passive_warrior_crit_focus',
          maxLevel: 3,
          requires: [{ skillId: 'passive_warrior_phys_boost', level: 2 }],
        },
        {
          skillId: 'skill_warrior_blade_storm',
          maxLevel: 5,
          requires: [{ skillId: 'skill_cleave', level: 3 }],
        },
        {
          skillId: 'skill_warrior_executioner',
          maxLevel: 5,
          requires: [{ skillId: 'skill_warrior_double_slash', level: 3 }],
        },
        {
          skillId: 'passive_warrior_vitality',
          maxLevel: 3,
          requires: [{ skillId: 'passive_warrior_crit_focus', level: 3 }],
        },
        {
          skillId: 'skill_warrior_flame_blade',
          maxLevel: 5,
          requires: [{ skillId: 'skill_warrior_double_slash', level: 2 }],
        },
        {
          skillId: 'skill_warrior_armor_crush',
          maxLevel: 5,
          requires: [{ skillId: 'skill_warrior_heavy_swing', level: 3 }],
        },
        {
          skillId: 'passive_warrior_dual_edge',
          maxLevel: 3,
          requires: [{ skillId: 'passive_warrior_crit_focus', level: 2 }],
        },
        {
          skillId: 'skill_warrior_blade_dance',
          maxLevel: 5,
          requires: [{ skillId: 'skill_warrior_flame_blade', level: 3 }],
        },
        {
          skillId: 'skill_warrior_savage_blow',
          maxLevel: 5,
          requires: [{ skillId: 'skill_warrior_armor_crush', level: 3 }],
        },
        {
          skillId: 'skill_warrior_meteor_strike',
          maxLevel: 5,
          requires: [{ skillId: 'skill_warrior_blade_storm', level: 3 }],
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
    description: '盾と挑発で敵を引きつけ、障壁と反撃で味方を守る前衛タンク。',
    skillTree: {
      skills: [
        { skillId: 'skill_shield_bash', maxLevel: 5 },
        { skillId: 'passive_guardian_shield_mastery', maxLevel: 3 },
        { skillId: 'passive_guardian_spear_mastery', maxLevel: 3 },
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
        {
          skillId: 'skill_guardian_shield_press',
          maxLevel: 5,
          requires: [{ skillId: 'skill_shield_bash', level: 2 }],
        },
        {
          skillId: 'skill_guardian_taunt_roar',
          maxLevel: 3,
          requires: [{ skillId: 'skill_provoke', level: 2 }],
        },
        {
          skillId: 'passive_guardian_mdef_boost',
          maxLevel: 3,
          requires: [{ skillId: 'passive_guardian_hp_boost', level: 2 }],
        },
        {
          skillId: 'skill_guardian_retribution',
          maxLevel: 3,
          requires: [{ skillId: 'skill_counter_guard', level: 2 }],
        },
        {
          skillId: 'skill_guardian_spear_thrust',
          maxLevel: 5,
          requires: [{ skillId: 'passive_guardian_spear_mastery', level: 2 }],
        },
        {
          skillId: 'skill_guardian_aegis',
          maxLevel: 3,
          requires: [{ skillId: 'skill_line_guard', level: 3 }],
        },
        {
          skillId: 'passive_guardian_iron_will',
          maxLevel: 3,
          requires: [{ skillId: 'passive_guardian_mdef_boost', level: 3 }],
        },
        {
          skillId: 'skill_guardian_shield_throw',
          maxLevel: 5,
          requires: [{ skillId: 'skill_guardian_shield_press', level: 3 }],
        },
        {
          skillId: 'skill_guardian_bulwark_stance',
          maxLevel: 3,
          requires: [{ skillId: 'skill_guardian_taunt_roar', level: 3 }],
        },
        {
          skillId: 'skill_guardian_iron_counter',
          maxLevel: 3,
          requires: [{ skillId: 'skill_guardian_retribution', level: 3 }],
        },
        {
          skillId: 'skill_guardian_phalanx',
          maxLevel: 3,
          requires: [{ skillId: 'skill_guardian_aegis', level: 3 }],
        },
        {
          skillId: 'skill_guardian_great_wall',
          maxLevel: 3,
          requires: [{ skillId: 'skill_guardian_phalanx', level: 2 }],
        },
        {
          skillId: 'skill_guardian_dragon_lance',
          maxLevel: 5,
          requires: [{ skillId: 'skill_guardian_spear_thrust', level: 3 }],
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
    description: '火・氷・雷の属性魔法で敵を殲滅する後衛アタッカー。',
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
        { skillId: 'skill_mage_focus', maxLevel: 3 },
        {
          skillId: 'skill_fire_storm',
          maxLevel: 5,
          requires: [{ skillId: 'skill_fire_bolt', level: 3 }],
        },
        {
          skillId: 'skill_mage_ice_storm',
          maxLevel: 5,
          requires: [{ skillId: 'skill_ice_bolt', level: 3 }],
        },
        {
          skillId: 'skill_mage_volt_storm',
          maxLevel: 5,
          requires: [{ skillId: 'skill_volt_bolt', level: 3 }],
        },
        {
          skillId: 'passive_mage_matk_boost',
          maxLevel: 3,
          requires: [{ skillId: 'passive_mage_staff_mastery', level: 2 }],
        },
        {
          skillId: 'skill_summon_familiar',
          maxLevel: 2,
          requires: [{ skillId: 'passive_mage_tp_boost', level: 2 }],
        },
        {
          skillId: 'skill_mage_mana_charge',
          maxLevel: 5,
          requires: [{ skillId: 'passive_mage_tp_boost', level: 2 }],
        },
        {
          skillId: 'skill_mage_meteor',
          maxLevel: 5,
          requires: [{ skillId: 'skill_fire_storm', level: 3 }],
        },
        {
          skillId: 'skill_mage_thunderbolt',
          maxLevel: 5,
          requires: [{ skillId: 'skill_mage_volt_storm', level: 3 }],
        },
        {
          skillId: 'passive_mage_spell_focus',
          maxLevel: 3,
          requires: [{ skillId: 'passive_mage_matk_boost', level: 3 }],
        },
        {
          skillId: 'skill_mage_fire_lance',
          maxLevel: 5,
          requires: [{ skillId: 'skill_fire_storm', level: 2 }],
        },
        {
          skillId: 'skill_mage_frost_lance',
          maxLevel: 5,
          requires: [{ skillId: 'skill_mage_ice_storm', level: 2 }],
        },
        {
          skillId: 'skill_mage_volt_lance',
          maxLevel: 5,
          requires: [{ skillId: 'skill_mage_volt_storm', level: 2 }],
        },
        {
          skillId: 'passive_mage_overload',
          maxLevel: 3,
          requires: [{ skillId: 'passive_mage_matk_boost', level: 2 }],
        },
        {
          skillId: 'skill_mage_absolute_zero',
          maxLevel: 5,
          requires: [{ skillId: 'skill_mage_frost_lance', level: 3 }],
        },
        {
          skillId: 'skill_mage_ragnarok',
          maxLevel: 5,
          requires: [{ skillId: 'skill_mage_thunderbolt', level: 3 }],
        },
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
    description: '弓の射撃・部位封じ・召喚獣・救護をこなす器用な後衛。',
    skillTree: {
      skills: [
        { skillId: 'skill_aimed_shot', maxLevel: 5 },
        { skillId: 'skill_spread_shot', maxLevel: 5 },
        { skillId: 'skill_leg_snipe', maxLevel: 3 },
        { skillId: 'skill_arm_snipe', maxLevel: 3 },
        { skillId: 'passive_ranger_bow_mastery', maxLevel: 3 },
        { skillId: 'passive_ranger_agi_boost', maxLevel: 3 },
        {
          skillId: 'skill_head_snipe',
          maxLevel: 3,
          requires: [{ skillId: 'skill_aimed_shot', level: 2 }],
        },
        {
          skillId: 'skill_ranger_piercing_arrow',
          maxLevel: 5,
          requires: [{ skillId: 'skill_aimed_shot', level: 3 }],
        },
        {
          skillId: 'skill_ranger_double_shot',
          maxLevel: 5,
          requires: [{ skillId: 'skill_aimed_shot', level: 2 }],
        },
        {
          skillId: 'skill_ranger_rain_of_arrows',
          maxLevel: 5,
          requires: [{ skillId: 'skill_spread_shot', level: 2 }],
        },
        {
          skillId: 'skill_ranger_pin_shot',
          maxLevel: 3,
          requires: [{ skillId: 'skill_leg_snipe', level: 2 }],
        },
        {
          skillId: 'passive_ranger_eagle_eye',
          maxLevel: 3,
          requires: [{ skillId: 'passive_ranger_bow_mastery', level: 2 }],
        },
        {
          skillId: 'passive_ranger_swift_hands',
          maxLevel: 3,
          requires: [{ skillId: 'passive_ranger_bow_mastery', level: 2 }],
        },
        {
          skillId: 'skill_first_aid',
          maxLevel: 3,
          requires: [{ skillId: 'passive_ranger_agi_boost', level: 2 }],
        },
        {
          skillId: 'skill_summon_wolf',
          maxLevel: 3,
          requires: [{ skillId: 'passive_ranger_agi_boost', level: 2 }],
        },
        {
          skillId: 'skill_ranger_charged_shot',
          maxLevel: 5,
          requires: [{ skillId: 'skill_ranger_piercing_arrow', level: 3 }],
        },
        {
          skillId: 'skill_ranger_binding_volley',
          maxLevel: 3,
          requires: [{ skillId: 'skill_ranger_rain_of_arrows', level: 3 }],
        },
        {
          skillId: 'skill_ranger_hunters_mark',
          maxLevel: 3,
          requires: [{ skillId: 'passive_ranger_eagle_eye', level: 3 }],
        },
        {
          skillId: 'skill_ranger_falconry',
          maxLevel: 3,
          requires: [{ skillId: 'skill_summon_wolf', level: 3 }],
        },
        {
          skillId: 'skill_ranger_field_dressing',
          maxLevel: 3,
          requires: [{ skillId: 'skill_first_aid', level: 3 }],
        },
        {
          skillId: 'skill_ranger_volley_chase',
          maxLevel: 3,
          requires: [{ skillId: 'skill_ranger_double_shot', level: 3 }],
        },
        {
          skillId: 'passive_ranger_predator',
          maxLevel: 3,
          requires: [{ skillId: 'passive_ranger_swift_hands', level: 3 }],
        },
        {
          skillId: 'skill_ranger_apollo_shot',
          maxLevel: 5,
          requires: [{ skillId: 'skill_ranger_charged_shot', level: 3 }],
        },
        {
          skillId: 'skill_ranger_sky_volley',
          maxLevel: 5,
          requires: [{ skillId: 'skill_ranger_binding_volley', level: 3 }],
        },
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
    description: '回復・状態異常治療・防御支援の要となるメインヒーラー。',
    skillTree: {
      skills: [
        { skillId: 'skill_heal', maxLevel: 5 },
        { skillId: 'skill_protect_hymn', maxLevel: 3 },
        { skillId: 'skill_refresh_herb', maxLevel: 3 },
        { skillId: 'skill_poison_smoke', maxLevel: 3 },
        { skillId: 'passive_medic_tp_boost', maxLevel: 3 },
        { skillId: 'passive_medic_mdef_boost', maxLevel: 3 },
        {
          skillId: 'skill_mass_heal',
          maxLevel: 5,
          requires: [{ skillId: 'skill_heal', level: 2 }],
        },
        {
          skillId: 'skill_medic_full_heal',
          maxLevel: 5,
          requires: [{ skillId: 'skill_heal', level: 3 }],
        },
        {
          skillId: 'skill_medic_immune_hymn',
          maxLevel: 3,
          requires: [{ skillId: 'skill_protect_hymn', level: 2 }],
        },
        {
          skillId: 'skill_medic_blind_powder',
          maxLevel: 3,
          requires: [{ skillId: 'skill_poison_smoke', level: 2 }],
        },
        {
          skillId: 'skill_medic_sleep_mist',
          maxLevel: 3,
          requires: [{ skillId: 'skill_poison_smoke', level: 2 }],
        },
        {
          skillId: 'skill_medic_tp_tonic',
          maxLevel: 3,
          requires: [{ skillId: 'passive_medic_tp_boost', level: 2 }],
        },
        {
          skillId: 'passive_medic_mind_boost',
          maxLevel: 3,
          requires: [{ skillId: 'skill_heal', level: 2 }],
        },
        {
          skillId: 'passive_medic_healing_hands',
          maxLevel: 3,
          requires: [{ skillId: 'passive_medic_mdef_boost', level: 2 }],
        },
        {
          skillId: 'passive_medic_staff_mastery',
          maxLevel: 3,
          requires: [{ skillId: 'passive_medic_mdef_boost', level: 2 }],
        },
        {
          skillId: 'skill_medic_party_cure',
          maxLevel: 5,
          requires: [{ skillId: 'skill_mass_heal', level: 3 }],
        },
        {
          skillId: 'skill_medic_regen_balm',
          maxLevel: 5,
          requires: [{ skillId: 'skill_medic_full_heal', level: 3 }],
        },
        {
          skillId: 'skill_medic_paralysis_powder',
          maxLevel: 3,
          requires: [{ skillId: 'skill_medic_sleep_mist', level: 3 }],
        },
        {
          skillId: 'skill_medic_weakening_smoke',
          maxLevel: 3,
          requires: [{ skillId: 'skill_medic_blind_powder', level: 3 }],
        },
        {
          skillId: 'skill_medic_revive_draft',
          maxLevel: 3,
          requires: [{ skillId: 'skill_medic_tp_tonic', level: 3 }],
        },
        {
          skillId: 'passive_medic_vitality',
          maxLevel: 3,
          requires: [{ skillId: 'passive_medic_healing_hands', level: 3 }],
        },
        {
          skillId: 'skill_medic_salvation',
          maxLevel: 5,
          requires: [{ skillId: 'skill_medic_party_cure', level: 3 }],
        },
        {
          skillId: 'skill_medic_panacea',
          maxLevel: 5,
          requires: [{ skillId: 'skill_medic_regen_balm', level: 3 }],
        },
      ],
    },
    equipableWeaponTypes: ['staff', 'fist'],
    equipableArmorTypes: ['clothes', 'light'],
    titleOptions: ['title_saint', 'title_apothecary'],
  },
  // 剣舞士: 舞と歌でパーティを強化・回復し、剣舞で攻撃もこなす支援職。
  class_dancer: {
    id: 'class_dancer',
    name: '剣舞士',
    description: '舞と歌でパーティを強化・回復し、剣舞で攻撃もこなす支援職。',
    skillTree: {
      skills: [
        { skillId: 'skill_war_dance', maxLevel: 3 },
        { skillId: 'skill_evasion_dance', maxLevel: 3 },
        { skillId: 'skill_guard_dance', maxLevel: 3 },
        { skillId: 'skill_weaken_song', maxLevel: 3 },
        { skillId: 'passive_dancer_agi_boost', maxLevel: 3 },
        { skillId: 'passive_dancer_tp_boost', maxLevel: 3 },
        {
          skillId: 'skill_healing_song',
          maxLevel: 3,
          requires: [{ skillId: 'skill_war_dance', level: 1 }],
        },
        {
          skillId: 'skill_dancer_inspire_dance',
          maxLevel: 3,
          requires: [{ skillId: 'skill_war_dance', level: 2 }],
        },
        {
          skillId: 'skill_dancer_chant_of_valor',
          maxLevel: 3,
          requires: [{ skillId: 'skill_war_dance', level: 2 }],
        },
        {
          skillId: 'skill_dancer_grace_song',
          maxLevel: 3,
          requires: [{ skillId: 'skill_guard_dance', level: 2 }],
        },
        {
          skillId: 'skill_dancer_blade_waltz',
          maxLevel: 5,
          requires: [{ skillId: 'skill_evasion_dance', level: 2 }],
        },
        {
          skillId: 'skill_dancer_dual_blade',
          maxLevel: 5,
          requires: [{ skillId: 'skill_evasion_dance', level: 2 }],
        },
        {
          skillId: 'skill_dancer_curse_dance',
          maxLevel: 3,
          requires: [{ skillId: 'skill_weaken_song', level: 2 }],
        },
        {
          skillId: 'passive_dancer_grace',
          maxLevel: 3,
          requires: [{ skillId: 'passive_dancer_agi_boost', level: 2 }],
        },
        {
          skillId: 'passive_dancer_blade_mastery',
          maxLevel: 3,
          requires: [{ skillId: 'passive_dancer_agi_boost', level: 2 }],
        },
        {
          skillId: 'skill_dancer_revival_dance',
          maxLevel: 3,
          requires: [{ skillId: 'skill_healing_song', level: 3 }],
        },
        {
          skillId: 'skill_dancer_mana_song',
          maxLevel: 3,
          requires: [{ skillId: 'skill_dancer_inspire_dance', level: 3 }],
        },
        {
          skillId: 'skill_dancer_lullaby_song',
          maxLevel: 3,
          requires: [{ skillId: 'skill_dancer_curse_dance', level: 3 }],
        },
        {
          skillId: 'skill_dancer_blade_chase',
          maxLevel: 3,
          requires: [{ skillId: 'skill_dancer_dual_blade', level: 3 }],
        },
        {
          skillId: 'passive_dancer_resonance',
          maxLevel: 3,
          requires: [{ skillId: 'passive_dancer_grace', level: 3 }],
        },
        {
          skillId: 'passive_dancer_vigor',
          maxLevel: 3,
          requires: [{ skillId: 'passive_dancer_blade_mastery', level: 3 }],
        },
        {
          skillId: 'skill_dancer_grand_finale',
          maxLevel: 3,
          requires: [{ skillId: 'skill_dancer_revival_dance', level: 3 }],
        },
        {
          skillId: 'skill_dancer_storm_waltz',
          maxLevel: 5,
          requires: [{ skillId: 'skill_dancer_blade_waltz', level: 3 }],
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
    description: '素手の多段攻撃・部位封じ・反撃を操る近接アタッカー。',
    skillTree: {
      skills: [
        { skillId: 'skill_triple_strike', maxLevel: 5 },
        { skillId: 'skill_monk_palm_strike', maxLevel: 5 },
        { skillId: 'passive_monk_fist_mastery', maxLevel: 3 },
        { skillId: 'passive_monk_crit_boost', maxLevel: 3 },
        { skillId: 'passive_monk_hp_boost', maxLevel: 3 },
        { skillId: 'skill_focus_ki', maxLevel: 3 },
        {
          skillId: 'skill_arm_break',
          maxLevel: 5,
          requires: [{ skillId: 'skill_triple_strike', level: 2 }],
        },
        {
          skillId: 'skill_monk_leg_sweep',
          maxLevel: 3,
          requires: [{ skillId: 'skill_monk_palm_strike', level: 2 }],
        },
        {
          skillId: 'skill_monk_flurry',
          maxLevel: 5,
          requires: [{ skillId: 'skill_triple_strike', level: 3 }],
        },
        {
          skillId: 'skill_monk_double_palm',
          maxLevel: 5,
          requires: [{ skillId: 'skill_monk_palm_strike', level: 3 }],
        },
        {
          skillId: 'skill_monk_ki_guard',
          maxLevel: 3,
          requires: [{ skillId: 'skill_focus_ki', level: 2 }],
        },
        {
          skillId: 'skill_cross_counter',
          maxLevel: 3,
          requires: [{ skillId: 'skill_focus_ki', level: 1 }],
        },
        {
          skillId: 'passive_monk_eva_boost',
          maxLevel: 3,
          requires: [{ skillId: 'passive_monk_crit_boost', level: 2 }],
        },
        {
          skillId: 'passive_monk_counter_mastery',
          maxLevel: 3,
          requires: [{ skillId: 'passive_monk_fist_mastery', level: 2 }],
        },
        {
          skillId: 'skill_monk_head_smash',
          maxLevel: 3,
          requires: [{ skillId: 'skill_monk_leg_sweep', level: 3 }],
        },
        {
          skillId: 'skill_monk_pressure_point',
          maxLevel: 3,
          requires: [{ skillId: 'skill_arm_break', level: 3 }],
        },
        {
          skillId: 'skill_monk_whirlwind_kick',
          maxLevel: 5,
          requires: [{ skillId: 'skill_monk_double_palm', level: 3 }],
        },
        {
          skillId: 'skill_iron_body',
          maxLevel: 3,
          requires: [{ skillId: 'skill_monk_ki_guard', level: 3 }],
        },
        {
          skillId: 'skill_monk_breathing',
          maxLevel: 3,
          requires: [{ skillId: 'passive_monk_counter_mastery', level: 3 }],
        },
        {
          skillId: 'skill_monk_rising_dragon',
          maxLevel: 5,
          requires: [{ skillId: 'skill_monk_flurry', level: 3 }],
        },
        {
          skillId: 'skill_monk_seven_star',
          maxLevel: 5,
          requires: [{ skillId: 'skill_monk_whirlwind_kick', level: 3 }],
        },
        {
          skillId: 'skill_monk_demon_palm',
          maxLevel: 5,
          requires: [{ skillId: 'skill_monk_pressure_point', level: 3 }],
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
    description: '状態異常と弱体で敵を崩すデバッファー。',
    skillTree: {
      skills: [
        { skillId: 'skill_venom_hex', maxLevel: 5 },
        { skillId: 'skill_sleep_hex', maxLevel: 3 },
        { skillId: 'skill_weaken_hex', maxLevel: 3 },
        { skillId: 'passive_hexer_matk_boost', maxLevel: 3 },
        { skillId: 'passive_hexer_mdef_boost', maxLevel: 3 },
        { skillId: 'passive_hexer_acc_boost', maxLevel: 3 },
        {
          skillId: 'skill_hexer_paralyze_hex',
          maxLevel: 5,
          requires: [{ skillId: 'skill_venom_hex', level: 2 }],
        },
        {
          skillId: 'skill_blind_hex',
          maxLevel: 3,
          requires: [{ skillId: 'skill_sleep_hex', level: 2 }],
        },
        {
          skillId: 'skill_armor_hex',
          maxLevel: 3,
          requires: [{ skillId: 'skill_weaken_hex', level: 2 }],
        },
        {
          skillId: 'skill_hexer_eva_hex',
          maxLevel: 3,
          requires: [{ skillId: 'skill_weaken_hex', level: 2 }],
        },
        {
          skillId: 'skill_hexer_acc_hex',
          maxLevel: 3,
          requires: [{ skillId: 'skill_venom_hex', level: 3 }],
        },
        {
          skillId: 'skill_hexer_mass_venom',
          maxLevel: 3,
          requires: [{ skillId: 'skill_venom_hex', level: 3 }],
        },
        {
          skillId: 'skill_hexer_drowsy_hex',
          maxLevel: 3,
          requires: [{ skillId: 'skill_sleep_hex', level: 2 }],
        },
        {
          skillId: 'passive_hexer_curse_lore',
          maxLevel: 3,
          requires: [{ skillId: 'passive_hexer_matk_boost', level: 2 }],
        },
        {
          skillId: 'skill_hexer_doom_hex',
          maxLevel: 5,
          requires: [{ skillId: 'skill_hexer_paralyze_hex', level: 3 }],
        },
        {
          skillId: 'skill_hexer_curse_field',
          maxLevel: 3,
          requires: [{ skillId: 'skill_hexer_mass_venom', level: 3 }],
        },
        {
          skillId: 'skill_hexer_mass_paralyze',
          maxLevel: 3,
          requires: [{ skillId: 'skill_hexer_paralyze_hex', level: 3 }],
        },
        {
          skillId: 'skill_hexer_def_hex',
          maxLevel: 3,
          requires: [{ skillId: 'skill_armor_hex', level: 3 }],
        },
        {
          skillId: 'skill_hexer_dark_bolt',
          maxLevel: 5,
          requires: [{ skillId: 'passive_hexer_curse_lore', level: 3 }],
        },
        {
          skillId: 'skill_hexer_nightmare',
          maxLevel: 5,
          requires: [{ skillId: 'skill_hexer_drowsy_hex', level: 3 }],
        },
        {
          skillId: 'skill_hexer_calamity',
          maxLevel: 5,
          requires: [{ skillId: 'skill_hexer_mass_paralyze', level: 3 }],
        },
        {
          skillId: 'skill_hexer_mdef_hex',
          maxLevel: 3,
          requires: [{ skillId: 'skill_hexer_def_hex', level: 3 }],
        },
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
    description: '死霊を召喚・使役し、障壁と爆裂で戦う変則召喚職。',
    skillTree: {
      skills: [
        { skillId: 'skill_call_wraith', maxLevel: 3 },
        { skillId: 'skill_soul_barrier', maxLevel: 3 },
        { skillId: 'skill_summoner_soul_drain', maxLevel: 5 },
        { skillId: 'passive_summoner_staff_mastery', maxLevel: 3 },
        { skillId: 'passive_summoner_tp_boost', maxLevel: 3 },
        { skillId: 'passive_summoner_mdef_boost', maxLevel: 3 },
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
        {
          skillId: 'skill_summoner_call_familiar',
          maxLevel: 2,
          requires: [{ skillId: 'skill_call_wraith', level: 2 }],
        },
        {
          skillId: 'skill_summoner_grave_chill',
          maxLevel: 5,
          requires: [{ skillId: 'skill_summoner_soul_drain', level: 2 }],
        },
        {
          skillId: 'skill_summoner_tp_offering',
          maxLevel: 3,
          requires: [{ skillId: 'passive_summoner_tp_boost', level: 2 }],
        },
        {
          skillId: 'skill_summoner_necro_bolt',
          maxLevel: 5,
          requires: [{ skillId: 'skill_summoner_soul_drain', level: 2 }],
        },
        {
          skillId: 'skill_summoner_spirit_veil',
          maxLevel: 3,
          requires: [{ skillId: 'passive_summoner_mdef_boost', level: 2 }],
        },
        {
          skillId: 'skill_summoner_oblivion',
          maxLevel: 5,
          requires: [{ skillId: 'skill_soul_burst', level: 3 }],
        },
        {
          skillId: 'skill_summoner_spirit_chase',
          maxLevel: 3,
          requires: [{ skillId: 'skill_summoner_soul_drain', level: 3 }],
        },
        {
          skillId: 'skill_summoner_grave_field',
          maxLevel: 5,
          requires: [{ skillId: 'skill_summoner_grave_chill', level: 3 }],
        },
        {
          skillId: 'skill_summoner_soul_ward',
          maxLevel: 3,
          requires: [{ skillId: 'skill_summoner_spirit_veil', level: 3 }],
        },
        {
          skillId: 'passive_summoner_spirit_lore',
          maxLevel: 3,
          requires: [{ skillId: 'skill_summoner_necro_bolt', level: 3 }],
        },
        {
          skillId: 'skill_summoner_annihilation',
          maxLevel: 5,
          requires: [{ skillId: 'skill_summoner_oblivion', level: 3 }],
        },
        {
          skillId: 'skill_summoner_soul_render',
          maxLevel: 5,
          requires: [{ skillId: 'passive_summoner_spirit_lore', level: 3 }],
        },
        {
          skillId: 'skill_summoner_call_revenant',
          maxLevel: 3,
          requires: [{ skillId: 'skill_summoner_soul_ward', level: 3 }],
        },
      ],
    },
    equipableWeaponTypes: ['staff'],
    equipableArmorTypes: ['clothes', 'light'],
    titleOptions: ['title_necromancer', 'title_puppeteer'],
  },
};
