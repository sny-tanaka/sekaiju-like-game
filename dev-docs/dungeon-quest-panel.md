# ダンジョン中の受注中依頼の進捗パネル（read-only）

## 背景と仕様

- 現状、酒場の依頼の進捗は **拠点の酒場でしか確認できない**。プレイヤーは「今受注中のクエストは
  何だったっけ」「あと何体倒せばいいんだっけ」を確認するために、いったん帰還の糸で拠点に
  戻る必要がある。
- ダンジョン中の `☰` メニューに新項目「📜 依頼」を追加し、**受注中の依頼と進捗**を
  read-only で表示する。

### スコープ

- **表示対象**: `activeQuests(save)` の返す全依頼（`status === 'active'`）のみ。
- **表示内容**: 依頼名 / 依頼主 / 目標ラベル（例「スライム討伐 3/5」）/ 進捗バー / 報酬内訳。
  達成済みは酒場と同じハイライト（`cardComplete` 相当）＋バッジ「達成！」を出す。
- **操作**: **read-only**。受注／破棄／報告のボタンは一切出さない。「達成した依頼は酒場で
  報告できます」という文言でユーザーを案内する。
- **表示位置**: `☰` メニューグリッドに 4 項目目「📜 依頼」を追加、押下でオーバーレイ表示。
- **空状態**: 受注中依頼が 0 件なら「受注中の依頼はありません。酒場で受注しましょう。」

## 命名

- パネルタイトル: 「受注中の依頼」
- メニュー項目ラベル: 「依頼」、アイコン: 📜
- state 名: `questsOpen`（既存の `itemOpen` / `cookOpen` / `soundOpen` に倣う）

## 実装方針

### 1. ドメイン層 — 共通ヘルパの引き上げ

酒場ページ (`src/pages/tavern/index.tsx`) の**ファイルローカル関数** `goalLabel` / `rewardParts`
を `src/domain/quest.ts` に **export** として引き上げる。ダンジョン側も酒場側もこれを使う。

```ts
// src/domain/quest.ts に追加
import { ENEMIES } from '@/data/enemies';
import { ITEMS } from '@/data/items';

/** 依頼の目標ラベル（「スライム討伐 0/3」等）を組み立てる。 */
export function formatQuestGoal(
  quest: QuestMaster,
  current: number,
  required: number
): string {
  switch (quest.kind) {
    case 'hunt': {
      const name = quest.target.enemyId ? (ENEMIES[quest.target.enemyId]?.name ?? '？') : '？';
      return `${name}討伐 ${current}/${required}`;
    }
    case 'delivery': {
      const name = quest.target.itemId ? (ITEMS[quest.target.itemId]?.name ?? '？') : '？';
      return `${name}納品 ${current}/${required}`;
    }
    case 'reach':
      return `地下${quest.target.depth ?? 0}階到達 ${current}/${required}`;
    case 'boss':
      return `地下${quest.target.depth ?? 0}階ボス撃破 ${current}/${required}`;
  }
}

/** 報酬（gold/gems/items）を「800G ・ ✦5 ・ きずぐすり×3」の断片配列に分解する。 */
export function formatQuestRewards(
  rewards: QuestMaster['rewards'],
  plusSign = false
): string[] {
  const parts: string[] = [];
  if (rewards.gold) parts.push(`${plusSign ? '+' : ''}${rewards.gold}G`);
  if (rewards.gems) parts.push(`✦${rewards.gems}`);
  for (const item of rewards.items ?? []) {
    const name = ITEMS[item.itemId]?.name ?? item.itemId;
    parts.push(`${name}×${item.qty}`);
  }
  return parts;
}
```

依存関係の追加: `src/data/enemies.ts` と `src/data/items.ts` を `src/domain/quest.ts` から
import する。既に `src/data/quests.ts` を import しているので同レイヤーで問題なし。

### 2. 酒場ページのリファクタ

