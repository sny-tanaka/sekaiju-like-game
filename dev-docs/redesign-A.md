# 全画面リデザイン — 案 A「黒曜 OBSIDIAN MINIMAL」 v2

Claude Design から渡された全画面リデザインモック (`案 A v2`) を本リポジトリへ取り込むための
ディレクター用設計書。10 画面 + 主要サブ状態を一気に置き換えるが、フェーズ分けで進める。

- 元モック: Claude Design プロジェクト `88c21247-b04d-445e-8c2d-48659bcfe0e1` の
  `世界樹ライク 案A v2.dc.html`（コピーは `/tmp/sekaiju-design/案A_v2.dc.html`、外部メモ用、リポには含めない）。
- 機能要件は `dev-docs/claude-design-brief.md`（§9.2「変えてはいけない」）に従う。

---

## 0. 進行計画

| フェーズ | 範囲 | 完了条件 |
| --- | --- | --- |
| **1. title 単独** | title 画面 + 専用コンポーネント (SaveCard / SoundSettings / AppUpdater) | Storybook で 6 状態（WithSave / NoSave / Corrupted / GuildNameInput / OverwriteConfirm / SoundPanel）が黒曜テーマで描画され、test / lint / tsc が緑 |
| **2. 残り 9 画面（自走）** | town → guild → guildChar → shop → forge → codex → dungeon → battle → not-found。同時に `_variables.scss` を黒曜に完全置換、写本由来の SCSS 変数を削除 | Storybook の全ページストーリーが黒曜で描画、build まで通過 |

「title レビュー OK 後はユーザーに介入させず最後まで実装する」方針。フェーズ 1 終了時点で
方向性が違うと言われた場合のみ作業を一時停止して再ヒアリング。

---

## 1. デザイントークン（黒曜 OBSIDIAN MINIMAL）

### 1.1 色

意味的に役割を持つ層 / 補助層 / 状態色 の 3 群。SCSS 変数 + CSS カスタムプロパティ両建てで配布する。

#### 紙地（実体は深い藍墨 / 黒）
| 役割 | 値 | 用途 |
| --- | --- | --- |
| `--bg-deep` | `#090a0d` | 画面背景の最深部 |
| `--bg-mid` | `#0e0f13` | 画面下半分 |
| `--bg-rise` | `#1c2230` | 画面上端のうっすら青み（radial-gradient の中心） |
| `--bg-overlay` | `rgba(6,7,10,.72)` | モーダル下のディム |
| `--surface-card` | `linear-gradient(180deg, #191c24, #13151c)` | SaveCard / ボタン枠で使う標準カード地 |
| `--surface-panel` | `#15171f` | モーダル（confirm / soundPanel）の中身 |
| `--surface-elev` | `rgba(255,255,255,.04)` | 入力欄や淡い面 |

メイン背景は次の `radial-gradient` を `var(--bg-page-gradient)` として配布する:
```
radial-gradient(130% 90% at 50% -8%, var(--bg-rise) 0%, var(--bg-mid) 56%, var(--bg-deep) 100%)
```

#### インク（文字 / 罫線）
| 役割 | 値 | 用途 |
| --- | --- | --- |
| `--text-strong` | `#f2ede1` | 見出し / 重要数値 |
| `--text-base` | `#d9d4c8` | 標準テキスト |
| `--text-soft` | `#c2bdb2` | 説明文 |
| `--text-mute` | `#9a958a` | サブ説明 / disabled |
| `--text-faint` | `#8c8a84` | 章マーク / 補助ラベル |
| `--text-blue` | `#7d8aa0` | 章マークの淡い青（夜の墨） |
| `--text-quote` | `#6b6f7a` | 引用文・フレーバー |
| `--rule-soft` | `rgba(255,255,255,.07)` | 内部区切り |
| `--rule-base` | `rgba(255,255,255,.14)` | 標準境界 |
| `--rule-gold` | `rgba(201,168,106,.3)` | 金箔縁 |
| `--rule-gold-strong` | `rgba(201,168,106,.5)` | 入力欄縁 / 強調縁 |

