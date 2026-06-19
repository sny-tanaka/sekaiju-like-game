# フェーズ 2：shop 画面リデザイン（sonnet 用指示書）— **改訂版 v2 — モック忠実化**

`dev-docs/redesign-A.md`（特に **§1.5 レイアウト運用ルール**）と
`dev-docs/redesign-A-title-fix.md`（flex column 化のパターン）を **必ず先に読む**こと。

参考にするモック原本: `/tmp/sekaiju-design/案A_v2.dc.html` の line 621〜682
（`5a buy` / `5b sell` / `5c buy dialog + coin fx` の 3 サブ状態）。

参考にする機能仕様: `dev-docs/claude-design-brief.md` **§4.5 shop — ショップ**。

> **改訂方針（v2）**: 前回 v1 はモックから大きく外れていました（"色味以外ほとんど合っていない"）。
> 今回はモック忠実度を最優先で取り直します。モックに描かれているコイン演出やリスト行のレイアウト、
> 購入ダイアログの寸法を全部合わせます。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい

| 区分 | パス | 操作 |
| --- | --- | --- |
| 編集 | `src/pages/shop/index.tsx` | マークアップを flex column 構造に再構成。**前回 v1 の構造は捨てて書き直す**。state machine とロジックは温存 |
| 編集 | `src/pages/shop/style.module.scss` | 黒曜テーマで全面書き直し |
| 編集 | `src/pages/shop/Shop.stories.tsx` | 既存 4 本（`Default` / `Sell` / `BuyConfirm` / `EquipDetail`）を温存 |

### 触ってはいけない

- `src/_obsidian.scss`、`src/_variables.scss`。
- 共通コンポーネント本体（`ItemSprite` / `InkSplatter`）。画面側でクラス上書きが要るならローカル
  wrapper で対応する。
- 他画面の `index.tsx` / `style.module.scss`。
- ゲームロジック（`shopCatalog` / `buyMany` / `sell` / `sellEquipment` / `sellPriceOf` /
  `equipSellValue` / `shopEquipGrade` / `gradedBaseBonuses` / `equipableClassNames` /
  `itemCount` / `equipDisplayName`）。
- 既存 InkSplatter の使用箇所（`<InkSplatter value="✓" variant="damage" size={72} onDone={...} />`）。
  演出ロジックは変えない。
- 既存テストの assert 文。

---

## 2. やってはいけないこと

- 自分でさらに `Agent` / `Task` を spawn しない。
- 写本テーマ由来の SCSS 変数 (`$parchment` 等) を新規参照しない。
- リスト本体（`.list`）以外を `overflow-y: auto` にしない。
- 数量ステッパー（−1 / +1 / +10 / 最大）の挙動を変えない。
- 装備詳細モーダルの `renderEquipDetail` 関数の挙動・引数を変えない（マークアップだけ刷新）。
- ハードコードの商品名 / 価格を書かない（`shopCatalog` から取る）。

---

## 3. モックとの差分一覧（最重要）

前回 v1 の実装はモックから大きくズレている。以下を **すべて** モック準拠に直す。

### 3.1 ヘッダー
- **OK**: タイトル「ショップ」+ 所持金 G。これは現状 OK。
- **NG（細部）**: 所持金は `font-family: var(--font-mono); font-size: 13px; color: var(--gold);`。
  数値と単位 G の間にスペースなし: `8,420 G`。3 桁区切りカンマを入れる（`gold.toLocaleString()`）。

### 3.2 タブバー
- **NG**: 現状は guild と同じくチップ風 active。
- **モック**: **flat underline タブ**（guild と同じパターン）。`flex: 1` 均等割り、
  全体 `border-bottom: 1px solid rgba(255,255,255,.08)`、active のみ gold 背景 +
  `border-radius: 3px 3px 0 0`。詳細は guild §3.2 と同等。

### 3.3 カテゴリ絞り込みチップ
- **OK**: 既に実装あり。スタイルも近い。
- **NG（細部）**: モックの寸法に揃える:
  ```css
  .chip { font-size: 11px; padding: 5px 11px; border-radius: 14px; }
  .chipInactive { background: transparent; border: 1px solid rgba(255,255,255,.12); color: var(--text-mute); }
  .chipActive { background: var(--gold); color: var(--bg-mid); font-weight: 700; border: 1px solid var(--gold); }
  ```
- カテゴリチップ列の **直下**に「⇅ 並び替え表記」を右寄せで表示（モック準拠）:
  - `font-size: 11px; color: var(--text-faint);` 「⇅ 金額が高い順」。
  - クリックでソート切替 → bottom sheet で 3 択（高い順 / 安い順 / 所持多い順）を表示する
    実装でもよいし、現状の `<select>` を `appearance: none` で見た目だけ揃えても可。

