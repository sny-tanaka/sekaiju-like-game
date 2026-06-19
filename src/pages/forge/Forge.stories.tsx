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

/** 鍛冶屋（インゴット銅3/銀1・装備 4 個）— 強化タブ初期表示 */
export const Default: Story = {
  decorators: [withGameContext(mockForge, { name: 'forge' })],
};

/** リサイクルタブ（断片→インゴット変換ヒント付き） */
export const Recycle: Story = {
  decorators: [withGameContext(mockForge, { name: 'forge' })],
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const buttons = canvasElement.querySelectorAll<HTMLElement>('button');
    for (const b of buttons) {
      if (b.textContent?.trim() === 'リサイクル') {
        b.click();
        break;
      }
    }
  },
};

/** リサイクルタブ — 2 件チェック → 一括分解バー表示 */
export const BulkSelected: Story = {
  decorators: [withGameContext(mockForge, { name: 'forge' })],
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // リサイクルタブに切替
    const buttons = canvasElement.querySelectorAll<HTMLElement>('button');
    for (const b of buttons) {
      if (b.textContent?.trim() === 'リサイクル') {
        b.click();
        break;
      }
    }
    // チェックボックスを 2 件チェック
    await new Promise((r) => setTimeout(r, 50));
    const checkboxes = canvasElement.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    if (checkboxes[0]) checkboxes[0].click();
    if (checkboxes[1]) checkboxes[1].click();
  },
};

/** 強化確認ダイアログ（72px ItemSprite + ✦×3 sparkle + +N→+M） */
export const ForgeConfirm: Story = {
  decorators: [withGameContext(mockForge, { name: 'forge' })],
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // 銅ボタンをクリックして確認ダイアログを開く
    const ingotBtns = canvasElement.querySelectorAll<HTMLElement>('button[class*="ingotCopper"]');
    const first = ingotBtns[0];
    if (first) first.click();
  },
};
