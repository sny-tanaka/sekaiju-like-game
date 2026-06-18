import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { PageTurn } from './PageTurn';

import { NavigationProvider } from '@/store/navigation';

const meta: Meta<typeof PageTurn> = {
  title: 'Common/PageTurn',
  component: PageTurn,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <NavigationProvider>
        <Story />
      </NavigationProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PageTurn>;

/**
 * ページ遷移のシミュレーション。
 * ボタンを押すたびに画面が切り替わり、PageTurn のオーバーレイが走る。
 */
export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [page, setPage] = useState<'A' | 'B' | 'C'>('A');
    const colors: Record<'A' | 'B' | 'C', string> = {
      A: '#EDE3CC',
      B: '#D4C7A8',
      C: '#F2E9D2',
    };
    const labels: Record<'A' | 'B' | 'C', string> = {
      A: '❦ 拠点',
      B: '❦ 鍛冶屋',
      C: '❦ ショップ',
    };
    return (
      <NavigationProvider>
        <PageTurn>
          <div
            style={{
              height: '100dvh',
              background: colors[page],
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              fontFamily: "'Noto Sans JP', sans-serif",
            }}
          >
            <h1 style={{ fontFamily: "'Kaisei Tokumin', serif", fontSize: 28 }}>{labels[page]}</h1>
            <div style={{ display: 'flex', gap: 12 }}>
              {(['A', 'B', 'C'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  style={{
                    padding: '8px 20px',
                    background: page === p ? '#3F6B4A' : '#EDE3CC',
                    color: page === p ? '#EDE3CC' : '#21241B',
                    border: '0.75px solid rgba(33,36,27,0.9)',
                    borderRadius: 0,
                    cursor: 'pointer',
                  }}
                  onClick={() => setPage(p)}
                >
                  ページ {p}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 13, color: '#5A4F36' }}>
              ページを切り替えると右→左の wipe アニメーションが流れます
            </p>
          </div>
        </PageTurn>
      </NavigationProvider>
    );
  },
};
