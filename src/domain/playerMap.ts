import type { PlacedIcon, PlayerMap, SaveData } from '@/domain/types';

// ============================================================================
// プレイヤーが手描きするマップ層（[02 §4]）。
// MVP では「アイコンのセルフマッピング」のみ（壁/床はオートマップ）。
// すべて純関数。floorPaint/wallDraw/notes/autopilot は将来用に枠だけ保持。
// ============================================================================

function emptyPlayerMap(depth: number): PlayerMap {
  return {
    depth,
    floorPaint: [],
    wallDraw: [],
    icons: [],
    notes: [],
    autopilotRoutes: [],
  };
}

function getMap(save: SaveData, depth: number): PlayerMap {
  return save.playerMaps[depth] ?? emptyPlayerMap(depth);
}

function withMap(save: SaveData, depth: number, map: PlayerMap): SaveData {
  return { ...save, playerMaps: { ...save.playerMaps, [depth]: map } };
}

/** そのセルに置かれているアイコン ID（無ければ null）。 */
export function iconAt(save: SaveData, depth: number, x: number, y: number): string | null {
  const found = save.playerMaps[depth]?.icons.find((i) => i.x === x && i.y === y);
  return found?.iconId ?? null;
}

/**
 * セルにアイコンを配置する。
 * - 同じアイコンが既にあれば消す（トグル）。
 * - 別のアイコンがあれば置き換える。
 * 1セルにつきアイコンは1つ（MVP）。
 */
export function placeIcon(
  save: SaveData,
  depth: number,
  x: number,
  y: number,
  iconId: string
): SaveData {
  const map = getMap(save, depth);
  const current = map.icons.find((i) => i.x === x && i.y === y);
  const rest = map.icons.filter((i) => !(i.x === x && i.y === y));
  const nextIcons: PlacedIcon[] = current?.iconId === iconId ? rest : [...rest, { x, y, iconId }];
  return withMap(save, depth, { ...map, icons: nextIcons });
}

/** セルのアイコンを消す。 */
export function eraseIcon(save: SaveData, depth: number, x: number, y: number): SaveData {
  const existing = save.playerMaps[depth];
  if (!existing) return save;
  return withMap(save, depth, {
    ...existing,
    icons: existing.icons.filter((i) => !(i.x === x && i.y === y)),
  });
}
