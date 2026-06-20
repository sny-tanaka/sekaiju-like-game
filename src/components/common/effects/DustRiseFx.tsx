import styles from './DustRiseFx.module.scss';

type Props = {
  /** true のとき砂塵パーティクルを表示 */
  visible: boolean;
};

/**
 * DustRiseFx
 * 逃走時の砂塵エフェクト共通コンポーネント。
 * battle 画面で逃走成功フェーズに足元砂塵として表示する。
 * EffectsGallery の dustRise セルでも同じ DOM を参照し、一致を保証する。
 */
export const DustRiseFx = ({ visible }: Props) => {
  if (!visible) return null;
  return (
    <div
      className={styles.dustContainer}
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
