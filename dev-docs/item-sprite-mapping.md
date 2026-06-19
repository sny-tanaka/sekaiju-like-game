# アイテム / 装備スプライト マッピング表 v5（DOT ILLUST + Kenney Tiny Dungeon → 本作 100 個）

> 提供素材: https://dot-illust.net/  （管理人 nko 氏、ライセンスは [enemy-sprite-mapping.md](./enemy-sprite-mapping.md) 参照）
> Kenney 素材: https://kenney.nl/assets/tiny-dungeon （CC0 1.0、クレジット不要）

## v4 → v5 の変更点

第二次ユーザーレビューで NG だった 21 件のうち、DOT ILLUST 内で代替が見つかった 6 件を差し替え:

- 拳 5 個: `hammer` → ニット手袋 tier 別色違い (`tebukuro_knit_*_right`)
  - equip_iron_knuckle → `tebukuro_knit_brown_right`
  - equip_t2_fist → `tebukuro_knit_red_right`
  - equip_t3_fist → `tebukuro_knit_blue_right`
  - equip_t4_fist → `tebukuro_knit_green_right`
  - equip_t5_fist → `tebukuro_knit_black_right`
- equip_iron_armor: `shield_buckler_wood` → `armor_iron`（全身鉄鎧に戻す）
- `ItemSprite.tsx` の hue-rotate を fist も除外（tier 別色違い画像があるため）

残り 15 件は DOT ILLUST に単体素材が存在せず、ユーザー調達依頼として据え置き（詳細は「ユーザー調達依頼リスト」参照）

## ユーザー調達依頼リスト（15 件）

DOT ILLUST にも Kenney にも適切な素材が見つからなかった以下のアイテムは、別の素材ソース（OpenGameArt / pixela / AI 生成等）から調達が必要です。

### 軽装防具 6 個（服・コート・マント単体絵が必要）

| ID | 名前 | 現状スラッグ | 理由 |
|---|---|---|---|
| equip_leather_armor | 革の鎧 | `character_heishi_armor_01_01_red` | 兵士キャラ絵（ユーザー NG） |
| equip_bat_cloak | コウモリのマント | `character_heishi_armor_01_01_blue` | 兵士キャラ絵（ユーザー NG） |
| equip_t2_light | 軽装 tier 2 | `character_heishi_armor_01_01_green` | 兵士キャラ絵（ユーザー NG） |
| equip_t3_light | 軽装 tier 3 | `character_heishi_armor_02_01_red` | 兵士キャラ絵（ユーザー NG） |
| equip_t4_light | 軽装 tier 4 | `character_heishi_armor_02_01_blue` | 兵士キャラ絵（ユーザー NG） |
| equip_t5_light | 軽装 tier 5 | `character_heishi_armor_02_01_green` | 兵士キャラ絵（ユーザー NG） |

### 衣 5 個（ローブ単体絵が必要）

| ID | 名前 | 現状スラッグ | 理由 |
|---|---|---|---|
| equip_cloth_robe | 布のローブ | `character_shinpu_green` | 神父キャラ絵（ユーザー NG） |
| equip_t2_clothes | 衣 tier 2 | `character_soryo_purple` | 僧侶キャラ絵（ユーザー NG） |
| equip_t3_clothes | 衣 tier 3 | `character_madoshi_01_black` | 魔道士キャラ絵（ユーザー NG） |
| equip_t4_clothes | 衣 tier 4 | `character_mahotsukai_01_purple` | 魔法使いキャラ絵（ユーザー NG） |
| equip_t5_clothes | 衣 tier 5 | `character_mahotsukai_02_black` | 魔法使いキャラ絵（ユーザー NG） |

### しっぽ 1 個（尻尾単体絵が必要）

| ID | 名前 | 現状スラッグ | 理由 |
|---|---|---|---|
| item_rat_tail | ねずみのしっぽ | `nezumi_albino` | アルビノネズミ全体絵（ユーザー NG） |

### 毛皮 3 個（革・皮・毛皮単体絵が必要）

| ID | 名前 | 現状スラッグ | 理由 |
|---|---|---|---|
| item_mat_t0_soft_pelt | やわらかな毛皮 | `usagi_albino` | 白ウサギ全体絵（ユーザー NG） |
| item_mat_t2_frost_pelt | 霜降りの毛皮 | `kuma_shirokuma` | シロクマ全体絵（ユーザー NG） |
| item_mat_t3_charged_hide | 帯電した獣皮 | `okami_gray` | 灰色オオカミ全体絵（ユーザー NG） |

