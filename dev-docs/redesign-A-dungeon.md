# dungeon — リデザイン案 A v2 取り込み（**改訂版 v3 — 差分修正**）

v2 実装は完了済みだが、ユーザーから「まだデザインと異なる部分がある」と指摘あり。
本指示書では v2 適用後の現状（`pages-dungeon--default.png` / `pages-dungeon--menu.png`）と
モック原本 `/tmp/sekaiju-design/案A_v2.dc.html` line 818〜982 を精密に照合し、**残った差分だけを潰す**。

参照ファイル:

- 全体テーマ: `dev-docs/redesign-A.md`（§1 デザイントークン / §1.5 レイアウト運用ルール）
- 既存実装: `src/pages/dungeon/index.tsx`, `src/pages/dungeon/style.module.scss`
- 現状スクショ: `/tmp/sekaiju-screenshots-current/pages-dungeon--default.png`,
  `/tmp/sekaiju-screenshots-current/pages-dungeon--menu.png`

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい

- `src/pages/dungeon/index.tsx`
- `src/pages/dungeon/style.module.scss`
- `src/pages/dungeon/Dungeon.stories.tsx`（ストーリー追加可、既存 assert は変えない）

### 触ってはいけない

- `src/components/common/FirstPersonView/`
- `src/components/common/DungeonMap/`
- `src/components/common/EncounterGauge/`
- `src/components/common/StatBar/` `BattleExpBar/` `InkSplatter/`
- `src/components/common/SkillTree/`（**スキルツリーは現状の方が良いとユーザー指示。デザイン無視**）
- `src/components/common/CharacterPortrait/` `EnemySprite/` `ItemSprite/`
- `src/domain/` 全般（特に `dive.ts`, `movement.ts`, `encounter.ts`, `gather.ts`, `cooking.ts`, `itemUse.ts`）
- `src/_obsidian.scss` の既存トークン値
- 既存テスト assert

---

## 2. やってはいけないこと

- **Agent / Task ツールを spawn しない**。自分で Edit / Write / Bash する。
- `SkillTree` 共通コンポは触らない（モックに無いが現状の方が良いとユーザー判断済み）。
- `FirstPersonView` / `DungeonMap` の中身を触らない。サイズや配置はコンテナ側で制御する。
- ☰ メニュー内のキャラ詳細 / スキル振り画面は機能を絶対残す（モックでは省略されているが、
  guild-char と異なる「ダイブ中スキル振り」機能なので削除しない）。

---

## 3. モックとの差分一覧

現状スクショ × モック比較で観測された差分のみを列挙する。

### A. FPV 帯のサイズと UI 重なり — **致命的**

| # | 場所 | 現状 | モック |
| --- | --- | --- | --- |
| A1 | `.fpvWrap` 高さ | `clamp(180px, 28dvh, 232px)` — 短画面で 180px まで縮む | モック固定 `height: 232px`。背景の通路 SVG / D-pad / ヘッダーすべてを 232px の中に収める |
| A2 | D-pad の表示位置 | `bottom: 10px` で FPV 内に積むが、FPV が縮むと `↻` ボタンと階段確認カードや F2 ラベルが重なる（スクショ参照） | モックは固定 232px の中央下に D-pad + 振り向きが収まる構造。`fpvWrap` が縮むことを禁止 |
| A3 | F2 ラベルが D-pad に重なる | 現状スクショで `F2` `樹海` が D-pad 左折ボタンと重なって読めない | モックは F2 ラベルが top-left、D-pad は中央下、重ならない |

→ `.fpvWrap` を `height: 232px` 固定（min/max とも 232px）にして、その内側の絶対配置が
モック通り機能するようにする。短画面では下のマップ領域を内部スクロールで吸収させ、
**FPV 帯は縮めない**。

### B. AUTOMAP の表示比 — マップが広すぎ

