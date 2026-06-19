# フェーズ 2: dungeon 画面リデザイン（sonnet 用指示書）

`dev-docs/redesign-A.md`（**§1.1〜§1.4 トークン** / **§1.5 レイアウト運用ルール**）と
`dev-docs/redesign-A-title.md` / `dev-docs/redesign-A-title-fix.md` を **必ず先に読むこと**。
本ファイルは dungeon 画面（一人称ビュー + オートマップ + メニュー / 道具 / 調理 / 確認）
のリデザインに閉じた実装手順。

> dungeon は本ゲームの探索コア画面で、機能がとくに密。
> **「上半身に一人称ビュー帯（D-pad オーバーレイ内蔵）→ エンカウント予兆 → 下半身に
> 大きめオートマップ → 文脈アクション → メニュー / 道具モーダル」** という縦割り構成は
> モック準拠で既存実装も同じ流れ。**マークアップ構造はそのまま、ローカル SCSS と
> 一部マークアップの装飾を黒曜トークンで描き直す**。

---

## 触ってよいファイル

| 区分 | パス | 操作 |
| --- | --- | --- |
| 編集 | `src/pages/dungeon/index.tsx` | マークアップの細部（章マーク追加、ヘッダ構造の組み直し、`gauge` の文言、フッタアクションのグルーピング）。**ロジック・hook・モーダル制御の `useState` は触らない** |
| 編集 | `src/pages/dungeon/style.module.scss` | 黒曜テーマで全面再構築（`@use 'variables'` を外し `var(--*)` に切替） |
| 編集 | `src/pages/dungeon/Dungeon.stories.tsx` | 既存 `Default` を維持。必要なら `Menu` / `ItemUse` / `Cook` のストーリーを追加（play で各モーダルを開く） |

> **共通コンポーネントは触らない**。共通基盤フェーズで黒曜化済み:
> - `src/components/common/FirstPersonView/`（疑似 3D 台形描画）
> - `src/components/common/DungeonMap/`（Canvas オートマップ）
> - `src/components/common/EncounterGauge/`（5 段階ゲージ）
> - `src/components/common/CharacterPortrait/` / `ItemSprite/` / `SkillTree/`
>
> dungeon 画面側からはこれらを **props だけ渡す通常利用**。
> 内部の配色・モーション・SVG 構造には触らない。
>
> **`src/domain/dive.ts` / `gather.ts` / `cooking.ts` / `movement.ts` / `itemUse.ts` /
> `encounter.ts` / `skillTree.ts` のロジックは触らない**。

## やってはいけないこと

- 自分でさらに `Agent` / `Task` を spawn しない。
- `src/_variables.scss` / `src/_obsidian.scss` を変更しない。
- 他画面の `style.module.scss` / `index.tsx` を変更しない。
- ゲームロジックを変えない（`moveStep` / `gatherHere` / `cook` / `applyFieldItem` / `pathTo` 等）。
- 文言・aria-label・テストの assert 文を変えない。
- 写本テーマ由来の SCSS 変数 (`$parchment` 等) を新規参照しない。
- `useState` / `useRef` / `useCallback` の構成・依存配列を変えない（既存挙動を温存）。

## ゴール

Storybook の `Pages/Dungeon` 配下で以下が黒曜カラーで描画され、`yarn lint` /
`yarn test --run` / `yarn tsc -b`（または `yarn build`）が緑。

1. `Default`（mockMidDive・F2 探索中）— 一人称ビュー帯 + D-pad + 振り向きボタン +
   エンカウント予兆ゲージ + オートマップ + マップヒント + フッタアクション
2. `Menu`（任意・追加可）— ☰ メニューを開いた状態（パーティ一覧 + どうぐ / 帰還の糸など）
3. `ItemUse`（任意・追加可）— 道具メニューを開いた状態（対象選択 UI まで）

---

## レイアウト運用ルール（**§1.5 を厳守**）

`redesign-A.md §1.5` の 8 項目を必ず守る:

1. ルートは `display: flex; flex-direction: column; height: 100dvh; max-width: 560px; margin: 0 auto; overflow: hidden;` +
   `padding-bottom: max(20px, env(safe-area-inset-bottom, 0px))`。
2. 縦に `header → fpvWrap → encounterRow → mid（map + ヒント）→ actionRow（階段 / 採集 / 調理 / 通知）→ footer` の流れ。
3. **可変領域は `.mid` ひとつ**（`flex: 1 1 auto; min-height: 0; overflow-y: auto;`）。
   それ以外の section は `flex-shrink: 0` で高さ固定。
