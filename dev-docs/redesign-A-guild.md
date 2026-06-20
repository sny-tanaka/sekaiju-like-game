# フェーズ 2：guild 画面リデザイン（sonnet 用指示書）— **改訂版 v3 — 差分修正**

`dev-docs/redesign-A.md`（特に **§1.5 レイアウト運用ルール**）と
`dev-docs/redesign-A-title-fix.md`（flex column 化のパターン）を **必ず先に読む**こと。

ギルド管理画面の v2 リデザインは適用済みだが、ユーザーから「**まだデザインと異なる部分がある**」
と指摘あり。本 v3 ではモック原本 (`/tmp/sekaiju-design/案A_v2.dc.html` line 363〜509) と
現状実装を改めて精密に照合し、**取りこぼした視覚差分のみを埋める**。

参考:
- 現状スクショ: `/tmp/sekaiju-screenshots-current/pages-guild--with-members.png`,
  `/tmp/sekaiju-screenshots-current/pages-guild--party.png`

> **重要**: 自分で `Edit` / `Write` / `Bash` を使って実装すること。
> **Agent / Task を spawn しないこと**（孫エージェントへの委譲禁止）。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい
- `src/pages/guild/index.tsx`
- `src/pages/guild/style.module.scss`
- `src/pages/guild/Guild.stories.tsx`（必要なら新規ストーリーを追加。既存ストーリー名は変えない）

### 触ってはいけない
- 共通コンポーネント（`@/components/common/*`, `@/components/creation/*`）の **API も内部実装も変えない**。
  本タスクでは利用するだけ。
- `@/domain/*`, `@/data/*` の関数・型・戻り値・副作用は変えない（読むのは可）。
- `@/store/*`, `@/audio/*` は変えない。
- 他ページ (`src/pages/town`, `src/pages/guild-char`, `src/pages/shop`, `src/pages/forge` 等) は本タスクの範囲外。
- 既存テスト (`*.test.ts`, `*.test.tsx`) の assert は変えない。
- `src/_obsidian.scss` のグローバルキーフレーム名・既存トークンの値は変えない（必要なら page 側で
  ローカル `@keyframes` を追加する）。

---

## 2. やってはいけないこと

- 機能仕様 (`dev-docs/claude-design-brief.md` §4 ギルド管理) の **変更は不可**。
  - モックには無いが現状の **「この枠を空ける（編成から外す）」ボタン** はピッカーから消さない。
    機能上の救済として残す。
- **絶対配置でフッタ／プライマリボタンを置かない**（§1.5）。タブごとに **フッタ DOM の中身を切り替える**
  ことで、モックの「作成タブだけ primary が下にくる」を flex で表現する。
- 「拠点へ戻る」 sub ボタンを **作成タブで表示しない**（モックに無い）。
- ロジック・状態管理・store を触らない。スタイル＋極小の JSX 構造変更にとどめる。
- `RaceInfoCard` / `ClassInfoCard` を別物に置き換えない。これらは機能仕様で必要な
  能力ランク・耐性表示を担っているので、wrapper のレイアウトだけ調整して残す。

---

## 3. モックとの差分一覧（v2 → v3 で直すべき箇所）

差分の **無い項目は書かない**。差分のあった項目だけ列挙。

### 3.1 作成タブ

