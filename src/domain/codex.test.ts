import { codexSummary, monsterCodex } from '@/domain/codex';
import { createInitialSaveData } from '@/domain/saveData';
import type { SaveData } from '@/domain/types';

function withBestiary(mods: SaveData['bestiary']['monsters']): SaveData {
  const save = createInitialSaveData('g');
  return { ...save, bestiary: { ...save.bestiary, monsters: mods } };
}

describe('codex', () => {
  test('初期状態は全モンスター未遭遇', () => {
    const save = createInitialSaveData('g');
    const entries = monsterCodex(save);
    expect(entries.length).toBeGreaterThan(0);
    expect(entries.every((e) => !e.seen && !e.defeated)).toBe(true);
    const sum = codexSummary(save);
    expect(sum.monstersSeen).toBe(0);
    expect(sum.monstersDefeated).toBe(0);
    expect(sum.completionPct).toBe(0);
  });

  test('遭遇・撃破・ドロップが図鑑へ反映される', () => {
    const save = withBestiary({
      enemy_slime: { seen: true, defeated: true, dropsFound: ['item_slime_jelly'], kills: 1 },
    });
    const slime = monsterCodex(save).find((e) => e.id === 'enemy_slime')!;
    expect(slime.seen).toBe(true);
    expect(slime.defeated).toBe(true);
    expect(slime.drops.find((d) => d.itemId === 'item_slime_jelly')?.found).toBe(true);
    const sum = codexSummary(save);
    expect(sum.monstersDefeated).toBe(1);
    expect(sum.dropsFound).toBe(1);
    expect(sum.completionPct).toBeGreaterThan(0);
  });

  test('tierBand 昇順で並ぶ', () => {
    const entries = monsterCodex(createInitialSaveData('g'));
    for (let i = 1; i < entries.length; i++) {
      expect(entries[i].tierBand).toBeGreaterThanOrEqual(entries[i - 1].tierBand);
    }
  });
});
