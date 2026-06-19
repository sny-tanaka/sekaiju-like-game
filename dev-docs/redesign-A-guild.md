# フェーズ 2：guild 画面リデザイン（sonnet 用指示書）— **改訂版 v2 — モック忠実化**

`dev-docs/redesign-A.md`（特に **§1.5 レイアウト運用ルール**）と
`dev-docs/redesign-A-title-fix.md`（flex column 化のパターン）を **必ず先に読む**こと。

参考にするモック原本: `/tmp/sekaiju-design/案A_v2.dc.html` の line 363〜511
（`3a create` / `3b roster` / `3c party + picker overlay` / `3d banish + confirm` の 4 サブ状態）。

参考にする機能仕様: `dev-docs/claude-design-brief.md` **§4.3 guild — ギルド管理**。

> **改訂方針（v2）**: 前回 v1 で実装したものは「色味は黒曜だがレイアウト構造がモックと違う」と
> ユーザーから明示されました（"色味以外ほとんど合っていない。ボタン配置など画面構成そのものが
> 変わっているものはそれに対応してください"）。今回はモック忠実度を最優先で取り直します。
> 「機能仕様に無いボタンは省略してよい」という前回の判断は撤回。モックに描かれている要素は
> 原則すべて再現し、機能と紐付かない要素も配置だけは合わせ disabled で出します。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい

以下 3 ファイルのみ。

| 区分 | パス | 操作 |
| --- | --- | --- |
| 編集 | `src/pages/guild/index.tsx` | マークアップを flex column 構造に再構成。**前回 v1 の構造は捨てて書き直す**。state machine とロジック（`addCharacterToGuild` / `removeCharacterFromGuild` / `setSlot` / `formationCount` / `useGameState` 等）は温存 |
| 編集 | `src/pages/guild/style.module.scss` | 黒曜テーマで全面書き直し。`@use 'variables'` は使わず `var(--*)` を直接参照 |
| 編集 | `src/pages/guild/Guild.stories.tsx` | 既存 6 本（`Empty` / `WithMembers` / `Roster` / `Party` / `PartyPicker` / `BanishConfirm`）を温存。preset が足りなければ `src/__stories__/mockSaves.ts` に追加可（既存 preset は変更禁止） |

### 触ってはいけない

- `src/_obsidian.scss` （トークン本体。追加 CSS 変数が要るなら本書 §7「追加トークン要求」に明記）。
- `src/_variables.scss`（写本テーマ用）。
- `src/components/common/CharacterPortrait/*`、`src/components/creation/RaceInfoCard/*`、
  `src/components/creation/ClassInfoCard/*` などの共通コンポーネント本体。
  画面側でスタイル上書きが要るならローカル wrapper クラスで対応する。
- 他画面 (`town` / `guild-char` / `shop` / `forge` / `dungeon` / `battle` / `codex` / `title` /
  `not-found`) の `index.tsx` / `style.module.scss`。
- ゲームロジック（`createCharacter` / `addCharacterToGuild` / `removeCharacterFromGuild` /
  `setSlot` / `formationCount` / `useGameState` / `useNavigation` / `useSfx`）。
- `src/__stories__/decorators.tsx` / 既存 preset (`mockEmpty` / `mockWithParty` ...) の中身。
- 既存テスト（`src/pages/guild/index.test.tsx` 等があれば）の assert 文を変えない。
  マークアップ変更で落ちる場合は最小限の機械的追従（querySelector の差し替え等）のみ。

---

## 2. やってはいけないこと

- 自分でさらに `Agent` / `Task` を spawn しない（孫委譲禁止）。
- 写本テーマ由来の SCSS 変数 (`$parchment` 等) を新規参照しない。
- **絶対配置で「タイトルから何 px」みたいな決め打ちレイアウトを書かない**。`§1.5 のルール`どおり、
  全要素は flex column / flex item として積む。絶対配置 / fixed は装飾要素（モーダル backdrop /
  bottom sheet）に限る。
- `position: absolute; bottom: 22px;` のような **画面下端固定の決め打ち**を書かない。
  `margin-top: auto` と `safe-area-inset-bottom` の組み合わせで下に張り付ける。
- 6 種族・9 職業の name を **ハードコードしない**。データ層 (`RACES` / `CLASSES`) を参照して
  描く（モックの「ガロン / ヒューマ / ...」は飾り、実データ名で出す）。
