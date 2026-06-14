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

  test('deriveSaveMeta はギルド名・到達階・団員数・セーブ時刻を抽出する', () => {
    const save = makeSave('わがギルド');
    const meta = deriveSaveMeta(save);
    expect(meta.guildName).toBe('わがギルド');
    expect(meta.deepestReached).toBe(7);
    expect(meta.memberCount).toBe(0);
    expect(meta.savedAt).toBe(1234);
    expect(meta.corrupted).toBeUndefined();
  });
});
