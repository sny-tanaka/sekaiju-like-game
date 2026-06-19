# フェーズ 2：guild-char 画面リデザイン（sonnet 用指示書）

`dev-docs/redesign-A.md`（特に **§1.5 レイアウト運用ルール**）と `dev-docs/redesign-A-title-fix.md`
（flex column 化のパターン）を **必ず先に読む**こと。本ファイルは guild-char 画面
（キャラ詳細 / 育成）の取り込み手順を網羅した実装指示書。

参考にするモック原本: `/tmp/sekaiju-design/案A_v2.dc.html` の line 511〜620
（`4a stats / equip` と `4b skill / growth` の 2 サブ状態）。

参考にする機能仕様: `dev-docs/claude-design-brief.md` **§4.4 guildChar — キャラ詳細 / 育成**。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい

| 区分 | パス | 操作 |
| --- | --- | --- |
| 編集 | `src/pages/guild-char/index.tsx` | マークアップを flex column 構造に再構成（state machine とロジックは温存）。スクロール領域は本文 `<main>` セクションのみ。 |
| 編集 | `src/pages/guild-char/style.module.scss` | 黒曜テーマで全面書き直し（旧 `@use 'variables'` を削除し `var(--*)` を直接参照） |
| 編集 | `src/pages/guild-char/GuildChar.stories.tsx` | 既存 `Default` を温存。**追加で 3 本**（後述 §3）作成可。 |

### 触ってはいけない

- `src/_obsidian.scss`、`src/_variables.scss`。
- 共通コンポーネント本体（`CharacterPortrait` / `ItemSprite` / `SkillTree` / `ResistBadges`）。
  画面側でクラス上書きが要るならローカル wrapper で対応する。
- 他画面 (`title` / `town` / `guild` / `shop` / `forge` / `dungeon` / `battle` / `codex` /
  `not-found`) の `index.tsx`・`style.module.scss`。
- ゲームロジック（`computeBaseStats` / `availableSP` / `learnSkill` / `transferClassInSave` /
  `acquireTitle` / `canAcquireTitle` / `canReincarnate` / `rebirthStatBonusForRace` /
  `reincarnateInSave` / `equipItem` / `unequipItem` / `canEquip` / `equipDisplayName`）。
- 既存テスト（あれば）の assert 文。

---

## 2. やってはいけないこと

- 自分でさらに `Agent` / `Task` を spawn しない（孫委譲禁止）。
- 写本テーマ由来の SCSS 変数 (`$parchment` 等) を新規参照しない。
- ヘッダー直下のキャラ識別エリア（ポートレート + 名前 + 種族/職業/Lv）を **絶対配置で固定
  しない**。`.layout` の最上段に flex item として置く。
- ステータスグリッドを「絶対配置で 4 列に並べる」のではなく、**`display: grid; grid-template-columns:
  repeat(4, 1fr); gap: 8px;` で組む**。
- `SkillTree` 共通コンポーネントの内部スタイルに依存した上書きをしない（CSS Modules の
  hashing で当たらない）。SkillTree の外周だけ装飾できる構造にする（`<section>` でラップ）。
- 「転職」「称号」「転生」を絶対配置で画面下端の 3 カラム固定にしない（モック `4b` では
  最下段に 3 列ボタンが描かれているが、これは **flex item として `.body` の最後に積む**）。
- `Object.entries(char.rebirthBonus.stats).filter(...)` 等のロジックを書き換えない。
  マークアップを変えるだけ。

---

## 3. ゴール

Storybook で `Pages/GuildChar` の以下 4 ストーリーが、添付モック「案 A 黒曜 OBSIDIAN MINIMAL」と
同じビジュアル方向性で描画される。

既存（残す）:

1. `Default` — `mockWithParty` の先頭メンバー。ステ + 装備 + スキルツリー（職業タブ）+ 育成
   セクションがすべて見える。スクロール可。

新規（追加）:

