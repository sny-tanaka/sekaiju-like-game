# フェーズ 2：town 画面リデザイン（sonnet 用指示書） — 改訂版 v2「モック忠実化」

`dev-docs/redesign-A.md`（特に **§1.5 レイアウト運用ルール**）を **必ず先に読むこと**。
本ファイルは town（拠点ハブ）画面の取り込み手順を網羅した実装指示書。

**前回方針からの反転**: 前回は「機能優先」で、モック上にあっても機能仕様にない要素は省略していた。
結果 2x2 グリッド + 大カードのモック構成が縦リスト 6 ボタンに化けるなど、**モック忠実度が大きく崩れた**。
今回は **モック忠実度を最優先**に切り替える。機能仕様に無いボタンは「機能を追加して再利用」もしくは「disabled で位置だけ残す」で対応し、**モックのレイアウトを犠牲にしない**。

実装は **flex column 一本**。絶対配置で `top` / `bottom` を直書きするのは禁止（モーダル backdrop と章マーク等の装飾レイヤのみ例外）。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

以下 3 ファイルのみ。**他は絶対に変更しない**。

| 区分 | パス | 操作 |
| --- | --- | --- |
| 編集 | `src/pages/town/index.tsx` | モック 2a〜2e に忠実な構造へ刷新。`MenuButton` は使わず `<button>` 直書きでカード型 UI を組む。⚙ ボタン + `SoundSettings` モーダル（title から再利用）を追加。自動保存インジケータ追加。ワープ統合済みのダイブ先選択 bottom-sheet 化 |
| 編集 | `src/pages/town/style.module.scss` | 全面書き直し。`@use 'variables'` を **削除**して `var(--*)` のみ参照。2x2 grid + 大カード + 円形 ⚙ ボタン + 自動保存インジケータ + 横並び統計 + bottom-sheet + 封蝋スタンプ背景 |
| 編集 | `src/pages/town/Town.stories.tsx` | `WithParty` / `MidDive` / `EmptyGuild` / `PostBoss` の 4 ストーリーを維持。既存ストーリーの decorators は触らない（mockPostBoss は `__stories__/mockSaves.ts` で既に定義済み） |

### 触ってはいけないファイル / コンポーネント

- `src/_obsidian.scss` は変更しない（必要なトークン `--info-blue-*`、`obsidian-sheetRise` キーフレームは追加済み）。新規トークン追加要求があれば指示書「§9 追加トークン要求」に書くだけで止めること。
- 共通コンポーネント (`MenuButton`, `InkSplatter`, `SoundSettings`, `CharacterPortrait` 等) の中身は変更しない。`SoundSettings` は **既存のまま import**（title と同じ使い方）。`InkSplatter` も既存のまま。
- `__stories__/mockSaves.ts` の既存 preset (`mockEmpty` / `mockWithParty` / `mockMidDive` / `mockPostBoss`) は変更しない。新規 preset 追加もしない（不足する場合はディレクターに止めて報告）。
- `src/_variables.scss` および写本テーマ系 SCSS 変数 (`$parchment`, `$ink`, `$vermilion`, `$rule` 等) を新規参照しない。
- 他画面の `index.tsx` / `style.module.scss` には絶対触らない。

## 2. やってはいけないこと

- **`Agent` / `Task` を自分から spawn しない**（孫委譲禁止）。`Edit` / `Write` / `Bash` で自分で実装する。
- **`src/_obsidian.scss` の値を書き換えない**。
- **`MenuButton` を使い続けない**。モックの 2x2 グリッド + 大カード構造は `MenuButton` の縦リスト前提の API では実現不可能。**town からは `MenuButton` の import を削除**し、各メニュー枠は `<button>` を直接置く。
- **ゲームロジック（`startDive` / `applyAndPersist` / `exitToTitle` / `useGameState`）の挙動は変えない**。`handleDive` / `handleWarp` / `handleExit` の関数本体（state mutation・navigate 呼び順）は既存通り。
- **ヒント文・章マーク・ボタンラベルの文言は基本既存維持**（モックの「DIVE」「RESUME」英字バッジは追加してよいが、日本語の見出し・description はテストや brief で固定されている）。
- **ページ全体に `overflow-y: auto` をかけない**。スクロールが必要なら **そのセクション内**だけで吸収する（モックの hub は 1 画面に全部収まる前提なので、基本スクロール無し設計）。
- **`mockSaves.ts` の中身に依存した特別分岐を書かない**。`save.savedAt` の有無で表示を出し分ける程度なら OK。

---

## 3. モックとの差分一覧（最重要 — 現状実装からの修正箇所）

参照: `/tmp/sekaiju-design/案A_v2.dc.html` line 249〜362（`2a〜2e`）。

### 3.1 ヘッダー — 統計 dl を横並び span に置き換え

| 項目 | 現状 | モック | 対応 |
| --- | --- | --- | --- |
| 統計の DOM | `<dl>` + `<div>` 3 件、各 `<dt>` `<dd>` ペア | `<div style="display:flex;gap:18px;font-family:'JetBrains Mono';font-size:12px">` 直下に `<span>` 3 つ | `<dl>` を捨てて `<div className={styles.stats}>` + `<span>` 3 つに置換 |
| 表示文言 | `所持金 / ◇ 8,420 G` のように dt + dd | `◇ 8,420 G` ・ `最高 47F` ・ `団員 5 人`（ラベル無しの値のみ） | dt の `所持金` / `最高` / `団員` ラベル**を消す**。「最高」「団員」はラベル兼用なのでそのまま値の頭に残す |
| 色 | 全 mute | gold（所持金）+ faint（最高 / 団員）+ vermilion（団員 0 のとき） | クラス分けは現状通り。3 種類の `<span>` を使い分ける |

