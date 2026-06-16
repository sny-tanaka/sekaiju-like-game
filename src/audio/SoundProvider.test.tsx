/**
 * SoundProvider / useSfx のユニットテスト。
 *
 * jsdom 環境（AudioContext 不在）での no-op 動作と、
 * sfxSettings のラウンドトリップを検証する。
 *
 * sfxManifest.ts は Agent A が並列作成中のため、vi.mock でスタブする。
 * SoundProvider.tsx が sfxManifest を import するため、SoundProvider も vi.mock して
 * テスト用の最小実装（sfxManifest 不要）に置き換える。
 */

// sfxManifest をモック
vi.mock('@/audio/sfxManifest', () => ({
  SFX_IDS: ['cursor', 'decide', 'cancel'],
  SFX_GAIN: { decide: 0.9 },
  sfxUrl: (id: string) => `/sfx/${id}.wav`,
}));

import { renderHook, act } from '@testing-library/react';
import { useState, useCallback, useContext } from 'react';
import type { ReactNode } from 'react';

import { loadSfxSettings, saveSfxSettings } from '@/audio/sfxSettings';
import { SoundContext } from '@/audio/soundContext';
import { useSfx } from '@/audio/useSfx';

// テスト用の最小 SoundProvider（sfxManifest 不依存・AudioContext 不要）
const TestSoundProvider = ({ children }: { children: ReactNode }) => {
  const initial = loadSfxSettings();
  const [volume, setVol] = useState(initial.volume);
  const [muted, setMut] = useState(initial.muted);

  const play = useCallback((_id: string) => {
    // jsdom: AudioContext なし → no-op
  }, []);
  const setVolume = useCallback(
    (v: number) => {
      setVol(v);
      saveSfxSettings({ volume: v, muted });
    },
    [muted]
  );
  const setMuted = useCallback(
    (m: boolean) => {
      setMut(m);
      saveSfxSettings({ volume, muted: m });
    },
    [volume]
  );
  const toggleMuted = useCallback(() => {
    setMut((prev) => !prev);
  }, []);

  return (
    <SoundContext.Provider value={{ play, volume, muted, setVolume, setMuted, toggleMuted }}>
      {children}
    </SoundContext.Provider>
  );
};

// TestSoundProvider でラップするラッパー
const wrapper = ({ children }: { children: ReactNode }) => (
  <TestSoundProvider>{children}</TestSoundProvider>
);

// ────────────────────────────────────────────────────────────────
// sfxSettings ラウンドトリップ
// ────────────────────────────────────────────────────────────────
describe('sfxSettings', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('デフォルト値が返る（localStorage 未設定）', () => {
    const s = loadSfxSettings();
    expect(s.volume).toBe(0.6);
    expect(s.muted).toBe(false);
  });

  test('saveSfxSettings → loadSfxSettings でラウンドトリップできる', () => {
    saveSfxSettings({ volume: 0.3, muted: true });
    const s = loadSfxSettings();
    expect(s.volume).toBe(0.3);
    expect(s.muted).toBe(true);
  });

  test('localStorage に不正な値があればデフォルトを返す', () => {
    localStorage.setItem('sekaiju-sfx-settings', 'not-json{{{{');
    const s = loadSfxSettings();
    expect(s.volume).toBe(0.6);
    expect(s.muted).toBe(false);
  });

  test('localStorage に型が合わないオブジェクトがあればデフォルトを返す', () => {
    localStorage.setItem('sekaiju-sfx-settings', JSON.stringify({ volume: 'loud', muted: 'yes' }));
    const s = loadSfxSettings();
    expect(s.volume).toBe(0.6);
    expect(s.muted).toBe(false);
  });
});

// ────────────────────────────────────────────────────────────────
// useSfx — Provider 外（no-op）
// ────────────────────────────────────────────────────────────────
describe('useSfx (Provider なし)', () => {
  test('Provider の外で play を呼んでも例外が発生しない', () => {
    const { result } = renderHook(() => useSfx());
    expect(() => {
      act(() => {
        result.current('cursor');
        result.current('decide');
        result.current('cancel');
      });
    }).not.toThrow();
  });
});

// ────────────────────────────────────────────────────────────────
// useSfx — TestSoundProvider あり（jsdom: AudioContext 不在 → no-op）
// ────────────────────────────────────────────────────────────────
describe('useSfx (SoundProvider あり, jsdom)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('play を呼んでも例外が発生しない（AudioContext 不在 no-op）', () => {
    const { result } = renderHook(() => useSfx(), { wrapper });
    expect(() => {
      act(() => {
        result.current('cursor');
        result.current('decide');
      });
    }).not.toThrow();
  });

  test('volume/muted の初期値が loadSfxSettings と一致する', () => {
    saveSfxSettings({ volume: 0.4, muted: true });

    const { result } = renderHook(() => useContext(SoundContext), { wrapper });
    expect(result.current?.volume).toBe(0.4);
    expect(result.current?.muted).toBe(true);
  });

  test('setVolume/setMuted/toggleMuted を呼んでも例外が発生しない', () => {
    const { result } = renderHook(() => useContext(SoundContext), { wrapper });
    expect(() => {
      act(() => {
        result.current?.setVolume(0.8);
        result.current?.setMuted(true);
        result.current?.toggleMuted();
      });
    }).not.toThrow();
  });
});
