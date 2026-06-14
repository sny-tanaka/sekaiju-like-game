import { type Meta, type StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { AppUpdater } from './AppUpdater';

type T = typeof AppUpdater;

export default {
  component: AppUpdater,
  args: {
    onApply: fn(),
  },
} satisfies Meta<T>;

// 新しいビルドがある場合（更新ボタン付き）
export const HasUpdate: StoryObj<T> = {
  args: {
    banner: { kind: 'has-update' },
  },
};

// 手動チェックで最新だった場合
export const UpToDate: StoryObj<T> = {
  args: {
    banner: { kind: 'up-to-date' },
  },
};
