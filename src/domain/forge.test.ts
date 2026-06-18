import { FORGE } from '@/data/balance';
import {
  forgeIncPerLevel,
  forgeBonusFor,
  forgeWithIngot,
  recycle,
  recycleFragments,
  recycleMany,
} from '@/domain/forge';
import { addEquipment } from '@/domain/inventory';
import { createInitialSaveData } from '@/domain/saveData';
import type { SaveData } from '@/domain/types';

function withIngots(save: SaveData, copper = 0, silver = 0, gold = 0): SaveData {
  return { ...save, forgeInventory: { ...save.forgeInventory, ingots: { copper, silver, gold } } };
}

describe('forge: forgeIncPerLevel', () => {
  test('ティア連動の強化1段あたり上昇量: round(STAT_PER_LEVEL * TIER_STEP^tier)', () => {
    // T0: round(2 * 1.6^0) = 2
    expect(forgeIncPerLevel(0)).toBe(2);
    // T1: round(2 * 1.6^1) = round(3.2) = 3
    expect(forgeIncPerLevel(1)).toBe(3);
    // T2: round(2 * 1.6^2) = round(5.12) = 5
    expect(forgeIncPerLevel(2)).toBe(5);
    // T3: round(2 * 1.6^3) = round(8.192) = 8
    expect(forgeIncPerLevel(3)).toBe(8);
    // T4: round(2 * 1.6^4) = round(13.107) = 13
    expect(forgeIncPerLevel(4)).toBe(13);
    // T5: round(2 * 1.6^5) = round(20.972) = 21
    expect(forgeIncPerLevel(5)).toBe(21);
  });
});

describe('forge: forgeBonusFor', () => {
  test('武器は ATK/MAT、防具は DEF/MDF が強化値×ティア連動係数で上がる', () => {
    // equip_short_sword は tier=0: forgeIncPerLevel(0)=2
    expect(forgeBonusFor('equip_short_sword', 3)).toEqual({
      atk: 3 * forgeIncPerLevel(0),
      mat: 3 * forgeIncPerLevel(0),
    });
    // equip_iron_armor は tier=0: forgeIncPerLevel(0)=2
    expect(forgeBonusFor('equip_iron_armor', 2)).toEqual({
      def: 2 * forgeIncPerLevel(0),
      mdf: 2 * forgeIncPerLevel(0),
    });
    expect(forgeBonusFor('equip_short_sword', 0)).toEqual({});
  });

  test('T5装備は forgeIncPerLevel(5)=21 の上昇量', () => {
    // equip_t5_spear は tier=5
    expect(forgeBonusFor('equip_t5_spear', 1)).toEqual({
      atk: forgeIncPerLevel(5),
      mat: forgeIncPerLevel(5),
    });
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

describe('forge: recycleFragments', () => {
  test('buyPrice=120 の装備は max(2, floor(120/120))=max(2,1)=2 断片', () => {
    // equip_short_sword: buyPrice=120 → floor(120/120)=1 → max(2,1)=2
    expect(recycleFragments('equip_short_sword')).toBe(2);
  });

  test('buyPrice=480 の装備は max(2, floor(480/120))=max(2,4)=4 断片', () => {
    // equip_golem_blade: buyPrice=480 → floor(480/120)=4 → max(2,4)=4
    expect(recycleFragments('equip_golem_blade')).toBe(4);
  });

  test('存在しないIDは 2 断片', () => {
    expect(recycleFragments('nonexistent_id')).toBe(2);
  });
});

describe('forge: recycle', () => {
  test('リサイクルで装備が消え断片が増える', () => {
    const save = addEquipment(createInitialSaveData('g'), 'equip_short_sword');
    const id = save.guild.equipment[0].id;
    const res = recycle(save, id);
    expect(res.ok).toBe(true);
    expect(res.save.guild.equipment).toHaveLength(0);
    // equip_short_sword: buyPrice=120 → recycleFragments=2
    expect(res.save.forgeInventory.fragments.common).toBe(recycleFragments('equip_short_sword'));
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
    // equip_golem_blade: buyPrice=480 → recycleFragments=4
    // 断片を9個持たせておく → 1回リサイクル(+4)で13 → 10消費して copper+1、残り3
    save = {
      ...save,
      forgeInventory: { ...save.forgeInventory, fragments: { common: 9 } },
    };
    save = addEquipment(save, 'equip_golem_blade');
    const res = recycle(save, save.guild.equipment[0].id);
    expect(res.save.forgeInventory.ingots.copper).toBe(1);
    expect(res.save.forgeInventory.fragments.common).toBe(
      9 + recycleFragments('equip_golem_blade') - 10
    );
  });
});

describe('forge: recycleMany', () => {
  test('複数の装備を一括分解し、断片を累積する', () => {
    let save = createInitialSaveData('g');
    save = addEquipment(save, 'equip_short_sword'); // 2断片
    save = addEquipment(save, 'equip_short_sword'); // 2断片
    save = addEquipment(save, 'equip_short_sword'); // 2断片
    const ids = save.guild.equipment.map((e) => e.id);
    const res = recycleMany(save, ids);
    expect(res.ok).toBe(true);
    expect(res.save.guild.equipment).toHaveLength(0);
    expect(res.save.forgeInventory.fragments.common).toBe(6);
  });

  test('断片の繰り上げ（10→銅+1）が一括分解でも適用される', () => {
    let save = createInitialSaveData('g');
    // equip_golem_blade: 4 断片 / 3個分解 → 12断片 → 銅1+残2
    save = addEquipment(save, 'equip_golem_blade');
    save = addEquipment(save, 'equip_golem_blade');
    save = addEquipment(save, 'equip_golem_blade');
    const ids = save.guild.equipment.map((e) => e.id);
    const res = recycleMany(save, ids);
    expect(res.save.guild.equipment).toHaveLength(0);
    expect(res.save.forgeInventory.ingots.copper).toBe(1);
    expect(res.save.forgeInventory.fragments.common).toBe(2);
  });

  test('未知の ID はスキップして処理を続行する', () => {
    let save = createInitialSaveData('g');
    save = addEquipment(save, 'equip_short_sword');
    const ids = [save.guild.equipment[0].id, 'eq_unknown'];
    const res = recycleMany(save, ids);
    expect(res.ok).toBe(true);
    expect(res.save.guild.equipment).toHaveLength(0);
    expect(res.save.forgeInventory.fragments.common).toBe(2);
  });

  test('空配列なら何も変わらない', () => {
    let save = createInitialSaveData('g');
    save = addEquipment(save, 'equip_short_sword');
    const before = save.guild.equipment.length;
    const res = recycleMany(save, []);
    expect(res.ok).toBe(true);
    expect(res.save.guild.equipment).toHaveLength(before);
  });
});
