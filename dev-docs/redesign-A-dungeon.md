# フェーズ 2: dungeon 画面リデザイン（sonnet 用指示書） — **改訂版 v2 — モック忠実化**

> **改訂理由**: 前回の実装は「色味は黒曜化したが、ボタン配置・☰ メニュー / 道具モーダル / 採集 / 階段確認
> など、画面構成そのものがモックと大幅にズレてしまった」。
> **本改訂の方針: モック忠実化を最優先**。前回の「機能優先で省略」ジャッジは原則撤回する。
> モックに描かれている要素はすべて配置する。disabled でも形と位置は維持する。

`dev-docs/redesign-A.md`（**§1.1〜§1.4 トークン** / **§1.5 レイアウト運用ルール**）と
`dev-docs/redesign-A-title.md` / `dev-docs/redesign-A-title-fix.md` を **必ず先に読むこと**。
本ファイルは dungeon 画面（一人称ビュー + オートマップ + メニュー / 道具 / 調理 / 確認）の
リデザインに閉じた実装手順。

モック原本: `/tmp/sekaiju-design/案A_v2.dc.html` line 818〜984。
- `8a explore` 通常探索
- `8b encounter flash / 採集 / 調理 / 階段確認`
- `8c dungeon menu`（☰メニュー）
- `8d item use`（道具を使う）

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい

| 区分 | パス | 操作 |
| --- | --- | --- |
| 編集 | `src/pages/dungeon/index.tsx` | マークアップを **モック構造に揃える**。ボタンの位置・グルーピング・モーダル内 dl の構成を作り直す。**hook / useState の構成・ロジック・event handler の実体は触らない** |
| 編集 | `src/pages/dungeon/style.module.scss` | 黒曜テーマで全面再構築（`@use 'variables'` を外し `var(--*)` に切替） |
| 編集 | `src/pages/dungeon/Dungeon.stories.tsx` | 既存 `Default` / `Menu` を維持。`ItemUse` / `StairsConfirm` / `Gather` を追加（play で各モーダルを開く） |

### 触ってはいけない

- 共通コンポーネント: `FirstPersonView`, `DungeonMap`, `EncounterGauge`, `CharacterPortrait`, `ItemSprite`, `SkillTree`
- ドメイン: `src/domain/dive.ts`, `gather.ts`, `cooking.ts`, `movement.ts`, `itemUse.ts`, `encounter.ts`, `skillTree.ts`, `stats.ts`
- 型: `src/domain/types.ts`
- 全画面共通: `src/_variables.scss`, `src/_obsidian.scss`, `src/index.scss`, `index.html`
- 他画面の `src/pages/*/`

## 2. やってはいけないこと

- **自分で Edit / Write / Bash を使って実装すること。さらに `Agent` / `Task` を spawn しないこと**（孫委譲禁止）。
- `useState` / `useRef` / `useCallback` の依存配列を変えない。
- `moveStep` / `gatherHere` / `cook` / `applyFieldItem` / `pathTo` / `learnSkill` の呼び出し方を変えない。
- 既存 aria-label の文言を変えない（テストが拾っている）。
- 写本テーマ由来の SCSS 変数 (`$parchment` 等) を新規参照しない。
- **モックに描かれている要素を「機能が無いから」と省略しない**。disabled / 形だけでもよいので必ず配置する。

## 3. モックとの差分一覧（**現状の実装 → モック**）

### 3.1 探索メイン画面（モック 8a / line 818〜885）

1. **FPV 帯の高さ**: モックは `height: 232px` 固定。**現状実装は領域の取り方が違う**。FPV 帯を「画面上部の固定 232px (clamp で 180-240px に縮める)」として独立させ、その内側に D-pad / 振り向き / ☰ / 章マークを絶対配置する。
2. **章マーク + 深度ラベル（FPV 左上）**: モックは `position: absolute; top: 10px; left: 14px;` で「`F2`」を Shippori Mincho 16px / 「`苔生す回廊`」を 9px / `letter-spacing: .1em;` で 2 行。**現状の章マーク `❦ 探索` はモックには無い**。**章マーク `❦ 探索` は削除**し、モック準拠の 2 行表記に変える。
3. **「⚠ 奥にボスゲートの気配」帯**: モック (line 829) には FPV 上端中央に `font-size: 10px; color: var(--danger-text); letter-spacing: .14em;` で警告テキストがある。ボス階の予兆として、現在のフロアにボスゲートが存在するときに出す。
   - 出し方: `floor` から bossGate がある（`stairsAt` で `'stairsUp'` 系か、または `floor` の cells に boss tile が含まれるか）を判定。確実な API は `canAscend(save, depth) === false` か、`floor` の cells を走査する。**判定ロジックを増やすのが大変な場合は disabled 状態でも構わず、見出しを `null` にして場所だけ確保**。
