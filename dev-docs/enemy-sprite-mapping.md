# 敵スプライト マッピング表（DOT ILLUST → 本作 60 体）

> 提供素材: https://dot-illust.net/ （管理人 nko 氏）
>
> ライセンス: 非商用なら点数制限なし／クレジット表記不要／加工OK／再配布・販売・NFT化・LINEスタンプ化・商標登録は禁止。
> 詳細は https://dot-illust.net/terms/
>
> 本リポジトリは個人趣味の非商用プロジェクトのため、点数制限なしで利用可能（収益・広告が発生した場合は再評価すること）。

## マッピング方針

1. **同種の動物がある場合はそれを採用**（色違いがあれば tier 別に振り分け）。
2. **同種がない場合は形態が近いモンスター/動物素材を流用**（例: 大猿王 → ミノタウロス、Wisp → 火スプライト）。
3. **該当素材がないものは「要別ソース」と明記**し、(a) 自作 (b) 別の CC0/MIT 素材サイト (c) 既存素材から自前加工、のいずれかで対応する。
4. **ボス5体は専用素材を確保**。色違い流用は雑魚との差別化のため避ける。

## DL URL の構造

DOT ILLUST の素材は全てこの URL から直接 PNG が取得できる:

```
https://dot-illust.net/wp-content/themes/dotillust/assets/dl/<slug>.png
```

SVG が必要なら `.png` を `.svg` に。横幅 500px 程度の静止画。

## マッピング表

`◎` = 種類ぴったり / `○` = 形態が近い代替 / `△` = 大きく異なるが流用 / `×` = 要別ソース

### Tier 0: 序章・森林

| ID | 敵名 | 区分 | 採用スラッグ | 適合度 | 備考 |
|---|---|---|---|---|---|
| enemy_slime | スライム | 雑魚 | `character_monster_slime_green` | ◎ | |
| enemy_giant_rat | おおねずみ | 雑魚 | `nezumi_brown` | ◎ | |
| enemy_cave_bat | どうくつコウモリ | 雑魚 | — | × | DOT ILLUST にコウモリ無し。要別ソース or `character_monster_ghost_black` で「闇影」表現に流用 |
| enemy_boss_gatekeeper | 門番のゴーレム | **BOSS** | `character_monster_golem_brown` | ◎ | |
| enemy_t0_forest_rabbit | もりウサギ | 雑魚 | `usagi_brown` | ◎ | 色違いに `usagi_dutch_brown` |
| enemy_t0_glow_mushroom | ひかりタケ | 雑魚 | `character_monster_kinoko_green` | ◎ | |
| enemy_t0_wood_caracal | やぶカラカル | 雑魚 | — | × | ネコ科の野生種無し。要別ソース or `okami_brown` で「茶色の獣」流用 |
| enemy_t0_pale_wisp | あおざめた亡霊 | 雑魚 | `character_monster_ghost_white` | ◎ | |
| enemy_t0_bristle_boar | こイノシシ | 雑魚 | `uribo_01` | ◎ | 別案 `uribo_02` |
| enemy_t0_thicket_stag | しげみのオオツノジカ | 雑魚 | `shika_tsuno` | ◎ | |
| enemy_t0_cave_crawler | どうくつヤスデ | 雑魚 | — | × | 虫系素材なし。要別ソース |
| enemy_t0_elder_treant | ふるびた樹人 | 雑魚 | `character_monster_treant_01` | ◎ | |

### Tier 1: 山岳

| ID | 敵名 | 区分 | 採用スラッグ | 適合度 | 備考 |
|---|---|---|---|---|---|
| enemy_t1_crag_goat | がんぺきヤギ | 雑魚 | `yagi_kuroyagi_tsuno` | ◎ | |
| enemy_t1_rock_lizard | いわトカゲ | 雑魚 | `character_monster_dragon_01_green` | ○ | 単独「トカゲ」素材なし、小型ドラゴンで代用 |
| enemy_t1_highland_hawk | こうちタカ | 雑魚 | `taka_brown` | ◎ | |
| enemy_t1_stone_beetle | いわかぶとムシ | 雑魚 | — | × | 虫系なし。要別ソース |
| enemy_t1_cliff_ram | がけのオオヒツジ | 雑魚 | `hitsuji_kurohitsuji_tsuno` | ◎ | |
| enemy_t1_ember_lizard | ほむらトカゲ | 雑魚 | `character_monster_dragon_01_red` | ◎ | 火属性カラーが合う |
| enemy_t1_boulder_toad | いわガマ | 雑魚 | `kaeru_02` | ◎ | |
| enemy_t1_young_baboon | わかザル | 雑魚 | `saru_nihonzaru` | ○ | サル系素材が1種のみ。色違い不可 |
| enemy_t1_boulder_ogre | おおいわのオーガ | 雑魚 | `character_monster_troll_01_02` | ◎ | 棍棒持ちトロール |
| enemy_t1_thunder_roc | いかずちの大ワシ | 雑魚 | `taka_white` | ○ | 鷲は無いので白い大型タカで代用 |
| enemy_t1_magma_drake | マグマの竜トカゲ | 雑魚 | `character_monster_dragon_02_red` | ◎ | |
| enemy_t1_boss_mountain_lord | 山嶺の大猿王 | **BOSS** | `character_monster_minotaur_02` | ○ | 大型サル素材なし、斧持ちミノタウロスで「山の王」を表現 |

