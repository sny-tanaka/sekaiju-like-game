# フェーズ 2：guild-char 画面リデザイン（sonnet 用指示書）— **改訂版 v3 — 差分修正**

`dev-docs/redesign-A.md`（特に **§1.5 レイアウト運用ルール**）と
`dev-docs/redesign-A-title-fix.md`（flex column 化のパターン）を **必ず先に読む**こと。

キャラ詳細画面（ステータス / 装備 / スキルツリー / 育成）の v2 リデザインは適用済みだが、
ユーザーから「**まだデザインと異なる部分がある**」と指摘あり。本 v3 ではモック原本
(`/tmp/sekaiju-design/案A_v2.dc.html` line 512〜617) と現状実装を改めて精密に照合し、
**取りこぼした視覚差分のみを埋める**。

参考:
- 現状スクショ: `/tmp/sekaiju-screenshots-current/pages-guild-char--default.png`
  （※現状スクショは Storybook 設定の不整合で「story id mismatch」エラー表示になっており
  キャラ詳細画面そのものを写していないので注意。実装の差分照合は **`src/pages/guild-char/index.tsx` の
  コードとモック原本のテキスト**で行うこと）

> **重要**: 自分で `Edit` / `Write` / `Bash` を使って実装すること。
> **Agent / Task を spawn しないこと**（孫エージェントへの委譲禁止）。

---

## 0. 例外（必読 — ユーザーから明示された）

- **スキルツリー (`SkillTree` コンポーネント部分) はデザイン無視で現状維持**。
  - 触ってよいのは「`SkillTree` を *配置する wrapper* のスタイル」（`.skillTreeWrap` の枠線・背景・高さ等）まで。
  - **`@/components/common/SkillTree/SkillTree.tsx` 本体は触らない**（コンポーネントの API / 内部 / スタイルすべて触らない）。
  - モックの「8 ノード + svg 線 + ディテールパネル + 凡例」は **現状の `SkillTree` のままで OK**。
    モック忠実化しようとしない。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい
- `src/pages/guild-char/index.tsx`
- `src/pages/guild-char/style.module.scss`
- `src/pages/guild-char/GuildChar.stories.tsx`（必要なら新規ストーリーを追加。既存名は変えない）

### 触ってはいけない
- `@/components/common/SkillTree/*`（**例外で完全に固定**）
- 共通コンポーネント（`@/components/common/CharacterPortrait`, `ItemSprite`, `ResistBadges` 等）の API / 内部 / スタイル
- `@/domain/*`, `@/data/*` の関数・型・戻り値・副作用は変えない
- `@/store/*`, `@/audio/*` は変えない
- 他ページ (`src/pages/town`, `src/pages/guild`, `src/pages/shop`, `src/pages/forge` 等) は本タスクの範囲外
- 既存テスト (`*.test.ts`, `*.test.tsx`) の assert は変えない
- `src/_obsidian.scss` のグローバルキーフレーム名・既存トークンの値は変えない

---

## 2. やってはいけないこと

- 機能仕様 (`dev-docs/claude-design-brief.md` §4 キャラ詳細) の **変更は不可**。
  - モックでは「スキル / 育成」が別画面遷移（「スキル・育成へ ›」 primary）になっているが、
    現状実装は **同一画面に統合済み**。本 v3 では現状の統合構成を維持する（モックの 2 ボタン構成にしない）。
- 絶対配置でフッタ・アクションを置かない（§1.5）。育成 3 列ボタン（転職 / 称号 / 転生）は
  現状通り body の末尾に flex で積む（モックの絶対 `bottom:20px` は採用しない）。
- ロジックを触らない。スタイル＋極小の JSX 構造変更にとどめる。

---

## 3. モックとの差分一覧（v2 → v3 で直すべき箇所）

差分の **無い項目は書かない**。差分のあった項目だけ列挙。

### 3.1 ヘッダー

