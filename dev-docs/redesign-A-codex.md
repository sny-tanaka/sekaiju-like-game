# codex — リデザイン案 A v2 取り込み（**改訂版 v3 — 差分修正**）

v2 実装は完了済みだが、ユーザーから「まだデザインと異なる部分がある」と指摘あり。
本指示書では v2 適用後の現状（`pages-codex--default.png` / `pages-codex--codex-tab.png`）と
モック原本 `/tmp/sekaiju-design/案A_v2.dc.html` line 745〜812 を精密に照合し、**残った差分だけを潰す**。

参照ファイル:

- 全体テーマ: `dev-docs/redesign-A.md`（§1 デザイントークン / §1.5 レイアウト運用ルール）
- 既存実装: `src/pages/codex/index.tsx`, `src/pages/codex/style.module.scss`
- 現状スクショ: `/tmp/sekaiju-screenshots-current/pages-codex--default.png`,
  `/tmp/sekaiju-screenshots-current/pages-codex--codex-tab.png`

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい

- `src/pages/codex/index.tsx`
- `src/pages/codex/style.module.scss`
- `src/pages/codex/Codex.stories.tsx`（ストーリー追加は可、既存 assert は変えない）

### 触ってはいけない

- `src/components/common/` 配下すべて（`EnemySprite`, `ItemSprite`, `ResistBadges` など）
- `src/domain/codex.ts` / `src/domain/ailment.ts`（API シグネチャ）
- `src/data/enemies.ts`
- `src/_obsidian.scss` の既存トークン値
- 既存テスト assert

---

## 2. やってはいけないこと

- **Agent / Task ツールを spawn しない**。自分で Edit / Write / Bash する。
- `ENEMIES`・`bossDefeatLog` のスキーマを変えない。
- ボス撃破履歴の解決ロジック（現状 `Math.ceil(e.tierBand * 10) >= depth` で間違って `"5F のボス"`
  と表示される）の修正には domain 側を触らない。`bossDefeatLog` の各エントリの `enemyId`
  を optional で参照し、解決できなければ `"{depth}F のボス"` をフォールバックとして残す。
- 写本テーマ依存（`Kaisei Tokumin` フォント、`var.$parchment` 等の SCSS 変数）を**完全に排除**する。

---

## 3. モックとの差分一覧

現状スクショ × モック比較で観測された差分のみを列挙する。

### A. 写本テーマの残骸 — **致命的**

| # | 場所 | 現状 | モック / 期待 |
| --- | --- | --- | --- |
| A1 | `style.module.scss` 1 行目 | `@use 'variables' as var;` | `@use 'obsidian';` に置換、または `@use` 文を削除して全 `var(--*)` 化 |
| A2 | 各セレクタ | `color: var.$ink`, `background: var.$parchment-card` 等の写本変数参照 | `color: var(--text-base)`, `background: var(--surface-panel)` 等の CSS 変数へ全置換 |
| A3 | `.chapterMark`, `.statCardBossName`, `.bossDetailName` | `font-family: 'Kaisei Tokumin', serif` | `font-family: var(--font-display)`（Shippori Mincho） |
| A4 | `.statCardNum`, `.bossMeta`, `.statCardBossTier`, `.codexSummaryText` | `font-family: 'JetBrains Mono', monospace` 直書き | `font-family: var(--font-mono)` |
| A5 | `.title` | `font-size: 24px; font-weight: 900` の大見出し | モック値 `font-family: var(--font-display); font-size: 18px; font-weight: 400; color: var(--text-strong)` |
| A6 | `.bossRow`, `.statCard` | `border: 0.75px solid var.$rule` | `border: 1px solid var(--rule-soft)`、`border-radius: 4px`（statCard）/`3px`（bossRow） |
| A7 | `.tabActive` | アクティブ背景は写本由来 `var.$illumination-gold` | `background: var(--gold)`、`color: var(--bg-mid)`、`border-radius: 3px 3px 0 0`（モック準拠） |

### B. ヘッダー構造 — タイトルが大きすぎる

| # | 場所 | 現状 | モック |
| --- | --- | --- | --- |
| B1 | `<header>` 章マーク + h1 | `❦ 台帳` + 24px/900 の `図鑑 / 記録` を画面上端で2段表示 | モックは章マーク無し。パネル内側の左上に `font-family:Shippori Mincho;font-size:18px;color:#f2ede1` で「図鑑 / 記録」のみ |
| B2 | h1 直下の `border-bottom` 区切り線 | 横一本線 | モックには無い（区切りはタブの下の `border-bottom: 1px solid rgba(255,255,255,.08)` だけ） |

