import styles from './style.module.scss';

export const Page = () => {
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
        <button
          type="button"
          className={styles.back}
          onClick={() => history.back()}
        >
          戻る
        </button>
      </footer>
    </div>
  );
};
