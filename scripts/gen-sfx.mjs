/**
 * gen-sfx.mjs — 効果音WAV生成スクリプト（依存ゼロ、Node標準のみ）
 * 実行: node scripts/gen-sfx.mjs
 * 出力: public/sfx/<id>.wav（26種）
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

// ────────────────────────────────────────────
// 合成エンジン ヘルパ
// ────────────────────────────────────────────

const SR = 44100;

/** オシレータ: 'sine'|'square'|'saw'|'triangle' の波形サンプル（t: 秒） */
function osc(type, freq, t) {
  const phase = (t * freq) % 1.0;
  switch (type) {
    case 'sine':
      return Math.sin(2 * Math.PI * phase);
    case 'square':
      return phase < 0.5 ? 1.0 : -1.0;
    case 'saw':
      return 2.0 * phase - 1.0;
    case 'triangle':
      return phase < 0.5 ? 4.0 * phase - 1.0 : 3.0 - 4.0 * phase;
    default:
      return 0;
  }
}

/** ホワイトノイズ */
function noise() {
  return Math.random() * 2 - 1;
}

/**
 * ソフトクリップ飽和。tanh で角を丸めつつ厚み・グリットを足す。
 * drive を上げるほど飽和が強くなる（厚く・ザラつく）。
 * @param {number} x
 * @param {number} drive
 * @returns {number}
 */
function saturate(x, drive = 3) {
  return Math.tanh(x * drive);
}

/**
 * 太いノイズ生成（白＋1次ローパスで丸めた層を混合）。
 * 白ノイズの鋭さを残しつつ、丸めた成分で低中域に芯を持たせて「厚み」を出す。
 * @param {number} dur - 秒
 * @param {number} cutoffHz - 丸め層のカットオフ（既定 3kHz）
 * @param {number} roundMix - 丸め層の混合比（0..1, 既定 0.6）
 * @returns {Float32Array}
 */
function thickNoise(dur, cutoffHz = 3000, roundMix = 0.6) {
  const len = Math.ceil(SR * dur);
  const white = new Float32Array(len);
  for (let i = 0; i < len; i++) white[i] = noise();
  const rounded = lowpass(white, cutoffHz);
  const out = new Float32Array(len);
  const whiteMix = 1 - roundMix;
  for (let i = 0; i < len; i++) {
    out[i] = white[i] * whiteMix + rounded[i] * roundMix;
  }
  return out;
}

/**
 * 線形 AR エンベロープ（0..1）
 * @param {number} t - 現在時刻(秒)
 * @param {number} dur - 全体長(秒)
 * @param {{ attack?: number, release?: number }} opts
 */
function env(t, dur, { attack = 0.002, release = 0.01 } = {}) {
  if (t < attack) return t / attack;
  if (t > dur - release) return Math.max(0, (dur - t) / release);
  return 1.0;
}

/**
 * 周波数スイープ f0→f1
 * @param {number} t - 現在時刻(秒)
 * @param {number} dur - 全体長(秒)
 * @param {number} f0 - 開始周波数
 * @param {number} f1 - 終了周波数
 * @param {'lin'|'exp'} curve
 */
function sweep(t, dur, f0, f1, curve = 'lin') {
  const p = Math.min(1.0, t / dur);
  if (curve === 'exp') {
    return f0 * Math.pow(f1 / f0, p);
  }
  return f0 + (f1 - f0) * p;
}

/**
 * 1次 IIR ローパスフィルタ
 * @param {Float32Array} samples
 * @param {number} cutoffHz
 * @returns {Float32Array}
 */
function lowpass(samples, cutoffHz) {
  const dt = 1 / SR;
  const RC = 1 / (2 * Math.PI * cutoffHz);
  const alpha = dt / (RC + dt);
  const out = new Float32Array(samples.length);
  let prev = 0;
  for (let i = 0; i < samples.length; i++) {
    prev = prev + alpha * (samples[i] - prev);
    out[i] = prev;
  }
  return out;
}

/**
 * サンプル生成: dur秒ぶん fn(t, i) を呼び出して Float32Array を返す
 * @param {number} dur - 秒
 * @param {(t:number, i:number)=>number} fn
 * @returns {Float32Array}
 */
function render(dur, fn) {
  const len = Math.ceil(SR * dur);
  const buf = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    buf[i] = fn(i / SR, i);
  }
  return buf;
}

/**
 * 複数バッファの加算合成（短い方は0埋め）
 * @param {...Float32Array} buffers
 * @returns {Float32Array}
 */
function mix(...buffers) {
  const len = Math.max(...buffers.map((b) => b.length));
  const out = new Float32Array(len);
  for (const buf of buffers) {
    for (let i = 0; i < buf.length; i++) {
      out[i] += buf[i];
    }
  }
  return out;
}

/**
 * dest（Float32）の startSec*SR サンプル目以降に src を加算合成する。
 * 異なる開始時刻のパーツを1つのバッファへ重ねるために使う。
 * dest をはみ出す分は切り捨て。
 * @param {Float32Array} dest
 * @param {Float32Array} src
 * @param {number} startSec
 */
function placeAt(dest, src, startSec) {
  const start = Math.round(startSec * SR);
  for (let i = 0; i < src.length; i++) {
    const di = start + i;
    if (di < 0 || di >= dest.length) continue;
    dest[di] += src[i];
  }
}

/**
 * 正規化（ピーク -3dBFS = 0.707）＋先頭2ms フェードイン／末尾8ms フェードアウト
 * @param {Float32Array} samples
 * @returns {Float32Array}
 */
function normalizeAndFade(samples) {
  // ピーク検出
  let peak = 0;
  for (let i = 0; i < samples.length; i++) {
    const abs = Math.abs(samples[i]);
    if (abs > peak) peak = abs;
  }
  const target = 0.707; // -3dBFS
  const gain = peak > 0 ? target / peak : 1.0;

  const fadeInSamples = Math.ceil(SR * 0.002); // 2ms
  const fadeOutSamples = Math.ceil(SR * 0.008); // 8ms
  const out = new Float32Array(samples.length);

  for (let i = 0; i < samples.length; i++) {
    let fadeGain = 1.0;
    if (i < fadeInSamples) {
      fadeGain = i / fadeInSamples;
    } else if (i >= samples.length - fadeOutSamples) {
      fadeGain = (samples.length - 1 - i) / fadeOutSamples;
    }
    out[i] = samples[i] * gain * fadeGain;
  }
  return out;
}

/**
 * 16bit PCM WAV ファイルを書き出す
 * @param {string} path
 * @param {Float32Array} samples
 */
