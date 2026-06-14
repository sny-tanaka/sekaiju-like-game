import styles from './style.module.scss';

import type { SlotMeta } from '@/domain/types';

type Props = {
  slotIndex: number;
  /** スロットのメタ情報。空スロットは null。 */
  meta: SlotMeta | null;
  onContinue?: () => void;
  onNewGame?: () => void;
  onDelete?: () => void;
};

const formatDate = (epoch: number): string => {
  if (!epoch) return '-';
  const d = new Date(epoch);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// タイトルのスロット選択カード。空 / データあり / 破損の3状態を表示する。
export const SlotCard = ({ slotIndex, meta, onContinue, onNewGame, onDelete }: Props) => {
  const slotLabel = `スロット ${slotIndex + 1}`;

  if (meta === null) {
    return (
      <div className={`${styles.card} ${styles.empty}`}>
        <div className={styles.header}>{slotLabel}</div>
        <div className={styles.emptyText}>空きスロット</div>
        <button
          type="button"
          className={styles.primaryAction}
          onClick={onNewGame}
        >
          新規作成
        </button>
      </div>
    );
  }

  if (meta.corrupted) {
    return (
      <div className={`${styles.card} ${styles.corrupted}`}>
        <div className={styles.header}>{slotLabel}</div>
        <div className={styles.corruptedText}>データが破損しています</div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryAction}
            onClick={onNewGame}
          >
            新規作成
          </button>
          <button
            type="button"
            className={styles.subAction}
            onClick={onDelete}
          >
            削除
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>{slotLabel}</div>
      <div className={styles.guildName}>{meta.guildName}</div>
      <dl className={styles.meta}>
        <div>
          <dt>最高到達階</dt>
          <dd>{meta.deepestReached > 0 ? `${meta.deepestReached}F` : '未踏破'}</dd>
        </div>
        <div>
          <dt>代表Lv</dt>
          <dd>{meta.level}</dd>
        </div>
        <div>
          <dt>最終セーブ</dt>
          <dd>{formatDate(meta.savedAt)}</dd>
        </div>
      </dl>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.primaryAction}
          onClick={onContinue}
        >
          つづきから
        </button>
        <button
          type="button"
          className={styles.subAction}
          onClick={onDelete}
        >
          削除
        </button>
      </div>
    </div>
  );
};
