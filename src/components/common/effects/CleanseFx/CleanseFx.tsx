import { useEffect, useRef } from 'react';

import styles from './CleanseFx.module.scss';

import { useSfx } from '@/audio/useSfx';

const ANIM_MS = 500;

export interface CleanseFxProps {
  visible: boolean;
  silent?: boolean;
  inline?: boolean;
  onDone?: () => void;
}

/**
 * CleanseFx
 * 状態異常解除演出コンポーネント。
 * 青い光のオーラが target カードを優しく包む 0.5s アニメ。
 * visible false→true のエッジで 'buff' SE を発火する（cleanse 専用 SE が未実装のため代用、silent=true で抑制）。
 * ANIM_MS + 50ms 後に onDone を呼び出す。
 * EffectsGallery プレビューは silent=true inline=true で表示する。
 */
export const CleanseFx = ({ visible, silent = false, inline = false, onDone }: CleanseFxProps) => {
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
      if (!silent) play('buff');
      const t = setTimeout(() => onDoneRef.current?.(), ANIM_MS + 50);
      prevVisibleRef.current = true;
      return () => clearTimeout(t);
    }
    if (!visible) prevVisibleRef.current = false;
    return undefined;
  }, [visible, silent, play]); // onDone は ref 経由で呼ぶため deps に含めない（含めると cleanup で setTimeout が消える）

  if (!visible) return null;
  return (
    <div
      className={`${styles.cleanseFx}${inline ? ' ' + styles.inline : ''}`}
      aria-hidden="true"
    />
  );
};
