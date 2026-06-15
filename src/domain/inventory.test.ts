import {
  FOOD_STORAGE_LIMIT,
  addEquipment,
  addFood,
  addItem,
  canEquip,
  equipItem,
  foodCount,
  foodTotal,
  itemCount,
  removeFood,
  removeItem,
  unequipItem,
} from '@/domain/inventory';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
import type { SaveData } from '@/domain/types';

function saveWith(raceId: string, classId: string): { save: SaveData; charId: string } {
  let save = createInitialSaveData('g');
  const char = createCharacter({ raceId, classId, name: 'A' });
  save = addCharacterToGuild(save, char);
  return { save, charId: char.id };
}

describe('inventory: storage', () => {
  test('addItem / removeItem / itemCount', () => {
    let save = createInitialSaveData('g');
    save = addItem(save, 'item_potion', 3);
    expect(itemCount(save, 'item_potion')).toBe(3);
    save = addItem(save, 'item_potion', 2);
    expect(itemCount(save, 'item_potion')).toBe(5);
    save = removeItem(save, 'item_potion', 4);
    expect(itemCount(save, 'item_potion')).toBe(1);
    // 足りない場合は変更しない
    const before = save;
    save = removeItem(save, 'item_potion', 5);
    expect(save).toBe(before);
    // 0 で stack 消滅
    save = removeItem(before, 'item_potion', 1);
    expect(itemCount(save, 'item_potion')).toBe(0);
  });
});

describe('inventory: food (foodStorage)', () => {
  test('addFood / removeFood / foodCount', () => {
    let save = createInitialSaveData('g');
    save = addFood(save, 'item_food_fish', 3);
    expect(foodCount(save, 'item_food_fish')).toBe(3);
    save = removeFood(save, 'item_food_fish', 1);
    expect(foodCount(save, 'item_food_fish')).toBe(2);
  });

  test('合計60個を超える分は切り捨てられる', () => {
    let save = createInitialSaveData('g');
    save = addFood(save, 'item_food_fish', 50);
    save = addFood(save, 'item_food_meat', 20); // 50+20=70 → 60 まで
    expect(foodTotal(save)).toBe(FOOD_STORAGE_LIMIT);
    expect(foodCount(save, 'item_food_meat')).toBe(10);
  });
});

describe('inventory: equip', () => {
  test('canEquip は職業の装備適性を見る', () => {
    const { save, charId } = saveWith('race_human', 'class_warrior');
    const warrior = save.guild.members.find((m) => m.id === charId)!;
    expect(canEquip(warrior, 'equip_short_sword')).toBe(true); // 戦士は剣可
    expect(canEquip(warrior, 'equip_oak_staff')).toBe(false); // 杖は不可
    expect(canEquip(warrior, 'equip_amulet')).toBe(true); // アクセは職業不問
  });

  test('equipItem は所有プールから装備し、元の装備はプールへ戻る', () => {
    const init = saveWith('race_human', 'class_warrior');
    const charId = init.charId;
    let save = init.save;
    save = addEquipment(save, 'equip_short_sword');
    save = addEquipment(save, 'equip_iron_spear'); // 戦士は槍不可
    const sword = save.guild.equipment.find((e) => e.masterId === 'equip_short_sword')!;
    const spear = save.guild.equipment.find((e) => e.masterId === 'equip_iron_spear')!;
    save = equipItem(save, charId, sword.id);
    let char = save.guild.members.find((m) => m.id === charId)!;
    expect(char.equipment.weapon?.masterId).toBe('equip_short_sword');
    // 装備した個体はプールから消える
    expect(save.guild.equipment.some((e) => e.id === sword.id)).toBe(false);

    // 槍は装備不可 → 変更されない
    const before = save;
    save = equipItem(save, charId, spear.id);
    expect(save).toBe(before);

    // 外すと元の個体がプールへ戻る
    save = unequipItem(save, charId, 'weapon');
    char = save.guild.members.find((m) => m.id === charId)!;
    expect(char.equipment.weapon).toBeNull();
    expect(save.guild.equipment.some((e) => e.id === sword.id)).toBe(true);
  });

  test('プールに無い装備個体は装備できない', () => {
    const { save, charId } = saveWith('race_human', 'class_warrior');
    const after = equipItem(save, charId, 'eq_nonexistent');
    expect(after).toBe(save);
  });
});
