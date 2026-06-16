export interface BgmNote {
  t: number; // 発音開始（拍 beat 単位、ループ先頭=0）
  dur: number; // 長さ（拍）
  midi: number; // MIDI ノート番号（noise チャンネルでは無視可）
  vel?: number; // 0..1（既定 1）
}

export interface BgmChannel {
  name: string;
  wave: 'square' | 'square25' | 'square12' | 'triangle' | 'saw' | 'noise';
  gain: number; // チャンネル音量 0..1
  adsr: { a: number; d: number; s: number; r: number }; // a/d/r は秒、s はサステインレベル 0..1
  detune?: number; // セント（厚み付け、任意）
  notes: BgmNote[];
}

export interface BgmTrack {
  id: string;
  bpm: number;
  loopBeats: number; // 1 ループの長さ（拍）。例: 32小節×4拍=128
  channels: BgmChannel[];
}
