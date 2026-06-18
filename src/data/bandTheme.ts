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
  /** 2D マップの床基調（将来の2Dマップ帯連動用。現状は擬似3Dのみ帯テーマ適用）。 */
  mapFloor: string;
}

// 帯ごとのテーマ。配列を巡回して使う（深層でも破綻しない）。
// 写本(Codex) パレットに統一: 墨/羊皮紙/金箔/緑/朱を帯ごとに比率を変えて配色する。
export const BAND_THEMES: BandTheme[] = [
  // 0: 樹海（製本緑＋金箔の床。樹冠の隙間から差す光のイメージ）
  {
    name: '樹海',
    sky: '#1F2A1A',
    ceiling: '#2A4A33',
    floor: '#8A6A38',
    wall: '#3F6B4A',
    frontWall: '#2A4A33',
    outline: '#21241B',
    mapFloor: '#F2E9D2',
  },
  // 1: 洞窟（オーク墨の通路。光が乏しい）
  {
    name: '洞窟',
    sky: '#1A1612',
    ceiling: '#2D2A22',
    floor: '#4A4438',
    wall: '#615C4F',
    frontWall: '#544A36',
    outline: '#21241B',
    mapFloor: '#EDE3CC',
  },
  // 2: 火山（封蝋朱の煮え立つ通路）
  {
    name: '火山',
    sky: '#2A1612',
    ceiling: '#3A2018',
    floor: '#6A3D2D',
    wall: '#8A1F1F',
    frontWall: '#5A2018',
    outline: '#21241B',
    mapFloor: '#F2E9D2',
  },
  // 3: 氷窟（青寄り墨、漂白された羊皮紙）
  {
    name: '氷窟',
    sky: '#2A2E33',
    ceiling: '#3D424A',
    floor: '#7A7E82',
    wall: '#9AA0A6',
    frontWall: '#8A8F95',
    outline: '#21241B',
    mapFloor: '#F2EFE5',
  },
  // 4: 霊廟（金箔の壁＋紫墨の影。聖堂的）
  {
    name: '霊廟',
    sky: '#1F1A22',
    ceiling: '#2D2330',
    floor: '#5C4538',
    wall: '#B89255',
    frontWall: '#8A6A38',
    outline: '#21241B',
    mapFloor: '#F2E9D2',
  },
];

/** depth から帯テーマを得る（10層ごと・配列を巡回）。 */
export function bandThemeFor(depth: number): BandTheme {
  const band = Math.floor((depth - 1) / 10);
  return BAND_THEMES[((band % BAND_THEMES.length) + BAND_THEMES.length) % BAND_THEMES.length];
}
