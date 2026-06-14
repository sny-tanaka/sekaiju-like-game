import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-mcp'],
  framework: '@storybook/react-vite',
  // Storybook は ../vite.config.ts を自動継承するが、PWA プラグインは Storybook の
  // ランタイムバンドルが precache 上限(2MB)を超えてビルドを落とすため除外する。
  // (PWA は本番アプリ用であり Storybook では不要)
  viteFinal: async (viteConfig) => {
    const flat = (await Promise.all((viteConfig.plugins ?? []).flat(Infinity))).flat(Infinity);
    viteConfig.plugins = flat.filter((plugin) => {
      const name =
        plugin && typeof plugin === 'object' && 'name' in plugin ? String(plugin.name) : '';
      return !name.includes('pwa') && !name.includes('workbox');
    });
    return viteConfig;
  },
};
export default config;
