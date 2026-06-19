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

/** ショップ（所持 G 5000・装備 5 個）— 買うタブ初期表示 */
export const Default: Story = {
  decorators: [withGameContext(mockShop, { name: 'shop' })],
};

/** 売るタブ（装備個体プール） */
export const Sell: Story = {
  decorators: [withGameContext(mockShop, { name: 'shop' })],
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // 「売る」タブをクリック
    const buttons = canvasElement.querySelectorAll<HTMLElement>('button');
    for (const b of buttons) {
      if (b.textContent?.trim() === '売る') {
        b.click();
        break;
      }
    }
  },
};

/** 購入ダイアログ ＋ coin pop FX（リスト先頭の価格ボタンをクリック） */
export const BuyConfirm: Story = {
  decorators: [withGameContext(mockShop, { name: 'shop' })],
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // class に "action" を含む最初のボタンをクリックして購入ダイアログを開く
    const actionBtns = canvasElement.querySelectorAll<HTMLElement>('button[class*="action"]');
    const first = actionBtns[0];
    if (first) first.click();
  },
};

/** 装備詳細モーダル（装備行の名前ボタンをクリック） */
export const EquipDetail: Story = {
  decorators: [withGameContext(mockShop, { name: 'shop' })],
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // class に "nameBtn" を含む最初のボタンをクリックして装備詳細モーダルを開く
    const nameBtns = canvasElement.querySelectorAll<HTMLElement>('button[class*="nameBtn"]');
    const first = nameBtns[0];
    if (first) first.click();
  },
};
