# フェーズ 2：guild 画面リデザイン（sonnet 用指示書）

`dev-docs/redesign-A.md`（特に **§1.5 レイアウト運用ルール**）と `dev-docs/redesign-A-title-fix.md`
（flex column 化のパターン）を **必ず先に読む**こと。本ファイルは guild 画面（ギルド管理 / 4 タブ）の
取り込み手順を網羅した実装指示書。

参考にするモック原本: `/tmp/sekaiju-design/案A_v2.dc.html` の line 363〜511
（`3a create` / `3b roster` / `3c party + picker overlay` / `3d banish + confirm` の 4 サブ状態）。

参考にする機能仕様: `dev-docs/claude-design-brief.md` **§4.3 guild — ギルド管理**。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい

以下 3 ファイルのみ。

| 区分 | パス | 操作 |
| --- | --- | --- |
| 編集 | `src/pages/guild/index.tsx` | マークアップを flex column 構造に再構成（state machine とロジックは温存） |
| 編集 | `src/pages/guild/style.module.scss` | 黒曜テーマで全面書き直し（旧 `@use 'variables'` を削除し `var(--*)` を直接参照） |
| 編集 | `src/pages/guild/Guild.stories.tsx` | ストーリーは既存 2 本（`Empty` / `WithMembers`）を温存。**追加で 4 本**（後述 §3）作成可。preset が足りなければ `src/__stories__/mockSaves.ts` に追加してよい（既存 preset は変更禁止） |

### 触ってはいけない

- `src/_obsidian.scss` （トークン本体。追加 CSS 変数が要るなら本書 §3 末尾の「追加トークン」で
  指示する）。
- `src/_variables.scss` （写本テーマ用。フェーズ 2 で別タスクとして整理する想定）。
- `src/components/common/CharacterPortrait/*`, `src/components/creation/RaceInfoCard/*`,
  `src/components/creation/ClassInfoCard/*` などの共通コンポーネント本体。**画面側でクラス
  上書きが必要なら、guild の `style.module.scss` 内でローカル wrapper クラスを書いて対応**
  （共通コンポーネントのファイルは触らない）。
- 他画面 (`town` / `guild-char` / `shop` / `forge` / `dungeon` / `battle` / `codex` / `title` /
  `not-found`) の `index.tsx`・`style.module.scss`。
- ゲームロジック（`createCharacter` / `addCharacterToGuild` / `removeCharacterFromGuild` /
  `setSlot` / `formationCount` / `useGameState` / `useNavigation` / `useSfx`）。
- `src/__stories__/decorators.tsx` / 既存 preset (`mockEmpty` / `mockWithParty` …) の中身。
- `src/pages/guild/index.test.tsx` 等のテストは **assert 文を変えない**。マークアップ変更で落ちる
  場合は最小限の修正（querySelector の差し替え等）に留め、テストの意図を変えないこと。

---

## 2. やってはいけないこと

- 自分でさらに `Agent` / `Task` を spawn しない（孫委譲禁止）。
- 写本テーマ由来の SCSS 変数 (`$parchment` 等) を新規参照しない。
- 既存テストの assert 文を書き換えない（落ちたらマークアップを直す or テスト記述の機械的
  追従のみ）。
- 絶対配置で「タイトルから何 px」みたいな決め打ちレイアウトを書かない。**§1.5 のルール**
  どおり、全要素は **flex column / flex item** として積む。絶対配置 / fixed は **装飾要素
  （浮遊粒子 / バックドロップ / ピッカーシート）に限る**。
- `position: absolute; bottom: 22px;` のような **画面下端固定の決め打ち**を書かない。
  `margin-top: auto` と `safe-area-inset-bottom` の組み合わせで下に張り付ける。
- タブ切替時にスクロール位置がリセットされない実装にしない（タブの中身は section 単位で
  flex を切替）。
- モックに描かれている「種族グリッド（3 列 × 2 行のカード形式）」を採用する場合でも、
  6 種族・9 職業の name は **データ層 (`RACES` / `CLASSES`) を参照**して描く。モックの
  「ガロン / ヒューマ / フォレン / ドワル / フェイ / ノクス」「踊り子 / 剣士 / 狩人 …」の
  名前を **ハードコードしない**（実データは `RACES['race_human'].name = 'ヒト'` 等のため、
  そのまま描けばよい。本仕様 §3 で詳述）。