| # | 差分（現状 v2 → モック） | 修正方針 |
|---|---|---|
| **C-1** | 種族グリッドの上に **「種族 ・ 6種」ラベルが無い** | `raceGrid` の直前に小ラベルを追加。`font-size: 10px; letter-spacing: 0.16em; color: var(--text-faint); margin-bottom: 6px;`。種族数は `Object.keys(RACES).length` から動的に出す（`種族 ・ ${raceIds.length}種`）。 |
| **C-2** | 職業チップの上に **「職業 ・ 9種」ラベルが無い** | 同様に `classChips` の直前に追加。職業数は `Object.keys(CLASSES).length`。 |
| **C-3** | **フッタが全タブ共通で「拠点へ戻る」になっている** モックでは作成タブのフッタは **「作成する」 primary のみ**（「拠点へ戻る」は出ない） | フッタの中身を `tab === 'create'` で分岐:<br>・作成タブ: primary「作成する」(48px, gold gradient)。disabled 条件は現行通り (`busy || isFull`)。<br>・一覧 / 編成 / 追放タブ: sub「拠点へ戻る」(46px, outline)。<br>これに伴い、body 末尾にあった `<button className={primary}>作成する</button>` は **フッタへ移す**。 |
| **C-4** | プレビューカードの位置（body 末尾） | 現状のままでよい（フッタが「作成する」に変わるので、body スクロール末尾にプレビューが見える）。フッタへ移動する `primary` ボタンはプレビューカードの **後ろ**ではなく、フッタ DOM 側に置く。 |
| **C-5** | 名前入力欄の **偽カーソルアニメ**（モック `width:2px;height:20px;background:#c9a86a` のブリンク棒） | 実 input のキャレットで足りるので **追加しない**。 |
| **C-6** | 作成完了の `notice`（緑枠） | 機能（作成成功フィードバック）として残す。モックには無いがそのままでよい。 |

### 3.2 一覧タブ

| # | 差分 | 修正方針 |
|---|---|---|
| **R-1** | フィルタ `<select>` の **▾ 矢印が gold で目立つ** モックは灰色 `▾` (`color:#5d5a52`) | `.filterSelect` の `background-image` SVG の `fill='%23c9a86a'` を `fill='%235d5a52'` に置換。 |

その他は v2 でほぼモックに沿っているため差分なし（タグ色・行の枠線・矢印 `›` の gold 色・空状態テキスト等）。

### 3.3 編成タブ

| # | 差分 | 修正方針 |
|---|---|---|
| **P-1** | 空きスロットの glowPulse 周期が **2.4s**（モックは 2s） | `.slotCardEmpty` の `animation` の duration を `2s` に変更。keyframes 名 (`obsidian-glowPulse`) はそのまま。 |

スロット枠線色（gold / blue）・カード高（104px）・後衛注記の「近接ダメージ −30%」等は差分なし。

### 3.4 追放タブ

差分なし（行の通常状態 / 赤強調状態のスタイルはモックと一致）。

### 3.5 ピッカー（bottom sheet）

差分なし（ハンドル・タイトル Mincho 16px・「配置」チップ・「とじる」ボタンはモックと一致）。
「この枠を空ける（編成から外す）」はモックに無いが機能優先で残す（現状維持）。

### 3.6 追放確認ダイアログ

| # | 差分 | 修正方針 |
|---|---|---|
| **D-1** | 円形シンボル枠 (54x54) の中の **`CharacterPortrait` が size=26 で小さすぎ**、中央に浮く | `size={36}` に拡大。モックは絵文字 26px の中央配置だが、本実装は CharacterPortrait なので一回り大きい 36px が枠とのバランスがよい。 |

タイトル font (Mincho 18px)・警告ボックス・2 ボタン（もどる / 追放する）はモックと一致、差分なし。

---

## 4. ゴール

実装後の見た目で、以下が満たされていること:

1. **作成タブ**: 「名前 / （最大16字）」「種族 ・ 6種」「職業 ・ 9種」のラベルが見える。
   下端には gold グラデの「作成する」 primary ボタン **のみ**（「拠点へ戻る」は出ない）。
2. **一覧タブ**: フィルタ select の `▾` 矢印が灰色 (`#5d5a52`) でモックの控えめな印象になる。
   下端は「拠点へ戻る」 sub ボタン。
3. **編成タブ**: 空きスロットが **2 秒周期**でパルスする。下端は「拠点へ戻る」。
4. **追放タブ → 確認ダイアログ**: 円枠の中の CharacterPortrait が枠とのバランスよく中央に収まる。
5. iPhone SE / iPhone 16 / iPad mini の 3 視点で「要素が重ならない」「ページ全体のスクロールが発生しない」
   （body の `.list` だけが縦スクロール）。

