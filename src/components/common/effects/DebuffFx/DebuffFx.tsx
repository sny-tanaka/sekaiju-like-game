import { useEffect, useRef } from 'react';

import styles from './DebuffFx.module.scss';

import { useSfx } from '@/audio/useSfx';

const ANIM_MS = 400;

export interface DebuffFxProps {
  visible: boolean;
  silent?: boolean;
  onDone?: () => void;
}

/**
 * DebuffFx
 * 状態異常付与演出コンポーネント。
 * visible が false → true になった瞬間に 'debuff' SE を再生し、
 * 赤フラッシュ / 暗い霧を 0.4s 表示する。
 * ANIM_MS + 50ms 後に onDone を呼び出す。
 * silent=true なら SE を再生しない（EffectsGallery プレビュー用）。
 */
export const DebuffFx = ({ visible, silent = false, onDone }: DebuffFxProps) => {
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
      if (!silent) play('debuff');
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
      className={styles.debuffFx}
      aria-hidden="true"
    />
  );
};
