import { useCallback, useEffect, useMemo, useState } from 'react';

import styles from './style.module.scss';

import { useSfx } from '@/audio/useSfx';
import { AppUpdater } from '@/components/AppUpdater/AppUpdater';
import { SaveCard } from '@/components/common/SaveCard/SaveCard';
import { SoundSettings } from '@/components/common/SoundSettings';
import type { Character, SaveMeta } from '@/domain/types';
import { useAppUpdate } from '@/hooks/useAppUpdate';
import { useGameState } from '@/store/gameState';
import { useNavigation } from '@/store/navigation';
import { getSaveMeta } from '@/store/saveStore';

type Mode = 'menu' | 'confirm' | 'guildName';

// タイトル（[07 §1・§6]）。セーブは1つ。
// 「つづきから」で読込、「最初から」は確認ダイアログを挟んでから新規作成。
export const Page = () => {
  const { navigate } = useNavigation();
  const { startNewGame, continueGame, save } = useGameState();
  const play = useSfx();
  const [meta, setMeta] = useState<SaveMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>('menu');
  const [guildName, setGuildName] = useState('');
  const [busy, setBusy] = useState(false);
  const [soundOpen, setSoundOpen] = useState(false);
  const { banner, checkForUpdate, isChecking, applyUpdate } = useAppUpdate();

  useEffect(() => {
    void (async () => {
      setMeta(await getSaveMeta());
      setLoading(false);
    })();
  }, []);

  const hasValidSave = meta !== null && !meta.corrupted;

  // パーティプレビュー（前衛 → 後衛 の順で先頭 5 名）
  const partyPreview = useMemo<Character[]>(() => {
    if (!save) return [];
    const { members, party } = save.guild;
    const ids = [
      ...party.front.filter((id): id is string => id !== null),
      ...party.back.filter((id): id is string => id !== null),
    ];
    return ids
      .map((id) => members.find((m) => m.id === id))
      .filter((m): m is Character => m !== undefined)
      .slice(0, 5);
  }, [save]);

  const handleContinue = useCallback(async () => {
    play('decide');
    setBusy(true);
    const result = await continueGame();
    setBusy(false);
    if (result.ok) navigate({ name: 'town' });
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
    navigate({ name: 'town' });
  }, [guildName, startNewGame, navigate, play]);

  return (
    <div className={styles.layout}>
      {/* 背景の浮遊粒子（装飾のみ、絶対配置可） */}
      <div
        className={styles.moteLayer}
        aria-hidden
      >
        <div className={styles.mote1} />
        <div className={styles.mote2} />
        <div className={styles.mote3} />
        <div className={styles.mote4} />
      </div>

      {mode === 'menu' ? (
        <>
          {/* ヘッダー：章マーク + ⚙ */}
          <header className={styles.head}>
            <p className={styles.chapterMark}>❦ 同見の書</p>
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

          {/* ヒーロー：エンブレム / タイトル / サブタイトル / 引用 */}
          <section className={styles.hero}>
            <div
              className={`${styles.emblem} ${meta?.corrupted ? styles.emblemDim : ''}`}
              aria-hidden
            >
              <span className={styles.emblemRingOuter} />
              <span className={styles.emblemRingInner} />
              <span className={styles.emblemKanji}>樹</span>
            </div>
            <h1 className={styles.title}>世界樹ライク</h1>
            <p className={styles.subtitle}>無限タワー探索 RPG</p>
            <p className={styles.quote}>
              {meta?.corrupted
                ? '「失われた頁は、新しき頁の余白となる。」'
                : hasValidSave
                  ? '「樹は記憶し、塔は試す。\n登りし者の名を、いずれ頂が呼ぶ。」'
                  : '「はじまりの一歩は、いつも誰かの名づけから。」'}
            </p>
          </section>

          {/* メタ：SaveCard / NoSave / Corrupted の 3 状態（flex: 1 で空き吸収） */}
          <section className={styles.meta}>
            {loading ? (
              <div className={styles.placeholderCard}>読み込み中...</div>
            ) : meta?.corrupted ? (
              <SaveCard meta={meta} />
            ) : meta ? (
              <SaveCard
                meta={meta}
                partyPreview={partyPreview}
              />
            ) : (
              <div className={styles.noSaveCard}>
                <p className={styles.noSaveText}>セーブデータはありません</p>
                <p className={styles.noSaveNote}>新しい隊商を結成して塔へ挑みましょう。</p>
              </div>
            )}
          </section>

          {/* アクションボタン群 */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primary}
              disabled={!hasValidSave || busy}
              onClick={() => void handleContinue()}
            >
              つづきから
            </button>
            <button
              type="button"
              className={hasValidSave ? styles.sub : styles.primary}
              disabled={busy}
              onClick={handleNewGameStart}
            >
              最初から
            </button>
          </div>

          {/* 控えめなフッタ */}
          <footer className={styles.foot}>
            <span className={styles.version}>v{__APP_VERSION__}</span>
            <button
              type="button"
              className={styles.updateBtn}
              disabled={isChecking}
              onClick={() => {
                play('cursor');
                void checkForUpdate();
              }}
            >
              {isChecking ? '確認中…' : '更新を確認'}
            </button>
          </footer>
        </>
      ) : mode === 'guildName' ? (
        <>
          {/* ヘッダー：章マーク（結成の儀）+ ⚙ */}
          <header className={styles.head}>
            <p className={styles.chapterMark}>❦ 結成の儀</p>
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

          {/* ギルド名入力（flex: 1 で中央寄せ） */}
          <section className={styles.ritual}>
            <h2 className={styles.ritualHead}>ギルドの名を</h2>
            <p className={styles.ritualSub}>塔へ挑む隊商に名を与えよ</p>
            <div className={styles.inputWrap}>
              <input
                type="text"
                className={styles.ritualInput}
                value={guildName}
                maxLength={16}
                placeholder="ななしのギルド"
                onChange={(e) => setGuildName(e.target.value)}
                autoFocus
              />
              <span
                className={styles.cursor}
                aria-hidden
              />
            </div>
            <div className={styles.inputMeta}>
              <span>初期値: ななしのギルド</span>
              <span>{guildName.length} / 16</span>
            </div>
          </section>

          {/* アクションボタン群 */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primary}
              disabled={busy}
              onClick={() => void confirmCreate()}
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
        </>
      ) : (
        // mode === 'confirm'
        <div className={styles.modalBackdrop}>
          <div className={styles.modalPanel}>
            <h2 className={styles.modalTitle}>最初から始めますか？</h2>
            <div className={styles.modalWarn}>
              現在のセーブデータ『
              <span className={styles.modalWarnAccent}>{meta?.guildName}</span>
              』は上書きされ、元に戻せません。
            </div>
            <div className={styles.modalActions}>
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
        </div>
      )}

      <AppUpdater
        banner={banner}
        onApply={applyUpdate}
      />

      {soundOpen ? (
        <div
          className={styles.modalBackdrop}
          onClick={() => {
            play('cursor');
            setSoundOpen(false);
          }}
        >
          <div
            className={styles.modalPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <span>設定</span>
              <button
                type="button"
                className={styles.modalCloseBtn}
                aria-label="閉じる"
                onClick={() => {
                  play('cursor');
                  setSoundOpen(false);
                }}
              >
                ✕
              </button>
            </div>
            <SoundSettings />
            <button
              type="button"
              className={styles.modalClose}
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
