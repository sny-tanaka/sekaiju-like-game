import { type Meta, type StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { MenuButton } from './MenuButton';

type T = typeof MenuButton;

export default {
  component: MenuButton,
  args: {
    onClick: fn(),
  },
} satisfies Meta<T>;

export const Primary: StoryObj<T> = {
  args: {
    label: 'ダイブ開始',
    description: 'タワーへ潜る',
    variant: 'primary',
  },
};

export const Default: StoryObj<T> = {
  args: {
    label: 'ギルド管理',
    description: '編成・キャラ作成',
  },
};

export const Disabled: StoryObj<T> = {
  args: {
    label: '鍛冶屋',
    description: 'Phase 4 で実装',
    disabled: true,
  },
};
