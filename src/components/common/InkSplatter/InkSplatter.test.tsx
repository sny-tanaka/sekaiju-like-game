import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { InkSplatter } from './InkSplatter';

describe('InkSplatter', () => {
  it('数値の value を SVG テキストとしてレンダリングする', () => {
    const { container } = render(
      <InkSplatter
        value={123}
        variant="damage"
      />
    );
    const text = container.querySelector('text');
    expect(text?.textContent).toBe('123');
  });

  it('文字列の value をレンダリングできる', () => {
    const { container } = render(
      <InkSplatter
        value="潜行"
        variant="seal"
      />
    );
    const text = container.querySelector('text');
    expect(text?.textContent).toBe('潜行');
  });

  it('各バリアントでエラーなくレンダリングする', () => {
    const variants = ['damage', 'heal', 'crit', 'seal', 'gold'] as const;
    for (const variant of variants) {
      const { container } = render(
        <InkSplatter
          value={100}
          variant={variant}
        />
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    }
  });

  it('aria-hidden 属性が設定されている（装飾的な要素）', () => {
    const { container } = render(
      <InkSplatter
        value={50}
        variant="damage"
      />
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
  });

  it('size prop がデフォルト 80 で動作する', () => {
    const { container } = render(
      <InkSplatter
        value={50}
        variant="damage"
      />
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('80');
    expect(svg?.getAttribute('height')).toBe('80');
  });

  it('crit バリアントは 1.15× スケールが適用される', () => {
    const { container } = render(
      <InkSplatter
        value={999}
        variant="crit"
        size={80}
      />
    );
    const svg = container.querySelector('svg');
    // crit: 80 * 1.15 = 92
    expect(svg?.getAttribute('width')).toBe('92');
  });

  it('onDone コールバックが setTimeout 後に呼ばれる', async () => {
    vi.useFakeTimers();
    const onDone = vi.fn();
    render(
      <InkSplatter
        value={100}
        variant="damage"
        onDone={onDone}
      />
    );
    // 320ms + 120ms = 440ms
    vi.advanceTimersByTime(500);
    expect(onDone).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});
