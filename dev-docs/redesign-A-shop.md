# フェーズ 2：shop 画面リデザイン（sonnet 用指示書）— **改訂版 v3 — 差分修正**

`dev-docs/redesign-A.md`（特に **§1.5 レイアウト運用ルール**）と
`dev-docs/redesign-A-title-fix.md`（flex column 化のパターン）を **必ず先に読む**こと。

ショップ画面（買う / 売る ＋ カテゴリチップ ＋ 売買確認ダイアログ）の v2 リデザインは適用済みだが、
ユーザーから「**まだデザインと異なる部分がある**」と指摘あり。本 v3 ではモック原本
(`/tmp/sekaiju-design/案A_v2.dc.html` line 621〜679) と現状実装を改めて精密に照合し、
**取りこぼした視覚差分のみを埋める**。

参考:
- 現状スクショ: `/tmp/sekaiju-screenshots-current/pages-shop--default.png`,
  `/tmp/sekaiju-screenshots-current/pages-shop--sell.png`

> **重要**: 自分で `Edit` / `Write` / `Bash` を使って実装すること。
> **Agent / Task を spawn しないこと**（孫エージェントへの委譲禁止）。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい
- `src/pages/shop/index.tsx`
- `src/pages/shop/style.module.scss`
- `src/pages/shop/Shop.stories.tsx`（必要なら新規ストーリーを追加。既存名は変えない）

### 触ってはいけない
- 共通コンポーネント（`@/components/common/ItemSprite`, `InkSplatter` 等）の API / 内部 / スタイル
- `@/domain/*`, `@/data/*` の関数・型・戻り値・副作用は変えない
- `@/store/*`, `@/audio/*` は変えない
- 他ページ (`src/pages/town`, `src/pages/guild`, `src/pages/guild-char`, `src/pages/forge` 等) は本タスクの範囲外
- 既存テスト（特に `src/domain/shop.test.ts`）の assert は変えない
- `src/_obsidian.scss` のグローバルキーフレーム名・既存トークンの値は変えない

---

## 2. やってはいけないこと

- 機能仕様 (`dev-docs/claude-design-brief.md` §8 ショップ) の **変更は不可**。
  - 「装備詳細モーダル」（現状実装の `renderEquipDetail`）はモックに無いが機能優先で残す。
  - 売却確認・購入数量ステッパー・購入後所持金プレビューはモック通り残す。
- 絶対配置で行 / フッタを置かない（§1.5）。
- ロジック・売買確認フロー・カタログ算出 (`shopCatalog` 等) は変えない。スタイル＋極小の JSX 構造変更にとどめる。

---

## 3. モックとの差分一覧（v2 → v3 で直すべき箇所）

差分の **無い項目は書かない**。差分のあった項目だけ列挙。

### 3.1 ヘッダー・タブバー

差分なし。
- ヘッダー: `<h1>ショップ</h1>` + 右に gold mono `8,420 G` — モック一致。
- タブバー: 「買う / 売る」 active が gold 塗り角丸 — モック一致。

### 3.2 カテゴリチップ・ソート行

| # | 差分 | 修正方針 |
|---|---|---|
| **F-1** | カテゴリチップ（すべて / 武器 / 防具 / 装飾 / 道具）モックは 5 種 | 現状実装は 5 種（武器・防具・装飾・道具・素材）。**「素材」はモックに無いが、機能仕様で必要**（売却カタログに素材が含まれるため）。現状の `presentCats` で「実在するカテゴリだけ」表示する仕組みになっているので、素材が無い局面では出ない → モック一致。**差分なし**。 |
| **F-2** | チップ active 色: モック gold 塗り + `color:#0e0f13; font-weight:700` 非 active 枠線のみ `color:#9a958a` | 現状一致、差分なし。 |
| **F-3** | ソート行: モックは **テキストのみ**「⇅ 金額が高い順」を右寄せ表示（ドロップダウンではなくラベル風）、現状は `<select>` | モバイル機ネイティブの select 表示は UX 上の利便なので **現状維持**。`appearance: none; border: none; background: transparent; color: var(--text-faint);` でモックの見た目に寄せている。差分なしと判断。 |

### 3.3 リスト本体（買うタブ）

