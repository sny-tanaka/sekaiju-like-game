import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import styles from './style.module.scss';

import { SlotCard } from '@/components/common/SlotCard/SlotCard';
import type { SlotMeta } from '@/domain/types';
import { useGameState } from '@/store/gameState';
import { deleteSlot, listSlots, SLOT_COUNT } from '@/store/saveStore';

// タイトル / スロット選択（[07 §1・§6]）。
export const Page = () => {
  const navigate = useNavigate();
  const { startNewGame, continueGame } = useGameState();
  const [slots, setSlots] = useState<(SlotMeta | null)[]>(Array(SLOT_COUNT).fill(null));
  const [loading, setLoading] = useState(true);
  // 新規作成中のスロット（ギルド名入力フォームを出す対象）
  const [creatingSlot, setCreatingSlot] = useState<number | null>(null);
  const [guildName, setGuildName] = useState('');
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setSlots(await listSlots());
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const handleContinue = useCallback(
    async (slot: number) => {
      setBusy(true);
      const result = await continueGame(slot);
      setBusy(false);
      if (result.ok) {
        navigate('/town');
      }
    },
    [continueGame, navigate]
  );

  const handleDelete = useCallback(
    async (slot: number) => {
      await deleteSlot(slot);
      await refresh();
    },
    [refresh]
  );

  const beginCreate = useCallback((slot: number) => {
    setCreatingSlot(slot);
    setGuildName('');
  }, []);

  const confirmCreate = useCallback(async () => {
    if (creatingSlot === null) return;
    const name = guildName.trim() || 'ななしのギルド';
    setBusy(true);
    await startNewGame(creatingSlot, name);
    setBusy(false);
    navigate('/town');
  }, [creatingSlot, guildName, startNewGame, navigate]);

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <h1 className={styles.title}>世界樹ライク</h1>
        <p className={styles.subtitle}>無限タワー探索 RPG</p>
      </header>

      {creatingSlot !== null ? (
        <div className={styles.dialog}>
          <h2 className={styles.dialogTitle}>新しいギルド</h2>
          <label className={styles.field}>
            <span>ギルド名</span>
            <input
              type="text"
              value={guildName}
              maxLength={16}
              placeholder="ななしのギルド"
              onChange={(e) => setGuildName(e.target.value)}
              autoFocus
            />
          </label>
          <p className={styles.note}>
            既定職業の冒険者4人で開始します（あとからギルドで作り直せます）。
          </p>
          <div className={styles.dialogActions}>
            <button
              type="button"
              className={styles.primary}
              disabled={busy}
              onClick={confirmCreate}
            >
              はじめる
            </button>
            <button
              type="button"
              className={styles.sub}
              disabled={busy}
              onClick={() => setCreatingSlot(null)}
            >
              もどる
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.slots}>
          {loading ? (
            <p className={styles.loading}>読み込み中...</p>
          ) : (
            slots.map((meta, i) => (
              <SlotCard
                key={i}
                slotIndex={i}
                meta={meta}
                onContinue={() => void handleContinue(i)}
                onNewGame={() => beginCreate(i)}
                onDelete={() => void handleDelete(i)}
              />
            ))
          )}
        </div>
      )}

      <footer className={styles.foot}>v{__APP_VERSION__}</footer>
    </div>
  );
};
