# フェーズ 2：forge 画面リデザイン（sonnet 用指示書）— **改訂版 v3 — 差分修正**

`dev-docs/redesign-A.md`（特に **§1.5 レイアウト運用ルール**）と
`dev-docs/redesign-A-title-fix.md`（flex column 化のパターン）を **必ず先に読む**こと。

鍛冶屋画面（強化 / リサイクル ＋ 強化確認ダイアログ）の v2 リデザインは適用済みだが、
ユーザーから「**まだデザインと異なる部分がある**」と指摘あり。本 v3 ではモック原本
(`/tmp/sekaiju-design/案A_v2.dc.html` line 683〜739) と現状実装を改めて精密に照合し、
**取りこぼした視覚差分のみを埋める**。

参考:
- 現状スクショ: `/tmp/sekaiju-screenshots-current/pages-forge--default.png`,
  `/tmp/sekaiju-screenshots-current/pages-forge--recycle.png`

> **重要**: 自分で `Edit` / `Write` / `Bash` を使って実装すること。
> **Agent / Task を spawn しないこと**（孫エージェントへの委譲禁止）。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい
- `src/pages/forge/index.tsx`
- `src/pages/forge/style.module.scss`
- `src/pages/forge/Forge.stories.tsx`（必要なら新規ストーリーを追加。既存名は変えない）

### 触ってはいけない
- 共通コンポーネント（`@/components/common/ItemSprite`, `InkSplatter` 等）の API / 内部 / スタイル
- `@/domain/forge.ts`, `@/data/*` の関数・型・戻り値・副作用は変えない
- `@/store/*`, `@/audio/*` は変えない
- 他ページ (`src/pages/town`, `src/pages/guild`, `src/pages/guild-char`, `src/pages/shop` 等) は本タスクの範囲外
- 既存テスト（特に `src/domain/forge.test.ts`）の assert は変えない
- `src/_obsidian.scss` のグローバルキーフレーム名・既存トークンの値は変えない

---

## 2. やってはいけないこと

- 機能仕様 (`dev-docs/claude-design-brief.md` §4 鍛冶屋) の **変更は不可**。
  - 「一括分解」「断片→インゴット変換」はモックの控えめな表現に揃えつつ、機能は残す。
  - **「リサイクルタブのチェックボックス」**は機能優先で残す（モックにはチェックボックスがない）。
    ただし**選択モードに入ったときだけ前面化**するなどの工夫は v3 の範囲外なので、現状の常時表示で OK。
- 絶対配置でフッタ・行を置かない（§1.5）。
- ロジック（強化計算・断片計算）は変えない。スタイル＋極小の JSX 構造変更にとどめる。

---

## 3. モックとの差分一覧（v2 → v3 で直すべき箇所）

差分の **無い項目は書かない**。差分のあった項目だけ列挙。

### 3.1 ヘッダー

差分なし。
- `<h1>鍛冶屋</h1>` Mincho 18px。
- インゴット在庫行: `銅 5 / 銀 2 / 金 0 / 断片 17` mono 11px、各色 (`#c98a5b` / `#c8c4ba` / `#e8d85b` / faint)。

### 3.2 タブバー・ヒント文

差分なし。
- タブ active が gold 塗り角丸、ヒント文は gold left-border の半透明背景。

### 3.3 強化タブの行カード

| # | 差分 | 修正方針 |
|---|---|---|
| **E-1** | 先頭行強調 (`rowHighlight`): `linear-gradient(100deg,#1a2030,#13151c) + border:rgba(201,168,106,.35)` | 現状一致、差分なし。 |
| **E-2** | 装備名: `13px color:#f2ede1` + 「+N」（`color:#c9a86a`） | 現状一致、差分なし。 |
| **E-3** | ステ予測テキスト: `10px color:#8c8a84` で「武器 ・ ATK +62 → +68」（`+68` が `color:#9ed8b4` 緑） | 現状一致 (`.statPreview` + `.statNext`)、差分なし。 |
| **E-4** | インゴットボタン: 銅 active バッジ風 (`background:rgba(201,134,91,.18) + border + color:#e0a87c`)、銀 枠線のみ (`color:#c8c4ba`)、金 残量0なら disabled (`color:#5d5a52`) | 現状一致、差分なし。ただし**銅ボタンが常に「active 状態」のスタイル**になっているのは、モックも「銅+1 (5) を選んだ状態」を見せたサンプルだから。実装としては「銅・銀・金それぞれを独立した click で `pending` を開く」なので、active 状態の概念がない。**現状の常時銅 active 風 / 銀・金 枠線のみで OK**。 |
| **E-5** | MAX 行: `opacity:.7` + 右端に MAX チップ `border:1px solid rgba(201,168,106,.35); color:#c9a86a; padding:5px 10px;` | 現状一致 (`.rowMaxed` + `.maxChip`)、差分なし。 |

### 3.4 リサイクルタブの行

| # | 差分 | 修正方針 |
|---|---|---|
| **R-1** | モックは行カード `background:#15171f; border:1px solid rgba(255,255,255,.06); border-radius:4px; padding:11px 13px` + 横並び 1 段 | 現状一致、差分なし。 |
| **R-2** | モックには **チェックボックスが無い**（一括分解バーも無い） | 機能優先で残す。**現状のチェックボックスとバルク分解 UI はそのまま残す**。 |
| **R-3** | 「分解で 断片 ×3」表示: `10px faint` + 「断片」が `color:#c98a5b` | 現状一致 (`.statPreview` + `.fragCount`)、差分なし。 |
| **R-4** | 「分解」チップ: `font-size:11px color:#e0a87c border:1px solid rgba(201,134,91,.5) border-radius:2px padding:5px 11px` | 現状一致、差分なし。 |
| **R-5** | 「断片 → インゴット変換」 hint row: `background:rgba(201,168,106,.06); border:1px solid rgba(201,168,106,.25); border-radius:4px; padding:12px 14px` + 「断片10→銅1」チップ | 現状一致 (`.convertHint` + `.convertBtn`)、差分なし。 |