`src/pages/tavern/index.tsx` から `goalLabel` / `rewardParts` の関数定義を削除し、
`import { formatQuestGoal, formatQuestRewards, ... } from '@/domain/quest'` に置換。呼び出し箇所を
そのままの名前で書き換える。**挙動は完全に不変**（純関数の場所を変えただけ）。既存の
`src/pages/tavern/index.test.tsx` は無修正で通ること。

### 3. ダンジョンページの UI 追加

`src/pages/dungeon/index.tsx`:

#### 3-1. state 追加

state 群（既存の `itemOpen` 等の並び）に追加:
```ts
const [questsOpen, setQuestsOpen] = useState(false);
```

`activeQuests` を import:
```ts
import { activeQuests, formatQuestGoal, formatQuestRewards } from '@/domain/quest';
```

#### 3-2. ☰ メニューに 4 項目目を追加

現状のグリッド構造（該当は 730-889 行付近）:
- 上段 (2 列): 「🎒 道具を使う」 / 「⚙ 設定」
- 下段 (全幅): 「🪢 帰還の糸」

新しい構造（推奨レイアウト）:
- 上段 (2 列): 「🎒 道具を使う」 / 「⚙ 設定」
- 中段 (2 列): 「📜 依頼」（達成済み依頼があれば右上に赤バッジ）/ **空欄でもOK**（右カラムは grid 上に何も置かない、または全幅化）
- 下段 (全幅): 「🪢 帰還の糸」

**レイアウトの微調整は実装エージェントの裁量に任せる**。以下の候補のうちバランスが良い方を選ぶ:
- 候補 A: 上段 2 列「道具/設定」＋ 中段全幅「📜 依頼（`menuGridItemFull`）」＋下段全幅「帰還の糸」。
- 候補 B: 上段 2 列「道具/依頼」＋ 中段 2 列「設定/(空)」…だが空マスが見た目悪い。
- 候補 C: 上段 2 列「道具/依頼」＋ 中段全幅「設定」＋下段全幅「帰還の糸」。既存の設定の位置は
  変わるが、依頼と道具を並置できる利点。

**推奨は候補 A**（既存レイアウトの改変が最小、依頼ボタンは巻物アイコンで目立つ）。

「依頼」ボタン:
```tsx
<ActionButton
  sfx="cursor"
  className={`${styles.menuGridItem} ${styles.menuGridItemFull}`}
  onClick={() => {
    setMenuOpen(false);
    setQuestsOpen(true);
  }}
>
  <span className={styles.menuGridIcon}>📜</span>
  <div>
    <span className={styles.menuGridLabel}>依頼</span>
    {/* 達成済がある場合はサブラベルで案内 */}
    {reportableCount(save) > 0 ? (
      <div className={styles.menuGridSub}>達成 {reportableCount(save)} 件（酒場で報告）</div>
    ) : (
      <div className={styles.menuGridSub}>受注中 {activeQuests(save).length} 件</div>
    )}
  </div>
</ActionButton>
```

達成件数を出すことで、プレイヤーが「あ、帰って報告しよう」と気付ける動線になる。
`reportableCount` は既に export されているので追加 import するだけ。

#### 3-3. オーバーレイ本体

既存の `styles.itemOverlay` / `styles.itemPanel` を流用したボトムシート。`itemPanel` の直後
（`cookOpen` の隣あたり）に配置。

