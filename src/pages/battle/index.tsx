import { Navigate, useNavigate } from 'react-router';

import styles from './style.module.scss';

import { useGameState } from '@/store/gameState';

// 戦闘。Phase 2 で隊列・ターン制・スキル・状態異常・勝敗処理を実装する。
// Phase 0 はルーティングのプレースホルダ（ダミー戦闘画面）。
export const Page = () => {
  const navigate = useNavigate();
  const { save } = useGameState();

  if (!save) {
    return (
      <Navigate
        to="/title"
        replace
      />
    );
  }

  return (
    <div className={styles.layout}>
      <div className={styles.placeholder}>
        <h1>戦闘</h1>
        <p>ターン制バトルは Phase 2 で実装します。</p>
      </div>
      <button
        type="button"
        className={styles.primary}
        onClick={() => navigate('/dungeon')}
      >
        探索へ戻る
      </button>
    </div>
  );
};