### 3.4 買うタブの行（最大の差分）
- **NG**: 現状は `[ItemSprite] [name + note] [N G ボタン]` の単純 flex。
- **モック**: 各行のスタイル:
  ```
  [44x44 ItemSprite カード（bg #0c0d11, radius 3）] | [名前 13px + 補助 10px text-faint] | [価格ボタン]
  ```
  - 行 background: `var(--surface-panel)`、border 1px `var(--rule-soft)`、radius 4px、
    padding `11px 13px`、gap 12px。
  - **モックの先頭行（高価商品）だけ強調**: `background: linear-gradient(100deg, #1a2030, #13151c);
    border: 1px solid rgba(201,168,106,.35);`。**実装簡略化**: ソート結果の先頭 1 行だけ
    強調するのは難しいので、**「在庫が無い / 所持 0 で買ったことがない装備」を強調**でも、
    **全行同じスタイル**でも可。判断は実装者に委ねる。
  - **価格ボタン**:
    - 高価商品（強調行）: `background: var(--gold); color: var(--bg-mid); font-weight: 700;
      border-radius: 3px; padding: 7px 11px; font-family: var(--font-mono); font-size: 12px;`
    - 通常: `color: var(--gold); border: 1px solid var(--rule-gold); border-radius: 3px;
      padding: 7px 11px; font-family: var(--font-mono); font-size: 12px;`
  - **補助文の構造**: モックでは「`{note} ・ ATK +{n}`」のように装備の性能補助が付くが、
    現状 `e.note` には装備の概要が入っているだけ。**`e.note` のまま描いて OK**
    （ATK 表記の追加は機能拡張に該当するため省略可）。
  - 所持数表示: `所持 {n}` を補助文の末尾に。

### 3.5 売るタブの行
- **NG**: 現状は装備個体・アイテム両方とも `[ItemSprite] [name + note] [売却 N G ボタン]`。
- **モック**: 装備個体の行:
  ```
  [42x42 ItemSprite カード] | [装備名 + 強化値「+0」（text-mute）] [補助「未装備 ・ 個体 #ID」] | [価格ボタン gold border]
  ```
  - 装備中の行: `opacity: 0.6; background: #101218; border: 1px solid rgba(255,255,255,.05);`
    補助文は `color: #e0917f;` で「装備中（{owner名}）・ 売却不可」、右端は **`🔒`** アイコンを
    `color: #46443e;` で表示（売却ボタンの代わり）。
- **実装で対応すべき部分**:
  - 装備中の装備個体は売れない（ロジックは既存）。装備中個体を表示 → 売却不可表記に対応。
  - 強化値 `+{forgeLevel}` の表示は `equipDisplayName` が既に含む（"ゴーレムブレード +2"）が、
    モックでは強化値だけ `color: #7c7a74;` に分けて表示する。
    **実装簡略化**: `equipDisplayName` をそのまま描いて OK。強化値の色分けはローカル
    `<span>` でラップする実装でも可、省略しても可。

- **NG（空状態）**: 現状は「売れる物がありません。」のみ。
- **モック**: 「装備個体プールが空のときは「売れる装備がありません」」と同等。
  「売れる物がありません。」のままで OK。

### 3.6 購入ダイアログ（最大の差分）
- **NG**: 現状の confirmBox は小さなテキストモーダル + 数量ステッパー + 合計 + 2 ボタン。
- **モック**: 大きな縦長カード:
  ```
  [56x56 ItemSprite カード] | [装備名 display 16px + 補助 11px]
  
  [🪙 coin pop animation]
  
  [−] [×1（mono 16px）] [＋] [最大ボタン]
  
  合計 ............ 4,200 G（mono）
  購入後の所持金 ........ 4,220 G（mono gold）
  ─────────────────
  [やめる][購入する gold グラデ]
  ```
  - モーダル: `padding: 22px; background: var(--surface-panel); border: 1px solid var(--rule-gold);
    border-radius: 6px; box-shadow: var(--shadow-modal);`
  - 商品ヘッダー: `[56x56 ItemSprite] [名前 + 補助]` flex row gap 14。
  - 🪙 coin pop: 数量ステッパーのすぐ上に、`@keyframes shop-coinPop` の **ローカル**
    keyframes で 1.8s ease-in-out infinite で `🪙` 絵文字を上下にバウンスさせる。
    位置は中央上、`font-size: 18px;`。
  - 数量ステッパー: 4 つの要素（−/数値/＋/最大）が `gap: 8px;` で並ぶ。
    - −/＋: `width: 38px; height: 38px; border: 1px solid var(--rule-base); color: var(--text-soft);
      font-size: 18px; border-radius: 3px;`
    - 数値: `flex: 1; text-align: center; font-family: var(--font-mono); font-size: 16px;
      color: var(--text-strong);`
    - 最大: `width: 48px; height: 38px;` 同上、`font-size: 11px;`
    - **+10 ボタン**は省略可（モックには無いが、現状実装にある。残してよい）。実装簡略化:
      モック準拠で 4 ボタンにする。
  - 合計行: `display: flex; justify-content: space-between; font-size: 13px;`
    左ラベル `color: var(--text-mute);`、右 `font-family: var(--font-mono); color: var(--text-strong);`。
  - 購入後の所持金行: 同上、右 `color: var(--gold);`。`border-bottom: 1px solid var(--rule-soft);
    padding-bottom: 14px;`。
  - アクション: 2 列 (`gap: 10px;`):
    - 「やめる」: `border: 1px solid var(--rule-base); color: var(--text-soft);`
    - 「購入する」: `background: linear-gradient(180deg, var(--gold), var(--gold-deep));
      color: var(--bg-mid); font-weight: 700;`