4. ページ全体スクロール禁止。
5. 装飾要素（背景グラデ・モーダル backdrop）以外は絶対配置しない。
   ただし「**FPV 上に重ねる D-pad / 振り向き / ☰**」は装飾ではなく機能だが、
   FPV 内部のレイヤーとして `position: absolute` で重ねる **例外を認める**（モック準拠）。
   親 `.fpvWrap` を `position: relative` にする。これは title-fix で言う「装飾レイヤー」
   と同じ扱い: **コンテンツ全体の積み上げ順に絶対値で介入しない** ことが本旨。
6. ボタン群は flex item として下から積む。`bottom: NN px` を直書きしない。
7. clamp で短画面（iPhone SE）対応。FPV の `aspect-ratio` か `height: clamp(...)` で
   面積を制御し、`.mid` のマップが必ず可視に残るようにする。
8. iPhone 16 / iPhone SE / iPad mini 幅で要素が重ならないことを確認。

> モックでは FPV 帯の高さが 232px 固定。ここは `height: clamp(180px, 28dvh, 240px)` で
> 短画面でも縮むようにする。

---

## 実装ステップ

### Step 0. 旧 `@use 'variables'` を外す

`src/pages/dungeon/style.module.scss` の冒頭 `@use 'variables' as var;` を **削除**。
すべての色を `var(--*)` で書き直す。

### Step 1. ルートレイアウト (`.layout`)

```scss
.layout {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  max-width: 560px;
  margin: 0 auto;
  padding: 0 0 max(12px, env(safe-area-inset-bottom, 0px));
  overflow: hidden;
  background: var(--bg-deep);
  color: var(--text-base);
  font-family: var(--font-body);
}
```

> モック準拠で **左右 padding は 0**（FPV 帯と背景 deep が画面端まで届く）。
> マップ・アクション領域だけ内部で `padding: 0 14px;` を取る。

### Step 2. ヘッダー (`.head`) と FPV (`.fpvWrap`) の組み替え

モック (line 822〜841) では、FPV 帯の **内部**に深度ラベル（左上）/ ☰メニュー（右上）/
D-pad（下中央）/ 振り向き は別途配置している。本実装では:

- 章マーク `❦ 探索` + 深度 + 帯テーマ名を FPV 帯左上に絶対配置でオーバーレイ
- ☰ メニューを FPV 帯右上に絶対配置でオーバーレイ
- D-pad は既存 `.fpvControls`、振り向きは `.fpvBack` を維持
- `EncounterGauge` は FPV 帯の **直下** に separate row として置く

```tsx
<header className={styles.head} aria-label="探索ヘッダー">
  <div className={styles.fpvWrap}>
    <FirstPersonView ... />

    {/* 左上: 深度＋帯テーマ */}
    <div className={styles.depthWrap}>
      <span className={styles.depthChapterMark}>❦ 探索</span>
      <div className={styles.depth}>
        F{dive.depth}
        <span className={styles.theme}>{bandThemeFor(dive.depth).name}</span>
      </div>
    </div>

    {/* 右上: ☰ メニュー */}
    <button
      type="button"
      className={styles.menuBtn}
      aria-label="メニュー"
      onClick={() => { play('cursor'); setMenuCharId(null); setMenuOpen(true); }}
    >
      ☰
    </button>

    {/* 下中央: D-pad */}
    <div className={styles.fpvControls}>...</div>

    {/* 振り向き */}
    <button className={styles.fpvBack} aria-label="振り向く" onClick={...}>↻</button>
  </div>
</header>

<div className={styles.gaugeRow}>
  <span className={styles.gaugeLabel}>エンカウント予兆</span>
  <EncounterGauge level={gaugeLevel(dive.encounter.stepsUntilEncounter)} />
</div>
```

SCSS:

- `.head`: `position: relative; flex-shrink: 0;`
- `.fpvWrap`: `position: relative; width: 100%; height: clamp(180px, 28dvh, 232px); background: linear-gradient(180deg, #0d141a, #070b0f); overflow: hidden;`
  - 内側の `FirstPersonView` 自体は `width: 100%; height: 100%; display: block;` で
    親に追従する想定。既存 FPV が固定 px なら、`.fpvWrap > :first-child { width: 100%; height: 100%; }` で吸収する（共通コンポーネントは触らない方針なので、外側のラッパで対応）。
