import { describe, expect, test } from 'vitest';

import { shouldShowUnexploredStairs } from './helpers';

import { findEventCell, generateFloor } from '@/domain/generateFloor';
import { createRng } from '@/domain/rng';

const floor = generateFloor(1, createRng(12345).fork('floor:1'));

describe('shouldShowUnexploredStairs', () => {
  test('未踏の下り階段は座標を返す', () => {
    const stairs = findEventCell(floor, 'stairsUp');
    expect(stairs).not.toBeNull();

    const exploredEmpty = new Set<string>();
    const coord = shouldShowUnexploredStairs(floor, exploredEmpty);
    expect(coord).toEqual(stairs);
  });

  test('踏破済みの下り階段は null を返す', () => {
    const stairs = findEventCell(floor, 'stairsUp')!;
    const explored = new Set([`${stairs.x},${stairs.y}`]);
    expect(shouldShowUnexploredStairs(floor, explored)).toBeNull();
  });

  test('下り階段がないフロアでは null を返す（防御的）', () => {
    // stairsUp セルが存在しないフロアをダミーで組む
    const emptyFloor = {
      ...floor,
      cells: floor.cells.map((row) =>
        row.map((cell) => ({
          ...cell,
          event: cell.event?.kind === 'stairsUp' ? undefined : cell.event,
        }))
      ),
    };
    const exploredEmpty = new Set<string>();
    expect(shouldShowUnexploredStairs(emptyFloor as typeof floor, exploredEmpty)).toBeNull();
  });
});
