# redesign-A — not-found（404 fallback）改訂版 v3 — 差分修正

`案A v2` モックを v2 実装が大筋取り込んだ後、ユーザーから **「まだデザインと異なる部分がある、しっかりレビューしてください」** との指摘を受けた残差分を埋めるための指示書。

- 元モック: `/tmp/sekaiju-design/案A_v2.dc.html` line 1125–1138（`10 not-found` セクション）
- 現状実装: `src/pages/not-found/index.tsx` + `src/pages/not-found/style.module.scss`
- 現状スクショ `/tmp/sekaiju-screenshots-current/pages-not-found--default.png` には **Storybook の `Couldn't find story matching 'pages-not-found--default'` エラー** が映っており、実画面は確認できなかった。本書はモック原本の CSS 値と現状 SCSS の数値比較で差分を抽出している（**ストーリーファイル不在の可能性が高い** → §3.G で対応）。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい
- `src/pages/not-found/style.module.scss` — §3 で挙げた差分のスタイル調整
- `src/pages/not-found/index.tsx` — JSX 構造は変えない（章マークの位置調整は SCSS 側で対応）。読み取り専用扱いで OK
- `src/pages/not-found/NotFound.stories.tsx` — **存在しなければ新規作成**（§3.G）

### 触ってはいけない（厳守）
- `src/_obsidian.scss`（トークン定義）
- `src/store/**`、`src/domain/**`（ナビゲーション / セーブ状態）
- `src/__stories__/**`（mock SaveData / decorator）
- 既存テスト
- 他ページ

---

## 2. やってはいけないこと

- **構造の再設計禁止**。現状の `layout > head + body(emblem + code + message) + foot(back)` を維持する。
- **絶対配置で組み直さない**。モック原本は章マークを `position:absolute; top:34px;` で配置しているが、redesign-A.md §1.5 のレイアウト運用ルール（絶対配置 + 固定 `top` / `bottom` で組まない）と衝突する。**flex の head として残し、`gap` / `margin` で位置だけ合わせる**。
- 機能の追加禁止（「タイトルへ戻る」「拠点へ戻る」の出し分けロジックは現状維持）。
- `index.tsx` の文字列（`❦ 行方知れずの頁`、`404`、お探しのページ文言）変更禁止 — モックの文言と一致しているため。

---

## 3. モックとの差分一覧

モック HTML 原本（line 1131–1136）の CSS 数値と現状 `style.module.scss` を 1 行ずつ突き合わせた結果。**v2 で取り込めていない項目だけ列挙**。

### A. 章マークの色

1. **章マークの色がモックより明るい**。
   - 現状: `.chapterMark { color: var(--text-blue); }` → `#7d8aa0`
   - モック: `color:#5b6475`（line 1132）。より暗く、青灰寄り。
   - **修正**: `.chapterMark { color: #5b6475; }` に直書き。
   - font-size 13px / letter-spacing 0.36em は **一致**（差分なし）。

### B. レイアウト全体のマージン構造

2. **`layout` の `gap: 24px` が章マーク → エンブレム間の距離を伸ばし、モックの構図と微妙にずれる**。
   - 現状: `.layout { padding: 34px 40px ...; gap: 24px; }`。章マーク (head) → body の間に 24px の gap が入る。
   - モック: 章マーク（top:34px の絶対配置）→ エンブレム（中央寄せ）まで「ほぼ全余白」。章マーク直下に決まった距離は無く、body 側で `display:flex;flex-direction:column;align-items:center;justify-content:center` で中央寄せ（line 1131）。
   - **修正**: `.layout { gap: 0; }` に変更。代わりに `.body` を `flex: 1 1 auto; min-height: 0; align-items: center; justify-content: center; gap: 0;` にし、エンブレム / コード / メッセージ間の距離は **個別 margin** で制御。

### C. エンブレム

3. **エンブレム円の border が濃すぎる**。
   - 現状: `.emblemRing { border: 1px solid var(--rule-gold); }` → 0.3
   - モック: `border:1px solid rgba(201,168,106,.25)`（line 1133）。
   - **修正**: `.emblemRing { border: 1px solid rgba(201, 168, 106, 0.25); }`。

4. **エンブレムサイズが clamp で可変（モックは固定 120px）**。
   - 現状: `.emblem { width: clamp(96px, 28vw, 120px); }`、`.emblemMark { font-size: clamp(48px, 16vw, 64px); }`
   - モック: `width:120px;height:120px` / `font-size:64px`（line 1133）。
   - **モック忠実度を最優先する方針（ユーザー指示）なので 固定 120px / 64px に直書き**。`clamp` を外す。
     - `.emblem { width: 120px; height: 120px; aspect-ratio: 1 / 1; margin-bottom: 34px; }`
     - `.emblemMark { font-size: 64px; }`
   - iPhone SE (375px) で 120px は許容範囲（左右 padding 40px x2 を引いた 295px 以内）。