function writeWav(path, samples) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = SR * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataLen = samples.length * blockAlign;
  const headerLen = 44;
  const totalLen = headerLen + dataLen;

  const buf = Buffer.alloc(totalLen);
  let offset = 0;

  // RIFF chunk
  buf.write('RIFF', offset);
  offset += 4;
  buf.writeUInt32LE(totalLen - 8, offset);
  offset += 4;
  buf.write('WAVE', offset);
  offset += 4;

  // fmt chunk
  buf.write('fmt ', offset);
  offset += 4;
  buf.writeUInt32LE(16, offset);
  offset += 4; // chunk size
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

  // data chunk
  buf.write('data', offset);
  offset += 4;
  buf.writeUInt32LE(dataLen, offset);
  offset += 4;

  // PCM data（クリッピング付き）
  for (let i = 0; i < samples.length; i++) {
    const clamped = Math.max(-1.0, Math.min(1.0, samples[i]));
    const val = Math.round(clamped * 32767);
    buf.writeInt16LE(val, offset);
    offset += 2;
  }

  writeFileSync(path, buf);
}

// ────────────────────────────────────────────
// SE レシピ定義（26種）
// ────────────────────────────────────────────

const SFX_RECIPES = {
  // ──── UI ────

  /** cursor: カーソル移動 40ms, square 880Hz */
  cursor: () => {
    const dur = 0.04;
    return render(dur, (t) => {
      const e = env(t, dur, { attack: 0.002, release: 0.03 });
      return osc('square', 880, t) * e * 0.6;
    });
  },

  /** decide: 決定 90ms, square 660→990Hz の2音（45msずつ） */
  decide: () => {
    const dur = 0.09;
    return render(dur, (t) => {
      const freq = t < 0.045 ? 660 : 990;
      const e = env(t, dur, { attack: 0.002, release: 0.02 });
      return osc('square', freq, t) * e * 0.6;
    });
  },

  /** cancel: キャンセル 90ms, square 520→390Hz の下降 */
  cancel: () => {
    const dur = 0.09;
    return render(dur, (t) => {
      const freq = t < 0.045 ? 520 : 390;
      const e = env(t, dur, { attack: 0.002, release: 0.02 });
      return osc('square', freq, t) * e * 0.55;
    });
  },

  /** error: エラー 160ms, square 160Hz＋デチューン */
  error: () => {
    const dur = 0.16;
    return render(dur, (t) => {
      const e = env(t, dur, { attack: 0.003, release: 0.04 });
      // デチューン: 160Hz + 163Hz の2音で唸り
      const sig = (osc('square', 160, t) + osc('square', 163, t)) * 0.5;
      return sig * e * 0.7;
    });
  },

  // ──── 戦闘 ────

  /**
   * encounter: 戦闘突入（緊張のスティング, ~600ms）。重め。
   *   飽和した低音スタブ（~150Hz, triangle＋saw 倍音）を3連（0/130/260ms）で迫らせ、
   *   裏でノイズのスウェル（lowpassで丸めた太いノイズ）を時間とともに音量上昇、
   *   最後（~400ms）にドスッと一撃（低音スタブ＋太いノイズの飽和ヒット）。
   *   「敵が現れた」緊迫感。全体を saturate(…,1.4) で厚く一体化。
   */
  encounter: () => {
    const dur = 0.6;
    // ── 低音スタブ3連（0/130/260ms） 150Hz中心、迫る ──
    const stab = (startSec, amp) =>
      render(0.1, (t) => {
        const e = env(t, 0.1, { attack: 0.003, release: 0.05 });
        const decay = Math.exp(-t / 0.05);
        // triangle 主体＋saw 倍音で厚み（純square のチープさ回避）
        const s = osc('triangle', 150, t) * 0.7 + osc('saw', 300, t) * 0.3;
        return s * e * decay * amp;
      });
    const buf = new Float32Array(Math.ceil(SR * dur));
    placeAt(buf, stab(0, 0.6), 0.0);
    placeAt(buf, stab(0.13, 0.75), 0.13);
    placeAt(buf, stab(0.26, 0.9), 0.26);
    // ── ノイズのスウェル（裏で上昇） 太いノイズを丸め、振幅を 0→1 へ ──
    const swellSrc = thickNoise(dur, 2200, 0.7);
    const swell = new Float32Array(swellSrc.length);
    for (let i = 0; i < swellSrc.length; i++) {
      const t = i / SR;
      // ~420ms へ向け増大、その後減衰
      const rise = Math.min(1, t / 0.42);
      const e = env(t, dur, { attack: 0.01, release: 0.12 });
      swell[i] = swellSrc[i] * rise * rise * e * 0.45;
    }
    placeAt(buf, swell, 0);
    // ── 最後の一撃（~400ms）: 低音スタブ＋飽和した太いノイズのドスッ ──
    const finalCore = lowCore({
      dur: 0.18,
      f0: 180,
      f1: 55,
      fallDur: 0.05,
      release: 0.13,
      amp: 0.95,
      wave: 'triangle',
    });
    const finalSlash = slashNoise({
      dur: 0.18,
      f0: 4500,
      f1: 500,
      release: 0.14,
      drive: 5,
      gain: 1.6,
      roundMix: 0.7,
    });
    const finalMix = mix(finalCore, finalSlash);
    const finalHit = new Float32Array(finalMix.length);
    for (let i = 0; i < finalMix.length; i++) finalHit[i] = saturate(finalMix[i], 1.5);
    placeAt(buf, finalHit, 0.4);
    // 全体を軽く飽和させ一体感と厚み
    const out = new Float32Array(buf.length);
    for (let i = 0; i < buf.length; i++) out[i] = saturate(buf[i], 1.4);
    return out;
  },

  /**
   * attack: 味方の攻撃が命中（重い一撃）= ズシャ系 zusha_c を本採用。約220ms。
   *   低音の芯「ズ」triangle 110→45Hz（amp0.85, release ~130ms）＋
   *   密度高い太いノイズ「シャ」を短め・飽和強め（drive5）。
   *   ミックス全体を saturate(…,1.5) で一体化。これが「味方の重い一撃」。
   *   敵の damage より聴感ではっきり高い（芯 110→45Hz / ノイズ 6000→650Hz）。
   */
  attack: () => {
    const dur = 0.22;
    const core = lowCore({
      dur,
      f0: 110,
      f1: 45,
      fallDur: 0.05,
      release: 0.13,
      amp: 0.85,
      wave: 'triangle',
    });
    const slash = slashNoise({
      dur,
      f0: 6000,
      f1: 650,
      release: 0.15,
      drive: 5,
      gain: 1.7,
      roundMix: 0.65,
    });
    const edge = metalEdge({ freq: 1600, detune: 1.01, len: 0.035, amp: 0.09 });
    const mixed = mix(core, slash, edge);
    const out = new Float32Array(mixed.length);
    for (let i = 0; i < mixed.length; i++) out[i] = saturate(mixed[i], 1.5);
    return out;
  },

  /**
   * critical: 味方の会心（本採用＝critical_metal1 と同一内容）。全体 ~770ms。
   *   前半に「キラーン」FM金属シマー（kiraanMetal1: キャリア1600→3600Hz, モジュレータ=キャリア×1.47,
   *     変調指数4→6, 非調和ベルきらめき）を置き、後半に「ズシャシャシャ」4連（placeComboBSlashes:
   *     zushaHit×4, t≈220/315/410/505ms, ピッチ/振幅クレッシェンド, 4発目最大＋金属リング）を重ねる。
   *   = 通常攻撃「ズシャ！」に対し、会心は「キラーン！ズシャシャシャ！」の特別な連撃。
   */
  critical: () => {
    const total = 0.77;
    const buf = new Float32Array(Math.ceil(SR * total));
    placeAt(buf, kiraanMetal1(), 0);
    placeComboBSlashes(buf);
    return buf;
  },

  /**
   * damage: 敵の攻撃が味方に命中（被弾）= 敵用に低く暗く鈍い。約250ms。
   *   低音の芯を味方より明確に低く: triangle 80→34Hz（amp0.9, release ~150ms＝長め＝重い被弾）。
   *   斬撃ノイズは暗め: スイープ上端を下げ 4000→400Hz、roundMix高め＋ローパス強めで
   *   高域のきらめきを減らし、飽和 drive6 でザラついた鈍さ。release ~180ms。
   *   金属エッジは入れない（敵＝鈍器的・暗い）。attack より聴感ではっきり低く重い。
   */
  damage: () => {
    const dur = 0.25;
    const core = lowCore({
      dur,
      f0: 80,
      f1: 34,
      fallDur: 0.05,
      release: 0.15,
      amp: 0.9,
      wave: 'triangle',
    });
    const slash = slashNoise({
      dur,
      f0: 4000,
      f1: 400,
      release: 0.18,
      drive: 6,
      gain: 1.6,
      roundMix: 0.75,
    });
    // 高域のきらめきを減らすローパス（暗く鈍く）
    const slashDark = lowpass(slash, 2200);
    const mixed = mix(core, slashDark);
    const out = new Float32Array(mixed.length);
    for (let i = 0; i < mixed.length; i++) out[i] = saturate(mixed[i], 1.5);
    return out;
  },

  /**
   * down: 戦闘不能（重い崩落, ~450ms）。zusha 同様の重量感。
   *   低音の芯を 200→40Hz へ exp 下降（triangle＋saw 倍音で厚く, release長め）。
   *   胴の thump（80Hz sine の鈍い余韻）を薄く重ね、薄い下降ノイズ（lowpassで丸め, 下降スイープ）。
   *   最後（~330ms）にドスッと落ちる飽和ヒット。全体を saturate(…,1.4) で厚く。
   */
  down: () => {
    const dur = 0.45;
    // ── 低音の芯 200→40Hz exp 下降 ──
    const core = render(dur, (t) => {
      const freq = sweep(t, dur, 200, 40, 'exp');
      const e = env(t, dur, { attack: 0.005, release: 0.13 });
      const decay = Math.exp(-t / 0.32);
      const s = osc('triangle', freq, t) * 0.75 + osc('saw', freq, t) * 0.25;
      return s * e * decay * 0.85;
    });
    // ── 胴の thump（鈍い低音の余韻） ──
    const thump = render(dur, (t) => {
      const e = env(t, dur, { attack: 0.002, release: 0.15 });
      const decay = Math.exp(-t / 0.18);
      return osc('sine', 80, t) * e * decay * 0.5;
    });
    // ── 薄い下降ノイズ（丸めて暗く） ──
    const noiseSrc = thickNoise(dur, 1200, 0.8);
    const ndesc = new Float32Array(noiseSrc.length);
    {
      let lpState = 0;
      const dt = 1 / SR;
      for (let i = 0; i < noiseSrc.length; i++) {
        const t = i / SR;
        const cutoff = sweep(t, dur, 1800, 250, 'exp');
        const RC = 1 / (2 * Math.PI * cutoff);
        const alpha = dt / (RC + dt);
        lpState = lpState + alpha * (noiseSrc[i] - lpState);
        const e = env(t, dur, { attack: 0.01, release: 0.15 });
        ndesc[i] = lpState * e * 0.3;
      }
    }
    const buf = new Float32Array(Math.ceil(SR * dur));
    placeAt(buf, core, 0);
    placeAt(buf, thump, 0);
    placeAt(buf, ndesc, 0);
    // ── 最後のドスッ（~330ms）落下ヒット ──
    const landCore = lowCore({
      dur: 0.12,
      f0: 120,
      f1: 38,
      fallDur: 0.04,
      release: 0.09,
      amp: 0.9,
      wave: 'triangle',
    });
    const landSlash = slashNoise({
      dur: 0.12,
      f0: 3000,
      f1: 350,
      release: 0.1,
      drive: 6,
      gain: 1.5,
      roundMix: 0.78,
    });
    const landMix = mix(landCore, landSlash);
    const land = new Float32Array(landMix.length);
    for (let i = 0; i < landMix.length; i++) land[i] = saturate(landMix[i], 1.5);
    placeAt(buf, land, 0.33);
    const out = new Float32Array(buf.length);
    for (let i = 0; i < buf.length; i++) out[i] = saturate(buf[i], 1.4);
    return out;
  },

  /**
   * heal: 回復（温かい上昇きらめき, ~450ms）。耳に痛くしない。
   *   triangle/sine の上行アルペジオ C5-E5-G5-C6 を、各音わずかにデチューン重ね（±0.4%）で厚み。
   *   柔らかいシマー（高域 sine 倍音を控えめ＋ゆるいトレモロ）と、最後の C6 を伸ばす優しい余韻。
   *   飽和は使わず（温かさ優先）、振幅控えめでまろやかに。
   */
  heal: () => {
    const dur = 0.45;
    const notes = [
      { f: 523, start: 0.0, len: 0.12 }, // C5
      { f: 659, start: 0.1, len: 0.12 }, // E5
      { f: 784, start: 0.2, len: 0.12 }, // G5
      { f: 1046, start: 0.3, len: 0.15 }, // C6（伸ばす）
    ];
    return render(dur, (t) => {
      let sig = 0;
      for (const n of notes) {
        const nt = t - n.start;
        if (nt < 0 || nt >= n.len) continue;
        const e = env(nt, n.len, { attack: 0.008, release: 0.07 });
        const decay = Math.exp(-nt / (n.len * 0.9));
        // デチューン重ね（厚み）: triangle 基音 ±0.4%、sine 倍音は柔らかいシマー
        const body =
          osc('triangle', n.f, t) * 0.5 +
          osc('triangle', n.f * 1.004, t) * 0.3 +
          osc('triangle', n.f * 0.996, t) * 0.2;
        // 柔らかいシマー（オクターブ上 sine を控えめ＋ゆるいトレモロ）
        const trem = 1 - 0.08 * (0.5 - 0.5 * Math.cos(2 * Math.PI * 6 * t));
        const shimmer = osc('sine', n.f * 2, t) * 0.16 * trem;
        sig += (body * 0.6 + shimmer) * e * decay;
      }
      return sig * 0.85;
    });
  },

  /**
   * buff: バフ/強化（上昇するシマー＆パワーアップ, ~400ms）。
   *   倍音豊かな上行スイープ（saw＋triangle で 330→990Hz, ±2% ビブラート）に、
   *   上方へ駆け上がるきらめき（高域 sine 倍音を時間とともに音量増）を重ね、自信ある上昇感。
   *   軽い飽和 saturate(…,1.6) で厚く（チープな単音を避ける）。最後に軽く伸ばす。
   */
  buff: () => {
    const dur = 0.4;
    const body = render(dur, (t) => {
      const freq = sweep(t, dur, 330, 990, 'exp');
      const vib = 1 + 0.02 * Math.sin(2 * Math.PI * 5.5 * t);
      const e = env(t, dur, { attack: 0.012, release: 0.1 });
      // saw＋triangle で倍音豊かに
      const s = osc('saw', freq * vib, t) * 0.5 + osc('triangle', freq * vib, t) * 0.5;
      return s * e * 0.6;
    });
    // 上方へ駆け上がるきらめき（オクターブ上 sine, 後半で増大）
    const sparkle = render(dur, (t) => {
      const freq = sweep(t, dur, 660, 1980, 'exp');
      const rise = Math.min(1, t / dur);
      const e = env(t, dur, { attack: 0.02, release: 0.1 });
      return osc('sine', freq, t) * e * rise * 0.22;
    });
    const mixed = mix(body, sparkle);
    const out = new Float32Array(mixed.length);
    for (let i = 0; i < mixed.length; i++) out[i] = saturate(mixed[i], 1.6);
    return out;
  },

  /**
   * debuff: デバフ/状態異常（淀んだ下降, ~400ms）。不吉だが damage ほど重くない。
   *   下降スイープ（saw 760→260Hz）に、デチューンの濁り（±3% の2本でうなり）を重ね、
   *   僅かなグリット（暗く丸めた太いノイズ）を薄く。全体を saturate(…,2) で淀ませる。
   */
  debuff: () => {
    const dur = 0.4;
    const body = render(dur, (t) => {
      const freq = sweep(t, dur, 760, 260, 'exp');
      const e = env(t, dur, { attack: 0.006, release: 0.1 });
      const decay = Math.exp(-t / 0.3);
      // デチューンの濁り（±3% でうなり＝不吉）
      const s =
        osc('saw', freq, t) * 0.45 +
        osc('saw', freq * 1.03, t) * 0.3 +
        osc('triangle', freq * 0.97, t) * 0.25;
      return s * e * decay * 0.6;
    });
    // 僅かなグリット（暗く丸めたノイズ, 下降と共に減衰）
    const gritSrc = thickNoise(dur, 1000, 0.8);
    const grit = new Float32Array(gritSrc.length);
    for (let i = 0; i < gritSrc.length; i++) {
      const t = i / SR;
      const e = env(t, dur, { attack: 0.01, release: 0.1 });
      const decay = Math.exp(-t / 0.22);
      grit[i] = gritSrc[i] * e * decay * 0.18;
    }
    const mixed = mix(body, grit);
    const out = new Float32Array(mixed.length);
    for (let i = 0; i < mixed.length; i++) out[i] = saturate(mixed[i], 2);
    return out;
  },

  /**
   * skill: スキル/魔法発動（魔法のチャージ＆解放, ~380ms）。魔法的で厚みあり。
   *   FM 的なシュワ（kiraanMetal1 と同じ位相積分FM, モジュレータ=キャリア×1.41 非整数比）を
   *     キャリア 400→1000Hz で上昇＝チャージ → ~230ms で解放（変調指数を絞り音色がほどける）。
   *   解放後にシマー（高域 sine 倍音＋ゆるいトレモロ）を重ね、軽い飽和 saturate(…,1.5) で厚く。
   */
  skill: () => {
    const dur = 0.38;
    const releaseT = 0.23; // チャージ→解放の境
    let carrierPhase = 0;
    let modPhase = 0;
    const dt = 1 / SR;
    const fm = render(dur, (t) => {
      // チャージ中: 400→1000Hz 上昇、解放後は 1000Hz 維持
      const carrierFreq = t < releaseT ? sweep(t, releaseT, 400, 1000, 'exp') : 1000;
      const modFreq = carrierFreq * 1.41; // 非整数比＝魔法的なシュワ
      // 変調指数: チャージ中は高く(5)→解放で絞る(→1.5)＝音色がほどける
      const modIndex =
        t < releaseT ? 3 + 2 * (t / releaseT) : Math.max(1.5, 5 - 8 * (t - releaseT));
      carrierPhase += carrierFreq * dt;
      modPhase += modFreq * dt;
      const mod = Math.sin(2 * Math.PI * modPhase);
      const s = Math.sin(2 * Math.PI * carrierPhase + modIndex * mod);
      // チャージで音量上昇→解放でピーク→減衰
      const swell = t < releaseT ? 0.5 + 0.5 * (t / releaseT) : 1;
      const e = env(t, dur, { attack: 0.008, release: 0.1 });
      const decay = t < releaseT ? 1 : Math.exp(-(t - releaseT) / 0.13);
      return s * e * swell * decay * 0.55;
    });
    // 解放後のシマー
    const shimmer = render(dur, (t) => {
      if (t < releaseT) return 0;
      const st = t - releaseT;
      const e = env(st, dur - releaseT, { attack: 0.004, release: 0.08 });
      const decay = Math.exp(-st / 0.1);
      const trem = 1 - 0.15 * (0.5 - 0.5 * Math.cos(2 * Math.PI * 28 * t));
      return (osc('sine', 2000, t) * 0.6 + osc('sine', 3000, t) * 0.4) * e * decay * trem * 0.18;
    });
    const mixed = mix(fm, shimmer);
    const out = new Float32Array(mixed.length);
    for (let i = 0; i < mixed.length; i++) out[i] = saturate(mixed[i], 1.5);
    return out;
  },

  /**
   * flee: 逃走成功（足音のみ・逃げ去る, ~500ms）= flee_a を本採用。
   *   6歩の足音を配置（最後の2歩はやや間隔を詰め加速感）:
   *     t≈0/85/170/255/335/410ms。
   *   centerHz を左右交互に: 2300/1900/2300/1900/2300/1900Hz。
   *   振幅を後半ほど小さく（1.0/0.95/0.9/0.8/0.68/0.55）＝遠ざかる/逃げ去る感。
   *   サッサッサッ…と分離して聞こえる（くっつき過ぎない）。footstep ヘルパを流用。
   */
  flee: () => {
    const total = 0.5;
    const buf = new Float32Array(Math.ceil(SR * total));
    // [開始秒, centerHz, 振幅]。最後の2歩は間隔を詰め加速感（255→335→410ms）。
    const steps = [
      [0.0, 2300, 1.0],
      [0.085, 1900, 0.95],
      [0.17, 2300, 0.9],
      [0.255, 1900, 0.8],
      [0.335, 2300, 0.68],
      [0.41, 1900, 0.55],
    ];
    for (const [start, centerHz, amp] of steps) {
      placeAt(buf, footstep({ centerHz, amp }), start);
    }
    return buf;
  },

  /**
   * victory: 勝利ファンファーレ（凱旋, ~1200ms）。明るく祝祭的だが薄くしない。
   *   複数声部: square リード旋律＋3度/5度ハモリ（各音に同時発音）で短い旋律
   *     G5-C6-E6-G6 を駆け上がり、最後に C メジャー和音（C6/E6/G6/C7）を長く伸ばす。
   *   軽い飽和 saturate(…,1.6) で温かく充実（純square の細さを避け厚み）。
   *   各声部に triangle を薄く混ぜまろやかに。
   */
  victory: () => {
    const dur = 1.2;
    // リード旋律（ファンファーレの駆け上がり）。各音にハモリ（×1.26≈長3度, ×1.5=完全5度）。
    const lead = [
      { f: 784, start: 0.0, len: 0.16 }, // G5
      { f: 1046, start: 0.16, len: 0.16 }, // C6
      { f: 1319, start: 0.32, len: 0.16 }, // E6
      { f: 1568, start: 0.48, len: 0.2 }, // G6
    ];
    // 最後に伸ばす C メジャー和音
    const finalChord = [1046, 1319, 1568, 2093]; // C6, E6, G6, C7
    const voice = (f, t) => osc('square', f, t) * 0.6 + osc('triangle', f, t) * 0.4;
    const raw = render(dur, (t) => {
      let sig = 0;
      for (const n of lead) {
        const nt = t - n.start;
        if (nt >= 0 && nt < n.len) {
          const e = env(nt, n.len, { attack: 0.004, release: 0.05 });
          // リード＋3度＋5度ハモリ
          sig += voice(n.f, t) * e * 0.32;
          sig += voice(n.f * 1.26, t) * e * 0.16;
          sig += voice(n.f * 1.5, t) * e * 0.13;
        }
      }
      // 最後の和音（~640ms から長く伸ばす）
      if (t >= 0.64) {
        const ct = t - 0.64;
        const cdur = dur - 0.64;
        const e = env(ct, cdur, { attack: 0.012, release: 0.18 });
        const decay = 0.6 + 0.4 * Math.exp(-ct / 0.5);
        for (const f of finalChord) {
          sig += voice(f, t) * e * decay * 0.16;
        }
      }
      return sig;
    });
    const out = new Float32Array(raw.length);
    for (let i = 0; i < raw.length; i++) out[i] = saturate(raw[i], 1.6);
    return out;
  },

  /**
   * defeat: 敗北（もの悲しい下降, ~1200ms）。重く沈む。
   *   ゆっくりした短調の下降旋律 A4-F4-D4-A3（triangle＋saw 倍音で厚く, デチューン重ね）に、
   *   低いドローン（A2=110Hz の sine＋僅かな5度, 全体に持続）を敷き、最後の A3 を長く沈ませる。
   *   軽い飽和 saturate(…,1.4) で厚みと沈鬱さ。
   */
  defeat: () => {
    const dur = 1.2;
    // 短調の下降旋律（A4-F4-D4-A3）
    const notes = [
      { f: 440, start: 0.0, len: 0.28 }, // A4
      { f: 349, start: 0.28, len: 0.28 }, // F4
      { f: 294, start: 0.56, len: 0.28 }, // D4
      { f: 220, start: 0.84, len: 0.36 }, // A3（長く沈める）
    ];
    const melody = render(dur, (t) => {
      let sig = 0;
      for (const n of notes) {
        const nt = t - n.start;
        if (nt >= 0 && nt < n.len) {
          const e = env(nt, n.len, { attack: 0.012, release: 0.08 });
          const decay = Math.exp(-nt / (n.len * 0.85));
          // triangle 主体＋saw 倍音、わずかデチューンで沈んだ厚み
          const s =
            osc('triangle', n.f, t) * 0.55 +
            osc('triangle', n.f * 0.994, t) * 0.25 +
            osc('saw', n.f, t) * 0.2;
          sig += s * e * decay * 0.65;
        }
      }
      return sig;
    });
    // 低いドローン（A2=110Hz＋5度, 持続して沈む）
    const drone = render(dur, (t) => {
      const e = env(t, dur, { attack: 0.03, release: 0.2 });
      const decay = 0.7 + 0.3 * Math.exp(-t / 0.9);
      return (osc('sine', 110, t) * 0.7 + osc('sine', 165, t) * 0.3) * e * decay * 0.4;
    });
    const mixed = mix(melody, drone);
    const out = new Float32Array(mixed.length);
    for (let i = 0; i < mixed.length; i++) out[i] = saturate(mixed[i], 1.4);
    return out;
  },

  /**
   * levelup: レベルアップ（明るい上行アルペジオ＋きらめきの祝福ディン, ~800ms）。豊かで嬉しい上昇。
   *   上行アルペジオ C5-E5-G5-C6-E6（square＋triangle で厚く、各音に5度ハモリ薄く）を駆け上がり、
   *   末尾に祝福のディン（C メジャー和音 C6/E6/G6 を伸ばす）＋高域きらめき2粒。
   *   軽い飽和 saturate(…,1.5) で充実感（チープな単音を避ける）。
   */
  levelup: () => {
    const dur = 0.8;
    const notes = [
      { f: 523, start: 0.0, len: 0.11 }, // C5
      { f: 659, start: 0.1, len: 0.11 }, // E5
      { f: 784, start: 0.2, len: 0.11 }, // G5
      { f: 1046, start: 0.3, len: 0.11 }, // C6
      { f: 1319, start: 0.4, len: 0.18 }, // E6
    ];
    const dinChord = [1046, 1319, 1568]; // C6, E6, G6（祝福ディン）
    const twinkles = [
      { f: 2093, start: 0.5, len: 0.04 }, // C7
      { f: 2637, start: 0.6, len: 0.05 }, // E7
    ];
    const voice = (f, t) => osc('square', f, t) * 0.55 + osc('triangle', f, t) * 0.45;
    const raw = render(dur, (t) => {
      let sig = 0;
      for (const n of notes) {
        const nt = t - n.start;
        if (nt >= 0 && nt < n.len) {
          const e = env(nt, n.len, { attack: 0.003, release: 0.05 });
          sig += voice(n.f, t) * e * 0.36;
          sig += voice(n.f * 1.5, t) * e * 0.12; // 5度ハモリ薄く
          sig += osc('sine', n.f * 2, t) * e * 0.12; // きらめき倍音
        }
      }
      // 祝福ディン（~480ms から和音を伸ばす）
      if (t >= 0.48) {
        const ct = t - 0.48;
        const cdur = dur - 0.48;
        const e = env(ct, cdur, { attack: 0.008, release: 0.14 });
        const decay = 0.55 + 0.45 * Math.exp(-ct / 0.28);
        for (const f of dinChord) {
          sig += voice(f, t) * e * decay * 0.13;
        }
      }
      // 高域きらめき2粒
      for (const tw of twinkles) {
        const tt = t - tw.start;
        if (tt >= 0 && tt < tw.len) {
          const e = env(tt, tw.len, { attack: 0.001, release: tw.len * 0.8 });
          const decay = Math.exp(-tt / (tw.len * 0.6));
          sig += osc('sine', tw.f, t) * e * decay * 0.16;
        }
      }
      return sig;
    });
    const out = new Float32Array(raw.length);
    for (let i = 0; i < raw.length; i++) out[i] = saturate(raw[i], 1.5);
    return out;
  },

  // ──── 町・店・鍛冶・ギルド・探索 ────

  /** coin: 購入/売却 220ms, sine 高音2連チャリン */
  coin: () => {
    const dur = 0.22;
    // 1568Hz (G6), 2093Hz (C7) — 少し間を開けて2連
    return render(dur, (t) => {
      let sig = 0;
      // 1音目
      const t1 = t;
      if (t1 < 0.1) {
        const e = env(t1, 0.1, { attack: 0.001, release: 0.07 });
        sig += osc('sine', 1568, t) * e * 0.6;
      }
      // 2音目
      const t2 = t - 0.1;
      if (t2 >= 0 && t2 < 0.12) {
        const e = env(t2, 0.12, { attack: 0.001, release: 0.09 });
        sig += osc('sine', 2093, t) * e * 0.6;
      }
      return sig;
    });
  },

  /** forge: 強化/鍛冶 260ms, 金属クランク noise×2＋square 800Hz */
  forge: () => {
    const dur = 0.26;
    // カンッ×2
    const hits = [0.0, 0.12];
    return render(dur, (t) => {
      let sig = 0;
      for (const ht of hits) {
        const lt = t - ht;
        if (lt >= 0 && lt < 0.1) {
          const e = env(lt, 0.1, { attack: 0.001, release: 0.06 });
          sig += noise() * e * 0.5;
          sig += osc('square', 800, t) * e * 0.3;
          // 倍音
          sig += osc('square', 1600, t) * e * 0.15;
        }
      }
      return sig;
    });
  },

  /** recycle: リサイクル/分解 240ms, やや鈍い金属＋下降 */
  recycle: () => {
    const dur = 0.24;
    const metalNoise = render(dur, (t) => {
      const e = env(t, dur, { attack: 0.002, release: 0.1 });
      return noise() * e * 0.55;
    });
    const filtered = lowpass(metalNoise, 2500);
    const descend = render(dur, (t) => {
      const freq = sweep(t, dur, 600, 300, 'exp');
      const e = env(t, dur, { attack: 0.003, release: 0.1 });
      return osc('square', freq, t) * e * 0.35;
    });
    return mix(filtered, descend);
  },

  /** item: アイテム入手 300ms, sine 上行3音 784-1046-1568Hz */
  item: () => {
    const dur = 0.3;
    const freqs = [784, 1046, 1568];
    const noteLen = dur / freqs.length;
    return render(dur, (t) => {
      const noteIdx = Math.min(Math.floor(t / noteLen), freqs.length - 1);
      const freq = freqs[noteIdx];
      const nt = t - noteIdx * noteLen;
      const e = env(nt, noteLen, { attack: 0.003, release: 0.05 });
      return osc('sine', freq, t) * e * 0.7;
    });
  },

  /** cook: 調理完了 300ms, triangle 2音 660-880Hz ＋余韻 */
  cook: () => {
    const dur = 0.3;
    return render(dur, (t) => {
      let sig = 0;
      // 1音目
      if (t < 0.14) {
        const e = env(t, 0.14, { attack: 0.005, release: 0.06 });
        sig += osc('triangle', 660, t) * e * 0.6;
      }
      // 2音目
      const t2 = t - 0.14;
      if (t2 >= 0) {
        const e = env(t2, 0.16, { attack: 0.005, release: 0.08 });
        sig += osc('triangle', 880, t) * e * 0.6;
        // 余韻：sine 倍音
        sig += osc('sine', 880 * 2, t) * e * 0.15;
      }
      return sig;
    });
  },

  /** create: キャラ作成/スキル習得 500ms, ジングル G4-C5-E5＋きらめき */
  create: () => {
    const dur = 0.5;
    // G4=392, C5=523, E5=659
    const notes = [
      { f: 392, start: 0.0, len: 0.15 },
      { f: 523, start: 0.15, len: 0.15 },
      { f: 659, start: 0.3, len: 0.2 },
    ];
    return render(dur, (t) => {
      let sig = 0;
      for (const note of notes) {
        const nt = t - note.start;
        if (nt >= 0 && nt < note.len) {
          const e = env(nt, note.len, { attack: 0.005, release: 0.05 });
          sig += osc('triangle', note.f, t) * e * 0.5;
          // きらめき
          sig += osc('sine', note.f * 2, t) * e * 0.2;
        }
      }
      // 後半きらめき
      if (t >= 0.35) {
        const st = t - 0.35;
        const se = env(st, 0.15, { attack: 0.01, release: 0.08 });
        sig += osc('sine', 1568, t) * se * 0.15;
        sig += osc('sine', 2093, t) * se * 0.1;
      }
      return sig;
    });
  },

  /** dive: ダイブ 350ms, saw 600→200Hz 柔らか下降 whoosh */
  dive: () => {
    const dur = 0.35;
    const sawPart = render(dur, (t) => {
      const freq = sweep(t, dur, 600, 200, 'exp');
      const e = env(t, dur, { attack: 0.01, release: 0.1 });
      return osc('saw', freq, t) * e * 0.5;
    });
    // 空気感ノイズ
    const air = render(dur, (t) => {
      const e = env(t, dur, { attack: 0.02, release: 0.15 });
      return noise() * e * 0.2;
    });
    const airFiltered = lowpass(air, 800);
    return mix(sawPart, airFiltered);
  },

  /** warp: ワープ 450ms, sine 300→1200Hz ビブラート */
  warp: () => {
    const dur = 0.45;
    return render(dur, (t) => {
      const baseFreq = sweep(t, dur, 300, 1200, 'exp');
      // ビブラート: 8Hz、深さが時間とともに増加
      const vibratoDepth = 0.04 * (t / dur);
      const vibrato = 1 + vibratoDepth * Math.sin(2 * Math.PI * 8 * t);
      const e = env(t, dur, { attack: 0.01, release: 0.1 });
      // sine + 倍音でリッチに
      const sig =
        osc('sine', baseFreq * vibrato, t) * 0.6 + osc('sine', baseFreq * vibrato * 2, t) * 0.2;
      return sig * e;
    });
  },

  /** save: セーブ 300ms, sine 784＋1046Hz の和音チャイム */
  save: () => {
    const dur = 0.3;
    return render(dur, (t) => {
      const e = env(t, dur, { attack: 0.005, release: 0.12 });
      // 和音: 784 (G5) + 1046 (C6)
      return (osc('sine', 784, t) * 0.5 + osc('sine', 1046, t) * 0.5) * e;
    });
  },
};

