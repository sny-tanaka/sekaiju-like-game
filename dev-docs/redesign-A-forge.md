# フェーズ 2：forge 画面リデザイン（sonnet 用指示書）

`dev-docs/redesign-A.md`（特に **§1.5 レイアウト運用ルール**）と `dev-docs/redesign-A-title-fix.md`
（flex column 化のパターン）を **必ず先に読む**こと。本ファイルは forge 画面（鍛冶屋 / 強化・
リサイクル）の取り込み手順を網羅した実装指示書。

参考にするモック原本: `/tmp/sekaiju-design/案A_v2.dc.html` の line 683〜744
（`6a enhance` / `6b recycle` / `6c enhance confirm + spark fx` の 3 サブ状態）。

参考にする機能仕様: `dev-docs/claude-design-brief.md` **§4.6 forge — 鍛冶屋**。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい

| 区分 | パス | 操作 |
| --- | --- | --- |
| 編集 | `src/pages/forge/index.tsx` | マークアップを flex column 構造に再構成（state machine とロジックは温存） |
| 編集 | `src/pages/forge/style.module.scss` | 黒曜テーマで全面書き直し（`@use 'variables'` を削除し `var(--*)` を直接参照） |
| 編集 | `src/pages/forge/Forge.stories.tsx` | 既存 `Default` を温存。**追加で 3 本**（後述 §3）作成可。 |

### 触ってはいけない

- `src/_obsidian.scss`、`src/_variables.scss`。
- 共通コンポーネント本体（`ItemSprite` / `InkSplatter`）。
- 他画面の `index.tsx` / `style.module.scss`。
- ゲームロジック（`forgeWithIngot` / `recycle` / `recycleMany` / `recycleFragments` /
  `equipDisplayName` / `FORGE.MAX_LEVEL` / `FORGE.INGOT_INC`）。
- 既存 InkSplatter の使用箇所（`<InkSplatter value={forgeSuccessLabel} variant="gold" size={80} ... />`）。
  演出ロジックは変えない。
- `Pending` 型とその分岐（`forge` / `recycle` / `recycleBulk`）。
- 既存テスト（あれば）の assert 文。マークアップ変更でテストが落ちる場合は最小限の機械的
  追従（querySelector の差し替え等）のみで、**テストの意図は変えない**。

---

## 2. やってはいけないこと

- 自分でさらに `Agent` / `Task` を spawn しない（孫委譲禁止）。
- 写本テーマ由来の SCSS 変数 (`$parchment` 等) を新規参照しない。
- インゴット在庫表示（銅 N・銀 N・金 N・断片 N）を絶対配置で固定しない。ヘッダー直下に flex
  item として積む。
- 強化ボタン 3 種（銅 / 銀 / 金）を絶対配置せず、`display: flex; gap: 8px;` で並べる。
- 一括分解バー（モック相当の固定 bottom bar）を、画面の `position: fixed; bottom: 0;` で
  画面全体に被せない。**`.layout` の flex item として `margin-top: auto` の手前に積む**
  （これがあると「拠点へ戻る」フッタの **上に**現れる）。
- リスト本体 (`.list`) 以外を `overflow-y: auto` にしない。
- `forgeSpark` アニメを `_obsidian.scss` に追加しない。装飾で必要なら **画面 SCSS のローカル
  `@keyframes forge-spark`** として置く。

---

## 3. ゴール

Storybook で `Pages/Forge` の以下 4 ストーリーが、添付モック「案 A 黒曜 OBSIDIAN MINIMAL」と
同じビジュアル方向性で描画される。

既存（残す）:

1. `Default` — `mockForge`、`tab = 'forge'` 初期表示。

新規（追加）:

2. `Recycle` — `mockForge` で `tab = 'recycle'`、未選択。play function で「リサイクル」タブを
   クリック。
3. `BulkSelected` — `mockForge` で `tab = 'recycle'`、2 件以上のチェックボックスを ON にして
   一括分解バーが表示された状態。
4. `ForgeConfirm` — `mockForge` で `tab = 'forge'`、銅+1 ボタンをクリックして確認ダイアログを
   開いた状態。

`yarn test --run`・`yarn lint`・`yarn tsc -b` が緑であること。

### 機能優先で省略した要素

- モック `6a enhance` の **「ATK +62 → +68」予測表記**: 本実装は `pending` を作る前段では
  予測値を表示していない。確認ダイアログのみで表示すればよい。**行内予測は省略**。
- モック `6c enhance confirm` の **✦ forgeSpark アニメ**: 装飾 FX。画面 SCSS にローカル
  `@keyframes` を置き、確認ダイアログ内のアイテムスプライト周辺で 3 つ程度の ✦ を点滅させる
  程度に留める。共通トークン化しない。
