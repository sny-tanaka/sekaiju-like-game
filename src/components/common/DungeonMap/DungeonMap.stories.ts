import { type Meta, type StoryObj } from '@storybook/react-vite';

import { DungeonMap } from './DungeonMap';

import { findEventCell, generateFloor } from '@/domain/generateFloor';
import { createRng } from '@/domain/rng';

const floor = generateFloor(1, createRng(12345).fork('floor:1'));
const entrance = findEventCell(floor, 'stairsDown') ?? { x: 0, y: 0 };

const allCells: string[] = [];
for (let y = 0; y < floor.height; y++) {
  for (let x = 0; x < floor.width; x++) allCells.push(`${x},${y}`);
}

// 入口周辺だけ探索済みにした部分マップ
const partial = allCells.filter((k) => {
  const [x, y] = k.split(',').map(Number);
  return Math.abs(x - entrance.x) + Math.abs(y - entrance.y) <= 4;
});

type T = typeof DungeonMap;

export default {
  component: DungeonMap,
  args: {
    floor,
    pos: entrance,
    dir: 'S',
  },
} satisfies Meta<T>;

// 全踏破（生成された迷路の全体像）
export const FullyExplored: StoryObj<T> = {
  args: { explored: allCells },
};

// 探索途中（入口周辺のみ可視・他は霧）
export const PartiallyExplored: StoryObj<T> = {
  args: { explored: partial },
};

// FOE（徘徊敵）を自動表示。未感知=くすんだ赤、追跡中=鮮やかな赤。
export const WithFoes: StoryObj<T> = {
  args: {
    explored: allCells,
    foes: [
      { x: entrance.x + 2, y: entrance.y + 1, alerted: false },
      { x: entrance.x - 1, y: entrance.y + 3, alerted: true },
    ],
  },
};
