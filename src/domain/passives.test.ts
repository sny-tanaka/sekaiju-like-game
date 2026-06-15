import { computePassiveMods } from '@/domain/passives';
import { createCharacter } from '@/domain/saveData';
import type { Character } from '@/domain/types';

// ============================================================================
// パッシブスキルの常時倍率合算（[03 §5.4]）。
// ============================================================================

function charWith(learned: Record<string, number>, weapon?: string): Character {
  const c = createCharacter({ raceId: 'race_human', classId: 'class_warrior', name: 'テスト' });
  c.learnedSkills = { ...learned };
  if (weapon) c.equipment.weapon = { id: 'w1', masterId: weapon, forgeLevel: 0 };
  return c;
}

describe('passives: computePassiveMods', () => {
  test('無条件パッシブ（剛腕）は物理攻撃倍率に乗る', () => {
    const mods = computePassiveMods(charWith({ passive_warrior_phys_boost: 3 }));
    expect(mods.patk).toBeCloseTo(1.09, 5); // 1 + 0.03*3
  });

  test('最大HPブーストは maxHp 倍率になる', () => {
    const mods = computePassiveMods(charWith({ passive_guardian_hp_boost: 3 }));
    expect(mods.maxHp).toBeCloseTo(1.12, 5); // 1 + 0.04*3
  });

  test('武器マスタリーは対応武器を装備していないと無効', () => {
    const mods = computePassiveMods(charWith({ passive_warrior_blade_mastery: 3 }));
    expect(mods.patk).toBeUndefined();
  });

  test('武器マスタリーは対応武器の装備中のみ有効', () => {
    const mods = computePassiveMods(
      charWith({ passive_warrior_blade_mastery: 3 }, 'equip_short_sword')
    );
    expect(mods.patk).toBeCloseTo(1.12, 5); // 1 + 0.04*3
  });

  test('複数の同種倍率は乗算合成される', () => {
    const mods = computePassiveMods(
      charWith(
        { passive_warrior_phys_boost: 3, passive_warrior_blade_mastery: 3 },
        'equip_short_sword'
      )
    );
    expect(mods.patk).toBeCloseTo(1.09 * 1.12, 5);
  });

  test('クリ率パッシブは加算合成される', () => {
    const mods = computePassiveMods(charWith({ passive_monk_crit_boost: 2 }));
    expect(mods.crit).toBeCloseTo(0.03, 5); // 0.015*2
  });

  test('Lv0 のパッシブは無視される', () => {
    const mods = computePassiveMods(charWith({ passive_warrior_phys_boost: 0 }));
    expect(mods.patk).toBeUndefined();
  });
});