| # | 差分 | 修正方針 |
|---|---|---|
| **H-1** | モックには右端に **EXP 進捗ブロック**（`<div font-size:9px color:#8c8a84>EXP</div><div font-size:11px color:#c9a86a>72%</div>`）があるが、現状実装にない | キャラの EXP 情報は `char.exp` から計算可能（`@/domain/levelCurve` 等）。`computeNextLevelProgress(char)` 相当の関数が無ければ、シンプルに `char.exp` を表示するか **省略**して OK。レベル進捗を出すなら `font-family: var(--font-mono); font-size: 11px; color: var(--gold);` で右寄せ。<br>**判断**: ドメイン関数が無ければ追加実装せず省略する。EXP 関連の関数が既にあるなら採用。 |

その他（ポートレート 64x64・名前 Mincho 20px・「ガロン族 ・ 踊り子 ・ Lv34」サブ・前衛タグ）は v2 で一致。

### 3.2 ステータス（能力値）

| # | 差分 | 修正方針 |
|---|---|---|
| **S-1** | 見出し色: 現状 `var(--text-faint)`、モック `#c9a86a` (gold) | `.sectionTitle` の `color` を `var(--gold)` に変更。`font-weight: 700; letter-spacing: 0.16em;` はそのまま。**ただし全セクション見出しに同じクラスが当たっているので、影響範囲を確認**。モックでも他セクションの見出しは gold (能力値・種族耐性・装備・スキル) なので、全部 gold で OK。 |
| **S-2** | 見出しテキスト: 現状「ステータス」、モック「能力値」 | テキストを `能力値` に変更（コード上 `<p className={styles.sectionTitle}>ステータス</p>` → `能力値`）。 |
| **S-3** | `text-transform: uppercase` が当たっている | `.sectionTitle` の `text-transform: uppercase` を削除（日本語見出しなので不要）。 |
| **S-4** | ステセルの背景・枠線・パディング | 現状 `padding: 6px 0; background: #15171f; border: 1px solid rgba(255,255,255,.07);` で OK。差分なし。 |
| **S-5** | HP・TP の値色 | OK (`#9ed8b4` / `#8fb6e0`)。差分なし。 |
| **S-6** | その他のステ値色 | モックは `#e8e6e0`、現状は `var(--text-strong)` (`#f2ede1`)。微差なので **そのままでよい**。 |

### 3.3 種族耐性

| # | 差分 | 修正方針 |
|---|---|---|
| **E-1** | 見出しテキスト: 現状「種族耐性」、モック「種族耐性」 | 一致、差分なし。 |
| **E-2** | 見出し色は S-1 と同じ修正で gold になる | OK。 |
| **E-3** | モックは「属性 / 状態」の 2 行に分けて inline 並びでバッジ表示 | 現状実装は `ResistBadges` をそのまま使用、機能優先で OK。 |

### 3.4 装備セクション

| # | 差分 | 修正方針 |
|---|---|---|
| **Q-1** | 見出し色は S-1 と同じ修正で gold になる | OK。 |
| **Q-2** | 装備済み行の背景 `#1a1d26 + border:rgba(201,168,106,.35)` | 現状一致、差分なし。 |
| **Q-3** | 「外す」「選ぶ」チップ（white-space:nowrap; padding 4px 9px） | 現状一致、差分なし。 |
| **Q-4** | 候補リストの枠 `background:#0c0d11; border:1px solid rgba(255,255,255,.06); padding:10px 12px` | 現状実装は `var(--bg-deep)` (`#090a0d`) で僅かに暗い。`#0c0d11` に明示するかは細かい差なので **そのままでよい**。`var(--bg-deep)` でも実用上問題ない。 |
| **Q-5** | 候補行のアイコン 28x28、項目名 12px、「+8 AGI」緑文字、「装備」チップ右端 | 現状一致、差分なし。 |

### 3.5 スキルセクション（**スキルツリー本体は触らない / 例外**）

