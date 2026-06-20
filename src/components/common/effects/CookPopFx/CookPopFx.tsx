import { useEffect, useRef } from 'react';

import styles from './CookPopFx.module.scss';

import { useSfx } from '@/audio/useSfx';

const ANIM_MS = 800;

export interface CookPopFxProps {
  visible: boolean;
  iconSrc?: string;
  silent?: boolean;
  onDone?: () => void;
  /** true のとき position:absolute に切り替え、EffectsGallery のセル内に収める */
  inline?: boolean;
}

/**
 * CookPopFx
 * 料理成功時の演出コンポーネント。
 * 料理画像が回転しながら拡大 → フェード消失する Pop アニメ。
 * visible false→true のエッジで 'cook' SE を発火する（silent=true で抑制）。
 * EffectsGallery プレビューは silent=true inline=true で表示する。
 */
export const CookPopFx = ({
  visible,
  iconSrc,
  silent = false,
  onDone,
  inline = false,
}: CookPopFxProps) => {
  const play = useSfx();
  const prevVisibleRef = useRef(false);

  useEffect(() => {
    if (visible && !prevVisibleRef.current) {
      if (!silent) play('cook');
      const t = setTimeout(() => onDone?.(), ANIM_MS + 50);
      prevVisibleRef.current = true;
      return () => clearTimeout(t);
    }
    if (!visible) {
      prevVisibleRef.current = false;
    }
    return undefined;
  }, [visible, silent, play, onDone]);

  if (!visible) return null;
  return (
    <div
      className={`${styles.cookPop}${inline ? ` ${styles.inline}` : ''}`}
      aria-hidden="true"
    >
      {iconSrc ? (
        <img
          src={iconSrc}
          alt=""
        />
      ) : (
        <span className={styles.icon}>🍳</span>
      )}
    </div>
  );
};
