import { type Meta, type StoryObj } from '@storybook/react-vite';

import { ResistBadges } from './ResistBadges';

type T = typeof ResistBadges;

export default {
  component: ResistBadges,
  title: 'common/ResistBadges',
} satisfies Meta<T>;

// 弱点・耐性・無効が混在するケース（敵: スライム系）
export const EnemyMixed: StoryObj<T> = {
  args: {
    elementResist: { fire: 1.5, ice: 0.5 },
    ailmentResist: { armBind: 0, legBind: 0, paralysis: 1.3 },
  },
};

// 属性のみ（魔法耐性）
export const ElementOnly: StoryObj<T> = {
  args: {
    elementResist: { slash: 1.2, pierce: 1.2, bash: 0.8, fire: 0.85, ice: 0.85 },
    ailmentResist: {},
  },
};

// 状態異常のみ（アンデッド系）
export const AilmentOnly: StoryObj<T> = {
  args: {
    elementResist: {},
    ailmentResist: { poison: 0, sleep: 0 },
  },
};

// コンパクトモード（戦闘中の敵情報表示）
export const Compact: StoryObj<T> = {
  args: {
    elementResist: { fire: 1.5, ice: 0.5 },
    ailmentResist: { poison: 0, paralysis: 1.3, armBind: 0.5 },
    compact: true,
  },
};

// 耐性なし（等倍のみ）
export const NoResist: StoryObj<T> = {
  args: {
    elementResist: {},
    ailmentResist: {},
  },
};

// 全属性・全状態異常が混在するボス（全種表示のデモ）
export const BossFull: StoryObj<T> = {
  args: {
    elementResist: {
      slash: 0.5,
      pierce: 0.5,
      bash: 0,
      fire: 1.5,
      ice: 0.5,
      volt: 1.3,
    },
    ailmentResist: {
      poison: 0,
      paralysis: 0.35,
      sleep: 0.35,
      blind: 0.35,
      headBind: 0.35,
      armBind: 0.35,
      legBind: 0.35,
    },
  },
};