### 3.2 ヘッダー — ⚙ ボタンを新規追加（推奨対応 a：機能を増やす）

| 項目 | 現状 | モック | 対応 |
| --- | --- | --- | --- |
| 右上 ⚙ | 無し | `width:32px; height:32px; border:1px solid rgba(201,168,106,.4); border-radius:50%; color:#c9a86a; font-size:14px` | **新規実装**。`useState` の `soundOpen` を持って、押下で `SoundSettings` モーダルを開く（title 画面の `setSoundOpen` と同じ仕組み） |
| モーダル内容 | — | — | title 画面の `soundOpen` モーダル DOM をそのまま移植（ヘッダー「設定」+ ✕ ボタン + `<SoundSettings />` + 「とじる」）。SCSS クラス名は town 専用で書き直す |

### 3.3 メニュー — 縦リスト 6 ボタンを「2x2 グリッド + 大カード」に置換

これが**最重要差分**。

| 項目 | 現状 | モック | 対応 |
| --- | --- | --- | --- |
| 構造 | `MenuButton` を縦に 6 個 (`<main className={styles.menu}>`) | `display: grid; grid-template-columns: 1fr 1fr; gap: 13px;` で 5 枠。ダイブ大カードが `grid-column: 1 / span 2;` で 1 段目を独占。ギルド / ショップ / 鍛冶 / 図鑑 が 2 段目以降の 2x2 | `MenuButton` 不使用。`<main className={styles.menu}>` を `display: grid; grid-template-columns: 1fr 1fr; gap: 13px;` に変更し、`<button className={styles.dive}>` + `<button className={styles.tile}>` × 4 を直書き |
| ダイブカードのレイアウト | 普通の MenuButton | 大カード: `padding: 16px 18px; background: linear-gradient(110deg,#202a3c,#12161f 72%); border: 1px solid rgba(201,168,106,.4); animation: glowPulse;` 右上に大書きの装飾文字「塔」（`color: rgba(201,168,106,.1)`）、左上に `DIVE` 英字バッジ、その下に大書き日本語「ダイブ開始」、説明文 | `<button className={styles.dive}>` を以下構造で組む: `<span className={styles.diveDecor}>塔</span>` / `<span className={styles.diveBadge}>DIVE</span>` / `<span className={styles.diveTitle}>ダイブ開始</span>` / `<span className={styles.diveDesc}>...</span>` |
| ワープボタン独立枠 | 縦リストの 2 番目に独立 MenuButton | **モック 2d は「diveFloorSelect ・ ダイブ先選択（ワープ統合）」とラベル**。bottom-sheet 内で `1F`（最初から潜る）と各チェックポイントを並べる方式 | **ワープ MenuButton を削除**。代わりにダイブカードを押すと **常に bottom-sheet を開く**（1F + 解放済みチェックポイントを並べる）。`checkpoints.length === 0` の場合は 1F のみ。`MidDive` の場合は bottom-sheet を開かず即 dungeon に戻る |
| 2x2 タイル | ギルド / ショップ / 鍛冶 / 図鑑 が縦リスト 4 つ | `height: 120px; background: #15171f; border: 1px solid rgba(255,255,255,.07); padding: 16px;` の正方形タイル。上に絵文字大書き 26px、下に和文 16px + 説明 11px | `<button className={styles.tile}>` で組む。`<span className={styles.tileIcon}>📜</span>` `<div>` 内に `<span className={styles.tileLabel}>ギルド管理</span><span className={styles.tileDesc}>編成・作成</span>` |
| 絵文字 | 無し | 📜（ギルド）/ 🛡（ショップ）/ ⚒（鍛冶）/ 📖（図鑑） | **追加**。モック準拠 |
| 潜行中 disabled の見た目 | MenuButton 内部の `disabled` 表現 | `background: #101218; border: 1px solid rgba(255,255,255,.05); opacity: .45;` 絵文字は `filter: grayscale(1);` 説明文は「🔒 潜行中不可」 | `.tile[disabled]` セレクタで上書き。`disabled` 時の description 文字は **「🔒 潜行中不可」に差し替える** |
| 団員 0 時のギルド管理特別カード | MenuButton（縦リスト） | `grid-column: 1 / span 2; height: 96px; background: #1a2030; border: 1px solid rgba(201,168,106,.5); padding: 16px; display: flex; align-items: center; gap: 14px; animation: glowPulse;` の横長カード。`📜` + 「ギルド管理 / まずここで冒険者を作成 / ›」 | 団員 0 のとき、ギルド管理を**通常の `.tile` ではなく `.tileGuide` の横長カード**に切り替える。グリッドは `tileGuide` が `grid-column: 1 / span 2;` で 1 行占有。残りの 3 タイル（ショップ・鍛冶・図鑑）はそのまま 2x2 配置 |
| ダイブ無効化（団員 0） | `disabled` で description が「団員が必要です」 | `opacity: .55;` + description 文字が `color: #e09180`（赤）の「団員が必要です」 | `.dive[disabled]` セレクタで `opacity: .55;` + `.diveDesc` の色を vermilion に上書き |

### 3.4 自動保存インジケータを追加

