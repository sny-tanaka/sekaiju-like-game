import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';

import styles from './style.module.scss';

import {
  stairsDownImg,
  stairsIconDrawable,
  stairsUpImg,
  useStairsIconsReady,
} from '@/components/common/stairsIcons';
import { mapIconSymbol } from '@/data/mapIcons';
import type { Dir, FloorMaster, PlacedIcon } from '@/domain/types';

type Props = {
  floor: FloorMaster;
  /** 探索済みセルキー（"x,y"）。 */
  explored: string[];
  pos: { x: number; y: number };
  dir: Dir;
  /** プレイヤーが手動配置したアイコン。 */
  icons?: PlacedIcon[];
  /** 生存中の FOE（徘徊敵）の現在位置。探索済みセルのみ自動表示する（[02 §6]）。 */
  foes?: { x: number; y: number; alerted: boolean }[];
  /** 枯渇した採集ポイントの cellKey（"x,y"）。薄く表示する（[04 §5]）。 */
  depletedGathers?: string[];
  /** 1セルの最大ピクセル（画面幅に合わせて縮む）。 */
  maxCell?: number;
  /** セルタップで隣接1歩移動などに使う。 */
  onCellClick?: (x: number, y: number) => void;
};

const COLORS = {
  fog: '#090a0d', // 未踏 = var(--bg-deep)
  floor: '#0e0f13', // 踏破済みの床 = var(--bg-mid)
  wall: '#f2ede1', // 壁線 = var(--text-strong)（暗背景上に白系で描画）
  grid: '#1c2230', // 床のうっすらした境界 = var(--bg-rise)
  player: '#c9a86a', // 現在位置 = var(--gold)
  foe: '#6b6f7a', // 徘徊敵（未感知）= var(--text-quote)
  foeAlert: '#b23c30', // 徘徊敵（追跡中）= var(--danger)
  gather: '#c9a86a', // 採集ポイント = var(--gold)
  gatherDone: '#6b6f7a', // 採集済み（枯渇）= var(--text-quote)（暗めで枯渇感）
  cooking: '#c9a86a', // 調理地点 = var(--gold)
};

// 採集種類ごとの絵文字アイコン（issue #20。地図上で種類を見分けやすく）。
const GATHER_GLYPH: Record<string, string> = {
  mining: '⛏️', // 採掘=ツルハシ
  gathering: '🌿', // 採取=草
  logging: '🪓', // 伐採=斧
  fishing: '🎣', // 釣り
  harvest: '🌰', // 収穫=木の実
  hunting: '🍖', // 狩猟=肉
};
const COOKING_GLYPH = '🍳'; // 調理=フライパン

