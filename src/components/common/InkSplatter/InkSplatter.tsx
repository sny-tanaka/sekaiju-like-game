import { useEffect, useRef } from 'react';

import styles from './style.module.scss';

export interface InkSplatterProps {
  /** 表示するテキストまたは数値 */
  value: number | string;
  /** 演出バリアント */
  variant: 'damage' | 'heal' | 'crit' | 'seal' | 'gold';
  /** アニメーション完了コールバック */
  onDone?: () => void;
  /** ベースサイズ（デフォルト 80） */
  size?: number;
}

// バリアント別のカラーマップ（黒曜トンマナ統一 / _obsidian.scss トークンと同値の hex）
const VARIANT_COLORS = {
  damage: {
    splatter: '#b23c30', // = var(--danger)
    text: '#f2ede1', // = var(--text-strong)
    scale: 1,
  },
  heal: {
    splatter: '#3f8a5c', // = var(--success)
    text: '#f2ede1', // = var(--text-strong)
    scale: 1,
  },
  crit: {
    splatter: '#d4674f', // = var(--danger-glow)（より鮮やかな朱でクリットを強調）
    text: '#e8d099', // = var(--gold-bright)
    scale: 1.15,
  },
  seal: {
    splatter: '#b23c30', // = var(--danger)（封蝋風の朱赤）
    text: '#c9a86a', // = var(--gold)
    scale: 1,
  },
  gold: {
    splatter: '#c9a86a', // = var(--gold)
    text: '#f2ede1', // = var(--text-strong)
    scale: 0.8,
  },
} as const;

// 疑似乱数（シード付き）— SVG の飛沫配置用
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

/** SVG の飛沫ドットを生成する（5〜7 個、中心から不規則に拡散） */
function buildSplatDots(
  count: number,
  radius: number,
  color: string,
  seed: number
): React.ReactNode[] {
  const rand = seededRandom(seed);
  const dots: React.ReactNode[] = [];
  for (let i = 0; i < count; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = radius * (0.35 + rand() * 0.65);
    const cx = Math.cos(angle) * dist;
    const cy = Math.sin(angle) * dist;
    const r = radius * (0.055 + rand() * 0.095);
    // 楕円で方向感を出す
    const rx = r * (0.8 + rand() * 0.5);
    const ry = r * (0.5 + rand() * 0.4);
    const rot = (angle * 180) / Math.PI;
    dots.push(
      <ellipse
        key={i}
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill={color}
        opacity={0.72 + rand() * 0.28}
        transform={`rotate(${rot} ${cx} ${cy})`}
        className={styles.splat}
        style={{ '--splat-delay': `${i * 18}ms` } as React.CSSProperties}
      />
    );
  }
  return dots;
}

/** 封蝋（seal）バリアント用の円形＋幾何紋様 */
function SealDecoration({ size }: { size: number }) {
  const r = size * 0.34;
  const inner = r * 0.55;
  // 六角形の頂点
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
    return `${Math.cos(a) * inner},${Math.sin(a) * inner}`;
  }).join(' ');

  return (
    <>
      <circle
        cx={0}
        cy={0}
        r={r}
        fill="#b23c30" // = var(--danger)
        className={styles.sealCircle}
      />
      <polygon
        points={hex}
        fill="none"
        stroke="#c9a86a" // = var(--gold)
        strokeWidth={1.5}
        className={styles.sealGeo}
      />
      <circle
        cx={0}
        cy={0}
        r={inner * 0.38}
        fill="#c9a86a" // = var(--gold)
        opacity={0.55}
        className={styles.sealGeo}
      />
    </>
  );
}

export const InkSplatter = ({ value, variant, onDone, size = 80 }: InkSplatterProps) => {
  const doneRef = useRef(false);
  const { splatter, text, scale } = VARIANT_COLORS[variant];

  const splatCount = variant === 'crit' ? 7 : variant === 'gold' ? 5 : 6;
  const seed = typeof value === 'number' ? value : (String(value).charCodeAt(0) ?? 42);
  const dots = variant === 'seal' ? [] : buildSplatDots(splatCount, size * 0.5, splatter, seed);

  const displaySize = size * scale;
  const half = displaySize / 2;

  // アニメーション完了（--motion-ink = 320ms + 文字フェードイン考慮）
  useEffect(() => {
    if (doneRef.current) return;
    const ms = 320 + 120; // ink + フェードイン余裕
    const t = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
    }, ms);
    return () => clearTimeout(t);
  }, [onDone]);

  const fontSize =
    variant === 'crit'
      ? Math.round(size * 0.32)
      : variant === 'seal'
        ? Math.round(size * 0.22)
        : Math.round(size * 0.28);

  const fontFamily =
    variant === 'crit' || variant === 'seal'
      ? "'Kaisei Tokumin', serif"
      : "'JetBrains Mono', monospace";

  return (
    <svg
      className={`${styles.root} ${styles[`variant-${variant}`]}`}
      viewBox={`${-half} ${-half} ${displaySize} ${displaySize}`}
      width={displaySize}
      height={displaySize}
      aria-hidden="true"
      role="presentation"
    >
      {/* 飛沫グループ（最初にアニメ） */}
      <g className={styles.splatGroup}>
        {variant === 'seal' ? <SealDecoration size={size} /> : dots}
      </g>

      {/* 値テキスト（遅れてフェードイン） */}
      <text
        x={0}
        y={fontSize * 0.38}
        textAnchor="middle"
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontWeight={700}
        fill={text}
        className={styles.label}
        style={{ letterSpacing: variant === 'crit' ? '-0.01em' : '0' }}
      >
        {String(value)}
      </text>
    </svg>
  );
};
