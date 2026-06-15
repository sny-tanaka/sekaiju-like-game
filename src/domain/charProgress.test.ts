import { BALANCE } from '@/data/balance';
import {
  acquireTitle,
  canAcquireTitle,
  canReincarnate,
  lookupRebirthBonus,
  reincarnate,
  reincarnateInSave,
  transferClass,
  transferClassInSave,
} from '@/domain/charProgress';
import { addEquipment, equipItem } from '@/domain/inventory';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
import { availableSP, skillLevel } from '@/domain/skillTree';
import type { Character, SaveData } from '@/domain/types';

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

  test('SP 総量は新レベル基準に再計算され、増殖しない（回帰）', () => {
    // Lv20（total=57相当）→ 転職で Lv15。total は 3*(15-1)=42 に再計算される
    const c = warrior({ level: 20, skillPoints: { total: 57, spent: 0 } });
    const after = transferClass(c, 'class_mage');
    expect(after.skillPoints.total).toBe(BALANCE.SP_PER_LEVEL * 14);
    expect(availableSP(after)).toBeLessThanOrEqual(BALANCE.SP_PER_LEVEL * 14);
    expect(availableSP(after)).toBeGreaterThanOrEqual(0);
  });
});

describe('transferClassInSave', () => {
  test('新職業で装備不可になった装備は倉庫へ戻る', () => {
    let save: SaveData = createInitialSaveData('g');
    const c = createCharacter({ raceId: 'race_human', classId: 'class_warrior', name: 'A' });
    save = addCharacterToGuild(save, c);
    save = addEquipment(save, 'equip_short_sword');
    save = equipItem(save, c.id, save.guild.equipment[0].id);
    expect(save.guild.members[0].equipment.weapon?.masterId).toBe('equip_short_sword');

    save = transferClassInSave(save, c.id, 'class_mage'); // 魔導士は剣不可
    const m = save.guild.members[0];
    expect(m.classId).toBe('class_mage');
    expect(m.equipment.weapon).toBeNull();
    // プールへ返却
    expect(save.guild.equipment.some((e) => e.masterId === 'equip_short_sword')).toBe(true);
  });
});

describe('reincarnateInSave', () => {
  test('装備は失わず倉庫へ戻してから作り直す', () => {
    let save: SaveData = createInitialSaveData('g');
    const c = createCharacter({ raceId: 'race_human', classId: 'class_warrior', name: 'A' });
    save = addCharacterToGuild(save, { ...c, level: 50 });
    save = addEquipment(save, 'equip_iron_armor');
    save = equipItem(save, c.id, save.guild.equipment[0].id);

    save = reincarnateInSave(save, c.id, { raceId: 'race_pix', classId: 'class_mage', name: 'B' });
    const m = save.guild.members[0];
    expect(m.id).toBe(c.id);
    expect(m.classId).toBe('class_mage');
    expect(m.equipment.armor).toBeNull();
    // プールへ返却
    expect(save.guild.equipment.some((e) => e.masterId === 'equip_iron_armor')).toBe(true);
    expect(m.rebirthBonus).toEqual({ allStats: 6, bonusSp: 6 });
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
