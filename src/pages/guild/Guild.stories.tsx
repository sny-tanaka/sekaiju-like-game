import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from 'storybook/test';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import { mockEmpty, mockWithParty } from '@/__stories__/mockSaves';

const meta = {
  title: 'Pages/Guild',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 団員ゼロ（作成フォームのみ表示） */
export const Empty: Story = {
  decorators: [withGameContext(mockEmpty, { name: 'guild' })],
};

/** 団員 3 名（一覧・編成タブ有効） */
export const WithMembers: Story = {
  decorators: [withGameContext(mockWithParty, { name: 'guild' })],
};

/** 一覧タブ */
export const Roster: Story = {
  decorators: [withGameContext(mockWithParty, { name: 'guild' })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('tab', { name: '一覧' }));
  },
};

/** 編成タブ */
export const Party: Story = {
  decorators: [withGameContext(mockWithParty, { name: 'guild' })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('tab', { name: '編成' }));
  },
};

/** 編成タブ + ピッカー展開（前衛スロットをクリック） */
export const PartyPicker: Story = {
  decorators: [withGameContext(mockWithParty, { name: 'guild' })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('tab', { name: '編成' }));
    // 前衛1スロット（最初のスロットボタン）をクリック
    const slots = await canvas.findAllByText(/前衛1|＋ 前衛1/);
    if (slots[0]) await userEvent.click(slots[0]);
  },
};

/** 追放タブ + 確認ダイアログ展開 */
export const BanishConfirm: Story = {
  decorators: [withGameContext(mockWithParty, { name: 'guild' })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('tab', { name: '追放' }));
    // 最初の追放ボタンをクリック
    const banishBtns = await canvas.findAllByRole('button', { name: '追放' });
    if (banishBtns[0]) await userEvent.click(banishBtns[0]);
  },
};
