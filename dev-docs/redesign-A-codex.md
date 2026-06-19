# フェーズ 2: codex 画面リデザイン（sonnet 用指示書）

`dev-docs/redesign-A.md`（特に **§1.1〜§1.4 トークン**と **§1.5 レイアウト運用ルール**）と、
`dev-docs/redesign-A-title.md` / `dev-docs/redesign-A-title-fix.md`（黒曜テーマの実装パターン・
flex column ベースのレイアウト規範）を **必ず先に読むこと**。本ファイルは codex 画面（図鑑 / 記録）
のリデザインに閉じた実装手順。

> codex は「到達記録 / 図鑑」の 2 タブ構成。モンスター情報を網羅的に確認する画面なので、
> **暗背景上に金箔アクセントで撃破バッジ・達成率を強調する** 黒曜テーマと相性がよい。
> モックでは図鑑タブが grid 表示・選択中のボス詳細カードあり、到達記録タブは 2x2 統計カード +
> 達成率リング + ボス撃破履歴。**既存実装は list 表示 + 展開行**で、機能としては grid でも list
> でも等価。ここでは「機能的に等価な範囲でモック準拠の見た目」に倒す（後述の優先順位を参照）。

---

## 触ってよいファイル

以下のみ。他のファイルは絶対に変更しない。

| 区分 | パス | 操作 |
| --- | --- | --- |
| 編集 | `src/pages/codex/index.tsx` | マークアップ調整（タブ・statBig → 2x2 カード化・達成率リング SVG・ボス履歴カード化・図鑑グリッド化） |
| 編集 | `src/pages/codex/style.module.scss` | 黒曜テーマで全面再構築（旧 `@use 'variables'` を外し `var(--*)` 直接参照に切替） |
| 編集 | `src/pages/codex/Codex.stories.tsx` | `Default` / `CodexTab` の play で `tab` ボタンを切り替える既存仕様を維持。必要なら `BossLog`（履歴の最大長を確認）ストーリーを追加してよい |

> **`src/components/common/EnemySprite/`・`ResistBadges/` は触らない**。共通基盤フェーズで
> 黒曜化済み。codex 画面側からは props だけ受け取る。
>
> **`src/domain/codex.ts`・`src/data/enemies.ts`・型定義 (`src/domain/types.ts`) は触らない**。
> 機能ロジック・データソースには手を入れない。

## やってはいけないこと

- 自分でさらに `Agent` / `Task` を spawn しない（孫委譲禁止。指示の入れ子は NG）。
- `src/_variables.scss` / `src/_obsidian.scss` を変更しない（既存トークンは追加しない方針。
  どうしても不足する場合は本書の「追加トークン」セクションを参照）。
- 他画面の `style.module.scss` / `index.tsx` を変更しない。
- `codexSummary` / `monsterCodex` / `resolveEnemyAilmentResist` の戻り値構造を変えない。
- 既存テストの assert 文を変えない（既存テストがあれば、文言を変えず構造のみ調整して通す）。
- 写本テーマ由来の SCSS 変数（`$parchment` 等）を新規参照しない。
- モックに「ドロップ列で個別のアイテム画像をサムネイル化」している箇所があるが、
  既存実装は `ItemSprite` を codex リストでは使っていない（テキスト「？」/ ドロップ名）。
  ドロップ列のアイコン化は **しない**（既存と同じテキスト表示を維持）。

## ゴール

Storybook の `Pages/Codex` 配下で以下のストーリーが黒曜テーマで描画され、`yarn lint` /
`yarn test --run` / `yarn tsc -b`（または `yarn build`）が緑。

1. `Default`（到達記録タブ）— 2x2 統計カード（最深到達階 / 挑戦回数 / 最高撃破ボス / 図鑑達成率リング）+
   ボス撃破履歴カード列 + 「拠点へ戻る」フッタ
2. `CodexTab`（図鑑タブ）— 上部サマリ行（撃破 M/N・ドロップ P/Q）+ モンスター行リスト
   （既存実装の縦リスト構造を維持）+ 行展開時に大型スプライト + 属性 / 状態異常耐性バッジ + フッタ