| # | 差分 | 修正方針 |
|---|---|---|
| **K-1** | 見出し色は S-1 と同じ修正で gold になる | OK。 |
| **K-2** | 見出しテキスト「スキル ・ ジョンスミス」（職業ではなくキャラ名） | 現状実装は `<span>スキル ・ {CLASSES[char.classId]?.name}</span>` で **職業名**を出している。モックに合わせて **キャラ名**に変更:<br>`<span>スキル ・ {char.name}</span>` |
| **K-3** | SP バッジ (`SP 4`): `font-family: mono, font-size:13px, color:#c9a86a, background:rgba(201,168,106,.1), border:1px solid rgba(201,168,106,.3), padding:3px 10px, border-radius:3px` | 現状一致、差分なし。 |
| **K-4** | サブタブ（職業 / 種族 / 称号）: モックは active が **gold 塗り** `background:#c9a86a; color:#0e0f13; font-weight:700; padding:5px 14px; border-radius:2px;`、非 active は **枠線のみ** | 現状実装は active で gold 塗りになっている。**差分なし**。 |
| **K-5** | **スキルツリー（`SkillTree` コンポーネント）の見た目** | ユーザー指示で **完全に現状維持**。`.skillTreeWrap` の枠 (高さ 268px / background `#0a0b0e` / border / padding 10px) もそのまま。凡例 (`.skillTreeLegend`) もそのまま。 |
| **K-6** | 習得済みスキル一覧の各行: モックは行カード `background:#15171f; border:1px solid rgba(255,255,255,.06); padding:7px 10px; border-radius:3px` + スキル名 (`flex:1`) + 「敵単・TP8」(中央) + 「●●○」 lv ピップ（右端） | 現状は border-bottom 線で区切ったテキスト行のみ。<br>**修正**: `.learnedItem` をカード形式に変更:<br>`background: var(--surface-panel); border: 1px solid var(--rule-soft); border-radius: 3px; padding: 7px 10px;`<br>border-bottom 線は削除。<br>スキル詳細（属性・TP・lv ピップ）は **データに無ければ省略**（機能拡張せず、視覚カード化のみ）。`learnedSkills` の各 entry から `skill.target` `skill.tpCost` を取り出せるなら追加表示してよいが、データ参照が複雑になるなら **lv 表示 + カード化**だけにとどめる。 |
| **K-7** | スキル名表示: 現状 `s.skillId.replace(/^skill_/, '')` で **ID**を表示 → モックは「三段斬り」のような日本語名 | データ側の `skill.name` を参照する必要がある。`@/data/skills`（あれば）から `SKILLS[skillId]?.name ?? fallback` を引く。**`@/data/*` を読むのは可、変更はしない**。データ取得関数があれば使う、無ければ現状の ID 表示のままで OK。 |

### 3.6 育成 3 列ボタン（転職 / 称号 / 転生）

| # | 差分 | 修正方針 |
|---|---|---|
| **G-1** | 配置: モックは絶対 `bottom: 20px`、現状は body 末尾の flex 配置 | §1.5 で絶対禁止なので **現状の flex 配置を維持**。 |
| **G-2** | ボタンサイズ・色 | 現状実装 (高さ 44px / 転職: 白枠 / 称号: gold 枠 / 転生: 赤枠) でモック一致。差分なし。 |
| **G-3** | サブテキストのフォントサイズ 8px | 現状一致、差分なし。 |

### 3.7 フッタ

| # | 差分 | 修正方針 |
|---|---|---|
| **F-1** | モックは「スキル・育成へ ›」primary 48px + 「一覧へ戻る」 sub 46px の **2 ボタン構成**、現状は「もどる」 sub 46px のみ | 現状実装は **スキル・育成を同一画面に統合済み**なので別画面遷移ボタンは不要 (`§2.やってはいけないこと` 参照)。<br>**修正**: テキストを「もどる」→「一覧へ戻る」に変更（モックの sub ボタンに合わせる）。これだけで OK。 |

### 3.8 育成 bottom sheet（転職 / 称号 / 転生）

差分なし。現状の bottom sheet は v2 でモック準拠の作りになっており、機能優先で必要な
input / select が並ぶ。

---

## 4. ゴール

実装後の見た目で、以下が満たされていること:

1. **セクション見出し**（能力値 / 種族耐性 / 装備 / スキル）がすべて **gold 色** `var(--gold)` で
   `letter-spacing: 0.16em; font-weight: 700;`（`uppercase` 不要）。