| # | 差分 | 修正方針 |
|---|---|---|
| **L-1** | 先頭行 (`rowHighlight`) 強調: モック `linear-gradient(100deg,#1a2030,#13151c) + border:rgba(201,168,106,.35)` + 価格ボタン gold 塗り (`actionHighlight`) | 現状実装一致、差分なし。 |
| **L-2** | 通常行: モック `background:#15171f; border:1px solid rgba(255,255,255,.06); border-radius:4px; padding:11px 13px` | 現状一致、差分なし。 |
| **L-3** | ItemSprite ラッパー: モック 44x44 `background:#0c0d11; border-radius:3px` で 40x40 のアイコン中央 | 現状一致 (`.spriteCard`)、差分なし。 |
| **L-4** | アイテム名 13px text-strong + 説明 10px faint（「重厚な大剣 ・ ATK +62」） | 現状はアイテム名 + 説明 (`note`) を表示しており、機能上「所持 8」を併記しているのもモック準拠（モックも回復薬で「HP +120 ・ 所持 8」と記載あり）。差分なし。 |
| **L-5** | 価格ボタン (`action` / `actionHighlight`): mono 12px gold border / gold 塗り | 現状一致、差分なし。 |
| **L-6** | 装備行のアイテム名がボタン（タップで詳細モーダル） | 機能優先で残す（モックには無いが、装備詳細を見るために必要）。差分なしと扱う。 |

### 3.4 リスト本体（売るタブ）— ★ **取りこぼし** ★

| # | 差分 | 修正方針 |
|---|---|---|
| **SL-1** | **モックには「装備中（誰々）・ 売却不可」のロック行**が含まれている（`opacity:.6; border:1px solid rgba(255,255,255,.05); + 鍵アイコン`）。現状実装は **装備中個体を `sellRows` に含めない**ので、ロック行が表示されない | **追加実装**: 装備中の個体（`save.guild.members[*].equipment.{weapon,armor,accessory}` のいずれかにあるもの）を、`sellRows` 末尾にロック行として **表示用に追加**。<br>**スタイル**: 現状の `.rowLocked` / `.noteName` / `.noteLocked` / `.lockIcon` が **CSS には既に定義されているが JSX で使われていない**。これを使う:<br>```tsx<br><div className={styles.rowLocked}><br>  <div className={styles.spriteCardSm}><ItemSprite ... /></div><br>  <div className={styles.info}><br>    <span className={styles.noteName}>{baseName}{forgeLvSuffix}</span><br>    <span className={styles.noteLocked}>装備中（{ownerName}）・ 売却不可</span><br>  </div><br>  <span className={styles.lockIcon}>🔒</span><br></div><br>```<br>**ロジック**: `save.guild.members` を走査して、装備中のインスタンスと装備者名を Map に集める関数を `sellRows` の組み立てに追加。実際には sell ボタンをクリックできない（pointer-events を切る or disabled の `<button>` でも可）。ドメイン関数の変更は不要、表示用情報の組み立てのみ。<br>**注意**: `domain/shop.test.ts` の assert を変えない範囲で実装。テストは「装備中の個体は売却対象外」を見ているはずなので、表示追加だけなら影響なし。 |
| **SL-2** | モックの「装備個体プールが空のときは『売れる装備がありません』」ヒント文 (`bottom:80px text-align:center; font-size:11px; color:#5d5a52`) | 現状の `売れる物がありません` 中央表示で実質一致、差分なし。 |
| **SL-3** | 売るタブの「強化値色付きサフィックス」（`+0` `+1` を `color:#7c7a74`） | 現状実装 (`.forgeLevel`) 一致、差分なし。 |
| **SL-4** | 「個体 #st_2」のような個体 ID 表示 | モックは `#A2` `#C7` のような短い ID、現状は `.inst.id.slice(-4)` で末尾 4 文字。差分なし（モックも実用上の一意性確保なら同等）。 |

### 3.5 フッタ

差分なし。「拠点へ戻る」 sub 46px outline でモック一致。

### 3.6 売買確認ダイアログ

| # | 差分 | 修正方針 |
|---|---|---|
| **D-1** | ダイアログヘッダー: ItemSprite 56x56 + 名前 + 説明 | 現状一致、差分なし。 |
| **D-2** | coin pop アニメ位置: モックは商品ヘッダーの直下、ステッパーの上に `position:relative; text-align:center;` で配置（`top:-6px`） | 現状の `.coinPop` は `display: block; text-align: center; font-size: 18px; margin: -4px 0 20px;` で、ほぼ一致。差分なしと判断。 |
| **D-3** | 数量ステッパー: − / ×N / ＋ / 最大 横並び | 現状一致、差分なし。 |
| **D-4** | 合計 + 購入後所持金（下境界）| 現状一致、差分なし。 |
| **D-5** | 2 ボタン（やめる / 購入する） | 現状一致、差分なし。 |

### 3.7 装備詳細モーダル（機能優先で残すモック非掲載要素）

