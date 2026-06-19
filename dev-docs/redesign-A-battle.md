# フェーズ 2: battle 画面リデザイン（sonnet 用指示書）

`dev-docs/redesign-A.md`（**§1.1〜§1.4 トークン** / **§1.5 レイアウト運用ルール**）と
`dev-docs/redesign-A-title.md` / `dev-docs/redesign-A-title-fix.md` を **必ず先に読むこと**。
本ファイルは battle 画面（戦闘）のリデザインに閉じた実装手順。

> battle は本ゲームで **最も巨大で複雑な画面**（`index.tsx` 約 1.8k 行、`style.module.scss`
> 約 1.1k 行）。コマンドモード状態機械（global / individual / strategy / anim / 対象選択 / スキル
> 選択 / ユニオン）、敵 / 召喚 / 味方カード、ログ、リザルト、敗北、逃走のすべてが 1 ファイルに
> 集約されている。リスクを下げるため:
>
> 1. **マークアップ構造とロジックは原則そのまま**。SCSS とローカル装飾だけ黒曜化する。
> 2. **既存テスト assert は変えない**。`yarn test --run` が緑であることが最低条件。
> 3. **敵タップ＝対象選択＋被弾 FX、下部コマンドパネルでモード遷移 (global → individual →
>    strategy → anim) の UI 流れはモック準拠で既に揃っているので、見た目だけ更新**。
> 4. サブコンポーネント (`StatBar` / `BattleExpBar` / `InkSplatter` / `EnemySprite` /
>    `CharacterPortrait` / `ResistBadges`) は共通基盤フェーズで黒曜化済み。**触らない**。

---

## 触ってよいファイル

| 区分 | パス | 操作 |
| --- | --- | --- |
| 編集 | `src/pages/battle/style.module.scss` | 黒曜テーマで全面再構築（`@use 'variables'` を外し `var(--*)` 直接参照に切替） |
| 編集 | `src/pages/battle/index.tsx` | **マークアップは最小変更**。章マーク・コマンドラベルなど装飾要素の追加のみ可。**JSX のロジック（条件分岐・hook 呼び出し・event handler）は触らない** |
| 編集 | `src/pages/battle/Battle.stories.tsx` | 既存 4 ストーリー（`Default` / `NoLog` / `SkillMenu` / `BossEncounter`）を維持。必要なら `Strategy` を追加してよい |

> **共通コンポーネントは触らない**:
> - `src/components/common/StatBar/`（HP / TP / ユニオン% バー）
> - `src/components/common/BattleExpBar/`（EXP アニメ）
> - `src/components/common/InkSplatter/`（damage / heal / crit / gold ポップ）
> - `src/components/common/EnemySprite/` / `CharacterPortrait/` / `ResistBadges/`
>
> battle 画面側からは **props だけ渡す通常利用**。内部スタイルには介入しない。

## やってはいけないこと

- 自分でさらに `Agent` / `Task` を spawn しない。
- `src/_variables.scss` / `src/_obsidian.scss` を変更しない。
- 他画面の `style.module.scss` / `index.tsx` を変更しない。
- `src/domain/battle/`・`src/domain/battle*.ts`・`src/domain/strategy.ts`・`src/domain/union.ts`
  などのゲームロジックは触らない。
- `useEffect` / `useCallback` の依存配列を変えない（戦闘ログ逐次再生・anim フェーズ・
  自動コマンド生成などのタイミングが崩れる）。
- 既存テスト (`__tests__` / `index.test.tsx` 配下) の assert を変えない。
- 写本テーマ由来の SCSS 変数 (`$parchment` 等) を新規参照しない。
- 攻撃エフェクト（モック line 1087 の 7 種攻撃 SVG）の追加実装はしない。これは
  `InkSplatter` / 共通エフェクト側の責務であり、battle 画面の SCSS では扱わない。

## ゴール

Storybook の `Pages/Battle` 配下で以下 4 ストーリーが黒曜カラーで描画され、
`yarn lint` / `yarn test --run` / `yarn tsc -b`（または `yarn build`）が緑。

1. `Default`（mockBattle・雑魚 6 + 味方 5）— ヘッダー（章マーク + 行動順帯）+ 敵エリア（カード wrap）+
   召喚体エリア + 味方エリア（前衛 / 後衛 2 段グリッド）+ ログプレビュー + コマンドパネル（global）
