import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import { mockPostBoss } from '@/__stories__/mockSaves';
import type { ItemId } from '@/domain/types';

const meta = {
  title: 'Pages/Codex',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 図鑑/記録（F5 ボス撃破後・到達記録あり） */
export const Default: Story = {
  decorators: [withGameContext(mockPostBoss, { name: 'codex' })],
};

/** 図鑑タブを開いた状態（モンスター一覧の初期表示確認用） */
export const CodexTab: Story = {
  decorators: [withGameContext(mockPostBoss, { name: 'codex' })],
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const buttons = canvasElement.querySelectorAll<HTMLElement>('button[class*="tab"]');
    // 「図鑑」ラベルを持つタブボタンを探してクリック
    for (const b of buttons) {
      if (b.textContent?.trim() === '図鑑') {
        b.click();
        break;
      }
    }
  },
};

// ============================================================
// mockCodexTrophy — mockPostBoss + 討伐勲章（銅/銀/虹）と秘宝コレクション
// （第0帯コンプ済み・第1帯一部所持）を持つ状態（v3.0.0 §10.4 確認用）
// ============================================================
const BAND0_ITEM_IDS: ItemId[] = [
  'item_col_slime',
  'item_col_giant_rat',
  'item_col_cave_bat',
  'item_col_forest_rabbit',
  'item_col_glow_mushroom',
  'item_col_wood_caracal',
  'item_col_pale_wisp',
  'item_col_bristle_boar',
  'item_col_thicket_stag',
  'item_col_cave_crawler',
  'item_col_elder_treant',
  'item_col_gatekeeper',
];
const BAND1_PARTIAL_ITEM_IDS: ItemId[] = [
  'item_col_crag_goat',
  'item_col_rock_lizard',
  'item_col_highland_hawk',
  'item_col_stone_beetle',
];

const mockCodexTrophy = {
  ...mockPostBoss,
  bestiary: {
    ...mockPostBoss.bestiary,
    monsters: {
      // boss（しきい値[1,5,15,40]）: kills=40 で虹到達
      enemy_boss_gatekeeper: { seen: true, defeated: true, dropsFound: [], kills: 40 },
      // zako（しきい値[10,50,150,400]）: kills=60 で銀到達
      enemy_slime: { seen: true, defeated: true, dropsFound: [], kills: 60 },
      // zako: kills=10 で銅到達
      enemy_giant_rat: { seen: true, defeated: true, dropsFound: [], kills: 10 },
    },
    items: {},
  },
  collection: Object.fromEntries([
    ...BAND0_ITEM_IDS.map((id) => [id, 1]),
    ...BAND1_PARTIAL_ITEM_IDS.map((id) => [id, 2]),
  ]),
};

/** 図鑑（討伐勲章バラエティ + 秘宝コレクション第0帯コンプ済み・第1帯一部所持） */
export const TrophyAndCollection: Story = {
  decorators: [withGameContext(mockCodexTrophy, { name: 'codex' })],
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const buttons = canvasElement.querySelectorAll<HTMLElement>('button[class*="tab"]');
    for (const b of buttons) {
      if (b.textContent?.trim() === '図鑑') {
        b.click();
        break;
      }
    }
  },
};