- ステージング: モックの `coinPop` / `forgeSpark` / `glowPulse` 等の細かい FX を新規追加しない。
  既に `_obsidian.scss` で `obsidian-glowPulse` / `obsidian-warnBlink` 等は配布されているので、
  必要に応じて流用する。新規 `@keyframes` を増やしたい場合は **本書 §3 末尾の「追加トークン」
  セクション**に追加することを明示してから書く。

---

## 3. ゴール

Storybook で `Pages/Guild` の以下 6 ストーリーが、添付モック「案 A 黒曜 OBSIDIAN MINIMAL」と
同じビジュアル方向性で描画される。

既存（残す）:

1. `Empty` — `mockEmpty`、画面遷移直後 `tab = 'create'`。団員 0 名なので一覧/編成/追放タブは
   空。
2. `WithMembers` — `mockWithParty`、`tab = 'create'`。

新規（追加）:

3. `Roster` — `mockWithParty` で `tab = 'roster'`。 `play` 関数で「一覧」タブをクリックする
   形でよい。
4. `Party` — `mockWithParty` で `tab = 'party'`。
5. `PartyPicker` — `mockWithParty` で `tab = 'party'`、さらに前衛 3 枠目（空きスロット）を
   クリックしてピッカーが開いた状態。
6. `BanishConfirm` — `mockWithParty` で `tab = 'banish'`、さらに任意メンバーの「追放」を
   クリックして確認ダイアログが開いた状態。

`yarn test --run`・`yarn lint`・`yarn tsc -b`（または `yarn build`）が緑であること。

### 機能優先で省略した要素（モックにあるが現状の機能にないため省略）

- モック `3a create` の **3 列カード形式の種族ピッカー（🜂 ガロン等の絵文字付き）**: 本実装の
  種族選択は `<select>` ドロップダウン + `RaceInfoCard` の構成。**ドロップダウンを廃止して
  3 列カード化する変更は本指示書のスコープ外**（カード化すると `index.tsx` のフォーム制御を
  根本的に変えることになり、`createCharacter` 側との整合確認が必要）。
  → SCSS で「ドロップダウン + 直後の `RaceInfoCard` ペア」を黒曜カードに見えるように装飾する
  方針で対応。職業も同様（モックではチップ群、本実装は `<select>` + `ClassInfoCard`）。
- モック `3a create` の **名前入力欄の点滅カーソル装飾**: 機能上不要（実 input はネイティブの
  caret を持つ）。`obsidian-warnBlink` を併用したい場合は装飾としてのみ追加可。
- モック `3a create` の **「プレビュー + 作成する」を絶対配置で画面下に張り付ける構造**: §1.5
  により禁止。プレビューカードは flex item として作成セクションの末尾に積み、作成ボタンは
  画面共通フッタの上に置く（後述 §4 Step 2）。
- モック `3c party` の **「前衛・FRONT」みたいな英大文字ラベル併記**: 本実装の現行ラベルが
  「前衛」「後衛（近接ダメージ -30%）」のみ。デザイン強調が必要なら「`<span>FRONT</span>`」を
  脇に添える形で **装飾としてのみ**書ける。文言は機能要件に従い既存を尊重。
- モック `3d banish + confirm` の **赤枠強調（点滅）+ アバター表示の確認ダイアログ**: 本実装の
  確認ダイアログには「Lv28 ドルム（ドワル 盾衛）を追放します。よろしいですか？」のテキスト
  だけ。アバターアイコンを追加するなら `CharacterPortrait` を使う。**追放実行ボタンの文言
  「はい」/「いいえ」は機能上同一なので、装飾差し替えのみ可**（モックの「もどる」「追放する」に
  寄せたい場合は文言変更してよいが、その場合は `index.test.tsx` の文言 assert と整合させる）。

### 機能優先で追加した要素（モックには無いが機能上必要なもの）

- **「拠点へ戻る」フッタ**: モック `3b roster` / `3c party` / `3d banish` に「拠点へ戻る」ボタンが
  描かれているのでフッタは存在するが、`3a create` のモックでは「作成する」ボタンに上書き
  されて見えない。**全タブ共通で「拠点へ戻る」フッタを残す**（作成タブでは「作成する」ボタンの
  下に flex item として並べる）。
- **タブ切替時の通知メッセージ消去** (`setNotice(null)`): 既存 index.tsx のロジックを保持。
- **団員ピッカーで「この枠を空ける」ボタン**: モックには無いが既に実装されている機能。`slot`
  に既に団員が居る場合に表示する。残す。
