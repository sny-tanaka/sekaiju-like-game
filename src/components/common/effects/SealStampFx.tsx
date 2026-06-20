import styles from './SealStampFx.module.scss';

type Props =
  | {
      /** バリアント: 'stamp' = 文字スタンプ（battle 開始）、'seal' = シジル演出（town ダイブ） */
      variant: 'stamp';
      /** スタンプ内に表示するテキスト（省略時は「戦闘」） */
      caption?: string;
      /** フェードアウト中かどうか（true のとき fadeOut アニメーション） */
      fadeOut?: boolean;
    }
  | {
      variant: 'seal';
      /** シジル下に表示するキャプション（「SEALING… 1F へ」など） */
      caption?: string;
    };

/**
 * SealStampFx
 * 封蝋スタンプ / シジル演出共通コンポーネント。
 * - variant='stamp': battle 画面の戦闘開始「戦闘」スタンプ
 * - variant='seal':  town 画面のダイブ実行時の封蝋シジル（暗転＋円形シジル）
 * EffectsGallery の sealStamp セルでも variant='seal' の同一 DOM を参照し、一致を保証する。
 */
export const SealStampFx = (props: Props) => {
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
