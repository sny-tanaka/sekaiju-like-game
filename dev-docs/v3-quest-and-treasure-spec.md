# v3.0.0 大型アップデート「酒場の依頼と秘宝」設計書

プロデューサー決定事項（2026-07-17）:

> **主軸 = 依頼（クエスト）システム**。同梱:
> ① お金で買えるアイテムを増やす
> ② 敵モンスターの討伐数で虹金銀銅のトロフィーが付く
> ③ コレクションレアドロップ品を実装
> ④ お金とは別の通貨（ジェム）に換金できるアイテムをモンスタードロップに追加
> ⑤ ジェムでしか購入できない特別な武器装備を追加

本書はディレクターが数値・ID・文言まで確定させた実装指示書である。
実装エージェントは本書の値を**そのまま**使うこと（改変・追加判断をしない）。

---

## 0. 全体像と用語

- **ジェム（Gem）**: ゴールドと別の第2通貨。`save.guild.gems`。表示記号は `✦`。
- **換金アイテム**: 敵がドロップする `category:'valuable'` + `gemValue` 付きアイテム。
  ショップの新タブ「交換所」でジェムに換金する。
- **秘宝（コレクション）**: 敵ごとに 1 種のレアドロップ（全 60 種）。倉庫には入らず
  `save.collection`（Record<ItemId, number>）に記録される。図鑑の新セクションで閲覧。
- **討伐勲章（トロフィー）**: 敵ごとの累計討伐数で 銅→銀→金→虹 の 4 段階。
  討伐数は `save.bestiary.monsters[id].kills`。到達時にジェムを自動付与。
- **依頼（クエスト）**: 拠点の新画面「酒場」で受注・報告する短期目標。
  `save.questStates`（既存の optional フィールドを正式採用）。

### 経済ループ

```
戦闘 → 換金アイテム/秘宝ドロップ + 討伐数加算
  ├─ 討伐数 → 勲章 → ジェム自動付与
  ├─ 換金アイテム → ショップ交換所 → ジェム
  ├─ 秘宝 → 図鑑コンプ（帯コンプ/全コンプでジェム・限定装飾品）
  └─ 依頼達成 → ゴールド + ジェム + アイテム
ジェム → 交換所の「秘宝装備」（ジェム限定・ゴールドでは買えない）
ゴールド → 新消耗品（お金の使い道を増強）
```

---

## 1. バランス定数（`src/data/balance.ts` に追記）

`BALANCE` オブジェクトに以下のセクションを追記する（値は確定。変更禁止）:

```ts
// ---- v3.0.0 依頼と秘宝 ----
// 換金アイテムのドロップ（kind 別の確率と、tierBand 別の品目）
GEM_DROP_RATE: { zako: 0.12, foe: 0.5, boss: 1.0 } as const,
// 秘宝（コレクション）のドロップ確率（kind 別）
COLLECT_DROP_RATE: { zako: 0.04, foe: 0.12, boss: 0.25 } as const,
// 秘宝の重複入手 1 個あたりのジェム自動変換量
COLLECT_DUP_GEMS: 2,
// 討伐勲章のしきい値（kind 別、[銅, 銀, 金, 虹]）
TROPHY_THRESHOLDS: {
  zako: [10, 50, 150, 400],
  foe: [3, 10, 30, 80],
  boss: [1, 5, 15, 40],
} as const,
// 勲章到達時のジェム付与（[銅, 銀, 金, 虹]）
TROPHY_GEMS: [2, 5, 15, 50] as const,
// 秘宝の帯（tierBand）コンプリート報酬ジェム / 全 60 種コンプ報酬ジェム
COLLECT_BAND_GEMS: 30,
COLLECT_ALL_GEMS: 100,
// 同時に受注できる依頼数
QUEST_MAX_ACTIVE: 3,
```

---

## 2. セーブスキーマ v6（`types.ts` / `saveData.ts` / `saveSerialization.ts`）

`CURRENT_SCHEMA_VERSION` を **6** に上げ、migration `5 → 6` を追加する。

### 型変更（`src/domain/types.ts`）

1. `Guild` に `gems: number` を追加（必須フィールド）。
2. `BestiaryState.monsters` のエントリに `kills: number` を追加（必須）。
   読み出し側で古い形を踏む可能性がある箇所は `?? 0` で防御する。
3. `SaveData` に `collection: Record<ItemId, number>` を追加（必須。itemId → 入手累計数）。
4. `SaveData.questStates` は **必須化**する（`QuestState[]`、初期値 `[]`）。
   `QuestState` は既存定義（`{ id; status: 'unaccepted'|'active'|'done'; progress? }`）を
   そのまま使う。progress のキーは §7 参照。
5. `ItemMaster` に optional 追加: `gemValue?: number`（換金アイテム）、
   `collectible?: boolean`（秘宝）。
6. `EquipmentMaster` に optional 追加: `gemPrice?: number`（ジェム限定装備。
   `gemPrice` を持つ装備は通常カタログに出さない）。

### migration v5→v6（`saveSerialization.ts`）

