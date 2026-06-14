import {
  acquireTitle,
  canAcquireTitle,
  canReincarnate,
  lookupRebirthBonus,
  reincarnate,
  transferClass,
} from '@/domain/charProgress';
import { createCharacter } from '@/domain/saveData';
import { skillLevel } from '@/domain/skillTree';
import type { Character } from '@/domain/types';

function warrior(over: Partial<Character> = {}): Character {
  const c = createCharacter({ raceId: 'race_human', classId: 'class_warrior', name: 'A' });
  return { ...c, ...over };
}

describe('transferClass', () => {
  test('職業が変わり、レベルが下がり、職業スキルが振り直される', () => {
    let c = warrior({
      level: 20,
      learnedSkills: { skill_power_slash: 3 },
      skillPoints: { total: 9, spent: 2 },
    });
    c = transferClass(c, 'class_mage');
    expect(c.classId).toBe('class_mage');
    expect(c.level).toBe(15); // -5
    // 旧職業スキルは消え、新職業の開始スキルが付く
    expect(skillLevel(c, 'skill_power_slash')).toBe(0);
    expect(skillLevel(c, 'skill_fire_bolt')).toBe(1);
    expect(c.titleId).toBeNull();
  });

  test('種族（ユニオン）スキルは保持される', () => {
    let c = warrior({ level: 10, learnedSkills: { skill_union_rally: 2, skill_power_slash: 1 } });
    c = transferClass(c, 'class_ranger');
    expect(skillLevel(c, 'skill_union_rally')).toBe(2);
    expect(skillLevel(c, 'skill_power_slash')).toBe(0);
  });

  test('レベルは1未満にならない', () => {
    let c = warrior({ level: 3 });
    c = transferClass(c, 'class_mage');
    expect(c.level).toBe(1);
  });
});

describe('reincarnate', () => {
  test('レベル下限未満では転生できない', () => {
    const c = warrior({ level: 20 });
    expect(canReincarnate(c)).toBe(false);
    expect(reincarnate(c, { raceId: 'race_pix', classId: 'class_mage', name: 'B' })).toBe(c);
  });

  test('Lv50 転生で開始Lv25・ボーナス付与・id維持', () => {
    const c = warrior({ level: 50 });
    expect(canReincarnate(c)).toBe(true);
    const r = reincarnate(c, { raceId: 'race_pix', classId: 'class_mage', name: 'B' });
    expect(r.id).toBe(c.id);
    expect(r.raceId).toBe('race_pix');
    expect(r.classId).toBe('class_mage');
    expect(r.level).toBe(25); // floor(50/2)
    expect(r.rebirthBonus).toEqual({ allStats: 6, bonusSp: 6 });
    // 開始Lv分の通常SP + ボーナスSP
    expect(r.skillPoints.total).toBe(3 * 24 + 6);
  });

  test('開始レベルは上限30', () => {
    const c = warrior({ level: 100 });
    const r = reincarnate(c, { raceId: 'race_human', classId: 'class_warrior', name: 'C' });
    expect(r.level).toBe(30);
    expect(r.rebirthBonus).toEqual({ allStats: 20, bonusSp: 10 });
  });

  test('lookupRebirthBonus の境界', () => {
    expect(lookupRebirthBonus(29)).toBeNull();
    expect(lookupRebirthBonus(30)).toEqual({ allStats: 2, bonusSp: 4 });
    expect(lookupRebirthBonus(70)).toEqual({ allStats: 10, bonusSp: 8 });
  });
});

describe('acquireTitle', () => {
  test('到達階が足りないと習得不可', () => {
    const c = warrior();
    expect(canAcquireTitle(c, 'title_berserker', 10)).toBe(false);
  });

  test('到達20階以上＋職業の称号候補なら習得し SP+5', () => {
    const c = warrior({ skillPoints: { total: 5, spent: 0 } });
    expect(canAcquireTitle(c, 'title_berserker', 20)).toBe(true);
    const t = acquireTitle(c, 'title_berserker', 20);
    expect(t.titleId).toBe('title_berserker');
    expect(t.skillPoints.total).toBe(10);
  });

  test('別職業の称号は習得できない', () => {
    const c = warrior();
    expect(canAcquireTitle(c, 'title_pyromancer', 30)).toBe(false); // 魔導士の称号
  });

  test('既に称号を持っていると習得不可（MVP）', () => {
    const c = warrior({ titleId: 'title_berserker' });
    expect(canAcquireTitle(c, 'title_sentinel', 30)).toBe(false);
  });
});
