import { useNavigate, Navigate } from 'react-router';

import styles from './style.module.scss';

import { MenuButton } from '@/components/common/MenuButton/MenuButton';
import { useGameState } from '@/store/gameState';

// 拠点（街）ハブ（[07 §2]）。各施設への導線を持つ。
// Phase 0 では未実装施設は無効表示にし、ダイブとタイトル復帰のみ機能する。
export const Page = () => {
  const navigate = useNavigate();
  const { save, exitToTitle } = useGameState();

  // セーブが無い状態で直接来たらタイトルへ
  if (!save) {
    return (
      <Navigate
        to="/title"
        replace
      />
    );
  }

  const { guild, towerState, diveState } = save;

  const handleExit = () => {
    exitToTitle();
    navigate('/title');
  };

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <div className={styles.guildName}>{guild.name}</div>
        <dl className={styles.stats}>
          <div>
            <dt>所持金</dt>
            <dd>{guild.gold} G</dd>
          </div>
          <div>
            <dt>最高到達</dt>
            <dd>
              {towerState.record.deepestReached > 0 ? `${towerState.record.deepestReached}F` : '-'}
            </dd>
          </div>
          <div>
            <dt>団員</dt>
            <dd>{guild.members.length}人</dd>
          </div>
        </dl>
      </header>

      <main className={styles.menu}>
        <MenuButton
          label={diveState ? '潜行を再開' : 'ダイブ開始'}
          description={diveState ? `${diveState.depth}F から再開` : '第1階からタワーへ潜る'}
          variant="primary"
          onClick={() => navigate('/dungeon')}
        />
        <MenuButton
          label="ギルド管理"
          description="編成・キャラ作成（Phase 3）"
          disabled
        />
        <MenuButton
          label="ショップ"
          description="装備・アイテム売買（Phase 3）"
          disabled
        />
        <MenuButton
          label="鍛冶屋"
          description="武器強化（Phase 4）"
          disabled
        />
        <MenuButton
          label="図鑑 / 記録"
          description="到達記録・図鑑（Phase 4-5）"
          disabled
        />
      </main>

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.exit}
          onClick={handleExit}
        >
          タイトルへ戻る
        </button>
      </footer>
    </div>
  );
};
