import { deleteDB } from 'idb';

import { createRng } from '@/domain/rng';
import { createInitialSaveData, createStarterParty } from '@/domain/saveData';
import {
  _resetDbForTest,
  deleteSlot,
  listSlots,
  loadFromSlot,
  saveToSlot,
} from '@/store/saveStore';

function makeSave(name = 'ギルド') {
  return createInitialSaveData(name, createStarterParty(createRng(1)));
}

beforeEach(async () => {
  await _resetDbForTest();
  await deleteDB('sekaiju-like-game');
});

describe('saveStore (IndexedDB)', () => {
  test('保存したスロットを読み込める', async () => {
    const save = makeSave('テスト');
    const stamped = await saveToSlot(0, save);
    // savedAt はストア側でスタンプされる
    expect(stamped.savedAt).toBeGreaterThan(0);

    const result = await loadFromSlot(0);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.guild.name).toBe('テスト');
      expect(result.data.savedAt).toBe(stamped.savedAt);
    }
  });

  test('空スロットは empty を返す', async () => {
    const result = await loadFromSlot(1);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe('empty');
  });

  test('削除したスロットは空になる', async () => {
    await saveToSlot(0, makeSave());
    await deleteSlot(0);
    const result = await loadFromSlot(0);
    expect(result.ok).toBe(false);
  });

  test('listSlots は各スロットのメタ（空は null）を返す', async () => {
    await saveToSlot(0, makeSave('ギルドA'));
    await saveToSlot(2, makeSave('ギルドC'));
    const metas = await listSlots();
    expect(metas).toHaveLength(3);
    expect(metas[0]?.guildName).toBe('ギルドA');
    expect(metas[1]).toBeNull();
    expect(metas[2]?.guildName).toBe('ギルドC');
  });

  test('破損データは corrupted フラグ付きで列挙される', async () => {
    await saveToSlot(0, makeSave());
    // 破損データを直接書き込む（schemaVersion を壊す）
    const { openDB } = await import('idb');
    const db = await openDB('sekaiju-like-game', 1);
    await db.put('saves', { schemaVersion: 9999, guild: { name: 'x', members: [] } }, 1);
    db.close();

    const metas = await listSlots();
    expect(metas[1]?.corrupted).toBe(true);
  });
});
