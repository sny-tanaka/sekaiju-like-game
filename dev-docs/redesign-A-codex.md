# フェーズ 2: codex 画面リデザイン（sonnet 用指示書） — **改訂版 v2 — モック忠実化**

> **改訂理由**: 前回の実装は「色味は黒曜化したが、ボタン配置・グリッド構造・ボス選択カード・統計カード
> など、画面構成そのものがモックと大幅にズレてしまった」。ユーザー直々の指示で再修正に入る。
> **本改訂の方針: モック忠実化を最優先**。前回の「機能優先で省略」ジャッジは原則撤回する。
> モックに描かれている要素はすべて配置する。disabled でも形と位置は維持する。

`dev-docs/redesign-A.md`（特に **§1.1〜§1.4 トークン**と **§1.5 レイアウト運用ルール**）と、
`dev-docs/redesign-A-title.md` / `dev-docs/redesign-A-title-fix.md`（実装パターンの相場感）を
**必ず先に読むこと**。本ファイルは codex 画面（図鑑 / 記録）のリデザインに閉じた実装手順。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい

| 区分 | パス | 操作 |
| --- | --- | --- |
| 編集 | `src/pages/codex/index.tsx` | マークアップ構造の **全面置換**（モック準拠の grid / 選択ボス詳細カード / 2x2 統計 / リング / ボス履歴 / 拠点へ戻るボタン） |
| 編集 | `src/pages/codex/style.module.scss` | 黒曜テーマで全面再構築。`@use 'variables'` を使わず `var(--*)` 直接参照に統一 |
| 編集 | `src/pages/codex/Codex.stories.tsx` | 既存 `Default` / `CodexTab` を維持。`SelectedBoss` ストーリーを追加（撃破済みのボスを 1 体クリックして詳細カードが出ている状態を撮りたい） |

### 触ってはいけない

- 共通コンポーネント: `src/components/common/EnemySprite/`, `ResistBadges/`, `ItemSprite/`, `CharacterPortrait/`, `StatBar/`, `BattleExpBar/`, `InkSplatter/`, `SkillTree/`, `EncounterGauge/`, `DungeonMap/`, `FirstPersonView/`
- ドメイン: `src/domain/codex.ts`, `src/domain/ailment.ts`, `src/data/enemies.ts`
- 型: `src/domain/types.ts`
- 全画面共通: `src/_variables.scss`, `src/_obsidian.scss`, `src/index.scss`, `index.html`
- 他画面の `src/pages/*/`（特に dungeon / battle と並列で進む）

## 2. やってはいけないこと

- **自分で Edit / Write / Bash を使って実装すること。さらに `Agent` / `Task` を spawn しないこと**（孫委譲禁止）。
- `codexSummary(save)` / `monsterCodex(save)` / `resolveEnemyAilmentResist(id)` の戻り値構造を変えない。
- 既存テスト assert の文言・構造を変えない（必要なら data-testid や aria-label の追加は OK だが、既存検証ポイントは温存）。
- 写本テーマ由来の SCSS 変数（`$parchment` 等）を新規参照しない。旧 `@use 'variables'` は削除する。
- **モックに描かれている要素を「機能が無いから」という理由で省略しない**。disabled / 形だけでもよいので、必ず配置する。例外を作る場合は本書 §3 の「機能優先で残す例外」と整合させる。

## 3. モックとの差分一覧（**現状の実装 → モック**）

モック原本: `/tmp/sekaiju-design/案A_v2.dc.html` line 745〜812（`7a bestiary grid` / `7b records`）。
箇条書きで具体差分を列挙する。実装時はこの一つずつを潰すこと。

### 図鑑タブ（7a）