4. **☰ メニューボタン**: モックは `width: 30px; height: 30px; border: 1px solid rgba(201,168,106,.4); color: var(--gold); font-size: 13px;` で、**右上 `top: 10px; right: 14px;`**。**現状実装は色とサイズが微妙に違う**。完全に合わせる。
5. **D-pad の見た目**: モック (line 834〜841) は `↰` / `▲` / `↱` の 1 行 + その下に `↻` 1 個。`▲` は **金箔タイントの矩形**（`52x44px; border-radius: 6px; border: 1px solid rgba(201,168,106,.6); background: rgba(201,168,106,.16); color: var(--gold);`）、`↰ ↱` は **円形** (`42x42px; border-radius: 50%; border: 1px solid rgba(201,168,106,.4); background: rgba(8,9,13,.62); color: var(--gold);`)、`↻` は **角丸矩形** (`42x38px; border-radius: 6px; border: 1px solid rgba(255,255,255,.14); background: rgba(8,9,13,.62); color: var(--text-mute);`)。**現状実装はこれらが揃ってない**。形・色・サイズを完全にモック準拠にする。
6. **エンカウント予兆ゲージ**: モックは FPV 帯の **直下に separate band** として配置（`padding: 9px 16px; background: #0a0c10; border-bottom: 1px solid rgba(255,255,255,.06);`）。「エンカウント予兆」ラベル + ゲージ（5 段 6px high）。**現状実装は近いが border-bottom が無いことがある**。モック準拠の帯にする。
7. **オートマップヘッダ**: モックは `padding: 14px 16px;` で「`AUTOMAP ・ F2`」と「`セルタップで自動移動`」(`color: var(--text-blue);` 相当の青)。**現状実装は近いが色味が違う**。`color: #6f9fd8;` 相当 → `var(--text-blue)` に。
8. **マップカード**: モックは `background: #0a0c10; border: 1px solid rgba(255,255,255,.07); border-radius: 5px; padding: 8px;` のカード内に `DungeonMap` を入れる。**現状実装は枠が無い or 違うことがある**。揃える。
9. **マップ凡例**: モックは `display: flex; gap: 14px; font-size: 9px; color: var(--text-faint);` の横並び。`▲ 上り階段 / ▼ 下り階段 / ● 警戒FOE (赤) / ● 未警戒 (茶) / 🌿 採集` の 5 つ。**現状実装は文言が違う**（「上り」「下り」など省略）。**モック準拠で文言「上り階段 / 下り階段」と完全表記**。
10. **「現在地: 通常マス…」ヒント**: モックは `position: absolute; bottom: 14px; left: 14px; right: 14px; height: 42px; border-radius: 4px; border: 1px dashed rgba(255,255,255,.1); display: flex; align-items: center; justify-content: center; font-size: 11px; color: var(--text-quote);`。**現状実装は様式が違う**（border-dashed では無い）。**dashed 枠 + 中央配置の 42px ピル**にする。
11. **アクション（階段 / 採集 / 調理）の出し分け**: モックは「現在地が通常マスの場合は dashed ヒントのみ表示、アクションがある場合はそのアクションのカードを表示」する。**現状実装は両方表示されることがある**。**アクションがある場合は dashed ヒントを出さない**（既存ロジックに近いが、CSS で `:has()` でなく `if (stairKind || gatherPoint || atCookingSpot)` で JSX 分岐）。

### 3.2 採集 / 調理 / 階段確認の見た目（モック 8b / line 888〜916）

12. **採集結果カード**: モックは `background: #0e131a; border: 1px solid rgba(143,208,160,.3); border-radius: 5px; padding: 14px;` の **緑系カード**。中身は「`✦ 採集成功 — 薬草の茂み`」見出し + 横並び 3 列の結果セル（`🌿 薬の葉 ×2` など）。**現状実装はインラインの notice テキストのみ**。**カード化**して、最後の採集結果（`notice` を緑カードに昇格）。複数アイテムの場合は順に並べる。
    - 注意: 現在は `setNotice(...)` で 1 行テキストだけが出るが、`gatherHere(...)` の結果には `itemId` 1 つしか含まれない場合もある。**簡易対応として、1 セルだけ表示する緑カードを出す**（複数表示は将来課題として残す）。
13. **調理パネル**: モックは `background: #0e131a; border: 1px solid rgba(216,168,111,.3);` の **琥珀系カード**。中身は「`🍲 調理 — 薬草スープ`」見出し + `font-size: 11px; color: var(--text-base); line-height: 1.6;` の説明文 + 「やめる」「調理する」の 2 ボタン (40px high)。**現状実装は様式が違う**（モーダルになっている）。**モック準拠で `actionRow` の下に inline カード**として置く（モーダルではなく現状画面に直接出す）。
    - **注意**: 現状実装の `cookOpen` モーダルとの整合: モーダルでレシピ一覧を選んで「作る」のフローは温存して良い。ただし、調理メニュー内のカードの **見た目**は上記モックに揃える（モーダル開いてからの中身の話）。**モック準拠の inline カードは「現在地で 1 つだけレシピが推奨されている時」**の表示に留め、複数レシピがある場合は現状のモーダルに任せて良い。
