import { useEffect } from 'react';

import styles from './AttackFx.module.scss';

import { useSfx } from '@/audio/useSfx';
import type { Element } from '@/domain/types';

type Props = {
  element: Element;
  isCrit?: boolean;
  /** true のとき SE を鳴らさない（EffectsGallery プレビュー用） */
  silent?: boolean;
};

/**
 * AttackFx
 * 攻撃エフェクト共通コンポーネント。
 * battle 画面と EffectsGallery の両方から参照し、同一 DOM・アニメーションを保証する。
 *
 * マウント時に 'attack' SE（会心時は 'critical' も）を自動再生する。
 * key で per-hit remount させることでアニメーションと SE が構造的に同期する。
 * EffectsGallery など SE 不要な用途には silent={true} を渡す。
 */
export const AttackFx = ({ element, isCrit = false, silent = false }: Props) => {
  const play = useSfx();
  useEffect(() => {
    if (silent) return;
    play('attack');
    if (isCrit) play('critical');
    // マウント時 1 回のみ発火。element/isCrit が変わっても key で remount される前提。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={styles.attackFx}
      aria-hidden="true"
    >
      <div className={styles.hitFlashOverlay} />
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
