import styles from './style.module.scss';

import type { ClassId, RaceId } from '@/domain/types';

const PORTRAITS = import.meta.glob('/src/assets/characters/race_*_class_*.png', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

function getPortraitUrl(raceId: RaceId, classId: ClassId): string | null {
  const key = `/src/assets/characters/race_${raceId}_class_${classId}.png`;
  return PORTRAITS[key] ?? null;
}

interface Props {
  raceId: RaceId;
  classId: ClassId;
  /** 表示幅 (px)。高さは画像比に従う。 */
  size?: number;
  /** alt 文言。省略時は raceId/classId から自動生成。 */
  alt?: string;
  /** 既存 UI に馴染ませるための追加クラス。 */
  className?: string;
}

export const CharacterPortrait = ({ raceId, classId, size = 48, alt, className }: Props) => {
  const url = getPortraitUrl(raceId, classId);
  if (!url) return null;

  const altText = alt ?? `${raceId} ${classId}`;

  return (
    <img
      src={url}
      alt={altText}
      width={size}
      className={[styles.portrait, className].filter(Boolean).join(' ')}
      style={{ imageRendering: 'pixelated' }}
    />
  );
};
