# battle 画面 — 改訂版 v5 — 案A v3 完全対応

本書は **モック「案A v3」（`/tmp/sekaiju-design/案A_v3.dc.html` line 967〜1240）に完全対応**
させるための sonnet サブエージェント向け実装指示書である（v4 までの内容は本書で全面上書き）。

v4 までで既に「行動順帯 / 対象情報パネル / 弱点チップ / 角バッジ」など主要構造は実装済み。
**v5 は既存実装を保護した上で**、Claude Design v3 で新規追加されたフレーム
（`9c result` / `9d sequence` / `9e attack FX 6属性` / `9f status 10種`）を取り込み、
不足要素を「**追加 / 改良**」する。

前提資料・トークン定義は `dev-docs/redesign-A.md`（特に §1.5「レイアウト運用ルール」）と
`dev-docs/design-source-v3-changelog.md`（v2 → v3 改訂メモ・本書の根拠）を参照。

---

## 0. v5 の目的とスコープ

| ID | フレーム | v4 まで | v5 でやること |
| --- | --- | --- | --- |
| 9a | interactive main | 構造あり | 行動順帯のスリム化 / ヘッダ内スリムログ / 召喚リボン独立 / 対象情報パネル正式採用（既存維持＋細部調整） |
| 9b | intro | 既存 | 維持 |
| **9c** | **result（新規）** | なし | **EXP バー + barShimmer / レベルアップ LIFO カード / ドロップ / 獲得 G / 「探索へ戻る」を独立リザルト画面に分離** |
| **9d** | **sequence timeline（新規・仕様）** | なし | **0–800ms タイムラインを CSS animation で実装。各タイミングで属性別攻撃 FX → shakeA → ダメージ pop → HP 減算 → dissolve を駆動** |
| **9e** | **attack FX 6 属性（新規）** | 暗黙 | **`atkSlash / atkThrust / atkBlunt / atkFire / atkIce / atkVolt` の keyframe を追加し、属性 → FX 対応を 9a の被弾演出に流す。Crit は scale 1.3 + 金 flash 重畳** |
| **9f** | **status 10 種（新規）** | 一部 | **角バッジを 10 種フル対応（毒/麻/眠/盲/乱/呪/死/頭/腕/脚）。色・記号をモック準拠で定義。複数時は右肩に 2px gap で並ぶ** |
| 9g | defeat | 既存 | 味方 HP/TP（=0）表示の小カードを追加 |
| 9h | flee | 既存 | 速線演出を維持（既存実装で OK） |

**ロジック層（`src/domain/*`）はほぼ触らない**。`Character.exp` 拡張や `BossDefeatLogEntry.enemyId`
は別画面 / 別タスクで対応するので v5 では扱わない。v5 は **UI 層のみの改良**。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 1.1 触ってよい（編集対象）

- `src/pages/battle/index.tsx`
- `src/pages/battle/style.module.scss`
- `src/pages/battle/Battle.stories.tsx`（リザルト画面のストーリーを追加するときのみ）
- `src/_obsidian.scss` の **末尾に keyframes と CSS 変数を追記する**（追記のみ。既存定義は触らない）

### 1.2 触ってはいけない（v5 では絶対変更しない）

- `src/_variables.scss`（写本テーマ互換のためそのまま）
- `src/_obsidian.scss` の **既存定義部分**（v5 で追記するのは末尾のみ）
- `src/domain/combat.ts` の **`previewTurnOrder` 本体**（中身は変更しない。import して呼ぶのみ）
  - ※ `src/domain/battle.ts` に **derived getter（計算だけの純関数 export）** を追加するのは可。
    既存 state や型の変更、`resolveTurn` のロジック変更は **NG**。
- `src/domain/skill.ts` / `src/domain/strategy.ts` 等の戦闘ロジック
- 共通コンポーネント:
  - `src/components/common/SkillTree/**`
  - `src/components/common/ResistBadges/**`（v3 で `compact` 対応済み・そのまま使う）
  - `src/components/common/StatBar/**`
  - `src/components/common/BattleExpBar/**`（v5 のリザルトで利用）
  - `src/components/common/CharacterPortrait/**`
  - `src/components/common/EnemySprite/**`
  - `src/components/common/InkSplatter/**`（v5 の被弾 pop / 会心 flash で利用）
  - `src/components/common/ItemSprite/**`
- 他ページ（title / town / guild / shop / forge / codex / dungeon / not-found）の SCSS

---

## 2. やってはいけないこと

1. **Agent / Task を spawn しない。** 自分で `Read` / `Edit` / `Write` / `Bash` を使って実装する
   （委譲の入れ子禁止）。
2. **共通コンポーネントを変更しない。** `InkSplatter` / `BattleExpBar` / `StatBar` /
   `CharacterPortrait` / `EnemySprite` / `ResistBadges` は **そのまま import して使う**のみ。
3. **戦闘ロジック (`src/domain/battle.ts` の `resolveTurn` / `startBattle` /
   `src/domain/combat.ts` / `src/domain/skill.ts`) を変更しない。**
   - `previewTurnOrder` は **読むだけ**。新規 derived getter を追加する場合も、既存関数の挙動と
     型を変えない（純粋な追加 export のみ）。
4. **`resolveTurnOrder` の rng (`rngRef`) を消費しない。** 行動順帯のための rng は別系統の
   ephemeral rng（`createRng(state.turn * 0x9e3779b9)`）を毎レンダー作る（v4 と同じ実装）。
5. **既存テストの assert を変えない。** `yarn test` が緑のまま通ること。
6. **モック上のデバッグ表記（`<!-- mock-only -->` 相当の「リザルト例 ▸」「mock data」など）を
   実装に持ち込まない。** リザルトは正式な独立画面 `9c` として実装する。
7. **`_variables.scss` を変更しない。** 黒曜トークンは確定済み。色の調整は
   `style.module.scss` で CSS 変数 (`var(--gold)` 等) を直接参照する。

---

## 3. 既存実装の保護（削除禁止リスト）

v3 / v4 で実装済みの次のクラス・要素は **絶対に削除しない**。v5 はこれらに **追加 / 改良** する
形にする。再構築（rebuild）する場合も、既存の DOM 構造を温存する方針で。

### 3.1 削除禁止クラス（`src/pages/battle/style.module.scss`）