### Tier 2: 氷雪

| ID | 敵名 | 区分 | 採用スラッグ | 適合度 | 備考 |
|---|---|---|---|---|---|
| enemy_t2_frostfang_wolf | シモフリオオカミ | 雑魚 | `okami_white` | ◎ | |
| enemy_t2_snow_ape | セッペキザル | 雑魚 | `character_monster_yeti_01_blue` | ◎ | 雪猿としてイエティ流用が自然 |
| enemy_t2_glacier_crab | ヒョウケツガニ | 雑魚 | — | × | カニ系なし。要別ソース |
| enemy_t2_snow_owl | セツゲンフクロウ | 雑魚 | `fukuro_morifukuro` | ○ | フクロウ素材は白系なし、森フクロウで代用 |
| enemy_t2_ice_wisp | コオリビ | 雑魚 | `character_monster_hi_blue` | ◎ | 青い炎＝氷の鬼火 |
| enemy_t2_rime_beetle | ジュヒョウムシ | 雑魚 | — | × | 虫系なし。要別ソース |
| enemy_t2_frost_stag | ヒョウガジカ | 雑魚 | `shika_tsuno` | △ | tier 0 と素材重複。色加工 or 別ソース推奨 |
| enemy_t2_snow_serpent | セツゲンヘビ | 雑魚 | `hebi` | △ | ヘビ素材は1色のみ。色加工推奨 |
| enemy_t2_glacial_bear | ヒョウガグマ | 雑魚 | `kuma_shirokuma` | ◎ | シロクマ |
| enemy_t2_iron_ice_golem | ヒョウケツゴーレム | 雑魚 | `character_monster_golem_gray` | ◎ | |
| enemy_t2_blizzard_hawk | フブキタカ | 雑魚 | `taka_white` | ◎ | |
| enemy_t2_boss_frost_monarch | 氷晶の女王 | **BOSS** | `character_monster_lamia_purple` | ○ | 蛇女ラミアを氷の女王に。色味加工推奨。別案 `character_monster_yeti_02_blue`（大型雪女） |

### Tier 3: 雷嵐

| ID | 敵名 | 区分 | 採用スラッグ | 適合度 | 備考 |
|---|---|---|---|---|---|
| enemy_t3_storm_wolf | ライメイオオカミ | 雑魚 | `okami_gray` | ◎ | |
| enemy_t3_thunder_bird | ライウチョウ | 雑魚 | `taka_white` | △ | tier 2 と素材重複。色加工 or 別ソース推奨 |
| enemy_t3_spark_beetle | ホウデンムシ | 雑魚 | — | × | 虫系なし。要別ソース |
| enemy_t3_gale_serpent | シップウヘビ | 雑魚 | `hebi` | △ | 単色のみ、色加工推奨 |
| enemy_t3_charged_wisp | イカズチビ | 雑魚 | `character_monster_hi_purple` | ◎ | 紫の炎＝雷の鬼火 |
| enemy_t3_tempest_ape | アラシザル | 雑魚 | `character_monster_yeti_02_black` | ◎ | 黒イエティ |
| enemy_t3_static_crystal | タイデンクリスタル | 雑魚 | — | × | 鉱物素材なし。要別ソース（クリスタルは自作容易） |
| enemy_t3_rain_hawk | シグレタカ | 雑魚 | `taka_brown` | △ | tier 1 と素材重複。色加工推奨 |
| enemy_t3_thunder_beast | ゴウライジュウ | 雑魚 | `character_monster_dragon_02_yellow` | ◎ | 雷獣＝黄色いドラゴン |
| enemy_t3_storm_roc | バクフウチョウ | 雑魚 | `taka_white` | △ | 大鳥流用。色加工推奨 |
| enemy_t3_discharge_idol | ホウデンキョゾウ | 雑魚 | `character_monster_gargoyle_stone` | ○ | 石像ガーゴイル |
| enemy_t3_boss_tempest_sovereign | 雷霆の覇王 | **BOSS** | `character_monster_mao_03` | ◎ | 杖持ち魔王 |

