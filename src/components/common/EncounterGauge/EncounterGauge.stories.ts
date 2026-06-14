import { type Meta, type StoryObj } from '@storybook/react-vite';

import { EncounterGauge } from './EncounterGauge';

type T = typeof EncounterGauge;

export default {
  component: EncounterGauge,
} satisfies Meta<T>;

export const Empty: StoryObj<T> = { args: { level: 0 } };
export const Half: StoryObj<T> = { args: { level: 3 } };
export const Danger: StoryObj<T> = { args: { level: 5 } };
