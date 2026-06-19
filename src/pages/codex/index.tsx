import { useState } from 'react';

import styles from './style.module.scss';

import { useSfx } from '@/audio/useSfx';
import { EnemySprite } from '@/components/common/EnemySprite/EnemySprite';
import { ResistBadges } from '@/components/common/ResistBadges/ResistBadges';
import { ENEMIES } from '@/data/enemies';
import { resolveEnemyAilmentResist } from '@/domain/ailment';
import { codexSummary, monsterCodex } from '@/domain/codex';
import type { EnemyId } from '@/domain/types';
import { useGameState } from '@/store/gameState';
import { Redirect, useNavigation } from '@/store/navigation';

// 図鑑 / 記録（[05 §1-2]）。到達記録（スコア）とモンスター図鑑の収集状況。
export const Page = () => {
  const { navigate } = useNavigation();
  const { save } = useGameState();
  const play = useSfx();
  const [tab, setTab] = useState<'record' | 'codex'>('record');
  // 選択中のモンスター ID（タップで詳細展開）
  const [selectedId, setSelectedId] = useState<EnemyId | null>(null);

  if (!save) {
    return <Redirect to={{ name: 'title' }} />;
  }

  const rec = save.towerState.record;
  const sum = codexSummary(save);
  const entries = monsterCodex(save);

  const toggleEntry = (id: EnemyId, seen: boolean) => {
    if (!seen) return; // 未遭遇は展開しない
    play('cursor');
    setSelectedId((prev) => (prev === id ? null : id));
  };

  // 達成率リング: 2 * pi * 25 ≈ 157
  const ringCircumference = 157;
  const ringOffset = Math.round(ringCircumference * (1 - sum.completionPct / 100));

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <p className={styles.chapterMark}>❦ 台帳</p>
        <h1 className={styles.title}>図鑑 / 記録</h1>
      </header>

      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${tab === 'record' ? styles.tabActive : ''}`}
          onClick={() => {
            play('cursor');
            setTab('record');
          }}
        >
          到達記録
        </button>
        <button
          type="button"
          className={`${styles.tab} ${tab === 'codex' ? styles.tabActive : ''}`}
          onClick={() => {
            play('cursor');
            setTab('codex');
          }}
        >
          図鑑
        </button>
      </div>

      {tab === 'record' ? (
        <div className={styles.records}>
          {/* 2x2 統計カードグリッド */}
          <div className={styles.statGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>最深到達階</span>
              <span className={styles.statNum}>
                {rec.deepestReached}
                <span className={styles.statSuffix}>F</span>
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>挑戦回数</span>
              <span className={styles.statNum}>{rec.totalDives}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>最高撃破ボス</span>
              {rec.highestBossDefeated > 0 ? (
                <span className={styles.statText}>{rec.highestBossDefeated}F のボス</span>
              ) : (
                <span className={styles.statText}>—</span>
              )}
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>図鑑達成率</span>
              <div className={styles.ringWrap}>
                <svg
                  viewBox="0 0 60 60"
                  className={styles.ringSvg}
                  aria-hidden
                >
                  <circle
                    cx="30"
                    cy="30"
                    r="25"
                    fill="none"
                    stroke="var(--rule-base)"
                    strokeWidth="5"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="25"
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth="5"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={ringOffset}
                    transform="rotate(-90 30 30)"
                    strokeLinecap="round"
                  />
                </svg>
                <span className={styles.ringText}>{sum.completionPct}%</span>
              </div>
            </div>
          </div>

          <p className={styles.h2Caption}>
            ボス撃破履歴 <span className={styles.h2Sub}>新しい順</span>
          </p>
          {rec.bossDefeatLog.length === 0 ? (
            <p className={styles.empty}>まだボスを倒していません。</p>
          ) : (
            <ul className={styles.bossLog}>
              {rec.bossDefeatLog
                .slice()
                .reverse()
                .map((b, i) => (
                  <li
                    key={i}
                    className={styles.bossRow}
                  >
                    <span className={styles.bossDepth}>{b.depth}F</span>
                    <span className={styles.bossText}>のボスを撃破</span>
                    <span className={styles.bossSeal}>✦</span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      ) : (
        <div className={styles.codex}>
          <div className={styles.codexSummary}>
            <span>
              撃破 {sum.monstersDefeated}/{sum.monstersTotal}・ドロップ {sum.dropsFound}/
              {sum.dropsTotal}
            </span>
            <span className={styles.codexSummaryPct}>{sum.completionPct}%</span>
          </div>
          <div className={styles.list}>
            {entries.map((e) => {
              const isOpen = selectedId === e.id;
              const master = ENEMIES[e.id];
              return (
                <div
                  key={e.id}
                  className={`${styles.row} ${e.seen ? '' : styles.unseen} ${e.seen ? styles.rowClickable : ''}`}
                  role={e.seen ? 'button' : undefined}
                  tabIndex={e.seen ? 0 : undefined}
                  onClick={() => toggleEntry(e.id, e.seen)}
                  onKeyDown={(ev) => {
                    if (ev.key === 'Enter' || ev.key === ' ') toggleEntry(e.id, e.seen);
                  }}
                >
                  <div className={styles.thumb}>
                    <EnemySprite
                      enemyId={e.id}
                      size="sm"
                      silhouette={!e.seen}
                      alt={e.seen ? e.name : '未遭遇のモンスター'}
                    />
                  </div>
                  <div className={styles.info}>
                    <span className={styles.name}>
                      {e.seen ? e.name : '？？？'}
                      {e.defeated ? <span className={styles.badge}>撃破</span> : null}
                      {e.seen ? <span className={styles.expand}>{isOpen ? '▲' : '▼'}</span> : null}
                    </span>
                    <span className={styles.sub}>
                      第{e.tierBand + 1}帯
                      {e.seen && e.drops.length > 0
                        ? '・' + e.drops.map((d) => (d.found ? d.name : '？')).join(' / ')
                        : ''}
                    </span>
                  </div>

                  {/* §16: 耐性詳細（遭遇済みのみ展開表示） */}
                  {isOpen && master ? (
                    <div className={styles.resistDetail}>
                      <div className={styles.spriteLarge}>
                        <EnemySprite
                          enemyId={e.id}
                          size="lg"
                        />
                      </div>
                      <div className={styles.resistSection}>
                        <span className={styles.resistHead}>属性</span>
                        <ResistBadges
                          elementResist={master.resist}
                          ailmentResist={undefined}
                        />
                      </div>
                      <div className={styles.resistSection}>
                        <span className={styles.resistHead}>状態異常</span>
                        <ResistBadges
                          elementResist={undefined}
                          ailmentResist={resolveEnemyAilmentResist(e.id)}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.back}
          onClick={() => navigate({ name: 'town' })}
        >
          拠点へ戻る
        </button>
      </footer>
    </div>
  );
};
