import { useState } from 'react';
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
  showReviewControls?: boolean;
};

export const SpriteCatalog = ({ sections, showReviewControls = false }: Props) => {
  const [ngIds, setNgIds] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  const total = sections.reduce((sum, s) => sum + s.entries.length, 0);
  const ngList = Array.from(ngIds).join(',');

  const toggleNg = (id: string) => {
    setNgIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const copyNgList = async () => {
    try {
      await navigator.clipboard.writeText(ngList);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // フォールバック: textarea を select させて手動コピーを促す
      console.warn('clipboard write failed:', err);
    }
  };

  const clearAll = () => {
    setNgIds(new Set());
  };

  return (
    <div className={styles.root}>
      {showReviewControls && (
        <div className={styles.reviewBar}>
          <span className={styles.ngCount}>NG: {ngIds.size} 件</span>
          <textarea
            className={styles.ngTextarea}
            readOnly
            rows={2}
            value={ngList}
            onClick={(e) => e.currentTarget.select()}
          />
          <button
            className={`${styles.copyBtn}${copied ? ` ${styles.copied}` : ''}`}
            onClick={copyNgList}
          >
            {copied ? 'コピー済み' : 'NG リストをコピー'}
          </button>
          {ngIds.size > 0 && (
            <button
              className={styles.clearBtn}
              onClick={clearAll}
            >
              全クリア
            </button>
          )}
        </div>
      )}
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
            {section.entries.map((e) => {
              const isNg = ngIds.has(e.id);
              return (
                <div
                  key={e.id}
                  className={`${styles.card}${isNg ? ` ${styles.cardNg}` : ''}`}
                  onClick={
                    showReviewControls
                      ? () => {
                          toggleNg(e.id);
                        }
                      : undefined
                  }
                >
                  {showReviewControls && (
                    <input
                      type="checkbox"
                      className={styles.ngCheckbox}
                      checked={isNg}
                      onChange={() => {
                        // onClick on card handles toggle; this prevents double-fire
                      }}
                      onClick={(ev) => {
                        ev.stopPropagation();
                        toggleNg(e.id);
                      }}
                      aria-label={`${e.id} を NG にする`}
                    />
                  )}
                  <div className={styles.spriteWrap}>{e.sprite}</div>
                  <div className={styles.name}>{e.name}</div>
                  <div className={styles.id}>{e.id}</div>
                  {e.badge ? <div className={styles.badge}>{e.badge}</div> : null}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};
