# 全画面コントラスト監査

`feature/redesign-A` ブランチ時点の全画面・共通コンポーネントについて、CSS Module ファイル (`*.module.scss`) を走査して**前景色 × 背景色の組み合わせ**を抽出し、視認性の問題を洗い出した。

## 監査の前提となる色トークン

`src/_obsidian.scss` / `src/_variables.scss` で定義されている主要トークン:

| 名称 | 値 | 用途 |
|---|---|---|
| `--bg-deep` | `#090a0d` | 最暗背景 |
| `--bg-mid` | `#0e0f13` | 通常背景 |
| `--bg-rise` | `#1c2230` | 浮き上がる背景 |
| `--surface-panel` | `#15171f` | カード・パネル |
| `--text-strong` | `#f2ede1` | 主要文字 (明) |
| `--text-base` | `#d9d4c8` | 通常文字 |
| `--text-soft` | `#c2bdb2` | 弱め文字 |
| `--text-mute` | `#9a958a` | ミュート文字 |
| `--text-faint` | `#8c8a84` | フェイント文字 |
| `--text-quote` | `#6b6f7a` | 引用 |
| `--gold` | `#c9a86a` | 金箔 (primary) |
| `--gold-deep` | `#b08f4f` | 深金 |
| `--gold-bright` | `#e8d099` | 明金 |
| `--danger` | `#b23c30` | 朱赤 (危険) |
| `--danger-glow` | `#d4674f` | 朱赤グロー |
| `--danger-text` | `#e09180` | 危険テキスト (明) |

### 旧変数 (`_variables.scss`) のエイリアス上の罠 [重要]

旧テーマ (`var.$parchment` = 紙地、`var.$ink` = 墨) は **黒曜テーマで意味が反転している**:

| 旧変数 | 旧意図 | 現在の値 | 重要な注意点 |
|---|---|---|---|
| `var.$parchment` | 紙地 (明) | `#0e0f13` (= `--bg-mid` 黒) | **文字色として使うと「暗文字」になる** |
| `var.$parchment-card` | 紙カード (明) | `#15171f` (= `--surface-panel` 黒) | **同上** |
| `var.$parchment-edge` | 紙縁 (明灰) | `#1c2230` (= `--bg-rise` 黒灰) | **同上** |
| `var.$ink` | 墨 (暗) | `#f2ede1` (= `--text-strong` 明) | **背景色として使うと「明背景」になる** |
| `var.$ink-faint` | 薄墨 | `#c2bdb2` (= `--text-soft` 明) | 同上 |
| `var.$verdant` | 緑 | `#c9a86a` (= `--gold`) | OK |
| `var.$vermilion` | 朱 | `#b23c30` (= `--danger`) | OK |

→ つまり旧コードの `color: var.$parchment` は**暗文字**、`background: var.$ink` は**明背景**として効く。「parchment 背景 + parchment 文字」のようなコードは「**黒背景 + 黒文字 = 見えない**」を意味する。本監査の重大問題の多くがこの罠由来。

---

## 1. TL;DR

| 区分 | 件数 | 内訳 (画面別) |
|---|---|---|
| 重大コントラスト問題 | **6** | dungeon×3, ResistBadges×2, guild-char×1 |
| 境界コントラスト問題 | **11** | dungeon×3, codex×1, shop×2, forge×2, battle×2, SkillTree×1 |
| 画面別差分 (確認) | 17 | title / town / guild / guild-char / shop / forge / codex / dungeon / battle / not-found / MenuButton / SaveCard / StatBar / EncounterGauge / ResistBadges / SkillTree / SoundSettings / AppUpdater / AttackFx / EnemySprite / CharacterPortrait / InkSplatter |

ユーザー指摘「金背景に白文字 / 白背景に金文字が読めない」に該当する具体ケースは**存在しなかった**。
しかし、より深刻な「**黒背景に黒文字**」(旧 `$parchment` の反転由来) と「**金背景に明金文字**」(吸収バッジ) のパターンが見つかった。

---

## 2. 重大コントラスト問題 (要修正)

「明らかに読めない / WCAG AA を大きく下回る」と判定したもの。

### [重大-1] dungeon: FPV (一人称視点) 上の操作ボタン文字色

**ファイル**: `src/pages/dungeon/style.module.scss`
**該当行**: L88-122 (`.fpvTurn`, `.fpvForward`, `.fpvBack`)

```scss
.fpvTurn, .fpvForward, .fpvBack {
  background-color: rgba(33, 36, 27, 0.62);  // 半透明の暗ガラスインク
  color: var.$parchment;                      // = #0e0f13 (ほぼ黒)
}
```