2. `NoLog`（同上・ログプレビュー短）
3. `SkillMenu`（mockBattleSkillMenu）— individual モードでスキル選択中の 2 列カードリスト
4. `BossEncounter`（mockBossBattle）— ボス（md）+ 雑魚 3 + 味方 5・対象選択中（ボスに ring）

---

## レイアウト運用ルール（**§1.5 を厳守**）

`redesign-A.md §1.5` の 8 項目を必ず守る。battle は要素が多いので特に注意:

1. ルートは `display: flex; flex-direction: column; height: 100dvh; max-width: 560px; margin: 0 auto; overflow: hidden;` +
   `padding-bottom: max(20px, env(safe-area-inset-bottom, 0px))`。
2. 縦に `header → battlefield（敵 / 召喚 / 味方）→ log → command` の 4 層を flex item として積む。
3. **可変領域は `.command` ひとつ**（モック準拠で `flex: 1 1 auto; min-height: 0;` を持ち、
   コマンドパネルが画面下端を埋める）。
   - 既存実装では `.battlefield` を `flex: 1` で吸収し、`.command` を flex-shrink: 0 にしている。
     これだと敵 + 味方が多いとき内部スクロールが入り、対象選択時にスクロール位置が動く問題が
     出る可能性がある。**title-fix の流儀**に合わせて「敵 + 味方を `flex-shrink: 0` で
     固定高、コマンドパネルを `flex: 1 1 auto;` で吸収」する形に倒す。
     - 敵 / 味方カードのサイズは clamp で短画面対応する（後述）。
4. ページ全体スクロール禁止。
5. リザルト / 敗北 / 逃走オーバーレイは `position: fixed; inset: 0;` の **装飾レイヤー**として
   許可（モーダル相当）。
6. コマンドパネルのボタンは flex item として積み、`bottom: NN px` は使わない。
7. clamp で敵カードサイズ・味方カードサイズを調整。iPhone SE で要素が重ならないこと。
8. 敵カード幅 `width: clamp(58px, 18vw, 120px)` などで雑魚と md ボスのサイズ差をスケール。

---

## 実装ステップ

### Step 0. 旧 `@use 'variables'` を外す

`src/pages/battle/style.module.scss` の冒頭 `@use 'variables' as var;` を **削除**。
全色を `var(--*)` で書き直す。

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

> 左右 padding は 0。各セクションの内部で `padding: 0 14px;` を取る（モック準拠で
> 敵エリア / 味方エリア / コマンドエリアが背景色の帯として分かれる）。

### Step 2. ヘッダー（章マーク + 行動順帯 + ログプレビュー雛形）

モック line 994〜997 では:

- 上段: `❦ 戦闘 ・ F{depth}` + 右端に「リザルト例 ▸」のチップ（デバッグ用なので **省略**）
- 中段: 「順」+ 行動順アイコン列（活動中のキャラ / 敵を 6〜8 個）
- 下段: 戦闘ログ最新 2 行のインラインプレビュー + 「タップで全ログ」

既存実装の `.chapterMark`（`❦ 戦闘`）はそのまま、その下の「**行動順帯**」だけ新規追加する。
行動順は `state.turnOrder` のような state があるかをまず確認し、無ければ既存ログプレビューだけ
出して **行動順帯は省略**（既存実装には行動順 UI が無いはず・モックは UI モックなので機能未整備）。

```tsx
<header className={styles.head}>
  <div className={styles.headRow}>
    <p className={styles.chapterMark}>❦ 戦闘 ・ F{depth}</p>
    {/* リザルト例ボタンは省略 */}
  </div>
  {/* 行動順帯は機能未実装なので省略（モックダミー UI のため） */}
</header>
```

SCSS:

- `.head`: `flex-shrink: 0; padding: 11px 14px 9px; background: linear-gradient(180deg, rgba(20,16,18,0.96), rgba(11,12,16,0.35)); border-bottom: 1px solid var(--rule-soft);`
- `.headRow`: `display: flex; justify-content: space-between; align-items: center;`
- `.chapterMark`: `margin: 0; font-family: var(--font-display); font-size: 12px; letter-spacing: .3em; color: var(--gold);`