/**
 * 太いノイズを時変バンドパス気味に通して飽和させる斬撃ノイズ生成ヘルパ。
 *   バンドパス ≒ ローパス(時変cutoff) - ローパス(cutoff*0.25) を近似（簡易BPF）。
 *   centerHz を f0→f1 へ exp 下降スイープ。release で減衰、saturate で厚み・ザラつき。
 * @param {object} o
 * @param {number} o.dur - 秒
 * @param {number} o.f0 - スイープ開始中心周波数（高域）
 * @param {number} o.f1 - スイープ終了中心周波数（低域寄り）
 * @param {number} o.release - リリース秒
 * @param {number} o.drive - 飽和ドライブ
 * @param {number} o.gain - 飽和前ゲイン
 * @param {number} o.roundMix - 太いノイズの丸め混合比
 * @returns {Float32Array}
 */
function slashNoise({ dur, f0, f1, release, drive, gain, roundMix = 0.55 }) {
  const len = Math.ceil(SR * dur);
  // 太いノイズ素材（白＋丸め）
  const src = thickNoise(dur, 4000, roundMix);
  const out = new Float32Array(len);
  // 2本の1次ローパス状態（低カット側と高カット側）でバンドパス近似
  let lpHi = 0; // cutoff = center
  let lpLo = 0; // cutoff = center * 0.25（この成分を引いて低域を除く）
  const dt = 1 / SR;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const center = sweep(t, dur, f0, f1, 'exp');
    const cutHi = center;
    const cutLo = Math.max(120, center * 0.25);
    const aHi = dt / (1 / (2 * Math.PI * cutHi) + dt);
    const aLo = dt / (1 / (2 * Math.PI * cutLo) + dt);
    lpHi = lpHi + aHi * (src[i] - lpHi);
    lpLo = lpLo + aLo * (src[i] - lpLo);
    const band = lpHi - lpLo; // バンドパス近似
    const e = env(t, dur, { attack: 0.002, release });
    out[i] = saturate(band * gain, drive) * e;
  }
  return out;
}

