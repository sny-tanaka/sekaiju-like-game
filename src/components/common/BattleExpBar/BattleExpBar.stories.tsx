import { type Meta, type StoryObj } from '@storybook/react-vite';

import { BattleExpBar } from './BattleExpBar';

type T = typeof BattleExpBar;

export default {
  component: BattleExpBar,
  title: 'common/BattleExpBar',
} satisfies Meta<T>;

// レベルアップなし（バーが少し伸びる）
export const Gain: StoryObj<T> = {
  args: { fromLevel: 5, fromExp: 100, gainedExp: 120, start: true },
};

// レベルアップあり（バーが一巡して次レベルへ）
export const LevelUp: StoryObj<T> = {
  args: { fromLevel: 5, fromExp: 400, gainedExp: 900, start: true },
};

// 経験値なし（戦闘不能などで静止）
export const NoGain: StoryObj<T> = {
  args: { fromLevel: 5, fromExp: 200, gainedExp: 0, start: true },
};

// 上限到達（MAX 表示）
export const Maxed: StoryObj<T> = {
  args: { fromLevel: 100, fromExp: 0, gainedExp: 0, start: true },
};
