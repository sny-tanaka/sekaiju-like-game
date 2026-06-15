import { BALANCE } from '@/data/balance';
import { createCharacter } from '@/domain/saveData';
import { maxAbsorbableSp, skillNodesFor, skillSpCost, surplusSp } from '@/domain/skillTree';
import { computeBaseStats } from '@/domain/stats';
import type { Character } from '@/domain/types';

// ============================================================================
// §10 SP 余剰 → 全ステ変換のテスト
// ============================================================================

/** 基準の戦士キャラ（余剰ゼロになるべき low SP）。 */
function warrior(sp?: number): Character {
  const c = createCharacter({ raceId: 'race_human', classId: 'class_warrior', name: 'W' });
  if (sp !== undefined) {
    return { ...c, skillPoints: { total: sp, spent: 0 } };
  }
  return c;
}

/** 基準の魔導士キャラ。 */
function mage(sp?: number): Character {
  const c = createCharacter({ raceId: 'race_pix', classId: 'class_mage', name: 'M' });
  if (sp !== undefined) {
    return { ...c, skillPoints: { total: sp, spent: 0 } };
  }
  return c;
}

// ============================================================================
// maxAbsorbableSp
// ============================================================================

describe('maxAbsorbableSp', () => {
  test('値は非負', () => {
    const c = warrior();
    expect(maxAbsorbableSp(c)).toBeGreaterThanOrEqual(0);
  });

  test('maxAbsorbableSp は 全ノードのコスト合計（開始スキル1Lv分除く）と一致する', () => {
    const c = mage(99);
    const nodes = skillNodesFor(c);
    // 職業ツリー先頭が開始スキル（魔導士は skill_fire_bolt）
    const starterSkillId = 'skill_fire_bolt';
    let expected = 0;
    for (const node of nodes) {
      const cost = skillSpCost(c, node.skillId);
      let lvs = node.maxLevel;
      if (node.skillId === starterSkillId) lvs = Math.max(0, lvs - 1);
      expected += cost * lvs;
    }
    expect(maxAbsorbableSp(c)).toBe(expected);
  });

  test('maxAbsorbableSp は称号習得で増加する（称号スキルツリー分）', () => {
    const base = warrior();
    const withTitle: Character = { ...base, titleId: 'title_berserker' };
    const noTitle = maxAbsorbableSp(base);
    const withTitleMax = maxAbsorbableSp(withTitle);
    expect(withTitleMax).toBeGreaterThanOrEqual(noTitle);
  });
});

// ============================================================================
// surplusSp
// ============================================================================

describe('surplusSp', () => {
  test('SP が少ないうちは余剰ゼロ', () => {
    // Lv1 で total=0 → 余剰0
    const c = warrior(0);
    expect(surplusSp(c)).toBe(0);
  });

  test('SP が maxAbsorbableSp 以下なら余剰ゼロ', () => {
    const c = warrior();
    const maxAbsorb = maxAbsorbableSp(c);
    const rich = { ...c, skillPoints: { total: maxAbsorb, spent: 0 } };
    expect(surplusSp(rich)).toBe(0);
  });

  test('SP が maxAbsorbableSp を超えると余剰が出る', () => {
    const c = warrior();
    const maxAbsorb = maxAbsorbableSp(c);
    const excess = 20;
    const rich = { ...c, skillPoints: { total: maxAbsorb + excess, spent: 0 } };
    expect(surplusSp(rich)).toBe(excess);
  });

  test('surplusSp は Math.max(0, total - maxAbsorbable) と等価', () => {
    const c = mage();
    const maxAbsorb = maxAbsorbableSp(c);
    // 不足ケース
    const poor = { ...c, skillPoints: { total: maxAbsorb - 10, spent: 0 } };
    expect(surplusSp(poor)).toBe(0);
    // 余剰ケース
    const rich = { ...c, skillPoints: { total: maxAbsorb + 8, spent: 0 } };
    expect(surplusSp(rich)).toBe(8);
  });
});

// ============================================================================
// §10 全ステ変換: computeBaseStats への注入
// ============================================================================

describe('§10 surplus SP → 全ステ変換', () => {
  test('余剰ゼロのキャラは通常通りのステータス', () => {
    const c = warrior(0);
    const stats = computeBaseStats(c);
    expect(stats.str).toBeGreaterThan(0);
    // 余剰なしなので surplusBonus=0 → 値は surplusSp=0 の計算と一致
    const expectedBonus = Math.floor(surplusSp(c) / BALANCE.SURPLUS_SP_PER_STAT);
    expect(expectedBonus).toBe(0);
  });

  test('余剰 SP 4 ごとに全ステ +1', () => {
    const c = warrior();
    const maxAbsorb = maxAbsorbableSp(c);
    // 余剰ゼロ
    const noExcess = { ...c, skillPoints: { total: maxAbsorb, spent: 0 } };
    // 余剰4（= +1 ボーナス）
    const plus4 = { ...c, skillPoints: { total: maxAbsorb + 4, spent: 0 } };
    // 余剰8（= +2 ボーナス）
    const plus8 = { ...c, skillPoints: { total: maxAbsorb + 8, spent: 0 } };

    const statsBase = computeBaseStats(noExcess);
    const statsPlus1 = computeBaseStats(plus4);
    const statsPlus2 = computeBaseStats(plus8);

    // str は +1 / +2 されるはず
    expect(statsPlus1.str).toBe(statsBase.str + 1);
    expect(statsPlus2.str).toBe(statsBase.str + 2);
    // hp/tp も +1 / +2
    expect(statsPlus1.hp).toBe(statsBase.hp + 1);
    expect(statsPlus2.hp).toBe(statsBase.hp + 2);
    // 全ステに乗る（vit も）
    expect(statsPlus1.vit).toBe(statsBase.vit + 1);
  });

  test('余剰 3 SP（4 未満）はボーナスなし（floor）', () => {
    const c = warrior();
    const maxAbsorb = maxAbsorbableSp(c);
    const plus3 = { ...c, skillPoints: { total: maxAbsorb + 3, spent: 0 } };
    const statsBase = computeBaseStats({ ...c, skillPoints: { total: maxAbsorb, spent: 0 } });
    const statsPlus3 = computeBaseStats(plus3);
    expect(statsPlus3.str).toBe(statsBase.str); // floor(3/4)=0 → ボーナスなし
  });

  test('SURPLUS_SP_PER_STAT は 4', () => {
    expect(BALANCE.SURPLUS_SP_PER_STAT).toBe(4);
  });
});
