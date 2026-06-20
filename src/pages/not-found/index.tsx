import styles from './style.module.scss';

import { ActionButton } from '@/components/common/ActionButton/ActionButton';
import { useGameState } from '@/store/gameState';
import { useNavigation } from '@/store/navigation';

export const Page = () => {
  const { navigate } = useNavigation();
  const { save } = useGameState();

  // セーブが無ければ title に戻し、あれば town に戻す。
  const handleBack = () => {
    navigate({ name: save ? 'town' : 'title' });
  };

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <p className={styles.chapterMark}>❦ 行方知れずの頁</p>
      </header>

      <main className={styles.body}>
        <div
          className={styles.emblem}
          aria-hidden
        >
          <span className={styles.emblemRing} />
          <span className={styles.emblemMark}>？</span>
        </div>
        <p className={styles.code}>404</p>
        <p className={styles.message}>
          お探しのページは
          <br />
          見つかりませんでした。
        </p>
      </main>

      <footer className={styles.foot}>
        <ActionButton
          label={save ? '拠点へ戻る' : 'タイトルへ戻る'}
          variant="secondary"
          className={styles.back}
          onClick={handleBack}
        />
      </footer>
    </div>
  );
};
