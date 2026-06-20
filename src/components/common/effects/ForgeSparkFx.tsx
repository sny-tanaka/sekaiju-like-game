import styles from './ForgeSparkFx.module.scss';

type Props = {
  /** true のとき表示 */
  visible: boolean;
  /** スパーク個数（1〜3、デフォルト 3） */
  count?: number;
};

/**
 * ForgeSparkFx
 * 鍛冶火花エフェクト共通コンポーネント。
 * forge 画面の強化確認ダイアログで武器アイコン周囲に ✦ が3箇所スパークする演出。
 * EffectsGallery の forgeSpark セルでも同じ DOM を参照し、一致を保証する。
 *
 * 使用例（forge）:
 *   <div style={{ position: 'relative' }}>
 *     <ItemSprite ... />
 *     <ForgeSparkFx visible />
 *   </div>
 */
export const ForgeSparkFx = ({ visible, count = 3 }: Props) => {
  if (!visible) return null;
  return (
    <>
      {count >= 1 && <span className={styles.spark1}>✦</span>}
      {count >= 2 && <span className={styles.spark2}>✦</span>}
      {count >= 3 && <span className={styles.spark3}>✦</span>}
    </>
  );
};
