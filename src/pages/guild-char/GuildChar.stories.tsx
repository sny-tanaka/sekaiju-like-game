import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import {
  mockGuildCharLv100,
  mockGuildCharWithTitle,
  mockShop,
  mockWithParty,
} from '@/__stories__/mockSaves';

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

/** キャラ詳細（ランス Lv1 戦士 / 装備なし） */
export const Default: Story = {
  decorators: [withGameContext(mockWithParty, { name: 'guildChar', id: firstMemberId })],
};

/** 称号タブを開いた状態（title_berserker 習得済み） */
export const WithTitleSkillTab: Story = {
  decorators: [withGameContext(mockGuildCharWithTitle, { name: 'guildChar', id: firstMemberId })],
  play: async ({ canvasElement }) => {
    await new Promise((r) => setTimeout(r, 100));
    const canvas = canvasElement;
    const btns = canvas.querySelectorAll('button');
    const titleTab = Array.from(btns).find((b) => b.textContent === '称号');
    titleTab?.click();
  },
};

/** Lv100 戦士で「転生」bottom sheet を開いた状態 */
export const ReincarnateOpen: Story = {
  decorators: [withGameContext(mockGuildCharLv100, { name: 'guildChar', id: firstMemberId })],
  play: async ({ canvasElement }) => {
    await new Promise((r) => setTimeout(r, 100));
    const canvas = canvasElement;
    const btns = canvas.querySelectorAll('button');
    const rebirthBtn = Array.from(btns).find((b) => b.textContent?.includes('転生'));
    rebirthBtn?.click();
  },
};

/** 装備スロット展開（武器スロットをタップした状態）— mockShop の装備プールを使用 */
export const EquipPick: Story = {
  decorators: [withGameContext(mockShop, { name: 'guildChar', id: firstMemberId })],
  play: async ({ canvasElement }) => {
    await new Promise((r) => setTimeout(r, 100));
    const canvas = canvasElement;
    // 「選ぶ」チップ（未装備スロットの選択ボタン）または武器行をクリック
    const btns = canvas.querySelectorAll('button');
    // 最初の equipRow（武器行）をクリック
    const weaponRow = Array.from(btns).find(
      (b) => b.className?.includes?.('equipRow') || b.querySelector?.('[class*="equipSlotLabel"]')
    );
    if (weaponRow) {
      weaponRow.click();
    } else {
      // fallback: テキストで探す
      const pickBtn = Array.from(btns).find(
        (b) => b.textContent?.includes('武器') || b.textContent?.includes('（なし）')
      );
      pickBtn?.click();
    }
  },
};
