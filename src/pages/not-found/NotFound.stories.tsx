import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import { mockEmpty } from '@/__stories__/mockSaves';

const meta = {
  title: 'Pages/NotFound',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 404 ページ */
export const Default: Story = {
  decorators: [withGameContext(mockEmpty)],
};
