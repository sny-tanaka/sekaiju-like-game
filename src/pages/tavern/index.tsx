import { useState } from 'react';

import styles from './style.module.scss';

import { ActionButton } from '@/components/common/ActionButton/ActionButton';
import { BALANCE } from '@/data/balance';
import { ENEMIES } from '@/data/enemies';
import { ITEMS } from '@/data/items';
import { QUESTS, type QuestMaster } from '@/data/quests';
import {
  abandonQuest,
  acceptQuest,
  activeQuests,
  questBoard,
  questProgress,
  reportableCount,
  turnInQuest,
} from '@/domain/quest';
import { useGameState } from '@/store/gameState';
import { Redirect, useNavigation } from '@/store/navigation';

type Tab = 'board' | 'active' | 'record';

/** 報酬（gold/gems/items）を「800G ・ ✦5 ・ きずぐすり×3」のような文字列断片に分解する。 */
function rewardParts(rewards: QuestMaster['rewards'], plusSign = false): string[] {
  const parts: string[] = [];
  if (rewards.gold) parts.push(`${plusSign ? '+' : ''}${rewards.gold}G`);
  if (rewards.gems) parts.push(`✦${rewards.gems}`);
  for (const item of rewards.items ?? []) {
    const name = ITEMS[item.itemId]?.name ?? item.itemId;
    parts.push(`${name}×${item.qty}`);
  }
  return parts;
}

/** 依頼の目標ラベル（「スライム討伐 0/3」等）を組み立てる。 */
function goalLabel(quest: QuestMaster, current: number, required: number): string {
  switch (quest.kind) {
    case 'hunt': {
      const name = quest.target.enemyId ? (ENEMIES[quest.target.enemyId]?.name ?? '？') : '？';
      return `${name}討伐 ${current}/${required}`;
    }
    case 'delivery': {
      const name = quest.target.itemId ? (ITEMS[quest.target.itemId]?.name ?? '？') : '？';
      return `${name}納品 ${current}/${required}`;
    }
    case 'reach':
      return `地下${quest.target.depth ?? 0}階到達 ${current}/${required}`;
    case 'boss':
      return `地下${quest.target.depth ?? 0}階ボス撃破 ${current}/${required}`;
  }
}

