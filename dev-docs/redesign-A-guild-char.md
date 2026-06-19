# フェーズ 2：guild-char 画面リデザイン（sonnet 用指示書）— **改訂版 v2 — モック忠実化**

`dev-docs/redesign-A.md`（特に **§1.5 レイアウト運用ルール**）と
`dev-docs/redesign-A-title-fix.md`（flex column 化のパターン）を **必ず先に読む**こと。

参考にするモック原本: `/tmp/sekaiju-design/案A_v2.dc.html` の line 511〜620
（`4a stats / equip` と `4b skill / growth` の 2 サブ状態）。

参考にする機能仕様: `dev-docs/claude-design-brief.md` **§4.4 guildChar — キャラ詳細 / 育成**。

> **改訂方針（v2）**: 前回 v1 はモックから大きく外れていました（"色味以外ほとんど合っていない"）。
> 今回はモック忠実度を最優先で取り直します。機能仕様に書かれていない要素も「位置だけ合わせて
> disabled 配置」する方針です。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい

| 区分 | パス | 操作 |
| --- | --- | --- |
| 編集 | `src/pages/guild-char/index.tsx` | マークアップを flex column 構造に再構成。**前回 v1 の構造は捨てて書き直す**。state machine とロジックは温存 |
| 編集 | `src/pages/guild-char/style.module.scss` | 黒曜テーマで全面書き直し。`var(--*)` を直接参照 |
| 編集 | `src/pages/guild-char/GuildChar.stories.tsx` | 既存 4 本（`Default` / `WithTitleSkillTab` / `ReincarnateOpen` / `EquipPick`）を温存 |

### 触ってはいけない

- `src/_obsidian.scss`、`src/_variables.scss`。
- 共通コンポーネント本体（`CharacterPortrait` / `ItemSprite` / `SkillTree` / `ResistBadges`）。
  画面側で見た目調整が要るならローカル wrapper クラスで対応。
- 他画面 (`title` / `town` / `guild` / `shop` / `forge` / `dungeon` / `battle` / `codex` /
  `not-found`) の `index.tsx` / `style.module.scss`。
- ゲームロジック（`computeBaseStats` / `availableSP` / `learnSkill` / `transferClassInSave` /
  `acquireTitle` / `canAcquireTitle` / `canReincarnate` / `rebirthStatBonusForRace` /
  `reincarnateInSave` / `equipItem` / `unequipItem` / `canEquip` / `equipDisplayName`）。
- 既存テストの assert 文。

---

## 2. やってはいけないこと

- 自分でさらに `Agent` / `Task` を spawn しない。
- 写本テーマ由来の SCSS 変数 (`$parchment` 等) を新規参照しない。
- ヘッダー直下のキャラ識別エリアを **絶対配置で固定しない**。`.layout` の最上段に flex item
  として置く。
- ステータスグリッドを「絶対配置で 4 列に並べる」のではなく、**`display: grid;
  grid-template-columns: repeat(4, 1fr); gap: 8px;` で組む**。
- `SkillTree` 共通コンポーネントの内部スタイルに依存した上書きをしない。SkillTree の外周だけ
  装飾する。
- 「転職 / 称号 / 転生」を絶対配置で画面下端の 3 カラム固定にしない。flex item として
  `.body` のスクロール領域の **外** に積む（下記 §3.7 参照）。
- `Object.entries(char.rebirthBonus.stats).filter(...)` 等のロジックを書き換えない。
- 全スロットの装備候補を常時表示しない（モックは「展開中スロットのみ表示」）。

---

## 3. モックとの差分一覧（最重要）

前回 v1 の実装はモックから大きくズレている。以下を **すべて** モック準拠に直す。

### 3.1 ヘッダー（`4a` 上端）
- **OK**: 現状の grad bg + 64x64 ポートレートの構造はモックとほぼ一致。
- **NG**: モック右端に **EXP インジケータ** `EXP 72%` が小さく出る（`font-family: var(--font-mono);
  font-size: 11px; color: var(--gold);` 上に補助 `font-size: 9px; color: var(--text-faint);`）。
  → 実装ではキャラの EXP 割合（`char.exp / nextLevelExp(char)` 等）が取れない場合は
  **暫定で「Lv{level}」のみ表示**してもよい。`getNextLevelExp` 等が `domain/` に既存ならそれを
  使う。データが取れないなら省略可（理由を SCSS のコメントで明記）。
- **NG**: モックではポートレート脇に「前衛」のポジションタグ（`font-size: 10px; color: var(--gold);
  border: 1px solid rgba(201,168,106,.4); border-radius: 2px; padding: 1px 7px;`）を出す。
  positionOf 関数（guild 画面にあったロジック）を流用するか、`save.guild.party.front/back` で
  該当キャラの位置を判定して表示。

