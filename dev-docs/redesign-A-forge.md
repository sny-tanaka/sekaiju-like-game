# フェーズ 2：forge 画面リデザイン（sonnet 用指示書）— **改訂版 v5 — 案A v3 完全対応**

`dev-docs/redesign-A.md`（特に **§1.5 レイアウト運用ルール**）と
`dev-docs/design-source-v3-changelog.md`（**v3 で確定した out-of-spec 整理判断の出典**）を
**必ず先に読む**こと。

鍛冶屋画面（強化 / リサイクル ＋ 強化確認ダイアログ）は v3 まででモック忠実化が完了しているが、
Claude Design から `案A v3` が到着し、out-of-spec 要素のうち以下 2 点が **「削除」** 判定になった。
本 v5 では v3 のモック原本 `/tmp/sekaiju-design/案A_v3.dc.html`（line 662〜722、`06 forge`）と
現状実装を改めて照合し、**v3 判定に追随する修正**だけを行う。

参考:
- v3 changelog: `dev-docs/design-source-v3-changelog.md` 表 §B「6 forge」行
  - 断片→インゴット変換ボタン → **削除**（「10 個ごと自動変換（操作不要）」の注記に置換）
  - 6a 行内 ATK 予測 → **削除（簡略化）**（行内は `攻撃強化 +n → +n+1` のみ。詳細 ATK 予測は 6c に残置）
- 既存実装: `src/pages/forge/index.tsx`, `src/pages/forge/style.module.scss`
- 現状スクショ: `/tmp/sekaiju-screenshots-current/pages-forge--default.png`,
  `/tmp/sekaiju-screenshots-current/pages-forge--recycle.png`（v3 直前時点）

> **重要**: 自分で `Edit` / `Write` / `Bash` を使って実装すること。
> **Agent / Task を spawn しないこと**（孫エージェントへの委譲禁止）。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい
- `src/pages/forge/index.tsx`
- `src/pages/forge/style.module.scss`
- `src/pages/forge/Forge.stories.tsx`（必要なら新規ストーリーを追加。既存名は変えない）

### 触ってはいけない
- 共通コンポーネント（`@/components/common/ItemSprite`, `InkSplatter` 等）の API / 内部 / スタイル
- `@/domain/forge.ts`, `@/data/*` の関数・型・戻り値・副作用は変えない
  （`buildStatPreview` 自体は `index.tsx` 内のローカル関数なので削除可能）
- `@/store/*`, `@/audio/*` は変えない
- 他ページ (`src/pages/town`, `src/pages/guild`, `src/pages/guild-char`, `src/pages/shop` 等) は本タスクの範囲外
- 既存テスト（特に `src/domain/forge.test.ts`）の assert は変えない
- `src/_obsidian.scss` のグローバルキーフレーム名・既存トークンの値は変えない

---

## 2. やってはいけないこと

- **Agent / Task ツールで子エージェントを spawn しない**（このタスクは自分で完結する）
- 機能仕様 (`dev-docs/claude-design-brief.md` §4 鍛冶屋) の **変更は不可**。
  - 「一括分解」「リサイクルタブのチェックボックス」など、機能仕様で残すと決めた UI はそのまま据え置く。
  - 断片→銅インゴットの自動変換ロジックは `recycle()` 側で `FRAGMENTS_PER_INGOT` ごとに繰り上がる
    既存挙動を維持する（domain は触らない）。
- 共通コンポーネント・既存テスト assert を変更しない（モック忠実化の名目で破壊しない）。
- 絶対配置でフッタ・行を置かない（§1.5）。
- ロジック（強化計算・断片計算）は変えない。スタイル＋必要最小限の JSX 構造変更にとどめる。
- **詳細 ATK 予測表示そのものを撤去しない**。行内（リスト 1 行のサブテキスト）からは消すが、
  **強化確認ダイアログ 6c の補足ボックス**には現状通り `ATK +N → +M` を残す。

---

## 3. モックとの差分一覧 + out-of-spec 判断の反映

差分の **無い項目は書かない**。v5 で直すべき差分だけ列挙する。

### 3.1 リサイクルタブ末尾の「断片→インゴット変換」 — **★削除 ★**

| # | 現状実装 | v3 モック | 修正方針 |
|---|---|---|---|
| **R-conv** | `index.tsx` line 354〜371 に `.convertHint` + `.convertBtn`（disabled）で「断片10→銅1」チップが配置されている | モック (v3 line 696) は `dashed` 枠 + `♺` アイコン + テキスト「断片は 10 個ごとに <span color=gold>銅インゴット 1</span> へ自動変換されます（変換操作は不要）」 | **ボタンを削除し、テキスト注記だけ残す**。下記の `.convertHint` リファクタを行う。 |