| # | 場所 | 現状 | モック |
| --- | --- | --- | --- |
| B1 | `.mapCard` 内の `DungeonMap` の高さ | 親要素に合わせて伸縮 → 未踏破セルでベージュ領域が大きく描画される | モックは固定 360×384px (SVG viewBox)。マップは内部スクロール可だがコンテナ高は概ね 320-360px に抑える |
| B2 | マップ周囲のパディング | `padding: 14px 16px` の `mapCard` 内パディング | モック準拠 OK だが、コンテナ自体に `max-height` を設けて短画面でスクロール可に |
| B3 | `.mapLegend` 色 | 凡例の `🌿 採集` の色が暗い | モック: `flex-wrap: wrap; gap: 14px; font-size: 9px; color: var(--text-quote)` — 文字サイズ小さく薄め |

### C. ☰ メニュー — ディムが弱い / 階層情報の二重表示

| # | 場所 | 現状 | モック |
| --- | --- | --- | --- |
| C1 | `.menuOverlay` 背景 | 半透明 black overlay があるが弱め、下の FPV / マップが透けて見える | モック: `position:absolute;inset:0;background:rgba(6,7,10,.78)` の上にメニューパネル。さらに root に `linear-gradient(180deg,#0d141a,#070b0f)` を敷き重ねて完全に遮蔽 |
| C2 | メニュー左上の `F2・樹海` | `bandThemeFor(dive.depth).name` で `樹海` 等 | OK |
| C3 | ☰ ボタンがメニュー開放後も上に残る | 現状スクショで `☰` がメニューの ✕ ボタンの**裏**に表示されてしまう | メニューモーダルが全画面前面に来るので ☰ は隠れるべき。`menuOverlay` の `z-index` を上げる |

### D. パーティ行 — レイアウト微妙な差

| # | 場所 | 現状 | モック |
| --- | --- | --- | --- |
| D1 | `.menuMember` リーダー枠 | 現状: 1 人目だけ `menuMemberLeader` 枠 | モックも 1 人目に `border:1px solid rgba(201,168,106,.3)` の金枠 — OK だが現状の値と比較必要 |
| D2 | キャラポートレイト枠 | 32×32 (`size={28}`) | モック: `width:32px;height:32px;border-radius:3px;background:#0c0d11` の枠 + 中に 28px スプライト |
| D3 | 名前と Lv の font-size | 12px / 9px | モックと一致 OK |
| D4 | HP/TP バー高さ | 3px | モックと一致 OK |
| D5 | 右端 ➜ | `var(--gold)` | モック `#c9a86a` = OK |

### E. アクショングリッド（2x2）— モック準拠だが微差

| # | 場所 | 現状 | モック |
| --- | --- | --- | --- |
| E1 | `🎒 道具を使う` の active 背景 | `#1a2030` 系 | モック: `background:#1a2030;border:1px solid rgba(201,168,106,.4)` — OK |
| E2 | `🪢 帰還の糸` の active/disabled | `threadCount > 0` で active, それ以外で押下時何もしない（disabled 属性なし） | モック: `border:1px solid rgba(143,208,160,.35)` の緑枠で常時 active 風だが、所持数 0 のときは disabled 化推奨 → `disabled` 属性追加 |
| E3 | `⚙ 設定` `🗺 全体マップ` | `disabled` | モックは disabled マーク無し（**ユーザー指示「基本デザイン忠実」**: 設定は実装、全体マップは v3 でも未実装で可だが、見た目は disabled の凹みではなく**通常ボタン色**にして、押下時は notice メッセージ「準備中」を表示する。disabled 属性ではなく opacity を下げない） |

→ E3 の方針:
- `⚙ 設定`: ボタン自体は通常スタイル、押下時 `setNotice('設定は次バージョンで実装予定')`。
- `🗺 全体マップ`: 同様に通常スタイル + 押下時 `setNotice('全体マップは次バージョンで実装予定')`。
- 機能優先で disabled にした v2 の判断を**撤回**してデザイン側に合わせる。

### F. 階段確認カード — モックは画面下部の独立カード

