import type { ReactNode } from 'react';

import styles from './style.module.scss';

import { useNavigation } from '@/store/navigation';

interface Props {
  children: ReactNode;
}

/**
 * PageTurn — 画面遷移時にふわっとフェードインするラッパー。
 *
 * screen が変わると key が変わり children が再マウントされ、
 * CSS の page-enter-fade アニメーション（200ms ease-out）が走る。
 * 退場アニメーションは無し（瞬時に消える）。
 * prefers-reduced-motion: reduce 時は index.scss 側で --motion-page: 0ms になり
 * アニメーションが実質スキップされる。
 *
 * react-router 非依存。既存の NavigationProvider と連携する。
 */
export const PageTurn = ({ children }: Props) => {
  const { screen } = useNavigation();
  // guildChar は id ごとに別キーを立てて再フェードさせる
  const screenKey = screen.name === 'guildChar' ? `guildChar-${screen.id}` : screen.name;

  return (
    <div className={styles.root}>
      <div
        key={screenKey}
        className={styles.page}
      >
        {children}
      </div>
    </div>
  );
};
