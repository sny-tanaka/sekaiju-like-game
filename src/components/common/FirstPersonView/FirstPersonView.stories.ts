import { type Meta, type StoryObj } from '@storybook/react-vite';

import { FirstPersonView } from './FirstPersonView';

import { castView } from '@/domain/firstPersonView';
import { findEventCell, generateFloor } from '@/domain/generateFloor';
import { openDirs } from '@/domain/movement';
import { createRng } from '@/domain/rng';
import type { Dir } from '@/domain/types';

const floor = generateFloor(1, createRng(12345).fork('floor:1'));
const entrance = findEventCell(floor, 'stairsDown') ?? { x: 0, y: 0 };
// 入口から最初に開いている方向を向き、その直線上の少し先に FOE を置く
const facing: Dir = openDirs(floor, entrance.x, entrance.y)[0] ?? 'S';
const ahead = castView(floor, entrance, facing, 4);
const foeAhead = ahead[Math.min(2, ahead.length - 1)] ?? ahead[0];

type T = typeof FirstPersonView;

export default {
  component: FirstPersonView,
  args: {
    floor,
    pos: entrance,
    dir: 'S',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};

export const FacingNorth: StoryObj<T> = { args: { dir: 'N' } };
export const FacingEast: StoryObj<T> = { args: { dir: 'E' } };

// 正面の直線上に FOE（徘徊敵）が見える状態。追跡中は鮮やかな赤。
export const FoeAhead: StoryObj<T> = {
  args: {
    dir: facing,
    foes: [{ x: foeAhead.x, y: foeAhead.y, alerted: true }],
  },
};
