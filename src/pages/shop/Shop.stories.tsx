import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import { mockShop, mockShopWithEquipped } from '@/__stories__/mockSaves';

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

/** 売るタブ（装備中ロック行あり） */
export const Sell: Story = {
  decorators: [withGameContext(mockShopWithEquipped, { name: 'shop' })],
};

// ============================================================
// mockShopExchange — mockShop + 所持✦150 + 換金アイテム所持（交換所タブ確認用。v3.0.0 §10.3）
// ============================================================
const mockShopExchange = {
  ...mockShop,
  guild: {
    ...mockShop.guild,
    gems: 150,
    storage: [
      ...mockShop.guild.storage,
      { itemId: 'item_gem_shard' as const, qty: 4 },
      { itemId: 'item_gem_stone' as const, qty: 2 },
      { itemId: 'item_gem_cluster' as const, qty: 1 },
    ],
  },
};

/** 交換所タブ（✦150所持・換金アイテム所持。ジェム限定装備の disabled/有効を確認） */
export const Exchange: Story = {
  decorators: [withGameContext(mockShopExchange, { name: 'shop' })],
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const buttons = canvasElement.querySelectorAll<HTMLElement>('button');
    for (const b of buttons) {
      if (b.textContent?.trim() === '交換所') {
        b.click();
        break;
      }
    }
  },
};
