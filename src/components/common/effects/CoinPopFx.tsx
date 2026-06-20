import styles from './CoinPopFx.module.scss';

type Props = {
  /** true のとき表示 */
  visible: boolean;
};

/**
 * CoinPopFx
 * 金貨ポップアップエフェクト共通コンポーネント。
 * shop 画面の購入確認ダイアログで 🪙 が上に飛ぶ演出を表示する。
 * EffectsGallery の coinPop セルでも同じ DOM を参照し、一致を保証する。
 */
export const CoinPopFx = ({ visible }: Props) => {
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
