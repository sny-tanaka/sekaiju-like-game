import { useMemo, useState } from 'react';

import styles from './style.module.scss';

import { SKILLS } from '@/data/skills';
import { canLearnSkill, skillLevel } from '@/domain/skillTree';
import type { Character, SkillTreeNode } from '@/domain/types';

// ============================================================================
// スキルツリー表示（本家風）。前提スキルから「Lv N」ラベル付きの線で次の列へつなぐ
// 左→右の段（列）レイアウト。列 = 前提チェーンの深さ。タップで習得（SP 1 消費）。
// ============================================================================

type Props = {
  /** 表示する1ツリー分のノード（職業 / 種族 / 称号 のいずれか）。 */
  nodes: SkillTreeNode[];
  char: Character;
  /** 習得（強化）操作。親で learnSkill を SaveData に反映する。 */
  onLearn: (skillId: string) => void;
};

const NODE_W = 132;
const NODE_H = 48;
const COL_W = 176; // ノード幅 + コネクタ/ラベルの余白
const ROW_H = 62;

export const SkillTree = ({ nodes, char, onLearn }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);

  const layout = useMemo(() => {
    const byId = new Map(nodes.map((n) => [n.skillId, n]));
    const depthMemo = new Map<string, number>();
    const depthOf = (id: string, guard = 0): number => {
      if (depthMemo.has(id)) return depthMemo.get(id)!;
      const n = byId.get(id);
      if (!n || !n.requires?.length || guard > 20) {
        depthMemo.set(id, 0);
        return 0;
      }
      const d =
        1 +
        Math.max(
          ...n.requires.map((r) => (byId.has(r.skillId) ? depthOf(r.skillId, guard + 1) : 0))
        );
      depthMemo.set(id, d);
      return d;
    };

    const cols: number[][] = [];
    nodes.forEach((n, i) => {
      const d = depthOf(n.skillId);
      (cols[d] ||= []).push(i);
    });

    const rowOf = new Map<string, number>();
    const used: Set<number>[] = cols.map(() => new Set<number>());
    for (let c = 0; c < cols.length; c++) {
      for (const i of cols[c] ?? []) {
        const n = nodes[i];
        let target = 0;
        if (c > 0 && n.requires?.length) {
          const prs = n.requires
            .map((r) => rowOf.get(r.skillId))
            .filter((v): v is number => v !== undefined);
          if (prs.length) target = Math.min(...prs);
        }
        let row = target;
        while (used[c].has(row)) row++;
        used[c].add(row);
        rowOf.set(n.skillId, row);
      }
    }

    const maxRow = Math.max(0, ...[...rowOf.values()]);
    const placed = nodes.map((n) => ({
      node: n,
      col: depthOf(n.skillId),
      row: rowOf.get(n.skillId) ?? 0,
    }));
    const edges: {
      from: string;
      to: string;
      level: number;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }[] = [];
    for (const p of placed) {
      for (const r of p.node.requires ?? []) {
        const pr = placed.find((q) => q.node.skillId === r.skillId);
        if (!pr) continue;
        edges.push({
          from: r.skillId,
          to: p.node.skillId,
          level: r.level,
          x1: pr.col * COL_W + NODE_W,
          y1: pr.row * ROW_H + NODE_H / 2,
          x2: p.col * COL_W,
          y2: p.row * ROW_H + NODE_H / 2,
        });
      }
    }
    return {
      placed,
      edges,
      width: (cols.length - 1) * COL_W + NODE_W,
      height: (maxRow + 1) * ROW_H,
    };
  }, [nodes]);

  const detail = selected ? SKILLS[selected] : null;
  const detailNode = selected ? nodes.find((n) => n.skillId === selected) : null;

  return (
    <div className={styles.wrap}>
      <div className={styles.scroll}>
        <div
          className={styles.canvas}
          style={{ width: layout.width, height: layout.height }}
        >
          <svg
            className={styles.edges}
            width={layout.width}
            height={layout.height}
          >
            {layout.edges.map((e) => {
              const midX = (e.x1 + e.x2) / 2;
              return (
                <g key={`${e.from}-${e.to}`}>
                  <path
                    className={styles.edge}
                    d={`M ${e.x1} ${e.y1} H ${midX} V ${e.y2} H ${e.x2}`}
                    fill="none"
                  />
                  <text
                    className={styles.edgeLabel}
                    x={e.x2 - 6}
                    y={e.y2 - 5}
                    textAnchor="end"
                  >
                    Lv{e.level}
                  </text>
                </g>
              );
            })}
          </svg>
          {layout.placed.map(({ node, col, row }) => {
            const lv = skillLevel(char, node.skillId);
            const maxed = lv >= node.maxLevel;
            const met = (node.requires ?? []).every((r) => skillLevel(char, r.skillId) >= r.level);
            const can = canLearnSkill(char, node.skillId);
            const cls = [
              styles.node,
              lv > 0 ? styles.learned : '',
              maxed ? styles.maxed : '',
              can ? styles.available : '',
              !met ? styles.locked : '',
              selected === node.skillId ? styles.selected : '',
            ]
              .filter(Boolean)
              .join(' ');
            return (
              <button
                type="button"
                key={node.skillId}
                className={cls}
                style={{ left: col * COL_W, top: row * ROW_H, width: NODE_W, height: NODE_H }}
                onClick={() => {
                  setSelected(node.skillId);
                  if (can) onLearn(node.skillId);
                }}
              >
                <span className={styles.nodeName}>
                  {SKILLS[node.skillId]?.name ?? node.skillId}
                </span>
                <span className={styles.nodeLv}>
                  <span className={styles.lvNum}>{lv}</span>
                  <span className={styles.lvBar}>
                    <span
                      className={styles.lvFill}
                      style={{ width: `${(lv / node.maxLevel) * 100}%` }}
                    />
                  </span>
                  <span className={styles.lvMax}>{node.maxLevel}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {detail ? (
        <div className={styles.detail}>
          <div className={styles.detailName}>
            {detail.name}
            <span className={styles.detailLv}>
              Lv {skillLevel(char, detail.id)}/{detailNode?.maxLevel ?? 0}
            </span>
          </div>
          <div className={styles.detailDesc}>{detail.description}</div>
          {detailNode?.requires?.length ? (
            <div className={styles.detailReq}>
              前提:{' '}
              {detailNode.requires
                .map((r) => `${SKILLS[r.skillId]?.name ?? r.skillId} Lv${r.level}`)
                .join('・')}
            </div>
          ) : null}
        </div>
      ) : (
        <div className={styles.hint}>
          ノードをタップで習得（SP 1 消費）。緑=習得済 / 枠強調=習得可 / 暗=前提未達。
        </div>
      )}
    </div>
  );
};
