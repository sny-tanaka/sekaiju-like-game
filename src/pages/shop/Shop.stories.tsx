import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import { mockShop } from '@/__stories__/mockSaves';

const meta = {
  title: 'Pages/Shop',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

/** ショップ（所持 G 5000・装備 5 個） */
export const Default: Story = {
  decorators: [withGameContext(mockShop, { name: 'shop' })],
};
