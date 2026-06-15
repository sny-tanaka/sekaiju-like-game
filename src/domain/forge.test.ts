import { FORGE } from '@/data/balance';
import { forgeBonusFor, forgeWithIngot, recycle } from '@/domain/forge';
import { addEquipment } from '@/domain/inventory';
import { createInitialSaveData } from '@/domain/saveData';
import type { SaveData } from '@/domain/types';

function withIngots(save: SaveData, copper = 0, silver = 0, gold = 0): SaveData {
  return { ...save, forgeInventory: { ...save.forgeInventory, ingots: { copper, silver, gold } } };
}

describe('forge: forgeBonusFor', () => {
  test('武器は ATK/MAT、防具は DEF/MDF が強化値×係数で上がる', () => {
    expect(forgeBonusFor('equip_short_sword', 3)).toEqual({
      atk: 3 * FORGE.STAT_PER_LEVEL,
      mat: 3 * FORGE.STAT_PER_LEVEL,
    });
    expect(forgeBonusFor('equip_iron_armor', 2)).toEqual({
      def: 2 * FORGE.STAT_PER_LEVEL,
      mdf: 2 * FORGE.STAT_PER_LEVEL,
    });
    expect(forgeBonusFor('equip_short_sword', 0)).toEqual({});
  });
});

describe('forge: forgeWithIngot', () => {
  test('銅で +1、インゴットを1消費する', () => {
    let save = addEquipment(createInitialSaveData('g'), 'equip_short_sword');
    save = withIngots(save, 1);
    const id = save.guild.equipment[0].id;
    const res = forgeWithIngot(save, id, 'copper');
    expect(res.ok).toBe(true);
    expect(res.save.guild.equipment[0].forgeLevel).toBe(1);
    expect(res.save.forgeInventory.ingots.copper).toBe(0);
  });

  test('金は +5 まで一気に上がり、上限を超えない', () => {
    let save = addEquipment(createInitialSaveData('g'), 'equip_short_sword');
    save = withIngots(save, 0, 0, 1);
    const id = save.guild.equipment[0].id;
    const res = forgeWithIngot(save, id, 'gold');
    expect(res.save.guild.equipment[0].forgeLevel).toBe(FORGE.MAX_LEVEL);
  });

  test('インゴットが無いと強化できない', () => {
    const save = addEquipment(createInitialSaveData('g'), 'equip_short_sword');
    const id = save.guild.equipment[0].id;
    const res = forgeWithIngot(save, id, 'copper');
    expect(res.ok).toBe(false);
    expect(res.reason).toBe('noIngot');
  });

  test('+5 の装備はそれ以上強化できない', () => {
    let save = addEquipment(createInitialSaveData('g'), 'equip_short_sword');
    save = {
      ...save,
      guild: { ...save.guild, equipment: [{ ...save.guild.equipment[0], forgeLevel: 5 }] },
    };
    save = withIngots(save, 5);
    const res = forgeWithIngot(save, save.guild.equipment[0].id, 'copper');
    expect(res.ok).toBe(false);
    expect(res.reason).toBe('maxLevel');
  });
});

describe('forge: recycle', () => {
  test('リサイクルで装備が消え断片が増える', () => {
    const save = addEquipment(createInitialSaveData('g'), 'equip_short_sword');
    const id = save.guild.equipment[0].id;
    const res = recycle(save, id);
    expect(res.ok).toBe(true);
    expect(res.save.guild.equipment).toHaveLength(0);
    expect(res.save.forgeInventory.fragments.common).toBe(FORGE.RECYCLE_FRAGMENTS);
  });

  test('プールに無い個体（装備中など）はリサイクルできない', () => {
    const save = addEquipment(createInitialSaveData('g'), 'equip_short_sword');
    const res = recycle(save, 'eq_not_in_pool');
    expect(res.ok).toBe(false);
    expect(res.reason).toBe('notFound');
    expect(res.save.guild.equipment).toHaveLength(1); // 既存個体は消えない
  });

  test('断片が10たまると銅インゴットへ自動変換される', () => {
    let save = createInitialSaveData('g');
    // 断片を9個持たせておく → 1回リサイクル(+3)で12 → 10消費して copper+1、残り2
    save = {
      ...save,
      forgeInventory: { ...save.forgeInventory, fragments: { common: 9 } },
    };
    save = addEquipment(save, 'equip_short_sword');
    const res = recycle(save, save.guild.equipment[0].id);
    expect(res.save.forgeInventory.ingots.copper).toBe(1);
    expect(res.save.forgeInventory.fragments.common).toBe(9 + FORGE.RECYCLE_FRAGMENTS - 10);
  });
});