/**
 * 重い低音の芯「ズ」。sine/triangle を f0→f1 へ exp 下降し、release で速やかに減衰。
 * 150〜250Hz帯の長い残響を残さない（胴鳴り回避）。先頭に瞬間的アタックピーク。
 * @param {object} o
 * @param {number} o.dur - 秒
 * @param {number} o.f0 - 開始周波数
 * @param {number} o.f1 - 終了周波数
 * @param {number} o.fallDur - 周波数下降にかける秒（30〜60ms想定）
 * @param {number} o.release - リリース秒（90〜130ms想定、速やかに減衰）
 * @param {number} o.amp - 振幅
 * @param {'sine'|'triangle'} o.wave
 * @returns {Float32Array}
 */
function lowCore({ dur, f0, f1, fallDur, release, amp, wave = 'sine' }) {
  return render(dur, (t) => {
    // 周波数は fallDur で f0→f1 へ落とし、その後は f1 を維持
    const freq = t < fallDur ? sweep(t, fallDur, f0, f1, 'exp') : f1;
    // 振幅エンベロープ: ごく短いアタック後、release で速やかに減衰（指数減衰風）
    const e = env(t, dur, { attack: 0.001, release });
    // 指数減衰を掛けて低域をリングさせない（胴鳴り回避）
    const decay = Math.exp(-t / (release * 0.9 + 0.02));
    // 先頭アタックの瞬間的ピーク（最初の3msだけ +）
    const attackPeak = t < 0.003 ? 0.4 * (1 - t / 0.003) : 0;
    return (osc(wave, freq, t) + attackPeak) * e * decay * amp;
  });
}

