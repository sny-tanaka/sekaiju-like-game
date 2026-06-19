# フェーズ 2：town 画面リデザイン（sonnet 用指示書）

`dev-docs/redesign-A.md`（特に **§1.5 レイアウト運用ルール**）と
`dev-docs/redesign-A-title-fix.md`（flex column 化パターン）を **必ず先に読むこと**。
本ファイルは town（拠点ハブ）画面の取り込み手順を網羅した実装指示書。

実装は **flex column 一本**。絶対配置で `top` / `bottom` を直書きするのは禁止（装飾レイヤとモーダル backdrop のみ例外）。

---

## 触ってよいファイル / 触ってはいけないファイル

以下 4 ファイルのみ。**他は絶対に変更しない**。特に共通コンポーネント (`MenuButton` / `InkSplatter` 等) と `_variables.scss`、他画面の scss、他画面の `index.tsx`、`__stories__/mockSaves.ts` の既存 preset は触らない。

| 区分 | パス | 操作 |
| --- | --- | --- |
| 編集 | `src/pages/town/index.tsx` | 構造を黒曜テーマに合わせて刷新（ヘッダーの組み直し、`MenuButton` の利用継続、ワープモーダルを bottom-sheet 化、ヒント文・stats の表現変更） |
| 編集 | `src/pages/town/style.module.scss` | 全面書き直し。`@use 'variables' as var;` を **削除**して `var(--*)` のみ参照する |
| 編集 | `src/pages/town/Town.stories.tsx` | `WithParty` / `MidDive` / `EmptyGuild` に加えて **`PostBoss`**（ワープ解放後）ストーリーを追加。既存ストーリーの decorators は触らない |
| 追加可 | `src/__stories__/mockSaves.ts` | `mockPostBoss` は **既存**（line 86 付近）なのでそのまま import するだけ。**preset を新規追加してはいけない**（不足する場合のみ指示書側で許可を取る） |

### やってはいけないこと

- `src/_variables.scss` および写本テーマ系 SCSS 変数 (`$parchment`, `$ink`, `$vermilion`, `$rule` 等) を新規参照しない。
- 共通コンポーネント (`MenuButton`, `InkSplatter`, `CharacterPortrait` など) の中身は触らない。`MenuButton` は **そのまま使う**（黒曜テーマ用の見た目は別 sonnet が `MenuButton/style.module.scss` を黒曜化する想定。town の scss 側から強制スタイルで上書きしない）。
- `MenuButton` の **props・variant 値・sfx の流れを変えない**（既存 `variant="primary"` / `sfx={null}` / `disabled={...}` は温存）。
- ゲームロジック（`startDive` / `applyAndPersist` / `exitToTitle` / `useGameState` の使用方法）には手を入れない。文言（章マーク・ヒント・ボタンラベル）も既存と同じものをそのまま使う。
- 自分でさらに `Agent` / `Task` を spawn しない（孫委譲禁止）。
- 既存テストの assert 文を変えない（テストファイルは `index.test.tsx` が無い画面なら作らない。文言一致を壊さなければそれで OK）。
- ページ全体に `overflow-y: auto` をかけない。スクロールが必要なら **`.menu` のセクション内**だけで吸収する。

---

## ゴール

Storybook で `Pages/Town` の以下 4 ストーリーが、添付モック「案 A 黒曜 OBSIDIAN MINIMAL」の方向性で描画される:

1. `EmptyGuild` — 団員 0 人。ヒントカード（金箔タイント）+ ダイブ disabled + ギルド管理ボタンを強調。
2. `WithParty` — 通常拠点。ダイブ primary + 5 メニュー active。
3. `MidDive` — 潜行中。青色のヒントカード「潜行中のため…」+ 再開 primary + 他 5 メニュー disabled。
4. `PostBoss` — ワープ解放後。ワープボタンの description が `解放済み: 10F・20F` 形式で出る。

