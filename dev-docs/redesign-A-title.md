# フェーズ 1：title 画面リデザイン（sonnet 用指示書）

`dev-docs/redesign-A.md` を必ず先に読むこと。本ファイルは title 画面の取り込み手順を網羅した実装指示書。

## 触ってよいファイル

以下 11 ファイルのみ。**他のファイルは絶対に変更しない**（特に `src/_variables.scss` を触ると他画面のスタイルが崩れる）。

| 区分 | パス | 操作 |
| --- | --- | --- |
| 新規 | `src/_obsidian.scss` | 黒曜テーマトークン（SCSS 変数 + CSS カスタムプロパティ + 共通 @keyframes） |
| 編集 | `index.html` | Web フォント `<link>` に `Shippori Mincho` と `Zen Kaku Gothic New` を追加 |
| 編集 | `src/index.scss` | `@use './obsidian';` を追加（既存 `_variables.scss` の import や body 背景は触らない） |
| 編集 | `src/pages/title/index.tsx` | 樹エンブレム / 浮遊粒子 / SaveCard 部の構造を新マークアップに刷新 |
| 編集 | `src/pages/title/style.module.scss` | 黒曜テーマで全面再構築 |
| 編集 | `src/pages/title/Title.stories.tsx` | 新規ストーリー追加（Corrupted / GuildNameInput / OverwriteConfirm / SoundPanel） |
| 編集 | `src/pages/title/index.test.tsx` | 既存テストを通すために必要なら更新（ボタン文言・aria 等の差分のみ） |
| 編集 | `src/components/common/SaveCard/SaveCard.tsx` | continue ボタンを削除し、メタ表示のみに変更 |
| 編集 | `src/components/common/SaveCard/style.module.scss` | 黒曜テーマで再構築 |
| 編集 | `src/components/common/SaveCard/SaveCard.stories.ts` | onContinue prop が消えたぶん更新 |
| 編集 | `src/components/common/SoundSettings/SoundSettings.module.scss` | 黒曜テーマで再構築（マークアップは現状維持） |
| 編集 | `src/components/AppUpdater/style.module.scss` | 黒曜テーマで再構築 |

## やってはいけないこと

- `src/_variables.scss` を変更しない（フェーズ 2 で対応）。
- 他画面の `style.module.scss` を変更しない。
- `index.scss` の `body` 背景・`font-family`・モーション変数を変更しない（既存値を残し、`@use './obsidian';` を 1 行追加するだけ）。
- 自分でさらに `Agent` / `Task` を spawn しない（孫委譲禁止）。
- 写本テーマ由来の SCSS 変数 (`$parchment` 等) を新規参照しない。
- ゲームロジック（`continueGame()` / `startNewGame()` / `useAppUpdate` / `useSfx` の挙動）には手を入れない。文言・props の流れも温存。

## ゴール

Storybook で `Pages/Title` の以下 6 ストーリーが、添付モック「案 A 黒曜 OBSIDIAN MINIMAL」と同じビジュアル方向性で描画される:

1. `WithSave` — 黒曜背景・樹エンブレム・浮遊粒子・SaveCard（5 名分のポートレート行）・つづきから（primary gold）・最初から（sub）
2. `NoSave` — 同上だが SaveCard の代わりに破線枠の「セーブデータはありません」、つづきから（無効・暗灰色）・最初から（primary gold）
3. `Corrupted` — 警告カード（朱の点滅、ただし `prefers-reduced-motion: reduce` 時は点滅停止）・樹エンブレム減光・つづきから disabled・最初から (primary gold)
4. `GuildNameInput` — 章マーク「❦ 結成の儀」、中央「ギルドの名を」、入力欄、はじめる / もどる
5. `OverwriteConfirm` — モーダル（半透明オーバーレイ + 中央パネル）、「最初から始めますか？」+ 危険ボタン
6. `SoundPanel` — モーダル + SoundSettings の中身（黒曜カラー）

`yarn test`・`yarn lint`・`yarn tsc -b`（または `yarn build`）が緑であること。

