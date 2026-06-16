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
  // 採集スキル（[04 §5]・探索用パッシブ。戦闘では使わない）
  skill_mining: {
    id: 'skill_mining',
    name: '採掘',
    description: '採掘ポイントから鉱石を採取できる。',
  },
  skill_gathering: {
    id: 'skill_gathering',
    name: '採取',
    description: '採取ポイントから薬草などを集められる。',
  },
  skill_logging: {
    id: 'skill_logging',
    name: '伐採',
    description: '伐採ポイントから木材を得られる。',
  },
  skill_fishing: {
    id: 'skill_fishing',
    name: '釣り',
    description: '釣りポイントから食材（魚）を得られる。',
  },
  skill_harvest: {
    id: 'skill_harvest',
    name: '収穫',
    description: '収穫ポイントから食材（木の実）を得られる。',
  },
  skill_hunting: {
    id: 'skill_hunting',
    name: '狩猟',
    description: '狩猟ポイントから食材（肉）を得られる。',
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
  skill_union_moonlight: {
    id: 'skill_union_moonlight',
    name: '月光の癒し',
    description: '味方全体を回復し魔法防御を高めるユニオンスキル（ルーナ）。',
  },
  skill_union_quake: {
    id: 'skill_union_quake',
    name: '大震撃',
    description: '敵全体に大きな壊打を与えるユニオンスキル（ゴラン・2名）。',
  },

  // ---- Phase 6-2 追加スキル ----
  skill_cleave: { id: 'skill_cleave', name: 'なぎ払い', description: '敵全体に斬撃ダメージ。' },
  skill_volt_bolt: {
    id: 'skill_volt_bolt',
    name: 'ボルトショック',
    description: '単体に雷属性魔法ダメージ。',
  },
  // 薬師
  skill_heal: { id: 'skill_heal', name: 'ヒール', description: '味方1人の HP を回復する。' },
  skill_mass_heal: {
    id: 'skill_mass_heal',
    name: 'マスヒール',
    description: '味方全体の HP を回復する。',
  },
  skill_protect_hymn: {
    id: 'skill_protect_hymn',
    name: '守りの聖歌',
    description: '味方全体の魔法防御を高める。',
  },
  // 剣舞士
  skill_war_dance: {
    id: 'skill_war_dance',
    name: '戦いの舞',
    description: '味方全体の物理攻撃力を高める。',
  },
  skill_evasion_dance: {
    id: 'skill_evasion_dance',
    name: '回避の舞',
    description: '味方全体の回避を高める。',
  },
  skill_weaken_song: {
    id: 'skill_weaken_song',
    name: '弱体の歌',
    description: '敵全体の物理攻撃力を下げる。',
  },
  // 拳聖
  skill_triple_strike: {
    id: 'skill_triple_strike',
    name: '三段突き',
    description: '単体に壊打の3連撃。',
  },
  skill_focus_ki: { id: 'skill_focus_ki', name: '練気', description: '自身の物理攻撃力を高める。' },
  skill_iron_body: { id: 'skill_iron_body', name: '鉄身', description: '自身の物理防御を高める。' },
  // 呪術士
  skill_venom_hex: {
    id: 'skill_venom_hex',
    name: '毒の呪',
    description: '単体に魔法ダメージを与え毒を付与する。',
  },
  skill_sleep_hex: {
    id: 'skill_sleep_hex',
    name: '眠りの呪',
    description: '敵全体を眠らせる（被ダメで解除）。',
  },
  skill_weaken_hex: {
    id: 'skill_weaken_hex',
    name: '魔弱の呪',
    description: '単体の魔法攻撃力を下げる。',
  },

  // ============================================================================
  // Phase 6-2b: パッシブ・連携追撃・反撃・障壁・治療などの追加スキル
  // ============================================================================

  // ---- 種族パッシブ ----
  passive_race_human_adapt: {
    id: 'passive_race_human_adapt',
    name: '適応力',
    description: '最大HPと命中が上昇する（常時）。',
  },
  passive_race_garon_might: {
    id: 'passive_race_garon_might',
    name: '剛力',
    description: '物理攻撃力と最大HPが上昇する（常時）。',
  },
  passive_race_pix_focus: {
    id: 'passive_race_pix_focus',
    name: '魔力集中',
    description: '魔法攻撃力と最大TPが上昇する（常時）。',
  },
  passive_race_therian_swift: {
    id: 'passive_race_therian_swift',
    name: '俊足',
    description: '命中と回避が上昇する（常時）。',
  },
  passive_race_lunar_grace: {
    id: 'passive_race_lunar_grace',
    name: '月の加護',
    description: '魔法防御と最大TPが上昇する（常時）。',
  },
  passive_race_golan_fortitude: {
    id: 'passive_race_golan_fortitude',
    name: '頑健',
    description: '物理防御と最大HPが上昇する（常時）。',
  },

  // ---- 職業パッシブ ----
  passive_warrior_blade_mastery: {
    id: 'passive_warrior_blade_mastery',
    name: '剣の心得',
    description: '剣を装備中、物理攻撃力が上昇する（常時）。',
  },
  passive_warrior_phys_boost: {
    id: 'passive_warrior_phys_boost',
    name: '剛腕',
    description: '物理攻撃力が上昇する（常時）。',
  },
  passive_guardian_shield_mastery: {
    id: 'passive_guardian_shield_mastery',
    name: '盾の心得',
    description: '物理防御が上昇する（常時）。',
  },
  passive_guardian_hp_boost: {
    id: 'passive_guardian_hp_boost',
    name: '頑強',
    description: '最大HPが上昇する（常時）。',
  },
  passive_mage_staff_mastery: {
    id: 'passive_mage_staff_mastery',
    name: '杖の心得',
    description: '杖を装備中、魔法攻撃力が上昇する（常時）。',
  },
  passive_mage_tp_boost: {
    id: 'passive_mage_tp_boost',
    name: '精神統一',
    description: '最大TPが上昇する（常時）。',
  },
  passive_ranger_bow_mastery: {
    id: 'passive_ranger_bow_mastery',
    name: '弓の心得',
    description: '弓を装備中、物理攻撃力が上昇する（常時）。',
  },
  passive_ranger_agi_boost: {
    id: 'passive_ranger_agi_boost',
    name: '機敏',
    description: '命中と回避が上昇する（常時）。',
  },
  passive_medic_tp_boost: {
    id: 'passive_medic_tp_boost',
    name: '薬学の知識',
    description: '最大TPが上昇する（常時）。',
  },
  passive_medic_mdef_boost: {
    id: 'passive_medic_mdef_boost',
    name: '抗体',
    description: '魔法防御が上昇する（常時）。',
  },
  passive_dancer_agi_boost: {
    id: 'passive_dancer_agi_boost',
    name: '舞踏の足捌き',
    description: '回避と命中が上昇する（常時）。',
  },
  passive_dancer_tp_boost: {
    id: 'passive_dancer_tp_boost',
    name: '高揚',
    description: '最大TPが上昇する（常時）。',
  },
  passive_monk_fist_mastery: {
    id: 'passive_monk_fist_mastery',
    name: '拳の心得',
    description: '拳を装備中、物理攻撃力が上昇する（常時）。',
  },
  passive_monk_crit_boost: {
    id: 'passive_monk_crit_boost',
    name: '練達',
    description: 'クリティカル率が上昇する（常時）。',
  },
  passive_hexer_matk_boost: {
    id: 'passive_hexer_matk_boost',
    name: '呪詛',
    description: '魔法攻撃力が上昇する（常時）。',
  },
  passive_hexer_mdef_boost: {
    id: 'passive_hexer_mdef_boost',
    name: '瘴気の衣',
    description: '魔法防御が上昇する（常時）。',
  },
  passive_summoner_staff_mastery: {
    id: 'passive_summoner_staff_mastery',
    name: '霊媒の心得',
    description: '杖を装備中、魔法攻撃力が上昇する（常時）。',
  },
  passive_summoner_tp_boost: {
    id: 'passive_summoner_tp_boost',
    name: '死霊術の知識',
    description: '最大TPが上昇する（常時）。',
  },

  // ---- 称号パッシブ ----
  passive_title_berserker: {
    id: 'passive_title_berserker',
    name: '狂気の力',
    description: '物理攻撃力とクリティカル率が上昇する（常時）。',
  },
  passive_title_sentinel: {
    id: 'passive_title_sentinel',
    name: '警戒',
    description: '物理防御と命中が上昇する（常時）。',
  },
  passive_title_bulwark: {
    id: 'passive_title_bulwark',
    name: '鉄壁',
    description: '物理防御と最大HPが上昇する（常時）。',
  },
  passive_title_vanguard: {
    id: 'passive_title_vanguard',
    name: '突撃',
    description: '物理攻撃力が大きく上昇する（常時）。',
  },
  passive_title_pyromancer: {
    id: 'passive_title_pyromancer',
    name: '業火',
    description: '魔法攻撃力が大きく上昇する（常時）。',
  },
  passive_title_sage: {
    id: 'passive_title_sage',
    name: '英知',
    description: '最大TPと魔法防御が上昇する（常時）。',
  },
  passive_title_sniper: {
    id: 'passive_title_sniper',
    name: '精密射撃',
    description: 'クリティカル率と命中が上昇する（常時）。',
  },
  passive_title_tracker: {
    id: 'passive_title_tracker',
    name: '隠密',
    description: '回避が大きく上昇する（常時）。',
  },
  passive_title_saint: {
    id: 'passive_title_saint',
    name: '慈愛',
    description: '最大TPと魔法防御が上昇する（常時）。',
  },
  passive_title_blade_dancer: {
    id: 'passive_title_blade_dancer',
    name: '剣の舞',
    description: '物理攻撃力と回避が上昇する（常時）。',
  },
  passive_title_muse: {
    id: 'passive_title_muse',
    name: '詩心',
    description: '最大TPが大きく上昇する（常時）。',
  },
  passive_title_zen: {
    id: 'passive_title_zen',
    name: '不動',
    description: '物理防御と最大HPが上昇する（常時）。',
  },
  passive_title_plague: {
    id: 'passive_title_plague',
    name: '疫病',
    description: '魔法攻撃力が大きく上昇する（常時）。',
  },
  passive_title_warlock: {
    id: 'passive_title_warlock',
    name: '魔道の極み',
    description: '魔法攻撃力とクリティカル率が上昇する（常時）。',
  },
  passive_title_necromancer: {
    id: 'passive_title_necromancer',
    name: '降霊',
    description: '魔法攻撃力と最大TPが上昇する（常時）。',
  },
  passive_title_puppeteer: {
    id: 'passive_title_puppeteer',
    name: '傀儡操糸',
    description: '最大HPと最大TPが上昇する（常時）。',
  },

  // ---- 追加アクティブスキル ----
  skill_chain_slash: {
    id: 'skill_chain_slash',
    name: '連刃の構え',
    description: '味方が斬属性で敵を攻撃した時、追撃する構えを取る（数ターン）。',
  },
  skill_riposte: {
    id: 'skill_riposte',
    name: '反攻の構え',
    description: '敵の攻撃を受けた時、確率で反撃する構えを取る（数ターン）。',
  },
  skill_line_guard: {
    id: 'skill_line_guard',
    name: 'ラインガード',
    description: '味方全体に、被弾を肩代わりする障壁を張る（数ターン）。',
  },
  skill_counter_guard: {
    id: 'skill_counter_guard',
    name: 'カウンターガード',
    description: '敵の攻撃を受けた時、高確率で反撃する構えを取る（数ターン）。',
  },
  skill_fire_storm: {
    id: 'skill_fire_storm',
    name: 'ファイアストーム',
    description: '敵全体に火属性魔法ダメージ。',
  },
  skill_first_aid: {
    id: 'skill_first_aid',
    name: '救護指示',
    description: '味方1人のHPを回復する。',
  },
  skill_refresh_herb: {
    id: 'skill_refresh_herb',
    name: 'リフレシュハーブ',
    description: '味方全体の状態異常を治療する。',
  },
  skill_poison_smoke: {
    id: 'skill_poison_smoke',
    name: 'ポイズンスモーク',
    description: '敵全体を確率で毒にする。',
  },
  skill_guard_dance: {
    id: 'skill_guard_dance',
    name: '守りの舞',
    description: '味方全体の物理防御を高める。',
  },
  skill_healing_song: {
    id: 'skill_healing_song',
    name: '癒しの歌',
    description: '味方全体のHPを小回復する。',
  },
  skill_arm_break: {
    id: 'skill_arm_break',
    name: 'アームブレイク',
    description: '単体に壊打ダメージを与え、確率で腕を封じる。',
  },
  skill_cross_counter: {
    id: 'skill_cross_counter',
    name: 'クロスカウンター',
    description: '敵の攻撃を受けた時、高確率で強烈な反撃を行う構えを取る（数ターン）。',
  },
  skill_blind_hex: {
    id: 'skill_blind_hex',
    name: '盲目の呪',
    description: '敵全体を確率で盲目にする。',
  },
  skill_armor_hex: {
    id: 'skill_armor_hex',
    name: '鎧弱の呪',
    description: '単体の物理防御を下げる。',
  },
  skill_call_wraith: {
    id: 'skill_call_wraith',
    name: '死霊召喚',
    description: '自律して敵を貫通攻撃する死霊を最前列に呼ぶ（戦闘限り）。',
  },
  skill_soul_barrier: {
    id: 'skill_soul_barrier',
    name: '無慈悲な盾',
    description: '味方全体に、被弾を肩代わりする障壁を張る（数ターン）。',
  },
  skill_call_sentinel: {
    id: 'skill_call_sentinel',
    name: '亡者の壁',
    description: '敵の攻撃を引き受ける高耐久の壁を最前列に呼ぶ（戦闘限り）。',
  },
  skill_soul_burst: {
    id: 'skill_soul_burst',
    name: '死霊爆裂',
    description: '敵全体に無属性魔法ダメージ。',
  },
  skill_cleanse_draft: {
    id: 'skill_cleanse_draft',
    name: '解毒の秘薬',
    description: '味方全体の状態異常を治療する。',
  },
  skill_counter_throw: {
    id: 'skill_counter_throw',
    name: '当て身投げ',
    description: '敵の攻撃を受けた時、確率で反撃する構えを取る（数ターン）。',
  },

  // ============================================================================
  // Phase 6-2c: スキルツリー本家相当拡充（3段の前提チェーン）
  // ============================================================================
  // ---- 戦士 ----
  skill_warrior_double_slash: {
    id: 'skill_warrior_double_slash',
    name: 'ダブルスラッシュ',
    description: '単体に2連続の斬撃を浴びせる。',
  },
  skill_warrior_heavy_swing: {
    id: 'skill_warrior_heavy_swing',
    name: 'ヘビースイング',
    description: '斧で単体を強打し、確率で頭を封じる。',
  },
  skill_warrior_war_cry: {
    id: 'skill_warrior_war_cry',
    name: '雄叫び',
    description: '自身の物理攻撃を一時的に大きく高める。',
  },
  skill_warrior_blade_storm: {
    id: 'skill_warrior_blade_storm',
    name: 'ブレイドストーム',
    description: '敵全体を斬り払う奥義。',
  },
  skill_warrior_executioner: {
    id: 'skill_warrior_executioner',
    name: 'エグゼキューション',
    description: '渾身の一撃を単体に叩き込む奥義。',
  },
  passive_warrior_axe_mastery: {
    id: 'passive_warrior_axe_mastery',
    name: '斧の心得',
    description: '斧を装備中、物理攻撃力が上昇する（常時）。',
  },
  passive_warrior_crit_focus: {
    id: 'passive_warrior_crit_focus',
    name: '会心',
    description: 'クリティカル率が上昇する（常時）。',
  },
  passive_warrior_vitality: {
    id: 'passive_warrior_vitality',
    name: '頑健な肉体',
    description: '最大HPが上昇する（常時）。',
  },
  skill_warrior_t_rampage: {
    id: 'skill_warrior_t_rampage',
    name: 'ランページ',
    description: '渾身の3連撃を放つ狂戦士の奥義。',
  },
  passive_warrior_t_bloodlust: {
    id: 'passive_warrior_t_bloodlust',
    name: '血の渇き',
    description: '物理攻撃とクリティカル率が上昇する（常時）。',
  },
  skill_warrior_t_overwatch: {
    id: 'skill_warrior_t_overwatch',
    name: '哨戒の構え',
    description: '構えをとり、被弾時に確率で反撃する。',
  },
  passive_warrior_t_guardian_eye: {
    id: 'passive_warrior_t_guardian_eye',
    name: '監視眼',
    description: '物理防御と命中が上昇する（常時）。',
  },
  // ---- 守護兵 ----
  skill_guardian_shield_press: {
    id: 'skill_guardian_shield_press',
    name: 'シールドプレス',
    description: '盾で敵全体を押し潰し、確率で麻痺させる。',
  },
  skill_guardian_taunt_roar: {
    id: 'skill_guardian_taunt_roar',
    name: '威圧の咆哮',
    description: '敵の注意を引きつけつつ自身の物理防御を高める。',
  },
  skill_guardian_aegis: {
    id: 'skill_guardian_aegis',
    name: 'イージスウォール',
    description: '味方全体に強固な障壁を張る奥義。',
  },
  skill_guardian_retribution: {
    id: 'skill_guardian_retribution',
    name: 'リトリビューション',
    description: '盾を構え、被弾時に反撃を返す奥義。',
  },
  passive_guardian_spear_mastery: {
    id: 'passive_guardian_spear_mastery',
    name: '槍の心得',
    description: '槍を装備中、物理攻撃力が上昇する（常時）。',
  },
  passive_guardian_mdef_boost: {
    id: 'passive_guardian_mdef_boost',
    name: '魔法耐性',
    description: '魔法防御が上昇する（常時）。',
  },
  passive_guardian_iron_will: {
    id: 'passive_guardian_iron_will',
    name: '鋼の意志',
    description: '物理防御と最大HPが上昇する（常時）。',
  },
  passive_guardian_t_fortress: {
    id: 'passive_guardian_t_fortress',
    name: '要塞',
    description: '物理防御と最大HPが大きく上昇する（常時）。',
  },
  skill_guardian_t_last_bastion: {
    id: 'skill_guardian_t_last_bastion',
    name: 'ラストバスティオン',
    description: '味方全体に極大の障壁を展開する城壁の奥義。',
  },
  passive_guardian_t_spearhead: {
    id: 'passive_guardian_t_spearhead',
    name: '尖兵',
    description: '物理攻撃が上昇する（常時）。',
  },
  skill_guardian_t_lance_charge: {
    id: 'skill_guardian_t_lance_charge',
    name: 'ランスチャージ',
    description: '槍で単体を貫く先鋒の突撃。',
  },
  // ---- 魔導士 ----
  skill_mage_ice_storm: {
    id: 'skill_mage_ice_storm',
    name: 'アイスストーム',
    description: '敵全体に氷属性魔法ダメージ。',
  },
  skill_mage_volt_storm: {
    id: 'skill_mage_volt_storm',
    name: 'ボルトストーム',
    description: '敵全体に雷属性魔法ダメージ。',
  },
  skill_mage_focus: {
    id: 'skill_mage_focus',
    name: '魔力集中',
    description: '自身の魔法攻撃を一時的に大きく高める。',
  },
  skill_mage_meteor: {
    id: 'skill_mage_meteor',
    name: 'メテオ',
    description: '敵全体に超火力の火属性魔法を降らせる奥義。',
  },
  skill_mage_thunderbolt: {
    id: 'skill_mage_thunderbolt',
    name: 'サンダーボルト',
    description: '単体に極大の雷属性魔法を撃ち込む奥義。',
  },
  passive_mage_matk_boost: {
    id: 'passive_mage_matk_boost',
    name: '魔力増幅',
    description: '魔法攻撃が上昇する（常時）。',
  },
  passive_mage_spell_focus: {
    id: 'passive_mage_spell_focus',
    name: '魔法熟練',
    description: '魔法攻撃とクリティカル率が上昇する（常時）。',
  },
  passive_mage_t_inferno: {
    id: 'passive_mage_t_inferno',
    name: '業炎',
    description: '魔法攻撃が大きく上昇する（常時）。',
  },
  skill_mage_t_hellfire: {
    id: 'skill_mage_t_hellfire',
    name: 'ヘルファイア',
    description: '単体を業火で焼き尽くす紅蓮術士の奥義。',
  },
  passive_mage_t_arcane_lore: {
    id: 'passive_mage_t_arcane_lore',
    name: '深淵の知識',
    description: '最大TPと魔法防御が上昇する（常時）。',
  },
  skill_mage_t_mana_surge: {
    id: 'skill_mage_t_mana_surge',
    name: 'マナサージ',
    description: '自身のTPを回復する賢者の秘術。',
  },
  // ---- 狩人 ----
  skill_ranger_piercing_arrow: {
    id: 'skill_ranger_piercing_arrow',
    name: '貫通の矢',
    description: '単体に強力な貫通射撃ダメージ。',
  },
  skill_ranger_charged_shot: {
    id: 'skill_ranger_charged_shot',
    name: 'チャージショット',
    description: '単体に絶大な貫通ダメージを与える奥義。',
  },
  skill_ranger_rain_of_arrows: {
    id: 'skill_ranger_rain_of_arrows',
    name: '矢の雨',
    description: '敵全体に降り注ぐ射撃ダメージ。',
  },
  skill_ranger_pin_shot: {
    id: 'skill_ranger_pin_shot',
    name: '足止めの矢',
    description: '射撃ダメージを与え、確率で脚を封じる。',
  },
  skill_ranger_summon_falcon: {
    id: 'skill_ranger_summon_falcon',
    name: '鷹を召喚',
    description: '自律して敵を攻撃する鷹を呼ぶ（戦闘限り）。',
  },
  passive_ranger_eagle_eye: {
    id: 'passive_ranger_eagle_eye',
    name: '鷹の目',
    description: '命中とクリティカル率が上昇する（常時）。',
  },
  skill_ranger_t_snipe: {
    id: 'skill_ranger_t_snipe',
    name: '一矢必中',
    description: '弱点を狙い澄ました必殺の一射。',
  },
  passive_ranger_t_keen_sight: {
    id: 'passive_ranger_t_keen_sight',
    name: '眼力',
    description: '命中が上昇する（常時）。',
  },
  skill_ranger_t_camouflage: {
    id: 'skill_ranger_t_camouflage',
    name: '韜晦',
    description: '自身の回避を大きく高める。',
  },
  passive_ranger_t_shadowstep: {
    id: 'passive_ranger_t_shadowstep',
    name: '影縫い',
    description: '回避が上昇する（常時）。',
  },
  // ---- 薬師 ----
  skill_medic_full_heal: {
    id: 'skill_medic_full_heal',
    name: 'フルヒール',
    description: '味方1人のHPを大きく回復する。',
  },
  skill_medic_party_cure: {
    id: 'skill_medic_party_cure',
    name: 'パーティキュア',
    description: '味方全体のHPを大きく回復する。',
  },
  skill_medic_tp_tonic: {
    id: 'skill_medic_tp_tonic',
    name: 'TPトニック',
    description: '味方全体のTPを回復させる。',
  },
  skill_medic_blind_powder: {
    id: 'skill_medic_blind_powder',
    name: '目潰しの粉',
    description: '敵全体を確率で盲目にする。',
  },
  passive_medic_mind_boost: {
    id: 'passive_medic_mind_boost',
    name: '治療の心得',
    description: '魔法攻撃力が上昇する（常時）。',
  },
  skill_medic_t_revive_light: {
    id: 'skill_medic_t_revive_light',
    name: '蘇生の光',
    description: '戦闘不能の味方1人を癒やしの光で蘇生する聖者の奇跡（HPを大きく回復して復帰）。',
  },
  passive_medic_t_blessing: {
    id: 'passive_medic_t_blessing',
    name: '祝福',
    description: '最大TPと魔法防御が上昇する（常時）。',
  },
  skill_medic_t_stimulant: {
    id: 'skill_medic_t_stimulant',
    name: '気付け薬',
    description: '味方全体のTPを回復させる。',
  },
  passive_medic_t_alchemy: {
    id: 'passive_medic_t_alchemy',
    name: '錬薬',
    description: '最大TPが上昇する（常時）。',
  },
  // ---- 剣舞士 ----
  skill_dancer_blade_waltz: {
    id: 'skill_dancer_blade_waltz',
    name: '剣舞の円',
    description: '舞いながら敵全体を斬りつける。',
  },
  skill_dancer_inspire_dance: {
    id: 'skill_dancer_inspire_dance',
    name: '鼓舞の舞',
    description: '味方全体の魔法攻撃を高める。',
  },
  skill_dancer_grace_song: {
    id: 'skill_dancer_grace_song',
    name: '加護の歌',
    description: '味方全体の魔法防御を高める。',
  },
  skill_dancer_revival_dance: {
    id: 'skill_dancer_revival_dance',
    name: '蘇生の舞',
    description: '戦闘不能の味方1人を蘇らせる祈りの舞（HPの一部を回復して復帰）。',
  },
  passive_dancer_grace: {
    id: 'passive_dancer_grace',
    name: '優美',
    description: '回避と命中が上昇する（常時）。',
  },
  skill_dancer_t_finale: {
    id: 'skill_dancer_t_finale',
    name: '剣の終幕',
    description: '渾身の舞で単体に絶大な斬撃ダメージを与える奥義。',
  },
  passive_dancer_t_grace: {
    id: 'passive_dancer_t_grace',
    name: '舞の極み',
    description: '物理攻撃と回避が上昇する（常時）。',
  },
  skill_dancer_t_lullaby: {
    id: 'skill_dancer_t_lullaby',
    name: '子守唄',
    description: '敵全体を確率で眠らせる舞姫の歌。',
  },
  passive_dancer_t_melody: {
    id: 'passive_dancer_t_melody',
    name: '調べ',
    description: '最大TPと魔法防御が上昇する（常時）。',
  },
  // ---- 拳聖 ----
  skill_monk_palm_strike: {
    id: 'skill_monk_palm_strike',
    name: '崩拳',
    description: '単体に強烈な壊打の一撃を放つ。',
  },
  skill_monk_leg_sweep: {
    id: 'skill_monk_leg_sweep',
    name: '足払い',
    description: '単体に壊打ダメージを与え、確率で脚を封じる。',
  },
  skill_monk_flurry: {
    id: 'skill_monk_flurry',
    name: '連弾',
    description: '単体に壊打の4連撃を浴びせる。',
  },
  skill_monk_head_smash: {
    id: 'skill_monk_head_smash',
    name: '当て身打ち',
    description: '単体に壊打ダメージを与え、確率で頭を封じる。',
  },
  skill_monk_rising_dragon: {
    id: 'skill_monk_rising_dragon',
    name: '昇龍奥義',
    description: '単体に壊打の奥義を叩き込む。',
  },
  passive_monk_hp_boost: {
    id: 'passive_monk_hp_boost',
    name: '鍛錬',
    description: '最大HPが上昇する（常時）。',
  },
  passive_monk_eva_boost: {
    id: 'passive_monk_eva_boost',
    name: '見切り',
    description: '回避が上昇する（常時）。',
  },
  skill_grappler_t_chain_throw: {
    id: 'skill_grappler_t_chain_throw',
    name: '連環投げ',
    description: '味方が壊属性で敵を攻撃した時、追撃する構えを取る（数ターン）。',
  },
  passive_grappler_t_counter_mastery: {
    id: 'passive_grappler_t_counter_mastery',
    name: '体捌き',
    description: '回避とクリティカル率が上昇する（常時）。',
  },
  skill_zen_t_mountain_stance: {
    id: 'skill_zen_t_mountain_stance',
    name: '不動明王の構え',
    description: '物理防御を大きく高め、敵の注意を引きつける。',
  },
  skill_zen_t_meditation: {
    id: 'skill_zen_t_meditation',
    name: '瞑想',
    description: '自身のTPを回復する。',
  },
  // ---- 呪術士 ----
  skill_hexer_paralyze_hex: {
    id: 'skill_hexer_paralyze_hex',
    name: '麻痺の呪',
    description: '単体に魔法ダメージを与え、確率で麻痺させる。',
  },
  skill_hexer_eva_hex: {
    id: 'skill_hexer_eva_hex',
    name: '鈍重の呪',
    description: '敵全体の回避を下げる。',
  },
  skill_hexer_acc_hex: {
    id: 'skill_hexer_acc_hex',
    name: '失明の呪',
    description: '単体の命中を下げる。',
  },
  skill_hexer_mass_venom: {
    id: 'skill_hexer_mass_venom',
    name: '瘴気の呪',
    description: '敵全体を確率で毒にする。',
  },
  skill_hexer_doom_hex: {
    id: 'skill_hexer_doom_hex',
    name: '崩呪',
    description: '単体に強力な魔法ダメージを与え、確率で麻痺させる奥義。',
  },
  skill_hexer_curse_field: {
    id: 'skill_hexer_curse_field',
    name: '呪縛の領域',
    description: '敵全体の物理攻撃力を下げる。',
  },
  passive_hexer_acc_boost: {
    id: 'passive_hexer_acc_boost',
    name: '呪言',
    description: '命中が上昇する（常時）。',
  },
  skill_plague_t_pandemic: {
    id: 'skill_plague_t_pandemic',
    name: '疫病の散布',
    description: '敵全体に魔法ダメージを与え、確率で毒にする。',
  },
  skill_plague_t_wither: {
    id: 'skill_plague_t_wither',
    name: '衰弱の呪',
    description: '敵全体の魔法攻撃力を下げる。',
  },
  skill_warlock_t_dark_bolt: {
    id: 'skill_warlock_t_dark_bolt',
    name: '闇撃の呪',
    description: '単体に強力な無属性魔法ダメージ。',
  },
  passive_warlock_t_matk_mastery: {
    id: 'passive_warlock_t_matk_mastery',
    name: '禁術の知識',
    description: '魔法攻撃力が大きく上昇する（常時）。',
  },
  // ---- 降霊術士 ----
  skill_summoner_call_familiar: {
    id: 'skill_summoner_call_familiar',
    name: '使い魔召喚',
    description: '自律攻撃する使い魔を呼ぶ（戦闘限り）。',
  },
  skill_summoner_soul_drain: {
    id: 'skill_summoner_soul_drain',
    name: '吸魂',
    description: '単体に無属性魔法ダメージを与え、与ダメージの一部を自身のHPに吸収する。',
  },
  skill_summoner_tp_offering: {
    id: 'skill_summoner_tp_offering',
    name: '供物の儀',
    description: '味方全体のTPを回復する。',
  },
  skill_summoner_grave_chill: {
    id: 'skill_summoner_grave_chill',
    name: '冥府の冷気',
    description: '単体に氷属性魔法ダメージを与え、確率で麻痺させる。',
  },
  skill_summoner_oblivion: {
    id: 'skill_summoner_oblivion',
    name: '滅魂爆裂',
    description: '敵全体に強力な無属性魔法ダメージを与える奥義。',
  },
  skill_summoner_spirit_chase: {
    id: 'skill_summoner_spirit_chase',
    name: '霊撃連鎖',
    description: '味方が無属性で敵を攻撃した時、死霊が追撃する構えを取る（数ターン）。',
  },
  passive_summoner_mdef_boost: {
    id: 'passive_summoner_mdef_boost',
    name: '霊体防護',
    description: '魔法防御が上昇する（常時）。',
  },
  skill_necromancer_t_call_revenant: {
    id: 'skill_necromancer_t_call_revenant',
    name: '亡者召喚',
    description: '高耐久の亡者の壁を最前列に呼ぶ（戦闘限り）。',
  },
  skill_necromancer_t_death_pulse: {
    id: 'skill_necromancer_t_death_pulse',
    name: '死波',
    description: '敵全体に無属性魔法ダメージ。',
  },
  skill_puppeteer_t_aegis: {
    id: 'skill_puppeteer_t_aegis',
    name: '傀儡の盾',
    description: '味方全体に、被弾を肩代わりする障壁を張る（数ターン）。',
  },
  passive_puppeteer_t_vitality: {
    id: 'passive_puppeteer_t_vitality',
    name: '操糸の妙',
    description: '最大HPと最大TPが上昇する（常時）。',
  },

  // ============================================================================
  // Phase 6-2d: ツリー本家相当拡充（T4 4段化）の追加スキル
  // ============================================================================
  // ---- 戦士 ----
  skill_warrior_flame_blade: {
    id: 'skill_warrior_flame_blade',
    name: 'フレイムブレイド',
    description: '剣に炎を纏わせ単体に火属性の斬撃を放つ。',
  },
  skill_warrior_whirlwind: {
    id: 'skill_warrior_whirlwind',
    name: 'ワールウィンド',
    description: '斧で全方位を薙ぎ払い敵全体を強打する。',
  },
  skill_warrior_armor_crush: {
    id: 'skill_warrior_armor_crush',
    name: 'アーマークラッシュ',
    description: '斧で単体を打ち砕き、確率で腕を封じる。',
  },
  skill_warrior_blade_dance: {
    id: 'skill_warrior_blade_dance',
    name: 'ブレイドダンス',
    description: '単体に高速の3連斬を浴びせる。',
  },
  passive_warrior_dual_edge: {
    id: 'passive_warrior_dual_edge',
    name: '双刃の理',
    description: '物理攻撃とクリティカル率が上昇する（常時）。',
  },
  skill_warrior_savage_blow: {
    id: 'skill_warrior_savage_blow',
    name: 'サベージブロウ',
    description: '渾身の一撃を単体に叩き込む斧の極奥義。',
  },
  skill_warrior_meteor_strike: {
    id: 'skill_warrior_meteor_strike',
    name: 'メテオストライク',
    description: '剣で敵全体を斬り裂く極大の全体奥義。',
  },
  // ---- 守護兵 ----
  skill_guardian_shield_throw: {
    id: 'skill_guardian_shield_throw',
    name: 'シールドスロー',
    description: '盾を投げ敵全体を強打し、確率で麻痺させる。',
  },
  skill_guardian_spear_thrust: {
    id: 'skill_guardian_spear_thrust',
    name: 'スピアスラスト',
    description: '槍で単体を鋭く貫く突き技。',
  },
  skill_guardian_bulwark_stance: {
    id: 'skill_guardian_bulwark_stance',
    name: 'バルワークの構え',
    description: '物理防御を大きく高め、敵の注意を引きつける。',
  },
  skill_guardian_iron_counter: {
    id: 'skill_guardian_iron_counter',
    name: 'アイアンカウンター',
    description: '構えをとり、被弾時に高確率で強烈な反撃を返す。',
  },
  skill_guardian_phalanx: {
    id: 'skill_guardian_phalanx',
    name: 'ファランクス',
    description: '味方全体に被弾を肩代わりする障壁を張る。',
  },
  skill_guardian_dragon_lance: {
    id: 'skill_guardian_dragon_lance',
    name: 'ドラゴンランス',
    description: '槍で単体を貫く渾身の極奥義。',
  },
  skill_guardian_great_wall: {
    id: 'skill_guardian_great_wall',
    name: 'グレートウォール',
    description: '味方全体に極大の障壁を展開する城壁の奥義。',
  },
  // ---- 魔導士 ----
  skill_mage_fire_lance: {
    id: 'skill_mage_fire_lance',
    name: 'ファイアランス',
    description: '単体に上位の火属性魔法ダメージ。',
  },
  skill_mage_frost_lance: {
    id: 'skill_mage_frost_lance',
    name: 'フロストランス',
    description: '単体に上位の氷属性魔法を放ち、確率で麻痺させる。',
  },
  skill_mage_volt_lance: {
    id: 'skill_mage_volt_lance',
    name: 'ボルトランス',
    description: '単体に上位の雷属性魔法ダメージ。',
  },
  skill_mage_mana_charge: {
    id: 'skill_mage_mana_charge',
    name: 'マナチャージ',
    description: '自身のTPを回復する魔導士の秘術。',
  },
  skill_mage_absolute_zero: {
    id: 'skill_mage_absolute_zero',
    name: 'アブソリュートゼロ',
    description: '敵全体を凍てつかせる極大の氷属性奥義。',
  },
  skill_mage_ragnarok: {
    id: 'skill_mage_ragnarok',
    name: 'ラグナロク',
    description: '単体を無属性の極大魔法で滅する極奥義。',
  },
  passive_mage_overload: {
    id: 'passive_mage_overload',
    name: '魔導過負荷',
    description: '魔法攻撃が大きく上昇する（常時）。',
  },
  // ---- 狩人 ----
  skill_ranger_double_shot: {
    id: 'skill_ranger_double_shot',
    name: 'ダブルショット',
    description: '単体に2連続の射撃を浴びせる。',
  },
  skill_ranger_sky_volley: {
    id: 'skill_ranger_sky_volley',
    name: '空裂の斉射',
    description: '敵全体に降り注ぐ強力な射撃ダメージ（奥義）。',
  },
  skill_ranger_apollo_shot: {
    id: 'skill_ranger_apollo_shot',
    name: '滅びの一矢',
    description: '単体に絶大な貫通ダメージを与える狙撃の極致（奥義）。',
  },
  skill_ranger_binding_volley: {
    id: 'skill_ranger_binding_volley',
    name: '封鎖の斉射',
    description: '敵全体に射撃ダメージを与え、確率で腕を封じる。',
  },
  skill_ranger_falconry: {
    id: 'skill_ranger_falconry',
    name: '鷹匠の絆',
    description: '自律して敵を攻撃する鷹を最前列に呼ぶ（戦闘限り）。',
  },
  skill_ranger_hunters_mark: {
    id: 'skill_ranger_hunters_mark',
    name: '狩人の照準',
    description: '自身の命中を大きく高める。',
  },
  skill_ranger_field_dressing: {
    id: 'skill_ranger_field_dressing',
    name: '応急手当',
    description: '味方全体の状態異常を治療する。',
  },
  skill_ranger_volley_chase: {
    id: 'skill_ranger_volley_chase',
    name: '追い討ちの構え',
    description: '味方が突属性で敵を攻撃した時、追撃する構えを取る（数ターン）。',
  },
  passive_ranger_keen_eye: {
    id: 'passive_ranger_keen_eye',
    name: '精密眼',
    description: '命中とクリティカル率が上昇する（常時）。',
  },
  passive_ranger_swift_hands: {
    id: 'passive_ranger_swift_hands',
    name: '速射の手',
    description: '物理攻撃が上昇する（常時）。',
  },
  passive_ranger_predator: {
    id: 'passive_ranger_predator',
    name: '狩猟本能',
    description: '物理攻撃とクリティカル率が上昇する（常時）。',
  },
  // ---- 薬師 ----
  skill_medic_regen_balm: {
    id: 'skill_medic_regen_balm',
    name: 'リジェネバーム',
    description: '味方1人に継続回復を付与し、数ターンにわたってHPを回復させる霊薬。',
  },
  skill_medic_salvation: {
    id: 'skill_medic_salvation',
    name: 'サルベーション',
    description: '味方全体のHPを絶大に回復する奥義。',
  },
  skill_medic_panacea: {
    id: 'skill_medic_panacea',
    name: 'パナケイア',
    description: '味方全体のHPを大きく回復しつつ状態異常を治療する奥義。',
  },
  skill_medic_sleep_mist: {
    id: 'skill_medic_sleep_mist',
    name: 'スリープミスト',
    description: '敵全体を確率で眠らせる。',
  },
  skill_medic_paralysis_powder: {
    id: 'skill_medic_paralysis_powder',
    name: '痺れ粉',
    description: '敵全体を確率で麻痺させる。',
  },
  skill_medic_immune_hymn: {
    id: 'skill_medic_immune_hymn',
    name: '免疫の聖歌',
    description: '味方全体の物理防御を高める。',
  },
  skill_medic_revive_draft: {
    id: 'skill_medic_revive_draft',
    name: '蘇生薬',
    description: '戦闘不能の味方1人を復帰させる秘薬（HPの一部を回復して蘇生）。',
  },
  skill_medic_weakening_smoke: {
    id: 'skill_medic_weakening_smoke',
    name: '衰弱の煙',
    description: '敵全体の物理攻撃力を下げる。',
  },
  passive_medic_healing_hands: {
    id: 'passive_medic_healing_hands',
    name: '癒しの手',
    description: '魔法攻撃力が上昇する（常時）。',
  },
  passive_medic_staff_mastery: {
    id: 'passive_medic_staff_mastery',
    name: '杖の心得',
    description: '杖を装備中、魔法攻撃力が上昇する（常時）。',
  },
  passive_medic_vitality: {
    id: 'passive_medic_vitality',
    name: '健勝',
    description: '最大HPが上昇する（常時）。',
  },
  // ---- 剣舞士 ----
  skill_dancer_chant_of_valor: {
    id: 'skill_dancer_chant_of_valor',
    name: '勇気の歌',
    description: '味方全体の命中を高める。',
  },
  skill_dancer_curse_dance: {
    id: 'skill_dancer_curse_dance',
    name: '呪縛の舞',
    description: '敵全体の回避を下げる。',
  },
  skill_dancer_storm_waltz: {
    id: 'skill_dancer_storm_waltz',
    name: '嵐の円舞',
    description: '敵全体を斬り払う剣舞の奥義。',
  },
  skill_dancer_dual_blade: {
    id: 'skill_dancer_dual_blade',
    name: '双剣の舞',
    description: '単体に2連続の斬撃を浴びせる。',
  },
  skill_dancer_grand_finale: {
    id: 'skill_dancer_grand_finale',
    name: '大円舞曲',
    description: '味方全体のHPを大きく回復する癒しの奥義。',
  },
  skill_dancer_blade_chase: {
    id: 'skill_dancer_blade_chase',
    name: '連舞の構え',
    description: '味方が斬属性で敵を攻撃した時、追撃する構えを取る（数ターン）。',
  },
  skill_dancer_lullaby_song: {
    id: 'skill_dancer_lullaby_song',
    name: '安らぎの調べ',
    description: '敵全体を確率で眠らせる舞姫の歌。',
  },
  skill_dancer_mana_song: {
    id: 'skill_dancer_mana_song',
    name: '律動の歌',
    description: '味方全体のTPを回復させる。',
  },
  passive_dancer_blade_mastery: {
    id: 'passive_dancer_blade_mastery',
    name: '剣の心得',
    description: '剣を装備中、物理攻撃力が上昇する（常時）。',
  },
  passive_dancer_vigor: {
    id: 'passive_dancer_vigor',
    name: '活力',
    description: '最大HPが上昇する（常時）。',
  },
  passive_dancer_resonance: {
    id: 'passive_dancer_resonance',
    name: '共鳴',
    description: '魔法攻撃力と最大TPが上昇する（常時）。',
  },
  // ---- 拳聖 ----
  skill_monk_double_palm: {
    id: 'skill_monk_double_palm',
    name: '双掌打',
    description: '単体に壊打の2連撃を浴びせる。',
  },
  skill_monk_pressure_point: {
    id: 'skill_monk_pressure_point',
    name: '点穴突き',
    description: '単体に壊打ダメージを与え、確率で腕を封じる。',
  },
  skill_monk_whirlwind_kick: {
    id: 'skill_monk_whirlwind_kick',
    name: '旋風脚',
    description: '敵全体を蹴り払う壊打。',
  },
  skill_monk_ki_guard: {
    id: 'skill_monk_ki_guard',
    name: '気功護身',
    description: '自身の物理防御を高める。',
  },
  skill_monk_breathing: {
    id: 'skill_monk_breathing',
    name: '吐納',
    description: '自身のTPを回復する呼吸法。',
  },
  skill_monk_seven_star: {
    id: 'skill_monk_seven_star',
    name: '七星連撃',
    description: '単体に壊打の5連撃を叩き込む奥義。',
  },
  skill_monk_demon_palm: {
    id: 'skill_monk_demon_palm',
    name: '羅刹掌',
    description: '単体に壊打の渾身奥義を放つ。',
  },
  passive_monk_counter_mastery: {
    id: 'passive_monk_counter_mastery',
    name: '反骨',
    description: '物理攻撃力とクリティカル率が上昇する（常時）。',
  },
  // ---- 呪術士 ----
  skill_hexer_drowsy_hex: {
    id: 'skill_hexer_drowsy_hex',
    name: '微睡の呪',
    description: '単体を確率で眠らせる（被ダメで解除）。',
  },
  skill_hexer_dark_bolt: {
    id: 'skill_hexer_dark_bolt',
    name: '闇の呪弾',
    description: '単体に無属性魔法ダメージ。',
  },
  skill_hexer_mass_paralyze: {
    id: 'skill_hexer_mass_paralyze',
    name: '痺れの呪',
    description: '敵全体を確率で麻痺させる。',
  },
  skill_hexer_def_hex: {
    id: 'skill_hexer_def_hex',
    name: '虚弱の呪',
    description: '敵全体の物理防御を下げる。',
  },
  skill_hexer_mdef_hex: {
    id: 'skill_hexer_mdef_hex',
    name: '崩魔の呪',
    description: '敵全体の魔法防御を下げる。',
  },
  skill_hexer_nightmare: {
    id: 'skill_hexer_nightmare',
    name: '悪夢の呪',
    description: '単体に魔法ダメージを与え、確率で眠らせる奥義。',
  },
  skill_hexer_calamity: {
    id: 'skill_hexer_calamity',
    name: '災禍の呪',
    description: '敵全体に強力な無属性魔法ダメージを与え、確率で毒にする奥義。',
  },
  passive_hexer_curse_lore: {
    id: 'passive_hexer_curse_lore',
    name: '呪術の知識',
    description: '魔法攻撃力が上昇する（常時）。',
  },
  // ---- 降霊術士 ----
  skill_summoner_bone_spear: {
    id: 'skill_summoner_bone_spear',
    name: '骨の槍',
    description: '単体に無属性魔法ダメージを与え、確率で麻痺させる。',
  },
  skill_summoner_grave_field: {
    id: 'skill_summoner_grave_field',
    name: '墓標の凍土',
    description: '敵全体に氷属性魔法ダメージ。',
  },
  skill_summoner_soul_ward: {
    id: 'skill_summoner_soul_ward',
    name: '霊障の壁',
    description: '味方全体に、被弾を肩代わりする障壁を張る（数ターン）。',
  },
  skill_summoner_spirit_veil: {
    id: 'skill_summoner_spirit_veil',
    name: '霊衣',
    description: '自身の魔法防御を高める。',
  },
  skill_summoner_necro_bolt: {
    id: 'skill_summoner_necro_bolt',
    name: '死霊弾',
    description: '単体に無属性魔法ダメージ。',
  },
  skill_summoner_annihilation: {
    id: 'skill_summoner_annihilation',
    name: '冥滅爆裂',
    description: '敵全体に絶大な無属性魔法ダメージを与える奥義。',
  },
  skill_summoner_soul_render: {
    id: 'skill_summoner_soul_render',
    name: '魂喰らい',
    description: '単体に極大の無属性魔法ダメージを与え、与ダメージの一部を自身のHPに吸収する奥義。',
  },
  passive_summoner_spirit_lore: {
    id: 'passive_summoner_spirit_lore',
    name: '冥導',
    description: '魔法攻撃力と最大TPが上昇する（常時）。',
  },
  skill_summoner_call_revenant: {
    id: 'skill_summoner_call_revenant',
    name: '亡者召喚',
    description: '敵の攻撃を引き受ける高耐久の亡者の壁を最前列に呼ぶ（戦闘限り）。',
  },
};
