import type { ReactNode } from 'react';

import styles from './style.module.scss';

import type { SfxId } from '@/audio/sfxManifest';
import { useSfx } from '@/audio/useSfx';

type ActionButtonProps = {
  /** 文字列ラベル。children と排他的に使う。 */
  label?: string;
  /** 任意の子要素（アイコン＋テキストの組み合わせ等）。label と排他的に使う。 */
  children?: ReactNode;
  /** サブテキスト（説明・Phase 表記など）。 */
  description?: string;
  variant?: 'primary' | 'default';
  /**
   * ボタンサイズ。
   * - 'small': 戦闘画面の小型ボタン向け（min-height: 36px）
   * - 'medium': 現行スタイル相当（min-height: 56px、スマホ用タップ領域）
   * - 'large': 確認ダイアログ等の重要ボタン向け（min-height: 64px）
   */
  size?: 'small' | 'medium' | 'large';
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
 */
export const ActionButton = ({
  label,
  children,
  description,
  variant = 'default',
  size = 'medium',
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

  const sizeClass = styles[size];

  return (
    <button
      type={type}
      className={[
        styles.actionButton,
        variant === 'primary' ? styles.primary : '',
        sizeClass,
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