5. **`emblemMark` の opacity 二重化**。
   - 現状: `color: var(--gold); opacity: 0.55;`
   - モック: `color:rgba(201,168,106,.55)`（line 1133）。
   - 視覚的にはほぼ同じだが、**モック準拠で書き換える**。
   - **修正**: `.emblemMark { color: rgba(201, 168, 106, 0.55); }` に変更し、`opacity: 0.55` を削除。

6. **エンブレムからの下マージン**。
   - 現状: `.emblem { margin-bottom: 16px; }` + 親 `.body { gap: 18px; }` = 合計 34px。
   - モック: `margin-bottom:34px`（line 1133）+ 親に gap 無し。
   - 計算結果は **同等**。§B-2 で gap を 0 にする修正と整合させ、`.emblem { margin-bottom: 34px; }` 単独で 34px を確保する。

### D. 「404」見出し

7. **`.code` の color が明るすぎる**。
   - 現状: `color: var(--text-strong);` → `#f2ede1`
   - モック: `color:#e8e6e0`（line 1134）。
   - **修正**: `.code { color: #e8e6e0; }` に直書き。

8. **`.code` の font-size が clamp**。
   - 現状: `font-size: clamp(22px, 7vw, 26px);`
   - モック: `font-size:26px`（line 1134）。
   - **修正**: `.code { font-size: 26px; }` に固定。

9. **`.code` の下マージン**（モックは `p` のデフォルト margin が 14px 入る）。
   - 現状: `.code { margin: 0; }` + 親 gap 18px。
   - モック: 親 gap 無し、`message` 側 `margin:14px 0 36px`（line 1135）。
   - **修正**: `.code { margin: 0; }` のまま、`.message` 側で `margin-top: 14px` を持たせる（次項）。

### E. メッセージ本文

10. **メッセージの上下 margin がモックの数値と異なる**（gap で吸収していた）。
    - 現状: `.message { margin: 0; font-size: clamp(13px, 3.6vw, 14px); line-height: 1.8; color: var(--text-faint); }`
    - モック: `margin:14px 0 36px;font-size:14px;color:#8c8a84;line-height:1.8`（line 1135）。
    - **修正**: `.message { margin: 14px 0 36px 0; font-size: 14px; line-height: 1.8; }`
    - color は `var(--text-faint)` = `#8c8a84` で **一致**（触らない）。
    - font-size の clamp を外し **14px 固定**。

### F. 戻るボタン

11. **ボタンサイズが clamp（モックは固定 200x50）**。
    - 現状: `.back { width: clamp(180px, 56vw, 220px); height: 50px; font-size: 15px; letter-spacing: 0.2em; }`
    - モック: `width:200px;height:50px;font-size:15px;letter-spacing:.2em`（line 1136）。
    - **修正**: `.back { width: 200px; height: 50px; font-size: 15px; }` に固定。letter-spacing は維持。
    - `border` / `background` / `color` は一致（`var(--rule-gold-strong)` / `var(--gold-tint)` / `var(--gold)`）。**触らない**。

### G. Storybook ストーリーの欠落

12. **`pages-not-found--default` ストーリーが見つからない**（現状スクショで `Couldn't find story matching` のエラー）。
    - 原因: `src/pages/not-found/NotFound.stories.tsx` が未作成、または `title` が `Pages/NotFound` ではない可能性。
    - **修正**: ファイルの有無を確認し、無ければ新規作成:
      ```tsx
      import type { Meta, StoryObj } from '@storybook/react';
      import { Page } from './index';
      import { withGameContext } from '@/__stories__/decorators';
      import { mockEmpty, mockWithParty } from '@/__stories__/mockSaves';

      const meta = {
        title: 'Pages/NotFound',
        component: Page,
        parameters: { layout: 'fullscreen' },
      } satisfies Meta<typeof Page>;
      export default meta;
      type Story = StoryObj<typeof meta>;

      /** セーブ無し → 「タイトルへ戻る」 */
      export const Default: Story = {
        decorators: [withGameContext(mockEmpty, { name: 'not-found' as never })],
      };

      /** セーブ有り → 「拠点へ戻る」 */
      export const FromTown: Story = {
        decorators: [withGameContext(mockWithParty, { name: 'not-found' as never })],
      };
      ```
    - 既存 `withGameContext` の `initialScreen` 引数の型に `not-found` が含まれない場合は **最小キャスト** (`as never`) で回避し、decorator 本体は触らない。
    - 既存ストーリーファイルがあって title だけ違うなら title を `Pages/NotFound` に修正する（その場合は他の修正は不要）。

### H. 短画面メディアクエリの整合

13. **`@media (max-height: 720px)` で `gap` を縮める指定が、§B-2 の `gap: 0` 化と矛盾**。
    - 現状: `@media (max-height: 720px) { .layout { gap: 16px; padding-top: 24px; } .body { gap: 12px; } .emblem { margin-bottom: 8px; } }`
    - **修正**: 短画面でも個別 margin で詰めるレシピに置き換え:
      ```scss
      @media (max-height: 720px) {
        .layout { padding-top: 24px; }
        .emblem { width: 96px; height: 96px; margin-bottom: 18px; }
        .emblemMark { font-size: 48px; }
        .code { font-size: 22px; }
        .message { margin: 10px 0 22px 0; }
      }
      ```

