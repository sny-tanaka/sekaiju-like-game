import { eraseIcon, iconAt, placeIcon } from '@/domain/playerMap';
import { createInitialSaveData } from '@/domain/saveData';

describe('playerMap (アイコンのセルフマッピング)', () => {
  test('アイコンを配置できる', () => {
    const save = createInitialSaveData('g');
    const next = placeIcon(save, 1, 2, 3, 'icon_chest');
    expect(iconAt(next, 1, 2, 3)).toBe('icon_chest');
    // 元データは不変
    expect(iconAt(save, 1, 2, 3)).toBeNull();
  });

  test('同じアイコンの再配置で消える（トグル）', () => {
    let save = createInitialSaveData('g');
    save = placeIcon(save, 1, 2, 3, 'icon_chest');
    save = placeIcon(save, 1, 2, 3, 'icon_chest');
    expect(iconAt(save, 1, 2, 3)).toBeNull();
  });

  test('別アイコンで置き換わる', () => {
    let save = createInitialSaveData('g');
    save = placeIcon(save, 1, 2, 3, 'icon_chest');
    save = placeIcon(save, 1, 2, 3, 'icon_foe');
    expect(iconAt(save, 1, 2, 3)).toBe('icon_foe');
    expect(save.playerMaps[1].icons).toHaveLength(1);
  });

  test('eraseIcon で消える', () => {
    let save = createInitialSaveData('g');
    save = placeIcon(save, 1, 2, 3, 'icon_chest');
    save = eraseIcon(save, 1, 2, 3);
    expect(iconAt(save, 1, 2, 3)).toBeNull();
  });

  test('階ごとに独立して保持される', () => {
    let save = createInitialSaveData('g');
    save = placeIcon(save, 1, 0, 0, 'icon_star');
    save = placeIcon(save, 2, 0, 0, 'icon_foe');
    expect(iconAt(save, 1, 0, 0)).toBe('icon_star');
    expect(iconAt(save, 2, 0, 0)).toBe('icon_foe');
  });
});
