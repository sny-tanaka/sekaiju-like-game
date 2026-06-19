// DOT ILLUST（https://dot-illust.net/）からアイテム/装備スプライト画像を一括取得するスクリプト。
// itemId/equipId → 採用スラッグのマッピングに基づき、各 PNG を public/sprites/items/<id>.png へ保存する。
// リクエスト間隔は 500ms。既存ファイルはスキップ（冪等）。
// 非商用利用・クレジット不要（利用規約: https://dot-illust.net/terms/）

import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(here, '../public/sprites/items');
const BASE_URL = 'https://dot-illust.net/wp-content/themes/dotillust/assets/dl';

const SPRITE_MAP = {
  // ---- 武器 ----
  // sword (tier 別色違い)
  equip_short_sword: 'tsurugi_bronze_sabi_red',
  equip_rat_dagger: 'tsurugi_bronze_red',
  equip_golem_blade: 'tsurugi_bronze_blue',
  equip_t2_sword: 'sword_longsword_brown',
  equip_t3_sword: 'sword_longsword_red',
  equip_t4_sword: 'sword_longsword_blue',
  equip_t5_sword: 'sword_longsword_green',
  // spear (一律)
  equip_iron_spear: 'tsurugi_sanshunojingi',
  equip_t2_spear: 'tsurugi_sanshunojingi',
  equip_t3_spear: 'tsurugi_sanshunojingi',
  equip_t4_spear: 'tsurugi_sanshunojingi',
  equip_t5_spear: 'tsurugi_sanshunojingi',
  // axe (一律)
  equip_battle_axe: 'ono',
  equip_t2_axe: 'ono',
  equip_t3_axe: 'ono',
  equip_t4_axe: 'ono',
  equip_t5_axe: 'ono',
  // bow (一律)
  equip_short_bow: 'yumi',
  equip_t2_bow: 'yumi',
  equip_t3_bow: 'yumi',
  equip_t4_bow: 'yumi',
  equip_t5_bow: 'yumi',
  // fist (一律)
  equip_iron_knuckle: 'hammer',
  equip_t2_fist: 'hammer',
  equip_t3_fist: 'hammer',
  equip_t4_fist: 'hammer',
  equip_t5_fist: 'hammer',
  // staff (一律)
  equip_oak_staff: 'tsue',
  equip_t2_staff: 'tsue',
  equip_t3_staff: 'tsue',
  equip_t4_staff: 'tsue',
  equip_t5_staff: 'tsue',

  // ---- 防具 ----
  // heavy (tier 別色違い)
  equip_iron_armor: 'armor_iron',
  equip_slime_shield: 'armor_red',
  equip_t2_heavy: 'armor_blue',
  equip_t3_heavy: 'armor_green',
  equip_t4_heavy: 'armor_red_02',
  equip_t5_heavy: 'armor_blue_02',
  // light (tier 別)
  equip_leather_armor: 'shield_buckler_wood',
  equip_bat_cloak: 'shield_buckler_iron',
  equip_t2_light: 'armor_koshiate_iron',
  equip_t3_light: 'armor_koshiate_red',
  equip_t4_light: 'armor_koshiate_blue',
  equip_t5_light: 'armor_koshiate_green',
  // clothes (一律)
  equip_cloth_robe: 'character_madoshi_01_purple',
  equip_t2_clothes: 'character_madoshi_01_purple',
  equip_t3_clothes: 'character_madoshi_01_purple',
  equip_t4_clothes: 'character_madoshi_01_purple',
  equip_t5_clothes: 'character_madoshi_01_purple',
  // accessory (tier 進化)
  equip_amulet: 'ring_bronze',
  equip_t2_accessory: 'ring_silver',
  equip_t3_accessory: 'ring_gold',
  equip_t4_accessory: 'jewelry_round_purple',
  equip_t5_accessory: 'jewelry_emerald_red',

  // ---- 消耗品 ----
  item_potion: 'portion_01_green',
  item_hi_potion: 'portion_01_red',
  item_tp_herb: 'portion_02_purple_01',
  item_tp_herb_mid: 'portion_02_purple_02',
  item_tp_herb_hi: 'portion_02_pink',
  item_return_thread: 'portion_02_lightblue_01',

  // ---- 売却素材（モンスタードロップ） ----
  item_slime_jelly: 'character_monster_slime_green',
  item_rat_tail: 'nezumi_brown',
  item_bat_wing: 'cutlery_knife',
  item_golem_core: 'crystal_sphere_blue',

  // ---- 採集素材 ----
  item_ore: 'koseki_iron',
  item_medic_herb: 'prune_leaf',
  item_lumber: 'matsubokkuri',

  // ---- 食材（生） ----
  item_food_fish: 'sakana_shiromi',
  item_food_nuts: 'kurumi_01',
  item_food_meat: 'honetsukiniku_01',

  // ---- 料理 ----
  item_dish_grilled_fish: 'okazu_yakizakana_shiromizakana',
  item_dish_nut_platter: 'donguri_brown_01',
  item_dish_grilled_meat: 'friedchicken',

  // ---- tier 別ドロップ素材 ----
  // tier 0
  item_mat_t0_soft_pelt: 'usagi_brown',
  item_mat_t0_spore_cap: 'character_monster_kinoko_green',
  item_mat_t0_faint_ember: 'crystal_red',
  item_mat_t0_great_antler: 'shika_tsuno',
  item_mat_t0_chitin_plate: 'iwa_koseki_green',
  // tier 1
  item_mat_t1_coarse_hide: 'ishi_bronze',
  item_mat_t1_stone_scale: 'iwa_koseki_yellow',
  item_mat_t1_sharp_feather: 'hane_white',
  item_mat_t1_ogre_fang: 'hone',
  item_mat_t1_drake_horn: 'crystal_red',
  item_mat_t1_lord_pelt: 'koseki_yellow',
  // tier 2
  item_mat_t2_frost_pelt: 'usagi_white',
  item_mat_t2_ice_crystal: 'crystal_lightblue',
  item_mat_t2_chill_core: 'crystal_sphere_lightblue',
  item_mat_t2_monarch_diadem: 'jewelry_emerald_lightblue',
  // tier 3
  item_mat_t3_charged_hide: 'koseki_purple',
  item_mat_t3_storm_feather: 'hane_yellow',
  item_mat_t3_thunder_carapace: 'crystal_yellow',
  item_mat_t3_sovereign_horn: 'crystal_sphere_yellow',
  // tier 4
  item_mat_t4_rotflesh: 'hone',
  item_mat_t4_grave_dust: 'koseki_white',
  item_mat_t4_cursed_marrow: 'crystal_purple',
  item_mat_t4_toxic_scale: 'crystal_yellowgreen',
  item_mat_t4_spectral_ash: 'crystal_white',
  item_mat_t4_steel_gear: 'koseki_silver',
  item_mat_t4_corroded_plate: 'vikinghelmet_iron',
  item_mat_t4_sovereign_crown: 'vikinghelmet_red',
};

