# v2.0.0 副業システム — 設計書

## 背景・要望

ユーザ要望:
「メインの職業と別で好きな職業を1つ副業として設定できるようにします。副業もスキル画面でスキルを習得できるようにします」

その後の仕様確認 (AskUserQuestion 結果):

- 設定場所: **ギルドの各メンバー詳細画面 (`src/pages/guild-char/`) から後付け設定**
- 装備制限: **本業のみ**。副業の `equipableWeaponTypes / equipableArmorTypes` は使わない。スキル習得だけに影響
- 称号 (`titleId`) との関係: **並列に両方持てる** (本業 / 種族 / 称号 / 副業 の4ツリーが習得対象)
- 変更可否: **いつでも変更可**。副業を変えたとき、副業ツリーで取得していたスキルに使った SP は戻る
- **当初提示の「副業スキルは +1 SP コスト」ルールは廃止**。本業と同じ深さ別コストで習得する

## 既存の職業システム整理

| 概念 | 型 | 役割 |
|---|---|---|
| **本業** | `Character.classId: ClassId` | 装備制限・成長傾向・職業スキルツリー。`transferClass` で変更可 |
| **称号** | `Character.titleId: TitleId \| null` | F30 到達後に `CLASSES[classId].titleOptions` の2択から選ぶ第2ツリー。MVP では付け替え不可 |
| **種族** | `Character.raceId: RaceId` | 不変。種族スキルツリー (ユニオン・採集) |
| **副業 (NEW)** | `Character.subClassId: ClassId \| null` | 本業と別の職業ツリーを1つ追加で開放。スキル習得のみに影響、装備制限・統計補正なし |

スキル習得対象 = 本業ツリー + 種族ツリー + 称号ツリー + **副業ツリー** の合成 (`skillNodesFor` が返すノード集合)。

## 重要な注意: スキル ID は職業間で共有されている

`src/data/classes.ts` の `skillId` を集計すると、複数職業に登場する skillId が大量にある (例: `skill_heal` は medic/dancer/ranger/title など 4 箇所)。
これは『世迷』元ネタの「複合スキル」を踏襲した設計で、**意図的に共有されている**。

副業を設定するとき、副業ツリーに含まれる skillId のうち、本業/種族/称号ツリーにも登場するものは **「副業特有」ではない** ので、副業解除/変更時に剥がすべきではない。

→ `setSubClass` 内で `protectedIds` (本業/種族/称号で到達可能な skillId 集合) を計算し、剥がす対象を「副業ツリーのみに存在する skillId」に限定する。

## データモデル変更

### `Character` 型に `subClassId` を追加

`src/domain/types.ts` の `Character` interface (L575 付近):

```ts
export interface Character {
  id: string;
  name: string;
  raceId: RaceId;
  classId: ClassId;
  titleId: TitleId | null;
  subClassId: ClassId | null; // ← 追加。未設定は null。本業と同じ ID は許可しない
  level: number;
  exp: number;
  skillPoints: { total: number; spent: number };
  learnedSkills: Record<SkillId, number>;
  equipment: EquipmentSlots;
  rebirthBonus?: RebirthBonus;
  strategy: Strategy;
}
```

### `createCharacter()` の初期化

`src/domain/saveData.ts` の `createCharacter` (L65-91):

```ts
return {
  id: id ?? generateCharId(),
  name,
  raceId,
  classId,
  titleId: null,
  subClassId: null, // ← 追加
  level: 1,
  ...
};
```

### schemaVersion を 4 → 5 に bump

`src/domain/saveData.ts` L33:

```ts
export const CURRENT_SCHEMA_VERSION = 5;
```

### v4→v5 migration を追加

`src/store/saveSerialization.ts` の `MIGRATIONS` (L20-28 あたり) に追加:

```ts
const MIGRATIONS: Record<number, (old: Record<string, unknown>) => Record<string, unknown>> = {
  1: (old) => migrateV1toV2(old),
  2: (old) => migrateV2toV3(old),
  3: (old) => migrateV3toV4(old),
  4: (old) => migrateV4toV5(old), // ← 追加
};
```

