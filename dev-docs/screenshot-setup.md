# スクリーンショットの撮影環境構築について

Claude Code のクラウド実行環境（リモート実行環境）で、ヘッドレス Chrome を使って
画面のスクリーンショットを撮るための手順をまとめる。`CLAUDE.md` の実装方針
（「見た目はヘッドレス Chrome 等でスクリーンショットを撮り、セッション上でユーザーに共有する」）
を満たすための実務メモ。

> ⚠️ **撮影した画像（PNG 等）は git リポジトリ内に保存しない**（`CLAUDE.md` の方針）。
> 出力先は `/tmp` 等のリポジトリ外にする。このドキュメント（手順書）は記録として残してよい。

---

## 重要な前提（クラウド環境の事情）

- クラウド環境には **Playwright のブラウザがプリインストール済み**で、環境変数
  `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` が設定されている。
  - 例: `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`（フル Chromium）
  - 例: `/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`
- **`npx playwright install`（ブラウザのダウンロード）はネットワークポリシーでブロックされる**
  ことがある。新規ダウンロードに頼らず、**プリインストール済みバイナリを直接使う**こと。
- `npm`/`yarn` のパッケージ取得（`playwright-core` 等）は通る。

## ハマりどころ

1. **リビジョンの off-by-one**: インストールした `playwright-core` が要求する
   ブラウザのリビジョン（例: headless_shell `1193`）と、プリインストール済みの
   リビジョン（例: `1194`）が1つズレることがある。
   → `chromium.launch({ executablePath })` で **バイナリを直接指定**してレジストリ照合を回避する。
2. **`playwright-core` は CommonJS**: ESM の `import { chromium }` は失敗する。
   - `.cjs` で `const { chromium } = require(...)` を使う。
   - もしくは `.mjs` で `import pkg from '...'; const { chromium } = pkg;`。
3. **モジュール解決**: スクリプトをリポジトリ外（`/tmp`）に置くと `node_modules` を解決できない。
   - 絶対パスで `require('/path/to/repo/node_modules/playwright-core')` する、
     またはスクリプトをリポジトリ配下に置いて実行する。
4. **Web フォント（Noto Sans JP）がフォールバックになる**: 本環境は HTTPS を独自証明書で
   傍受しており、Google Fonts CDN（`fonts.googleapis.com` / `fonts.gstatic.com`）への接続が
   `net::ERR_CERT_AUTHORITY_INVALID` で失敗する。その結果、スクショだけ Noto Sans JP ではなく
   システムのフォールバックフォントで写ってしまう（**本番=実ブラウザでは正しく Noto になる**）。
   - **対策（必須）**: 撮影時は必ず以下の2点を行う。
     1. `browser.newContext({ ignoreHTTPSErrors: true })` で証明書エラーを無視し CDN を通す。
     2. スクショ前に `await page.evaluate(() => document.fonts.ready)` で **Web フォントの
        ロード完了を待つ**（`display=swap` のフォールバック→Noto 差し替えを待たないと混ざる）。

---

## 手順

### 1. playwright-core を入れる（一時的）

プリインストール済み Chromium のバージョンに近い `playwright-core` を入れる。
バージョンが多少ズレても、後述の `executablePath` 指定で動く。

```bash
yarn add -D playwright-core
```

> 撮影が終わったら `yarn remove playwright-core` で消し、Phase の成果物に混ぜないこと。

### 2. ブラウザのバイナリパスを確認する

リビジョン番号は環境更新で変わりうるので、毎回確認する。

```bash
find /opt/pw-browsers -path '*chrome-linux*' -name chrome
# 例: /opt/pw-browsers/chromium-1194/chrome-linux/chrome
```

### 3. dev サーバを起動する

```bash
yarn dev   # http://localhost:5173/sekaiju-like-game/ で起動（バックグラウンド推奨）
# ログに "Local:" / "ready in" が出たら準備完了
```

### 4. 撮影スクリプト（CommonJS）

`/tmp/shot.cjs` 等、**リポジトリ外**に置く。スマホ操作前提なのでモバイル幅で撮る。

```js
// /tmp/shot.cjs
const { chromium } = require('/home/user/sekaiju-like-game/node_modules/playwright-core');

// find /opt/pw-browsers -path '*chrome-linux*' -name chrome で確認したパス
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE = 'http://localhost:5173/sekaiju-like-game';

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: CHROME });
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 }, // スマホ相当
    deviceScaleFactor: 2,
    ignoreHTTPSErrors: true, // ★ CDN（Google Fonts）の証明書傍受を回避＝Noto Sans JP を通す
  });
  const page = await ctx.newPage();

  await page.goto(`${BASE}/title`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready); // ★ Web フォントのロード完了を待つ
  await page.waitForTimeout(300); // 念のため差し替えの安定待ち
  await page.screenshot({ path: '/tmp/shot-title.png' }); // 出力はリポジトリ外

  await browser.close();
  console.log('SHOTS_DONE');
})().catch((e) => { console.error(e); process.exit(1); });
```

> 撮影後、`document.fonts` に `status === 'loaded'` の face が複数あれば Noto Sans JP が
> 効いている証拠。0 件ならフォールバック表示になっているので上記2点を見直すこと。

```bash
node /tmp/shot.cjs
```

### 5. ユーザーへ共有・後片付け

- 撮った画像はセッション上でユーザーに共有する（リポジトリにはコミットしない）。
- 後片付け:
  ```bash
  pkill -f vite           # dev サーバ停止
  yarn remove playwright-core
  rm -f /tmp/shot*.cjs /tmp/*.png
  ```

---

## Storybook を撮る場合

コンポーネント単位の見た目確認は Storybook を使う。
`yarn storybook`（`-p 6006`）で起動し、各ストーリーの iframe URL
（`http://localhost:6006/iframe.html?id=<story-id>`）を上記スクリプトの `page.goto` に渡して撮る。
