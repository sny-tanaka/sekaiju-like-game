import { deriveHiddenEffects, statModMagnitude } from '@/domain/equipmentHiddenEffects';
import type { EquipmentMaster } from '@/domain/types';

// ============================================================================
// 隠し能力の導出（[04 §3-4]）。装備マスタの手打ちに頼らず、種別キー（weaponType/
// armorType/'accessory'）から式で自動導出できることを検証する。
// ============================================================================

function weaponMaster(overrides: Partial<EquipmentMaster> = {}): EquipmentMaster {
  return {
    id: 'test_weapon',
    name: 'テスト武器',
    slot: 'weapon',
    tier: 0,
    buyPrice: 0,
    weaponType: 'sword',
    bonuses: {},
    ...overrides,
  };
}

function armorMaster(overrides: Partial<EquipmentMaster> = {}): EquipmentMaster {
  return {
    id: 'test_armor',
    name: 'テスト防具',
    slot: 'armor',
    tier: 0,
    buyPrice: 0,
    armorType: 'heavy',
    bonuses: {},
    ...overrides,
  };
}

function accessoryMaster(overrides: Partial<EquipmentMaster> = {}): EquipmentMaster {
  return {
    id: 'test_accessory',
    name: 'テスト装飾品',
    slot: 'accessory',
    tier: 0,
    buyPrice: 0,
    bonuses: {},
    ...overrides,
  };
}

describe('equipmentHiddenEffects: statModMagnitude', () => {
  test('T0〜T5 の各ティア値', () => {
    expect(statModMagnitude(0)).toBe(3);
    expect(statModMagnitude(1)).toBe(5);
    expect(statModMagnitude(2)).toBe(7);
    expect(statModMagnitude(3)).toBe(10);
    expect(statModMagnitude(4)).toBe(15);
    expect(statModMagnitude(5)).toBe(23);
  });
});

describe('equipmentHiddenEffects: deriveHiddenEffects — 武器', () => {
  test('武器種ごとに対応するステータス1種の statMod を返す', () => {
    expect(deriveHiddenEffects(weaponMaster({ weaponType: 'sword', tier: 0 }))).toEqual([
      { kind: 'statMod', stat: 'agi', value: 3 },
    ]);
    expect(deriveHiddenEffects(weaponMaster({ weaponType: 'spear', tier: 0 }))).toEqual([
      { kind: 'statMod', stat: 'str', value: 3 },
    ]);
    expect(deriveHiddenEffects(weaponMaster({ weaponType: 'axe', tier: 0 }))).toEqual([
      { kind: 'statMod', stat: 'str', value: 3 },
    ]);
    expect(deriveHiddenEffects(weaponMaster({ weaponType: 'bow', tier: 0 }))).toEqual([
      { kind: 'statMod', stat: 'agi', value: 3 },
    ]);
    expect(deriveHiddenEffects(weaponMaster({ weaponType: 'staff', tier: 0 }))).toEqual([
      { kind: 'statMod', stat: 'int', value: 3 },
    ]);
    expect(deriveHiddenEffects(weaponMaster({ weaponType: 'fist', tier: 0 }))).toEqual([
      { kind: 'statMod', stat: 'luc', value: 3 },
    ]);
  });

  test('ティアが上がると statMod の数値が statModMagnitude(tier) に伸びる', () => {
    expect(deriveHiddenEffects(weaponMaster({ weaponType: 'spear', tier: 3 }))).toEqual([
      { kind: 'statMod', stat: 'str', value: statModMagnitude(3) },
    ]);
  });
});

describe('equipmentHiddenEffects: deriveHiddenEffects — 防具', () => {
  test('重装は壊属性を15%軽減（rate 0.85）', () => {
    expect(deriveHiddenEffects(armorMaster({ armorType: 'heavy' }))).toEqual([
      { kind: 'elementResist', element: 'bash', rate: 0.85 },
    ]);
  });

  test('軽装は斬属性を15%軽減（rate 0.85）', () => {
    expect(deriveHiddenEffects(armorMaster({ armorType: 'light' }))).toEqual([
      { kind: 'elementResist', element: 'slash', rate: 0.85 },
    ]);
  });

  test('衣は魔法3属性（火/氷/雷）を10%軽減（rate 0.9）', () => {
    expect(deriveHiddenEffects(armorMaster({ armorType: 'clothes' }))).toEqual([
      { kind: 'elementResist', element: 'fire', rate: 0.9 },
      { kind: 'elementResist', element: 'ice', rate: 0.9 },
      { kind: 'elementResist', element: 'volt', rate: 0.9 },
    ]);
  });
});

describe('equipmentHiddenEffects: deriveHiddenEffects — アクセサリ', () => {
  test('状態異常全種を15%軽減（rate 0.85）', () => {
    const effects = deriveHiddenEffects(accessoryMaster());
    expect(effects).toHaveLength(10);
    expect(effects.every((e) => e.kind === 'ailmentResist' && e.rate === 0.85)).toBe(true);
    expect(effects.map((e) => (e.kind === 'ailmentResist' ? e.ailment : null))).toEqual([
      'poison',
      'paralysis',
      'sleep',
      'confusion',
      'curse',
      'blind',
      'instantDeath',
      'headBind',
      'armBind',
      'legBind',
    ]);
  });
});

describe('equipmentHiddenEffects: deriveHiddenEffects — 対応種別が無い場合', () => {
  test('weaponType/armorType が無い武器/防具は空配列', () => {
    expect(deriveHiddenEffects(weaponMaster({ weaponType: undefined }))).toEqual([]);
    expect(deriveHiddenEffects(armorMaster({ armorType: undefined }))).toEqual([]);
  });
});