1. **タブの見た目が違う**。モックでは active タブが「金箔ベタ塗りの矩形 (`background:#c9a86a; color:#0e0f13;`)、border-radius `3px 3px 0 0`、下端に下線」。非 active は淡いグレー文字のみ。**現状はオーバル/ピル状チップで見た目が異なる**。`tab-radius 3 3 0 0` + 金箔ベタを再現。
2. **サマリ行**: モックでは `padding 12px 20px 0;` で「撃破 18 / 42 ・ ドロップ 31 / 84」を `var(--text-mute)`、右端に「達成 43%」を `var(--gold)` + mono フォントで表示。**現状実装は出してはいるが余白とフォントが異なる**。モック準拠の余白と font-family（数値部分は `var(--font-mono)`）に統一。
3. **選択中のボス詳細カード**: モックでは図鑑タブ内の上部に「選択中ボス」のカードがある（line 754〜757）。グラデーション `linear-gradient(120deg,#231a1c,#13151c)`、危険系の `border: 1px solid rgba(212,103,79,.4)`、66x66 サムネ + 名前 + `撃破` バッジ + 「第 5 帯 ・ ボス ・ 撃破 1 回」のメタ + 属性バッジ (氷弱・炎耐・毒無効) + ドロップ列（取得済み / 未取得 ?）が並ぶ。**現状実装は行を展開する形で、独立した詳細カードになっていない**。grid 上で選択中のセル / 行をタップ → ヘッダ直下の詳細カードがその内容に切り替わる構造に変更する。
4. **モンスター一覧が grid ではなく list**: モックは `grid-template-columns:repeat(6,1fr); gap:6px;` の **6 列 grid**。各セルは `aspect-ratio: 1; border-radius: 3px;`、未撃破=緑系 border (`rgba(143,208,160,.4)`)、撃破済みボス=危険系 border (`rgba(212,103,79,.6)`) + 内部背景 `#1c1316`、未遭遇=シルエット (`filter: brightness(0) opacity(.5)`)。**現状実装は縦リスト + 展開行**。grid 化する。
5. **凡例**: モックでは grid の上の右側に小さく「金=ボス / 緑=撃破 / 影=未遭遇」がある。**現状は無い**。追加する。
6. **末尾の「… ほか N 体（第 X 帯以降）」フッタ**: モックは grid の下に絶対配置で 1 行表示。**現状は無い**。表示中の grid に乗っていない残りの体数を「… ほか N 体」として末尾に出す（簡易対応で OK・1 行のテキスト）。
7. **「拠点へ戻る」ボタン**: モックは下端から 22px のところに 46px の outline ボタン (`border: 1px solid rgba(255,255,255,.1); color: #9a958a; letter-spacing: .16em;`)。**現状実装は様式が違う**（金箔ボタン or 様式不明）。モック準拠の outline + center text + letter-spacing で再現。

### 到達記録タブ（7b）

8. **2x2 統計カードのレイアウト**: モックは `display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 16px 20px;` の **2 列 2 行**。各カードは `background: #15171f; border: 1px solid rgba(255,255,255,.06); border-radius: 4px; padding: 14px;`。**現状実装は近いが、間隔・border-radius・border 色がモックと違う**。完全に合わせる。
9. **統計カードの内容**: モック準拠で 4 枚。
   - 「最深到達階」: ラベル 10px mute、数値 24px mono `var(--gold)` + 末尾 13px mute の `F`
   - 「挑戦回数」: ラベル 10px mute、数値 24px mono `var(--text-strong)`
   - 「最高撃破ボス」: ラベル 10px mute、本文 15px display `var(--text-strong)` + 9px mute サブ「第 N 帯」
   - 「図鑑達成率リング」: 60x60 SVG リング（既存実装と同様）+ 中央テキスト 13px mono `var(--gold)`
   - **現状実装は「最高撃破ボス」を `{N}F のボス` と表示しているが、モック準拠で「ボス名 / 第 N 帯」を出す**。撃破履歴の最新 1 件から depth を引いて「第 (Math.floor(depth/10)+1) 帯」と表示する（簡易対応・正確な帯番号は `bandThemeFor(depth)` の参照禁止なので、`Math.floor((depth-1)/10) + 1` で算出）。
10. **「ボス撃破履歴（新しい順）」セクション**: モックは `font-size: 11px; letter-spacing: .16em; color: var(--gold); font-weight: 700;` の見出し + サブテキスト「（新しい順）」を `var(--text-quote)` で並べる。リストは **個別のカード**（38x38 サムネ + 名前 + サブメタ + 右端の赤い ✦ スタンプ）。
    - **現状実装は depth と「のボスを撃破」のテキストだけで、サムネも ✦ スタンプも無い**。サムネは `EnemySprite` を `size="sm"` で使用（撃破履歴の `enemyId` が無ければ `bossDefeatLog` を素直に並べる）。
    - ✦ スタンプは `font-size: 18px; color: var(--danger-glow); transform: rotate(-12deg);` で右端に。
    - サブメタは「{depth}F ・ {label}」。`label` は最新が「前回」/「12:01」のようなフレーバーで構わないが、データに時刻が無い場合は省略可（**省略する場合は `{depth}F` のみ表示**）。