### Tier 4: 瘴気・腐敗都市

| ID | 敵名 | 区分 | 採用スラッグ | 適合度 | 備考 |
|---|---|---|---|---|---|
| enemy_t4_rotwalker | 腐肉の徘徊者 | 雑魚 | `character_monster_zombie_green` | ◎ | |
| enemy_t4_bone_lancer | 骸骨の突撃兵 | 雑魚 | `character_monster_skeleton_02` | ◎ | 装備持ちスケルトン |
| enemy_t4_miasma_moth | 瘴気の毒蛾 | 雑魚 | — | × | 蛾・蝶系なし。要別ソース |
| enemy_t4_wraith_lantern | 彷徨う鬼火 | 雑魚 | `character_monster_hi_purple` | △ | tier 3 と素材重複。色加工 or 別ソース推奨 |
| enemy_t4_rust_sentinel | 錆びた哨戒機 | 雑魚 | `character_monster_gargoyle_purple` | ○ | 機械素材なし、ガーゴイルで代用 |
| enemy_t4_plague_crawler | 疫病の這い虫 | 雑魚 | `character_monster_ika_green` | △ | 虫なし、触手系イカで代用 |
| enemy_t4_grave_acolyte | 墓守の呪詛師 | 雑魚 | `character_monster_majo_02_orange` | ◎ | 魔女 |
| enemy_t4_gear_hound | 鋼鉄の番犬 | 雑魚 | `okami_black` | ○ | 黒い狼で代用 |
| enemy_t4_corpse_colossus | 腐肉の巨像 | 雑魚 | `character_monster_frankenstein_02_blue` | ◎ | |
| enemy_t4_siege_automaton | 攻城の自動兵器 | 雑魚 | `character_monster_golem_gray` | △ | tier 2 と素材重複。色加工推奨 |
| enemy_t4_shroud_revenant | 帷子の怨霊 | 雑魚 | `character_monster_mummy_red` | ◎ | |
| enemy_t4_boss_blight_sovereign | 瘴気を統べる腐王 | **BOSS** | `character_daiakuma_02_02_black` | ◎ | 水晶持ち大悪魔 |

## サマリ

| 区分 | 体数 |
|---|---|
| 全体 | **60** |
| ◎ ぴったり | 31 |
| ○ 形態が近い代替 | 11 |
| △ 流用＋色加工推奨 | 9 |
| × 要別ソース | **9** |

### × 要別ソース 9体（優先対応）

| 系統 | 該当敵 |
|---|---|
| 虫類 (5体) | enemy_t0_cave_crawler / enemy_t1_stone_beetle / enemy_t2_rime_beetle / enemy_t3_spark_beetle / enemy_t4_miasma_moth |
| コウモリ | enemy_cave_bat |
| カニ | enemy_t2_glacier_crab |
| ネコ科 | enemy_t0_wood_caracal |
| 鉱物 | enemy_t3_static_crystal |

これら9体は、

- (A) **OpenGameArt / itch.io から CC0 ドット絵を別途調達**（虫・カニ・コウモリは LPC スタイルや 16x16 RPG 素材で豊富）
- (B) **△マークの色加工と組み合わせて、DOT ILLUST の他素材を加工転用**（クリスタル → `character_monster_hi_purple` を結晶風に編集等）
- (C) **AI 生成（pixil-art / pixela 等）でドット絵を生成し本素材に寄せる**

のいずれかで埋める。

## 次のステップ候補

1. **一括ダウンロードスクリプトを作る**: `scripts/fetch-dot-illust-sprites.mjs` を作り、本表の採用スラッグを全件取得 → `src/assets/enemies/<enemyId>.png` に保存。
2. **× の 9 体について別素材ソースを調査**: 同じく `dev-docs/enemy-sprite-supplements.md` でカバー方針を確定。
3. **本素材を BattleScreen に組み込む試作**: 1〜2 体だけ先に組み込んで、サイズ感・背景との馴染みを確認してから全量配置。

---

## × の 9 体「逆マッピング差し替え案」

DOT ILLUST 側に該当素材がない 9 体について、**素材を作りに行く**のではなく、**素材に合わせて敵側のコンセプトを差し替える**方針に変更。各 tier の世界観と、もとの敵が担っていた戦闘ロール（kit 種別・属性・状態異常役 等）は維持する。