2. **「ステータス」→「能力値」** にテキスト変更。
3. **スキル見出しが「スキル ・ {char.name}」** になっている（職業名ではない）。
4. **習得済みスキル一覧**がカード形式の縦並びになっている（border-bottom の線区切りではなく）。
5. **フッタの戻るボタンが「一覧へ戻る」** になっている。
6. **スキルツリー (`SkillTree`)** は **触らず現状維持**。
7. iPhone SE / iPhone 16 / iPad mini の 3 視点で「要素が重ならない」「ページ全体スクロール無し」
   （body だけが縦スクロール）。

---

## 5. 実装ステップ（差分のある部分だけ直す）

### Step 1 — `style.module.scss` の調整

1. **`.sectionTitle` を gold + 非 uppercase に変更**:
   ```scss
   .sectionTitle {
     font-size: 11px;
     letter-spacing: 0.16em;
     color: var(--gold);       /* faint → gold */
     font-weight: 700;
     margin: 0 0 10px;
     /* text-transform: uppercase は削除 */
   }
   ```
2. **`.learnedItem` をカード化、border-bottom を削除**:
   ```scss
   .learnedItem {
     display: flex;
     align-items: center;
     gap: 8px;
     padding: 7px 10px;
     background: var(--surface-panel);
     border: 1px solid var(--rule-soft);
     border-radius: 3px;
     /* border-bottom 行 / &:last-child は削除 */
   }
   ```
3. **`.learnedList`**: `gap: 6px;` を追加（カード間の余白）。
4. **スキルツリー領域 (`.skillTreeWrap`)**: そのまま、何も触らない。

### Step 2 — `index.tsx` の構造変更

1. **能力値の見出しテキスト変更**: `<p className={styles.sectionTitle}>ステータス</p>` →
   `<p className={styles.sectionTitle}>能力値</p>`。
2. **スキル見出しのテキスト変更**:
   ```tsx
   <span className={styles.skillTitle}>スキル ・ {char.name}</span>
   ```
   （現状の `CLASSES[char.classId]?.name` を `char.name` に置換）。
3. **フッタテキスト変更**: 「もどる」 → 「一覧へ戻る」。
4. **EXP ブロック (H-1)**: ドメインに簡単な進捗関数が無ければ追加しない（保留）。
5. **習得済みスキル名表示 (K-7)**: `@/data/skills` から `name` を引ける関数があれば使う、
   無ければ現状のままで OK（本タスクの優先度は低い）。

### Step 3 — Storybook の動作確認

1. 現状 `pages-guild-char--default.png` は「story id mismatch」エラーで描画されていない。
   ストーリーファイル `GuildChar.stories.tsx` を読み、`firstMemberId` が `mockWithParty` の
   先頭メンバーと一致しているか確認。差分があれば修正（必要なら mock 側を読みに行く）。
2. `Default` ストーリーが正常にキャラ詳細画面を描画することを確認。
3. 4 つのセクション見出しが gold で出ること、習得済みスキルがカード形式で並ぶことを目視確認。

### Step 4 — スクショ確認（任意）

ヘッドレス Chrome で `pages-guild-char--default` を撮り直し、
ヘッダー / 能力値 / 装備 / スキルツリー（変更なし）/ 習得済みスキル / 育成 3 ボタン / フッタの順で
モック対比して差分が無くなったことを確認。

---

## 6. 検証（必須）

完了前に **すべて緑にする**:

```bash
yarn test       # vitest（既存テストの assert は変えない前提）
yarn lint       # eslint
yarn build      # bump-patch-version.mjs → tsc -b → vite build
```

`yarn build` を実行すると `docs/` と `package.json` のバージョンも更新される（CLAUDE.md 参照）。
**`docs/` と更新後 `package.json` も同じコミットに含めること**。

---

## 7. コミット

- 自分でコミットする（ディレクターがレビュー後に push する）。
- 規模に応じて 1〜2 個のコミットに分割可（例: スタイル調整／build 成果物）。
- コミットメッセージ例:
  - `style(guild-char): セクション見出しを gold 化し、習得済みスキルをカード形式に揃える`
  - `chore(build): rebuild docs/ after guild-char v3 fixes`
- 完了したら **commit SHA を報告**（push はしない）。