---

## レイアウト運用ルール（**§1.5 を厳守**・全画面共通）

`redesign-A.md §1.5` の 8 項目を必ず守る。要点だけ抜粋:

1. ルートは `display: flex; flex-direction: column; height: 100dvh; max-width: 560px; margin: 0 auto; overflow: hidden;`
   に `padding-bottom: max(20px, env(safe-area-inset-bottom, 0px))` を加算。
2. 縦に `header → tabs → content（タブ別の可変領域）→ footer` の 4 層を flex item として積む。
3. **可変領域はちょうど 1 つだけ**（`flex: 1 1 auto; min-height: 0; overflow-y: auto;`）。
   ここに到達記録 / 図鑑のスクロール領域を入れる。残りは `flex-shrink: 0`。
4. ページ全体スクロール禁止（`overflow: hidden` を `.layout` に維持）。スクロールは可変領域内のみ。
5. 装飾要素（背景グラデ・浮遊粒子）以外は絶対配置禁止。「下端から N px」とか書かない。
6. ボタン群は flex item として下から積む（`margin-top: auto` で押し下げる）。
7. clamp で font-size やカードサイズを調整して、iPhone SE（375x667）でも崩れないようにする。
8. メインアセット（`EnemySprite`）は `width: 100%; height: auto;` の親に入れ、親が高さを決める。

---

## 実装ステップ

### Step 0. 旧 `@use 'variables'` を外す

`src/pages/codex/style.module.scss` の冒頭 `@use 'variables' as var;` を **削除**。
すべての色を `var(--*)` で書き直す。

### Step 1. ルートレイアウト (`.layout`) の組み替え

```scss
.layout {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  max-width: 560px;
  margin: 0 auto;
  padding: 14px 20px max(16px, env(safe-area-inset-bottom, 0px));
  overflow: hidden;
  background: var(--bg-page-gradient);
  color: var(--text-base);
  font-family: var(--font-body);
  gap: 12px;
}
```

(モックの padding は 16px 20px だが、左右はサイズが伸びる端末でも収まる 20px に統一。
gap でセクション間距離をコントロールするのは title-fix と同じ流儀。)

### Step 2. ヘッダー (`.head`) の黒曜化

モック準拠の最小ヘッダー:

```tsx
<header className={styles.head}>
  <p className={styles.chapterMark}>❦ 台帳</p>
  <h1 className={styles.title}>図鑑 / 記録</h1>
</header>
```

- `.head`: `display: flex; flex-direction: column; gap: 4px; flex-shrink: 0;`
- `.chapterMark`: `font-family: var(--font-display); font-size: 12px; letter-spacing: .32em; color: var(--text-blue); margin: 0;`
- `.title`: `font-family: var(--font-display); font-weight: 700; font-size: clamp(18px, 5.2vw, 22px); color: var(--text-strong); margin: 0;`

### Step 3. タブ (`.tabs`) を黒曜カードタブ風に

モック（line 751, 796）の `border-bottom: 1px solid rgba(255,255,255,.08)` の上で
active タブだけ gold 背景になる形を踏襲する。

- `.tabs`: `display: flex; gap: 4px; flex-shrink: 0; border-bottom: 1px solid var(--rule-soft);`
- `.tab`: `flex: 1; min-height: 44px; padding: 9px 0; border: none; background: transparent; color: var(--text-faint); font-size: 13px; cursor: pointer; border-radius: 3px 3px 0 0;`
- `.tabActive`: `background: var(--gold); color: var(--bg-mid); font-weight: 700;`

タップ時の `play('cursor')` は既存ロジックを保持。

### Step 4. 到達記録タブ (`.records`) を 2x2 グリッド化

既存実装は「大きな最深到達階 + dl 3 行 + ボス撃破履歴」だが、モックでは 2x2 カードに統計
4 件 + ボス履歴リスト。**機能を維持しつつモック寄りに**:

```tsx
<div className={styles.records}>
  <div className={styles.statGrid}>
    <div className={styles.statCard}>
      <span className={styles.statLabel}>最深到達階</span>
      <span className={styles.statNum}>{rec.deepestReached}<span className={styles.statSuffix}>F</span></span>
    </div>
    <div className={styles.statCard}>
      <span className={styles.statLabel}>挑戦回数</span>
      <span className={styles.statNum}>{rec.totalDives}</span>
    </div>
    <div className={styles.statCard}>
      <span className={styles.statLabel}>最高撃破ボス</span>
      {rec.highestBossDefeated > 0
        ? <span className={styles.statText}>{rec.highestBossDefeated}F のボス</span>
        : <span className={styles.statText}>—</span>}
    </div>
    <div className={styles.statCard}>
      <span className={styles.statLabel}>図鑑達成率</span>
      <div className={styles.ringWrap}>
        {/* 達成率リング (SVG)：モック準拠 */}
        <svg viewBox="0 0 60 60" className={styles.ringSvg} aria-hidden>
          <circle cx="30" cy="30" r="25" fill="none" stroke="var(--rule-base)" strokeWidth="5" />
          <circle cx="30" cy="30" r="25" fill="none" stroke="var(--gold)" strokeWidth="5"
                  strokeDasharray="157"
                  strokeDashoffset={Math.round(157 * (1 - sum.completionPct / 100))}
                  transform="rotate(-90 30 30)" strokeLinecap="round" />
        </svg>
        <span className={styles.ringText}>{sum.completionPct}%</span>
      </div>
    </div>
  </div>

  <p className={styles.h2Caption}>ボス撃破履歴 <span className={styles.h2Sub}>新しい順</span></p>
  {rec.bossDefeatLog.length === 0 ? (
    <p className={styles.empty}>まだボスを倒していません。</p>
  ) : (
    <ul className={styles.bossLog}>
      {rec.bossDefeatLog.slice().reverse().map((b, i) => (
        <li key={i} className={styles.bossRow}>
          <span className={styles.bossDepth}>{b.depth}F</span>
          <span className={styles.bossText}>のボスを撃破</span>
          <span className={styles.bossSeal}>✦</span>
        </li>
      ))}
    </ul>
  )}
</div>
```

SCSS:

- `.records`: `flex: 1 1 auto; min-height: 0; overflow-y: auto; overscroll-behavior: contain; touch-action: pan-y; display: flex; flex-direction: column; gap: 14px;`
- `.statGrid`: `display: grid; grid-template-columns: 1fr 1fr; gap: 10px;`
- `.statCard`: `background: var(--surface-panel); border: 1px solid var(--rule-soft); border-radius: 4px; padding: 12px 14px; display: flex; flex-direction: column; gap: 4px; min-height: 80px;`
- `.statLabel`: `font-size: 10px; letter-spacing: .12em; color: var(--text-faint);`
- `.statNum`: `font-family: var(--font-mono); font-size: clamp(22px, 6vw, 26px); font-weight: 700; color: var(--gold); line-height: 1;`
- `.statSuffix`: `font-size: 13px; color: var(--text-faint); margin-left: 2px;`
- `.statText`: `font-family: var(--font-display); font-size: 14px; color: var(--text-strong);`
- `.ringWrap`: `position: relative; width: 60px; height: 60px; margin-top: 4px;`
- `.ringSvg`: `width: 60px; height: 60px;`
- `.ringText`: `position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 13px; color: var(--gold);`
- `.h2Caption`: `font-size: 11px; letter-spacing: .16em; color: var(--gold); font-weight: 700; margin: 0;`
- `.h2Sub`: `color: var(--text-faint); letter-spacing: 0; font-weight: 400; margin-left: 6px; font-size: 10px;`
- `.bossLog`: `list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px;`
- `.bossRow`: `display: flex; align-items: center; gap: 12px; padding: 10px 12px; background: var(--surface-panel); border: 1px solid var(--rule-soft); border-radius: 3px; color: var(--text-base); font-size: 13px;`
- `.bossDepth`: `font-family: var(--font-mono); color: var(--gold); font-weight: 700;`
- `.bossText`: `flex: 1; font-size: 13px;`
- `.bossSeal`: `color: var(--danger-glow); font-size: 18px; transform: rotate(-12deg);`
- `.empty`: `color: var(--text-faint); font-size: 13px; text-align: center; padding: 16px 0; margin: 0;`