### Step 3. 敵エリア (`.battlefield > .enemies`)

モック (line 999〜1029) は **敵カードを flex-wrap + center justify** で並べる。ボスは
120px 幅 (md スプライト相当)、雑魚は 62px 幅 (sm 相当)。

```scss
.battlefield {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.enemies {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  align-items: flex-end;
  padding: 12px 12px 10px;
  background: radial-gradient(95% 85% at 50% 16%, #241b22, var(--bg-deep) 78%);
}

.enemy {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: clamp(58px, 18vw, 120px);    // ボスは max 120px、雑魚は min 58px
  padding: 6px 6px 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: center;
}

.enemy::before {
  content: '';
  position: absolute;
  inset: -4px;
  border: 1px solid transparent;
  border-radius: 5px;
  pointer-events: none;
  transition: border-color var(--motion-quick);
}

.targeted::before {
  border-color: var(--rule-gold-strong);
}

.enemy:active::before {
  border-color: var(--gold);
}

.flash {
  animation: obsidian-warnBlink 0.4s steps(1) 2;
}

.down {
  opacity: 0.35;
  filter: grayscale(1);
}

.enemyHeader {
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
}

.enemyName {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 9px;
  color: var(--text-base);
}

.enemyNameText {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.enemyMarks {
  flex-shrink: 0;
  font-size: 9px;
}

// 雑魚カードの HP バー（細い）
.enemy .gaugeRow {     // 既存 SCSS の構造に合わせて調整
  height: 3px;
  border-radius: 2px;
  background: rgba(255,255,255,.1);
  overflow: hidden;
}

// ターゲット中だけ表示する耐性コンパクト
.enemyResist {
  margin-top: 4px;
  text-align: left;
}
.targeted .enemyResist {
  min-height: 36px;
}

.inkOverlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
}
```

> モック (line 1008) では耐性チップ（「氷弱」「火耐」）が敵カードに常時表示されている。
> 既存実装ではターゲット中のみ `ResistBadges compact` を出す。**既存仕様を維持**
> （常時表示は情報過多 + 雑魚カード幅が足りない）。

### Step 4. 召喚体エリア (`.summons`)

モック (line 1029) では味方エリア上に「召喚体 ・ 3/3」と並ぶ。

```scss
.summons {
  display: flex;
  gap: 6px;
  padding: 0 14px 8px;
  background: var(--bg-deep);
}

.summonsLabel {        // 新規: 既存実装で「召喚体 ・ N/3」見出しが無ければ追加
  font-size: 9px;
  letter-spacing: .18em;
  color: var(--success);
  padding: 0 14px 4px;
}

.summon {
  flex: 1;
  background: rgba(63, 138, 92, 0.06);
  border: 1px solid rgba(63, 138, 92, 0.25);
  border-radius: 3px;
  padding: 5px 7px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summonName {
  font-size: 9px;
  color: var(--text-base);
  display: flex;
  align-items: center;
  gap: 5px;
}

.summonHp {
  font-family: var(--font-mono);
  font-size: 9px;
  color: var(--success);
}
```

> 召喚体表示は機能上必須（仕様 §2.13・MAX_SUMMONS=3）。モックに描かれているとおり維持。

### Step 5. 味方エリア (`.party`)

モック (line 1031〜1058):

- `前衛` ラベル (gold) + 3列 grid
- `後衛 近接被ダメ −30%` ラベル (blue) + 中央寄せ grid