- `guild.gems` が number でなければ `0` を設定。
- `bestiary.monsters` の各エントリに `kills` が無ければ `0` を補完
  （`guild.bestiary` ミラー側も同様に補完してよいが、正典はトップレベル）。
- `collection` が無ければ `{}`。
- `questStates` が配列でなければ `[]`。
- `schemaVersion: 6`。

`saveData.ts` の新規セーブ生成（createNewSave 相当）にも同フィールドの初期値を追加する。
`src/__stories__/mockSaves.ts` のファクトリも型が通るよう最小修正する（gems:0 等）。

---

## 3. 換金アイテム（ジェム原石系・4 種）（`src/data/items.ts` に追記）

全て `category: 'valuable'`, `buyPrice: 0`, `useContext` なし。`sellPrice()` は
`valuable` カテゴリで **0 を返す**よう変更する（ゴールド売却不可。換金はジェムのみ）。

| id | name | gemValue | description |
|---|---|---|---|
| `item_gem_shard` | ジェムのかけら | 1 | 小さな輝石のかけら。交換所でジェム1個になる。 |
| `item_gem_stone` | ジェム原石 | 5 | 磨けば輝く原石。交換所でジェム5個になる。 |
| `item_gem_cluster` | ジェムの結晶 | 20 | 澄んだ大粒の結晶。交換所でジェム20個になる。 |
| `item_gem_prism` | 虹輝の宝珠 | 100 | 虹色に輝く至宝。交換所でジェム100個になる。 |

### ドロップ規則（`battle.ts` のターン終了ドロップ抽選箇所 = 既存 `next.drops.push` の直後に追記）

新たに倒れた敵 1 体につき、通常ドロップとは**独立に** 1 回抽選:

- `kind==='zako'`（未指定含む）: 確率 `GEM_DROP_RATE.zako`。
  品目: `tierBand <= 1` → `item_gem_shard` / `tierBand >= 2` → `item_gem_stone`
- `kind==='foe'`: 確率 `GEM_DROP_RATE.foe`。
  品目: `tierBand <= 1` → `item_gem_stone` / `tierBand >= 2` → `item_gem_cluster`
- `kind==='boss'`: 確率 1.0 で `item_gem_cluster`

抽選には同スコープの既存 `rng` を使う（決定論維持）。当選したら
`next.drops.push({ enemyId, itemId })`（既存パイプラインに乗せる → 倉庫へ入る）。

**ボス初回撃破ボーナス**: ボスゲートが未撃破→撃破に変わったとき（`dive.ts` の
ゲート解放処理箇所）、`item_gem_prism` を 1 個倉庫に加える。2 回目以降の同ゲートでは
付与しない。

**図鑑 dropsFound の汚染防止**: `applyBattleResult` の dropsFound 記録は、
`ITEMS[itemId].gemValue` または `collectible` を持つアイテムを**記録対象から除外**する。

---

## 4. 討伐勲章（トロフィー）

### ドメイン（新規 `src/domain/trophy.ts`）

```ts
export type TrophyRank = 0 | 1 | 2 | 3 | 4; // 0=なし 1=銅 2=銀 3=金 4=虹
export function trophyRank(kind: 'zako'|'foe'|'boss', kills: number): TrophyRank
export function trophyGemsForCrossing(kind, before: number, after: number): number
  // before→after で新たに越えたランクの TROPHY_GEMS を合算
export interface TrophyGain { enemyId; name; rank: TrophyRank; gems: number }
export function trophyGains(save: SaveData, state: BattleState): TrophyGain[]
  // 表示用の純関数。applyBattleResult と同一ロジックで「この戦闘で新たに到達した勲章」を返す
```

`kind` は `ENEMIES[id].kind ?? 'zako'`。

### 討伐数の加算（`applyBattleResult` 内）

- 勝敗を問わず、この戦闘で**新たに倒れた敵**（`e.isDown`）1 体につき該当 enemyId の
  `kills` を +1（既存の defeated 記録と同じループで行う）。
- 同戦闘で同種を複数倒した場合はまとめて加算し、`trophyGemsForCrossing` で
  跨いだ全ランク分のジェムを `guild.gems` に加算する。

### UI（図鑑・§9 参照 / 戦闘リザルト・§10 参照）

---

## 5. 秘宝（コレクションレアドロップ・60 種）

### データ（新規 `src/data/collectibles.ts`）

- `COLLECTIBLE_BY_ENEMY: Record<EnemyId, ItemId>`（60 エントリ、下表）。
- アイテム本体は `items.ts` に追記。全て
  `category:'valuable'`, `collectible: true`, `buyPrice: 0`。
  description は固定書式: `「<敵名>がごく稀に落とす蒐集品。好事家が高く評価する。」`

