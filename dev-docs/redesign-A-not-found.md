# フェーズ 2：not-found 画面リデザイン（sonnet 用指示書）

`dev-docs/redesign-A.md`（特に **§1.5 レイアウト運用ルール**）と
`dev-docs/redesign-A-title-fix.md`（flex column 化パターン）を **必ず先に読むこと**。
本ファイルは not-found（404 フォールバック）画面の取り込み手順を網羅した実装指示書。

絶対配置で `top` / `bottom` を直書きするのは禁止（装飾レイヤのみ例外）。**flex column 一本**で組む。

---

## 触ってよいファイル / 触ってはいけないファイル

以下 3 ファイルのみ。**他は絶対に変更しない**。

| 区分 | パス | 操作 |
| --- | --- | --- |
| 編集 | `src/pages/not-found/index.tsx` | 構造を黒曜テーマに合わせて刷新（章マーク / `？` エンブレム / `404` 大見出し / 本文 / 戻るボタン） |
| 編集 | `src/pages/not-found/style.module.scss` | 全面書き直し。`@use 'variables' as var;` を **削除**して `var(--*)` のみ参照 |
| 新規 | `src/pages/not-found/NotFound.stories.tsx` | Storybook ストーリー（`Default` 単一）を新規追加。既存ストーリーが無ければ作る |

### やってはいけないこと

- `src/_variables.scss` および写本テーマ系 SCSS 変数 (`$parchment`, `$ink`, `$rule`, `$verdant` 等) を新規参照しない。
- ロジック (`history.back()` 呼出し) を変えない。
- 共通コンポーネント (`InkSplatter` 等) は本画面では使わない。新規 import を増やさない。
- 自分でさらに `Agent` / `Task` を spawn しない（孫委譲禁止）。
- 既存テストがある場合は assert 文を変えない（`grep "not-found" src/pages/not-found` でテストファイルの有無を確認。無ければ新規作成しない）。
- ページ全体に `overflow-y: auto` をかけない。スクロール不要画面なので `overflow: hidden` を維持する。

---

## ゴール

Storybook の `Pages/NotFound / Default` ストーリーが、添付モック「案 A 黒曜 OBSIDIAN MINIMAL」の方向性で描画される:

- 章マーク `❦ 行方知れずの頁`（淡青 / 字間広め）が上端に出る。
- 中央に直径 ~120px の円輪（細い金線）で囲まれた明朝 `？` 字、薄い金色で `obsidian-glowPulse` でゆっくり脈動。
- 円輪の下に明朝 `404`（数字を装飾的に大書き）。
- その下に「お探しのページは / 見つかりませんでした。」を 2 行で表示（または `<br>` で改行）。
- 下端に金縁の「拠点へ戻る」ボタン（border + 金箔タイント background）。

iPhone SE / iPhone 16 のいずれでも要素が画面内に収まり重ならない。`yarn lint`・`yarn test --run`・`yarn tsc -b` が緑。

---

## モック原本との差分（機能優先で判断した点）

参考: `/tmp/sekaiju-design/案A_v2.dc.html` line 1126〜1140（10 番目のセクション `not-found`）。

### モック上にあるが省略する（機能要件に存在しない）

- **「？」エンブレム円輪と `404` 大書きの 2 段構成**は機能仕様 `claude-design-brief.md §4.10` には記載が無いが、**404 画面のフレーバーとして残す価値がある**ため採用する（モック準拠）。実害なし。
- **戻り先**: モックは「拠点へ戻る」、機能仕様は `history.back()` で「戻る」と書かれている。
  - **機能仕様を優先**: 戻り先を `history.back()` のままにする。ただし **ラベル文言**はモックの「拠点へ戻る」が現状ユーザーに親切（不正遷移時はだいたい town に戻したい）。
  - **判断**: ボタンラベルは既存と同じ「戻る」を維持する（`claude-design-brief.md §4.10 表示要素` に明記）。モックの「拠点へ戻る」は採用しない。

### モック上には描かれていないが機能上は維持する

- 戻るアクション (`history.back()`)。モックは静的画面なので onClick が無いが、機能要件としては必須。

---

## 実装ステップ

### Step 0. 事前読み込み

`dev-docs/redesign-A.md §1.1〜§1.6` のトークン、`§1.5` レイアウト運用ルール、`dev-docs/redesign-A-title-fix.md` の flex column パターンを頭に入れる。`src/_obsidian.scss` が既に `:root` に CSS 変数を流している前提。`obsidian-glowPulse` 等の keyframes も既存利用可能。

### Step 1. `index.tsx` の構造

```tsx
import styles from './style.module.scss';

export const Page = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <p className={styles.chapterMark}>❦ 行方知れずの頁</p>
      </header>

      <main className={styles.body}>
        <div className={styles.emblem} aria-hidden>
          <span className={styles.emblemRing} />
          <span className={styles.emblemMark}>？</span>
        </div>
        <p className={styles.code}>404</p>
        <p className={styles.message}>
          お探しのページは
          <br />
          見つかりませんでした。
        </p>
      </main>

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.back}
          onClick={() => history.back()}
        >
          戻る
        </button>
      </footer>
    </div>
  );
};
```

- ボタンラベル「戻る」と本文「お探しのページは見つかりませんでした。」は文言維持。改行は `<br />` で 2 行にする（モック準拠）。
- `aria-hidden` の `<div className={styles.emblem}>` は装飾。スクリーンリーダーには `？` を読ませない。

