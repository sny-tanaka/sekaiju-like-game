// ============================================================================
// 帯（10層ごと）のテーマ配色（[06 §8]）。グラフィックは作り込まず、配色で雰囲気を変える。
// 擬似3D一人称ビューの壁/床/天井色を帯ごとに切り替える。深層ほど巡回的に変化。
// ============================================================================

export interface BandTheme {
  name: string;
  sky: string; // 遠景・開口
  ceiling: string;
  floor: string;
  wall: string;
  frontWall: string;
  outline: string;
  /** 2D マップの床/壁の基調（任意）。 */
  mapFloor: string;
}

// 帯ごとのテーマ。配列を巡回して使う（深層でも破綻しない）。
export const BAND_THEMES: BandTheme[] = [
  // 0: 樹海（緑）
  {
    name: '樹海',
    sky: '#26301c',
    ceiling: '#3a4a2c',
    floor: '#5d6b46',
    wall: '#8b9a6b',
    frontWall: '#7a8a5c',
    outline: '#2c3720',
    mapFloor: '#fbfdf7',
  },
  // 1: 洞窟（青灰）
  {
    name: '洞窟',
    sky: '#1c2630',
    ceiling: '#2c3a4a',
    floor: '#46586b',
    wall: '#6b7f9a',
    frontWall: '#5c708a',
    outline: '#202c37',
    mapFloor: '#f5f8fb',
  },
  // 2: 灼熱（赤茶）
  {
    name: '火山',
    sky: '#30201c',
    ceiling: '#4a302c',
    floor: '#6b4a46',
    wall: '#9a6f6b',
    frontWall: '#8a5f5c',
    outline: '#371f20',
    mapFloor: '#fdf6f4',
  },
  // 3: 氷窟（白青）
  {
    name: '氷窟',
    sky: '#243038',
    ceiling: '#3a4e58',
    floor: '#5d7682',
    wall: '#8fb0bd',
    frontWall: '#7f9fad',
    outline: '#22343c',
    mapFloor: '#f4fafd',
  },
  // 4: 霊廟（紫）
  {
    name: '霊廟',
    sky: '#2a2030',
    ceiling: '#3e2c4a',
    floor: '#5d466b',
    wall: '#8a6f9a',
    frontWall: '#7a5f8a',
    outline: '#2c2237',
    mapFloor: '#faf4fd',
  },
];

/** depth から帯テーマを得る（10層ごと・配列を巡回）。 */
export function bandThemeFor(depth: number): BandTheme {
  const band = Math.floor((depth - 1) / 10);
  return BAND_THEMES[((band % BAND_THEMES.length) + BAND_THEMES.length) % BAND_THEMES.length];
}
