import { type ReactNode, useCallback } from 'react';

import styles from './style.module.scss';

import type { SfxId } from '@/audio/sfxManifest';
import { useSfx } from '@/audio/useSfx';

export interface ActionButtonProps {
  /** 文字列ラベル。children と排他的に使う。 */
  label?: string;
  /** 任意の子要素（アイコン＋テキストの組み合わせ等）。label と排他的に使う。 */
  children?: ReactNode;
  /** サブテキスト（説明・Phase 表記など）。button の title 属性に使用。 */
  description?: string;
  disabled?: boolean;
  /** button 要素の aria-label 属性に渡す（a11y 対応）。 */
  ariaLabel?: string;
  /** ボタンの type 属性。form の submit button にも使用可能。 */
  type?: 'button' | 'submit';
  /** 呼び出し側で追加 class を付与できる。見た目は画面側 className が完全に支配する。 */
  className?: string;
  onClick?: () => void;
  /**
   * クリック時に鳴らす効果音 ID。
   * - 省略時: 'decide'（デフォルト）
   * - null: 無音（効果音を鳴らさない）
   */
  sfx?: SfxId | null;
  /**
   * @deprecated ヘッドレス化により無視される。Phase 5-2 で各画面から削除予定。
   */
  variant?: string;
  /**
   * @deprecated ヘッドレス化により無視される。Phase 5-2 で各画面から削除予定。
   */
  size?: string;
  /**
   * @deprecated ヘッドレス化により無視される。Phase 5-2 で各画面から削除予定。
   */
  nostyle?: boolean;
}

/**
 * ActionButton - 押すと何かしらのアクション (選択・実行・遷移) が起きるボタン。
 *
 * ヘッドレス UI:
 * - 見た目は className で完全に画面側が支配
 * - SE 発火、disabled、focus-visible、a11y のみ受け持つ
 * - ブラウザ button デフォルト (border / background / padding / font / text-align) はリセット
 *
 * SE: sfx prop で指定 (default 'decide')。null で無音。
 *
 * variant / size / nostyle は @deprecated (ヘッドレス化により無視される)。
 * Phase 5-2 で各画面から削除する。
 */
export const ActionButton = ({
  label,
  children,
  description,
  disabled = false,
  ariaLabel,
  type = 'button',
  className,
  onClick,
  sfx = 'decide',
  // deprecated props — destructure して捨てる（tsc エラーにならないよう受け取る）
  variant: _variant,
  size: _size,
  nostyle: _nostyle,
}: ActionButtonProps) => {
  const play = useSfx();

  const handleClick = useCallback(() => {
    if (disabled) return;
    if (sfx !== null) play(sfx);
    onClick?.();
  }, [disabled, onClick, play, sfx]);

  const classes = [styles.actionButton, className].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={handleClick}
      title={description}
    >
      {children ?? label}
    </button>
  );
};
