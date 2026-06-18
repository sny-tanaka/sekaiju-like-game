import { useEffect, useRef } from 'react';

import styles from './style.module.scss';

import {
  stairsDownImg,
  stairsIconDrawable,
  stairsUpImg,
  useStairsIconsReady,
} from '@/components/common/stairsIcons';
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
// 開口部は sky 色を流用するため opening 定数は持たない。
// 色は写本ダンジョンパレット（_variables.scss $fpv-* と同値）。
const COLORS = {
  sky: '#1A1612', // $fpv-shadow — 通路の影
  ceiling: '#2A2520', // $fpv-ceiling
  floor: '#B89255', // $fpv-floor-near（手前の床色）
  wall: '#544A36', // $fpv-wall-mid
  frontWall: '#3A3528', // $fpv-wall-near（最濃）
  outline: '#1A1612', // $fpv-shadow
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
  const iconsReady = useStairsIconsReady(); // 階段アイコンのロード完了で再描画する

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

      // セル上のオブジェクト（階段）を正面に表示。専用アイコン画像（上り/下り）。
      const ev = slice.event;
      if (ev?.kind === 'stairsUp' || ev?.kind === 'stairsDown') {
        const img = ev.kind === 'stairsUp' ? stairsUpImg : stairsDownImg;
        if (stairsIconDrawable(img)) {
          // この奥行きの床帯（far.b〜near.b）の高さに合わせ、床の上に収まるよう中央へ置く。
          const size = Math.max(20, (near.b - far.b) * 0.95);
          const ox = cx - size / 2;
          const oy = (near.b + far.b) / 2 - size / 2;
          ctx.imageSmoothingEnabled = false; // ピクセルアートをくっきり描く
          ctx.drawImage(img, ox, oy, size, size);
        }
      }

      // 正面の直線上にいる FOE を重ねて表示（現在地マス k=0 は除く）。
      if (k > 0 && foes.some((f) => f.x === slice.x && f.y === slice.y)) {
        const alerted = foes.some((f) => f.x === slice.x && f.y === slice.y && f.alerted);
        const mx = cx;
        const my = (near.b + far.b) / 2 - (near.b - far.b) * 0.1;
        const size = Math.max(14, (near.b - near.t) * 0.22);
        ctx.fillStyle = alerted ? '#B22C2C' : '#8A1F1F'; // $vermilion / $vermilion-dark
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
  }, [floor, pos, dir, foes, theme, maxDepth, width, height, iconsReady]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.view}
      style={{ width, height }}
    />
  );
};
