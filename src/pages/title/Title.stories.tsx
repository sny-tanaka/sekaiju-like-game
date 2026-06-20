import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import { mockEmpty, mockWithParty } from '@/__stories__/mockSaves';
import { seedCorruptedSave, seedEmpty, seedSaved } from '@/__stories__/seedSaveStore';

const meta = {
  title: 'Pages/Title',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

/** セーブデータなし（新規状態）の表示 */
export const NoSave: Story = {
  decorators: [seedEmpty(), withGameContext(mockEmpty)],
};

/** セーブデータあり（つづきから・最初から どちらも表示） */
export const WithSave: Story = {
  decorators: [seedSaved(mockWithParty), withGameContext(mockWithParty)],
};

/** 破損データの警告カード表示 */
export const Corrupted: Story = {
  decorators: [seedCorruptedSave(), withGameContext(mockWithParty)],
};

/**
 * ギルド名入力画面 — 新規（NoSave 状態で「最初から」を 1 回押した後）
 */
export const GuildNameInput: Story = {
  decorators: [seedEmpty(), withGameContext(mockEmpty)],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() =>
      expect(canvas.getByRole('button', { name: '最初から' })).toBeInTheDocument()
    );
    await userEvent.click(canvas.getByRole('button', { name: '最初から' }));
    await waitFor(() => expect(canvas.getByPlaceholderText('ななしのギルド')).toBeInTheDocument());
  },
};

/**
 * 上書き確認ダイアログ — 既存セーブあり状態で「最初から」を押した後
 */
export const OverwriteConfirm: Story = {
  decorators: [seedSaved(mockWithParty), withGameContext(mockWithParty)],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() =>
      expect(canvas.getByRole('button', { name: '最初から' })).toBeInTheDocument()
    );
    await userEvent.click(canvas.getByRole('button', { name: '最初から' }));
    await waitFor(() => expect(canvas.getByText('最初から始めますか？')).toBeInTheDocument());
  },
};

/**
 * サウンド設定パネル — ⚙ボタン押下後
 */
export const SoundPanel: Story = {
  decorators: [seedSaved(mockWithParty), withGameContext(mockWithParty)],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() =>
      expect(canvas.getByRole('button', { name: 'サウンド設定' })).toBeInTheDocument()
    );
    await userEvent.click(canvas.getByRole('button', { name: 'サウンド設定' }));
    await waitFor(() => expect(canvas.getByText('設定')).toBeInTheDocument());
  },
};
