import { type Meta, type StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { SlotCard } from './SlotCard';

type T = typeof SlotCard;

export default {
  component: SlotCard,
  args: {
    slotIndex: 0,
    onContinue: fn(),
    onNewGame: fn(),
    onDelete: fn(),
  },
} satisfies Meta<T>;

// データありのスロット
export const Filled: StoryObj<T> = {
  args: {
    meta: {
      slot: 0,
      guildName: '黄昏の探索者',
      deepestReached: 13,
      level: 24,
      savedAt: Date.now(),
    },
  },
};

// 未踏破（始めたばかり）
export const FreshStart: StoryObj<T> = {
  args: {
    meta: {
      slot: 0,
      guildName: 'はじまりのギルド',
      deepestReached: 0,
      level: 1,
      savedAt: Date.now(),
    },
  },
};

// 空きスロット
export const Empty: StoryObj<T> = {
  args: {
    meta: null,
  },
};

// 破損データ
export const Corrupted: StoryObj<T> = {
  args: {
    meta: {
      slot: 0,
      guildName: '(破損データ)',
      deepestReached: 0,
      level: 0,
      savedAt: 0,
      corrupted: true,
    },
  },
};