---

## 4. ゴール（Storybook ストーリー一覧）

| Story id | 期待結果 |
| --- | --- |
| `pages-notfound--default` | セーブ無し。「タイトルへ戻る」金箔ボタン。章マーク `❦ 行方知れずの頁` が画面上端寄り (`#5b6475`)。エンブレム 120px、border 0.25 の金。「？」が金茶 0.55。「404」26px `#e8e6e0`。 |
| `pages-notfound--from-town` | セーブ有り。「拠点へ戻る」金箔ボタン。それ以外は default と同じ。 |

---

## 5. 実装ステップ（差分のある部分だけを直す）

サブエージェント（sonnet）に以下を順に実行させる。**自分で Edit/Write/Bash を使って実装すること。さらにサブエージェント（Agent/Task）を spawn しないこと**。

### Step 1: ストーリーファイルの確認 / 作成（§3.G-12）
- `ls src/pages/not-found/NotFound.stories.tsx` で有無を確認。
- 無ければ §3.G-12 のスニペットを書き起こす。
- 有るが Storybook が認識していない場合は `title: 'Pages/NotFound'` になっているか確認。
- 型エラーが出たら **最小キャスト**で回避（`as never` 等）。decorator 本体や `mockSaves.ts` には触らない。

### Step 2: `style.module.scss` をピンポイント書き換え
- `.chapterMark { color: #5b6475; }`（§3.A-1）
- `.layout` の `gap: 24px;` を **削除**（§3.B-2）。
- `.body { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0; }`（gap を 0 に）
- `.emblem` を `width: 120px; height: 120px; aspect-ratio: 1 / 1; display: flex; align-items: center; justify-content: center; margin-bottom: 34px; position: relative;` に。clamp 廃止（§3.C-4）
- `.emblemRing` の border を `1px solid rgba(201, 168, 106, 0.25)`（§3.C-3）
- `.emblemMark` を `color: rgba(201, 168, 106, 0.55); font-size: 64px;`、`opacity` 削除（§3.C-5）
- `.code` を `font-size: 26px; color: #e8e6e0; margin: 0; letter-spacing: 0.1em;`（§3.D-7, D-8）
- `.message` を `margin: 14px 0 36px 0; font-size: 14px; line-height: 1.8;` （color は `var(--text-faint)` 維持、§3.E-10）
- `.back` を `width: 200px; height: 50px; font-size: 15px;`、letter-spacing 維持（§3.F-11）
- `@media (max-height: 720px)` を §3.H-13 のレシピで上書き

### Step 3: 検証 → コミット → commit SHA をディレクターへ報告

---

## 6. 検証

### 6.1 静的検証（必須・全部緑）
- `yarn test`
- `yarn lint`
- `yarn build`（`tsc -b` + `vite build`）

### 6.2 視覚回帰
- `yarn storybook --host 0.0.0.0`
- iPhone 14 (393x852) viewport で `Pages/NotFound` の `Default` / `FromTown` を撮影。
- モック原本 (`/tmp/sekaiju-design/案A_v2.dc.html` line 1131-1138) と並べて確認:
  - 章マーク `❦ 行方知れずの頁` が画面上端から 34px 付近、色 `#5b6475` の青灰。
  - エンブレム 120x120 が画面ほぼ中央、border が薄い金（0.25）、「？」が金茶 0.55。
  - 「404」が 26px、`#e8e6e0`。
  - メッセージ 14px、line-height 1.8、`#8c8a84` (= `var(--text-faint)`)。
  - 戻るボタン 200x50、金箔 tint。

### 6.3 スマホ実機確認
`yarn dev --host 0.0.0.0` → 存在しない URL（例: 内部状態を `not-found` に強制遷移）で fallback ページを直接開く。
- iPhone SE 相当の dvh で章マークが切れず、戻るボタンが safe-area 内に収まること。

---

## 7. コミット

最終コミットメッセージ例:

```
feat(not-found): redesign-A v3 — モック準拠で 404 ページを微調整

- 章マーク色を #7d8aa0 → #5b6475 に
- エンブレムを 120px 固定、border 0.3→0.25 に弱める
- 「？」マークを opacity 二重化から rgba 1 本に整理
- 「404」を #f2ede1 → #e8e6e0、font-size を 26px 固定
- メッセージ・戻るボタンのサイズを clamp から固定値に
- Storybook ストーリーを追加（無かった場合）
- 短画面メディアクエリを gap 廃止に合わせて再構成
```

- `yarn build` で `docs/` 更新後、`docs/` と `package.json` のバージョン bump をコミットに含める。
- **push はしない**。ディレクターが PR 作成時に push する。

---

## 追加トークン要求

`_obsidian.scss` への新規トークンは **不要**。`#5b6475` / `rgba(201,168,106,.25)` / `#e8e6e0` は not-found 固有の数値で、再利用見込みがあれば後フェーズで集約する。
