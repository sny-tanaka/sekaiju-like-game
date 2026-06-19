import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within } from 'storybook/test';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import { mockMidDive } from '@/__stories__/mockSaves';

const meta = {
  title: 'Pages/Dungeon',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

/** F2 探索中のダンジョン画面 */
export const Default: Story = {
  decorators: [withGameContext(mockMidDive, { name: 'dungeon' })],
};

/** ☰ メニューを開いた状態 */
export const Menu: Story = {
  decorators: [withGameContext(mockMidDive, { name: 'dungeon' })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => canvas.getByRole('button', { name: 'メニュー' }));
    await userEvent.click(canvas.getByRole('button', { name: 'メニュー' }));
    await waitFor(() => canvas.getByText('とじる（探索へ戻る）'));
  },
};

/** 道具を使う — アイテム選択 → bottom sheet で対象選択中 */
export const ItemUse: Story = {
  decorators: [withGameContext(mockMidDive, { name: 'dungeon' })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // メニューを開く
    await waitFor(() => canvas.getByRole('button', { name: 'メニュー' }));
    await userEvent.click(canvas.getByRole('button', { name: 'メニュー' }));
    await waitFor(() => canvas.getByText('道具を使う'));
    await userEvent.click(canvas.getByText('道具を使う'));
    // アイテムリストが表示されたら最初のアイテムをタップ
    await waitFor(() => canvas.getByText('所持アイテム'));
    const cards = canvasElement.querySelectorAll('button[class*="itemCard"]');
    if (cards.length > 0) {
      await userEvent.click(cards[0] as HTMLElement);
    }
    // bottom sheet が開くのを待つ
    await waitFor(() => canvas.getByText('もどる'));
  },
};

/** 階段の上に立ったときの inline 確認カード */
export const StairsConfirm: Story = {
  decorators: [withGameContext(mockMidDive, { name: 'dungeon' })],
  // 注: mockMidDive では通常スタート位置に立つため、実際に階段上にいるとは限らない。
  // 形を確認するためのストーリーとして配置。実際の階段状態は runtime に依存する。
};

/** 採集ポイントのアクションカード */
export const Gather: Story = {
  decorators: [withGameContext(mockMidDive, { name: 'dungeon' })],
  // 注: gatherPoint の有無はランダム生成フロアに依存するため、
  // 実際の採集ポイントはランダムに出る。形を確認するためのストーリーとして配置。
};
