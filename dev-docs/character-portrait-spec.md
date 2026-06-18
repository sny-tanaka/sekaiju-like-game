# キャラ立ち絵の UI 配置 設計書

## 概要

`src/assets/characters/race_<race>_class_<class>.png`（54 枚、各 60–80px・透過済み）を
UI の 9 箇所に表示する。各画面のサイズ感は「既存 UI に馴染ませる」方針で控えめにする
（元画像が小さなドット絵のため、過度に拡大しない）。

## 共通コンポーネント

`src/components/common/CharacterPortrait/CharacterPortrait.tsx` を新規作成する。

### import の方法

Vite の `import.meta.glob` を使い 54 ファイルを一括 import する:

```ts
const PORTRAITS = import.meta.glob('/src/assets/characters/race_*_class_*.png', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;
```

返り値は `{ '/src/assets/characters/race_human_class_warrior.png': 'hashed-url', ... }`。
ルックアップ用ヘルパで `raceId/classId` → URL を返す。該当無しは null。

### Props

```ts
interface Props {
  raceId: RaceId;
  classId: ClassId;
  /** 表示幅 (px)。高さは画像比に従う。 */
  size?: number;
  /** alt 文言。省略時は raceId/classId から自動生成。 */
  alt?: string;
  /** 既存 UI に馴染ませるための追加クラス。 */
  className?: string;
}
```

### 実装

- `<img>` 1 個。`width={size}` のみ指定（height は CSS で auto）。
- ドット絵を美しく拡大するため `style={{ imageRendering: 'pixelated' }}` を強制。
- 透過 PNG なので背景は親要素に任せる。
- 画像が見つからない場合は `null` を返す（UI 側でラベルが落ちないように、配置側はオプショナル前提で組む）。

### スタイル (`style.module.scss`)

```scss
.portrait {
  display: inline-block;
  image-rendering: pixelated;
  image-rendering: crisp-edges;  /* Firefox */
  vertical-align: middle;
  flex-shrink: 0;
}
```

### Storybook

`CharacterPortrait.stories.tsx` を新規作成し、6×9 のマトリクスでサンプル表示。

---

## 配置 9 箇所の詳細

### 1. 戦闘画面のキャラカード（最優先）

- ファイル: [src/pages/battle/index.tsx](src/pages/battle/index.tsx) の `renderCard` 関数（825 行付近）
- 位置: `cardName` ブロックの直上、または `cardName` の左横に並べる
- サイズ: 幅 **48px**（カードの幅 ~100-120px に対して 1/2 強の存在感）
- 配置: 横並びレイアウト — 左に portrait、右に名前と各種バー

修正例:
```tsx
<div className={styles.cardHeader}>
  <CharacterPortrait raceId={char.raceId} classId={char.classId} size={48} className={styles.cardPortrait} />
  <div className={styles.cardHeaderText}>
    <div className={styles.cardName}>{a.name}...</div>
    <div className={styles.cardJob}>{classNameOf(a)} ...</div>
  </div>
</div>
```

`char` は `save.guild.members.find((m) => m.id === a.id)`。召喚体（isSummon=true）には表示しない。

style 追加:
```scss
.cardHeader { display: flex; gap: 6px; align-items: center; }
.cardHeaderText { flex: 1; min-width: 0; }
.cardPortrait { width: 48px; height: auto; }
```

---

### 2. キャラ詳細画面

- ファイル: [src/pages/guild-char/index.tsx](src/pages/guild-char/index.tsx) の `<header>` 内（82 行付近）
- 位置: `<h1>{char.name}</h1>` の左横に portrait を並べる
- サイズ: 幅 **80px**（既存タイトル+サブの高さに合わせる）

修正例:
```tsx
<header className={styles.head}>
  <CharacterPortrait raceId={char.raceId} classId={char.classId} size={80} className={styles.headPortrait} />
  <div className={styles.headText}>
    <h1 className={styles.title}>{char.name}</h1>
    <span className={styles.sub}>{RACES[char.raceId]?.name} / {CLASSES[char.classId]?.name} / Lv{char.level}</span>
  </div>
</header>
```

style 追加:
```scss
.head { display: flex; gap: 12px; align-items: center; }
.headText { display: flex; flex-direction: column; }
```

---

### 3. 団員一覧（ロスタータブ）

- ファイル: [src/pages/guild/index.tsx](src/pages/guild/index.tsx) の `rosterMembers.map` ブロック（272 行付近）
- 位置: `memberMain` の中で、`memberName/memberSub` の左横に小サイズ portrait
- サイズ: 幅 **44px**

修正例:
```tsx
<button className={styles.memberMain} onClick={...}>
  <CharacterPortrait raceId={m.raceId} classId={m.classId} size={44} className={styles.memberPortrait} />
  <div className={styles.memberMainText}>
    <span className={styles.memberName}>{m.name} <span ...>{pos}</span></span>
    <span className={styles.memberSub}>{memberLine(m)} ›</span>
  </div>
</button>
```

style 追加:
```scss
.memberMain { display: flex; gap: 8px; align-items: center; }
.memberMainText { display: flex; flex-direction: column; min-width: 0; flex: 1; }
```

---

### 4. パーティ編成スロット

- ファイル: [src/pages/guild/index.tsx](src/pages/guild/index.tsx) の編成スロット（front/back、314-365 行）
- 位置: スロットの左横（埋まっているスロットのみ portrait 表示）
- サイズ: 幅 **48px**