14. **階段確認カード**: モックは画面下端固定の `background: #15171f; border: 1px solid rgba(201,168,106,.3); border-radius: 5px; padding: 14px;` のカード。中身は「`▼ 下り階段` / `F2 → F3`」の dl + 「やめる」「次階へ降りる」の 2 ボタン。**現状実装は単一の `階段` ボタンだけで、確認ダイアログが別レイヤー**。**階段確認は `confirm` モーダル経由でなく、モック準拠の inline カードに変える**。
    - **注意**: 既存の `setConfirm({...})` 経由のフローは「道具使用」「採集」など他の確認にも使われているので **削除しない**。階段は確認モーダルを経由せず、ヒント表示状態のとき下端に出す inline カードに置き換える。
    - 「次階へ降りる / 上へ」ボタンが primary、「やめる」が outline。

### 3.3 ☰メニュー（モック 8c / line 919〜953）

15. **メニューの開閉演出**: モックは `position: absolute; inset: 0;` のオーバーレイで FPV 背景上に半透明 `rgba(6,7,10,.78)` を重ねる **画面遷移風**。**現状実装はモーダル枠**。**モック準拠で「全画面ディム + flex column パネル」**に変える。
16. **メニュー上部のヘッダ**: モックは左に「`メニュー` (Shippori Mincho 18px)」と「`F2 ・ 苔生す回廊` (10px green)」、右に閉じるボタン `✕` (30px 円形 outline)。**現状実装は文字構成が違う**。揃える。
17. **パーティセクション見出し**: 「`パーティ` (10px gold letter-spacing .16em) + `タップで詳細・スキル` (グレー)」。**現状実装は文言が違う**。揃える。
18. **パーティ行カード**: モックは行ごとに `background: var(--surface-panel); border: 1px solid var(--rule-soft); border-radius: 3px; padding: 8px 11px;` で、左に 32x32 サムネ、中央に「名前 + 右端に `Lv34` mono」、その下に 2 段 HP / TP バー (3px high、3px gap、H/T ラベル)、右端に `➜` (gold)。**現状実装はバーの形式が違う**（StatBar コンポを使ってないかも）。揃える。
   - 先頭の選択中行は border が `rgba(201,168,106,.3)`、それ以外は `rgba(255,255,255,.07)`。
   - **`StatBar` は触らないが、H/T の小さいバーはこの場でインライン HTML で OK**（モックも同じ）。
19. **アクションボタン 2x2 グリッド**: モック (line 941〜948) は `display: grid; grid-template-columns: 1fr 1fr; gap: 9px;` で 4 つの 58px ボタン。順序: `🎒 道具を使う` (active な金箔タイント枠) / `⚙ 設定` / `🪢 帰還の糸 (所持3)` (緑系枠) / `🗺 全体マップ` (グレー)。
   - **現状実装は単一カラムの縦リスト**。2x2 grid に組み直す。
   - **「設定」「全体マップ」は機能無いので disabled** だが、**位置・形は維持**（モック準拠）。
