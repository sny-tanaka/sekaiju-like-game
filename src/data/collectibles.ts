import type { EnemyId, ItemId } from '@/domain/types';

// ============================================================================
// 秘宝（コレクションレアドロップ。v3.0.0 §5）。敵ごとに 1 種、全 60 種。
// アイテム本体（description 等）は items.ts 側に定義する。
// tierBand（帯）ごとの区切りは ENEMIES[enemyId].tierBand から動的に算出する
// （帯コンプ報酬・秘宝アイコンの hue はこの表 + tierBand を使って決定する）。
// ============================================================================

export const COLLECTIBLE_BY_ENEMY: Record<EnemyId, ItemId> = {
  // tierBand 0
  enemy_slime: 'item_col_slime',
  enemy_giant_rat: 'item_col_giant_rat',
  enemy_cave_bat: 'item_col_cave_bat',
  enemy_t0_forest_rabbit: 'item_col_forest_rabbit',
  enemy_t0_glow_mushroom: 'item_col_glow_mushroom',
  enemy_t0_wood_caracal: 'item_col_wood_caracal',
  enemy_t0_pale_wisp: 'item_col_pale_wisp',
  enemy_t0_bristle_boar: 'item_col_bristle_boar',
  enemy_t0_thicket_stag: 'item_col_thicket_stag',
  enemy_t0_cave_crawler: 'item_col_cave_crawler',
  enemy_t0_elder_treant: 'item_col_elder_treant',
  enemy_boss_gatekeeper: 'item_col_gatekeeper',
  // tierBand 1
  enemy_t1_crag_goat: 'item_col_crag_goat',
  enemy_t1_rock_lizard: 'item_col_rock_lizard',
  enemy_t1_highland_hawk: 'item_col_highland_hawk',
  enemy_t1_stone_beetle: 'item_col_stone_beetle',
  enemy_t1_cliff_ram: 'item_col_cliff_ram',
  enemy_t1_ember_lizard: 'item_col_ember_lizard',
  enemy_t1_boulder_toad: 'item_col_boulder_toad',
  enemy_t1_young_baboon: 'item_col_young_baboon',
  enemy_t1_boulder_ogre: 'item_col_boulder_ogre',
  enemy_t1_thunder_roc: 'item_col_thunder_roc',
  enemy_t1_magma_drake: 'item_col_magma_drake',
  enemy_t1_boss_mountain_lord: 'item_col_mountain_lord',
  // tierBand 2
  enemy_t2_frostfang_wolf: 'item_col_frostfang_wolf',
  enemy_t2_snow_ape: 'item_col_snow_ape',
  enemy_t2_glacier_crab: 'item_col_glacier_crab',
  enemy_t2_snow_owl: 'item_col_snow_owl',
  enemy_t2_ice_wisp: 'item_col_ice_wisp',
  enemy_t2_rime_beetle: 'item_col_rime_beetle',
  enemy_t2_frost_stag: 'item_col_frost_stag',
  enemy_t2_snow_serpent: 'item_col_snow_serpent',
  enemy_t2_glacial_bear: 'item_col_glacial_bear',
  enemy_t2_iron_ice_golem: 'item_col_iron_ice_golem',
  enemy_t2_blizzard_hawk: 'item_col_blizzard_hawk',
  enemy_t2_boss_frost_monarch: 'item_col_frost_monarch',
  // tierBand 3
  enemy_t3_storm_wolf: 'item_col_storm_wolf',
  enemy_t3_thunder_bird: 'item_col_thunder_bird',
  enemy_t3_spark_beetle: 'item_col_spark_beetle',
  enemy_t3_gale_serpent: 'item_col_gale_serpent',
  enemy_t3_charged_wisp: 'item_col_charged_wisp',
  enemy_t3_tempest_ape: 'item_col_tempest_ape',
  enemy_t3_static_crystal: 'item_col_static_crystal',
  enemy_t3_rain_hawk: 'item_col_rain_hawk',
  enemy_t3_thunder_beast: 'item_col_thunder_beast',
  enemy_t3_storm_roc: 'item_col_storm_roc',
  enemy_t3_discharge_idol: 'item_col_discharge_idol',
  enemy_t3_boss_tempest_sovereign: 'item_col_tempest_sovereign',
  // tierBand 4
  enemy_t4_rotwalker: 'item_col_rotwalker',
  enemy_t4_bone_lancer: 'item_col_bone_lancer',
  enemy_t4_miasma_moth: 'item_col_miasma_moth',
  enemy_t4_wraith_lantern: 'item_col_wraith_lantern',
  enemy_t4_rust_sentinel: 'item_col_rust_sentinel',
  enemy_t4_plague_crawler: 'item_col_plague_crawler',
  enemy_t4_grave_acolyte: 'item_col_grave_acolyte',
  enemy_t4_gear_hound: 'item_col_gear_hound',
  enemy_t4_corpse_colossus: 'item_col_corpse_colossus',
  enemy_t4_siege_automaton: 'item_col_siege_automaton',
  enemy_t4_shroud_revenant: 'item_col_shroud_revenant',
  enemy_t4_boss_blight_sovereign: 'item_col_blight_sovereign',
};
