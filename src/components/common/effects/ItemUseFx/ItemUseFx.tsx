import { useEffect, useRef } from 'react';

import styles from './ItemUseFx.module.scss';

import { useSfx } from '@/audio/useSfx';

const ANIM_MS = 600;

export interface ItemUseFxProps {
  visible: boolean;
  iconSrc?: string;
  silent?: boolean;
  inline?: boolean;
  onDone?: () => void;
}

/**
 * ItemUseFx
 * アイテム使用演出コンポーネント。
 * アイテムアイコンが中央から上昇しながらフェードアウト + 光の粒子が周囲に広がる。
 * visible false→true のエッジで 'item' SE を発火する（silent=true で抑制）。
 * ANIM_MS + 50ms 後に onDone を呼び出す。
 * EffectsGallery プレビューは silent=true inline=true で表示する。
 */
export const ItemUseFx = ({
  visible,
  iconSrc,
  silent = false,
  inline = false,
  onDone,
}: ItemUseFxProps) => {
  const play = useSfx();
  const prevVisibleRef = useRef(false);

  // onDone は ref で逃がしているので deps に含めない。
  // 含めると親の毎 render での onDone 再生成で setTimeout が cleanup され、
  // 単独 Fx 経路（TP 回復のようなダメージなし行動）で進行不能になる。
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (visible && !prevVisibleRef.current) {
      if (!silent) play('item');
      const t = setTimeout(() => onDoneRef.current?.(), ANIM_MS + 50);
      prevVisibleRef.current = true;
      return () => clearTimeout(t);
    }
    if (!visible) {
      prevVisibleRef.current = false;
    }
    return undefined;
  }, [visible, silent, play]); // onDone は ref 経由で呼ぶため deps に含めない（含めると cleanup で setTimeout が消える）

  if (!visible) return null;
  return (
    <div
      className={`${styles.itemUseFx}${inline ? ' ' + styles.inline : ''}`}
      aria-hidden="true"
    >
      {iconSrc ? (
        <img
          src={iconSrc}
          alt=""
          className={styles.icon}
        />
      ) : (
        <span className={styles.icon}>🧪</span>
      )}
      <div className={`${styles.sparkle} ${styles.sparkle1}`} />
      <div className={`${styles.sparkle} ${styles.sparkle2}`} />
      <div className={`${styles.sparkle} ${styles.sparkle3}`} />
    </div>
  );
};