11. **「拠点へ戻る」ボタン**: 図鑑タブと同じく outline スタイル（差分 7 と同じ）。
12. **章マーク**: モックは画面タイトル上に章マーク `❦ 台帳` は無く、直接「図鑑 / 記録」を `font-family: Shippori Mincho; font-size: 18px; color: var(--text-strong);` で 1 行表示している。**現状実装は章マーク `❦ 台帳` を出しているが、モックは出していない**。**章マークは削除**（モック準拠）。

## 4. ゴール（Storybook ストーリー一覧）

`Pages/Codex` 配下で以下のストーリーが黒曜テーマ + モック構造で描画され、
`yarn lint` / `yarn test --run` / `yarn tsc -b`（または `yarn build`）が緑。

1. **`Default`**（到達記録タブ）— 2x2 統計カード（最深到達階 / 挑戦回数 / 最高撃破ボス / 図鑑達成率リング）+ ボス撃破履歴カード列 + outline 「拠点へ戻る」フッタ
2. **`CodexTab`**（図鑑タブ）— サマリ行 + 6 列 grid（緑/赤/影のセル区別）+ 凡例 + 「… ほか N 体」+ outline 「拠点へ戻る」フッタ
3. **`SelectedBoss`**（図鑑タブで撃破済みボスを 1 体選択中）— 上記 + 上部に選択中ボスの詳細カード（属性バッジ + ドロップ列）
   - play 関数: 図鑑タブに切り替えた後、grid 内のボス（撃破済み）セルを 1 つクリック

---

## 5. 実装ステップ（モック準拠の具体構造）

### Step 0. 旧 `@use 'variables'` を外す

`src/pages/codex/style.module.scss` の冒頭の `@use 'variables' as var;` を **削除**。
すべての色を `var(--*)` で書き直す。

### Step 1. ルートレイアウト (`.layout`)

```scss
.layout {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  max-width: 560px;
  margin: 0 auto;
  padding: 16px 20px max(22px, env(safe-area-inset-bottom, 22px));
  overflow: hidden;
  background: var(--bg-page-gradient);
  color: var(--text-base);
  font-family: var(--font-body);
  gap: 12px;
}
```

### Step 2. ヘッダ

```tsx
<header className={styles.head}>
  <h1 className={styles.title}>図鑑 / 記録</h1>
</header>
```

```scss
.head {
  flex: 0 0 auto;
}
.title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--text-strong);
  letter-spacing: .04em;
}
```

> **章マーク `❦ 台帳` は出さない**（差分 12）。モックには無い。

### Step 3. タブ

モックの style に厳密に合わせる。

```scss
.tabs {
  flex: 0 0 auto;
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--rule-soft);
}
.tab {
  flex: 1;
  text-align: center;
  padding: 9px 0;
  font-size: 12px;
  color: var(--text-faint);
  background: transparent;
  border: 0;
  border-radius: 3px 3px 0 0;
  font-family: var(--font-body);
  cursor: pointer;
}
.tabActive {
  color: var(--bg-mid);
  font-weight: 700;
  background: var(--gold);
}
```

### Step 4. 可変領域（タブ別）

```tsx
<div className={styles.content}>
  {tab === 'record' ? <RecordsPanel ... /> : <BestiaryPanel ... />}
</div>
```

```scss
.content {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
```

### Step 5. RecordsPanel（到達記録タブ）— モック 7b 準拠

