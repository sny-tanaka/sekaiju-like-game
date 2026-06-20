import { useEffect } from 'react';

import styles from './SealStampFx.module.scss';

import { useSfx } from '@/audio/useSfx';

type Props =
  | {
      /** バリアント: 'stamp' = 文字スタンプ（battle 開始）、'seal' = シジル演出（town ダイブ） */
      variant: 'stamp';
      /** スタンプ内に表示するテキスト（省略時は「戦闘」） */
      caption?: string;
      /** フェードアウト中かどうか（true のとき fadeOut アニメーション） */
      fadeOut?: boolean;
      /** true のとき SE を鳴らさない（EffectsGallery プレビュー用） */
      silent?: boolean;
    }
  | {
      variant: 'seal';
      /** シジル下に表示するキャプション（「SEALING… 1F へ」など） */
      caption?: string;
      /** true のとき SE を鳴らさない（EffectsGallery プレビュー用） */
      silent?: boolean;
    };

/**
 * SealStampFx
 * 封蝋スタンプ / シジル演出共通コンポーネント。
 * - variant='stamp': battle 画面の戦闘開始「戦闘」スタンプ（SE は battle 側 encounter useEffect で発火済み）
 * - variant='seal':  town 画面のダイブ実行時の封蝋シジル（暗転＋円形シジル）。マウント時に dive SE を発火。
 * EffectsGallery の sealStamp セルでも variant='seal' の同一 DOM を参照し、一致を保証する。
 */
export const SealStampFx = (props: Props) => {
  const play = useSfx();
  const { variant, silent = false } = props;

  useEffect(() => {
    if (silent) return;
    // variant='seal' (town ダイブ) のみマウント時に dive SE を発火。
    // variant='stamp' (battle 開始) は battle/index.tsx の encounter useEffect で既に発火するため不要。
    if (variant === 'seal') {
      play('dive');
    }
    // マウント on-mount エフェクト。variant は mount 時に確定し変化しない想定。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (props.variant === 'stamp') {
    const { caption = '戦闘', fadeOut = false } = props;
    return (
      <div
        className={styles.overlay}
        aria-hidden="true"
      >
        <div className={fadeOut ? styles.stampTextOut : styles.stampText}>{caption}</div>
      </div>
    );
  }

  // variant === 'seal'
  const { caption } = props;
  return (
    <div
      className={styles.sealOverlay}
      aria-hidden="true"
    >
      <div className={styles.seal}>
        <div className={styles.sealOuterRing} />
        <div className={styles.sealInnerRing} />
        <div className={styles.sealRadial} />
        <div className={styles.sealDiamond} />
      </div>
      {caption && <div className={styles.sealCaption}>{caption}</div>}
    </div>
  );
};