`migrateV3toV4` (L96-) と同じ形で `migrateV4toV5` を追加:

```ts
/** v4→v5: Character.subClassId を追加。既存メンバー全員に subClassId: null を補完。 */
function migrateV4toV5(old: Record<string, unknown>): Record<string, unknown> {
  const next: Record<string, unknown> = { ...old, schemaVersion: 5 };
  const guild = isObj(next.guild) ? { ...next.guild } : {};
  if (Array.isArray(guild.members)) {
    guild.members = guild.members.map((m) =>
      isObj(m) && !('subClassId' in m) ? { ...m, subClassId: null } : m
    );
  }
  next.guild = guild;
  return next;
}
```

## ドメインロジック

### `skillNodesFor` を副業対応に拡張

`src/domain/skillTree.ts` L26-35:

```ts
export function skillNodesFor(char: Character): SkillTreeNode[] {
  const nodes: SkillTreeNode[] = [
    ...(CLASSES[char.classId]?.skillTree.skills ?? []),
    ...(RACES[char.raceId]?.raceSkillTree.skills ?? []),
  ];
  if (char.titleId && TITLES[char.titleId]) {
    nodes.push(...TITLES[char.titleId].skillTree.skills);
  }
  // ★ 副業ツリーを合成 (本業と同じ ID は setSubClass で弾いてあるため重複なし)
  if (char.subClassId && CLASSES[char.subClassId]) {
    nodes.push(...CLASSES[char.subClassId].skillTree.skills);
  }
  return nodes;
}
```

注: 共有 skillId (例: `skill_heal`) が本業/副業のどちらにも入った場合、`nodes` 配列上は重複するが、`skillDepth` 関数の `Map` 化で 1 つに集約されるため depth 計算は破綻しない。`canLearnSkill` / `learnSkill` の `find` は最初に見つかるノードを返すので、`requires` 上の不整合がない限り問題なし。

### `setSubClass` / `setSubClassInSave` を `charProgress.ts` に追加

`src/domain/charProgress.ts` の末尾に追加:

```ts
// ---- 副業 (v2.0.0) -------------------------------------------------------

/**
 * 副業を設定/変更/解除する (v2.0.0)。
 * - newSubClassId === null: 副業を解除
 * - newSubClassId === char.classId: 本業と同じは無効 → no-op
 * - newSubClassId === char.subClassId: 変化なし → no-op
 * - 旧副業ツリーのみに存在していたスキル (= 本業/種族/称号で届かない skillId) を learnedSkills から
 *   剥がし、その分の SP を spent から戻す。
 * - 共有 skillId (本業ツリー等にも存在) は剥がさない。
 */
export function setSubClass(char: Character, newSubClassId: ClassId | null): Character {
  if (newSubClassId !== null && !CLASSES[newSubClassId]) return char;
  if (newSubClassId === char.classId) return char;
  if (newSubClassId === char.subClassId) return char;

  // 旧副業ツリーの skillId 集合
  const oldSubIds = new Set(
    (char.subClassId ? (CLASSES[char.subClassId]?.skillTree.skills ?? []) : []).map((n) => n.skillId)
  );

  // 「副業を外しても本業/種族/称号で到達可能」な skillId 集合
  const protectedIds = new Set<string>();
  for (const n of CLASSES[char.classId]?.skillTree.skills ?? []) protectedIds.add(n.skillId);
  for (const n of RACES[char.raceId]?.raceSkillTree.skills ?? []) protectedIds.add(n.skillId);
  if (char.titleId) {
    for (const n of TITLES[char.titleId]?.skillTree.skills ?? []) protectedIds.add(n.skillId);
  }

  // 剥がす対象 = 旧副業特有のスキル
  const removeIds = [...oldSubIds].filter((id) => !protectedIds.has(id));

  let learned = { ...char.learnedSkills };
  let refund = 0;
  for (const sid of removeIds) {
    const lv = learned[sid] ?? 0;
    if (lv > 0) {
      // 旧 char コンテキストで cost を計算 (旧副業ツリー上の depth に基づく)
      refund += skillSpCost(char, sid) * lv;
      delete learned[sid];
    }
  }

  return {
    ...char,
    subClassId: newSubClassId,
    learnedSkills: learned,
    skillPoints: {
      ...char.skillPoints,
      spent: Math.max(0, char.skillPoints.spent - refund),
    },
  };
}

/** SaveData 経由で副業を設定/変更/解除する。 */
export function setSubClassInSave(
  save: SaveData,
  charId: string,
  newSubClassId: ClassId | null
): SaveData {
  const char = save.guild.members.find((m) => m.id === charId);
  if (!char) return save;
  return replaceMember(save, charId, setSubClass(char, newSubClassId));
}
```

