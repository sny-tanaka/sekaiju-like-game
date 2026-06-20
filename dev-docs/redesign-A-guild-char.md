# フェーズ 2：guild-char 画面リデザイン（sonnet 用指示書）— **改訂版 v5 — 案A v3 完全対応**

`dev-docs/redesign-A.md`（特に **§1.5 レイアウト運用ルール**）と
`dev-docs/design-source-v3-changelog.md`（**v3 で確定した out-of-spec 整理判断の出典**）を
**必ず先に読む**こと。

キャラ詳細画面（ステータス / 装備 / スキルツリー / 育成）は v3 まででモック忠実化（セクション見出し
gold 化・「能力値」改称・習得スキルカード化・「一覧へ戻る」フッタ）が完了している。
Claude Design から `案A v3` が到着し、out-of-spec 要素のうち以下 1 点が **「追加」** 判定として確定した。

本 v5 では v3 のモック原本 `/tmp/sekaiju-design/案A_v3.dc.html`（line 512 付近〜600、`04 guild-char`）
と現状実装を改めて照合し、**v3 判定に追随する修正**を行う。

参考:
- v3 changelog: `dev-docs/design-source-v3-changelog.md` 表 §B「4 guildChar」行
  - 4a EXP % → **追加**（`Character.exp` を使ってヘッダーに `Lv X (EXP n/m)` 形式で表示）
  - 4b SkillTree → **対象外**（ユーザー指示で現状実装のまま・触らない。v3 でも未変更）
- 既存実装: `src/pages/guild-char/index.tsx`, `src/pages/guild-char/style.module.scss`

> **重要**: 自分で `Edit` / `Write` / `Bash` を使って実装すること。
> **Agent / Task を spawn しないこと**（孫エージェントへの委譲禁止）。

---

## 0. 例外（必読 — ユーザーから明示された）

- **スキルツリー (`SkillTree` コンポーネント部分) はデザイン無視で現状維持**。
  - 触ってよいのは「`SkillTree` を *配置する wrapper* のスタイル」（`.skillTreeWrap` の枠線・背景・高さ等）まで。
  - **`@/components/common/SkillTree/SkillTree.tsx` 本体は触らない**。
  - モックの 8 ノード + svg 線 + ディテールパネル + 凡例は **現状の `SkillTree` のままで OK**。
    モック忠実化しようとしない。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい
- `src/pages/guild-char/index.tsx`
- `src/pages/guild-char/style.module.scss`
- `src/pages/guild-char/GuildChar.stories.tsx`（必要なら新規ストーリーを追加。既存名は変えない）

### 触ってはいけない
- `@/components/common/SkillTree/*`（**例外で完全に固定**）
- 共通コンポーネント（`@/components/common/CharacterPortrait`, `ItemSprite`, `ResistBadges`,
  `StatBar` 等）の API / 内部 / スタイル
- `@/domain/types.ts`（`Character.exp` は **既に存在**するので追加不要）
- `@/domain/saveData.ts`（`createCharacter` は **既に `exp: 0` を返す**ので変更不要）
- `@/domain/battle.ts`（`grantExpToChar` は **既に `Character.exp` をインクリメントする**ので変更不要）
- `@/store/saveSerialization.ts`（**schemaVersion 4 のまま据置**。マイグレーション追加不要）
- `@/data/balance.ts` の `expToNext` / `canGainExp`（**既存関数をそのまま参照する**。変更不要）
- `@/store/*`, `@/audio/*` は変えない
- 他ページ (`src/pages/town`, `src/pages/guild`, `src/pages/shop`, `src/pages/forge` 等) は本タスクの範囲外
- 既存テスト (`*.test.ts`, `*.test.tsx`) の assert は変えない
- `src/_obsidian.scss` のグローバルキーフレーム名・既存トークンの値は変えない

---

## 2. やってはいけないこと

- **Agent / Task ツールで子エージェントを spawn しない**（このタスクは自分で完結する）
- 機能仕様 (`dev-docs/claude-design-brief.md` §4 キャラ詳細) の **変更は不可**。
  - モックでは「スキル / 育成」が別画面遷移になっているが、現状実装は同一画面に統合済み。
    本 v5 では現状の統合構成を維持する（モックの 2 ボタン構成にしない）。