- モック `6b recycle` の **「断片 → インゴット変換」横長ボタン**: 機能としては
  自動変換（`FRAGMENTS_PER_INGOT = 10` で断片 10 → 銅 1）。明示的な変換ボタンを設けるかは
  実装次第。**現状実装に該当 UI がないので省略**。ヒント文（`.hint`）に「断片 10 個で銅
  インゴット 1 個になる」と既に書かれているので、それでカバー。
- モック `6a` の **「銀+3 (2)」「金+5 (0)」のように在庫が `(N)` で並ぶ表示**: 本実装は
  `銅+{INGOT_INC.copper}（{copper}）` で同義の表現を既に持つ。文言・色は黒曜化するが、構造は
  既存どおり 3 ボタン横並び。
- モック `6c` の **「この強化で残り 銀 1」表記**: 本実装の `pending` には残量が無いが、
  `save.forgeInventory.ingots[ingot]` から取れるので、確認ダイアログに **追加表示してよい**
  （実害なしの機能拡張）。任意。

### 機能優先で追加した要素

- **`pool.length === 0` のエンプティ表示**: モックには無いが、`所有している装備がありません。`
  を中央に出す。既存どおり。
- **「拠点へ戻る」フッタ**: モック全タブで描かれている。残す。
- **一括分解バー**（モックには無い）: 本実装の機能。リサイクルタブで複数選択時に表示する
  既存機能を維持。フッタの上に flex item として積む。
- **`recycleBulk` の確認ダイアログ**: 既存どおり「選択した N 件 ... 断片 +M」を表示。

---

## 4. 実装ステップ

### Step 0. 事前読み込み

`dev-docs/redesign-A.md` の §1.1〜§1.6、`dev-docs/redesign-A-title-fix.md`、`src/_obsidian.scss` を確認。

### Step 1. `index.tsx` のマークアップ刷新

ロジックは温存。flex column 構造で組む。

```tsx
return (
  <div className={styles.layout}>
    <header className={styles.head}>
      <h1 className={styles.title}>鍛冶屋</h1>
      <div className={styles.stockRow}>
        <span className={styles.stockCopper}>銅 {copper}</span>
        <span className={styles.stockSilver}>銀 {silver}</span>
        <span className={styles.stockGold}>金 {gold}</span>
        <span className={styles.stockFrag}>断片 {fragments}</span>
      </div>
    </header>

    <nav className={styles.tabs} role="tablist">
      <button ...>強化</button>
      <button ...>リサイクル</button>
    </nav>

    <p className={styles.hint}>{tab === 'forge' ? '...' : '...'}</p>

    <div className={styles.list}>
      {pool.length === 0 ? <p className={styles.empty}>...</p> : pool.map(e => (
        <div key={e.id} className={`${styles.row} ${...selected ...}`}>...</div>
      ))}
    </div>

    {tab === 'recycle' && selected.size > 0 ? (
      <div className={styles.bulkBar}>...</div>
    ) : null}

    <footer className={styles.foot}>
      <button className={styles.back} ...>拠点へ戻る</button>
    </footer>

    {pending ? <ConfirmDialog /> : null}
    {forgeSuccessLabel ? <InkSplatterWrap /> : null}
  </div>
);
```

ポイント:

- `.list` を `flex: 1 1 auto; min-height: 0; overflow-y: auto;` で唯一の可変領域に。
- `.bulkBar` は `.list` の下、`.foot` の上に **flex item として積む**。fixed bottom にしない。
- `.head` / `.tabs` / `.hint` / `.foot` は `flex-shrink: 0;`。

### Step 2. SCSS のレイアウト指針

