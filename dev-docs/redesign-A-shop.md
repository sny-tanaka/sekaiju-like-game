# フェーズ 2：shop 画面リデザイン（sonnet 用指示書）

`dev-docs/redesign-A.md`（特に **§1.5 レイアウト運用ルール**）と `dev-docs/redesign-A-title-fix.md`
（flex column 化のパターン）を **必ず先に読む**こと。本ファイルは shop 画面（ショップ / 買う・
売る）の取り込み手順を網羅した実装指示書。

参考にするモック原本: `/tmp/sekaiju-design/案A_v2.dc.html` の line 621〜682
（`5a buy` / `5b sell` / `5c buy dialog + coin fx` の 3 サブ状態）。

参考にする機能仕様: `dev-docs/claude-design-brief.md` **§4.5 shop — ショップ**。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい

| 区分 | パス | 操作 |
| --- | --- | --- |
| 編集 | `src/pages/shop/index.tsx` | マークアップを flex column 構造に再構成（state machine とロジックは温存） |
| 編集 | `src/pages/shop/style.module.scss` | 黒曜テーマで全面書き直し（`@use 'variables'` を削除し `var(--*)` を直接参照） |
| 編集 | `src/pages/shop/Shop.stories.tsx` | 既存 `Default` を温存。**追加で 3 本**（後述 §3）作成可。 |

### 触ってはいけない

- `src/_obsidian.scss`、`src/_variables.scss`。
- 共通コンポーネント本体（`ItemSprite` / `InkSplatter`）。画面側でクラス上書きが要るなら
  ローカル wrapper で対応する。
- 他画面の `index.tsx` / `style.module.scss`。
- ゲームロジック（`shopCatalog` / `buyMany` / `sell` / `sellEquipment` / `sellPriceOf` /
  `equipSellValue` / `shopEquipGrade` / `gradedBaseBonuses` / `equipableClassNames` /
  `itemCount` / `equipDisplayName`）。
- 既存 InkSplatter の使用箇所（`<InkSplatter value="✓" variant="damage" size={72} onDone={...} />`）。
  演出ロジックは変えない。
- 既存テスト（あれば）の assert 文。マークアップ変更でテストが落ちる場合は最小限の機械的
  追従（querySelector の差し替え等）のみで、**テストの意図は変えない**。

---

## 2. やってはいけないこと

- 自分でさらに `Agent` / `Task` を spawn しない（孫委譲禁止）。
- 写本テーマ由来の SCSS 変数 (`$parchment` 等) を新規参照しない。
- カテゴリチップ / ソートセレクタを絶対配置でヘッダー直下に固定しない。flex item として
  積む。
- リスト本体（`.list`）以外を `overflow-y: auto` にしない。リスト以外の要素は固定高。
- モックの **`coinPop` 🪙 アニメーション**を勝手に `_obsidian.scss` に追加しない。装飾として
  必要なら **画面側 SCSS の `@keyframes shop-coinPop`** をローカル定義する（コンポーネント
  外に漏れない CSS Modules 限定 keyframes として使う、または手元の `@keyframes` を `.module.scss`
  内で `:global` 付けずに書く）。
- 数量ステッパー（−1 / +1 / +10 / 最大）の挙動を変えない。
- 装備詳細モーダルの `renderEquipDetail` 関数の構造を変えない。マークアップだけ刷新。

---

## 3. ゴール

Storybook で `Pages/Shop` の以下 4 ストーリーが、添付モック「案 A 黒曜 OBSIDIAN MINIMAL」と
同じビジュアル方向性で描画される。

既存（残す）:

1. `Default` — `mockShop`、`tab = 'buy'` 初期表示。

新規（追加）:

2. `Sell` — `mockShop` で `tab = 'sell'`。play function で「売る」タブをクリック。
3. `BuyConfirm` — `mockShop` で `tab = 'buy'`、リスト先頭の購入ボタンを押して確認ダイアログを
   開いた状態。
4. `EquipDetail` — `mockShop` で `tab = 'buy'`、装備行の名前ボタンを押して装備詳細モーダルを
   開いた状態。

`yarn test --run`・`yarn lint`・`yarn tsc -b` が緑であること。

### 機能優先で省略した要素

