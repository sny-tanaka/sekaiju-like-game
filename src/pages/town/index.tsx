import { useState } from 'react';

import styles from './style.module.scss';

import { useSfx } from '@/audio/useSfx';
import { MenuButton } from '@/components/common/MenuButton/MenuButton';
import { startDive } from '@/domain/dive';
import { useGameState } from '@/store/gameState';
import { Redirect, useNavigation } from '@/store/navigation';

// 拠点（街）ハブ（[07 §2]）。各施設への導線を持つ。
export const Page = () => {
  const { navigate } = useNavigation();
  const { save, exitToTitle, applyAndPersist } = useGameState();
  const play = useSfx();
  const [warpOpen, setWarpOpen] = useState(false);

  // セーブが無い状態で直接来たらタイトルへ
  if (!save) {
    return <Redirect to={{ name: 'title' }} />;
  }

  const { guild, towerState, diveState } = save;
  // 団員が 0 人の間はギルドメニュー以外（ダイブ・ショップ等）を使えない（確定事項）。
  const hasMembers = guild.members.length > 0;

  const handleExit = () => {
    play('cancel');
    exitToTitle();
    navigate({ name: 'title' });
  };

  // ダイブ開始（潜行中でなければ第1階から開始してオートセーブ）/ 潜行を再開
  const handleDive = async () => {
    play('dive');
    if (!diveState) {
      await applyAndPersist((s) => startDive(s, 1));
    }
    navigate({ name: 'dungeon' });
  };

  // 10層ワープ（[06 §5]）: 解放済みチェックポイントへ新規ダイブ開始。
  const checkpoints = towerState.warp.unlockedCheckpoints;
  const handleWarp = async (depth: number) => {
    play('warp');
    setWarpOpen(false);
    await applyAndPersist((s) => startDive(s, depth));
    navigate({ name: 'dungeon' });
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
      {hasMembers && diveState && (
        <p className={styles.hint}>
          潜行中のため、ダイブ再開と「タイトルへ戻る」以外は利用できません。
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
          sfx={null}
          onClick={() => void handleDive()}
        />
        <MenuButton
          label="ワープ"
          description={
            checkpoints.length === 0
              ? 'ボス撃破で解放'
              : diveState
                ? '潜行中は使えません'
                : `解放済み: ${checkpoints.map((d) => `${d}F`).join('・')}`
          }
          disabled={!hasMembers || checkpoints.length === 0 || !!diveState}
          sfx={null}
          onClick={() => setWarpOpen(true)}
        />
        <MenuButton
          label="ギルド管理"
          description={diveState ? '潜行中は使えません' : '編成・キャラ作成'}
          disabled={!!diveState}
          onClick={() => navigate({ name: 'guild' })}
        />
        <MenuButton
          label="ショップ"
          description={diveState ? '潜行中は使えません' : '装備・アイテム売買'}
          disabled={!!diveState}
          onClick={() => navigate({ name: 'shop' })}
        />
        <MenuButton
          label="鍛冶屋"
          description={diveState ? '潜行中は使えません' : '装備の強化・リサイクル'}
          disabled={!!diveState}
          onClick={() => navigate({ name: 'forge' })}
        />
        <MenuButton
          label="図鑑 / 記録"
          description={diveState ? '潜行中は使えません' : '到達記録・モンスター図鑑'}
          disabled={!!diveState}
          onClick={() => navigate({ name: 'codex' })}
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

      {warpOpen ? (
        <div
          className={styles.warpOverlay}
          onClick={() => setWarpOpen(false)}
        >
          <div
            className={styles.warpPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.warpTitle}>ワープ先を選択</div>
            {checkpoints.map((d) => (
              <button
                type="button"
                key={d}
                className={styles.warpBtn}
                onClick={() => void handleWarp(d)}
              >
                第 {d} 階へ
              </button>
            ))}
            <button
              type="button"
              className={styles.warpClose}
              onClick={() => {
                play('cancel');
                setWarpOpen(false);
              }}
            >
              とじる
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
