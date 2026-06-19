import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import { mockWithParty } from '@/__stories__/mockSaves';

// 最初の団員 ID を使ってキャラ詳細画面を表示する
const firstMemberId = mockWithParty.guild.members[0]?.id ?? 'char_mock_warrior';

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