#### 2.1 ルート + ヘッダー

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
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}
.title {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--text-strong);
  margin: 0;
}
.stockRow {
  display: flex;
  gap: 14px;
  font-family: var(--font-mono);
  font-size: 11px;
}
.stockCopper { color: #c98a5b; }
.stockSilver { color: var(--text-base); }
.stockGold   { color: #e8d85b; }
.stockFrag   { color: var(--text-faint); }
```

#### 2.2 タブ + ヒント

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
}
.tabActive {
  color: var(--bg-mid);
  font-weight: 700;
  background: var(--gold);
}
.hint {
  flex-shrink: 0;
  font-size: 11px;
  color: var(--text-mute);
  background: var(--surface-elev);
  border-left: 2px solid var(--gold);
  padding: 8px 10px;
  border-radius: 0 3px 3px 0;
  line-height: 1.6;
  margin: 0;
}
```

#### 2.3 リスト本体

```scss
.list {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 11px;
  padding: 4px 0;
}
.empty {
  text-align: center;
  font-size: 12px;
  color: var(--text-mute);
  padding: 24px 0;
}
.row {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--surface-panel);
  border: 1px solid var(--rule-soft);
  border-radius: 4px;
  padding: 12px 13px;
}
.rowSelected {
  border-color: var(--rule-gold);
  background: var(--gold-tint);
}
.rowHead {
  display: flex;
  align-items: center;
  gap: 12px;
}
.check {
  // ネイティブチェックボックスをそのまま使う場合、外周だけ装飾
  accent-color: var(--gold);
  width: 18px;
  height: 18px;
}
.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.name {
  font-size: 13px;
  color: var(--text-strong);
}
.note {
  font-size: 10px;
  color: var(--text-faint);
}
.actions {
  display: flex;
  gap: 8px;
}
.ingot {
  flex: 1;
  height: 36px;
  border-radius: 3px;
  border: 1px solid rgba(201, 134, 91, 0.5);
  background: rgba(201, 134, 91, 0.18);
  color: #e0a87c;
  font-family: var(--font-mono);
  font-size: 11px;
  &:nth-child(2) {
    border-color: rgba(200, 196, 186, 0.4);
    background: transparent;
    color: var(--text-base);
  }
  &:nth-child(3) {
    border-color: rgba(255, 255, 255, 0.08);
    background: transparent;
    color: var(--text-mute);
  }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
}
.maxed {
  font-size: 11px;
  color: var(--gold);
  border: 1px solid var(--rule-gold);
  border-radius: 2px;
  padding: 5px 10px;
}
.recycle {
  align-self: flex-end;
  font-size: 11px;
  color: #e0a87c;
  background: transparent;
  border: 1px solid rgba(201, 134, 91, 0.5);
  border-radius: 2px;
  padding: 5px 11px;
}
```

`.ingot` の 3 種別色味は、モック「銅 (5) / 銀 (2) / 金 (0)」の色分けに合わせる。

#### 2.4 一括分解バー

```scss
.bulkBar {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: var(--surface-panel);
  border: 1px solid var(--rule-gold);
  border-radius: 4px;
  box-shadow: var(--shadow-modal);
}
.bulkInfo {
  flex: 1;
  font-size: 12px;
  color: var(--text-base);
}
.bulkClear {
  font-size: 11px;
  color: var(--text-mute);
  background: transparent;
  border: 1px solid var(--rule-base);
  border-radius: 2px;
  padding: 5px 11px;
}
.bulkRecycle {
  font-size: 11px;
  color: var(--bg-mid);
  background: linear-gradient(180deg, var(--gold), var(--gold-deep));
  border: none;
  border-radius: 2px;
  padding: 6px 14px;
  font-weight: 700;
}
```

#### 2.5 フッタ

```scss
.foot {
  flex-shrink: 0;
}
.back {
  width: 100%;
  height: clamp(44px, 12vw, 46px);
  border-radius: 3px;
  border: 1px solid var(--rule-base);
  background: transparent;
  color: var(--text-mute);
  font-size: 13px;
  letter-spacing: 0.16em;
}
```

#### 2.6 確認ダイアログ

```scss
.confirmOverlay {
  position: fixed;
  inset: 0;
  background: var(--bg-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 24px;
}
.confirmBox {
  width: min(360px, calc(100% - 56px));
  background: var(--surface-panel);
  border: 1px solid var(--rule-gold);
  border-radius: 6px;
  padding: 22px;
  box-shadow: var(--shadow-modal);
  display: flex;
  flex-direction: column;
  gap: 14px;
  text-align: center;
}
.confirmText {
  font-family: var(--font-display);
  font-size: 15px;
  color: var(--text-strong);
  line-height: 1.7;
  strong { color: var(--gold); }
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
  background: linear-gradient(180deg, var(--gold), var(--gold-deep));
  color: var(--bg-mid);
  font-weight: 700;
  font-size: 14px;
  border: none;
}
.confirmOkDanger {
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

確認ダイアログ内に強化前後の値とアイコンを出したい場合（モック `6c` 準拠）:

```scss
.confirmIcon {
  position: relative;
  width: 72px;
  height: 72px;
  margin: 0 auto;
  background: var(--bg-deep);
  border: 1px solid var(--rule-gold);
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.confirmLevelDelta {
  font-family: var(--font-mono);
  font-size: 20px;
  color: var(--gold);
  .next { color: var(--gold-bright); text-shadow: 0 0 12px var(--gold-glow); }
}
```

`index.tsx` 側で `pending.kind === 'forge'` のときに `<div class={styles.confirmIcon}>
<ItemSprite ... /></div>` と `<div class={styles.confirmLevelDelta}>+{lv} → <span class={styles.next}>+{lv+inc}</span></div>` を追加する（任意）。

#### 2.7 強化成功 InkSplatter ラップ

```scss
.forgeGold {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 200;
}
```

#### 2.8 (任意) forgeSpark ローカルアニメ

```scss
@keyframes forge-spark {
  0%, 100% { opacity: 0.3; transform: scale(0.85); }
  50%      { opacity: 1; transform: scale(1.15); }
}
.spark {
  position: absolute;
  font-size: 16px;
  color: var(--gold);
  animation: forge-spark 1.3s ease-in-out infinite;
}
.spark1 { top: -6px; left: -6px; }
.spark2 { top: 8px; right: -8px; animation-delay: 0.3s; }
.spark3 { bottom: -4px; left: 14px; animation-delay: 0.6s; }
```

確認ダイアログの `.confirmIcon` の中に `<span class={`${styles.spark} ${styles.spark1}`}>✦</span>` 等を
3 つ置く（任意装飾）。

### Step 3. ストーリー追加

```tsx
import { userEvent, within } from '@storybook/test';

export const Recycle: Story = {
  decorators: [withGameContext(mockForge, { name: 'forge' })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'リサイクル' }));
  },
};

