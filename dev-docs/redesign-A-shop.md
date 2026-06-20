# フェーズ 2：shop 画面リデザイン（sonnet 用指示書）— **改訂版 v5 — 案A v3 完全対応**

`dev-docs/redesign-A.md`（特に **§1.5 レイアウト運用ルール**）と
`dev-docs/design-source-v3-changelog.md`（**v3 で確定した out-of-spec 整理判断の出典**）を
**必ず先に読む**こと。

ショップ画面（買う / 売る ＋ カテゴリチップ ＋ 売買確認ダイアログ）は v3 まででモック忠実化と
「装備中ロック行（5a）」の追加が完了している。Claude Design から `案A v3` が到着し、
out-of-spec 要素のうち以下 1 点が **「追加」** 判定として確定した。

本 v5 では v3 のモック原本 `/tmp/sekaiju-design/案A_v3.dc.html`（line 601〜660、`05 shop`）と
現状実装を改めて照合し、**v3 判定に追随する修正**を行う。

参考:
- v3 changelog: `dev-docs/design-source-v3-changelog.md` 表 §B「5 shop」行
  - 5a 装備中・売却不可🔒 → **追加** （**既に v3 で実装済み**。本 v5 では維持を確認するのみ）
  - 5c coinPop 演出 → **追加**（購入完了 SE + 金貨ポップを購入確認ダイアログに追加）
- 既存実装: `src/pages/shop/index.tsx`, `src/pages/shop/style.module.scss`
- 現状スクショ: `/tmp/sekaiju-screenshots-current/pages-shop--default.png`,
  `/tmp/sekaiju-screenshots-current/pages-shop--sell.png`（v3 直前時点）

> **重要**: 自分で `Edit` / `Write` / `Bash` を使って実装すること。
> **Agent / Task を spawn しないこと**（孫エージェントへの委譲禁止）。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい
- `src/pages/shop/index.tsx`
- `src/pages/shop/style.module.scss`
- `src/pages/shop/Shop.stories.tsx`（必要なら新規ストーリーを追加。既存名は変えない）
- `src/_obsidian.scss` の **末尾に `@keyframes obsidian-coinPop` を追加するときのみ**触ってよい
  （既存トークン値・他のキーフレームは絶対に変更しない）

### 触ってはいけない
- 共通コンポーネント（`@/components/common/ItemSprite`, `InkSplatter` 等）の API / 内部 / スタイル
- `@/domain/*`, `@/data/*` の関数・型・戻り値・副作用は変えない
- `@/store/*`, `@/audio/*` は変えない
  - `sfxManifest.ts` の `SFX_IDS` には既に `'coin'` がある（line 18）。新規 SE 追加は不要。
- 他ページ (`src/pages/town`, `src/pages/guild`, `src/pages/guild-char`, `src/pages/forge` 等) は本タスクの範囲外
- 既存テスト（特に `src/domain/shop.test.ts`）の assert は変えない
- `src/_obsidian.scss` のグローバルキーフレーム名・既存トークンの値は変えない
  （追加のみ可。既存の `obsidian-*` は触らない）

---

## 2. やってはいけないこと

- **Agent / Task ツールで子エージェントを spawn しない**（このタスクは自分で完結する）
- 機能仕様 (`dev-docs/claude-design-brief.md` §8 ショップ) の **変更は不可**。
  - 「装備詳細モーダル」（現状の `renderEquipDetail`）はモックに無いが機能優先で残す。
  - 売却確認・購入数量ステッパー・購入後所持金プレビューはモック通り残す。
  - **装備中ロック行（5a）は v3 で既に実装済み**。データ走査ロジック (`equipOwnerMap`) を維持。
- 共通コンポーネント・既存テスト assert を変更しない。
- 絶対配置で行 / フッタを置かない（§1.5）。
- ロジック・売買確認フロー・カタログ算出 (`shopCatalog` 等) は変えない。スタイル＋極小の JSX 構造変更にとどめる。
- 既存の購入確定 InkSplatter (`buyConfirmedFx` + `InkSplatter variant='damage'`) は **残す**。
  本 v5 の coinPop はそれと **重ねて出す**（モックは coin pop をダイアログの中身に出しているため、
  既存の墨インク InkSplatter は閉じた後のフルスクリーン演出として併存できる）。

---

## 3. モックとの差分一覧 + out-of-spec 判断の反映

差分の **無い項目は書かない**。v5 で直すべき差分だけ列挙する。

### 3.1 5a 売るタブ 装備中ロック行 — **★維持 ★**

| # | 現状実装 | v3 モック | 修正方針 |
|---|---|---|---|
| **5a** | `index.tsx` line 145〜200 で `equipOwnerMap` を構築し、`allEquipRows` を `locked: true` / `locked: false` に分岐、`sellRows` 末尾に locked 行を集約済み。JSX (line 477〜493) で `.rowLocked` + `.noteLocked` + `.lockIcon` を描画 | モック (v3 line 636) は `opacity:.6` の装備中行 + 「装備中（ジョンスミス）・ 売却不可」+ 🔒 | **据置**。v3 で既に実装済み。動作確認のみ。 |

