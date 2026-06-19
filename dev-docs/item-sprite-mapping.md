# アイテム / 装備スプライト マッピング表 v2（DOT ILLUST → 本作 100 個）

> 提供素材: https://dot-illust.net/  （管理人 nko 氏、ライセンスは [enemy-sprite-mapping.md](./enemy-sprite-mapping.md) 参照）

## v1 → v2 の変更点

- **tier ごとに色違い・素材違いを徹底**: 武器（剣のロングソード色違いシリーズ）、防具（armor の色違い）、装飾品（指輪 → ジュエリー進化系統）
- **`tag/armor/` `tag/accessory/` `tag/crystal/` `tag/weapon/` を発見**して大量の素材プールを獲得
- **結晶系素材を `crystal_*` に差し替え**（よりクリスタルらしい見た目）
- **軽装鎧をバックラー盾、装飾品をジュエリー進化**で tier 識別性アップ
- ユニーク素材数: v1 約 39 → **v2 約 60 個**（同一系統での使い回しは保持しつつ、tier 識別性を獲得）

## マッピング方針

1. **リスト内の名前左に表示する小アイコン用途** に最適化（sm 約 48px）。
2. **同種類装備でも tier ごとに色違いで識別**（例: ショートソード = 茶色、銀の剣 = 赤、ミスリルソード = 青）。
3. tier 違いの色違い素材がない場合（槍・斧・弓・拳・杖）は同じ素材を使い回し、名前で識別。
4. tier 素材は素材タイプ別の代表アイコンを使用、tier ごとに色を変える。

## DL URL の構造

```
https://dot-illust.net/wp-content/themes/dotillust/assets/dl/<slug>.png
```

## マッピング表

`◎` = ぴったり / `○` = 形態が近い流用 / `△` = 妥協 / `×` = 要別ソース

---

### 装備（54 個）

#### 武器（weaponType × tier）

| 種別 | tier | ID | 採用スラッグ | 適合度 |
|---|---|---|---|---|
| **sword（剣）** | 0 | equip_short_sword | `tsurugi_bronze_sabi_red` | ◎ |
| | 1 | equip_rat_dagger | `tsurugi_bronze_red` | ◎ |
| | 1 | equip_golem_blade | `tsurugi_bronze_blue` | ◎ |
| | 2 | equip_t2_sword | `sword_longsword_brown` | ◎ |
| | 3 | equip_t3_sword | `sword_longsword_red` | ◎ |
| | 4 | equip_t4_sword | `sword_longsword_blue` | ◎ |
| | 5 | equip_t5_sword | `sword_longsword_green` | ◎ |
| **spear（槍）** | 0-5 | equip_iron_spear / equip_t2-t5_spear | `tsurugi_sanshunojingi` | △ |
| **axe（斧）** | 0-5 | equip_battle_axe / equip_t2-t5_axe | `ono` | ◎ |
| **bow（弓）** | 0-5 | equip_short_bow / equip_t2-t5_bow | `yumi` | ◎ |
| **fist（拳）** | 0-5 | equip_iron_knuckle / equip_t2-t5_fist | `hammer` | ○ |
| **staff（杖）** | 0-5 | equip_oak_staff / equip_t2-t5_staff | `tsue` | ◎ |

> 槍/斧/弓/拳/杖は tier 違いの色違い素材が無いため一律。tier 識別はテキストで。

#### 防具（armorType × tier）