2. `WithTitleSkillTab` — `mockPostBoss` 等で称号が解放されたメンバーを表示し、スキルツリーが
   `title` タブ。preset が無ければ `mockSaves.ts` に `mockGuildCharWithTitle` を追加してよい
   （ただし `mockPostBoss` の既存 preset は変更禁止）。条件: 該当メンバーの `titleId` がセット
   されている。
3. `ReincarnateOpen` — `Default` の preset を流用しつつ、play function で「転生する…」ボタンを
   クリックして転生フォームを開いた状態。`canReincarnate(char)` が true になる必要があるため、
   preset または play function 内の準備として **Lv100 のメンバー**が登場する preset を追加
   （`mockGuildCharRebirthReady`）。
4. `EquipPick` — `Default` の preset で、武器スロットに装備可能な候補が複数表示されている
   状態（現行コードは展開済み表示なのでスクロールで確認できれば OK。専用 play function は
   不要）。

`yarn test --run`・`yarn lint`・`yarn tsc -b` が緑であること。

### 機能優先で省略した要素（モックにあるが現状の機能にないため省略）

- モック `4a` の **`EXP 72%` 表示**: 本実装の `Character` 型に EXP 進捗を直接持つ表現が無い
  （次レベルまでの経験値は `expToNext(Lv)` で算出可能だが、現在 EXP は外部から渡されない）。
  → **EXP 表示は省略**。代わりにヘッダー右側は「Lv34 ・前衛」程度のラベルを軽く表示する。
- モック `4a` の **「スキル・育成へ →」遷移ボタン**: 本実装は同一画面で全部完結する 1 ページ
  構造。**ボタン省略**。スクロールで「スキル」「育成」セクションに移動する形を維持。
- モック `4b` の **スキルツリー SVG（手描きの線で前提を結ぶ表現）**: 共通コンポーネント
  `SkillTree` に既存実装がある。**外周だけ黒曜化**するに留め、内部の線描画ロジックは触らない。
  共通コンポーネント側の黒曜対応は別タスク。
- モック `4b` の **「●習得 / □選択可 / □未開放」凡例**: `SkillTree` の内部表示と重複するため
  省略。
- モック `4b` の **下段「転職 / 称号 / 転生」3 ボタンの固定下端配置**: §1.5 により絶対配置
  固定は禁止。同等のボタン 3 つを **本文末尾に flex item として**配置する。3 列横並びは
  許容（`display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;`）。

### 機能優先で追加した要素（モックにはないが機能上必要）

- **「もどる」フッタ**: モックでは省略されているが、guildChar → guild の遷移が機能上必須。
  最下段に `.foot` の `<button class={styles.back}>もどる</button>` を維持。
- **転生フォームの中身**（種族選択 / 職業選択 / 改名入力 / プレビュー）: 機能上は既存実装
  どおり全部出す。モックでは「転生」ボタンの 1 枚しか描かれていない。
- **称号 2 択ボタン**: モックでは「解放済 2 択」のラベルしか描かれていない。実 UI では 2 つの
  選択肢を `<button>` として並べる（既存どおり）。
- **アンロック条件メッセージ**: 「第 20 階到達で習得できます」「Lv100 以上で転生できます」等の
  ガード文言は機能要件に従って残す。

---

## 4. 実装ステップ

### Step 0. 事前読み込み

`dev-docs/redesign-A.md` の §1.1〜§1.6（特に §1.5）、`dev-docs/redesign-A-title-fix.md` の
flex column パターン、`src/_obsidian.scss` の CSS 変数 / `@keyframes` を確認。

### Step 1. `index.tsx` のマークアップ刷新

ロジックは温存。マークアップだけ刷新。ルートは title フェーズ準拠の flex column。