- **一覧タブのフィルタ「種族: すべて」「職業: すべて」+ ソート**: モックでは 3 つの横並び
  ドロップダウンとして描かれているので、`<select>` 3 つを横並び flex で組む。

---

## 4. 実装ステップ

### Step 0. 事前読み込み

`dev-docs/redesign-A.md` の §1.1〜§1.6 と §1.5（必須）、`dev-docs/redesign-A-title-fix.md` の
「レイアウト設計」「スタイル指針」を読む。`src/_obsidian.scss` の中身（CSS 変数 / 共通
`@keyframes`）を把握する。

### Step 1. `index.tsx` のマークアップ刷新（ロジック温存）

`useState` / `useCallback` / `useMemo` の宣言・各種 hook 利用・`handleCreate` / `setSlot` /
`removeCharacterFromGuild` 等の呼び出しは **一切変えない**。マークアップだけ刷新する。

ルートは title フェーズの flex column パターンを踏襲。

```tsx
return (
  <div className={styles.layout}>
    <header className={styles.head}>
      <h1 className={styles.title}>ギルド管理</h1>
      <span className={styles.count}>
        {members.length}
        <span className={styles.countLimit}> / {GUILD_MEMBER_LIMIT}</span>
      </span>
    </header>

    <nav className={styles.tabs} role="tablist">
      {/* 4 タブ（create / roster / party / banish）。active のみ gold ピル風 */}
      ...
    </nav>

    {/* タブ本体: flex: 1 1 auto; min-height: 0; overflow-y: auto; */}
    <section className={styles.body}>
      {tab === 'create' ? (
        <div className={styles.create}>...</div>
      ) : tab === 'roster' ? (
        <div className={styles.roster}>...</div>
      ) : tab === 'party' ? (
        <div className={styles.party}>...</div>
      ) : (
        <div className={styles.banish}>...</div>
      )}
    </section>

    <footer className={styles.foot}>
      {tab === 'create' ? (
        <button className={styles.primary} onClick={handleCreate} ...>
          {isFull ? '団員が上限です' : '作成する'}
        </button>
      ) : null}
      <button className={styles.sub} onClick={() => navigate({ name: 'town' })}>
        拠点へ戻る
      </button>
    </footer>

    {/* オーバーレイ系（ピッカー / 追放確認）はルート直下に置く */}
    {picker ? <PickerSheet ... /> : null}
    {banishTarget ? <BanishConfirm ... /> : null}
  </div>
);
```

ポイント:

- `.body` を **唯一の可変領域**にして縦スクロール可（`flex: 1 1 auto; min-height: 0;
  overflow-y: auto;`）。`.head` / `.tabs` / `.foot` は `flex-shrink: 0;`。
- create タブのときだけフッタに「作成する」を出すと、roster/party/banish と高さが変わる。
  これは仕様。ボタンを切り替えても画面全体スクロールはさせない（タブ本体側で吸収）。
- ピッカーと追放確認ダイアログは **fixed のバックドロップ** + 中央パネル（モーダル）または
  **下からせり上がるシート**（モック準拠）。今回は **シート方式**を採用（モック `3c party` の
  picker overlay が画面下半分から立ち上がる構造のため）。

### Step 2. SCSS のレイアウト指針

`@use 'variables' as var;` の行を **削除**。新規セレクタはすべて `var(--*)` を直接参照する。

#### 2.1 ルート（共通）

```scss
.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
  max-width: 560px;
  margin: 0 auto;
  padding: 14px 20px max(14px, env(safe-area-inset-bottom, 0px));
  overflow: hidden;
  background: var(--bg-page-gradient);
  color: var(--text-base);
  font-family: var(--font-body);
  gap: 10px;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-shrink: 0;
  padding-top: 4px;
}
.title {
  font-family: var(--font-display);
  font-size: clamp(16px, 4.6vw, 18px);
  color: var(--text-strong);
  margin: 0;
}
.count {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--gold);
}
.countLimit {
  color: var(--text-faint);
}
```

#### 2.2 タブ

モック準拠で「active が金箔ピル風」。`border-bottom: 1px solid var(--rule-soft)` を引き、active タブだけ
背景 `var(--gold)` + 文字 `var(--bg-mid)` で塗る。

