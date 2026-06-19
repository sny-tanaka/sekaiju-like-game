import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from 'storybook/test';

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

/** 売るタブ表示 */
export const Sell: Story = {
  decorators: [withGameContext(mockShop, { name: 'shop' })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: '売る' }));
  },
};

/** 買うタブで価格ボタン押下 → 購入確認ダイアログ */
export const BuyConfirm: Story = {
  decorators: [withGameContext(mockShop, { name: 'shop' })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 「N G」形式の価格ボタンを先頭から拾う
    const priceBtn = (await canvas.findAllByRole('button')).find((b: HTMLElement) =>
      /\d+ G$/.test(b.textContent ?? '')
    );
    if (priceBtn) await userEvent.click(priceBtn);
  },
};

/** 買うタブで装備行の名前ボタン押下 → 装備詳細モーダル */
export const EquipDetail: Story = {
  decorators: [withGameContext(mockShop, { name: 'shop' })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // nameBtn クラスを持つボタンをクリック
    const allButtons = await canvas.findAllByRole('button');
    const nameBtn = allButtons.find((b: HTMLElement) => b.className.includes('nameBtn'));
    if (nameBtn) await userEvent.click(nameBtn);
  },
};
