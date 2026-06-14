import { startDive } from '@/domain/dive';
import { addItem } from '@/domain/inventory';
import { useFieldItem } from '@/domain/itemUse';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
import type { SaveData } from '@/domain/types';

function diveSave(): { save: SaveData; charId: string } {
  let save = createInitialSaveData('g');
  const c = createCharacter({ raceId: 'race_human', classId: 'class_warrior', name: 'A' });
  save = addCharacterToGuild(save, c);
  save = startDive(save, 1);
  return { save, charId: c.id };
}

describe('useFieldItem', () => {
  test('やくそうで HP 回復し、1個消費する', () => {
    const _d = diveSave();
    const charId = _d.charId;
    let save = _d.save;
    save = addItem(save, 'item_potion', 2);
    // HP を減らす
    save = {
      ...save,
      diveState: {
        ...save.diveState!,
        party: save.diveState!.party.map((p) => (p.charId === charId ? { ...p, hp: 1 } : p)),
      },
    };
    const res = useFieldItem(save, 'item_potion', charId);
    expect(res.ok).toBe(true);
    const member = res.save.diveState!.party.find((p) => p.charId === charId)!;
    expect(member.hp).toBeGreaterThan(1);
    expect(res.save.guild.storage.find((s) => s.itemId === 'item_potion')?.qty).toBe(1);
  });

  test('HP は最大値を超えない', () => {
    const _d = diveSave();
    const charId = _d.charId;
    let save = _d.save;
    save = addItem(save, 'item_potion', 1);
    const res = useFieldItem(save, 'item_potion', charId); // 満タンで使用
    const member = res.save.diveState!.party.find((p) => p.charId === charId)!;
    expect(member.hp).toBe(save.diveState!.party.find((p) => p.charId === charId)!.hp);
  });

  test('帰還の糸で拠点へ戻る（diveState=null）', () => {
    let { save } = diveSave();
    save = addItem(save, 'item_return_thread', 1);
    const res = useFieldItem(save, 'item_return_thread');
    expect(res.ok).toBe(true);
    expect(res.save.diveState).toBeNull();
  });

  test('所持していないアイテムは使えない', () => {
    const { save, charId } = diveSave();
    const res = useFieldItem(save, 'item_potion', charId);
    expect(res.ok).toBe(false);
    expect(res.save).toBe(save);
  });
});
