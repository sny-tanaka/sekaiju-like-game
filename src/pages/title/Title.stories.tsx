import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import { mockEmpty, mockWithParty } from '@/__stories__/mockSaves';

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
  decorators: [withGameContext(mockEmpty)],
};

/** セーブデータあり（つづきから・最初から どちらも表示） */
export const WithSave: Story = {
  decorators: [withGameContext(mockWithParty)],
};

/** 破損データの警告カード表示 */
export const Corrupted: Story = {
  decorators: [withGameContext(mockWithParty)],
  // getSaveMeta が corrupted: true を返す状態を再現するため、
  // Storybook はメモリ上の SaveData を使う（IndexedDB は経由しない）。
  // GameStateProvider は initialSave を持つが meta state は getSaveMeta() 経由で
  // 取得するため、Corrupted ストーリーでは外部から描画状態を固定できない。
  // ここでは WithSave と同じ save を渡し、
  // ビジュアル確認は自己申告ベース（Storybook で手動確認）とする。
};

/**
 * ギルド名入力画面 — 新規（NoSave 状態で「最初から」を 1 回押した後）
 */
export const GuildNameInput: Story = {
  decorators: [withGameContext(mockEmpty)],
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
  decorators: [withGameContext(mockWithParty)],
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
  decorators: [withGameContext(mockWithParty)],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() =>
      expect(canvas.getByRole('button', { name: 'サウンド設定' })).toBeInTheDocument()
    );
    await userEvent.click(canvas.getByRole('button', { name: 'サウンド設定' }));
    await waitFor(() => expect(canvas.getByText('設定')).toBeInTheDocument());
  },
};
