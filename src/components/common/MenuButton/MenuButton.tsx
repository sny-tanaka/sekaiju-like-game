import styles from './style.module.scss';

import type { SfxId } from '@/audio/sfxManifest';
import { useSfx } from '@/audio/useSfx';

type Props = {
  label: string;
  /** サブテキスト（説明・Phase 表記など）。 */
  description?: string;
  variant?: 'primary' | 'default';
  disabled?: boolean;
  onClick?: () => void;
  /**
   * クリック時に鳴らす効果音 ID。
   * - 省略時: 'decide'（デフォルト）
   * - null: 無音（効果音を鳴らさない）
   */
  sfx?: SfxId | null;
};

// 拠点メニュー等で使う、スマホ前提の大きめタップ領域を持つボタン。
export const MenuButton = ({
  label,
  description,
  variant = 'default',
  disabled = false,
  onClick,
  sfx = 'decide',
}: Props) => {
  const play = useSfx();

  const handleClick = () => {
    if (!disabled && sfx !== null) {
      play(sfx);
    }
    onClick?.();
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${variant === 'primary' ? styles.primary : ''}`}
      disabled={disabled}
      onClick={handleClick}
    >
      <span className={styles.label}>{label}</span>
      {description ? <span className={styles.description}>{description}</span> : null}
    </button>
  );
};
