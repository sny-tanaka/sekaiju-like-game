# ハードコード色の全数検査（redesign-A / 黒曜トンマナ整合性監査）

> 「色がトンマナと関係なくハードコードされているところが残っていたら致命的」
> という指摘を受けて、`src/` 配下の **SCSS / TSX / TS をすべて grep** し、
> 黒曜（OBSIDIAN）トークン由来 = OK / 旧写本パレットや明灰直書き = NG として
> 一覧化したもの。**判定だけ。実装は別タスク。**

対象ブランチ: `feature/redesign-A`
監査日: 2026-06-20
検査スコープ: `src/**/*.{scss,tsx,ts}` の `#hex` / `rgb(...)` / `rgba(...)` / `hsl(...)` リテラル

## 1. TL;DR

| 指標 | 件数 |
|---|---|
| grep 生件数（全リテラル） | **714** |
| トークン定義ファイル除外後 | 649 |
| 色文字単位 hit | 710 |
| 黒曜トークン値除外後 | 574 |
| 行内コメント内の値を除外後 | **556**（= ハードコード色の総ヒット数）|

そのうち分類:

| 分類 | ヒット数 | ファイル数 |
|---|---:|---:|
| **致命的（旧写本パレット直書き）** | **94** | **16** |
| **要修正（明らかな白/黒/灰の直書き）** | **89** | **17** |
| **境界（モック由来 or 局所的な彩度色）** | 373 | 約 20 |

> 致命的件数 94 のうち、コメントが「`// $vermilion`」「`// $parchment`」と
> 旧テーマ前提のシンボル名で書かれているのが大半（= 明確に旧 写本テーマの遺物）。

### 致命的件数の上位 5 ファイル

| # | ファイル | 件数 | 主な値 |
|---|---|---:|---|
| 1 | `src/pages/battle/style.module.scss` | 25 | `rgba(33,36,27,*)` = $ink、`rgba(178,44,44,*)` = $vermilion、`rgba(63,107,74,*)` = $verdant、`rgba(184,146,85,*)` = $gold |
| 2 | `src/data/bandTheme.ts` | 14 | `#21241B`, `#3F6B4A`, `#B22C2C`, `#B89255`, `#F2E9D2` 等 — FPV 帯テーマが完全に写本パレット |
| 3 | `src/components/common/InkSplatter/InkSplatter.tsx` | 13 | `#21241B`, `#EDE3CC`, `#B22C2C`, `#B89255` 等 |
| 4 | `src/components/common/DungeonMap/DungeonMap.tsx` | 10 | `#D4C7A8`, `#F2E9D2`, `#21241B`, `#B22C2C`, `#B89255` 等 |
| 5 | `src/components/common/PageTurn/PageTurn.stories.tsx` | 8 | `#EDE3CC`, `#D4C7A8`, `#F2E9D2`, `#3F6B4A` — Storybook 用 |

### 修正コスト見積（ざっくり）

| 対象 | 工数 | 備考 |
|---|---|---|
| **致命的のうち pages/battle/style** | sonnet 1セッション（中規模） | 行数が分散しているが値ごとの正規表現置換で 25 hit を 6〜8 個の token 参照に集約できる |
| **致命的のうち bandTheme.ts** | 設計判断 + sonnet 1セッション | FPV ダンジョン世界観の保持 vs 黒曜統一の方針を確定する必要あり（次節 §7 参照） |
| **致命的のうち InkSplatter/DungeonMap/FirstPersonView** | sonnet 1セッション | コンポーネント単位で内部 palette を黒曜 token 参照に書き換え |
| **要修正の白/黒/灰 (89hit)** | sonnet 0.5セッション | ほぼ `dev/SpriteCatalog`（dev only） と `*.stories.tsx` の Storybook 背景 → 残しても publish に影響しないが trim する価値あり |
| **境界（373hit）** | 別タスク | 1 ファイルずつ目視で判定（後述 §4） |

---

## 2. 致命的（要即修正）

「旧写本パレットの生値が var(--*) を経由せずに残っている」もの。
コメントに `// $verdant` などと自分で「旧テーマ前提」を明言しているのですぐ判別できる。

「致命的」と評価する基準: 黒曜の `--bg-deep` (≒ 黒) と白系テキストが基本構成のところに
旧写本由来の **緑 / 朱 / 金 / 紙地** が直書きで混じっており、コントラストや色温度が
意図せず崩れている、または将来テーマ変更が伝播しなくなる。

### 2.1 旧写本パレットの hex 値一覧（参考）

