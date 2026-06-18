import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import { mockEmpty, mockWithParty } from '@/__stories__/mockSaves';

const meta = {
  title: 'Pages/Guild',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 団員ゼロ（作成フォームのみ表示） */
export const Empty: Story = {
  decorators: [withGameContext(mockEmpty, { name: 'guild' })],
};

/** 団員 3 名（一覧・編成タブ有効） */
export const WithMembers: Story = {
  decorators: [withGameContext(mockWithParty, { name: 'guild' })],
};