const total = Object.keys(SPRITE_MAP).length;
console.log(`[fetch-item-sprites] エントリ数: ${total}`);
if (total !== 100) {
  console.error(`[fetch-item-sprites] SPRITE_MAP のエントリ数が 100 ではありません（実際: ${total}）。処理を中断します。`);
  process.exit(1);
}
console.log(`[fetch-item-sprites] アサーション OK: Object.keys(SPRITE_MAP).length === 100`);

// 出力ディレクトリを確保
if (!existsSync(OUT_DIR)) {
  mkdirSync(OUT_DIR, { recursive: true });
}

let successCount = 0;
let skipCount = 0;
const failures = [];

async function fetchAndSave(itemId, slug) {
  const outPath = resolve(OUT_DIR, `${itemId}.png`);
  if (existsSync(outPath)) {
    console.log(`  [skip] ${itemId}`);
    skipCount++;
    return;
  }

  const url = `${BASE_URL}/${slug}.png`;
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    console.error(`  [error] ${itemId}: ネットワークエラー - ${err.message}`);
    failures.push({ itemId, reason: `ネットワークエラー: ${err.message}` });
    return;
  }

  if (!res.ok) {
    console.error(`  [error] ${itemId}: HTTP ${res.status} ${res.statusText} (${url})`);
    failures.push({ itemId, reason: `HTTP ${res.status} ${res.statusText}` });
    return;
  }

  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const { writeFileSync } = await import('node:fs');
  writeFileSync(outPath, buffer);
  console.log(`  [ok] ${itemId} <- ${slug}.png`);
  successCount++;
}

console.log(`[fetch-item-sprites] 保存先: ${OUT_DIR}`);
console.log(`[fetch-item-sprites] 取得開始 (${total} 件)...`);

for (const [itemId, slug] of Object.entries(SPRITE_MAP)) {
  await fetchAndSave(itemId, slug);
  await new Promise((r) => setTimeout(r, 500));
}

console.log('');
console.log('[fetch-item-sprites] 完了');
console.log(`  成功: ${successCount} 件`);
console.log(`  スキップ: ${skipCount} 件`);
console.log(`  失敗: ${failures.length} 件`);

if (failures.length > 0) {
  console.log('');
  console.log('[fetch-item-sprites] 失敗一覧:');
  for (const { itemId, reason } of failures) {
    console.log(`  - ${itemId}: ${reason}`);
  }
}