| クラス | 役割 | 由来 |
| --- | --- | --- |
| `.targetInfoPanel` / `.targetInfoName` / `.targetInfoResist` / `.targetInfoEmpty` | 対象情報パネル（固定 46px・敵タップで耐性表示） | v3 |
| `.enemyWeakChips` / `.weakChip` / `.weakChip_fire/ice/volt/slash/pierce/bash` | 敵カード直下の弱点チップ | v3 |
| `.enemyAilBadge` | 敵カード右上の状態異常角バッジ | v3 |
| `.unionReadyBadge` | 味方カード左上の `U!` バッジ | v3 |
| `.cardRowBack` | 後衛行（2 列 grid・中央寄せ） | v3 |
| `.turnOrderBar` / `.turnOrderIcon` / `.turnOrderAlly` / `.turnOrderEnemy` / `.turnOrderMore` | 行動順帯（最大 8 アイコン + …） | v4 |
| `.chapterRow` / `.chapterMark` | ヘッダ章マーカー | v2 |
| `.fxIntro` / `.fxOutro` / `.fxLose` | エンカウント暗転 / 戦闘終了暗転 | v2 |
| `.fleeLines` / `.fleeSpeedLine` | 逃走成功の速線 | v3 |
| `.expList` / `.expRow` / `.expName` / `.expLv` / `.expUp` | リザルトの経験値リスト | issue #50 |
| `.dialogOverlay` / `.dialog` / `.dialogTitle` / `.dialogName` / `.dialogStats` / `.dialogStat` | レベルアップダイアログ | issue #18 |
| `.flash` / `@keyframes cardFlash` | 被弾点滅 | v2 |
| `.victoryGold` / `.levelUpGold` | 勝利・レベルアップの gold InkSplatter | Phase 2 |
| `.inkOverlay` | カード上 InkSplatter のラッパ | Phase 2 |

### 3.2 削除禁止ロジック（`src/pages/battle/index.tsx`）

| シンボル | 役割 |
| --- | --- |
| `previewTurnOrder` の import と `turnOrderPreview` の useMemo | 行動順帯の元データ |
| `InkSplatter` の被弾 pop / 回復 / 会心 / gold バリアント呼び出し | ダメージ表示 |
| `BattleExpBar` 呼び出し（`expResults` map 内）| EXP バー |
| `partyExpResults` / `battleRewards` の利用 | 報酬計算 |
| `flashIds` ステート / 点滅トリガー | 被弾フィードバック |
| `levelQueue` ステート + LIFO 表示 | レベルアップ順次表示 |
| エンカウント `introFx` / 終了 `outroFx` | 暗転演出 |

これらは **そのまま温存**し、v5 では「追加スタイル / 追加 keyframe / 追加クラスの組み合わせ」で
モック準拠の見た目を実現する。

---

## 4. モック構造マップ（9a〜9h 全フレーム）

各フレームの「モック上の実装意図」と「本リポジトリでの対応方針」を列挙する。
モック原本（line 番号）と相互参照しながら読む。

### 4.1 9a interactive main（モック line 967〜1080）

**v3 で追加されたスリム化要素**：

| モック要素 | モック line | v5 対応 |
| --- | --- | --- |
| ヘッダ内のスリム戦闘ログ（1 行 + 「タップで全ログ」） | 988〜989 | **既存 `.log` を `.battlefield` 内から `.header` 内へ昇格**。`white-space: nowrap; overflow: hidden; text-overflow: ellipsis;` の 1 行表示。タップで `logOpen=true` → 全文オーバーレイ（既存挙動を維持）。 |
| 行動順帯（28〜30px 正方アバター・最大 8 + `…`） | 974〜986 | 既存 `.turnOrderBar` を維持。**先頭セルだけ 30px・`border: 2px solid var(--gold)` + `box-shadow: 0 0 8px var(--gold-glow)` + `animation: obsidian-glowPulse 2.2s ease-in-out infinite`** + 上端 -12px に「次」ラベル（`font-size: 7px; color: var(--gold); letter-spacing: .08em`）を追加。以降 28px、敵セル `border-color: rgba(212,103,79,.6)`、味方セルは `<CharacterPortrait size={24} />`、召喚体 `<span>✦</span>`（既存実装と同じ）。 |
| 敵カードの均一高（弱点チップ `min-height:14px` 固定） | 999〜1019 | 既存 `.enemyWeakChips { min-height: 14px; }` で達成済み。**耐性チップは敵カードから出さない**（対象情報パネルに集約・既存方針を維持）。 |
| 対象情報パネル（固定 46px・敵タップで即更新） | 1024〜1032 | 既存 `.targetInfoPanel { min-height: 46px }` を維持。**`<ResistBadges compact />` で属性弱/耐 + 状態異常 効/無のフルセットを表示**（v3 既実装）。 |
| 召喚リボンの独立（敵エリアから外し、対象情報パネル直下の水平バンド） | 1033〜1036 | 既存 `.summons` を `.battlefield` 内の **対象情報パネル直下**に置く（DOM 順序として既存 `.summons` がパネル直後で OK）。モック準拠で「召喚 3/3」ラベル + 各召喚カードを `flex: 1` で横並び。 |
| コマンドパネルの主従構造 | 1069〜1076 | global: `たたかう`(56px gold) + `さくせん`(44px blue outline) + `にげる`(44px red outline) の 2 段。individual: `攻撃`(50px gold) + `スキル`(44px blue) + `道具`(44px green) + `防御`(44px white outline) の 2 段 + `もどる`(34px)。**既存 `.menuPrimary / .menuStrategy / .menuFlee / .cmdPrimary / .cmdSub / .cmdTertiary / .cmdBack` を使い、サイズだけモック準拠に微調整**（既存ボタン構造は維持）。 |
| globalCmd 中の敵暗色化を廃止 | v3 §A#5 | **コマンド入力中も敵カードは `opacity: 1` で表示**（既存実装と同じ。`encPulse` のみで待機表現）。 |

**追加：背景の `encPulse` アニメーション**（モック line 992）
- 敵エリア背景 `.enemies` の radial-gradient に `animation: obsidian-encPulse 4.5s ease-in-out infinite;`
  を付ける。`encPulse` は新規 keyframe（§7 で定義）。

### 4.2 9b intro（モック line 1082〜1091）

既存 `obsidian-sealStamp` keyframe をそのまま流用。封蝋シジル + 敵シルエットせり上がり。
**v5 で追加変更はなし**（モック維持で既存実装で OK）。`introFx` トリガーで `.fxIntro` を出す。

### 4.3 9c result — **新規・独立リザルト画面**（モック line 1093〜1122）

v4 までは `state.outcome !== 'ongoing'` のとき `.resultOverlay` を `.command` エリアの位置に
重ねていた。**v5 では `9c result` を独立画面として正式に分離**する。

#### 4.3.1 構造（DOM 階層）