修正例:
```tsx
{m ? (
  <>
    <CharacterPortrait raceId={m.raceId} classId={m.classId} size={48} className={styles.slotPortrait} />
    <div className={styles.slotText}>
      <span className={styles.slotName}>{m.name}</span>
      <span className={styles.slotSub}>{memberLine(m)}</span>
    </div>
  </>
) : (
  <span className={styles.slotPlaceholder}>...</span>
)}
```

style 追加:
```scss
.slot { display: flex; gap: 8px; align-items: center; }
.slotText { display: flex; flex-direction: column; flex: 1; min-width: 0; }
```

---

### 5. キャラ作成プレビュー

- ファイル: [src/pages/guild/index.tsx](src/pages/guild/index.tsx) `<ClassInfoCard classId={classId} />` の直下に配置（198 行付近）
- 位置: ClassInfoCard の直後に小カード形式で「プレビュー」を出す
- サイズ: 幅 **80px**

修正例（ClassInfoCard 後ろ）:
```tsx
<ClassInfoCard classId={classId} />
<div className={styles.preview}>
  <span className={styles.previewLabel}>プレビュー</span>
  <CharacterPortrait raceId={raceId} classId={classId} size={80} />
  <span className={styles.previewName}>
    {RACES[raceId]?.name} / {CLASSES[classId]?.name}
  </span>
</div>
```

style 追加:
```scss
.preview {
  display: flex; align-items: center; gap: 12px;
  padding: 8px 12px;
  background: rgba(255,255,255,0.5);
  border-radius: 8px;
  margin-bottom: 12px;
}
.previewLabel { font-size: 12px; color: #666; }
.previewName { font-size: 14px; font-weight: bold; }
```

---

### 6. ダンジョンメニューのパーティ一覧

- ファイル: [src/pages/dungeon/index.tsx](src/pages/dungeon/index.tsx) の `dive.party.map` (553 行付近)
- 位置: `menuMember` の左に小 portrait
- サイズ: 幅 **40px**

style 追加: 既存の `.menuMember` を `display: flex` に変更（既にそうかもしれない、確認すること）。

---

### 7. ダンジョンの「どうぐを誰に使う？」

- ファイル: [src/pages/dungeon/index.tsx](src/pages/dungeon/index.tsx) の `itemTarget` ボタン（407 行付近）
- サイズ: 幅 **36px**
- 位置: `itemTarget` ボタンの左に portrait、右にキャラ名と HP

---

### 8. 戦闘の作戦変更UI

- ファイル: [src/pages/battle/index.tsx](src/pages/battle/index.tsx) の strategy mode（1411-1444 行）
- 位置: `strategyAllyName` の左に小 portrait
- サイズ: 幅 **36px**

修正例:
```tsx
<div className={styles.strategyRow}>
  <div className={styles.strategyAllyHead}>
    <CharacterPortrait raceId={ch.raceId} classId={ch.classId} size={36} />
    <div className={styles.strategyAllyName}>{a.name}</div>
  </div>
  <div className={styles.strategyButtons}>...</div>
</div>
```

style 追加:
```scss
.strategyAllyHead { display: flex; align-items: center; gap: 6px; }
```

---

### 9. 追放画面の団員一覧

- ファイル: [src/pages/guild/index.tsx](src/pages/guild/index.tsx) の banish タブ（379 行付近）
- 位置: 3 と同じスタイル（同じ `.member` を使用）。`memberMain` を `<div>` に置き換えているが portrait は追加。
- サイズ: 幅 **44px**（3 と統一）

---

## 注意

- いずれの配置でも、既存のレイアウトを大きく破壊しないこと。`flex` 化が必要な場合のみ親要素を変更。
- 画像が無いキャラ（理論上は無いが migration 直後など）でも null フォールバックで安全に動くこと。
- 召喚体（`isSummon=true`）には raceId/classId が無いので portrait を出さない。
- スマホ表示が前提なので、横並び化したときは `min-width: 0` でテキスト側を縮められるようにする。

## 検証

1. `yarn test` — 既存テストが緑。
2. `yarn lint` — エラーなし。
3. `yarn build` — 成功。
4. ディレクター側でスクリーンショット撮影してユーザーに確認を仰ぐ。

## サブエージェントへの作業指示

実装範囲:
1. `src/components/common/CharacterPortrait/CharacterPortrait.tsx`（新規）
2. `src/components/common/CharacterPortrait/style.module.scss`（新規）
3. `src/components/common/CharacterPortrait/CharacterPortrait.stories.tsx`（新規・Storybook 一覧）
4. `src/pages/battle/index.tsx`（戦闘カード / 作戦変更 UI に portrait 追加）
5. `src/pages/battle/style.module.scss`（必要な flex 系スタイル追加）
6. `src/pages/guild/index.tsx`（団員一覧 / 編成 / 作成プレビュー / 追放 に portrait 追加）
7. `src/pages/guild/style.module.scss`（必要な flex 系スタイル追加）
8. `src/pages/guild-char/index.tsx`（キャラ詳細ヘッダに portrait 追加）
9. `src/pages/guild-char/style.module.scss`
10. `src/pages/dungeon/index.tsx`（メニュー / アイテム使用先 に portrait 追加）
11. `src/pages/dungeon/style.module.scss`

触ってはいけないファイル: 上記以外。