| 項目 | 現状 | モック | 対応 |
| --- | --- | --- | --- |
| 「自動保存済 ・ 12:08」 | 無し | フッタ「タイトルへ戻る」のすぐ上に `position: absolute; bottom: 74px;` で配置。`font-family: JetBrains Mono; font-size: 11px; color: #5d8a6c;` + 左に脈動する緑 dot 6x6px | **新規追加**。`<div className={styles.autosave}>` に `<span className={styles.autosaveDot} aria-hidden />` + 「自動保存済 ・ HH:MM」 を入れる。HH:MM は `new Date(save.savedAt).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false })` で生成。`save.savedAt` が 0 のときは「自動保存済」のみ表示 |
| ※ モック 2a でのみ表示 | — | 2b（潜行中）2c（団員 0）には無いが、レイアウト崩壊を避けるため**潜行中・団員 0 のときは非表示**にする | 条件分岐 `{!diveState && hasMembers && (<div className={styles.autosave}>...</div>)}` |

### 3.5 ヒント文 — モック準拠の色 / 余白

| 項目 | 現状 | モック | 対応 |
| --- | --- | --- | --- |
| 配置 | flex column の 1 アイテム | モック 2b / 2c では `margin: 14px 20px 0;` （ヘッダー直下） | flex column 内で **ヘッダー直下 / メニューの上** に配置（現状の配置順を維持）。`padding: 12px 14px;` `border-radius: 4px;` `line-height: 1.7;`（モック準拠） |
| 金箔ヒント（団員 0） | `--gold-tint` / `--rule-gold-strong` / `--text-strong` / `obsidian-glowPulse` | 同じ。font-size 12px | クラスはそのまま `.hintGold` を使う |
| 青ヒント（潜行中） | `--info-blue-tint` / `--info-blue-rule` / `--info-blue-text` / font-size 11px | `background: rgba(111,159,216,.08); border: 1px solid rgba(111,159,216,.3); color: #9cc2ec; font-size: 11px;` | クラスはそのまま `.hintBlue` を使う。`font-size: 11px;` に統一 |
| 文言 | 既存と同じ | 既存と同じ（モックも同文） | 文言は触らない |

### 3.6 フッター「タイトルへ戻る」

| 項目 | 現状 | モック | 対応 |
| --- | --- | --- | --- |
| 配置 | flex column の最後 | モック 2a〜2c は `position: absolute; bottom: 22px;` だが、§1.5 ルールで禁止 | flex column 最後に置く運用は維持。`margin-top: auto;` で下端へ寄せる |
| スタイル | `border: 1px solid rgba(212,103,79,.45); color: var(--danger-text);` | 同じ | 現状維持 |

### 3.7 bottom-sheet（ダイブ先選択 / ワープ統合）

| 項目 | 現状 | モック | 対応 |
| --- | --- | --- | --- |
| 1F エントリ | 含まれない（ダイブカード直押し = 1F） | bottom-sheet 内に `1F 第1階から（最初から潜る）` のチップを含める | bottom-sheet のリスト 1 行目に **1F のエントリを追加**（`onClick={() => handleWarp(1)}`）。`handleWarp` は `startDive(s, depth)` を呼ぶので 1F でも問題ない |
| 各チェックポイント表示 | `第 {d} 階へ` | モックは `{d}F` + `第 N 帯` のような階層説明 + 選択中ハイライト | `{d}F` 大文字 mono + 説明文「第 {Math.ceil(d/10)} 帯」+ 1F のみ「最初から潜る」サブテキスト |
| 選択ハイライト | 無し | モック 45F の行は `background: rgba(201,168,106,.1); border: 1px solid rgba(201,168,106,.5);` + 「選択中」 | **省略可**。現状は選択 = 即実行なのでハイライト状態が無くて良い。bottom-sheet の各行を押すと即 `handleWarp(d)` 実行 |
| フッタ「とじる + 確定ボタン」 | 「とじる」のみ全幅 | モック: 96px 「とじる」 + 残り全幅「45F へ潜る」 | **「とじる」のみで OK**（選択即実行のため）。確定ボタンは無し（モックは選択 UI ありの設計だが、本実装はワンタップでよい） |
| パネルアニメ | `obsidian-sheetRise` | 同等 | 現状維持 |

### 3.8 ダイブ封蝋スタンプ演出（モック 2e）

| 項目 | 現状 | モック | 対応 |
| --- | --- | --- | --- |
| 背景 | `radial-gradient(circle at 50% 50%, rgba(138,47,42,.22), ...)` のみ | 同じ + 下に `SEALING… 1F へ` の `JetBrains Mono` 11px テキスト | **`SEALING… {depth}F へ` テキストを追加**。`position: absolute; bottom: 60px; left: 0; right: 0; text-align: center; font-family: var(--font-mono); font-size: 11px; letter-spacing: .2em; color: var(--text-quote);` で配置。`{depth}` は遷移先（基本は 1）。**bottom-sheet 経由なら選択した階を使う** |
| `InkSplatter` | `value="潜行" variant="seal" size={120}` | モック側の装飾的なシジル（複数同心円 + 八角星）は再現困難なので `InkSplatter` で代替 | `InkSplatter` は触らずそのまま使う |

### 3.9 その他

- **モック 2c の `JetBrains Mono` フォントの「⚓ 潜行中のため」アイコン**: モックは `⚓` を先頭に置いている。**現状の `潜行中のため、...` には絵文字無しなので、文頭に `⚓ ` を追加してモック準拠にする**。
- **`MenuButton` 削除に伴う sfx の鳴らし分け**: 元 MenuButton は `sfx='decide'` がデフォ。**ダイブカード**は `play('dive')` を `handleDive` 内で呼ぶ既存実装そのまま。**2x2 タイル**は `onClick` 直前に `play('decide')`、**⚙ ボタン**は `play('decide')`、**bottom-sheet の各行**は `play('warp')`（既存 handleWarp 内で発火済み）、**「とじる」**は `play('cancel')`（既存）、**「タイトルへ戻る」**は `play('cancel')`（既存 handleExit）。

