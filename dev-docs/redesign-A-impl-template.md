# 画面実装 sonnet 向け共通プロンプトテンプレ

ディレクターが各画面に sonnet を派遣するときの「最低限の共通条件」を 1 つにまとめたもの。画面ごとの差分は、派遣プロンプトで「対象画面」「ブランチ名」「指示書パス」を差し替えるだけで済むようにする。

---

## 派遣プロンプト雛形

```
本リポジトリのチェックアウト（あなたの worktree のカレントディレクトリ）で作業する実装エンジニアです。

## ブランチ / worktree

- 既にあなたの worktree は `feature/redesign-A-<画面名>` ブランチでチェックアウト済みです（カレントディレクトリ）。
- `node_modules` は親リポへのシンボリックリンクです。`yarn install` は不要。

## 担当画面

<画面名>

## 必読 (順番に通読)

1. `dev-docs/redesign-A.md` — テーマトークン全体 + §1.5 レイアウト運用ルール（厳守）
2. `dev-docs/redesign-A-title.md` および `dev-docs/redesign-A-title-fix.md` — title 画面の指示書（参考。実装パターンの相場感）
3. `dev-docs/redesign-A-<画面名>.md` — **本タスクの主指示書**。Step 0〜N に沿って実装する
4. `dev-docs/claude-design-brief.md` — 機能仕様の根拠

## 触ってよいファイル

主指示書「触ってよいファイル」セクションに列挙されたパスのみ。原則として:

- `src/pages/<画面名>/` 配下（index.tsx, style.module.scss, <Name>.stories.tsx, index.test.tsx, components/ など）
- 画面専用のサブコンポーネント（他画面が import していないもの）

## 触ってはいけないファイル

- `src/_variables.scss`、`src/_obsidian.scss`、`src/index.scss`、`index.html`
- 他画面の `src/pages/<other>/`
- 共通コンポーネント (`src/components/common/`, `src/components/creation/`, `src/components/AppUpdater/`, `src/components/CharacterPortrait/`)
- ドメイン (`src/domain/`)、ストア (`src/store/`)、audio (`src/audio/`)、hooks (`src/hooks/`)、ストーリー mock (`src/__stories__/`)
- テスト基盤 (`src/setupTests.ts`)、ビルド設定 (`vite.config.ts`, `tsconfig*.json`, `package.json` 等)
- ドメインロジックを伴う `src/data/` 配下

## やってはいけないこと

- 自分で Agent / Task を spawn しない（孫委譲禁止）。
- 自分の画面外のファイルを変更しない。コンフリクト原因になる。
- 既存テストの assert を変えない（文言一致など軽微な調整は OK だが、意図を変えない）。
- 機能ロジックを変更しない（再描画タイミング・コマンド遷移・store の呼び出しなど）。
- ゲームバランス（数値、計算式）には触らない。
- 「テストを通すため」にロジックや mock を改変しない。原因がスタイル変更にあるならスタイルで解決する。

## 機能優先方針

> デザイン指示の画面に現在ない機能が書かれている場合は機能を優先してデザイン通りにならないところがあっても構いません。

主指示書にもこの方針で「省略する要素」「維持する要素」が書いてあるので従う。判断に迷う場合は、現実装の機能を温存する側に倒す（モックを部分的に再現できなくてよい）。

## レイアウト（最重要）

- 絶対配置で画面を組まない。`display: flex; flex-direction: column;` で全画面の高さ (`100dvh`) 内に収める。
- ボタン群・ヘッダー・フッタを `flex-shrink: 0`、可変領域を `flex: 1 1 auto; min-height: 0;`。
- 必要なときは内部セクションだけ `overflow: auto;` でスクロール。**ページ全体はスクロールしない**。
- iPhone SE (375x667) と iPhone 16 (393x778) の両方で要素が重ならない。`clamp()` と `@media (max-height: 720px)` を活用。
- 装飾要素（浮遊粒子・モーダル backdrop）に限り絶対配置可。

## 検証

```
yarn lint
yarn test --run
yarn tsc -b
```

全部緑にする。

Storybook の視覚確認は不要（ディレクターが後でまとめて行う）。

## コミット

worktree 内で **1 コミット**にまとめる:

```
feat(redesign-A): apply 黒曜 OBSIDIAN MINIMAL theme to <画面名>

- rebuild <画面名> with flex column layout
- use --bg-*, --text-*, --gold-*, --danger-* tokens
- (画面固有の主要変更点を 2〜4 行で記載)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

push 不要。SHA を最終応答で報告。

## 報告

完了したら以下を **180 字以内** で簡潔に報告:

1. commit SHA
2. 変更ファイル数
3. lint / test / tsc の結果（PASS のみ書く。FAIL なら何が落ちたか）
4. 困った判断点（あれば 1〜2 行）

不明点が出たら、無理に憶測で進めず、最終応答で「未着手で残した点」として正直に書く。途中での質問は不要（ユーザーは介在しない）。
```

---

## ディレクター側の Agent 呼び出しコード（参考）

```ts
Agent({
  description: "redesign-A <画面> 実装",
  subagent_type: "claude",
  model: "sonnet",
  isolation: "worktree",   // 必須: 並列時のコンフリクト防止
  prompt: `<上の派遣プロンプト雛形 + 画面固有差分>`,
  run_in_background: true, // 並列のため
})
```

`isolation: "worktree"` を必ず付ける。worktree 名は自動 / ブランチ名は事前に切らない（Agent ツール側で「ブランチ未指定なら worktree を作る」挙動を期待）。worktree 完了後、ディレクターが parent repo で `git merge worktree/<id>` または cherry-pick で統合する。