- 絶対配置でフッタ・アクションを置かない（§1.5）。育成 3 列ボタン（転職 / 称号 / 転生）は
  現状通り body の末尾に flex で積む（モックの絶対 `bottom:20px` は採用しない）。
- ロジックを触らない。スタイル＋表示用の JSX 構造変更にとどめる。
- **データ型・マイグレーションを追加しない**（後述 §4 を参照）。
- スキルツリー本体（`SkillTree` コンポーネント）に手を入れない。

---

## 3. モックとの差分一覧 + out-of-spec 判断の反映

差分の **無い項目は書かない**。v5 で直すべき差分だけ列挙する。

### 3.1 ヘッダー EXP 進捗ブロック — **★追加 ★**

| # | 現状実装 | v3 モック | 修正方針 |
|---|---|---|---|
| **H-exp** | `index.tsx` line 137〜143 のヘッダーは `name` + `{race} ・ {class} ・ Lv{level}` サブ + 前衛/後衛タグのみ。EXP 表示が無い | モック (v3 line 500 付近) は右端に EXP 進捗ブロック `<div>EXP</div><div>72%</div>` | **追加**: ヘッダー右端に **EXP 進捗ブロック**を配置する。Lv キャップ到達済みのキャラは "MAX" 表示。`Character.exp` は既に存在し、`grantExpToChar` で戦闘勝利時に積まれている。 |

実装方針:

#### A. 必要なヘルパー関数を import

`index.tsx` の import 群に以下を追加:

```ts
import { canGainExp, expToNext } from '@/data/balance';
```

（`@/data/balance` には既に両関数がある。`canGainExp(level): boolean` と `expToNext(level): number`）

#### B. ヘッダー JSX に EXP 進捗ブロックを追加

`<header className={styles.head}>` の中、`.headInfo` の右隣に新規 `.headExp` を追加:

```tsx
<header className={styles.head}>
  <div className={styles.headPortrait}>
    <CharacterPortrait raceId={char.raceId} classId={char.classId} size={64} />
  </div>
  <div className={styles.headInfo}>
    <h1 className={styles.headName}>{char.name}</h1>
    <span className={styles.headSub}>
      {RACES[char.raceId]?.name} ・ {CLASSES[char.classId]?.name} ・ Lv{char.level}
    </span>
    {pos ? <span className={styles.posTag}>{pos}</span> : null}
  </div>

  {/* EXP 進捗ブロック（v5: 案A v3 取り込み）。Lv キャップ到達済みは MAX 表示。 */}
  {canGainExp(char.level) ? (
    <div className={styles.headExp}>
      <span className={styles.headExpLabel}>EXP</span>
      <span className={styles.headExpValue}>
        {Math.round((char.exp / expToNext(char.level)) * 100)}%
      </span>
    </div>
  ) : (
    <div className={styles.headExp}>
      <span className={styles.headExpLabel}>EXP</span>
      <span className={styles.headExpValueMax}>MAX</span>
    </div>
  )}
</header>
```

**判断ポイント**:
- **百分率表記** (`72%`) を採用する（モック準拠）。`Lv X (XX/YY exp)` 表記はスマホヘッダーで
  数字が冗長になるため不採用。`Lv X` は既存サブテキスト側にあるので冗長を避ける。
- **Lv キャップ到達済み** (`!canGainExp(level)`) は「MAX」表示（`expToNext` を呼ぶと意味のない値が
  返るため、回避する）。

#### C. `style.module.scss` に `.headExp` 系を追加

`.headInfo` の隣に縦並びで右寄せ:

```scss
.headExp {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  margin-left: 8px;
}

.headExpLabel {
  font-size: 9px;
  letter-spacing: 0.14em;
  color: var(--text-mute);
  text-transform: uppercase;
}

.headExpValue {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--gold);
  font-weight: 600;
}

.headExpValueMax {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--gold);
  font-weight: 600;
  letter-spacing: 0.08em;
}
```