```
.layout
  .resultPage          // v5 新規・勝利時のみ表示
    .resultHeader      // 「戦果」 + 「探索へ戻る」 (44px 主・gold)
    .resultExpBar      // EXP バー (barShimmer 1s loop) + Lv X → Lv X+1
    .resultLevelUps    // LIFO 積み上げカード（3 枚まで重なる）
    .resultLoot        // ドロップ一覧（横並び）
    .resultGold        // 獲得 G（金箔 InkSplatter）
    .resultPrimary     // 「探索へ戻る」 (50px gold primary)
```

#### 4.3.2 各要素の仕様

**ヘッダ（モック line 1098）**：
- タイトル「勝利」 — `font-family: var(--font-display); font-size: 30px; color: var(--gold); letter-spacing: .28em; text-shadow: 0 0 24px var(--gold-glow);`
- サブ「F{depth} ・ {敵名} ほか N 体を撃破」 — `font-size: 10px; color: var(--text-faint); letter-spacing: .18em;`

**EXP バー（モック line 1099）**：
- 「獲得経験値」 + `+{rewards.exp} EXP`（`font-family: var(--font-mono); color: var(--gold);`）
- バー本体 `height: 9px; border-radius: 5px;` の中で
  `background: linear-gradient(90deg, var(--gold), var(--gold-bright)); background-size: 40px 40px; animation: obsidian-barShimmer 1s linear infinite;`
- **既存 `BattleExpBar` をそのまま使う**（durationMs=1000ms）。視覚効果としての `barShimmer`
  は別レイヤーで重ねるか、`BattleExpBar` 内の bar に
  `background-image` を `linear-gradient(...) 40px 40px` で重ねる
  （`BattleExpBar` は変更しない代わりに、外側のラッパに mask / overlay で `barShimmer` を重ねる）。

**レベルアップ LIFO カード（モック line 1100〜1110）**：
- `.resultLevelUps` 内で **「3 枚積み上げ」を CSS で表現**：先頭カードが手前、後方 2 枚は影として
  ずらして配置。
  - 後方 2 枚目: `position: absolute; left: 16px; right: 16px; top: 18px; height: 82px; background: #181b22; border: 1px solid rgba(201,168,106,.16);`
  - 後方 1 枚目: `position: absolute; left: 8px; right: 8px; top: 9px; height: 82px; background: #1a1d26; border: 1px solid rgba(201,168,106,.22);`
  - 手前カード: `position: relative; background: #1a1d26; border: 1px solid var(--rule-gold-strong); padding: 13px 15px; box-shadow: 0 10px 26px rgba(0,0,0,.5);`
- 内容: `{name}` / `Lv{from} → {to}`（`color: var(--gold)`、新 Lv は `text-shadow: 0 0 10px var(--gold-glow);`）
  / ステ差分（`HP +n / STR +n / AGI +n` / `SP +n`）
- ロジック: 既存 `levelQueue` LIFO を **そのまま使う**（v5 ではこの LIFO 表示をリザルト画面内に
  統合するだけ）。**OK ボタンを押す → 次の `levelQueue.slice(1)` で次カードへ**（既存挙動）。
- レベルアップが 0 件の場合は `.resultLevelUps` を非表示。

**ドロップ（モック line 1113〜1117）**：
- `rewards` の `drops` を 2 列 grid で並べる（`<ItemSprite size="sm" />` + 名前 + 数量）
- アイテムカード: `background: var(--surface-card); border: 1px solid var(--rule-soft); border-radius: 3px; padding: 8px 10px;`

**獲得 G（モック line 1118）**：
- `background: var(--gold-tint); border: 1px solid var(--rule-gold);` パネルに
  「獲得ゴールド」 + `◇ +{rewards.gold} G`（`font-family: var(--font-mono); color: var(--gold-bright);`）
- 既存 `.victoryGold` の gold InkSplatter は維持（裏で一瞬パッと描画）。

**「探索へ戻る」ボタン（モック line 1119）**：
- `height: 50px; background: linear-gradient(180deg, var(--gold), var(--gold-deep)); color: var(--bg-mid); font-weight: 700; letter-spacing: .14em;`
- `onClick={() => void finish(state)}` — 既存挙動と同じ。
- **`disabled` 条件**: `busy || levelQueue.length > 0 || (expAnimStart && !expDone)`（既存と同じ）

#### 4.3.3 全滅 / 逃走時

- **全滅**: 既存 `.defeatTitle` + `.resultBody` の構造を **9g defeat** 準拠に拡張（§4.7）。
- **逃走**: 既存 `.fleeTitle` + `.fleeLines` の構造を **9h flee** 準拠で維持（§4.8）。
- これらは `.resultPage` ではなく、別の独立画面 `.defeatPage` / `.fleePage` として描画する。
  （勝利だけ豪華なリザルトで、敗北/逃走は軽量な画面）

### 4.4 9d 攻撃シーケンスタイムライン — **新規・仕様**（モック line 1124〜1146）

モック `9d` は「攻撃の標準タイムラインを示す仕様フレーム」。実装は次のように **CSS animation
の発火タイミング**で表現する。

#### 4.4.1 タイムライン

| 時刻 | イベント | z-index | 実装方針 |
| --- | --- | --- | --- |
| 0ms | 攻撃発動 + SE 再生 | 味方カード層 | 既存 `play('attack')` を `anim` 進行と同期して発火（既存実装に時刻同期だけ追加。SE はそのまま）。 |
| **50ms** | **攻撃 FX 開始（属性別 700ms）** | **z: 30**（敵 sprite の上） | **新規 `.attackFx` レイヤー**を敵カード内に絶対配置。属性に応じて `atkSlash / atkThrust / atkBlunt / atkFire / atkIce / atkVolt` keyframe を割り当てる。`animation-duration: .7s; animation-fill-mode: forwards;` |
| 200ms | 敵カード shakeA 開始（240ms） | カード単体 | 既存 `.flash` クラスを `shakeA` ベースに置換 or 並走させる。`@keyframes shakeA` を新規追加。`animation: shakeA .24s ease;` |
| **280ms** | **ダメージ pop（splat・760ms）** | **z: 40** 最前面 | 既存 `InkSplatter` 呼び出しを 280ms 遅延させる（既存タイミング `anim.revealed === 0 ? 380 : 900` から **遅延を 280ms** に揃え、CSS variable `--seq-pop-delay: 280ms` で表現）。会心は同時に `--seq-pop-scale: 1.3` + 金 flash を重畳。 |
| 400ms | HP バー減算開始（260ms ease） | カード内 | `StatBar` の value 更新を **`transition: width 260ms ease`** で反映。`StatBar` は変更しないので、StatBar をラップする div の `width` を CSS transition でアニメートする方式は不可。**代案: `StatBar` の value props を `requestAnimationFrame` で 400ms 遅延して更新**。これは index.tsx 内の `anim` 進行中の HP 表示ロジック `dispOf()` で「pop が出てからバーを減らす」順序を `setTimeout` で 120ms ずらして表現する。 |
| 660ms | 撃破時 dissolveE 開始 | カード単体 | `.down` カードに `animation: obsidian-dissolveE 0.5s ease-out forwards;` を付ける。新規 keyframe。 |
| 800ms | 全終了 → 次の行動 / globalCmd へ | — | 既存 `anim` の `revealed++` タイミングを 800ms に揃える（v5 では `revealed === 0 ? 380 : 800` に変更）。 |

