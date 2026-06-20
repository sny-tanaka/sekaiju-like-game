import type { ReactNode } from 'react';

import styles from './style.module.scss';

import type { SfxId } from '@/audio/sfxManifest';
import { useSfx } from '@/audio/useSfx';

/**
 * ActionButton のバリアント。
 * - 'default': parchment 背景のメニューボタン（既存の見た目）
 * - 'primary': ゴールドグラデーションの CTA ボタン
 * - 'secondary': 透明背景 + ボーダー（サブ・戻るボタン等）
 * - 'destructive': 危険操作用の赤ボタン
 * - 'icon': 34px 円形の透明ボタン（歯車等のアイコン）
 * - 'ghost': テキストリンク調（更新ボタン・モーダル閉じる等）
 * - 'card': 複数行カード型（ダイブ・タイル・種族カード等）
 * - 'tab': セグメント/チップ型（caller が active 状態を className で付与）
 */
export type ActionButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'icon'
  | 'ghost'
  | 'card'
  | 'tab';

/** size が適用される variant（その他は自前で高さを持つ）。 */
const VARIANTS_USING_SIZE = ['default', 'primary', 'secondary', 'destructive'] as const;
type VariantUsingSize = (typeof VARIANTS_USING_SIZE)[number];

type ActionButtonProps = {
  /** 文字列ラベル。children と排他的に使う。 */
  label?: string;
  /** 任意の子要素（アイコン＋テキストの組み合わせ等）。label と排他的に使う。 */
  children?: ReactNode;
  /** サブテキスト（説明・Phase 表記など）。 */
  description?: string;
  variant?: ActionButtonVariant;
  /**
   * ボタンサイズ。default / primary / secondary / destructive にのみ適用。
   * - 'small': 戦闘画面の小型ボタン向け（min-height: 36px）
   * - 'medium': 現行スタイル相当（min-height: 56px、スマホ用タップ領域）
   * - 'large': 確認ダイアログ等の重要ボタン向け（min-height: 64px）
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * true のとき、variant の base スタイル (border / background / padding / min-height /
   * width / text-align など) を全て無効化する。className で旧 bare button スタイルを
   * 完全復活したい場合に使う。
   * SE / disabled / focus / a11y / hover の transition だけ残す。
   */
  nostyle?: boolean;
  disabled?: boolean;
  /** button 要素の aria-label 属性に渡す（a11y 対応）。 */
  ariaLabel?: string;
  /** ボタンの type 属性。form の submit button にも使用可能。 */
  type?: 'button' | 'submit';
  /** 呼び出し側で追加 class を付与できる。 */
  className?: string;
  onClick?: () => void;
  /**
   * クリック時に鳴らす効果音 ID。
   * - 省略時: 'decide'（デフォルト）
   * - null: 無音（効果音を鳴らさない）
   */
  sfx?: SfxId | null;
};

/**
 * アクションボタン。選択・実行・画面遷移など、何らかのアクションを発火するボタン全般に使う。
 * スマホ前提の十分なタップ領域（size='medium' で min-height: 56px）を持つ。
 *
 * variant で見た目を切り替える。省略時は 'default'（parchment メニュースタイル）。
 */
export const ActionButton = ({
  label,
  children,
  description,
  variant = 'default',
  size = 'medium',
  nostyle = false,
  disabled = false,
  ariaLabel,
  type = 'button',
  className,
  onClick,
  sfx = 'decide',
}: ActionButtonProps) => {
  const play = useSfx();

  const handleClick = () => {
    if (!disabled && sfx !== null) {
      play(sfx);
    }
    onClick?.();
  };

  const usesSize = VARIANTS_USING_SIZE.includes(variant as VariantUsingSize);

  return (
    <button
      type={type}
      className={[
        styles.actionButton,
        nostyle ? '' : styles[variant],
        nostyle || !usesSize ? '' : styles[size],
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children ?? <span className={styles.label}>{label}</span>}
      {description ? <span className={styles.description}>{description}</span> : null}
    </button>
  );
};
