import type { Meta, StoryObj } from '@storybook/react';

import { EffectsGallery } from './EffectsGallery';

const meta = {
  title: 'Design/Effects/Gallery',
  component: EffectsGallery,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof EffectsGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