#### 4.4.2 属性 → FX マッピング（モック line 1141〜1144）

> **追補（ユーザー追加指示）** — 英属性キー（実装側 `slash` / `bash` / `pierce` ...）と
> 日本語ラベル（モック / UI 側 `斬` / `壊` / `突` ...）と FX keyframe（`atkSlash` / `atkBlunt` ...）の
> **対応を整合**させること。下表は唯一の正規対応表として扱う。

| 英属性キー（element / 武器種 derived） | 日本語ラベル（既存 `ELEM_LABEL`） | FX keyframe（v5 で追加する `ELEM_FX`） | 武器種マッピング元（PR #74） |
| --- | --- | --- | --- |
| `slash` | 斬 | `atkSlash` | `sword 剣` / `axe 斧` |
| `pierce` | 突 | `atkThrust` | `spear 槍` / `bow 弓` |
| `bash` | 壊 | `atkBlunt` | `fist 素手` |
| `fire` | 火 | `atkFire` | （スキルのみ） |
| `ice` | 氷 | `atkIce` | （スキルのみ） |
| `volt` | 雷 | `atkVolt`（新規 keyframe） | （スキルのみ） |
| `almighty` | 無 | `atkFire` 流用（モック v3 仕様） | （スキルのみ） |

- 既存 `src/pages/battle/index.tsx::ELEM_LABEL` は **変更禁止**（同じキー集合を維持）。
- `ELEM_FX` は **新規追加**。同じキー集合（`slash/pierce/bash/fire/ice/volt/almighty`）で同名・同位置参照できるよう書く。
- 通常攻撃の element は **PR #74 で実装済**の「行動者の装備武器 → 属性」マップに従う
  （`src/domain/equipment.ts` or 該当 helper を grep して既存実装を再利用、変更しない）。
- スキルの element は `BATTLE_SKILLS[skillId].element`（変更しない）。
- どちらも英属性キーのまま `ELEM_FX[element]` で FX を引ける。

これで「sword/bash → 斬撃/打撃」（およびそれぞれの攻撃 FX）が **コード/UI/演出 を貫いて整合**する。



```ts
// src/pages/battle/index.tsx の ELEM_LABEL の下に追加
const ELEM_FX: Record<string, string> = {
  slash: 'atkSlash',
  pierce: 'atkThrust',
  bash: 'atkBlunt',
  fire: 'atkFire',
  ice: 'atkIce',
  volt: 'atkVolt',
  almighty: 'atkFire', // 無は火を流用（モック v3 仕様）
};
```

#### 4.4.3 属性の決定

属性は **「直近のログ行が示すスキル / 通常攻撃の element」** から決まる。
- 通常攻撃: 行動者の装備武器 element（既存 PR #74 で実装済み）。
- スキル: `BATTLE_SKILLS[skillId].element`。
- 既存の `state.log[i]` には element がそのまま入っていないので、**v5 で導入する追加方針**：
  - 案 A: `state.log` の `text` に対して string-match（`「火」「氷」「雷」「斬」「突」「壊」` を
    含むか）。安易だが state 形状を変えずに済む。
  - 案 B: `BattleLogEntry` に optional `element` フィールドを追加（型変更が必要・**戦闘ロジック
    変更に当たるので v5 では NG**）。
  - → **案 A を採用**。`getLogElement(text)` の小さい純関数を index.tsx に追加し、
    マッチしなければ `slash` をフォールバック。

```ts
function getLogElement(text: string): keyof typeof ELEM_FX {
  if (text.includes('火') || text.includes('炎')) return 'fire';
  if (text.includes('氷')) return 'ice';
  if (text.includes('雷')) return 'volt';
  if (text.includes('突')) return 'pierce';
  if (text.includes('壊') || text.includes('打')) return 'bash';
  return 'slash'; // デフォルト
}
```

#### 4.4.4 `.attackFx` レイヤー実装

`.enemy` 内に絶対配置で `.attackFx` を追加：

```tsx
{flashIds.has(e.id) && (() => {
  const logText = state.log[anim?.revealed ? anim.revealed - 1 : 0]?.text ?? '';
  const element = getLogElement(logText);
  const isCrit = logText.includes('（会心）');
  return (
    <div
      className={`${styles.attackFx} ${styles[`fx_${element}`]} ${isCrit ? styles.fxCrit : ''}`}
      aria-hidden="true"
    />
  );
})()}
```

CSS は `position: absolute; inset: 0; pointer-events: none; z-index: 30;` で、
`background: radial-gradient(...)` + `animation: var(--fx-name) .7s ease forwards;`。
各属性ごとに `.fx_slash { --fx-name: atkSlash; --fx-color: 255,217,201; }` のように
**CSS 変数で色と keyframe 名を切り替える**。

### 4.5 9e 攻撃 FX 6 属性（モック line 1148〜1174）

モック `9e` フレームは **「battle 画面で実際にどう発動するか」のサンプル**を 6 グリッドで
並べている。**この `9e` 自体を EffectsGallery には追加しない**（EffectsGallery は別途・
モック原本準拠で別タスク扱い）。

**v5 の対応は §4.4.4 の `.attackFx` レイヤーに集約**。下の表は §4.4 で参照した属性 → keyframe
マッピングを再掲：

| 属性 | keyframe（新規） | 主色 CSS 変数 | モック line |
| --- | --- | --- | --- |
| 斬 slash | `atkSlash` | `255,217,201` | 1156 |
| 突 pierce | `atkThrust`（+ 補助 `thrustLine`） | `207,224,255` | 1157 |
| 壊 bash | `atkBlunt`（+ 補助 `ringExpand`） | `255,224,160` | 1158 |
| 火 fire | `atkFire` | `255,150,90` | 1159 |
| 氷 ice | `atkIce` | `160,210,240` | 1160 |
| 雷 volt | `atkVolt`（**新規必須**） | `232,216,91` | 1161 |
| 無 almighty | `atkFire` 流用（モック v3 仕様） | — | — |
| **会心 Crit** | 上記 + `critFlash` 重畳 + `scale(1.3)` | `255,210,122` | 1167 |

