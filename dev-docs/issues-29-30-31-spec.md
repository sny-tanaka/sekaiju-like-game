# Issues #29 / #30 / #31 実装仕様

ディレクター策定の設計書。sonnet 実装エージェントはこの数値・式・文言どおりに実装する（判断を残さない）。

共有モジュール（ディレクターが先に作成済み）:

- `src/data/equipLabels.ts` … `WEAPON_TYPE_LABEL` / `ARMOR_TYPE_LABEL` / `EQUIP_SLOT_LABEL`。
  武器/防具種・スロットの日本語ラベル。#29 #31 双方から import して使う（再定義しない）。

---

## Issue #29 — 冒険者作成画面の改善（担当: 作成エージェント）

対象画面: `src/pages/guild/index.tsx` の「作成・一覧」タブ内「冒険者を作成」セクション（種族 select / 職業 select の直下）。

やること: 種族・職業を選ぶとき、その特性が分かる説明カードをライブ表示する。

### A. データ追加

`src/domain/types.ts`:

- `RaceMaster` に `description: string;` を必須追加。
- `ClassMaster` に `description: string;` を必須追加。

`src/data/races.ts` 各種族に `description` を追加（下記）:

- race_human:「純血なヒト族。突出した長所も短所もなく、あらゆる能力が平均的。どの職業にも無理なく適応できる万能種。」
- race_garon:「屈強な肉体を誇る大型種。高いHPと腕力で前線を支える物理の要だが、素早さと魔法は不得手。火属性に弱い。」
- race_pix:「魔力に愛された小型種。豊富なTPと高い知力・精神で魔法戦に長けるが、打たれ弱く物理攻撃に弱い。」
- race_therian:「野生の勘を宿す獣人種。素早さと幸運に優れ、命中・回避と手数で戦う。食料調達も得意だが氷属性に弱い。」
- race_lunar:「月の加護を受けた癒し手。精神と幸運が高く回復・補助に向き、TPと魔法防御が伸びる。体は脆い。」
- race_golan:「岩のごとき体躯を持つ重厚種。最高峰のHP・防御・腕力を誇り物理に強いが、極端に鈍重で魔法を苦手とする。」

`src/data/classes.ts` 各職業に `description` を追加（下記）:

- class_warrior:「剣と斧の連携追撃・反撃を備えた前衛物理アタッカー。剣／斧で攻め筋が分岐する。」
- class_guardian:「盾と挑発で敵を引きつけ、障壁と反撃で味方を守る前衛タンク。」
- class_mage:「火・氷・雷の属性魔法で敵を殲滅する後衛アタッカー。」
- class_ranger:「弓の射撃・部位封じ・召喚獣・救護をこなす器用な後衛。」
- class_medic:「回復・状態異常治療・防御支援の要となるメインヒーラー。」
- class_dancer:「舞と歌でパーティを強化・回復し、剣舞で攻撃もこなす支援職。」
- class_monk:「素手の多段攻撃・部位封じ・反撃を操る近接アタッカー。」
- class_hexer:「状態異常と弱体で敵を崩すデバッファー。」
- class_summoner:「死霊を召喚・使役し、障壁と爆裂で戦う変則召喚職。」

> 注: `src/data/strategyDocsGen.test.ts` 内にも同様の説明（classRole/raceRole）が別途あるが、**触らない**（壊さない）。重複は許容。

### B. 種族の能力ランク算出（新規 `src/domain/raceRank.ts`）

種族の「補正度合い」をレター（S/A/B/C/D）で示す。**6種族間の相対**を min-max 正規化して決める（データ駆動・決定論）。

```
RANK_REF_LEVEL = 20  // 比較に使う想定レベル
statValue(race, key) = race.baseStatsAtLv1[key] + race.statGrowth[key] * (RANK_REF_LEVEL - 1)
```

各 stat key ごとに全6種族の statValue を集め、min/max を取る。正規化 t = (v - min) / (max - min)（max===min のときは t=0.5）。レター:

```
t >= 0.84 -> 'S'
t >= 0.63 -> 'A'
t >= 0.42 -> 'B'
t >= 0.21 -> 'C'
else      -> 'D'
```

公開 API:

```ts
export type StatRank = 'S' | 'A' | 'B' | 'C' | 'D';
export function raceStatRanks(raceId: RaceId): Record<StatKey, StatRank>;
```

実装は RACES 全体を1度走査して min/max を作る（モジュールロード時に計算してメモ化してよい）。
テスト `src/domain/raceRank.test.ts` を追加:
- 全種族・全 stat で 'S'|'A'|'B'|'C'|'D' のいずれかを返す。
- HP 最大は golan が 'S'、最小付近の pix/lunar が 'D' 寄りであること等、妥当性を1〜2点確認。

### C. UI

作成セクションに、選択中の種族／職業の情報カードを表示する。スマホ前提・既存 `style.module.scss` のトーンに合わせる。

種族カード（種族 select の直下）:
- 種族名（任意）＋ `RACES[raceId].description`
- 能力ランクのグリッド。表示する8項目とラベル: HP=hp, TP=tp, 力=str, 守=vit, 速=agi, 魔=int, 心=mnd, 運=luc。各項目「ラベル: ランク」をチップ状に並べる。
- 種族耐性は `ResistBadges`（`@/components/common/ResistBadges/ResistBadges`）を流用して属性・状態異常を表示（`elementResist`/`ailmentResist` が無ければ「特になし」）。

