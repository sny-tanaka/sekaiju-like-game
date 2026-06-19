import styles from './style.module.scss';

import type { ItemId } from '@/domain/types';
import { itemSpriteUrl } from '@/sprites/itemSpriteUrl';

// ============================================================================
// アイテム/装備スプライト表示コンポーネント。
// size で表示サイズ、silhouette でシルエット化を制御する。
// equip_* / item_* のどちらの ItemId も扱える。
// ============================================================================

type Size = 'sm' | 'md' | 'lg'; // sm: ~24px, md: ~48px, lg: ~96px

type Props = {
  itemId: ItemId; // equip_* or item_*
  size?: Size; // default 'sm'（リスト内が主用途）
  silhouette?: boolean;
  alt?: string;
  className?: string;
};

export const ItemSprite = ({ itemId, size = 'sm', silhouette = false, alt, className }: Props) => {
  const resolvedAlt = alt ?? '';

  return (
    <span className={`${styles.wrap} ${className ?? ''}`}>
      <img
        src={itemSpriteUrl(itemId)}
        alt={resolvedAlt}
        className={`${styles.img} ${styles[size]} ${silhouette ? styles.silhouette : ''}`}
      />
    </span>
  );
};