会心の重畳：
- `.attackFx.fxCrit::after` で半透明の金 radial-gradient を重ね、`animation: critFlash 1.2s ease-in-out forwards;`
- ダメージ pop（既存 `InkSplatter variant="crit"`）に `transform: scale(1.3)` を付ける（既存
  InkSplatter は変更しないので、`.inkOverlay.crit { transform: scale(1.3); }` のラッパ側で対応）。

### 4.6 9f 状態異常 10 種 + 支援（モック line 1176〜1207）

**角バッジを 10 種フル対応**。モック line 1184〜1193 の色定義に従う：

| 状態異常 | 記号 | 背景 | テキスト | キー（型） | モック line |
| --- | --- | --- | --- | --- | --- |
| 毒 poison | 毒 | `#5a3a6e` | `#e7d2f5` | `poison` | 1184 |
| 麻痺 paralysis | 麻 | `#5e5a28` | `#e8d85b` | `paralysis` | 1185 |
| 睡眠 sleep | 眠 | `#33425e` | `#9fb6e0` | `sleep` | 1186 |
| 盲目 blind | 盲 | `#2e3340` | `#aab0bc` | `blind` | 1187 |
| 混乱 confusion | 乱 | `#5e3a4e` | `#e6aecb` | `confusion` | 1188 |
| 呪い curse | 呪 | `#3a2a4a` | `#c0a8e0` | `curse` | 1189 |
| 即死 instantDeath | 死 | `#4a1f1f` | `#e89080` | `instantDeath` | 1190 |
| 頭封じ headBind | 頭 | `#5e3636` | `#e0a0a0` | `headBind` | 1191 |
| 腕封じ armBind | 腕 | `#5e3636` | `#e0a0a0` | `armBind` | 1192 |
| 脚封じ legBind | 脚 | `#5e3636` | `#e0a0a0` | `legBind` | 1193 |

#### 4.6.1 実装方針

**現状の `enemyAilBadge`**：単一バッジのみ表示（`e.ailments[0]` だけ）。

**v5 改良**：
- `e.ailments` を **全件描画**し、複数時は **右肩に 2px gap で横並び**。
- 各バッジは `width: 24px; height: 24px; border-radius: 3px;` + 上記の色マップ。
- 凡例（記号は日本語 1 文字）：

```ts
const AILMENT_BADGE: Record<string, { label: string; bg: string; fg: string }> = {
  poison:       { label: '毒', bg: '#5a3a6e', fg: '#e7d2f5' },
  paralysis:    { label: '麻', bg: '#5e5a28', fg: '#e8d85b' },
  sleep:        { label: '眠', bg: '#33425e', fg: '#9fb6e0' },
  blind:        { label: '盲', bg: '#2e3340', fg: '#aab0bc' },
  confusion:    { label: '乱', bg: '#5e3a4e', fg: '#e6aecb' },
  curse:        { label: '呪', bg: '#3a2a4a', fg: '#c0a8e0' },
  instantDeath: { label: '死', bg: '#4a1f1f', fg: '#e89080' },
  headBind:     { label: '頭', bg: '#5e3636', fg: '#e0a0a0' },
  armBind:      { label: '腕', bg: '#5e3636', fg: '#e0a0a0' },
  legBind:      { label: '脚', bg: '#5e3636', fg: '#e0a0a0' },
};
```

- DOM 構造（敵カード）：

```tsx
{e.ailments.length > 0 && (
  <div className={styles.enemyAilBadgeRow}>
    {e.ailments.map((ail) => {
      const m = AILMENT_BADGE[ail.type];
      if (!m) return null;
      return (
        <span
          key={ail.type}
          className={styles.enemyAilBadge}
          style={{ background: m.bg, color: m.fg }}
          title={`${m.label} 残り${ail.remainingTurns}T`}
        >
          {m.label}
        </span>
      );
    })}
  </div>
)}
```

- `.enemyAilBadgeRow`: `position: absolute; top: -3px; right: -3px; display: flex; gap: 2px;`
- `.enemyAilBadge`（既存）: モック準拠で `width:24px; height:24px; border-radius:3px; padding:0; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700;` に再調整。

- `U!` バッジは **左肩**に分離（既存 `.unionReadyBadge` は `top: -4px; left: -4px;`・既存仕様で OK）。

#### 4.6.2 味方カードへの流用

味方カードも同じ `AILMENT_BADGE` を使い、`.allyAilBadgeRow` / `.allyAilBadge` で同等の表示。
（既存 `cardMarks` の `🔒` `🌀` 簡易マークを **角バッジに置換**。`cardMarks` クラスは
保持するが内容は新角バッジで上書き。）

### 4.7 9g defeat（モック line 1209〜1221）

既存 `.defeatTitle` を維持しつつ、モック line 1217 の **「隊列の最期 HP/TP」小カード**を追加：

```tsx
{state.outcome === 'lose' && (
  <div className={styles.defeatPartyStatus}>
    <div className={styles.defeatPartyHead}>隊列の最期 ・ HP/TP</div>
    {state.allies.map((a) => (
      <div key={a.id} className={styles.defeatPartyRow}>
        <span className={styles.defeatPartyName}>{a.name}</span>
        <div className={styles.defeatPartyBar}>
          <div className={styles.defeatPartyHpFill} />
        </div>
        <span className={styles.defeatPartyVal}>0</span>
      </div>
    ))}
  </div>
)}
```

スタイル（モック準拠）：
- `.defeatPartyStatus`: `width: 248px; background: #140e10; border: 1px solid rgba(212,103,79,.25); border-radius: 4px; padding: 11px 13px; margin-top: 26px;`
- `.defeatPartyHead`: `font-size: 9px; letter-spacing: .16em; color: #8c7a78; margin-bottom: 8px;`
- `.defeatPartyRow`: `display: flex; align-items: center; gap: 7px;`
- `.defeatPartyName`: `font-size: 10px; color: var(--text-soft); width: 54px;`
- `.defeatPartyBar`: `flex: 1; height: 3px; border-radius: 2px; background: rgba(255,255,255,.08); overflow: hidden;`
- `.defeatPartyHpFill`: `width: 0%; height: 100%; background: var(--danger-glow);`
- `.defeatPartyVal`: `font-family: var(--font-mono); font-size: 8px; color: var(--text-quote); width: 18px;`

「拠点へ戻る」ボタンは既存 `.primary` で OK（モック準拠で `width: 220px; height: 50px; border: 1px solid var(--rule-gold-strong); background: var(--gold-tint); color: var(--gold);`）。
画面下端の「到達: NF ・ 撃破: N 体」テキストはモック line 1219 に従って追加（`position: absolute; bottom: 24px;`）。

### 4.8 9h flee（モック line 1223〜1240）

既存 `.fleeLines / .fleeSpeedLine` は維持。モック line 1230〜1234 と既存実装は一致しているので
**v5 で追加変更なし**。

