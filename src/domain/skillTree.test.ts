import { createCharacter } from '@/domain/saveData';
import { availableSP, canLearnSkill, learnSkill, skillLevel } from '@/domain/skillTree';
import type { Character } from '@/domain/types';

function mage(sp: number): Character {
  const c = createCharacter({ raceId: 'race_pix', classId: 'class_mage', name: 'M' });
  return { ...c, skillPoints: { total: sp, spent: 0 } };
}

describe('skillTree', () => {
  test('SP が無いと習得できない', () => {
    const c = mage(0);
    expect(canLearnSkill(c, 'skill_fire_bolt')).toBe(false);
  });

  test('SP を消費して新スキルを習得できる（魔導士は開始時 fire Lv1 で ice 解放）', () => {
    let c = mage(3);
    // 開始スキルで fire_bolt Lv1 → さらに強化
    expect(skillLevel(c, 'skill_fire_bolt')).toBe(1);
    c = learnSkill(c, 'skill_fire_bolt');
    expect(skillLevel(c, 'skill_fire_bolt')).toBe(2);
    expect(availableSP(c)).toBe(2);
    // ice_bolt（前提 fire Lv1）を新規習得
    c = learnSkill(c, 'skill_ice_bolt');
    expect(skillLevel(c, 'skill_ice_bolt')).toBe(1);
    expect(availableSP(c)).toBe(1);
  });

  test('前提スキル未習得だと習得できない（ice は fire Lv1 が前提）', () => {
    const c = mage(3);
    // 開始スキルで fire_bolt が Lv1 付与されている場合は前提を満たす。確認のため未習得状態を作る
    const noStarter: Character = { ...c, learnedSkills: {} };
    expect(canLearnSkill(noStarter, 'skill_ice_bolt')).toBe(false);
    const withFire: Character = { ...c, learnedSkills: { skill_fire_bolt: 1 } };
    expect(canLearnSkill(withFire, 'skill_ice_bolt')).toBe(true);
  });

  test('maxLevel を超えて習得できない', () => {
    let c = mage(99);
    // fire_bolt maxLevel=5
    for (let i = 0; i < 5; i++) c = learnSkill(c, 'skill_fire_bolt');
    expect(skillLevel(c, 'skill_fire_bolt')).toBe(5);
    expect(canLearnSkill(c, 'skill_fire_bolt')).toBe(false);
  });

  test('種族のユニオンスキルツリーも習得対象（ピクスは魔光爆裂）', () => {
    const c = mage(3);
    expect(canLearnSkill(c, 'skill_union_nova')).toBe(true);
  });
});
