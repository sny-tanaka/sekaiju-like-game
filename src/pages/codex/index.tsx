import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import styles from './style.module.scss';

import { codexSummary, monsterCodex } from '@/domain/codex';
import { useGameState } from '@/store/gameState';

// 図鑑 / 記録（[05 §1-2]）。到達記録（スコア）とモンスター図鑑の収集状況。
export const Page = () => {
  const navigate = useNavigate();
  const { save } = useGameState();
  const [tab, setTab] = useState<'record' | 'codex'>('record');

  if (!save) {
    return (
      <Navigate
        to="/title"
        replace
      />
    );
  }

  const rec = save.towerState.record;
  const sum = codexSummary(save);
  const entries = monsterCodex(save);

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <h1 className={styles.title}>図鑑 / 記録</h1>
      </header>

      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${tab === 'record' ? styles.tabActive : ''}`}
          onClick={() => setTab('record')}
        >
          到達記録
        </button>
        <button
          type="button"
          className={`${styles.tab} ${tab === 'codex' ? styles.tabActive : ''}`}
          onClick={() => setTab('codex')}
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
            {entries.map((e) => (
              <div
                key={e.id}
                className={`${styles.row} ${e.seen ? '' : styles.unseen}`}
              >
                <div className={styles.info}>
                  <span className={styles.name}>
                    {e.seen ? e.name : '？？？'}
                    {e.defeated ? <span className={styles.badge}>撃破</span> : null}
                  </span>
                  <span className={styles.sub}>
                    第{e.tierBand + 1}帯
                    {e.seen && e.drops.length > 0
                      ? '・' + e.drops.map((d) => (d.found ? d.name : '？')).join(' / ')
                      : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.back}
          onClick={() => navigate('/town')}
        >
          拠点へ戻る
        </button>
      </footer>
    </div>
  );
};