---

## 5. 実装ステップ

### Step 0. 追加 keyframe / CSS 変数を `_obsidian.scss` 末尾に追記

§7「追加トークン要求」のとおり、**`_obsidian.scss` の末尾に新規追記**する。既存定義は触らない。

### Step 1. ヘッダ刷新（モック 9a）

1. `index.tsx` の `.chapterRow` を **`.header` ラッパ**に置き換え（既存 `.chapterRow` クラス自体は
   残してよい）。`.header` 内に：
   - 章マーク `❦ 戦闘 ・ F{depth}` + 右端に `ターン {state.turn}`（`font-family: var(--font-mono); color: var(--text-faint);`）。
   - **行動順帯（既存維持）** — 先頭セルだけ 30px・gold ring + 「次」ラベル追加。
   - **スリム戦闘ログ（既存 `.log` を昇格）** — 1 行 + 「タップで全ログ」hint。
2. `style.module.scss` の `.log` を `.battlefield` 内ではなく `.header` 内のレイアウトに
   合わせて調整：`border-left: 2px solid var(--gold); padding-left: 8px; font-family: var(--font-mono); font-size: 10px; line-height: 1.5; color: var(--text-mute); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`

### Step 2. 状態異常角バッジ 10 種化

1. `index.tsx`:
   - `AILMENT_BADGE` 定数を追加（§4.6.1）。
   - `ailmentMark()` を廃止し、各カード（敵 / 味方）の DOM 内で `.enemyAilBadgeRow` /
     `.allyAilBadgeRow` を描画。
2. `style.module.scss`:
   - `.enemyAilBadge` を再定義（モック準拠）。
   - `.enemyAilBadgeRow`、`.allyAilBadgeRow`、`.allyAilBadge` を追加。
   - 旧 `cardMarks` の中身を削除（クラス自体は残す）。

### Step 3. 攻撃 FX レイヤー追加（モック 9d / 9e）

1. `index.tsx`:
   - `ELEM_FX` 定数 + `getLogElement(text)` 関数を追加。
   - 敵カード内に `.attackFx` レイヤーを追加（§4.4.4）。
   - 既存 `flashIds` のセットを `setTimeout(200ms)` 遅延で適用（shakeA 開始タイミングに揃える）。
   - 既存 `setInkSplatters` を `setTimeout(280ms)` 遅延で適用（pop タイミング）。
   - `anim` 進行のディレイ係数を `revealed === 0 ? 380 : 800` に変更。
2. `style.module.scss`:
   - `.attackFx`、`.fx_slash` / `.fx_thrust` / `.fx_blunt` / `.fx_fire` / `.fx_ice` / `.fx_volt` /
     `.fxCrit` を追加。
   - 既存 `.flash` を `shakeA` ベースに変更（`animation: shakeA .24s ease;`）。

### Step 4. リザルト画面の独立化（モック 9c）

1. `index.tsx`:
   - 既存 `.resultOverlay` + `.result` を **`.resultPage`** に置き換え（勝利時のみ）。
   - 敗北時は **`.defeatPage`**、逃走時は **`.fleePage`** の独立ブランチを追加。
   - 勝利時のレベルアップ LIFO カードはリザルト画面内（`.resultLevelUps` セクション）に統合。
     既存 `.dialogOverlay` の独立ダイアログは廃止して `.resultLevelUps` 内に直接積む。
     OK ボタン → 次カードへの遷移は既存 `setLevelQueue(q => q.slice(1))` 挙動を維持。
2. `style.module.scss`:
   - `.resultPage` / `.resultHeader` / `.resultExpBar` / `.resultLevelUps` / `.resultLoot` /
     `.resultGold` / `.resultPrimary` を新規追加（モック line 1097〜1119）。
   - `.defeatPage` / `.defeatPartyStatus` / `.defeatPartyHead` / `.defeatPartyRow` /
     `.defeatPartyName` / `.defeatPartyBar` / `.defeatPartyHpFill` / `.defeatPartyVal` を追加
     （モック line 1213〜1219）。
   - `.fleePage` は既存 `.fleeLines` 等をそのまま使う薄いラッパで OK。

### Step 5. 召喚リボン独立化

既存 `.summons` は `.battlefield` 内の対象情報パネル直後に **既に**配置されている。
v5 では **ラベル「召喚 {n}/3」**（モック line 1034）を `.summons` の先頭に追加するだけ：

```tsx
<div className={styles.summons}>
  <span className={styles.summonsLabel}>召喚 {state.summons.length}/3</span>
  <div className={styles.summonsList}>...</div>
</div>
```

- `.summonsLabel`: `font-size: 8px; letter-spacing: .1em; color: #8fd0a0;`

### Step 6. コマンドパネルの主従構造調整

既存ボタンを **モック準拠サイズ**に再調整：
- `.menuPrimary`（たたかう）: 56px / `font-size: 16px; letter-spacing: .14em;`
- `.menuStrategy / .menuFlee`: 44px / `font-size: 13px;`
- `.cmdPrimary`（攻撃）: 50px / `font-size: 15px; letter-spacing: .1em;`
- `.cmdSub / .cmdTertiary`: 44px / `font-size: 13px;`
- `.cmdBack` / `.menuBack`: 34px / `font-size: 12px; color: var(--text-mute);`

色は既存トークンのまま。

### Step 7. 検証

- `yarn test` 緑（既存テストの assert 変更なし）。
- `yarn lint` 緑。
- `yarn tsc -b`（または `yarn build`）緑。
- Storybook で `pages-battle--*` ストーリーを撮影してモック準拠を確認：
  - `default`（globalCmd）
  - `individualCmd`
  - `skillMenu`
  - `result`（勝利）— **9c result を再現**
  - `defeat`（全滅）— **9g defeat を再現**
  - `flee`（逃走）— **9h flee を再現**
- スマホ実機（iPhone SE / iPhone 16）で `--host 0.0.0.0` 経由で確認：
  - 行動順帯がスクロールできるか、カード均一高か、対象情報パネルが 46px で固定か、
    召喚リボンが独立しているか、状態異常角バッジが複数並ぶか、リザルト画面の EXP バーが
    barShimmer で輝くか、レベルアップ LIFO カードが積み上がるか、攻撃 FX が属性別に出るか、
    会心が金 flash + scale 1.3 で出るか。

### Step 8. コミット

`feature/redesign-A` ブランチで以下のメッセージでコミットし、push **しない**：

