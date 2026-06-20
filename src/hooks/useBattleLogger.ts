import { useState, useCallback, useRef } from 'react';

const MESSAGE_DURATION_MS = 500;

export type LogMessage = { id: string; text: string };

export interface BattleLoggerApi {
  append: (text: string) => void;
  reset: () => void;
  displayed: LogMessage[];
  rendering: { msg: LogMessage; progress: number } | null;
  isIdle: boolean; // queue 空 && rendering なし
}

export const useBattleLogger = (): BattleLoggerApi => {
  // UI に見せる状態（React state）
  const [displayed, setDisplayed] = useState<LogMessage[]>([]);
  const [rendering, setRendering] = useState<{
    msg: LogMessage;
    progress: number;
  } | null>(null);

  // 内部キューと実行フラグは ref で管理（変化しても effect cleanup を起こさない）
  const queueRef = useRef<LogMessage[]>([]);
  const isRunningRef = useRef(false);
  const idCounterRef = useRef(0);
  const activeRafRef = useRef<number>(0);
  const cancelledRef = useRef(false);

  // 1 件分のメッセージを 500ms かけてアニメーション
  const playNext = useCallback(() => {
    if (isRunningRef.current) return;
    if (queueRef.current.length === 0) return;
    if (cancelledRef.current) return;

    const next = queueRef.current[0];
    queueRef.current = queueRef.current.slice(1);
    isRunningRef.current = true;

    const startedAt = performance.now();

    const tick = () => {
      if (cancelledRef.current) {
        isRunningRef.current = false;
        return;
      }
      const elapsed = performance.now() - startedAt;
      const progress = Math.min(elapsed / MESSAGE_DURATION_MS, 1);
      setRendering({ msg: next, progress });
      if (progress < 1) {
        activeRafRef.current = requestAnimationFrame(tick);
      } else {
        isRunningRef.current = false;
        setRendering(null);
        setDisplayed((d) => [...d, next]);
        // 次のメッセージへ（直接呼び出しで遅延なく開始）
        playNext();
      }
    };
    activeRafRef.current = requestAnimationFrame(tick);
  }, []);

  const append = useCallback(
    (text: string) => {
      const id = `log-${++idCounterRef.current}-${performance.now()}`;
      queueRef.current = [...queueRef.current, { id, text }];
      // ループが止まっていれば再開
      if (!isRunningRef.current) {
        playNext();
      }
    },
    [playNext]
  );

  const reset = useCallback(() => {
    cancelledRef.current = true;
    cancelAnimationFrame(activeRafRef.current);
    queueRef.current = [];
    isRunningRef.current = false;
    // 次の append で再び動けるようにフラグをリセット
    requestAnimationFrame(() => {
      cancelledRef.current = false;
    });
    setRendering(null);
    setDisplayed([]);
  }, []);

  const isIdle = queueRef.current.length === 0 && !isRunningRef.current && rendering === null;

  return { append, reset, displayed, rendering, isIdle };
};