```scss
.tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--rule-soft);
  flex-shrink: 0;
}
.tab {
  flex: 1;
  padding: 9px 0;
  text-align: center;
  font-size: 12px;
  color: var(--text-faint);
  background: transparent;
  border: none;
  border-radius: 3px 3px 0 0;
  cursor: pointer;
  &:hover { color: var(--text-soft); }
}
.tabActive {
  color: var(--bg-mid);
  font-weight: 700;
  background: var(--gold);
}
```

#### 2.3 タブ本体（可変領域）

```scss
.body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 4px 0;
}
```

#### 2.4 create タブ（作成フォーム）

`RaceInfoCard` / `ClassInfoCard` は触れないので、ローカル wrapper で「黒曜カード」っぽく見せる:

```scss
.create {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--text-faint);
  input,
  select {
    height: 40px;
    padding: 0 12px;
    border: 1px solid var(--rule-gold);
    border-radius: 3px;
    background: var(--surface-elev);
    color: var(--text-strong);
    font-family: var(--font-body);
    font-size: 14px;
    &:focus { outline: none; border-color: var(--rule-gold-strong); }
  }
}
.preview {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  background: linear-gradient(100deg, #1a2030, #13151c);
  border: 1px solid var(--rule-gold);
  border-radius: 4px;
}
.previewLabel {
  font-size: 10px;
  color: var(--text-faint);
}
.previewName {
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--text-strong);
}
.notice {
  font-size: 12px;
  color: var(--text-soft);
  background: var(--gold-tint);
  border-left: 2px solid var(--gold);
  padding: 8px 10px;
  border-radius: 0 3px 3px 0;
}
```

`RaceInfoCard` / `ClassInfoCard` の **外見が共通基盤フェーズで黒曜化される予定**だが、まだ
写本テーマのまま見えるかもしれない。本指示書では **共通コンポーネントは触らず、画面側で
ラップしてほしい**。具体的には `.create` の中で `<div className={styles.infoCardSlot}>` で
ラップして、`background: var(--surface-elev); border: 1px solid var(--rule-soft); border-radius: 3px;
padding: 10px 12px;` を当てる程度で OK。

#### 2.5 roster タブ（一覧）

```scss
.filters {
  display: flex;
  gap: 8px;
  select.filter {
    flex: 1;
    height: 34px;
    border: 1px solid var(--rule-base);
    border-radius: 3px;
    background: transparent;
    color: var(--text-soft);
    font-size: 11px;
    padding: 0 11px;
  }
}
.members {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.member {
  background: var(--surface-panel);
  border: 1px solid var(--rule-soft);
  border-radius: 3px;
  padding: 10px 12px;
}
.memberMain {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
}
.memberPortrait {
  width: 36px;
  height: 36px;
  border-radius: 3px;
  background: var(--bg-deep);
  overflow: hidden;
  flex: none;
}
.memberMainText {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.memberName {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-strong);
}
.memberSub {
  font-size: 10px;
  color: var(--text-faint);
}
.pos {
  font-size: 8px;
  padding: 0 4px;
  border-radius: 2px;
  border: 1px solid var(--rule-base);
  color: var(--text-faint);
}
.pos_前衛 {
  color: var(--gold);
  border-color: var(--rule-gold);
}
.pos_後衛 {
  color: var(--info-blue);
  border-color: rgba(169, 195, 216, 0.35);
}
```

控え行（前衛 / 後衛にいない団員）の背景は `background: var(--bg-mid); opacity: 0.85;` 等で
薄く落とす（モック準拠）。

#### 2.6 party タブ（編成）

3 列グリッド × 2 段。空きスロットは `border` が金箔色で `glowPulse` パルス。

```scss
.party {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.slotGroup {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.slotGroupLabel {
  font-size: 11px;
  letter-spacing: 0.16em;
  color: var(--gold); // 後衛は var(--info-blue)
  font-weight: 700;
}
.slotRow {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}
.slot {
  height: 104px;
  border-radius: 4px;
  background: var(--surface-panel);
  border: 1px solid var(--rule-soft);
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.slotFilled {
  border-color: var(--rule-gold); // 後衛は info-blue 系
}
.slotEmpty {
  border-color: var(--rule-gold-strong);
  background: var(--gold-tint);
  color: var(--gold);
  animation: obsidian-glowPulse 2.4s ease-in-out infinite;
}
```

前衛 / 後衛で枠色を変える場合は、`index.tsx` 側で `row === 'back'` のとき
`className={styles.slot} ${styles.slotBack}` を追加して SCSS で `.slotBack.slotFilled {
border-color: rgba(169, 195, 216, 0.35); }` のように分岐。

