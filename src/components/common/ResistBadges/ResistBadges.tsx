import styles from './style.module.scss';

import type { AilmentType, Element } from '@/domain/types';

// ============================================================================
// 耐性バッジ表示（[06 §16]）。属性耐性・状態異常耐性を小さなバッジで一覧表示する。
// 倍率 >1.0 = 弱（弱点）/ <1.0 = 半（耐性） / 0 = 無（無効） / 1.0 = 表示省略。
// ============================================================================

export const ELEMENT_LABEL: Record<Element, string> = {
  slash: '斬',
  pierce: '突',
  bash: '壊',
  fire: '火',
  ice: '氷',
  volt: '雷',
  almighty: '無',
};

export const AILMENT_LABEL: Record<AilmentType, string> = {
  poison: '毒',
  paralysis: '麻痺',
  sleep: '睡眠',
  confusion: '混乱',
  curse: '呪い',
  blind: '盲目',
  instantDeath: '即死',
  headBind: '頭封じ',
  armBind: '腕封じ',
  legBind: '脚封じ',
};

/** 倍率から表示テキストを生成する。等倍（1.0）は null（表示省略）。 */
export function resistLabel(mult: number): { text: string; tier: 'weak' | 'half' | 'null' } | null {
  if (mult === 0) return { text: '無', tier: 'null' };
  if (mult < 1) return { text: '半', tier: 'half' };
  if (mult > 1) return { text: '弱', tier: 'weak' };
  return null; // mult === 1.0 は省略
}

type BadgeEntry = {
  label: string;
  tier: 'weak' | 'half' | 'null';
};

type Props = {
  /** 属性耐性マップ（倍率。未指定キーは 1.0 扱い）。 */
  elementResist?: Partial<Record<Element, number>>;
  /** 状態異常耐性マップ（倍率。未指定キーは 1.0 扱い）。 */
  ailmentResist?: Partial<Record<AilmentType, number>>;
  /** コンパクト表示モード（戦闘中の敵情報など）。true のとき弱点のみ + 耐性は省略。 */
  compact?: boolean;
};

const ELEMENT_ORDER: Element[] = ['slash', 'pierce', 'bash', 'fire', 'ice', 'volt'];
const AILMENT_ORDER: AilmentType[] = [
  'poison',
  'paralysis',
  'sleep',
  'blind',
  'confusion',
  'curse',
  'instantDeath',
  'headBind',
  'armBind',
  'legBind',
];

/**
 * 耐性バッジ一覧。属性・状態異常それぞれのセクションを小さなバッジで表示する。
 * compact モードでは弱点(弱)と無効(無)のみ表示し、耐性(半)は省略する。
 */
export const ResistBadges = ({ elementResist, ailmentResist, compact = false }: Props) => {
  const elemBadges: BadgeEntry[] = [];
  for (const el of ELEMENT_ORDER) {
    const mult = elementResist?.[el] ?? 1;
    const info = resistLabel(mult);
    if (!info) continue;
    if (compact && info.tier === 'half') continue;
    elemBadges.push({ label: `${ELEMENT_LABEL[el]}${info.text}`, tier: info.tier });
  }

  const ailBadges: BadgeEntry[] = [];
  for (const ai of AILMENT_ORDER) {
    const mult = ailmentResist?.[ai] ?? 1;
    const info = resistLabel(mult);
    if (!info) continue;
    if (compact && info.tier === 'half') continue;
    ailBadges.push({ label: `${AILMENT_LABEL[ai]}${info.text}`, tier: info.tier });
  }

  const hasElem = elemBadges.length > 0;
  const hasAil = ailBadges.length > 0;

  if (!hasElem && !hasAil) {
    return <span className={styles.none}>（耐性なし）</span>;
  }

  return (
    <div className={styles.root}>
      {hasElem && (
        <div className={styles.group}>
          {!compact && <span className={styles.groupLabel}>属性</span>}
          <div className={styles.badges}>
            {elemBadges.map((b) => (
              <span
                key={b.label}
                className={`${styles.badge} ${styles[b.tier]}`}
              >
                {b.label}
              </span>
            ))}
          </div>
        </div>
      )}
      {hasAil && (
        <div className={styles.group}>
          {!compact && <span className={styles.groupLabel}>状態異常</span>}
          <div className={styles.badges}>
            {ailBadges.map((b) => (
              <span
                key={b.label}
                className={`${styles.badge} ${styles[b.tier]}`}
              >
                {b.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
