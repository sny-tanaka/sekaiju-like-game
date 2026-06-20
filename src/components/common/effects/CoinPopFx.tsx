import { useEffect, useRef } from 'react';

import styles from './CoinPopFx.module.scss';

import { useSfx } from '@/audio/useSfx';

type Props = {
  /** true のとき表示 */
  visible: boolean;
  /** true のとき SE を鳴らさない（EffectsGallery プレビュー用） */
  silent?: boolean;
};

/**
 * CoinPopFx
 * 金貨ポップアップエフェクト共通コンポーネント。
 * shop 画面の購入確認ダイアログで 🪙 が上に飛ぶ演出を表示する。
 * EffectsGallery の coinPop セルでも同じ DOM を参照し、一致を保証する。
 * visible が false → true になる瞬間に coin SE を発火する。
 */
export const CoinPopFx = ({ visible, silent = false }: Props) => {
  const play = useSfx();
  const prevVisibleRef = useRef(false);
  useEffect(() => {
    if (silent) return;
    if (visible && !prevVisibleRef.current) {
      play('coin');
    }
    prevVisibleRef.current = visible;
  }, [visible, silent, play]);

  if (!visible) return null;
  return (
    <div
      className={styles.coinPopWrap}
      aria-hidden="true"
    >
      <span className={styles.coinPop}>🪙</span>
    </div>
  );
};
