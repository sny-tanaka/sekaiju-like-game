import styles from './style.module.scss';

import { ActionButton } from '@/components/common/ActionButton/ActionButton';
import { SaveTransfer } from '@/components/common/SaveTransfer';
import { useNavigation } from '@/store/navigation';

// セーブの引き継ぎ専用ページ（iOS PWA 対応: モーダル state を持たない独立画面）
export const Page = () => {
  const { navigate } = useNavigation();

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <p className={styles.chapterMark}>❦ 同見の書</p>
        <ActionButton
          label="もどる"
          className={styles.backBtn}
          sfx="cancel"
          onClick={() => navigate({ name: 'title' })}
        />
      </header>

      <div className={styles.content}>
        <SaveTransfer />
      </div>
    </div>
  );
};