```tsx
{questsOpen ? (
  <div
    className={styles.itemOverlay}
    onClick={() => setQuestsOpen(false)}
  >
    <div
      className={styles.itemPanel}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.itemTitle}>受注中の依頼</div>
      {(() => {
        const active = activeQuests(save);
        if (active.length === 0) {
          return (
            <p className={styles.itemEmpty}>
              受注中の依頼はありません。酒場で受注しましょう。
            </p>
          );
        }
        return (
          <>
            {active.some((a) => a.complete) ? (
              <p className={styles.questsHint}>
                達成した依頼は酒場で報告できます。
              </p>
            ) : null}
            {active.map(({ quest, progress, complete }) => {
              const pct =
                progress.required > 0
                  ? Math.min(100, Math.round((progress.current / progress.required) * 100))
                  : 0;
              return (
                <div
                  key={quest.id}
                  className={`${styles.questRow} ${complete ? styles.questRowComplete : ''}`}
                >
                  <div className={styles.questHead}>
                    <span className={styles.questName}>{quest.name}</span>
                    {complete ? <span className={styles.questBadge}>達成！</span> : null}
                    {quest.repeatable ? <span className={styles.questChip}>くり返し</span> : null}
                  </div>
                  <div className={styles.questClient}>依頼主: {quest.client}</div>
                  <div className={styles.questGoal}>
                    {formatQuestGoal(quest, progress.current, progress.required)}
                  </div>
                  <div className={styles.questProgressTrack}>
                    <div
                      className={styles.questProgressFill}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className={styles.questRewards}>
                    {formatQuestRewards(quest.rewards).join(' ・ ')}
                  </div>
                </div>
              );
            })}
          </>
        );
      })()}
      <ActionButton
        label="とじる"
        sfx="cancel"
        className={styles.itemClose}
        onClick={() => setQuestsOpen(false)}
      />
    </div>
  </div>
) : null}
```

### 4. SCSS — dungeon 用の quest 系 class 追加

`src/pages/dungeon/style.module.scss` に以下を追加。酒場側 (`src/pages/tavern/style.module.scss`)
の `.card` / `.progressTrack` / `.progressFill` / `.goal` / `.rewards` / `.questName` / `.client` /
`.chip` を **見た目そのままコピー**（トークンや色変数は既存の共通変数があればそれを使う）。

必要な class:
- `.questRow` — 各依頼カード（酒場の `.card` 相当）
- `.questRowComplete` — 達成済みハイライト（酒場の `.cardComplete` 相当）
- `.questHead` — 上段（依頼名＋バッジ）
- `.questName` — 依頼名タイポグラフィ
- `.questBadge` — 「達成！」赤系バッジ（新規、CTA的な強調）
- `.questChip` — 「くり返し」灰チップ（酒場の `.chip` 相当）
- `.questClient` — 依頼主行（`.client` 相当）
- `.questGoal` — 目標行（`.goal` 相当）
- `.questProgressTrack` / `.questProgressFill` — 進捗バー（酒場のと同じ見た目）
- `.questRewards` — 報酬内訳行（`.rewards` 相当）
- `.questsHint` — 「達成した依頼は酒場で報告できます」注意書き（薄いトーンの補助テキスト）

酒場側の scss と重複するが、dungeon の色味・密度に合わせる余地があるので複製で OK（CLAUDE.md
「三度目までは重複 OK」の範囲）。差異は「オーバーレイ内なので `itemPanel` の余白と合わせる」
くらい。

### 5. Storybook

- `src/__stories__/mockSaves.ts` に **`mockTavernMidDive`** を追加:
  ```ts
  export const mockTavernMidDive: SaveData = (() => {
    // mockTavern には既に questStates が入っている。partyとダイブを合成。
    const withParty = /* mockTavern をベースにパーティ編成を追加 */;
    return startDive(withParty, 3);
  })();
  ```
  実装エージェントは `mockTavern` と `mockMidDive` の実装を読んで合成方法を決める。
  `mockTavern` に `party.front` / `party.back` が入っているか確認し、必要なら `mockWithParty`
  の要素をマージしてから `startDive` を呼ぶ。

- `src/pages/dungeon/Dungeon.stories.tsx` に **依頼進行中プリセット** を追加:
  ```ts
  export const QuestsInProgress: StoryObj = {
    parameters: { save: mockTavernMidDive, initialScreen: 'dungeon' },
    // ☰ メニュー → 依頼 を開いた状態のスクショが撮れるように、
    // decorator で questsOpen 相当の state 初期値を差し込む必要はない。
    // 「メニューを開いた状態」を軽く描くだけでも十分。
  };
  ```
  最小構成では `QuestsInProgress` は「依頼進行中セーブでダンジョン画面が表示される」だけで
  よい。ユーザーが手動で ☰ を開いて中身を確認できる。

