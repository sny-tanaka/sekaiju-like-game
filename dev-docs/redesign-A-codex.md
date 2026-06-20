# redesign-A — codex（図鑑 / 記録）改訂版 v5 — 案A v3 完全対応

`案A v3` で確定した out-of-spec 判断（`dev-docs/design-source-v3-changelog.md` §B）を、
図鑑画面に完全反映するための指示書。v4 段階で「撃破時刻の表示」「撃破モンスター名の解決ロジック」
は実装済み（`BossDefeatLogEntry` を構造で受け取り `enemyId` があれば名前解決）だが、v5 では
**`BossDefeatLogEntry` 型本体を `{ depth, at, enemyId? }` に正式拡張**して
データ側からモンスター名が来るようにし、達成率リング（SVG）を追加する。

- 元モック: `/tmp/sekaiju-design/案A_v3.dc.html` line 727〜795（07 codex、2 サブ状態
  `7a bestiary grid / 7b records`）
- 現状実装: `src/pages/codex/index.tsx`, `src/pages/codex/style.module.scss`
- v4 で取り込み済みの構造（2 タブ / 6 列モンスターグリッド / 撃破履歴 / ResistBadges）は **そのまま温存**。

> 関連: 全体方針は `dev-docs/redesign-A.md`（§1 デザイントークン / §1.5 レイアウト運用ルール）。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい

- `src/pages/codex/index.tsx` — 達成率リング（SVG）の追加 / 撃破履歴の `enemyId` 解決の最終化
- `src/pages/codex/style.module.scss` — リング用クラス追加 / `statCard` 内のリング配置の微調整
- `src/domain/types.ts` — **`BossDefeatLogEntry` 型を新規 export**（`{ depth: number; at: number; enemyId?: EnemyId }`）+ `TowerRecord.bossDefeatLog` の型をその型に差し替え
- `src/domain/codex.ts` — 型 import の修正（必要なら）
- `src/domain/dive.ts` — `defeatBoss` シグネチャに `enemyId?: EnemyId` を追加 / `resolveFoeBattle` から `pending.enemyId` を渡す
- `src/__stories__/mockSaves.ts` — `bossDefeatLog` の mock を `enemyId` 入りで拡張（後方互換を確認するため、1 件は `enemyId` 無しで残してよい）
- `src/pages/codex/Codex.stories.tsx` — 撃破履歴に「名前ありの古い履歴 / 名前無しの古い履歴」を混在させたストーリーを **追加してよい**（既存ストーリーは触らない）
- `src/domain/boss.test.ts` — `defeatBoss` の引数追加に追随するだけのテスト微修正（追加してよい）

### 触ってはいけない（厳守）

- `src/_obsidian.scss`（トークン）
- `src/index.scss`
- `src/components/common/EnemySprite/*` / `ItemSprite` / `ResistBadges`
- `src/domain/codex.ts` の `monsterCodex` / `codexSummary` のロジック（戻り値の構造は触らない。**達成率は `codexSummary().completionPct` をそのまま使う**）
- `src/domain/battle.ts` — applyBattleResult からはボス撃破ロジックを呼ばない（FOE 経由のみ）。**現状ロジックを温存**
- `src/data/enemies.ts` — `ENEMIES` マスタは変更しない
- 他画面（town / dungeon / battle 等）

---

## 2. やってはいけないこと

1. **Agent / Task の spawn 禁止**。自分で Edit / Write / Bash を使うこと。
2. **共通コンポーネントの変更禁止**。`EnemySprite` / `ItemSprite` / `ResistBadges` の API を変えない。
3. **schemaVersion を上げない / マイグレーションを書かない**。
   `BossDefeatLogEntry.enemyId` は **optional**（`?:`）で追加し、既存セーブは `enemyId === undefined` のまま読み込めばよい。読み込み時の UI は「N F のボス」フォールバックで対応する（現状コードに既に実装済の `enemyMaster?.name ?? \`${b.depth}F のボス\`` を維持）。