- ステージング: モックの `glowPulse` / `warnBlink` 等の細かい FX は、`_obsidian.scss` に既に
  `obsidian-glowPulse` / `obsidian-warnBlink` が配布されているので新規追加せず流用する。

---

## 3. モックとの差分一覧（最重要・現状実装 → モックの差を全列挙）

前回 v1 の実装はモックから大きくズレている。以下を **すべて** モック準拠に直す。
箇条書きの順番は重要度ではなく画面上の上から順。

### 3.1 ヘッダー
- **OK**: タイトル「ギルド管理」+ `{members.length} / 30`。これは現状 OK。

### 3.2 タブバー（最上段）
- **NG**: 現状はチップ風（active 時に gold 背景・周りも tab に padding）。
- **モック**: 4 タブが横一直線で `flex: 1` 均等割り。**全体に下線 1px**
  `border-bottom: 1px solid rgba(255,255,255,.08)`。
- **active**: 文字色 `#0e0f13`（bg-mid）+ `font-weight: 700` + 背景 `#c9a86a`（gold）+
  **`border-radius: 3px 3px 0 0`**（上 2 角だけ角丸 / 下端は下線と一体）。
- **inactive**: 文字色 `#7c7a74`（text-faint）/ 背景 transparent / 余白で文字だけ。
- **モック実体**:
  ```css
  .tabs { display: flex; gap: 4px; margin: 12px 20px 0; border-bottom: 1px solid var(--rule-soft); }
  .tab { flex: 1; text-align: center; padding: 9px 0; font-size: 12px; color: var(--text-faint); border-radius: 3px 3px 0 0; }
  .tabActive { color: var(--bg-mid); font-weight: 700; background: var(--gold); }
  ```

### 3.3 作成タブ（`3a`）
- **NG（種族）**: 現状は `<select>` ドロップダウン + `RaceInfoCard`。
- **モック（種族）**: **3 列 × 2 行のカードグリッド**（6 種族）。各カードは
  `aspect-ratio: 1.4` / `border-radius: 3px` / `display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;` 内部に大シンボル（18px・絵文字でよい）+
  種族名 10px。選択中は `background: rgba(201,168,106,.12); border: 1px solid rgba(201,168,106,.6); color: var(--gold);`。
  非選択は `background: #15171f; border: 1px solid rgba(255,255,255,.08); color: var(--text-soft);`。
  - グリッドの直下に `RaceInfoCard` 風の説明カードを 1 枚（選択中種族の `成長 / 耐性 / 採集 / 推奨`）。
    既存 `RaceInfoCard` をそのまま wrapper でラップしてよい。
- **NG（職業）**: 現状は `<select>` ドロップダウン + `ClassInfoCard`。
- **モック（職業）**: **横並びチップ**（9 個）。`display: flex; flex-wrap: wrap; gap: 6px;`。
  チップは `border-radius: 14px; padding: 6px 11px; font-size: 11px;` 選択中は
  `background: rgba(201,168,106,.14); border: 1px solid rgba(201,168,106,.6); color: var(--gold); font-weight: 700;`、
  非選択は `background: #15171f; border: 1px solid rgba(255,255,255,.08); color: var(--text-soft);`。
  - チップ列の直下に `ClassInfoCard` 風の説明カード（選択中職業の `適性 / 概要`）。

- **NG（名前入力）**: 現状はラベル「名前」と input が縦に並ぶだけ。
- **モック（名前入力）**: ラベル `名前 （最大16字）` の細字補足 + 入力欄高さ 44px +
  入力後カーソル位置に **gold 縦バー（`width: 2px; height: 20px; background: var(--gold); animation: obsidian-warnBlink 1s steps(1) infinite;`）**。
  これは飾り（実 input にフォーカス時のみ表示）。最低限 input の `border: 1px solid var(--rule-gold);
  background: var(--surface-elev);` を再現すること。

- **NG（プレビュー位置）**: 現状はフォーム末尾の通常 flex item。
- **モック**: プレビューカードは画面の **bottom 78px 位置に固定**（モック原本では `position: absolute`）。
  実装ルール上、絶対配置は避ける。**作成タブ本体の最下段 flex item として**、
  primary ボタンの直前に積む。プレビューカードの構造:
  ```
  [52x52 ポートレート] | [プレビュー（補助文字 10px）/ 表示名（Shippori Mincho 16px）/ 「種族 ・ 職業」]
  ```
  背景 `#1a1d26` + border 1px `rgba(201,168,106,.3)`。

