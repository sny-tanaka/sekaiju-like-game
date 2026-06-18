import { useState } from 'react';

import styles from './style.module.scss';

import { useSfx } from '@/audio/useSfx';
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
          <div className={styles.statBig}>
            <span className={styles.statNum}>{rec.deepestReached}</span>
            <span className={styles.statLabel}>最深到達階</span>
          </div>
          <dl className={styles.statList}>
            <div className={styles.statRow}>
              <dt>最高撃破ボス階</dt>
              <dd>{rec.highestBossDefeated > 0 ? `${rec.highestBossDefeated}F` : '—'}</dd>
            </div>
            <div className={styles.statRow}>
              <dt>挑戦回数</dt>
              <dd>{rec.totalDives}</dd>
            </div>
            <div className={styles.statRow}>
              <dt>図鑑達成率</dt>
              <dd>{sum.completionPct}%</dd>
            </div>
          </dl>

          <h2 className={styles.h2}>ボス撃破履歴</h2>
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
                    <span>{b.depth}F のボス撃破</span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      ) : (
        <div className={styles.codex}>
          <div className={styles.codexSummary}>
            撃破 {sum.monstersDefeated}/{sum.monstersTotal}・ドロップ {sum.dropsFound}/
            {sum.dropsTotal}
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
