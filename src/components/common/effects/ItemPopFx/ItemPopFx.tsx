import { useEffect, useRef } from 'react';

import styles from './ItemPopFx.module.scss';

import { useSfx } from '@/audio/useSfx';

const ANIM_MS = 700;

export interface ItemPopFxProps {
  visible: boolean;
  iconSrc?: string;
  silent?: boolean;
  onDone?: () => void;
  /** true のとき position:absolute に切り替え、EffectsGallery のセル内に収める */
  inline?: boolean;
}

/**
 * ItemPopFx
 * 採集成功時の演出コンポーネント。
 * アイテム画像/アイコンが中央から拡大 → 縮小 → フェード消失する Pop アニメ。
 * visible false→true のエッジで 'item' SE を発火する（silent=true で抑制）。
 * EffectsGallery プレビューは silent=true inline=true で表示する。
 */
export const ItemPopFx = ({
  visible,
  iconSrc,
  silent = false,
  onDone,
  inline = false,
}: ItemPopFxProps) => {
  const play = useSfx();
  const prevVisibleRef = useRef(false);

  useEffect(() => {
    if (visible && !prevVisibleRef.current) {
      if (!silent) play('item');
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
      className={`${styles.itemPop}${inline ? ` ${styles.inline}` : ''}`}
      aria-hidden="true"
    >
      {iconSrc ? (
        <img
          src={iconSrc}
          alt=""
        />
      ) : (
        <span className={styles.icon}>📦</span>
      )}
    </div>
  );
};