### Step 2. `style.module.scss` の全面置換

`@use 'variables' as var;` は **削除**。`var(--*)` を直接参照。

```scss
.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
  max-width: 560px;
  margin: 0 auto;
  padding: 32px 24px max(24px, env(safe-area-inset-bottom, 0px));
  overflow: hidden;
  background: radial-gradient(
    120% 80% at 50% 30%,
    var(--surface-panel),
    var(--bg-deep)
  );
  color: var(--text-base);
  font-family: var(--font-body);
  text-align: center;
  gap: 24px;
}

.head {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}

.chapterMark {
  margin: 0;
  font-family: var(--font-display);
  font-size: 13px;
  letter-spacing: 0.36em;
  color: var(--text-blue);
}

.body {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
}

.emblem {
  position: relative;
  width: clamp(96px, 28vw, 120px);
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.emblemRing {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid var(--rule-gold);
  animation: obsidian-glowPulse 5s ease-in-out infinite;
}

.emblemMark {
  position: relative;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(48px, 16vw, 64px);
  color: var(--gold);
  opacity: 0.55;
  line-height: 1;
}

.code {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(22px, 7vw, 26px);
  letter-spacing: 0.1em;
  color: var(--text-strong);
}

.message {
  margin: 0;
  font-size: clamp(13px, 3.6vw, 14px);
  line-height: 1.8;
  color: var(--text-faint);
}

.foot {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}

.back {
  width: clamp(180px, 56vw, 220px);
  height: 50px;
  border-radius: 3px;
  border: 1px solid var(--rule-gold-strong);
  background: var(--gold-tint);
  color: var(--gold);
  font-family: var(--font-body);
  font-size: 15px;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: background var(--motion-quick, 140ms cubic-bezier(.4, 0, .2, 1));
}

.back:hover {
  background: rgba(201, 168, 106, 0.16);
}

.back:active {
  background: rgba(201, 168, 106, 0.24);
}
```

#### 短画面対応

```scss
@media (max-height: 720px) {
  .layout { gap: 16px; padding-top: 24px; }
  .body { gap: 12px; }
}
```

#### モーション抑制

`obsidian-glowPulse` は `_obsidian.scss` 側で `prefers-reduced-motion: reduce` 時に no-op になっているので個別対応は不要。

### Step 3. Storybook ストーリー新規作成

`src/pages/not-found/NotFound.stories.tsx` を新規作成:

```tsx
import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

const meta = {
  title: 'Pages/NotFound',
  component: Page,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 不正遷移時の 404 フォールバック */
export const Default: Story = {};
```

`withGameContext` は不要（not-found は `useGameState` を参照しない）。decorators も付けない。

### Step 4. 検証

完了前に以下を回し、すべて緑であることを確認:

```
yarn lint
yarn test --run
yarn tsc -b
```

Storybook を一時起動し、`Pages/NotFound / Default` を目視確認:

- 章マーク・`？`円輪・`404`・本文・「戻る」ボタンの 5 要素が縦に整列し、画面中央に円輪と `404` がフォーカスされている。
- iPhone SE 相当（dvh ≒ 559）でもすべての要素が画面内に収まり、`overflow: hidden` のままスクロールせずに見える。
- `？` の脈動が `prefers-reduced-motion: reduce` で停止する（ブラウザの DevTools `Emulate CSS prefers-reduced-motion` で確認）。

スクリーンショットは撮らない（ディレクター側で撮影）。

### Step 5. コミット

ブランチは `feature/redesign-A-not-found` を新規に切る。完了後に 1 コミット作成し commit SHA を報告する。push はしない。

コミットメッセージ:

```
feat(theme): apply 黒曜 OBSIDIAN MINIMAL theme to not-found screen

- restyle not-found with obsidian gradient and pulsing ? emblem
- add 404 display heading per design mock
- introduce NotFound.stories.tsx (Default story)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## 想定 Q&A

- **ボタンラベルを「拠点へ戻る」に変えていい?**: ダメ。機能仕様は「戻る」+ `history.back()`。仕様変更を伴う変更はこのタスクのスコープ外。
- **`history.back()` で戻れない場合**: 元々 fallback 画面なのでそれは想定外動作。フォローはディレクター側で別タスクとして検討する。
- **`emblemMark` の `？` を全角にすべき?**: モックは半角の `？` を使っている (line 1133)。**全角の `？`** を採用するとモック準拠（モック側 `？` は U+FF1F）。半角 `?` ではない点に注意。
- **`<br />` でなく flex の改行にしたい**: モック準拠の `お探しのページは / 見つかりませんでした。` の 2 行構造を維持できれば自由。可読性が落ちなければ `<br />` のままで OK。
- **既存テストがある**: `find src/pages/not-found -name '*.test.*'` で確認。あれば文言一致を維持して通す。無ければ新規作成しない。
- **`emblemRing` を二重円輪にしたい**: モックは 1 重。仕様としてもシンプルが良いので 1 重のままにする。装飾を増やすなら別 PR で。
- **`overflow: hidden` のまま中身が画面に入らない**: `clamp()` 指定でフォントサイズと emblem サイズを画面幅に追随させているので、極端な縦小（dvh < 480）でない限り収まる。それでも溢れる場合は `@media (max-height: 600px)` でさらに `gap` を詰める。

不明点が出たら止めて報告すること。実装エージェントが自分で判断していい範囲は色味の細部のみ。構造分岐・文言・ロジックは指示書から外れてはいけない。
