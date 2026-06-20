import styles from './AttackFx.module.scss';

import type { Element } from '@/domain/types';

type Props = {
  element: Element;
  isCrit?: boolean;
};

/**
 * AttackFx
 * 攻撃エフェクト共通コンポーネント。
 * battle 画面と EffectsGallery の両方から参照し、同一 DOM・アニメーションを保証する。
 */
export const AttackFx = ({ element, isCrit = false }: Props) => {
  return (
    <div
      className={styles.attackFx}
      aria-hidden="true"
    >
      {element === 'slash' && <div className={styles.barSlash} />}
      {element === 'pierce' && (
        <>
          <div className={styles.barThrust} />
          <span className={styles.arrowThrust}>➤</span>
        </>
      )}
      {element === 'bash' && (
        <>
          <div className={styles.ringBash} />
          <span className={styles.iconBash}>💥</span>
        </>
      )}
      {element === 'fire' && (
        <>
          <div className={styles.orbFire} />
          <span className={styles.iconFire}>🔥</span>
        </>
      )}
      {element === 'ice' && (
        <>
          <div className={styles.squareIce} />
          <span className={styles.iconIce}>❄</span>
        </>
      )}
      {element === 'volt' && (
        <>
          <div className={styles.boltVolt} />
          <span className={styles.iconVolt}>⚡</span>
        </>
      )}
      {element === 'almighty' && (
        <>
          <div className={styles.orbMagic} />
          <span className={styles.iconMagic}>✦</span>
        </>
      )}
      {isCrit && <div className={styles.critFlash} />}
    </div>
  );
};
