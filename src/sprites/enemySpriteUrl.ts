import type { EnemyId } from '@/domain/types';

// 敵スプライト画像（ファイルは src/assets/enemies/<enemyId>.png）。
// Vite の import.meta.glob で URL を解決する。ビルド時にハッシュ付きで dist にコピーされ、
// missing は build 時に検出可能。
const ENEMY_SPRITES = import.meta.glob('/src/assets/enemies/*.png', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

export const enemySpriteUrl = (id: EnemyId): string | null => {
  const key = `/src/assets/enemies/${id}.png`;
  return ENEMY_SPRITES[key] ?? null;
};