4. **`monsterCodex` / `codexSummary` のロジックを変更しない**。達成率の計算は触らない。
5. **ボス撃破ロジックを `applyBattleResult` 側に作り直さない**。現状の **「FOE 経由（`resolveFoeBattle` → `defeatBoss`）のみ」** を維持。`pending.enemyId` を `defeatBoss` に渡す配線変更だけ行う。
6. **モックに無い要素を勝手に追加しない**。例: 撃破回数の集計表示、達成率の cycle アニメ等、out-of-spec をさらに広げない。

---

## 3. モックとの差分一覧 + out-of-spec 判断の反映

`dev-docs/design-source-v3-changelog.md` §B の codex 行を、本リポでどう実装するかの最終写像。

| out-of-spec 項目 | v3 判断 | 本リポでの状態 | v5 でやること |
|---|---|---|---|
| 撃破履歴の時刻ラベル | **追加** | 実装済（`b.at` を `toLocaleTimeString('ja-JP',{hour:'2-digit',minute:'2-digit'})` で整形） | コードレビューのみ。`b.at` 由来表示が `at===undefined` のときに時刻を省く挙動の確認。 |
| 撃破履歴のモンスター名 | **追加（型拡張）** | 実装済の **読み出し側**（`(b as { enemyId?: EnemyId }).enemyId` キャスト）はあるが、**型本体が `{ depth, at }`** のままで保存側で `enemyId` を入れていない | 型を正式拡張し、保存側（`defeatBoss`）で `enemyId` を入れる。**§4 で詳細**。 |
| 達成率リング+テキスト | **追加** | 実装済: `statCard` 内に `{sum.completionPct}%` 数値のみ表示。リング無し | **SVG リング（60x60px / `r=25` / `stroke-dasharray="157"` / 動的 `stroke-dashoffset`）＋中央テキスト併記**で `statCard` を差し替え。§5 で詳細。 |

### 細部差分（v5 で潰す）

- **3-1. statCard グリッド**: モック 7b line 779〜783 と現状の `.statsGrid` 構造は一致（2x2、最深到達 / 挑戦回数 / 最高撃破ボス / 図鑑達成率）。**「最高撃破ボス」セルは現状 `rec.highestBossDefeated` の `F` 表記。モックは「門番ゴーレム / 第 5 帯」のボス名表記**。本リポでは `bossDefeatLog` の最も高い depth から `enemyId` を逆引きしてボス名を出してもよいが、**現状の "F" 表記でも仕様準拠（記録としての階数は正しい）**。`enemyId` 拡張後の派生改善 — v5 では「**現状の `XF` 表記を維持**」「ボス名表記は v6 以降」とし、**範囲を広げない**。
- **3-2. 達成率リングの色**: モック 7b line 783 — `circle stroke "#c9a86a"` で gold。`stroke-dashoffset=89` は `(1 - 43/100) * 2π * 25 ≈ 89`、つまり `dashoffset = circumference * (1 - pct/100)`。**JS で `Math.PI * 2 * 25 = 157.08` を計算**し、`circumference - circumference * pct / 100` で算出。
- **3-3. リング中央のパーセント数値**: モック 7b — `font-family:'JetBrains Mono';font-size:13px;color:#c9a86a`。`var(--font-mono)` / `var(--gold)`。
- **3-4. ボス撃破履歴**: モック 7b line 786〜790 — モンスタースプライト 38x38px、名前、`{depth}F ・ {time}`、`✦` スタンプ。現状実装と一致。`enemyId` 拡張後に古い履歴（`enemyId` 無し）が混在しても **「N F のボス」フォールバック**で破綻しないこと（§4 互換性）。
- **3-5. 図鑑タブの 6 列グリッド**: モック 7a line 741〜766 と現状一致。維持。
- **3-6. 詳細カード（選択時）**: モック 7a line 736〜738 と現状の `.bossDetail` 構造は一致。維持。

---

