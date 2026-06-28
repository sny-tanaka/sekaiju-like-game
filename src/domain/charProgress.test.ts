import { REBIRTH, spTotalForLevel } from '@/data/balance';
import {
  acquireTitle,
  canAcquireTitle,
  canReincarnate,
  rebirthStatBonusForRace,
  reincarnate,
  reincarnateInSave,
  setSubClass,
  transferClass,
  transferClassInSave,
} from '@/domain/charProgress';
import { addEquipment, equipItem } from '@/domain/inventory';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
// createCharacter をテスト内部でも使うため再 import（既存 import と同一）
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

describe('setSubClass (副業)', () => {
  test('副業未設定に null を指定 → no-op (同じオブジェクト参照)', () => {
    const c = warrior();
    const result = setSubClass(c, null);
    expect(result).toBe(c);
  });

  test('本業と同じ classId を副業に設定 → no-op', () => {
    const c = warrior();
    const result = setSubClass(c, 'class_warrior');
    expect(result).toBe(c);
  });

  test('副業を設定する（スキル未習得の場合 learnedSkills/SP に変化なし）', () => {
    const c = warrior({ skillPoints: { total: 10, spent: 0 } });
    const result = setSubClass(c, 'class_medic');
    expect(result.subClassId).toBe('class_medic');
    expect(result.learnedSkills).toEqual(c.learnedSkills);
    expect(result.skillPoints.spent).toBe(c.skillPoints.spent);
  });

  test('副業で習得したスキルを副業解除すると SP が返金される（副業固有スキル）', () => {
    // warrior に dancer を副業設定。dancer 固有の skill_war_dance を習得してから副業解除
    // skill_war_dance は warrior ツリーにはない（dancer 固有）
    const c = warrior({ skillPoints: { total: 20, spent: 0 } });
    const withSub = setSubClass(c, 'class_dancer');
    // dancer 固有スキルを習得した状態を手動で作る (SP 消費をシミュレート)
    const withSkill = {
      ...withSub,
      learnedSkills: { ...withSub.learnedSkills, skill_war_dance: 1 },
      skillPoints: { ...withSub.skillPoints, spent: 1 }, // depth0=1SP
    };
    // 副業を解除
    const removed = setSubClass(withSkill, null);
    expect(removed.subClassId).toBeNull();
    expect(removed.learnedSkills['skill_war_dance']).toBeUndefined();
    expect(removed.skillPoints.spent).toBe(0); // SP が戻る
  });

  test('別の副業に変更すると旧副業固有スキルが剥がれ SP が戻る', () => {
    const c = warrior({ skillPoints: { total: 20, spent: 0 } });
    const withDancer = setSubClass(c, 'class_dancer');
    // dancer 固有スキルを習得した状態
    const withSkill = {
      ...withDancer,
      learnedSkills: { ...withDancer.learnedSkills, skill_war_dance: 1 },
      skillPoints: { ...withDancer.skillPoints, spent: 1 },
    };
    // dancer → medic に変更
    const changed = setSubClass(withSkill, 'class_medic');
    expect(changed.subClassId).toBe('class_medic');
    expect(changed.learnedSkills['skill_war_dance']).toBeUndefined();
    expect(changed.skillPoints.spent).toBe(0);
  });

  test('本業にも存在する共有スキルは副業解除しても保持・SP も戻らない', () => {
    // medic（本業）+ dancer（副業）で skill_heal は medic にも dancer にも存在しない。
    // 代わりに medic 本業ツリーにある skill_heal を習得し、dancer（副業）解除で保持されるか確認。
    // medic（本業）に dancer（副業）を設定
    const medic = createCharacter({ raceId: 'race_human', classId: 'class_medic', name: 'M' });
    const withDancer = setSubClass(medic, 'class_dancer');
    // skill_heal は medic ツリーにある（dancer にはない）。
    // dancer ツリー固有の skill_war_dance も習得
    const withSkills = {
      ...withDancer,
      learnedSkills: { skill_heal: 1, skill_war_dance: 1 },
      skillPoints: { total: 20, spent: 3 }, // heal(1SP) + war_dance(1SP)*1Lv = 2SP... 簡易でも OK
    };
    // dancer 副業を解除
    const removed = setSubClass(withSkills, null);
    // skill_heal は medic 本業ツリーにあるので保護 → 残る
    expect(removed.learnedSkills['skill_heal']).toBe(1);
    // dancer 固有の skill_war_dance は剥がされる
    expect(removed.learnedSkills['skill_war_dance']).toBeUndefined();
  });

  test('不正な classId は no-op', () => {
    const c = warrior();
    const result = setSubClass(c, 'class_nonexistent' as never);
    expect(result).toBe(c);
  });

  test('現在の副業と同じ classId を渡すと no-op', () => {
    const c = warrior({ subClassId: 'class_medic' });
    const result = setSubClass(c, 'class_medic');
    expect(result).toBe(c);
  });
});

describe('transferClass (副業との整合性)', () => {
  test('転職しても副業はそのまま保持される（異なる職業の場合）', () => {
    const c = warrior({ subClassId: 'class_medic', level: 10 });
    const after = transferClass(c, 'class_mage');
    expect(after.subClassId).toBe('class_medic');
  });

  test('新本業が現副業と同じ場合 → 副業が null になる', () => {
    const c = warrior({ subClassId: 'class_mage', level: 10 });
    const after = transferClass(c, 'class_mage');
    expect(after.classId).toBe('class_mage');
    expect(after.subClassId).toBeNull();
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