ヘッダー本体 `.head` の flex 構造（`gap: 14px`, `align-items: center`）は据置で OK。
右寄せは `.headExp` 側の `margin-left: 8px` と `.headInfo` の `flex: 1; min-width: 0;` で確保される。

#### D. EXP バー（StatBar）は使わない

v3 モックは「数値だけ」を右端に出しており、進捗バーまでは描画していない。
StatBar での進捗バー追加は **不採用**（モック準拠）。バー化を希望する場合は別タスクで検討。

### 3.2 スキルツリー (4b) — **★対象外 ★**

| # | 現状実装 | v3 モック | 修正方針 |
|---|---|---|---|
| **4b** | 現状の `SkillTree` コンポーネント | v3 でも未変更（モック側のデザイン判断保留） | **完全に触らない**。ユーザー指示。 |

### 3.3 その他（v3 で既に対応済み）

以下は v3 時点でモック一致のため v5 では触らない:
- セクション見出しの gold 化 (`var(--gold)` + 非 uppercase)
- 「ステータス」 → 「能力値」 へのテキスト変更
- スキル見出し「スキル ・ {char.name}」
- 習得済みスキルのカード化（`.learnedItem` の border-bottom 撤去）
- フッタ「一覧へ戻る」
- 種族耐性 / 装備 / 育成 3 列ボタン / 育成 bottom sheet

---

## 4. データ拡張の方針

### 結論: **新規データ拡張は不要**

v3 changelog では「`Character.exp` を追加（経験値の現在値保持）を仕様化。データ移行は別途」と
書かれているが、**現リポジトリでは既に以下が揃っている**ため、本 v5 では何も追加しない:

| 項目 | 現状 | v5 での扱い |
|---|---|---|
| `Character.exp: number` | **既存** (`src/domain/types.ts` line 588) | 追加不要 |
| `createCharacter` での `exp: 0` 初期化 | **既存** (`src/domain/saveData.ts` line 85) | 変更不要 |
| 戦闘勝利時の `exp` 加算 | **既存** (`src/domain/battle.ts` `grantExpToChar`, line 1240〜1255) | 変更不要 |
| Lv 昇格時の `exp -= expToNext(level)` | **既存** (`battle.ts` line 1244〜1248) | 変更不要 |
| Lv キャップ判定 `canGainExp(level)` | **既存** (`src/data/balance.ts` line 159) | 変更不要 |
| `expToNext(level)` 関数 | **既存** (`src/data/balance.ts` line 144) | 変更不要 |
| schemaVersion / マイグレーション | **現状 4。`exp` は既存スキーマに入っているのでバンプ不要** | 変更不要 |
| 既存セーブの後方互換 | `createCharacter` で生成されたキャラは `exp: 0` を持つ。古いセーブには `exp` が欠けている可能性があるが、`grantExpToChar` 内で `char.exp + (canGainExp ? exp : 0)` と参照しているので、`exp` が `undefined` のセーブを読むと `NaN` になる懸念がある | **要確認**。マイグレーション不要と判断した場合のサニタイズは下記 §4.1 を参照 |

### 4.1 古いセーブの `exp` 欠落への対応（防御的にやるなら）

`Character.exp` は型上は必須 (`exp: number`) で、`createCharacter` でも `exp: 0` で初期化されているが、
古い localStorage に保存されたデータが本フィールドを欠いている可能性は否定できない。

ただし:
- 現リポジトリの schemaVersion は **既に 4**（既存）であり、`Character.exp` は v3 時点で型に存在している。
- `grantExpToChar` でも `char.exp` を直接参照しており、現時点で動作しているなら欠落は無いと推測される。

**判断**: 本 v5 ではマイグレーションも防御的サニタイズも追加しない。`canGainExp(char.level) ?
Math.round((char.exp / expToNext(char.level)) * 100) : 'MAX'` の表示式で `char.exp` が
`undefined`/`null` だと `NaN%` になる懸念があるため、念のため **JSX 側で null 合体** を入れる:

```tsx
{Math.round(((char.exp ?? 0) / expToNext(char.level)) * 100)}%
```