## 4. データ拡張の方針（codex のみ）

### 4.1 型定義の拡張

`src/domain/types.ts` line 765〜771 の `TowerRecord` を以下のように変更する:

```ts
/** ボス撃破履歴 1 件。`enemyId` は v5 で追加（後方互換のため optional）。 */
export interface BossDefeatLogEntry {
  depth: number;
  at: number;
  enemyId?: EnemyId;
}

/** 最高到達階などのベスト記録（[06 §7]）。 */
export interface TowerRecord {
  deepestReached: number;
  highestBossDefeated: number;
  totalDives: number;
  bossDefeatLog: BossDefeatLogEntry[];
}
```

ポイント:

- `BossDefeatLogEntry` を **新規 export**（既存テスト・mock 側で型を import できるように）。
- `enemyId?: EnemyId` の **optional**（後方互換）。
- `EnemyId` は同ファイル内で既に export されている（line 上部参照）。

### 4.2 schemaVersion とマイグレーション

- **上げない**。`enemyId` は optional なので、既存セーブ（`{ depth, at }` のみ）はそのまま読み込める。
- `saveData.ts` / migration コードに変更を加えない。

### 4.3 撃破時に `enemyId` を記録する

`src/domain/dive.ts` の `defeatBoss` と `resolveFoeBattle` を改修。

**Step A**: `defeatBoss` のシグネチャを拡張:

```ts
export function defeatBoss(
  save: SaveData,
  depth: number,
  at: number = Date.now(),
  enemyId?: EnemyId, // ★ 追加
): SaveData {
  const ts = save.towerState;
  const bossGates = { ...ts.bossGates, [depth]: { depth, defeated: true } };
  const unlockedCheckpoints = ts.warp.unlockedCheckpoints.includes(depth)
    ? ts.warp.unlockedCheckpoints
    : [...ts.warp.unlockedCheckpoints, depth].sort((a, b) => a - b);
  const alreadyLogged = ts.record.bossDefeatLog.some((b) => b.depth === depth);
  const record = {
    ...ts.record,
    highestBossDefeated: Math.max(ts.record.highestBossDefeated, depth),
    bossDefeatLog: alreadyLogged
      ? ts.record.bossDefeatLog
      : [...ts.record.bossDefeatLog, { depth, at, enemyId }], // ★ enemyId を入れる
  };
  return {
    ...save,
    towerState: { ...ts, bossGates, warp: { ...ts.warp, unlockedCheckpoints }, record },
  };
}
```

注意:
- `enemyId === undefined` のときも `{ depth, at, enemyId: undefined }` で push される。
  JSON.stringify で `undefined` フィールドは消える（後方互換は維持される）。
- 「同一 depth は 1 件だけ」の dedup ロジックは現状維持。
- `EnemyId` 型を import する: `import type { EnemyId, ... } from '@/domain/types';`

**Step B**: `resolveFoeBattle` から `enemyId` を渡す:

```ts
export function resolveFoeBattle(save: SaveData, win: boolean): SaveData {
  const dive = save.diveState;
  if (!dive) return save;
  const pending = dive.pendingFoeBattle;
  let next: SaveData = { ...save, diveState: { ...dive, pendingFoeBattle: null } };
  if (pending && win) {
    const floor = next.towerState.floors[dive.depth];
    const foeRuntime = floor.foeRuntime.map((f) =>
      f.spawnId === pending.spawnId ? { ...f, defeated: true } : f
    );
    next = setFoeRuntime(next, dive.depth, foeRuntime);
    if (pending.isBoss) {
      next = defeatBoss(next, dive.depth, Date.now(), pending.enemyId); // ★ enemyId を渡す
    }
  }
  return next;
}
```

`pending.enemyId` は既存の `PendingFoeBattle` 型に存在する（line 191〜212 で代入済）。

**Step C**: `src/domain/battle.ts` には触らない。
applyBattleResult はボス撃破処理を **持っていない**（FOE 経由のみ）。本仕様は変えない。