- `.depthWrap`: `position: absolute; top: 12px; left: 14px; display: flex; flex-direction: column; gap: 0; pointer-events: none;`
- `.depthChapterMark`: `font-family: var(--font-display); font-size: 10px; letter-spacing: .3em; color: var(--text-blue);`
- `.depth`: `font-family: var(--font-display); font-size: 16px; color: var(--text-strong);`
- `.theme`: `display: block; font-size: 9px; letter-spacing: .1em; color: var(--info-blue); margin-top: 2px;`
- `.menuBtn`: `position: absolute; top: 10px; right: 12px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--rule-gold); border-radius: 3px; background: rgba(8,9,13,.6); color: var(--gold); font-size: 14px; cursor: pointer;`
- `.fpvControls`: `position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 9px;`
- `.fpvForward`: `width: 56px; height: 46px; border-radius: 6px; border: 1px solid var(--rule-gold-strong); background: var(--gold-tint); color: var(--gold); font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center;`
- `.fpvTurn`: `width: 42px; height: 42px; border-radius: 50%; border: 1px solid var(--rule-gold); background: rgba(8,9,13,.62); color: var(--gold); font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center;`
- `.fpvBack`: `position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 42px; height: 36px; border-radius: 6px; border: 1px solid var(--rule-base); background: rgba(8,9,13,.62); color: var(--text-mute); font-size: 14px; cursor: pointer;` （※ モックでは左上ではなく中央上に置く例もあるが、既存仕様の「振り向き」は画面の D-pad とは別エリア。**位置はモック line 832 準拠で右上 ☰ と被らない場所に置く**。具体的には FPV 帯の **真下** に細い帯として配置するか、`bottom: 10px` の D-pad の **真下**に配置するのが良い。最終的に「☰ / D-pad / ↻ が 3 つとも独立してタップできる」ことが満たせれば配置の微調整は OK。）

### Step 3. エンカウント予兆行 (`.gaugeRow`)

モック line 844〜847 の「ラベル + 5 段階のセグメント」を再現する。
ただし `EncounterGauge` 共通コンポーネント側は触らないので、外側だけ装飾:

```scss
.gaugeRow {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: var(--bg-mid);
  border-bottom: 1px solid var(--rule-soft);
  flex-shrink: 0;
  font-size: 10px;
  color: var(--text-faint);
  letter-spacing: .1em;
}
.gaugeLabel { flex-shrink: 0; }
```

`EncounterGauge` 側のレンダリングが既に 5 段階のバー風になっているならそのまま並べる。
変更が必要なら共通基盤フェーズの担当者に申し送りし、本指示書側では触らない。

### Step 4. マップ / ヒント `.mid`

```scss
.mid {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  touch-action: pan-y;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px;
}

.mapWrap {
  background: var(--bg-deep);
  border: 1px solid var(--rule-soft);
  border-radius: 5px;
  padding: 8px;
}

.paletteHint {
  margin: 0;
  font-size: 10px;
  color: var(--info-blue);
  text-align: right;
  letter-spacing: .04em;
}
```

モックではマップ上に「AUTOMAP・F2」見出しと「セルタップで自動移動」ヒントが両端に並ぶ
ので、`.mapHead` を追加してそれを描画してもよい:

```tsx
<div className={styles.mid}>
  <div className={styles.mapHead}>
    <span className={styles.mapHeadLabel}>AUTOMAP ・ F{dive.depth}</span>
    <span className={styles.mapHeadHint}>セルタップで自動移動</span>
  </div>
  <div className={styles.mapWrap}>
    <DungeonMap ... />
  </div>
  <div className={styles.mapLegend}>
    <span>▲ 上り</span>
    <span>▼ 下り</span>
    <span className={styles.legendAlert}>● 警戒FOE</span>
    <span className={styles.legendCalm}>● 未警戒</span>
    <span>🌿 採集</span>
  </div>
</div>
```

- `.mapHead`: `display: flex; justify-content: space-between; align-items: center; font-size: 10px; letter-spacing: .14em; color: var(--text-faint);`
- `.mapHeadHint`: `color: var(--info-blue); letter-spacing: .04em;`
- `.mapLegend`: `display: flex; flex-wrap: wrap; gap: 10px; font-size: 9px; color: var(--text-mute);`
- `.legendAlert`: `color: var(--danger-text);`
- `.legendCalm`: `color: var(--text-mute);`

### Step 5. アクション行（階段 / 採集 / 調理 / 通知）

既存実装の構造（条件付きで `.stairs` / `.action` ボタンが flex column に並ぶ）を維持。
モック (line 884) では「現在地: 通常マス」ヒントの破線枠を文脈アクションが無いときに
出している。本実装でもアクションが何も出ない場合の「fallback ヒント」を追加してよい:

```tsx
{!stairKind && !gatherPoint && !atCookingSpot ? (
  <p className={styles.tileHint}>現在地: 通常マス ・ 足元にオブジェクトがあればアクションが出ます</p>
) : null}
```

SCSS:

- `.actionRow`（既存の `.stairs` / `.action` を包む新規 div）: `flex-shrink: 0; display: flex; flex-direction: column; gap: 8px; padding: 0 16px 8px;`
- `.stairs`: `min-height: 50px; border-radius: 3px; background: linear-gradient(180deg, var(--gold), var(--gold-deep)); color: var(--bg-mid); font-weight: 700; font-size: 14px; letter-spacing: .12em; border: none; cursor: pointer;`
- `.action`: `min-height: 46px; border-radius: 3px; border: 1px solid var(--rule-gold); background: var(--gold-tint); color: var(--gold); font-size: 13px; letter-spacing: .12em; cursor: pointer;`
  - `&:disabled`: `border-color: var(--rule-base); background: transparent; color: var(--text-mute); cursor: default;`
- `.notice`: `margin: 0; padding: 10px 12px; background: var(--surface-elev); border-left: 2px solid var(--gold); border-radius: 0 3px 3px 0; color: var(--text-soft); font-size: 12px; line-height: 1.6;`
- `.tileHint`: `margin: 0; padding: 10px 12px; border: 1px dashed var(--rule-soft); border-radius: 4px; color: var(--text-faint); font-size: 11px; text-align: center;`

### Step 6. メニュー / 道具 / 調理 / キャラ詳細モーダル

すべて `.itemOverlay + .itemPanel` を踏襲する。背景はモーダル backdrop（fixed, var(--bg-overlay)）+
パネルは bottom sheet 風（モック line 970-980「target select for 回復薬」が典型）か、
画面中央パネル（モック line 8c の dungeon menu）か、状況に応じて分かれる。

> **シンプル化方針**: 全モーダルを `.itemOverlay`（fixed inset 0 / centered）+
> `.itemPanel`（max-height: 86vh / overflow-y: auto / border-radius: 6px / 中央寄せ）に統一する。
> モックの bottom sheet 風（道具→対象選択の下から競り上がる UI）は **将来課題** とし、
> 本タスクでは中央パネルで実装。これで全モーダルが同じ枠組みになり実装も検証もシンプル。

- `.itemOverlay`: `position: fixed; inset: 0; background: var(--bg-overlay); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px;`
- `.itemPanel`: `width: min(420px, calc(100% - 40px)); max-height: min(86vh, calc(100dvh - 64px)); overflow-y: auto; background: var(--surface-panel); border: 1px solid var(--rule-gold); border-radius: 6px; padding: 20px 22px; box-shadow: var(--shadow-modal); display: flex; flex-direction: column; gap: 12px; color: var(--text-base);`
- `.itemTitle`: `font-family: var(--font-display); font-size: 18px; color: var(--text-strong); margin: 0;`
- `.menuGold`: `margin: 0; padding: 8px 12px; background: var(--gold-tint); border: 1px solid var(--rule-gold); border-radius: 3px; color: var(--gold); font-family: var(--font-mono); font-size: 14px; text-align: center;`
- `.menuActions`: `display: grid; grid-template-columns: 1fr 1fr; gap: 9px;`
- `.menuAction`: `min-height: 58px; padding: 0 14px; display: flex; align-items: center; gap: 10px; border-radius: 4px; border: 1px solid var(--rule-soft); background: var(--surface-elev); color: var(--text-strong); font-size: 14px; cursor: pointer;`
- `.menuSectionLabel`: `margin: 0; font-size: 10px; letter-spacing: .16em; color: var(--gold); font-weight: 700;`
- `.menuMember`: `display: flex; align-items: center; gap: 10px; padding: 8px 12px; background: var(--surface-elev); border: 1px solid var(--rule-soft); border-radius: 3px; color: var(--text-base); cursor: pointer;`
  - 最初の要素（リーダー）に gold ボーダーを付けたいなら `.menuMember:first-of-type { border-color: var(--rule-gold); }` でも OK