職業カード（職業 select の直下）:
- `CLASSES[classId].description`
- 装備可能武器/防具: `equipableWeaponTypes` を `WEAPON_TYPE_LABEL`、`equipableArmorTypes` を `ARMOR_TYPE_LABEL` で日本語化して列挙。
- 覚えるスキル紹介: `CLASSES[classId].skillTree.skills` を列挙し、`SKILLS[skillId]?.name` と `description` を表示（前提チェーンの浅い順でよい＝配列順のままで可）。スキル数が多い職もあるため、リストはスクロール可能領域（max-height + overflow:auto）に収める。各行「スキル名 — 説明（最大Lv N）」。

新規プレゼンテーショナル component を作って guild/index.tsx から使うこと（肥大化防止）。例:
- `src/components/creation/RaceInfoCard/RaceInfoCard.tsx`(+ `style.module.scss` + `.stories.tsx`)
- `src/components/creation/ClassInfoCard/ClassInfoCard.tsx`(+ `style.module.scss` + `.stories.tsx`)

props は raceId / classId を受け取り、内部で RACES/CLASSES/SKILLS/raceStatRanks を引く。Storybook の story を各 component に付ける。

---

## Issue #30 + #31 — ショップ（担当: ショップエージェント）

対象: `src/pages/shop/index.tsx`, `src/pages/shop/style.module.scss`, `src/domain/shop.ts`, `src/domain/shop.test.ts`。

### #30 複数購入・売却

現状すべて1個単位。確認ダイアログに数量ステッパーを付け、まとめ取引できるようにする。

ドメイン（`src/domain/shop.ts`）:
- `buyMany(save, id, qty)` を追加。所持金で買える上限まで（`floor(gold/price)` と `qty` の小さい方）購入する。装備個体は qty 個プールへ追加、消費品は qty 個倉庫へ。0個なら save をそのまま返す。
  - 実装は `buy` を qty 回呼ぶのではなく、価格×実購入数をまとめて引く形でよいが、`buy` の既存挙動（装備グレード・addEquipment/addItem）と一致させること。
- 売却は既存 `sell(save, id, qty, grade)` がすでに qty 対応。装備個体 `sellEquipment` は個体ごとに一意なので数量は常に1（ステッパー無し）。
- 数量上限の算出ヘルパー（任意）: 買い=`maxAffordable(gold, price)`、売り(アイテム)=所持 qty。

UI（`src/pages/shop/index.tsx`）:
- 確認ダイアログ（Pending）に数量ステッパー（− / 数値 / ＋、必要なら「最大」ボタン）を追加。
  - buy: 上限 = `floor(gold / price)`（最低1）。合計 = price × qty を表示。「購入する」で `buyMany`。
  - sellItem: 上限 = そのスタックの所持 qty。合計 = price × qty。「売却する」で `sell(..., qty, grade)`。
  - sellEquip: 数量1固定（ステッパー非表示）。従来どおり。
- `Pending` 型に qty を持たせる、あるいはダイアログ内 local state で qty を管理（ダイアログを開くたび qty=1 リセット）。誤タップ防止の確認フローは維持。

テスト（`src/domain/shop.test.ts`）:
- buyMany: 所持金潤沢で qty 個ぶん gold が減り在庫が増える。
- buyMany: 所持金が足りないとき買える上限までに丸められ、gold が負にならない。
- sell の qty まとめ売りで gold とスタックが正しく減る（既存があれば流用）。

### #31 装備品の説明文（装備可能職業など）

ショップの装備行で、装備名をタップすると詳細パネル（モーダル）を開く。

ドメイン（`src/domain/shop.ts`）:
- `equipableClassNames(masterId): string[]` を追加。
  - `EQUIPMENT[masterId]` を引き、slot==='accessory' なら全職業名（`Object.values(CLASSES).map(c=>c.name)`）。
  - weapon なら `equipableWeaponTypes` に eq.weaponType を含む職業の name 一覧。
  - armor なら `equipableArmorTypes` に eq.armorType を含む職業の name 一覧。
  - 順序は CLASSES の定義順。

UI（`src/pages/shop/index.tsx`）:
- 買う/売るリストの装備行で、名前部分をタップ可能にして詳細モーダルを開く（売買ボタンとは別操作。誤発火しないよう name を button 化）。
  - 消費アイテム/素材行は対象外（または ITEMS の description を出す簡易表示でも可。最低限、装備のみでよい）。
- 詳細モーダル内容:
  - 装備名 / スロット（`EQUIP_SLOT_LABEL`）/ 武器・防具種（`WEAPON_TYPE_LABEL`/`ARMOR_TYPE_LABEL`、装飾品は表示なし）。
  - 性能: bonuses を `ATK+n / MAT+n / DEF+n / MDF+n`、`statMods` があれば「STR+n」等も。
  - **装備可能職業**: `equipableClassNames(masterId)` を「・」区切りで列挙（装飾品は「全職業」）。
  - 価格と所持数（既に行が持っている情報でよい）。
  - 閉じるボタン。既存の confirmOverlay/confirmBox のスタイルパターンを流用してよい。
- 売る行の装備は個体（forgeLevel/grade 込み）。詳細の masterId は `inst.masterId` を使う。

テスト（`src/domain/shop.test.ts`）:
- equipableClassNames: 武器（例 sword 装備）で戦士が含まれ魔導士が含まれない等。
- accessory は全職業を返す。

---

## 検証ゲート（両エージェント共通・完了前に必ず緑）

`yarn test` / `yarn lint` / `tsc -b`（または `yarn build`）の3点すべて。
完了時はコミットして commit SHA を報告（push しない）。