実装方針:

1. `index.tsx` の `convertHint` ブロックを次のように差し替える:
   ```tsx
   {tab === 'recycle' && (
     <div className={styles.convertHint}>
       <span className={styles.convertIcon} aria-hidden="true">♺</span>
       <span className={styles.convertText}>
         断片は 10 個ごとに <span className={styles.convertAccent}>銅インゴット 1</span> へ
         <span className={styles.convertDim}>自動変換</span>されます（変換操作は不要）
       </span>
     </div>
   )}
   ```
2. `index.tsx` 内の `fragmentsEnough` 変数および `FORGE.FRAGMENTS_PER_INGOT` の `import` は、
   他で使っていなければ削除する。`FORGE.FRAGMENTS_PER_INGOT` の参照を消したことで `data/balance` から
   引いていた値が未使用になるなら、必要に応じて `import` も整理する（`FORGE.INGOT_INC` 等は強化タブで
   引き続き必要）。
3. `style.module.scss` の `.convertHint` を **「dashed 枠の注記行」** に作り替える:
   ```scss
   .convertHint {
     margin-top: 6px;
     background: rgba(255, 255, 255, 0.03);
     border: 1px dashed rgba(201, 168, 106, 0.25);
     border-radius: 4px;
     padding: 11px 14px;
     display: flex;
     align-items: center;
     gap: 9px;
   }
   .convertIcon {
     font-size: 14px;
     color: var(--gold);
     flex-shrink: 0;
   }
   .convertText {
     font-size: 11px;
     color: var(--text-mute);
     line-height: 1.5;
   }
   .convertAccent {
     color: #c98a5b; /* 銅インゴット色 */
   }
   .convertDim {
     color: var(--text-mute);
   }
   ```
   既存の `.convertLabel` / `.convertBtn` のセレクタは **完全に削除**して構わない（参照が消えるため）。

### 3.2 強化タブ 6a — 行内 ATK 予測 → **★簡略化 ★**

| # | 現状実装 | v3 モック | 修正方針 |
|---|---|---|---|
| **E-stat** | `index.tsx` line 219〜229 の `.statPreview` で `{slotLabel} ・ {statPrev.label} +{curVal} → +{nextVal}` を表示（例: `武器 ・ ATK +62 → +68`） | モック (v3 line 675) は `武器 ・ 攻撃強化 +N → <span color=#9ed8b4>+N+1</span>` のみ。ステ補正の数値は出さず、**強化値の昇格だけ**を表示 | **行内テキストを「強化値の昇格だけ」に簡略化**する。詳細 ATK 予測は 6c ダイアログに残置（下記 3.3）。 |

実装方針:

1. `index.tsx` 強化タブ行カードの `.statPreview` を次のように書き換える:
   ```tsx
   <span className={styles.statPreview}>
     {maxed ? (
       <>{slotLabel} ・ 最大強化</>
     ) : (
       <>
         {slotLabel} ・ 攻撃強化 +{e.forgeLevel} →{' '}
         <span className={styles.statNext}>+{nextLevel}</span>
       </>
     )}
   </span>
   ```
   - `statPrev` 変数の算出は **行カードレベルでは不要**。`buildStatPreview` 呼び出し（line 192）を
     **強化タブの行内表示からは削除**する。
   - `nextLevel` は `Math.min(FORGE.MAX_LEVEL, e.forgeLevel + FORGE.INGOT_INC.copper)` を引き続き使う
     （銅+1 を基準にした 1 段昇格の表示）。
2. `buildStatPreview` 関数自体は **6c ダイアログでまだ使う**（下記 3.3）ので **削除しない**。
3. `style.module.scss` の `.statNext` 緑色 (`#9ed8b4`) は流用できる。`.statPreview` の `color` は
   モック準拠で `var(--text-mute)` (`#8c8a84`) のまま据置。
4. **「攻撃強化」** という表現は武器以外のスロットでもモック準拠で統一する（モックも
   `武器 ・ 攻撃強化 +N → +N+1` と書いていて、防具に対しては `防具 ・ 最大強化` のみで
   `攻撃強化` 表記は使っていない）。本実装でも `maxed` でない非武器スロット（防具・装飾）に対しても
   `攻撃強化` で出して構わない（差分が出ない場合だけ表現を統一）。気になる場合は、
   `eq?.slot === 'weapon'` の場合のみ「攻撃強化」、それ以外は「強化」と読み替えても OK。
   **判断**: 最小修正に倒すなら全スロットで「攻撃強化」とする。

