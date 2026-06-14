import styles from './style.module.scss';

import { GAUGE_LEVELS } from '@/domain/encounter';

type Props = {
  /** 0..GAUGE_LEVELS。大きいほどエンカウントが近い。 */
  level: number;
};

// エンカウント予兆ゲージ（02 §5）。満タンに近づくほど赤くなる5段階表示。
export const EncounterGauge = ({ level }: Props) => {
  const danger = level >= GAUGE_LEVELS;
  return (
    <div
      className={styles.gauge}
      role="img"
      aria-label={`エンカウントゲージ ${level}/${GAUGE_LEVELS}`}
    >
      <span className={styles.icon}>{danger ? '⚠' : '👣'}</span>
      <div className={styles.segments}>
        {Array.from({ length: GAUGE_LEVELS }, (_, i) => (
          <span
            key={i}
            className={[
              styles.seg,
              i < level ? styles.filled : '',
              danger ? styles.danger : '',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  );
};
