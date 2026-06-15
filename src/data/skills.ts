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
};