| enemyId | 敵名 | itemId | 秘宝名 |
|---|---|---|---|
| enemy_slime | スライム | item_col_slime | ぷるぷるの核 |
| enemy_giant_rat | おおねずみ | item_col_giant_rat | 金色のヒゲ |
| enemy_cave_bat | もりゴブリン | item_col_cave_bat | ゴブリンの木彫り人形 |
| enemy_t0_forest_rabbit | もりウサギ | item_col_forest_rabbit | 白いふわふわ尻尾 |
| enemy_t0_glow_mushroom | ひかりタケ | item_col_glow_mushroom | 七色に光る胞子袋 |
| enemy_t0_wood_caracal | やぶの花妖 | item_col_wood_caracal | 枯れない小花の冠 |
| enemy_t0_pale_wisp | あおざめた亡霊 | item_col_pale_wisp | 消えない青い灯 |
| enemy_t0_bristle_boar | こイノシシ | item_col_bristle_boar | まっすぐな剛毛 |
| enemy_t0_thicket_stag | しげみのオオツノジカ | item_col_thicket_stag | 王鹿の枝角飾り |
| enemy_t0_cave_crawler | どくスライム | item_col_cave_crawler | 澄んだ毒の雫 |
| enemy_t0_elder_treant | ふるびた樹人 | item_col_elder_treant | 千年輪の木片 |
| enemy_boss_gatekeeper | 門番のゴーレム | item_col_gatekeeper | 門番の紋章石 |
| enemy_t1_crag_goat | がんぺきヤギ | item_col_crag_goat | 渦巻きの角笛 |
| enemy_t1_rock_lizard | いわトカゲ | item_col_rock_lizard | 玉虫色の鱗石 |
| enemy_t1_highland_hawk | こうちタカ | item_col_highland_hawk | 風を知る羽根ペン |
| enemy_t1_stone_beetle | いわくつのミミック | item_col_stone_beetle | 偽物の宝石 |
| enemy_t1_cliff_ram | がけのオオヒツジ | item_col_cliff_ram | ふかふかの雲毛玉 |
| enemy_t1_ember_lizard | ほむらトカゲ | item_col_ember_lizard | 燃えさしの尾先 |
| enemy_t1_boulder_toad | いわガマ | item_col_boulder_toad | ガマの油壺 |
| enemy_t1_young_baboon | わかザル | item_col_young_baboon | サルの宝物袋 |
| enemy_t1_boulder_ogre | おおいわのオーガ | item_col_boulder_ogre | オーガの拳輪 |
| enemy_t1_thunder_roc | いかずちの大ワシ | item_col_thunder_roc | 雷を宿す爪 |
| enemy_t1_magma_drake | マグマの竜トカゲ | item_col_magma_drake | 溶岩の竜心石 |
| enemy_t1_boss_mountain_lord | 山嶺の大猿王 | item_col_mountain_lord | 猿王の黄金環 |
| enemy_t2_frostfang_wolf | シモフリオオカミ | item_col_frostfang_wolf | 霜牙の首飾り |
| enemy_t2_snow_ape | セッペキザル | item_col_snow_ape | 雪玉のような白毛球 |
| enemy_t2_glacier_crab | ひょうけつの人造兵 | item_col_glacier_crab | 氷兵の認識票 |
| enemy_t2_snow_owl | セツゲンフクロウ | item_col_snow_owl | 夜目の羽根飾り |
| enemy_t2_ice_wisp | コオリビ | item_col_ice_wisp | 冷たく燃える灯心 |
| enemy_t2_rime_beetle | じゅひょうの精 | item_col_rime_beetle | 樹氷の小枝細工 |
| enemy_t2_frost_stag | ヒョウガジカ | item_col_frost_stag | 氷角の風鈴 |
| enemy_t2_snow_serpent | セツゲンヘビ | item_col_snow_serpent | 白蛇の抜け殻 |
| enemy_t2_glacial_bear | ヒョウガグマ | item_col_glacial_bear | 巨熊の氷爪杯 |
| enemy_t2_iron_ice_golem | ヒョウケツゴーレム | item_col_iron_ice_golem | 不凍の歯車心臓 |
| enemy_t2_blizzard_hawk | フブキタカ | item_col_blizzard_hawk | 吹雪を纏う風切羽 |
| enemy_t2_boss_frost_monarch | 氷晶の女王 | item_col_frost_monarch | 女王の涙の氷珠 |
| enemy_t3_storm_wolf | ライメイオオカミ | item_col_storm_wolf | 雷鳴の牙鈴 |
| enemy_t3_thunder_bird | ライウチョウ | item_col_thunder_bird | 帯電する尾羽 |
| enemy_t3_spark_beetle | らいでんイカ | item_col_spark_beetle | 発光する墨壺 |
| enemy_t3_gale_serpent | シップウヘビ | item_col_gale_serpent | 疾風の蛇皮帯 |
| enemy_t3_charged_wisp | イカズチビ | item_col_charged_wisp | 稲妻の残り火 |
| enemy_t3_tempest_ape | アラシザル | item_col_tempest_ape | 嵐呼びの太鼓 |
| enemy_t3_static_crystal | あらしの吸血族 | item_col_static_crystal | 血色の雷晶 |
| enemy_t3_rain_hawk | シグレタカ | item_col_rain_hawk | 時雨の羽衣片 |
| enemy_t3_thunder_beast | ゴウライジュウ | item_col_thunder_beast | 轟雷獣の角髄 |
| enemy_t3_storm_roc | バクフウチョウ | item_col_storm_roc | 爆風鳥の大風切 |
| enemy_t3_discharge_idol | ホウデンキョゾウ | item_col_discharge_idol | 古代の避雷神像 |
| enemy_t3_boss_tempest_sovereign | 雷霆の覇王 | item_col_tempest_sovereign | 覇王の雷玉 |
| enemy_t4_rotwalker | 腐肉の徘徊者 | item_col_rotwalker | 朽ちぬ指輪 |
| enemy_t4_bone_lancer | 骸骨の突撃兵 | item_col_bone_lancer | 折れない槍の穂先 |
| enemy_t4_miasma_moth | 下級の死神 | item_col_miasma_moth | 小さな鎌の飾り |
| enemy_t4_wraith_lantern | 彷徨う鬼火 | item_col_wraith_lantern | 鬼火の提灯 |
| enemy_t4_rust_sentinel | 錆びた哨戒機 | item_col_rust_sentinel | 錆びない歯車 |
| enemy_t4_plague_crawler | 疫病の這い虫 | item_col_plague_crawler | 疫封じの護符甲殻 |
| enemy_t4_grave_acolyte | 墓守の呪詛師 | item_col_grave_acolyte | 呪詛師の数珠 |
| enemy_t4_gear_hound | 鋼鉄の番犬 | item_col_gear_hound | 番犬の鋼鉄首輪 |
| enemy_t4_corpse_colossus | 腐肉の巨像 | item_col_corpse_colossus | 巨像の心臓石 |
| enemy_t4_siege_automaton | 攻城の自動兵器 | item_col_siege_automaton | 攻城機の動力核 |
| enemy_t4_shroud_revenant | 帷子の怨霊 | item_col_shroud_revenant | 怨霊の帷子切れ |
| enemy_t4_boss_blight_sovereign | 瘴気を統べる腐王 | item_col_blight_sovereign | 腐王の玉璽 |