```scss
.party {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 14px 10px;
  background: var(--bg-mid);
  border-top: 1px solid var(--rule-soft);
  flex-shrink: 0;
}

.rowTag {
  font-size: 9px;
  letter-spacing: .18em;
  color: var(--gold);
  margin: 0;
}

.party > .rowTag:nth-of-type(2) {
  color: var(--info-blue);
}

.cardRow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

// 後衛は 2 列センター寄せ
.party > .rowTag:nth-of-type(2) + .cardRow {
  grid-template-columns: repeat(2, calc((100% - 12px) / 3));
  justify-content: center;
}

.card {
  position: relative;
  padding: 6px;
  background: var(--surface-panel);
  border: 1px solid var(--rule-soft);
  border-radius: 3px;
}

// activeId キャラのカード（既存実装が active クラスを付けるなら）
.cardActive {
  border-color: var(--gold);
  box-shadow: 0 0 0 1px var(--gold-glow);
}

.jobBadge {
  position: absolute;
  top: -4px;
  left: -4px;
  font-family: var(--font-mono);
  font-size: 8px;
  color: var(--bg-mid);
  background: var(--gold);
  border-radius: 2px;
  padding: 1px 4px;
  font-weight: 700;
}

.cardHeader {
  display: flex;
  align-items: center;
  gap: 4px;
}

.cardPortrait {
  width: 18px;
  height: 18px;
  border-radius: 2px;
  background: var(--bg-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.cardHeaderText {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.cardName {
  font-size: 9px;
  color: var(--text-strong);
  display: flex;
  align-items: center;
  gap: 4px;
}

.cardNameText {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cardMarks { flex-shrink: 0; font-size: 9px; }
.uni { color: var(--gold); }

.cardStrategy {
  font-size: 7px;
  font-weight: 700;
  color: var(--bg-mid);
  background: var(--gold-bright);
  border-radius: 2px;
  padding: 0 3px;
}

.cardNums {
  display: flex;
  gap: 4px;
  font-family: var(--font-mono);
  font-size: 8px;
  color: var(--text-faint);
  margin-top: 2px;
}

.gaugeRow {
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 2px;
}

.gaugeLabel {
  font-size: 6px;
  color: var(--text-faint);
  width: 7px;
}

.cardCmd {
  margin-top: 3px;
  font-size: 7px;
  color: var(--gold);
  min-height: 9px;
}

// ダウン状態（HP 0）
.cardDown {
  opacity: 0.4;
  filter: grayscale(1);
}
```

> 既存実装の細かいクラス名（`cardActive` などが無ければ `.card.active` の形）は temas
> ファイル側で踏襲して書くこと。**新クラスは追加せず、既存クラス名のスタイルだけ書き直す**。

### Step 6. ログプレビュー (`.log`)

モック (line 997) では「border-left 2px gold + mono font + 2 行」。

```scss
.log {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 14px;
  background: var(--bg-mid);
  border-top: 1px solid var(--rule-soft);
  border-left: 2px solid var(--gold);
  font-family: var(--font-mono);
  font-size: 10px;
  line-height: 1.5;
  color: var(--text-mute);
  text-align: left;
  cursor: pointer;
  border-radius: 0;
}

.logHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-display);
  font-size: 9px;
  color: var(--gold);
  letter-spacing: .14em;
}

.logHeaderHint { color: var(--text-faint); letter-spacing: 0; }

.logBody {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.logLine {
  color: var(--text-mute);
}

.logLineNew {
  color: var(--text-base);
  animation: obsidian-warnBlink 0.4s steps(1) 1;
}
```

ログオーバーレイ（全履歴）はモック line 1069 のとおり `inset: 0; background: rgba(6,7,10,.93);`:

```scss
.logOverlayBackdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(6, 7, 10, 0.93);
  padding: 20px 18px;
  cursor: pointer;
  overflow-y: auto;
}

.logOverlayHead {
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--gold);
  margin-bottom: 14px;
}

.logOverlayBody {
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 2;
  color: var(--text-mute);
}
```

### Step 7. コマンドパネル (`.command`)

モック (line 1060〜1066) の global / individual / strategy / target / skill すべての
モードを既存実装が同じ `.command` 内で切り替えている。**JSX 構造は触らない**ので、
SCSS だけ各クラスに当てる:

```scss
.command {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 9px;
  padding: 12px 14px 14px;
  background: linear-gradient(180deg, rgba(11,12,16,0), var(--surface-panel) 30%);
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.menuBtn {     // global の「たたかう」プライマリ
  min-height: 50px;
  border-radius: 3px;
  background: linear-gradient(180deg, var(--gold), var(--gold-deep));
  color: var(--bg-mid);
  font-weight: 700;
  font-size: 15px;
  letter-spacing: .12em;
  border: none;
  cursor: pointer;
}

// 「さくせん」「にげる」のサブ行
.menuRow {
  display: flex;
  gap: 9px;
}

.menuBtnSecondary {
  flex: 1;
  min-height: 44px;
  border-radius: 3px;
  border: 1px solid rgba(143, 182, 224, .5);
  background: rgba(111, 159, 216, .1);
  color: var(--info-blue);
  font-size: 14px;
  cursor: pointer;
}

.menuBtnDanger {
  flex: 1;
  min-height: 44px;
  border-radius: 3px;
  border: 1px solid var(--danger-glow);
  background: transparent;
  color: var(--danger-text);
  font-size: 14px;
  cursor: pointer;
}

.cmdHead {
  font-size: 11px;
  color: var(--gold);
  margin: 0 0 8px;
}

// 対象選択ヒント
.target {
  text-align: center;
  padding: 12px;
  border: 1px dashed var(--rule-gold);
  border-radius: 4px;
  color: var(--text-soft);
}

.targetAlly {
  border-color: var(--info-blue);
  color: var(--info-blue);
}

.targetMark {
  font-family: var(--font-display);
  font-size: 11px;
  color: var(--gold);
  letter-spacing: .2em;
  display: block;
  margin-bottom: 6px;
}

.targetName {
  font-size: 13px;
  color: var(--text-strong);
}

.targetHint {
  font-size: 10px;
  color: var(--text-faint);
  margin-left: 6px;
}

// スキル選択（2 列）
.skillList {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7px;
  max-height: 180px;
  overflow-y: auto;
}

.skillBtn {
  text-align: left;
  padding: 7px 8px;
  background: var(--surface-elev);
  border: 1px solid var(--rule-soft);
  border-radius: 3px;
  color: var(--text-base);
  cursor: pointer;
}

.skillBtnDisabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.skillName { font-size: 11px; color: var(--text-strong); }
.skillCost { font-family: var(--font-mono); font-size: 9px; color: var(--info-blue); margin-top: 3px; }
.skillTag  { font-size: 8px; color: var(--text-faint); margin-top: 2px; }

// 作戦変更
.strategyList {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.strategyItem {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border: 1px solid var(--rule-soft);
  border-radius: 3px;
  background: var(--surface-elev);
  color: var(--text-base);
  cursor: pointer;
}

.strategyItemActive {
  border-color: var(--gold);
  background: var(--gold-tint);
  color: var(--gold);
  font-weight: 700;
}

.strategyDesc {
  flex: 1;
  text-align: right;
  font-size: 9px;
  color: var(--text-faint);
}

// 「もどる」サブ
.backBtn {
  min-height: 36px;
  border-radius: 3px;
  border: 1px solid var(--rule-base);
  color: var(--text-mute);
  background: transparent;
  font-size: 12px;
  cursor: pointer;
}
```

### Step 8. リザルト / 敗北 / 逃走 オーバーレイ

#### リザルト (`.resultOverlay` / `.result`)

モック (line 1071) は `position: absolute; inset: 0; background: rgba(6,7,10,.96)` で
画面いっぱい。

```scss
.resultOverlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(6, 7, 10, 0.96);
  padding: 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}

.result { flex: 1; display: flex; flex-direction: column; gap: 14px; }

.resultTitle {
  font-family: var(--font-display);
  font-size: 22px;
  color: var(--gold);
  text-align: center;
  letter-spacing: .2em;
  text-shadow: 0 0 20px var(--gold-glow);
}

.resultBody { color: var(--text-base); font-size: 13px; line-height: 1.8; }

.expList { display: flex; flex-direction: column; gap: 10px; }

.expRow {
  background: var(--surface-panel);
  border: 1px solid var(--rule-gold);
  border-radius: 4px;
  padding: 12px 14px;
}

.expName {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--text-strong);
}

.expLv { font-family: var(--font-mono); font-size: 12px; color: var(--gold); }
.expUp { color: var(--success); margin-left: 4px; }

.victoryGold {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: var(--gold-tint);
  border: 1px solid var(--rule-gold);
  border-radius: 3px;
  color: var(--gold);
  font-family: var(--font-mono);
  font-size: 14px;
}

.primary {        // 「ダンジョンへ戻る」ボタン
  min-height: 50px;
  border-radius: 3px;
  background: linear-gradient(180deg, var(--gold), var(--gold-deep));
  color: var(--bg-mid);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: .12em;
  border: none;
  cursor: pointer;
  margin-top: auto;
}
```