- `.menuMemberPortrait`: `width: 32px; height: 32px; border-radius: 3px; background: var(--bg-deep); overflow: hidden; flex-shrink: 0;`
- `.menuMemberInfo`: `flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px;`
- `.menuMemberName`: `display: flex; justify-content: space-between; align-items: baseline; font-size: 13px; color: var(--text-strong);`
- `.menuMemberJob`: `font-family: var(--font-mono); font-size: 10px; color: var(--text-faint);`
- `.menuMemberStat`: `font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); display: flex; gap: 8px;`
- `.menuSp`: `color: var(--gold); margin-left: auto;`
- `.itemClose`: `min-height: 46px; margin-top: 4px; border: 1px solid var(--rule-gold); border-radius: 3px; background: var(--gold-tint); color: var(--gold); font-size: 13px; letter-spacing: .16em; cursor: pointer;`

道具行 / 調理行 / キャラ詳細スキルツリー側のクラスも同じトークンで揃える:

- `.itemRow`: `display: flex; flex-direction: column; gap: 6px; padding: 10px 12px; background: var(--surface-elev); border: 1px solid var(--rule-soft); border-radius: 3px;`
- `.itemHeader`: `display: flex; align-items: center; gap: 12px;`
- `.itemName`: `font-size: 13px; color: var(--text-strong); display: flex; flex-direction: column; gap: 2px;`
- `.itemDesc`: `font-size: 10px; color: var(--text-faint);`
- `.itemTargets`: `display: flex; flex-direction: column; gap: 6px; margin-top: 4px;`
- `.itemTarget`: `display: flex; align-items: center; gap: 10px; padding: 8px 10px; background: var(--bg-deep); border: 1px solid var(--rule-soft); border-radius: 3px; color: var(--text-base); cursor: pointer;`
- `.itemTargetInfo`: `flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; font-size: 11px;`
- `.itemHp`: `font-family: var(--font-mono); font-size: 10px; color: var(--text-faint);`
- `.itemUse`: `min-height: 32px; padding: 0 12px; border-radius: 3px; border: 1px solid var(--rule-gold); background: var(--gold-tint); color: var(--gold); font-size: 11px; cursor: pointer;`
  - `&:disabled`: `border-color: var(--rule-base); background: transparent; color: var(--text-mute);`
- `.itemEmpty`: `margin: 0; padding: 16px 0; color: var(--text-faint); font-size: 12px; text-align: center;`
- `.confirmOverlay`: `position: fixed; inset: 0; background: var(--bg-overlay); display: flex; align-items: center; justify-content: center; z-index: 200;` （メニュー overlay より上に出すため z-index 200）
- `.confirmBox`: `width: min(320px, calc(100% - 48px)); background: var(--surface-panel); border: 1px solid var(--rule-gold); border-radius: 6px; padding: 18px 20px; display: flex; flex-direction: column; gap: 14px; box-shadow: var(--shadow-modal);`
- `.confirmText`: `font-size: 13px; color: var(--text-strong); line-height: 1.6; text-align: center;`
- `.confirmActions`: `display: flex; gap: 8px;`
- `.confirmCancel`: `flex: 1; min-height: 42px; border: 1px solid var(--rule-base); border-radius: 3px; background: transparent; color: var(--text-mute); font-size: 13px; cursor: pointer;`
- `.confirmOk`: `flex: 1; min-height: 42px; border-radius: 3px; background: linear-gradient(180deg, var(--gold), var(--gold-deep)); color: var(--bg-mid); font-weight: 700; font-size: 13px; cursor: pointer; border: none;`

スキルツリーのタブ:

- `.skillTabs`: `display: flex; gap: 6px;`
- `.skillTab`: `flex: 1; min-height: 36px; border-radius: 3px; border: 1px solid var(--rule-soft); background: transparent; color: var(--text-mute); font-size: 12px; cursor: pointer;`
- `.skillTabOn`: `border-color: var(--gold); background: var(--gold-tint); color: var(--gold);`
- `.menuStats`: `display: flex; flex-wrap: wrap; gap: 6px;`
- `.menuStat`: `font-family: var(--font-mono); font-size: 10px; color: var(--text-soft); background: var(--bg-deep); border-radius: 2px; padding: 3px 6px; border: 1px solid var(--rule-soft);`

### Step 7. ストーリー追加（任意）

`Dungeon.stories.tsx` に以下を追加してよい（必須ではない・無くてもディレクター側で
作る場合がある）。

```ts
export const Menu: Story = {
  decorators: [withGameContext(mockMidDive, { name: 'dungeon' })],
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const btn = canvasElement.querySelector<HTMLButtonElement>('button[aria-label="メニュー"]');
    btn?.click();
  },
};
```

