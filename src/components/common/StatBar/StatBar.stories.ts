import { type Meta, type StoryObj } from '@storybook/react-vite';

import { StatBar } from './StatBar';

type T = typeof StatBar;

export default {
  component: StatBar,
} satisfies Meta<T>;

export const Hp: StoryObj<T> = { args: { value: 32, max: 48, color: '#4caf50', label: 'HP' } };
export const Tp: StoryObj<T> = { args: { value: 10, max: 24, color: '#2196f3', label: 'TP' } };
export const Union: StoryObj<T> = {
  args: { value: 100, max: 100, color: '#ff9800', label: 'UNI' },
};
export const Low: StoryObj<T> = { args: { value: 4, max: 48, color: '#4caf50', label: 'HP' } };
