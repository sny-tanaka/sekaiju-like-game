import styles from './SummonAppearFx.module.scss';

type Props = {
  /** true のとき summonAppear アニメーションを適用するクラスを返す */
  visible: boolean;
};

/**
 * SummonAppearFx
 * 召喚体登場エフェクト共通コンポーネント。
 * visible=true のとき summonAppear アニメーション用クラス名を返す。
 * battle 画面の .summonNew クラスをこちらに一本化し、
 * EffectsGallery の summonAppear セルでも同じ DOM を参照して一致を保証する。
 *
 * 使用例（battle）:
 *   className={[styles.card, summonAppearFxClass(isNew)].join(' ')}
 *
 * 使用例（EffectsGallery）:
 *   <div className={SummonAppearFx.className}>🔥</div>
 *
 * 直接 JSX でも利用できるよう、className プロパティを公開している。
 */
export const SummonAppearFx = ({ visible }: Props) => {
  if (!visible) return null;
  return (
    <div
      className={styles.summonAppear}
      aria-hidden="true"
      style={{ fontSize: 34, lineHeight: 1 }}
    >
      🔥
    </div>
  );
};

/** battle で className として使いたいとき向けのエクスポート */
export const summonAppearClass = styles.summonAppear;