- **NG（作成ボタン）**: 現状は `footer` の primary ボタン。
- **モック**: 同じ。ただし高さ 48px、文字 15px、letter-spacing .12em で「作成する」（disabled
  時は「団員が上限です」）。

### 3.4 一覧タブ（`3b`）
- **NG（フィルター）**: 現状は `<select>` 3 つの並び。
- **モック**: **3 つのボタン**（種族 / 職業 / Lv↓）が横並び。
  - 種族・職業: `flex: 1; height: 34px;` テキスト左寄せ「種族: すべて ▾」+ 右に `▾`。
  - Lv↓: 固定幅 90px、テキスト中央寄せ「Lv ↓」。
  - 全部 `border: 1px solid rgba(255,255,255,.12); border-radius: 3px; background: transparent; color: var(--text-soft);`。
  - 実装は `<select>` のままでも見た目を上記のチップ風に揃えれば可（appearance: none + 自前 ▾
    アイコンを `::after` で乗せる）。**`<select>` のままで OK。`appearance: auto` を `none` に
    切り替えて見た目をモックに合わせる**。

- **NG（行レイアウト）**: 現状は「ポートレート / 名前 + ポジションタグ / 種族・職業・Lv ›」。
- **モック**: 同方向だが、ぴったり以下:
  ```
  [36x36 ポートレートカード（bg #0c0d11, radius 3）] | [名前 13px + ポジションタグ 8px]
  [補助文 10px: 「{種族} ・ {職業} ・ Lv{level}」] | [➜ gold 15px]
  ```
  - 行のスタイル: `background: var(--surface-panel); border: 1px solid; border-radius: 3px;
    padding: 10px 12px;`
  - 前衛行は `border-color: rgba(201,168,106,.3)`（強調）、後衛行は `border-color: rgba(255,255,255,.07)`、
    控え行は `background: #101218; border-color: rgba(255,255,255,.05);` + ➜ アイコンも `color: #5d5a52`
    に弱める。
  - **ポジションタグ**:
    - 前衛: `font-size: 8px; color: var(--gold); border: 1px solid rgba(201,168,106,.4); border-radius: 2px; padding: 0 4px;`
    - 後衛: `color: #6f9fd8; border-color: rgba(111,159,216,.4);` （現状の `info-blue` でも可）
    - 控え: `color: #7c7a74; border-color: rgba(255,255,255,.12);`

- **モック原本に存在するが現状 UI 不足**: 「行末の `➜`」を `color: var(--gold); font-size: 15px;` で
  右端に配置すること。クリックで詳細遷移。

### 3.5 編成タブ（`3c`）
- **NG（最大の差分）**: 現状は前衛 1 列 × 3 / 後衛 1 列 × 3 の縦長リスト。
- **モック**: **3 列 grid**:
  ```css
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  ```
  各スロットカードは `height: 104px; border-radius: 4px; padding: 8px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;`。
  - 中央に 46x46 のポートレートマス、その下に名前 11px。
  - 配置済み前衛: `background: var(--surface-panel); border: 1px solid rgba(201,168,106,.35);`
  - 配置済み後衛: `background: var(--surface-panel); border: 1px solid rgba(111,159,216,.35);`
  - 空きスロット: `background: rgba(201,168,106,.08); border: 1px solid rgba(201,168,106,.7);
    color: var(--gold); font-size: 24px;` 中央に「＋」+ `animation: obsidian-glowPulse 2.4s infinite;`

- **NG（セクション見出し）**: 現状は「前衛」/「後衛（近接ダメージ -30%）」の小さなラベル。
- **モック**: 見出しは大きめ + gold:
  - 前衛: `font-size: 11px; letter-spacing: .16em; color: var(--gold); font-weight: 700; margin-bottom: 10px;` 文字は
    「前衛 ・ FRONT」（FRONT は英字補助）。
  - 後衛: 同様だが色 `#6f9fd8`、文字は「後衛 ・ BACK」+ 右に補助文 10px「近接ダメージ −30%」。

