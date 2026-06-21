import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './style.module.scss';

import { ActionButton } from '@/components/common/ActionButton/ActionButton';
import { useGameState } from '@/store/gameState';
import { useNavigation } from '@/store/navigation';
import { getSaveMeta, loadGame } from '@/store/saveStore';
import { decodeSaveTransfer, encodeSaveTransfer } from '@/store/saveTransfer';

// ============================================================================
// SaveTransfer — セーブの引き継ぎ UI（ファイル方式）
// タイトル画面の ⚙ モーダル内、SoundSettings の下に配置する。
// Web Share API → ダウンロードリンクの 2 段フォールバックでエクスポート。
// インポートは <input type="file"> 経由。
// ============================================================================

export const SaveTransfer = () => {
  const { save, importSave } = useGameState();
  const { navigate } = useNavigation();

  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [pasteInput, setPasteInput] = useState('');
  const [toast, setToast] = useState('');
  const [confirmOverwrite, setConfirmOverwrite] = useState(false);
  // インポートで読み込んだデータを一時保持（上書き確認 OK 時に使う）
  const [pendingImportStr, setPendingImportStr] = useState('');
  // null = ロード中、true = ディスクに有効セーブあり、false = なし or 破損
  const [hasSaveOnDisk, setHasSaveOnDisk] = useState<boolean | null>(null);

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

  // マウント時にディスク上のセーブ存在を確認する。
  // save（メモリ）が truthy になったら確実に有りとして同期する。
  useEffect(() => {
    if (save) {
      setHasSaveOnDisk(true);
      return;
    }
    let cancelled = false;
    void getSaveMeta().then((meta) => {
      if (cancelled) return;
      if (meta === null || meta.corrupted) {
        setHasSaveOnDisk(false);
      } else {
        setHasSaveOnDisk(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [save]);

  // ---- ファイル名生成 -------------------------------------------------------

  const buildFilename = useCallback((guildName: string): string => {
    const sanitized = guildName.replace(/[\\/:*?"<>|]/g, '_') || 'noguild';
    const now = new Date();
    const pad = (n: number, d = 2) => String(n).padStart(d, '0');
    const datePart =
      `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}` +
      `-${pad(now.getHours())}${pad(now.getMinutes())}`;
    return `sekaiju-save-${sanitized}-${datePart}.txt`;
  }, []);

  // ---- エクスポート --------------------------------------------------------

  const handleExport = useCallback(async () => {
    setBusy(true);
    try {
      let working = save;
      if (!working) {
        const result = await loadGame();
        if (!result.ok) {
          showToast('セーブが読み込めません');
          return;
        }
        working = result.data;
      }
      const str = encodeSaveTransfer(working);
      const filename = buildFilename(working.guild.name);

      // Web Share API（iOS で推奨）を最優先で試す
      const shareFile = new File([str], filename, { type: 'text/plain' });
      if (
        typeof navigator !== 'undefined' &&
        typeof navigator.canShare === 'function' &&
        navigator.canShare({ files: [shareFile] }) &&
        typeof navigator.share === 'function'
      ) {
        try {
          await navigator.share({ files: [shareFile], title: 'セーブの引き継ぎ' });
          showToast('共有しました');
          return;
        } catch (err) {
          // AbortError はユーザーキャンセル → silently return
          // DOMException は環境によって Error のサブクラスでない場合があるため
          // instanceof チェックをせず name プロパティだけで判定する
          if ((err as { name?: string }).name === 'AbortError') {
            return;
          }
          // その他のエラーはダウンロードフォールバックへ
        }
      }

      // ダウンロードフォールバック
      const blob = new Blob([str], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('ダウンロードしました');
    } finally {
      setBusy(false);
    }
  }, [save, showToast, buildFilename]);

  // ---- インポート ----------------------------------------------------------

  /** File をテキストとして読む。file.text() が使える環境（iOS Safari 含む）はそれを優先し、
   *  無い場合は FileReader にフォールバックする。 */
  const readFileAsText = useCallback(async (file: File): Promise<string> => {
    if (typeof file.text === 'function') {
      return await file.text();
    }
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('ファイルの読み込みに失敗しました'));
      reader.readAsText(file);
    });
  }, []);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      // 同じファイルを 2 回連続で選べるよう input をリセット
      e.target.value = '';
      if (!file) return;

      setError('');
      let text: string;
      try {
        text = await readFileAsText(file);
      } catch {
        setError('ファイルを読み込めませんでした');
        return;
      }

      const result = decodeSaveTransfer(text);
      if (!result.ok) {
        setError(result.reason);
        return;
      }

      setPendingImportStr(text);
      if (save) {
        // 既存セーブがある場合は確認モーダルを出す
        setConfirmOverwrite(true);
      } else {
        void doApplyWithStr(text);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [save, readFileAsText]
  );

  const doApplyWithStr = useCallback(
    async (str: string) => {
      const result = decodeSaveTransfer(str);
      if (!result.ok) return;
      setBusy(true);
      try {
        await importSave(result.data);
        showToast('読み込みました');
        setPendingImportStr('');
        setConfirmOverwrite(false);
        navigate({ name: 'town' });
      } finally {
        setBusy(false);
      }
    },
    [importSave, showToast, navigate]
  );

  const handleConfirmOk = useCallback(() => {
    void doApplyWithStr(pendingImportStr);
  }, [doApplyWithStr, pendingImportStr]);

  const handlePasteLoad = useCallback(async () => {
    setError('');
    const result = decodeSaveTransfer(pasteInput);
    if (!result.ok) {
      setError(result.reason);
      return;
    }
    setPendingImportStr(pasteInput);
    if (save) {
      setConfirmOverwrite(true);
    } else {
      void doApplyWithStr(pasteInput);
    }
  }, [pasteInput, save, doApplyWithStr]);

  const handleConfirmCancel = useCallback(() => {
    setConfirmOverwrite(false);
    setPendingImportStr('');
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
        セーブをファイルに書き出して保管しておけば、新しい端末で読み込んで復元できます。
      </p>

      {/* toast */}
      {toast ? <p className={styles.toast}>{toast}</p> : null}

      {/* エクスポート */}
      <div className={styles.section}>
        <ActionButton
          label="セーブをファイルに保存"
          className={styles.primaryBtn}
          disabled={!hasSaveOnDisk || busy}
          onClick={() => void handleExport()}
        />
      </div>

      {/* インポート: ファイル経路 */}
      <div className={styles.section}>
        {/* <label> ラップで iOS PWA でも確実に file picker が開く */}
        <label className={`${styles.subBtn} ${styles.fileLabel}`}>
          <span className={styles.fileLabelText}>セーブのファイルを読み込む</span>
          <input
            type="file"
            accept=".txt,.json,.dat,text/plain"
            className={styles.fileInput}
            onChange={(e) => void handleFileChange(e)}
            onClick={() => setError('')}
          />
        </label>
      </div>

      {/* インポート: 貼り付け経路（iOS PWA でファイル経路が詰まる場合の保険） */}
      <div className={styles.section}>
        <h4 className={styles.subSectionTitle}>ファイルが読み込めない場合</h4>
        <p className={styles.description}>
          ダウンロードしたファイルを Files / メモ等で開いて全選択コピーし、
          下の欄に貼り付けて「読み込む」を押してください。
        </p>
        <textarea
          className={styles.pasteArea}
          rows={4}
          value={pasteInput}
          placeholder="ここに引き継ぎ文字列を貼り付け"
          onChange={(e) => {
            setPasteInput(e.target.value);
            setError('');
          }}
        />
        <ActionButton
          label="貼り付けた文字列を読み込む"
          className={styles.subBtn}
          disabled={!pasteInput.trim() || busy}
          onClick={() => void handlePasteLoad()}
        />
      </div>

      {/* エラーメッセージ（ファイル経路・貼り付け経路共通） */}
      {error ? <p className={styles.errorMsg}>{error}</p> : null}
    </div>
  );
};
