import { useContext } from 'react';

import type { SfxId } from '@/audio/sfxManifest';
import { SoundContext } from '@/audio/soundContext';

/** 効果音再生フック。`const play = useSfx();` で `(id: SfxId) => void` を返す。
 *  SoundProvider の外でも安全（no-op を返す）。 */
export const useSfx = (): ((id: SfxId) => void) => {
  const ctx = useContext(SoundContext);
  if (!ctx) return () => {};
  return ctx.play as (id: SfxId) => void;
};
