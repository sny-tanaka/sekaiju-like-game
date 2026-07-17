import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import { mockTavern, mockWithParty } from '@/__stories__/mockSaves';

const meta = {
  title: 'Pages/Tavern',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 掲示板・受注中（達成済み+進行中+上限3件）・記録（完了1件+くり返し累計）が揃った状態 */
export const Board: Story = {
  decorators: [withGameContext(mockTavern, { name: 'tavern' })],
};

/** 開始直後（依頼未受注・地下0階扱い = 初期解放分のみ掲示） */
export const NoQuestsYet: Story = {
  decorators: [withGameContext(mockWithParty, { name: 'tavern' })],
};