→ **`<p className={styles.chapterMark}>❦ 台帳</p>` は削除**し、`<h1 className={styles.title}>`
を 18px / display フォントに縮める。`.head` の `border-bottom` は外す。

### C. 到達記録タブ — ボス撃破履歴の表記が壊れている

| # | 場所 | 現状 | モック |
| --- | --- | --- | --- |
| C1 | `.bossName` | `"5F のボス"` のような暫定文言 | モックは `門番ゴーレム` 等の実名 + `45F ・ 12:01` 形式の時刻メタ |
| C2 | `.bossMeta` | `{b.depth}F` だけ | `{depth}F ・ {time}` 形式（時刻が無い場合は `{depth}F` のみ） |
| C3 | `.bossRow` 左端 | `.bossStamp` の `✦` だけ（左寄せ） | モックは **38×38px のスプライト枠**（中央にスプライト or 絵文字）+ `bossStamp` は右端に `transform:rotate(-12deg)` |

→ `bossDefeatLog` の各エントリは `{ depth, enemyId?, defeatedAt? }` を想定。
  - 名前: `b.enemyId && ENEMIES[b.enemyId]?.name` を優先、無ければ `"{depth}F のボス"` を保持。
  - 時刻: `b.defeatedAt` が `number`（unix ms）なら `HH:MM` 形式に整形。無ければ depth だけ。
  - 左端の 38×38 px スプライト枠: `<EnemySprite size="sm">` で表示、enemyId 不明時は `'👹'` 絵文字。
  - 右端の `✦` スタンプは現状の `.bossStamp` を踏襲。

### D. 統計カード（`.statCard`）— モック忠実度

| # | 場所 | 現状 | モック |
| --- | --- | --- | --- |
| D1 | `.statCardNum` カラー | `var.$illumination-gold` | `color: var(--gold)`、`font-size: 24px`、単位 `font-size:13px;color:var(--text-mute)` |
| D2 | `.statCard` 背景 | `var.$parchment-card` | `background: var(--surface-panel)` + `border: 1px solid var(--rule-soft)` + `border-radius: 4px` + `padding: 14px` |
| D3 | `.statCardBossName` | `font-family:'Kaisei Tokumin'` の写本残骸 | `var(--font-display)` 15px / `var(--text-strong)` |

### E. 図鑑タブ — 詳細カード周りの装飾

| # | 場所 | 現状 | モック |
| --- | --- | --- | --- |
| E1 | `.bossDetail` 背景 | `linear-gradient(120deg, var.$parchment-card, var.$parchment)` | `linear-gradient(120deg, #231a1c, var(--bg-mid))`、border は `1px solid rgba(212,103,79,0.4)` |
| E2 | `.bossDetailSprite` | 66×66 枠 / `border: 0.75px solid var.$rule` | `66×66 / border:1px solid rgba(212,103,79,0.3) / background: var(--bg-deep)` |
| E3 | `.badge` (撃破バッジ) | `background-color: var.$vermilion` | `background: var(--danger-glow); color: var(--bg-mid); font-weight: 700; padding: 1px 6px; border-radius: 2px;` |
| E4 | `.bossDetailResist` | ResistBadges を 2 個（属性 + 状態異常）バラバラに上下に並べる | モックは `margin-top: 7px` で**横一列**にチップを並べる。コンポは触らないので現状の 2 個並列のままで OK だが `margin-top: 4px` を `7px` に揃える |
| E5 | `.dropRow` の各 dropCell | 文字「ゴーレムの核 / 未入手」のみ | モックは **26×26 のサブアイコン枠**（`background: var(--surface-panel)`）+ 名前。`ItemSprite size="sm"` を使う |

### F. グリッド — 枠線/凡例

