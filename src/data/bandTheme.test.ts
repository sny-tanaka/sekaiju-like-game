import { BAND_THEMES, bandThemeFor } from '@/data/bandTheme';

describe('bandThemeFor', () => {
  test('10層ごとに帯が切り替わる', () => {
    expect(bandThemeFor(1)).toBe(BAND_THEMES[0]); // 1-10F = 帯0
    expect(bandThemeFor(10)).toBe(BAND_THEMES[0]);
    expect(bandThemeFor(11)).toBe(BAND_THEMES[1]); // 11-20F = 帯1
    expect(bandThemeFor(20)).toBe(BAND_THEMES[1]);
    expect(bandThemeFor(21)).toBe(BAND_THEMES[2]);
  });

  test('テーマ数を超えると巡回する', () => {
    const len = BAND_THEMES.length;
    // depth = 10*len + 1 で1周して帯0に戻る
    expect(bandThemeFor(10 * len + 1)).toBe(BAND_THEMES[0]);
  });

  test('depth 0 や負数でも落ちず有効なテーマを返す', () => {
    expect(BAND_THEMES).toContain(bandThemeFor(0));
    expect(BAND_THEMES).toContain(bandThemeFor(-5));
  });
});
