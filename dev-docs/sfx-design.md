# 効果音（SE）設計書

参考記事（Qiita: ACE-Step Skills）は音楽生成AIモデルをローカルGPU APIサーバーで動かす構成で、
本リポジトリの「React で完結し API サーバーを持たない」原則に反するため**そのまま採用しない**。
記事の精神＝「Claude Code が効果音を作れる仕組み」を、本プロジェクトに合う形で実現する。

## 方針（確定事項）

- **オフラインの Node 波形合成スクリプト（依存ゼロ）**で WAV を生成し、`public/sfx/*.wav` にコミットする。
  - 理由: プロデューサーがゲーム外で WAV を直接再生して試聴・チェックできる（Web Audio 実行時合成だと外部チェック不可）。
  - Claude Code は `node scripts/gen-sfx.mjs` を実行して効果音を「作る／作り直す」。パラメータを変えれば再生成できる。
- 再生は **Web Audio API**（`AudioContext` + デコード済み `AudioBuffer`）。低遅延・多重再生・PWA/オフライン対応。
- 音量・ミュート設定は **localStorage（デバイス単位）**に保存。タイトル画面（セーブ未読込）でも効くようにするため、
  SaveData（IndexedDB）内の `GameSettings.seVolume` には依存しない（既存フィールドは今回は触らない）。
- 範囲: **全体に一通り**（UI / 戦闘 / 町・店・鍛冶・ギルド・探索）。

## WAV フォーマット（生成スクリプト共通）

- サンプリングレート 44100Hz、モノラル、16bit PCM、リトルエンディアン。
- 各 SE の末尾に 8ms のフェードアウト、先頭に 2ms のフェードインを必ず掛けてクリックノイズを防ぐ。
- 生成後、ピークを -3 dBFS（係数 ≒ 0.707）に正規化する。
- ファイル名は下記 `sfxId` と同名（例: `decide.wav`）。出力先 `public/sfx/`。

## 合成エンジン（scripts/gen-sfx.mjs に実装すべきヘルパ）

依存パッケージは入れない。Node 標準のみ（`fs`, `Buffer`）。

- `SR = 44100`
- `osc(type, freq, t)`: `'sine'|'square'|'saw'|'triangle'` の波形を返す（t は秒）。
- `noise()`: `Math.random()*2-1`（ホワイトノイズ）。
- `env(t, dur, {attack, release})`: 線形 AR エンベロープ（0..1）。`attack`/`release` 秒。
- `sweep(t, dur, f0, f1, curve='lin')`: 周波数を f0→f1 へ補間（`'lin'|'exp'`）。
- `lowpass(samples, cutoffHz)`: 1次 IIR ローパス（任意。金属/柔らかさ調整用）。
- `render(dur, fn)`: `dur` 秒ぶん各サンプル `fn(t, i)` を合成して Float32 配列を返す。
- `mix(...buffers)`: 同長 or 異長を加算合成（短い方は 0 埋め）。
- `normalizeAndFade(samples)`: 上記正規化＋フェード処理。
- `writeWav(path, samples)`: 16bit PCM の WAV を書き出す。

スクリプトは `SFX_RECIPES`（id → 生成関数）を定義し、全件ループで `public/sfx/<id>.wav` を書き出す。
冒頭に `mkdirSync(public/sfx, {recursive:true})`。実行ログに各ファイルの長さ(ms)とサイズを出す。

## SE カタログ（26種・合成レシピ）

各レシピは「キャラクター」を満たせば数値の微調整は可。レトロRPG調（8bit〜チップ寄り）で統一。

### UI（短く軽い）
| id | 用途 | 長さ | レシピ概略 |
|---|---|---|---|
| `cursor` | カーソル移動/タブ切替/メニュー開閉 | 40ms | square 880Hz、attack2ms/release30ms、軽く |
| `decide` | 決定/確認OK/基本クリック | 90ms | square を 660→990Hz の2音（45msずつ階段状）、明るく |
| `cancel` | キャンセル/戻る/タイトルへ | 90ms | square を 520→390Hz の下降2音 |
| `error` | エラー/警告/無効操作 | 160ms | square 160Hz＋少しデチューン、ビリつく低音ブザー |

