import styles from './style.module.scss';

import type { TrophyRank } from '@/domain/trophy';

// ============================================================================
// 討伐勲章メダル表示（v3.0.0 §4・§10.4・§10.5）。
// 到達ランクを ●4連（銅→銀→金→虹）で表示する。未到達スロットは暗色。
// ============================================================================

const RANK_LABEL: Record<TrophyRank, string> = {
  0: 'なし',
  1: '銅',
  2: '銀',
  3: '金',
  4: '虹',
};

type Size = 'xs' | 'sm' | 'md';

type Props = {
  rank: TrophyRank;
  size?: Size; // default 'sm'
  /** true のとき現在ランクのラベル文字（銅/銀/金/虹）も併記する。 */
  showLabel?: boolean;
  className?: string;
};

/** ●4連（銅/銀/金/虹）。i 番目のドットは rank >= i で点灯する。 */
export const TrophyMedal = ({ rank, size = 'sm', showLabel = false, className }: Props) => {
  return (
    <span
      className={`${styles.wrap} ${className ?? ''}`}
      role="img"
      aria-label={`討伐勲章: ${RANK_LABEL[rank]}`}
    >
      <span className={`${styles.dots} ${styles[size]}`}>
        {([1, 2, 3, 4] as const).map((i) => (
          <span
            key={i}
            className={`${styles.dot} ${i <= rank ? styles[`dot${i}`] : styles.dotEmpty}`}
          />
        ))}
      </span>
      {showLabel && rank > 0 && <span className={styles.label}>{RANK_LABEL[rank]}</span>}
    </span>
  );
};