#### 敗北（モック 9d）

ロジック側で defeat オーバーレイを既に出している前提。背景・タイポを黒曜に:

```scss
.defeatOverlay {       // 既存クラス名に合わせて命名（無ければ追加して JSX 側も微調整）
  position: fixed;
  inset: 0;
  z-index: 100;
  background: radial-gradient(circle at 50% 45%, rgba(120, 20, 24, .3), #0a0608 65%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 40px 20px max(40px, env(safe-area-inset-bottom, 0px));
}

.defeatTitle {
  font-family: var(--font-display);
  font-size: clamp(36px, 11vw, 46px);
  color: var(--danger);
  letter-spacing: .3em;
  text-shadow: 0 0 30px rgba(178, 60, 48, 0.6);
}

.defeatBody {
  font-size: 13px;
  color: var(--text-mute);
  line-height: 1.9;
  text-align: center;
}

.defeatAction {
  margin-top: 22px;
  min-height: 50px;
  width: clamp(180px, 56vw, 220px);
  border: 1px solid var(--rule-gold-strong);
  border-radius: 3px;
  background: var(--gold-tint);
  color: var(--gold);
  font-size: 13px;
  letter-spacing: .16em;
  cursor: pointer;
}
```

#### 逃走成功（モック 9e）

```scss
.fleeOverlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: radial-gradient(80% 70% at 30% 45%, #1a1f2b, var(--bg-deep) 75%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 20px;
}

.fleeTitle {
  font-family: var(--font-display);
  font-size: clamp(24px, 8vw, 30px);
  color: var(--success);
  letter-spacing: .2em;
}

.fleeBody { font-size: 13px; color: var(--text-faint); }

.fleeAction {
  margin-top: 30px;
  min-height: 48px;
  width: clamp(180px, 56vw, 220px);
  border-radius: 3px;
  background: linear-gradient(180deg, var(--gold), var(--gold-deep));
  color: var(--bg-mid);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: .12em;
  border: none;
  cursor: pointer;
}
```

#### intro オーバーレイ（モック 9b・エンカウント開始）

既存実装に intro オーバーレイがあれば、背景 `radial-gradient(circle at 50% 42%, rgba(120,30,28,.22), transparent 62%)` + 中央封蝋スタンプ風（既存の `InkSplatter` variant='seal' があれば
それを使う・無ければ簡素な glow）に整える。**無ければ追加しない**（intro 演出は別タスク）。

### Step 9. 演出フラッシュ・ユニオン

- `.unionBanner` 系は既存命名を踏襲し、`background: var(--gold-tint); border: 1px solid var(--gold); color: var(--text-strong);` で整える。
- ユニオンキャンセル `.unionCancel`: ghost ボタン (`border: 1px solid var(--rule-base); color: var(--text-mute); background: transparent;`)。

### Step 10. ストーリー追加（任意）

既存 4 ストーリー（`Default` / `NoLog` / `SkillMenu` / `BossEncounter`）は維持。`Strategy`
（さくせん変更 UI を開いた状態）を撮りたければ `Battle.stories.tsx` に `__storyMockOpenStrategy: true`
の仕掛けがあるか確認し、無ければ play で「さくせん」ボタンを click するストーリーを追加してよい。
必須ではない。

---

## 機能優先で省略 / 追加するもの

### 省略（モックにあるが現状機能に無い）

- モック line 996 の **行動順帯** (`順 [icon][icon]...`): 行動順の UI 表示は現状無い
  （内部的に `pickAutoCommand` で逐次解決はしているが、ユーザーに事前公開する UI はない）。
  仕様未定義なので **省略**。
- モック line 1063 個別 UI の **「ガード（防御）」ボタン**: 仕様 §2.13 にはガード（防御）
  が存在するが、既存実装の個別コマンドが `攻撃 / 防御 / スキル / アイテム` の 4 ボタンを
  どこまで描画しているかを `src/pages/battle/index.tsx` 内の **JSX のみ目視確認**して、
  既存に「防御」が無ければ **追加しない**（仕様変更扱い）。既存にあれば SCSS だけ装飾する。
- モック line 1063〜1064 の **個別コマンド内「もどる」**: 既存実装でモード遷移の戻りボタン
  があるはず。SCSS は `.backBtn` で対応する。