---

## v3 → v4 の変更点

Storybook SpriteCatalog レビューで NG 判定された 23 件を差し替え、防具 heavy/light を入れ替え、
衣 5 個を多様化。さらに剣以外の武器に CSS hue-rotate で tier 別色違いを付与。

### 差し替え一覧

| ID | v3 スラッグ | v4 スラッグ | 理由 |
|---|---|---|---|
| item_tp_herb | portion_02_purple_01 | `kaede_green` | まほうのは → 青楓（葉っぱ） |
| item_tp_herb_mid | portion_02_purple_02 | `kaede_orange` | よいまほうのは → 橙楓 |
| item_tp_herb_hi | portion_02_pink | `kaede_red` | とくぶつまほうのは → 赤楓 |
| item_rat_tail | nezumi_brown | `nezumi_albino` | ねずみのしっぽ → アルビノネズミ |
| item_lumber | matsubokkuri | `ki_kareki` | 良質な木材 → 枯れ木 |
| item_mat_t0_soft_pelt | usagi_brown | `usagi_albino` | やわらかな毛皮 → 白ウサギ |
| item_mat_t1_drake_horn | crystal_red | `crown_02_bronze_red` | 竜トカゲの角 → ブロンズ赤王冠 |
| item_mat_t1_lord_pelt | koseki_yellow | `saru_nihonzaru` | 猿王の毛皮 → ニホンザル |
| item_mat_t2_frost_pelt | usagi_white | `kuma_shirokuma` | 霜降りの毛皮 → シロクマ |
| item_mat_t2_monarch_diadem | jewelry_emerald_lightblue | `crown_02_silver_blue` | 女王の氷冠 → 銀青王冠 |
| item_mat_t3_sovereign_horn | crystal_sphere_yellow | `crown_02_gold_blue` | 覇王の雷角 → 金青王冠 |
| item_mat_t3_charged_hide | koseki_purple | `okami_gray` | 帯電した獣皮 → 灰色オオカミ |
| item_mat_t4_steel_gear | tile_0100 (Kenney) | `ring_silver` | 鋼の歯車 → DOT ILLUST ring_silver |

### 防具 heavy ⇔ light 入れ替え

旧 light（盾・腰当系）が「重装に見える」ため heavy に移動し、旧 heavy（全身甲冑）は light に移動。

| ID | v3 スラッグ | v4 スラッグ |
|---|---|---|
| equip_iron_armor | armor_iron | `shield_buckler_wood` |
| equip_slime_shield | armor_red | `shield_buckler_iron` |
| equip_t2_heavy | armor_blue | `armor_koshiate_iron` |
| equip_t3_heavy | armor_green | `armor_koshiate_red` |
| equip_t4_heavy | armor_red_02 | `armor_koshiate_blue` |
| equip_t5_heavy | armor_blue_02 | `armor_koshiate_green` |
| equip_leather_armor | shield_buckler_wood | `character_heishi_armor_01_01_red` |
| equip_bat_cloak | shield_buckler_iron | `character_heishi_armor_01_01_blue` |
| equip_t2_light | armor_koshiate_iron | `character_heishi_armor_01_01_green` |
| equip_t3_light | armor_koshiate_red | `character_heishi_armor_02_01_red` |
| equip_t4_light | armor_koshiate_blue | `character_heishi_armor_02_01_blue` |
| equip_t5_light | armor_koshiate_green | `character_heishi_armor_02_01_green` |

### 衣 5 個を多様化

| ID | v3 スラッグ | v4 スラッグ |
|---|---|---|
| equip_cloth_robe | character_madoshi_01_purple | `character_shinpu_green` |
| equip_t2_clothes | character_madoshi_01_purple | `character_soryo_purple` |
| equip_t3_clothes | character_madoshi_01_purple | `character_madoshi_01_black` |
| equip_t4_clothes | character_madoshi_01_purple | `character_mahotsukai_01_purple` |
| equip_t5_clothes | character_madoshi_01_purple | `character_mahotsukai_02_black` |

### 剣以外の武器に CSS hue-rotate（実装）

`ItemSprite.tsx` にて、`slot === 'weapon' && weaponType !== 'sword'` のとき tier に応じた
`hue-rotate` を inline style で付与。剣は tier 別色違い画像があるため除外。

