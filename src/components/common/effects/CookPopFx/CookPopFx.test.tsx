/**
 * CookPopFx のユニットテスト。
 * play モックが正しい SE キーで呼ばれるか、edge 検出が機能するか検証する。
 */

vi.mock('@/audio/sfxManifest', () => ({
  SFX_IDS: ['item', 'cook'],
  SFX_GAIN: {},
  sfxUrl: (id: string) => `/sfx/${id}.wav`,
}));

import { render, act } from '@testing-library/react';
import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';

import { CookPopFx } from './CookPopFx';

import { SoundContext } from '@/audio/soundContext';

const makeWrapper = (play: ReturnType<typeof vi.fn>) => {
  const TestSoundProvider = ({ children }: { children: ReactNode }) => {
    const [volume] = useState(0.6);
    const [muted] = useState(false);
    const setVolume = useCallback(() => {}, []);
    const setMuted = useCallback(() => {}, []);
    const toggleMuted = useCallback(() => {}, []);

    return (
      <SoundContext.Provider value={{ play, volume, muted, setVolume, setMuted, toggleMuted }}>
        {children}
      </SoundContext.Provider>
    );
  };
  TestSoundProvider.displayName = 'TestSoundProvider';

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <TestSoundProvider>{children}</TestSoundProvider>
  );
  Wrapper.displayName = 'CookPopFxTestWrapper';

  return Wrapper;
};

describe('CookPopFx SE 発火', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  test('visible=false→true で play("cook") が呼ばれる', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    const { rerender } = render(<CookPopFx visible={false} />, { wrapper });
    expect(play).not.toHaveBeenCalled();

    rerender(<CookPopFx visible={true} />);
    expect(play).toHaveBeenCalledWith('cook');
    expect(play).toHaveBeenCalledTimes(1);
  });

  test('silent=true なら play は呼ばれない', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    const { rerender } = render(
      <CookPopFx
        visible={false}
        silent
      />,
      { wrapper }
    );
    rerender(
      <CookPopFx
        visible={true}
        silent
      />
    );
    expect(play).not.toHaveBeenCalled();
  });

  test('visible=true 維持中に再 render しても play は再発火しない（useRef edge 検出）', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    const { rerender } = render(<CookPopFx visible={false} />, { wrapper });
    rerender(<CookPopFx visible={true} />);
    expect(play).toHaveBeenCalledTimes(1);

    // visible=true のまま再 render
    rerender(<CookPopFx visible={true} />);
    expect(play).toHaveBeenCalledTimes(1);
  });

  test('ANIM_MS + 50 後に onDone が呼ばれる', () => {
    const play = vi.fn();
    const onDone = vi.fn();
    const wrapper = makeWrapper(play);
    const { rerender } = render(
      <CookPopFx
        visible={false}
        onDone={onDone}
      />,
      { wrapper }
    );
    rerender(
      <CookPopFx
        visible={true}
        onDone={onDone}
      />
    );
    expect(onDone).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(850);
    });
    expect(onDone).toHaveBeenCalledTimes(1);
  });
});