```tsx
return (
  <div className={styles.layout}>
    <header className={styles.head}>
      <CharacterPortrait raceId={char.raceId} classId={char.classId} size={56}
        className={styles.headPortrait} />
      <div className={styles.headText}>
        <h1 className={styles.title}>{char.name}</h1>
        <span className={styles.sub}>
          {RACES[char.raceId]?.name} ・ {CLASSES[char.classId]?.name} ・ Lv{char.level}
        </span>
        <span className={styles.posTag}>{positionLabel}</span>
      </div>
    </header>

    <main className={styles.body}>
      {/* ===== ステータス ===== */}
      <section className={styles.section}>
        <h2 className={styles.h2}>能力値</h2>
        <dl className={styles.stats}>{...}</dl>
      </section>

      {/* ===== 種族耐性（省略可分岐は既存どおり） ===== */}
      <section className={styles.section}>...</section>

      {/* ===== 装備 ===== */}
      <section className={styles.section}>
        <h2 className={styles.h2}>装備</h2>
        {SLOTS.map(slot => (
          <div key={slot} className={styles.equipSlot}>...</div>
        ))}
      </section>

      {/* ===== スキル ===== */}
      <section className={styles.section}>
        <h2 className={styles.h2}>
          スキル <span className={styles.sp}>SP {sp}</span>
        </h2>
        <div className={styles.skillTabs}>...</div>
        <div className={styles.skillTreeFrame}>
          <SkillTree ... />
        </div>
      </section>

      {/* ===== 育成 ===== */}
      <section className={styles.section}>
        <h2 className={styles.h2}>転職</h2>
        ...
        <h2 className={styles.h2}>称号</h2>
        ...
        <h2 className={styles.h2}>転生</h2>
        ...
      </section>
    </main>

    <footer className={styles.foot}>
      <button className={styles.back} onClick={() => navigate({ name: 'guild' })}>
        もどる
      </button>
    </footer>
  </div>
);
```

ポイント:

- `.body` を `flex: 1 1 auto; min-height: 0; overflow-y: auto;` にして本文だけスクロール可。
- `.head`・`.foot` は `flex-shrink: 0;`。
- `positionLabel` は `positionOf(save, id)` 相当のローカル算出（既存 guild/index.tsx と同じ
  ロジックを `guild-char/index.tsx` でも使ってよい）。ロジック追加が嫌ならヘッダー右側の
  位置タグは省略してよい。

### Step 2. SCSS のレイアウト指針

#### 2.1 ルート

```scss
.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
  max-width: 560px;
  margin: 0 auto;
  padding: 0 0 max(14px, env(safe-area-inset-bottom, 0px));
  overflow: hidden;
  background: var(--bg-page-gradient);
  color: var(--text-base);
  font-family: var(--font-body);
}
```

#### 2.2 ヘッダー（黒曜帯）

```scss
.head {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  background: linear-gradient(180deg, #1a1f2b, #13151c);
  border-bottom: 1px solid var(--rule-gold);
  flex-shrink: 0;
}
.headPortrait {
  width: 64px;
  height: 64px;
  border-radius: 4px;
  background: var(--bg-deep);
  border: 1px solid var(--rule-gold);
  overflow: hidden;
  flex: none;
}
.headText {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}
.title {
  font-family: var(--font-display);
  font-size: 20px;
  color: var(--text-strong);
  margin: 0;
}
.sub {
  font-size: 11px;
  color: var(--text-faint);
}
.posTag {
  display: inline-block;
  margin-top: 4px;
  font-size: 10px;
  color: var(--gold);
  border: 1px solid var(--rule-gold);
  border-radius: 2px;
  padding: 1px 7px;
  width: max-content;
}
```

#### 2.3 本文（スクロール領域）

```scss
.body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 16px 20px 12px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.h2 {
  font-size: 11px;
  letter-spacing: 0.16em;
  color: var(--gold);
  font-weight: 700;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.sp {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--gold);
  background: var(--gold-tint);
  border: 1px solid var(--rule-gold);
  border-radius: 3px;
  padding: 3px 10px;
}
```

#### 2.4 ステータスグリッド

```scss
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin: 0;
  > div {
    background: var(--surface-panel);
    border: 1px solid var(--rule-soft);
    border-radius: 3px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  dt {
    font-size: 9px;
    color: var(--text-faint);
    margin: 0;
  }
  dd {
    font-family: var(--font-mono);
    font-size: 15px;
    color: var(--text-strong);
    margin: 0;
  }
}
```