---

## 実装ステップ

### Step 0. フォント追加

`index.html` の Google Fonts `<link>` を更新する:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Kaisei+Tokumin:wght@500;700&family=JetBrains+Mono:wght@500;700&family=Shippori+Mincho:wght@600;700;800&family=Zen+Kaku+Gothic+New:wght@400;500;700;900&display=swap"
/>
```

Kaisei Tokumin はフェーズ 2 で削除予定だが、フェーズ 1 では他画面が依存しているので残す。

### Step 1. `src/_obsidian.scss` を新規作成

`@use 'variables' as var;` は不要。SCSS 変数と `:root` CSS 変数の両方を出力する。
中身の骨子:

```scss
// ==========================================================
// 黒曜 OBSIDIAN MINIMAL テーマ — 案 A v2
// ==========================================================

// --- 紙地 / 背景層 ---
$obsidian-bg-deep:    #090a0d;
$obsidian-bg-mid:     #0e0f13;
$obsidian-bg-rise:    #1c2230;
$obsidian-surface-panel: #15171f;

// --- インク（文字 / 罫線） ---
$obsidian-text-strong: #f2ede1;
$obsidian-text-base:   #d9d4c8;
$obsidian-text-soft:   #c2bdb2;
$obsidian-text-mute:   #9a958a;
$obsidian-text-faint:  #8c8a84;
$obsidian-text-blue:   #7d8aa0;
$obsidian-text-quote:  #6b6f7a;

// --- 金箔（primary） ---
$obsidian-gold:        #c9a86a;
$obsidian-gold-deep:   #b08f4f;
$obsidian-gold-bright: #e8d099;

// --- 危険 ---
$obsidian-danger:       #b23c30;
$obsidian-danger-glow:  #d4674f;
$obsidian-danger-text:  #e09180;
$obsidian-danger-soft:  #b89089;

// --- 成功 / 情報 ---
$obsidian-success:   #3f8a5c;
$obsidian-info-blue: #a9c3d8;

