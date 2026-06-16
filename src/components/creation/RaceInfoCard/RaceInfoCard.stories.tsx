import { type Meta, type StoryObj } from '@storybook/react-vite';

import { RaceInfoCard } from './RaceInfoCard';

type T = typeof RaceInfoCard;

export default {
  component: RaceInfoCard,
  title: 'creation/RaceInfoCard',
} satisfies Meta<T>;

export const Human: StoryObj<T> = {
  args: { raceId: 'race_human' },
};

export const Garon: StoryObj<T> = {
  args: { raceId: 'race_garon' },
};

export const Pix: StoryObj<T> = {
  args: { raceId: 'race_pix' },
};

export const Therian: StoryObj<T> = {
  args: { raceId: 'race_therian' },
};

export const Lunar: StoryObj<T> = {
  args: { raceId: 'race_lunar' },
};

export const Golan: StoryObj<T> = {
  args: { raceId: 'race_golan' },
};