### 戦闘
| id | 用途 | 長さ | レシピ概略 |
|---|---|---|---|
| `encounter` | 戦闘突入 | 400ms | square 低音の刻み（160Hz×3連）＋ノイズの一撃、緊張感 |
| `attack` | 通常攻撃命中 | 130ms | noise を 6kHz→1kHz へ lowpass スイープ（whoosh）＋ triangle 200Hz の thud |
| `critical` | クリティカル | 200ms | attack に金属的な square 1.2kHz＋倍音、明るいクラング |
| `damage` | 被ダメージ（味方） | 160ms | noise バースト＋ saw 120→80Hz 下降、鈍い衝撃 |
| `down` | 戦闘不能 | 350ms | saw 220→60Hz の exp 下降＋低ノイズ、ドーン |
| `heal` | 回復 | 320ms | sine の上行アルペジオ（523-659-784-1046Hz）＋微かなキラ成分 |
| `buff` | バフ | 300ms | triangle 上行きらめき（440→880 sweep）＋揺らぎ |
| `debuff` | デバフ/状態異常付与 | 300ms | triangle 880→330 下降＋軽いノイズ、淀み |
| `skill` | スキル/魔法発動 | 250ms | FM 風（キャリア 600Hz×モジュレータ）を 400→900Hz sweep、シュワ |
| `flee` | 逃走成功 | 300ms | noise を lowpass 1k→8k 上昇 whoosh＋square 上行 |
| `victory` | 勝利ファンファーレ | 900ms | square のジングル（C5-E5-G5-C6、最後伸ばし）＋軽い3和音 |
| `defeat` | 敗北 | 900ms | triangle の下降旋律（A4-F4-D4-A3）ゆっくり、もの悲しい |
| `levelup` | レベルアップ | 700ms | 明るい上行アルペジオ（C5-E5-G5-C6-E6）＋きらめき |

### 町・店・鍛冶・ギルド・探索
| id | 用途 | 長さ | レシピ概略 |
|---|---|---|---|
| `coin` | 購入/売却 | 220ms | sine 高音2連（1568/2093Hz）チャリン、軽い減衰 |
| `forge` | 強化/鍛冶 | 260ms | 金属クランク：noise バースト×2＋ square 800Hz の倍音、カンッカンッ |
| `recycle` | リサイクル/分解 | 240ms | やや鈍い金属＋下降、素材化のイメージ |
| `item` | アイテム入手/採集成功 | 300ms | sine 上行3音きらめき（784-1046-1568Hz） |
| `cook` | 調理完了 | 300ms | 柔らかい triangle 2音（660-880Hz）＋ほのかな余韻 |
| `create` | キャラ作成/スキル習得/転生 | 500ms | 短いジングル（G4-C5-E5）＋上品なきらめき |
| `dive` | ダイブ開始/階段移動/画面遷移 | 350ms | saw を 600→200Hz へ柔らかく下降 whoosh＋空気感 |
| `warp` | ワープ/拠点帰還 | 450ms | sine を 300→1200Hz とビブラートさせ、魔法的な転送音 |
| `save` | セーブ/新規ゲーム開始 | 300ms | 柔らかな確定チャイム（sine 784＋1046Hz の和音、短い余韻） |

## マニフェスト契約（src/audio/sfxManifest.ts）— Agent A が作成

他エージェントはこの契約に依存する。**型と export 名を厳守**。

```ts
// 効果音ID（全26種）。ファイルは public/sfx/<id>.wav。
export const SFX_IDS = [
  'cursor','decide','cancel','error',
  'encounter','attack','critical','damage','down','heal','buff','debuff','skill','flee','victory','defeat','levelup',
  'coin','forge','recycle','item','cook','create','dive','warp','save',
] as const;
export type SfxId = (typeof SFX_IDS)[number];

// 個別音量補正（0..1）。大きすぎる/小さすぎる音をここで微調整。デフォルト1。
export const SFX_GAIN: Partial<Record<SfxId, number>> = {
  victory: 0.9, levelup: 0.9, error: 0.8, down: 0.85, encounter: 0.85,
};

// public ベースの URL（Vite の import.meta.env.BASE_URL を尊重）。
export const sfxUrl = (id: SfxId): string => `${import.meta.env.BASE_URL}sfx/${id}.wav`;
```

`scripts/gen-sfx.mjs` 側の生成対象 id 一覧は、この `SFX_IDS` と完全一致させること。

## 再生システム（src/audio/）— Agent B が作成

### sfxSettings.ts（localStorage 永続化）
- キー `sekaiju-sfx-settings`、値 `{ volume: number(0..1), muted: boolean }`。デフォルト `{volume:0.6, muted:false}`。
- `loadSfxSettings()` / `saveSfxSettings(s)`。JSON parse 失敗時はデフォルト。

### SoundProvider.tsx
- React Context で `{ play(id), volume, muted, setVolume, setMuted, toggleMuted }` を提供。
- `AudioContext` は **最初のユーザー操作（pointerdown/keydown/touchstart）で遅延生成**（自動再生ポリシー対策）。
  生成後、全 SE の WAV を `fetch`→`decodeAudioData` で `AudioBuffer` 化してキャッシュ（並列、失敗は握りつぶしログのみ）。