#### 金箔（primary アクセント）
| 役割 | 値 | 用途 |
| --- | --- | --- |
| `--gold` | `#c9a86a` | アクセントベース。ボタン上端 / 樹エンブレム / 数値強調 |
| `--gold-deep` | `#b08f4f` | ボタン下端グラデ終点 |
| `--gold-bright` | `#e8d099` | スライダーつまみ・高輝度 |
| `--gold-glow` | `rgba(201,168,106,.3)` | ボタン下シャドウ |
| `--gold-tint` | `rgba(201,168,106,.08)` | 金箔タイントの面 |

primary ボタンは `linear-gradient(180deg, var(--gold), var(--gold-deep))` で
高さ 56px、`color: var(--bg-mid)`、`font-weight: 700`、`letter-spacing: .16em`、`box-shadow: 0 6px 20px var(--gold-glow)`。

#### 危険（vermilion 系・dim version）
| 役割 | 値 | 用途 |
| --- | --- | --- |
| `--danger` | `#b23c30` | 危険ボタン背景 |
| `--danger-glow` | `#d4674f` | warning 線 / 強調 |
| `--danger-text` | `#e09180` | 危険メッセージ強調 |
| `--danger-text-soft` | `#b89089` | 警告本文 |
| `--danger-tint` | `rgba(212,103,79,.08)` | warning 背景 |

#### 成功 / 情報補助
| 役割 | 値 | 用途 |
| --- | --- | --- |
| `--success` | `#3f8a5c` | 成功表示 / FX ラベル |
| `--info-blue` | `#a9c3d8` | 淡青粒子 |

#### 影
| 役割 | 値 | 用途 |
| --- | --- | --- |
| `--shadow-page` | `0 12px 40px rgba(0,0,0,.28)` | フレーム影 |
| `--shadow-modal` | `0 20px 60px rgba(0,0,0,.6)` | モーダル影 |

### 1.2 タイポグラフィ

Google Fonts から 3 ファミリーを `<link>` で読み込む（既存の Kaisei Tokumin は写本テーマ廃止と共に外す予定だが、フェーズ 1 では `index.html` から削除しない。フェーズ 2 で他画面を切り替えた後に削除）。

```
Shippori Mincho 400/600/700/800
Zen Kaku Gothic New 400/500/700/900
JetBrains Mono 400/600
```

| トークン | 値 | 用途 |
| --- | --- | --- |
| `--font-display` | `'Shippori Mincho', serif` | h1/h2 / 章マーク / 引用 |
| `--font-body` | `'Zen Kaku Gothic New', sans-serif` | 本文 / ボタンラベル / 説明 |
| `--font-mono` | `'JetBrains Mono', monospace` | 数値 / バージョン / コード |

サイズの目安（モック実測）:
- 大タイトル 44px / display 700-800 / letter-spacing .06em
- 中タイトル（ダイアログ） 20-24px / display 600
- セクション見出し 16-19px / display
- 本文 13-15px / body 400-600
- 補助 11-12px / body 400 / letter-spacing .14-.32em
- 数値 10-12px / mono / letter-spacing 0

### 1.3 スペーシング / 形状

- 角丸: メインフレーム 7px、ボタン 3px、入力 4px、ダイアログ 6px、円形要素は 50%
- ボタン高: primary 56px / sub 52px / ghost 46px / dialog action 48-52px
- 主要グリッドのインセット: 画面左右 34px（小画面では 28px までで詰める）
- ボタン群と画面下端の距離: 46-54px（safe-area 込みで 60px 程度目安）
- ヘッダー高（章マーク + 設定ボタン）: 上端から 30-34px

### 1.4 モーション

`@keyframes` をグローバルに登録する（`src/_obsidian.scss` 末尾、または `index.scss` 移植）。
`prefers-reduced-motion: reduce` 時は全アニメ 0ms。

