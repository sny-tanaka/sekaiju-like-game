# BGM 設計書

効果音(SE)に続き BGM を導入する。方式は **実行時 Web Audio シーケンサ**（プロデューサー承認済み）。
楽曲は「譜面データ（JSON）」として持ち、(1) オフライン WAV レンダラ（試聴・承認用）と (2) 実行時プレイヤー（無限ループ再生）の
**両方が同じ JSON を消費**する。WAV は試聴専用でリポジトリにはコミットしない（容量肥大を避ける）。

最初に作るのは **タイトル画面の BGM 1曲**。SE と同様に「まずオフライン WAV を試聴・承認 → その後ランタイム配線」の順で進める。

## 共有データフォーマット（譜面）

`src/audio/bgm/types.ts`（TS 型）と、各曲 `src/audio/bgm/tracks/<id>.json`（データ）。
レンダラ(.mjs)とランタイム(TS)の両方が JSON を読む（JS/TS 跨ぎを避けるため譜面は JSON で持つ）。

```ts
export interface BgmNote {
  t: number;     // 発音開始（拍 beat 単位、ループ先頭=0）
  dur: number;   // 長さ（拍）
  midi: number;  // MIDI ノート番号（noise チャンネルでは無視可）
  vel?: number;  // 0..1（既定 1）
}
export interface BgmChannel {
  name: string;
  wave: 'square' | 'square25' | 'square12' | 'triangle' | 'saw' | 'noise';
  gain: number;  // チャンネル音量 0..1
  adsr: { a: number; d: number; s: number; r: number }; // a/d/r は秒、s はサステインレベル 0..1
  detune?: number;   // セント（厚み付け、任意）
  notes: BgmNote[];
}
export interface BgmTrack {
  id: string;
  bpm: number;
  loopBeats: number;   // 1 ループの長さ（拍）。例: 32小節×4拍=128
  channels: BgmChannel[];
}
```

- 周波数は `440 * 2^((midi-69)/12)`。
- `noise` チャンネルはパーカッション用（midi 無視、vel と dur と adsr で表現）。

## 合成（レンダラ／ランタイム共通の考え方）

- 波形: `square`(duty50%) / `square25`(25%) / `square12`(12.5%) / `triangle` / `saw` / `noise`。
  チップチューン感を出すため矩形波の duty を使い分ける。
- 各ノート: 周波数の波形 × ADSR エンベロープ × `vel` × `channel.gain`。
- 軽いビブラート/デチューンは任意（厚み）。エフェクトは最小限（チップ風で良い）。
- マスターに簡易ローパス or ソフトクリップで耳当たりを整える程度（やり過ぎない）。

## オフライン WAV レンダラ `scripts/gen-bgm.mjs`

- Node 標準のみ（依存ゼロ）。`src/audio/bgm/tracks/<id>.json` を読み、44100Hz/mono(またはstereo)/16bit で WAV 出力。
- `node scripts/gen-bgm.mjs <id> [loops]`：指定曲を `loops` 回（既定2）レンダリングして
  **リポジトリ外**（例 `/tmp/bgm-<id>.wav`）へ書き出す（試聴専用・コミットしない）。
- ループ境界が滑らかに繋がるよう、最後のノートのリリースがループ頭に被る場合も考慮（2ループ書き出して確認）。
- 既存 `scripts/gen-sfx.mjs` のヘルパ（osc/env など）を流用してよいが、本スクリプトに自前で持って独立させてもよい。

## 実行時プレイヤー（承認後に実装）`src/audio/bgm/`

- `BgmPlayer`：Web Audio で譜面を**先読みスケジューリング**（lookahead scheduler, 例 25ms間隔/100ms先まで）して
  ノートを `OscillatorNode`＋`GainNode(ADSR)` で発音。`loopBeats` で**継ぎ目なく無限ループ**。
- `BgmProvider` / `useBgm`：シーン（ルート）に応じて再生曲を切替（今回はタイトルのみ）。
  ルート遷移で停止/切替、`AudioContext` は SE と同様**最初のユーザー操作後**に開始（自動再生ポリシー）。
- 音量・ミュート：`bgmVolume`（GameSettings に既存）相当をデバイス設定として localStorage 管理し、
  `SoundSettings` UI に **BGM 用のスライダー＋ミュート**を追加（SE と分離）。SE の `SoundProvider` とは独立のマスター Gain。
- SE と BGM はそれぞれ別ゲインで、ミュート/音量を個別に持つ。

## タイトル曲 音楽仕様（最初の1曲）

- 世界観: 『世界樹ライク（無限タワー探索 RPG）』のタイトル。**荘厳で少し神秘的、冒険の幕開け**。落ち着いて壮大、無限ループ。
- キー: **A マイナー**（神秘的・冒険的）。テンポ **約 92 BPM**。
- 長さ: **32 小節（=128 拍）ループ**。前半A（提示）→後半A'（展開/盛り上げ）。
- コード進行（基本・8小節を4回、後半で変化）: **Am – F – C – G**（i – VI – III – VII）。
  後半は **Dm – Am – E(sus→) – Am**（iv – i – V – i）等で締めて頭に戻る流れ。
- 編成（チャンネル）:
  1. `lead`（square25）: 主旋律。壮大で少し切ない、覚えやすい起伏。レガート気味、要所で伸ばし。
  2. `harmony`（square12, gain控えめ）: 3度/6度ハモリ or アルペジオの装飾。
  3. `pad`（triangle, 長音）: コードの白玉（各小節の和音を支える）。
  4. `bass`（triangle, 低音）: ルート中心、たまに経過音。8分/4分で土台。
  5. `perc`（noise, ごく控えめ）: タイトルなので最小限。柔らかいハイハット風を裏拍に薄く、または無し。
- 音量バランス: lead をやや前に、pad/bass で土台、harmony と perc は控えめ。耳に痛くしない。
- ループの繋ぎ目が自然になるよう、最終小節は頭へ戻る進行（G→Am or E→Am）で終止させる。

## 進め方
1. `scripts/gen-bgm.mjs`（レンダラ）＋ `src/audio/bgm/types.ts` ＋ `src/audio/bgm/tracks/title.json`（作曲）を sonnet が実装。
   `/tmp/bgm-title.wav`（2ループ）をレンダリングして報告。**WAV はコミットしない／JSON とスクリプトはコミット**。
2. ディレクターがプロデューサーへ WAV 送付 → 試聴・承認（SE と同じ反復で詰める）。
3. 承認後、実行時 `BgmPlayer`/`BgmProvider`/`useBgm` とタイトル配線、`SoundSettings` に BGM 音量/ミュート追加。
4. `yarn build` で `docs/` 更新（CLAUDE.md のビルド必須ルール）→ 検証ゲート緑 → PR。
```
