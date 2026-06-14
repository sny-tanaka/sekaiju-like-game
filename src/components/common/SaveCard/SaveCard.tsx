import styles from './style.module.scss';

import type { SaveMeta } from '@/domain/types';

type Props = {
  /** セーブの概況。 */
  meta: SaveMeta;
  onContinue?: () => void;
};

const formatDate = (epoch: number): string => {
  if (!epoch) return '-';
  const d = new Date(epoch);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// タイトルに表示する単一セーブのカード。通常 / 破損の2状態。
export const SaveCard = ({ meta, onContinue }: Props) => {
  if (meta.corrupted) {
    return (
      <div className={`${styles.card} ${styles.corrupted}`}>
        <div className={styles.corruptedText}>セーブデータが破損しています</div>
        <p className={styles.corruptedNote}>「最初から」で新しく始められます。</p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.guildName}>{meta.guildName}</div>
      <dl className={styles.meta}>
        <div>
          <dt>最高到達階</dt>
          <dd>{meta.deepestReached > 0 ? `${meta.deepestReached}F` : '未踏破'}</dd>
        </div>
        <div>
          <dt>団員</dt>
          <dd>{meta.memberCount}人</dd>
        </div>
        <div>
          <dt>最終セーブ</dt>
          <dd>{formatDate(meta.savedAt)}</dd>
        </div>
      </dl>
      <button
        type="button"
        className={styles.continue}
        onClick={onContinue}
      >
        つづきから
      </button>
    </div>
  );
};
