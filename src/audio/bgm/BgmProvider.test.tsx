/**
 * BgmProvider.test.tsx
 *
 * jsdom 環境（AudioContext 不在）でマウントしても例外が出ず、
 * bgmSettings のラウンドトリップが通ることを検証する。
 */

import { renderHook, act } from '@testing-library/react';
import { useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { BgmContext } from './bgmContext';
import { loadBgmSettings, saveBgmSettings } from './bgmSettings';
import { useBgm } from './useBgm';

// ────────────────────────────────────────────────────────────────
// bgmSettings ラウンドトリップ
// ────────────────────────────────────────────────────────────────
describe('bgmSettings', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('デフォルト値が返る（localStorage 未設定）', () => {
    const s = loadBgmSettings();
    expect(s.volume).toBe(0.5);
    expect(s.muted).toBe(false);
  });

  test('saveBgmSettings → loadBgmSettings でラウンドトリップできる', () => {
    saveBgmSettings({ volume: 0.3, muted: true });
    const s = loadBgmSettings();
    expect(s.volume).toBe(0.3);
    expect(s.muted).toBe(true);
  });

  test('localStorage に不正な値があればデフォルトを返す', () => {
    localStorage.setItem('sekaiju-bgm-settings', 'not-json{{{{');
    const s = loadBgmSettings();
    expect(s.volume).toBe(0.5);
    expect(s.muted).toBe(false);
  });

  test('localStorage に型が合わないオブジェクトがあればデフォルトを返す', () => {
    localStorage.setItem('sekaiju-bgm-settings', JSON.stringify({ volume: 'loud', muted: 'yes' }));
    const s = loadBgmSettings();
    expect(s.volume).toBe(0.5);
    expect(s.muted).toBe(false);
  });
});

// ────────────────────────────────────────────────────────────────
// テスト用最小 BgmProvider（AudioContext 不要）
// ────────────────────────────────────────────────────────────────
const TestBgmProvider = ({ children }: { children: ReactNode }) => {
  const initial = loadBgmSettings();
  const [volume, setVol] = useState(initial.volume);
  const [muted, setMut] = useState(initial.muted);

  const setVolume = useCallback(
    (v: number) => {
      setVol(v);
      saveBgmSettings({ volume: v, muted });
    },
    [muted]
  );
  const setMuted = useCallback(
    (m: boolean) => {
      setMut(m);
      saveBgmSettings({ volume, muted: m });
    },
    [volume]
  );
  const toggleMuted = useCallback(() => {
    setMut((prev) => !prev);
  }, []);

  return (
    <BgmContext.Provider
      value={{ volume, muted, setVolume, setMuted, toggleMuted, currentTrackId: null }}
    >
      {children}
    </BgmContext.Provider>
  );
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <MemoryRouter>
    <TestBgmProvider>{children}</TestBgmProvider>
  </MemoryRouter>
);

// ────────────────────────────────────────────────────────────────
// useBgm — Provider 外（no-op）
// ────────────────────────────────────────────────────────────────
describe('useBgm (Provider なし)', () => {
  test('Provider の外でも例外が発生しない', () => {
    const { result } = renderHook(() => useBgm());
    expect(() => {
      act(() => {
        result.current.setVolume(0.8);
        result.current.setMuted(true);
        result.current.toggleMuted();
      });
    }).not.toThrow();
  });

  test('Provider の外では既定値が返る', () => {
    const { result } = renderHook(() => useBgm());
    expect(result.current.volume).toBe(0.5);
    expect(result.current.muted).toBe(false);
    expect(result.current.currentTrackId).toBeNull();
  });
});

// ────────────────────────────────────────────────────────────────
// useBgm — TestBgmProvider あり（jsdom: AudioContext 不在 → no-op）
// ────────────────────────────────────────────────────────────────
describe('useBgm (BgmProvider あり, jsdom)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('マウントしても例外が発生しない（AudioContext 不在 no-op）', () => {
    expect(() => {
      renderHook(() => useBgm(), { wrapper });
    }).not.toThrow();
  });

  test('volume/muted の初期値が loadBgmSettings と一致する', () => {
    saveBgmSettings({ volume: 0.4, muted: true });

    const { result } = renderHook(() => useContext(BgmContext), { wrapper });
    expect(result.current?.volume).toBe(0.4);
    expect(result.current?.muted).toBe(true);
  });

  test('setVolume/setMuted/toggleMuted を呼んでも例外が発生しない', () => {
    const { result } = renderHook(() => useContext(BgmContext), { wrapper });
    expect(() => {
      act(() => {
        result.current?.setVolume(0.8);
        result.current?.setMuted(true);
        result.current?.toggleMuted();
      });
    }).not.toThrow();
  });
});
