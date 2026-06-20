import { render, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { ItemUseFx } from './ItemUseFx';

// useSfx をモック
const mockPlay = vi.fn();
vi.mock('@/audio/useSfx', () => ({
  useSfx: () => mockPlay,
}));

describe('ItemUseFx', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockPlay.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('visible=false→true で play("item") が呼ばれる', () => {
    const { rerender } = render(
      <ItemUseFx
        visible={false}
        onDone={() => {}}
      />
    );
    expect(mockPlay).not.toHaveBeenCalled();

    rerender(
      <ItemUseFx
        visible={true}
        onDone={() => {}}
      />
    );
    expect(mockPlay).toHaveBeenCalledWith('item');
  });

  it('silent=true なら play が呼ばれない', () => {
    const { rerender } = render(
      <ItemUseFx
        visible={false}
        silent={true}
        onDone={() => {}}
      />
    );
    rerender(
      <ItemUseFx
        visible={true}
        silent={true}
        onDone={() => {}}
      />
    );
    expect(mockPlay).not.toHaveBeenCalled();
  });

  it('visible 維持中に再 render しても再発火しない', () => {
    const { rerender } = render(
      <ItemUseFx
        visible={false}
        onDone={() => {}}
      />
    );
    rerender(
      <ItemUseFx
        visible={true}
        onDone={() => {}}
      />
    );
    expect(mockPlay).toHaveBeenCalledTimes(1);

    // visible=true のまま再 render
    rerender(
      <ItemUseFx
        visible={true}
        onDone={() => {}}
      />
    );
    expect(mockPlay).toHaveBeenCalledTimes(1);
  });

  it('ANIM_MS + 50ms 後に onDone が呼ばれる', () => {
    const onDone = vi.fn();
    const { rerender } = render(
      <ItemUseFx
        visible={false}
        onDone={onDone}
      />
    );
    rerender(
      <ItemUseFx
        visible={true}
        onDone={onDone}
      />
    );
    expect(onDone).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(649);
    });
    expect(onDone).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(2);
    });
    expect(onDone).toHaveBeenCalledTimes(1);
  });
});