### 3.2 能力値（4 列 grid）
- **OK**: 既存実装は 4 列 grid。これは維持。
- **NG**: 色分けを追加:
  - HP セル: 数値色 `#9ed8b4`（success 系・既存トークン `var(--success)` に近い緑）
  - TP セル: 数値色 `#8fb6e0`（青系）
  - その他: `var(--text-strong)` (`#e8e6e0`)
  - ラベル: `font-size: 9px; color: var(--text-faint);`
  - 数値: `font-family: var(--font-mono); font-size: 15px;`

### 3.3 種族耐性
- **OK**: 既存実装は `ResistBadges` を使う構造。
- **NG**: 行の見出しは小さく:
  ```
  [属性] [炎 耐] [氷 弱] [雷 −]
  [状態] [毒 耐] [脚封じ 耐] [睡眠 −] [即死 −]
  ```
  各バッジ: `font-size: 10px; padding: 3px 8px; border-radius: 2px;`、
  耐性: `background: rgba(212,103,79,.18); color: #e09180;` /
  弱点: `background: rgba(111,159,216,.18); color: #8fb6e0;` /
  無効: `background: rgba(255,255,255,.08); color: var(--text-mute);`。
  - `ResistBadges` を直接書き換えてはいけないので、外側の wrapper クラスで gap・font-size・
    flex-wrap を上書き。

### 3.4 装備セクション（最大の差分）
- **NG**: 現状は **3 スロット全部に候補リストが常時展開されている**。
- **モック**: 3 スロットがコンパクトな行として並ぶ。**選択中スロットだけ**下に
  「倉庫の装備候補」パネルが展開する。
- **行のスタイル**:
  ```
  [38x38 ItemSprite(bg #0c0d11, radius 3)] | [補助 9px「武器/防具/装飾」 + 装備名 13px + ATK68 緑 10px] | [「外す」or「選ぶ」チップ]
  ```
  - 装備済み: 行 background `#1a1d26`、border 1px `rgba(201,168,106,.35)`、右端「外す」チップ
    `font-size: 10px; color: var(--text-mute); border: 1px solid var(--rule-base); padding: 4px 9px;`
  - 未装備（空き）: 行 background `var(--surface-panel)`、border 1px `var(--rule-soft)`、
    装備名は「（なし）」`color: #5d5a52;`、右端「選ぶ」チップ `font-size: 10px; color: var(--gold);
    border: 1px solid var(--rule-gold); padding: 4px 9px;`

- **NG（候補パネル）**: 装備パネルの構造刷新が必要:
  - 現状: 全スロットに候補が並ぶ
  - モック: 行の下に **展開中スロットの候補だけ**、`background: var(--bg-deep);
    border: 1px solid var(--rule-soft); border-radius: 3px; padding: 10px 12px;` の枠で出す。
  - 中の候補行: `display: flex; align-items: center; gap: 10px; padding: 7px 0;` +
    底辺に border-bottom（最後だけ無し）。
    `[28x28 ItemSprite] | [名前 12px + ステ補正 10px 緑] | [「装備」チップ gold]`
  - 候補が無いときは「装備可能な候補がありません」を `font-size: 11px; color: var(--text-mute);`。

- **実装**: state に `expandedSlot: EquipSlotKey | null` を追加し、行末「選ぶ」/「外す」ボタンの
  代わりに **行クリックで展開トグル**（外すボタンは別 onClick で stopPropagation）。
  - 既存テストが「装備可能な候補をリスト表示する」前提だった場合、play function 側で
    展開クリックを挟む。

### 3.5 スキルセクション（`4b` 上半分）
- **NG（タイトル）**: 現状は `<h2>スキル SP {sp}</h2>` 1 行。
- **モック**:
  ```
  [スキル ・ {name}（display 17px）] ... [SP 4（mono 13px・gold 背景タグ）]
  ```
  右上 SP タグ: `font-family: var(--font-mono); color: var(--gold);
  background: var(--gold-tint); border: 1px solid var(--rule-gold);
  border-radius: 3px; padding: 3px 10px;`

- **NG（サブタブ）**: 現状は border の skill タブ。
- **モック**: フラットなチップ:
  - active: `background: var(--gold); color: var(--bg-mid); font-weight: 700;
    padding: 5px 14px; border-radius: 2px; font-size: 11px;`
  - inactive: `border: 1px solid var(--rule-base); color: var(--text-mute); padding: 5px 14px;`

- **NG（ツリー描画）**: 既存 `SkillTree` コンポーネントを使う点は変えない。
- **モック**: 外周枠が `background: #0a0b0e; border: 1px solid var(--rule-soft);
  border-radius: 4px; padding: 10px; height: 268px;` 程度。
