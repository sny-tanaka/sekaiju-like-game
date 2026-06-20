import styles from './RuneSpinFx.module.scss';

type Props = {
  /** true のとき表示、false のとき非表示 */
  visible: boolean;
};

/**
 * RuneSpinFx
 * 詠唱ルーン ✦ オーバーレイ共通コンポーネント。
 * battle 画面で魔法スキルを選択したキャラの味方カード上に表示。
 * EffectsGallery の runeSpin セルでも同じ DOM を参照し、一致を保証する。
 */
export const RuneSpinFx = ({ visible }: Props) => {
  if (!visible) return null;
  return (
    <div
      className={styles.runeSpin}
      aria-hidden="true"
    >
      ✦
    </div>
  );
};