すべて iPhone SE / iPhone 16（URL バー表示時の dvh 778 程度）でも要素が重ならず、`html, body { overflow: hidden }` 制約下で全部見える。`yarn lint`・`yarn test --run`・`yarn tsc -b` が緑。

---

## モック原本との差分（機能優先で判断した点）

参考: `/tmp/sekaiju-design/案A_v2.dc.html` line 249〜362 の `2a〜2e`。

### モック上にあるが省略する（機能要件に存在しない）

- **「蒼月の隊商」** というギルド名はモックの作例なので、実際は `guild.name` を表示する（モック準拠だが名前は動的）。
- **章マーク右上の ⚙ ボタン**。サウンド設定モーダルは title 画面で開く設計であり、town には `SoundSettings` を開く導線がない (`useGameState` にも `soundOpen` state を持たない)。**削除する**。
- **「自動保存済 ・ 12:08」インジケータ**（モック 2a の下部）。`SaveMeta` から `savedAt` を引いて表示することは技術的に可能だが、town は **拠点に入った時点で都度保存される**ので「自動保存済」を常設するとノイズになる。`claude-design-brief.md §4.2` にもこの要素は無い。**省略する**。
- **「DIVE」「RESUME」の英字バッジ**（モックでカードに英語ラベルが乗っている）はフレーバーなので削除して構わない。必要なら primary カードの隅に `font-mono` で `DIVE` だけ残すのは可（任意）。
- **2x2 グリッドでギルド/ショップ/鍛冶/図鑑を並べる構造**。`claude-design-brief.md §4.2 表示要素 §メニューボタンの縦リスト` で **「縦リスト」**が機能要件として明示されている。**モックの 2x2 grid は採用せず、`MenuButton` の縦リスト**に統一する。MenuButton は title フェーズで黒曜トーンに切り替わっている前提なので、town もそのまま使う。
- **2c「団員 0 人」モックで `ギルド管理` ボタンだけ横長カードに置き換わる演出**。機能上は MenuButton の description で「まずここで冒険者を作成」相当の誘導が表現できれば十分。**特別 UI は省略**し、ヒントカードの方で誘導する。
- **2d ワープモーダルが bottom-sheet（下から競り上がる）+ 解放 5 地点を全部並べる構造**。現実装は `unlockedCheckpoints.map(...)` で実数だけ並べる（10F 単位、最大 `Math.floor(deepestReached / 10)` 個）。design brief §4.2 にも「各チェックポイントごとに『第 {depth} 階へ』ボタン」とある。**bottom-sheet 形のスタイル**は採用する（モック準拠で良い）が、リスト中身は実データに従う。1F は dive 開始と等価なので **モーダル内に 1F を含めない**（既存実装どおり）。
- **2e 封蝋シジル演出**は既存 `InkSplatter variant="seal"` をそのまま使い、その上に被さる radial gradient / SEALING テキストは省略（既存実装の `.sealOverlay` に半透明背景だけ被せれば十分）。

### モック上には描かれていないが機能上は維持する

- 「**最高 −**」（deepestReached が 0 のとき）の表示分岐。モック 2c は `最高 −` を出すが、実装は条件分岐で **0 のとき非表示**にしている (`towerState.record.deepestReached > 0` ガード)。これは既存挙動を維持する。
- **`MenuButton` の description テキスト**（団員 0 / 潜行中 / 通常の 3 分岐）。文言は現状の文字列を温存する（モックには description が一部省略されている）。
- **ヒント文（潜行中 / 団員 0）**は color トーンをモックに合わせて出し分けつつ、**条件と文言**は現状コードの 2 種をそのまま使う。

---

## 実装ステップ

### Step 0. 事前読み込み

`dev-docs/redesign-A.md §1.1〜§1.6` のトークン名・配布構造、`§1.5` レイアウト運用ルール、`dev-docs/redesign-A-title-fix.md` の flex column パターンを頭に入れてから着手する。`src/_obsidian.scss` が既に CSS 変数を `:root` に流していることを前提に、`var(--*)` で参照する。