```ts
const TIER_HUE_SHIFTS = [0, 40, 100, 180, 240, 290]; // T0〜T5
```

これにより槍/斧/弓/拳/杖の全 tier が同一画像でも色で識別可能になった。

## v2 → v3 の変更点

- **Kenney Tiny Dungeon (CC0) で確信のある 3 個を差し替え**:
  - `item_return_thread` → tile_0124（スクロール/巻物） ◎
  - `item_mat_t4_rotflesh` → tile_0120（骨付き肉） ◎
  - `item_mat_t4_steel_gear` → tile_0100（コイン/円形） ○
- 残り 13 個（槍 5、衣 5、木材、猿王毛皮、帯電獣皮）は **Kenney にも該当タイルなし**のため v2 のまま据え置き
- 適合度サマリ: ◎ 56 → 59、○ 28 → 29、△ 16 → 13

## Kenney CC0 補完について

差し替えた 3 個は https://kenney.nl/assets/tiny-dungeon の Kenney Tiny Dungeon (CC0 1.0) 由来。
クレジット表記不要（CC0）だが、出所として本セクションを残す。

## v1 → v2 の変更点

- **tier ごとに色違い・素材違いを徹底**: 武器（剣のロングソード色違いシリーズ）、防具（armor の色違い）、装飾品（指輪 → ジュエリー進化系統）
- **`tag/armor/` `tag/accessory/` `tag/crystal/` `tag/weapon/` を発見**して大量の素材プールを獲得
- **結晶系素材を `crystal_*` に差し替え**（よりクリスタルらしい見た目）
- **軽装鎧をバックラー盾、装飾品をジュエリー進化**で tier 識別性アップ
- ユニーク素材数: v1 約 39 → **v2 約 60 個**（同一系統での使い回しは保持しつつ、tier 識別性を獲得）

## マッピング方針

1. **リスト内の名前左に表示する小アイコン用途** に最適化（sm 約 48px）。
2. **同種類装備でも tier ごとに色違いで識別**（例: ショートソード = 茶色、銀の剣 = 赤、ミスリルソード = 青）。
3. tier 違いの色違い素材がない場合（槍・斧・弓・杖）は同じ素材を使い回し、名前で識別。拳は v5 で tier 別色違い画像を採用。
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
| **spear（槍）** | 0-5 | equip_iron_spear / equip_t2-t5_spear | `tsurugi_sanshunojingi` + hue-rotate | ○ |
| **axe（斧）** | 0-5 | equip_battle_axe / equip_t2-t5_axe | `ono` + hue-rotate | ◎ |
| **bow（弓）** | 0-5 | equip_short_bow / equip_t2-t5_bow | `yumi` + hue-rotate | ◎ |
| **fist（拳）** | 0 | equip_iron_knuckle | `tebukuro_knit_brown_right` | ◎ |
| | 2 | equip_t2_fist | `tebukuro_knit_red_right` | ◎ |
| | 3 | equip_t3_fist | `tebukuro_knit_blue_right` | ◎ |
| | 4 | equip_t4_fist | `tebukuro_knit_green_right` | ◎ |
| | 5 | equip_t5_fist | `tebukuro_knit_black_right` | ◎ |
| **staff（杖）** | 0-5 | equip_oak_staff / equip_t2-t5_staff | `tsue` + hue-rotate | ◎ |

> 槍/斧/弓/杖は tier 別色違い画像なし。v4 から CSS hue-rotate で tier 別色相シフト（TIER_HUE_SHIFTS = [0, 40, 100, 180, 240, 290]）を付与。
> 拳（fist）は v5 で tier 別色違い画像（tebukuro_knit_*_right）を採用したため hue-rotate 対象から除外。

#### 防具（armorType × tier）

