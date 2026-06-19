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

/** 図鑑タブを開いた状態（モンスター一覧の初期表示確認用） */
export const CodexTab: Story = {
  decorators: [withGameContext(mockPostBoss, { name: 'codex' })],
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const buttons = canvasElement.querySelectorAll<HTMLElement>('button[class*="tab"]');
    // 「図鑑」ラベルを持つタブボタンを探してクリック
    for (const b of buttons) {
      if (b.textContent?.trim() === '図鑑') {
        b.click();
        break;
      }
    }
  },
};
