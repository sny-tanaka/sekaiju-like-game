import { type Meta, type StoryObj } from '@storybook/react-vite';

import { FirstPersonView } from './FirstPersonView';

import { findEventCell, generateFloor } from '@/domain/generateFloor';
import { createRng } from '@/domain/rng';

const floor = generateFloor(1, createRng(12345).fork('floor:1'));
const entrance = findEventCell(floor, 'stairsDown') ?? { x: 0, y: 0 };

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