これだけで防御的に十分。`Character` 型は変更しない（`exp: number` のまま）。
古いセーブで `exp` が undefined だった場合も 0% 表示で safe フォールバックする。

### 4.2 schemaVersion バンプは行わない

v3 changelog では「schemaVersion 5、既存セーブは `exp = 0` で初期化」とあるが、現リポジトリでは
**`Character.exp` が既存スキーマ (v4) に組み込まれており、`createCharacter` 経由で生成された
すべてのキャラは `exp` を持つ**。`MIGRATIONS[4] → 5` の追加は不要。

**v5 で `schemaVersion` を上げない**こと（他のフィールドの拡張と巻き込み事故を起こさないため）。

---

## 5. 実装ステップ

### Step 1 — `index.tsx` のヘッダーに EXP 進捗ブロックを追加

1. `import { canGainExp, expToNext } from '@/data/balance';` を追加。
2. `<header>` 内、`.headInfo` の隣に `.headExp` ブロックを追加。
   - `canGainExp(char.level)` 真: `Math.round(((char.exp ?? 0) / expToNext(char.level)) * 100)%`
   - `canGainExp(char.level)` 偽: `MAX`
3. 既存の `headPortrait` / `headInfo` / `headSub` / `posTag` には触らない。

### Step 2 — `style.module.scss` に `.headExp` / `.headExpLabel` / `.headExpValue` / `.headExpValueMax` を追加

1. `.head` 系のセクションに上記 SCSS 差分を追加。
2. 既存の `.headName` / `.headSub` / `.posTag` の値は変えない。

### Step 3 — Storybook で確認

1. `GuildChar.stories.tsx` の既存 `Default` ストーリーで、ヘッダー右端に `EXP 72%`（または現状の
   `mockWithParty` で生成されるキャラの `exp` 値に応じた％）が gold mono で出ているか確認。
2. 高 Lv キャラのストーリー（あれば）で `MAX` 表示が出るか確認。
   - `mockWithParty` の party 構成が低レベルのみなら、`__stories__/mockSaves.ts` に新規 preset
     （Lv キャップ到達済みキャラを含む）を追加してストーリーを 1 つ足してもよい。任意。
3. 4 つのセクション見出し（能力値 / 種族耐性 / 装備 / スキル）が gold で出ていること、
   習得済みスキルがカード形式で並ぶこと、フッタが「一覧へ戻る」になっていることを再確認
   （いずれも v3 時点で実装済み・本 v5 では触らない）。

### Step 4 — スクショ確認

ヘッドレス Chrome で `pages-guild-char--default` を撮り直し、ヘッダー右端の EXP 表示が出ているか
モック対比して差分が無くなったことを確認する。

---

## 6. 検証

完了前に **すべて緑にする**:

```bash
yarn test       # vitest（既存テスト assert は変えない前提）
yarn lint       # eslint
yarn build      # bump-patch-version.mjs → tsc -b → vite build
```

特に注意:
- **`Character` 型は変更しない**。`exp` は既存。既存テスト (`saveData.test.ts`,
  `inventory.test.ts`, `formation.test.ts`, `skillTree.test.ts`, `ailmentResist.test.ts`,
  `enemyAi.test.ts`, `battle.test.ts` 等) が `createCharacter` 経由で生成しているキャラは
  `exp: 0` を持っているので影響なし。
- マイグレーション (`MIGRATIONS`) を追加しないこと。schemaVersion は 4 のまま据置。
- `yarn build` を実行すると `docs/` と `package.json` のバージョンが更新される。
  **`docs/` と更新後 `package.json` も同じコミットに含めること**。

---

## 7. コミット

- 自分でコミットする（push はしない。ディレクターがレビュー後に push する）。
- 規模に応じて 1〜2 個のコミットに分割可（例: ヘッダー EXP 追加／build 成果物）。
- コミットメッセージ例:
  - `feat(guild-char): 案A v3 取り込み（ヘッダーに EXP% を表示）`
  - `chore(build): rebuild docs/ after guild-char v5 fixes`
- 完了したら **commit SHA を報告**（push はしない）。
