import styles from './style.module.scss';

type Props = {
  value: number;
  max: number;
  /** バーの色（HP=緑/TP=青/ゲージ=橙 等）。 */
  color?: string;
  /** 左に出す短いラベル（HP/TP 等）。 */
  label?: string;
  /** 数値（value/max）を表示するか。 */
  showValue?: boolean;
};

// HP/TP/ユニオンゲージ用の汎用バー。
export const StatBar = ({ value, max, color = '#4caf50', label, showValue = true }: Props) => {
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  return (
    <div className={styles.row}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      {showValue ? (
        <span className={styles.value}>
          {Math.max(0, Math.round(value))}/{Math.round(max)}
        </span>
      ) : null}
    </div>
  );
};