20. **自動保存表示**: モック (line 950) は「`● 自動保存済 ・ 12:08`」(`color: #5d8a6c; font-family: var(--font-mono);`) を画面下端の上にセンタリングで配置。**現状実装は無い**。**dive 中は自動保存済みなので、現在時刻 (`new Date()`) からの HH:MM` を表示**する。1 分ごとに更新する必要は無い（マウント時の時刻で OK）。
21. **「とじる」ボタン**: モック (line 951) は **48px 高、金箔 outline (`border: 1px solid rgba(201,168,106,.5); background: rgba(201,168,106,.08); color: var(--gold);`)、`letter-spacing: .16em`** の 1 ボタン。「`とじる（探索へ戻る）`」。**現状実装は様式が違う**。揃える。
22. **メニュー内のキャラ詳細**: モックには無いので、現状の **キャラ選択 → ステ + スキルツリー** のフローは温存。ただし、キャラ行をタップした時の遷移は同じパネル内で「メニュー → キャラ詳細」をスライド切替するのが望ましい（モックに記載なし）。**現状の実装を温存**。

### 3.4 道具を使う（モック 8d / line 957〜981）

23. **アイテム一覧の様式**: モックは `display: flex; flex-direction: column; gap: 8px;` で「`🧪 回復薬 / HP +120 ・ 味方単体 / ×8`」のカード型。選択中は border `rgba(201,168,106,.55); background: rgba(201,168,106,.1);`、未選択は border `rgba(255,255,255,.06);`。**現状実装は様式が違う**。揃える。
24. **対象選択ボトムシート**: モックは画面下端から **bottom sheet** として上がってくる `position: absolute; left: 0; right: 0; bottom: 0; background: var(--surface-panel); border-top: 1px solid rgba(201,168,106,.3); border-radius: 10px 10px 0 0; padding: 18px 20px 22px; box-shadow: 0 -16px 50px rgba(0,0,0,.5);`。上端に handle (40x4px 角丸)。
   - 中身は「`🧪 回復薬 を使う` / `対象の味方を選択（HP +120）`」見出し + 味方カード（HP bar）+ 「`使う` ボタン (`border: 1px solid rgba(143,208,160,.5); color: var(--success);`)」+ 末尾「`もどる`」outline ボタン。
   - **現状実装はモーダルで上から下まで広がる形**。**bottom sheet 化**して、ハンドル + 角丸トップ + box-shadow を揃える。
   - **「満タンのキャラには `満タン` テキストを出して使えない**（`opacity: .6;`）**ようにする**。モック準拠。
25. **「`もどる`」ボタン**: 42px outline (`border: 1px solid rgba(255,255,255,.14); color: var(--text-mute);`)。

## 4. ゴール（Storybook ストーリー一覧）

`Pages/Dungeon` 配下で以下が黒曜カラーで描画され、`yarn lint` /
`yarn test --run` / `yarn tsc -b`（または `yarn build`）が緑。

1. **`Default`**（mockMidDive・F2 探索中）— FPV 帯（232px・章マーク無し / F2 / 苔生す回廊 / ☰ / D-pad / 振り向き）+ エンカウントゲージ + マップカード + 凡例 + ヒント
2. **`Menu`**（☰ 開）— ディム + flex column パネル + パーティ 5 行 + 2x2 アクション grid + 自動保存表示 + `とじる`
3. **`ItemUse`** (追加) — メニュー → 道具を使うを開いた状態。bottom sheet で対象選択中。
4. **`StairsConfirm`** (追加) — 階段の上で立ったときの inline 確認カード
5. **`Gather`** (追加) — 採集ポイントに立った時のアクションカード

---

## 5. 実装ステップ（モック準拠の具体構造）

### Step 0. 旧 `@use 'variables'` を外す

`src/pages/dungeon/style.module.scss` の冒頭の `@use 'variables' as var;` を **削除**。
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

**左右 padding は 0**（FPV 帯と背景 deep が画面端まで届く）。内部セクションが個別に padding を取る。

### Step 2. FPV 帯（`.fpvWrap`）

```tsx
<header className={styles.head}>
  <div className={styles.fpvWrap}>
    <FirstPersonView ... />
    {/* 章マーク無し */}
    <div className={styles.depthLeft}>
      <div className={styles.depthFloor}>F{dive.depth}</div>
      <div className={styles.depthTheme}>{bandThemeFor(dive.depth).name}</div>
    </div>
    {hasBossGate && (
      <div className={styles.bossGateOmen}>⚠ 奥にボスゲートの気配</div>
    )}
    <button type="button" className={styles.fpvBack} onClick={...} aria-label="振り向く">↻</button>
    <button type="button" className={styles.menuBtn} aria-label="メニュー" onClick={...}>☰</button>
    <div className={styles.fpvControls}>
      <button type="button" className={styles.fpvTurnLeft} aria-label="左を向く">↰</button>
      <button type="button" className={styles.fpvForward} onClick={...}>▲</button>
      <button type="button" className={styles.fpvTurnRight} aria-label="右を向く">↱</button>
    </div>
  </div>
