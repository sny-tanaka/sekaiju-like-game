import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import { mockBattle, mockBattleSkillMenu } from '@/__stories__/mockSaves';

const meta = {
  title: 'Pages/Battle',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE_LOG = [
  'てきが あらわれた！（1 ターン目）',
  'ランス の パワースラッシュ',
  'どうくつコウモリ に 42 のダメージ',
  'セラ の ヒール',
  'ランス の HP が 18 回復',
  'オン の ファイアボール',
  'どうくつコウモリ に 88 のダメージ（会心）',
  'どうくつコウモリ の つばさ攻撃',
  'ランス に 12 のダメージ',
  'セラ に 9 のダメージ',
];

/**
 * 戦闘画面（F2 エンカウント）。
 * mockBattle は diveState.pendingFoeBattle に敵が設定されており、
 * Page マウント後の useEffect で startBattle が走り戦闘が即立ち上がる。
 */
export const Default: Story = {
  decorators: [withGameContext(mockBattle, { name: 'battle' })],
  args: {
    __storyMockLogPreview: SAMPLE_LOG,
  },
};

/**
 * 戦闘画面（ログ短）。1 行だけのプレビューを確認する用。
 */
export const NoLog: Story = {
  decorators: [withGameContext(mockBattle, { name: 'battle' })],
};

/**
 * スキル選択画面。戦士が 5 スキルを習得済みで TP 20 想定。
 * 2 列レイアウト + TP 不足のスキルがグレーアウトされる様子を確認できる。
 */
export const SkillMenu: Story = {
  decorators: [withGameContext(mockBattleSkillMenu, { name: 'battle' })],
  args: {
    __storyMockOpenSkillMenu: true,
  },
};