| 種別 | tier | ID | 採用スラッグ | 適合度 |
|---|---|---|---|---|
| **heavy（重装）** | 0 | equip_iron_armor | `armor_iron` | ◎ |
| | 1 | equip_slime_shield | `shield_buckler_iron` | ○ |
| | 2 | equip_t2_heavy | `armor_koshiate_iron` | ○ |
| | 3 | equip_t3_heavy | `armor_koshiate_red` | ○ |
| | 4 | equip_t4_heavy | `armor_koshiate_blue` | ○ |
| | 5 | equip_t5_heavy | `armor_koshiate_green` | ○ |
| **light（軽装）** | 0 | equip_leather_armor | `character_heishi_armor_01_01_red` **(未解決)** | ○ |
| | 1 | equip_bat_cloak | `character_heishi_armor_01_01_blue` **(未解決)** | ○ |
| | 2 | equip_t2_light | `character_heishi_armor_01_01_green` **(未解決)** | ○ |
| | 3 | equip_t3_light | `character_heishi_armor_02_01_red` **(未解決)** | ○ |
| | 4 | equip_t4_light | `character_heishi_armor_02_01_blue` **(未解決)** | ○ |
| | 5 | equip_t5_light | `character_heishi_armor_02_01_green` **(未解決)** | ○ |
| **clothes（衣）** | 0 | equip_cloth_robe | `character_shinpu_green` **(未解決)** | ○ |
| | 2 | equip_t2_clothes | `character_soryo_purple` **(未解決)** | ○ |
| | 3 | equip_t3_clothes | `character_madoshi_01_black` **(未解決)** | ○ |
| | 4 | equip_t4_clothes | `character_mahotsukai_01_purple` **(未解決)** | ○ |
| | 5 | equip_t5_clothes | `character_mahotsukai_02_black` **(未解決)** | ○ |
| **accessory（装飾）** | 0 | equip_amulet | `ring_bronze` | ◎ |
| | 2 | equip_t2_accessory | `ring_silver` | ◎ |
| | 3 | equip_t3_accessory | `ring_gold` | ◎ |
| | 4 | equip_t4_accessory | `jewelry_round_purple` | ◎ |
| | 5 | equip_t5_accessory | `jewelry_emerald_red` | ◎ |

> 衣は v3 まで一律 character_madoshi_01_purple だったが、v4 で神父/僧侶/魔道士/魔法使い のバリエーション化。装飾品は ring → jewelry で tier 進化。

---

### アイテム（46 個）

#### 消耗品（6 個）

| ID | 名前 | 採用スラッグ | 適合度 |
|---|---|---|---|
| item_potion | やくそう | `portion_01_green` | ◎ |
| item_hi_potion | よいやくそう | `portion_01_red` | ◎ |
| item_tp_herb | まほうのは | `kaede_green` | ◎ |
| item_tp_herb_mid | よいまほうのは | `kaede_orange` | ◎ |
| item_tp_herb_hi | とくぶつまほうのは | `kaede_red` | ◎ |
| item_return_thread | 帰還の糸 | `tile_0124 (Kenney)` | ◎ |

#### 売却素材 - モンスタードロップ（4 個）

| ID | 名前 | 採用スラッグ | 適合度 |
|---|---|---|---|
| item_slime_jelly | スライムゼリー | `character_monster_slime_green` | ◎ |
| item_rat_tail | ねずみのしっぽ | `nezumi_albino` **(未解決)** | ○ |
| item_bat_wing | もりゴブリンの小刀 | `cutlery_knife` | ◎ |
| item_golem_core | ゴーレムの核 | `crystal_sphere_blue` | ◎ |

#### 採集素材（3 個）

| ID | 名前 | 採用スラッグ | 適合度 |
|---|---|---|---|
| item_ore | 鉄鉱石 | `koseki_iron` | ◎ |
| item_medic_herb | 薬の葉 | `prune_leaf` | ◎ |
| item_lumber | 良質な木材 | `ki_kareki` | ○ |

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
| item_mat_t0_soft_pelt | やわらかな毛皮 | `usagi_albino` **(未解決)** | ○ |
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
| item_mat_t1_drake_horn | 竜トカゲの角 | `crown_02_bronze_red` | ○ |
| item_mat_t1_lord_pelt | 猿王の毛皮 | `saru_nihonzaru` | ○ |

##### tier 2

| ID | 名前 | 採用スラッグ | 適合度 |
|---|---|---|---|
| item_mat_t2_frost_pelt | 霜降りの毛皮 | `kuma_shirokuma` **(未解決)** | ○ |
| item_mat_t2_ice_crystal | 凍てつく結晶 | `crystal_lightblue` | ◎ |
| item_mat_t2_chill_core | 冷気の核 | `crystal_sphere_lightblue` | ◎ |
| item_mat_t2_monarch_diadem | 女王の氷冠 | `crown_02_silver_blue` | ◎ |

##### tier 3