> **機能優先で省略するもの**:
> - モックでは「ボス撃破履歴」の各行に**ボススプライト画像**を表示しているが、既存の
>   `BossDefeatLog` 型は `depth` のみで `enemyId` を保持していない（`src/domain/types.ts`
>   を **読むだけで** 確認すること）。
>   スプライト表示は仕様に無いので **省略**。階数だけ表示する。
> - モックでは右上に「達成 43%」のテキスト表示があるが、リング内に同じ情報があるので
>   重複を避けて省略。
>
> **機能優先で追加するもは無し**（既存実装と機能等価）。

### Step 5. 図鑑タブ (`.codex`) の黒曜化

既存実装の「縦リスト + 展開行」構造を維持する（モックは 6列 grid だが、grid 化はテーマ
リデザインの範囲外なので **list のまま** 進める）。

> 判断: モックの図鑑 grid は機能的に「展開時に詳細を表示する」点が list と等価で、
> 並びと密度だけが違う。grid 化はテスト・展開ロジック・スクロール挙動の再設計が必要で、
> リデザイン本筋（黒曜トークン適用）の外側に出る。**今回は list のまま黒曜カラーだけ
> あてる**。grid 化はフェーズ 2 完了後の別タスクとする。

- `.codex`: `flex: 1 1 auto; min-height: 0; overflow-y: auto; overscroll-behavior: contain; touch-action: pan-y; display: flex; flex-direction: column; gap: 8px;`
- `.codexSummary`: `display: flex; justify-content: space-between; align-items: center; padding: 4px 0; font-size: 12px; color: var(--text-faint);` 右側に `<span className={styles.codexSummaryPct}>` で達成率 `{sum.completionPct}%` を `font-family: var(--font-mono); color: var(--gold);` で表示
- `.list`: `display: flex; flex-direction: column; gap: 6px;`
- `.row`: `display: flex; gap: 10px; align-items: center; padding: 10px 12px; background: var(--surface-panel); border: 1px solid var(--rule-soft); border-radius: 3px; color: var(--text-base); flex-wrap: wrap;`
- `.rowClickable:hover, .rowClickable:focus-visible`: `border-color: var(--rule-gold); background: var(--gold-tint); outline: none;`
- `.unseen`: `opacity: 0.55;`
- `.thumb`: `flex-shrink: 0; width: 40px; height: 40px; border-radius: 3px; background: var(--bg-deep); border: 1px solid var(--rule-soft); display: flex; align-items: center; justify-content: center; overflow: hidden;` （`EnemySprite size="sm"` を入れる枠）
- `.info`: `flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px;`
- `.name`: `font-family: var(--font-display); font-size: 14px; color: var(--text-strong); display: flex; align-items: center; gap: 6px;`
- `.badge`: `font-size: 9px; font-weight: 700; color: var(--bg-mid); background: var(--danger-glow); border-radius: 2px; padding: 1px 6px;` （撃破バッジ）
- `.expand`: `font-size: 10px; color: var(--text-faint); margin-left: auto;`
- `.sub`: `font-size: 11px; color: var(--text-faint);`
- `.empty`: 上記 statGrid と同様 `var(--text-faint)`

#### 展開詳細

- `.resistDetail`: `margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--rule-soft); display: flex; flex-direction: column; gap: 8px; width: 100%;`
- `.spriteLarge`: `display: flex; justify-content: center; padding: 8px 0 4px; background: var(--bg-deep); border-radius: 3px;`
- `.resistSection`: `display: flex; flex-direction: column; gap: 4px;`
- `.resistHead`: `font-size: 10px; font-weight: 700; color: var(--gold); letter-spacing: .14em; text-transform: uppercase;`

### Step 6. フッタ (`.foot` / `.back`)