### Step 1. ヘッダーの構造刷新（`index.tsx`）

現状の `<header className={styles.head}>` 内は

```tsx
<p className={styles.chapterMark}>❦ 拠点</p>
<div className={styles.guildName}>{guild.name}</div>
<dl className={styles.stats}>...</dl>
```

を以下に置き換える（章マークとギルド名を 1 段に組み、右端に視認用のラベル枠 — モック準拠で `章マーク` と `ギルド名` の 2 段、右下に統計 dl）:

```tsx
<header className={styles.head}>
  <div className={styles.headTop}>
    <div className={styles.headTitleBlock}>
      <p className={styles.chapterMark}>❦ 拠点</p>
      <h1 className={styles.guildName}>{guild.name}</h1>
    </div>
  </div>
  <dl className={styles.stats}>
    <div className={styles.statGold}>
      <dt>所持金</dt>
      <dd>◇ {guild.gold.toLocaleString()} G</dd>
    </div>
    {towerState.record.deepestReached > 0 && (
      <div className={styles.statDepth}>
        <dt>最高</dt>
        <dd>{towerState.record.deepestReached}F</dd>
      </div>
    )}
    <div className={hasMembers ? styles.statMembers : styles.statMembersWarn}>
      <dt>団員</dt>
      <dd>{guild.members.length} 人</dd>
    </div>
  </dl>
</header>
```

- 章マークの絵柄・文言（`❦ 拠点`）と `dt` ラベル文言（`所持金` / `最高` / `団員`）はそのまま。ただし `最高到達` → `最高` に短縮（モック準拠 / 横幅節約）。
- ⚙ ボタンは **追加しない**（前述の通り省略）。
- `guild.gold.toLocaleString()` で 3 桁区切りを付ける（既存表示は `{guild.gold} G` だが、`8,420 G` を出したいので `toLocaleString()` を入れる。テストに `8420 G` の完全一致 assert がある場合のみ戻すこと — 念のため `index.test.tsx` を grep する）。

### Step 2. ヒント文（条件カード）

`!hasMembers` のときと `hasMembers && diveState` のときの 2 種類だが、見た目を **別 class で出し分ける**:

```tsx
{!hasMembers && (
  <div className={`${styles.hint} ${styles.hintGold}`}>
    まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。
  </div>
)}
{hasMembers && diveState && (
  <div className={`${styles.hint} ${styles.hintBlue}`}>
    潜行中のため、ダイブ再開と「タイトルへ戻る」以外は利用できません。
  </div>
)}
```

文言・条件は既存と完全一致を維持する（テストで assert されている可能性あり、文字列比較を変えない）。

### Step 3. メニュー（`MenuButton` の縦リスト）

`<main className={styles.menu}>` の中身は**触らない**。`MenuButton` の 6 件を順に並べる構造を維持する（label / description / disabled / sfx の各 props はそのまま）。`.menu` の SCSS で gap・スクロール可否を制御する。

### Step 4. フッター（タイトルへ戻る）

`<footer className={styles.foot}>` の `タイトルへ戻る` ボタンは構造そのまま。ボタンに `vermilion` 系の色を当てるためのスタイルだけ後述の Step 7 で `var(--danger-glow)` ベースに置き換える。

### Step 5. ワープモーダルを bottom-sheet 化

現状の `.warpOverlay` + `.warpPanel`（中央配置）を、モック 2d 準拠の **下から競り上がる bottom-sheet** に置き換える。