---

## 4. ゴール

Storybook で `Pages/Town` の以下 4 ストーリーが、モック「案 A 黒曜 OBSIDIAN MINIMAL」の **2a〜2c のレイアウトに忠実**に描画される:

1. `EmptyGuild`（mockEmpty）— 団員 0 人。
   - ヘッダー: 章マーク + ギルド名 + ⚙ + 統計（`◇ 500 G` / `最高 −` または非表示 / `団員 0 人`（vermilion））。
   - 金箔ヒントカード + 脈動。
   - ダイブカード disabled（`opacity: .55`、`描述: 団員が必要です`、vermilion）。
   - ギルド管理が **`.tileGuide` 横長カード**（grid-column span 2、`📜` + 「まずここで冰険者を作成」+ `›`）。
   - 2 段目: ショップ / 鍛冶 / 図鑑 が 2x2（鍛冶は 4 番目に来る）。**注**: モック 2c は鍛冶を省略してショップと図鑑だけ並べているが、機能仕様には鍛冶も町から行けるので **全部出す**。
   - 自動保存インジケータは **非表示**（団員 0 = 初回想定）。
2. `WithParty`（mockWithParty）— 通常拠点。
   - ヘッダー: 統計フル表示（gold / faint / faint）+ ⚙。
   - ヒントカード無し。
   - ダイブカード primary（`glowPulse`、`DIVE` バッジ、「ダイブ開始」、`第1階から潜る ・ 解放階(N F)も選択可`）。
   - 2x2: ギルド / ショップ / 鍛冶 / 図鑑 全部 active。
   - 自動保存インジケータ表示（`save.savedAt` から HH:MM）。
3. `MidDive`（mockMidDive）— 潜行中。
   - ヘッダー同上。
   - 青ヒントカード「⚓ 潜行中のため…」。
   - ダイブカードが緑系（`RESUME` バッジ、「潜行を再開」、`{depth}F から再開`、`background: linear-gradient(110deg,#203c2e,#12161f 72%); border: 1px solid rgba(143,208,160,.45);`）。
   - 2x2 全部 disabled（`opacity: .45`、絵文字 grayscale、description「🔒 潜行中不可」）。
   - 自動保存インジケータは **非表示**。
4. `PostBoss`（mockPostBoss）— ワープ解放後。
   - ダイブカードを押すと bottom-sheet が 1F + 解放済み階（10F・20F 等）で開く。
   - その他は WithParty と同じ。

すべて iPhone SE / iPhone 16（URL バー表示時の dvh 778 程度）で要素が重ならず、ページ全体スクロール無しで収まる。`yarn lint`・`yarn test --run`・`yarn tsc -b` が緑。

---

## 5. 実装ステップ

### Step 0. 事前読み込み

1. `dev-docs/redesign-A.md §1.1〜§1.6` のトークン / レイアウト運用ルール。
2. `dev-docs/claude-design-brief.md §4.2`（town の機能仕様）。
3. `/tmp/sekaiju-design/案A_v2.dc.html` line 249〜362（`2a〜2e`）。
4. `src/pages/title/index.tsx` の `soundOpen` モーダル箇所（line 285〜324 付近）— ⚙ + `SoundSettings` の使い方を頭に入れる。
5. `src/_obsidian.scss` 末尾の `:root { --info-blue-* }` と `obsidian-sheetRise` キーフレーム（既存）。**追加は不要**。

### Step 1. `index.tsx` 全面置換

下記構造に置換する。**`MenuButton` import を削除**し、`SoundSettings` を新規 import。

