import { useEffect, useRef } from 'react';

import styles from './ForgeSparkFx.module.scss';

import { useSfx } from '@/audio/useSfx';

type Props = {
  /** true のとき表示 */
  visible: boolean;
  /** スパーク個数（1〜3、デフォルト 3） */
  count?: number;
  /** true のとき SE を鳴らさない（EffectsGallery プレビュー用） */
  silent?: boolean;
};

/**
 * ForgeSparkFx
 * 鍛冶火花エフェクト共通コンポーネント。
 * forge 画面の強化確認ダイアログで武器アイコン周囲に ✦ が3箇所スパークする演出。
 * EffectsGallery の forgeSpark セルでも同じ DOM を参照し、一致を保証する。
 * visible が false → true になる瞬間に forge SE を発火する。
 *
 * 使用例（forge）:
 *   <div style={{ position: 'relative' }}>
 *     <ItemSprite ... />
 *     <ForgeSparkFx visible />
 *   </div>
 */
export const ForgeSparkFx = ({ visible, count = 3, silent = false }: Props) => {
  const play = useSfx();
  const prevVisibleRef = useRef(false);
  useEffect(() => {
    if (silent) return;
    if (visible && !prevVisibleRef.current) {
      play('forge');
    }
    prevVisibleRef.current = visible;
  }, [visible, silent, play]);

  if (!visible) return null;
  return (
    <>
      {count >= 1 && <span className={styles.spark1}>✦</span>}
      {count >= 2 && <span className={styles.spark2}>✦</span>}
      {count >= 3 && <span className={styles.spark3}>✦</span>}
    </>
  );
};
