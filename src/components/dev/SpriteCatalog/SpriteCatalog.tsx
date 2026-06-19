import type { ReactNode } from 'react';

import styles from './style.module.scss';

// ============================================================================
// マッピング確認専用カタログコンポーネント（dev 専用・実ゲームでは使わない）。
// 敵/アイテム/装備/キャラポートレートのスプライトと名称を一覧表示し、
// 画像と名前のミスマッチをユーザーが 1 画面でレビューできるようにする。
// ============================================================================

export type CatalogEntry = {
  id: string; // 内部 ID（例: enemy_slime, equip_short_sword）
  name: string; // 表示名（例: スライム, ショートソード）
  sprite: ReactNode; // 画像（EnemySprite / ItemSprite / CharacterPortrait など）
  badge?: string; // 区分（例: tier 0, ボス, 武器, 重装、戦士、ヒト等）
};

export type CatalogSection = {
  title: string; // セクションタイトル（例: Tier 0 雑魚、武器、戦士）
  entries: CatalogEntry[];
};

type Props = {
  sections: CatalogSection[];
};

export const SpriteCatalog = ({ sections }: Props) => {
  const total = sections.reduce((sum, s) => sum + s.entries.length, 0);
  return (
    <div className={styles.root}>
      <div className={styles.summary}>合計 {total} エントリ</div>
      {sections.map((section) => (
        <section
          key={section.title}
          className={styles.section}
        >
          <h2 className={styles.sectionTitle}>
            {section.title} ({section.entries.length})
          </h2>
          <div className={styles.grid}>
            {section.entries.map((e) => (
              <div
                key={e.id}
                className={styles.card}
              >
                <div className={styles.spriteWrap}>{e.sprite}</div>
                <div className={styles.name}>{e.name}</div>
                <div className={styles.id}>{e.id}</div>
                {e.badge ? <div className={styles.badge}>{e.badge}</div> : null}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