```tsx
import { useState } from 'react';

import styles from './style.module.scss';

import { useSfx } from '@/audio/useSfx';
import { InkSplatter } from '@/components/common/InkSplatter/InkSplatter';
import { SoundSettings } from '@/components/common/SoundSettings';
import { startDive } from '@/domain/dive';
import { useGameState } from '@/store/gameState';
import { Redirect, useNavigation } from '@/store/navigation';

export const Page = () => {
  const { navigate } = useNavigation();
  const { save, exitToTitle, applyAndPersist } = useGameState();
  const play = useSfx();

  const [warpOpen, setWarpOpen] = useState(false);
  const [soundOpen, setSoundOpen] = useState(false);
  const [sealActive, setSealActive] = useState(false);
  const [sealingDepth, setSealingDepth] = useState<number>(1);

  if (!save) {
    return <Redirect to={{ name: 'title' }} />;
  }

  const { guild, towerState, diveState } = save;
  const hasMembers = guild.members.length > 0;
  const checkpoints = towerState.warp.unlockedCheckpoints;

  const handleExit = () => {
    play('cancel');
    exitToTitle();
    navigate({ name: 'title' });
  };

  // ダイブカード押下: 潜行中なら即再開、そうでなければ bottom-sheet を開く
  const handleDiveClick = () => {
    if (!hasMembers) return;
    if (diveState) {
      void resumeDive();
      return;
    }
    play('decide');
    setWarpOpen(true);
  };

  const resumeDive = async () => {
    play('dive');
    navigate({ name: 'dungeon' });
  };

  // bottom-sheet から階を選択 → ダイブ実行
  const handleSelectFloor = async (depth: number) => {
    play('warp');
    setWarpOpen(false);
    await applyAndPersist((s) => startDive(s, depth));
    setSealingDepth(depth);
    setSealActive(true);
    await new Promise((r) => setTimeout(r, 320));
    navigate({ name: 'dungeon' });
  };

  // 2x2 タイル押下
  const goto = (target: 'guild' | 'shop' | 'forge' | 'codex') => () => {
    if (diveState) return;
    play('decide');
    navigate({ name: target });
  };

  // bottom-sheet に並べる選択肢: 1F + 解放済みチェックポイント (昇順)
  const sheetFloors: number[] = [1, ...checkpoints.filter((d) => d !== 1)].sort((a, b) => a - b);
  // モック準拠表示: 1F は「最初から潜る」、それ以外は「第 N 帯」
  const floorLabel = (d: number) => (d === 1 ? '第1階から（最初から潜る）' : `第 ${Math.ceil(d / 10)} 帯`);

  // 自動保存表示用 HH:MM（save.savedAt が 0 の場合は時刻無し）
  const autosaveLabel = (() => {
    if (!save.savedAt) return '自動保存済';
    const time = new Date(save.savedAt).toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return `自動保存済 ・ ${time}`;
  })();

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <div className={styles.headTop}>
          <div className={styles.headTitleBlock}>
            <p className={styles.chapterMark}>❦ 拠点</p>
            <h1 className={styles.guildName}>{guild.name}</h1>
          </div>
          <button
            type="button"
            className={styles.gearBtn}
            aria-label="設定"
            onClick={() => {
              play('decide');
              setSoundOpen(true);
            }}
          >
            ⚙
          </button>
        </div>
        <div className={styles.stats}>
          <span className={styles.statGold}>◇ {guild.gold.toLocaleString()} G</span>
          {towerState.record.deepestReached > 0 && (
            <span className={styles.statFaint}>最高 {towerState.record.deepestReached}F</span>
          )}
          <span className={hasMembers ? styles.statFaint : styles.statWarn}>
            団員 {guild.members.length} 人
          </span>
        </div>
      </header>

      {!hasMembers && (
        <div className={`${styles.hint} ${styles.hintGold}`}>
          まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。
        </div>
      )}
      {hasMembers && diveState && (
        <div className={`${styles.hint} ${styles.hintBlue}`}>
          ⚓ 潜行中のため、ダイブ再開と「タイトルへ戻る」以外は利用できません。
        </div>
      )}

      <main className={styles.menu}>
        {/* ダイブ大カード（grid-column span 2） */}
        <button
          type="button"
          className={`${styles.dive} ${diveState ? styles.diveResume : ''}`}
          disabled={!hasMembers}
          onClick={handleDiveClick}
        >
          <span className={styles.diveDecor} aria-hidden>塔</span>
          <span className={styles.diveBadge}>{diveState ? 'RESUME' : 'DIVE'}</span>
          <span className={styles.diveTitle}>{diveState ? '潜行を再開' : 'ダイブ開始'}</span>
          <span className={styles.diveDesc}>
            {!hasMembers
              ? '団員が必要です'
              : diveState
                ? `${diveState.depth}F から再開`
                : checkpoints.length > 0
                  ? `第1階から潜る ・ 解放階(${Math.max(...checkpoints)}F)も選択可`
                  : '第1階から潜る'}
          </span>
        </button>

        {/* 団員 0 のときはギルド管理を横長ガイドカードに切り替え */}
        {!hasMembers ? (
          <button
            type="button"
            className={styles.tileGuide}
            onClick={goto('guild')}
          >
            <span className={styles.tileGuideIcon} aria-hidden>📜</span>
            <span className={styles.tileGuideText}>
              <span className={styles.tileGuideLabel}>ギルド管理</span>
              <span className={styles.tileGuideHint}>まずここで冒険者を作成</span>
            </span>
            <span className={styles.tileGuideArrow} aria-hidden>›</span>
          </button>
        ) : (
          <button
            type="button"
            className={styles.tile}
            disabled={!!diveState}
            onClick={goto('guild')}
          >
            <span className={styles.tileIcon} aria-hidden>📜</span>
            <span className={styles.tileBody}>
              <span className={styles.tileLabel}>ギルド管理</span>
              <span className={styles.tileDesc}>{diveState ? '🔒 潜行中不可' : '編成・作成'}</span>
            </span>
          </button>
        )}

        <button
          type="button"
          className={styles.tile}
          disabled={!!diveState}
          onClick={goto('shop')}
        >
          <span className={styles.tileIcon} aria-hidden>🛡</span>
          <span className={styles.tileBody}>
            <span className={styles.tileLabel}>ショップ</span>
            <span className={styles.tileDesc}>{diveState ? '🔒 潜行中不可' : '装備・売買'}</span>
          </span>
        </button>

        <button
          type="button"
          className={styles.tile}
          disabled={!!diveState}
          onClick={goto('forge')}
        >
          <span className={styles.tileIcon} aria-hidden>⚒</span>
          <span className={styles.tileBody}>
            <span className={styles.tileLabel}>鍛冶屋</span>
            <span className={styles.tileDesc}>{diveState ? '🔒 潜行中不可' : '強化・リサイクル'}</span>
          </span>
        </button>

        <button
          type="button"
          className={styles.tile}
          disabled={!!diveState}
          onClick={goto('codex')}
        >
          <span className={styles.tileIcon} aria-hidden>📖</span>
          <span className={styles.tileBody}>
            <span className={styles.tileLabel}>図鑑 / 記録</span>
            <span className={styles.tileDesc}>{diveState ? '🔒 潜行中不可' : '到達記録・図鑑'}</span>
          </span>
        </button>
      </main>

      {hasMembers && !diveState && (
        <div className={styles.autosave} aria-hidden>
          <span className={styles.autosaveDot} />
          {autosaveLabel}
        </div>
      )}

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.exit}
          onClick={handleExit}
        >
          タイトルへ戻る
        </button>
      </footer>

      {warpOpen ? (
        <div
          className={styles.sheetOverlay}
          onClick={() => setWarpOpen(false)}
        >
          <div
            className={styles.sheet}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="ダイブ先を選択"
          >
            <div className={styles.sheetHandle} aria-hidden />
            <div className={styles.sheetHead}>
              <span className={styles.sheetTitle}>ダイブ先を選択</span>
              <span className={styles.sheetCount}>解放: {sheetFloors.length} 地点</span>
            </div>
            <div className={styles.sheetList}>
              {sheetFloors.map((d) => (
                <button
                  type="button"
                  key={d}
                  className={styles.sheetItem}
                  onClick={() => void handleSelectFloor(d)}
                >
                  <span className={styles.sheetDepth}>{d}F</span>
                  <span className={styles.sheetItemLabel}>{floorLabel(d)}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className={styles.sheetClose}
              onClick={() => {
                play('cancel');
                setWarpOpen(false);
              }}
            >
              とじる
            </button>
          </div>
        </div>
      ) : null}

      {soundOpen ? (
        <div
          className={styles.modalBackdrop}
          onClick={() => {
            play('cursor');
            setSoundOpen(false);
          }}
        >
          <div
            className={styles.modalPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <span>設定</span>
              <button
                type="button"
                className={styles.modalCloseBtn}
                aria-label="閉じる"
                onClick={() => {
                  play('cursor');
                  setSoundOpen(false);
                }}
              >
                ✕
              </button>
            </div>
            <SoundSettings />
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => {
                play('cursor');
                setSoundOpen(false);
              }}
            >
              とじる
            </button>
          </div>
        </div>
      ) : null}

      {sealActive ? (
        <div className={styles.sealOverlay} aria-hidden="true">
          <InkSplatter
            value="潜行"
            variant="seal"
            size={120}
            onDone={() => setSealActive(false)}
          />
          <div className={styles.sealCaption}>SEALING… {sealingDepth}F へ</div>
        </div>
      ) : null}
    </div>
  );
};
```

