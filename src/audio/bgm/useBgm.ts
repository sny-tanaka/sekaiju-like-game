import { useContext } from 'react';

import { BgmContext } from './bgmContext';
import type { BgmContextValue } from './bgmContext';

/** BGM コンテキストを返すフック。Provider 外でも安全（既定値を返す）。 */
export const useBgm = (): BgmContextValue => {
  const ctx = useContext(BgmContext);
  if (!ctx) {
    // Provider 外: no-op の既定値を返す
    return {
      volume: 0.5,
      muted: false,
      setVolume: () => {},
      setMuted: () => {},
      toggleMuted: () => {},
      currentTrackId: null,
    };
  }
  return ctx;
};