```tsx
{warpOpen ? (
  <div
    className={styles.warpOverlay}
    onClick={() => setWarpOpen(false)}
  >
    <div
      className={styles.warpSheet}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-label="ワープ先を選択"
    >
      <div className={styles.warpHandle} aria-hidden />
      <div className={styles.warpHead}>
        <span className={styles.warpTitle}>ワープ先を選択</span>
        <span className={styles.warpCount}>解放: {checkpoints.length} 地点</span>
      </div>
      <div className={styles.warpList}>
        {checkpoints.map((d) => (
          <button
            type="button"
            key={d}
            className={styles.warpItem}
            onClick={() => void handleWarp(d)}
          >
            <span className={styles.warpDepth}>{d}F</span>
            <span className={styles.warpItemLabel}>第 {d} 階へ</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        className={styles.warpClose}
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
```

- ハンドル（`width: 40px; height: 4px;` の灰色バー）はモック準拠の装飾。`aria-hidden` で固定。
- `handleWarp` / `play('cancel')` の呼出しタイミングは既存と同じ。
- 上述「とじる」ボタンの sfx は既存実装で `play('cancel')` を発火しているのでそのまま。

### Step 6. ダイブ封蝋スタンプの背景

`.sealOverlay` のオーバーレイ色を写本系の `rgba(33, 36, 27, 0.25)` から **黒曜系の radial** に変更:

```scss
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
```

`InkSplatter` 自体は黒曜化対応済みコンポーネント（または別 sonnet 担当）の前提で **触らない**。

### Step 7. `style.module.scss` の全面置換

`@use 'variables' as var;` は **削除**。`var(--*)` を直接参照する。
**flex column の運用ルール**を厳守。

主要セレクタ:

- `.layout`:
  ```scss
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
  max-width: 560px;
  margin: 0 auto;
  padding: 16px 18px max(16px, env(safe-area-inset-bottom, 0px));
  overflow: hidden;
  background: var(--bg-page-gradient);
  color: var(--text-base);
  font-family: var(--font-body);
  gap: 12px;
  ```
- `.head`:
  ```scss
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 0;
  padding: 14px 16px 14px;
  border-radius: 5px;
  background: linear-gradient(180deg, #1a1f2b, #13151c);
  border: 1px solid var(--rule-gold);
  ```
- `.chapterMark`:
  ```scss
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.3em;
  color: var(--text-blue);
  margin: 0;
  ```
- `.guildName`:
  ```scss
  margin: 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(17px, 5.2vw, 19px);
  letter-spacing: 0.04em;
  color: var(--text-strong);
  ```
- `.stats`:
  ```scss
  display: flex;
  gap: 16px;
  margin: 0;
  font-family: var(--font-mono);
  font-size: 12px;

  > div { display: flex; gap: 6px; align-items: baseline; }
  dt {
    font-family: var(--font-body);
    font-size: 10px;
    letter-spacing: 0.16em;
    color: var(--text-faint);
  }
  dd { margin: 0; color: var(--text-faint); }
  ```
- `.statGold dd`: `color: var(--gold);` を上書き。
- `.statMembersWarn dd`: `color: var(--danger-text);` を上書き（団員 0 で赤）。
- `.hint`:
  ```scss
  flex-shrink: 0;
  margin: 0;
  padding: 12px 14px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.7;
  ```
  - `.hintGold`: `background: var(--gold-tint); border: 1px solid var(--rule-gold-strong); color: var(--text-strong); animation: obsidian-glowPulse 3.5s ease-in-out infinite;`
  - `.hintBlue`: `background: rgba(111,159,216,.08); border: 1px solid rgba(111,159,216,.3); color: #9cc2ec;` （※ この 2 色は `_obsidian.scss` に未登録なので **追加トークン**を切る — 下記 §追加トークン）。
- `.menu`:
  ```scss
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  touch-action: pan-y;
  ```
- `.foot`:
  ```scss
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  ```
- `.exit`:
  ```scss
  width: 100%;
  height: clamp(44px, 12vw, 50px);
  border-radius: 3px;
  border: 1px solid rgba(212, 103, 79, 0.45);
  background: transparent;
  color: var(--danger-text);
  font-size: 13px;
  letter-spacing: 0.16em;
  font-family: var(--font-body);
  cursor: pointer;
  ```