実装メモ:

- `handleDiveClick` で潜行中だけ `play('dive')` + 即 navigate（演出スキップ、モック準拠で再開は即時）。新規ダイブは bottom-sheet 経由なので `handleSelectFloor` で `play('warp')` + 封蝋演出。
- 1F を bottom-sheet に含めるため `sheetFloors` で 1 を追加し、`Math.ceil(d/10)` で帯を算出（10F→1 帯、20F→2 帯 …）。
- `autosaveLabel` は `save.savedAt` を `toLocaleTimeString` で `HH:MM` に変換。
- `mockSaves.ts` の `save.savedAt` がストーリーで 0 の場合、自動保存「自動保存済」のみ出す。

### Step 2. `style.module.scss` 全面置換

`@use 'variables'` を削除し、`var(--*)` のみ参照。**flex column 厳守**。下記を雛形に組む。

```scss
.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
  max-width: 560px;
  margin: 0 auto;
  padding: 0 0 max(16px, env(safe-area-inset-bottom, 0px));
  overflow: hidden;
  background: var(--bg-page-gradient);
  color: var(--text-base);
  font-family: var(--font-body);
}

// ---- ヘッダー（モック準拠で内側 padding を持つ） ----
.head {
  flex-shrink: 0;
  padding: 18px 22px 14px;
  background: linear-gradient(180deg, #1a1f2b, #13151c);
  border-bottom: 1px solid var(--rule-gold);
}

.headTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.headTitleBlock { display: flex; flex-direction: column; gap: 3px; }

.chapterMark {
  margin: 0;
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.3em;
  color: var(--text-blue);
}

.guildName {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 19px;
  color: var(--text-strong);
}

.gearBtn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--rule-gold-strong);
  background: transparent;
  color: var(--gold);
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stats {
  display: flex;
  gap: 18px;
  margin-top: 12px;
  font-family: var(--font-mono);
  font-size: 12px;
}

.statGold { color: var(--gold); }
.statFaint { color: var(--text-faint); }
.statWarn { color: var(--danger-text); }

// ---- ヒント ----
.hint {
  flex-shrink: 0;
  margin: 14px 20px 0;
  padding: 12px 14px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.7;
}

.hintGold {
  background: var(--gold-tint);
  border: 1px solid var(--rule-gold-strong);
  color: var(--text-strong);
  animation: obsidian-glowPulse 3.5s ease-in-out infinite;
}

.hintBlue {
  background: var(--info-blue-tint);
  border: 1px solid var(--info-blue-rule);
  color: var(--info-blue-text);
  font-size: 11px;
}

// ---- メニュー（2x2 grid + 大カード） ----
.menu {
  flex: 1 1 auto;
  min-height: 0;
  padding: 14px 20px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 13px;
  align-content: start;
  overflow: hidden; // 全体スクロール禁止
}

// ---- ダイブ大カード ----
.dive {
  grid-column: 1 / span 2;
  position: relative;
  border-radius: 4px;
  border: 1px solid var(--rule-gold-strong);
  background: linear-gradient(110deg, #202a3c, #12161f 72%);
  padding: 16px 18px;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  animation: obsidian-glowPulse 5s ease-in-out infinite;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.dive[disabled] {
  opacity: 0.55;
  cursor: not-allowed;
  animation: none;
}

.dive[disabled] .diveDesc { color: var(--danger-text); }

.diveResume {
  background: linear-gradient(110deg, #203c2e, #12161f 72%);
  border-color: rgba(143, 208, 160, 0.45);
}

.diveResume .diveBadge { color: #8fd0a0; }

.diveDecor {
  position: absolute;
  right: -8px;
  top: -18px;
  font-size: 104px;
  font-family: var(--font-display);
  color: rgba(201, 168, 106, 0.1);
  pointer-events: none;
}

.diveBadge {
  font-family: var(--font-body);
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--gold);
  font-weight: 700;
}

.diveTitle {
  font-family: var(--font-display);
  font-size: 23px;
  color: var(--text-strong);
}

.diveDesc {
  font-size: 11px;
  color: var(--text-mute);
}

// ---- 2x2 タイル ----
.tile {
  height: 120px;
  border-radius: 4px;
  border: 1px solid var(--rule-soft);
  background: var(--surface-panel);
  padding: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}

.tile[disabled] {
  background: #101218;
  border-color: rgba(255, 255, 255, 0.05);
  opacity: 0.45;
  cursor: not-allowed;
}

.tile[disabled] .tileIcon { filter: grayscale(1); }
.tile[disabled] .tileLabel { color: var(--text-mute); }
.tile[disabled] .tileDesc { color: var(--text-quote); font-size: 10px; }

.tileIcon { font-size: 26px; }

.tileBody { display: flex; flex-direction: column; gap: 2px; }

.tileLabel {
  font-family: var(--font-display);
  font-size: 16px;
  color: var(--text-strong);
}

.tileDesc {
  font-size: 11px;
  color: var(--text-faint);
}

// ---- 団員 0 時のギルド管理ガイドカード ----
.tileGuide {
  grid-column: 1 / span 2;
  height: 96px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid var(--rule-gold-strong);
  background: #1a2030;
  cursor: pointer;
  text-align: left;
  animation: obsidian-glowPulse 3s ease-in-out infinite;
}

.tileGuideIcon { font-size: 30px; }

.tileGuideText { flex: 1; display: flex; flex-direction: column; gap: 2px; }

.tileGuideLabel {
  font-family: var(--font-display);
  font-size: 17px;
  color: var(--text-strong);
}

.tileGuideHint {
  font-size: 11px;
  color: var(--gold);
}

.tileGuideArrow {
  color: var(--gold);
  font-size: 18px;
}

// ---- 自動保存インジケータ ----
.autosave {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: #5d8a6c;
}

.autosaveDot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #5d8a6c;
  animation: obsidian-glowPulse 2.5s ease-in-out infinite;
}

// ---- フッター ----
.foot {
  flex-shrink: 0;
  padding: 12px 20px max(20px, env(safe-area-inset-bottom, 0px));
}

.exit {
  width: 100%;
  height: 46px;
  border-radius: 3px;
  border: 1px solid rgba(212, 103, 79, 0.45);
  background: transparent;
  color: var(--danger-text);
  font-size: 13px;
  letter-spacing: 0.16em;
  font-family: var(--font-body);
  cursor: pointer;
}

// ---- bottom-sheet ----
.sheetOverlay {
  position: fixed;
  inset: 0;
  background: var(--bg-overlay);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 50;
}

.sheet {
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px 22px max(24px, env(safe-area-inset-bottom, 0px));
  background: var(--surface-panel);
  border-top: 1px solid var(--rule-gold);
  border-radius: 10px 10px 0 0;
  box-shadow: 0 -16px 50px rgba(0, 0, 0, 0.5);
  animation: obsidian-sheetRise 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.sheetHandle {
  width: 40px;
  height: 4px;
  margin: 0 auto;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.18);
}

.sheetHead {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.sheetTitle {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--text-strong);
}

.sheetCount { font-size: 11px; color: var(--text-faint); }

.sheetList {
  display: flex;
  flex-direction: column;
  gap: 9px;
  max-height: 50dvh;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.sheetItem {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 15px;
  border-radius: 3px;
  border: 1px solid var(--rule-base);
  background: #1a1d26;
  color: var(--text-base);
  font-family: var(--font-body);
  font-size: 13px;
  cursor: pointer;
  text-align: left;
}

.sheetDepth {
  font-family: var(--font-mono);
  font-size: 17px;
  font-weight: 700;
  color: var(--gold);
  min-width: 44px;
}

.sheetItemLabel { flex: 1; color: var(--text-soft); font-size: 12px; }

.sheetClose {
  width: 100%;
  height: 50px;
  border-radius: 3px;
  border: 1px solid var(--rule-base);
  background: transparent;
  color: var(--text-mute);
  font-size: 13px;
  letter-spacing: 0.16em;
  cursor: pointer;
  font-family: var(--font-body);
}

// ---- ⚙ サウンド設定モーダル ----
.modalBackdrop {
  position: fixed;
  inset: 0;
  background: var(--bg-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;
  padding: 20px;
}

.modalPanel {
  width: 100%;
  max-width: 360px;
  background: var(--surface-panel);
  border: 1px solid var(--rule-gold);
  border-radius: 6px;
  padding: 18px 20px 20px;
  box-shadow: var(--shadow-modal);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modalHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-display);
  font-size: 16px;
  color: var(--text-strong);
}

.modalCloseBtn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid var(--rule-base);
  background: transparent;
  color: var(--text-mute);
  cursor: pointer;
}

.modalClose {
  width: 100%;
  height: 46px;
  border-radius: 3px;
  border: 1px solid var(--rule-gold-strong);
  background: var(--gold-tint);
  color: var(--gold);
  font-size: 13px;
  letter-spacing: 0.16em;
  cursor: pointer;
  font-family: var(--font-body);
}

// ---- 封蝋スタンプ ----
.sealOverlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  pointer-events: none;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(138, 47, 42, 0.22),
    rgba(7, 8, 9, 0.6) 65%,
    rgba(7, 8, 9, 0.9) 100%
  );
}

.sealCaption {
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--text-quote);
}

// ---- 短画面対応 ----
@media (max-height: 720px) {
  .head { padding: 14px 20px 12px; }
  .stats { margin-top: 8px; }
  .menu { padding-top: 10px; gap: 10px; }
  .tile { height: 104px; }
  .tileGuide { height: 84px; }
  .autosave { margin-top: 8px; }
  .foot { padding-top: 8px; }
}
```

