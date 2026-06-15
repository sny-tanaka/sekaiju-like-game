import { useEffect, useRef } from 'react';

import styles from './style.module.scss';

import { castView } from '@/domain/firstPersonView';
import type { Dir, FloorMaster } from '@/domain/types';

/** 帯テーマで切り替える配色（[06 §8]）。未指定は既定（樹海）。 */
export type ViewTheme = {
  sky: string;
  ceiling: string;
  floor: string;
  wall: string;
  frontWall: string;
  outline: string;
};

type Props = {
  floor: FloorMaster;
  pos: { x: number; y: number };
  dir: Dir;
  /** 生存中の FOE の現在位置。正面の直線上にいると擬似3Dに重ねて表示する（[02 §6]）。 */
  foes?: { x: number; y: number; alerted: boolean }[];
  /** 帯ごとの配色テーマ（[06 §8]）。 */
  theme?: ViewTheme;
  /** 見通す最大マス数。 */
  maxDepth?: number;
  width?: number;
  height?: number;
};

// 単色＋遠近の台形だけで描く軽量な擬似3D一人称視界（3D/WebGL不使用）。
// 直線上の階段・FOE 等を「正面に見える」形で提示し、マッピングの手がかりにする。
const COLORS = {
  sky: '#26301c',
  ceiling: '#3a4a2c',
  floor: '#5d6b46',
  wall: '#8b9a6b',
  opening: '#1c241522',
  frontWall: '#7a8a5c',
  outline: '#2c3720',
};

// 各奥行き境界の縮小率（手前=1、奥ほど小さく）。
const DEPTH_SCALE = 0.56;

export const FirstPersonView = ({
  floor,
  pos,
  dir,
  foes = [],
  theme,
  maxDepth = 4,
  width = 358,
  height = 200,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // テーマ未指定なら既定色（樹海）。
    const C = { ...COLORS, ...(theme ?? {}) };
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const W = width;
    const H = height;
    const cx = W / 2;
    const cy = H / 2;
    const slices = castView(floor, pos, dir, maxDepth);

    const rectAt = (k: number) => {
      const s = Math.pow(DEPTH_SCALE, k);
      return { l: cx - (W / 2) * s, r: cx + (W / 2) * s, t: cy - (H / 2) * s, b: cy + (H / 2) * s };
    };
    const quad = (p: [number, number][], fill: string, stroke = false) => {
      ctx.beginPath();
      ctx.moveTo(p[0][0], p[0][1]);
      for (let i = 1; i < p.length; i++) ctx.lineTo(p[i][0], p[i][1]);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      if (stroke) {
        ctx.strokeStyle = C.outline;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };
    const darken = (k: number) => `rgba(0,0,0,${Math.min(0.5, k * 0.13)})`;

    // 背景（空/床の地色）
    ctx.fillStyle = C.sky;
    ctx.fillRect(0, 0, W, H);

    // 奥から手前へ描く（手前が上に重なる）
    for (let k = slices.length - 1; k >= 0; k--) {
      const near = rectAt(k);
      const far = rectAt(k + 1);
      const slice = slices[k];

      // 天井・床
      quad(
        [
          [near.l, near.t],
          [near.r, near.t],
          [far.r, far.t],
          [far.l, far.t],
        ],
        C.ceiling
      );
      quad(
        [
          [near.l, near.b],
          [near.r, near.b],
          [far.r, far.b],
          [far.l, far.b],
        ],
        C.floor
      );

      // 左壁 / 右壁（開口なら奥が見える暗色、壁なら壁色）
      quad(
        [
          [near.l, near.t],
          [far.l, far.t],
          [far.l, far.b],
          [near.l, near.b],
        ],
        slice.leftOpen ? C.sky : C.wall,
        true
      );
      quad(
        [
          [near.r, near.t],
          [far.r, far.t],
          [far.r, far.b],
          [near.r, near.b],
        ],
        slice.rightOpen ? C.sky : C.wall,
        true
      );

      // 前方が壁: 正面の壁面を描いて打ち切り
      if (!slice.frontOpen) {
        quad(
          [
            [far.l, far.t],
            [far.r, far.t],
            [far.r, far.b],
            [far.l, far.b],
          ],
          C.frontWall,
          true
        );
      }

      // 距離による減光
      ctx.fillStyle = darken(k);
      ctx.fillRect(far.l, far.t, far.r - far.l, far.b - far.t);

      // セル上のオブジェクト（階段）を正面に表示
      const ev = slice.event;
      if (ev?.kind === 'stairsUp' || ev?.kind === 'stairsDown') {
        const mx = cx;
        const my = (near.b + far.b) / 2 - (near.b - far.b) * 0.15;
        const size = Math.max(12, (near.b - near.t) * 0.18);
        ctx.fillStyle = ev.kind === 'stairsUp' ? '#e8923a' : '#7aa2d6';
        ctx.beginPath();
        ctx.arc(mx, my, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${Math.floor(size * 1.2)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ev.kind === 'stairsUp' ? '▲' : '▼', mx, my + 1);
      }

      // 正面の直線上にいる FOE を重ねて表示（現在地マス k=0 は除く）。
      if (k > 0 && foes.some((f) => f.x === slice.x && f.y === slice.y)) {
        const alerted = foes.some((f) => f.x === slice.x && f.y === slice.y && f.alerted);
        const mx = cx;
        const my = (near.b + far.b) / 2 - (near.b - far.b) * 0.1;
        const size = Math.max(14, (near.b - near.t) * 0.22);
        ctx.fillStyle = alerted ? '#d32f2f' : '#b0533a';
        ctx.beginPath();
        ctx.arc(mx, my, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${Math.floor(size * 1.3)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('!', mx, my + 1);
      }
    }
  }, [floor, pos, dir, foes, theme, maxDepth, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.view}
      style={{ width, height }}
    />
  );
};
