/**
 * BgmPlayer.ts — 先読みスケジューリング方式の BGM 再生クラス
 *
 * - setInterval(25ms) + 100ms lookahead で OscillatorNode をスケジュール
 * - loopBeats で継ぎ目なく無限ループ
 * - 曲切替時 0.4s フェードアウト → 停止 → 新曲 → フェードイン
 * - window.AudioContext 不在（jsdom/テスト）では no-op
 */

import { scheduleNote } from './bgmSynth';
import type { BgmTrack } from './types';

const SCHEDULE_INTERVAL_MS = 25;
const LOOKAHEAD_SEC = 0.1;
const FADE_SEC = 0.4;

export class BgmPlayer {
  private ctx: AudioContext;
  private masterGain: GainNode;

  private track: BgmTrack | null = null;
  private playing = false;

  // スケジューラ状態
  private intervalId: ReturnType<typeof setInterval> | null = null;

  // ループ基準: loopStartTime + loopIndex * loopDurSec = 絶対時刻
  private loopStartTime = 0; // 現在のループ開始の AudioContext 時刻
  private loopIndex = 0; // 何ループ目か
  private scheduledUpTo = 0; // ここまでスケジュール済み（AudioContext 時刻）

  // フェードイン目標音量（過渡値 ratchet 防止のため設定値を保持する）
  private targetGain: number;

  constructor(ctx: AudioContext, masterGain: GainNode) {
    this.ctx = ctx;
    this.masterGain = masterGain;
    // Provider はプレイヤー生成前に masterGain.gain.value をセット済みなので初期設定音量を取得
    this.targetGain = masterGain.gain.value;
  }

  /** BGM 音量を反映（0..1, muted=true なら 0）。 */
  setGain(volume: number, muted: boolean): void {
    const target = muted ? 0 : volume;
    this.targetGain = target;
    this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.02);
  }

  /** 曲を設定して再生開始（既に同じ曲なら何もしない）。 */
  setTrack(track: BgmTrack | null): void {
    if (track?.id === this.track?.id && this.playing) return;

    if (this.playing) {
      // フェードアウト → 停止 → 新曲開始
      this._fadeOutAndSwitch(track);
    } else {
      this.track = track;
      if (track) this._startPlayback(0);
    }
  }

  /** 再生を開始する。 */
  start(): void {
    if (this.playing || !this.track) return;
    this._startPlayback(0);
  }

  /** 再生を停止する。 */
  stop(): void {
    this._stopScheduler();
    this.playing = false;
    this.track = null;
  }

  /** AudioContext・interval などを後片付けする。 */
  dispose(): void {
    this._stopScheduler();
    this.playing = false;
    this.track = null;
  }

  // ──────────────────────────────────────────────
  // private
  // ──────────────────────────────────────────────

  private _startPlayback(fadeInDelay: number): void {
    if (!this.track) return;

    this._stopScheduler();
    this.playing = true;

    const now = this.ctx.currentTime;
    const startTime = now + fadeInDelay;

    this.loopStartTime = startTime;
    this.loopIndex = 0;
    this.scheduledUpTo = startTime;

    // フェードイン（targetGain を目標にすることで過渡値 ratchet を防ぐ）
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(0, startTime);
    this.masterGain.gain.linearRampToValueAtTime(this.targetGain, startTime + FADE_SEC);

    // スケジューラ起動
    this.intervalId = setInterval(() => {
      this._scheduleTick();
    }, SCHEDULE_INTERVAL_MS);

    // 初回即時実行
    this._scheduleTick();
  }

  private _stopScheduler(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private _fadeOutAndSwitch(nextTrack: BgmTrack | null): void {
    const now = this.ctx.currentTime;

    // フェードアウト
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + FADE_SEC);

    this._stopScheduler();
    this.playing = false;
    this.track = nextTrack;

    if (nextTrack) {
      // フェードアウト完了後に新曲開始
      this._startPlayback(FADE_SEC);
    }
  }

  private _scheduleTick(): void {
    if (!this.playing || !this.track) return;

    const now = this.ctx.currentTime;
    const scheduleUntil = now + LOOKAHEAD_SEC;

    const { bpm, loopBeats, channels } = this.track;
    const secondsPerBeat = 60 / bpm;
    const loopDurSec = loopBeats * secondsPerBeat;

    // scheduledUpTo から scheduleUntil まで発音スケジュール
    while (this.scheduledUpTo < scheduleUntil) {
      // 現在のループ絶対開始時刻
      const loopAbsStart = this.loopStartTime + this.loopIndex * loopDurSec;

      // このループ内でスケジュールが必要な時刻範囲（ループ内相対時刻）
      const relFrom = this.scheduledUpTo - loopAbsStart;
      const relTo = Math.min(loopDurSec, scheduleUntil - loopAbsStart);

      if (relFrom >= loopDurSec) {
        // このループは終了、次のループへ
        this.loopIndex++;
        continue;
      }

      // 各チャンネルのノートをスキャン
      for (const channel of channels) {
        for (const note of channel.notes) {
          const noteStartBeat = note.t;
          const noteStartRel = noteStartBeat * secondsPerBeat;

          if (noteStartRel < relFrom || noteStartRel >= relTo) continue;

          const noteAbsStart = loopAbsStart + noteStartRel;
          const durSec = note.dur * secondsPerBeat;

          // チャンネル GainNode（masterGain の手前）
          const chanGain = this.ctx.createGain();
          chanGain.gain.setValueAtTime(channel.gain, noteAbsStart);
          chanGain.connect(this.masterGain);

          scheduleNote(this.ctx, chanGain, channel, note, noteAbsStart, durSec);

          // chanGain は scheduleNote 内の gainNode.onended では切断されない（別ノード）
          // リリース終了後に切断するためタイマーを仕掛ける
          const cleanupAt = noteAbsStart + durSec + channel.adsr.r + 0.05;
          const delay = (cleanupAt - this.ctx.currentTime) * 1000;
          if (delay > 0) {
            setTimeout(() => {
              chanGain.disconnect();
            }, delay);
          } else {
            chanGain.disconnect();
          }
        }
      }

      // scheduledUpTo をループ末尾まで進める（または scheduleUntil まで）
      if (relTo >= loopDurSec) {
        // ループ終端に達した
        this.scheduledUpTo = loopAbsStart + loopDurSec;
        this.loopIndex++;
      } else {
        this.scheduledUpTo = scheduleUntil;
      }
    }
  }
}

/** window.AudioContext 不在時用の no-op プレイヤー */
export class NoopBgmPlayer {
  setGain(_volume: number, _muted: boolean): void {}
  setTrack(_track: BgmTrack | null): void {}
  start(): void {}
  stop(): void {}
  dispose(): void {}
}

/** AudioContext のコンストラクタを環境に合わせて取得する（SSR / jsdom は undefined）。 */
export function getAudioContextCtor(): typeof AudioContext | undefined {
  if (typeof window === 'undefined') return undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).AudioContext ?? (window as any).webkitAudioContext ?? undefined;
}
