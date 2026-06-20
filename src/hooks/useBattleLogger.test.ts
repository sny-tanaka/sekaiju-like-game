/**
 * useBattleLogger のユニットテスト
 *
 * requestAnimationFrame と performance.now をモックして時間を手動制御する。
 * 各メッセージは MESSAGE_DURATION_MS=500ms（文字進行）+ TAIL_MS=300ms（余韻）= 800ms サイクル。
 * - 0-500ms: progress 0→1（文字進行フェーズ）、rendering 非 null、isIdle=false
 * - 500-800ms: progress=1 維持（余韻フェーズ）、rendering 非 null、isIdle=false
 * - 800ms 完了: displayed に追加、rendering=null、次のメッセージがなければ isIdle=true
 *
 * 動作確認済みパターン:
 * - vi.stubGlobal('requestAnimationFrame', ...) でコールバックを蓄積
 * - vi.stubGlobal('performance', { now: () => currentTime }) で時刻を制御
 * - act() 内で currentTime を更新 → rAF callbacks を手動 flush → React が state を同期
 */

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { useBattleLogger } from './useBattleLogger';

// ─── グローバル mock 管理 ─────────────────────────────────────────────────────
let rafCallbacks: FrameRequestCallback[] = [];
let currentTime = 0;

const setupMocks = () => {
  rafCallbacks = [];
  currentTime = 0;
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    rafCallbacks.push(cb);
    return rafCallbacks.length;
  });
  vi.stubGlobal('cancelAnimationFrame', (id: number) => {
    rafCallbacks = rafCallbacks.filter((_, i) => i + 1 !== id);
  });
  vi.stubGlobal('performance', { now: () => currentTime });
};

/**
 * 時刻を targetTime に設定して、登録済み rAF コールバックをすべて実行する。
 * コールバックが新たな rAF を登録する場合は追加分は実行しない（1 フレーム分のみ）。
 */
const flushRafAt = (targetTime: number) => {
  currentTime = targetTime;
  const cbs = [...rafCallbacks];
  rafCallbacks = [];
  for (const cb of cbs) cb(targetTime);
};

/**
 * 時刻を進めながら rAF を繰り返し flush し、progress が 1 になるまで（または 500ms 経過まで）動かす。
 * 各 "フレーム" は 16ms 刻みで進める。
 */
const runUntilTime = (targetMs: number, startMs = 0) => {
  const step = 16;
  let t = startMs + step;
  while (t <= targetMs) {
    flushRafAt(t);
    t += step;
  }
  // 端数: targetMs まで flush
  if (currentTime < targetMs) {
    flushRafAt(targetMs);
  }
};

// ─────────────────────────────────────────────────────────────────────────────

