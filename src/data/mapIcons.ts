// ============================================================================
// 手描きマップ用アイコン（[02 §4.2]）。
// 壁/床はオートマップに任せ、プレイヤーはこれらのアイコンをセルに手動配置する。
// 絵文字を使い画像アセットは持たない（グラフィックは作り込まない方針）。
// ============================================================================

export interface MapIconDef {
  id: string;
  symbol: string; // 絵文字
  label: string;
}

export const MAP_ICONS: MapIconDef[] = [
  { id: 'icon_chest', symbol: '📦', label: '宝箱' },
  { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
  { id: 'icon_warning', symbol: '⚠️', label: '注意' },
  { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
  { id: 'icon_gather', symbol: '⛏️', label: '採集' },
  { id: 'icon_event', symbol: '❗', label: 'イベント' },
  { id: 'icon_note', symbol: '📝', label: 'メモ' },
  { id: 'icon_star', symbol: '⭐', label: '任意' },
];

const ICON_BY_ID = new Map(MAP_ICONS.map((i) => [i.id, i]));

export function mapIconSymbol(iconId: string): string {
  return ICON_BY_ID.get(iconId)?.symbol ?? '•';
}