### 6. テスト

#### 6-1. `src/domain/quest.test.ts` に追記

`formatQuestGoal` と `formatQuestRewards` の単体テスト:
- `formatQuestGoal`:
  - hunt: 敵名を引いて `${name}討伐 3/5` になる
  - delivery: アイテム名を引いて `${name}納品 2/3` になる
  - reach: `地下15階到達 10/15` になる
  - boss: `地下10階ボス撃破 0/1` になる
  - 不明な enemyId/itemId で `？` にフォールバックする
- `formatQuestRewards`:
  - gold+gems+items のフルセット → `['800G', '✦5', 'きずぐすり×3']`
  - plusSign=true → `'+800G'`
  - gold のみ → `['800G']`
  - 空 rewards → `[]`
  - 未知の itemId → itemId をそのまま名前に

#### 6-2. `src/pages/tavern/index.test.tsx` は無修正で通ることを確認

リファクタで挙動不変。落ちたらリファクタミスなので直す。

#### 6-3. ダンジョン側の UI テスト

`src/pages/dungeon/*.test.tsx` が存在するか確認。存在すれば、以下のテストを追加:
- ☰ を開いて「依頼」ボタンをクリックすると `受注中の依頼` が表示される
- `activeQuests` が 0 件のセーブでは「受注中の依頼はありません」が表示される
- 達成済み依頼があれば「達成！」バッジと `達成した依頼は酒場で報告できます` の案内が表示される

存在しなければ Storybook 目視で担保する（無理して pages/dungeon の RTL テストハーネスを新設
しない）。

## 影響ファイル一覧

| ファイル | 変更内容 |
|---|---|
| `src/domain/quest.ts` | `formatQuestGoal` / `formatQuestRewards` を新規 export。ENEMIES / ITEMS を import。 |
| `src/pages/tavern/index.tsx` | ローカル関数 `goalLabel` / `rewardParts` を削除、共通関数を import して置換。挙動不変。 |
| `src/pages/dungeon/index.tsx` | `questsOpen` state 追加、☰ グリッドに「📜 依頼」ボタン追加、`itemOverlay` 形式の新オーバーレイ追加。 |
| `src/pages/dungeon/style.module.scss` | `.questRow` 系 class を追加（酒場 SCSS を複製ベース）。 |
| `src/domain/quest.test.ts` | `formatQuestGoal` / `formatQuestRewards` の単体テスト追加。 |
| `src/__stories__/mockSaves.ts` | `mockTavernMidDive` 追加。 |
| `src/pages/dungeon/Dungeon.stories.tsx` | `QuestsInProgress` プリセット追加。 |
| （任意）`src/pages/dungeon/*.test.tsx` | 既存テストがあればパネル表示テスト追加。無ければ作らない。 |

## 検証ゲート

- `yarn test`: 既存 + 新規テスト全緑。特に **酒場テスト (`tavern/index.test.tsx`) が
  リファクタで落ちていないか要確認**。
- `yarn lint`: no error。
- `yarn build`: 初回のみ `yarn build`（patch を上げる）。2回目以降は `yarn build:nobump`。
- **バージョン**: 1 PR で 1 回のみ patch を上げる。

## サブエージェントへの指示テンプレ

- 触ってよいファイル: 「影響ファイル一覧」に列挙したファイルのみ。
- 触ってはいけないファイル: `dev-docs/` / `design-docs/` / 他のドメインコード / 他の pages。
- 自分で Edit/Write/Bash を使って実装し、**さらにサブエージェントを spawn しないこと**。
- 完了時に `yarn test && yarn lint && (yarn build || yarn build:nobump)` を通し、
  緑になったら **1 コミット**（`docs/` と `package.json` も含む）。
- コミットメッセージ: `feat(dungeon): 探索中に依頼の進捗をメニューから確認できる新パネルを追加`
- **push はしない**（ディレクターがレビュー後に行う）。
- 完了報告に commit SHA、変更ファイル一覧、テスト pass 数を含めること。
