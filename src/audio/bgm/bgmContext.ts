import { createContext } from 'react';

// ============================================================================
// BgmContext の型定義（sfxManifest 等への依存なし）
// BgmProvider.tsx / useBgm.ts から共有する型を分離して、
// テストが外部アセットに依存しないようにする。
// ============================================================================

/** /battle 中に再生する戦闘曲のバリアント（戦闘画面が敵種別から設定）。 */
export type BattleVariant = 'battle' | 'boss' | 'foe';

export interface BgmContextValue {
  volume: number;
  muted: boolean;
  setVolume: (v: number) => void;
  setMuted: (m: boolean) => void;
  toggleMuted: () => void;
  currentTrackId: string | null;
  /** /battle 中の戦闘曲バリアントを設定する（null で解除）。 */
  setBattleVariant: (v: BattleVariant | null) => void;
}

export const BgmContext = createContext<BgmContextValue | null>(null);
