/**
 * bgmSynth.ts — Web Audio 波形合成ヘルパ
 *
 * gen-bgm.mjs の音作りをランタイムで再現する。
 * - pulseWave(): フーリエ係数で矩形波 PeriodicWave を生成
 * - scheduleNote(): 1ノートを AudioContext にスケジュール
 */

import type { BgmChannel, BgmNote } from './types';

/** MIDI ノート番号 → Hz */
function midiToHz(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/**
 * duty 比の矩形波を フーリエ係数で生成して PeriodicWave を返す。
 * duty = 0.5 → square, 0.25 → square25, 0.125 → square12
 */
export function pulseWave(ctx: AudioContext, duty: number): PeriodicWave {
  // フーリエ係数（DC成分 = インデックス0は0固定、余弦項も0）
  // sin係数: bn = 2/(n*PI) * sin(n*PI*duty) * 2  (duty矩形波の正規化)
  const N = 64; // 次数
  const real = new Float32Array(N);
  const imag = new Float32Array(N);
  // インデックス0はDC（0）
  for (let n = 1; n < N; n++) {
    // duty ratio の矩形波のフーリエ正弦係数
    imag[n] = (2 / (n * Math.PI)) * Math.sin(n * Math.PI * duty);
  }
  return ctx.createPeriodicWave(real, imag, { disableNormalization: false });
}

// PeriodicWave のキャッシュ（AudioContext ごと）
const periodicWaveCache = new WeakMap<AudioContext, Map<number, PeriodicWave>>();

function getCachedPulseWave(ctx: AudioContext, duty: number): PeriodicWave {
  let ctxCache = periodicWaveCache.get(ctx);
  if (!ctxCache) {
    ctxCache = new Map();
    periodicWaveCache.set(ctx, ctxCache);
  }
  let wave = ctxCache.get(duty);
  if (!wave) {
    wave = pulseWave(ctx, duty);
    ctxCache.set(duty, wave);
  }
  return wave;
}

/** ホワイトノイズ用バッファのキャッシュ */
const noiseBufferCache = new WeakMap<AudioContext, AudioBuffer>();

function getNoiseBuffer(ctx: AudioContext): AudioBuffer {
  const cached = noiseBufferCache.get(ctx);
  if (cached) return cached;
  const bufferSize = ctx.sampleRate * 2; // 2秒のノイズバッファ
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  noiseBufferCache.set(ctx, buffer);
  return buffer;
}

/**
 * 1ノートをスケジュールして発音する。
 *
 * @param ctx       AudioContext
 * @param dest      接続先 GainNode（チャンネル gain）
 * @param channel   BgmChannel（wave, adsr, gain, detune）
 * @param note      BgmNote（t/dur/midi/vel）
 * @param startAt   AudioContext 上の発音開始時刻（秒）
 * @param durSec    発音継続時間（秒）= note.dur * secondsPerBeat
 */
export function scheduleNote(
  ctx: AudioContext,
  dest: GainNode,
  channel: BgmChannel,
  note: BgmNote,
  startAt: number,
  durSec: number
): void {
  const { wave, adsr, detune } = channel;
  const vel = note.vel ?? 1;

  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0, startAt);

  // ADSR オートメーション
  const a = adsr.a;
  const d = adsr.d;
  const s = adsr.s;
  const r = adsr.r;

  const attackEnd = startAt + a;
  const decayEnd = attackEnd + d;
  const releaseStart = startAt + durSec;
  const noteEnd = releaseStart + r;

  gainNode.gain.linearRampToValueAtTime(vel, attackEnd);
  gainNode.gain.linearRampToValueAtTime(vel * s, decayEnd);
  gainNode.gain.setValueAtTime(vel * s, releaseStart);
  gainNode.gain.linearRampToValueAtTime(0, noteEnd);

  gainNode.connect(dest);

  if (wave === 'noise') {
    const noiseBuffer = getNoiseBuffer(ctx);
    const source = ctx.createBufferSource();
    source.buffer = noiseBuffer;
    source.loop = true;
    source.connect(gainNode);
    source.start(startAt);
    source.stop(noteEnd);
    source.onended = () => {
      source.disconnect();
      gainNode.disconnect();
    };
  } else {
    const osc = ctx.createOscillator();

    if (wave === 'square') {
      osc.setPeriodicWave(getCachedPulseWave(ctx, 0.5));
    } else if (wave === 'square25') {
      osc.setPeriodicWave(getCachedPulseWave(ctx, 0.25));
    } else if (wave === 'square12') {
      osc.setPeriodicWave(getCachedPulseWave(ctx, 0.125));
    } else if (wave === 'triangle') {
      osc.type = 'triangle';
    } else if (wave === 'saw') {
      osc.type = 'sawtooth';
    }

    osc.frequency.setValueAtTime(midiToHz(note.midi), startAt);
    if (detune !== undefined) {
      osc.detune.setValueAtTime(detune, startAt);
    }

    osc.connect(gainNode);
    osc.start(startAt);
    osc.stop(noteEnd);
    osc.onended = () => {
      osc.disconnect();
      gainNode.disconnect();
    };
  }
}