### 3.3 強化確認ダイアログ 6c — **★ATK 予測は据置 ★**

| # | 現状実装 | v3 モック | 修正方針 |
|---|---|---|---|
| **C-stat** | `index.tsx` line 456〜488 の `.dialogCostBox` に `消費: 銀インゴット ×1 ・ ATK +68 → +71` を表示 | モック (v3 line 716) も同じく `消費: 銀インゴット ×1 ・ ATK +68 → <span color=#9ed8b4>+71</span>` | **据置**。行内（6a）から消した詳細 ATK 予測は **このダイアログにだけ残す**。`buildStatPreview` は ここでだけ使う。 |

実装方針: ダイアログ JSX は **触らない**。`buildStatPreview` 呼び出しは line 457 の IIFE のみが残る形になる。

### 3.4 その他（差分なし）

ヘッダ、タブバー、ヒント文、強化タブ行の MAX チップ、インゴットボタン 3 種、リサイクル行カード、
分解確認ダイアログ、一括分解バー、一括分解確認ダイアログ、フッタ、強化成功 gold InkSplatter は
**v3 時点でモック一致**。v5 では触らない。

---

## 4. データ拡張の方針

**forge では不要**。`Character` 型・`SaveData` スキーマ・マイグレーション・テストの追加は一切しない。
ロジック（`forgeWithIngot` / `recycle` / `recycleMany` / `recycleFragments`）も触らない。

---

## 5. 実装ステップ

### Step 1 — 行内 ATK 予測の簡略化（3.2）

1. `src/pages/forge/index.tsx` の強化タブ行カード `.statPreview` を「強化値の昇格だけ」に書き換える。
2. 行カードレベルの `buildStatPreview(e.masterId, e.forgeLevel, nextLevel)` 呼び出しを削除。
   ローカル変数 `statPrev`（line 192）が未使用になるので削除する。
3. `buildStatPreview` 関数本体は `6c` ダイアログ用に **残す**（line 456 の IIFE から呼ばれる）。

### Step 2 — 断片→インゴット変換ボタンの撤去（3.1）

1. `src/pages/forge/index.tsx` の `convertHint` ブロックを **アイコン + テキスト注記** だけに置き換える。
2. `fragmentsEnough` 変数および `FORGE.FRAGMENTS_PER_INGOT` の参照を削除（未使用になる場合）。
3. `style.module.scss` の `.convertHint` を **dashed 枠の注記行** に作り替える。`.convertLabel` / `.convertBtn`
   は削除して構わない（参照が消えるため）。

### Step 3 — Storybook で確認

1. 既存の `Default` / `Recycle` ストーリーで:
   - 強化タブ 1 行目に **「武器 ・ 攻撃強化 +N → +N+1」** だけが出ること（数値 ATK 表示が消えている）。
   - リサイクルタブ末尾に **dashed 枠の自動変換注記** が出ていて、ボタンが無いこと。
2. 強化確認ダイアログ（`ForgeConfirm` ストーリーがあればそれ、なければ新規追加）で `+2 → +3` の下に
   `消費: 銀インゴット ×1 ・ ATK +68 → +71` の補足ボックスがまだ出ること。

### Step 4 — スクショ確認（任意）

ヘッドレス Chrome で `pages-forge--default` `pages-forge--recycle` `pages-forge--confirm`
（あれば）を撮り直し、v3 モックと並べて差分が無いことを確認する。

---

## 6. 検証

完了前に **すべて緑にする**:

```bash
yarn test       # vitest（既存テスト assert は変えない前提）
yarn lint       # eslint
yarn build      # bump-patch-version.mjs → tsc -b → vite build
```

特に注意:
- **vitest と eslint は型エラーを検出しない**。`yarn build`（または `tsc -b`）を必ず回すこと。
  `FORGE.FRAGMENTS_PER_INGOT` の参照削除で未使用 import 警告が出る場合は併せて掃除する。
- `yarn build` を実行すると `docs/` と `package.json` のバージョンが更新される。
  **`docs/` と更新後 `package.json` も同じコミットに含めること**。

---

## 7. コミット

- 自分でコミットする（push はしない。ディレクターがレビュー後に push する）。
- 規模に応じて 1〜2 個のコミットに分割可。
- コミットメッセージ例:
  - `style(forge): 案A v3 取り込み（行内ATK予測撤去・断片自動変換注記化）`
  - `chore(build): rebuild docs/ after forge v5 fixes`
- 完了したら **commit SHA を報告**（push はしない）。
