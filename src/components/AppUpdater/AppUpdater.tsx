import styles from './style.module.scss';

import { ActionButton } from '@/components/common/ActionButton/ActionButton';
import type { AppUpdateBanner } from '@/hooks/useAppUpdate';

type Props = {
  banner: AppUpdateBanner;
  // 「更新」ボタン押下時のハンドラ。banner.kind === 'has-update' のときだけ使う。
  onApply: () => void;
};

// 画面下端に出すトースト型バナー。状態は呼び出し側 (PreStartLayout) が
// useAppUpdate から取り出して渡す。表示なし (banner === null) の場合は
// 何もレンダーしない。
export const AppUpdater = ({ banner, onApply }: Props) => {
  if (banner === null) return null;

  if (banner.kind === 'has-update') {
    return (
      <div
        className={styles.banner}
        role="status"
        aria-live="polite"
      >
        <span className={styles.message}>新しいバージョンがあります</span>
        <ActionButton
          label="更新"
          size="small"
          className={styles.button}
          onClick={onApply}
        />
      </div>
    );
  }

  // banner.kind === 'up-to-date'
  return (
    <div
      className={`${styles.banner} ${styles.banner_info}`}
      role="status"
      aria-live="polite"
    >
      <span className={styles.message}>現在のバージョンは最新です</span>
    </div>
  );
};
