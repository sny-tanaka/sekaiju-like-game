import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';

import styles from './style.module.scss';

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
  /** 1セルの最大ピクセル（画面幅に合わせて縮む）。 */
  maxCell?: number;
  /** セルタップで隣接1歩移動などに使う。 */
  onCellClick?: (x: number, y: number) => void;
};

const COLORS = {
  fog: '#cdd9b8', // 未踏（背景より少し濃い緑）
  floor: '#fbfdf7', // 踏破済みの床
  wall: '#4a5a3a', // 壁線
  grid: '#e3ebd6', // 床のうっすらした境界
  player: '#2196f3',
  stairsUp: '#e8923a', // 次階へ（上り）
  stairsDown: '#7aa2d6', // 前階/拠点へ（下り）
};

// 2D 俯瞰のプレイヤーマップ（02 §4 / MVP の主役ビュー）。
// 探索済みセルのみ床・壁を描画し、未踏は霧として残す。自動マップ相当。
export const DungeonMap = ({
  floor,
  explored,
  pos,
  dir,
  icons = [],
  maxCell = 26,
  onCellClick,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cell = Math.max(10, Math.min(maxCell, Math.floor(360 / floor.width)));
  const w = floor.width * cell;
  const h = floor.height * cell;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const exploredSet = new Set(explored);
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

        // 階段マーク
        const ev = c.event;
        if (ev?.kind === 'stairsUp' || ev?.kind === 'stairsDown') {
          ctx.fillStyle = ev.kind === 'stairsUp' ? COLORS.stairsUp : COLORS.stairsDown;
          ctx.beginPath();
          ctx.arc(px + cell / 2, py + cell / 2, cell * 0.28, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = `bold ${Math.floor(cell * 0.5)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(ev.kind === 'stairsUp' ? '▲' : '▼', px + cell / 2, py + cell / 2 + 1);
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
  }, [floor, explored, pos, dir, icons, cell, w, h]);

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
