// ============================================================================
// 帯（10層ごと）のテーマ配色（[06 §8]）。グラフィックは作り込まず、配色で雰囲気を変える。
// 擬似3D一人称ビューの壁/床/天井色を帯ごとに切り替える。深層ほど巡回的に変化。
// 黒曜トンマナで統一（_obsidian.scss の CSS 変数と同値の hex を使用）
// ============================================================================

export interface BandTheme {
  name: string;
  sky: string; // 遠景・開口
  ceiling: string;
  floor: string;
  wall: string;
  frontWall: string;
  outline: string;
  /** 2D マップの床基調（将来の2Dマップ帯連動用。現状は擬似3Dのみ帯テーマ適用）。 */
  mapFloor: string;
}

// 帯ごとのテーマ。配列を巡回して使う（深層でも破綻しない）。
// 黒曜パレット統一: --bg-deep / --bg-mid / --bg-rise / --gold / --danger 等を基点に配色する。
export const BAND_THEMES: BandTheme[] = [
  // 0: 樹海（1〜10F）— 落ち着いた金箔＋深緑の入門帯
  // sky=--bg-rise, ceiling=深緑, floor=--gold-deep, wall=緑寄り bg-rise, frontWall=--bg-rise, outline=--bg-deep
  {
    name: '樹海',
    sky: '#1c2230', // = var(--bg-rise)
    ceiling: '#1a2c1e', // 深緑（bg-rise の緑寄り変奏）
    floor: '#b08f4f', // = var(--gold-deep)
    wall: '#1f3026', // 緑がかった暗色
    frontWall: '#1c2230', // = var(--bg-rise)
    outline: '#090a0d', // = var(--bg-deep)
    mapFloor: '#0e0f13', // = var(--bg-mid)
  },
  // 1: 洞窟（11〜20F）— やや暗い blue 系中盤帯
  // sky=--bg-deep, ceiling=--bg-mid, floor=--surface-panel, wall=--bg-rise, frontWall=--bg-mid, outline=--bg-deep
  {
    name: '洞窟',
    sky: '#090a0d', // = var(--bg-deep)
    ceiling: '#0e0f13', // = var(--bg-mid)
    floor: '#15171f', // = var(--surface-panel)
    wall: '#1c2230', // = var(--bg-rise)
    frontWall: '#0e0f13', // = var(--bg-mid)
    outline: '#090a0d', // = var(--bg-deep)
    mapFloor: '#090a0d', // = var(--bg-deep)
  },
  // 2: 火山（21〜30F）— 危険の赤＋金箔の深層帯
  // sky=--bg-deep, ceiling=danger 寄り暗色, floor=--danger-glow, wall=--danger, frontWall=danger 暗色, outline=--bg-deep
  {
    name: '火山',
    sky: '#090a0d', // = var(--bg-deep)
    ceiling: '#1e0e0b', // 暗赤（danger 寄り）
    floor: '#d4674f', // = var(--danger-glow)
    wall: '#b23c30', // = var(--danger)
    frontWall: '#1e0e0b', // 暗赤（danger 寄り）
    outline: '#090a0d', // = var(--bg-deep)
    mapFloor: '#0e0f13', // = var(--bg-mid)
  },
  // 3: 氷窟（31〜40F）— text-blue＋bg-mid の終盤帯
  // sky=--bg-mid, ceiling=--bg-rise, floor=--text-blue, wall=--info-blue 暗め, frontWall=--bg-rise, outline=--bg-deep
  {
    name: '氷窟',
    sky: '#0e0f13', // = var(--bg-mid)
    ceiling: '#1c2230', // = var(--bg-rise)
    floor: '#7d8aa0', // = var(--text-blue)
    wall: '#4a6070', // info-blue 寄りの中間色
    frontWall: '#1c2230', // = var(--bg-rise)
    outline: '#090a0d', // = var(--bg-deep)
    mapFloor: '#090a0d', // = var(--bg-deep)
  },
  // 4: 霊廟（41F+）— 最深層。bg-deep + gold-bright の聖堂的演出
  // sky=--bg-deep, ceiling=--bg-mid, floor=--gold, wall=--gold-deep 暗色, frontWall=--bg-mid, outline=--bg-deep
  {
    name: '霊廟',
    sky: '#090a0d', // = var(--bg-deep)
    ceiling: '#0e0f13', // = var(--bg-mid)
    floor: '#c9a86a', // = var(--gold)
    wall: '#b08f4f', // = var(--gold-deep)
    frontWall: '#0e0f13', // = var(--bg-mid)
    outline: '#090a0d', // = var(--bg-deep)
    mapFloor: '#090a0d', // = var(--bg-deep)
  },
];

/** depth から帯テーマを得る（10層ごと・配列を巡回）。 */
export function bandThemeFor(depth: number): BandTheme {
  const band = Math.floor((depth - 1) / 10);
  return BAND_THEMES[((band % BAND_THEMES.length) + BAND_THEMES.length) % BAND_THEMES.length];
}