#### bottom-sheet モーダル

- `.warpOverlay`:
  ```scss
  position: fixed;
  inset: 0;
  background: var(--bg-overlay);
  display: flex;
  align-items: flex-end;       // 下端寄せ（中央寄せではない）
  justify-content: center;
  z-index: 50;
  ```
- `.warpSheet`:
  ```scss
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
  animation: obsidian-sheetRise 220ms cubic-bezier(.2, .8, .2, 1);
  ```
  - `obsidian-sheetRise` は **`_obsidian.scss` への追加トークン**として後述。
- `.warpHandle`:
  ```scss
  width: 40px;
  height: 4px;
  margin: 0 auto;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.18);
  ```
- `.warpHead`:
  ```scss
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  ```
- `.warpTitle`:
  ```scss
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--text-strong);
  ```
- `.warpCount`:
  ```scss
  font-size: 11px;
  color: var(--text-faint);
  ```
- `.warpList`:
  ```scss
  display: flex;
  flex-direction: column;
  gap: 9px;
  max-height: 50dvh;            // 解放数が多くなったときに sheet が画面を埋め尽くさないように
  overflow-y: auto;
  overscroll-behavior: contain;
  ```
- `.warpItem`:
  ```scss
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 15px;
  border-radius: 3px;
  border: 1px solid var(--rule-base);
  background: var(--bg-mid);
  color: var(--text-base);
  font-family: var(--font-body);
  font-size: 13px;
  cursor: pointer;
  text-align: left;
  ```
- `.warpDepth`:
  ```scss
  font-family: var(--font-mono);
  font-size: 17px;
  font-weight: 700;
  color: var(--gold);
  min-width: 44px;
  ```
- `.warpItemLabel`: `flex: 1; color: var(--text-soft);`
- `.warpClose`:
  ```scss
  width: 100%;
  height: 50px;
  border-radius: 3px;
  border: 1px solid var(--rule-base);
  background: transparent;
  color: var(--text-mute);
  font-size: 13px;
  letter-spacing: 0.16em;
  cursor: pointer;
  ```

#### 短画面対応

```scss
@media (max-height: 720px) {
  .layout { gap: 8px; padding-top: 12px; }
  .head { padding: 10px 14px 12px; gap: 6px; }
  .stats { gap: 12px; }
  .menu { gap: 8px; }
}
```

#### モーション抑制

`prefers-reduced-motion: reduce` 時は `_obsidian.scss` 側で `obsidian-glowPulse` などが no-op になる。
`obsidian-sheetRise` を新規追加する場合は同様に 0ms 化する（下記）。

### Step 8. 追加トークン

`src/_obsidian.scss` の `:root { ... }` ブロックに **以下を追加**（既存値は変更しない）:

```scss
// town blue hint card
--info-blue-tint: rgba(111, 159, 216, 0.08);
--info-blue-rule: rgba(111, 159, 216, 0.30);
--info-blue-text: #9cc2ec;
```

これにより town の `.hintBlue` を変数経由で書ける。`.hintBlue` 側は
`background: var(--info-blue-tint); border: 1px solid var(--info-blue-rule); color: var(--info-blue-text);`
にする。

また bottom-sheet 用 keyframes を `_obsidian.scss` 末尾に追加:

```scss
@keyframes obsidian-sheetRise {
  0%   { transform: translateY(20%); opacity: 0; }
  100% { transform: translateY(0);    opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes obsidian-sheetRise { 0%, 100% { transform: none; opacity: 1; } }
}
```

> **注意**: `_obsidian.scss` への追加はトークン追加のみ。既存値の変更は禁止。

### Step 9. Storybook ストーリー追加

`src/pages/town/Town.stories.tsx` を以下に拡張:

```tsx
import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withGameContext } from '@/__stories__/decorators';
import {
  mockEmpty,
  mockMidDive,
  mockPostBoss,
  mockWithParty,
} from '@/__stories__/mockSaves';

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

/** ワープ解放後（チェックポイント複数解放） */
export const PostBoss: Story = {
  decorators: [withGameContext(mockPostBoss, { name: 'town' })],
};
```

既存 `EmptyGuild` / `WithParty` / `MidDive` は **そのまま**。`PostBoss` だけ追記する。

### Step 10. 検証

完了前に以下を回し、すべて緑であることを確認:

```
yarn lint
yarn test --run
yarn tsc -b
```

Storybook を一時起動し、上記 4 ストーリーを目視確認:

- iPhone SE 相当（dvh ≒ 559）で `.menu` 内が縦スクロール可能、ヘッダー / ヒント / フッターが折り重ならない。
- iPhone 16 相当（dvh ≒ 778）でスクロール無しで 6 ボタン + フッターが収まる（収まらなくとも `.menu` のスクロールで吸収できれば可）。
- `WithParty` でワープボタンを押すと bottom-sheet が下から競り上がる（アニメ有 / `prefers-reduced-motion` で抑制）。
- `MidDive` で 5 つの非ダイブメニューが disabled 表示、ヒントが青背景で出る。
- `EmptyGuild` でダイブ disabled、ヒントが金箔背景で出る。
- `PostBoss` でワープ description に `解放済み: 10F・20F` 等が出る。

スクリーンショットは撮らない（ディレクター側で撮影）。

### Step 11. コミット

ブランチは `feature/redesign-A-town` を新規に切る。完了後に 1 コミット作成し commit SHA を報告する。push はしない。

コミットメッセージ:

```
feat(theme): apply 黒曜 OBSIDIAN MINIMAL theme to town screen

- restyle town header with obsidian gradient and gold accents
- swap hint card palette per state (gold for empty, blue for mid-dive)
- convert warp panel to bottom-sheet (rise animation)
- add PostBoss story to cover unlocked warp checkpoints
- introduce --info-blue-* tokens and obsidian-sheetRise keyframe in _obsidian.scss

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## 想定 Q&A

- **MenuButton の見た目が黒曜化されていない**: title フェーズの fix で既に着手中、または別 sonnet が担当中の想定。town 側は **MenuButton 内部スタイルに介入しない**。もし `.menu` に `MenuButton` の色を強制上書きしたいケースがあっても、それは MenuButton 側の責務に倒す（このタスクのスコープ外）。
- **`guild.gold.toLocaleString()` でテストが落ちる**: `index.test.tsx` が `8420 G` で完全一致を取っていたら `toLocaleString` を入れず `{guild.gold} G` のまま残す。先に `grep "gold" src/pages/town/index.test.tsx` で確認すること（テストファイルが無ければ `toLocaleString` を入れる）。
- **`mockPostBoss` の中身が期待と違う**: `src/__stories__/mockSaves.ts` の `mockPostBoss` の `towerState.warp.unlockedCheckpoints` を読み、複数階が入っていることを確認する。空なら `mockSaves.ts` を編集してよいが、**既存 preset の改変はディレクターに相談**（このタスクのスコープを越える）。
- **bottom-sheet の高さが画面を埋め尽くす**: `.warpList` 側に `max-height: 50dvh; overflow-y: auto;` を入れているので問題ない。`.warpSheet` 全体には max-height をかけない（中身がリッチになったら sheet 内で吸収）。
- **`MenuButton` の縦リストでなく 2x2 grid にしたい**: 機能要件で縦リストが指定されているため不可。モックは参考に留める。
- **iPhone SE で全部詰めても入らない**: `.menu` のスクロールで吸収する。`overflow: hidden` で外側を固定したまま、`.menu` 内だけ `overflow-y: auto` にしているのでこれで OK。

不明点が出たら止めて報告すること。実装エージェントが自分で判断していい範囲は色味の細部のみ。構造分岐・文言・ロジックは指示書から外れてはいけない。
