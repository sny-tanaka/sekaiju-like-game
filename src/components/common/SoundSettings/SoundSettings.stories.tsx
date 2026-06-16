import { type Meta, type StoryObj } from '@storybook/react-vite';

import { SoundSettings } from './SoundSettings';

import { SoundProvider } from '@/audio/SoundProvider';

type T = typeof SoundSettings;

export default {
  component: SoundSettings,
  title: 'common/SoundSettings',
} satisfies Meta<T>;

// SoundProvider ありの通常状態
export const WithProvider: StoryObj<T> = {
  decorators: [
    (Story) => (
      <SoundProvider>
        <div style={{ maxWidth: 380, padding: 16 }}>
          <Story />
        </div>
      </SoundProvider>
    ),
  ],
};

// SoundProvider なし（Storybook 単体確認用）
// Provider が無くても表示が壊れないことを確認するストーリー
export const WithoutProvider: StoryObj<T> = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 380, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};
