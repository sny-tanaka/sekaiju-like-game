import { render, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { CleanseFx } from './CleanseFx';

// useSfx をモック
const mockPlay = vi.fn();
vi.mock('@/audio/useSfx', () => ({
  useSfx: () => mockPlay,
}));

describe('CleanseFx', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockPlay.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('visible=false→true で play("buff") が呼ばれる', () => {
    const { rerender } = render(
      <CleanseFx
        visible={false}
        onDone={() => {}}
      />
    );
    expect(mockPlay).not.toHaveBeenCalled();

    rerender(
      <CleanseFx
        visible={true}
        onDone={() => {}}
      />
    );
    expect(mockPlay).toHaveBeenCalledWith('buff');
  });

  it('silent=true なら play が呼ばれない', () => {
    const { rerender } = render(
      <CleanseFx
        visible={false}
        silent={true}
        onDone={() => {}}
      />
    );
    rerender(
      <CleanseFx
        visible={true}
        silent={true}
        onDone={() => {}}
      />
    );
    expect(mockPlay).not.toHaveBeenCalled();
  });

  it('visible 維持中に再 render しても再発火しない', () => {
    const { rerender } = render(
      <CleanseFx
        visible={false}
        onDone={() => {}}
      />
    );
    rerender(
      <CleanseFx
        visible={true}
        onDone={() => {}}
      />
    );
    expect(mockPlay).toHaveBeenCalledTimes(1);

    // visible=true のまま再 render
    rerender(
      <CleanseFx
        visible={true}
        onDone={() => {}}
      />
    );
    expect(mockPlay).toHaveBeenCalledTimes(1);
  });

  it('ANIM_MS + 50ms 後に onDone が呼ばれる', () => {
    const onDone = vi.fn();
    const { rerender } = render(
      <CleanseFx
        visible={false}
        onDone={onDone}
      />
    );
    rerender(
      <CleanseFx
        visible={true}
        onDone={onDone}
      />
    );
    expect(onDone).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(549);
    });
    expect(onDone).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(2);
    });
    expect(onDone).toHaveBeenCalledTimes(1);
  });
});

describe('CleanseFx onDone stability', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('onDone が毎 render 新規関数でも setTimeout がキャンセルされず呼ばれる', () => {
    const onDoneA = vi.fn();
    const { rerender } = render(
      <CleanseFx
        visible
        silent
        onDone={onDoneA}
      />
    );

    // ANIM_MS(500) の途中で、親が再 render して onDone を新しい関数に差し替える
    act(() => {
      vi.advanceTimersByTime(100);
    });
    const onDoneB = vi.fn();
    rerender(
      <CleanseFx
        visible
        silent
        onDone={onDoneB}
      />
    );
    act(() => {
      vi.advanceTimersByTime(100);
    });
    const onDoneC = vi.fn();
    rerender(
      <CleanseFx
        visible
        silent
        onDone={onDoneC}
      />
    );

    // ANIM_MS + 50 を超えるまで時間を進める（残り）
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // 最新の onDone（C）が 1 回呼ばれる。古い A/B は呼ばれない。
    expect(onDoneA).not.toHaveBeenCalled();
    expect(onDoneB).not.toHaveBeenCalled();
    expect(onDoneC).toHaveBeenCalledTimes(1);
  });
});
