import styles from './style.module.scss';

type Props = {
  label: string;
  /** サブテキスト（説明・Phase 表記など）。 */
  description?: string;
  variant?: 'primary' | 'default';
  disabled?: boolean;
  onClick?: () => void;
};

// 拠点メニュー等で使う、スマホ前提の大きめタップ領域を持つボタン。
export const MenuButton = ({
  label,
  description,
  variant = 'default',
  disabled = false,
  onClick,
}: Props) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${variant === 'primary' ? styles.primary : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={styles.label}>{label}</span>
      {description ? <span className={styles.description}>{description}</span> : null}
    </button>
  );
};