確認手順:
1. `mockWithParty` を decorator で渡したストーリー（または `mockShop`）で「売る」タブを開く。
2. 党員が装備している装備個体がリスト末尾に **opacity 0.6 + 🔒** で出ているか目視確認。
3. 個体が無い場合は `__stories__/mockSaves.ts` に preset を追加するか、`mockWithParty` の装備状態を
   見直す（**`__stories__/mockSaves.ts` は触ってよい**。共通コンポーネントには該当しない）。

### 3.2 5c 購入確認ダイアログ coinPop 演出 — **★追加 ★**

| # | 現状実装 | v3 モック | 修正方針 |
|---|---|---|---|
| **5c-1** | 購入確定時に画面全体（オーバーレイ閉じた後）に `InkSplatter variant='damage' value='✓'` がフラッシュ表示される | モック (v3 line 651〜652) は **購入確認ダイアログの中身**、商品ヘッダーとステッパーの間に `🪙` 絵文字が `position:relative; text-align:center; top:-6px;` で `animation: coinPop 1.8s ease-in-out infinite` で配置されている | **追加**: 購入確認ダイアログの **商品ヘッダー直下** に `🪙` ポップ要素を配置する。既存の墨インク `InkSplatter`（`buyConfirmedFx`）は **そのまま残す**（購入確定後の全画面演出として併存）。 |
| **5c-2** | `play('coin')` は `confirmPending` 内で既に呼ばれている（line 239） | モック ✦ FX は `購入完了 SE + 金貨ポップ` | **据置**。SE は既に鳴る。視覚演出（金貨ポップ）だけを追加する。 |

実装方針:

#### A. `_obsidian.scss` に `obsidian-coinPop` キーフレームを追加

ファイル末尾に追記する（既存 `obsidian-*` キーフレームと **同じ名前空間** で命名し、
`prefers-reduced-motion` のブロックも併記する）:

```scss
@keyframes obsidian-coinPop {
  0%   { transform: translate(-50%, 0); opacity: 0.6; }
  20%  { transform: translate(-50%, -14px); opacity: 1; }
  60%  { transform: translate(-50%, -22px); opacity: 1; }
  100% { transform: translate(-50%, 0); opacity: 0.6; }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes obsidian-coinPop { 0%, 100% { transform: translate(-50%, 0); opacity: 1; } }
}
```

挿入位置はファイル末尾の `obsidian-sheetRise` の後、`@media (prefers-reduced-motion)` ブロックも
同様に末尾に追記する（既存ブロックの中身は変えない）。

#### B. `shop/style.module.scss` に `.coinPop` クラスを追加

ダイアログ内の商品ヘッダーとステッパーの間に配置するための **絶対配置を許容したラッパー** を追加:

```scss
.coinPopWrap {
  position: relative;
  text-align: center;
  height: 14px;       /* 14px 程度の固定高で他要素のレイアウトを動かさない */
  margin-bottom: 8px;
}

.coinPop {
  position: absolute;
  left: 50%;
  top: -6px;
  font-size: 18px;
  line-height: 1;
  animation: obsidian-coinPop 1.8s ease-in-out infinite;
  pointer-events: none;
}
```

ダイアログ内部は **flex column の流れの中で配置するが、`.coinPopWrap` 自体が固定高なので、
内部の `.coinPop` を `position: absolute` にしてもダイアログ全体のレイアウトには影響しない**
（§1.5 で禁止しているのは画面全体の絶対配置レイアウトであり、装飾の局所 absolute は許容）。

#### C. `shop/index.tsx` の購入確認ダイアログ JSX に coinPop を追加

`pending.kind === 'buy'` のときだけ、商品ヘッダー（モックでは確認ダイアログのヘッダー部に
ItemSprite + 名前 + 説明があるが、現状実装はヘッダー部分が無いシンプルなダイアログ）の **直下、
ステッパーの上** に挿入する:

```tsx
<div className={styles.confirmText}>
  {pending.kind === 'buy' ? (
    <>
      <strong>{pending.name}</strong> を購入しますか？
    </>
  ) : pending.kind === 'sellEquip' ? (
    /* ...略... */
  ) : (
    /* ...略... */
  )}
</div>

{/* coinPop 演出（buy 時のみ） */}
{pending.kind === 'buy' && (
  <div className={styles.coinPopWrap} aria-hidden="true">
    <span className={styles.coinPop}>🪙</span>
  </div>
)}

{/* 数量ステッパー */}
{pending.kind !== 'sellEquip' && (
  <div className={styles.stepperRow}>
    {/* 既存 */}
  </div>
)}
```