- **NG（ピッカー＝既存 bottom sheet は OK だが中身が違う）**:
- **モック**: bottom sheet 自体は実装済みなので残してよい。改善点:
  - 上端に **`40x4` の grab handle**: `width: 40px; height: 4px; border-radius: 2px;
    background: rgba(255,255,255,.18); margin: 0 auto 16px;`
  - タイトル: `font-family: var(--font-display); font-size: 16px;` 「前衛スロットへ配置」。
  - 各候補行は `display: flex; align-items: center; gap: 12px; background: #1a1d26;
    border: 1px solid rgba(255,255,255,.08); border-radius: 3px; padding: 10px 12px;`
    で、行末に **「配置」チップボタン**（`font-size: 11px; color: var(--gold);
    border: 1px solid rgba(201,168,106,.4); border-radius: 2px; padding: 4px 10px;`）を置く。
    既存実装は行全体クリックで配置だが、モックでは「配置」ラベル付き。
    **行全体のクリックで配置を発火しつつ、視覚的に「配置」チップを右端に表示**する。
  - シート最下段に「とじる」ボタン: `height: 44px; border: 1px solid var(--rule-base);
    color: var(--text-mute);`。

### 3.6 追放タブ（`3d`）
- **NG（行）**: 現状は左ポートレート + 右に追放ボタン。
- **モック**: 一覧タブの行とほぼ同じだが、行末が **追放チップ** に置き換わる:
  - 通常: `font-size: 11px; color: var(--danger-text); border: 1px solid rgba(212,103,79,.4);
    border-radius: 2px; padding: 4px 10px;` 文字「追放」。
  - ハイライト（ダイアログ対象）: 行全体の border が `rgba(212,103,79,.45)` + チップが
    `background: var(--danger-glow); color: var(--bg-mid); font-weight: 700;`。
    ハイライト状態は banishId と一致する行に出す（既に state はある）。

### 3.7 追放確認ダイアログ
- **NG**: 現状は単純な中央モーダル。
- **モック**: 中央モーダル + 上端に **54x54 円形シンボル**（`border-radius: 50%;
  background: var(--bg-deep); border: 1px solid rgba(212,103,79,.4);` 中身は対象キャラの
  ポートレート ≤ 26px or 絵文字）。
  - タイトル: `font-family: var(--font-display); font-size: 18px; text-align: center;`
    「{name} を追放しますか？」
  - 警告ブロック: `font-size: 12px; color: var(--danger-text-soft); line-height: 1.7;
    background: var(--danger-tint); border-left: 2px solid var(--danger-glow);
    padding: 10px 12px; border-radius: 0 3px 3px 0;`
    「追放した団員は二度と戻りません。装備は倉庫に返却されます。」
  - アクション: 2 列 (`display: flex; gap: 10px;`):
    - 「もどる」: `border: 1px solid var(--rule-base); color: var(--text-soft);`
    - 「追放する」: `background: var(--danger); color: #fbeae6; font-weight: 700;`

### 3.8 フッタ
- **NG**: 現状は `.foot` 内に primary（作成時のみ）+ sub（拠点へ戻る）の縦並び。
- **モック**: 作成タブのときは primary「作成する」が画面下に。それ以外のタブでは
  **「拠点へ戻る」だけが画面下端に配置**。`height: 46px; border: 1px solid rgba(255,255,255,.1);
  color: var(--text-mute); font-size: 13px; letter-spacing: .16em;`。
  - **作成タブ時のみ**: プレビューカード + primary「作成する」+「拠点へ戻る」の 3 段積み。
  - **それ以外のタブ**: 「拠点へ戻る」のみ。

---

## 4. ゴール（Storybook ストーリー一覧）

Storybook で `Pages/Guild` の以下 6 ストーリーが、添付モックと同じビジュアル方向性で描画される。

既存（残す・preset / play 関数は維持し、見た目だけ追従）:

1. `Empty` — `mockEmpty`、`tab = 'create'`。種族カード 3×2 と職業チップ 9 個が描画される。
2. `WithMembers` — `mockWithParty`、`tab = 'create'`。同上。
3. `Roster` — `mockWithParty` で `tab = 'roster'`。行が前衛/後衛/控えの色分けで並ぶ。
4. `Party` — `mockWithParty` で `tab = 'party'`。3 列 grid の編成スロットが描画される。
5. `PartyPicker` — `Party` の上に bottom sheet を開いた状態。grab handle + 候補リスト + 「配置」
   チップが見える。
6. `BanishConfirm` — `tab = 'banish'` で中央に確認ダイアログを開いた状態。54x54 円形シンボル +
   警告ブロックが見える。

`yarn test --run`・`yarn lint`・`yarn tsc -b` がすべて緑であること。

---

## 5. 実装ステップ