### 4.4 UI 側

`src/pages/codex/index.tsx` の現状コード（line 108〜146）は既に
`(b as { enemyId?: EnemyId }).enemyId` キャストで読み出しているので、型を正規化したら
**キャストを外して `b.enemyId` で素直に書ける**。

```tsx
{[...rec.bossDefeatLog].reverse().map((b, i) => {
  const enemyMaster = b.enemyId ? ENEMIES[b.enemyId] : null;
  const name = enemyMaster?.name ?? `${b.depth}F のボス`;
  const timeText =
    typeof b.at === 'number'
      ? new Date(b.at).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
      : null;
  // 以下同じ
})}
```

`(b as { at?: number; defeatedAt?: number }).at ?? (b as { defeatedAt?: number }).defeatedAt;`
の互換キャストも **削除して `b.at` だけにしてよい**（型本体に `at: number` が必ず付くので）。

### 4.5 mock とテスト

- `src/__stories__/mockSaves.ts` の `bossDefeatLog` mock を **`enemyId` 入り** に書き換える:
  ```ts
  bossDefeatLog: [
    { depth: 5, at: Date.now(), enemyId: 'enemy_gatekeeper' as EnemyId },
  ],
  ```
  ただし「後方互換」を視覚で確認したいので、テスト用に 1 件は `enemyId` 無しを混ぜてもよい（ストーリー追加用）。
- `src/domain/boss.test.ts` で `defeatBoss(...)` 呼び出し箇所は `enemyId` 未指定でも通る（optional なので）。**テスト追加**: 1 件「`enemyId` を渡したときに `bossDefeatLog[0].enemyId` が一致する」アサーションを足してよい。

---

## 5. 実装ステップ

### Step 1. 型拡張

- `src/domain/types.ts` line 765〜771 を §4.1 の通り書き換え。`BossDefeatLogEntry` を新規 export。
- `EnemyId` が同ファイル上方で export されていること確認。

### Step 2. `defeatBoss` / `resolveFoeBattle` を更新

- `src/domain/dive.ts` を §4.3 Step A・B の通り改修。
- `EnemyId` の import を追加。

### Step 3. UI 側のキャスト削除

- `src/pages/codex/index.tsx` line 108〜146 で:
  - `(b as { enemyId?: EnemyId }).enemyId` → `b.enemyId`
  - `(b as { at?: number; defeatedAt?: number }).at ?? (b as { defeatedAt?: number }).defeatedAt`
    → `b.at`
- 余計な型キャストを削除。

### Step 4. 達成率リングを追加

`src/pages/codex/index.tsx` の `tab === 'record'` ブロック内、`statsGrid` の 4 番目セル
（図鑑達成率）を以下に差し替え:

```tsx
<div className={styles.statCard}>
  <div className={styles.statCardLabel}>図鑑達成率</div>
  <div className={styles.ringWrap} aria-label={`図鑑達成率 ${sum.completionPct}%`}>
    <svg
      viewBox="0 0 60 60"
      className={styles.ringSvg}
      aria-hidden="true"
    >
      <circle cx="30" cy="30" r="25" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="5" />
      <circle
        cx="30"
        cy="30"
        r="25"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="5"
        strokeDasharray={Math.PI * 2 * 25}
        strokeDashoffset={Math.PI * 2 * 25 * (1 - sum.completionPct / 100)}
        transform="rotate(-90 30 30)"
        strokeLinecap="round"
      />
    </svg>
    <span className={styles.ringText}>{sum.completionPct}%</span>
  </div>
</div>
```

SCSS に追加:

```scss
.ringWrap {
  position: relative;
  width: 60px;
  height: 60px;
  margin: 6px auto 0;
}

.ringSvg {
  width: 60px;
  height: 60px;
  display: block;
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
```

