/**
 * HitFx のユニットテスト。
 * play モックが正しい SE キーで呼ばれるか検証する。
 */

vi.mock('@/audio/sfxManifest', () => ({
  SFX_IDS: ['attack', 'critical', 'damage', 'heal'],
  SFX_GAIN: {},
  sfxUrl: (id: string) => `/sfx/${id}.wav`,
}));

import { render } from '@testing-library/react';
import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';

import { HitFx } from './HitFx';

import { SoundContext } from '@/audio/soundContext';

// play モックを返す TestSoundProvider
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
  Wrapper.displayName = 'HitFxTestWrapper';

  return Wrapper;
};

describe('HitFx SE 発火', () => {
  test('element あり + variant=damage + isAllyTarget=true → attack, damage が鳴る', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <HitFx
        element="slash"
        variant="damage"
        value={123}
        isAllyTarget
      />,
      { wrapper }
    );
    expect(play).toHaveBeenCalledWith('attack');
    expect(play).toHaveBeenCalledWith('damage');
    expect(play).not.toHaveBeenCalledWith('heal');
    expect(play).not.toHaveBeenCalledWith('critical');
  });

  test('element あり + variant=damage + isAllyTarget=false → attack のみ（damage は鳴らない）', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <HitFx
        element="fire"
        variant="damage"
        value={80}
        isAllyTarget={false}
      />,
      { wrapper }
    );
    expect(play).toHaveBeenCalledWith('attack');
    expect(play).not.toHaveBeenCalledWith('damage');
    expect(play).not.toHaveBeenCalledWith('heal');
    expect(play).not.toHaveBeenCalledWith('critical');
  });

  test('element あり + isCrit=true → attack と critical が鳴る', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <HitFx
        element="slash"
        variant="crit"
        value={999}
        isCrit
      />,
      { wrapper }
    );
    expect(play).toHaveBeenCalledWith('attack');
    expect(play).toHaveBeenCalledWith('critical');
  });

  test('element なし + variant=heal → heal のみ鳴る', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <HitFx
        variant="heal"
        value="+50"
      />,
      { wrapper }
    );
    expect(play).toHaveBeenCalledWith('heal');
    expect(play).not.toHaveBeenCalledWith('attack');
    expect(play).not.toHaveBeenCalledWith('damage');
    expect(play).not.toHaveBeenCalledWith('critical');
  });

  test('silent=true → play は一切呼ばれない', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <HitFx
        element="ice"
        variant="damage"
        value={100}
        isCrit
        isAllyTarget
        silent
      />,
      { wrapper }
    );
    expect(play).not.toHaveBeenCalled();
  });

  test('element なし + variant=heal + silent=true → play は呼ばれない', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <HitFx
        variant="heal"
        value="+50"
        silent
      />,
      { wrapper }
    );
    expect(play).not.toHaveBeenCalled();
  });
});
