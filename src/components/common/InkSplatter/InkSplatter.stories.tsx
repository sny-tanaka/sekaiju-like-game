import type { Meta, StoryObj } from '@storybook/react';

import { InkSplatter } from './InkSplatter';

const meta: Meta<typeof InkSplatter> = {
  title: 'Common/InkSplatter',
  component: InkSplatter,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'parchment' },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['damage', 'heal', 'crit', 'seal', 'gold'],
    },
    size: { control: { type: 'range', min: 40, max: 200, step: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof InkSplatter>;

export const Damage: Story = {
  args: {
    value: 284,
    variant: 'damage',
    size: 80,
  },
};

export const Heal: Story = {
  args: {
    value: 120,
    variant: 'heal',
    size: 80,
  },
};

export const Crit: Story = {
  args: {
    value: 541,
    variant: 'crit',
    size: 96,
  },
};

export const Seal: Story = {
  args: {
    value: '潜行',
    variant: 'seal',
    size: 96,
  },
};

export const Gold: Story = {
  args: {
    value: '+1',
    variant: 'gold',
    size: 64,
  },
};

/** 5バリアント全部を横並びで確認 */
export const AllVariants: Story = {
  render: () => (
    <div
      style={{ display: 'flex', gap: 24, alignItems: 'center', background: '#EDE3CC', padding: 24 }}
    >
      <InkSplatter
        value={284}
        variant="damage"
        size={80}
      />
      <InkSplatter
        value={120}
        variant="heal"
        size={80}
      />
      <InkSplatter
        value={541}
        variant="crit"
        size={96}
      />
      <InkSplatter
        value="潜行"
        variant="seal"
        size={96}
      />
      <InkSplatter
        value="+1"
        variant="gold"
        size={64}
      />
    </div>
  ),
};