差分なし。現状の `renderEquipDetail` をそのまま使う。
ただし、確認ダイアログと装備詳細モーダルの **2 種類が `.confirmOverlay` `.confirmBox` を共有している** ため、
重ね時の挙動が気にならないか目視確認すること（基本同時には開かない設計）。

---

## 4. ゴール

実装後の見た目で、以下が満たされていること:

1. **売るタブで装備中の個体が「装備中（{名前}）・ 売却不可」ロック行**として表示される
   （現状の sellRows に該当行が無い問題を修正）。
2. その他の差分が無い項目はそのまま v2 の見た目を維持する。
3. iPhone SE / iPhone 16 / iPad mini の 3 視点で「要素が重ならない」「ページ全体スクロール無し」
   （`.list` だけが縦スクロール）。

---

## 5. 実装ステップ（差分のある部分だけ直す）

### Step 1 — 装備中の個体を SellRow に追加する（**主たる修正**）

1. **`save.guild.members` を走査して装備者名を引ける Map を作る**:
   ```ts
   const equipOwnerMap = new Map<string, string>();
   for (const m of save.guild.members) {
     for (const slot of ['weapon', 'armor', 'accessory'] as const) {
       const eq = m.equipment[slot];
       if (eq) equipOwnerMap.set(eq.id, m.name);
     }
   }
   ```
2. **`sellRows` 組み立てを変更**:
   - 現状: `save.guild.equipment` から `EquipInstance` を全部リスト化
   - 修正後: 同じく全部リスト化するが、**`equipOwnerMap.has(e.id)` の個体には `locked: true; ownerName: string` を付与**
3. **`SellRow` の型**にロック情報を追加:
   ```ts
   type SellRow =
     | { ...; kind: 'equip'; locked?: false }
     | { ...; kind: 'equip'; locked: true; ownerName: string }
     | { ...; kind: 'item' };
   ```
   または `kind: 'equipLocked'` を別 variant で切るのも可。実装しやすい方で。
4. **JSX 側でロック行を分岐レンダリング**:
   - `kind === 'equip' && locked` のとき: `.rowLocked` + `.spriteCardSm` + `.noteName` + `.noteLocked` + `.lockIcon` で出す。
   - クリックしても売却 pending を開かない（onClick を付けない、または `disabled` 風に視覚化）。
5. **既存の CSS 定義 (`.rowLocked` / `.noteName` / `.noteLocked` / `.lockIcon`) はそのまま使う**（既に書かれている、JSX で参照だけ追加）。

### Step 2 — `view()` のソート対象から locked を除外するか維持するか

- モックではロック行が最下段、現状ソートが `priceDesc` の場合 locked 行が中段に紛れると見づらい。
- **修正**: ロック行を **常にリスト末尾**に置く。`view()` の return を `[...sortedNonLocked, ...locked]` の順にする。
- 仕様変更ではなく表示順の調整なので、テストへの影響なし。

### Step 3 — Storybook で確認

1. 既存 `Default` / `Sell` ストーリーに `mockShop` を使って装備中個体ありの状態を作る。
   - `mockShop` で party のメンバーが装備済の状態がない場合、`__stories__/mockSaves.ts` に preset を追加するか、
     既存の `mockWithParty` のように装備済状態を作っている mock を別途指定する。
   - **`__stories__/mockSaves.ts` を直接編集可**（共通コンポーネントには該当しない）。
2. 「売る」タブを開いて、装備中個体がロック行として最下段に並ぶことを確認。

### Step 4 — スクショ確認

`pages-shop--sell` を撮り直し、装備中ロック行が現れるか確認。

---

## 6. 検証（必須）

完了前に **すべて緑にする**:

```bash
yarn test       # vitest（既存テスト assert は変えない前提）
yarn lint       # eslint
yarn build      # bump-patch-version.mjs → tsc -b → vite build
```

特に注意:
- **`src/domain/shop.test.ts`** が「装備中の装備は売却対象外」をアサートしているはずなので、
  **ドメイン関数 (`sellEquipment` 等) は触らない**。UI 層 (`index.tsx`) で表示用に追加するだけ。
- 型エラー（`SellRow` の variant 増加）は丁寧に追従させる。

---

## 7. コミット

- 自分でコミットする（ディレクターがレビュー後に push する）。
- 規模に応じて 1〜2 個のコミットに分割可（例: ロック行追加／build 成果物）。
- コミットメッセージ例:
  - `feat(shop): 売るタブに装備中ロック行を追加してモックに揃える`
  - `chore(build): rebuild docs/ after shop v3 fixes`
- 完了したら **commit SHA を報告**（push はしない）。
