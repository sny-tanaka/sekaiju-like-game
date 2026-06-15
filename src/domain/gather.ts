import { GATHER_TYPES } from '@/data/gather';
import { ITEMS } from '@/data/items';
import { FOOD_STORAGE_LIMIT, addFood, addItem, foodTotal } from '@/domain/inventory';
import { cellKey } from '@/domain/types';
import type { GatheringPoint, Rng, SaveData } from '@/domain/types';

// ============================================================================
// 採集（[04 §5]）。現在地の採集ポイントから素材/食材を得る純関数。
// 対応スキルの保持者がパーティに必要。採集後はその探索中は枯渇（depletedGathers）。
// ============================================================================

export interface GatherResult {
  ok: boolean;
  save: SaveData;
  itemId?: string;
  reason?: 'noDive' | 'noPoint' | 'depleted' | 'noSkill' | 'foodFull';
}

/** 出撃中パーティが指定スキルを習得しているか。 */
function partyHasSkill(save: SaveData, skillId: string): boolean {
  const ids = new Set(
    [...save.guild.party.front, ...save.guild.party.back].filter((x): x is string => x !== null)
  );
  return save.guild.members.some((m) => ids.has(m.id) && (m.learnedSkills[skillId] ?? 0) > 0);
}

/** 現在地の採集ポイント（無ければ null）。 */
export function gatheringPointHere(save: SaveData): GatheringPoint | null {
  const dive = save.diveState;
  if (!dive) return null;
  const floor = save.towerState.floors[dive.depth]?.generated;
  const cell = floor?.cells[dive.pos.y]?.[dive.pos.x];
  if (!floor || cell?.event?.kind !== 'gather') return null;
  const gatherId = cell.event.gatherId;
  return floor.gatheringPoints.find((g) => g.id === gatherId) ?? null;
}

/** 現在地の採集ポイントが枯渇済みか。 */
export function isGatherDepleted(save: SaveData, point: GatheringPoint): boolean {
  const dive = save.diveState;
  if (!dive) return true;
  const depleted = save.towerState.floors[dive.depth]?.depletedGathers ?? [];
  return depleted.includes(cellKey(point.cell.x, point.cell.y));
}

/** 採集に必要なスキルを持っているか。 */
export function canGather(save: SaveData, point: GatheringPoint): boolean {
  return partyHasSkill(save, GATHER_TYPES[point.type].requiredSkillId);
}

/** 重み付き1点抽選。 */
function pickWeighted(drops: { itemId: string; weight: number }[], rng: Rng): string {
  const total = drops.reduce((s, d) => s + d.weight, 0);
  let r = rng.next() * total;
  for (const d of drops) {
    r -= d.weight;
    if (r < 0) return d.itemId;
  }
  return drops[drops.length - 1].itemId;
}

/**
 * 現在地の採集ポイントで採集する。
 * 成功すると素材は倉庫、食材は foodStorage へ加え、そのポイントを枯渇させる。
 */
export function gatherHere(save: SaveData, rng: Rng): GatherResult {
  const dive = save.diveState;
  if (!dive) return { ok: false, save, reason: 'noDive' };
  const point = gatheringPointHere(save);
  if (!point) return { ok: false, save, reason: 'noPoint' };
  if (isGatherDepleted(save, point)) return { ok: false, save, reason: 'depleted' };
  const def = GATHER_TYPES[point.type];
  if (!partyHasSkill(save, def.requiredSkillId)) return { ok: false, save, reason: 'noSkill' };
  // 食材枠が満杯なら採集しない（枯渇登録もしない＝採集機会を失わせない）。
  if (def.food && foodTotal(save) >= FOOD_STORAGE_LIMIT) {
    return { ok: false, save, reason: 'foodFull' };
  }

  const itemId = pickWeighted(def.drops, rng);
  let next = def.food ? addFood(save, itemId, 1) : addItem(save, itemId, 1);

  // 枯渇登録（その探索中は再採集不可）
  const key = cellKey(point.cell.x, point.cell.y);
  const floor = next.towerState.floors[dive.depth];
  const depletedGathers = floor.depletedGathers.includes(key)
    ? floor.depletedGathers
    : [...floor.depletedGathers, key];
  next = {
    ...next,
    towerState: {
      ...next.towerState,
      floors: { ...next.towerState.floors, [dive.depth]: { ...floor, depletedGathers } },
    },
  };
  return { ok: true, save: next, itemId, reason: undefined };
}

/** 採集結果の表示名（ログ用）。 */
export function gatherItemName(itemId: string): string {
  return ITEMS[itemId]?.name ?? itemId;
}