### ドロップと記録

- 抽選: §3 の換金抽選と同じ箇所で、**さらに独立に** 1 回
  （確率 `COLLECT_DROP_RATE[kind]`、品目 `COLLECTIBLE_BY_ENEMY[enemyId]`）。
  当選で `next.drops.push(...)`。
- `applyBattleResult`（勝利時）で `collectible` なドロップは**倉庫に入れず**:
  - `save.collection[itemId]` を +1。
  - 2 個目以降（加算前の値が 1 以上）は 1 個につき `COLLECT_DUP_GEMS` ジェム付与。
- **帯コンプ報酬**: ある tierBand の 12 種すべて `collection[..] >= 1` になった瞬間、
  `guild.gems += COLLECT_BAND_GEMS`、`flags['collectionBand<N>'] = true`（N=0..4）。
  フラグが既に true なら再付与しない。
- **全種コンプ報酬**: 60 種すべて所持で `guild.gems += COLLECT_ALL_GEMS`、
  限定装飾品 `equip_collector_crown`（§6）を装備プールに 1 個付与、
  `flags['collectionAll'] = true`（再付与防止）。
- 判定は `applyBattleResult` の中で collection 更新後に行う（純関数
  `applyCollectionRewards(save): SaveData` を `src/domain/collection.ts` に作る。
  図鑑 UI 用の集計 `collectionSummary(save)` も同ファイル）。

---

## 6. ジェム限定装備（12 種）（`src/data/equipment.ts` に追記）

全て `tier: 5`, `buyPrice: 0`, `gemPrice` 付き。通常カタログ（`shopCatalog`）からは
`gemPrice !== undefined` を除外する。交換所（§8）でのみ購入可。
`equip_collector_crown` のみ `gemPrice` も付けない = 入手経路は全種コンプ報酬のみ。

| id | name | slot | type | bonuses | statMods | gemPrice |
|---|---|---|---|---|---|---|
| equip_gem_sword | 星走りの剣 | weapon | sword | atk 93 | agi+5 | 120 |
| equip_gem_spear | 極光の槍 | weapon | spear | atk 96 | vit+5 | 120 |
| equip_gem_axe | 隕鉄の大斧 | weapon | axe | atk 101 | str+5 | 120 |
| equip_gem_bow | 流星の弓 | weapon | bow | atk 86 | luc+5 | 120 |
| equip_gem_fist | 彗星の拳甲 | weapon | fist | atk 82 | str+3, agi+3 | 120 |
| equip_gem_staff | 銀河の杖 | weapon | staff | mat 96 | int+5 | 120 |
| equip_gem_heavy | 星鎧 | armor | heavy | def 78, mdf 31 | hp+20 | 150 |
| equip_gem_light | オーロラコート | armor | light | def 54, mdf 43 | agi+4 | 150 |
| equip_gem_clothes | 虹紡ぎのローブ | armor | clothes | def 31, mdf 73 | tp+15 | 150 |
| equip_gem_ring | 七色の指輪 | accessory | - | def 20, mdf 20 | str/vit/agi/int/mnd/luc 各+3 | 200 |
| equip_gem_charm | 輝晶の護符 | accessory | - | def 12, mdf 24 | luc+8, hp+10 | 160 |
| equip_collector_crown | 蒐集王の宝冠 | accessory | - | def 25, mdf 25 | str/vit/agi/int/mnd/luc 各+5, hp+25, tp+15 | （なし） |

