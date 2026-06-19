import type { Meta, StoryObj } from '@storybook/react';

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

/** 団員 3 名（作成タブ・作成フォーム有効） */
export const WithMembers: Story = {
  decorators: [withGameContext(mockWithParty, { name: 'guild' })],
};

/** 一覧タブ（前衛/後衛/控えの色分け行） */
export const Roster: Story = {
  decorators: [withGameContext(mockWithParty, { name: 'guild' })],
  play: async ({ canvasElement }) => {
    // 一覧タブをクリック
    const canvas = canvasElement;
    const tabs = canvas.querySelectorAll('button');
    const rosterTab = Array.from(tabs).find((b) => b.textContent === '一覧');
    rosterTab?.click();
  },
};

/** 編成タブ（3列 grid） */
export const Party: Story = {
  decorators: [withGameContext(mockWithParty, { name: 'guild' })],
  play: async ({ canvasElement }) => {
    const canvas = canvasElement;
    const tabs = canvas.querySelectorAll('button');
    const partyTab = Array.from(tabs).find((b) => b.textContent === '編成');
    partyTab?.click();
  },
};

/** 編成タブ + ピッカー bottom sheet を開いた状態 */
export const PartyPicker: Story = {
  decorators: [withGameContext(mockWithParty, { name: 'guild' })],
  play: async ({ canvasElement }) => {
    const canvas = canvasElement;
    // 編成タブへ切替
    const tabs = canvas.querySelectorAll('button');
    const partyTab = Array.from(tabs).find((b) => b.textContent === '編成');
    partyTab?.click();
    // 少し待ってからスロットカードをクリック
    await new Promise((r) => setTimeout(r, 100));
    const slotCards = canvas.querySelectorAll('button');
    // ＋ボタン（空きスロット）を探す
    const emptySlot = Array.from(slotCards).find((b) => b.textContent?.includes('＋'));
    emptySlot?.click();
  },
};

/** 追放確認ダイアログ */
export const BanishConfirm: Story = {
  decorators: [withGameContext(mockWithParty, { name: 'guild' })],
  play: async ({ canvasElement }) => {
    const canvas = canvasElement;
    // 追放タブへ切替
    const tabs = canvas.querySelectorAll('button');
    const banishTab = Array.from(tabs).find((b) => b.textContent === '追放');
    banishTab?.click();
    // 少し待ってから最初の「追放」ボタンをクリック
    await new Promise((r) => setTimeout(r, 100));
    const buttons = canvas.querySelectorAll('button');
    const banishBtn = Array.from(buttons).find((b) => b.textContent === '追放');
    banishBtn?.click();
  },
};