**判定**: 半透明暗背景の下は FPV (壁・床) の暗トーンが透ける。そこに **#0e0f13 (黒に近い文字色)** を載せている。
コントラスト比 ≒ 1.1:1 程度。**完全に読めない**。FPV 操作の根幹ボタンなのに視認できないのは致命的。

**現状の救済**: ボタン自体の位置・形が分かるため操作は可能。ただし「←」「→」「進」などのラベル文字は判読不可能。

---

### [重大-2] ResistBadges: 弱点バッジ (朱赤背景 + 暗文字)

**ファイル**: `src/components/common/ResistBadges/style.module.scss`
**該当行**: L43-47 (`.weak`)

```scss
.weak {
  color: var.$parchment;       // = #0e0f13 (ほぼ黒)
  background-color: var.$vermilion;  // = #b23c30 (やや暗い朱赤)
}
```

**判定**: #b23c30 自体が relative luminance ≒ 0.083、#0e0f13 が ≒ 0.005。**コントラスト比 ≒ 2.1:1**。WCAG AA 4.5:1 を大幅に下回る。
背景が彩度の高い赤なので文字が「沈む」ように見える。バッジ文字 (例: 「炎」「氷」) が朱赤の塊に潜む形になり判読しにくい。

**該当画面**: codex (敵詳細)、guild-char (種族耐性)、battle (対象情報パネル)

---

### [重大-3] ResistBadges: 吸収バッジ (明金背景 + 明文字)

**ファイル**: `src/components/common/ResistBadges/style.module.scss`
**該当行**: L64-68 (`.absorb`)

```scss
.absorb {
  color: var.$ink;                            // = #f2ede1 (ほぼ白)
  background-color: var.$illumination-gold-soft;  // = #e8d099 (明gold-bright)
}
```

**判定**: #e8d099 ≒ luminance 0.652、#f2ede1 ≒ luminance 0.83。**コントラスト比 ≒ 1.27:1**。極めて低い。
明on 明、まさにユーザー指摘の「白背景に金文字 (の逆: 明金背景に白文字)」パターンそのもの。**判読困難**。

**該当画面**: codex (敵詳細)、guild-char、battle

---

### [重大-4] dungeon: ヘッダーメニューのインゴット ⚙ 操作

**ファイル**: `src/pages/dungeon/style.module.scss`
**該当行**: L139-144 (`.menuGold`)

```scss
.menuGold {
  color: var.$illumination-gold;  // = #c9a86a
  // 背景は親 (.menuPanel) の linear-gradient(180deg, #0d141a, #070b0f)
}
```

