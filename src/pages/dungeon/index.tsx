import { Navigate, useNavigate } from 'react-router';

import styles from './style.module.scss';

import { useGameState } from '@/store/gameState';

// 探索（ダンジョン）。Phase 1 でグリッド移動・手描きマップ・エンカウントを実装する。
// Phase 0 はルーティングのプレースホルダ。
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
        <h1>探索</h1>
        <p>自動生成1階のグリッド探索・手描きマップは Phase 1 で実装します。</p>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.sub}
          onClick={() => navigate('/battle')}
        >
          戦闘デモへ（仮）
        </button>
        <button
          type="button"
          className={styles.primary}
          onClick={() => navigate('/town')}
        >
          拠点へ帰還
        </button>
      </div>
    </div>
  );
};