**前提**:
- `id` (例: `enemy_cave_bat`) は変更**しない**。SaveData / 既存テスト / バランスシミュレータが参照しているため
- `name` / `attackElement` / `resist` / `drops` などのフレーバー寄りの項目は調整可
- `baseStats` / `refDepth` / `tierBand` / `exp` / `gold` / `kit` などのバランス値は基本据え置き（kit が形態にそぐわなくなる場合のみ別 kit に差し替え検討）

| ID | 旧名 | 新名（案） | 採用スラッグ | コンセプト |
|---|---|---|---|---|
| enemy_cave_bat | どうくつコウモリ | **もりゴブリン** | `character_monster_goblin_01` | 森に潜む人型小モンスター。機動力高めの初手撹乱役を維持 |
| enemy_t0_wood_caracal | やぶカラカル | **やぶの花妖（はなあやかし）** | `character_monster_hana_01` | 森の植物系トラップ。ネコ科 → 植物枠へ転換 |
| enemy_t0_cave_crawler | どうくつヤスデ | **どくスライム** | `character_monster_slime_purple` | 「地中・気持ち悪い」枠を紫毒スライムへ。毒攻撃の説得力強化 |
| enemy_t1_stone_beetle | いわかぶとムシ | **いわくつのミミック** | `character_monster_mimic_red` | 岩窟に潜む宝箱型化け物。防御カチカチ・防御 buff 持ちのフレーバーが合致 |
| enemy_t2_glacier_crab | ヒョウケツガニ | **ひょうけつの人造兵** | `character_monster_frankenstein_01_blue` | 蟹 → 青く凍った人造の歩兵。氷の城塞の番兵感 |
| enemy_t2_rime_beetle | ジュヒョウムシ | **じゅひょうの精** | `character_monster_treant_02_green` | 樹氷をまとった小型トレント。tier 2 の植物系として整合 |
| enemy_t3_spark_beetle | ホウデンムシ | **らいでんイカ** | `character_monster_ika_purple` | 触手から雷を放つ謎の浮遊生物。tier 3 雷帯電と相性◎ |
| enemy_t3_static_crystal | タイデンクリスタル | **あらしの吸血族（ちのきぞく）** | `character_monster_kyuketsuki_01_purple` | 鉱物 → 雷雲に潜む吸血型に転換。tier 3 ボス級 mini-boss の威厳付け |
| enemy_t4_miasma_moth | 瘴気の毒蛾 | **下級の死神** | `character_monster_shinigami_01` | 毒蛾 → 鎌を構える下級死神。tier 4 のフレーバーが大幅に強化される |

### 各差し替えのバランス影響（kit/属性/状態異常役の整合チェック）

| ID | 旧 attackElement / kit / 状態異常 | 影響 | 対応 |
|---|---|---|---|
| enemy_cave_bat | 既存 enemies.ts 要確認 | 「コウモリの俊敏な突進」→「ゴブリンの粗野な殴打」に変わるが、kit はそのまま流用可 | コメント文だけ調整 |
| enemy_t0_wood_caracal | カラカル（俊敏アタッカー想定）→ 花妖（植物罠系） | kit が `zako_bruiser` 系なら問題なし。`zako_runner` 系なら「花の触手で素早く打つ」と読み替え | kit 据え置き |
| enemy_t0_cave_crawler | ヤスデ（毒系想定） | スライムも毒イメージで矛盾なし | 据え置き |
| enemy_t1_stone_beetle | 甲虫（防御系想定） | ミミックも甲殻硬い系で整合 | 据え置き |
| enemy_t2_glacier_crab | カニ（挟みアタッカー） | フランケン人造は鈍重パワー型 → やや遅め。問題なし | 据え置き |
| enemy_t2_rime_beetle | 樹氷虫（氷系） | 小トレントも氷属性付与可 | 据え置き |
| enemy_t3_spark_beetle | 電撃虫 | らいでんイカも電撃役で整合 | 据え置き |
| enemy_t3_static_crystal | 鉱物（防御固い・物理耐性） | 吸血鬼系は柔らかいので、`resist` の物理耐性をそのまま残すと「打たれ強い吸血鬼」になる | resist プロパティを「雷耐性のみ」に微調整推奨 |
| enemy_t4_miasma_moth | 毒蛾（状態異常役） | 下級死神も呪いや毒の状態異常イメージで整合 | 据え置き |

→ **影響が小さい**ため、ほぼ name / 描写 / drops 名称の差し替えで完了する。`enemy_t3_static_crystal` のみ resist の見直し推奨。

### 完了後

全 60 体が DOT ILLUST 素材で 100% カバーされる。`scripts/fetch-dot-illust-sprites.mjs` の `SPRITE_MAP` に上記 9 件を追記して再実行すれば、`src/assets/enemies/` も全件揃う。
