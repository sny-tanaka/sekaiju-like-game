import { type Meta, type StoryObj } from '@storybook/react-vite';

import { ClassInfoCard } from './ClassInfoCard';

type T = typeof ClassInfoCard;

export default {
  component: ClassInfoCard,
  title: 'creation/ClassInfoCard',
} satisfies Meta<T>;

export const Warrior: StoryObj<T> = {
  args: { classId: 'class_warrior' },
};

export const Guardian: StoryObj<T> = {
  args: { classId: 'class_guardian' },
};

export const Mage: StoryObj<T> = {
  args: { classId: 'class_mage' },
};

export const Ranger: StoryObj<T> = {
  args: { classId: 'class_ranger' },
};

export const Medic: StoryObj<T> = {
  args: { classId: 'class_medic' },
};

export const Dancer: StoryObj<T> = {
  args: { classId: 'class_dancer' },
};

export const Monk: StoryObj<T> = {
  args: { classId: 'class_monk' },
};

export const Hexer: StoryObj<T> = {
  args: { classId: 'class_hexer' },
};

export const Summoner: StoryObj<T> = {
  args: { classId: 'class_summoner' },
};
