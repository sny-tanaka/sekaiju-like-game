import { type Meta, type StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { SaveCard } from './SaveCard';

type T = typeof SaveCard;

export default {
  component: SaveCard,
  args: {
    onContinue: fn(),
  },
} satisfies Meta<T>;

// 進行中のセーブ
export const InProgress: StoryObj<T> = {
  args: {
    meta: {
      guildName: '黄昏の探索者',
      deepestReached: 13,
      memberCount: 5,
      savedAt: Date.now(),
    },
  },
};

// 始めたばかり（団員 0 人・未踏破）
export const FreshStart: StoryObj<T> = {
  args: {
    meta: {
      guildName: 'はじまりのギルド',
      deepestReached: 0,
      memberCount: 0,
      savedAt: Date.now(),
    },
  },
};

// 破損データ
export const Corrupted: StoryObj<T> = {
  args: {
    meta: {
      guildName: '(破損データ)',
      deepestReached: 0,
      memberCount: 0,
      savedAt: 0,
      corrupted: true,
    },
  },
};
