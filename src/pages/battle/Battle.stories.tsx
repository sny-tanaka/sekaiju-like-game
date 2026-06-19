import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import { mockBattle, mockBattleSkillMenu, mockBossBattle } from '@/__stories__/mockSaves';

const meta = {
  title: 'Pages/Battle',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE_LOG = [
  'てきが あらわれた！（1 ターン目）',
  'ランス の パワースラッシュ',
  'もりゴブリン に 42 のダメージ',
  'セラ の ヒール',
  'ランス の HP が 18 回復',
  'オン の ファイアボール',
  'もりゴブリン に 88 のダメージ（会心）',
  'もりゴブリン の こん棒攻撃',
  'ランス に 12 のダメージ',
  'セラ に 9 のダメージ',
];

// 「各要素が最大の表示領域を必要とする」雑魚エンカウント想定の敵 ID 列。
// 6 体並べると .enemies の flex-wrap が複数段にラップする。tier0 帯から
// 重複しない見た目で 6 種をピック。
const MAX_ZAKO_ENEMY_IDS = [
  'enemy_slime',
  'enemy_giant_rat',
  'enemy_cave_bat',
  'enemy_t0_forest_rabbit',
  'enemy_t0_glow_mushroom',
  'enemy_t0_pale_wisp',
] as const;

// ボス戦の最大配置: ボス 1 + 雑魚 3。ボスの md スプライトに加え、サブ雑魚を
// 並べることで、敵カードが複数行に渡って表示される最大ケースを再現する。
const MAX_BOSS_ENEMY_IDS = [
  'enemy_boss_gatekeeper',
  'enemy_giant_rat',
  'enemy_cave_bat',
  'enemy_slime',
] as const;

/**
 * 戦闘画面（雑魚 6 体 + 味方 5 名）。
 * 「各要素が最大の表示領域を必要とする」状態で、敵の wrap・味方の前衛/後衛 2 段・
 * 戦闘ログ・コマンドエリアが画面下端まできちんと配置されるかを確認する。
 */
export const Default: Story = {
  decorators: [withGameContext(mockBattle, { name: 'battle' })],
  args: {
    __storyMockLogPreview: SAMPLE_LOG,
    __storyMockEnemyIds: [...MAX_ZAKO_ENEMY_IDS],
  },
};

/**
 * 戦闘画面（ログ短）。1 行だけのプレビューを確認する用。
 * 最大配置（雑魚 6 体 + 味方 5 名）を維持。
 */
export const NoLog: Story = {
  decorators: [withGameContext(mockBattle, { name: 'battle' })],
  args: {
    __storyMockEnemyIds: [...MAX_ZAKO_ENEMY_IDS],
  },
};

/**
 * スキル選択画面。最大配置（雑魚 6 体 + 味方 5 名）の上で戦士のスキル一覧を開く。
 * 2 列レイアウト + TP 不足のスキルがグレーアウトされる様子を確認できる。
 */
export const SkillMenu: Story = {
  decorators: [withGameContext(mockBattleSkillMenu, { name: 'battle' })],
  args: {
    __storyMockOpenSkillMenu: true,
    __storyMockEnemyIds: [...MAX_ZAKO_ENEMY_IDS],
  },
};

const BOSS_SAMPLE_LOG = [
  'てきが あらわれた！（1 ターン目）',
  '門番のゴーレム の 大地割り',
  'ランス に 35 のダメージ',
  'セラ に 28 のダメージ',
  'ランス の パワースラッシュ',
  '門番のゴーレム に 120 のダメージ',
];

/**
 * F5 ボス戦のレイアウト確認（ボス 1 + 雑魚 3 + 味方 5 名）。
 * スプライトは md サイズで大きく表示され、横にサブ雑魚が並ぶ最大ケース。
 */
export const BossEncounter: Story = {
  decorators: [withGameContext(mockBossBattle, { name: 'battle' })],
  args: {
    __storyMockLogPreview: BOSS_SAMPLE_LOG,
    __storyMockEnemyIds: [...MAX_BOSS_ENEMY_IDS],
  },
};
