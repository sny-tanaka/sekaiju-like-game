import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from 'storybook/test';

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

/** リサイクルタブ表示 */
export const Recycle: Story = {
  decorators: [withGameContext(mockForge, { name: 'forge' })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'リサイクル' }));
  },
};

/** リサイクルタブで 2 件チェック → 一括分解バー表示 */
export const BulkSelected: Story = {
  decorators: [withGameContext(mockForge, { name: 'forge' })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'リサイクル' }));
    const checks = await canvas.findAllByRole('checkbox');
    if (checks[0]) await userEvent.click(checks[0]);
    if (checks[1]) await userEvent.click(checks[1]);
  },
};

/** 強化タブで銅+1 ボタン押下 → 確認ダイアログ */
export const ForgeConfirm: Story = {
  decorators: [withGameContext(mockForge, { name: 'forge' })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const copperBtn = (await canvas.findAllByRole('button')).find((b: HTMLElement) =>
      /^銅\+/.test(b.textContent ?? '')
    );
    if (copperBtn) await userEvent.click(copperBtn);
  },
};
