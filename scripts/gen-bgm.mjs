/**
 * gen-bgm.mjs — BGM WAV生成スクリプト（依存ゼロ、Node標準のみ）
 * 実行: node scripts/gen-bgm.mjs [id] [loops]
 *   id    : トラックID（既定: title）
 *   loops : ループ回数（既定: 2）
 * 出力: /tmp/bgm-<id>.wav（リポジトリ外・コミットしない）
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

// ──────────────────────────────────────────────
// 定数
// ──────────────────────────────────────────────

const SR = 44100; // サンプルレート

// ──────────────────────────────────────────────
// 波形オシレータ
// ──────────────────────────────────────────────

/**
 * 各種波形サンプルを位相(0..1)から計算する
 * @param {'square'|'square25'|'square12'|'triangle'|'saw'|'noise'} wave
 * @param {number} phase - 0..1
 * @returns {number}
 */
function oscSample(wave, phase) {
  switch (wave) {
    case 'square':
      return phase < 0.5 ? 1.0 : -1.0;
    case 'square25':
      return phase < 0.25 ? 1.0 : -1.0;
    case 'square12':
      return phase < 0.125 ? 1.0 : -1.0;
    case 'triangle':
      return phase < 0.5 ? 4.0 * phase - 1.0 : 3.0 - 4.0 * phase;
    case 'saw':
      return 2.0 * phase - 1.0;
    case 'noise':
      return Math.random() * 2.0 - 1.0;
    default:
      return 0;
  }
}

// ──────────────────────────────────────────────
// ADSR エンベロープ
// ──────────────────────────────────────────────

/**
 * ADSR エンベロープの値を計算する
 * @param {number} t   - ノート開始からの経過秒
 * @param {number} dur - ノートの発音継続秒（リリース開始タイミング）
 * @param {{ a: number, d: number, s: number, r: number }} adsr
 * @returns {number} 0..1
 */
function adsrEnv(t, dur, adsr) {
  const { a, d, s, r } = adsr;
  if (t < 0) return 0;
  if (t < a) {
    // アタック
    return t / a;
  }
  if (t < a + d) {
    // ディケイ
    return 1.0 - (1.0 - s) * ((t - a) / d);
  }
  if (t < dur) {
    // サステイン
    return s;
  }
  // リリース
  const rt = t - dur;
  if (rt >= r) return 0;
  return s * (1.0 - rt / r);
}

// ──────────────────────────────────────────────
// MIDI → 周波数
// ──────────────────────────────────────────────

/**
 * @param {number} midi
 * @returns {number} Hz
 */
function midiToFreq(midi) {
  return 440.0 * Math.pow(2, (midi - 69) / 12.0);
}

// ──────────────────────────────────────────────
// 1次 IIR ローパスフィルタ
// ──────────────────────────────────────────────

/**
 * @param {Float64Array} samples
 * @param {number} cutoffHz
 * @returns {Float64Array}
 */
function lowpass(samples, cutoffHz) {
  const dt = 1.0 / SR;
  const RC = 1.0 / (2.0 * Math.PI * cutoffHz);
  const alpha = dt / (RC + dt);
  const out = new Float64Array(samples.length);
  let prev = 0;
  for (let i = 0; i < samples.length; i++) {
    prev = prev + alpha * (samples[i] - prev);
    out[i] = prev;
  }
  return out;
}

// ──────────────────────────────────────────────
// ソフトクリップ
// ──────────────────────────────────────────────

/**
 * tanh ソフトクリップ（軽め）
 * @param {number} x
 * @returns {number}
 */
function softclip(x) {
  return Math.tanh(x * 1.5) / Math.tanh(1.5);
}

// ──────────────────────────────────────────────
// WAV 書き出し
// ──────────────────────────────────────────────

/**
 * 16bit PCM mono WAV をファイルに書き出す
 * @param {string} filePath
 * @param {Float64Array} samples - -1..1 の PCM データ
 */
function writeWav(filePath, samples) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = SR * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataLen = samples.length * blockAlign;
  const headerLen = 44;
  const totalLen = headerLen + dataLen;

  const buf = Buffer.alloc(totalLen);
  let offset = 0;

  buf.write('RIFF', offset);
  offset += 4;
  buf.writeUInt32LE(totalLen - 8, offset);
  offset += 4;
  buf.write('WAVE', offset);
  offset += 4;

  buf.write('fmt ', offset);
  offset += 4;
  buf.writeUInt32LE(16, offset);
  offset += 4;
  buf.writeUInt16LE(1, offset);
  offset += 2; // PCM
  buf.writeUInt16LE(numChannels, offset);
  offset += 2;
  buf.writeUInt32LE(SR, offset);
  offset += 4;
  buf.writeUInt32LE(byteRate, offset);
  offset += 4;
  buf.writeUInt16LE(blockAlign, offset);
  offset += 2;
  buf.writeUInt16LE(bitsPerSample, offset);
  offset += 2;

  buf.write('data', offset);
  offset += 4;
  buf.writeUInt32LE(dataLen, offset);
  offset += 4;

  for (let i = 0; i < samples.length; i++) {
    const clamped = Math.max(-1.0, Math.min(1.0, samples[i]));
    const val = Math.round(clamped * 32767);
    buf.writeInt16LE(val, offset);
    offset += 2;
  }

  writeFileSync(filePath, buf);
}