### 3.5 一括分解バー（モックには無い）

差分の方向: モックには無いが、機能優先で残す。
- 現状: 選択した行があると下から黒地+gold枠の bar が出る。
- そのまま残す。

### 3.6 強化確認ダイアログ

| # | 差分 | 修正方針 |
|---|---|---|
| **C-1** | ダイアログ枠 `width: calc(100% - 56px); max-width: 360px; background:#15171f; border:1px solid rgba(201,168,106,.4); border-radius:6px; padding:24px 22px; box-shadow:0 20px 60px rgba(0,0,0,.6); text-align:center` | 現状一致、差分なし。 |
| **C-2** | 72x72 ItemSprite カード + sparkle 3 点 (左上 -6/-6、右上 8/-8、左下 -4/14) `animation:forgeSpark 1.3s ease-in-out infinite` | 現状一致、差分なし。 |
| **C-3** | 装備名 Mincho 17px | 現状一致、差分なし。 |
| **C-4** | 「+2 → +3」表示: mono 20px gold + 後半が `color:#e8d099; text-shadow:0 0 12px rgba(232,208,153,.6)` | 現状一致 (`.dialogForgeLevel` + `.dialogForgeLevelNext`)、差分なし。 |
| **C-5** | 補足ボックス: `background:rgba(255,255,255,.03); border-radius:3px; padding:10px 12px; font-size:12px color:#c2bdb2 line-height:1.7` + 「消費: 銀インゴット ×1 ・ ATK +68 → +71」 (緑は `var(--success)`) | 現状一致、差分なし。 |
| **C-6** | 「この強化で残り 銀 1」 (`font-size:11px color:#8c8a84 margin-bottom:20px`) | 現状一致 (`.dialogRemain`)、差分なし。 |
| **C-7** | 2 ボタン（やめる / 強化する）48px、primary gold gradient | 現状一致、差分なし。 |

### 3.7 分解確認ダイアログ・一括分解確認ダイアログ

差分なし。モックには載っていないが、現状の作りはモック準拠の確認ダイアログ枠を踏襲。
強化と異なり sparkle 演出は無いが、それで OK（モックの強化以外の確認ダイアログサンプルが無いため）。

### 3.8 フッタ

差分なし。「拠点へ戻る」 sub 46px outline でモック一致。

---

## 4. ゴール

**実は v2 時点で forge の主要視覚はモックと一致している**。本 v3 で直すべき差分は **ほぼ無い**。

実装後の見た目で、以下が満たされていること:

1. v2 で既に達成済みの見た目をそのまま維持する。
2. 既存テスト・ビルドが緑のままであることを再確認する。
3. iPhone SE / iPhone 16 / iPad mini の 3 視点で「要素が重ならない」「ページ全体スクロール無し」
   （`.list` だけが縦スクロール）。

---

## 5. 実装ステップ（差分のある部分だけ直す）

### Step 1 — 軽微な確認のみ

1. `pages-forge--default.png` と `pages-forge--recycle.png` を改めてモックと並べて差分が無いことを目視確認。
2. 万一細かい差分（パディング 1〜2px、色の hex 違い等）が見つかったら **その箇所だけ**を直す。
   - 例: `.row` の `padding: 12px 13px` を `padding: 11px 13px` に揃える等。
3. **「断片→インゴット変換」ボタンが現状 disabled になっている**（domain に変換関数が無いため）件:
   - モックも「断片10→銅1」チップで控えめに見せているだけで、実機能の実装はモック範疇外。
   - **v3 では現状の disabled のまま据え置く**。本格的な実装は別タスクで扱う。

### Step 2 — Storybook で確認

1. 既存の `Default` / `Recycle` ストーリーで強化タブ / リサイクルタブの見え方を確認。
2. 強化確認ダイアログの sparkle アニメ・+N → +M 表示・補足ボックスを確認。
3. 必要なら `ForgeConfirm` ストーリーを追加して、確認ダイアログを撮影。

### Step 3 — スクショ確認（任意）

ヘッドレス Chrome で `pages-forge--default` `pages-forge--recycle` を撮り直し、モック対比。

---

## 6. 検証（必須）

完了前に **すべて緑にする**:

```bash
yarn test       # vitest（既存テスト assert は変えない前提）
yarn lint       # eslint
yarn build      # bump-patch-version.mjs → tsc -b → vite build
```

`yarn build` を実行すると `docs/` と `package.json` のバージョンも更新される（CLAUDE.md 参照）。
**`docs/` と更新後 `package.json` も同じコミットに含めること**。

---

## 7. コミット

- 本タスクは差分がほぼ無いので、**実質的な変更が無ければ「No-op」として完了報告**してよい
  （無理に変更しない）。
- 軽微な調整があった場合のみコミットし、commit SHA を報告（push はしない）。
- コミットメッセージ例:
  - `style(forge): モック忠実化 v3 微調整（差分の取りこぼし無いことを確認）`
  - `chore(build): rebuild docs/ after forge v3 fixes`
- **No-op の場合**: 「forge は v2 で既にモックと一致しており、本 v3 で修正すべき差分は無かった」と
  報告するだけで OK。