ポイント:

- `.layout` の左右 padding は **0**。ヘッダーとメニュー個々のセクションが内側 padding を持つ（モック準拠で背景がヘッダーバー幅一杯に伸びる）。
- `.menu` は `display: grid; grid-template-columns: 1fr 1fr;` で 2 列。`.dive` と `.tileGuide` は `grid-column: 1 / span 2` で全幅占有。
- `.dive`・`.tile` の disabled 状態セレクタは `&[disabled]` で書く（属性セレクタは CSS Modules で問題なく機能）。
- `.diveResume` 修飾子で潜行中の緑系見た目を切り替え。

### Step 3. Storybook ストーリー

既存 4 ストーリーをそのまま維持。`__stories__/mockSaves.ts` の `mockPostBoss` が既に `warp.unlockedCheckpoints` を持つことを前提に、追加変更は不要。

```tsx
import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import { mockEmpty, mockMidDive, mockPostBoss, mockWithParty } from '@/__stories__/mockSaves';

const meta = {
  title: 'Pages/Town',
  component: Page,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyGuild: Story = {
  decorators: [withGameContext(mockEmpty, { name: 'town' })],
};
export const WithParty: Story = {
  decorators: [withGameContext(mockWithParty, { name: 'town' })],
};
export const MidDive: Story = {
  decorators: [withGameContext(mockMidDive, { name: 'town' })],
};
export const PostBoss: Story = {
  decorators: [withGameContext(mockPostBoss, { name: 'town' })],
};
```

