# UI 全面刷新仕様 — 写本 (Illuminated Codex)

ターゲット: 本リポジトリの React フロントエンド全画面。世界樹ライクの「ギルド台帳としての UI」というコンセプトに沿った
全面リフレッシュ。機能変更は無し、見た目・モーション・レイアウトのみ。

## 目的・現状課題

ユーザーからの不満は次の 2 点に集約される。

1. **ゲームなのに質素**: アニメーションが戦闘の cardFlash 等 6 件・transition 4 件に集中、他画面は静的。
2. **スマホなのにスクロールが発生**: 全ページの `.layout` が `overflow-y: auto` で、コンテンツ次第で縦スクロール。
   片手操作で行き先ボタンが画面外にいくと体感が悪い。

本仕様はこの 2 点を、デザイン方向「写本 (Illuminated Codex)」と、レイアウト規律「100dvh フォリオ＋内部スクロール限定」、
モーション体系「インク・モーション言語」で同時に解決する。

## デザイン方向 — 写本 (Illuminated Codex)

題材: 世界樹の迷宮の核心は「未踏の樹を地図に記録するギルドの台帳」。UI そのものが台帳の 1 葉 (フォリオ) として振る舞う。
質素さは「静の品格」、ゲーム感は「行動時に走るインクの躍動」で両立させる。

### 自己批評メモ (テンプレ回避)

frontend-design スキルが警告する AI 既定 3 種は以下のとおり回避する。

- 既定 1: クリーム背景 + 高コントラストセリフ + テラコッタ → **緑 (verdant) を主軸の 1 色として常時投入**し、明朝＋朱は和の写本側に寄せる。「テラコッタの近縁＝朱」だが、緑との同居で離す。
- 既定 2: 黒地 + 単色蛍光 → 該当せず (該当が B 真鍮羅針盤案)。
- 既定 3: 新聞ブロードシート → 角丸 0 とヘアライン罫を多用するため近寄るリスクあり。**金箔の暖色アクセントとキャラ立ち絵 (54 枚) とフォリオ余白**で和の写本側に振る。新聞にはしない。

シグネチャは 1 つに集中: **インク・モーション言語**。ダメージ = 飛沫、ステ変化 = 一画書き起こし、画面遷移 = ページめくり、
ダイブ開始 = 封蝋。それ以外の装飾は静かに保つ (Chanel の鏡: 仕上げ Phase 3 で 1 つ削る)。

---

## トークン定義

### カラー

新パレットを `src/_variables.scss` に定義する。旧変数名は **互換のため当面残し、新変数を別名で追加**したうえで、
各ページの色参照を順次新変数に置き換える (Phase 1 で全部置き換え)。