```scss
.foot {
  flex-shrink: 0;
  padding-top: 8px;
  border-top: 1px solid var(--rule-soft);
}

.back {
  width: 100%;
  min-height: 46px;
  border: 1px solid var(--rule-base);
  border-radius: 3px;
  background: transparent;
  color: var(--text-mute);
  font-size: 13px;
  letter-spacing: .16em;
  cursor: pointer;

  &:active {
    background: var(--surface-elev);
  }
}
```

「拠点へ戻る」ボタンの文言は既存と同じ。`onClick={() => navigate({ name: 'town' })}` も維持。

### Step 7. ストーリー追加（任意）

既存 `Default` / `CodexTab` の play 関数は維持。`mockPostBoss` を使っているので、
**ボス撃破履歴に複数行ある状態が描画される**。新規 preset 追加は不要。

もし「撃破履歴が空のケース」を撮影したいときだけ、`Codex.stories.tsx` に
`EmptyRecords` ストーリーを追加してよい（`mockWithParty` を使えば撃破履歴が空）。
**追加しなくても可**。

---

## 追加トークン

新規追加なし。`_obsidian.scss` の既存 CSS 変数のみで全配色が成立する。
もし不足が見つかった場合は、コミット前に本書を更新してからトークンを追加すること。

---

## 検証

完了前に以下を回し、すべて緑であること:

```
yarn lint
yarn test --run
yarn tsc -b
```

`yarn tsc -b` が単独で動かないリポなら `yarn build` でもよい（成果物 `docs/` の
コミットはディレクター側で対応するのでここでは含めなくてよい）。

その後 Storybook を `yarn storybook --host 0.0.0.0` で起動し、`Pages/Codex` の
`Default` / `CodexTab` の 2 ストーリーが黒曜カラーで描画されることを目視確認。
スクリーンショットはディレクター側で別途撮るのでサブエージェント側では不要。

### 既存テスト

`src/pages/codex/__tests__/` 配下があれば、文言 assert（「拠点へ戻る」「図鑑」「到達記録」など）
を変えないように注意。SCSS module のクラス名を変えても、`getByText` / `getByRole`
ベースのクエリは通る。

---

## ブランチ / コミット

現在の `feature/redesign-A` ブランチで作業する。コミットを 1 つ追加して commit SHA を
報告（push はしない）。コミットメッセージは次の雛形:

```
feat(theme): apply 黒曜 OBSIDIAN MINIMAL to codex page

- rebuild records tab as 2x2 stat grid + completion ring (SVG)
- restyle codex tab list rows with obsidian tokens
- keep list layout (grid migration deferred) and maintain logic intact

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## 想定 Q&A

- **モックで「ドロップ」ブロックがボス詳細カードに出ているけど、ここで実装する?**
  しない。codex の既存仕様では「行展開時にスプライト + 耐性」を出す方針で、ドロップは
  リスト行のサブ文字列にテキストで載せている。仕様変更扱いなので**省略**。
- **`statBig`（大きな最深到達階）が消えるとテストが落ちないか?**
  既存テスト (`codex` のテストがあれば) は数値そのものを `getByText` で取っているはず。
  数字は statCard の `.statNum` 内に残るので通る。失敗したら**そのテストの構造調整**で
  追従する（assert 文の意味は変えない）。
- **モックの 6 列グリッド grid 図鑑にしないと駄目?**
  しない（理由は Step 5 冒頭の判断ブロックを参照）。
- **達成率リングは SVG で正しい?**
  `<svg>` を直書きする。`stroke-dasharray="157"` は `2 * pi * r ≈ 157` の決め打ち。
  `strokeDashoffset` は完成率から逆算するので `Math.round(157 * (1 - pct / 100))`。
  reduce-motion 時は CSS で `transition: none;` だけかけて、JS でアニメ追加はしない。
- **モックに「金=ボス / 緑=撃破 / 影=未遭遇」の凡例があるが入れる?**
  list 維持の方針なので、対応する色分けは:
  - 未遭遇: `.unseen` の `opacity: 0.55;`
  - 撃破: `.badge` の朱色「撃破」バッジ
  だけで足りる。凡例文は省略。

不明点が出たら止めて報告すること。