### Step 0. 全面書き直し前の準備
- 既存 `index.tsx` の state machine と handler は維持。マークアップだけ捨てて書き直す。
- 既存 `style.module.scss` は破棄、ゼロから書く。

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
  padding: 16px 20px max(20px, env(safe-area-inset-bottom, 0px));
  overflow: hidden;
  background: var(--bg-page-gradient);
  color: var(--text-base);
  font-family: var(--font-body);
  gap: 12px;
}
```

### Step 2. ヘッダー
```tsx
<header className={styles.head}>
  <h1 className={styles.title}>ギルド管理</h1>
  <span className={styles.count}>
    {members.length} <span className={styles.countLimit}>/ {GUILD_MEMBER_LIMIT}</span>
  </span>
</header>
```
スタイルは `display: flex; justify-content: space-between; align-items: baseline; flex-shrink: 0;`。
タイトルは `font-family: var(--font-display); font-size: 18px; color: var(--text-strong);`、
カウントは `font-family: var(--font-mono); font-size: 12px; color: var(--gold);`。

### Step 3. タブバー（モック準拠）
4 タブを `flex: 1` で均等、active のみ gold 背景 + 上 2 角だけ角丸、下端は全幅下線で接続。
詳細は §3.2 を参照。

### Step 4. body（可変領域・タブ別の中身）
```scss
.body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  touch-action: pan-y;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 4px 0;
}
```

#### Step 4a. 作成タブ
- 名前入力（gold border・カーソルバー）→ §3.3
- 種族グリッド（3 列）→ §3.3
- `RaceInfoCard` wrapper → §3.3
- 職業チップ列（wrap）→ §3.3
- `ClassInfoCard` wrapper → §3.3
- プレビューカード（52x52 + 名前）→ §3.3

#### Step 4b. 一覧タブ
- フィルター 3 連（種族 / 職業 / Lv↓）→ §3.4
- 行リスト → §3.4

#### Step 4c. 編成タブ
- 前衛見出し
- 前衛 3 列 grid（3 スロット）→ §3.5
- 後衛見出し（補助文付き）
- 後衛 3 列 grid（3 スロット）→ §3.5

#### Step 4d. 追放タブ
- 行リスト + 追放チップ → §3.6

### Step 5. フッタ
- 作成タブ: 「作成する」primary（48px・gold グラデ）→ 「拠点へ戻る」sub
- それ以外: 「拠点へ戻る」のみ
- いずれも `margin-top: auto` ではなく `.layout` の最下段の `flex item` として積む。

### Step 6. オーバーレイ
- ピッカー: bottom sheet（既存実装を §3.5 で改修）
- 追放確認: 中央モーダル（§3.7）

### Step 7. SCSS ガイド
- 共通サイズトークン:
  - インセット: 横 20px、縦 14〜20px（safe-area 込み）
  - 角丸: タブ 3px、行 3〜4px、ダイアログ 6px、シート 10px 10px 0 0
  - フォント: 見出し `var(--font-display)`、本文 `var(--font-body)`、数値 `var(--font-mono)`
- 色は `var(--*)` を必ず使う。生 hex は次の場合に限り許可:
  - モック固有のサブ背景 `#15171f` / `#1a1d26` / `#0c0d11`（surface-panel / 内側パネル / bezel）
  - これらは既に `var(--surface-panel)` 等で代替できるなら必ず変数を使う

---

## 6. 検証

```sh
yarn lint
yarn test --run
yarn tsc -b
```

すべて緑にする。`yarn storybook --host 0.0.0.0` で Storybook を起動し、上記 6 ストーリーが
モック相当の構造で描画されることを目視で確認できれば理想だが、視覚チェックは後でディレクター
が行うので **ストーリーは「play 関数で意図した状態に到達できる」までを担保**する。

---

## 7. コミット

worktree 内で **1 コミット**にまとめる:

```
feat(redesign-A): rebuild guild page to match mock v2

- replace race dropdown with 3x2 card grid
- replace class dropdown with wrap chips
- restructure party tab to 3-col grid with glow + empty slot
- align tab bar to flat underline style
- bring banish confirm dialog to circle symbol + warn block layout
- restructure picker as bottom sheet with grab handle + "配置" chip

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

push 不要。SHA を最終応答で報告。

---

## 追加トークン要求

- 今回 `_obsidian.scss` の **既存トークン値は変更しない**。
- 追加が必要な場合のみ次セクションに記入し、ディレクターが別タスクで適用する。
  - 例: `--surface-elev-strong: #1a1d26;`（モック内側パネル用）
  - 現状の判断: 既存トークンと生 hex で十分間に合う → **追加不要**。

