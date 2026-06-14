import { deleteDB, openDB } from 'idb';

import { createInitialSaveData } from '@/domain/saveData';
import { _resetDbForTest, deleteGame, getSaveMeta, loadGame, saveGame } from '@/store/saveStore';

beforeEach(async () => {
  await _resetDbForTest();
  await deleteDB('sekaiju-like-game');
});

describe('saveStore (IndexedDB・単一セーブ)', () => {
  test('保存したセーブを読み込める', async () => {
    const stamped = await saveGame(createInitialSaveData('テスト'));
    expect(stamped.savedAt).toBeGreaterThan(0);

    const result = await loadGame();
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.guild.name).toBe('テスト');
      expect(result.data.savedAt).toBe(stamped.savedAt);
    }
  });

  test('セーブが無ければ empty を返す', async () => {
    const result = await loadGame();
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe('empty');
  });

  test('saveGame は常に同じキーを上書きする（セーブは1つ）', async () => {
    await saveGame(createInitialSaveData('一人目'));
    await saveGame(createInitialSaveData('二人目'));
    const result = await loadGame();
    expect(result.ok && result.data.guild.name).toBe('二人目');
  });

  test('削除したセーブは空になる', async () => {
    await saveGame(createInitialSaveData('x'));
    await deleteGame();
    const result = await loadGame();
    expect(result.ok).toBe(false);
  });

  test('getSaveMeta は概況メタを返し、無ければ null', async () => {
    expect(await getSaveMeta()).toBeNull();
    await saveGame(createInitialSaveData('ギルドA'));
    const meta = await getSaveMeta();
    expect(meta?.guildName).toBe('ギルドA');
    expect(meta?.memberCount).toBe(0);
  });

  test('破損データは corrupted メタを返す', async () => {
    const db = await openDB('sekaiju-like-game', 1, {
      upgrade(d) {
        if (!d.objectStoreNames.contains('saves')) d.createObjectStore('saves');
      },
    });
    await db.put('saves', { schemaVersion: 9999, guild: { name: 'x', members: [] } }, 'main');
    db.close();
    await _resetDbForTest();

    const meta = await getSaveMeta();
    expect(meta?.corrupted).toBe(true);
  });
});