**注意**: 既存の `confirmText` はテキストのみのシンプル構造。モックでは商品ヘッダーに
`ItemSprite 56x56 + 名前 + 説明` を含むが、現状実装はそこまで作り込んでいない。
**本 v5 では構造変更は最小に倒し、coinPop の追加だけで OK**（ヘッダー化は別タスク）。

#### D. SE は据置（既に `play('coin')` 済み）

`confirmPending` 内の `play('coin')` (line 239) はそのまま。`sfxManifest.ts` の `'coin'` を使う。

#### E. 既存 `buyConfirmedFx` (InkSplatter) は据置

ダイアログを閉じた後の全画面演出としての `<InkSplatter variant='damage' value='✓' />` は
**残す**（モックは確認中の演出だが、確定後の確認フィードバックとして既存実装の価値があるため）。
`buyConfirmed` ステートと `setBuyConfirmed(true)` のフローは触らない。

### 3.3 その他（差分なし）

ヘッダー、タブバー、カテゴリチップ、ソート行、買うタブの全要素、装備詳細モーダル
（機能優先で残す）、フッタは **v3 時点でモック一致**。v5 では触らない。

---

## 4. データ拡張の方針

**shop では不要**。`Character` 型・`SaveData` スキーマ・マイグレーション・テストの追加は一切しない。
ドメイン関数 (`buyMany` / `sell` / `sellEquipment` / `shopCatalog` / `equipSellValue` 等) も触らない。

---

## 5. 実装ステップ

### Step 1 — `_obsidian.scss` に `obsidian-coinPop` キーフレームを追加

1. ファイル末尾の `obsidian-sheetRise` の **直後** に `@keyframes obsidian-coinPop` を追加。
2. `prefers-reduced-motion: reduce` のブロックにも `coinPop` の no-op 版を追記。
3. **既存の `obsidian-*` キーフレーム / 変数の値は絶対に変えない**（他画面で参照されている）。

### Step 2 — `shop/style.module.scss` に `.coinPopWrap` / `.coinPop` を追加

1. 既存の `.confirmBox` / `.confirmText` 周りのセクションに、上記 SCSS 差分を追加する。
2. 既存の `.buyConfirmedFx` 系の SCSS は触らない。

### Step 3 — `shop/index.tsx` のダイアログに coinPop ラッパーを追加

1. 購入確認ダイアログ（`pending.kind === 'buy'` のとき）に `.coinPopWrap` + `.coinPop` を追加。
2. 数量ステッパーや合計表示の前に挿入する（モックの配置順に合わせる）。
3. `play('coin')` の呼び出しは据置。

### Step 4 — 装備中ロック行の動作確認（5a 維持）

1. Storybook で「売る」タブを開き、ロック行が末尾に出ているか確認。
2. `mockShop` または `mockWithParty` で装備中個体がある状態を再現できているか確認。
   出ない場合は `__stories__/mockSaves.ts` の preset を見直す。

### Step 5 — Storybook で確認

1. 既存 `Default` / `Sell` ストーリーに加えて、購入確認ダイアログを開いた状態のストーリーを
   1 つ追加して撮影してもよい（任意。`mockShop` で gold を多めにして購入確認ダイアログを `initialState` で開くなど）。
2. `🪙` が商品名直下で上下にゆっくり跳ねていることを目視確認。

### Step 6 — スクショ確認

ヘッドレス Chrome で:
- `pages-shop--default`
- `pages-shop--sell` （ロック行が末尾にあること）
- 購入確認ダイアログ用ストーリー（あれば、coinPop が出ていること）

を撮り、v3 モックと並べて差分が無いことを確認する。

---

## 6. 検証

完了前に **すべて緑にする**:

```bash
yarn test       # vitest（既存テスト assert は変えない前提）
yarn lint       # eslint
yarn build      # bump-patch-version.mjs → tsc -b → vite build
```

特に注意:
- **`src/domain/shop.test.ts`** が「装備中の装備は売却対象外」をアサートしているはずなので、
  **ドメイン関数 (`sellEquipment` 等) は触らない**。UI 層 (`index.tsx`) で表示用に追加するだけ。
- 型エラーは丁寧に追従させる（`tsc -b` は vitest / eslint で検出されないので必ず回す）。
- `yarn build` を実行すると `docs/` と `package.json` のバージョンが更新される。
  **`docs/` と更新後 `package.json` も同じコミットに含めること**。

---

## 7. コミット

- 自分でコミットする（push はしない。ディレクターがレビュー後に push する）。
- 規模に応じて 1〜2 個のコミットに分割可（例: SCSS keyframe 追加／JSX 追加／build 成果物）。
- コミットメッセージ例:
  - `feat(shop): 案A v3 取り込み（購入確認に coinPop 演出を追加）`
  - `chore(build): rebuild docs/ after shop v5 fixes`
- 完了したら **commit SHA を報告**（push はしない）。
