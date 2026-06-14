import { GUILD_MEMBER_LIMIT, STARTING_GOLD } from '@/data/balance';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';

describe('saveData', () => {
  test('createCharacter は Lv1・指定種族/職業のキャラを作る', () => {
    const char = createCharacter({
      raceId: 'race_human',
      classId: 'class_warrior',
      name: 'テスト',
    });
    expect(char.level).toBe(1);
    expect(char.exp).toBe(0);
    expect(char.raceId).toBe('race_human');
    expect(char.classId).toBe('class_warrior');
    expect(char.titleId).toBeNull();
    expect(char.id).toMatch(/^char_/);
  });

  test('createCharacter は未定義の種族/職業で例外', () => {
    expect(() =>
      createCharacter({ raceId: 'race_x', classId: 'class_warrior', name: 'a' })
    ).toThrow();
    expect(() =>
      createCharacter({ raceId: 'race_human', classId: 'class_x', name: 'a' })
    ).toThrow();
  });

  test('createInitialSaveData は団員0人・拠点状態で初期化される', () => {
    const save = createInitialSaveData('テストギルド');
    expect(save.guild.name).toBe('テストギルド');
    expect(save.guild.gold).toBe(STARTING_GOLD);
    expect(save.guild.members).toHaveLength(0);
    expect(save.diveState).toBeNull();
    expect(typeof save.masterSeed).toBe('number');
    expect(save.towerState.record.deepestReached).toBe(0);
    // 編成は全スロット空
    expect([...save.guild.party.front, ...save.guild.party.back].every((s) => s === null)).toBe(
      true
    );
  });

  test('addCharacterToGuild は団員追加と編成への自動配置を行う（純粋）', () => {
    const save = createInitialSaveData('ギルド');
    const char = createCharacter({ raceId: 'race_human', classId: 'class_warrior', name: 'A' });
    const next = addCharacterToGuild(save, char);

    // 元データは不変
    expect(save.guild.members).toHaveLength(0);
    // 新データに反映され、前衛先頭に配置される
    expect(next.guild.members).toHaveLength(1);
    expect(next.guild.party.front[0]).toBe(char.id);
  });

  test('addCharacterToGuild は団員上限を超えない', () => {
    let save = createInitialSaveData('ギルド');
    for (let i = 0; i < GUILD_MEMBER_LIMIT + 3; i++) {
      const c = createCharacter({ raceId: 'race_human', classId: 'class_warrior', name: `c${i}` });
      save = addCharacterToGuild(save, c);
    }
    expect(save.guild.members).toHaveLength(GUILD_MEMBER_LIMIT);
  });
});
