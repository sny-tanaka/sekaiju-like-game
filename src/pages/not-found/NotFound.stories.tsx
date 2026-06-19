import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

const meta = {
  title: 'Pages/NotFound',
  component: Page,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 不正遷移時の 404 フォールバック */
export const Default: Story = {};