`HP` / `TP` だけは色付きに（モック準拠）: `dd[data-key="hp"] { color: #9ed8b4; }` のような
分岐を SCSS で書くか、 `index.tsx` 側で `dt` の `data-key` 属性を付けて分岐。`STAT_ROWS` の
`key` を `data-key` に流せばよい。

#### 2.5 装備セクション

```scss
.equipSlot {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.equipHead {
  display: flex;
  align-items: center;
  gap: 11px;
  background: var(--surface-panel);
  border: 1px solid var(--rule-soft);
  border-radius: 3px;
  padding: 9px 11px;
}
.slotLabel {
  font-size: 9px;
  color: var(--text-faint);
  width: 30px;
}
.equipName {
  flex: 1;
  font-size: 13px;
  color: var(--text-strong);
}
.smallBtn {
  font-size: 10px;
  color: var(--text-mute);
  border: 1px solid var(--rule-base);
  border-radius: 2px;
  padding: 4px 9px;
  background: transparent;
}
.equipPick {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 10px;
  background: var(--bg-deep);
  border: 1px solid var(--rule-soft);
  border-radius: 3px;
}
.pickBtn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--rule-soft);
  color: var(--text-strong);
  font-size: 12px;
  text-align: left;
  padding: 6px 0;
  cursor: pointer;
  &:last-child { border-bottom: none; }
}
```

装備済みスロットは `.equipHead.equipHeadFilled { border-color: var(--rule-gold); background:
linear-gradient(180deg, var(--surface-card)); }` のようにモディファイア付与（index.tsx 側で
`equipped` 有無で条件付与）。

#### 2.6 スキルセクション

`SkillTree` の外周だけ装飾。共通コンポーネント本体は触らない。

```scss
.skillTabs {
  display: flex;
  gap: 5px;
}
.skillTab {
  font-size: 11px;
  padding: 5px 14px;
  border-radius: 2px;
  border: 1px solid var(--rule-base);
  color: var(--text-mute);
  background: transparent;
}
.skillTabOn {
  background: var(--gold);
  color: var(--bg-mid);
  font-weight: 700;
  border-color: var(--gold);
}
.skillTreeFrame {
  background: #0a0b0e;
  border: 1px solid var(--rule-soft);
  border-radius: 4px;
  padding: 10px;
  overflow: hidden;
  // SkillTree 内部の余白 / 色は共通コンポーネント側に依存する想定。今は触らない。
}
```

#### 2.7 育成セクション（転職 / 称号 / 転生）

```scss
.jobRow {
  display: flex;
  gap: 8px;
  align-items: stretch;
}
.select {
  flex: 1;
  height: 40px;
  border: 1px solid var(--rule-base);
  border-radius: 3px;
  background: var(--surface-elev);
  color: var(--text-strong);
  padding: 0 10px;
}
.actBtn {
  height: 40px;
  padding: 0 16px;
  border-radius: 3px;
  background: var(--surface-card);
  border: 1px solid var(--rule-gold);
  color: var(--gold);
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}
.warn {
  font-size: 11px;
  color: var(--text-mute);
  background: var(--surface-elev);
  border-left: 2px solid var(--rule-gold);
  padding: 8px 10px;
  border-radius: 0 3px 3px 0;
  line-height: 1.6;
}
.warnCaption { @extend .warn; color: var(--text-faint); }
.titleHave {
  font-size: 13px;
  color: var(--gold);
  background: var(--gold-tint);
  border: 1px solid var(--rule-gold);
  border-radius: 3px;
  padding: 10px 12px;
}
.titleOpts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.titleBtn {
  height: 46px;
  border-radius: 3px;
  border: 1px solid var(--rule-gold);
  background: var(--gold-tint);
  color: var(--gold);
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  &:disabled { opacity: 0.45; cursor: not-allowed; }
}
.rbForm {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  background: var(--surface-panel);
  border: 1px solid rgba(212, 103, 79, 0.35);
  border-radius: 4px;
}
.input {
  height: 40px;
  border: 1px solid var(--rule-base);
  border-radius: 3px;
  background: var(--surface-elev);
  color: var(--text-strong);
  padding: 0 10px;
  font-size: 14px;
}
.danger {
  flex: 1;
  height: 46px;
  border-radius: 3px;
  background: var(--danger);
  color: #fbeae6;
  font-weight: 700;
  font-size: 14px;
  border: none;
}
```