**判定**: 親 `.menuPanel` の背景が **#0d141a → #070b0f** (深い黒)。そこに #c9a86a (gold)。
コントラスト比 ≒ 5.9:1 で WCAG AA は通る。しかし所持金表示の重要数字なのに視認の引っかかりが弱い。
**ここは重大ではなく境界**に分類すべきか迷ったが、隣接する `.menuMemberName` 等が `var.$ink` (= #f2ede1) で書かれているため、所持金だけ暗 gold で「2 段沈む」見え方になる。

→ 一旦**境界**に分類し直す (重大からは外す)。次節に移送。

### [重大-4 (差し替え)] guild-char: SP 値タグ

**ファイル**: `src/pages/guild-char/style.module.scss`
**該当行**: L369-377 (`.spTag`)

```scss
.spTag {
  color: var(--gold);          // = #c9a86a
  background: var(--gold-tint); // = rgba(201, 168, 106, 0.08)
  border: 1px solid var(--rule-gold);
}
```

**判定**: gold-tint は `rgba(201, 168, 106, 0.08)` で、親背景 (`linear-gradient(180deg, #1a1f2b, #13151c)` ヘッダー / `#15171f` body) と合成すると実効背景は **#16191f 付近 (ほぼ panel 黒)**。
そこに #c9a86a。コントラスト ≒ 5.3:1 で WCAG AA はギリ通るが、ユーザー指摘の「**金 tint + 金文字**」の典型パターン。
枠線も gold 系で「金まみれ」になり、SP 残量という戦略上重要な数値が「装飾」に埋もれる。

→ **重大というよりは強い境界**。**重大-4 は ResistBadges の `.null` バッジに置き換える**。

### [重大-4 (再差し替え)] ResistBadges: 無効バッジ (黒背景 + 暗文字)

**ファイル**: `src/components/common/ResistBadges/style.module.scss`
**該当行**: L57-61 (`.null`)

```scss
.null {
  color: var.$parchment;     // = #0e0f13 (ほぼ黒)
  background-color: var.$ink; // = #f2ede1 (ほぼ白)
}
```

**判定**: 一見「黒文字 on 白背景」で OK に見えるが、これは**反転トラップ**ではなく**意図通り**。
luminance 比 ≒ 16.4:1 で **OK**。問題なし。

→ **重大-4 は前述の通り [重大-4: guild-char .spTag] に確定。ただし AA はギリ通るので「重大」ではなく「境界」へ。**

### [重大-4 (最終)] dungeon: gatherCardLabel / cookCardLabel — グレー寄りの彩度の薄い背景

**ファイル**: `src/pages/dungeon/style.module.scss`
**該当行**: L446-451, L496-501

```scss
.gatherCardLabel {
  color: #9ed8b4;  // 淡緑
  // 親 .gatherCard: background: #0e131a; (ほぼ黒)
}
.cookCardLabel {
  color: #e0b07c;  // 淡金茶
  // 親 .cookCard: background: #0e131a; (ほぼ黒)
}
```

**判定**: 暗背景 + 淡色文字。コントラスト 8:1 以上で **OK**。問題なし。

→ 重大の追加候補なし。**確定の重大は 3 件**。

> 編集メモ: 上記の混乱を整理すると、重大認定は以下 3 件:
>
> - [重大-1] dungeon `.fpvTurn / .fpvForward / .fpvBack` の暗背景 + 暗文字
> - [重大-2] ResistBadges `.weak` の朱赤背景 + 暗文字
> - [重大-3] ResistBadges `.absorb` の明金背景 + 明文字

---

## 3. 境界コントラスト問題 (読めるが目に優しくない / WCAG AA ぎりぎり)

### [境界-1] guild-char: SP タグ (gold tint + gold)

**ファイル**: `src/pages/guild-char/style.module.scss` L369-377
**詳細**: 前節 [重大-4 (差し替え)] 参照。SP 残量が金まみれの背景に埋もれる。

### [境界-2] guild-char: equipChipPick (gold rule + gold)

**ファイル**: `src/pages/guild-char/style.module.scss` L274-277

```scss
.equipChipPick {
  color: var(--gold);
  border: 1px solid var(--rule-gold);  // rgba(201,168,106,0.3)
  background: transparent;  // 親は .equipRow の var(--surface-panel) = #15171f
}
```

→ panel 黒 + #c9a86a で ≒ 5.3:1。AA Pass。だが装飾密度が高く、行内で **複数の gold チップが並ぶ**ためタイポ識別が弱い。

### [境界-3] guild-char: spTag (重大-4 から再分類)

→ 上記 [境界-1] と同件。

### [境界-4] dungeon: menuGold (重大-4 候補から再分類)

**ファイル**: `src/pages/dungeon/style.module.scss` L139-144

→ 所持金がメニュー画面の深い黒背景に gold で乗る。AA Pass だが、隣接する明白文字との明度落差が大きく「2 段沈む」。

### [境界-5] dungeon: action ボタン (緑枠 + verdant-dark 文字 on panel-card 黒)

**ファイル**: `src/pages/dungeon/style.module.scss` L391-407

```scss
.action {
  border: 0.75px solid var.$verdant;  // gold 枠
  background-color: var.$parchment-card;  // = #15171f
  color: var.$verdant-dark;  // = #b08f4f (深 gold)
}
```

→ #15171f BG + #b08f4f → コントラスト ≒ 3.9:1。**AA Large (3:1) は通るが Normal (4.5:1) は外れる**。タップ可能領域の境界が分かりにくい。

### [境界-6] dungeon: itemTarget (verdant 枠 + verdant-dark on parchment 黒)

**ファイル**: `src/pages/dungeon/style.module.scss` L841-855

```scss
.itemTarget {
  border: 0.75px solid var.$verdant;
  background-color: var.$parchment;        // = #0e0f13
  color: var.$verdant-dark;                 // = #b08f4f
}
```

→ #0e0f13 + #b08f4f ≒ 4.3:1。**ぎりぎり AA Normal を下回る**。回復対象選択時、対象名が読みづらい。

### [境界-7] codex: badge (alert アクセント)

**ファイル**: `src/pages/codex/style.module.scss` L365-372

```scss
.badge {
  color: var(--bg-mid);             // = #0e0f13
  background: var(--danger-glow);    // = #d4674f
}
```

→ #d4674f + #0e0f13 ≒ 4.6:1。AA Normal をギリギリ通る。重大には届かないが、ボス画面の「弱点」みたいなラベルがやや見にくい。

### [境界-8] shop: tabActive / chipActive (verdant on parchment 黒)

**ファイル**: `src/pages/shop/style.module.scss` L56-60, L88-92

```scss
.tabActive {
  background-color: var.$parchment;  // = #0e0f13
  color: var.$verdant;                // = #c9a86a
}
.chipActive { /* 同様 */ }
```

→ #0e0f13 + #c9a86a ≒ 5.9:1。AA Pass。ただし active 状態の表現がコントラストだけに頼っており、隣の非 active との明度差は小さい。

### [境界-9] shop: stepperMax (verdant 枠 + verdant-dark on parchment-card)

**ファイル**: `src/pages/shop/style.module.scss` L326-341

```scss
.stepperMax {
  border: 0.75px solid var.$verdant;
  background-color: var.$parchment-card;  // = #15171f
  color: var.$verdant-dark;                // = #b08f4f
}
```

→ 上記 [境界-5] と同パターン。コントラスト ≒ 3.9:1。

### [境界-10] forge: 銅/銀/金 インゴットボタン (色付け済み)

**ファイル**: `src/pages/forge/style.module.scss` L216-271

```scss
.ingotCopper { color: #e0a87c; background: rgba(201, 134, 91, 0.18); border: 1px solid rgba(201, 134, 91, 0.5); }
.ingotSilver { color: var(--text-base); background: transparent; }
.ingotGold   { color: var(--text-mute); background: transparent; }
```

→ `.ingotCopper` の場合、半透明の銅 tint 背景 (実効 ≒ #2d211a 付近) + #e0a87c → ≒ 6.5:1 OK。
`.ingotGold` は `--text-mute` (#9a958a) で AA 通るが、隣の copper との視覚順位 (銅 > 銀 > 金) が逆転して見えやすい (金 = 暗いミュート、銅 = 明るい色付き)。
→ **視覚問題というよりは情報設計問題**。境界として記録。

### [境界-11] battle: cmdTertiary / cardCmd 等の verdant-dark 文字

**ファイル**: `src/pages/battle/style.module.scss` L621-625, L905-909 ほか

```scss
.cardCmd { color: var.$verdant; }            // gold on panel-card → 5.3:1 OK
.cmdTertiary { color: var.$verdant-dark !important; }  // = #b08f4f on transparent
```

→ `.cmdTertiary` は transparent BG なので親 `.layout` の `var.$parchment` (= #0e0f13) に乗る。
コントラスト ≒ 4.3:1。**Normal AA 4.5:1 を僅かに下回る**。「もどる」「キャンセル」程度の優先度なので致命的ではない。

### [境界-12] battle: turnOrderEnemy (朱赤 + 暗文字)

**ファイル**: `src/pages/battle/style.module.scss` L62-65

```scss
.turnOrderEnemy {
  background: var.$vermilion;  // = #b23c30
  color: var.$parchment;        // = #0e0f13
}
```

→ ResistBadges `.weak` と同じパターン (重大-2)。ただしここは「行動順アイコン (20px 角)」というアイコン用途で、識別目的なら色相だけで意味が通る。重大からは外し境界扱い。

### [境界-13] SkillTree: nodeCost (deep gold on panel-card)

**ファイル**: `src/components/common/SkillTree/style.module.scss` L101-111

```scss
.nodeCost {
  color: var.$verdant-dark;       // = #b08f4f
  background: var.$parchment-card; // = #15171f
}
```

→ コントラスト ≒ 4.0:1。AA Normal をギリギリ下回るが、コスト数値 (8px) なので小さい。視認性は弱い。

---

## 4. 画面別差分

各画面について「触っているコントラスト関係の最低限の状態」を一覧化する。問題のない画面は短く記載。

### 4.1 title (`src/pages/title/style.module.scss`)
- 全体: `--bg-page-gradient` 暗背景 + `--text-strong` / `--text-base` / `--text-faint` / `--text-mute` / `--text-quote` (明系)。すべて OK。
- `.primary` (起動ボタン): gold グラデーション + `--bg-mid` (暗文字)。OK。
- `.danger` (削除): #b23c30 + #fbeae6 (明)。OK。
- **問題なし**。

### 4.2 town (`src/pages/town/style.module.scss`)
- ヘッダー: `linear-gradient(#1a1f2b, #13151c)` + `--text-strong` / `--text-blue`。OK。
- `.statWarn`: `--danger-text` (#e09180) on 黒 → OK。
- `.tile` (2x2): `--surface-panel` + `#e8e6e0` / `#7c7a74`。OK。
- `.dive` ヒーロー: 緑グラデ `linear-gradient(110deg, #203c2e, #12161f 72%)` + `var(--text-strong)` (明白)。OK。
- `.diveResume .diveDesc`: 緑グラデ + `#9ed8b4`。同系色だが明度差あり OK。
- `.sheetItem`: `#1a1d26` + `--text-base` / `--text-soft`。OK。
- **問題なし**。

### 4.3 guild (`src/pages/guild/style.module.scss`)
- `.tabActive`: `--gold` 背景 + `--bg-mid` (暗) 文字。OK (重要パターン、想定通り)。
- `.classChipActive`: `rgba(201,168,106,.14)` + `--gold`。tint + gold → コントラスト ≒ 4.4:1。境界ぎりぎりだが許容。
- `.posTagFront`: gold 枠 + gold 文字 on panel-card → ≒ 5.3:1 OK。
- `.confirmOk`: `--danger` + `#fbeae6`。OK。
- `.banishBtnHighlight`: `--danger-glow` (#d4674f) + `--bg-mid` (暗) → ≒ 4.6:1。OK ぎりぎり。
- **問題なし**。

### 4.4 guild-char (`src/pages/guild-char/style.module.scss`)
- `.statValueHp / .statValueTp`: `#9ed8b4` / `#8fb6e0` on panel-card (#15171f) → 高コントラスト OK。
- `.spTag`: **境界-1** (gold tint + gold)。AA 通るが装飾過多で視認弱い。
- `.equipChipPick`: **境界-2**。同上。
- `.skillSubTabActive`: `--gold` 背景 + `--bg-mid` → OK。
- `.growthBtnTitle`: gold 枠 + gold on transparent → 上記同パターン。
- `.titleBtn`: gold 枠 + gold on transparent → 同上。
- `.rbBonus`: `--gold` + `--gold-tint`。境界 (装飾過多)。
- **問題: 境界 2 件 (spTag, equipChipPick)**。重大はなし。

### 4.5 shop (`src/pages/shop/style.module.scss`)
- 旧 `_variables.scss` 経由 (`var.$parchment` 等)。背景 = `var.$parchment` = `#0e0f13` (暗) + 文字 `var.$ink` = `#f2ede1` (明)。OK。
- `.tab`: `--surface-panel` + `--text-strong`。OK。
- `.tabActive`: **境界-8**。`var.$parchment` (黒) + `var.$verdant` (gold) → ≒ 5.9:1 OK ぎりぎり。
- `.chip`: 同上、active も同上。
- `.action`: `var.$verdant` (gold) + `var.$parchment` (黒文字)。OK 高コントラスト。
- `.confirmOk`: 同上 OK。
- `.stepperMax`: **境界-9** ≒ 3.9:1。
- `.nameBtn`: `var.$verdant` (gold) + underline → 親が `var.$parchment-card` (黒)。OK 5.3:1。
- **問題: 境界 2 件 (tabActive, stepperMax)**。重大なし。

### 4.6 forge (`src/pages/forge/style.module.scss`)
- ベース: `var(--bg-page-gradient)` + `--text-base` / `--text-strong`。OK。
- `.tabActive`: `--gold` 背景 + `--bg-mid` 文字。OK。
- `.ingotCopper / Silver / Gold`: **境界-10**。情報設計問題。
- `.confirmOk`: `linear-gradient(--gold, --gold-deep)` + `--bg-mid` (暗文字)。OK。
- `.confirmOkDanger`: `--danger` + `#fbeae6`。OK。
- `.statNext`: `#9ed8b4` on rowHighlight (`linear-gradient(100deg, #1a2030, #13151c)`)。OK 高コントラスト。
- `.maxChip`: `--gold` + rule-gold border on row background。OK。
- **問題: 境界 1 件 (情報設計問題)**。重大なし。

### 4.7 codex (`src/pages/codex/style.module.scss`)
- `.tabActive`: gold + `--bg-mid`。OK。
- `.badge` (敵詳細の弱点ラベル等): **境界-7** ≒ 4.6:1。
- `.cellDefeated`: `rgba(143,208,160,.04)` 背景 + 中の sprite 画像。OK。
- `.cellBoss.cellDefeated`: `#1c1316` + `rgba(212,103,79,.6)` 枠。OK (装飾)。
- `.bossDetail`: `linear-gradient(120deg, #231a1c, var(--bg-mid))` + `--text-strong`。OK。
- `.bossStamp`: `--danger-glow` のシール。装飾なので OK。
- **問題: 境界 1 件 (badge)**。重大なし。

### 4.8 dungeon (`src/pages/dungeon/style.module.scss`)
- `.depth / .menuStat / .return / .menuBtn / .tool / .turn / .back`: 黒背景 (`var.$parchment` 系) + `var.$ink` (明文字) → OK。
- `.fpvTurn / .fpvForward / .fpvBack`: **重大-1** (暗背景 + 暗文字)。
- `.action`: **境界-5** (≒ 3.9:1)。
- `.itemTarget`: **境界-6** (≒ 4.3:1)。
- `.menuGold`: **境界-4** (gold on 深黒、AA 通るが沈む)。
- `.toolActive`: `var.$parchment` (黒) + `var.$verdant` 枠 + box-shadow `rgba(63,107,74,.35)` → 文字色は親の `var.$ink` を継承。OK。
- `.itemTargetUseBtn`: `var(--success, #3f8a5c)` on transparent (#1a1d26 親) → コントラスト ≒ 4.0:1。**境界候補だが境界-11 (battle) と同性質**。記録のみ。
- `.bossGateWarn`: `#e09180` (danger-text) 点滅。装飾なので OK。
- **問題: 重大 1 件 (fpv*)、境界 3 件 (action, itemTarget, menuGold)**。最も問題が集中する画面。

### 4.9 battle (`src/pages/battle/style.module.scss`)
- 背景 = `var.$parchment` (黒) + `var.$ink` (明) — 旧コードだが OK。
- `.turnOrderAlly`: gold + bg-mid。OK。
- `.turnOrderEnemy`: **境界-12** (朱 + 暗、ResistBadges `.weak` と同パターンだがアイコン用途で許容)。
- `.cardCmd`: gold on panel-card → 5.3:1 OK。
- `.cmdPrimary / .menuPrimary`: `linear-gradient(--gold, --ink-faint)` + `var.$parchment` (暗文字)。グラデ末端の `--text-soft` (#c2bdb2) on 暗文字 → 4.7:1 OK 程度。OK。
- `.cmdTertiary`: **境界-11** (verdant-dark on parchment 黒)。
- `.skillCostLine`: `var.$verdant-dark` on `var.$parchment-card` (#15171f) → ≒ 4.0:1。**境界候補**。
- `.skillSummary / .targetMark`: `var.$ink-faint` (#c2bdb2) on panel-card (#15171f) → 高コントラスト OK。
- `.unionBanner / .unionInfo`: gold 枠 + gold 文字 on panel-card → ≒ 5.3:1 OK。
- `.fxIntro / .fxOutro`: 一瞬の暗転オーバーレイ。装飾 OK。
- `.resultPageTitle`: `--gold` on `#0d0f14` 暗背景 → 5.9:1 OK。
- `.defeatTitle`: `var.$vermilion` (朱) on 黒 + glow → ≒ 4.0:1。装飾文字 (大サイズ 46px) なので Large の 3:1 を通る OK。
- `.resultGoldValue`: `--gold-bright` (#e0c080) on `rgba(201,168,106,.08)` (tint) on `#0d0f14` 実効背景 → ≒ 8:1 OK。
- `.summonsLabel`: `#8fd0a0` on `var.$parchment` 黒 → 高コントラスト。
- **問題: 境界 2 件 (cmdTertiary, skillCostLine)**。重大なし (turnOrderEnemy は境界扱い)。

### 4.10 not-found (`src/pages/not-found/style.module.scss`)
- `.chapterMark`: `#5b6475` on dark gradient → ≒ 3.5:1。**Large 文字 (13px だが letter-spacing 0.36em) 装飾用途で許容**。境界記録のみ。
- `.code`: `#e8e6e0` on gradient 暗背景 → OK 高コントラスト。
- `.message`: `--text-faint` (#8c8a84) on 暗背景 → 5:1 OK。
- `.back`: gold tint + gold + gold rule。**境界扱い**だが既出の guild-char [境界-2] と同パターンなので独立カウントしない。
- **問題: 重大なし、境界はカウント済みパターンと重複**。

### 4.11 MenuButton (`src/components/common/MenuButton/style.module.scss`)
- `.button`: `--surface-panel` + `--text-strong` (旧変数経由)。OK 高コントラスト。
- `.primary`: gold + `--bg-mid` 文字。OK。
- **問題なし**。

### 4.12 SaveCard (`src/components/common/SaveCard/style.module.scss`)
- `var(--surface-card)` + `--text-base` / `--text-strong` / `--gold` / `--text-faint`。OK。
- `.corruptedText`: `--danger-text` (#e09180) on `--danger-tint` (rgba(212,103,79,.08)) on panel → 高コントラスト。
- **問題なし**。

### 4.13 StatBar (`src/components/common/StatBar/style.module.scss`)
- `.label`: `--text-soft` (`var.$ink-faint` = #c2bdb2)、`.value`: `--text-strong`。バー自体は色 fill のみ。
- **問題なし** (バー fill は色のみで文字は同居しないため)。

### 4.14 EncounterGauge (`src/components/common/EncounterGauge/style.module.scss`)
- 全要素アイコン/ドット表示。`.icon`: `var.$ink` on `var.$parchment-card`。OK。
- **問題なし**。

### 4.15 ResistBadges (`src/components/common/ResistBadges/style.module.scss`)
- `.weak`: **重大-2**。
- `.half`: gold + `--bg-mid` (旧 `$parchment`)。OK。
- `.null`: `var.$ink` (明) + `var.$parchment` (暗) → コントラスト OK 反転だが意図通り。
- `.absorb`: **重大-3**。
- **問題: 重大 2 件 (weak, absorb)**。最も問題密度が高い共通コンポーネント。

### 4.16 SkillTree (`src/components/common/SkillTree/style.module.scss`)
- `.node`: `var.$parchment-edge` (#1c2230) + `var.$ink` (明)。OK。
- `.learned / .maxed`: gold + `var.$parchment` (暗)。OK。
- `.nodeCost`: **境界-13** (deep gold on panel-card)。
- `.learnBtn:disabled`: bg-rise + `--text-soft`。コントラスト ≒ 5:1 OK。
- `.detailReq`: `--gold` on panel-card → OK。
- **問題: 境界 1 件 (nodeCost)**。重大なし。

### 4.17 SoundSettings / AppUpdater / AttackFx / InkSplatter / EnemySprite / CharacterPortrait
- SoundSettings: `--text-strong` / `--text-soft` / `--gold` on panel 系。OK。`.muteButton` の gold + gold-tint は装飾範囲。
- AppUpdater: `.banner` = panel + text-strong。`.button` = gold + bg-mid (暗文字)。OK。
- AttackFx: 純装飾アニメーション。文字色なし。
- InkSplatter: SVG 飛沫、文字なし。
- EnemySprite / CharacterPortrait: 画像のみ。
- **問題なし**。

---

## 5. 修正方針

### 重大 3 件への具体修正案

#### [重大-1] dungeon: FPV 操作ボタン文字色

**修正対象**: `src/pages/dungeon/style.module.scss` L88-122
**変更**: `color: var.$parchment` (= #0e0f13) → `color: var(--text-strong)` (= #f2ede1)

```diff
 .fpvTurn,
 .fpvForward,
 .fpvBack {
-  color: var.$parchment;
+  color: var(--text-strong);
 }
```

加えて、背景の半透明黒 `rgba(33, 36, 27, 0.62)` は FPV の壁色 (黒〜暗灰) と同化するため、不透明度を上げるか色を変えるべき:

```diff
-  background-color: rgba(33, 36, 27, 0.62);
+  background-color: rgba(6, 7, 10, 0.85);  // より暗く不透明寄り
```

これで明文字 + 暗背景 → ≒ 15:1 まで上がる。

#### [重大-2] ResistBadges: 弱点バッジ (朱赤 + 黒)

**修正対象**: `src/components/common/ResistBadges/style.module.scss` L43-47
**変更案 A** (文字色を明に): `color: #fff` (または `var(--text-strong)`)

```diff
 .weak {
-  color: var.$parchment;
+  color: var.$ink;  // = #f2ede1 (明)
   background-color: var.$vermilion;
 }
```

→ #b23c30 + #f2ede1 ≒ 5.5:1。AA Pass。

**変更案 B** (背景色を明らかに明るく): `background-color: var.$illumination-gold;` (gold) のような色変更は意味の混乱を招くため避ける。**案 A を推奨**。

#### [重大-3] ResistBadges: 吸収バッジ (明金 + 明)

**修正対象**: `src/components/common/ResistBadges/style.module.scss` L64-68
**変更**: 文字色を暗に逆転

```diff
 .absorb {
-  color: var.$ink;                              // = #f2ede1 (明)
+  color: var.$parchment;                        // = #0e0f13 (暗)
   background-color: var.$illumination-gold-soft; // = #e8d099
 }
```

→ #e8d099 + #0e0f13 ≒ 13:1。OK 高コントラスト。
他の `.half` / `.weak` バリアントとの整合性も取れる (gold/明背景 → 暗文字)。

### 境界 11 件への方針

| ID | 修正コスト | 推奨修正 |
|---|---|---|
| 境界-1 (guild-char .spTag) | 小 | gold-tint 廃止し `background: transparent`、または border のみで chip 化 |
| 境界-2 (guild-char .equipChipPick) | 小 | 同上 (装飾密度を下げる) |
| 境界-4 (dungeon .menuGold) | 中 | `color: var(--gold-bright)` (#e8d099) に上げる |
| 境界-5 (dungeon .action) | 小 | `color: var(--gold)` (= #c9a86a) に変更 → ≒ 5.3:1 へ |
| 境界-6 (dungeon .itemTarget) | 小 | 同上 |
| 境界-7 (codex .badge) | 小 | 現状維持 (4.6:1 で AA Pass) |
| 境界-8 (shop .tabActive) | 小 | 現状維持。または背景を `--gold-tint` に変更し金強調を明示 |
| 境界-9 (shop .stepperMax) | 小 | 境界-5 と同パターン、`color: var.$verdant` に上げる |
| 境界-10 (forge ingot ボタン群) | 小 | 金属の希少度に応じた **明度順序** (銅 < 銀 < 金) を文字色明度で再設計 |
| 境界-11 (battle .cmdTertiary) | 小 | `color: var.$verdant` (= #c9a86a) に上げる |
| 境界-12 (battle .turnOrderEnemy) | 中 | アイコン用途なので **現状維持可**。気になる場合は `color: var.$ink` (明文字) に反転 |
| 境界-13 (SkillTree .nodeCost) | 小 | `color: var(--gold)` (= #c9a86a) に上げる |

### 統一原則 (提案)

1. **「gold 文字 on 暗背景」と「gold tint 背景 + gold 文字」を意味的に区別する**。前者は通常テキスト、後者は強調装飾という棲み分け。装飾過多な場所は border + transparent BG にして字を **`var(--gold)` 単色**で締める。
2. **deep gold (`#b08f4f`) は文字色として使わない**。装飾枠線専用とする (border 用には適切なコントラスト関係になっている)。
3. **`var.$parchment` を文字色に使う旧コードは ResistBadges を除き、装飾系の意図通り (gold/明背景用) のみ残す**。それ以外は `var(--text-strong)` などに置換するリファクタを推奨。

### 修正コスト見積

- **重大 3 件**: いずれも 1 ファイル × 数行の変更。**合計 0.5 時間以内**。
- **境界 11 件 (推奨修正案を全採用)**: 各 1〜2 行の color トークン差し替え。**合計 1 時間以内**。
- **統一原則の全面リファクタ** (旧 `_variables.scss` 経由を撲滅): shop, dungeon, battle, MenuButton, StatBar, EncounterGauge, SkillTree, ResistBadges の旧変数を撤去。**4〜6 時間**。これは別タスク扱いを推奨。

---

## 付録 A: 監査対象ファイル一覧

| 画面 | scss ファイル |
|---|---|
| title | `src/pages/title/style.module.scss` |
| town | `src/pages/town/style.module.scss` |
| guild | `src/pages/guild/style.module.scss` |
| guild-char | `src/pages/guild-char/style.module.scss` |
| shop | `src/pages/shop/style.module.scss` |
| forge | `src/pages/forge/style.module.scss` |
| codex | `src/pages/codex/style.module.scss` |
| dungeon | `src/pages/dungeon/style.module.scss` |
| battle | `src/pages/battle/style.module.scss` |
| not-found | `src/pages/not-found/style.module.scss` |
| MenuButton | `src/components/common/MenuButton/style.module.scss` |
| SaveCard | `src/components/common/SaveCard/style.module.scss` |
| StatBar | `src/components/common/StatBar/style.module.scss` |
| EncounterGauge | `src/components/common/EncounterGauge/style.module.scss` |
| ResistBadges | `src/components/common/ResistBadges/style.module.scss` |
| SkillTree | `src/components/common/SkillTree/style.module.scss` |
| SoundSettings | `src/components/common/SoundSettings/SoundSettings.module.scss` |
| AppUpdater | `src/components/AppUpdater/style.module.scss` |
| AttackFx | `src/components/common/AttackFx/AttackFx.module.scss` |
| InkSplatter | `src/components/common/InkSplatter/style.module.scss` |
| EnemySprite | `src/components/common/EnemySprite/style.module.scss` |
| CharacterPortrait | `src/components/common/CharacterPortrait/style.module.scss` |

## 付録 B: コントラスト計算の手順 (概算)

WCAG 2.x の相対輝度 (relative luminance) は:

```
L = 0.2126 * R_lin + 0.7152 * G_lin + 0.0722 * B_lin
ここで C_lin = C/255 が <= 0.03928 なら C/255/12.92, それ以外 ((C/255+0.055)/1.055)^2.4
```

コントラスト比 = `(L_明 + 0.05) / (L_暗 + 0.05)`。
本監査では概算値を使用しているため、厳密な実測は別途必要 (ただし「明らかに読めない」レベルは明確)。
