import { type DBSchema, type IDBPDatabase, openDB } from 'idb';

import type { SaveData, SaveMeta } from '@/domain/types';
import {
  type LoadResult,
  corruptedSaveMeta,
  deriveSaveMeta,
  deserializeSave,
  serializeSave,
} from '@/store/saveSerialization';

// ============================================================================
// IndexedDB によるセーブ永続化（[05 §4]）。
// セーブデータは1つ（確定事項）。固定キー1件のみを読み書きする。
// シリアライズ/マイグレーション/破損判定は saveSerialization.ts（純関数）に委譲。
// ============================================================================

const DB_NAME = 'sekaiju-like-game';
const DB_VERSION = 1; // IndexedDB のオブジェクトストア構造のバージョン
const SAVE_STORE = 'saves';
const SAVE_KEY = 'main'; // 単一セーブの固定キー

interface GameDB extends DBSchema {
  [SAVE_STORE]: {
    key: string;
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

/** セーブする。savedAt はここでスタンプする（[05 §4.1]）。 */
export async function saveGame(data: SaveData): Promise<SaveData> {
  const stamped: SaveData = { ...data, savedAt: Date.now() };
  const db = await getDB();
  await db.put(SAVE_STORE, serializeSave(stamped), SAVE_KEY);
  return stamped;
}

/** セーブを読み込む。空・破損・未知バージョンは ok:false を返す（上書きしない）。 */
export async function loadGame(): Promise<LoadResult | { ok: false; reason: 'empty' }> {
  const db = await getDB();
  const raw = await db.get(SAVE_STORE, SAVE_KEY);
  if (raw === undefined) {
    return { ok: false, reason: 'empty' };
  }
  return deserializeSave(raw);
}

/** セーブを削除する。 */
export async function deleteGame(): Promise<void> {
  const db = await getDB();
  await db.delete(SAVE_STORE, SAVE_KEY);
}

/** セーブの概況メタを返す（無ければ null）。タイトル表示用。 */
export async function getSaveMeta(): Promise<SaveMeta | null> {
  const db = await getDB();
  const raw = await db.get(SAVE_STORE, SAVE_KEY);
  if (raw === undefined) return null;
  const result = deserializeSave(raw);
  if (!result.ok) return corruptedSaveMeta();
  // メタ導出で想定外の例外が出ても破損として扱う
  try {
    return deriveSaveMeta(result.data);
  } catch {
    return corruptedSaveMeta();
  }
}

/** テスト用: 開いている接続を閉じてキャッシュをリセットする（deleteDB のブロック回避）。 */
export async function _resetDbForTest(): Promise<void> {
  if (dbPromise) {
    const db = await dbPromise;
    db.close();
  }
  dbPromise = null;
}
