import { useEffect, useRef, useState } from 'react';

import styles from './style.module.scss';

import { canGainExp, expToNext } from '@/data/balance';

type Props = {
  /** 戦闘前のレベル。 */
  fromLevel: number;
  /** 戦闘前の、そのレベル内での経験値。 */
  fromExp: number;
  /** 戦闘で加算する経験値（0 ならアニメーションせず静止）。 */
  gainedExp: number;
  /** true になるとアニメーションを開始する（レベルアップ演出後に開始させる用途）。 */
  start: boolean;
  /** true のとき、バートラックのみに shimmer を当てる。Lv ラベル等には波打ちが出ない。 */
  shimmer?: boolean;
  /** バーの色。 */
  color?: string;
  /** アニメーション総時間(ms)。既定 1000。 */
  durationMs?: number;
};

/** progress（加算済み経験値）から現在レベル・レベル内経験値・必要経験値・塗り(0..1) を求める。 */
function resolveProgress(fromLevel: number, fromExp: number, progress: number) {
  let level = fromLevel;
  let exp = fromExp + progress;
  while (canGainExp(level) && exp >= expToNext(level)) {
    exp -= expToNext(level);
    level += 1;
  }
  const need = canGainExp(level) ? expToNext(level) : 0;
  const fill = need > 0 ? Math.max(0, Math.min(1, exp / need)) : 1;
  return { level, exp, need, fill };
}

/**
 * リザルト画面の経験値バー（issue #50）。
 * 戦闘前の経験値から獲得経験値ぶんバーが伸び、レベルアップ時はバーが一巡して次レベルへ進む。
 */
export const BattleExpBar = ({
  fromLevel,
  fromExp,
  gainedExp,
  start,
  shimmer = false,
  color = '#B89255', // $illumination-gold
  durationMs = 1000,
}: Props) => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    if (gainedExp <= 0) {
      setProgress(0);
      return;
    }
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - (1 - t) * (1 - t); // ease-out quad
      setProgress(eased * gainedExp);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [start, gainedExp, durationMs]);

  const { level, exp, need, fill } = resolveProgress(fromLevel, fromExp, progress);

  return (
    <div className={styles.wrap}>
      <div className={`${styles.track}${shimmer ? ' ' + styles.trackShimmer : ''}`}>
        <div
          className={styles.fill}
          style={{ width: `${fill * 100}%`, backgroundColor: color }}
        />
      </div>
      <div className={styles.meta}>
        <span className={styles.level}>Lv{level}</span>
        <span className={styles.next}>
          {need > 0 ? `次まで ${Math.max(0, Math.round(need - exp))}` : 'MAX'}
          {gainedExp > 0 ? `（+${gainedExp}）` : ''}
        </span>
      </div>
    </div>
  );
};