```
feat(battle): v5 案A v3 完全対応（9c result / 9d sequence / 9e FX 6属性 / 9f 状態異常 10種）

- ヘッダ内スリムログ + 行動順帯の正式化（先頭セル金枠 + 「次」ラベル）
- 攻撃 FX を 6 属性（atkSlash/atkThrust/atkBlunt/atkFire/atkIce/atkVolt）+ Crit に拡充
- 状態異常角バッジを 10 種フル対応（毒/麻/眠/盲/乱/呪/死/頭/腕/脚）+ 複数並列
- リザルト画面を独立化（EXP バー barShimmer / LIFO レベルアップ / ドロップ / 獲得 G）
- 攻撃シーケンスを 0–800ms タイムラインで実装（50ms FX / 200ms shakeA / 280ms pop / 400ms HP / 660ms dissolve）
- 全滅画面に味方 HP/TP=0 表示を追加
- _obsidian.scss 末尾に新規 keyframes を追記（atkSlash/atkThrust/atkBlunt/atkFire/atkIce/atkVolt/barShimmer/shakeA/encPulse/dissolveE/critFlash）
```

完了後、commit SHA を報告（push はしない・ディレクターがレビュー後に行う）。

---

## 6. 検証

### 6.1 必須ゲート

1. `yarn test` — 全テストが緑（既存テストの assert を変えていないこと）
2. `yarn lint` — eslint エラー 0
3. `yarn tsc -b`（または `yarn build`）— 型エラー 0
4. Storybook の `pages-battle--*` 全ストーリーが描画される（クラッシュなし）

### 6.2 視覚回帰チェック（Storybook 撮影で確認）

| 状態 | 期待 |
| --- | --- |
| globalCmd | 行動順帯（先頭 30px 金枠 + 「次」ラベル / 以降 28px）／ヘッダ内スリムログ 1 行／敵カード均一高（弱点チップ `min-height: 14px`）／対象情報パネル 46px 固定／召喚リボン 0/3 ラベル付き |
| individualCmd | 「攻撃」50px 主 / 「スキル/道具/防御」44px 横並び / 「もどる」34px |
| anim 中（被弾） | 0ms SE → 50ms 属性別 FX 開始 → 200ms shakeA → 280ms pop（会心なら scale 1.3 + 金 flash） → 400ms HP 減算 → 660ms dissolveE（撃破時）→ 800ms 終了 |
| 状態異常複数 | 角バッジ複数が右肩に 2px gap で並ぶ。`U!` は左肩 |
| result（勝利） | 「戦果」見出し / EXP バー barShimmer / レベルアップ LIFO 3 枚積み上げ / ドロップ 2 列 grid / 獲得 G 金箔 / 「探索へ戻る」50px 主 |
| defeat | 「全滅」金赤 / 「隊列の最期」小カード（HP/TP=0 表示）/ 「拠点へ戻る」 |
| flee | 速線 3 本 / 「逃走成功」 / 「探索へ戻る」 |

### 6.3 スマホ実機チェック

- iPhone SE（375x667）で全画面要素が見切れない / 重ならない
- iPhone 16（393x852）でモック想定どおりに描画
- `--host 0.0.0.0` 経由で LAN 公開した URL から確認

---

## 7. 追加トークン要求（`_obsidian.scss` 末尾に追加）

**既存定義は触らず**、ファイル末尾に次のブロックを追記する。

### 7.1 新規 keyframes（攻撃 FX 6 属性 + Crit + シーケンス）

```scss
// ==========================================================
// battle v5 — 攻撃 FX 6 属性 + シーケンスタイムライン
// ==========================================================

@keyframes atkSlash {
  0%   { transform: translate(-50%, -50%) rotate(-38deg) scaleX(0); opacity: 0; }
  20%  { opacity: 1; }
  60%  { transform: translate(-50%, -50%) rotate(-38deg) scaleX(1); opacity: 1; }
  100% { opacity: 0; }
}

@keyframes atkThrust {
  0%   { transform: translate(-50%, -50%) scaleX(0); opacity: 0; }
  30%  { opacity: 1; }
  100% { transform: translate(-50%, -50%) scaleX(1.2) translateX(20%); opacity: 0; }
}

@keyframes thrustLine {
  0%   { transform: scaleX(0); opacity: 0; }
  30%  { transform: scaleX(1.1); opacity: 1; }
  100% { transform: scaleX(1.4) translateX(30%); opacity: 0; }
}

@keyframes atkBlunt {
  0%   { transform: scale(0.6); opacity: 0; }
  30%  { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1.4); opacity: 0; }
}

@keyframes ringExpand {
  0%   { transform: scale(0.4); opacity: 0; }
  40%  { opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}

@keyframes atkFire {
  0%   { transform: scale(0.6); opacity: 0; }
  30%  { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1.5) translateY(-8%); opacity: 0; }
}

@keyframes atkIce {
  0%   { transform: rotate(45deg) scale(0.5); opacity: 0; }
  30%  { transform: rotate(45deg) scale(1); opacity: 1; }
  100% { transform: rotate(135deg) scale(1.3); opacity: 0; }
}

@keyframes atkVolt {
  0%   { transform: translateY(-50%) scaleY(0); opacity: 0; }
  20%  { transform: translateY(0) scaleY(1); opacity: 1; }
  35%  { opacity: 0.5; }
  50%  { opacity: 1; }
  100% { transform: translateY(50%) scaleY(0.8); opacity: 0; }
}

@keyframes critFlash {
  0%, 100% { opacity: 0; }
  20%      { opacity: 1; }
  60%      { opacity: 0.6; }
}

@keyframes shakeA {
  0%   { transform: translateX(0); }
  20%  { transform: translateX(-6px); }
  40%  { transform: translateX(5px); }
  60%  { transform: translateX(-4px); }
  80%  { transform: translateX(3px); }
  100% { transform: translateX(0); }
}

@keyframes shakeB {
  0%, 100% { transform: translateY(0); }
  25%      { transform: translateY(-3px); }
  50%      { transform: translateY(2px); }
  75%      { transform: translateY(-2px); }
}

@keyframes barShimmer {
  0%   { background-position: 0 0; }
  100% { background-position: 40px 0; }
}

@keyframes encPulse {
  0%, 100% { opacity: 0.92; }
  50%      { opacity: 1; }
}

@keyframes dissolveE {
  0%   { opacity: 1; filter: blur(0); transform: scale(1); }
  60%  { opacity: 0.6; filter: blur(2px); }
  100% { opacity: 0; filter: blur(6px); transform: scale(0.96); }
}

@keyframes splatA {
  0%   { transform: translateY(0) scale(0.6); opacity: 0; }
  20%  { transform: translateY(-8px) scale(1.15); opacity: 1; }
  80%  { transform: translateY(-22px) scale(1); opacity: 1; }
  100% { transform: translateY(-36px) scale(0.9); opacity: 0; }
}

@keyframes splatB {
  0%   { transform: translateY(0) scale(0.6); opacity: 0; }
  20%  { transform: translateY(-6px) scale(1.1); opacity: 1; }
  80%  { transform: translateY(-18px) scale(0.95); opacity: 1; }
  100% { transform: translateY(-30px) scale(0.85); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes atkSlash    { 0%, 100% { transform: none; opacity: 0; } }
  @keyframes atkThrust   { 0%, 100% { transform: none; opacity: 0; } }
  @keyframes thrustLine  { 0%, 100% { transform: none; opacity: 0; } }
  @keyframes atkBlunt    { 0%, 100% { transform: none; opacity: 0; } }
  @keyframes ringExpand  { 0%, 100% { transform: none; opacity: 0; } }
  @keyframes atkFire     { 0%, 100% { transform: none; opacity: 0; } }
  @keyframes atkIce      { 0%, 100% { transform: none; opacity: 0; } }
  @keyframes atkVolt     { 0%, 100% { transform: none; opacity: 0; } }
  @keyframes critFlash   { 0%, 100% { opacity: 0; } }
  @keyframes shakeA      { 0%, 100% { transform: none; } }
  @keyframes shakeB      { 0%, 100% { transform: none; } }
  @keyframes barShimmer  { 0%, 100% { background-position: 0 0; } }
  @keyframes encPulse    { 0%, 100% { opacity: 1; } }
  @keyframes dissolveE   { 0%, 100% { opacity: 0; transform: none; filter: none; } }
  @keyframes splatA      { 0%, 100% { transform: none; opacity: 0; } }
  @keyframes splatB      { 0%, 100% { transform: none; opacity: 0; } }
}
```