- マスター `GainNode` を持ち、`volume`/`muted` を反映。各 `play(id)` は `AudioBufferSourceNode`＋個別 `GainNode`（`SFX_GAIN[id]`）。
- 同一フレーム多重呼び出しの飽和を避けるため、同 id は直近 30ms 以内の再発火を間引く（簡易デバウンス）。
- AudioContext 未生成時の `play` は無視（クラッシュさせない）。SSR/テスト環境（`window.AudioContext` 不在）も安全に no-op。

### useSfx.ts
- `const play = useSfx();` で `(id: SfxId) => void` を返す薄いフック（Context 取得）。
- Provider 外でも落ちないよう、Context 無ければ no-op を返す（テスト容易性）。

### SoundSettings コンポーネント（src/components/common/SoundSettings/）
- ミュートのトグル＋音量スライダー（0..1, step0.05）。変更で `setVolume/setMuted`＋localStorage 保存。
- スライダー変更時に `decide`（または `cursor`）をプレビュー再生して音量を体感できるようにする。
- Storybook ストーリーを併設（`SoundSettings.stories.tsx`）。スマホ前提の指で触れるサイズ。

### main.tsx
- アプリ全体を `<SoundProvider>` でラップ（`GameStateProvider` の内側/外側どちらでも可。依存しない）。

## 統合マッピング（event → sfxId）— Agent C が配線

`useSfx()` を各所で取得し、操作ハンドラ内で `play('<id>')` を呼ぶ。**既存ロジックは壊さない／戻り値や副作用に手を入れない**。
配線は「ユーザー操作起点」を基本とし、ループ内の大量発火は避ける（代表点で1回）。

- **MenuButton**（`src/components/common/MenuButton/MenuButton.tsx`）: `disabled` でない `onClick` 時に既定で `decide` を鳴らす。
  - ただし「鳴らさない/別の音にしたい」呼び出しのため、`sfx?: SfxId | null` prop を追加（既定 `'decide'`、`null` で無音）。
- **タイトル**（`pages/title/index.tsx`）: continue→`decide`、newGame→`decide`、confirmCreate(団設立)→`save`。
  - 画面右上に `SoundSettings` を開くギアボタン＋モーダルを設置（B のコンポーネントを使用）。
- **町**（`pages/town/index.tsx`）: guild/shop/forge/codex 遷移→`decide`、dive→`dive`、warp→`warp`、exitToTitle→`cancel`。
- **戦闘**（`pages/battle/index.tsx`／`domain/battle.ts` のログ駆動）:
  - 配線は **UI 側（battle/index.tsx）でログ/アニメ進行を監視して鳴らす**方針（domain は純粋関数のまま触らない）。
  - 戦闘開始→`encounter`、コマンド確定→`decide`、ターン解決アニメで:
    命中→`attack`（会心時は加えて `critical`）、味方被弾→`damage`、戦闘不能→`down`、
    回復→`heal`、バフ→`buff`、デバフ/状態異常→`debuff`、スキル発動→`skill`、逃走成功→`flee`。
  - outcome: win→`victory`、lose→`defeat`、レベルアップ表示→`levelup`。
  - 実装が難しいログ種別は「代表的なものだけ」でよい（最低: encounter/attack/critical/damage/down/victory/defeat/levelup）。
- **ショップ**（`pages/shop/index.tsx`）: 購入/売却確定→`coin`、タブ切替→`cursor`、確認OK→`decide`、確認キャンセル→`cancel`。
- **鍛冶**（`pages/forge/index.tsx`）: 強化確定→`forge`、リサイクル確定→`recycle`、タブ切替→`cursor`。
- **ギルド**（`pages/guild/index.tsx`）: キャラ作成→`create`、追放確定→`cancel`、編成変更→`cursor`、タブ→`cursor`。
- **ギルド-キャラ**（`pages/guild-char/index.tsx`）: スキル習得→`create`、職業変更確定→`decide`、転生確定→`create`。
- **探索**（`pages/dungeon/index.tsx`）: 採集成功→`item`、調理完了→`cook`、階段移動→`dive`、拠点帰還→`warp`、
  スキル習得→`create`、メニュー開閉→`cursor`。移動の足音は鳴らさない（連打で煩い）。
- **図鑑**（`pages/codex/index.tsx`）: タブ切替→`cursor`、エントリ開閉→`cursor`。
- 共通: 失敗系 notice/警告表示→`error`（手が届く範囲で）。

## 検証ゲート（完了前に必ず緑）
- `yarn test` / `yarn lint` / `tsc -b`（= `yarn build`）の3点すべて。
- SoundProvider/useSfx のユニットテスト（AudioContext を持たない jsdom で no-op になり落ちないこと）。

## 進め方（ディレクター運用）
1. Agent A（資産）と Agent B（再生システム＋設定UI）を **並列**（worktree, sonnet）。契約は本書の通り固定。
2. 両者マージ後、生成 WAV をプロデューサーへ送付して試聴・承認を得る（外部チェック）。
3. Agent C（配線）を実行 → 統合 → 3点ゲート緑 → push。
