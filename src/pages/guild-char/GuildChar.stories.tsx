import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from 'storybook/test';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import {
  mockGuildCharRebirthReady,
  mockGuildCharWithTitle,
  mockWithParty,
} from '@/__stories__/mockSaves';

// 最初の団員 ID を使ってキャラ詳細画面を表示する
const firstMemberId = mockWithParty.guild.members[0]?.id ?? 'char_mock_warrior';
const firstMemberIdTitle = mockGuildCharWithTitle.guild.members[0]?.id ?? 'char_mock_warrior';
const firstMemberIdRebirth = mockGuildCharRebirthReady.guild.members[0]?.id ?? 'char_mock_warrior';

// Page は { id: string } を受け取るので固定 id でラップする
const PageWithId = () => <Page id={firstMemberId} />;
PageWithId.displayName = 'GuildCharPage';

const meta = {
  title: 'Pages/GuildChar',
  component: PageWithId,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PageWithId>;

export default meta;
type Story = StoryObj<typeof meta>;

/** キャラ詳細（戦士 Lv1） */
export const Default: Story = {
  decorators: [withGameContext(mockWithParty, { name: 'guildChar', id: firstMemberId })],
};

/** 称号スキルツリー表示（deepestReached: 20 + titleId: berserker） */
const PageWithTitle = () => <Page id={firstMemberIdTitle} />;
PageWithTitle.displayName = 'GuildCharPageWithTitle';
export const WithTitleSkillTab: Story = {
  // @ts-expect-error component override for story
  component: PageWithTitle,
  decorators: [
    withGameContext(mockGuildCharWithTitle, { name: 'guildChar', id: firstMemberIdTitle }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 称号タブが表示される（titleId がセットされているため）
    const titleTab = await canvas.findByRole('button', { name: /称号/ });
    await userEvent.click(titleTab);
  },
};

/** 転生フォーム展開（Lv100 のキャラ） */
const PageRebirth = () => <Page id={firstMemberIdRebirth} />;
PageRebirth.displayName = 'GuildCharPageRebirth';
export const ReincarnateOpen: Story = {
  // @ts-expect-error component override for story
  component: PageRebirth,
  decorators: [
    withGameContext(mockGuildCharRebirthReady, { name: 'guildChar', id: firstMemberIdRebirth }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // スクロールして転生ボタンを探してクリック
    const rebirthBtn = await canvas.findByRole('button', { name: '転生する…' });
    await userEvent.click(rebirthBtn);
  },
};

/** 装備選択候補表示（mockWithParty ベース、装備候補が表示される状態） */
export const EquipPick: Story = {
  decorators: [withGameContext(mockWithParty, { name: 'guildChar', id: firstMemberId })],
};
