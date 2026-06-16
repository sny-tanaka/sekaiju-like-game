import { createContext } from 'react';

// ============================================================================
// BgmContext の型定義（sfxManifest 等への依存なし）
// BgmProvider.tsx / useBgm.ts から共有する型を分離して、
// テストが外部アセットに依存しないようにする。
// ============================================================================

export interface BgmContextValue {
  volume: number;
  muted: boolean;
  setVolume: (v: number) => void;
  setMuted: (m: boolean) => void;
  toggleMuted: () => void;
  currentTrackId: string | null;
}

export const BgmContext = createContext<BgmContextValue | null>(null);