- bonuses の書式は既存に合わせる（`bonuses: { atk: 93, statMods: { agi: 5 } }`）。
- 位置づけ: 通常 T5（atk 89 帯）の約 1.08 倍 + statMods。周回 Lv2 装備（×1.5）には
  劣る「F40〜F70 帯のチェイス装備」。鍛冶強化は通常装備と同様に可能。

### ドメイン（`src/domain/shop.ts` に追記）

```ts
export function gemExchangeList(save): { itemId; name; qty; gemValue }[]
  // 倉庫内の gemValue 付きアイテム一覧（qty 合算。grade 無視でよい）
export function exchangeForGems(save, itemId): SaveData
  // 該当アイテムを全数消費し gems += gemValue * qty
export function gemEquipCatalog(): { id; name; note; gemPrice }[]
  // gemPrice を持つ EQUIPMENT（equip_collector_crown を除く = gemPrice 無しなので自然に除外）
export function buyWithGems(save, equipId): SaveData
  // gems >= gemPrice なら減算し addEquipment(save, equipId, 0, 1)
```

`shopCatalog` は `gemPrice !== undefined` の装備を除外。
`sellPrice`（items.ts）は `valuable` で 0。ショップ売却 UI の対象からも
`category==='valuable'` を除外する。

---

## 7. 依頼（クエスト）システム — 主軸機能

### データ（新規 `src/data/quests.ts`）

```ts
export interface QuestMaster {
  id: string;
  name: string;
  client: string;        // 依頼主（フレーバー）
  description: string;   // 1〜2 文
  kind: 'hunt' | 'delivery' | 'reach' | 'boss';
  target: { enemyId?: EnemyId; itemId?: ItemId; count?: number; depth?: number };
  unlockDepth: number;   // record.deepestReached >= この値で掲示
  repeatable: boolean;
  rewards: { gold?: number; gems?: number; items?: { itemId: ItemId; qty: number }[] };
}
export const QUESTS: Record<string, QuestMaster>
```

### 依頼一覧（28 件・確定値）

一回限り（repeatable: false）:

| id | name | client | kind | target | unlock | rewards |
|---|---|---|---|---|---|---|
| quest_first_hunt | はじめての討伐 | 酒場の主人 | hunt | enemy_slime ×3 | 0 | 100G, きずぐすり×3 |
| quest_rat_patrol | ねずみ退治 | 街の商人 | hunt | enemy_giant_rat ×5 | 0 | 200G, ✦3 |
| quest_herb_delivery | 薬草の納品 | 薬屋のおばあ | delivery | item_medic_herb ×3 | 0 | 250G, まほうのは×3 |
| quest_reach_f5 | 地下5階の調査 | ギルド受付 | reach | depth 5 | 0 | 300G, 帰還の糸×2 |
| quest_ore_order | 鉄鉱石の注文 | 鍛冶屋の弟子 | delivery | item_ore ×5 | 3 | 400G, 力の水×2 |
| quest_treant_cull | 森の主を狩れ | 木こりの頭領 | hunt | enemy_t0_elder_treant ×2 | 5 | 500G, ✦5 |
| quest_boss_f10 | 門番討伐の証明 | ギルド受付 | boss | depth 10 | 5 | 600G, ✦10 |
| quest_reach_f15 | 岩山地帯の踏破 | 地図屋 | reach | depth 15 | 10 | 700G, すごいきずぐすり×2 |
| quest_scale_order | 岩のうろこ集め | 防具職人 | delivery | item_mat_t1_stone_scale ×5 | 12 | 800G, ✦5 |
| quest_ogre_hunt | オーガ退治 | 隊商の護衛長 | hunt | enemy_t1_boulder_ogre ×3 | 12 | 900G, ✦8 |
| quest_hide_order | 獣皮の大量注文 | 革細工師 | delivery | item_mat_t1_coarse_hide ×8 | 15 | 1000G, すごいきずぐすり×3 |
| quest_boss_f20 | 猿王討伐の証明 | ギルド受付 | boss | depth 20 | 15 | 1200G, ✦15 |
| quest_reach_f25 | 氷雪地帯の調査 | 学士 | reach | depth 25 | 20 | 1300G, ✦10 |
| quest_bear_hunt | 巨熊の脅威 | 猟師組合 | hunt | enemy_t2_glacial_bear ×3 | 22 | 1500G, ✦12 |
| quest_crystal_order | 凍てつく結晶の依頼 | 宝飾商 | delivery | item_mat_t2_ice_crystal ×8 | 22 | 1600G, 魔導の水×3 |
| quest_boss_f30 | 女王討伐の証明 | ギルド受付 | boss | depth 30 | 25 | 2000G, ✦20 |
| quest_beast_hunt | 轟雷獣を討て | 嵐の観測士 | hunt | enemy_t3_thunder_beast ×3 | 32 | 2200G, ✦15 |
| quest_carapace_order | 雷甲の外殻集め | 発明家 | delivery | item_mat_t3_thunder_carapace ×8 | 32 | 2400G, 気付けの雫×2 |
| quest_boss_f40 | 覇王討伐の証明 | ギルド受付 | boss | depth 40 | 35 | 3000G, ✦30 |
| quest_gear_order | 鋼の歯車の回収 | 発明家 | delivery | item_mat_t4_steel_gear ×8 | 42 | 3000G, ✦15 |
| quest_revenant_hunt | 怨霊鎮め | 墓守の司祭 | hunt | enemy_t4_shroud_revenant ×3 | 42 | 3200G, ✦20 |
| quest_boss_f50 | 腐王討伐の証明 | ギルド受付 | boss | depth 50 | 45 | 5000G, 虹輝の宝珠×1 |

