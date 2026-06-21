import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

// 画面を discriminated union で型安全に表現する。
// guild-char の :id パラメータは Screen の値として保持する（useParams の代替）。
export type Screen =
  | { name: 'title' }
  | { name: 'town' }
  | { name: 'guild'; tab?: 'create' | 'roster' | 'party' | 'banish' }
  | { name: 'guildChar'; id: string }
  | { name: 'shop' }
  | { name: 'forge' }
  | { name: 'codex' }
  | { name: 'dungeon' }
  | { name: 'battle' };

export type ScreenName = Screen['name'];

interface NavigationContextValue {
  screen: Screen;
  navigate: (screen: Screen) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export const NavigationProvider = ({
  children,
  initialScreen,
}: {
  children: ReactNode;
  initialScreen?: Screen;
}) => {
  const [screen, setScreen] = useState<Screen>(initialScreen ?? { name: 'title' });

  const navigate = useCallback((next: Screen) => {
    setScreen(next);
  }, []);

  return (
    <NavigationContext.Provider value={{ screen, navigate }}>{children}</NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextValue => {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error('useNavigation は NavigationProvider の内部でのみ使用できます');
  }
  return ctx;
};

/**
 * Redirect — render 中の遷移を安全に行うヘルパー。
 * react-router の <Navigate> と同様、ガード条件成立時に条件付きで描画して遷移させる。
 * 「描画中に別コンポーネントの state を更新」する警告を避けるため useEffect で遷移する。
 */
export function Redirect({ to }: { to: Screen }) {
  const { screen, navigate } = useNavigation();
  useEffect(() => {
    // name と（あれば）id が一致していれば再遷移しない
    const same =
      screen.name === to.name &&
      (to.name !== 'guildChar' || screen.name !== 'guildChar' || screen.id === to.id);
    if (!same) navigate(to);
    // to は呼び出し側で固定リテラルのため name/id を依存にする
  }, [screen, navigate, to]);
  return null;
}
