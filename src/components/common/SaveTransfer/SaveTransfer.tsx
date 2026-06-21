import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './style.module.scss';

import { ActionButton } from '@/components/common/ActionButton/ActionButton';
import { useGameState } from '@/store/gameState';
import { useNavigation } from '@/store/navigation';
import { decodeSaveTransfer, encodeSaveTransfer } from '@/store/saveTransfer';

// ============================================================================
// SaveTransfer — セーブの引き継ぎ UI
// タイトル画面の ⚙ モーダル内、SoundSettings の下に配置する。
// ============================================================================

type Mode = 'idle' | 'export' | 'import';

export const SaveTransfer = () => {
  const { save, applyAndPersist } = useGameState();
  const { navigate } = useNavigation();

  const [mode, setMode] = useState<Mode>('idle');
  const [exportStr, setExportStr] = useState('');
  const [importInput, setImportInput] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState('');
  const [confirmOverwrite, setConfirmOverwrite] = useState(false);

  // toast を 2 秒で消す
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(''), 2000);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  // ---- エクスポート --------------------------------------------------------

  const handleExport = useCallback(async () => {
    if (!save) return;
    setBusy(true);
    const str = encodeSaveTransfer(save);
    try {
      await navigator.clipboard.writeText(str);
      setExportStr(str);
      showToast('コピーしました');
      setMode('idle');
    } catch {
      // clipboard API が使えない場合はフォールバック表示
      setExportStr(str);
      setMode('export');
    } finally {
      setBusy(false);
    }
  }, [save, showToast]);

  // ---- インポート ----------------------------------------------------------

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setImportInput(text);
    } catch {
      // 手動貼り付けを促す（エラー表示不要）
    }
  }, []);

  const handleLoad = useCallback(() => {
    if (!importInput.trim()) {
      setError('文字列を入力してください');
      return;
    }
    const result = decodeSaveTransfer(importInput);
    if (!result.ok) {
      setError(result.reason);
      return;
    }
    setError('');
    if (save) {
      // 既存セーブがある場合は確認モーダルを出す
      setConfirmOverwrite(true);
    } else {
      void doApply();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importInput, save]);

  const doApply = useCallback(async () => {
    const result = decodeSaveTransfer(importInput);
    if (!result.ok) return;
    setBusy(true);
    try {
      await applyAndPersist(() => result.data);
      showToast('読み込みました');
      setMode('idle');
      setImportInput('');
      setConfirmOverwrite(false);
      navigate({ name: 'town' });
    } finally {
      setBusy(false);
    }
  }, [importInput, applyAndPersist, showToast, navigate]);

  const handleConfirmOk = useCallback(() => {
    void doApply();
  }, [doApply]);

  const handleConfirmCancel = useCallback(() => {
    setConfirmOverwrite(false);
  }, []);

  // ---- 確認モーダル（上書き確認） -----------------------------------------

  if (confirmOverwrite) {
    const guildName = save?.guild.name ?? '';
    return (
      <div className={styles.confirmOverlay}>
        <div className={styles.confirmPanel}>
          <p className={styles.confirmText}>
            読み込むと、現在のセーブデータ
            <span className={styles.confirmAccent}>『{guildName}』</span>
            は上書きされて元に戻せません。よろしいですか？
          </p>
          <div className={styles.confirmActions}>
            <ActionButton
              label="読み込む"
              className={styles.dangerBtn}
              disabled={busy}
              sfx="decide"
              onClick={handleConfirmOk}
            />
            <ActionButton
              label="キャンセル"
              className={styles.subBtn}
              sfx="cancel"
              disabled={busy}
              onClick={handleConfirmCancel}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>セーブの引き継ぎ</h3>
      <p className={styles.description}>
        端末を変えたり、PWA を入れ直すときに使います。
        セーブを文字列にしてメモ・メールなどに貼っておけば、新しい端末で復元できます。
      </p>

      {/* toast */}
      {toast ? <p className={styles.toast}>{toast}</p> : null}

      {/* エクスポート */}
      {mode !== 'import' && (
        <div className={styles.section}>
          <ActionButton
            label="セーブをコピー"
            className={styles.primaryBtn}
            disabled={!save || busy}
            onClick={() => void handleExport()}
          />
          {mode === 'export' && exportStr && (
            <div className={styles.fallback}>
              <p className={styles.fallbackNote}>長押しコピーしてください</p>
              <textarea
                className={styles.codeArea}
                readOnly
                rows={6}
                value={exportStr}
                onFocus={(e) => e.currentTarget.select()}
              />
            </div>
          )}
        </div>
      )}

      {/* インポート */}
      {mode !== 'export' && (
        <div className={styles.section}>
          {mode === 'idle' ? (
            <ActionButton
              label="セーブを読み込む"
              className={styles.subBtn}
              sfx="cursor"
              onClick={() => {
                setMode('import');
                setError('');
                setImportInput('');
              }}
            />
          ) : (
            <>
              <textarea
                className={styles.codeArea}
                rows={6}
                value={importInput}
                placeholder="引き継ぎ文字列を貼り付けてください"
                onChange={(e) => {
                  setImportInput(e.target.value);
                  setError('');
                }}
              />
              {error ? <p className={styles.errorMsg}>{error}</p> : null}
              <div className={styles.importActions}>
                <ActionButton
                  label="貼り付け"
                  className={styles.subBtn}
                  sfx="cursor"
                  onClick={() => void handlePaste()}
                />
                <ActionButton
                  label="読み込む"
                  className={styles.primaryBtn}
                  disabled={busy}
                  onClick={handleLoad}
                />
                <ActionButton
                  label="キャンセル"
                  className={styles.cancelBtn}
                  sfx="cancel"
                  disabled={busy}
                  onClick={() => {
                    setMode('idle');
                    setError('');
                    setImportInput('');
                  }}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