// 2D 俯瞰のプレイヤーマップ（02 §4 / MVP の主役ビュー）。
// 探索済みセルのみ床・壁を描画し、未踏は霧として残す。自動マップ相当。
export const DungeonMap = ({
  floor,
  explored,
  pos,
  dir,
  icons = [],
  foes = [],
  depletedGathers = [],
  maxCell = 26,
  onCellClick,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iconsReady = useStairsIconsReady(); // 階段アイコンのロード完了で再描画する
  const cell = Math.max(10, Math.min(maxCell, Math.floor(360 / floor.width)));
  const w = floor.width * cell;
  const h = floor.height * cell;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const exploredSet = new Set(explored);
    const depletedSet = new Set(depletedGathers);
    const gatherTypeByCell = new Map(
      floor.gatheringPoints.map((g) => [`${g.cell.x},${g.cell.y}`, g.type])
    );
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    // セル床
    for (let y = 0; y < floor.height; y++) {
      for (let x = 0; x < floor.width; x++) {
        const seen = exploredSet.has(`${x},${y}`);
        ctx.fillStyle = seen ? COLORS.floor : COLORS.fog;
        ctx.fillRect(x * cell, y * cell, cell, cell);
        if (seen) {
          ctx.strokeStyle = COLORS.grid;
          ctx.lineWidth = 1;
          ctx.strokeRect(x * cell + 0.5, y * cell + 0.5, cell - 1, cell - 1);
        }
      }
    }

    // 壁線（探索済みセルのみ）
    ctx.strokeStyle = COLORS.wall;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    const line = (x1: number, y1: number, x2: number, y2: number) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };
    for (let y = 0; y < floor.height; y++) {
      for (let x = 0; x < floor.width; x++) {
        if (!exploredSet.has(`${x},${y}`)) continue;
        const c = floor.cells[y][x];
        const px = x * cell;
        const py = y * cell;
        if (c.walls.N) line(px, py, px + cell, py);
        if (c.walls.S) line(px, py + cell, px + cell, py + cell);
        if (c.walls.W) line(px, py, px, py + cell);
        if (c.walls.E) line(px + cell, py, px + cell, py + cell);

        // 階段マーク: 専用アイコン画像で描く（上り/下り）。
        const ev = c.event;
        if (ev?.kind === 'stairsUp' || ev?.kind === 'stairsDown') {
          const img = ev.kind === 'stairsUp' ? stairsUpImg : stairsDownImg;
          if (stairsIconDrawable(img)) {
            const s = cell * 0.9;
            const ox = px + (cell - s) / 2;
            const oy = py + (cell - s) / 2;
            ctx.imageSmoothingEnabled = false; // ピクセルアートをくっきり描く
            ctx.drawImage(img, ox, oy, s, s);
          }
        } else if (ev?.kind === 'gather') {
          // 採集ポイント: 種類別の絵文字アイコン（issue #20）。枯渇済みは薄く表示。
          const depleted = depletedSet.has(`${x},${y}`);
          const t = gatherTypeByCell.get(`${x},${y}`);
          ctx.globalAlpha = depleted ? 0.35 : 1;
          ctx.font = `${Math.floor(cell * 0.7)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText((t && GATHER_GLYPH[t]) || '🌿', px + cell / 2, py + cell / 2 + 1);
          ctx.globalAlpha = 1;
        } else if (ev?.kind === 'cookingSpot') {
          // 調理地点（フライパン）。
          ctx.font = `${Math.floor(cell * 0.7)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(COOKING_GLYPH, px + cell / 2, py + cell / 2 + 1);
        }
      }
    }

    // プレイヤーが手動配置したアイコン（探索済みセルのみ表示）
    ctx.font = `${Math.floor(cell * 0.66)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const ic of icons) {
      if (!exploredSet.has(`${ic.x},${ic.y}`)) continue;
      ctx.fillText(mapIconSymbol(ic.iconId), ic.x * cell + cell / 2, ic.y * cell + cell / 2 + 1);
    }

    // FOE（徘徊敵）: 探索済みセルのみ自動表示（[02 §6]）。alerted は強調色。
    for (const f of foes) {
      if (!exploredSet.has(`${f.x},${f.y}`)) continue;
      const fx = f.x * cell + cell / 2;
      const fy = f.y * cell + cell / 2;
      ctx.fillStyle = f.alerted ? COLORS.foeAlert : COLORS.foe;
      ctx.beginPath();
      ctx.arc(fx, fy, cell * 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f2ede1'; // = var(--text-strong)
      ctx.font = `bold ${Math.floor(cell * 0.5)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('!', fx, fy + 1);
    }

    // プレイヤー（向きに合わせた三角形）
    const cx = pos.x * cell + cell / 2;
    const cy = pos.y * cell + cell / 2;
    const r = cell * 0.34;
    const angle: Record<Dir, number> = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI };
    const a = angle[dir];
    ctx.fillStyle = COLORS.player;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    ctx.lineTo(cx + Math.cos(a + 2.5) * r, cy + Math.sin(a + 2.5) * r);
    ctx.lineTo(cx + Math.cos(a - 2.5) * r, cy + Math.sin(a - 2.5) * r);
    ctx.closePath();
    ctx.fill();
  }, [floor, explored, pos, dir, icons, foes, depletedGathers, cell, w, h, iconsReady]);

  const handleClick = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!onCellClick) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * floor.width);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * floor.height);
    if (x >= 0 && y >= 0 && x < floor.width && y < floor.height) onCellClick(x, y);
  };

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      style={{ width: w, height: h }}
      onClick={handleClick}
    />
  );
};
