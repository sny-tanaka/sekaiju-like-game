/**
 * BgmPlayer.test.ts
 *
 * BgmPlayer のフェードイン音量が設定値(targetGain)に固定されており、
 * 曲を連続切替しても過渡値 ratchet が発生しないことを検証する。
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';

import { BgmPlayer } from './BgmPlayer';
import type { BgmTrack } from './types';

// ──────────────────────────────────────────────────────────────────
// モック AudioContext
// ──────────────────────────────────────────────────────────────────

interface LinearRampCall {
  value: number;
  endTime: number;
}

function makeMockMasterGain(initialValue: number) {
  const linearRampCalls: LinearRampCall[] = [];

  const gain = {
    value: initialValue,
    setTargetAtTime: vi.fn(),
    setValueAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn((value: number, endTime: number) => {
      linearRampCalls.push({ value, endTime });
    }),
    cancelScheduledValues: vi.fn(),
  };

  const masterGain = {
    gain,
    connect: vi.fn(),
    disconnect: vi.fn(),
  };

  return { masterGain, linearRampCalls };
}

function makeMockAudioContext(initialTime = 0) {
  let time = initialTime;

  return {
    get currentTime() {
      return time;
    },
    advanceTime(delta: number) {
      time += delta;
    },
    createGain: vi.fn(() => ({
      gain: {
        value: 1,
        setValueAtTime: vi.fn(),
        setTargetAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
        cancelScheduledValues: vi.fn(),
      },
      connect: vi.fn(),
      disconnect: vi.fn(),
    })),
    createOscillator: vi.fn(() => ({
      type: 'sine',
      frequency: { setValueAtTime: vi.fn() },
      detune: { setValueAtTime: vi.fn() },
      connect: vi.fn(),
      disconnect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      onended: null,
      setPeriodicWave: vi.fn(),
    })),
    createBufferSource: vi.fn(() => ({
      buffer: null,
      loop: false,
      connect: vi.fn(),
      disconnect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      onended: null,
    })),
    createBuffer: vi.fn(() => ({ getChannelData: vi.fn(() => new Float32Array(2048)) })),
    createPeriodicWave: vi.fn(() => ({})),
    destination: {},
    sampleRate: 44100,
    state: 'running',
  };
}

// ──────────────────────────────────────────────────────────────────
// テスト用最小 BgmTrack（channels 空 = ノート無し）
// ──────────────────────────────────────────────────────────────────
function makeTrack(id: string): BgmTrack {
  return { id, bpm: 120, loopBeats: 4, channels: [] };
}

// ──────────────────────────────────────────────────────────────────
// テスト本体
// ──────────────────────────────────────────────────────────────────

describe('BgmPlayer — フェードイン音量の ratchet 防止', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('初期 volume=0.5 のとき、最初の再生開始のフェードイン目標が 0.5 である', () => {
    const ctx = makeMockAudioContext();
    const { masterGain, linearRampCalls } = makeMockMasterGain(0.5);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const player = new BgmPlayer(ctx as any, masterGain as any);
    player.setTrack(makeTrack('a'));

    // フェードイン ramp（目標が 0 でない最後の呼び出し）を確認
    const fadeInRamps = linearRampCalls.filter((c) => c.value > 0);
    expect(fadeInRamps.length).toBeGreaterThan(0);
    expect(fadeInRamps[fadeInRamps.length - 1].value).toBe(0.5);

    player.dispose();
  });

  test('曲を連続切替しても、フェードイン目標が 0.5 から下がらない（過渡値 ratchet なし）', () => {
    const ctx = makeMockAudioContext();
    const { masterGain, linearRampCalls } = makeMockMasterGain(0.5);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const player = new BgmPlayer(ctx as any, masterGain as any);

    const trackA = makeTrack('a');
    const trackB = makeTrack('b');
    const trackC = makeTrack('c');

    // 曲 A 開始
    player.setTrack(trackA);

    // フェード途中を模すために gain.value を小さい値に書き換えて時間を進める
    ctx.advanceTime(0.1);
    masterGain.gain.value = 0.1; // フェード途中の過渡値をシミュレート

    // 曲 B に切替（playing=true なので _fadeOutAndSwitch → _startPlayback(FADE_SEC)）
    player.setTrack(trackB);

    ctx.advanceTime(0.1);
    masterGain.gain.value = 0.05; // さらに小さい過渡値

    // 曲 C に切替
    player.setTrack(trackC);

    // フェードインの目標値（0 でないもの）を全て確認する
    const fadeInRamps = linearRampCalls.filter((c) => c.value > 0);
    expect(fadeInRamps.length).toBeGreaterThan(0);

    // 過渡値に引っ張られていなければすべて 0.5 のはず
    for (const ramp of fadeInRamps) {
      expect(ramp.value).toBeGreaterThanOrEqual(0.5);
    }

    player.dispose();
  });

  test('setGain(0.3, false) 後に再生開始したら、フェードイン目標が 0.3 になる', () => {
    const ctx = makeMockAudioContext();
    const { masterGain, linearRampCalls } = makeMockMasterGain(0.5);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const player = new BgmPlayer(ctx as any, masterGain as any);

    // 音量を 0.3 に変更
    player.setGain(0.3, false);

    // 再生開始
    player.setTrack(makeTrack('a'));

    const fadeInRamps = linearRampCalls.filter((c) => c.value > 0);
    expect(fadeInRamps.length).toBeGreaterThan(0);
    expect(fadeInRamps[fadeInRamps.length - 1].value).toBe(0.3);

    player.dispose();
  });

  test('setGain(0.5, true)（ミュート）後に再生開始したら、フェードイン目標が 0 になる', () => {
    const ctx = makeMockAudioContext();
    const { masterGain, linearRampCalls } = makeMockMasterGain(0.5);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const player = new BgmPlayer(ctx as any, masterGain as any);

    // ミュート設定
    player.setGain(0.5, true);

    // 再生開始
    player.setTrack(makeTrack('a'));

    // ミュート時はフェードイン目標が 0（0→0 のフェード）
    // linearRampToValueAtTime(0, ...) が呼ばれることを確認
    const fadeInToZero = linearRampCalls.filter((c) => c.value === 0);
    expect(fadeInToZero.length).toBeGreaterThan(0);

    // 非ゼロ目標は呼ばれていないはず
    const fadeInNonZero = linearRampCalls.filter((c) => c.value > 0);
    expect(fadeInNonZero.length).toBe(0);

    player.dispose();
  });
});
