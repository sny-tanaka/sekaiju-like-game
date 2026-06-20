import { useEffect, useRef } from 'react';

import styles from './DamagePop.module.scss';

export type DamagePopVariant = 'damage' | 'heal' | 'crit';

export interface DamagePopProps {
  /** 表示するテキストまたは数値 */
  value: number | string;
  /** 演出バリアント（デフォルト 'damage'） */
  variant?: DamagePopVariant;
  /** 属性別の色（damage / crit のとき有効）。例: 'fire' | 'ice' | 'volt' */
  element?: string;
  /** アニメーション完了コールバック */
  onDone?: () => void;
}

// splatA の duration に合わせたタイムアウト（0% → 100%）
const ANIM_DURATION_MS = 760;

/**
 * ダメージ・回復・会心のポップアップ数値エフェクト。
 * モック `案A_v3.dc.html` の `splatA` keyframes（上昇テキスト）をベースとする。
 * `position: absolute` を自前で持つため、親要素は `position: relative` であること。
 */
export const DamagePop = ({ value, variant = 'damage', element, onDone }: DamagePopProps) => {
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    const t = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
    }, ANIM_DURATION_MS + 50); // 余裕を少し持たせる
    return () => clearTimeout(t);
  }, [onDone]);

  const elemClass = element ? (styles[`elem_${element}`] ?? '') : '';

  return (
    <div
      className={`${styles.pop} ${styles[variant]} ${elemClass}`}
      aria-hidden="true"
    >
      {variant === 'crit' && <div className={styles.critFlash} />}
      <span className={styles.value}>{value}</span>
    </div>
  );
};