/** 金属エッジ（任意・薄く）: detune した square 倍音を頭だけ短く足す。 */
function metalEdge({ freq = 1800, detune = 1.012, len = 0.04, amp = 0.12 }) {
  return render(len, (t) => {
    const e = env(t, len, { attack: 0.001, release: len * 0.7 });
    return (osc('square', freq, t) + osc('square', freq * detune, t)) * 0.5 * e * amp;
  });
}

/**
 * zusha斬撃 1発（多段ヒットの1ヒット分）。zusha_c 系を ~100ms に凝縮。
 *   lowCore（飽和した低音の芯）＋ slashNoise（太いノイズの斬撃）＋ metalEdge を
 *   mix → saturate(…,1.5) で一体化。ピッチ(coreF0/coreF1)と振幅 amp をヒット毎に変える。
 *   ringTail=true で薄い金属リング(2.2kHz, decay120ms)を尾に重ね「決まった！」感。
 * @param {object} o
 * @param {number} o.coreF0 - lowCore 開始Hz
 * @param {number} o.coreF1 - lowCore 終了Hz
 * @param {number} o.amp - 全体振幅（クレッシェンド用）
 * @param {number} [o.dur] - 1発の長さ(秒)
 * @param {number} [o.coreRelease] - lowCore リリース(秒)。尾を長くする決め手で大きく。
 * @param {boolean} [o.ringTail] - 金属リングを重ねるか
 * @returns {Float32Array}
 */
