import styles from './WarpScanFx.module.scss';

type Props = {
  /** true のとき表示 */
  visible: boolean;
};

/**
 * WarpScanFx
 * ワープスキャン演出共通コンポーネント。
 * town 画面でダイブ開始時にスキャン線が縦走査する演出を表示する。
 * EffectsGallery の warpScan セルでも同じ DOM を参照し、一致を保証する。
 */
export const WarpScanFx = ({ visible }: Props) => {
  if (!visible) return null;
  return (
    <div
      className={styles.overlay}
      aria-hidden="true"
    >
      <div className={styles.scanLine} />
    </div>
  );
};
