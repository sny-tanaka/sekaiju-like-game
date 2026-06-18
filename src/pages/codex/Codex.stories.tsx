import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import { mockPostBoss } from '@/__stories__/mockSaves';

const meta = {
  title: 'Pages/Codex',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 図鑑/記録（F5 ボス撃破後・到達記録あり） */
export const Default: Story = {
  decorators: [withGameContext(mockPostBoss, { name: 'codex' })],
};
