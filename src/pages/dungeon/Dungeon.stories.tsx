import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import { mockMidDive, mockTavernMidDive } from '@/__stories__/mockSaves';

const meta = {
  title: 'Pages/Dungeon',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

/** F2 探索中のダンジョン画面 */
export const Default: Story = {
  decorators: [withGameContext(mockMidDive, { name: 'dungeon' })],
};

/** F3 探索中 + 受注中の依頼あり（達成済み/進行中が混在）。☰ → 「依頼」で確認できる。 */
export const QuestsInProgress: Story = {
  decorators: [withGameContext(mockTavernMidDive, { name: 'dungeon' })],
};