### 3.7 売却確認ダイアログ
- 売却（sellItem / sellEquip）の確認ダイアログは購入と同じレイアウトでよい。違いは:
  - sellEquip: 数量ステッパー / 合計 / 購入後所持金は **非表示**（数量 1 固定）。
    代わりに「売却額: {price} G」を表示。
  - sellItem: 数量ステッパー / 合計（売却で得る G）/ 購入後所持金 を表示。

### 3.8 フッタ
- **NG**: 現状は `.foot` に「拠点へ戻る」のみ。OK。
- **モック**: 同じ。スタイル: `height: 46px; border: 1px solid rgba(255,255,255,.1);
  color: var(--text-mute); font-size: 13px; letter-spacing: .16em;`。

### 3.9 装備詳細モーダル
- 現状実装の `renderEquipDetail` は `Default` / `EquipDetail` 両方で使われる。
- **NG**: 現状はラベル + 値の 2 列リストが並ぶシンプルなテーブル。
- **モック対応**: モック原本に明示的な「装備詳細モーダル」は無いが、ショップの一覧行のレイアウト
  と整合させるため、**ヘッダーに `[ItemSprite 56x56] [名前 display 16px + slot タグ gold]` を追加**
  し、性能 / 装備可能 / 価格 / 所持数を `display: grid; grid-template-columns: auto 1fr; gap: 6px 12px;`
  で整列する。`text-align: right;` で値を右寄せ。
- 上記モックに「装備詳細モーダル」がないため、**現状実装の structure を維持しつつスタイルだけ
  黒曜にする**で OK。

---

## 4. ゴール（Storybook ストーリー一覧）

Storybook で `Pages/Shop` の以下 4 ストーリーが、添付モックと同じビジュアル方向性で描画される。

1. `Default` — `mockShop`、`tab = 'buy'` 初期表示。flat underline タブ + チップフィルタ + 各行
   がモックに準拠して描画される。
2. `Sell` — `mockShop` で `tab = 'sell'`。装備個体プールが並ぶ。
3. `BuyConfirm` — `mockShop` で `tab = 'buy'`、リスト先頭の購入ボタンを押して確認ダイアログを
   開いた状態。商品ヘッダー + coin pop + ステッパー + 合計 + 購入後所持金 + 2 ボタンが見える。
4. `EquipDetail` — `mockShop` で `tab = 'buy'`、装備行の名前ボタンを押して装備詳細モーダルを
   開いた状態。

`yarn test --run`・`yarn lint`・`yarn tsc -b` がすべて緑であること。

---

## 5. 実装ステップ

### Step 0. 全面書き直し前の準備
- 既存 `index.tsx` の state machine と handler を温存。
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

### Step 2. ヘッダー → §3.1

### Step 3. flat underline タブ → §3.2

### Step 4. カテゴリチップ + ソート表記 → §3.3

### Step 5. リスト本体（唯一の可変領域）
```scss
.list {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  touch-action: pan-y;
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 4px 0;
}
```
- 買うタブ: §3.4 の行レイアウト
- 売るタブ: §3.5 の行レイアウト

### Step 6. フッタ → §3.8

### Step 7. ダイアログ
- 購入ダイアログ → §3.6（ローカル `@keyframes shop-coinPop` を SCSS 内に置く）
- 売却ダイアログ → §3.7
- 装備詳細モーダル → §3.9

### Step 8. coin pop FX
```scss
@keyframes shop-coinPop {
  0% { transform: translateY(0) scale(1); opacity: .9; }
  50% { transform: translateY(-14px) scale(1.15); opacity: 1; }
  100% { transform: translateY(-28px) scale(.95); opacity: 0; }
}
.coinPop {
  display: block;
  text-align: center;
  font-size: 18px;
  margin: -4px 0 4px;
  animation: shop-coinPop 1.8s ease-in-out infinite;
}
```
ダイアログ内のステッパーすぐ上に `<span className={styles.coinPop}>🪙</span>` を入れる。

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
feat(redesign-A): rebuild shop page to match mock v2

- flat underline tabs (buy / sell)
- filter chips with sort text right-aligned
- buy row layout: 44x44 sprite + name/note + price button
- sell row: locked equipped item with 🔒
- redesigned buy dialog with coin pop FX + stepper + total + post-gold
- realign equip detail modal header with ItemSprite + slot tag

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

push 不要。SHA を最終応答で報告。

---

## 追加トークン要求

- `_obsidian.scss` への追加は不要。
- coin pop アニメは画面側 SCSS のローカル `@keyframes shop-coinPop` として置く（CSS Modules 内）。