// 酒場（v3.0.0 §10.2）。依頼掲示板 / 受注中 / 記録の3タブ構成。
export const Page = () => {
  const { navigate } = useNavigation();
  const { save, applyAndPersist } = useGameState();
  const [tab, setTab] = useState<Tab>('board');
  // 破棄確認（誤タップ防止のダイアログで待機中の questId）。
  const [abandonTarget, setAbandonTarget] = useState<string | null>(null);
  // 報告直後の報酬内訳インライン表示。
  const [reportToast, setReportToast] = useState<{ questName: string; text: string } | null>(null);

  if (!save) {
    return <Redirect to={{ name: 'title' }} />;
  }

  const board = questBoard(save);
  const active = activeQuests(save);
  const activeCount = active.length;
  const completeCount = reportableCount(save);
  const atMax = activeCount >= BALANCE.QUEST_MAX_ACTIVE;

  const deepest = save.towerState.record.deepestReached;

  // 記録タブ: 完了済みの一回限り依頼。
  const doneOnce = Object.values(QUESTS).filter((q) => {
    if (q.repeatable) return false;
    return save.questStates.find((qs) => qs.id === q.id)?.status === 'done';
  });
  // 記録タブ: 解放済みの repeatable 依頼（累計達成回数つき）。
  const repeatableUnlocked = Object.values(QUESTS)
    .filter((q) => q.repeatable && q.unlockDepth <= deepest)
    .map((q) => ({
      quest: q,
      timesCompleted: save.questStates.find((qs) => qs.id === q.id)?.progress?.timesCompleted ?? 0,
    }));

  const handleAccept = (questId: string) => {
    void applyAndPersist((s) => acceptQuest(s, questId));
  };

  const handleTurnIn = (questId: string) => {
    const quest = QUESTS[questId];
    if (!quest) return;
    void applyAndPersist((s) => turnInQuest(s, questId));
    setReportToast({ questName: quest.name, text: rewardParts(quest.rewards, true).join(' ') });
  };

  const handleAbandonConfirm = () => {
    if (!abandonTarget) return;
    const questId = abandonTarget;
    void applyAndPersist((s) => abandonQuest(s, questId));
    setAbandonTarget(null);
  };

  const switchTab = (t: Tab) => {
    setTab(t);
    setReportToast(null);
  };

  const abandonQuestMaster = abandonTarget ? QUESTS[abandonTarget] : undefined;

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <h1 className={styles.title}>酒場 — 依頼掲示板</h1>
        <span className={styles.gems}>✦ {save.guild.gems.toLocaleString()}</span>
      </header>

      <div className={styles.tabs}>
        <ActionButton
          label="掲示板"
          sfx="cursor"
          className={`${styles.tab} ${tab === 'board' ? styles.tabActive : ''}`}
          onClick={() => switchTab('board')}
        />
        <ActionButton
          sfx="cursor"
          className={`${styles.tab} ${tab === 'active' ? styles.tabActive : ''}`}
          onClick={() => switchTab('active')}
        >
          受注中
          {completeCount > 0 && <span className={styles.tabBadge}>{completeCount}</span>}
        </ActionButton>
        <ActionButton
          label="記録"
          sfx="cursor"
          className={`${styles.tab} ${tab === 'record' ? styles.tabActive : ''}`}
          onClick={() => switchTab('record')}
        />
      </div>

      {reportToast && (
        <div
          className={styles.toast}
          role="status"
        >
          <span className={styles.toastText}>
            <strong>{reportToast.questName}</strong> を報告しました： {reportToast.text}
          </span>
          <ActionButton
            ariaLabel="閉じる"
            sfx={null}
            className={styles.toastClose}
            onClick={() => setReportToast(null)}
          >
            ✕
          </ActionButton>
        </div>
      )}

      <div className={styles.list}>
        {tab === 'board' &&
          (board.length === 0 ? (
            <p className={styles.empty}>掲示中の依頼はありません。</p>
          ) : (
            board.map(({ quest, status, timesCompleted }) => {
              const { current, required } = questProgress(save, quest.id);
              const goal = goalLabel(quest, current, required);
              return (
                <div
                  key={quest.id}
                  className={styles.card}
                >
                  <div className={styles.cardHead}>
                    <span className={styles.questName}>{quest.name}</span>
                    {quest.repeatable && <span className={styles.chip}>くり返し</span>}
                  </div>
                  <div className={styles.client}>依頼主: {quest.client}</div>
                  <p className={styles.desc}>{quest.description}</p>
                  <div className={styles.goal}>{goal}</div>
                  <div className={styles.rewards}>{rewardParts(quest.rewards).join(' ・ ')}</div>
                  {timesCompleted > 0 && (
                    <div className={styles.timesCompleted}>達成 {timesCompleted} 回</div>
                  )}
                  {status === 'active' ? (
                    <span className={styles.statusActive}>受注中</span>
                  ) : (
                    <>
                      <ActionButton
                        label="受注する"
                        className={styles.acceptBtn}
                        disabled={atMax}
                        onClick={() => handleAccept(quest.id)}
                      />
                      {atMax && <p className={styles.maxNote}>同時に受けられるのは3件まで</p>}
                    </>
                  )}
                </div>
              );
            })
          ))}

        {tab === 'active' &&
          (active.length === 0 ? (
            <p className={styles.empty}>受注中の依頼はありません。掲示板から受注しましょう。</p>
          ) : (
            active.map(({ quest, progress, complete }) => {
              const pct =
                progress.required > 0
                  ? Math.min(100, Math.round((progress.current / progress.required) * 100))
                  : 0;
              return (
                <div
                  key={quest.id}
                  className={`${styles.card} ${complete ? styles.cardComplete : ''}`}
                >
                  <div className={styles.cardHead}>
                    <span className={styles.questName}>{quest.name}</span>
                    {quest.repeatable && <span className={styles.chip}>くり返し</span>}
                  </div>
                  <div className={styles.client}>依頼主: {quest.client}</div>
                  <div className={styles.goal}>
                    {goalLabel(quest, progress.current, progress.required)}
                  </div>
                  <div className={styles.progressTrack}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className={styles.rewards}>{rewardParts(quest.rewards).join(' ・ ')}</div>
                  {complete ? (
                    <ActionButton
                      label="報告する"
                      sfx="coin"
                      className={styles.reportBtn}
                      onClick={() => handleTurnIn(quest.id)}
                    />
                  ) : (
                    <ActionButton
                      label="破棄"
                      className={styles.abandonBtn}
                      onClick={() => setAbandonTarget(quest.id)}
                    />
                  )}
                </div>
              );
            })
          ))}

        {tab === 'record' && (
          <>
            <section className={styles.recordSection}>
              <h2 className={styles.recordHeading}>完了した依頼</h2>
              {doneOnce.length === 0 ? (
                <p className={styles.empty}>完了した依頼はまだありません。</p>
              ) : (
                doneOnce.map((quest) => (
                  <div
                    key={quest.id}
                    className={styles.recordRow}
                  >
                    <span className={styles.recordName}>{quest.name}</span>
                    <span className={styles.recordClient}>{quest.client}</span>
                  </div>
                ))
              )}
            </section>
            <section className={styles.recordSection}>
              <h2 className={styles.recordHeading}>くり返し依頼の累計達成</h2>
              {repeatableUnlocked.length === 0 ? (
                <p className={styles.empty}>解放済みのくり返し依頼はまだありません。</p>
              ) : (
                repeatableUnlocked.map(({ quest, timesCompleted }) => (
                  <div
                    key={quest.id}
                    className={styles.recordRow}
                  >
                    <span className={styles.recordName}>{quest.name}</span>
                    <span className={styles.recordCount}>達成 {timesCompleted} 回</span>
                  </div>
                ))
              )}
            </section>
          </>
        )}
      </div>

      <footer className={styles.foot}>
        <ActionButton
          label="拠点へ戻る"
          className={styles.back}
          onClick={() => navigate({ name: 'town' })}
        />
      </footer>

      {/* 破棄確認ダイアログ（誤タップ防止）。 */}
      {abandonTarget && abandonQuestMaster ? (
        <div
          className={styles.confirmOverlay}
          onClick={() => setAbandonTarget(null)}
        >
          <div
            className={styles.confirmBox}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="依頼の破棄確認"
          >
            <div className={styles.dialogTitle}>{abandonQuestMaster.name}</div>
            <div className={styles.dialogText}>
              この依頼を破棄しますか？
              <br />
              進捗は失われます。
            </div>
            <div className={styles.confirmActions}>
              <ActionButton
                label="やめる"
                sfx="cancel"
                className={styles.confirmCancel}
                onClick={() => setAbandonTarget(null)}
              />
              <ActionButton
                label="破棄する"
                className={styles.confirmOkDanger}
                onClick={handleAbandonConfirm}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