注意:
- `statCardLabel` を **left-align** で残しつつ、リングを中央配置（モック 7b line 783 の `text-align:center` / `text-align:left` 混在を再現）。
- `statCardNum` / `statCardUnit` は **このセルでは使わない**（リング＋中央テキストに置換）。他 3 セルは現状維持。

### Step 5. mock 更新

- `src/__stories__/mockSaves.ts` の `bossDefeatLog` mock に `enemyId` を入れる（§4.5）。
- `Codex.stories.tsx` に「履歴に名前あり / 名前なしが混在」のストーリーを追加してよい（任意・推奨）。

### Step 6. テスト更新

- `src/domain/boss.test.ts` の既存テストは `defeatBoss` のシグネチャ後方互換なのでそのまま通る。
- 追加テスト 1 件:
  ```ts
  test('defeatBoss は enemyId を撃破履歴に記録する', () => {
    const save = createInitialSaveData('g');
    const next = defeatBoss(save, 10, 1234, 'enemy_gatekeeper' as EnemyId);
    expect(next.towerState.record.bossDefeatLog[0].enemyId).toBe('enemy_gatekeeper');
    expect(next.towerState.record.bossDefeatLog[0].at).toBe(1234);
  });
  ```

### Step 7. 検証ゲート（必須）

- `yarn lint`
- `yarn test`（boss.test.ts のシグネチャ整合を含めて緑）
- `yarn build`（または `npx tsc -b`）
- 上記 3 点が全て緑になるまで終了しない。**vitest と eslint は型を見ない**ので `tsc -b` は必ず通すこと。
- 成果物に影響する変更（`src/` を触る）なので **`yarn build` を実行して `docs/` を更新**し、コミットに含める。

---

## 6. 検証

実装後、ディレクターが以下を確認する:

- **見た目（モック比較）**:
  - `pages/codex--record-tab` で statsGrid の 4 番目セルに **gold の SVG リング + 中央 `43%` テキスト**（実値）が表示される。
  - リングのパーセンテージは `sum.completionPct` と一致。
  - ボス撃破履歴に「モンスター名」が表示される（`enemyId` ありの mock 行）／古い行（`enemyId` 無し）は `{depth}F のボス` で表示される（後方互換）。
- **動作**:
  - ボス階を倒すと `bossDefeatLog` に `{ depth, at, enemyId }` が積まれる（ストーリー / プレイで確認）。
  - 同一 depth は重複しない（既存仕様）。
- **品質ゲート**: `yarn lint` / `yarn test` / `yarn build` 全緑。
- **互換**: 旧スキーマセーブ（`enemyId` 無し）をロードして codex 画面で `{depth}F のボス` 表示・スプライト無しで壊れない。

---

## 7. コミット

- ブランチ: `feature/redesign-A`（既存）。新規 PR を切らない。
- メッセージ例: `feat(codex): v5 で BossDefeatLogEntry に enemyId を追加し、達成率リングを追加`
- 触ったファイルだけ `git add` してコミット（`git add -A` は禁止）。
- `yarn build` 済の `docs/` をコミットに含める。
- PR は作らない（ディレクターが他画面とまとめてレビューする）。

### 注意: 型変更を含むので、他画面への影響範囲

- `BossDefeatLogEntry` 型を新規 export し、`TowerRecord.bossDefeatLog` の要素型を `{depth,at}` から `BossDefeatLogEntry` に差し替える。
- 影響箇所（全部 optional 化に守られて壊れないこと）:
  - `src/pages/codex/index.tsx` — キャストを外せる
  - `src/domain/dive.ts` — `defeatBoss` のシグネチャに `enemyId?` を追加
  - `src/__stories__/mockSaves.ts` — `enemyId` 入り mock に更新
  - `src/domain/boss.test.ts` — 既存テストは引数追加と互換、追加テストを 1 件
- 影響しない（型は optional・後方互換）:
  - `src/domain/saveData.ts` — `bossDefeatLog: []` 初期化のまま
  - `src/domain/battle.ts` — 触らない（ボス撃破は FOE 経路のみ）