```tsx
<section className={styles.records}>
  <div className={styles.statGrid}>
    <article className={styles.statCard}>
      <span className={styles.statLabel}>最深到達階</span>
      <span className={styles.statNumGold}>
        {rec.deepestReached}
        <span className={styles.statSuffix}>F</span>
      </span>
    </article>
    <article className={styles.statCard}>
      <span className={styles.statLabel}>挑戦回数</span>
      <span className={styles.statNumPlain}>{rec.totalDives}</span>
    </article>
    <article className={styles.statCard}>
      <span className={styles.statLabel}>最高撃破ボス</span>
      {/* モック準拠で 2 行：本文 15px display + サブ 9px mute */}
      <span className={styles.statBossName}>{bossName ?? '—'}</span>
      <span className={styles.statBossBand}>第 {bandNo} 帯</span>
    </article>
    <article className={styles.statCardRing}>
      <span className={styles.statLabel}>図鑑達成率</span>
      <div className={styles.ringWrap}>{/* 60x60 SVG リング */}</div>
    </article>
  </div>

  <div className={styles.bossLogHead}>
    <span className={styles.bossLogHeadLabel}>ボス撃破履歴</span>
    <span className={styles.bossLogHeadSub}>（新しい順）</span>
  </div>
  <ul className={styles.bossLog}>
    {rec.bossDefeatLog.slice().reverse().map((b, i) => (
      <li key={i} className={styles.bossRow}>
        <div className={styles.bossThumb}>
          {/* enemyId が分かるならスプライト。無ければ絵文字 👹 をフォールバック */}
        </div>
        <div className={styles.bossMeta}>
          <span className={styles.bossName}>{bossLabel}</span>
          <span className={styles.bossSub}>{b.depth}F</span>
        </div>
        <span className={styles.bossSeal}>✦</span>
      </li>
    ))}
  </ul>
</section>
```

SCSS（モック寸法準拠）:

```scss
.statGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.statCard,
.statCardRing {
  background: var(--surface-panel);
  border: 1px solid var(--rule-soft);
  border-radius: 4px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.statCardRing { align-items: stretch; }
.statLabel {
  font-size: 10px;
  color: var(--text-faint);
}
.statNumGold {
  font-family: var(--font-mono);
  font-size: 24px;
  color: var(--gold);
  margin-top: 4px;
}
.statNumPlain {
  font-family: var(--font-mono);
  font-size: 24px;
  color: var(--text-strong);
  margin-top: 4px;
}
.statSuffix {
  font-size: 13px;
  color: var(--text-faint);
}
.statBossName {
  font-family: var(--font-display);
  font-size: 15px;
  color: var(--text-strong);
  margin-top: 6px;
}
.statBossBand {
  font-size: 9px;
  color: var(--text-faint);
}
.ringWrap {
  position: relative;
  width: 60px;
  height: 60px;
  margin: 6px auto 0;
}
.ringText {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--gold);
}

.bossLogHead {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.bossLogHeadLabel {
  font-size: 11px;
  letter-spacing: .16em;
  color: var(--gold);
  font-weight: 700;
}
.bossLogHeadSub {
  font-size: 9px;
  color: var(--text-quote);
}
.bossLog {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.bossRow {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--surface-panel);
  border: 1px solid var(--rule-soft);
  border-radius: 3px;
  padding: 10px 12px;
}
.bossThumb {
  width: 38px;
  height: 38px;
  border-radius: 3px;
  background: var(--bg-deep);
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.bossMeta {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.bossName {
  font-size: 13px;
  color: var(--text-strong);
}
.bossSub {
  font-size: 10px;
  color: var(--text-faint);
}
.bossSeal {
  font-size: 18px;
  color: var(--danger-glow);
  transform: rotate(-12deg);
}
```

> **`bossLabel`**: `bossDefeatLog` の各エントリに enemyId が含まれていれば `ENEMIES[id]?.name` を表示。
> 含まれていなければ「{depth}F のボス」と表示（既存テキストのまま）。
> **`bandNo`**: `Math.floor((rec.deepestReached - 1) / 10) + 1`。

### Step 6. BestiaryPanel（図鑑タブ）— モック 7a 準拠

