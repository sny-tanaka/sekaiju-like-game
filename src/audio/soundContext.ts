import { createContext } from 'react';

// ============================================================================
// SoundContext の型定義（sfxManifest への依存なし）
// SoundProvider.tsx / useSfx.ts から共有するシンタクスを分離しておくことで、
// useSfx.ts のテストが sfxManifest の存在に依存しないようにする。
// ============================================================================

export interface SoundContextValue {
  /** 効果音を再生する。id は SfxId と互換（string）。 */
  play: (id: string) => void;
  volume: number;
  muted: boolean;
  setVolume: (v: number) => void;
  setMuted: (m: boolean) => void;
  toggleMuted: () => void;
}

export const SoundContext = createContext<SoundContextValue | null>(null);