- モック `5a buy` の **「重厚な大剣 ・ ATK +62」のような note 直書き**: 本実装の `e.note` は
  `shopCatalog` から渡ってくるが、ATK 値ではなく一般的な装備説明文。**そのまま `e.note` を
  描く**（モック文言にハードコード合わせしない）。
- モック `5c buy dialog` の **🪙 coin pop アニメ**: 装飾 FX。**画面側 SCSS のローカル
  `@keyframes` でやさしめに実装**（モック準拠の `coinPop`）。**共通トークンには追加しない**。
- モック `5b sell` の **「装備中（ジョンスミス）・ 売却不可」🔒 行**: 実装は装備中個体を
  `sellRows` から外しているので、そもそもリストに出ない。装備中が混入してロックされる
  ケースは本実装の `sellRows` ロジックでは発生しない（`save.guild.equipment` には未装備の
  個体のみ含まれる前提のはず。**実装挙動を確認し、装備中個体が含まれるなら別途指示**）。
  → 不明な場合は **省略**（ロジック変更が必要なら本書のスコープ外）。
- モック `5a buy` 行頭の **`buy_dialog` 以外での `linear-gradient(100deg,#1a2030,#13151c)` 強調**:
  「先頭行のみ強調」のような演出はモックではアクセントだが、本実装の `view()` の並び順に
  依存して先頭が常に強い装備とは限らないので **演出は省略**。全行 `var(--surface-panel)`
  ベース。
- モック `5c buy dialog` の **「合計 4,200 G ・ 購入後の所持金 4,220 G」**: 本実装の `pending`
  には `price` と `pendingQty` があるので、確認ダイアログ内で `pending.price * pendingQty` の
  合計と、`gold - pending.price * pendingQty` の購入後所持金を **追加表示してよい**（モック
  準拠の機能拡張、機能仕様 §4.5 にも「数量ステッパー → 合計」が記載されているので追加 OK）。

### 機能優先で追加した要素

- **`empty` ステート**: モックでは描かれていないが、`buyView.length === 0` のときに
  「該当する商品がありません。」、`sellView.length === 0` で「売れる物がありません。」を
  既存どおり表示。
- **「拠点へ戻る」フッタ**: モック全タブで描かれている。残す。
- **数量ステッパー全体**: モックでは `−1 / ×1 / +1 / 最大` だが、本実装は `+10` も含む 4 ボタン。
  既存どおり 4 ボタン構成を維持。
- **`category`（武器 / 防具 / 装飾品 / アイテム / 素材）**: モックは 4 種だが本実装は 5 種。
  既存どおり全 5 種を出す。

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
      <h1 className={styles.title}>ショップ</h1>
      <span className={styles.gold}>{gold} G</span>
    </header>

    <nav className={styles.tabs} role="tablist">
      <button ...>買う</button>
      <button ...>売る</button>
    </nav>

    <div className={styles.controls}>
      <div className={styles.filters}>{/* チップ群 */}</div>
      <label className={styles.sortRow}>
        <select className={styles.sort} ...>...</select>
      </label>
    </div>

    <div className={styles.list}>
      {/* buy 行 or sell 行 */}
    </div>

    <footer className={styles.foot}>
      <button className={styles.back} ...>拠点へ戻る</button>
    </footer>

    {pending ? <ConfirmDialog /> : null}
    {equipDetail ? renderEquipDetail() : null}
    {buyConfirmed ? <InkSplatterWrap /> : null}
  </div>
);
```

`.list` を **唯一の可変領域**にする（`flex: 1 1 auto; min-height: 0; overflow-y: auto;`）。
それ以外は `flex-shrink: 0;`。

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
  justify-content: space-between;
  align-items: baseline;
  flex-shrink: 0;
}
.title {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--text-strong);
  margin: 0;
}
.gold {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--gold);
}
```

#### 2.2 タブ