| ID | 名前 | 採用スラッグ | 適合度 |
|---|---|---|---|
| item_mat_t3_charged_hide | 帯電した獣皮 | `okami_gray` **(未解決)** | ○ |
| item_mat_t3_storm_feather | 嵐鳥の風切羽 | `hane_yellow` | ◎ |
| item_mat_t3_thunder_carapace | 雷甲の外殻 | `crystal_yellow` | ○ |
| item_mat_t3_sovereign_horn | 覇王の雷角 | `crown_02_gold_blue` | ◎ |

##### tier 4

| ID | 名前 | 採用スラッグ | 適合度 |
|---|---|---|---|
| item_mat_t4_rotflesh | 腐肉のかけら | `tile_0120 (Kenney)` | ◎ |
| item_mat_t4_grave_dust | 墓場の灰塵 | `koseki_white` | ○ |
| item_mat_t4_cursed_marrow | 呪詛の髄液 | `crystal_purple` | ○ |
| item_mat_t4_toxic_scale | 毒鱗の粉 | `crystal_yellowgreen` | ○ |
| item_mat_t4_spectral_ash | 亡霊の燐灰 | `crystal_white` | ○ |
| item_mat_t4_steel_gear | 鋼の歯車 | `ring_silver` | ○ |
| item_mat_t4_corroded_plate | 腐食した装甲板 | `vikinghelmet_iron` | ○ |
| item_mat_t4_sovereign_crown | 腐王の冠 | `vikinghelmet_red` | ○ |

---

## サマリ

| 区分 | 個数 |
|---|---|
| 全体（装備 + アイテム） | 100 |
| ◎ ぴったり | 59 |
| ○ 流用（雰囲気合致）うち未解決 15 件含む | 41 |
| △ 妥協（雰囲気のみ） | 0 |
| × 要別ソース | **0** |
| **(未解決)** ユーザー調達待ち | **15** |

v1 (◎32/○24/△44) → v2 (◎56/○28/△16) → v3 (◎59/○29/△13) → v4 (◎53/○47/△0) → **v5 (◎59/○41/△0/未解決15)**。
v5: 拳 5 個（○→◎）+ equip_iron_armor（○→◎）= 6 件が ◎ に格上げ。
未解決 15 件（軽装 6 / 衣 5 / しっぽ 1 / 毛皮 3）はユーザー調達待ち。

ユニークスラッグ数: 約 75 個（v5 で拳 5 スラッグ + armor_iron を新規追加）

## 注記

- 槍（spear）全 tier（5 個）: CSS hue-rotate で tier 別色相シフト付与（△ → ○）
- 衣（clothes）全 tier（5 個）: 神父/僧侶/魔道士/魔法使い のバリエーションで tier 識別（△ → ○）**(未解決)**
- 木材（item_lumber）: ki_kareki（枯れ木）に差し替え（△ → ○）
- t1 猿王毛皮（item_mat_t1_lord_pelt）: saru_nihonzaru（ニホンザル）に差し替え（△ → ○）
- t3 帯電獣皮（item_mat_t3_charged_hide）: okami_gray（灰色オオカミ）に差し替え（△ → ○）**(未解決)**
- 重装 6 個（v4）: armor_iron/armor_red/blue/green → shield_buckler + koshiate に入れ替え（◎ → ○）
- 重装 t0（v5）: shield_buckler_wood → armor_iron（全身鉄鎧）に戻す（○ → ◎）
- 軽装 6 個: shield_buckler + koshiate → character_heishi_armor に入れ替え（○ → ○）**(未解決)**
- 拳（fist）5 個（v5）: hammer + hue-rotate → tebukuro_knit_*_right（ニット手袋）に差し替え（○ → ◎）
  - hue-rotate も fist を除外対象に追加

→ 未解決 15 件は **別 CC0 ソース or 自作素材** が必要。ユーザー調達依頼リストを参照。

## 次のステップ

1. このマッピング v2 で OK なら、**`scripts/fetch-item-sprites.mjs` を作って一括 DL** → `public/sprites/items/<itemOrEquipId>.png`
2. **`<ItemSprite>` 共通コンポーネント**（`<EnemySprite>` と同じ要領、sm/md サイズ対応）
3. **インベントリ / 商店 / 鍛冶屋 / 装備画面のリスト各行**にスプライト組込
4. **Storybook ストーリー**で見た目確認