| # | 場所 | 現状 | モック |
| --- | --- | --- | --- |
| F1 | `.stairsCard` 位置 | マップの下に inline で常駐 | モック (line 915): `position:absolute;left:16px;right:16px;bottom:16px;background:#15171f;border:1px solid rgba(201,168,106,.3)`。下に独立配置 |
| F2 | `やめる` ボタンの動作 | 何もしない（`/* noop */`） | やめるは押されたら**確認カード自体を閉じる**べき。`useState` で「dismiss」フラグを持ち、stairs 上を踏み直したら再表示するロジックが必要。**現状の noop は UX として崩壊している**ので修正必須 |

→ 「やめる」を押した時の動作:
- `dismissedStairs: { depth: number; pos: {x,y} } | null` の state を追加。
- やめるを押したら現在位置を dismiss に保存。位置が変わったら dismiss を解除。
- レンダー条件に `dismissedStairs === null` または `dive.pos が dismiss と異なる` を追加。

### G. 採集カード / 調理カード — モック準拠だが装飾不足

| # | 場所 | 現状 | モック |
| --- | --- | --- | --- |
| G1 | `.gatherCard` 背景 / 枠 | `#15171f` 系 | モック (line 900): `background:#0e131a;border:1px solid rgba(143,208,160,.3);border-radius:5px;padding:14px` |
| G2 | `gatherSparkle` ✦ アニメ | あり (`gatherSparkle`) | OK |
| G3 | `.cookCard` 背景 / 枠 | 現状の色味 | モック (line 909): `border:1px solid rgba(216,168,111,.3)`（金茶縁） |
| G4 | 調理の `🍲 + 蒸気〜` のアニメ | 蒸気エフェクトなし | モック: `position:relative;font-size:18px;🍲` + `position:absolute` の 2 つの `〜` (色 `#d8c0a0`, animation `steamRise`) |

→ steamRise は v3 で追加実装（`@keyframes steamRise { 0% { opacity: 0; transform: translateY(0) } 50% { opacity: 1 } 100% { opacity: 0; transform: translateY(-8px) } }`）。

### H. 道具を使う bottom-sheet — 表示が大きすぎる

| # | 場所 | 現状 | モック |
| --- | --- | --- | --- |
| H1 | `.itemOverlay` | 全画面オーバーレイで上の所持アイテム + 下の sheet | モック: 上半分はアイテム一覧、下半分（`position:absolute;left:0;right:0;bottom:0`）が bottom sheet、間に黒スペース |
| H2 | `.itemSheet` ハンドル | `40px / 4px` の灰バー | OK |
| H3 | 対象選択での「使う」ボタン位置 | 行末に独立 | モック (line 975): 対象セル内右端に `border:1px solid rgba(143,208,160,.5);padding:3px 8px;font-size:10px;color:#9ed8b4` のコンパクトな「使う」チップ。HP+120 のフロート pop は推奨選択行のみに |

### I. エンカウントゲージ帯 — スマホでの密度

| # | 場所 | 現状 | モック |
| --- | --- | --- | --- |
| I1 | `.gaugeRow` padding | OK | モック (line 844): `padding:9px 16px;background:#0a0c10;border-bottom:1px solid rgba(255,255,255,.06)` |
| I2 | EncounterGauge の5段ピップ | `EncounterGauge` が描画 — モック準拠 OK | OK |

---

## 4. ゴール

1. FPV 帯を `height: 232px` 固定にして UI 重なりを根絶。
2. AUTOMAP コンテナに `max-height` を持たせ、未踏破の広大なベージュが画面を支配しないようにする。
3. ☰ メニューモーダルのディムを強化して下層 UI を完全に遮蔽し、☰ ボタンとの z-index 競合を解消。
4. 階段確認カードの「やめる」を本当に閉じる挙動に修正。
5. `⚙ 設定` `🗺 全体マップ` を **disabled ではなく押下可能** にし、押下時に notice を出す（モック忠実化）。
6. 採集カード / 調理カードのモック忠実化（緑/金茶縁、蒸気エフェクト）。
7. 道具 bottom-sheet 内の「使う」を行末コンパクトチップ化。
8. test / lint / tsc 全緑、Storybook の `pages/dungeon` 系ストーリーが黒曜テーマで描画。