繰り返し可（repeatable: true）:

| id | name | client | kind | target | unlock | rewards |
|---|---|---|---|---|---|---|
| quest_r_hunt_t0 | 森の間引き | 猟師組合 | hunt | enemy_t0_forest_rabbit ×10 | 3 | 300G, ✦3 |
| quest_r_ore | 鉱石はいくらでも | 鍛冶屋の弟子 | delivery | item_ore ×10 | 8 | 600G, ✦3 |
| quest_r_hunt_t1 | 岩山の間引き | 猟師組合 | hunt | enemy_t1_crag_goat ×10 | 12 | 500G, ✦5 |
| quest_r_hunt_t2 | 雪原の間引き | 猟師組合 | hunt | enemy_t2_frostfang_wolf ×10 | 22 | 800G, ✦8 |
| quest_r_hunt_t3 | 嵐域の間引き | 猟師組合 | hunt | enemy_t3_storm_wolf ×10 | 32 | 1200G, ✦10 |
| quest_r_hunt_t4 | 瘴気の間引き | 猟師組合 | hunt | enemy_t4_rotwalker ×10 | 42 | 1600G, ✦12 |

（✦N = gems: N。アイテム名は §8 の新消耗品 / 既存アイテムの id を引く。
description と client は上記をそのまま使い、description は
「<client>からの依頼。<目標を 1 文で>」の書式で埋める。）

### ドメイン（新規 `src/domain/quest.ts`）

```ts
export function questBoard(save): QuestBoardEntry[]
  // 掲示条件: unlockDepth <= deepestReached。
  // 一回限りで status done のものは除外。repeatable は常に掲示（active 中は「受注中」表示）。
export function activeQuests(save): ActiveQuestEntry[]  // 進捗数値つき
export function acceptQuest(save, questId): SaveData
  // active 数 >= QUEST_MAX_ACTIVE なら no-op。hunt は progress.baseKills =
  // bestiary.monsters[enemyId]?.kills ?? 0 を記録して active に。
export function abandonQuest(save, questId): SaveData  // active → unaccepted（進捗破棄）
export function questProgress(save, questId): { current: number; required: number }
  // hunt: (kills - baseKills) を count でクランプ / delivery: 倉庫所持数(全 grade 合算) /
  // reach: deepestReached / boss: 撃破済みなら 1/1
export function isQuestComplete(save, questId): boolean
export function turnInQuest(save, questId): SaveData
  // 未達成なら no-op。delivery は対象アイテムを count 個消費（grade 昇順に消費）。
  // rewards を付与（gold/gems/items。items は addItem）。
  // repeatable: status を 'unaccepted' に戻し progress = { timesCompleted: +1 }。
  //             baseKills はクリア。
  // 一回限り: status 'done'。
export function reportableCount(save): number // 達成済み active の数（バッジ用）
```

`QuestState.progress` のキー: `baseKills`（hunt 受注時）、`timesCompleted`（repeatable）。

---

## 8. 新消耗品（ゴールドの使い道・8 種）（`src/data/items.ts` に追記）

| id | name | 効果 | buyPrice | maxStack | useContext |
|---|---|---|---|---|---|
| item_ex_potion | すごいきずぐすり | heal 200 | 260 | 10 | battle, field |
| item_miracle_potion | きせきのきずぐすり | heal 999 | 900 | 5 | battle, field |
| item_panacea | 万能薬 | cleanse（状態異常・封じ全解除） | 120 | 10 | battle, field |
| item_revive_drop | 気付けの雫 | revive ratio 0.4 | 500 | 5 | battle, field |
| item_power_water | 力の水 | buff patk ×1.3 / 3T | 180 | 10 | battle |
| item_guard_water | 守りの水 | buff pdef ×1.3 / 3T | 180 | 10 | battle |
| item_magic_water | 魔導の水 | buff matk ×1.3 / 3T | 180 | 10 | battle |
| item_tp_elixir | 錬気の秘薬 | restoreTp ratio 0.5 | 400 | 5 | battle, field |

- buff の `stackGroup` は**既存の味方バフスキルと同じグループ名**を使う
  （`battleSkills.ts` を確認し、patk/pdef/matk それぞれの既存グループに合わせる）。