| 旧シンボル | 旧値 | 黒曜での対応 token |
|---|---|---|
| `$parchment` | `#EDE3CC` | `var(--bg-mid)` (#0e0f13) |
| `$parchment-edge` | `#D4C7A8` | `var(--bg-rise)` (#1c2230) |
| `$parchment-card` | `#F2E9D2` | `var(--surface-panel)` (#15171f) |
| `$ink` | `#21241B` | `var(--text-strong)` (#f2ede1) |
| `$ink-faint` | `#5A4F36` | `var(--text-soft)` (#c2bdb2) |
| `$verdant` | `#3F6B4A` | `var(--gold)` (#c9a86a) |
| `$verdant-dark` | `#2A4A33` | `var(--gold-deep)` (#b08f4f) |
| `$illumination-gold` | `#B89255` | `var(--gold)` (#c9a86a) |
| `$vermilion` | `#B22C2C` | `var(--danger)` (#b23c30) |
| `$vermilion-dark` | `#8A1F1F` | (互換層に残置 `#8a2520`) |

### 2.2 致命的ヒット一覧

#### `src/pages/battle/style.module.scss` (25 hit)

| 行 | 値 | 内容 | 推奨置換 |
|---:|---|---|---|
| 223 | `rgba(90, 79, 54, 0.15)` | $ink-faint の 15% 背景 | `rgba(255,255,255,0.07)` (= `--rule-soft`) または `rgba(201,168,106,0.08)` (= `--gold-tint`) |
| 229 | `rgba(178, 44, 44, 0.15)` | weakChip_fire の背景（朱 15%） | `rgba(212,103,79,0.15)` (黒曜 danger-glow ベース) |
| 231 | `rgba(184, 146, 85, 0.15)` | weakChip_volt の背景（金 15%） | `rgba(201,168,106,0.15)` (黒曜 gold ベース) |
| 233, 299, 1106, 1216, 1264 | `rgba(33, 36, 27, *)` | $ink を背景に重ねたオーバーレイ | `rgba(0,0,0,*)` で同等表現（黒地に黒透過なので彩度関係なし） |
| 315 | `box-shadow: 0 6px 32px rgba(33,36,27,0.45)` | $ink 影 | `var(--shadow-page)` 系 |
| 425 | `rgba(184, 146, 85, 0.8)` | $gold 80% 影 | `rgba(201,168,106,0.8)` |
| 456, 471 | `rgba(63, 107, 74, *)` / `rgba(42, 74, 51, *)` | $verdant / $verdant-dark のリング | 黒曜は緑 → 金 にマップ済み: `rgba(201,168,106,0.35)` |
| 562, 1038, 1045, 1090, 2084, 2085 | `rgba(178, 44, 44, *)` | $vermilion (朱) の影・縁・背景 | `var(--danger)` or `rgba(178,60,48,*)` (= `--danger` の rgb) |
| 901, 902, 906, 1093, 1094 | `rgba(63, 107, 74, *)` / `rgba(42, 74, 51, *)` | $verdant の縁・背景 | `rgba(201,168,106,*)` (= 黒曜は緑系 → gold) |
| 1089 | `rgba(138, 31, 31, 0.08)` | $vermilion-dark 背景 | `rgba(178,60,48,0.08)` |
| 1981 | `rgba(184, 146, 85, 0.8)` | $gold 80% text-shadow | `rgba(201,168,106,0.8)` |

#### `src/pages/battle/index.tsx` (6 hit) — TSX 直書き

```tsx
1140: color={d.hp / a.maxHp <= 0.3 ? '#B22C2C' : '#3F6B4A'} // $vermilion / $verdant (≤30%)
1146: color="#B89255" // $illumination-gold
1157: color="#B89255" // $illumination-gold
1314: color="#B22C2C" // $vermilion
1403: color="#5A4F36" // $ink-faint
```

→ いずれもコメント自身が「旧シンボル名」を残しており、書いた本人も旧値だと認識している。
StatBar 等の `color` prop に渡しているので、定数化 (例: `import.styles` から CSS var で
受ける、もしくは `const BAR_COLOR = { hp: 'var(--danger)', ... }` を作る) で集約可能。

#### `src/data/bandTheme.ts` (14 hit)

```ts
20:  { name: '樹海', sky: '#1F2A1A', ceiling: '#2A4A33', floor: '#8A6A38',
21:    wall: '#3F6B4A', frontWall: '#2A4A33', outline: '#21241B', mapFloor: '#F2E9D2' },
30:  { name: '洞窟', ..., wall: '#615C4F', outline: '#21241B', mapFloor: '#EDE3CC' },
...
```

冒頭コメントに **「写本(Codex) パレットに統一」** と明記されている。
**世界観配色（FPV ダンジョンの壁/床/天井）として意図的に旧 写本パレットを温存しているケース**
だが、redesign-A の方針として「黒曜に統一」と矛盾する。
→ §7 で「FPV 帯テーマは温存する／黒曜系にリマップする」のいずれかの設計判断が必要。

#### `src/components/common/InkSplatter/InkSplatter.tsx` (13 hit)

```ts
19:  splatter: '#21241B', // $ink
24:  splatter: '#3F6B4A', // $verdant
29:  splatter: '#B22C2C', // $vermilion
34:  splatter: '#8A1F1F', // $vermilion-dark
39:  splatter: '#B89255', // $illumination-gold
40:  text:     '#EDE3CC', // $parchment
107: fill="#8A1F1F"
113: stroke="#B89255"
121: fill="#B89255"
```

→ InkSplatter は「写本に墨をぶちまける表現」の専用コンポーネントで、世界観として旧パレットを
内部に持ったまま。redesign-A で「写本表現を黒曜上で再解釈する」のか「廃止して黒曜の他演出に
置き換える」のかの方針確認が必要。

#### `src/components/common/DungeonMap/DungeonMap.tsx` (10 hit)

```ts
34: fog:        '#D4C7A8', // 未踏 = $parchment-edge
35: floor:      '#F2E9D2', // 踏破済みの床 = $parchment-card
36: wall:       '#21241B', // 壁線 = $ink
37: grid:       '#EDE3CC', // 床のうっすらした境界 = $parchment
38: player:     '#B22C2C', // 現在位置 = $vermilion
39: foe:        '#5A4F36', // 徘徊敵（未感知）= $ink-faint
40: foeAlert:   '#B22C2C', // 徘徊敵（追跡中）= $vermilion
41: gather:     '#B89255', // 採集ポイント = $illumination-gold
42: gatherDone: '#D4C7A8', // 採集済み（枯渇）= $parchment-edge
43: cooking:    '#B89255', // 調理地点 = $illumination-gold
```

→ ミニマップは「明灰の紙地に墨壁」の旧 写本仕様のままで、黒曜と完全に逆。
ダンジョン本編は黒曜（黒地 + 金ルール）に切り替わっているため、ここを直さないと
ミニマップだけ「明灰 + 旧 写本墨」が混在して**写本テーマ時代の残骸**として浮く。

#### `src/components/common/FirstPersonView/FirstPersonView.tsx` (3 hit)

```ts
45: floor:     '#B89255', // $fpv-floor-near（手前の床色）
194: ctx.fillStyle = alerted ? '#B22C2C' : '#8A1F1F'; // $vermilion / $vermilion-dark
```

→ 帯テーマ未指定時のフォールバック FPV と「徘徊敵 (alerted/notice) スプライト」の
カラーがいずれも旧 写本前提。

#### `src/components/common/FirstPersonView/style.module.scss` (1 hit)

```scss
6: box-shadow: 0 2px 6px rgba(33, 36, 27, 0.18);
```

#### `src/components/common/DungeonMap/style.module.scss` (2 hit)

```scss
4: background-color: #D4C7A8;             // $parchment-edge に相当
5: box-shadow: 0 2px 6px rgba(33, 36, 27, 0.12);
```

→ ミニマップ全体の明灰背景。黒曜下では完全に浮く。

#### `src/components/common/BattleExpBar/BattleExpBar.tsx` (1 hit)

```ts
44: color = '#B89255', // $illumination-gold
```

→ EXP バーのデフォルト色。`var(--gold)` 直書き、もしくは prop に CSS var を渡す形に。

#### `src/pages/dungeon/style.module.scss` (5 hit)

```scss
94, 119, 775, 1044: background-color: rgba(33, 36, 27, *)
322:                box-shadow: 0 0 0 2px rgba(63, 107, 74, 0.35);
```

→ オーバーレイ・ハイライトに旧 $ink / $verdant が残存。黒曜下ではいずれも黒系/金系に
リマップすべき。

#### `src/pages/shop/style.module.scss` (1 hit)

```scss
238: background-color: rgba(33, 36, 27, 0.45);
```

#### `src/components/common/SkillTree/style.module.scss` (1 hit)

```scss
76: box-shadow: 0 0 0 1px rgba(184, 146, 85, 0.4);
```

→ $illumination-gold 40% の縁。 `rgba(201,168,106,0.4)` (黒曜 gold) に。

#### `src/components/creation/RaceInfoCard/style.module.scss` (1 hit)

```scss
76: background-color: rgba(63, 107, 74, 0.3); // $verdant 30% alpha
```

→ コメントが旧テーマ前提。黒曜では緑 → 金 マップ済み。

#### `src/components/common/PageTurn/PageTurn.stories.tsx` (8 hit) — Storybook デモ

```ts
35: A: '#EDE3CC', B: '#D4C7A8', C: '#F2E9D2',
67: background: page === p ? '#3F6B4A' : '#EDE3CC',
68: color:      page === p ? '#EDE3CC' : '#21241B',
79: <p style={{ fontSize: 13, color: '#5A4F36' }}>
```

→ Storybook 内デモなので **本番ビルドには載らない**が、デモが旧 写本のままだと
新規実装の参考にされて混乱を招く。Storybook ごと黒曜にリブランドするか、
「旧 PageTurn は写本専用＝廃止予定」を明記する。

#### `src/components/common/InkSplatter/InkSplatter.stories.tsx` (1 hit)

```ts
68: style={{ ..., background: '#EDE3CC', padding: 24 }}
```

#### `src/components/common/EffectsGallery/EffectsGallery.tsx` (2 hit)

```ts
390: background: 'rgba(180,170,150,.5)',
402: background: 'rgba(180,170,150,.4)',
```

→ 「灰土」のような中間色だが、`rgba(180,170,150,*)` は元コードでも未定義の出自不明色。
モック由来かは要確認。

---

## 3. 要修正（明らかな白/黒/灰のハードコード）

純白 `#fff` / 純黒 `#000` / `#f5f5f5` / Material accent (`#4caf50` 等) / Bootstrap 系 (`#155724`, `#c3e6cb` 等) の直書き 89 hit。

### 3.1 dev ツール — そのままでも publish に影響しないが trim 推奨

#### `src/components/dev/SpriteCatalog/style.module.scss` (21 hit)

```scss
13:  background: #fff;
14:  border-bottom: 1px solid #ddd;
34:  border: 0.5px solid #ccc;
41:  background: #f5f5f5;
46:  background: #e8e8e8;
51:  background: #d4edda;   ← Bootstrap success
52:  color:      #155724;   ← Bootstrap success-text
53:  border-color: #c3e6cb;
107: background: #fee;
108: border-color: #c33;
145: color: #888;
152: background: #eee;
161: color: #bbb;
```

→ dev-only の SpriteCatalog なので Storybook / dev ビルドでしか開かない。
だが「黒曜トンマナと無関係なハードコード」の定義からは外れない。dev ツールも黒曜に揃える方が
ブランチ全体の整合性が取れる。

### 3.2 Storybook の背景 — 意図的だが明示すべき

#### `src/components/common/ItemSprite/ItemSprite.stories.tsx` (35 hit)

```ts
20:  background: '#F5F0E8',   // ← Storybook 背景。旧 parchment-card 近似
30:  color: '#666'            // ← 説明テキスト
```

`#F5F0E8` 背景が 3 箇所、`#666` テキストが 26 箇所。Storybook 上で
スプライトを薄ベージュ地に並べてコントラスト確認するための背景なので **意図的**。
ただし黒曜配下のスプライトは黒地で表示されることが多いので、Storybook 背景も黒曜に揃えるか
「明地でのプレビュー用」と明示すべき。

#### `src/components/common/EnemySprite/EnemySprite.stories.tsx` (9 hit)

同上。 `#F5F0E8` 4 箇所、`#888` 5 箇所。

#### `src/components/common/StatBar/StatBar.stories.ts` (4 hit), `StatBar.tsx` (1 hit)

```ts
StatBar.tsx:26:  color = '#4caf50',    // Material green 500
.stories.ts:11:  color: '#4caf50'      // HP
.stories.ts:12:  color: '#2196f3'      // TP / Material blue 500
.stories.ts:14:  color: '#ff9800'      // UNI / Material orange 500
```

→ Material Design accent をデフォルトに使っており、黒曜 token (`--success`, `--info-blue`,
`--gold` 等) に置換すべき。`#4caf50` は dungeon の HP 色 `#3f8a5c` (= `--success`) と
緑系で近いが値が違う。

### 3.3 本番コードに乗る白/黒

#### `src/pages/town/style.module.scss` (2 hit)

```scss
532: mask: radial-gradient(transparent 56%, #000 58%);
533: -webkit-mask: radial-gradient(transparent 56%, #000 58%);
```

→ マスク用なので「色」ではなくマスク領域指定。**OK（色として描画されない）**。
ただしレビュー時に「ハードコード見落とし」と誤認しないようコメントで明示すると親切。

#### `src/components/common/FirstPersonView/FirstPersonView.tsx` (1 hit)

```ts
198: ctx.fillStyle = '#fff';
```

→ Canvas 描画の警告マーク。黒曜下では「白いビックリマーク」のまま視認性は出るが、
`var(--text-strong)` 同等の `#f2ede1` を使う方が統一感あり（差は微小）。

#### `src/components/common/DungeonMap/DungeonMap.tsx` (1 hit)

```ts
176: ctx.fillStyle = '#ffffff';
```

→ ミニマップの何かのハイライト。§2 の DungeonMap 旧パレット問題と合わせて一括対応。

#### `src/components/common/ResistBadges/style.module.scss` (1 hit)

```scss
44: // 監査結果: 2.1:1 → 4.6:1 (#fff on #b23c30; WCAG AA 達成)
45: color: #fff;
```

→ コメントで WCAG 監査済みと明記されており、黒曜 `--danger` (#b23c30) 上の白文字。
`var(--text-strong)` (#f2ede1) に置換しても比率 4.4:1 を保てる。**準OK** だが
統一性のために置換するのが好ましい。

#### `src/components/common/AttackFx/AttackFx.module.scss` (3 hit)

```scss
34: background: linear-gradient(90deg, transparent, #fff, #ffd9c9, transparent);
49: background: linear-gradient(90deg, transparent, #cfe0ff, #fff);
147: background: linear-gradient(180deg, transparent, #fff, #e8d85b, transparent);
```

→ AttackFx 用の「白い閃光」。モック v3 §4.5 の元コードでも `#fff` が使われており、
**温存対象（§5）**。

#### `src/pages/title/style.module.scss` (1 hit), `forge` (2 hit), `guild` (1 hit), `guild-char` (1 hit)

```scss
color: #fbeae6;  // 5 ファイル共通
```

→ 「薄ピンク白」。`var(--text-strong)` (#f2ede1) と近いが微妙に違う。
出自不明（黒曜 token に存在しない値）なのでトークン化すべき。

#### `src/__stories__/SpriteCatalog.stories.tsx` (1 hit)

```ts
306: sprite: portrait ?? <span style={{ fontSize: 10, color: '#bbb' }}>（画像なし）</span>,
```

→ Storybook なので **トリビアル**だが trim 推奨。

---

## 4. 境界（用途を確認したい）

「彩度色だが既存の黒曜 token に対応が無く、用途確認が必要」なもの。
ファイル別ヒット 373 件のうち主要なものを抜粋。

### 4.1 `src/pages/battle/index.tsx` 100-109 — 状態異常アイコンの色定義

```ts
poison:       { bg: '#5a3a6e', fg: '#e7d2f5' },  // 紫
paralysis:    { bg: '#5e5a28', fg: '#e8d85b' },  // 黄
sleep:        { bg: '#33425e', fg: '#9fb6e0' },  // 青
blind:        { bg: '#2e3340', fg: '#aab0bc' },  // 灰
confusion:    { bg: '#5e3a4e', fg: '#e6aecb' },  // ピンク
curse:        { bg: '#3a2a4a', fg: '#c0a8e0' },  // 濃紫
instantDeath: { bg: '#4a1f1f', fg: '#e89080' },  // 朱
headBind:     { bg: '#5e3636', fg: '#e0a0a0' },  // 茶赤
```

→ 各状態異常を識別する 8 色 + その上の文字色 8 色 = 16 色。
**意図的なカテゴリカル配色**として温存していい可能性が高いが、
ハードコード = NG という原則からはトークン化すべき。
`--status-poison`, `--status-poison-text` 等のドメイン token を `_obsidian.scss` に追加する案。

### 4.2 `src/pages/battle/style.module.scss` 後半（1500行以降）

```scss
1553: background: #0d0f14;   // 黒曜 --bg-deep に近い (#090a0d) が値が違う
1640: background: #181b22;   // 黒曜 surface-card gradient (#191c24,#13151c) と近い
1652, 1660: background: #1a1d26;
1773: background: linear-gradient(180deg, var(--gold, #c9a86a), #7a5e30);   // gold グラデの暗端
1774: color: #1a1200;        // gold 背景上の濃茶テキスト
1805: background: #140e10;   // 暗赤系背景
1846: background: #d44f3f;   // 黒曜 --danger-glow (#d4674f) に近いが値が違う
1924: color: #8fd0a0;        // 緑系（黒曜 success #3f8a5c とは別系統）
1948: color: #5ec97a;        // 緑系
2150: background: rgba(120, 100, 60, 0.6);
```

→ いずれも値が黒曜 token と「近いけど少し違う」。
modal / banner / 戦闘リザルト演出と思しき領域で、**モック v5 直結の値**の可能性大。
モック原本の HTML を確認して値が一致すればモック由来として温存、不一致なら token 化。

### 4.3 `src/pages/town/style.module.scss` (47 hit)

```scss
20: background: linear-gradient(180deg, #1a1f2b, #13151c);  // dive ヘッダ
93: color: #d8c79a;          // dive 強調テキスト（金系）
123: background: linear-gradient(110deg, #202a3c, #12161f 72%);  // dive tile
138: background: #101218;    // disabled tile
142-144: color: #7c7a74; / #7c7a74; / #e0917f;  // disabled text / disabled danger
148: background: linear-gradient(110deg, #203c2e, #12161f 72%);  // tile (緑系)
153: color: #8fd0a0;         // success text
157: color: #9ed8b4;
244: background: #1a2030;
285, 292: #5d8a6c            // 緑系成功色
382: background: #1a1d26;
486: background: rgba(6, 7, 10, 0.92);   // ※ --bg-overlay は (6,7,10,0.72) なので 0.92 は微差
501: background: radial-gradient(circle, #8a2f2a, #5e1f1c);    // 赤い丸
514, 521, 530: rgba(233, 201, 160, *)    // 金属銀のような色
540: background: rgba(233, 201, 160, 0.9);
548: color:      rgba(233, 201, 160, 0.7);
560: background: rgba(7, 8, 9, 0.78);
572-574: rgba(111, 159, 216, *)  // 黒曜 info-blue tint と同色だが var() 経由でない
```

→ §4.2 と同様、**town モック v5 由来**の値である可能性が高い。
モック原本に同じ値があれば温存、なければ token 化。

### 4.4 `src/pages/dungeon/style.module.scss` (34 hit)

```scss
281: background: #0a0c10;    // 黒曜 --bg-deep 近似
342, 357, 362: #15171f / #f2ede1 / #8c8a84   // 黒曜 token 値の直書き！ var() 経由にすべき
386: background: linear-gradient(180deg, #c9a86a, #b08f4f);   // gold グラデ
387: color: #0e0f13;        // bg-mid 直書き
425, 459: #0e131a            // ほぼ bg-mid だが微差
479: color: #d8c0a0;
500: color: #e0b07c;
583: linear-gradient(180deg, #0d141a, #070b0f)
614: color: #8fae8c;
672: background: #6fb98a;    // 緑強調
678: background: #6f9fd8;    // 青強調
672/678 ペア: success/info カラーだが値が token と違う
```

→ 「黒曜 token 値そのものを直書きしている」ケースが複数あり、これは
**「var(--*) を使うべきところを生値で書いた」リファクタ漏れ**として中程度の優先度で
修正すべき。

### 4.5 `src/pages/guild/style.module.scss` (34 hit), `guild-char` (16 hit), `forge` (31 hit), `not-found` (8 hit), `codex` (13 hit)

→ いずれも `rgba(255,255,255,0.07/0.08/0.10/0.12/0.14)` のような白透過罫線が中心。
黒曜の `--rule-soft` (0.07) / `--rule-base` (0.14) があるので可能な範囲で token 化。
`#fbeae6`, `#0c0d11`, `#1a1d26`, `#101218`, `#15171f`, `#9ed8b4`, `#8fd0a0`, `#d8c79a`,
`#c98a5b`, `#e0a87c`, `#fbeae6` などはモック由来か検討対象。

---

## 5. モック由来（温存可）

### 5.1 `src/components/common/AttackFx/AttackFx.module.scss` (13 hit)

```scss
34: linear-gradient(90deg, transparent, #fff, #ffd9c9, transparent);   // slash
49: linear-gradient(90deg, transparent, #cfe0ff, #fff);                // thrust
63: color: #cfe0ff;
100: radial-gradient(circle, rgba(255, 150, 80, 0.6), rgba(212, 80, 40, 0.2) 55%);  // fire
122: rgba(160, 210, 240, 0.85)                                          // ice
135: color: #a8d4f0;
147: linear-gradient(180deg, transparent, #fff, #e8d85b, transparent); // volt
160: color: #e8d85b;
173: radial-gradient(circle, rgba(224, 192, 255, 0.6), transparent);   // almighty
184: color: #e0c0ff;
192: radial-gradient(circle, rgba(255, 210, 122, 0.45), transparent);  // crit
```

→ 黒曜 `_obsidian.scss` §148-292 の「battle v5 — 攻撃 FX 6 属性」 token と整合。
属性ごとの色 (`#ffd9c9` 斬撃, `#cfe0ff` 突, `#ffe0a0` 殴, `#ff965a` 火, `#a0d2f0` 氷,
`#e8d85b` 雷) は **モック v3 §4.5 で確定したデザイン仕様**として黒曜内にも書かれている。
**温存 OK**。

### 5.2 `src/components/common/EffectsGallery/EffectsGallery.tsx` (62 hit) と `.module.scss` (29 hit)

EffectsGallery は **モック原本を Storybook 用に React 化したサンプル展示室**。
モック HTML/CSS と 1:1 対応する `#fff`, `#0a0f13`, `radial-gradient(...)`, `rgba(...)` 等が大量に
直書きされている。これらは **「モック原本の値を見せるためのギャラリー」** なので温存。

---

## 6. 画面別 / コンポーネント別 サマリ

ハードコード総ヒット数（コメント除外後・黒曜 token 値除外後）。

| ファイル | hit | 評価 |
|---|---:|---|
| `src/pages/battle/style.module.scss` | 67 | **致命的多数**(25) + 境界(42) |
| `src/components/common/EffectsGallery/EffectsGallery.tsx` | 64 | モック由来(62) + 致命的(2) |
| `src/pages/town/style.module.scss` | 49 | 境界(47) + 白/黒(2) |
| `src/pages/dungeon/style.module.scss` | 39 | 致命的(5) + 境界(34) |
| `src/components/common/ItemSprite/ItemSprite.stories.tsx` | 35 | Storybook 白/灰(35) |
| `src/pages/guild/style.module.scss` | 35 | 境界(34) + 白(1) |
| `src/data/bandTheme.ts` | 34 | **致命的(14) + 境界(20)** ※帯テーマ全体 |
| `src/pages/forge/style.module.scss` | 33 | 境界(31) + 白(2) |
| `src/components/common/EffectsGallery/EffectsGallery.module.scss` | 31 | モック由来(28) + 白(3) |
| `src/pages/battle/index.tsx` | 25 | **致命的(6)** + 境界(19; 状態異常 16 色) |
| `src/components/dev/SpriteCatalog/style.module.scss` | 22 | dev only 白/灰(21) + 境界(1) |
| `src/pages/guild-char/style.module.scss` | 17 | 境界(16) + 白(1) |
| `src/components/common/AttackFx/AttackFx.module.scss` | 13 | モック由来(10) + 白(3) |
| `src/pages/codex/style.module.scss` | 13 | 境界(13) |
| `src/components/common/InkSplatter/InkSplatter.tsx` | 13 | **致命的(13)** |
| `src/components/common/DungeonMap/DungeonMap.tsx` | 11 | **致命的(10)** + 白(1) |
| `src/components/common/EnemySprite/EnemySprite.stories.tsx` | 9 | Storybook 白/灰(9) |
| `src/pages/not-found/style.module.scss` | 8 | 境界(8) |
| `src/components/common/PageTurn/PageTurn.stories.tsx` | 8 | **致命的(8)** Storybook |
| `src/components/common/FirstPersonView/FirstPersonView.tsx` | 7 | 致命的(3) + 境界(3) + 白(1) |
| `src/components/common/StatBar/StatBar.stories.ts` | 4 | Material accent(4) |
| `src/pages/title/style.module.scss` | 3 | 境界(2) + 白(1) |
| `src/components/common/InkSplatter/style.module.scss` | 2 | 境界(2) |
| `src/components/common/DungeonMap/style.module.scss` | 2 | **致命的(2)** |
| `src/pages/shop/style.module.scss` | 2 | 致命的(1) + 境界(1) |
| `src/components/common/ResistBadges/style.module.scss` | 1 | 白(1) |
| `src/__stories__/SpriteCatalog.stories.tsx` | 1 | Storybook 灰(1) |
| `src/components/common/StatBar/StatBar.tsx` | 1 | Material accent(1) |
| `src/components/common/InkSplatter/InkSplatter.stories.tsx` | 1 | **致命的(1)** |
| `src/components/common/SkillTree/style.module.scss` | 1 | **致命的(1)** |
| `src/components/common/SoundSettings/SoundSettings.module.scss` | 1 | 境界(1) |
| `src/components/common/BattleExpBar/BattleExpBar.tsx` | 1 | **致命的(1)** |
| `src/components/common/FirstPersonView/style.module.scss` | 1 | **致命的(1)** |
| `src/components/creation/RaceInfoCard/style.module.scss` | 1 | **致命的(1)** |
| `src/pages/codex/index.tsx` | 1 | 境界(1) |

---

## 7. 修正方針提案

### 7.1 即対応（致命的）

**A. `src/pages/battle/style.module.scss` の旧 写本 rgba 群** — 同値の正規表現置換で集約:

| 検索 | 置換 |
|---|---|
| `rgba(33, 36, 27, X)` | `rgba(0, 0, 0, X)`（背景透過なので $ink 色を保持する意味なし） |
| `rgba(178, 44, 44, X)` | `rgba(178, 60, 48, X)` (= `--danger` の rgb) |
| `rgba(63, 107, 74, X)` | `rgba(201, 168, 106, X)` (黒曜は緑系→金にマップ) |
| `rgba(42, 74, 51, X)` | `rgba(176, 143, 79, X)` (`--gold-deep` rgb) |
| `rgba(184, 146, 85, X)` | `rgba(201, 168, 106, X)` (= `--gold` rgb) |
| `rgba(138, 31, 31, X)` | `rgba(138, 37, 32, X)` (`$vermilion-dark` = `#8a2520` の rgb) |
| `rgba(90, 79, 54, X)` | `rgba(194, 189, 178, X)` (= `--text-soft` rgb) |

**B. `src/pages/battle/index.tsx` 1140-1403 の `color="#B22C2C"` 等**:

```ts
// before
color={d.hp / a.maxHp <= 0.3 ? '#B22C2C' : '#3F6B4A'}
// after
color={d.hp / a.maxHp <= 0.3 ? 'var(--danger)' : 'var(--gold)'}
```

StatBar の `color` prop が CSS var を受け付けるか確認の上で。

**C. `src/components/common/InkSplatter/InkSplatter.tsx` & DungeonMap.tsx の内部 palette**:

各 palette オブジェクトを `var(--*)` 参照に書き換え（または `getComputedStyle` で
取得する形）。InkSplatter は SVG fill/stroke なので CSS var が直接使えないことに注意。
`useEffect` + `getComputedStyle(document.documentElement).getPropertyValue('--gold')` で
解決する手段あり。

**D. `src/data/bandTheme.ts`** — 設計判断が要る:

選択肢:
1. **温存案**: 「FPV のダンジョン世界観は地下迷宮の固有色（緑樹海 / 火山 / 氷窟 / 霊廟）を
   保持し、UI チョークだけ黒曜にする」。コメントを「黒曜 UI とは別系統の dungeon biome
   palette」と明記する。
2. **黒曜統一案**: 全帯テーマを黒曜の bg/surface/text token で再構成し、深度バンドの違いは
   `--gold` の濃度や hue シフトで表現する。

→ どちらにするか **要ユーザー確認** (§§ 推奨は 1 案 = 温存 + コメント明記)。

### 7.2 中対応（要修正の白/黒/灰）

- `src/components/dev/SpriteCatalog/style.module.scss` 21 hit → 黒曜 token に一括置換
- Storybook 用 `#F5F0E8` (4 ファイル) → `var(--bg-mid)` または `var(--surface-panel)` に変更し、
  「Storybook プレビュー背景＝黒曜」に統一
- StatBar の Material accent → `--success` / `--info-blue` / `--gold` に
- `#fbeae6` (5 ファイル共通) → `var(--text-strong)` に統一（出自不明な値の温存はリスク）

### 7.3 中長期（境界 373 件）

ページごとに「モック原本の HTML/CSS との対応表」を作って 1:1 で残すか token 化するかを
判定する。`town` / `forge` / `guild` / `dungeon` / `battle` の各 mock v5 ファイルが
`mocks/` 配下にあれば突合してから決める。

特に **`dungeon/style.module.scss` の `#15171f`, `#f2ede1`, `#8c8a84`, `#0e0f13` 等の
「黒曜 token 値そのものの直書き」** は単純な置換ミスなので最優先で trim する
（リファクタ漏れ）。

### 7.4 最後に — モック由来は温存

EffectsGallery / AttackFx の値は触らない。これらは「モック v3 §4.5 をそのまま展示している」
意図的なギャラリーなので、token に集約してしまうとモック原本との照合ができなくなる。

---

## 8. 検査再現コマンド

```bash
# Phase 1: 全 grep
grep -rnE "#[0-9a-fA-F]{3,8}\b|rgb\(|rgba\(|hsl\(|hsla\(" src/ \
  --include="*.scss" --include="*.tsx" --include="*.ts" 2>/dev/null > /tmp/all-colors.txt
wc -l /tmp/all-colors.txt   # → 714

# Phase 2: token 定義ファイル / 黒曜トークン値 / コメント内値 を除外
# (Python スクリプトで実施。詳細は本ドキュメント生成セッション参照)

# Phase 3: 分類
# /tmp/legacy-palette.txt → 致命的 94 hit
# /tmp/white-black-gray.txt → 要修正 89 hit
# /tmp/border-saturated.txt → 境界 373 hit
```