export const BulkSelected: Story = {
  decorators: [withGameContext(mockForge, { name: 'forge' })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'リサイクル' }));
    const checks = await canvas.findAllByRole('checkbox');
    if (checks[0]) await userEvent.click(checks[0]);
    if (checks[1]) await userEvent.click(checks[1]);
  },
};

export const ForgeConfirm: Story = {
  decorators: [withGameContext(mockForge, { name: 'forge' })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const copperBtn = (await canvas.findAllByRole('button'))
      .find((b) => /^銅\+/.test(b.textContent ?? ''));
    if (copperBtn) await userEvent.click(copperBtn);
  },
};
```

セレクタが当たらないなら `data-testid` を index.tsx に追加してよい。

### Step 4. 検証

```
yarn lint
yarn test --run
yarn tsc -b
```

すべて緑であること。Storybook で 4 ストーリーすべてを目視確認。`BulkSelected` で一括分解
バーがフッタの上に正しく現れる / リスト本体だけスクロールする、を特に確認。

### Step 5. コミット

ブランチは `feature/redesign-A`。コミットメッセージ:

```
feat(forge): apply 黒曜 OBSIDIAN MINIMAL theme to forge page

- rebuild forge layout in flex column (header / tabs / hint / list / bulkBar / footer)
- restyle ingot buttons (copper/silver/gold) and recycle row
- redesign confirm dialog with item icon and level delta
- add Recycle / BulkSelected / ForgeConfirm stories

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

push しない。commit SHA を報告。

---

## 5. 想定 Q&A

- **Q. `bulkBar` がリストの下に積まれると、リストが短いときに位置が浮いて見える**
  A. それで OK。リストは `flex: 1 1 auto` で空きを吸収するので、リストが短ければ余白が
  下に空く。`bulkBar` はその直下、`.foot` の真上に出る。fixed bottom にしない。

- **Q. 「断片 → インゴット自動変換」の挙動を画面でも表現したい**
  A. `hint` 内の文言「断片 10 個で銅インゴット 1 個になる」で十分。`forgeInventory` の更新は
  ロジック側で自動的に起こる。明示的な変換ボタンは現状実装にないので追加しない。

- **Q. `forgeSuccessLabel` が画面中央でフッタの上に重なる**
  A. `.forgeGold` を `position: fixed; inset: 0;` で画面全体に重ねる + `pointer-events: none`
  なので操作不可。`InkSplatter` の `onDone` で `setForgeSuccessLabel(null)` するので自動消滅。

- **Q. 強化ボタン 3 種の色味を変えたくない**
  A. 既存のシンプルな配色（全部 gold）でも OK。本指示書は「モック準拠で銅 / 銀 / 金の色分け」を
  推奨しているだけ。実装簡略化を優先するなら 3 つとも `var(--gold)` 系で揃えてよい。

- **Q. `data-testid` を追加してもよい？**
  A. 既存テストの assert が変わらない範囲で OK。`<button data-testid="ingot-copper-{e.id}">銅+1（5）</button>`
  のような付加なら問題ない（既存テストは `role="button" name=銅+1...` で当たっているなら
  そのまま動く）。

不明点が出たら止めて報告。

---

## 6. 追加トークン（必要なら）

新規 CSS 変数の追加は不要。`forgeSpark` アニメは画面 SCSS にローカル keyframes として置く。
万一共通化したいケースが出たらディレクターに報告してから対応。