#### 2.7 banish タブ（追放）

`.banish .member` は roster と同じ構造。各行に `<button class={styles.banishBtn}>追放</button>` を
末尾に置く。

```scss
.banishBtn {
  font-size: 11px;
  color: var(--danger-text);
  border: 1px solid rgba(212, 103, 79, 0.4);
  border-radius: 2px;
  padding: 4px 10px;
  background: transparent;
}
```

#### 2.8 フッタ

```scss
.foot {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 6px;
}
.primary {
  height: clamp(48px, 13vw, 56px);
  border-radius: 3px;
  border: none;
  background: linear-gradient(180deg, var(--gold), var(--gold-deep));
  color: var(--bg-mid);
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.12em;
  box-shadow: 0 6px 20px var(--gold-glow);
  &:disabled {
    background: var(--surface-elev);
    color: var(--text-mute);
    box-shadow: none;
  }
}
.sub {
  height: clamp(44px, 12vw, 46px);
  border-radius: 3px;
  border: 1px solid var(--rule-base);
  background: transparent;
  color: var(--text-mute);
  font-size: 13px;
  letter-spacing: 0.16em;
}
```

#### 2.9 ピッカーシート

モック `3c party` の「下からせり上がる」シート。`position: fixed; left: 0; right: 0; bottom: 0;`
は最低限 OK（装飾的バックドロップ + 内部要素の絶対配置回避という観点で **これは認める**）。
中身は flex column。

```scss
.overlay {
  position: fixed;
  inset: 0;
  background: var(--bg-overlay);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 100;
}
.panel {
  width: min(560px, 100%);
  max-height: 70dvh;
  background: var(--surface-panel);
  border-top: 1px solid var(--rule-gold);
  border-radius: 10px 10px 0 0;
  padding: 18px 20px max(20px, env(safe-area-inset-bottom, 0px));
  box-shadow: 0 -16px 50px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  &::before {
    content: '';
    width: 40px;
    height: 4px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.18);
    margin: 0 auto 8px;
  }
}
.panelTitle {
  font-family: var(--font-display);
  font-size: 16px;
  color: var(--text-strong);
}
.pickerList {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.pickerItem {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  background: var(--surface-card);
  border: 1px solid var(--rule-soft);
  border-radius: 3px;
  padding: 10px 12px;
  cursor: pointer;
  text-align: left;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}
.pickerItemActive { border-color: var(--rule-gold); }
.removeRow {
  background: transparent;
  border: 1px dashed var(--rule-base);
  border-radius: 3px;
  color: var(--text-mute);
  padding: 8px 0;
  font-size: 12px;
}
.panelClose {
  height: 44px;
  border-radius: 3px;
  border: 1px solid var(--rule-base);
  background: transparent;
  color: var(--text-mute);
  font-size: 13px;
}
```

#### 2.10 追放確認ダイアログ

`position: fixed; inset: 0` + 中央パネル。`gap` ベースで縦に積む。

```scss
.confirmBox {
  width: min(360px, calc(100% - 56px));
  background: var(--surface-panel);
  border: 1px solid rgba(212, 103, 79, 0.4);
  border-radius: 6px;
  padding: 22px;
  box-shadow: var(--shadow-modal);
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.confirmText {
  font-family: var(--font-display);
  font-size: 16px;
  color: var(--text-strong);
  text-align: center;
}
.confirmWarn {
  font-size: 12px;
  color: var(--danger-text-soft);
  line-height: 1.7;
  background: var(--danger-tint);
  border-left: 2px solid var(--danger-glow);
  padding: 10px 12px;
  border-radius: 0 3px 3px 0;
}
.confirmActions {
  display: flex;
  gap: 10px;
}
.confirmCancel {
  flex: 1;
  height: 48px;
  border-radius: 3px;
  border: 1px solid var(--rule-base);
  background: transparent;
  color: var(--text-soft);
  font-size: 14px;
}
.confirmOk {
  flex: 1;
  height: 48px;
  border-radius: 3px;
  background: var(--danger);
  color: #fbeae6;
  font-weight: 700;
  font-size: 14px;
  border: none;
}
```

`index.tsx` 側で `<div className={styles.confirmWarn}>追放した団員は二度と戻りません。装備は
倉庫に返却されます。</div>` の警告ブロックを confirmText の下に挿入してよい（モック準拠）。
ただしこの文言が「装備が倉庫に返却される」かどうかは `removeCharacterFromGuild` の実装に
依存するため、不確実な場合は **「追放した団員は二度と戻りません。」だけ**にして装備の挙動には
触れない（嘘を書かない）。