#### 2.8 フッタ

```scss
.foot {
  flex-shrink: 0;
  padding: 8px 20px 0;
}
.back {
  width: 100%;
  height: clamp(44px, 12vw, 46px);
  border-radius: 3px;
  border: 1px solid var(--rule-base);
  background: transparent;
  color: var(--text-mute);
  font-size: 13px;
  letter-spacing: 0.16em;
}
```

### Step 3. ストーリー追加

新規 3 本を追加する。`mockSaves.ts` に必要 preset を追加してよい:

- `mockGuildCharWithTitle`: `mockPostBoss` ベースで先頭メンバーに `titleId` をセット。
- `mockGuildCharRebirthReady`: `mockWithParty` ベースで先頭メンバーを `level: 100` に。

```tsx
export const WithTitleSkillTab: Story = {
  decorators: [withGameContext(mockGuildCharWithTitle, { name: 'guildChar', id: firstId })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: /称号/ }));
  },
};

export const ReincarnateOpen: Story = {
  decorators: [withGameContext(mockGuildCharRebirthReady, { name: 'guildChar', id: firstId })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: '転生する…' }));
  },
};

export const EquipPick: Story = {
  decorators: [withGameContext(mockWithParty, { name: 'guildChar', id: firstId })],
};
```

### Step 4. 検証

```
yarn lint
yarn test --run
yarn tsc -b
```

すべて緑であることを確認。Storybook で `Pages/GuildChar/*` を目視確認。短い画面（iPhone SE
375×667）で本文セクションが正しくスクロールし、ヘッダー / フッタが重ならないことを確認。

### Step 5. コミット

ブランチは `feature/redesign-A`。コミットメッセージ:

```
feat(guild-char): apply 黒曜 OBSIDIAN MINIMAL theme to guild-char page

- rebuild guild-char layout in flex column with scrollable body
- restyle stats grid / equip slots / skill tabs / growth section
- add WithTitleSkillTab / ReincarnateOpen / EquipPick stories

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

push しない。commit SHA を報告。

---

## 5. 想定 Q&A

- **Q. SkillTree の見た目が黒曜化されていない**
  A. 共通コンポーネント側で別途対応する。本指示書では外周（`.skillTreeFrame` の枠 / 背景）
  だけ整える。中身の色味が浮いて見えるのは想定内（共通基盤フェーズで吸収する）。

- **Q. `EXP` の進捗バー / 数値を出したい**
  A. 機能仕様にないので省略。`Character` 型を拡張する必要がある（`xp: number` 等）が、本書の
  スコープ外。

- **Q. 本文がスクロールしないとフッタの「もどる」が見えない**
  A. それで OK。`.body` を内部スクロールさせる構造（フッタは下に固定）。ユーザーは普通に
  本文を縦スクロールして装備や転生に到達する。

- **Q. 種族耐性が無い種族のとき、`.section` を出さずに無くしてよい？**
  A. 既存ロジック準拠で **常に section を出す**。ない場合は `.warnCaption` で「この種族は
  特別な耐性を持ちません。」と表示。

- **Q. 称号 / 転生のロジックがエラーになる**
  A. ロジックは既存どおりに保つ。`canReincarnate(char)` / `canAcquireTitle(...)` 等の関数
  シグネチャは変えない。マークアップ替えで `disabled` 条件がブレないように注意。

- **Q. テストが落ちる**
  A. `index.test.tsx` がそもそも無い可能性が高い（guild-char は test 未整備のはず）。あれば
  最小修正で通す（ロール / 文言の追従のみ）。

不明点が出たら止めて報告。

---

## 6. 追加トークン（必要なら）

新規 CSS 変数の追加は不要。`_obsidian.scss` 既出のもので足りる想定。万一追加したい場合は
ディレクターに報告してから対応。