function zushaHit({ coreF0, coreF1, amp, dur = 0.1, coreRelease = 0.07, ringTail = false }) {
  const core = lowCore({
    dur,
    f0: coreF0,
    f1: coreF1,
    fallDur: 0.04,
    release: coreRelease,
    amp: 0.85,
    wave: 'triangle',
  });
  const slash = slashNoise({
    dur,
    f0: 6000,
    f1: 650,
    release: Math.min(dur, 0.09),
    drive: 5,
    gain: 1.7,
    roundMix: 0.65,
  });
  const edge = metalEdge({ freq: 1600, detune: 1.01, len: 0.03, amp: 0.09 });
  const mixed = mix(core, slash, edge);
  const out = new Float32Array(mixed.length);
  for (let i = 0; i < mixed.length; i++) out[i] = saturate(mixed[i], 1.5) * amp;
  if (ringTail) {
    // 薄い金属リング(2.2kHz, decay120ms)を尾に重ね「決まった！」感
    const ring = render(dur, (t) => {
      const e = env(t, dur, { attack: 0.001, release: 0.04 });
      const decay = Math.exp(-t / 0.12);
      return (osc('sine', 2200, t) * 0.7 + osc('square', 2200, t) * 0.3) * e * decay * 0.14 * amp;
    });
    return mix(out, ring);
  }
  return out;
}