### Step 3. ストーリー追加

`Guild.stories.tsx` に `Roster` / `Party` / `PartyPicker` / `BanishConfirm` を追加。`play`
function を使って初期タブを切り替える / ボタンを押す。

```tsx
import { userEvent, within } from '@storybook/test';

export const Roster: Story = {
  decorators: [withGameContext(mockWithParty, { name: 'guild' })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: '一覧' }));
  },
};
```

他のストーリーも同様。`PartyPicker` は「編成 → 前衛 3 枠目（空きスロット）クリック」、
`BanishConfirm` は「追放 → 末尾メンバーの追放ボタンクリック」で再現する。

### Step 4. 検証

完了前に以下を回し、すべて緑であることを確認。

```
yarn lint
yarn test --run
yarn tsc -b
```

その後 Storybook を一時的に立ち上げ、`Pages/Guild/*` の 6 ストーリーを目視確認。
特に iPhone SE 視点（`viewport: { width: 375, height: 667 }`）で要素が重ならない / フッタ
ボタンが画面外に出ないことを確認すること。スクリーンショットは取らない（ディレクター側で
別途撮影する）。

### Step 5. コミット

ブランチは `feature/redesign-A` のまま。コミットメッセージ:

```
feat(guild): apply 黒曜 OBSIDIAN MINIMAL theme to guild page

- rebuild guild layout in flex column (header / tabs / body / footer)
- restyle create / roster / party / banish tabs with obsidian tokens
- convert picker overlay into bottom sheet, banish confirm modal restyle
- add Roster / Party / PartyPicker / BanishConfirm stories

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

push はしない。commit SHA を報告する。

---

## 5. 想定 Q&A

- **Q. ルートの `.layout` を `max-width: 393px` にすべき？560px にすべき？**
  A. 560px。`redesign-A.md §1.5` の指針に従う（題材は iPhone 縦だが PC でも幅 560 を許容する）。
  title フェーズの fix は 393px だったが、フェーズ 2 では 560px に揃える。

- **Q. モックの種族カード（🜂 ガロン等）に寄せたい場合はどうする？**
  A. スコープ外。本指示書では `<select>` + `RaceInfoCard` 構造を保ったまま、その「pair」を
  黒曜ボックスに見えるよう装飾する。3 列カード化は別タスク。

- **Q. `tab` を切り替えるとフッタの「作成する」ボタンが消える / 出るので画面の高さが
  ジャンプする。**
  A. 仕様。`.body` を `flex: 1 1 auto` にしているので、フッタが縮んだ分だけ `.body` の縦寸が
  伸びる。`.body` は overflow-y: auto なのでスクロール領域が増えるだけで、要素が重なる
  ことはない。

- **Q. ピッカーシートの中で `pickerList` が長くなったらどうする？**
  A. `.pickerList` を `flex: 1; min-height: 0; overflow-y: auto;` にしてシート内部だけ
  スクロール。シート全体の `max-height: 70dvh` で画面高を超えないようにする。

- **Q. テストが落ちる**
  A. `index.test.tsx` の文言 / ロール assert を確認。マークアップ要素のタグや role が変わって
  落ちた場合は、**テスト側を最小修正**して通す（テストの意図は変えない）。例: `<header>` →
  `<header className={styles.head}>` への変更は role / name に影響しないはず。
  落ちた assert がボタンラベルの変更を要求している場合は **マークアップを直す**こと（文言は
  既存と同一を保つ方針なので、本来落ちないはず）。

- **Q. 共通コンポーネント `CharacterPortrait` の見た目が黒曜化されていない**
  A. 共通基盤フェーズで対応する想定。画面側では `className={styles.memberPortrait}` でラップ
  して周辺の色味だけ統一する。`CharacterPortrait` 自体の `style.module.scss` には触らない。

不明点が出たら止めて報告すること。

---

## 6. 追加トークン（必要なら）

本画面で必要な CSS 変数はすべて `_obsidian.scss` に既出。**新規追加は不要**。
`obsidian-glowPulse` / `obsidian-warnBlink` も既出のため、新規 `@keyframes` も不要。

万が一新規追加が必要になった場合は **`_obsidian.scss` には触らず**、 本指示書末尾の
「追加トークン」セクションを更新して **ディレクターに報告**してから対応する。