| # | 場所 | 現状 | モック |
| --- | --- | --- | --- |
| F1 | `.cellSeen` 枠色 | `rgba(63, 107, 74, 0.5)`（暗緑） | `rgba(143,208,160,.4)`（明緑） |
| F2 | `.cellDefeated` 枠色 | `rgba(63, 107, 74, 0.9)` | `rgba(143,208,160,.4)` で `cellSeen` と同じ色、背景にほんのり緑タイント |
| F3 | `.cellBoss` | `border: 1px dashed rgba(178, 44, 44, 0.6)` | 未遭遇=`border:1px dashed rgba(212,103,79,.4)`、撃破=`border:1px solid rgba(212,103,79,.6); background:#1c1316` |
| F4 | `.cellUnseen` | `opacity: 0.5` + 写本背景 | `background:#101218 / border:1px solid rgba(255,255,255,.05)`、中身は `filter: brightness(0) opacity(0.5)` でシルエット化 |

### G. フッター戻るボタン

| # | 場所 | 現状 | モック |
| --- | --- | --- | --- |
| G1 | `.back` | `border: 0.75px solid var.$rule` | `height:46px;border:1px solid var(--rule-base);color:var(--text-mute);font-size:13px;letter-spacing:.16em;border-radius:3px` |
| G2 | `.foot` | `padding-top: 12px; border-top: 0.75px solid var.$rule` | border-top 無し |

### H. レイアウト — 内側 padding 構成

モックは画面ルートは padding 0 で、`head` / `records` / `codex` / `foot` の各セクションに
`16-20px` の左右 padding を持たせる構造。現状はルート `.layout` に padding を持たせて
内部セクションを padding 0 にしているが、これだと後で section ごとの背景色変更時に統一感を
持たせにくい。**ルート padding は safe-area のみに減らし、内部セクションへ移譲**する。

---

## 4. ゴール

1. `style.module.scss` から `@use 'variables'` を削除し、写本テーマ依存を完全排除。
2. 章マーク `❦ 台帳` を削除、ヘッダーをモック準拠のシンプル `<h1>図鑑 / 記録</h1>` に縮める。
3. ボス撃破履歴の各行を「スプライト枠 + 実名 + 階層/時刻 + ✦ スタンプ」に揃える。
4. 図鑑タブの詳細カード周りをモックの暗紫グラデ + 朱縁 + 撃破バッジに合わせる。
5. ドロップ行に `ItemSprite` の 26px アイコン枠を入れる。
6. 6 列グリッドのセル枠色を `rgba(143,208,160,0.4)` ベースに揃え、ボス枠を「未遭遇=破線朱 / 撃破=実線朱」に分ける。
7. 全色値を `var(--*)` 経由に統一（直書き hex は朱の `#1c1316` など装飾色のみ）。
8. test / lint / tsc 全緑、Storybook の `pages/codex` 系ストーリーが黒曜テーマで描画。

---

## 5. 実装ステップ

### Step 1 — SCSS 一括書き換え（写本テーマ排除）

`src/pages/codex/style.module.scss` の **1 行目** を `@use 'obsidian';` に置換
（global で取り込まれているなら削除でも可）。

以後、ファイル全体を一括置換:

```
var.$parchment      → var(--bg-deep)
var.$parchment-card → var(--surface-panel)
var.$parchment-edge → var(--bg-mid)
var.$ink            → var(--text-base)
var.$ink-faint      → var(--text-mute)
var.$rule           → var(--rule-soft)
var.$illumination-gold → var(--gold)
var.$vermilion      → var(--danger-glow)
'Kaisei Tokumin', serif    → var(--font-display)
'JetBrains Mono', monospace → var(--font-mono)
```

置換後、目視で残骸が無いことを次のコマンドで確認:

```
grep -E "var\.\\\$|Kaisei|JetBrains Mono" src/pages/codex/style.module.scss
```

ヒットゼロにする。

### Step 2 — ヘッダー構造の簡素化

`index.tsx` 内 `<header className={styles.head}>` から `<p className={styles.chapterMark}>❦ 台帳</p>`
を削除。`<h1 className={styles.title}>図鑑 / 記録</h1>` だけ残す。

`style.module.scss`:

```scss
.layout {
  // ルート padding は safe-area のみに減らす
  padding: 0 0 max(20px, env(safe-area-inset-bottom, 0px));
}

.head {
  flex: none;
  padding: 16px 20px 0;
  margin-bottom: 0;
  // border-bottom は削除
}

.title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 400;
  color: var(--text-strong);
  letter-spacing: 0;
}
```

`.chapterMark` セレクタはファイルから削除。

### Step 3 — タブのスタイル整合（モック準拠）

`.tabs` に `margin: 12px 20px 0` を持たせる:

```scss
.tabs {
  display: flex;
  gap: 4px;
  margin: 12px 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.tab {
  flex: 1;
  text-align: center;
  padding: 9px 0;
  font-size: 12px;
  color: var(--text-quote);
  background: transparent;
  border: 0;
  cursor: pointer;
}
.tabActive {
  background: var(--gold);
  color: var(--bg-mid);
  font-weight: 700;
  border-radius: 3px 3px 0 0;
}
```

### Step 4 — 到達記録タブの修正

`.records` には `padding: 12px 20px 0` を持たせる。

`.statCard`:

```scss
.statsGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; padding-top: 16px; }
.statCard {
  background: var(--surface-panel);
  border: 1px solid var(--rule-soft);
  border-radius: 4px;
  padding: 14px;
}
.statCardLabel    { font-size: 10px; color: var(--text-mute); }
.statCardNum      { font-family: var(--font-mono); font-size: 24px; color: var(--gold); margin-top: 4px; line-height: 1.1; }
.statCardUnit     { font-size: 13px; color: var(--text-mute); }
.statCardBossName { font-family: var(--font-display); font-size: 15px; color: var(--text-strong); margin-top: 6px; }
.statCardBossTier { font-family: var(--font-mono); font-size: 9px; color: var(--text-mute); }
```

ボス撃破履歴のリストを 3 段構成（スプライト枠 + 名前+メタ + スタンプ）に改修:

```tsx
{[...rec.bossDefeatLog].reverse().map((b, i) => {
  const enemyId = (b as { enemyId?: EnemyId }).enemyId;
  const enemyMaster = enemyId ? ENEMIES[enemyId] : null;
  const name = enemyMaster?.name ?? `${b.depth}F のボス`;
  const at = (b as { defeatedAt?: number }).defeatedAt;
  const timeText = typeof at === 'number'
    ? new Date(at).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
    : null;
  return (
    <li key={i} className={styles.bossRow}>
      <div className={styles.bossRowSprite}>
        {enemyId ? <EnemySprite enemyId={enemyId} size="sm" /> : <span aria-hidden="true">👹</span>}
      </div>
      <div className={styles.bossRowMain}>
        <div className={styles.bossName}>{name}</div>
        <div className={styles.bossMeta}>{b.depth}F{timeText ? ` ・ ${timeText}` : ''}</div>
      </div>
      <span className={styles.bossStamp}>✦</span>
    </li>
  );
})}
```

SCSS:

```scss
.bossRow {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--surface-panel);
  border: 1px solid var(--rule-soft);
  border-radius: 3px;
  padding: 10px 12px;
}
.bossRowSprite {
  flex: none;
  width: 38px; height: 38px;
  border-radius: 3px;
  background: var(--bg-deep);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
  overflow: hidden;
}
.bossRowMain { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
.bossName    { font-size: 13px; color: var(--text-strong); }
.bossMeta    { font-family: var(--font-mono); font-size: 10px; color: var(--text-mute); }
.bossStamp   { font-size: 18px; color: var(--danger-glow); transform: rotate(-12deg); flex: none; }
```

### Step 5 — 図鑑タブの詳細カード整形

```scss
.codex { padding: 12px 20px 0; }
.codexSummaryRow { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.codexSummaryText { font-family: var(--font-mono); font-size: 12px; color: var(--text-mute); }
.codexSummaryPct  { font-family: var(--font-mono); font-size: 11px; color: var(--gold); }

.bossDetail {
  display: flex;
  gap: 13px;
  background: linear-gradient(120deg, #231a1c, var(--bg-mid));
  border: 1px solid rgba(212, 103, 79, 0.4);
  border-radius: 4px;
  padding: 13px;
  margin-bottom: 12px;
}
.bossDetailSprite {
  width: 66px; height: 66px;
  border: 1px solid rgba(212, 103, 79, 0.3);
  border-radius: 4px;
  background: var(--bg-deep);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  flex: none;
}
.bossDetailName  { font-family: var(--font-display); font-size: 15px; color: var(--text-strong); }
.bossDetailMeta  { font-size: 10px; color: var(--text-mute); margin-top: 3px; }
.bossDetailResist { margin-top: 7px; }
.badge {
  font-size: 9px;
  font-weight: 700;
  color: var(--bg-mid);
  background: var(--danger-glow);
  border-radius: 2px;
  padding: 1px 6px;
}
```

### Step 6 — ドロップ行に ItemSprite を入れる