### 7.2 新規 CSS 変数（属性カラーパレット）

```scss
:root {
  // 属性カラー（モック v3 §4.5 準拠）
  --elem-slash:  255, 217, 201;   /* #ffd9c9 */
  --elem-thrust: 207, 224, 255;   /* #cfe0ff */
  --elem-blunt:  255, 224, 160;   /* #ffe0a0 */
  --elem-fire:   255, 150,  90;   /* #ff965a */
  --elem-ice:    160, 210, 240;   /* #a0d2f0 */
  --elem-volt:   232, 216,  91;   /* #e8d85b */

  // 会心の重畳色（金 flash）
  --crit-glow:   rgba(255, 210, 122, 0.55);

  // シーケンスタイミング（ミリ秒、JS 側からも参照可能にする想定）
  --seq-fx-start:    50ms;
  --seq-shake-start: 200ms;
  --seq-pop-start:   280ms;
  --seq-hp-start:    400ms;
  --seq-dissolve:    660ms;
  --seq-end:         800ms;
}
```

### 7.3 補足

- 上記すべて **追記のみ**。既存の `@keyframes obsidian-glowPulse` 等は触らない。
- `prefers-reduced-motion: reduce` の override も全 keyframes 分セットで追加（モーション削減
  ポリシーに従う）。
- `splatA` / `splatB` は被弾ダメージ pop 用の補助 keyframe で、InkSplatter コンポーネント側の
  既存アニメと**並走**する。InkSplatter を変更しないために `.inkOverlay` ラッパで
  `animation: splatA .76s ease forwards;` を当てるか、`InkSplatter` の `value` を
  `setTimeout(280ms)` で表示開始するだけでも mock 準拠の見た目になる。実装の選択は sonnet に
  任せる（どちらでも検証 OK ならよし）。

---

## 8. 参考：モック原本との対応表（line 番号サマリ）

| フレーム | 範囲 | 主要 line |
| --- | --- | --- |
| 9a interactive main | 967〜1080 | header 972〜990 / 行動順帯 974〜986 / スリムログ 988〜989 / 敵 992〜1022 / 対象情報パネル 1024〜1032 / 召喚リボン 1033〜1036 / 味方 1038〜1068 / コマンド 1069〜1076 / ログ overlay 1077〜1078 |
| 9b intro | 1082〜1091 | 封蝋シジル 1089 |
| **9c result** | **1093〜1122** | ヘッダ 1098 / EXP バー 1099 / レベルアップ 1100〜1110 / ドロップ 1113〜1117 / 獲得 G 1118 / 「探索へ戻る」 1119 |
| **9d sequence** | **1124〜1146** | タイムライン 1131〜1138 / 属性 → FX 表 1140〜1144 |
| **9e attack FX 6** | **1148〜1174** | 6 グリッド 1156〜1161 / 会心/被弾/詠唱 1166〜1170 |
| **9f status 10** | **1176〜1207** | 角バッジ 1184〜1193 / 支援/撃破/ユニオン 1199〜1202 |
| 9g defeat | 1209〜1221 | 隊列の最期 1217 |
| 9h flee | 1223〜1240 | 速線 1230〜1234 |

参照スクリプト（モック原本のロジック）：line 1260〜1290 の `efx(id)` で属性 6 種の循環が
定義されており、`atkSlash / atkThrust / atkBlunt / atkFire / atkIce / atkVolt` を keyframe
名としてそのまま使っていることを確認した。本書 §7.1 のキー名はこれに合わせている。

---

## 9. 完了条件チェックリスト

実装完了時に次のすべてに OK が付くこと：

- [ ] `_obsidian.scss` 末尾に §7.1 / §7.2 の追記が入っている
- [ ] 攻撃 FX レイヤー `.attackFx` が敵カード内に絶対配置で実装されている
- [ ] 属性 → FX マッピング（`ELEM_FX`）と `getLogElement(text)` が index.tsx に実装されている
- [ ] 状態異常角バッジが 10 種フル（毒/麻/眠/盲/乱/呪/死/頭/腕/脚）でモック準拠の色で描画される
- [ ] 状態異常複数時に右肩に 2px gap で横並びになる
- [ ] リザルト画面（勝利）が独立した `.resultPage` として描画される
- [ ] 全滅画面に「隊列の最期 HP/TP」小カードが追加されている
- [ ] 行動順帯の先頭セルが金枠 + glow + 「次」ラベル付きになっている
- [ ] スリム戦闘ログがヘッダ内に 1 行で表示される（既存のフッタ近接ログとの両立可）
- [ ] 召喚リボンに「召喚 N/3」ラベルが追加されている
- [ ] `yarn test` / `yarn lint` / `yarn tsc -b` すべて緑
- [ ] Storybook 全ストーリーが描画される
- [ ] スマホ実機（iPhone SE / iPhone 16）で要素重なりなし
- [ ] commit SHA を報告（push しない）

---

以上が v5 指示書である。**実装は必ず本書の §5 ステップ順で進め、§3 削除禁止リストに該当する
既存実装を絶対に削除しない**こと。
