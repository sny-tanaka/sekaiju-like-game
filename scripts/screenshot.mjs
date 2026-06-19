// Storybook の代表ストーリーをスクリーンショット撮影するスクリプト（恒久版）。
// playwright-core が devDependencies に含まれているため、yarn screenshot で直接実行できる。
//
// 使い方:
//   yarn storybook          # 別ターミナルで先に起動しておく（http://localhost:6006）
//   yarn screenshot         # 代表ストーリーを /tmp/sekaiju-screenshots/ に撮影
//   yarn screenshot --url=http://localhost:5173/sekaiju-like-game/ --out=/tmp/custom.png
//
// ブラウザバイナリの検出順:
//   1. PLAYWRIGHT_CHROME_PATH 環境変数
//   2. PLAYWRIGHT_BROWSERS_PATH 配下 (クラウド環境: /opt/pw-browsers 等)
//   3. ~/Library/Caches/ms-playwright/ 配下 (macOS)
//   4. ~/.cache/ms-playwright/ 配下 (Linux)
//   5. 見つからなければ `npx playwright install chromium` を案内して exit 1

import { existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { execSync } from 'node:child_process';

import pkg from 'playwright-core';

const { chromium } = pkg;

// ---------- 定数 ----------

const STORYBOOK_BASE = 'http://localhost:6006';
const DEFAULT_OUT_DIR = '/tmp/sekaiju-screenshots';
const VIEWPORT = { width: 390, height: 844 }; // スマホ相当 (iPhone 14 Pro)

/** 撮影する代表ストーリー一覧 */
const STORIES = [
  { id: 'common-enemysprite--all-tier-0', file: 'enemy-sprite-tier0.png' },
  { id: 'common-enemysprite--all-tier-4', file: 'enemy-sprite-tier4.png' },
  { id: 'common-enemysprite--silhouette', file: 'enemy-sprite-silhouette.png' },
  { id: 'pages-battle--default',          file: 'battle.png' },
  { id: 'pages-codex--default',           file: 'codex.png' },
];

// ---------- 引数パース ----------

function parseArgs(argv) {
  const args = {};
  for (const arg of argv) {
    const m = arg.match(/^--([^=]+)=(.*)$/s);
    if (m) args[m[1]] = m[2];
  }
  return args;
}

const rawArgs = parseArgs(process.argv.slice(2));
const customUrl = rawArgs['url'] ?? null;
const outFile = rawArgs['out'] ?? null;
const outDir = outFile ? dirname(outFile) : DEFAULT_OUT_DIR;

// ---------- ブラウザバイナリ検出 ----------

/**
 * searchDir 配下を find コマンドで探す。
 * Playwright のバージョンによりディレクトリ構造が変わるため、
 * ファイル名で検索する方が確実。
 */
function findInDir(searchDir, names) {
  if (!existsSync(searchDir)) return null;
  const nameArgs = names.map((n) => `-name "${n}"`).join(' -o ');
  try {
    const result = execSync(
      `find "${searchDir}" -maxdepth 10 -type f \\( ${nameArgs} \\) 2>/dev/null | head -1`,
      { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] },
    ).trim();
    return result || null;
  } catch {
    return null;
  }
}

function detectChromePath() {
  // (a) 明示指定
  if (process.env.PLAYWRIGHT_CHROME_PATH) {
    const p = process.env.PLAYWRIGHT_CHROME_PATH;
    if (existsSync(p)) return p;
    console.error(`[screenshot] PLAYWRIGHT_CHROME_PATH が見つかりません: ${p}`);
    return null;
  }

  // (b) PLAYWRIGHT_BROWSERS_PATH 配下（クラウド環境）
  const browsersPath = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (browsersPath && existsSync(browsersPath)) {
    // Linux クラウド環境の chrome / headless_shell, macOS なら Chromium 等
    const found = findInDir(browsersPath, ['chrome', 'headless_shell', 'Chromium', 'Google Chrome for Testing']);
    if (found) return found;
  }

  const home = homedir();

  // (c) macOS デフォルト
  const macDir = `${home}/Library/Caches/ms-playwright`;
  if (existsSync(macDir)) {
    const found = findInDir(macDir, ['Chromium', 'Google Chrome for Testing']);
    if (found) return found;
  }

  // (d) Linux デフォルト
  const linuxDir = `${home}/.cache/ms-playwright`;
  if (existsSync(linuxDir)) {
    const found = findInDir(linuxDir, ['chrome', 'Chromium', 'Google Chrome for Testing']);
    if (found) return found;
  }

  return null;
}

// ---------- Storybook 起動確認 ----------

async function checkStorybook() {
  try {
    const res = await fetch(`${STORYBOOK_BASE}/iframe.html`);
    return res.ok;
  } catch {
    return false;
  }
}

// ---------- 撮影処理 ----------

async function captureUrl(page, url, outputPath) {
  await page.goto(url, { waitUntil: 'networkidle' });
  // eslint-disable-next-line no-undef
  await page.evaluate(() => document.fonts.ready); // ★ Noto Sans JP ロード待ち
  await page.waitForTimeout(300);                  // ★ フォント差し替えの安定待ち
  await page.screenshot({ path: outputPath, fullPage: false });
  console.log(`  [ok] ${outputPath}`);
}

// ---------- メイン ----------

(async () => {
  // ブラウザバイナリ検出
  const executablePath = detectChromePath();
  if (!executablePath) {
    console.error('[screenshot] Chromium が見つかりませんでした。');
    console.error('  ローカル初回セットアップ: npx playwright install chromium');
    console.error('  クラウド環境: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers が自動検出されます');
    process.exit(1);
  }
  console.log(`[screenshot] Chromium: ${executablePath}`);

  // カスタム URL モード
  if (customUrl) {
    console.log(`[screenshot] カスタム URL モード: ${customUrl}`);
    const dest = outFile ?? join(DEFAULT_OUT_DIR, 'custom.png');
    mkdirSync(dirname(dest), { recursive: true });

    const browser = await chromium.launch({ headless: true, executablePath });
    const ctx = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: 2,
      ignoreHTTPSErrors: true,
    });
    const page = await ctx.newPage();
    await captureUrl(page, customUrl, dest);
    await browser.close();
    console.log(`[screenshot] 完了: ${dest}`);
    return;
  }

  // Storybook モード
  const storybookUp = await checkStorybook();
  if (!storybookUp) {
    console.error(`[screenshot] Storybook (${STORYBOOK_BASE}) が起動していません。`);
    console.error('  先に別ターミナルで `yarn storybook` をバックグラウンド起動してください。');
    process.exit(1);
  }

  mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true, executablePath });
  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    ignoreHTTPSErrors: true, // ★ Google Fonts CDN の証明書傍受を回避（クラウド環境）
  });
  const page = await ctx.newPage();

  console.log(`[screenshot] 撮影開始 (${STORIES.length} 件) → ${outDir}`);
  for (const { id, file } of STORIES) {
    const url = `${STORYBOOK_BASE}/iframe.html?id=${id}&viewMode=story`;
    const dest = join(outDir, file);
    process.stdout.write(`  ${id} ... `);
    try {
      await captureUrl(page, url, dest);
    } catch (err) {
      console.error(`\n  [error] ${id}: ${err.message}`);
    }
  }

  await browser.close();
  console.log(`\n[screenshot] 完了 → ${outDir}`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
