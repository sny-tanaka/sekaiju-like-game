import { type DBSchema, type IDBPDatabase, openDB } from 'idb';

import type { SaveData, SlotMeta } from '@/domain/types';
import {
  type LoadResult,
  corruptedSlotMeta,
  deriveSlotMeta,
  deserializeSave,
  serializeSave,
} from '@/store/saveSerialization';

// ============================================================================
// IndexedDB によるセーブ永続化（[05 §4]）。
// 大きめのゲーム状態（セーブデータ・図鑑・全フロアの地図）は IndexedDB に保存する。
// シリアライズ/マイグレーション/破損判定は saveSerialization.ts（純関数）に委譲。
// ============================================================================

const DB_NAME = 'sekaiju-like-game';
const DB_VERSION = 1; // IndexedDB のオブジェクトストア構造のバージョン
const SAVE_STORE = 'saves';

/** セーブ可能なスロット数。 */
export const SLOT_COUNT = 3;

interface GameDB extends DBSchema {
  [SAVE_STORE]: {
    key: number; // slot 番号
    value: SaveData;
  };
}

let dbPromise: Promise<IDBPDatabase<GameDB>> | null = null;

function getDB(): Promise<IDBPDatabase<GameDB>> {
  if (!dbPromise) {
    dbPromise = openDB<GameDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(SAVE_STORE)) {
          db.createObjectStore(SAVE_STORE);
        }
      },
    });
  }
  return dbPromise;
}

/** 指定スロットへセーブする。savedAt はここでスタンプする（[05 §4.1]）。 */
export async function saveToSlot(slot: number, data: SaveData): Promise<SaveData> {
  const stamped: SaveData = { ...data, savedAt: Date.now() };
  const db = await getDB();
  await db.put(SAVE_STORE, serializeSave(stamped), slot);
  return stamped;
}

/** 指定スロットを読み込む。破損・未知バージョンは ok:false を返す（上書きしない）。 */
export async function loadFromSlot(
  slot: number
): Promise<LoadResult | { ok: false; reason: 'empty' }> {
  const db = await getDB();
  const raw = await db.get(SAVE_STORE, slot);
  if (raw === undefined) {
    return { ok: false, reason: 'empty' };
  }
  return deserializeSave(raw);
}

/** 指定スロットを削除する。 */
export async function deleteSlot(slot: number): Promise<void> {
  const db = await getDB();
  await db.delete(SAVE_STORE, slot);
}

/** 全スロットのメタ情報を返す（空スロットは null）。タイトルのスロット一覧用。 */
export async function listSlots(): Promise<(SlotMeta | null)[]> {
  const db = await getDB();
  const metas: (SlotMeta | null)[] = [];
  for (let slot = 0; slot < SLOT_COUNT; slot++) {
    const raw = await db.get(SAVE_STORE, slot);
    if (raw === undefined) {
      metas.push(null);
      continue;
    }
    const result = deserializeSave(raw);
    if (!result.ok) {
      metas.push(corruptedSlotMeta(slot));
      continue;
    }
    // メタ導出で想定外の例外が出ても、一覧全体を巻き添えにせず破損として扱う
    try {
      metas.push(deriveSlotMeta(slot, result.data));
    } catch {
      metas.push(corruptedSlotMeta(slot));
    }
  }
  return metas;
}

/** テスト用: 開いている接続を閉じてキャッシュをリセットする（deleteDB のブロック回避）。 */
export async function _resetDbForTest(): Promise<void> {
  if (dbPromise) {
    const db = await dbPromise;
    db.close();
  }
  dbPromise = null;
}