| 種別 | tier | ID | 採用スラッグ | 適合度 |
|---|---|---|---|---|
| **heavy（重装）** | 0 | equip_iron_armor | `armor_iron` | ◎ |
| | 1 | equip_slime_shield | `armor_red` | ◎ |
| | 2 | equip_t2_heavy | `armor_blue` | ◎ |
| | 3 | equip_t3_heavy | `armor_green` | ◎ |
| | 4 | equip_t4_heavy | `armor_red_02` | ◎ |
| | 5 | equip_t5_heavy | `armor_blue_02` | ◎ |
| **light（軽装）** | 0 | equip_leather_armor | `shield_buckler_wood` | ○ |
| | 1 | equip_bat_cloak | `shield_buckler_iron` | ○ |
| | 2 | equip_t2_light | `armor_koshiate_iron` | ○ |
| | 3 | equip_t3_light | `armor_koshiate_red` | ○ |
| | 4 | equip_t4_light | `armor_koshiate_blue` | ○ |
| | 5 | equip_t5_light | `armor_koshiate_green` | ○ |
| **clothes（衣）** | 0-5 | equip_cloth_robe / equip_t2-t5_clothes | `character_madoshi_01_purple` | △ |
| **accessory（装飾）** | 0 | equip_amulet | `ring_bronze` | ◎ |
| | 2 | equip_t2_accessory | `ring_silver` | ◎ |
| | 3 | equip_t3_accessory | `ring_gold` | ◎ |
| | 4 | equip_t4_accessory | `jewelry_round_purple` | ◎ |
| | 5 | equip_t5_accessory | `jewelry_emerald_red` | ◎ |

> 衣単体素材が無いため魔道士キャラ絵で表現（一律）。装飾品は ring → jewelry で tier 進化。

---

### アイテム（46 個）

#### 消耗品（6 個）

| ID | 名前 | 採用スラッグ | 適合度 |
|---|---|---|---|
| item_potion | やくそう | `portion_01_green` | ◎ |
| item_hi_potion | よいやくそう | `portion_01_red` | ◎ |
| item_tp_herb | まほうのは | `portion_02_purple_01` | ◎ |
| item_tp_herb_mid | よいまほうのは | `portion_02_purple_02` | ◎ |
| item_tp_herb_hi | とくぶつまほうのは | `portion_02_pink` | ◎ |
| item_return_thread | 帰還の糸 | `portion_02_lightblue_01` | △ |

#### 売却素材 - モンスタードロップ（4 個）

| ID | 名前 | 採用スラッグ | 適合度 |
|---|---|---|---|
| item_slime_jelly | スライムゼリー | `character_monster_slime_green` | ◎ |
| item_rat_tail | ねずみのしっぽ | `nezumi_brown` | ○ |
| item_bat_wing | もりゴブリンの小刀 | `cutlery_knife` | ◎ |
| item_golem_core | ゴーレムの核 | `crystal_sphere_blue` | ◎ |

#### 採集素材（3 個）

| ID | 名前 | 採用スラッグ | 適合度 |
|---|---|---|---|
| item_ore | 鉄鉱石 | `koseki_iron` | ◎ |
| item_medic_herb | 薬の葉 | `prune_leaf` | ◎ |
| item_lumber | 良質な木材 | `matsubokkuri` | △ |

#### 食材（3 個）

| ID | 名前 | 採用スラッグ | 適合度 |
|---|---|---|---|
| item_food_fish | 川魚 | `sakana_shiromi` | ◎ |
| item_food_nuts | 木の実 | `kurumi_01` | ◎ |
| item_food_meat | 生肉 | `honetsukiniku_01` | ◎ |

#### 料理（3 個）

| ID | 名前 | 採用スラッグ | 適合度 |
|---|---|---|---|
| item_dish_grilled_fish | 焼き魚 | `okazu_yakizakana_shiromizakana` | ◎ |
| item_dish_nut_platter | 木の実の盛り合わせ | `donguri_brown_01` | ○ |
| item_dish_grilled_meat | 焼き肉 | `friedchicken` | ○ |

#### Tier 別ドロップ素材（27 個）

##### tier 0

| ID | 名前 | 採用スラッグ | 適合度 |
|---|---|---|---|
| item_mat_t0_soft_pelt | やわらかな毛皮 | `usagi_brown` | ○ |
| item_mat_t0_spore_cap | ひかるかさ | `character_monster_kinoko_green` | ◎ |
| item_mat_t0_faint_ember | かすかな残り火 | `crystal_red` | ◎ |
| item_mat_t0_great_antler | りっぱな角 | `shika_tsuno` | ◎ |
| item_mat_t0_chitin_plate | 硬い甲殻板 | `iwa_koseki_green` | ○ |

##### tier 1

