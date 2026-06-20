import { useEffect, useRef } from 'react';

import styles from './WarpScanFx.module.scss';

import { useSfx } from '@/audio/useSfx';

type Props = {
  /** true のとき表示 */
  visible: boolean;
  /** true のとき SE を鳴らさない（EffectsGallery プレビュー用） */
  silent?: boolean;
};

/**
 * WarpScanFx
 * ワープスキャン演出共通コンポーネント。
 * town 画面でダイブ開始時にスキャン線が縦走査する演出を表示する。
 * EffectsGallery の warpScan セルでも同じ DOM を参照し、一致を保証する。
 * visible が false → true になる瞬間に warp SE を発火する。
 */
export const WarpScanFx = ({ visible, silent = false }: Props) => {
  const play = useSfx();
  const prevVisibleRef = useRef(false);
  useEffect(() => {
    if (silent) return;
    if (visible && !prevVisibleRef.current) {
      play('warp');
    }
    prevVisibleRef.current = visible;
  }, [visible, silent, play]);

  if (!visible) return null;
  return (
    <div
      className={styles.overlay}
      aria-hidden="true"
    >
      <div className={styles.scanLine} />
    </div>
  );
};
