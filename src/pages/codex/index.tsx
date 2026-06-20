import { useState } from 'react';

import styles from './style.module.scss';

import { useSfx } from '@/audio/useSfx';
import { ActionButton } from '@/components/common/ActionButton/ActionButton';
import { EnemySprite } from '@/components/common/EnemySprite/EnemySprite';
import { ItemSprite } from '@/components/common/ItemSprite/ItemSprite';
import { ResistBadges } from '@/components/common/ResistBadges/ResistBadges';
import { ENEMIES } from '@/data/enemies';
import { resolveEnemyAilmentResist } from '@/domain/ailment';
import { codexSummary, monsterCodex } from '@/domain/codex';
import type { EnemyId, ItemId } from '@/domain/types';
import { useGameState } from '@/store/gameState';
import { Redirect, useNavigation } from '@/store/navigation';

// 図鑑 / 記録（[05 §1-2]）。到達記録（スコア）とモンスター図鑑の収集状況。
export const Page = () => {
  const { navigate } = useNavigation();
  const { save } = useGameState();
  const play = useSfx();
  const [tab, setTab] = useState<'record' | 'codex'>('record');
  // 選択中のモンスター ID（グリッドタップで詳細表示）
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

  const selectedEntry = selectedId ? (entries.find((e) => e.id === selectedId) ?? null) : null;

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <h1 className={styles.title}>図鑑 / 記録</h1>
      </header>

      <div className={styles.tabs}>
        <ActionButton
          label="到達記録"
          variant="tab"
          sfx="cursor"
          className={tab === 'record' ? styles.tabActive : ''}
          onClick={() => setTab('record')}
        />
        <ActionButton
          label="図鑑"
          variant="tab"
          sfx="cursor"
          className={tab === 'codex' ? styles.tabActive : ''}
          onClick={() => setTab('codex')}
        />
      </div>

      {tab === 'record' ? (
        <div className={styles.records}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statCardLabel}>最深到達</div>
              <div className={styles.statCardNum}>
                {rec.deepestReached}
                <span className={styles.statCardUnit}>F</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statCardLabel}>挑戦回数</div>
              <div className={styles.statCardNum}>
                {rec.totalDives}
                <span className={styles.statCardUnit}>回</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statCardLabel}>最高ボス撃破</div>
              <div className={styles.statCardNum}>
                {rec.highestBossDefeated > 0 ? rec.highestBossDefeated : '—'}
                {rec.highestBossDefeated > 0 && <span className={styles.statCardUnit}>F</span>}
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statCardLabel}>図鑑達成率</div>
              <div
                className={styles.ringWrap}
                aria-label={`図鑑達成率 ${sum.completionPct}%`}
              >
                <svg
                  viewBox="0 0 60 60"
                  className={styles.ringSvg}
                  aria-hidden="true"
                >
                  <circle
                    cx="30"
                    cy="30"
                    r="25"
                    fill="none"
                    stroke="var(--rule-soft)"
                    strokeWidth="5"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="25"
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth="5"
                    strokeDasharray={Math.PI * 2 * 25}
                    strokeDashoffset={Math.PI * 2 * 25 * (1 - sum.completionPct / 100)}
                    transform="rotate(-90 30 30)"
                    strokeLinecap="round"
                  />
                </svg>
                <span className={styles.ringText}>{sum.completionPct}%</span>
              </div>
            </div>
          </div>

          <p className={styles.h2Caption}>ボス撃破履歴</p>
          {rec.bossDefeatLog.length === 0 ? (
            <p className={styles.empty}>まだボスを倒していません。</p>
          ) : (
            <ul className={styles.bossLog}>
              {[...rec.bossDefeatLog].reverse().map((b, i) => {
                const enemyMaster = b.enemyId ? ENEMIES[b.enemyId] : null;
                const name = enemyMaster?.name ?? `${b.depth}F のボス`;
                const timeText =
                  typeof b.at === 'number'
                    ? new Date(b.at).toLocaleTimeString('ja-JP', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : null;
                return (
                  <li
                    key={i}
                    className={styles.bossRow}
                  >
                    <div className={styles.bossRowSprite}>
                      {b.enemyId ? (
                        <EnemySprite
                          enemyId={b.enemyId}
                          size="sm"
                        />
                      ) : (
                        <span aria-hidden="true">👹</span>
                      )}
                    </div>
                    <div className={styles.bossRowMain}>
                      <div className={styles.bossName}>{name}</div>
                      <div className={styles.bossMeta}>
                        {b.depth}F{timeText ? ` ・ ${timeText}` : ''}
                      </div>
                    </div>
                    <span className={styles.bossStamp}>✦</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : (
        <div className={styles.codex}>
          <div className={styles.codexSummaryRow}>
            <span className={styles.codexSummaryText}>
              撃破 {sum.monstersDefeated}/{sum.monstersTotal}・ドロップ {sum.dropsFound}/
              {sum.dropsTotal}
            </span>
            <span className={styles.codexSummaryPct}>{sum.completionPct}%</span>
          </div>

          {/* 詳細カード（選択中エントリ） */}
          {selectedEntry &&
            (() => {
              const master = ENEMIES[selectedEntry.id];
              return (
                <div className={styles.bossDetail}>
                  <div className={styles.bossDetailSprite}>
                    <EnemySprite
                      enemyId={selectedEntry.id}
                      size="lg"
                    />
                  </div>
                  <div className={styles.bossDetailInfo}>
                    <div className={styles.bossDetailName}>
                      {selectedEntry.name}
                      {selectedEntry.defeated && <span className={styles.badge}>撃破</span>}
                    </div>
                    <div className={styles.bossDetailMeta}>第{selectedEntry.tierBand + 1}帯</div>
                    <div className={styles.bossDetailResist}>
                      {master && (
                        <>
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
                              ailmentResist={resolveEnemyAilmentResist(selectedEntry.id)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}

          {/* ドロップ行 */}
          {selectedEntry && selectedEntry.drops.length > 0 && (
            <div className={styles.dropRow}>
              {selectedEntry.drops.map((d) => (
                <div
                  key={d.itemId}
                  className={`${styles.dropCell} ${d.found ? styles.dropFound : styles.dropUnknown}`}
                >
                  <div className={styles.dropIcon}>
                    {d.found ? (
                      <ItemSprite
                        itemId={d.itemId as ItemId}
                        size="sm"
                      />
                    ) : (
                      <span aria-hidden="true">？</span>
                    )}
                  </div>
                  <span className={styles.dropName}>{d.found ? d.name : '未入手'}</span>
                </div>
              ))}
            </div>
          )}

          {/* 6 列グリッド */}
          <div className={styles.gridLabel}>
            <span className={styles.gridLabelText}>MONSTERS</span>
            <span className={styles.gridLegend}>緑=遭遇済 / 朱=ボス</span>
          </div>
          <div className={styles.grid}>
            {entries.map((e) => {
              const master = ENEMIES[e.id];
              const isBoss = master?.isBoss ?? false;
              const cellClass = [
                styles.cell,
                !e.seen ? styles.cellUnseen : '',
                e.seen && !e.defeated ? styles.cellSeen : '',
                e.defeated ? styles.cellDefeated : '',
                isBoss ? styles.cellBoss : '',
                selectedId === e.id ? styles.cellSelected : '',
              ]
                .filter(Boolean)
                .join(' ');
              return (
                <div
                  key={e.id}
                  className={cellClass}
                  role={e.seen ? 'button' : undefined}
                  tabIndex={e.seen ? 0 : undefined}
                  aria-label={e.seen ? e.name : '未遭遇のモンスター'}
                  onClick={() => toggleEntry(e.id, e.seen)}
                  onKeyDown={(ev) => {
                    if (ev.key === 'Enter' || ev.key === ' ') toggleEntry(e.id, e.seen);
                  }}
                >
                  <span className={styles.cellSprite}>
                    <EnemySprite
                      enemyId={e.id}
                      size="sm"
                      silhouette={!e.seen}
                      alt={e.seen ? e.name : ''}
                    />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <footer className={styles.foot}>
        <ActionButton
          label="拠点へ戻る"
          variant="secondary"
          onClick={() => navigate({ name: 'town' })}
        />
      </footer>
    </div>
  );
};
