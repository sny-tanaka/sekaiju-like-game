import styles from './style.module.scss';

import { CharacterPortrait } from '@/components/common/CharacterPortrait/CharacterPortrait';
import type { Character, SaveMeta } from '@/domain/types';

type Props = {
  /** セーブの概況。 */
  meta: SaveMeta;
  /** 先頭 5 名分のポートレート用。長さ 0〜5 まで。なければ空配列。 */
  partyPreview?: Character[];
};

const formatTime = (epoch: number): string => {
  if (!epoch) return '-';
  const d = new Date(epoch);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// タイトルに表示する単一セーブのメタカード。通常 / 破損の2状態。
export const SaveCard = ({ meta, partyPreview = [] }: Props) => {
  if (meta.corrupted) {
    return (
      <div className={styles.corrupted}>
        <div className={styles.corruptedText}>⚠ セーブデータが破損しています</div>
        <p className={styles.corruptedNote}>データを読み込めませんでした。新規開始のみ可能です。</p>
      </div>
    );
  }

  const slots = Array.from({ length: 5 }, (_, i) => partyPreview[i] ?? null);

  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <span className={styles.guildName}>{meta.guildName}</span>
        <span className={styles.depth}>
          {meta.deepestReached > 0 ? `${meta.deepestReached}F 到達` : '未踏破'}
        </span>
      </div>
      <div className={styles.partyRow}>
        {slots.map((char, i) =>
          char ? (
            <div
              key={char.id}
              className={styles.partyCell}
            >
              <CharacterPortrait
                raceId={char.raceId}
                classId={char.classId}
                size={30}
                alt={char.name}
              />
            </div>
          ) : (
            <div
              key={i}
              className={`${styles.partyCell} ${styles.partyEmpty}`}
            >
              −
            </div>
          )
        )}
      </div>
      <div className={styles.footRow}>
        <span>団員 {meta.memberCount} 人</span>
        <span>自動保存済 · {formatTime(meta.savedAt)}</span>
      </div>
    </div>
  );
};
