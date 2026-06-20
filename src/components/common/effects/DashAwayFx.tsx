import styles from './DashAwayFx.module.scss';

type Props = {
  /** true のとき表示 */
  visible: boolean;
  /** 'ally' = 味方側（右へ逃走）、'enemy' = 敵側（右へ逃走） */
  side: 'ally' | 'enemy';
};

/**
 * DashAwayFx
 * 逃走時キャラ離脱エフェクト共通コンポーネント。
 * battle 画面の逃走成功時に味方カードへ適用する className を提供する。
 * EffectsGallery の dashAway セルでも同じ DOM を参照し、一致を保証する。
 */
export const DashAwayFx = ({ visible }: Props) => {
  if (!visible) return null;
  return (
    <div
      style={{ overflow: 'hidden', width: 80, height: 50, position: 'relative' }}
      aria-hidden="true"
    >
      <span
        className={styles.dashAway}
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          fontSize: 26,
        }}
      >
        🏃
      </span>
    </div>
  );
};

/** battle で className として使いたいとき向けのエクスポート */
export const dashAwayClass = styles.dashAway;
