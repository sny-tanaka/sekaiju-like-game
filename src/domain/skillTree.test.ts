import { createCharacter } from '@/domain/saveData';
import {
  availableSP,
  canLearnSkill,
  learnSkill,
  skillLevel,
  skillSpCost,
} from '@/domain/skillTree';
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

  test('SP を消費して新スキルを習得できる（深さ別コスト。魔導士は開始時 fire Lv1 で ice 解放）', () => {
    // fire_bolt は T1（深さ0=2SP）、ice_bolt は深さ1=2SP。
    let c = mage(10);
    expect(skillLevel(c, 'skill_fire_bolt')).toBe(1);
    c = learnSkill(c, 'skill_fire_bolt'); // +2SP
    expect(skillLevel(c, 'skill_fire_bolt')).toBe(2);
    expect(availableSP(c)).toBe(8);
    // ice_bolt（前提 fire Lv1）を新規習得 +2SP
    c = learnSkill(c, 'skill_ice_bolt');
    expect(skillLevel(c, 'skill_ice_bolt')).toBe(1);
    expect(availableSP(c)).toBe(6);
  });

  test('深いスキルほど消費 SP が高い（前提チェーンの段数でコスト逓増）', () => {
    const c = mage(99);
    expect(skillSpCost(c, 'skill_fire_bolt')).toBe(2); // 深さ0
    expect(skillSpCost(c, 'skill_fire_storm')).toBe(2); // 深さ1（fire Lv3 前提）
    expect(skillSpCost(c, 'skill_mage_meteor')).toBe(4); // 深さ2（fire_storm 前提）
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
