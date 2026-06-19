// DOT ILLUST（https://dot-illust.net/）から敵スプライト画像を一括取得するスクリプト。
// enemyId → 採用スラッグのマッピングに基づき、各 PNG を public/sprites/enemies/<enemyId>.png へ保存する。
// リクエスト間隔は 500ms。既存ファイルはスキップ（冪等）。
// 非商用利用・クレジット不要（利用規約: https://dot-illust.net/terms/）

import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(here, '../public/sprites/enemies');
const BASE_URL = 'https://dot-illust.net/wp-content/themes/dotillust/assets/dl';

const SPRITE_MAP = {
  // Tier 0
  enemy_slime: 'character_monster_slime_green',
  enemy_giant_rat: 'nezumi_brown',
  enemy_boss_gatekeeper: 'character_monster_golem_brown',
  enemy_t0_forest_rabbit: 'usagi_brown',
  enemy_t0_glow_mushroom: 'character_monster_kinoko_green',
  enemy_t0_pale_wisp: 'character_monster_ghost_white',
  enemy_t0_bristle_boar: 'uribo_01',
  enemy_t0_thicket_stag: 'shika_tsuno',
  enemy_t0_elder_treant: 'character_monster_treant_01',
  // Tier 1
  enemy_t1_crag_goat: 'yagi_kuroyagi_tsuno',
  enemy_t1_rock_lizard: 'character_monster_dragon_01_green',
  enemy_t1_highland_hawk: 'taka_brown',
  enemy_t1_cliff_ram: 'hitsuji_kurohitsuji_tsuno',
  enemy_t1_ember_lizard: 'character_monster_dragon_01_red',
  enemy_t1_boulder_toad: 'kaeru_02',
  enemy_t1_young_baboon: 'saru_nihonzaru',
  enemy_t1_boulder_ogre: 'character_monster_troll_01_02',
  enemy_t1_thunder_roc: 'taka_white',
  enemy_t1_magma_drake: 'character_monster_dragon_02_red',
  enemy_t1_boss_mountain_lord: 'character_monster_minotaur_02',
  // Tier 2
  enemy_t2_frostfang_wolf: 'okami_white',
  enemy_t2_snow_ape: 'character_monster_yeti_01_blue',
  enemy_t2_snow_owl: 'fukuro_morifukuro',
  enemy_t2_ice_wisp: 'character_monster_hi_blue',
  enemy_t2_frost_stag: 'shika_tsuno',
  enemy_t2_snow_serpent: 'hebi',
  enemy_t2_glacial_bear: 'kuma_shirokuma',
  enemy_t2_iron_ice_golem: 'character_monster_golem_gray',
  enemy_t2_blizzard_hawk: 'taka_white',
  enemy_t2_boss_frost_monarch: 'character_monster_lamia_purple',
  // Tier 3
  enemy_t3_storm_wolf: 'okami_gray',
  enemy_t3_thunder_bird: 'taka_white',
  enemy_t3_gale_serpent: 'hebi',
  enemy_t3_charged_wisp: 'character_monster_hi_purple',
  enemy_t3_tempest_ape: 'character_monster_yeti_02_black',
  enemy_t3_rain_hawk: 'taka_brown',
  enemy_t3_thunder_beast: 'character_monster_dragon_02_yellow',
  enemy_t3_storm_roc: 'taka_white',
  enemy_t3_discharge_idol: 'character_monster_gargoyle_stone',
  enemy_t3_boss_tempest_sovereign: 'character_monster_mao_03',
  // 追加分（× → 逆マッピングで救済）
  enemy_cave_bat: 'character_monster_goblin_01',
  enemy_t0_wood_caracal: 'character_monster_hana_01',
  enemy_t0_cave_crawler: 'character_monster_slime_purple',
  enemy_t1_stone_beetle: 'character_monster_mimic_red',
  enemy_t2_glacier_crab: 'character_monster_frankenstein_01_blue',
  enemy_t2_rime_beetle: 'character_monster_treant_02_green',
  enemy_t3_spark_beetle: 'character_monster_ika_purple',
  enemy_t3_static_crystal: 'character_monster_kyuketsuki_01_purple',
  enemy_t4_miasma_moth: 'character_monster_shinigami_01',
  // Tier 4
  enemy_t4_rotwalker: 'character_monster_zombie_green',
  enemy_t4_bone_lancer: 'character_monster_skeleton_02',
  enemy_t4_wraith_lantern: 'character_monster_hi_purple',
  enemy_t4_rust_sentinel: 'character_monster_gargoyle_purple',
  enemy_t4_plague_crawler: 'character_monster_ika_green',
  enemy_t4_grave_acolyte: 'character_monster_majo_02_orange',
  enemy_t4_gear_hound: 'okami_black',
  enemy_t4_corpse_colossus: 'character_monster_frankenstein_02_blue',
  enemy_t4_siege_automaton: 'character_monster_golem_gray',
  enemy_t4_shroud_revenant: 'character_monster_mummy_red',
  enemy_t4_boss_blight_sovereign: 'character_daiakuma_02_02_black',
};

const total = Object.keys(SPRITE_MAP).length;
console.log(`[fetch-dot-illust-sprites] エントリ数: ${total}`);
if (total !== 60) {
  console.error(`[fetch-dot-illust-sprites] SPRITE_MAP のエントリ数が 60 ではありません（実際: ${total}）。処理を中断します。`);
  process.exit(1);
}

let successCount = 0;
let skipCount = 0;
const failures = [];

async function fetchAndSave(enemyId, slug) {
  const outPath = resolve(OUT_DIR, `${enemyId}.png`);
  if (existsSync(outPath)) {
    console.log(`  [skip] ${enemyId}`);
    skipCount++;
    return;
  }

  const url = `${BASE_URL}/${slug}.png`;
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    console.error(`  [error] ${enemyId}: ネットワークエラー - ${err.message}`);
    failures.push({ enemyId, reason: `ネットワークエラー: ${err.message}` });
    return;
  }

  if (!res.ok) {
    console.error(`  [error] ${enemyId}: HTTP ${res.status} ${res.statusText} (${url})`);
    failures.push({ enemyId, reason: `HTTP ${res.status} ${res.statusText}` });
    return;
  }

  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const { writeFileSync } = await import('node:fs');
  writeFileSync(outPath, buffer);
  console.log(`  [ok] ${enemyId} <- ${slug}.png`);
  successCount++;
}

console.log(`[fetch-dot-illust-sprites] 保存先: ${OUT_DIR}`);
console.log(`[fetch-dot-illust-sprites] 取得開始 (${total} 件)...`);

for (const [enemyId, slug] of Object.entries(SPRITE_MAP)) {
  await fetchAndSave(enemyId, slug);
  await new Promise((r) => setTimeout(r, 500));
}

console.log('');
console.log('[fetch-dot-illust-sprites] 完了');
console.log(`  成功: ${successCount} 件`);
console.log(`  スキップ: ${skipCount} 件`);
console.log(`  失敗: ${failures.length} 件`);

if (failures.length > 0) {
  console.log('');
  console.log('[fetch-dot-illust-sprites] 失敗一覧:');
  for (const { enemyId, reason } of failures) {
    console.log(`  - ${enemyId}: ${reason}`);
  }
}