---

## 5. 実装ステップ

### Step 1 — FPV 帯の高さ固定

`style.module.scss`:

```scss
.fpvWrap {
  position: relative;
  height: 232px;       // clamp を撤廃
  flex: 0 0 232px;
  overflow: hidden;
}
```

`.depthLeft`, `.bossGateOmen`, `.menuBtn`, `.fpvControls` の `z-index` を整理:

```scss
.depthLeft, .bossGateOmen, .menuBtn { z-index: 2; }
.fpvControls { z-index: 2; }
```

### Step 2 — AUTOMAP コンテナ高さ抑制

`.mid` を flex item として `flex: 1 1 auto; min-height: 0; overflow: hidden` に。
内部の `.mapCard` を `max-height: 360px; overflow: hidden`、その中の `DungeonMap`
コンテナは元のサイズロジック維持（コンポネを触らないため）。

```scss
.mid {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;          // 短画面はマップ下のアクションが見切れない様にスクロール
  padding: 14px 16px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.mapCard {
  background: #0a0c10;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 5px;
  padding: 8px;
  max-height: 360px;
  overflow: hidden;
}
```

### Step 3 — ☰ メニューモーダルのディム強化と z-index

```scss
.menuOverlay {
  position: absolute;
  inset: 0;
  z-index: 50;                                  // FPV / ☰ ボタンより手前
  background:
    linear-gradient(180deg, #0d141a, #070b0f),  // 完全遮蔽
    rgba(6, 7, 10, 0.78);
  display: flex;
  flex-direction: column;
  padding: 16px 20px 18px;
}
```

`.menuPanel` は `flex: 1; display: flex; flex-direction: column; gap: 14px` で内側を縦積み。

### Step 4 — 階段確認カードの「やめる」を機能させる

`index.tsx`:

```tsx
const [dismissedStairsAt, setDismissedStairsAt] = useState<{ depth: number; x: number; y: number } | null>(null);

// 位置が変わったら dismiss を解除
useEffect(() => {
  if (!dive) return;
  if (!dismissedStairsAt) return;
  if (
    dismissedStairsAt.depth !== dive.depth ||
    dismissedStairsAt.x !== dive.pos.x ||
    dismissedStairsAt.y !== dive.pos.y
  ) {
    setDismissedStairsAt(null);
  }
}, [dive?.depth, dive?.pos.x, dive?.pos.y, dismissedStairsAt]);

const showStairsCard =
  stairKind &&
  !(
    dismissedStairsAt &&
    dismissedStairsAt.depth === dive.depth &&
    dismissedStairsAt.x === dive.pos.x &&
    dismissedStairsAt.y === dive.pos.y
  );

// レンダー: {stairKind && showStairsCard && ( ... 階段カード ... )}
// やめるボタン onClick:
//   setDismissedStairsAt({ depth: dive.depth, x: dive.pos.x, y: dive.pos.y });
```

### Step 5 — `⚙ 設定` `🗺 全体マップ` を notice 化

```tsx
<button
  type="button"
  className={styles.menuActionSetting}
  onClick={() => {
    play('cursor');
    setNotice('設定は次バージョンで実装予定');
  }}
>
  <span className={styles.menuActionIcon}>⚙</span>
  <span className={styles.menuActionLabel}>設定</span>
</button>

<button
  type="button"
  className={styles.menuActionMap}
  onClick={() => {
    play('cursor');
    setNotice('全体マップは次バージョンで実装予定');
  }}
>
  <span className={styles.menuActionIcon}>🗺</span>
  <span className={styles.menuActionLabel}>全体マップ</span>
</button>
```

`disabled` 属性は付けない。SCSS の `:disabled` ルールも当該クラスから外す。

帰還の糸も `threadCount === 0` の時は `setNotice('帰還の糸がない')` を出すように。

### Step 6 — 採集/調理カードの装飾整合