guild と同じパターン:

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
```

#### 2.3 コントロール（カテゴリチップ + ソート）

```scss
.controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}
.filters {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.chip {
  font-size: 11px;
  padding: 5px 11px;
  border-radius: 14px;
  background: transparent;
  border: 1px solid var(--rule-base);
  color: var(--text-mute);
  cursor: pointer;
}
.chipActive {
  background: var(--gold);
  color: var(--bg-mid);
  font-weight: 700;
  border-color: var(--gold);
}
.sortRow {
  display: flex;
  justify-content: flex-end;
}
.sort {
  font-size: 11px;
  color: var(--text-mute);
  background: transparent;
  border: 1px solid var(--rule-base);
  border-radius: 3px;
  height: 28px;
  padding: 0 8px;
}
```

#### 2.4 リスト本体（可変領域）

```scss
.list {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 4px 0;
}
.row {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--surface-panel);
  border: 1px solid var(--rule-soft);
  border-radius: 4px;
  padding: 11px 13px;
  // ItemSprite の周辺バッファ
  > :first-child {
    width: 44px;
    height: 44px;
    border-radius: 3px;
    background: var(--bg-deep);
    flex: none;
  }
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
.nameBtn {
  font-size: 13px;
  color: var(--text-strong);
  background: transparent;
  border: none;
  text-align: left;
  padding: 0;
  text-decoration: underline dotted rgba(201, 168, 106, 0.4);
  cursor: pointer;
}
.note {
  font-size: 10px;
  color: var(--text-faint);
}
.action {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--gold);
  background: transparent;
  border: 1px solid var(--rule-gold);
  border-radius: 3px;
  padding: 7px 11px;
  cursor: pointer;
  &:disabled { opacity: 0.4; cursor: not-allowed; }
}
.empty {
  text-align: center;
  font-size: 12px;
  color: var(--text-mute);
  padding: 24px 0;
}
```

買う側で「資金的に買える」優先行（先頭）を強調したい場合は、`index.tsx` で先頭行に
`styles.rowAccent` を付与し、SCSS で `background: linear-gradient(100deg, #1a2030, #13151c);
border-color: var(--rule-gold);` を当てる。**ただしこれは§3 で「省略」とした要素**なので
本指示書では既定 OFF。

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
}
.confirmText {
  font-family: var(--font-display);
  font-size: 15px;
  color: var(--text-strong);
  text-align: center;
  line-height: 1.7;
  strong { color: var(--gold); }
}
.stepperRow {
  display: flex;
  gap: 8px;
  align-items: center;
}
.stepperBtn,
.stepperMax {
  height: 38px;
  border-radius: 3px;
  border: 1px solid var(--rule-base);
  background: transparent;
  color: var(--text-soft);
  font-size: 14px;
  cursor: pointer;
  &:disabled { opacity: 0.4; cursor: not-allowed; }
}
.stepperBtn { width: 38px; }
.stepperMax { padding: 0 12px; font-size: 11px; }
.stepperVal {
  flex: 1;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 16px;
  color: var(--text-strong);
}
.totalRow {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 13px;
  color: var(--text-mute);
  padding-bottom: 12px;
  border-bottom: 1px solid var(--rule-soft);
  strong {
    font-family: var(--font-mono);
    color: var(--text-strong);
  }
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
```

ヘッダー部に商品アイコン + 名前を追加で出したい場合は `index.tsx` の確認ダイアログ内で
`<div className={styles.confirmHead}><ItemSprite ... /><div>{name}</div></div>` を入れる
（モック `5c` 準拠）。任意。

#### 2.7 装備詳細モーダル

`.confirmBox` を流用しつつ、専用の `.detailHeader` / `.detailRow` / `.detailLabel` を追加:

```scss
.detailHeader {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}
.detailName {
  font-family: var(--font-display);
  font-size: 16px;
  color: var(--text-strong);
}
.detailSlot {
  font-size: 10px;
  color: var(--gold);
  border: 1px solid var(--rule-gold);
  border-radius: 2px;
  padding: 1px 7px;
}
.detailRow {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 13px;
  color: var(--text-base);
  padding: 6px 0;
  border-bottom: 1px solid var(--rule-soft);
  &:last-of-type { border-bottom: none; }
}
.detailLabel {
  font-size: 11px;
  color: var(--text-faint);
}
```

#### 2.8 購入確定 InkSplatter ラップ

既存の `<InkSplatter value="✓" variant="damage" size={72} ... />` を画面中央にオーバーレイで
表示する `.buyConfirmedFx` を定義:

```scss
.buyConfirmedFx {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 200;
}
```

#### 2.9 (任意) coin pop ローカルアニメ

確認ダイアログのヘッダー付近に 🪙 を出したい場合のみ:

```scss
@keyframes shop-coinPop {
  0%   { transform: translateY(0) scale(1); opacity: 0.9; }
  50%  { transform: translateY(-14px) scale(1.15); opacity: 1; }
  100% { transform: translateY(-28px) scale(0.95); opacity: 0; }
}
.coin {
  position: absolute;
  left: 50%;
  top: 4px;
  font-size: 18px;
  animation: shop-coinPop 1.6s ease-in-out infinite;
}
```

これは CSS Modules スコープに留まるため、`_obsidian.scss` の共通トークンに影響しない。

### Step 3. ストーリー追加

```tsx
import { userEvent, within } from '@storybook/test';

export const Sell: Story = {
  decorators: [withGameContext(mockShop, { name: 'shop' })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: '売る' }));
  },
};

export const BuyConfirm: Story = {
  decorators: [withGameContext(mockShop, { name: 'shop' })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 先頭の「N G」価格ボタンを押す
    const priceBtn = (await canvas.findAllByRole('button'))
      .find((b) => /^\d/.test(b.textContent ?? ''));
    if (priceBtn) await userEvent.click(priceBtn);
  },
};

export const EquipDetail: Story = {
  decorators: [withGameContext(mockShop, { name: 'shop' })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 装備行の名前ボタンをクリック
    const nameBtn = (await canvas.findAllByRole('button'))
      .find((b) => b.className.includes('nameBtn'));
    if (nameBtn) await userEvent.click(nameBtn);
  },
};
```

セレクタが当たらない場合は `data-testid` を追加してよい（マークアップ側に微調整入れる）。
ただし **既存 `Default` story の動作を壊さない**こと。

### Step 4. 検証

```
yarn lint
yarn test --run
yarn tsc -b
```

すべて緑であること。Storybook で 4 ストーリーすべてを目視確認。iPhone SE 視点で要素重なり
無し、フッタ「拠点へ戻る」が画面下端で押せる位置に来ているか確認。

### Step 5. コミット

ブランチは `feature/redesign-A`。コミットメッセージ:

```
feat(shop): apply 黒曜 OBSIDIAN MINIMAL theme to shop page

- rebuild shop layout in flex column (header / tabs / controls / list / footer)
- restyle list rows / buy & sell tabs / category chips / sort selector
- redesign purchase confirm dialog with stepper and total row
- restyle equip detail modal with obsidian tokens
- add Sell / BuyConfirm / EquipDetail stories

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

push しない。commit SHA を報告。

---

## 5. 想定 Q&A

- **Q. リストが長くなったとき、ヘッダー / タブが固定されない**
  A. それで OK。`.layout` 全体は overflow: hidden で、`.list` 内側だけスクロール。だから
  ヘッダー / タブ / コントロール / フッタは固定で見え続け、リスト内だけ縦に流れる。

- **Q. 装備詳細モーダルが確認ダイアログと重なる**
  A. 通常は同時に開かない（買う/売る確定ダイアログを閉じてからモーダルを開く流れ）。z-index は
  どちらも 100 でよい。同時に開く可能性があるなら詳細モーダル側を 110 に上げる。

- **Q. `mockShop` で BuyConfirm の play function が当たらない**
  A. price ボタンの判定を改善する。`canvas.findAllByRole('button')` から `textContent.match(/G$/)`
  で「N G」っぽいものを拾う、もしくは `index.tsx` 側で `data-testid="buy-action"` を付ける。
  後者の方が確実。

- **Q. ItemSprite が `<button>` の子要素として外周だけスタイルしたい**
  A. `.row > :first-child` の指定で大丈夫。`ItemSprite` の中身（svg / img）は触らない。

- **Q. `coinPop` を出したいが共通トークンに追加すべき？**
  A. 共通トークンには追加しない。SCSS Modules 内で `@keyframes shop-coinPop` をローカル定義
  すれば良い。`_obsidian.scss` には触らない。

不明点が出たら止めて報告。

---

## 6. 追加トークン（必要なら）

新規 CSS 変数の追加は不要。`coinPop` アニメは画面固有なので画面 SCSS にローカル keyframes
として置く。万一共通化したいケースが出たらディレクターに報告してから対応。