/**
 * 前半「キラーン」金属化 案1: FM金属シマー。
 *   - FM合成: キャリアを 1600→3600Hz へ ~130ms 上昇、モジュレータ周波数 = キャリア×1.47（非整数比）、
 *     変調指数 4〜6（高めで金属的に明るく）。FM位相積分で正確に合成。
 *   - エンベロープ: 速いアタック＋リング状の減衰 ~280ms、軽いシマー（振幅に 30Hz 微トレモロ）。
 *   - 補助: 3.1k/4.7k/6.3kHz 付近の非調和ベル倍音を短く(各20〜30ms)きらめきとして散らす。
 *   ガラス的/金属的な眩しい「キラーン」。長さ ~260ms（後半斬撃へ自然に繋がる）。
 * @returns {Float32Array}
 */
function kiraanMetal1() {
  const dur = 0.26;
  // FM金属シマー本体。位相を積分してキャリアの瞬時周波数スイープを正確に表現。
  let carrierPhase = 0;
  let modPhase = 0;
  const dt = 1 / SR;
  const shine = render(dur, (t) => {
    // キャリア: 1600→3600Hz を ~130ms で上昇、その後維持
    const carrierFreq = t < 0.13 ? sweep(t, 0.13, 1600, 3600, 'exp') : 3600;
    // モジュレータ周波数 = キャリア×1.47（非整数比＝非調和→金属的）
    const modFreq = carrierFreq * 1.47;
    // 変調指数: 4→6 へ時間とともに上げ、輝きを増す
    const modIndex = 4 + 2 * Math.min(1, t / dur);
    // 位相積分
    carrierPhase += carrierFreq * dt;
    modPhase += modFreq * dt;
    const mod = Math.sin(2 * Math.PI * modPhase);
    const fm = Math.sin(2 * Math.PI * carrierPhase + modIndex * mod);
    // 速いアタック→リング状の指数減衰の尾（~280ms）
    const e = env(t, dur, { attack: 0.003, release: 0.05 });
    const decay = Math.exp(-t / 0.18);
    // 軽いシマー: 30Hz の微トレモロ（深さ12%）
    const tremolo = 1 - 0.12 * (0.5 - 0.5 * Math.cos(2 * Math.PI * 30 * t));
    return fm * e * decay * tremolo * 0.5;
  });
  // 補助: 非調和ベル倍音を短いきらめきとして散らす（3.1k/4.7k/6.3kHz）
  const bells = [
    { f: 3100, start: 0.015, len: 0.028 },
    { f: 4700, start: 0.06, len: 0.024 },
    { f: 6300, start: 0.12, len: 0.02 },
  ];
  const twinkle = render(dur, (t) => {
    let sig = 0;
    for (const b of bells) {
      const tt = t - b.start;
      if (tt >= 0 && tt < b.len) {
        const e = env(tt, b.len, { attack: 0.001, release: b.len * 0.8 });
        const decay = Math.exp(-tt / (b.len * 0.55));
        // 非調和な上倍音(×2.76)を少量混ぜ金属的硬さを出す
        sig += (osc('sine', b.f, t) * 0.8 + osc('sine', b.f * 2.76, t) * 0.14) * e * decay * 0.26;
      }
    }
    return sig;
  });
  return mix(shine, twinkle);
}