```scss
.gatherCard {
  background: #0e131a;
  border: 1px solid rgba(143, 208, 160, 0.3);
  border-radius: 5px;
  padding: 14px;
  margin-top: 8px;
}
.gatherTitle { font-size: 13px; color: #9ed8b4; font-weight: 700; }
.gatherSparkle { font-size: 16px; animation: gatherSparkle 1.6s ease-in-out infinite; }

.cookCard {
  background: #0e131a;
  border: 1px solid rgba(216, 168, 111, 0.3);
  border-radius: 5px;
  padding: 14px;
  margin-top: 8px;
}
.cookIcon {
  position: relative;
  font-size: 18px;
}
.cookIcon::before, .cookIcon::after {
  content: '〜';
  position: absolute;
  top: -10px;
  color: #d8c0a0;
  font-size: 11px;
  animation: steamRise 1.8s ease-in-out infinite;
}
.cookIcon::before { left: 4px; }
.cookIcon::after  { left: 12px; animation-delay: 0.6s; }
.cookTitle { font-size: 13px; color: #e0b07c; font-weight: 700; }

@keyframes steamRise {
  0%   { opacity: 0; transform: translateY(0); }
  50%  { opacity: 1; }
  100% { opacity: 0; transform: translateY(-8px); }
}
```

`prefers-reduced-motion: reduce` 時は `animation: none` を加える。

### Step 7 — 道具 bottom-sheet の「使う」をコンパクトチップ化

```scss
.itemTargetRow {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #1a1d26;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  padding: 9px 11px;
}
.itemTargetRow.recommended { border-color: rgba(143, 208, 160, 0.5); }
.itemTargetUseBtn {
  font-size: 10px;
  color: var(--success);
  border: 1px solid rgba(143, 208, 160, 0.5);
  border-radius: 2px;
  padding: 3px 8px;
  background: transparent;
  flex: none;
}
.itemTargetRowDisabled .itemTargetUseBtn { display: none; }
.itemTargetFullText {
  font-size: 9px;
  color: var(--text-quote);
}
```

「推奨セル」(`recommended`) は現状の `isLowHp(p.hp, maxStat.hp)` を流用して
HP が 50% 以下のメンバーに付与すると、モックの最初のセル (緑枠) と一致する。

### Step 8 — `.menuOverlay` 上の F2 ☰ 重なり修正

`.menuBtn` を `z-index: 1` のまま、`.menuOverlay` を `z-index: 50` にする
（Step 3 で対応済み）。確認: メニュー開放後 ☰ が完全に隠れること。

---

## 6. 検証

```bash
yarn lint
yarn test
yarn tsc -b   # または yarn build
```

加えて、以下のスクショを撮って差分が消えていることを目視確認:

- `pages/dungeon` の `default`（FPV + マップ + 階段カード）
- `pages/dungeon` の `menu`（☰ メニュー全景）

特に確認:
- F2 ラベルと D-pad が重ならないこと。
- ☰ メニュー開放時、下層の FPV / マップが透けないこと。
- 階段確認の「やめる」を押すと階段カードが消えて再度マスを踏み直すまで再表示されないこと。
- `⚙ 設定` `🗺 全体マップ` を押すと notice が出ること。

撮影は `dev-docs/screenshot-setup.md` の Storybook セクション準拠。Noto Sans JP 必須。

---

## 7. コミット

メッセージ例:

```
refactor(dungeon): モック忠実化 v3 — FPV 固定/メニュー遮蔽/階段やめる挙動

- FPV 帯を 232px 固定にして D-pad と F2 ラベルの重なりを根絶
- AUTOMAP コンテナに max-height を設定、未踏破ベージュの肥大化を抑制
- ☰ メニューオーバーレイのディムを強化、z-index を 50 に上げて完全遮蔽
- 階段確認カードの「やめる」を機能化（位置変更まで dismiss を保持）
- ⚙ 設定 / 🗺 全体マップを disabled から notice 表示に変更
- 採集/調理カードの border 色を緑/金茶で揃え、調理に steamRise アニメを追加
- 道具 bottom-sheet の「使う」を行末コンパクトチップに整理
```

push しない。ディレクターに commit SHA を報告する。
