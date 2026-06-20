import { render, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { SkillCastFx } from './SkillCastFx';

// useSfx をモック
const mockPlay = vi.fn();
vi.mock('@/audio/useSfx', () => ({
  useSfx: () => mockPlay,
}));

describe('SkillCastFx', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockPlay.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('visible=false→true で play("skill") が呼ばれる', () => {
    const { rerender } = render(
      <SkillCastFx
        visible={false}
        onDone={() => {}}
      />
    );
    expect(mockPlay).not.toHaveBeenCalled();

    rerender(
      <SkillCastFx
        visible={true}
        onDone={() => {}}
      />
    );
    expect(mockPlay).toHaveBeenCalledWith('skill');
  });

  it('silent=true なら play が呼ばれない', () => {
    const { rerender } = render(
      <SkillCastFx
        visible={false}
        silent={true}
        onDone={() => {}}
      />
    );
    rerender(
      <SkillCastFx
        visible={true}
        silent={true}
        onDone={() => {}}
      />
    );
    expect(mockPlay).not.toHaveBeenCalled();
  });

  it('visible 維持中に再 render しても再発火しない', () => {
    const { rerender } = render(
      <SkillCastFx
        visible={false}
        onDone={() => {}}
      />
    );
    rerender(
      <SkillCastFx
        visible={true}
        onDone={() => {}}
      />
    );
    expect(mockPlay).toHaveBeenCalledTimes(1);

    // visible=true のまま再 render
    rerender(
      <SkillCastFx
        visible={true}
        onDone={() => {}}
      />
    );
    expect(mockPlay).toHaveBeenCalledTimes(1);
  });

  it('ANIM_MS + 50ms 後に onDone が呼ばれる', () => {
    const onDone = vi.fn();
    const { rerender } = render(
      <SkillCastFx
        visible={false}
        onDone={onDone}
      />
    );
    rerender(
      <SkillCastFx
        visible={true}
        onDone={onDone}
      />
    );
    expect(onDone).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(849);
    });
    expect(onDone).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(2);
    });
    expect(onDone).toHaveBeenCalledTimes(1);
  });
});
