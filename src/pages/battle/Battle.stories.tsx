import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import { mockBattle } from '@/__stories__/mockSaves';

const meta = {
  title: 'Pages/Battle',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 戦闘画面（F2 エンカウント）。
 * mockBattle は diveState.pendingFoeBattle に敵が設定されており、
 * Page マウント後の useEffect で startBattle が走り戦闘が即立ち上がる。
 */
export const Default: Story = {
  decorators: [withGameContext(mockBattle, { name: 'battle' })],
};
