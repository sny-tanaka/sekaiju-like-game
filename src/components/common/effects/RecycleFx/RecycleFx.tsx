import { useEffect, useRef } from 'react';

import styles from './RecycleFx.module.scss';

import { useSfx } from '@/audio/useSfx';

const ANIM_MS = 600;

export interface RecycleFxProps {
  visible: boolean;
  silent?: boolean;
  onDone?: () => void;
}

/**
 * RecycleFx
 * 装備分解時の灰色パーティクル拡散エフェクト。
 * visible false→true のエッジで 'recycle' SE を発火する（silent=true で抑制）。
 * EffectsGallery プレビューは silent=true で表示する。
 *
 * 使用例（forge 分解確認ダイアログ）:
 *   <div style={{ position: 'relative' }}>
 *     <ItemSprite ... />
 *     <RecycleFx visible={recycleFxVisible} onDone={() => setRecycleFxVisible(false)} />
 *   </div>
 */
export const RecycleFx = ({ visible, silent = false, onDone }: RecycleFxProps) => {
  const play = useSfx();
  const prevVisibleRef = useRef(false);

  useEffect(() => {
    if (visible && !prevVisibleRef.current) {
      if (!silent) play('recycle');
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
      className={styles.recycleFx}
      aria-hidden="true"
    >
      {/* 灰色/銀色パーティクル 3 個 */}
      <span className={styles.particle1} />
      <span className={styles.particle2} />
      <span className={styles.particle3} />
    </div>
  );
};
