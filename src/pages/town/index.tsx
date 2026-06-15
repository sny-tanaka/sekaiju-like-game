import { useNavigate, Navigate } from 'react-router';

import styles from './style.module.scss';

import { MenuButton } from '@/components/common/MenuButton/MenuButton';
import { startDive } from '@/domain/dive';
import { useGameState } from '@/store/gameState';

// 拠点（街）ハブ（[07 §2]）。各施設への導線を持つ。
export const Page = () => {
  const navigate = useNavigate();
  const { save, exitToTitle, applyAndPersist } = useGameState();

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
  // 団員が 0 人の間はギルドメニュー以外（ダイブ・ショップ等）を使えない（確定事項）。
  const hasMembers = guild.members.length > 0;

  const handleExit = () => {
    exitToTitle();
    navigate('/title');
  };

  // ダイブ開始（潜行中でなければ第1階から開始してオートセーブ）/ 潜行を再開
  const handleDive = async () => {
    if (!diveState) {
      await applyAndPersist((s) => startDive(s, 1));
    }
    navigate('/dungeon');
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

      {!hasMembers && (
        <p className={styles.hint}>
          まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。
        </p>
      )}

      <main className={styles.menu}>
        <MenuButton
          label={diveState ? '潜行を再開' : 'ダイブ開始'}
          description={
            !hasMembers
              ? '団員が必要です'
              : diveState
                ? `${diveState.depth}F から再開`
                : '第1階からタワーへ潜る'
          }
          variant="primary"
          disabled={!hasMembers}
          onClick={() => void handleDive()}
        />
        <MenuButton
          label="ギルド管理"
          description="編成・キャラ作成"
          onClick={() => navigate('/guild')}
        />
        <MenuButton
          label="ショップ"
          description="装備・アイテム売買"
          onClick={() => navigate('/shop')}
        />
        <MenuButton
          label="鍛冶屋"
          description="装備の強化・リサイクル"
          onClick={() => navigate('/forge')}
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
