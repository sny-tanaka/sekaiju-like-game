import { useMemo, useState } from 'react';

import styles from './style.module.scss';

import { useSfx } from '@/audio/useSfx';
import { ActionButton } from '@/components/common/ActionButton/ActionButton';
import { EnemySprite } from '@/components/common/EnemySprite/EnemySprite';
import { ItemSprite } from '@/components/common/ItemSprite/ItemSprite';
import { ResistBadges } from '@/components/common/ResistBadges/ResistBadges';
import { TrophyMedal } from '@/components/common/TrophyMedal/TrophyMedal';
import { BALANCE } from '@/data/balance';
import { ENEMIES } from '@/data/enemies';
import { resolveEnemyAilmentResist } from '@/domain/ailment';
import { codexSummary, monsterCodex } from '@/domain/codex';
import {
  collectionEntries,
  collectionSummary,
  type CollectionEntry,
  type CollectionSummary,
} from '@/domain/collection';
import { trophyCounts, trophyRank, type TrophyCounts } from '@/domain/trophy';
import type { EnemyId, ItemId } from '@/domain/types';
import { useGameState } from '@/store/gameState';
import { Redirect, useNavigation } from '@/store/navigation';

const EMPTY_TROPHY_COUNTS: TrophyCounts = { bronze: 0, silver: 0, gold: 0, rainbow: 0 };
const EMPTY_COLLECTION_SUMMARY: CollectionSummary = {
  bands: [],
  totalOwned: 0,
  totalAll: 0,
  allComplete: false,
};

// 図鑑 / 記録（[05 §1-2]）。到達記録（スコア）とモンスター図鑑の収集状況。
export const Page = () => {
  const { navigate } = useNavigation();
  const { save } = useGameState();
  const play = useSfx();
  const [tab, setTab] = useState<'record' | 'codex'>('record');
  // 選択中のモンスター ID（グリッドタップで詳細表示）
  const [selectedId, setSelectedId] = useState<EnemyId | null>(null);

  // v3.0.0 §10.4: 討伐勲章（銅/銀/金/虹）と秘宝コレクションの集計。save 非依存の描画にも
  // 使うため useMemo 化し、早期 return より前（rules-of-hooks）に置く。
  const trophies = useMemo(() => (save ? trophyCounts(save) : EMPTY_TROPHY_COUNTS), [save]);
  const collSummary = useMemo(
    () => (save ? collectionSummary(save) : EMPTY_COLLECTION_SUMMARY),
    [save]
  );
  const collEntries = useMemo(() => (save ? collectionEntries(save) : []), [save]);
  // 帯（tierBand）ごとの秘宝エントリを事前グルーピング（グリッド描画のたびに filter しない）。
  const collEntriesByBand = useMemo(() => {
    const map = new Map<number, CollectionEntry[]>();
    for (const e of collEntries) {
      const list = map.get(e.band);
      if (list) list.push(e);
      else map.set(e.band, [e]);
    }
    return map;
  }, [collEntries]);

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
  // 選択中エントリの討伐数（bossDetailTrophy の kills 表示・メダル計算で二重読み出ししないよう集約）。
  const selectedKills = selectedEntry ? (save.bestiary.monsters[selectedEntry.id]?.kills ?? 0) : 0;

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <h1 className={styles.title}>図鑑 / 記録</h1>
      </header>

      <div className={styles.tabs}>
        <ActionButton
          label="到達記録"
          sfx="cursor"
          className={`${styles.tab} ${tab === 'record' ? styles.tabActive : ''}`}
          onClick={() => setTab('record')}
        />
        <ActionButton
          label="図鑑"
          sfx="cursor"
          className={`${styles.tab} ${tab === 'codex' ? styles.tabActive : ''}`}
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

          {/* v3.0.0 §10.4: 討伐勲章サマリ（銅/銀/金/虹の到達数）。 */}
          <div className={styles.trophySummaryRow}>
            <span className={styles.trophySummaryLabel}>勲章</span>
            <span className={`${styles.trophyChip} ${styles.trophyChipBronze}`}>
              銅{trophies.bronze}
            </span>
            <span className={`${styles.trophyChip} ${styles.trophyChipSilver}`}>
              銀{trophies.silver}
            </span>
            <span className={`${styles.trophyChip} ${styles.trophyChipGold}`}>
              金{trophies.gold}
            </span>
            <span className={`${styles.trophyChip} ${styles.trophyChipRainbow}`}>
              虹{trophies.rainbow}
            </span>
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
                    {/* v3.0.0 §10.4: 討伐数・討伐勲章メダル。 */}
                    <div className={styles.bossDetailTrophy}>
                      <span className={styles.bossDetailKills}>討伐 {selectedKills}体</span>
                      <TrophyMedal
                        rank={trophyRank(master?.kind ?? 'zako', selectedKills)}
                        size="sm"
                        showLabel
                      />
                    </div>
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
              const kills = save.bestiary.monsters[e.id]?.kills ?? 0;
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
                  {/* v3.0.0 §10.4: 討伐数・討伐勲章メダル（撃破済みのみ表示）。 */}
                  {e.defeated && (
                    <span className={styles.cellTrophy}>
                      <TrophyMedal
                        rank={trophyRank(master?.kind ?? 'zako', kills)}
                        size="xs"
                      />
                      <span className={styles.cellKills}>{kills}</span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* v3.0.0 §10.4: 秘宝コレクション（tierBand ごと 12 マスグリッド）。 */}
          <div className={styles.gridLabel}>
            <span className={styles.gridLabelText}>秘宝コレクション</span>
            <span className={styles.gridLegend}>
              計 {collSummary.totalOwned}/{collSummary.totalAll}
            </span>
          </div>
          {collSummary.bands.map((band) => (
            <div
              key={band.band}
              className={styles.collectionBand}
            >
              <div className={styles.collectionBandHead}>
                <span className={styles.collectionBandTitle}>第{band.band + 1}帯</span>
                <span className={styles.collectionBandCount}>
                  {band.owned}/{band.total}
                </span>
                {band.complete && (
                  <span className={styles.collectionBandBadge}>
                    帯コンプ済 ✦{BALANCE.COLLECT_BAND_GEMS}
                  </span>
                )}
              </div>
              <div className={styles.collectionGrid}>
                {(collEntriesByBand.get(band.band) ?? []).map((e) => (
                  <div
                    key={e.itemId}
                    className={`${styles.collectionCell} ${e.owned > 0 ? styles.collectionCellOwned : ''}`}
                  >
                    <ItemSprite
                      itemId={e.itemId}
                      size="sm"
                      silhouette={e.owned === 0}
                      alt={e.owned > 0 ? e.name : ''}
                    />
                    <span className={styles.collectionCellLabel}>
                      {e.owned > 0 ? `${e.name}${e.owned > 1 ? ` ×${e.owned}` : ''}` : '？？？'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <p className={styles.collectionAllNote}>
            全{collSummary.totalAll}種コンプで ✦{BALANCE.COLLECT_ALL_GEMS} と「蒐集王の宝冠」を獲得
            {collSummary.allComplete && <span className={styles.collectionAllBadge}>達成済み</span>}
          </p>
        </div>
      )}

      <footer className={styles.foot}>
        <ActionButton
          label="拠点へ戻る"
          className={styles.back}
          onClick={() => navigate({ name: 'town' })}
        />
      </footer>
    </div>
  );
};
