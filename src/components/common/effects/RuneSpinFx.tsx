import { useEffect, useRef } from 'react';

import styles from './RuneSpinFx.module.scss';

import { useSfx } from '@/audio/useSfx';

type Props = {
  /** true のとき表示、false のとき非表示 */
  visible: boolean;
  /** true のとき SE を鳴らさない（EffectsGallery プレビュー用） */
  silent?: boolean;
};

/**
 * RuneSpinFx
 * 詠唱ルーン ✦ オーバーレイ共通コンポーネント。
 * battle 画面で魔法スキルを選択したキャラの味方カード上に表示。
 * EffectsGallery の runeSpin セルでも同じ DOM を参照し、一致を保証する。
 * visible が false → true になる瞬間に skill SE を発火する。
 */
export const RuneSpinFx = ({ visible, silent = false }: Props) => {
  const play = useSfx();
  const prevVisibleRef = useRef(false);
  useEffect(() => {
    if (silent) return;
    if (visible && !prevVisibleRef.current) {
      play('skill');
    }
    prevVisibleRef.current = visible;
  }, [visible, silent, play]);

  if (!visible) return null;
  return (
    <div
      className={styles.runeSpin}
      aria-hidden="true"
    >
      ✦
    </div>
  );
};
