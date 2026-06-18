import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import styles from './style.module.scss';

import { useNavigation } from '@/store/navigation';
import type { Screen } from '@/store/navigation';

interface Props {
  children: ReactNode;
}

/**
 * PageTurn — 画面遷移時にページめくりエフェクトを重ねるラッパー。
 *
 * useNavigation の screen が変わったら --motion-page (260ms) の wipe アニメーションを
 * オーバーレイで走らせる。prefers-reduced-motion: reduce 時は opacity フェードに退化。
 *
 * react-router 非依存。既存の NavigationProvider と連携する。
 */
export const PageTurn = ({ children }: Props) => {
  const { screen } = useNavigation();
  const prevScreenRef = useRef<Screen>(screen);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const prev = prevScreenRef.current;
    const isSame =
      prev.name === screen.name &&
      (screen.name !== 'guildChar' ||
        prev.name !== 'guildChar' ||
        prev.id === (screen as { name: 'guildChar'; id: string }).id);
    if (isSame) return;

    prevScreenRef.current = screen;

    // アニメーション開始
    setAnimating(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    // --motion-page = 260ms + 少し余裕
    timerRef.current = setTimeout(() => {
      setAnimating(false);
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [screen]);

  return (
    <div className={styles.root}>
      {children}
      {animating ? (
        <div
          className={styles.overlay}
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
};
