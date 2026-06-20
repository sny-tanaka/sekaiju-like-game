import { useState } from 'react';

import styles from './style.module.scss';

import { useSfx } from '@/audio/useSfx';
import { ActionButton } from '@/components/common/ActionButton/ActionButton';
import { SealStampFx } from '@/components/common/effects/SealStampFx';
import { WarpScanFx } from '@/components/common/effects/WarpScanFx';
import { SoundSettings } from '@/components/common/SoundSettings';
import { startDive } from '@/domain/dive';
import { useGameState } from '@/store/gameState';
import { Redirect, useNavigation } from '@/store/navigation';

// 拠点（街）ハブ — 黒曜 OBSIDIAN MINIMAL v2（2x2 グリッド + 大ダイブカード）
export const Page = () => {
  const { navigate } = useNavigation();
  const { save, exitToTitle, applyAndPersist } = useGameState();
  const play = useSfx();

  const [warpOpen, setWarpOpen] = useState(false);
  const [soundOpen, setSoundOpen] = useState(false);
  const [sealActive, setSealActive] = useState(false);
  const [sealingDepth, setSealingDepth] = useState<number>(1);
  const [warpScanActive, setWarpScanActive] = useState(false);

  if (!save) {
    return <Redirect to={{ name: 'title' }} />;
  }

  const { guild, towerState, diveState } = save;
  const hasMembers = guild.members.length > 0;
  const checkpoints = towerState.warp.unlockedCheckpoints;

  const handleExit = () => {
    exitToTitle();
    navigate({ name: 'title' });
  };

  // ダイブカード押下: 潜行中なら即再開、そうでなければ bottom-sheet を開く
  const handleDiveClick = () => {
    if (!hasMembers) return;
    if (diveState) {
      void resumeDive();
      return;
    }
    setWarpOpen(true);
  };

  const resumeDive = async () => {
    // 再潜行（SealStampFx 未表示のフロー）のため play('dive') はここで発火
    play('dive');
    navigate({ name: 'dungeon' });
  };

  // bottom-sheet から階を選択 → ダイブ実行
  // フロー: warpScan 演出 (0.9s) → sealStamp 演出 (700ms) → dungeon 遷移
  const handleSelectFloor = async (depth: number) => {
    // warp SE は WarpScanFx visible=true 時に発火するため削除
    setWarpOpen(false);
    await applyAndPersist((s) => startDive(s, depth));
    setSealingDepth(depth);
    // Step 1: warpScan スキャン線を発火
    setWarpScanActive(true);
    await new Promise((r) => setTimeout(r, 900));
    setWarpScanActive(false);
    // Step 2: sealStamp 封蝋演出を発火 (暗転 800ms)
    setSealActive(true);
    await new Promise((r) => setTimeout(r, 800));
    navigate({ name: 'dungeon' });
  };

  // 2x2 タイル押下
  const goto = (target: 'guild' | 'shop' | 'forge' | 'codex') => () => {
    if (diveState) return;
    navigate({ name: target });
  };

  // bottom-sheet に並べる選択肢: 1F + 解放済みチェックポイント (昇順)
  const sheetFloors: number[] = [1, ...checkpoints.filter((d) => d !== 1)].sort((a, b) => a - b);
  // モック準拠表示: 1F は「最初から潜る」、それ以外は「第 N 帯」
  const floorLabel = (d: number) =>
    d === 1 ? '第1階から（最初から潜る）' : `第 ${Math.ceil(d / 10)} 帯`;
  // 最深チェックポイント（1F 以外で最大）: bottom-sheet で金箔ハイライトする
  const deepestSheetFloor = sheetFloors.length > 1 ? sheetFloors[sheetFloors.length - 1] : null;

  // 自動保存表示用 HH:MM（save.savedAt が 0 の場合は時刻無し）
  const autosaveLabel = (() => {
    if (!save.savedAt) return '自動保存済';
    const time = new Date(save.savedAt).toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return `自動保存済 ・ ${time}`;
  })();

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <div className={styles.headTop}>
          <div className={styles.headTitleBlock}>
            <p className={styles.chapterMark}>❦ 拠点</p>
            <h1 className={styles.guildName}>{guild.name}</h1>
          </div>
          <ActionButton
            ariaLabel="設定"
            className={styles.gearBtn}
            onClick={() => setSoundOpen(true)}
          >
            ⚙
          </ActionButton>
        </div>
        <div className={styles.stats}>
          <span className={styles.statGold}>◇ {guild.gold.toLocaleString()} G</span>
          <span className={styles.statFaint}>
            最高{' '}
            {towerState.record.deepestReached > 0 ? `${towerState.record.deepestReached}F` : '−'}
          </span>
          <span className={hasMembers ? styles.statFaint : styles.statWarn}>
            団員 {guild.members.length} 人
          </span>
        </div>
      </header>

      {!hasMembers && (
        <div className={`${styles.hint} ${styles.hintGold}`}>
          まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。
        </div>
      )}
      {hasMembers && diveState && (
        <div className={`${styles.hint} ${styles.hintBlue}`}>
          ⚓ 潜行中のため、ダイブ再開と「タイトルへ戻る」以外は利用できません。
        </div>
      )}

      <main className={styles.menu}>
        {/* ダイブ大カード（grid-column span 2） */}
        <ActionButton
          className={`${styles.dive} ${diveState ? styles.diveResume : ''}`}
          disabled={!hasMembers}
          onClick={handleDiveClick}
        >
          <span
            className={styles.diveDecor}
            aria-hidden="true"
          >
            塔
          </span>
          <span className={styles.diveBadge}>{diveState ? 'RESUME' : 'DIVE'}</span>
          <span className={styles.diveTitle}>{diveState ? '潜行を再開' : 'ダイブ開始'}</span>
          <span className={styles.diveDesc}>
            {!hasMembers
              ? '団員が必要です'
              : diveState
                ? `${diveState.depth}F から再開`
                : checkpoints.length > 0
                  ? `第1階から潜る ・ 解放階(${Math.max(...checkpoints)}F)も選択可`
                  : '第1階から潜る'}
          </span>
        </ActionButton>

        {/* 団員 0 のときはギルド管理を横長ガイドカードに切り替え */}
        {!hasMembers ? (
          <ActionButton
            className={styles.tileGuide}
            onClick={goto('guild')}
          >
            <span
              className={styles.tileGuideIcon}
              aria-hidden="true"
            >
              📜
            </span>
            <span className={styles.tileGuideText}>
              <span className={styles.tileGuideLabel}>ギルド管理</span>
              <span className={styles.tileGuideHint}>まずここで冒険者を作成</span>
            </span>
            <span
              className={styles.tileGuideArrow}
              aria-hidden="true"
            >
              ›
            </span>
          </ActionButton>
        ) : (
          <ActionButton
            className={styles.tile}
            disabled={!!diveState}
            onClick={goto('guild')}
          >
            <span
              className={styles.tileIcon}
              aria-hidden="true"
            >
              📜
            </span>
            <span className={styles.tileBody}>
              <span className={styles.tileLabel}>ギルド管理</span>
              <span className={styles.tileDesc}>{diveState ? '🔒 潜行中不可' : '編成・作成'}</span>
            </span>
          </ActionButton>
        )}

        <ActionButton
          className={styles.tile}
          disabled={!!diveState}
          onClick={goto('shop')}
        >
          <span
            className={styles.tileIcon}
            aria-hidden="true"
          >
            🛡
          </span>
          <span className={styles.tileBody}>
            <span className={styles.tileLabel}>ショップ</span>
            <span className={styles.tileDesc}>{diveState ? '🔒 潜行中不可' : '装備・売買'}</span>
          </span>
        </ActionButton>

        <ActionButton
          className={styles.tile}
          disabled={!!diveState}
          onClick={goto('forge')}
        >
          <span
            className={styles.tileIcon}
            aria-hidden="true"
          >
            ⚒
          </span>
          <span className={styles.tileBody}>
            <span className={styles.tileLabel}>鍛冶屋</span>
            <span className={styles.tileDesc}>
              {diveState ? '🔒 潜行中不可' : '強化・リサイクル'}
            </span>
          </span>
        </ActionButton>

        <ActionButton
          className={styles.tile}
          disabled={!!diveState}
          onClick={goto('codex')}
        >
          <span
            className={styles.tileIcon}
            aria-hidden="true"
          >
            📖
          </span>
          <span className={styles.tileBody}>
            <span className={styles.tileLabel}>図鑑 / 記録</span>
            <span className={styles.tileDesc}>
              {diveState ? '🔒 潜行中不可' : '到達記録・図鑑'}
            </span>
          </span>
        </ActionButton>
      </main>

      {hasMembers && !diveState && (
        <div
          className={styles.autosave}
          aria-hidden="true"
        >
          <span className={styles.autosaveDot} />
          {autosaveLabel}
        </div>
      )}

      <footer className={styles.foot}>
        <ActionButton
          label="タイトルへ戻る"
          sfx="cancel"
          className={styles.exit}
          onClick={handleExit}
        />
      </footer>

      {warpOpen ? (
        <div
          className={styles.sheetOverlay}
          onClick={() => setWarpOpen(false)}
        >
          <div
            className={styles.sheet}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="ダイブ先を選択"
          >
            <div
              className={styles.sheetHandle}
              aria-hidden="true"
            />
            <div className={styles.sheetHead}>
              <span className={styles.sheetTitle}>ダイブ先を選択</span>
              <span className={styles.sheetCount}>解放: {sheetFloors.length} 地点</span>
            </div>
            <div className={styles.sheetList}>
              {sheetFloors.map((d) => {
                const isDeepest = d === deepestSheetFloor && d !== 1;
                return (
                  <ActionButton
                    key={d}
                    className={`${styles.sheetItem} ${isDeepest ? styles.sheetItemHilight : ''}`}
                    onClick={() => void handleSelectFloor(d)}
                  >
                    <span className={styles.sheetDepth}>{d}F</span>
                    <span className={styles.sheetItemLabel}>
                      {isDeepest
                        ? `第 ${Math.ceil(d / 10)} 帯・最深チェックポイント`
                        : floorLabel(d)}
                    </span>
                  </ActionButton>
                );
              })}
            </div>
            <ActionButton
              label="とじる"
              sfx="cancel"
              className={styles.sheetClose}
              onClick={() => setWarpOpen(false)}
            />
          </div>
        </div>
      ) : null}

      {soundOpen ? (
        <div
          className={styles.modalBackdrop}
          onClick={() => {
            play('cursor');
            setSoundOpen(false);
          }}
        >
          <div
            className={styles.modalPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <span>設定</span>
              <ActionButton
                ariaLabel="閉じる"
                sfx="cursor"
                className={styles.modalCloseBtn}
                onClick={() => setSoundOpen(false)}
              >
                ✕
              </ActionButton>
            </div>
            <SoundSettings />
            <ActionButton
              label="とじる"
              sfx="cursor"
              className={styles.modalClose}
              onClick={() => setSoundOpen(false)}
            />
          </div>
        </div>
      ) : null}

      <WarpScanFx visible={warpScanActive} />

      {sealActive ? (
        <SealStampFx
          variant="seal"
          caption={`SEALING… ${sealingDepth}F へ`}
        />
      ) : null}
    </div>
  );
};