| ID | 名前 | 採用スラッグ | 適合度 |
|---|---|---|---|
| item_mat_t1_coarse_hide | あらい獣皮 | `ishi_bronze` | ○ |
| item_mat_t1_stone_scale | 岩のうろこ | `iwa_koseki_yellow` | ○ |
| item_mat_t1_sharp_feather | するどい風切羽 | `hane_white` | ◎ |
| item_mat_t1_ogre_fang | オーガの牙 | `hone` | ◎ |
| item_mat_t1_drake_horn | 竜トカゲの角 | `crystal_red` | ○ |
| item_mat_t1_lord_pelt | 猿王の毛皮 | `koseki_yellow` | △ |

##### tier 2

| ID | 名前 | 採用スラッグ | 適合度 |
|---|---|---|---|
| item_mat_t2_frost_pelt | 霜降りの毛皮 | `usagi_white` | ○ |
| item_mat_t2_ice_crystal | 凍てつく結晶 | `crystal_lightblue` | ◎ |
| item_mat_t2_chill_core | 冷気の核 | `crystal_sphere_lightblue` | ◎ |
| item_mat_t2_monarch_diadem | 女王の氷冠 | `jewelry_emerald_lightblue` | ◎ |

##### tier 3

| ID | 名前 | 採用スラッグ | 適合度 |
|---|---|---|---|
| item_mat_t3_charged_hide | 帯電した獣皮 | `koseki_purple` | △ |
| item_mat_t3_storm_feather | 嵐鳥の風切羽 | `hane_yellow` | ◎ |
| item_mat_t3_thunder_carapace | 雷甲の外殻 | `crystal_yellow` | ○ |
| item_mat_t3_sovereign_horn | 覇王の雷角 | `crystal_sphere_yellow` | ◎ |

##### tier 4

| ID | 名前 | 採用スラッグ | 適合度 |
|---|---|---|---|
| item_mat_t4_rotflesh | 腐肉のかけら | `hone` | △ |
| item_mat_t4_grave_dust | 墓場の灰塵 | `koseki_white` | ○ |
| item_mat_t4_cursed_marrow | 呪詛の髄液 | `crystal_purple` | ○ |
| item_mat_t4_toxic_scale | 毒鱗の粉 | `crystal_yellowgreen` | ○ |
| item_mat_t4_spectral_ash | 亡霊の燐灰 | `crystal_white` | ○ |
| item_mat_t4_steel_gear | 鋼の歯車 | `koseki_silver` | △ |
| item_mat_t4_corroded_plate | 腐食した装甲板 | `vikinghelmet_iron` | ○ |
| item_mat_t4_sovereign_crown | 腐王の冠 | `vikinghelmet_red` | ○ |

---

## サマリ

| 区分 | 個数 |
|---|---|
| 全体（装備 + アイテム） | 100 |
| ◎ ぴったり | 56 |
| ○ 流用（雰囲気合致） | 28 |
| △ 妥協（雰囲気のみ） | 16 |
| × 要別ソース | **0** |

v1 (◎32/○24/△44) → v2 (◎56/○28/△16) で **◎ が 32 → 56 に大幅増、△ は 44 → 16 に大幅減**。

ユニークスラッグ数: 約 60 個（v1 約 39 → v2 約 60）

## 残る △ 16 個の内訳

- 槍（spear）全 tier: 槍単体素材なし → `tsurugi_sanshunojingi` で代用
- 衣（clothes）全 tier: 衣単体素材なし → 魔道士キャラ絵で代用
- 帰還の糸: 適当なポーション色違いで代用
- 木材（item_lumber）: 松ぼっくりで代用
- t1/t3 獣皮、t1 猿王毛皮: 鉱石色違いで代用
- t4 腐肉のかけら、鋼の歯車: 骨・銀鉱石で代用

→ これ以上の改善には **別 CC0 ソース or 自作素材** が必要。

## 次のステップ

1. このマッピング v2 で OK なら、**`scripts/fetch-item-sprites.mjs` を作って一括 DL** → `public/sprites/items/<itemOrEquipId>.png`
2. **`<ItemSprite>` 共通コンポーネント**（`<EnemySprite>` と同じ要領、sm/md サイズ対応）
3. **インベントリ / 商店 / 鍛冶屋 / 装備画面のリスト各行**にスプライト組込
4. **Storybook ストーリー**で見た目確認
