import { CURRENT_SCHEMA_VERSION, createInitialSaveData } from '@/domain/saveData';
import { deriveSaveMeta, deserializeSave, serializeSave } from '@/store/saveSerialization';

function makeSave(name = 'ギルド') {
  const save = createInitialSaveData(name);
  save.savedAt = 1234;
  save.towerState.record.deepestReached = 7;
  return save;
}

describe('saveSerialization', () => {
  test('serialize → deserialize で内容が round-trip する', () => {
    const save = makeSave();
    const result = deserializeSave(serializeSave(save));
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toEqual(save);
    }
  });

  test('serializeSave は元データを共有しない（ディープコピー）', () => {
    const save = makeSave();
    const copy = serializeSave(save);
    copy.guild.name = '変更後';
    expect(save.guild.name).not.toBe('変更後');
  });

  test('構造が不正なデータは破損として扱う', () => {
    expect(deserializeSave(null).ok).toBe(false);
    expect(deserializeSave({}).ok).toBe(false);
    expect(deserializeSave({ schemaVersion: 'x' }).ok).toBe(false);
    expect(deserializeSave({ schemaVersion: 1, guild: {} }).ok).toBe(false);
    // masterSeed 欠落も破損
    expect(deserializeSave({ schemaVersion: 1, guild: { name: 'a', members: [] } }).ok).toBe(false);
  });

  test('未知の未来バージョンは破損扱い（上書き防止）', () => {
    const save = makeSave();
    const future = { ...serializeSave(save), schemaVersion: CURRENT_SCHEMA_VERSION + 99 };
    expect(deserializeSave(future).ok).toBe(false);
  });

  test('v1→v2 migration: 装備の itemId 文字列が EquipInstance 個体へ変換される', () => {
    // 旧 v1 形式（装備=itemId 文字列・guild.equipment / foodStorage 無し）を手作り
    const v1 = {
      ...serializeSave(makeSave()),
      schemaVersion: 1,
    } as Record<string, unknown>;
    const guild = v1.guild as Record<string, unknown>;
    delete guild.equipment;
    delete guild.foodStorage;
    guild.members = [
      {
        id: 'c1',
        name: 'A',
        raceId: 'race_human',
        classId: 'class_warrior',
        titleId: null,
        level: 1,
        exp: 0,
        skillPoints: { total: 0, spent: 0 },
        learnedSkills: {},
        equipment: { weapon: 'equip_short_sword', armor: null, accessory: null },
      },
    ];
    delete (v1 as Record<string, unknown>).unlockedRecipeIds;

    const result = deserializeSave(v1);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.schemaVersion).toBe(CURRENT_SCHEMA_VERSION);
      expect(Array.isArray(result.data.guild.equipment)).toBe(true);
      const w = result.data.guild.members[0].equipment.weapon;
      expect(w).not.toBeNull();
      expect(w?.masterId).toBe('equip_short_sword');
      expect(w?.forgeLevel).toBe(0);
      expect(result.data.guild.members[0].equipment.armor).toBeNull();
    }
  });

  test('deriveSaveMeta はギルド名・到達階・団員数・セーブ時刻を抽出する', () => {
    const save = makeSave('わがギルド');
    const meta = deriveSaveMeta(save);
    expect(meta.guildName).toBe('わがギルド');
    expect(meta.deepestReached).toBe(7);
    expect(meta.memberCount).toBe(0);
    expect(meta.savedAt).toBe(1234);
    expect(meta.corrupted).toBeUndefined();
  });

  test('v4→v5 migration: 既存メンバーに subClassId: null が補完される', () => {
    // v4 形式のセーブを手作り（subClassId フィールドなし）
    const v4 = {
      ...serializeSave(makeSave()),
      schemaVersion: 4,
    } as Record<string, unknown>;
    const guild = v4.guild as Record<string, unknown>;
    guild.members = [
      {
        id: 'c1',
        name: 'A',
        raceId: 'race_human',
        classId: 'class_warrior',
        titleId: null,
        // subClassId は v4 には存在しない
        level: 1,
        exp: 0,
        skillPoints: { total: 0, spent: 0 },
        learnedSkills: {},
        equipment: { weapon: null, armor: null, accessory: null },
        strategy: 'batchiri',
      },
    ];

    const result = deserializeSave(v4);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.schemaVersion).toBe(CURRENT_SCHEMA_VERSION);
      expect(result.data.guild.members[0].subClassId).toBeNull();
    }
  });

  test('v4→v5 migration の冪等性: 既に subClassId フィールドがある場合は上書きしない', () => {
    // 既に subClassId が設定済みのデータを v4 バージョンで送り込む
    const v4 = {
      ...serializeSave(makeSave()),
      schemaVersion: 4,
    } as Record<string, unknown>;
    const guild = v4.guild as Record<string, unknown>;
    guild.members = [
      {
        id: 'c1',
        name: 'A',
        raceId: 'race_human',
        classId: 'class_warrior',
        titleId: null,
        subClassId: 'class_medic', // 既に設定済み（冪等性テスト）
        level: 1,
        exp: 0,
        skillPoints: { total: 0, spent: 0 },
        learnedSkills: {},
        equipment: { weapon: null, armor: null, accessory: null },
        strategy: 'batchiri',
      },
    ];

    const result = deserializeSave(v4);
    expect(result.ok).toBe(true);
    if (result.ok) {
      // 既に subClassId がある場合は上書きしない（'class_medic' のまま）
      expect(result.data.guild.members[0].subClassId).toBe('class_medic');
    }
  });
});