/**
 * critical_combo_b の後半4連ズシャ部分を buf に配置する（前半キラーンは含めない）。
 *   critical_combo_b と完全に同一の zushaHit×4 配置（t≈220/315/410/505ms,
 *   ピッチ/振幅クレッシェンド, 4発目最大＋金属リング）。
 * @param {Float32Array} buf - total長のバッファ（前半キラーンが既に配置済みでもよい）
 */
function placeComboBSlashes(buf) {
  placeAt(
    buf,
    zushaHit({ coreF0: 100, coreF1: 45, amp: 0.55, dur: 0.09, coreRelease: 0.065 }),
    0.22
  );
  placeAt(
    buf,
    zushaHit({ coreF0: 112, coreF1: 50, amp: 0.6, dur: 0.09, coreRelease: 0.065 }),
    0.315
  );
  placeAt(
    buf,
    zushaHit({ coreF0: 126, coreF1: 57, amp: 0.7, dur: 0.09, coreRelease: 0.065 }),
    0.41
  );
  placeAt(
    buf,
    zushaHit({ coreF0: 140, coreF1: 64, amp: 0.95, dur: 0.19, coreRelease: 0.18, ringTail: true }),
    0.505
  );
}

/**
 * 「サッ」という軽い足音スカッフ。約60ms。
 *   太いノイズをバンドパス近似（中心 centerHz≈1.8〜2.4kHz, 中Q）で通し、
 *   アタック2ms / ディケイ ~45ms の素早い減衰で乾いた擦過音にする。
 *   足の踏み込みの軽い重みとして 180〜220Hz の極短い(20ms)低音をごく小さく足す
 *   （スネア的な低域の長い余韻は厳禁＝20msで切る）。
 *   左右足の差は呼び出し側で centerHz を僅かに変えて表現する。
 * @param {object} o
 * @param {number} o.centerHz - バンドパス中心周波数（1.8〜2.4kHz想定）
 * @param {number} o.amp - 全体振幅
 * @param {number} [o.dur] - 全体長(秒, 既定 0.06)
 * @returns {Float32Array}
 */
function footstep({ centerHz, amp, dur = 0.06 }) {
  const len = Math.ceil(SR * dur);
  // ── スカッフ本体: 太いノイズを時変なしのバンドパス近似（中Q） ──
  // バンドパス ≒ ローパス(center) - ローパス(center*0.45)。中Q相当の素直な帯域。
  const src = thickNoise(dur, 4000, 0.4);
  const scuff = new Float32Array(len);
  {
    let lpHi = 0;
    let lpLo = 0;
    const dt = 1 / SR;
    const cutHi = centerHz;
    const cutLo = centerHz * 0.45;
    const aHi = dt / (1 / (2 * Math.PI * cutHi) + dt);
    const aLo = dt / (1 / (2 * Math.PI * cutLo) + dt);
    for (let i = 0; i < len; i++) {
      const t = i / SR;
      lpHi = lpHi + aHi * (src[i] - lpHi);
      lpLo = lpLo + aLo * (src[i] - lpLo);
      const band = lpHi - lpLo; // バンドパス近似
      // アタック2ms→ディケイ ~45ms の素早い指数減衰
      const e = env(t, dur, { attack: 0.002, release: 0.012 });
      const decay = Math.exp(-t / 0.045);
      scuff[i] = band * e * decay;
    }
  }
  // ── 踏み込みの軽い重み: 200Hz の極短い(20ms)低音をごく小さく ──
  //   20ms で切り、スネア的な低域の長い余韻を残さない。
  const thumpDur = 0.02;
  const thump = render(thumpDur, (t) => {
    const e = env(t, thumpDur, { attack: 0.001, release: 0.008 });
    const decay = Math.exp(-t / 0.008);
    return osc('sine', 200, t) * e * decay;
  });
  const out = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    out[i] = scuff[i] * 0.9 * amp;
  }
  // thump をごく小さく頭に重ねる
  for (let i = 0; i < thump.length && i < len; i++) {
    out[i] += thump[i] * 0.18 * amp;
  }
  return out;
}

// ────────────────────────────────────────────
// メイン処理: 全26種生成
// ────────────────────────────────────────────

const outDir = join(REPO_ROOT, 'public', 'sfx');
mkdirSync(outDir, { recursive: true });

const ids = Object.keys(SFX_RECIPES);
console.log(`\n=== gen-sfx.mjs: ${ids.length}種の効果音を生成 ===\n`);

let totalBytes = 0;
const results = [];

for (const id of ids) {
  const samples = SFX_RECIPES[id]();
  const processed = normalizeAndFade(samples);
  const outPath = join(outDir, `${id}.wav`);
  writeWav(outPath, processed);

  const ms = Math.round((processed.length / SR) * 1000);
  // WAVファイルサイズ: ヘッダ44バイト + PCMデータ
  const byteSize = 44 + processed.length * 2;
  totalBytes += byteSize;

  results.push({ id, ms, byteSize });
  console.log(`  ${id.padEnd(12)} ${String(ms).padStart(4)}ms  ${byteSize.toLocaleString()} bytes`);
}

console.log(`\n合計: ${ids.length}ファイル, 総容量: ${(totalBytes / 1024).toFixed(1)} KB\n`);