- モック line 1087 の **攻撃エフェクト 7 種 SVG**: `InkSplatter` 等の共通エフェクト責務
  なので battle 画面では扱わない。
- モック line 1091 の **「会心 / 被弾 / 詠唱 / 回復 / 召喚 / 撃破 / ユニオン / エンカウント」
  汎用 FX**: 同上。

### 維持 / 追加（機能上必要・モックに無くても残す）

- **召喚体エリア**: モック line 1029 にも描かれているが、無くても残す。MAX_SUMMONS=3 を満たす。
- **ターゲット中の敵カードに耐性コンパクト表示** (`ResistBadges compact`): 仕様 §4.9 で
  必須。`.targeted .enemyResist { min-height: 36px; }` で領域確保。
- **状態異常マーク** (`🔒 / 🌀`) と **作戦短縮ラベル** (`ガ / バ / 命 / TP / 命令`):
  仕様 §4.9 で必須。`.ailMark` / `.cardStrategy` に黒曜カラーで装飾。
- **個別 UI の `▶ {cmdLabel}` 表示**: 既存実装の `.cardCmd` を維持。

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

すべて緑であること。**battle はテストが厚い**ので、構造変更でテストが落ちた場合は
**SCSS を直すのではなく、JSX 変更を最小限に巻き戻す**こと（assert 文を変えないのが原則）。

Storybook（`yarn storybook --host 0.0.0.0`）で `Pages/Battle` の 4 ストーリーが
黒曜カラーで描画され、敵 6 + 味方 5 がすべて画面内に収まり、コマンドパネルが下端を占めて
いることを目視確認。

---

## ブランチ / コミット

現在の `feature/redesign-A` ブランチで作業する。コミットを 1 つ追加して commit SHA を
報告（push はしない）。

```
feat(theme): apply 黒曜 OBSIDIAN MINIMAL to battle page

- repaint enemy / summon / party / log / command surfaces with obsidian tokens
- clamp enemy card width so 6 zako + boss md fit within iPhone SE dvh
- restyle result / defeat / flee overlays as fixed inset modals
- keep JSX logic and existing test assertions untouched

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## 想定 Q&A

- **敵カードに `width: clamp(58px, 18vw, 120px)` を当てるとボス（md）と雑魚（sm）が同じ
  幅になって寸詰まり**: ボスカードに専用クラス（`.enemyBoss`）が既に付いているかを
  `index.tsx` で **目視確認**する。付いていれば `.enemyBoss { width: clamp(96px, 28vw, 140px); }`
  でオーバーライド。付いていなければ、`EnemySprite` の size prop（`md` / `sm`）に応じた
  外側ラッパを分けるよう JSX を最小調整してよい（**それ以外の JSX は触らない**）。
- **行動順帯を出すべき?**
  出さない（理由は「省略するもの」の冒頭を参照）。
- **「ガード（防御）」ボタンが既存実装にあるか確認したい**:
  `index.tsx` の Step 7 で示した `.cmdHead` が出る個別 UI の `if (isIndividual)` ブロック
  を **目視確認**する。`<button ...>防御</button>` のような行があれば SCSS だけあてる。
  なければ追加しない（仕様変更扱い）。
- **モックの「攻撃 7 種カラーバッヂ」を入れたい**:
  入れない（共通エフェクトの責務）。
- **`.command` を `flex: 1 1 auto;` にしたら敵カードが詰まって `EnemySprite` が縮む**:
  `.enemies` に `flex-shrink: 0; min-height` を持たせる。`min-height` は雑魚 6 体ぶんの
  実測値で OK（例: `min-height: 130px;`）。それ以上の縮みが必要な短画面は媒体側で
  `@media (max-height: 720px)` で更にカードサイズを縮める。
- **既存テストで `getByText('たたかう')` などが使われていたら**:
  ボタン文言を変えないので通る。
- **リザルトのレベルアップダイアログを LIFO で積み上げる仕様（§2.14-7）はどう実装する?**
  既存実装が `.expRow` を `.map` で描画していれば、SCSS だけ装飾する。LIFO の積み上げ
  順序ロジックは触らない。

不明点が出たら止めて報告すること。