| 用途 | 新変数 | Hex | 旧変数 (置換元) |
| --- | --- | --- | --- |
| 紙の地 | `$parchment` | `#EDE3CC` | `$bg-base` (#e7f1d3) |
| 紙の縁 | `$parchment-edge` | `#D4C7A8` | `$bg-base-edge` (#dcebc2) |
| カード地 | `$parchment-card` | `#F2E9D2` | `$white` (#ffffff) で代用していた箇所 |
| 墨 (本文) | `$ink` | `#21241B` | `$text-dark` (#2c3e50) |
| 墨 (薄) | `$ink-faint` | `#5A4F36` | `opacity: 0.6` 系の擬似 |
| 製本緑 (主) | `$verdant` | `#3F6B4A` | `$primary` (#2196f3) — メニュー前進色 |
| 製本緑 (濃) | `$verdant-dark` | `#2A4A33` | — |
| 金箔 (重要数値) | `$illumination-gold` | `#B89255` | `$secondary` (#00bcd4) — 強調アクセント |
| 金箔 (淡) | `$illumination-gold-soft` | `#D4B47A` | — |
| 封蝋朱 (危険) | `$vermilion` | `#B22C2C` | `#e53935` (戦闘の敵対色) |
| 封蝋朱 (濃) | `$vermilion-dark` | `#8A1F1F` | `#c0392b` |
| 罫線 | `$rule` | `#21241B` 90% (`rgba(33,36,27,0.9)`) | `$gray` (#e5e5e5) |
| 影 | `$shadow-ink` | `rgba(33,36,27,0.15)` | `$shadow-light` |

意味的なエイリアスも定義する。

- `$color-success: $verdant;` (回復・成功)
- `$color-danger: $vermilion;` (HP低下・敵対・確定削除)
- `$color-warning: $illumination-gold;` (注意・限界手前)
- `$color-info: $verdant-dark;` (進行情報)

### タイポ

3 系統を読み込む。`index.html` の `<head>` に Google Fonts を追加する (preconnect 込み)。

- 表題 (Display): **Kaisei Tokumin** 500/700 — タイトル・章マーク・大数値 (ダメージ等)
- 本文 (Body): **Noto Sans JP** 400/500/700 — メニュー・本文 (既存活用)
- 数値 (Mono): **JetBrains Mono** 500/700 — HP/MP/TP/Gold/Lv 等の台帳的数値

`@font-face` ではなく Google Fonts の `<link rel="stylesheet">` を使う (既存 Noto Sans JP と同方式)。CLAUDE.md 既述のとおり、
撮影時に CDN 証明書エラーを `ignoreHTTPSErrors: true` で回避する運用に変更は不要。

タイポスケール (モバイル基準):

| 役割 | family | size | weight | line | letter-spacing |
| --- | --- | --- | --- | --- | --- |
| Display L | Kaisei Tokumin | 28px | 700 | 1.1 | -0.01em |
| Display M | Kaisei Tokumin | 20px | 700 | 1.2 | 0 |
| Title | Noto Sans JP | 18px | 700 | 1.3 | 0.02em |
| Body L | Noto Sans JP | 15px | 500 | 1.5 | 0 |
| Body M | Noto Sans JP | 13px | 400 | 1.55 | 0 |
| Caption | Noto Sans JP | 11px | 400 | 1.4 | 0.04em |
| Numeric | JetBrains Mono | 13px | 700 | 1.3 | 0 |
| Numeric L | JetBrains Mono | 20px | 700 | 1.2 | 0 |

11px 未満は禁止 (アクセシビリティ)。

### スペーシング (8 px グリッド)

利用可能トークン: `4 / 8 / 12 / 16 / 24 / 32 / 48`。`6 / 10 / 14 / 18 / 20` は禁止 (既存に混在しているので置換)。
`gap` / `padding` / `margin` ともこの範囲に限定。

### ボーダー・ラジアス・装飾

- 罫線太さ: `0.75px solid $rule` を標準。強調は `1px solid $ink`。
- **`border-radius: 0` を原則**とする。例外: 立ち絵プレースホルダの 1px、確認ダイアログの 4px のみ許可。
  これは「フォリオ＝平らな紙」表現に必須。既存 `border-radius: 8-16px` を全廃。
- フォリオ装飾: ページ上部に章マーカー (`❦`) または見出し罫 1 本、下部に細い罫 + メタ情報 (章数/階層など)。
- カード内右上に 6×6 の `$verdant` 角印を付ける (シグネチャ要素の静的版)。

### モーション

| トークン | duration | easing | 用途 |
| --- | --- | --- | --- |
| `--motion-quick` | 140ms | `cubic-bezier(0.4, 0, 0.2, 1)` | ボタン押下、ホバー応答 |
| `--motion-base` | 220ms | `cubic-bezier(0.4, 0, 0.2, 1)` | パネル切替、ダイアログ |
| `--motion-emphasis` | 280ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | カード強調・成功演出 |
| `--motion-ink` | 320ms | `cubic-bezier(0.5, 0, 0.2, 1)` | インク飛沫・封蝋 (Phase 2) |
| `--motion-page` | 260ms | `cubic-bezier(0.4, 0, 0.6, 1)` | ページめくり (Phase 2) |

すべて CSS カスタムプロパティとして `:root` に定義し、SCSS 側からも `$motion-base: var(--motion-base);` で参照する。
`prefers-reduced-motion: reduce` 時は全モーションを 0ms または `opacity` のみに退化させる。

---

## レイアウト規律

### 100 dvh フォリオ

全 10 ページの `.layout` を次のとおり変更する。

```scss
.layout {
  display: flex;
  flex-direction: column;
  height: 100dvh;       // 旧: height: 100%;
  overflow: hidden;     // 旧: overflow-y: auto;
  max-width: 560px;
  margin: 0 auto;
  padding: 16px 16px env(safe-area-inset-bottom, 12px);  // 旧: 20px 16px
  color: $ink;
}
```

`100%` → `100dvh` への変更は iOS Safari の URL バー伸縮対策。`#root` 側の `height: 100%` は維持。

### 内部スクロール許可リスト

以下の領域のみ `flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain; touch-action: pan-y;` を許可する。
それ以外でスクロールを発生させない。

| 画面 | スクロール領域 |
| --- | --- |
| guild | 隊員ロスター (`.roster`) |
| guild-char | 装備プール (`.equipPool`) / スキル一覧 (`.skillList`) |
| shop | 商品リスト (`.items`) |
| forge | 装備リスト (`.list`) |
| codex | 図鑑エントリ (`.entries`) |
| battle | 戦闘ログ (`.log`) — 既存 |
| dungeon | 採集インベントリ (`.inventory` — 存在する場合) |

メニュー系画面 (title / town / dungeon HUD) はボタン数を「100dvh – ヘッダ – フッタ」に収まる前提で固定する。
町メニューが多すぎる場合は 2 段グリッドにする (新仕様は最大 6 ボタン 2x3)。

### フォリオ構造の標準パターン

```
.layout (100dvh, flex column)
├── .folioHead   章マーカー＋メタ (高さ 44px)
├── .folioBody   flex:1, min-height:0  ← 内部スクロール許可ゾーン
└── .folioFoot   ナビ/戻る (高さ 56px, env(safe-area-inset-bottom) 加算)
```

既存命名 (`.head` / `.list` / `.actions` 等) を維持しつつ、上記分離を SCSS の構造で再現する。`folio` という新規クラスは作らず、
既存命名のままで内側構造を整える。

---

## ページ別マッピング

各ページの差分指示。**新規ファイルは作らず、既存 `style.module.scss` を編集**する。

### `src/pages/title/style.module.scss`

- 背景: `$parchment`。
- 中央に Display L `Kaisei Tokumin` で「❦ 世界樹の迷宮ライク」(仮)。サブタイトル Caption。
- セーブスロットカード: `$parchment-card`、`border: 0.75px solid $rule`、角丸 0。右上角印 `$verdant` 6×6。
- 「最初から始める」「続きから」ボタン: `$verdant` 地 + `$parchment` 文字 (primary)、副ボタンは枠線のみ。

### `src/pages/town/style.module.scss`

- 章マーカー「❦ 拠点」+ 右に台帳メタ (`Lv 12 / G 300`、Numeric)。
- カード: ギルド情報 (左) + 隊列ミニ表示 (右)、grid 2 列。
- メニュー 5 ボタン (潜行/商店/鍛冶/編成/図鑑): 2 列グリッド、各 56px。先頭「潜行」だけ `$verdant` 地で強調。
- 既存「ダイブ中断中の制限テキスト」は `$ink-faint` Caption で罫線下に。

### `src/pages/dungeon/style.module.scss`

- 上 HUD: 階/座標 (Numeric)、エンカウントゲージ。中央 FirstPersonView。下 HUD: 移動 D-pad + 採集/メニューボタン。
- HUD パネル背景: `$parchment-card`、罫 `$rule`。
- ゲージ赤帯は `$vermilion`、青帯は `$verdant-dark` に置換。

### `src/pages/battle/style.module.scss`

- 上半分: 敵リスト (HP バー `$vermilion`)。下半分: 仲間 5 カード + アクション。中段: ログ (`flex:1` 内部スクロール)。
- 既存の `cardFlash` の赤値を `$vermilion` に。`fadeToBlack` は `$ink` に。
- 仲間カード: HP/MP/TP ラベルは Caption、数値は Numeric。HP 帯 `$verdant`、TP 帯 `$illumination-gold`。
- アクションボタン: 「戦う」のみ primary (`$verdant` 地)、他は枠線のみ。

### `src/pages/guild/style.module.scss`

- ロスター行: 左に立ち絵 36px、中に名前 Title + 副 Caption (種族/職業)、右に Lv Numeric。
- 行罫 `$rule` の上罫のみ (新聞ぽさを避けるため上下罫はやらない)。

### `src/pages/guild-char/style.module.scss`

- パラメータ表: 2 列、ラベル Caption / 数値 Numeric。
- 装備プール: 内部スクロール、各行は forge と同様の構造を共有。

### `src/pages/shop/style.module.scss`

- 商品行: 左に名前 Body L、副 Caption (種別)、右に価格 Numeric。
- ステッパ (-/+/+10/最大) は `$parchment-card` 地 + `$rule` 枠、押下時 `$verdant-dark` text。

### `src/pages/forge/style.module.scss`

- 既存構造維持、色だけ刷新。
- インゴットボタン (銅・銀・金) は地色を `$parchment-edge`、文字を `$ink-faint` → 押下可能時は `$ink`。
- 一括分解バー `.bulkBar`: `$verdant` 地、文字 `$parchment`。
- 確認ダイアログ: 「やめる」枠線のみ、「強化する/分解する」`$verdant` 地。

### `src/pages/codex/style.module.scss`

- エントリ行: 立ち絵 28px + 名前 Body L + 副 Caption + 解放状況。
- フィルタタブ: 章マーカー風に章数 ❦ + 名前。

### `src/pages/not-found/style.module.scss`

- Display L「❦ 行方知れずの頁」+ Body M 説明 + 戻るボタン。

---

## 共通コンポーネント変更

### `StatBar`

- 帯背景: `$parchment-edge`。
- HP: `$verdant`、低下時 (≤30%) `$vermilion`。
- MP: `$verdant-dark`。
- TP: `$illumination-gold`。
- ラベル Caption + 数値 Numeric の 2 段。
- Phase 2 で「数値変化時に Kaisei Tokumin で一画書き起こし」モーション追加。

### `MenuButton`

- デフォルト: `$parchment-card` 地 + `$rule` 枠 + `$ink` 文字。
- primary (推奨アクション): `$verdant` 地 + `$parchment` 文字。
- 左に 4×全高の `$verdant` 縦帯を「綴じ」装飾として常設。primary 時は `$illumination-gold` に切替。
- 押下: 220ms で `transform: translateY(1px); filter: brightness(0.95);`。

### `SaveCard`

- カード: `$parchment-card` 地、`$rule` 罫。
- ヘッダにスロット番号 (Display M、Kaisei) + ギルド名。
- メタ: 階層 (Numeric) + 最終プレイ (Body M)。
- 削除ボタン: 枠線のみの `$vermilion` 文字。

### `EncounterGauge`

- 帯背景 `$parchment-edge`、進行帯 `$verdant`、満タン手前 (≥80%) `$vermilion`。
- アイコンは `$ink`。

### `BattleExpBar`

- 帯背景 `$parchment-edge`、進行帯 `$illumination-gold`。

### `ResistBadges`

- バッジ: 弱点 `$vermilion`、耐性 `$verdant`、無効 `$ink`、吸収 `$illumination-gold-soft`。
- 形状: 角丸 0、12×12 サイズ、文字なしで色塗りのみ + 凡例別出し。

### `SkillTree`

- ノード: 取得済 `$verdant` 塗り、取得可 `$illumination-gold` 縁、未取得 `$parchment-edge`。
- 接続線 `$rule`。

### `SoundSettings`

- スライダ: トラック `$parchment-edge`、つまみ `$verdant`、押下時 `$verdant-dark`。

### `DungeonMap`

- 壁 `$ink`、床 `$parchment-edge`、踏破済 `$parchment-card`、目印 `$illumination-gold`、現在位置 `$vermilion`。

### `FirstPersonView`

- 描画パイプはそのまま、エフェクト色 (ダメージフラッシュ等) があれば `$vermilion` に変更。

### `CharacterPortrait`

- 変更なし (既存スライス済 PNG をそのまま使用)。背景透過なので台帳上で違和感なし。

---

## フェーズ別作業分解

### Phase 1 (1 PR) — 基盤と全画面リスキン

タイトル案: `feat(ui): 写本(Codex) 方向への全面リスキン — 基盤・トークン・全画面 [Phase 1]`

担当 sonnet サブエージェントへの指示:

1. **触ってよいファイル**:
   - `src/_variables.scss` 全面置換
   - `src/index.scss` (背景・フォントを新トークンへ)
   - `index.html` (Google Fonts 追加)
   - `src/pages/**/style.module.scss` 全部
   - `src/components/common/**/style.module.scss` または各 .tsx 内 inline (新色値反映のみ)
   - `package.json` (`bump-patch-version.mjs` 経由なので触らない)
2. **触ってはいけないファイル**:
   - `src/domain/**`、`src/store/**`、`src/data/**` (ロジック)
   - 各画面の `.tsx` のロジック (JSX 構造は最小限の調整のみ、ボタン数や情報量は変えない)
   - `src/assets/characters/**` (立ち絵)
3. **やること**:
   - 上記カラー・タイポ・スペーシング・ボーダー・モーショントークンを定義
   - 全画面の `.layout` を `100dvh / overflow: hidden` に
   - 内部スクロール領域 (上記リスト) のみ overflow-y: auto を許可
   - 全画面の色値を新トークンに置換
   - 角丸 8px〜16px を **0** に統一 (例外: 確認ダイアログのみ 4px)
   - 章マーカー (`❦`) をタイトル/拠点/戦闘/図鑑のヘッダに設置
4. **やってはいけないこと**:
   - 機能ロジックの変更
   - 新コンポーネントの追加 (Phase 2 で行う)
   - 立ち絵サイズの変更
   - サブエージェント (Agent/Task) のさらなる起動
5. **完了条件**:
   - `yarn lint` / `yarn test` / `yarn build` の 3 点すべて緑
   - `docs/` も `yarn build` 出力で更新済 (commit に含める)
   - commit message: `feat(ui): 写本(Codex) 方向への全面リスキン — 基盤・トークン・全画面 [Phase 1]`
   - push はしない (ディレクターがレビュー後)

### Phase 2 (1 PR) — シグネチャ・モーション

タイトル案: `feat(ui): インク・モーション言語を導入 [Phase 2]`

新規追加コンポーネント:

- `src/components/common/InkSplatter/InkSplatter.tsx`
  - props: `{ value: number; variant: 'damage' | 'heal' | 'crit'; onDone?: () => void }`
  - SVG ベース、`--motion-ink` で 320ms 飛沫アニメ + 数値フェードイン
  - damage: `$ink` 飛沫 + `$parchment` 文字
  - crit: `$vermilion` 飛沫 + `$illumination-gold` 文字 + 1.15× スケール
  - heal: `$verdant` 飛沫 + `$parchment` 文字
- `src/components/common/PageTurn/PageTurn.tsx`
  - 既存の SPA ナビゲーション (`src/store/navigation`) と連携し、ページ切替時にラッパで 260ms ページめくり
  - `prefers-reduced-motion: reduce` 時は単純フェード
- `StatBar` の数値変化時に Kaisei Tokumin で一画書き起こし (140ms x 数字桁数、最大 4 桁)

戦闘画面の既存ダメージ表示を InkSplatter に差し替え。クリティカル時の `cardFlash` は `$vermilion` フラッシュ + InkSplatter crit に二段化。

`勝利` 表示 / `レベルアップ` / 装備強化成功 / ショップ購入確定 / ダイブ開始にも一貫したインク言語を当てる:

- ダイブ開始 = 封蝋スタンプアニメ (300ms scale + 透明度)
- 装備強化成功 = `$illumination-gold` の小さな飛沫
- ショップ購入確定 = `$ink` の小さなインク跡 + チェックマーク

### Phase 3 (1 PR) — 仕上げとスクリーンショット自己批評

- 全画面のスクリーンショット撮影 (`dev-docs/screenshot-setup.md` 手順)
- frontend-design スキルの自己批評 (Chanel の鏡): どの画面でも余剰装飾を 1 つ削る
- 角印・章マーカー・罫線の密度を最終調整
- アクセシビリティ確認: フォーカスリング (`$illumination-gold` の 2px outline)、`prefers-reduced-motion`、44×44px のタッチターゲット

---

## 検証ゲート

各 Phase の PR 直前で以下すべて緑である必要がある。

- `yarn test` (vitest)
- `yarn lint` (eslint)
- `yarn build` (`tsc -b` + `vite build` + `docs/` 更新)

スクリーンショット差分は `screenshot-diff` 手順で目視確認、品質基準は frontend-design スキルの「Restraint and self-critique」
に従う (1 つ削る原則)。

---

## 既知のリスクと対処

1. **Kaisei Tokumin / JetBrains Mono の初回ロード遅延** → `index.html` で `<link rel="preconnect">` + `font-display: swap`。
2. **JetBrains Mono が一部の特殊数字 (全角等) を持たない** → Numeric は半角数字のみで運用 (既存も半角)。
3. **角丸 0 の徹底が `<input type=checkbox>` 等のネイティブ要素で破られる** → 鍛冶屋の checkbox は `appearance: none` で角丸 0 のカスタム表示に。
4. **`100dvh` 対応** → 古い iOS でも `100dvh` は問題なし。フォールバック `min-height: 100vh` を併記する必要はない (ターゲット iOS 16+)。
5. **既存のテストが色値を文字列で参照していないこと** → grep で確認、ヒットなら修正。

---

## 参考

- frontend-design Skill: `.claude/skills/frontend-design/SKILL.md`
- CLAUDE.md (本リポジトリ): 体制・検証ゲート
- 世界樹の迷宮 V (元ネタ): https://w.atwiki.jp/sekaiju_mazev/pages/1.html
