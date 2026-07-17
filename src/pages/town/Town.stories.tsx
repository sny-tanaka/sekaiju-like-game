import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import {
  mockEmpty,
  mockMidDive,
  mockPostBoss,
  mockTavern,
  mockWithParty,
} from '@/__stories__/mockSaves';

const meta = {
  title: 'Pages/Town',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 団員ゼロ（ギルド管理へ誘導されるヒント表示） */
export const EmptyGuild: Story = {
  decorators: [withGameContext(mockEmpty, { name: 'town' })],
};

/** 通常の拠点（団員 3 名・ダイブ可） */
export const WithParty: Story = {
  decorators: [withGameContext(mockWithParty, { name: 'town' })],
};

/** ダイブ中断状態（潜行中ヒント・再開ボタン表示） */
export const MidDive: Story = {
  decorators: [withGameContext(mockMidDive, { name: 'town' })],
};

/** ボス撃破後（ワープチェックポイント解放済み） */
export const PostBoss: Story = {
  decorators: [withGameContext(mockPostBoss, { name: 'town' })],
};

/** 達成済み依頼あり（✦ ジェム表示 + 酒場カードの赤バッジを確認） */
export const WithReportableQuests: Story = {
  decorators: [withGameContext(mockTavern, { name: 'town' })],
};