### Step 4. 検証

```
yarn lint
yarn test --run
yarn tsc -b
yarn build   # 成果物 docs/ に影響するので必ず回す
```

Storybook 目視確認（**スマホからも見られるよう `yarn storybook --host 0.0.0.0`**）:

- `WithParty`: モック 2a に近い構成（2x2 + 大カード + 自動保存インジケータ + ⚙）。
- `MidDive`: 青ヒント + 緑系 RESUME カード + 全タイル disabled。
- `EmptyGuild`: 金箔ヒント + ダイブ disabled + `tileGuide` 横長カード + 残り 3 タイル 2x2 配置。
- `PostBoss`: ダイブカード押下で bottom-sheet が `1F` + 解放階で開く。`F` 階数表示に「第 N 帯」サブテキスト。
- ⚙ ボタン押下でサウンド設定モーダルが開閉できる。
- iPhone SE / iPhone 16 で要素重なり無し（`.menu` は `overflow: hidden`、内側に固定高 .tile）。

### Step 5. コミット

ブランチ `feature/redesign-A-town-v2`（既存の `feature/redesign-A-town` を切り直してよい）。完了後 1 コミット、push なし。

```
feat(theme): rewrite town layout to match obsidian mock (2x2 grid + dive card)

- replace MenuButton list with 2x2 tile grid + large dive card
- add ⚙ button reusing SoundSettings modal from title
- add autosave indicator (HH:MM from save.savedAt)
- merge warp/dive into single bottom-sheet (1F + unlocked checkpoints)
- add SEALING caption to dive transition overlay
- add tileGuide horizontal card for empty-guild state

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## 9. 追加トークン要求

`src/_obsidian.scss` には既に下記が定義済み（変更不要）:
- `--info-blue-tint` / `--info-blue-rule` / `--info-blue-text`
- `@keyframes obsidian-sheetRise`

**追加要望なし**。緑色のインジケータ `#5d8a6c` だけハードコードしているが、town 固有色のためトークン化せず scss 内に直書きで OK（他画面で使い回さない前提）。

---

## 想定 Q&A

- **`MenuButton` を捨てるとテストが落ちる**: 現状 town にユニットテストは無い (`find src/pages/town -name "*.test.*"` で確認可)。Storybook の visual smoke はクラス名前提ではないので問題なし。
- **ワープ独立メニューを消すと「ワープ」というラベル自体が画面から消える**: モック 2d のラベルは「ダイブ先選択（ワープ統合）」。**ダイブカード = ワープ統合ハブ**という設計に倒す。design brief §4.2 は「ワープ」ボタンを縦リストに置く想定だが、モック忠実化方針で**ダイブカード経由に統合**する。
- **`save.savedAt` がストーリーで未設定**: `mockSaves.ts` の各 preset を読み、`savedAt` 値があれば HH:MM が出る。0 のときは「自動保存済」のみ。
- **`SoundSettings` を町から開くと既存テストが壊れる**: `SoundSettings` 自体は使い回しで内部実装は変えていない。title での挙動は無関係。
- **ダイブカード disabled 時の `cursor: not-allowed`**: モックに記述は無いが UX 上付与する（追加で問題ない）。
- **bottom-sheet 内に「とじる + 確定ボタン」を入れたい**: 必要なし。tap で即実行のほうがモバイル UX として軽い。モック 2d の確定ボタンは静的モック都合なので機能仕様には含まれない。

不明点が出たら止めて報告すること。色味の微調整以外で構造分岐・文言・ロジックから外れてはいけない。