// ==========================================================
// CSS カスタムプロパティを :root に配布
// （各コンポーネントは原則こちらの var() を使う）
// ==========================================================
:root {
  --bg-deep:    #{$obsidian-bg-deep};
  --bg-mid:     #{$obsidian-bg-mid};
  --bg-rise:    #{$obsidian-bg-rise};
  --bg-overlay: rgba(6, 7, 10, 0.72);

  --surface-card: linear-gradient(180deg, #191c24, #13151c);
  --surface-panel: #{$obsidian-surface-panel};
  --surface-elev: rgba(255, 255, 255, 0.04);

  --bg-page-gradient: radial-gradient(
    130% 90% at 50% -8%,
    var(--bg-rise) 0%,
    var(--bg-mid) 56%,
    var(--bg-deep) 100%
  );

  --text-strong: #{$obsidian-text-strong};
  --text-base:   #{$obsidian-text-base};
  --text-soft:   #{$obsidian-text-soft};
  --text-mute:   #{$obsidian-text-mute};
  --text-faint:  #{$obsidian-text-faint};
  --text-blue:   #{$obsidian-text-blue};
  --text-quote:  #{$obsidian-text-quote};

  --rule-soft:        rgba(255, 255, 255, 0.07);
  --rule-base:        rgba(255, 255, 255, 0.14);
  --rule-gold:        rgba(201, 168, 106, 0.3);
  --rule-gold-strong: rgba(201, 168, 106, 0.5);

  --gold:        #{$obsidian-gold};
  --gold-deep:   #{$obsidian-gold-deep};
  --gold-bright: #{$obsidian-gold-bright};
  --gold-glow:   rgba(201, 168, 106, 0.3);
  --gold-tint:   rgba(201, 168, 106, 0.08);

  --danger:           #{$obsidian-danger};
  --danger-glow:      #{$obsidian-danger-glow};
  --danger-text:      #{$obsidian-danger-text};
  --danger-text-soft: #{$obsidian-danger-soft};
  --danger-tint:      rgba(212, 103, 79, 0.08);

  --success:   #{$obsidian-success};
  --info-blue: #{$obsidian-info-blue};

  --shadow-page:  0 12px 40px rgba(0, 0, 0, 0.28);
  --shadow-modal: 0 20px 60px rgba(0, 0, 0, 0.6);

  --font-display: 'Shippori Mincho', serif;
  --font-body:    'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}

// ==========================================================
// グローバル keyframes（写本テーマの index.scss と競合しないよう接頭辞付き）
// ==========================================================
@keyframes obsidian-moteDrift {
  0%   { transform: translateY(0)    translateX(0);  opacity: 0; }
  10%  {                                              opacity: 0.7; }
  90%  {                                              opacity: 0.7; }
  100% { transform: translateY(-150px) translateX(14px); opacity: 0; }
}
@keyframes obsidian-glowPulse {
  0%, 100% { opacity: 0.4;  transform: scale(1); }
  50%      { opacity: 0.85; transform: scale(1.06); }
}
@keyframes obsidian-breathe {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-3px); }
}
@keyframes obsidian-warnBlink {
  0%, 49%   { opacity: 1; }
  50%, 100% { opacity: 0.4; }
}
@keyframes obsidian-sealStamp {
  0%   { transform: translate(-50%, -50%) scale(2.4) rotate(-14deg); opacity: 0; }
  40%  { opacity: 1; }
  55%  { transform: translate(-50%, -50%) scale(0.92) rotate(-6deg); }
  70%  { transform: translate(-50%, -50%) scale(1.04) rotate(-6deg); }
  100% { transform: translate(-50%, -50%) scale(1) rotate(-6deg); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes obsidian-moteDrift { 0%, 100% { opacity: 0; transform: none; } }
  @keyframes obsidian-glowPulse { 0%, 100% { opacity: 0.6; transform: none; } }
  @keyframes obsidian-breathe   { 0%, 100% { transform: none; } }
  @keyframes obsidian-warnBlink { 0%, 100% { opacity: 1; } }
  @keyframes obsidian-sealStamp { 0%, 100% { transform: translate(-50%, -50%); opacity: 1; } }
}
```

### Step 2. `src/index.scss` の更新

既存 `@use 'variables' as var;` の **直後**に `@use './obsidian';` を追加するだけ。
それ以外の行は触らない（body 背景 / フォント / リセットを温存）。

```scss
@use 'variables' as var;
@use './obsidian';

// :root { --motion-quick: ... } 以下は既存のまま
```

### Step 3. `src/components/common/SaveCard/SaveCard.tsx` の改修

continue ボタンを削除して「ギルド名・到達階・団員数・最終セーブ時刻・パーティ立ち絵 5 枠」を表示するメタカードに変える。`onContinue` prop は不要になるので消す。corrupted の表示も新マークアップにする（朱の警告カード、点滅は外側のラッパで CSS から処理）。

新シグネチャ:

```tsx
import { CharacterPortrait } from '@/components/common/CharacterPortrait';
import type { Member, SaveMeta } from '@/domain/types';

type Props = {
  meta: SaveMeta;
  /** 先頭 5 名分のポートレート用。長さ 0〜5 まで。なければ空配列。 */
  partyPreview?: Member[];
};
```

- `meta.corrupted` のときは警告カード（`<div class={styles.corrupted}>` でラップし、内側に「セーブデータが破損しています」と「データを読み込めませんでした。新規開始のみ可能です。」を表示。点滅 animation は CSS）。
- それ以外は黒曜メタカード:
  - 1 行目: 左にギルド名（display 16px）、右に到達階「47F 到達」（mono 10px gold）
  - 2 行目: 5 マスの正方形グリッド（縦横比 1:1 / `display: flex; gap: 6px`）。`partyPreview[i]` があれば 30x30px の `CharacterPortrait`（既存コンポーネント、`size="sm"` 等）を入れる。無いマスは `--surface-elev` 背景 + 中央に `−`。
  - 3 行目: 左に「団員 N 人」、右に「自動保存済 ・ HH:MM」（両方 mono 10px / text-faint）
- マークアップ全体は `<div class={styles.card}>` をラッパに、中で flex column。

`SaveCard.stories.ts` から `onContinue` を除く。

### Step 4. title `index.tsx` の構造刷新

`useGameState`、`useNavigation`、`useSfx`、`useAppUpdate`、`getSaveMeta`、`SaveCard`、`SoundSettings`、`AppUpdater` の import / hook 利用は温存。state machine（`mode: 'menu' | 'confirm' | 'guildName'`、`soundOpen`）も温存。

`continueGame` / `startNewGame` の呼出しタイミング、`hasValidSave` 判定、`handleContinue` / `handleNewGameStart` / `confirmCreate` のロジックを変えない。

マークアップ:

```tsx
return (
  <div className={styles.layout}>
    {/* 背景の浮遊粒子 4 つ：絶対配置、アニメ animation: obsidian-moteDrift … */}
    <div className={styles.mote1} aria-hidden />
    <div className={styles.mote2} aria-hidden />
    <div className={styles.mote3} aria-hidden />
    <div className={styles.mote4} aria-hidden />

    {/* 章マーク（モードで切替）と⚙ */}
    <p className={styles.chapterMark}>
      ❦ {mode === 'guildName' ? '結成の儀' : '同見の書'}
    </p>
    <button type="button" className={styles.gearBtn} aria-label="サウンド設定" onClick={...}>⚙</button>

    {mode === 'menu' ? (
      <>
        {/* 樹エンブレム（円輪 2 + 中心の「樹」字） */}
        <div className={styles.emblem} aria-hidden>
          <span className={styles.emblemRingOuter} />
          <span className={styles.emblemRingInner} />
          <span className={styles.emblemKanji}>樹</span>
        </div>
        <h1 className={styles.title}>世界樹ライク</h1>
        <p className={styles.subtitle}>無限タワー探索 RPG</p>
        <p className={styles.quote}>
          {meta?.corrupted
            ? '「失われた頁は、新しき頁の余白となる。」'
            : hasValidSave
              ? '「樹は記憶し、塔は試す。\n登りし者の名を、いずれ頂が呼ぶ。」'
              : '「はじまりの一歩は、いつも誰かの名づけから。」'}
        </p>

        {/* SaveCard / NoSave / Corrupted の 3 状態 */}
        {loading ? (
          <div className={styles.placeholderCard}>読み込み中...</div>
        ) : meta?.corrupted ? (
          <SaveCard meta={meta} />
        ) : meta ? (
          <SaveCard meta={meta} partyPreview={partyPreview} />
        ) : (
          <div className={styles.noSaveCard}>
            <p className={styles.noSaveText}>セーブデータはありません</p>
            <p className={styles.noSaveNote}>新しい隊商を結成して塔へ挑みましょう。</p>
          </div>
        )}

        {/* アクションボタン群 */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primary}
            disabled={!hasValidSave || busy}
            onClick={() => void handleContinue()}
          >
            つづきから
          </button>
          <button
            type="button"
            className={styles.sub}
            disabled={busy}
            onClick={handleNewGameStart}
          >
            最初から
          </button>
        </div>

        {/* 控えめなフッタ */}
        <div className={styles.foot}>
          <span className={styles.version}>v{__APP_VERSION__}</span>
          <button type="button" className={styles.updateBtn} disabled={isChecking} onClick={...}>
            {isChecking ? '確認中…' : '更新を確認'}
          </button>
        </div>
      </>
    ) : mode === 'guildName' ? (
      <div className={styles.ritual}>
        <h2 className={styles.ritualHead}>ギルドの名を</h2>
        <p className={styles.ritualSub}>塔へ挑む隊商に名を与えよ</p>
        <div className={styles.inputWrap}>
          <input ... />
          <span className={styles.cursor} aria-hidden />
        </div>
        <div className={styles.inputMeta}>
          <span>初期値: ななしのギルド</span>
          <span>{guildName.length} / 16</span>
        </div>
        <div className={styles.actions}>
          <button className={styles.primary} ...>はじめる</button>
          <button className={styles.sub} ...>もどる</button>
        </div>
      </div>
    ) : (
      // mode === 'confirm'
      <div className={styles.modalBackdrop}>
        <div className={styles.modalPanel}>
          <h2 className={styles.modalTitle}>最初から始めますか？</h2>
          <div className={styles.modalWarn}>
            現在のセーブデータ『<span className={styles.modalWarnAccent}>{meta?.guildName}</span>』は上書きされ、元に戻せません。
          </div>
          <div className={styles.actions}>
            <button className={styles.danger} ...>データを消して始める</button>
            <button className={styles.sub} ...>もどる</button>
          </div>
        </div>
      </div>
    )}

    <AppUpdater banner={banner} onApply={applyUpdate} />

    {soundOpen ? (
      <div className={styles.modalBackdrop} onClick={...}>
        <div className={styles.modalPanel} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <span>設定</span>
            <button type="button" aria-label="閉じる" onClick={...}>✕</button>
          </div>
          <SoundSettings />
          <button type="button" className={styles.modalClose} onClick={...}>とじる</button>
        </div>
      </div>
    ) : null}
  </div>
);
```

`partyPreview` は `useGameState()` から `save?.guild.members` を取り出し、`save.guild.party` の前衛 + 後衛にいるメンバーを先頭順で 5 名スライス。`save` を `useGameState` が公開していない場合は読まずに `undefined` を渡して構わない（空マス表示になる）。store の構造を変えてはいけない。

### Step 5. `src/pages/title/style.module.scss` の全面置換

`@use 'variables' as var;` は **削除**（旧変数を一切参照しない）。各セレクタは `var(--*)` を直接参照する。

主要セレクタの目安:

- `.layout`: `position: relative; display: block; width: 100%; height: 100dvh; max-width: 393px; margin: 0 auto; padding: 0; overflow: hidden; background: var(--bg-page-gradient); color: var(--text-base); font-family: var(--font-body); box-shadow: var(--shadow-page);`
- `.mote1` 〜 `.mote4`: `position: absolute; bottom: 0; width/height: 2-4px; border-radius: 50%; background: var(--gold) または var(--info-blue); animation: obsidian-moteDrift ...;` のセットを 4 つ。左位置・サイズ・delay・duration を差分。
- `.chapterMark`: `position: absolute; top: 30px; left: 0; right: 0; text-align: center; font-family: var(--font-display); font-size: 13px; letter-spacing: .4em; color: var(--text-blue);`
- `.gearBtn`: 34x34 circle, top: 28px; right: 22px; `border: 1px solid var(--rule-gold); color: var(--gold);`
- `.emblem`: 154x154 を中央寄せ。`position: absolute; top: 104px; left: 50%; transform: translateX(-50%);` 内部に二重円輪と「樹」字。
- `.emblemRingOuter`: `position: absolute; inset: 0; border-radius: 50%; border: 1px solid var(--rule-gold); animation: obsidian-glowPulse 5s ease-in-out infinite;`
- `.emblemRingInner`: `position: absolute; inset: 26px; border-radius: 50%; border: 1px solid var(--rule-gold-strong);`
- `.emblemKanji`: `position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-weight: 700; font-size: 62px; color: var(--gold); animation: obsidian-breathe 6s ease-in-out infinite;`
- `.title`: `position: absolute; top: 282px; left: 0; right: 0; margin: 0; text-align: center; font-family: var(--font-display); font-weight: 800; font-size: 44px; letter-spacing: .06em; color: var(--text-strong); text-shadow: 0 2px 30px var(--gold-glow);`
- `.subtitle`: `position: absolute; top: 332px; ...; font-size: 13px; letter-spacing: .42em; color: var(--text-faint);`
- `.quote`: `position: absolute; top: 370px; left: 38px; right: 38px; text-align: center; font-family: var(--font-display); font-style: italic; font-size: 12px; line-height: 1.7; color: var(--text-quote); white-space: pre-line;`
- `.placeholderCard` / `.noSaveCard`: `position: absolute; left: 34px; right: 34px; top: 450px;` で SaveCard と同じ位置に置く。`.noSaveCard` は `border: 1px dashed var(--rule-gold); background: var(--surface-elev); border-radius: 4px; padding: 18px; text-align: center;`。

- `.actions`: `position: absolute; left: 34px; right: 34px; bottom: 100px; display: flex; flex-direction: column; gap: 12px;` (`bottom` は menu/guildName で 100px、modal の `.actions` は内側で `bottom: auto; position: static;` にする — SCSS module ではセレクタを使い分けるか、modal 内では `.actions` を別名 `.modalActions` に分けるのが安全)
- `.primary`: 56px 高 / `border-radius: 3px; border: none; background: linear-gradient(180deg, var(--gold), var(--gold-deep)); color: var(--bg-mid); font-weight: 700; font-size: 16px; letter-spacing: .16em; box-shadow: 0 6px 20px var(--gold-glow); cursor: pointer;`。`:disabled` で `background: var(--surface-elev); color: var(--text-mute); box-shadow: none;`。
- `.sub`: 52px 高 / `border-radius: 3px; border: 1px solid var(--rule-base); background: rgba(255, 255, 255, 0.03); color: var(--text-base); font-weight: 600; font-size: 15px; letter-spacing: .16em;`
- `.danger`: 52px 高 / `border-radius: 3px; background: var(--danger); color: #fbeae6; font-weight: 700; font-size: 15px; letter-spacing: .08em;`
- `.foot`: `position: absolute; left: 0; right: 0; bottom: max(16px, env(safe-area-inset-bottom, 0px)); text-align: center; display: flex; flex-direction: column; align-items: center; gap: 4px;`
- `.version`: `font-family: var(--font-mono); font-size: 10px; color: var(--text-mute); opacity: 0.6;`
- `.updateBtn`: 28px 高 / `padding: 0 12px; border: 1px solid var(--rule-base); border-radius: 2px; background: transparent; color: var(--text-mute); font-size: 11px;`
- `.ritual`（guildNameInput 用）: 上部 150px に大見出し、280px に入力欄、下部に primary/sub を `bottom: 54px`。`.cursor` は `width: 2px; height: 28px; background: var(--gold); animation: obsidian-warnBlink 1s steps(1) infinite;`
- `.modalBackdrop`: `position: fixed; inset: 0; background: var(--bg-overlay); display: flex; align-items: center; justify-content: center; z-index: 100;`
- `.modalPanel`: `width: min(360px, calc(100% - 56px)); background: var(--surface-panel); border: 1px solid var(--rule-gold); border-radius: 6px; padding: 24px 22px; box-shadow: var(--shadow-modal); display: flex; flex-direction: column; gap: 16px;`
- `.modalTitle`: `font-family: var(--font-display); font-size: 20px; text-align: center; color: var(--text-strong); margin: 0;`
- `.modalWarn`: `font-size: 13px; color: var(--text-soft); line-height: 1.8; background: var(--danger-tint); border-left: 2px solid var(--danger-glow); padding: 12px 14px; border-radius: 0 3px 3px 0;`
- `.modalWarnAccent`: `color: var(--danger-text);`
- `.modalHeader`: `display: flex; justify-content: space-between; align-items: center; font-family: var(--font-display); font-size: 18px; color: var(--text-strong);` 中の ✕ ボタンは 28px 円、`border: 1px solid var(--rule-base); color: var(--text-mute);`

ボタン文言・aria-label は既存と同じ（「つづきから」「最初から」「はじめる」「もどる」「データを消して始める」「とじる」「サウンド設定」「v...」「更新を確認」など）。

#### モーション抑制

reduced-motion は `_obsidian.scss` 側の `@keyframes` 再定義で吸収済み。各セレクタ側で個別対応は不要。

### Step 6. `SaveCard/style.module.scss` の置換

`@use` 行を削除し、上記 Step 3 の構造に合わせて黒曜カラーで書く:

- `.card`: `position: relative; padding: 14px 14px 12px; border: 1px solid var(--rule-gold); border-radius: 4px; background: var(--surface-card); color: var(--text-base); display: flex; flex-direction: column; gap: 10px;`
- `.head`: `display: flex; justify-content: space-between; align-items: baseline;`
- `.guildName`: `font-family: var(--font-display); font-size: 16px; color: var(--text-strong);`
- `.depth`: `font-family: var(--font-mono); font-size: 10px; color: var(--gold);`
- `.partyRow`: `display: flex; gap: 6px;` 子要素は `.partyCell { flex: 1; aspect-ratio: 1 / 1; border-radius: 3px; background: var(--bg-deep); border: 1px solid var(--rule-gold); overflow: hidden; display: flex; align-items: center; justify-content: center; }` / `.partyEmpty { background: var(--bg-deep); border: 1px solid var(--rule-base); color: var(--text-faint); font-size: 14px; }`
- `.footRow`: `display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 10px; color: var(--text-faint);`
- `.corrupted`: `border: 1px solid var(--danger-glow); background: var(--danger-tint); color: var(--danger-text); animation: obsidian-warnBlink 1.6s steps(1) infinite;` 内部に `.corruptedText` (`font-size: 13px; font-weight: 700; color: var(--danger-text); display: flex; gap: 8px; align-items: center;`) と `.corruptedNote` (`font-size: 11px; color: var(--danger-text-soft); line-height: 1.6;`)

### Step 7. `SoundSettings/SoundSettings.module.scss` の置換

既存 `<h2>サウンド設定</h2>` ヘッダーがモーダル側ヘッダーと二重になるので、`.title` は `display: none;` か、スタイルを単に黒曜に合わせる（モーダル側ヘッダーは title 画面の `.modalHeader` が描く想定なので、SoundSettings 内の `.title` は非表示で OK）。

- `.container`: `display: flex; flex-direction: column; gap: 18px; color: var(--text-base);`
- `.sectionTitle`: `font-family: var(--font-display); font-size: 14px; color: var(--text-strong); margin: 0; padding-bottom: 6px; border-bottom: 1px solid var(--rule-soft);`
- `.row`: `display: flex; justify-content: space-between; align-items: center; gap: 12px;`
- `.label`: `font-size: 12px; color: var(--text-soft);`
- `.muteButton`: `min-width: 64px; height: 28px; border-radius: 3px; border: 1px solid var(--rule-gold); background: var(--gold-tint); color: var(--gold); font-size: 11px; cursor: pointer;` `.muted` は `background: transparent; border-color: var(--rule-base); color: var(--text-mute);`
- `.sliderWrapper`: `flex: 1; display: flex; align-items: center; gap: 12px;`
- `.slider`: range input。 `appearance: none; flex: 1; height: 5px; border-radius: 3px; background: rgba(255,255,255,.1);` `::-webkit-slider-thumb { appearance: none; width: 16px; height: 16px; border-radius: 50%; background: var(--gold-bright); box-shadow: 0 0 8px var(--gold-glow); cursor: pointer; }` `::-moz-range-thumb` も同様。
- `.volumeValue`: `font-family: var(--font-mono); font-size: 11px; color: var(--gold); min-width: 32px; text-align: right;`

### Step 8. `AppUpdater/style.module.scss` の置換

`.banner`: `position: absolute; top: 60px; left: 16px; right: 16px; display: flex; gap: 10px; align-items: center; padding: 10px 14px; border-radius: 4px; background: var(--surface-panel); border: 1px solid var(--rule-gold); box-shadow: var(--shadow-modal); color: var(--text-strong); font-size: 12px; z-index: 50;`
`.banner_info`: `border-color: var(--rule-base); color: var(--text-base);`
`.message`: `flex: 1;`
`.button`: 28px 高 / `padding: 0 12px; border: none; border-radius: 3px; background: var(--gold); color: var(--bg-mid); font-weight: 700; font-size: 11px; cursor: pointer;`

### Step 9. ストーリー追加

`src/pages/title/Title.stories.tsx` に以下のストーリーを追加。`mockEmpty` / `mockWithParty` 以外のモックが必要なら `src/__stories__/mockSaves.ts` に preset を追加してよい（ただし既存 preset は触らない）。

- `Corrupted`: `mockCorrupted`（新規 preset を `mockSaves.ts` に追加。`{ ...mockWithParty, corrupted: true }` を返す factory でよい）。
- `GuildNameInput`: 初期表示で mode が 'guildName' になるよう、Story の play function で `userEvent.click(/最初から/)` を 2 回（NoSave なら 1 回）してから入力欄が描画されるのを assert。`mockWithParty` を使うなら最初の押下で confirm へ進むので 2 段階クリックが必要。
- `OverwriteConfirm`: `mockWithParty` で「最初から」を 1 回押した直後の表示。`play` function で確認。
- `SoundPanel`: `mockWithParty` で⚙ボタンを押下した直後。

`play` で待つときは `await waitFor(...)` を使う。Storybook の `play` から `@testing-library/react` の `screen` / `userEvent` を import。既に他ページのストーリーで実例があれば真似する（`src/pages/battle/Battle.stories.tsx` 等を参考に）。

### Step 10. テスト

`src/pages/title/index.test.tsx` を最小修正で通す。文言の差分（「つづきから」「最初から」「サウンド設定」など）は既存と一致しているはずなので、構造変更でテストが落ちる場合のみ調整する。**テストの意図を変えない**こと（ロジックの assert は維持）。

### Step 11. 検証

完了前に以下を回し、すべて緑であることを確認:

```
yarn lint
yarn test --run
yarn tsc -b
```

（`yarn tsc -b` が単独で動かないリポなら `yarn build` でもよい。ただしビルド成果物 `docs/` のコミットはディレクター側で対応するのでこちらでは含めなくてよい。）

その後 Storybook を一時的に立ち上げて 6 ストーリー（WithSave / NoSave / Corrupted / GuildNameInput / OverwriteConfirm / SoundPanel）が正しく描画されることを目視確認すること。スクリーンショットは取らない（ディレクター側で別途撮影する）。

### Step 12. コミット

完了したらブランチ `feature/redesign-A-title` を切ってコミットし、commit SHA を報告する。push はしない。コミットメッセージは:

```
feat(theme): introduce 黒曜 OBSIDIAN MINIMAL theme and apply to title screen

- add src/_obsidian.scss with theme tokens and global keyframes
- rebuild title page (menu / guildNameInput / confirm / soundPanel) with new theme
- refactor SaveCard to a meta-only card with party portrait row
- restyle SoundSettings and AppUpdater for the new theme

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## 想定 Q&A

- **`partyPreview` の作り方が分からない**: `useGameState()` が返す `save` から `save?.guild.members` と `save?.guild.party` を組み合わせる。`party.front[].memberId` と `party.back[].memberId` を順に並べて `members.find(m => m.id === id)` で Member を取り出す。型定義は `src/domain/types.ts`。
- **`__APP_VERSION__` の型エラー**: 既存実装が使っているので grep で型宣言の場所を確認（`src/vite-env.d.ts` あたり）。
- **`useGameState` に `save` が無い**: `partyPreview` は省略してよい。空マスのみで OK。
- **input の `ref` で focus**: 既存実装が `autoFocus` を使っているのでそれを維持。
- **モバイル幅 393px 固定はどうする？**: `.layout` の `max-width: 393px;` で OK。それより狭い画面（iPhone SE 375px）は、絶対配置の各要素を相対座標で書いているので自然に縮む。`left: 34px; right: 34px` 等は内側に対する相対値なので問題ない。`top: 104px` 等の固定値は 393x852 を基準にしているので、375x667 の画面では emblem や引用文が画面下に押し出される可能性がある。短画面では `@media (max-height: 720px)` で `top` を縮める対応をしてもよい（無理ならフェーズ 2 で対応するので、いまは長身画面前提で OK）。

不明点が出たら止めて報告すること。
