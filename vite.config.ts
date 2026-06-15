import { readFileSync } from 'node:fs';
import path from 'node:path';

import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vitest/config';

// GitHub Pages のサブパス公開に合わせる。リポジトリ名と一致させること。
// 例: https://<user>.github.io/sekaiju-like-game/
const BASE = '/sekaiju-like-game/';

// package.json の version を __APP_VERSION__ として注入する。
// `yarn build` の前段で scripts/bump-patch-version.mjs が patch を上げるので、
// 毎回のビルドで自動的に値が更新される。
const PKG_VERSION = JSON.parse(readFileSync(path.resolve(__dirname, './package.json'), 'utf8'))
  .version as string;

export default defineConfig({
  base: BASE,
  define: {
    __APP_VERSION__: JSON.stringify(PKG_VERSION),
  },
  plugins: [
    react(),
    VitePWA({
      // 新しいビルドが見つかったら、即時自動適用ではなく明示的なボタンで更新させる。
      // SW 登録は useRegisterSW（virtual:pwa-register/react）から行うため
      // injectRegister は false にして二重登録を防ぐ。
      registerType: 'prompt',
      injectRegister: false,
      includeAssets: ['favicon.ico', 'robots.txt', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: '世界樹ライク',
        short_name: '世界樹ライク',
        description: 'ダンジョン探索RPG風のゲーム',
        lang: 'ja',
        theme_color: '#e7f1d3',
        background_color: '#e7f1d3',
        display: 'standalone',
        start_url: BASE,
        scope: BASE,
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
        // 古いビルドのキャッシュエントリを削除して容量肥大化を防ぐ
        cleanupOutdatedCaches: true,
      },
      // 開発中も PWA を有効にしたい場合は devOptions.enabled: true にする。
      // 通常は古い SW がキャッシュを返して "変更が反映されない" 事故になりがちなので無効にしておく。
      devOptions: {
        enabled: false,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        // src を SCSS の load path に追加。`@use 'variables' as var;` のように書ける。
        loadPaths: [path.resolve(__dirname, './src')],
      },
    },
  },
  build: {
    // GitHub Pages の "Deploy from a branch / docs" で公開するため docs/ に出力する
    outDir: 'docs',
    emptyOutDir: true,
    sourcemap: false,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    // .claude/ 配下（Claude Code のエージェント worktree 作業領域）は走査しない
    exclude: ['**/node_modules/**', '**/dist/**', '.claude/**'],
  },
});
