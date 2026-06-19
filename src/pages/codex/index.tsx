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
  // 選択中のモンスター ID（図鑑グリッドでタップして詳細カード表示）
  const [selectedId, setSelectedId] = useState<EnemyId | null>(null);

  if (!save) {
    return <Redirect to={{ name: 'title' }} />;
  }

  const rec = save.towerState.record;
  const sum = codexSummary(save);
  const entries = monsterCodex(save);

  const handleCellTap = (id: EnemyId, seen: boolean) => {
    if (!seen) return; // 未遭遇は展開しない
    play('cursor');
    setSelectedId((prev) => (prev === id ? null : id));
  };

  // SVG ring 計算
  const ringRadius = 25;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference * (1 - sum.completionPct / 100);

  // 最高撃破ボス名（bossDefeatLog の最大階から ENEMIES を引く）
  const highestBossName = (() => {
    if (rec.bossDefeatLog.length === 0) return null;
    const sorted = [...rec.bossDefeatLog].sort((a, b) => b.depth - a.depth);
    const depth = sorted[0].depth;
    // depth に対応するボスを探す（tierBand は 10 階層で 1 帯）
    const boss = Object.values(ENEMIES).find(
      (e) => e.isBoss && Math.ceil(e.tierBand * 10) >= depth && e.tierBand * 10 <= depth + 10
    );
    return boss?.name ?? `${depth}F のボス`;
  })();

  const selectedEntry = selectedId ? (entries.find((e) => e.id === selectedId) ?? null) : null;
  const selectedMaster = selectedId ? (ENEMIES[selectedId] ?? null) : null;

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <p className={styles.chapterMark}>❦ 台帳</p>
        <h1 className={styles.title}>図鑑 / 記録</h1>
      </header>

      {/* タブ: 矩形・金箔アクティブ（モック §7 準拠） */}
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${tab === 'record' ? styles.tabActive : ''}`}
          onClick={() => {
            play('cursor');
            setTab('record');
            setSelectedId(null);
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

      {/* ---------- 到達記録タブ ---------- */}
      {tab === 'record' && (
        <div className={styles.records}>
          {/* 2x2 統計カード */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statCardLabel}>最深到達階</span>
              <span className={styles.statCardNum}>
                {rec.deepestReached}
                <span className={styles.statCardUnit}>F</span>
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statCardLabel}>挑戦回数</span>
              <span className={styles.statCardNum}>{rec.totalDives}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statCardLabel}>最高撃破ボス</span>
              {highestBossName ? (
                <>
                  <span className={styles.statCardBossName}>{highestBossName}</span>
                  <span className={styles.statCardBossTier}>{rec.highestBossDefeated}F</span>
                </>
              ) : (
                <span className={styles.statCardNum}>—</span>
              )}
            </div>
            <div className={styles.statCard}>
              <span className={styles.statCardLabel}>図鑑達成率</span>
              <div className={styles.ringWrap}>
                <svg
                  viewBox="0 0 60 60"
                  className={styles.ringsvg}
                >
                  <circle
                    cx="30"
                    cy="30"
                    r={ringRadius}
                    fill="none"
                    stroke="rgba(33,36,27,0.12)"
                    strokeWidth="5"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r={ringRadius}
                    fill="none"
                    stroke="#B89255"
                    strokeWidth="5"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={ringOffset}
                    transform="rotate(-90 30 30)"
                    strokeLinecap="round"
                  />
                </svg>
                <span className={styles.ringPct}>{sum.completionPct}%</span>
              </div>
            </div>
          </div>

          {/* ボス撃破履歴 */}
          <p className={styles.sectionLabel}>
            ボス撃破履歴<span className={styles.sectionLabelSub}>（新しい順）</span>
          </p>
          {rec.bossDefeatLog.length === 0 ? (
            <p className={styles.empty}>まだボスを倒していません。</p>
          ) : (
            <ul className={styles.bossLog}>
              {[...rec.bossDefeatLog].reverse().map((b, i) => (
                <li
                  key={i}
                  className={styles.bossRow}
                >
                  <span className={styles.bossStamp}>✦</span>
                  <span className={styles.bossName}>{b.depth}F のボス</span>
                  <span className={styles.bossMeta}>{b.depth}F</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* ---------- 図鑑タブ ---------- */}
      {tab === 'codex' && (
        <div className={styles.codex}>
          {/* サマリ行 */}
          <div className={styles.codexSummaryRow}>
            <span className={styles.codexSummaryText}>
              撃破 {sum.monstersDefeated}/{sum.monstersTotal} ・ ドロップ {sum.dropsFound}/
              {sum.dropsTotal}
            </span>
            <span className={styles.codexSummaryPct}>{sum.completionPct}%</span>
          </div>

          {/* 選択中ボスの詳細カード（グリッドの上に独立表示） */}
          {selectedEntry && selectedMaster && (
            <div className={styles.bossDetail}>
              <div className={styles.bossDetailLeft}>
                <div className={styles.bossDetailSprite}>
                  <EnemySprite
                    enemyId={selectedEntry.id}
                    size="md"
                  />
                </div>
              </div>
              <div className={styles.bossDetailInfo}>
                <div className={styles.bossDetailNameRow}>
                  <span className={styles.bossDetailName}>{selectedEntry.name}</span>
                  {selectedEntry.defeated && <span className={styles.badge}>撃破</span>}
                </div>
                <div className={styles.bossDetailMeta}>
                  第{selectedEntry.tierBand + 1}帯 ・{' '}
                  {selectedMaster.isBoss ? 'ボス' : 'モンスター'}
                </div>
                <div className={styles.bossDetailResist}>
                  <ResistBadges
                    elementResist={selectedMaster.resist}
                    ailmentResist={undefined}
                  />
                </div>
                <div className={styles.bossDetailResist}>
                  <ResistBadges
                    elementResist={undefined}
                    ailmentResist={resolveEnemyAilmentResist(selectedEntry.id)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ドロップ行（選択中のみ） */}
          {selectedEntry && selectedEntry.drops.length > 0 && (
            <div className={styles.dropRow}>
              {selectedEntry.drops.map((d) => (
                <div
                  key={d.itemId}
                  className={`${styles.dropCell} ${d.found ? styles.dropFound : styles.dropUnknown}`}
                >
                  {d.found ? d.name : '未入手'}
                </div>
              ))}
            </div>
          )}

          {/* 6列グリッド */}
          <div className={styles.entries}>
            <div className={styles.gridLabel}>
              <span className={styles.gridLabelText}>一覧 ・ {sum.monstersTotal} 体</span>
              <span className={styles.gridLegend}>金=ボス / 緑=撃破 / 影=未遭遇</span>
            </div>
            <div className={styles.grid}>
              {entries.map((e) => {
                const master = ENEMIES[e.id];
                const isBoss = master?.isBoss ?? false;
                const isSelected = selectedId === e.id;
                let cellClass = styles.cell;
                if (!e.seen) cellClass += ` ${styles.cellUnseen}`;
                else if (e.defeated) cellClass += ` ${styles.cellDefeated}`;
                else cellClass += ` ${styles.cellSeen}`;
                if (isBoss) cellClass += ` ${styles.cellBoss}`;
                if (isSelected) cellClass += ` ${styles.cellSelected}`;

                return (
                  <div
                    key={e.id}
                    className={cellClass}
                    role={e.seen ? 'button' : undefined}
                    tabIndex={e.seen ? 0 : undefined}
                    onClick={() => handleCellTap(e.id, e.seen)}
                    onKeyDown={(ev) => {
                      if (ev.key === 'Enter' || ev.key === ' ') handleCellTap(e.id, e.seen);
                    }}
                    aria-label={e.seen ? e.name : '未遭遇のモンスター'}
                    aria-pressed={isSelected || undefined}
                  >
                    <EnemySprite
                      enemyId={e.id}
                      size="sm"
                      silhouette={!e.seen}
                      alt={e.seen ? e.name : '未遭遇'}
                      className={styles.cellSprite}
                    />
                  </div>
                );
              })}
            </div>
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
