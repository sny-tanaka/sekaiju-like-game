import { useEffect, useRef } from 'react';

import styles from './BuffFx.module.scss';

import { useSfx } from '@/audio/useSfx';

const ANIM_MS = 400;

export interface BuffFxProps {
  visible: boolean;
  silent?: boolean;
  onDone?: () => void;
}

/**
 * BuffFx
 * バフ発動演出コンポーネント。
 * visible が false → true になった瞬間に 'buff' SE を再生し、
 * 緑色オーラ / パルス光を 0.4s 表示する。
 * ANIM_MS + 50ms 後に onDone を呼び出す。
 * silent=true なら SE を再生しない（EffectsGallery プレビュー用）。
 */
export const BuffFx = ({ visible, silent = false, onDone }: BuffFxProps) => {
  const play = useSfx();
  const prevVisibleRef = useRef(false);

  useEffect(() => {
    if (visible && !prevVisibleRef.current) {
      if (!silent) play('buff');
      const t = setTimeout(() => onDone?.(), ANIM_MS + 50);
      prevVisibleRef.current = true;
      return () => clearTimeout(t);
    }
    if (!visible) prevVisibleRef.current = false;
    return undefined;
  }, [visible, silent, play, onDone]);

  if (!visible) return null;
  return (
    <div
      className={styles.buffFx}
      aria-hidden="true"
    />
  );
};