```tsx
<section className={styles.bestiary}>
  <div className={styles.summary}>
    <span className={styles.summaryText}>
      撃破 {sum.monstersDefeated} / {sum.monstersTotal} ・
      ドロップ {sum.dropsFound} / {sum.dropsTotal}
    </span>
    <span className={styles.summaryPct}>達成 {sum.completionPct}%</span>
  </div>

  {selectedEntry ? (
    <SelectedBossCard entry={selectedEntry} />
  ) : null}

  <div className={styles.legendRow}>
    <span className={styles.legendLabel}>一覧 ・ {entries.length} 体</span>
    <span className={styles.legendHint}>金=ボス / 緑=撃破 / 影=未遭遇</span>
  </div>

  <div className={styles.grid}>
    {entries.slice(0, GRID_LIMIT).map((e) => (
      <button
        key={e.id}
        type="button"
        className={cellClass(e)}
        disabled={!e.seen}
        onClick={() => setSelectedId(e.id)}
        aria-label={e.seen ? e.name : '未遭遇のモンスター'}
      >
        {e.seen ? <EnemySprite enemyId={e.id} size="sm" /> : <span className={styles.cellUnseen}>？</span>}
      </button>
    ))}
  </div>
  {entries.length > GRID_LIMIT && (
    <p className={styles.gridFooterHint}>
      … ほか {entries.length - GRID_LIMIT} 体（次の帯以降）
    </p>
  )}
</section>
```

`GRID_LIMIT` は 24 で固定（モックの grid セル数）。
`cellClass(e)` は以下のロジックで `.cell` / `.cellBoss` / `.cellDefeated` / `.cellUnseen` を組み合わせる。
枠色のロジック:

- ボス + 撃破: `.cellBoss .cellDefeated` (border 危険系)
- 通常 + 撃破: `.cellDefeated` (border 緑系)
- 未撃破・遭遇済み: `.cell` (border soft)
- 未遭遇: `.cellUnseen` (silhouette + 破線 border)

SCSS:

```scss
.summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 4px;
}
.summaryText {
  font-size: 12px;
  color: var(--text-mute);
}
.summaryPct {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--gold);
}

.legendRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.legendLabel {
  font-size: 10px;
  letter-spacing: .14em;
  color: var(--gold);
  font-weight: 700;
}
.legendHint {
  font-size: 9px;
  color: var(--text-faint);
}

.grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 6px;
}
.cell {
  aspect-ratio: 1;
  border-radius: 3px;
  background: var(--bg-deep);
  border: 1px solid var(--rule-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
}
.cellDefeated {
  border-color: rgba(143, 208, 160, .4);
}
.cellBoss {
  background: #1c1316;
  border-color: rgba(212, 103, 79, .6);
}
.cellUnseen {
  filter: brightness(0) opacity(.5);
  border-style: dashed;
  border-color: rgba(212, 103, 79, .4);
}
.gridFooterHint {
  text-align: center;
  font-size: 10px;
  color: var(--text-mute);
  margin: 8px 0 0;
}
```

### Step 7. 選択中ボス詳細カード（モック line 754〜757）

```tsx
<article className={styles.selectedBoss}>
  <div className={styles.selectedHead}>
    <div className={styles.selectedThumb}>
      <EnemySprite enemyId={entry.id} size="md" />
    </div>
    <div className={styles.selectedMeta}>
      <div className={styles.selectedNameRow}>
        <span className={styles.selectedName}>{entry.name}</span>
        {entry.defeated ? <span className={styles.selectedDefeatedBadge}>撃破</span> : null}
      </div>
      <span className={styles.selectedSub}>
        第 {tierBand(entry)} 帯 ・ ボス ・ 撃破 {defeatCount}回
      </span>
      <div className={styles.selectedResists}>
        <ResistBadges elementResist={master.resist} ailmentResist={undefined} />
      </div>
    </div>
  </div>
  <div className={styles.selectedDrops}>
    {entry.drops.map((d, i) => (
      <div key={i} className={d.found ? styles.dropFound : styles.dropMissing}>
        {d.found ? <ItemSprite itemId={d.itemId} size="sm" /> : <span>？</span>}
        <span>{d.found ? d.name : '未入手'}</span>
      </div>
    ))}
  </div>
</article>
```