- **凡例**: ツリー枠の右上に `font-size: 8px;` で `●習得 / □選択可 / □未開放` を 3 つ並べる。
  ローカルに wrapper として実装可。`SkillTree` の中身を変えるのは禁止。

- **NG（詳細パネル + 習得ボタン）**: 現状は `SkillTree` の `onLearn` callback で直接習得。
- **モック**: 選択中ノードがあれば、ツリー直下に「スキル詳細パネル」を出す。
  - `background: linear-gradient(180deg, #1a1d26, #13151c); border: 1px solid var(--rule-gold);
    border-radius: 4px; padding: 14px;`
  - タイトル行: `[スキル名（display 16px・gold-bright）] ... [補助「{種別} ・ Lv{cur} → {next}」]`
  - タグ列: 属性チップ / 対象チップ / 消費 TP チップ
  - 説明文: `font-size: 11px; line-height: 1.65; color: var(--text-soft);`
  - 前提: `font-size: 10px; color: var(--text-faint);` + 達成済みは緑「✓ 達成済み」
  - 「習得する（SP -{N}）」ボタン: `height: 42px;
    background: linear-gradient(180deg, var(--gold), var(--gold-deep)); color: var(--bg-mid);
    font-weight: 700;`
  - **実装簡略化**: 「選択中ノード」を `SkillTree` から受け取れない場合は、**選択中ノード詳細
    パネルは省略**してもよい（理由: `SkillTree` の内部 state が画面側に出てこないため）。
    省略する場合は、`onLearn` callback の直前に画面側で確認ダイアログを出す方針でも可。

- **NG（習得済みスキル一覧）**: モックでは詳細パネルの下に「習得済みスキル ・ N」のリスト。
  各行 `[名前 11px] [対象/消費 9px] [●●○ pip 8px]`。
  - 実装: `char.skillLevels` を引いて、現タブ（class / race / title）の習得済みのみ並べる。
    `availableSP` 等の既存ロジックを使う。データ参照のみで OK。

### 3.6 育成セクション 3 列ボタン（最下段）
- **NG（最大の差分）**: 現状は転職 → 称号 → 転生フォームを縦に並べる。展開済み状態。
- **モック**: **画面下端に 3 列ボタン**:
  ```
  [転職]     [称号]     [転生]
  Lv-5/技リセット   解放済 2択      Lv100→1
  ```
  - 各ボタン: `flex: 1; height: 44px; border-radius: 3px; display: flex;
    flex-direction: column; align-items: center; justify-content: center;`
  - 各ボタン下部に補助文 8px。
  - 転職: `border: 1px solid var(--rule-base); color: var(--text-soft);`
  - 称号: `border: 1px solid var(--rule-gold); color: var(--gold);`
  - 転生: `border: 1px solid rgba(212,103,79,.45); color: var(--danger-text);`
- **実装**: タップで `bottom sheet` または `inline 展開` でフォームを表示:
  - 転職: bottom sheet に転職セレクト + 警告 + 「転職する」
  - 称号: bottom sheet に解放済 2 択（または「第 X 階到達で習得」のメッセージ）
  - 転生: bottom sheet に「転生する…」展開（既存の `rbOpen` ロジックを bottom sheet に移植）
- **簡略実装可**: 全部 bottom sheet 化が重ければ、**転職と称号は inline 展開（その場でフォーム
  展開）でも可**。転生だけは modal/bottom sheet を残す（フォームが長いため）。

### 3.7 「スキル・育成へ」「一覧へ戻る」ボタン（`4a` 下端）
- **NG**: 現状はフッタに「もどる」1 個。
- **モック**: `4a stats/equip` の下端は **2 段**:
  - 「スキル・育成へ ›」primary（gold グラデ）
  - 「一覧へ戻る」sub (border outline)
- **実装解釈**: `4a` と `4b` は本来 **1 画面の縦長スクロール**に統合してよい（実装は既に統合済み）。
  - 「スキル・育成へ ›」ボタンは **アンカースクロール**（同画面内のスキルセクションへ
    `scrollIntoView`）または省略。
  - 「一覧へ戻る」は guild 画面へ navigate。
- **判断**: モック忠実方針なら **アンカースクロール実装**を入れる。実装が複雑になるなら
  「もどる」のみで OK（理由を SCSS コメントに明記）。

### 3.8 全体レイアウト
- **NG**: 現状の body は `overflow-y: auto` で全体スクロール。これは OK（モックも長いため
  スクロール前提）。
- **モック**: スキルツリー + 詳細パネル + 育成ボタン群が縦に積まれ、最下段の「拠点へ戻る」/
  「転職・称号・転生」ボタン群は `position: absolute` で固定。