- **重要**: 戦闘中のアイテム使用が `buff` / `cleanse` / `revive` 効果に対応しているか
  実装経路を確認し、未対応ならスキルと同じ効果リゾルバを通すように統一する。
  対応済み/修正後いずれも、アイテム経由の buff・cleanse・revive の単体テストを書く。
- description は効果を 1 文で説明する（既存アイテムの文体に合わせる）。

---

## 9. スプライト（画像は既存アセットの複製 + hue-rotate で対応）

新規画像の外部調達はしない。以下のとおり**ファイル複製**と hue 指定で済ませる:

```bash
cd src/assets/items
cp item_mat_t2_ice_crystal.png item_gem_shard.png
cp item_mat_t2_ice_crystal.png item_gem_stone.png
cp item_mat_t2_ice_crystal.png item_gem_cluster.png
cp item_mat_t2_ice_crystal.png item_gem_prism.png
cp item_mat_t2_monarch_diadem.png collection_treasure.png   # 秘宝の共通アイコン
cp equip_t5_sword.png equip_gem_sword.png
cp equip_t5_spear.png equip_gem_spear.png
cp equip_t5_axe.png equip_gem_axe.png
cp equip_t5_bow.png equip_gem_bow.png
cp equip_t5_fist.png equip_gem_fist.png
cp equip_t5_staff.png equip_gem_staff.png
cp equip_t5_heavy.png equip_gem_heavy.png
cp equip_t5_light.png equip_gem_light.png
cp equip_t5_clothes.png equip_gem_clothes.png
cp equip_t5_accessory.png equip_gem_ring.png
cp equip_t3_accessory.png equip_gem_charm.png
cp item_mat_t2_monarch_diadem.png equip_collector_crown.png
```

- 新消耗品 8 種は既存の類似アイコンを複製:
  `item_ex_potion.png`/`item_miracle_potion.png` ← `item_hi_potion.png`、
  `item_panacea.png` ← `item_medic_herb.png`、`item_revive_drop.png` ← `item_potion.png`、
  `item_power_water.png`/`item_guard_water.png`/`item_magic_water.png` ← `item_tp_herb.png`、
  `item_tp_elixir.png` ← `item_tp_herb_hi.png`。
- `itemSpriteUrl.ts`: id が `item_col_` で始まる場合は
  `/src/assets/items/collection_treasure.png` を返す分岐を追加。
- `ItemSprite.tsx` の hue 決定を変更: **最初に** `ITEM_HUE_OVERRIDES` を見て、
  ヒットしたらそれを返す（EQUIPMENT 分岐より優先）。オーバーライド追加:
  - `item_gem_shard: 120` / `item_gem_stone: 30` / `item_gem_cluster: 280` /
    `item_gem_prism: 320`
  - gem 装備 11 種（crown 除く）: すべて `315`、`equip_gem_charm: 45`、
    `equip_collector_crown: 0`
  - `item_ex_potion: 40` / `item_miracle_potion: 300` / `item_panacea: 90` /
    `item_revive_drop: 200` / `item_power_water: 0` / `item_guard_water: 120` /
    `item_magic_water: 260` / `item_tp_elixir: 320`
  - `item_col_*` は COLLECTIBLE の敵 tierBand から `[0, 60, 180, 260, 320][band]`
    を返す（個別列挙ではなくロジックで）。

---

## 10. UI 仕様

### 10.1 拠点（town）

- ヘッダの資産表示に `✦ {gems}` を gold の隣に追加。
- 2×2 メニューの**上**に全幅の「酒場 — 依頼掲示板」カードを追加
  （`navigate({ name: 'tavern' })`）。`reportableCount(save) > 0` のとき
  右端に赤バッジで件数表示。ダイブ中は他タイルと同様 disabled。

### 10.2 酒場（新画面 `src/pages/tavern/`）

- `navigation.tsx` の `Screen` に `{ name: 'tavern' }` を追加し、`App.tsx` の
  switch に配線。plop の page 雛形と他ページの構造（index.tsx + style.module.scss）に従う。
- タブ 3 つ: **掲示板** / **受注中**（達成ありなら件数バッジ） / **記録**。
- 掲示板: `questBoard()` の各件をカード表示 — 依頼名 / 依頼主 / 説明 /
  目標（「スライム討伐 0/3」等） / 報酬（G・✦・アイテム名×qty） / 受注ボタン
  （active 3 件で disabled + 「同時に受けられるのは3件まで」注記）。
  repeatable には「くり返し」チップ、達成回数 1 回以上なら「達成 N 回」表示。
- 受注中: 進捗バー（current/required）付きカード。達成済みは金色ハイライト +
  「報告する」ボタン（`turnInQuest`）。未達成は「破棄」ボタン（confirm あり）。
- 記録: 完了した一回限り依頼の一覧（薄表示）+ repeatable の累計達成回数。
- 報告時は報酬内訳をトースト/インライン表示（+800G ✦5 など）。
- SFX: 受注 = 既存の決定音、報告 = 既存の購入/勝利系の音（`useSfx` の既存 id から
  近いものを使う。新規音源は追加しない）。

