# スクリーンショットの撮影環境構築について

Claude Code のクラウド実行環境（リモート実行環境）やローカル macOS で、ヘッドレス Chrome を使って
画面のスクリーンショットを撮るための手順をまとめる。`CLAUDE.md` の実装方針
（「見た目はヘッドレス Chrome 等でスクリーンショットを撮り、セッション上でユーザーに共有する」）
を満たすための実務メモ。

> ⚠️ **撮影した画像（PNG 等）は git リポジトリ内に保存しない**（`CLAUDE.md` の方針）。
> 出力先は `/tmp` 等のリポジトリ外にする。このドキュメント（手順書）は記録として残してよい。

---

## TL;DR（恒久版）

`playwright-core` は **devDependencies に恒久的に含まれている**。
`yarn screenshot` 一発で EnemySprite / Battle / Codex の主要ストーリーを
`/tmp/sekaiju-screenshots/` に撮影できる。

```bash
yarn storybook &   # 別ターミナルか & でバックグラウンド起動
yarn screenshot    # 撮影実行
```

---

## 重要な前提（クラウド環境の事情）

- クラウド環境には **Playwright のブラウザがプリインストール済み**で、環境変数
  `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` が設定されている。
  - 例: `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`（フル Chromium）
  - 例: `/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`
- `scripts/screenshot.mjs` は `PLAYWRIGHT_BROWSERS_PATH` を自動検出するので、
  クラウド環境では追加設定なしで動く。
- **`npx playwright install`（ブラウザのダウンロード）はネットワークポリシーでブロックされる**
  ことがある。新規ダウンロードに頼らず、**プリインストール済みバイナリを直接使う**こと。
- `npm`/`yarn` のパッケージ取得（`playwright-core` 等）は通る。

## ハマりどころ

1. **リビジョンの off-by-one**: インストールした `playwright-core` が要求する
   ブラウザのリビジョン（例: headless_shell `1193`）と、プリインストール済みの
   リビジョン（例: `1194`）が1つズレることがある。
   → `chromium.launch({ executablePath })` で **バイナリを直接指定**してレジストリ照合を回避する。
2. **`playwright-core` は CommonJS**: ESM の `import { chromium }` は失敗する。
   - `.mjs` で `import pkg from 'playwright-core'; const { chromium } = pkg;` のスタイルを使う。
3. **モジュール解決**: スクリプトをリポジトリ外（`/tmp`）に置くと `node_modules` を解決できない。
   - `scripts/screenshot.mjs` はリポジトリ配下にあるので問題なし。
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

### 1. ローカル初回セットアップ（macOS / Linux ローカル開発者）

`playwright-core` は `yarn install` で自動的に入る（devDependencies 済み）。
ただし **ブラウザバイナリは別途インストールが必要**。

```bash
npx playwright install chromium
```

> クラウド環境では `/opt/pw-browsers` にプリインストール済みのため不要。
> `scripts/screenshot.mjs` が自動検出するので環境変数の設定も不要。

### 2. Storybook を起動する

```bash
yarn storybook   # http://localhost:6006 で起動（別ターミナル推奨）
```

`yarn screenshot` の実行前に起動していなければエラーメッセージが表示されて終了する。

### 3. 撮影を実行する

```bash
yarn screenshot
# → /tmp/sekaiju-screenshots/ に以下が出力される:
#     enemy-sprite-tier0.png
#     enemy-sprite-tier4.png
#     enemy-sprite-silhouette.png
#     battle.png
#     codex.png
```

### 4. 特定 URL を撮る（dev server 経由等）

Storybook 以外の URL も撮影できる。

```bash
yarn screenshot --url=http://localhost:5173/sekaiju-like-game/ --out=/tmp/title.png
```

- `--url`: 撮影対象の URL（Storybook 以外も可）
- `--out`: 出力先ファイルパス（省略時は `/tmp/sekaiju-screenshots/custom.png`）

---

## ブラウザバイナリの検出順（自動）

`scripts/screenshot.mjs` は以下の順で Chromium を探す:

1. `PLAYWRIGHT_CHROME_PATH` 環境変数（最優先）
2. `PLAYWRIGHT_BROWSERS_PATH` 配下（クラウド環境 `/opt/pw-browsers` 等）
3. `~/Library/Caches/ms-playwright/chromium-*/...` (macOS デフォルト)
4. `~/.cache/ms-playwright/chromium-*/...` (Linux デフォルト)
5. 見つからなければ `npx playwright install chromium` を案内して exit 1

---

## ユーザーへの共有

撮った画像はセッション上でユーザーに共有する（リポジトリにはコミットしない）。

```bash
# 共有後の後片付け（任意）
rm -f /tmp/sekaiju-screenshots/*.png
pkill -f storybook   # Storybook 停止
```