---

## 5. 実装ステップ（差分のある部分だけ直す）

### Step 1 — `index.tsx` の構造変更

1. **作成タブ body 末尾の `<button className={primary}>作成する</button>` を削除**。
2. **フッタを tab 分岐**:
   ```tsx
   <footer className={styles.foot}>
     {tab === 'create' ? (
       <button
         type="button"
         className={styles.primary}
         disabled={busy || isFull}
         onClick={() => void handleCreate()}
       >
         {isFull ? '団員が上限です' : '作成する'}
       </button>
     ) : (
       <button
         type="button"
         className={styles.sub}
         onClick={() => navigate({ name: 'town' })}
       >
         拠点へ戻る
       </button>
     )}
   </footer>
   ```
3. **作成タブ内に種族・職業ラベルを追加**:
   - `raceGrid` の直前: `<div className={styles.gridLabel}>種族 ・ {raceIds.length}種</div>`
   - `classChips` の直前: `<div className={styles.gridLabel}>職業 ・ {classIds.length}種</div>`
4. **追放確認ダイアログ**: `<CharacterPortrait ... size={26} />` を `size={36}` に変更。
5. 既存の `notice` は残す。

### Step 2 — `style.module.scss` の調整

1. **新規クラス `.gridLabel` を追加**（種族/職業ラベル用）:
   ```scss
   .gridLabel {
     font-size: 10px;
     letter-spacing: 0.16em;
     color: var(--text-faint);
     margin-bottom: 6px;
   }
   ```
2. **`.filterSelect` の background-image** の SVG `fill` を変更:
   - 修正前: `fill='%23c9a86a'`
   - 修正後: `fill='%235d5a52'`
3. **`.slotCardEmpty` の animation** を変更:
   - 修正前: `animation: obsidian-glowPulse 2.4s infinite;`
   - 修正後: `animation: obsidian-glowPulse 2s infinite;`
4. **`.foot` 内のボタン**: 既存の `.sub` / `.primary` をそのまま使う（新規スタイル不要）。
   ただし `.primary` がページ内で 1 個しか使われないことを再確認（body 内から消えて footer 側に 1 個だけ）。

### Step 3 — Storybook

1. 既存ストーリーが壊れていないことを確認:
   - `Default`（作成タブ初期表示）
   - `WithMembers`（一覧タブを開きやすい状態）
   - `Party`（編成タブ）
2. 必要なら `BanishConfirm` ストーリーを追加して `decorators: [withGameContext(mockWithParty, { name: 'guild' })]` + `play` でタブ切替 → 行クリックまで自動操作。

### Step 4 — スクショ確認（任意・差分が分かりにくいとき）

ヘッドレス Chrome で `pages-guild--default`, `pages-guild--with-members`, `pages-guild--party` を撮り、
`/tmp/sekaiju-screenshots-current/` の v2 スクショとの差分（作成タブのラベル / フッタの「作成する」ボタン / 空きスロットの周期）を目視確認。

---

## 6. 検証（必須）

完了前に **すべて緑にする**:

```bash
yarn test       # vitest（既存テストの assert は変えない前提）
yarn lint       # eslint
yarn build      # bump-patch-version.mjs → tsc -b → vite build
```

`yarn build` を実行すると `docs/` と `package.json` のバージョンも更新される（CLAUDE.md 参照）。
**`docs/` と更新後 `package.json` も同じコミットに含めること**。

---

## 7. コミット

- 自分でコミットする（ディレクターがレビュー後に push する）。
- 規模に応じて 1〜3 個のコミットに分割可（例: フッタ分岐／ラベル＋アニメ調整／build 成果物）。
- コミットメッセージ例:
  - `style(guild): フッタを作成/その他タブで分岐し、ラベルと glowPulse 周期をモックに揃える`
  - `chore(build): rebuild docs/ after guild v3 fixes`
- 完了したら **commit SHA を報告**（push はしない）。
