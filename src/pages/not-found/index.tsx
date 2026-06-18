import styles from './style.module.scss';

export const Page = () => {
  return (
    <div className={styles.layout}>
      <p className={styles.chapterMark}>❦ 行方知れずの頁</p>
      <p className={styles.body}>お探しのページは見つかりませんでした。</p>
      <button
        className={styles.back}
        onClick={() => history.back()}
      >
        戻る
      </button>
    </div>
  );
};