</header>
```

```scss
.head { flex: 0 0 auto; }
.fpvWrap {
  position: relative;
  height: clamp(180px, 28dvh, 232px);
  overflow: hidden;
}
.depthLeft {
  position: absolute;
  top: 10px;
  left: 14px;
  z-index: 1;
}
.depthFloor {
  font-family: var(--font-display);
  font-size: 16px;
  color: var(--text-strong);
}
.depthTheme {
  font-size: 9px;
  color: #8fae8c;            /* モック準拠の苔色 (緑系) */
  letter-spacing: .1em;
}
.bossGateOmen {
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 10px;
  color: var(--danger-text);
  letter-spacing: .14em;
  z-index: 1;
}
.menuBtn {
  position: absolute;
  top: 10px;
  right: 14px;
  width: 30px;
  height: 30px;
  border: 1px solid var(--rule-gold);
  border-radius: 3px;
  background: rgba(8, 9, 13, .62);
  color: var(--gold);
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
.fpvBack {
  /* 振り向きは ↻ で、D-pad の下に積む。モックは D-pad の下中央。
     現状の右上配置から、D-pad の下に移動する。 */
}
.fpvControls {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  z-index: 1;
}
.fpvControlsRow {
  display: flex;
  align-items: center;
  gap: 9px;
}
.fpvTurnLeft,
.fpvTurnRight {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid var(--rule-gold);
  background: rgba(8, 9, 13, .62);
  color: var(--gold);
  font-size: 15px;
}
.fpvForward {
  width: 52px;
  height: 44px;
  border-radius: 6px;
  border: 1px solid var(--rule-gold-strong);
  background: var(--gold-tint);
  color: var(--gold);
  font-size: 18px;
}
.fpvBack {
  width: 42px;
  height: 38px;
  border-radius: 6px;
  border: 1px solid var(--rule-base);
  background: rgba(8, 9, 13, .62);
  color: var(--text-mute);
  font-size: 15px;
}
```

> `hasBossGate` の判定は簡易に `canAscend(save, dive.depth) === false` で OK。
> （正確には「ボス階かつ未撃破」だが、現状の `canAscend` でほぼ同義）。
> 不確実な場合は判定を `false` 固定にして見た目だけ仕込み、disabled 状態にしておく（**機能優先で省略しない**）。

### Step 3. エンカウントゲージ帯

```tsx
<div className={styles.gaugeRow}>
  <span className={styles.gaugeLabel}>エンカウント予兆</span>
  <EncounterGauge level={gaugeLevel(dive.encounter.stepsUntilEncounter)} />
</div>
```

```scss
.gaugeRow {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  background: #0a0c10;
  border-bottom: 1px solid var(--rule-soft);
}
.gaugeLabel {
  font-size: 10px;
  color: var(--text-faint);
  letter-spacing: .1em;
}
```

### Step 4. 可変領域: マップ + 凡例 + アクション + ヒント

```tsx
<div className={styles.mid}>
  <div className={styles.mapHead}>
    <span className={styles.mapHeadLabel}>AUTOMAP ・ F{dive.depth}</span>
    <span className={styles.mapHeadHint}>セルタップで自動移動</span>
  </div>
  <div className={styles.mapCard}>
    <DungeonMap ... />
  </div>
  <div className={styles.mapLegend}>
    <span>▲ 上り階段</span>
    <span>▼ 下り階段</span>
    <span className={styles.legendAlert}>● 警戒FOE</span>
    <span className={styles.legendCalm}>● 未警戒</span>
    <span>🌿 採集</span>
  </div>

  {/* アクション or ヒント */}
  <div className={styles.actionRow}>
    {gatherPoint ? <GatherCard ... /> : null}
    {atCookingSpot ? <CookCard ... /> : null}
    {stairKind ? <StairsCard ... /> : null}
    {!stairKind && !gatherPoint && !atCookingSpot ? (
      <p className={styles.tileHint}>現在地: 通常マス ・ 足元にオブジェクトがあればアクションが出ます</p>
    ) : null}
    {notice && <p className={styles.notice}>{notice}</p>}
  </div>
</div>
```

```scss
.mid {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.mapHead {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mapHeadLabel {
  font-size: 10px;
  letter-spacing: .16em;
  color: var(--text-faint);
}
.mapHeadHint {
  font-size: 10px;
  color: var(--text-blue);
}
.mapCard {
  background: #0a0c10;
  border: 1px solid var(--rule-soft);
  border-radius: 5px;
  padding: 8px;
}
.mapLegend {
  display: flex;
  gap: 14px;
  font-size: 9px;
  color: var(--text-faint);
  flex-wrap: wrap;
}
.legendAlert { color: var(--danger-text); }
.legendCalm { color: #9a7a6a; }    /* モック準拠の茶色 */

.tileHint {
  margin: 0;
  height: 42px;
  border-radius: 4px;
  border: 1px dashed var(--rule-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: var(--text-quote);
}
```

### Step 5. アクションカード（採集 / 調理 / 階段）

#### 5.1 採集カード（モック line 900〜907 準拠）

```tsx
<div className={styles.gatherCard}>
  <div className={styles.gatherHead}>
    <span className={styles.gatherSparkle}>✦</span>
    <span className={styles.gatherTitle}>採集 — {gatherPoint.name}</span>
  </div>
  <button
    type="button"
    className={styles.gatherBtn}
    disabled={isGatherDepleted(...) || !canGather(...)}
    onClick={handleGather}
  >
    {gatherButtonLabel}
  </button>
</div>
```

```scss
.gatherCard {
  background: #0e131a;
  border: 1px solid rgba(143, 208, 160, .3);
  border-radius: 5px;
  padding: 14px;
}
.gatherHead {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.gatherSparkle { font-size: 16px; color: #9ed8b4; }
.gatherTitle {
  font-size: 13px;
  color: #9ed8b4;
  font-weight: 700;
}
.gatherBtn {
  width: 100%;
  height: 40px;
  border-radius: 3px;
  background: linear-gradient(180deg, #d8a86f, #b8884f);
  color: var(--bg-mid);
  font-weight: 700;
  font-size: 12px;
}
```

#### 5.2 調理カード（モック line 909〜913 準拠）

調理メニューを開くトリガとしては inline カード、開いた中身は既存モーダル温存（既存実装フロー維持）。

```tsx
{atCookingSpot && (
  <div className={styles.cookCard}>
    <div className={styles.cookHead}>
      <span className={styles.cookIcon}>🍲</span>
      <span className={styles.cookTitle}>調理</span>
    </div>
    <p className={styles.cookDesc}>食材を消費して探索バフを得る。</p>
    <div className={styles.cookActions}>
      <button type="button" className={styles.cookCancel} onClick={...}>やめる</button>
      <button type="button" className={styles.cookPrimary} onClick={() => setCookOpen(true)}>調理する</button>
    </div>
  </div>
)}
```

```scss
.cookCard {
  background: #0e131a;
  border: 1px solid rgba(216, 168, 111, .3);
  border-radius: 5px;
  padding: 14px;
}
.cookHead { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
.cookIcon { font-size: 18px; }
.cookTitle { font-size: 13px; color: #e0b07c; font-weight: 700; }
.cookDesc { font-size: 11px; color: var(--text-base); line-height: 1.6; margin: 0 0 10px; }
.cookActions { display: flex; gap: 8px; }
.cookCancel,
.cookPrimary {
  flex: 1; height: 40px; border-radius: 3px; font-size: 12px;
}
.cookCancel { border: 1px solid var(--rule-base); color: var(--text-mute); background: transparent; }
.cookPrimary {
  background: linear-gradient(180deg, #d8a86f, #b8884f);
  color: var(--bg-mid);
  font-weight: 700;
  border: 0;
}
```

#### 5.3 階段確認カード（モック line 914〜915 準拠）

```tsx
{stairKind && (
  <div className={styles.stairsCard}>
    <div className={styles.stairsHead}>
      <span className={styles.stairsLabel}>
        {stairKind === 'stairsUp' ? '▲ 上り階段' : '▼ 下り階段'}
      </span>
      <span className={styles.stairsSub}>
        {stairKind === 'stairsUp' ? `F${dive.depth} → F${dive.depth + 1}` : `F${dive.depth} → F${dive.depth - 1}`}
      </span>
    </div>
    <div className={styles.stairsActions}>
      <button type="button" className={styles.stairsCancel} onClick={() => {/* dismiss: no-op */}}>やめる</button>
      <button type="button" className={styles.stairsPrimary} onClick={() => void handleStairs()}>
        {stairKind === 'stairsUp' ? '次階へ登る' : '前の階へ降りる'}
      </button>
    </div>
  </div>
)}
```

```scss
.stairsCard {
  background: var(--surface-panel);
  border: 1px solid var(--rule-gold);
  border-radius: 5px;
  padding: 14px;
}
.stairsHead { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.stairsLabel { font-size: 13px; color: var(--text-strong); }
.stairsSub { font-size: 10px; color: var(--text-faint); }
.stairsActions { display: flex; gap: 8px; }
.stairsCancel { flex: 1; height: 40px; border-radius: 3px; border: 1px solid var(--rule-base); color: var(--text-mute); background: transparent; font-size: 12px; }
.stairsPrimary {
  flex: 1; height: 40px; border-radius: 3px; background: linear-gradient(180deg, var(--gold), var(--gold-deep));
  color: var(--bg-mid); font-weight: 700; border: 0; font-size: 12px;
}
```

> **注意**: 階段は **既存の `setConfirm({...})` 経由のフローを通さず**、画面上の inline カードで直接 `handleStairs()` を呼ぶ。既存の `confirm` モーダル機能自体は他の用途（道具使用など）で温存。

### Step 6. ☰ メニュー（モック 8c）

```tsx
{menuOpen ? (
  <div className={styles.menuOverlay}>
    <div className={styles.menuPanel}>
      <div className={styles.menuHead}>
        <div>
          <div className={styles.menuTitle}>メニュー</div>
          <div className={styles.menuSub}>F{dive.depth} ・ {bandThemeFor(dive.depth).name}</div>
        </div>
        <button type="button" className={styles.menuClose} aria-label="閉じる" onClick={...}>✕</button>
      </div>

      <p className={styles.menuPartyLabel}>
        パーティ <span className={styles.menuPartyLabelSub}>タップで詳細・スキル</span>
      </p>
      <div className={styles.menuPartyList}>
        {dive.party.map((p, i) => /* メンバーカード */ ...)}
      </div>

      <div className={styles.menuActionGrid}>
        <button type="button" className={styles.menuActionItem} onClick={...}>
          <span className={styles.menuActionIcon}>🎒</span>
          <span className={styles.menuActionLabel}>道具を使う</span>
        </button>
        <button type="button" className={styles.menuActionSetting} disabled>
          <span className={styles.menuActionIcon}>⚙</span>
          <span className={styles.menuActionLabel}>設定</span>
        </button>
        <button type="button" className={styles.menuActionThread} onClick={() => /* return-thread item */}>
          <span className={styles.menuActionIcon}>🪢</span>
          <div className={styles.menuActionMeta}>
            <span className={styles.menuActionLabelGreen}>帰還の糸</span>
            <span className={styles.menuActionSubGreen}>町へ戻る ・ 所持 {threadCount}</span>
          </div>
        </button>
        <button type="button" className={styles.menuActionMap} disabled>
          <span className={styles.menuActionIcon}>🗺</span>
          <span className={styles.menuActionLabel}>全体マップ</span>
        </button>
      </div>

      <div className={styles.menuSavedRow}>
        <span className={styles.menuSavedDot}>●</span>
        <span>自動保存済 ・ {savedAt}</span>
      </div>

      <button type="button" className={styles.menuCloseBig} onClick={...}>
        とじる（探索へ戻る）
      </button>
    </div>
  </div>
) : null}
```

```scss
.menuOverlay {
  position: absolute;
  inset: 0;
  background: rgba(6, 7, 10, .78);
  display: flex;
  flex-direction: column;
  z-index: 10;
}
.menuPanel {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding: 16px 20px 18px;
  overflow-y: auto;
  gap: 14px;
}
.menuHead {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.menuTitle {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--text-strong);
}
.menuSub {
  font-size: 10px;
  color: #8fae8c;
  margin-top: 2px;
}
.menuClose {
  width: 30px; height: 30px;
  border: 1px solid var(--rule-base);
  border-radius: 50%;
  color: var(--text-mute);
  background: transparent;
  font-size: 13px;
}

.menuPartyLabel {
  margin: 0;
  font-size: 10px;
  letter-spacing: .16em;
  color: var(--gold);
  font-weight: 700;
}
.menuPartyLabelSub {
  color: var(--text-quote);
  letter-spacing: 0;
  font-weight: 400;
  margin-left: 4px;
}
.menuPartyList {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.menuMember {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--surface-panel);
  border: 1px solid var(--rule-soft);
  border-radius: 3px;
  padding: 8px 11px;
}
.menuMemberLeader {
  border-color: var(--rule-gold);
}
/* 行内: portrait 32x32 + name + Lv mono + HP/TP 2 段 (3px high) + ➜ */

.menuActionGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
}
.menuActionItem,
.menuActionSetting,
.menuActionThread,
.menuActionMap {
  height: 58px;
  border-radius: 4px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--text-strong);
  background: var(--surface-panel);
  border: 1px solid var(--rule-soft);
}
.menuActionItem {
  background: #1a2030;
  border-color: var(--rule-gold);
}
.menuActionThread {
  border-color: rgba(143, 208, 160, .35);
}
.menuActionLabelGreen { font-size: 13px; color: #9ed8b4; }
.menuActionSubGreen { font-size: 9px; color: var(--text-faint); }
.menuActionIcon { font-size: 20px; }
.menuActionSetting:disabled,
.menuActionMap:disabled {
  opacity: .55;
  cursor: not-allowed;
}

.menuSavedRow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: #5d8a6c;
  margin-top: auto;
}
.menuSavedDot {
  color: #5d8a6c;
  animation: glowPulse 2.5s ease-in-out infinite;
}

.menuCloseBig {
  height: 46px;
  border-radius: 3px;
  border: 1px solid var(--rule-gold-strong);
  background: var(--gold-tint);
  color: var(--gold);
  font-size: 14px;
  letter-spacing: .16em;
}
```

> `savedAt` は `new Date()` から `HH:MM` を組み立てる（モック準拠で 1 回計算）。
> `threadCount` は `save.guild.storage` から `item_return_thread` を絞り込んで `qty` を合算。

### Step 7. 道具を使う（モック 8d / bottom sheet）

```tsx
{itemOpen ? (
  <div className={styles.itemOverlay} onClick={() => setItemOpen(false)}>
    <div className={styles.itemHeader}>
      <span className={styles.itemHeaderTitle}>道具</span>
      <button type="button" className={styles.itemHeaderClose} aria-label="閉じる" onClick={() => setItemOpen(false)}>✕</button>
    </div>
    <div className={styles.itemList} onClick={(e) => e.stopPropagation()}>
      <p className={styles.itemListLabel}>所持アイテム</p>
      {usable.map((s) => (
        <button
          key={s.itemId}
          type="button"
          className={`${styles.itemCard} ${selectedItemId === s.itemId ? styles.itemCardSelected : ''}`}
          onClick={() => setSelectedItemId(s.itemId)}
        >
          <ItemSprite itemId={s.itemId} size="sm" />
          <div className={styles.itemCardMeta}>
            <span className={styles.itemCardName}>{ITEMS[s.itemId]?.name}</span>
            <span className={styles.itemCardDesc}>{itemEffectLabel(s.itemId)}</span>
          </div>
          <span className={styles.itemCardCount}>×{s.qty}</span>
        </button>
      ))}
    </div>

    {selectedItemId && (
      <div className={styles.itemSheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.itemSheetHandle} />
        <div className={styles.itemSheetHead}>
          <span className={styles.itemSheetIcon}>🧪</span>
          <div>
            <div className={styles.itemSheetTitle}>{itemName} を使う</div>
            <div className={styles.itemSheetSub}>{itemDescLine}</div>
          </div>
        </div>
        <div className={styles.itemTargetList}>
          {dive.party.map((p) => /* 各味方カード, ボタン色は使えるなら緑 / disabled は満タン表示 */ ...)}
        </div>
        <button type="button" className={styles.itemSheetClose} onClick={() => setSelectedItemId(null)}>もどる</button>
      </div>
    )}
  </div>
) : null}
```

```scss
.itemOverlay {
  position: absolute;
  inset: 0;
  background: var(--surface-card);
  display: flex;
  flex-direction: column;
  z-index: 10;
}
.itemHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px 0;
}
.itemHeaderTitle {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--text-strong);
}
.itemHeaderClose {
  width: 30px; height: 30px;
  border: 1px solid var(--rule-base);
  border-radius: 50%;
  color: var(--text-mute);
  background: transparent;
  font-size: 13px;
}
.itemList {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 14px 20px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.itemListLabel {
  font-size: 10px;
  letter-spacing: .16em;
  color: var(--gold);
  font-weight: 700;
  margin: 0 0 8px;
}
.itemCard {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--surface-panel);
  border: 1px solid var(--rule-soft);
  border-radius: 3px;
  padding: 10px 12px;
  width: 100%;
}
.itemCardSelected {
  background: rgba(201, 168, 106, .1);
  border-color: rgba(201, 168, 106, .55);
}
.itemCardMeta { flex: 1; display: flex; flex-direction: column; gap: 1px; text-align: left; }
.itemCardName { font-size: 13px; color: var(--text-strong); }
.itemCardDesc { font-size: 10px; color: #8fd0a0; }
.itemCardCount { font-family: var(--font-mono); font-size: 12px; color: var(--gold); }

.itemSheet {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  background: var(--surface-panel);
  border-top: 1px solid var(--rule-gold);
  border-radius: 10px 10px 0 0;
  padding: 18px 20px 22px;
  box-shadow: 0 -16px 50px rgba(0, 0, 0, .5);
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.itemSheetHandle {
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, .18);
  margin: 0 auto;
}
.itemSheetHead { display: flex; align-items: center; gap: 10px; }
.itemSheetIcon { font-size: 20px; }
.itemSheetTitle { font-size: 13px; color: var(--text-strong); }
.itemSheetSub { font-size: 10px; color: var(--text-faint); margin-top: 2px; }
.itemTargetList { display: flex; flex-direction: column; gap: 7px; }
.itemSheetClose {
  height: 42px;
  border-radius: 3px;
  border: 1px solid var(--rule-base);
  color: var(--text-mute);
  background: transparent;
  font-size: 13px;
}
```

> **既存実装の道具モーダル**（`itemOpen` true 時の `<div className={styles.itemOverlay}>` で
> 道具一覧 + 対象選択を同時に出している構造）から、**選択 → bottom sheet** の 2 段階に変える。
> ロジックは `setSelectedItemId` 新規 useState を追加して 1 件保持するだけ。`applyFieldItem`
> の呼び出しタイミングは変えない。

### Step 8. 反転した「機能優先」方針の取り扱い

- **「設定」「全体マップ」は機能無いので disabled** だが、位置・形は維持（モック差分 19）。
- **「ボスゲートの気配」** は判定が難しい場合は `false` 固定で良いが、見た目だけはコンポーネントを残して `null` を返すこと。**マークアップから消すのは NG**。
- **採集結果カード** は 1 セルだけの表示で OK（現状 `gatherHere` の戻り値が 1 itemId のみ）。

## 6. 検証

```
yarn lint
yarn test --run
yarn tsc -b
```

3 点すべて緑。

## 7. コミット

```
feat(redesign-A): rebuild dungeon page to match mock v2 (改訂版)

- FPV 232px band with D-pad, boss-gate omen, depth label per mock
- gauge band w/ border-bottom and gold map header
- inline action cards (gather / cook / stairs) replacing modal confirm
- ☰ menu redesigned as full-screen panel with 2x2 action grid
- item use bottom-sheet pattern with target list

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

push 不要。SHA を最終応答で報告。

---

## 機能優先で残す例外（必ず最終応答で明記）

- 「ボスゲートの気配」のロジックは `canAscend(save, depth) === false` を proxy として使う。完全一致を保証できない場合は **disabled state 同等**として扱い、表示しない（コンポーネントは仕込んでおく）。
- 採集結果カードは 1 セル分のみ（モックは 3 セルだが現実装では 1 itemId のみ返るため）。
- 「全体マップ」「設定」ボタンは disabled。位置・形は維持。
- 「自動保存済」の時刻はマウント時の現在時刻で固定（1 分ごとの更新は省略）。