// ──────────────────────────────────────────────
// BGM レンダラ
// ──────────────────────────────────────────────

/**
 * BgmTrack JSON を読み込んで Float64Array にレンダリングする（1ループ分）
 * @param {object} track - title.json の内容
 * @returns {Float64Array}
 */
function renderLoop(track) {
  const { bpm, loopBeats, channels } = track;
  const secPerBeat = 60.0 / bpm;
  const loopSec = loopBeats * secPerBeat;
  const loopSamples = Math.ceil(SR * loopSec);

  // 出力バッファ
  const out = new Float64Array(loopSamples);

  for (const ch of channels) {
    const { wave, gain, adsr, notes } = ch;
    const isNoise = wave === 'noise';

    for (const note of notes) {
      const vel = note.vel !== undefined ? note.vel : 1.0;
      const noteStartSec = note.t * secPerBeat;
      const noteDurSec = note.dur * secPerBeat;
      // リリースを含めた実際の発音終了時刻
      const totalDurSec = noteDurSec + adsr.r;

      const freq = isNoise ? 0 : midiToFreq(note.midi);

      const startSample = Math.round(noteStartSec * SR);
      const endSample = Math.min(loopSamples, Math.round((noteStartSec + totalDurSec) * SR));

      let phase = 0;
      const phaseInc = freq > 0 ? freq / SR : 0;

      for (let i = startSample; i < endSample; i++) {
        const t = (i - startSample) / SR;
        const env = adsrEnv(t, noteDurSec, adsr);
        if (env <= 0) {
          if (!isNoise) phase += phaseInc;
          continue;
        }

        let sample;
        if (isNoise) {
          sample = Math.random() * 2.0 - 1.0;
        } else {
          sample = oscSample(wave, phase % 1.0);
          phase += phaseInc;
        }

        out[i] += sample * env * vel * gain;
      }
    }
  }

  return out;
}

/**
 * ループを loops 回連結して Float64Array を返す
 * @param {object} track
 * @param {number} loops
 * @returns {Float64Array}
 */
function renderMultiLoop(track, loops) {
  const loopBuf = renderLoop(track);
  const total = new Float64Array(loopBuf.length * loops);
  for (let l = 0; l < loops; l++) {
    total.set(loopBuf, l * loopBuf.length);
  }
  return total;
}

/**
 * ピーク正規化して -3dBFS（≈0.707）に合わせる
 * @param {Float64Array} samples
 * @returns {Float64Array}
 */
function normalize(samples) {
  let peak = 0;
  for (let i = 0; i < samples.length; i++) {
    const abs = Math.abs(samples[i]);
    if (abs > peak) peak = abs;
  }
  const target = 0.707; // -3dBFS
  const gain = peak > 0 ? target / peak : 1.0;
  const out = new Float64Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    out[i] = samples[i] * gain;
  }
  return out;
}

// ──────────────────────────────────────────────
// メイン
// ──────────────────────────────────────────────

const args = process.argv.slice(2);
const trackId = args[0] || 'title';
const loops = parseInt(args[1] || '2', 10);

const trackPath = join(REPO_ROOT, 'src', 'audio', 'bgm', 'tracks', `${trackId}.json`);
const outPath = `/tmp/bgm-${trackId}.wav`;

console.log(`\n=== gen-bgm.mjs ===`);
console.log(`Track  : ${trackId}`);
console.log(`JSON   : ${trackPath}`);
console.log(`Loops  : ${loops}`);

/** @type {import('../src/audio/bgm/types.js').BgmTrack} */
const track = JSON.parse(readFileSync(trackPath, 'utf-8'));

const secPerBeat = 60.0 / track.bpm;
const loopSec = track.loopBeats * secPerBeat;
const totalSec = loopSec * loops;
const totalSamples = Math.ceil(SR * totalSec);
const wavBytes = 44 + totalSamples * 2;

console.log(`BPM    : ${track.bpm}`);
console.log(`Loop   : ${track.loopBeats} 拍 = ${loopSec.toFixed(2)} 秒`);
console.log(`Total  : ${loops} ループ = ${totalSec.toFixed(2)} 秒`);
console.log(`\nレンダリング中...`);

// レンダリング
let rendered = renderMultiLoop(track, loops);

// ソフトクリップ
const clipped = new Float64Array(rendered.length);
for (let i = 0; i < rendered.length; i++) {
  clipped[i] = softclip(rendered[i]);
}

// ローパスフィルタ（高域を少し丸める）
const filtered = lowpass(clipped, 12000);

// 正規化
const normalized = normalize(filtered);

// WAV 書き出し
writeWav(outPath, normalized);

console.log(`出力   : ${outPath}`);
console.log(`サイズ : ${(wavBytes / 1024).toFixed(1)} KB (${wavBytes.toLocaleString()} bytes)`);
console.log(`秒数   : ${totalSec.toFixed(2)} 秒\n`);
