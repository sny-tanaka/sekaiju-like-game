import styles from './style.module.scss';

import { ResistBadges } from '@/components/common/ResistBadges/ResistBadges';
import { RACES } from '@/data/races';
import { raceStatRanks } from '@/domain/raceRank';
import type { RaceId, StatKey } from '@/domain/types';

// ============================================================================
// 種族情報カード（issue #29）。種族 select 直下にライブ表示する。
// - 種族の説明文
// - 能力ランクグリッド（HP/TP/力/守/速/魔/心/運）
// - 種族耐性（ResistBadges 流用）
// ============================================================================

const STAT_DISPLAY: { key: StatKey; label: string }[] = [
  { key: 'hp', label: 'HP' },
  { key: 'tp', label: 'TP' },
  { key: 'str', label: '力' },
  { key: 'vit', label: '守' },
  { key: 'agi', label: '速' },
  { key: 'int', label: '魔' },
  { key: 'mnd', label: '心' },
  { key: 'luc', label: '運' },
];

type Props = {
  raceId: RaceId;
};

export const RaceInfoCard = ({ raceId }: Props) => {
  const race = RACES[raceId];
  if (!race) return null;

  const ranks = raceStatRanks(raceId);

  return (
    <div className={styles.card}>
      <div className={styles.raceName}>{race.name}</div>
      <p className={styles.description}>{race.description}</p>

      <div className={styles.rankSection}>
        <div className={styles.sectionLabel}>能力ランク</div>
        <div className={styles.rankGrid}>
          {STAT_DISPLAY.map(({ key, label }) => {
            const rank = ranks[key];
            return (
              <div
                key={key}
                className={`${styles.rankChip} ${styles[`rank_${rank}`]}`}
              >
                <span className={styles.chipLabel}>{label}</span>
                <span className={styles.chipRank}>{rank}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.resistSection}>
        <div className={styles.sectionLabel}>種族耐性</div>
        <ResistBadges
          elementResist={race.elementResist}
          ailmentResist={race.ailmentResist}
        />
      </div>
    </div>
  );
};
