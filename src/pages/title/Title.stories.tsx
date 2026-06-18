import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import { mockEmpty, mockWithParty } from '@/__stories__/mockSaves';

const meta = {
  title: 'Pages/Title',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

/** セーブデータなし（新規状態）の表示 */
export const NoSave: Story = {
  decorators: [withGameContext(mockEmpty)],
};

/** セーブデータあり（つづきから・最初から どちらも表示） */
export const WithSave: Story = {
  decorators: [withGameContext(mockWithParty)],
};
