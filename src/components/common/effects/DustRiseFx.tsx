import { useEffect, useRef } from 'react';

import styles from './DustRiseFx.module.scss';

import { useSfx } from '@/audio/useSfx';

type Props = {
  /** true のとき砂塵パーティクルを表示 */
  visible: boolean;
  /** true のとき SE を鳴らさない（EffectsGallery プレビュー用） */
  silent?: boolean;
  /** true のとき position:absolute に切り替え、EffectsGallery のセル内に収める */
  inline?: boolean;
};

/**
 * DustRiseFx
 * 逃走時の砂塵エフェクト共通コンポーネント。
 * battle 画面で逃走成功フェーズに足元砂塵として表示する。
 * EffectsGallery の dustRise セルでも同じ DOM を参照し、一致を保証する。
 * visible が false → true になる瞬間に flee SE を発火する。
 */
export const DustRiseFx = ({ visible, silent = false, inline = false }: Props) => {
  const play = useSfx();
  const prevVisibleRef = useRef(false);
  useEffect(() => {
    if (silent) return;
    if (visible && !prevVisibleRef.current) {
      play('flee');
    }
    prevVisibleRef.current = visible;
  }, [visible, silent, play]);

  if (!visible) return null;
  return (
    <div
      className={`${styles.dustContainer}${inline ? ` ${styles.inline}` : ''}`}
      aria-hidden="true"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={styles.dustParticle}
          style={{
            left: `${20 + i * 30}px`,
            bottom: `${10 + (i % 3) * 12}px`,
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
    </div>
  );
};
