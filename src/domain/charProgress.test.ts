import { REBIRTH, spTotalForLevel } from '@/data/balance';
import {
  acquireTitle,
  canAcquireTitle,
  canReincarnate,
  rebirthStatBonusForRace,
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
    // Lv20 → 転職で Lv15。total は spTotalForLevel(15) に再計算される
    const c = warrior({ level: 20, skillPoints: { total: 57, spent: 0 } });
    const after = transferClass(c, 'class_mage');
    expect(after.skillPoints.total).toBe(spTotalForLevel(15));
    expect(availableSP(after)).toBeLessThanOrEqual(spTotalForLevel(15));
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

describe('rebirthStatBonusForRace', () => {
  test('ガロンは STR が全ステ中で最大（攻撃型）', () => {
    const bonus = rebirthStatBonusForRace('race_garon');
    const values = Object.values(bonus).filter((v): v is number => v !== undefined);
    const str = bonus.str ?? 0;
    expect(str).toBeGreaterThan(0);
    expect(str).toBe(Math.max(...values));
  });

  test('ドームは VIT が STR より大きく（防御型）、HP も大きい', () => {
    const bonus = rebirthStatBonusForRace('race_golan');
    const vit = bonus.vit ?? 0;
    const str = bonus.str ?? 0;
    expect(vit).toBeGreaterThan(str);
    // HP も十分に大きいこと
    const hp = bonus.hp ?? 0;
    expect(hp).toBeGreaterThan(0);
  });

  test('ヒトはほぼ均等配分（最大-最小の差が小さい）', () => {
    const bonus = rebirthStatBonusForRace('race_human');
    const values = Object.values(bonus).filter((v): v is number => v !== undefined);
    const max = Math.max(...values);
    const min = Math.min(...values);
    // ヒト（バランス型）は最大-最小が他種族より小さい
    expect(max - min).toBeLessThan(20);
  });

  test('8ステ合計はおおむね STAT_TOTAL（235〜245）', () => {
    for (const raceId of ['race_human', 'race_garon', 'race_golan']) {
      const bonus = rebirthStatBonusForRace(raceId);
      const total = Object.values(bonus).reduce((s, v) => s + (v ?? 0), 0);
      expect(total).toBeGreaterThanOrEqual(235);
      expect(total).toBeLessThanOrEqual(245);
    }
  });
});

describe('canReincarnate', () => {
  test('Lv99 → false', () => {
    const c = warrior({ level: 99 });
    expect(canReincarnate(c)).toBe(false);
  });

  test('Lv100 → true', () => {
    const c = warrior({ level: 100 });
    expect(canReincarnate(c)).toBe(true);
  });
});

describe('reincarnate', () => {
  test('Lv100未満では転生できない', () => {
    const c = warrior({ level: 99 });
    expect(canReincarnate(c)).toBe(false);
    expect(reincarnate(c, { raceId: 'race_pix', classId: 'class_mage', name: 'B' })).toBe(c);
  });

  test('Lv100 ガロンで転生: level=1, exp=0, id維持, rebirthBonus正常', () => {
    const c = warrior({ level: 100 });
    const r = reincarnate(c, { raceId: 'race_garon', classId: 'class_warrior', name: 'G' });
    expect(r.id).toBe(c.id);
    expect(r.level).toBe(1);
    expect(r.exp).toBe(0);
    expect(r.rebirthBonus?.count).toBe(1);
    expect(r.rebirthBonus?.bonusSp).toBe(REBIRTH.BONUS_SP); // = 10
  });

  test('Lv100 ガロンで転生: STR が全ステ中で最大', () => {
    const c = warrior({ level: 100 });
    const r = reincarnate(c, { raceId: 'race_garon', classId: 'class_warrior', name: 'G' });
    const stats = r.rebirthBonus?.stats ?? {};
    const values = Object.values(stats).filter((v): v is number => v !== undefined);
    const str = stats.str ?? 0;
    expect(str).toBe(Math.max(...values));
  });

  test('Lv100 ガロンで転生: 8ステ合計が 235〜245', () => {
    const c = warrior({ level: 100 });
    const r = reincarnate(c, { raceId: 'race_garon', classId: 'class_warrior', name: 'G' });
    const stats = r.rebirthBonus?.stats ?? {};
    const total = Object.values(stats).reduce((s, v) => s + (v ?? 0), 0);
    expect(total).toBeGreaterThanOrEqual(235);
    expect(total).toBeLessThanOrEqual(245);
  });

  test('Lv100 ガロンで転生: skillPoints.total === spTotalForLevel(1) + BONUS_SP (=10)', () => {
    const c = warrior({ level: 100 });
    const r = reincarnate(c, { raceId: 'race_garon', classId: 'class_warrior', name: 'G' });
    expect(r.skillPoints.total).toBe(spTotalForLevel(1) + REBIRTH.BONUS_SP);
  });

  test('累積: 2回転生すると count=2, bonusSp=20, ステが両方ぶん増えている', () => {
    // 1回目: ガロン
    const c = warrior({ level: 100 });
    const r1 = reincarnate(c, { raceId: 'race_garon', classId: 'class_warrior', name: 'G' });
    expect(r1.rebirthBonus?.count).toBe(1);
    expect(r1.rebirthBonus?.bonusSp).toBe(10);
    const statsAfter1 = r1.rebirthBonus?.stats ?? {};

    // 2回目: ドーム（Lv100 まで上げた前提）
    const r1at100 = { ...r1, level: 100 };
    const r2 = reincarnate(r1at100, { raceId: 'race_golan', classId: 'class_guardian', name: 'D' });
    expect(r2.rebirthBonus?.count).toBe(2);
    expect(r2.rebirthBonus?.bonusSp).toBe(20);

    // 累積: 1回目ガロン由来の str と 2回目ドーム由来の vit が両方 1回ぶんより増えている
    const statsAfter2 = r2.rebirthBonus?.stats ?? {};
    expect(statsAfter2.str ?? 0).toBeGreaterThan(statsAfter1.str ?? 0);
    expect(statsAfter2.vit ?? 0).toBeGreaterThan(statsAfter1.vit ?? 0);
  });
});

describe('reincarnateInSave', () => {
  test('装備は失わず倉庫へ戻してから作り直す', () => {
    let save: SaveData = createInitialSaveData('g');
    const c = createCharacter({ raceId: 'race_human', classId: 'class_warrior', name: 'A' });
    save = addCharacterToGuild(save, { ...c, level: 100 });
    save = addEquipment(save, 'equip_iron_armor');
    save = equipItem(save, c.id, save.guild.equipment[0].id);

    save = reincarnateInSave(save, c.id, { raceId: 'race_pix', classId: 'class_mage', name: 'B' });
    const m = save.guild.members[0];
    expect(m.id).toBe(c.id);
    expect(m.classId).toBe('class_mage');
    expect(m.equipment.armor).toBeNull();
    // プールへ返却
    expect(save.guild.equipment.some((e) => e.masterId === 'equip_iron_armor')).toBe(true);
    // 新形式の rebirthBonus
    expect(m.rebirthBonus?.count).toBe(1);
    expect(m.rebirthBonus?.bonusSp).toBe(REBIRTH.BONUS_SP);
    expect(m.rebirthBonus?.stats).toBeDefined();
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