### 10.3 ショップ（交換所タブ追加）

- 既存の 購入/売却 に並ぶ第 3 タブ「**交換所**」を追加。ヘッダに `✦ {gems}` 表示。
- 上段「ジェム換金」: `gemExchangeList()`。各行 = アイコン / 名前 ×qty /
  「✦N になる」/ 換金ボタン（全数一括）。空なら「換金できる品はない」。
- 下段「秘宝交換」: `gemEquipCatalog()`。各行 = アイコン / 名前 / note（ATK+93 AGI+5 等）/
  `✦gemPrice` / 交換ボタン（gems 不足で disabled）。装備は所持プールに入る旨の注記。
- 売却タブから `category==='valuable'` を除外。

### 10.4 図鑑（討伐勲章 + 秘宝）

- モンスター一覧の各行に: 討伐数（`kills`）と勲章メダル（達成ランクを ● 4 連で表示。
  色: 銅 #cd7f32 / 銀 #c0c0c0 / 金 #ffd700 / 虹は linear-gradient）。未達スロットは暗色。
- サマリに「勲章: 銅x 銀y 金z 虹w」を追加。
- 新セクション「**秘宝コレクション**」: tierBand ごとに 12 マスのグリッド。
  未入手 = ItemSprite の silhouette + 「？？？」。入手済 = アイコン + 名前 +（×N）。
  各帯の見出しに `x/12`（コンプで ✦30 済みバッジ）、末尾に総計 `x/60` と
  全種コンプ報酬（✦100 + 蒐集王の宝冠）の説明。

### 10.5 戦闘リザルト

- ドロップ一覧はそのまま（換金アイテムも並ぶ）。`collectible` なドロップは
  「✦秘宝」バッジ付きで強調。2 個目以降は「→ ✦2」を添える。
- 勲章到達があれば「討伐勲章: <敵名>【銀】 +✦5」の行を追加（`trophyGains`）。
- この戦闘で得たジェム合計（勲章 + 重複秘宝変換）を報酬行に「✦N」で表示。
- ボスゲート初回撃破時は「虹輝の宝珠を手に入れた！」を表示（§3）。

---

## 11. 検証（validateMasters）と自動生成ドキュメント

`validateMasters.ts` に追加:

- すべての `EnemyId` に `COLLECTIBLE_BY_ENEMY` のエントリがあり、参照先アイテムが
  存在し `collectible === true` かつ `category === 'valuable'` であること。
- `gemValue` を持つアイテムは `gemValue > 0` かつ `category === 'valuable'`。
- `QUESTS`: target の enemyId/itemId/depth・rewards の itemId が存在すること。
  hunt/delivery は `count >= 1`。reach/boss は `depth >= 1`。
- `gemPrice` を持つ装備は `buyPrice === 0`。

`yarn gen:docs`（strategy-docs 自動生成）は統合フェーズでディレクターが実行して
差分をコミットする。

---

## 12. タスク分割（実装エージェント向け）

- **Agent 1（基盤）**: §1〜6, §8, §9, §11 — 型/migration/バランス定数/全マスタデータ/
  battle・shop・collection・trophy ドメイン/スプライト複製/validateMasters/単体テスト。
- **Agent 2（クエスト）**: §7 — quests データ + quest ドメイン + 単体テスト。
- **Agent 3（酒場 UI）**: §10.1, §10.2 — navigation/App 配線、town 改修、tavern ページ、
  Storybook ストーリー（mockSaves にプリセット追加可）。
- **Agent 4（ショップ/図鑑/リザルト UI）**: §10.3〜10.5 — shop/codex/battle ページ改修 +
  ストーリー。mockSaves.ts は**触らない**（Agent 3 の所有。必要な状態はインラインで作る）。
- **Agent 5（レビュー）**: 全差分のレビュー。

### テスト必須項目（PR に含めること）

- migration v5→v6（旧形セーブが gems/kills/collection/questStates を得る）
- trophyRank / trophyGemsForCrossing 境界値（しきい値ちょうど・複数ランク跨ぎ）
- 換金・秘宝ドロップ抽選（rng 固定で当選/落選、kind/tierBand 別の品目）
- applyBattleResult: kills 加算、勲章ジェム付与、collectible が倉庫に入らず
  collection に入ること、重複→ジェム変換、dropsFound 非汚染
- 帯コンプ/全コンプ報酬（1 回きり・crown 付与）
- exchangeForGems / buyWithGems / shopCatalog の gem 装備除外 / valuable 売却不可
- quest: 掲示条件・受注上限・hunt 進捗（baseKills 基準）・delivery 消費・
  turn-in 報酬・repeatable リセット・abandon
- アイテム経由の buff / cleanse / revive が戦闘で機能すること

### 検証ゲート（全マージ後）

`yarn test` / `yarn lint` / `tsc -b` の 3 点 + `yarn gen:docs` 差分コミット +
`package.json` を **3.0.0** に手動設定して `yarn build:nobump`（bump は 1 PR 1 回運用。
メジャー更新は手動で 3.0.0 にするため patch bump は使わない）。
