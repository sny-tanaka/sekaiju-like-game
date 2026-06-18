import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import { mockForge } from '@/__stories__/mockSaves';

const meta = {
  title: 'Pages/Forge',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 鍛冶屋（インゴット銅3/銀1・装備 4 個） */
export const Default: Story = {
  decorators: [withGameContext(mockForge, { name: 'forge' })],
};
