# sekaiju-like-game

世界樹ライク — ダンジョン探索 RPG 風のゲーム。
GitHub Pages で公開する SPA / PWA。

- 公開 URL: https://&lt;user&gt;.github.io/sekaiju-like-game/
- フレームワーク: Vite 6 + React 19 + TypeScript 5
- ルーティング: React Router 7（サブパス公開対応）
- スタイル: Sass (SCSS module)
- テスト: Vitest + Testing Library
- PWA: `vite-plugin-pwa` + Workbox（マニフェスト + Service Worker を自動生成）

> ゲーム本体はこれから実装します。現状はフレームワーク（PWA / 自動バージョン bump / 更新通知 / コード雛形ジェネレータ等）が整った状態です。

## セットアップ

Node 22 系（`.node-version` で固定）。Yarn 1（classic）。

```bash
yarn install
```

`preinstall` で `.node-version` と一致するか Node バージョンチェックが走ります。

## 開発

```bash
yarn dev          # http://localhost:5173/sekaiju-like-game/ で起動
yarn test         # Vitest（一回実行）
yarn test:watch   # Vitest watch モード
yarn lint         # ESLint
yarn fix          # ESLint 自動修正
yarn format       # Prettier 適用
yarn format:check # Prettier チェックのみ
```

> Service Worker は **本番ビルドのみ有効**です（`vite.config.ts` の `devOptions.enabled: false`）。古い SW がキャッシュを返して "変更が反映されない" 事故を避けるため。dev で SW をテストしたい場合は `true` に変更し、確認後は必ず元に戻すこと。

`pre-commit` フックで `yarn fix` と `yarn lint-staged` が走ります（Husky v9）。

## ビルド & GitHub Pages デプロイ

```bash
yarn build
```

実行内容:

1. `scripts/bump-patch-version.mjs` で `package.json` の patch を 1 つ上げる（git tag/コミットはしない）
2. `tsc -b` で型チェック
3. `vite build` で `docs/` に成果物を出力（`sw.js`、`manifest.webmanifest` などのプリキャッシュ）

ビルド時の `package.json` の version は `vite.config.ts` の `define` 経由で `__APP_VERSION__` として注入されます。

その後 `package.json` と `docs/` をまとめてコミット → push。GitHub の Settings → Pages で `Deploy from a branch / main / /docs` を選んでおけば自動公開されます。

> `vite.config.ts` の `BASE`（`/sekaiju-like-game/`）と `src/main.tsx` の `basename`、`package.json` の `name` はリポジトリ名と一致している必要があります。サブパスがずれると JS / CSS / 画像 / SW スコープが全て壊れます。

### PWA の更新通知

`registerType: 'prompt'` 設定なので、新しいビルドが見つかっても自動では適用されません。
更新検出・手動チェック・適用をまとめて扱う [`useAppUpdate`](src/hooks/useAppUpdate.ts) フックと、画面下に「新しいバージョンがあります／更新」のトーストを出す [`AppUpdater`](src/components/AppUpdater/AppUpdater.tsx) コンポーネントを用意しています。アプリのレイアウトで以下のように 1 度だけマウントして使います:

```tsx
const { banner, checkForUpdate, isChecking, applyUpdate } = useAppUpdate();
// ...
<AppUpdater banner={banner} onApply={applyUpdate} />
```

ユーザーが更新ボタンを押すと `skipWaiting` → `clientsClaim` → ページ再読み込みが走り、最新ビルドに切り替わります。定期的なバックグラウンドチェックは行いません（必要なら `useRegisterSW({ onRegisteredSW })` の callback で `setInterval(() => registration.update(), N)` を追加するだけ）。

## アイコン画像

`public/` に以下のアイコンを置きます:

- `favicon.ico`（ブラウザタブ用。`index.html` の `<link rel="icon">` で参照）
- `icon-192.png`（192×192）
- `icon-512.png`（512×512、PWA splash 用 / maskable 兼用）

ファイル名やパスを変える場合は `index.html` の `<link rel="icon">`、`vite.config.ts` の `manifest.icons` と `includeAssets` も合わせて変更してください。

## コード雛形ジェネレータ（plop）

```bash
yarn plop component   # src/components/<dir>/<Name>/{Name.tsx, style.module.scss[, Name.stories.ts]}
yarn plop page        # src/pages/<dir>/{index.tsx, style.module.scss}
yarn plop logic       # src/logics/<name>/{<name>.ts, <name>.test.ts}
yarn plop api         # src/api/<name>.ts + src/types/<typeName>.ts
yarn plop type        # src/types/<name>.ts
```

雛形本体は `templates/*.hbs`。

## ディレクトリ構成

```
.
├── .husky/                  # Git hooks (pre-commit で fix + lint-staged)
├── .github/
│   └── pull_request_template.md
├── public/
│   ├── favicon.ico                   # ブラウザタブ用 favicon
│   ├── icon-192.png / icon-512.png   # PWA アイコン
│   └── robots.txt
├── scripts/
│   └── bump-patch-version.mjs        # build 前に package.json の patch を +1
├── src/
│   ├── main.tsx             # エントリポイント (BrowserRouter basename="/sekaiju-like-game")
│   ├── App.tsx              # 最小ルーティング（Home + NotFound）
│   ├── index.scss           # グローバル reset
│   ├── _variables.scss      # SCSS 変数とブレークポイント mixin
│   ├── components/
│   │   └── AppUpdater/      # PWA 更新トーストバナー
│   ├── hooks/
│   │   └── useAppUpdate.ts  # SW 更新検出 / 手動チェック / 適用
│   ├── pages/
│   │   ├── home/
│   │   └── not-found/
│   ├── setupTests.ts        # Vitest 用セットアップ (jest-dom)
│   └── vite-env.d.ts
├── templates/               # plop の hbs 雛形
├── docs/                    # ビルド出力（GitHub Pages 公開元）
├── index.html               # Vite のエントリ HTML（ルート直下）
├── vite.config.ts           # Vite + PWA + Vitest 設定
├── eslint.config.js         # ESLint v9 flat config
├── tsconfig.json            # 親（references のみ）
├── tsconfig.app.json        # アプリ用（src/）
├── tsconfig.node.json       # vite.config.ts 用
└── check-node-version.sh    # preinstall で実行
```

## SCSS の import

`src/` を SCSS の load path に入れているので、変数モジュールは prefix なしで `@use` できます：

```scss
@use 'variables' as var;

.foo {
  color: var.$primary;
}
```

別ファイルを参照する場合は通常通り相対パス or `@/...` 形式を使ってください。