| 名 | 期間 | 用途 |
| --- | --- | --- |
| `moteDrift` | 7-10s ease-in-out infinite | 浮遊粒子（背景） |
| `glowPulse` | 5s | 樹エンブレム外輪パルス |
| `breathe` | 6s | 樹エンブレム上下呼吸（translateY ±3px） |
| `sealStamp` | 2.4s | 封蝋スタンプ（プレビュー時はループ、確定時は単発） |
| `warnBlink` | 1.6s steps(1) | 警告カード点滅 / カーソル点滅 (1s) |
| `coinPop` / `forgeSpark` / `gatherSparkle` / `dashAway` 等 | 各画面で個別追加 | フェーズ 2 で個別実装 |

トランジションは:
```
--motion-quick:    140ms cubic-bezier(.4,0,.2,1)
--motion-base:     220ms cubic-bezier(.4,0,.2,1)
--motion-emphasis: 280ms cubic-bezier(.2,.8,.2,1)
--motion-ink:      320ms cubic-bezier(.5,0,.2,1)
--motion-page:     260ms cubic-bezier(.4,0,.6,1)
```
（既存 `index.scss` の値を踏襲）。

### 1.5 トークン配布の構造

- `src/_obsidian.scss` を新規追加。SCSS 変数（`$obsidian-bg-deep` 等）と、
  グローバル CSS 変数（`:root { --bg-deep: #090a0d; ... }`）の両方を出力する。
  - グローバル CSS 変数は `src/index.scss` で `@use './obsidian';` してまとめて吐かせる。
- `_variables.scss` はフェーズ 1 では既存のまま温存。フェーズ 2 冒頭で写本系変数を削除し、
  代わりに `$obsidian-*` の SCSS 変数を import する。
- 各コンポーネントの `style.module.scss` は基本「CSS 変数を直接参照」に移行する
  （`background: var(--surface-card)` 等）。
  - 例外: SCSS 変数しか使えない計算（`darken()` など）が必要なときだけ `_obsidian.scss` の
    SCSS 変数を使う。

---

## 2. 画面別の構造とリデザイン要約

各画面の「目的・状態分岐」は `dev-docs/claude-design-brief.md` の §4 に従う。
ここではモック対応箇所と取り込み方針だけ列挙する。

### 2.1 title（フェーズ 1）

- 構造: `<div>` 一段の `position: relative` で `var(--bg-page-gradient)` を背景に敷く。
  内部の絶対配置で、樹エンブレム / タイトル / 引用 / SaveCard / ボタン群 を積む。
- 章マーク `❦ 同見の書` は上端 30px、`var(--text-blue)`、`letter-spacing .4em`。
- 右上に⚙ボタン（34px 円・`border: 1px solid var(--rule-gold)`、`color: var(--gold)`）。
- 樹エンブレム: 中央 154x154px の二重円輪 + 中心に明朝 62px「樹」。`glowPulse` + `breathe`。
- 大タイトル「世界樹ライク」: display 44px / `color: var(--text-strong)` / 中央 / text-shadow gold。
- 引用文: 状態別に差し替え（WithSave: 「樹は記憶し、塔は試す。…」、NoSave: 「はじまりの一歩は、いつも誰かの名づけから。」）
- SaveCard: モックでは「ギルド名 + 47F 到達 / ポートレート 5 マス + 自動保存済 12:08」。
  実装はギルド名 / `deepestReached` / 5 マスのポートレート（実 party から先頭 5 名）/ 団員数 / 最終セーブ時刻。
  - 党員不足セル: モックの剣・弓・三日月・十字アイコンは絵文字フォールバック。
    本実装では party の各メンバーから `CharacterPortrait` を 30x30px で配置。空きはダッシュ枠。
- NoSave 状態: 破線枠 + 「セーブデータはありません」と 「新しい隊商を結成して塔へ挑みましょう。」
- Corrupted 状態: 警告カードが `warnBlink 1.6s steps(1) infinite`、樹エンブレムは opacity 0.6 に減光。
- ボタン群:
  - つづきから（primary・56px・gold gradient）
  - 最初から（sub・52px・透過 outline）
  - **モックの「図鑑 / 記録」サブボタンは省略**（title からの直接遷移は遷移グラフに無いため、§9.2 機能凍結の範疇）。