- **実装**: body は flex column の唯一の可変領域。スクロール内に「ステータス → 種族耐性 →
  装備 → スキル」を積み、その下に「育成 3 列ボタン」を積む（スクロール領域内）。
  最下段の「もどる」だけはスクロール外（`.foot` flex item）に置く。

---

## 4. ゴール（Storybook ストーリー一覧）

Storybook で `Pages/GuildChar` の以下 4 ストーリーが、添付モックと同じビジュアル方向性で描画される。

1. `Default` — `mockWithParty` の先頭メンバー。ステ・耐性・装備（武器のみ展開）・スキルツリー
   （職業タブ）・育成 3 列ボタンがすべて見える。スクロール可。
2. `WithTitleSkillTab` — `mockGuildCharWithTitle`、スキルツリーが `title` タブ。
3. `ReincarnateOpen` — Lv100 メンバーで「転生」ボタンを押した状態。bottom sheet または
   inline フォームが展開している。
4. `EquipPick` — `Default` の preset、装備セクションで任意スロットを展開した状態。
   下に倉庫の候補が出ている。play function でスロットクリックを挟む。

`yarn test --run`・`yarn lint`・`yarn tsc -b` がすべて緑であること。

---

## 5. 実装ステップ

### Step 0. 全面書き直し前の準備
- 既存 `index.tsx` の state machine と handler を温存。
- 既存 `style.module.scss` は破棄、ゼロから書く。
- state 追加: `expandedSlot: EquipSlotKey | null` / `growthMode: 'transfer' | 'title' | 'rebirth' | null`。

### Step 1. ルートレイアウト
```scss
.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
  max-width: 560px;
  margin: 0 auto;
  padding: 0 0 max(14px, env(safe-area-inset-bottom, 0px));
  overflow: hidden;
  background: var(--bg-page-gradient);
  color: var(--text-base);
  font-family: var(--font-body);
}
```

### Step 2. ヘッダー
- grad bg `linear-gradient(180deg, #1a1f2b, #13151c)` + border-bottom `var(--rule-gold)`
- `padding: 18px 20px;` + `display: flex; gap: 14px; align-items: center;`
- 左: 64x64 ポートレート
- 中央: 名前（display 20px）+ 「{種族} ・ {職業} ・ Lv{n}」+ ポジションタグ
- 右: EXP インジケータ（取得できれば）

### Step 3. body（スクロール領域・唯一の可変領域）
```scss
.body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  touch-action: pan-y;
  padding: 16px 20px 12px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
```

#### Step 3a. 能力値（4 列 grid）→ §3.2

#### Step 3b. 種族耐性 → §3.3

#### Step 3c. 装備（行 + 展開）→ §3.4

#### Step 3d. スキル（タイトル + サブタブ + ツリー + 詳細 + 習得済み）→ §3.5

#### Step 3e. 育成 3 列ボタン → §3.6
- ここまでが body 内の最下段。

### Step 4. フッタ
- 「もどる」（→ guild）`width: 100%; height: 46px; border: 1px solid var(--rule-base);
  color: var(--text-mute); font-size: 13px; letter-spacing: .16em;`

### Step 5. オーバーレイ（bottom sheet / 中央モーダル）
- §3.6 で説明した育成フォーム（転職 / 称号 / 転生）の展開先。
- 共通 bottom-sheet スタイル:
  ```scss
  .sheet {
    position: fixed; inset: 0;
    background: var(--bg-overlay);
    display: flex; align-items: flex-end;
    z-index: 100;
  }
  .sheetPanel {
    width: min(560px, 100%);
    background: var(--surface-panel);
    border-top: 1px solid var(--rule-gold);
    border-radius: 10px 10px 0 0;
    padding: 18px 20px max(20px, env(safe-area-inset-bottom, 0px));
    display: flex; flex-direction: column; gap: 12px;
  }
  ```
- grab handle を必ず付ける（guild と同じパターン）。

---

## 6. 検証

```sh
yarn lint
yarn test --run
yarn tsc -b
```

すべて緑にする。

---

## 7. コミット

```
feat(redesign-A): rebuild guild-char page to match mock v2

- compact equip rows with on-demand candidate panel (expandedSlot state)
- restructure skill section with chip subtabs + SP gold tag + detail panel
- 3-col bottom growth buttons (transfer / title / rebirth) with bottom-sheet forms
- align resist badges to mock colors (耐 vermilion / 弱 azure / − faint)
- color HP/TP stat values per mock

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

push 不要。SHA を最終応答で報告。

---

## 追加トークン要求

- 現時点で `_obsidian.scss` の既存トークンと生 hex で間に合う。**追加不要**。