`replaceMember` は既に `charProgress.ts` 内に定義されている (L25)。`skillSpCost` も同ファイルで import 済み。`TITLES` の import を追加する必要あり (現在は使っていない):

```ts
import { TITLES } from '@/data/titles';
```

### `transferClass` の subClassId 整合性

`transferClass` (L59-92) で新本業が現副業と一致するケース:

```ts
export function transferClass(char: Character, newClassId: ClassId): Character {
  if (!CLASSES[newClassId]) return char;
  // 新本業が現副業と同じなら、副業は null にする (本業 == 副業 の二重保有を防ぐ)
  const subClassId = char.subClassId === newClassId ? null : char.subClassId;
  ...
  return {
    ...char,
    classId: newClassId,
    titleId: null,
    subClassId, // ← 追加。新本業 == 旧副業 なら null
    level,
    ...
  };
}
```

### `reincarnate` の subClassId

`reincarnate` (L146-) は `createCharacter` で初期化するので、`subClassId: null` が自動で入る (createCharacter の修正で対応済み)。追加実装不要。

## UI 変更 (`src/pages/guild-char/index.tsx`)

### 1. State 追加

```ts
const [skillTab, setSkillTab] = useState<'class' | 'race' | 'title' | 'sub'>('class'); // 'sub' を追加
const [subTo, setSubTo] = useState<ClassId | ''>(''); // sheet の選択候補。'' は未選択
```

`GrowthMode` を拡張:
```ts
type GrowthMode = 'transfer' | 'title' | 'rebirth' | 'subclass' | null;
```

### 2. スキルセクションのサブタブに「副業」追加

L353-375 のサブタブ部分を改修:

```tsx
<div className={styles.skillSubTabs}>
  <ActionButton label="職業" sfx="cursor" ... onClick={() => setSkillTab('class')} />
  <ActionButton label="種族" sfx="cursor" ... onClick={() => setSkillTab('race')} />
  {char.titleId ? (
    <ActionButton label="称号" sfx="cursor" ... onClick={() => setSkillTab('title')} />
  ) : null}
  {char.subClassId ? (
    <ActionButton label="副業" sfx="cursor"
      className={`${styles.skillSubTab} ${skillTab === 'sub' ? styles.skillSubTabActive : ''}`}
      onClick={() => setSkillTab('sub')}
    />
  ) : null}
</div>
```

### 3. スキルツリーレンダの分岐に副業を追加

L384-393 の `<SkillTree nodes={...}>` の nodes 計算を関数化して扱いやすく:

```tsx
const tabNodes = (() => {
  if (skillTab === 'class') return CLASSES[char.classId]?.skillTree.skills ?? [];
  if (skillTab === 'race') return RACES[char.raceId]?.raceSkillTree.skills ?? [];
  if (skillTab === 'title' && char.titleId)
    return TITLES[char.titleId]?.skillTree.skills ?? [];
  if (skillTab === 'sub' && char.subClassId)
    return CLASSES[char.subClassId]?.skillTree.skills ?? [];
  return [];
})();
```

`learnedSkills`(L119-) の tree 計算も同様に `tabNodes` を共有して書き換える。

### 4. 「育成」ボタン群に「副業」を追加

L424-454 の育成ボタンセクションを改修。現状3列 (転職/称号/転生) を **2行に分割** する:

```tsx
{/* 育成 (2 行 × 2 列) */}
<section>
  <div className={styles.growthBtns}>
    <ActionButton sfx="cursor"
      className={`${styles.growthBtn} ${styles.growthBtnTransfer}`}
      onClick={() => setGrowthMode('transfer')}
    >
      <span className={styles.growthBtnLabel}>転職</span>
      <span className={styles.growthBtnSub}>Lv-{CLASS_CHANGE_LEVEL_PENALTY}/技リセット</span>
    </ActionButton>
    <ActionButton sfx="cursor"
      className={`${styles.growthBtn} ${styles.growthBtnSubclass}`}
      onClick={() => setGrowthMode('subclass')}
    >
      <span className={styles.growthBtnLabel}>副業</span>
      <span className={styles.growthBtnSub}>
        {char.subClassId ? CLASSES[char.subClassId]?.name : 'なし'}
      </span>
    </ActionButton>
    <ActionButton sfx="cursor"
      className={`${styles.growthBtn} ${styles.growthBtnTitle}`}
      onClick={() => setGrowthMode('title')}
    >
      <span className={styles.growthBtnLabel}>称号</span>
      <span className={styles.growthBtnSub}>{char.titleId ? '習得済み' : '2択選択'}</span>
    </ActionButton>
    <ActionButton sfx="cursor"
      className={`${styles.growthBtn} ${styles.growthBtnRebirth}`}
      disabled={!canReincarnate(char)}
      onClick={() => setGrowthMode('rebirth')}
    >
      <span className={styles.growthBtnLabel}>転生</span>
      <span className={styles.growthBtnSub}>Lv100→1</span>
    </ActionButton>
  </div>
</section>
```

SCSS (`style.module.scss`) の `.growthBtns` を `grid-template-columns: 1fr 1fr` の 2列レイアウトに変更し、4 ボタンが 2×2 で並ぶようにする。`.growthBtnSubclass` 用の色トークンを `.growthBtnTransfer` と同系統 (転職に近い概念) で追加。

### 5. 副業 bottom sheet

`growthMode === 'subclass'` の分岐を `growthMode === 'title'` の隣に追加:

```tsx
{growthMode === 'subclass' ? (
  <>
    <p className={styles.sheetTitle}>副業</p>
    <p className={styles.sheetNote}>
      本業と別に職業を 1 つ持てます。副業のスキルツリーから習得可能になりますが、装備制限は本業のままです。
      副業を変更/解除すると、副業のスキルツリーで取得していた分の SP は戻ります（共有スキルは保持）。
    </p>
    {char.subClassId ? (
      <p className={styles.titleHave}>
        現在の副業: {CLASSES[char.subClassId]?.name}
      </p>
    ) : (
      <p className={styles.titleHave}>現在: なし</p>
    )}
    <select
      className={styles.sheetSelect}
      value={subTo}
      onChange={(e) => setSubTo(e.target.value as ClassId)}
    >
      <option value="">（選んでください）</option>
      {CLASS_IDS
        .filter((cid) => cid !== char.classId) // 本業は除外
        .map((cid) => (
          <option key={cid} value={cid}>
            {CLASSES[cid].name}
          </option>
        ))}
    </select>
    <div className={styles.sheetActionRow}>
      <ActionButton
        label="解除する"
        sfx="cancel"
        className={styles.sheetActCancel}
        disabled={!char.subClassId}
        onClick={() => {
          void applyAndPersist((s) => setSubClassInSave(s, id, null));
          // 副業を消すと 'sub' タブが非表示になるので 'class' に戻す
          if (skillTab === 'sub') setSkillTab('class');
          setGrowthMode(null);
        }}
      />
      <ActionButton
        label="設定する"
        className={styles.sheetActPrimary}
        disabled={!subTo || subTo === char.subClassId || subTo === char.classId}
        onClick={() => {
          void applyAndPersist((s) => setSubClassInSave(s, id, subTo as ClassId));
          setGrowthMode(null);
        }}
      />
    </div>
  </>
) : null}
```

import に `setSubClassInSave` を追加:

