import type { Decorator } from '@storybook/react';
import { openDB } from 'idb';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import type { SaveData } from '@/domain/types';
import { serializeSave } from '@/store/saveSerialization';

// IndexedDB に直接アクセスして、Title 画面の `getSaveMeta()` が返す状態を
// Storybook 内で固定するための decorator 群。
// title.index.tsx の useEffect で getSaveMeta() が呼ばれるよりも前に IDB を
// セットアップする必要があるため、seed 完了までは children を render しない。
//
// saveStore.ts 内部の dbPromise キャッシュとは別接続で書き込み、書き込み後に
// close する。saveStore 側は次に getSaveMeta() を呼んだ時点で新規接続を開いて
// 書き込み済みの内容を読む。

type Mode = 'with' | 'empty' | 'corrupted';

const DB_NAME = 'sekaiju-like-game';
const DB_VERSION = 1;
const SAVE_STORE = 'saves';
const SAVE_KEY = 'main';

async function withDB<T>(fn: (db: Awaited<ReturnType<typeof openDB>>) => Promise<T>): Promise<T> {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(SAVE_STORE)) db.createObjectStore(SAVE_STORE);
    },
  });
  try {
    return await fn(db);
  } finally {
    db.close();
  }
}

async function seed(mode: Mode, save: SaveData | null): Promise<void> {
  await withDB(async (db) => {
    await db.delete(SAVE_STORE, SAVE_KEY);
    if (mode === 'with' && save) {
      const stamped: SaveData = { ...save, savedAt: Date.now() };
      await db.put(SAVE_STORE, serializeSave(stamped) as unknown as never, SAVE_KEY);
    } else if (mode === 'corrupted') {
      // deserializeSave が ok:false を返す形に意図的に壊す
      await db.put(SAVE_STORE, { schemaVersion: 9999, broken: true } as unknown as never, SAVE_KEY);
    }
  });
}

function withSeeded(mode: Mode, save: SaveData | null): Decorator {
  const Seeder = ({ children }: { children: ReactNode }) => {
    const [ready, setReady] = useState(false);
    useEffect(() => {
      let cancelled = false;
      void (async () => {
        await seed(mode, save);
        if (!cancelled) setReady(true);
      })();
      return () => {
        cancelled = true;
      };
    }, []);
    if (!ready) return null;
    return <>{children}</>;
  };
  Seeder.displayName = 'TitleSaveSeeder';

  function Decorator(Story: Parameters<Decorator>[0]) {
    return (
      <Seeder>
        <Story />
      </Seeder>
    );
  }
  Decorator.displayName = 'TitleSaveSeederDecorator';
  return Decorator;
}

/** WithSave: IDB に有効なセーブを書き込んでから render する。 */
export const seedSaved = (save: SaveData): Decorator => withSeeded('with', save);

/** NoSave: IDB から削除してから render する。 */
export const seedEmpty = (): Decorator => withSeeded('empty', null);

/** Corrupted: IDB に意図的に壊れたペイロードを書き込んでから render する。 */
export const seedCorruptedSave = (): Decorator => withSeeded('corrupted', null);
