import styles from './style.module.scss';

import { ENEMIES } from '@/data/enemies';
import type { EnemyId } from '@/domain/types';
import { enemySpriteUrl } from '@/sprites/enemySpriteUrl';

// ============================================================================
// 敵スプライト表示コンポーネント。
// size で表示サイズ、silhouette で図鑑の未遭遇シルエット化を制御する。
// ============================================================================

type Size = 'sm' | 'md' | 'lg'; // sm: ~48px, md: ~96px, lg: ~160px

type Props = {
  enemyId: EnemyId;
  size?: Size; // default 'md'
  silhouette?: boolean; // true でシルエット化（図鑑の未遭遇用）
  alt?: string; // a11y。省略時は ENEMIES[enemyId]?.name を使う。なければ空文字
  className?: string; // 親側からの追加クラス（位置調整など）
};

export const EnemySprite = ({
  enemyId,
  size = 'md',
  silhouette = false,
  alt,
  className,
}: Props) => {
  const resolvedAlt = alt ?? ENEMIES[enemyId]?.name ?? '';

  return (
    <span className={`${styles.wrap} ${className ?? ''}`}>
      <img
        src={enemySpriteUrl(enemyId)}
        alt={resolvedAlt}
        className={`${styles.img} ${styles[size]} ${silhouette ? styles.silhouette : ''}`}
      />
    </span>
  );
};