```ts
import {
  acquireTitle,
  canAcquireTitle,
  canReincarnate,
  rebirthStatBonusForRace,
  reincarnateInSave,
  setSubClassInSave, // ← 追加
  transferClassInSave,
} from '@/domain/charProgress';
```

### 6. 「転職」 sheet の警告文を更新

L482-485 の `<p className={styles.sheetWarn}>` を:

```
レベルが N 下がり、職業・称号スキルは振り直しになります（種族・副業スキルは保持）。
新本業と同じ職業を副業にしていた場合、副業は解除されます。
```

(任意。実装簡略化のため省略可)

## Storybook 更新

`src/pages/guild-char/GuildChar.stories.tsx` に副業ありキャラのストーリーを追加。

mockSaves (`src/__stories__/mockSaves.ts`) の `mockWithParty` メンバーの 1 体に `subClassId: 'class_medic'` を入れた `mockSubClass` preset を新規作成、または既存 preset の派生として `WithSubClass` story を 1 つ追加する。具体的なファイル構造はディレクターのコメント参照。

最小: `GuildChar.stories.tsx` の既存 args を `subClassId: null` で揃え、`WithSubClass` story を新規追加 (args で 1 体の subClassId に値を入れる)。

## 単体テスト要件 (必須)

### `src/domain/skillTree.test.ts` に追加

- 副業設定中、副業ツリーのスキルが `skillNodesFor` に含まれる
- 共有スキル (本業 + 副業のどちらにも存在) を含んでも `skillDepth` が破綻しない
- 副業ツリーのみのスキルが `canLearnSkill` で習得可能になる

### `src/domain/charProgress.test.ts` に追加 (新規作成可)

`setSubClass`:

- `setSubClass(char, null)`: 元から null → no-op
- `setSubClass(char, char.classId)`: 本業と同じ ID → no-op
- `setSubClass(char, 'class_medic')`: 副業設定。learnedSkills / skillPoints は変化なし (まだ何も習得していない場合)
- 副業ツリーで習得 → 副業を null に → 副業特有スキルが剥がれ、SP が戻る
- 副業ツリーで習得 → 別の副業に変更 → 旧副業の特有スキルが剥がれ、SP が戻る
- **共有 skillId (本業にもある) を副業ツリーから習得 → 副業解除しても learnedSkills は維持、SP も戻らない**
- 不正 classId → no-op

`transferClass`:

- 副業設定中に転職 → 副業はそのまま保持
- 新本業 == 現副業 のケース → 副業が null になる

### `src/store/saveSerialization.test.ts` に追加

- v4 セーブを load → migrate されて全メンバーに `subClassId: null` が付く
- v4 → v5 migration の冪等性 (既に subClassId フィールドがある場合は上書きしない)

## 触ってよいファイル

- `src/domain/types.ts` (Character に `subClassId` 追加)
- `src/domain/saveData.ts` (CURRENT_SCHEMA_VERSION → 5、createCharacter で subClassId: null)
- `src/domain/charProgress.ts` (`setSubClass` / `setSubClassInSave` 追加、`transferClass` の subClassId 衝突処理、TITLES import 追加)
- `src/domain/skillTree.ts` (`skillNodesFor` に副業ツリー合成)
- `src/domain/charProgress.test.ts` (新規 or 既存に追記)
- `src/domain/skillTree.test.ts` (副業ノード関連テスト追加)
- `src/store/saveSerialization.ts` (`migrateV4toV5` 追加 + MIGRATIONS[4])
- `src/store/saveSerialization.test.ts` (v4→v5 テスト追加)
- `src/pages/guild-char/index.tsx` (副業 UI 統合)
- `src/pages/guild-char/style.module.scss` (`.growthBtns` を 2×2 grid に + `.growthBtnSubclass` カラー)
- `src/pages/guild-char/GuildChar.stories.tsx` (副業ありストーリー追加)
- `src/__stories__/mockSaves.ts` (副業設定済み mock を 1 件追加 — 既存 preset から派生で OK)
- `package.json` (`version` を **手動で `"2.0.0"` に書き換え**。詳細は下記「バージョン管理」)