`index.tsx`:

```tsx
{selectedEntry && selectedEntry.drops.length > 0 && (
  <div className={styles.dropRow}>
    {selectedEntry.drops.map((d) => (
      <div key={d.itemId} className={`${styles.dropCell} ${d.found ? styles.dropFound : styles.dropUnknown}`}>
        <div className={styles.dropIcon}>
          {d.found ? <ItemSprite itemId={d.itemId} size="sm" /> : <span aria-hidden="true">？</span>}
        </div>
        <span className={styles.dropName}>{d.found ? d.name : '未入手'}</span>
      </div>
    ))}
  </div>
)}
```

SCSS:

```scss
.dropRow { display: flex; gap: 8px; margin-bottom: 8px; }
.dropCell {
  flex: 1;
  display: flex; align-items: center; gap: 8px;
  background: var(--bg-deep);
  border-radius: 3px;
  padding: 7px 9px;
}
.dropIcon {
  width: 26px; height: 26px;
  border-radius: 2px;
  background: var(--surface-panel);
  display: flex; align-items: center; justify-content: center;
  flex: none;
  color: var(--text-quote);
}
.dropName { font-size: 10px; }
.dropFound   .dropName { color: var(--text-strong); }
.dropUnknown .dropName { color: var(--text-quote); }
```

### Step 7 — 6 列グリッドの枠色を success ベースへ

```scss
.gridLabel { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.gridLabelText { font-size: 10px; font-weight: 700; letter-spacing: 0.14em; color: var(--gold); }
.gridLegend    { font-size: 9px; color: var(--text-quote); }

.cell {
  aspect-ratio: 1;
  border-radius: 3px;
  background: var(--bg-deep);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  cursor: default;
}
.cellSeen     { border-color: rgba(143, 208, 160, 0.4); cursor: pointer; }
.cellDefeated { border-color: rgba(143, 208, 160, 0.4); background: rgba(143, 208, 160, 0.04); cursor: pointer; }
.cellBoss     { border: 1px dashed rgba(212, 103, 79, 0.4); }
.cellBoss.cellDefeated { border: 1px solid rgba(212, 103, 79, 0.6); background: #1c1316; }
.cellUnseen   { background: #101218; border: 1px solid rgba(255, 255, 255, 0.05); }
.cellUnseen .cellSprite { filter: brightness(0) opacity(0.5); }
.cellSelected { outline: 2px solid var(--gold); outline-offset: -2px; }
```

### Step 8 — フッター戻るボタン

```scss
.foot { flex: none; padding: 12px 20px 0; border-top: 0; }
.back {
  width: 100%;
  height: 46px;
  border: 1px solid var(--rule-base);
  background: transparent;
  color: var(--text-mute);
  font-size: 13px;
  letter-spacing: 0.16em;
  border-radius: 3px;
}
.back:active { color: var(--text-strong); }
```

### Step 9 — index.tsx の細部修正

- ヘッダーから章マーク削除。
- ボス撃破履歴を Step 4 の通り改修。
- ドロップ行に `ItemSprite` を追加。Import:
  `import { ItemSprite } from '@/components/common/ItemSprite/ItemSprite';`

---

## 6. 検証

```bash
yarn lint
yarn test
yarn tsc -b   # または yarn build
```

加えて、以下のスクショを撮って差分が消えていることを目視確認:

- `pages/codex` の `default`（到達記録タブ）
- `pages/codex` の `codex-tab`（図鑑タブ）

撮影は `dev-docs/screenshot-setup.md` の Storybook セクション準拠。Noto Sans JP 必須。

---

## 7. コミット

メッセージ例（複数 Step を 1 コミットに集約）:

```
refactor(codex): モック忠実化 v3 — 写本テーマ排除とボス履歴/詳細カード改修

- @use 'variables' を排除し全色を var(--*) 経由に統一
- 章マーク「❦ 台帳」を削除し、シンプルなタイトル「図鑑 / 記録」に統一（モック準拠）
- ボス撃破履歴をスプライト枠+名前+階層/時刻+✦スタンプの3段構成へ
- 図鑑タブ詳細カードを暗紫グラデ+朱縁に、ドロップ行に ItemSprite を導入
- 6 列グリッドの枠色を success ベース RGBA に揃え、ボス未遭遇=破線朱/撃破=実線朱
```

push しない。ディレクターに commit SHA を報告する。
