import { benchedMembers, formationCount, isInFormation, setSlot } from '@/domain/formation';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
import type { SaveData } from '@/domain/types';

function guildOf(n: number): { save: SaveData; ids: string[] } {
  let save = createInitialSaveData('g');
  const ids: string[] = [];
  for (let i = 0; i < n; i++) {
    const c = createCharacter({ raceId: 'race_human', classId: 'class_warrior', name: `c${i}` });
    ids.push(c.id);
    save = addCharacterToGuild(save, c);
  }
  return { save, ids };
}

describe('formation', () => {
  test('addCharacterToGuild は前衛から自動配置（既存挙動）', () => {
    const { save, ids } = guildOf(2);
    expect(save.guild.party.front[0]).toBe(ids[0]);
    expect(formationCount(save)).toBe(2);
  });

  test('setSlot で後衛へ移すと前衛から外れる（重複しない）', () => {
    const _g = guildOf(1);
    const ids = _g.ids;
    let save = _g.save;
    save = setSlot(save, 'back', 0, ids[0]);
    expect(save.guild.party.back[0]).toBe(ids[0]);
    expect(save.guild.party.front.includes(ids[0])).toBe(false);
    expect(formationCount(save)).toBe(1);
  });

  test('setSlot(null) でスロットを空にすると控えになる', () => {
    const _g = guildOf(1);
    const ids = _g.ids;
    let save = _g.save;
    save = setSlot(save, 'front', 0, null);
    expect(isInFormation(save, ids[0])).toBe(false);
    expect(benchedMembers(save).map((m) => m.id)).toContain(ids[0]);
  });

  test('非メンバー・範囲外は無視', () => {
    const { save } = guildOf(1);
    expect(setSlot(save, 'front', 0, 'nope')).toBe(save);
    expect(setSlot(save, 'back', 9, save.guild.members[0].id)).toBe(save);
  });
});
