import styles from './HealPop.module.scss';

type Props = {
  value: number;
};

/**
 * HealPop
 * 回復値ポップアップ共通コンポーネント。
 * battle 画面と EffectsGallery の両方から参照し、同一 DOM・アニメーションを保証する。
 */
export const HealPop = ({ value }: Props) => {
  return (
    <div
      className={styles.healPop}
      aria-hidden="true"
    >
      +{value}
    </div>
  );
};
