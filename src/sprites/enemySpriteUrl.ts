import type { EnemyId } from '@/domain/types';

// 敵スプライト画像ID（ファイルは public/sprites/enemies/<enemyId>.png）。
// Vite のサブパス公開（BASE_URL）に対応するため import.meta.env.BASE_URL を尊重。
export const enemySpriteUrl = (id: EnemyId): string =>
  `${import.meta.env.BASE_URL}sprites/enemies/${id}.png`;
