import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import { mockEmpty, mockWithParty } from '@/__stories__/mockSaves';

const meta = {
  title: 'Pages/NotFound',
  component: Page,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

/** セーブ無し → 「タイトルへ戻る」 */
export const Default: Story = {
  decorators: [withGameContext(mockEmpty)],
};

/** セーブ有り → 「拠点へ戻る」 */
export const FromTown: Story = {
  decorators: [withGameContext(mockWithParty)],
};
