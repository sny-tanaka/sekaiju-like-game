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

  // issue #57: 前後衛最大3・合計5人上限テスト
  test('後衛に3人配置できる', () => {
    const { save, ids } = guildOf(3);
    let s = save;
    // addCharacterToGuild が前衛に詰めていくので、全員を後衛に移す
    s = setSlot(s, 'back', 0, ids[0]);
    s = setSlot(s, 'back', 1, ids[1]);
    s = setSlot(s, 'back', 2, ids[2]);
    expect(s.guild.party.back.filter((id) => id !== null)).toHaveLength(3);
    expect(formationCount(s)).toBe(3);
  });

  test('5人まで配置でき、6人目（控え）は追加できない', () => {
    const { save, ids } = guildOf(6);
    let s = save;
    // addCharacterToGuild で先頭5人が自動配置される（前衛3 + 後衛2）
    // 6人目は控えにとどまる
    expect(formationCount(s)).toBe(5);
    expect(isInFormation(s, ids[5])).toBe(false);
    // 手動でも追加を試みると弾かれる
    const before = s;
    s = setSlot(s, 'back', 2, ids[5]);
    expect(s).toBe(before); // 変更されない（参照同一）
  });

  test('既に編成内のキャラの列移動は人数が変わらない', () => {
    const { save, ids } = guildOf(5);
    // 5人全員が編成済み
    expect(formationCount(save)).toBe(5);
    // ids[0] が前衛にいる状態で後衛へ移動（人数変化なし）
    expect(isInFormation(save, ids[0])).toBe(true);
    const moved = setSlot(save, 'back', 2, ids[0]);
    expect(formationCount(moved)).toBe(5);
    expect(moved.guild.party.back[2]).toBe(ids[0]);
    expect(moved.guild.party.front.includes(ids[0])).toBe(false);
  });
});
