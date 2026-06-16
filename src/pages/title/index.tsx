import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import styles from './style.module.scss';

import { useSfx } from '@/audio/useSfx';
import { SaveCard } from '@/components/common/SaveCard/SaveCard';
import { SoundSettings } from '@/components/common/SoundSettings';
import type { SaveMeta } from '@/domain/types';
import { useGameState } from '@/store/gameState';
import { getSaveMeta } from '@/store/saveStore';

type Mode = 'menu' | 'confirm' | 'guildName';

// タイトル（[07 §1・§6]）。セーブは1つ。
// 「つづきから」で読込、「最初から」は確認ダイアログを挟んでから新規作成。
export const Page = () => {
  const navigate = useNavigate();
  const { startNewGame, continueGame } = useGameState();
  const play = useSfx();
  const [meta, setMeta] = useState<SaveMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>('menu');
  const [guildName, setGuildName] = useState('');
  const [busy, setBusy] = useState(false);
  const [soundOpen, setSoundOpen] = useState(false);

  useEffect(() => {
    void (async () => {
      setMeta(await getSaveMeta());
      setLoading(false);
    })();
  }, []);

  const hasValidSave = meta !== null && !meta.corrupted;

  const handleContinue = useCallback(async () => {
    play('decide');
    setBusy(true);
    const result = await continueGame();
    setBusy(false);
    if (result.ok) navigate('/town');
  }, [continueGame, navigate, play]);

  // 「最初から」: 有効なセーブがあるなら確認、無ければそのままギルド名入力へ
  const handleNewGameStart = useCallback(() => {
    play('decide');
    setGuildName('');
    setMode(hasValidSave ? 'confirm' : 'guildName');
  }, [hasValidSave, play]);

  const confirmCreate = useCallback(async () => {
    play('save');
    const name = guildName.trim() || 'ななしのギルド';
    setBusy(true);
    await startNewGame(name);
    setBusy(false);
    navigate('/town');
  }, [guildName, startNewGame, navigate, play]);

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <h1 className={styles.title}>世界樹ライク</h1>
        <p className={styles.subtitle}>無限タワー探索 RPG</p>
        <button
          type="button"
          className={styles.gearBtn}
          aria-label="サウンド設定"
          onClick={() => {
            play('cursor');
            setSoundOpen(true);
          }}
        >
          ⚙
        </button>
      </header>

      <main className={styles.body}>
        {loading ? (
          <p className={styles.loading}>読み込み中...</p>
        ) : mode === 'guildName' ? (
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
              冒険者はまだいません。開始後、ギルドメニューで仲間を作成してください。
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
                onClick={() => setMode('menu')}
              >
                もどる
              </button>
            </div>
          </div>
        ) : mode === 'confirm' ? (
          <div className={styles.dialog}>
            <h2 className={styles.dialogTitle}>最初から始めますか？</h2>
            <p className={styles.warn}>
              現在のセーブデータ「{meta?.guildName}」は上書きされ、元に戻せません。
            </p>
            <div className={styles.dialogActions}>
              <button
                type="button"
                className={styles.danger}
                disabled={busy}
                onClick={() => setMode('guildName')}
              >
                データを消して始める
              </button>
              <button
                type="button"
                className={styles.sub}
                disabled={busy}
                onClick={() => setMode('menu')}
              >
                もどる
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.menu}>
            {meta !== null && (
              <SaveCard
                meta={meta}
                onContinue={() => void handleContinue()}
              />
            )}
            <button
              type="button"
              className={hasValidSave ? styles.sub : styles.primary}
              onClick={handleNewGameStart}
            >
              最初から
            </button>
          </div>
        )}
      </main>

      <footer className={styles.foot}>v{__APP_VERSION__}</footer>

      {soundOpen ? (
        <div
          className={styles.soundOverlay}
          onClick={() => {
            play('cursor');
            setSoundOpen(false);
          }}
        >
          <div
            className={styles.soundPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <SoundSettings />
            <button
              type="button"
              className={styles.sub}
              onClick={() => {
                play('cursor');
                setSoundOpen(false);
              }}
            >
              とじる
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