`ItemUse` / `Cook` も同様に play で開く。Storybook の `@storybook/test` を使ってもよいが、
ベースの `querySelector` で十分。

---

## 機能優先で省略 / 追加するもの

### 省略（モックにあるが現状機能に無い、または範囲外）

- モック line 944〜946 の **「全体マップ」「設定」**メニュー項目: 現状 dungeon メニューは
  「どうぐ・食料 / 拠点へ帰還 / パーティ詳細」の 3 種で、全体マップ画面・設定モーダル機能は
  実装されていない。**省略**。
- モック line 950 の **「自動保存済 ・ 12:08」インジケータ**: dungeon メニュー画面で
  `lastSavedAt` を表示する仕様は無い（title 画面の SaveCard だけ）。**省略**。
- モック line 888〜915 の **「採集成功カード / 調理ダイアログ / 階段確認ダイアログ」を
  常時積層して表示**: 既存実装は notice 文字列 + confirm ダイアログ 1 枚で表現する。
  バナー風カードでの履歴表示は **省略**。
- モック line 8b の **エンカウント発生時の赤フラッシュ + 封蝋スタンプ演出**: ゲーム本体の
  エンカウント演出は `useEncounterEffect` 等のロジック層で発火する別タスク。dungeon 画面の
  SCSS では **対応しない**（共通エフェクト or battle 画面側で対応）。

### 維持 / 追加（機能上必要・モックに無くても残す）

- 採集 / 調理ボタンの「採集済み」「スキル要」「採集できる」分岐 UI: モックには無いが
  既存仕様で必要。**維持**。
- D-pad の **振り向きボタン（↻）**: モック line 840 にもあるが、現実装の `.fpvBack` の
  オーバーレイ位置は同等。**維持**。
- 確認ダイアログ (`confirm` state): モックの bottom-sheet 風と置き換えるのは大工事なので
  **当面は中央パネルで維持**（このまま黒曜カラーをあてる）。

---

## 追加トークン

新規追加なし。

---

## 検証

```
yarn lint
yarn test --run
yarn tsc -b
```

すべて緑であること。

その後 Storybook（`yarn storybook --host 0.0.0.0`）で `Pages/Dungeon / Default` が
黒曜カラーで描画されること、FPV 帯と map 領域が iPhone SE 縦（dvh ≒ 559）でも重ならない
ことを目視確認。

### 既存テスト

`src/pages/dungeon/__tests__/` に integration テストがある場合、`getByText('▲ 前進')`
など文言で要素を取っている。**文言は変えない**。クラス名だけ変える方針なのでテストは通る。

---

## ブランチ / コミット

現在の `feature/redesign-A` ブランチで作業する。コミットを 1 つ追加して commit SHA を
報告（push はしない）。

```
feat(theme): apply 黒曜 OBSIDIAN MINIMAL to dungeon page

- redesign FPV header with absolute-positioned depth label and ☰ menu
- restyle encounter gauge row, automap surface, and contextual action buttons
- rebuild item/cook/menu/confirm modals with obsidian surface tokens
- keep logic intact (movement, gather, cook, item use, skill tree)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## 想定 Q&A

- **FPV の高さが clamp になると `FirstPersonView` 内部の Canvas / SVG がスケールしない**:
  `FirstPersonView` 側が固定 width / height で描画する想定なら、外側の `.fpvWrap` を
  `display: grid; place-items: center;` にして子要素をセンタリングする。FPV 自体は触らない。
- **`EncounterGauge` のラベル文字色が背景に埋まる**: 共通コンポーネント側で色を持っていて
  オーバーライドできないなら、共通基盤フェーズの担当に申し送りし、本タスクでは触らない。
  外側の `.gaugeRow` の背景を見やすくするくらいに留める。
- **bottom-sheet 風モーダルにしないと駄目?**
  しない（理由は Step 6 冒頭の「シンプル化方針」を参照）。フェーズ 2 完了後の別タスクとする。
- **キャラ詳細パネルが長くなって `.itemPanel` の max-height を突破する**:
  `.itemPanel` が `overflow-y: auto` なので内側でスクロールする。`SkillTree` 共通コンポーネント
  が内部スクロールを持っている場合は二重スクロールにならないよう注意（共通コンポーネント側で
  オーバースクロール制御している前提）。
- **`stairs` ボタンの文言「▲ 次の階へ進む」「▼ 前の階へ戻る」「▼ 拠点へ戻る」は変える?**
  変えない（既存ロジック / テスト依存）。

不明点が出たら止めて報告すること。