- guildNameInput: 章マークが `❦ 結成の儀` に切替。中央寄せ見出し「ギルドの名を」+ 副題、入力欄は黒下地 + gold ストロークでカーソルは `warnBlink 1s` の縦バー。プレビューの封蝋シジルは省略（確定時に inkSplatter で代替）。
- overwriteConfirm: 画面全体を `var(--bg-overlay)` でディム、中央に `--surface-panel` 16:9 縦長のカード。
- soundPanel: モーダル + 既存 SoundSettings コンポーネントを内包。
- フッタの `v{APP_VERSION}` と「更新を確認」は、画面下端の主ボタン群の下に 12px 高で控えめ配置
  （title レイアウトの最下段、safe-area の内側）。
- AppUpdater バナー: 画面上端の章マークの直下に絶対配置で重ねる（fixed 不可。`position: absolute; top: 64px; left: 16px; right: 16px;`）。

### 2.2 town（フェーズ 2）

- ヘッダー: 「❦ 拠点 / 蒼月の隊商」+ ⚙
- 統計 dl: 所持金 / 最高到達 / 団員数
- メニュー: 大ボタン縦リスト（ダイブ・ワープ・ギルド・ショップ・鍛冶・図鑑）。primary は「ダイブ開始」または「潜行を再開」のみ。
- 潜行中は他 5 ボタンが disabled、ヒント文を上部に表示。
- ワープモーダル: モック準拠（半透明オーバーレイ + パネル）。
- ダイブ演出: 封蝋スタンプ風 InkSplatter（既存 `InkSplatter` を黒曜化）。

### 2.3 guild / guildChar（フェーズ 2）

- ヘッダー + 4 タブ（create / roster / party / banish）。タブはチップ風（gold underline で active 表現）。
- party 編成は 3+3 グリッド、後衛は淡くタグ表記。
- guildChar はステ dl + 装備 3 行 + スキルツリー + 転職/称号/転生 アコーディオン。

### 2.4 shop / forge（フェーズ 2）

- shop は 2 タブ（買う / 売る）+ チップフィルタ + 並び替え。
- forge は 2 タブ（強化 / リサイクル）+ 一括選択バー。

### 2.5 codex（フェーズ 2）

- 2 タブ（到達記録 / 図鑑）。図鑑は grid 表示（モック対応）、未遭遇は silhouette。

### 2.6 dungeon（フェーズ 2）

- 上半身に first-person 疑似 3D + 移動コントロール埋め込み、下半身にオートマップ。
- EncounterGauge は 5 段階の icon ramp。
- ☰メニューはモーダル化。

### 2.7 battle（フェーズ 2）

- 上: 敵カード。タップで対象選択 + 被弾 FX。
- 中: 召喚体 / 味方カード（前衛 / 後衛タグ）。
- 下: ログプレビュー + コマンドパネル。
- intro / defeat / flee / result の各オーバーレイ。

### 2.8 not-found（フェーズ 2）

- 章マーク「❦ 行方知れずの頁」+ 戻るボタン。

---

## 3. フェーズ 1 詳細（title 実装指示）

`dev-docs/redesign-A-title.md` を参照。sonnet サブエージェントへの委譲もそちらから行う。

---

## 4. フェーズ 2（自走）の進め方

1. `_variables.scss` を黒曜版に完全置換（`$parchment` 等を削除し、`$obsidian-*` と `--bg-deep` 等を出力）。
2. `src/index.scss` の body 背景を `var(--bg-deep)` 化、デフォルト font-family を `var(--font-body)` 化。
3. town → battle → dungeon → guild → guildChar → shop → forge → codex → not-found の順で
   `style.module.scss` と必要な `index.tsx` 構造変更を反復実装。
4. 各画面は独立して sonnet に委譲できる（共有変数だけ最初に整える）。
5. 既存 Storybook ストーリーの mock データはそのまま使う。視覚回帰は Storybook 撮影で確認。
6. 写本テーマ由来の装飾（PageTurn、Kaisei Tokumin 読込、parchment 背景）を全削除。
7. 最後に `yarn test`・`yarn lint`・`yarn build` を緑にしてコミット。