describe('useBattleLogger', () => {
  beforeEach(() => {
    setupMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  // ──────────────────────────────────────────────
  // 1. 初期状態
  // ──────────────────────────────────────────────
  it('初期状態で isIdle=true / displayed=[] / rendering=null', () => {
    const { result } = renderHook(() => useBattleLogger());
    expect(result.current.isIdle).toBe(true);
    expect(result.current.displayed).toEqual([]);
    expect(result.current.rendering).toBeNull();
  });

  // ──────────────────────────────────────────────
  // 2. append → rendering に移行する
  // ──────────────────────────────────────────────
  it('append("msg1") を呼ぶと rendering に移行し isIdle=false になる', () => {
    const { result } = renderHook(() => useBattleLogger());

    act(() => {
      result.current.append('msg1');
    });

    // rAF を 1 フレームだけ flush して rendering 開始
    act(() => {
      flushRafAt(0);
    });

    expect(result.current.rendering).not.toBeNull();
    expect(result.current.rendering?.msg.text).toBe('msg1');
    expect(result.current.isIdle).toBe(false);
    expect(result.current.displayed).toEqual([]);
  });

  // ──────────────────────────────────────────────
  // 3. 800ms 後に displayed に移動し isIdle=true（500ms時点は余韻中でまだ移動しない）
  // ──────────────────────────────────────────────
  it('500ms 時点では余韻中: rendering 非 null / displayed=[] / isIdle=false', () => {
    const { result } = renderHook(() => useBattleLogger());

    act(() => {
      result.current.append('msg1');
    });

    act(() => {
      runUntilTime(500);
    });

    // 文字進行完了だが余韻フェーズ中なので displayed にはまだ入らない
    expect(result.current.displayed).toHaveLength(0);
    expect(result.current.rendering).not.toBeNull();
    expect(result.current.rendering?.progress).toBe(1);
    expect(result.current.isIdle).toBe(false);
  });

  it('800ms 後に displayed=[msg1] / rendering=null / isIdle=true になる', () => {
    const { result } = renderHook(() => useBattleLogger());

    act(() => {
      result.current.append('msg1');
    });

    act(() => {
      runUntilTime(800);
    });

    expect(result.current.displayed).toHaveLength(1);
    expect(result.current.displayed[0].text).toBe('msg1');
    expect(result.current.rendering).toBeNull();
    expect(result.current.isIdle).toBe(true);
  });

  // ──────────────────────────────────────────────
  // 4. 連続 append で順次再生される（各 800ms サイクル）
  // ──────────────────────────────────────────────
  it('連続 append (msg1, msg2) で msg1 → msg2 の順に displayed に積まれる', () => {
    const { result } = renderHook(() => useBattleLogger());

    act(() => {
      result.current.append('msg1');
      result.current.append('msg2');
    });

    // msg1 文字進行中 (0-500ms): displayed=0, isIdle=false
    act(() => {
      runUntilTime(500);
    });

    expect(result.current.displayed).toHaveLength(0); // 余韻中なのでまだ入らない
    expect(result.current.isIdle).toBe(false);

    // msg1 余韻完了 → displayed に追加 (800ms)
    act(() => {
      runUntilTime(800, 500);
    });

    expect(result.current.displayed).toHaveLength(1);
    expect(result.current.displayed[0].text).toBe('msg1');
    // msg2 が rendering 中なので isIdle=false
    expect(result.current.isIdle).toBe(false);

    // msg2 全サイクル完了 (800ms + 800ms = 1600ms)
    act(() => {
      runUntilTime(1600, 800);
    });

    expect(result.current.displayed).toHaveLength(2);
    expect(result.current.displayed[1].text).toBe('msg2');
    expect(result.current.isIdle).toBe(true);
  });

  // ──────────────────────────────────────────────
  // 5. progress が 0→1 に変化する
  // ──────────────────────────────────────────────
  it('rendering.progress が 0 から始まり 1 に向かって増加する', () => {
    const { result } = renderHook(() => useBattleLogger());

    act(() => {
      result.current.append('hello');
    });

    // 最初のフレーム (t=0): rendering 開始、progress=0
    act(() => {
      flushRafAt(0);
    });
    const progressAtStart = result.current.rendering?.progress ?? -1;
    expect(progressAtStart).toBeGreaterThanOrEqual(0);
    expect(progressAtStart).toBeLessThan(1);

    // 250ms 進める（1 フレームのみ flush）→ progress ≈ 0.5
    act(() => {
      flushRafAt(250);
    });
    const progressAtMid = result.current.rendering?.progress ?? -1;
    // 250 / 500 = 0.5 なので progressAtStart (0) より大きいはず
    expect(progressAtMid).toBeGreaterThan(progressAtStart);
    expect(progressAtMid).toBeLessThanOrEqual(1);

    // 500ms 時点: 余韻フェーズ（rendering 非 null、progress=1）
    act(() => {
      flushRafAt(500);
    });

    expect(result.current.rendering).not.toBeNull();
    expect(result.current.rendering?.progress).toBe(1);
    expect(result.current.displayed).toHaveLength(0);

    // 800ms で余韻完了 → displayed に移行
    act(() => {
      runUntilTime(800, 500);
    });

    expect(result.current.rendering).toBeNull();
    expect(result.current.displayed).toHaveLength(1);
  });

  // ──────────────────────────────────────────────
  // 6. reset() で全クリア
  // ──────────────────────────────────────────────
  it('reset() で queue / rendering / displayed がすべて空になる', () => {
    const { result } = renderHook(() => useBattleLogger());

    act(() => {
      result.current.append('msg1');
      result.current.append('msg2');
    });

    // rendering 開始
    act(() => {
      flushRafAt(0);
    });

    expect(result.current.rendering).not.toBeNull();

    act(() => {
      result.current.reset();
    });

    expect(result.current.displayed).toEqual([]);
    expect(result.current.rendering).toBeNull();
    expect(result.current.isIdle).toBe(true);
  });

  // ──────────────────────────────────────────────
  // 7. 長短どちらも 800ms で完結する（500ms 文字進行 + 300ms 余韻）
  // ──────────────────────────────────────────────
  it('短いメッセージ ("!") も長いメッセージ ("あ".repeat(100)) も 800ms で displayed に入る', () => {
    // 2 つの独立したフックを 1 テストで検証
    // ※ 同一の rafCallbacks / currentTime 空間を共有するため同時実行はできない。
    //   短メッセージと長メッセージを別々に試す。

    // --- 短いメッセージ ---
    setupMocks(); // reset
    const shortHook = renderHook(() => useBattleLogger());

    act(() => {
      shortHook.result.current.append('!');
    });
    // 500ms 時点はまだ余韻中
    act(() => {
      runUntilTime(500);
    });
    expect(shortHook.result.current.displayed).toHaveLength(0);
    expect(shortHook.result.current.isIdle).toBe(false);
    // 800ms で完了
    act(() => {
      runUntilTime(800, 500);
    });
    expect(shortHook.result.current.displayed).toHaveLength(1);
    expect(shortHook.result.current.isIdle).toBe(true);

    // --- 長いメッセージ ---
    setupMocks(); // reset
    const longHook = renderHook(() => useBattleLogger());

    act(() => {
      longHook.result.current.append('あ'.repeat(100));
    });
    // 500ms 時点はまだ余韻中
    act(() => {
      runUntilTime(500);
    });
    expect(longHook.result.current.displayed).toHaveLength(0);
    expect(longHook.result.current.isIdle).toBe(false);
    // 800ms で完了
    act(() => {
      runUntilTime(800, 500);
    });
    expect(longHook.result.current.displayed).toHaveLength(1);
    expect(longHook.result.current.isIdle).toBe(true);
  });
});
