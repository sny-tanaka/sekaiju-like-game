import { setSubClass } from '@/domain/charProgress';
import { createCharacter } from '@/domain/saveData';
import {
  availableSP,
  canLearnSkill,
  learnSkill,
  skillDepth,
  skillLevel,
  skillNodesFor,
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
    // fire_bolt は T1（深さ0=1SP）、ice_bolt は深さ1=2SP。
    let c = mage(10);
    expect(skillLevel(c, 'skill_fire_bolt')).toBe(1);
    c = learnSkill(c, 'skill_fire_bolt'); // +1SP
    expect(skillLevel(c, 'skill_fire_bolt')).toBe(2);
    expect(availableSP(c)).toBe(9);
    // ice_bolt（前提 fire Lv1）を新規習得 +2SP
    c = learnSkill(c, 'skill_ice_bolt');
    expect(skillLevel(c, 'skill_ice_bolt')).toBe(1);
    expect(availableSP(c)).toBe(7);
  });

  test('前提のあるスキルは基本(T1)より消費 SP が高い（基本1・以降2）', () => {
    const c = mage(99);
    expect(skillSpCost(c, 'skill_fire_bolt')).toBe(1); // 深さ0（基本）
    expect(skillSpCost(c, 'skill_fire_storm')).toBe(2); // 深さ1（fire Lv3 前提）
    expect(skillSpCost(c, 'skill_mage_meteor')).toBe(2); // 深さ2（fire_storm 前提）
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

describe('skillNodesFor (副業ツリー合成)', () => {
  function warrior(sp = 20): Character {
    const c = createCharacter({ raceId: 'race_human', classId: 'class_warrior', name: 'W' });
    return { ...c, skillPoints: { total: sp, spent: 0 } };
  }

  test('副業なしのとき副業スキルはノードに含まれない', () => {
    const c = warrior();
    const nodes = skillNodesFor(c);
    const hasWarDance = nodes.some((n) => n.skillId === 'skill_war_dance');
    expect(hasWarDance).toBe(false);
  });

  test('副業設定後は副業ツリーのスキルが skillNodesFor に含まれる', () => {
    const c = setSubClass(warrior(), 'class_dancer');
    const nodes = skillNodesFor(c);
    const hasWarDance = nodes.some((n) => n.skillId === 'skill_war_dance');
    expect(hasWarDance).toBe(true);
  });

  test('副業ツリーのみのスキルが canLearnSkill で習得可能になる', () => {
    // warrior 単体では skill_war_dance は習得不可
    const c = warrior(20);
    expect(canLearnSkill(c, 'skill_war_dance')).toBe(false);
    // dancer を副業に設定すると習得可能になる
    const withDancer = setSubClass(c, 'class_dancer');
    expect(canLearnSkill(withDancer, 'skill_war_dance')).toBe(true);
  });

  test('共有スキル（本業+副業の両方に存在）があっても skillDepth が破綻しない', () => {
    // medic（本業）+ dancer（副業）: skill_heal は medic にのみ存在するが、
    // fire_bolt 等の共有スキルがある組み合わせでも depth が NaN や Infinity にならないことを確認
    // warrior + dancer は共有スキルなしだが、nodes 内に重複エントリがある場合の念押し
    const medic = createCharacter({ raceId: 'race_human', classId: 'class_medic', name: 'M' });
    const withDancer = setSubClass(medic, 'class_dancer');
    const nodes = skillNodesFor(withDancer);
    // skill_heal の depth を計算 → 有限数であること
    const healDepth = skillDepth(nodes, 'skill_heal');
    expect(Number.isFinite(healDepth)).toBe(true);
    expect(healDepth).toBeGreaterThanOrEqual(0);
  });
});
