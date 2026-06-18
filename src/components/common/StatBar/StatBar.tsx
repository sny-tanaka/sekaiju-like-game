import { useEffect, useRef, useState } from 'react';

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
  /**
   * value 変化時に Kaisei Tokumin で 1 桁ずつ書き起こすアニメーションを有効にするか。
   * デフォルト false（互換維持のためオプトイン）。
   * 140ms × 桁数（最大 4 桁）で書き起こす。
   */
  writeOn?: boolean;
};

// HP/TP/ユニオンゲージ用の汎用バー。
export const StatBar = ({
  value,
  max,
  color = '#4caf50',
  label,
  showValue = true,
  writeOn = false,
}: Props) => {
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;

  // 書き起こしアニメーション: value が変化したら桁数 × 140ms で数値を順に書き起こす
  const [displayValue, setDisplayValue] = useState(value);
  const [writing, setWriting] = useState(false);
  const prevValueRef = useRef(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!writeOn) {
      setDisplayValue(value);
      return;
    }
    if (prevValueRef.current === value) return;
    prevValueRef.current = value;

    // 桁数（最大 4 桁）× 140ms でアニメ
    const digits = Math.min(4, String(Math.max(0, Math.round(value))).length);
    const duration = digits * 140;

    setWriting(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDisplayValue(value);
      setWriting(false);
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, writeOn]);

  // writeOn 無効時は常に最新値を表示
  const shownValue = writeOn ? displayValue : value;

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
        <span className={`${styles.value} ${writing ? styles.valueWriting : ''}`}>
          {Math.max(0, Math.round(shownValue))}/{Math.round(max)}
        </span>
      ) : null}
    </div>
  );
};