## 触ってはいけないファイル

- `src/data/classes.ts` / `races.ts` / `titles.ts` / `skills.ts` (マスターデータ。スキル ID 重複は仕様)
- `src/data/balance.ts` (バランス定数。副業のために変える必要なし)
- battle 系 (`src/pages/battle/`、`src/domain/battle.ts` 等)
- shop / forge / dungeon (副業はスキル習得のみに影響、戦闘・装備・経済へは波及しない)
- `docs/` (ディレクターが最後にビルドして生成)
- `scripts/bump-patch-version.mjs` (バージョン bump スクリプトには触らない)

## バージョン管理 (重要)

v2.0.0 は **メジャーバージョン bump** のため、`yarn build` の自動 patch bump スクリプトでは対応できない。

### サブエージェントへの指示 (実装時)

- `package.json` の `"version": "1.0.20"` → `"version": "2.0.0"` に **手動で書き換える**
- ビルドは行わない (ディレクターがレビュー後に行う)
- コミットには `package.json` の手動 bump を含める

### ディレクター側の最終ビルド

- 手動で 2.0.0 に上がった状態で `yarn build:nobump` (= `tsc -b && vite build`) を実行
- `yarn build` は patch を 2.0.1 にしてしまうので **絶対に使わない**
- `docs/` が再生成されるので、それをコミットに追加

## 検証ゲート

```bash
yarn test    # 既存 + 新規テスト全緑
yarn lint    # ESLint
yarn tsc -b  # 型チェック (vitest と lint は型を見ない)
```

3 点すべて緑であることが必須。ビルドはディレクターが最後に行う (上記参照)。

## 完了報告

- `Character.subClassId` 追加と migration が動作した確認
- `setSubClass` の各シナリオ (共有スキル保護、SP 返金) のテスト結果
- スキル画面で副業サブタブが切り替わり、習得できる挙動の確認 (Storybook で確認したストーリー名)
- 検証ゲート 3 点緑
- コミット SHA (push はしない)

## サブエージェントへの注意

- **自分で Edit/Write/Bash を使って実装すること。さらにサブエージェント (Agent/Task) を spawn しないこと。**
- コミットは作成するが **push しない**。ディレクターがレビュー後に push する。
- コミットメッセージは `feat(subclass): add secondary class system for v2.0.0` 系。
- 一旦 `package.json` の version を `"2.0.0"` に書き換えてコミットに含めること (yarn build は実行しない)。

## 補足 — 設計上の判断メモ

### 副業に「+1 SP」ペナルティを置かなかった理由

ユーザの再考メモ「副業は称号スキルがないので、スキルポイントを多く消費する設定はいらない」を尊重。本業と副業のスキルツリーが同じ深さコストで開放されるため、副業を取ると単純に習得対象が増えるだけになる。

これによりゲーム性として「本業を極めるか、本業×副業を浅く広く取るか」のトレードオフが SP 総量で自然発生する (Lv 100 でようやく全自職ツリーを取り切れるよう設計済み、副業を加えれば SP が足りなくなる)。

### 既存「称号」と並列に持てる理由

称号は本業に紐づく第2ツリー (F30 解放、付け替え不可、SP+5)、副業は独立した別職業のツリー (いつでも変更可、SP 増減なし)。コンセプトが直交するため共存させた方が育成の自由度が広がる。

### 共有スキル ID をめぐる挙動の正当性

副業から `skill_heal` を取った後、本業も `skill_heal` を持っていた場合は副業解除しても保持される (`protectedIds` で保護)。これは「本業からも届くスキルだから、副業を外しても失われない」という直感に一致する。SP も返金されない (本業ツリー経由でも同じ SP を支払うはずだから等価)。

### 装備制限は本業のみとした理由

副業で杖を装備できるようにすると、武器マスタリー (例: passive_warrior_blade_mastery) で剣のみ強化される設計と矛盾する。装備制限は別 issue として将来検討余地はあるが、今回スコープからは外す。