```scss
.selectedBoss {
  background: linear-gradient(120deg, #231a1c, #13151c);
  border: 1px solid rgba(212, 103, 79, .4);
  border-radius: 4px;
  padding: 13px;
}
.selectedHead {
  display: flex;
  align-items: center;
  gap: 13px;
}
.selectedThumb {
  width: 66px;
  height: 66px;
  border-radius: 4px;
  background: var(--bg-deep);
  border: 1px solid rgba(212, 103, 79, .3);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex: none;
}
.selectedMeta { flex: 1; display: flex; flex-direction: column; gap: 3px; }
.selectedNameRow { display: flex; align-items: center; gap: 8px; }
.selectedName {
  font-family: var(--font-display);
  font-size: 15px;
  color: var(--text-strong);
}
.selectedDefeatedBadge {
  font-size: 9px;
  color: var(--bg-mid);
  background: var(--danger-glow);
  border-radius: 2px;
  padding: 1px 6px;
  font-weight: 700;
}
.selectedSub {
  font-size: 10px;
  color: var(--text-faint);
}
.selectedResists { margin-top: 7px; }
.selectedDrops {
  display: flex;
  gap: 8px;
  margin-top: 11px;
}
.dropFound,
.dropMissing {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-deep);
  border-radius: 3px;
  padding: 7px 9px;
  font-size: 10px;
}
.dropFound { color: var(--text-strong); }
.dropMissing { color: var(--text-quote); }
```

> `tierBand(entry)` は既存の `entry.tierBand + 1` をそのまま使ってよい（`monsterCodex` の返り値）。
> `defeatCount` は `rec.bossDefeatLog` を絞り込んで算出（無ければ 1 固定で可・モック準拠の見た目維持優先）。

### Step 8. 「拠点へ戻る」outline ボタン

```tsx
<footer className={styles.foot}>
  <button type="button" className={styles.back} onClick={() => navigate({ name: 'town' })}>
    拠点へ戻る
  </button>
</footer>
```

```scss
.foot {
  flex: 0 0 auto;
  margin-top: auto;
}
.back {
  width: 100%;
  height: 46px;
  border-radius: 3px;
  border: 1px solid var(--rule-base);
  background: transparent;
  color: var(--text-mute);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  letter-spacing: .16em;
  font-family: var(--font-body);
  cursor: pointer;
}
.back:hover { color: var(--gold); border-color: var(--rule-gold); }
```

### Step 9. 反転した「機能優先」方針の取り扱い

- 「選択中ボス詳細カード」のドロップアイコン: 既存 `ItemSprite` を使用してよい（`size="sm"`）。
  モックは 22x22 で表示しているのでサイズ感は近い。
- 撃破履歴のサムネ: `bossDefeatLog` のエントリに `enemyId` が **格納されているか** を確認し、
  あれば `EnemySprite`、無ければプレースホルダ絵文字 `👹` でフォールバック。
  - 確認ポイント: `src/domain/types.ts` の `BossDefeatLog` 型定義。型を変えない範囲で対応すること。
  - フォールバックは「機能優先で残す例外」として明記する（モック差分で省略表示になる旨を本書末尾に記載済み）。
- **モックには `？` ステルス枠が grid に並んでいるが、`entries` から取得できる未遭遇枠を素直に並べれば等価表現になる**（追加データ不要）。

## 6. 検証

```
yarn lint
yarn test --run
yarn tsc -b
```

3 点すべて緑。Storybook 視覚確認はディレクターが後でまとめて行う（必須ではないが、ローカルで
`yarn storybook --host 0.0.0.0` を 6006 で立ち上げて自己確認しても良い）。

## 7. コミット

1 つのコミットにまとめる:

```
feat(redesign-A): rebuild codex page to match mock v2 (改訂版)

- 6-col grid bestiary with green / danger / silhouette cell states
- selected boss detail card with resist badges and drop slots
- 2x2 stat grid with achievement ring per mock
- boss defeat history cards with sprite + seal stamp
- outline "back to town" button per mock

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

push 不要。SHA を最終応答で報告。

---

## 機能優先で残す例外（必ず最終応答で明記）

- 撃破履歴のサムネは `enemyId` がデータに含まれない場合に絵文字でフォールバック（モックは画像）。
- 撃破日時（モックは「12:01」「前回」）は既存データに無いため省略可。
- 「最高撃破ボス」のボス名は `enemyId` が `bossDefeatLog` に格納されていれば `ENEMIES[id]?.name` を表示。無ければ `{depth}F のボス` のテキスト（モック差分）。
