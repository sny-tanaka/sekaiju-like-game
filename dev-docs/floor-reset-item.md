# 界層還元香（現在階のボス・FOE・採取ポイントを復活させる消費アイテム）

## 背景と仕様

- 世界樹風タワーでは、階を一度攻略するとその階の FOE と採取ポイントは基本的に復活しない。
  素材ファーム・ボス再戦をやりたいプレイヤーに対して、消費アイテムで **現在潜っている階の
  ボス・FOE・採取ポイントを一括で復活** させる救済＆周回手段を追加する。
- スコープ:
  - **対象**: プレイヤーが現在潜っている階 (`save.diveState.depth`)。
  - **復活する要素**: ①階層ボス（ボス階のみ）、② FOE 全部、③ 採取ポイント全部。
  - **据え置く要素**: 開封済み宝箱 `openedChests`、消化済みイベント `consumedEvents`、
    ボス撃破履歴 `record.highestBossDefeated / bossDefeatLog`、ワープ解放
    `warp.unlockedCheckpoints`、地図描画 `playerMaps`、探索セル `exploredCells`。
  - **入手手段**: 武器屋（`shopCatalog`）で常時購入可、**5000G**。
  - **使用場所**: **ダンジョン内のみ**（`useContext: ['field']`、`diveState` 必須）。
  - **UI**: 既存のダンジョン「どうぐ・食料」オーバーレイの中で、対象キャラを選ばずに
    「使う」ボタン1つ（帰還の糸と同じ扱い）。

## 命名

- **表示名**: 「界層還元香」（かいそうかんげんこう）
- **アイテム ID**: `item_floor_reset`
- **説明文**: 「使うと、いま潜っている階のボス・FOE・採取ポイントが最初の状態に戻る（探索中のみ）。」
- カテゴリ: `consumable`、`buyPrice: 5000`、`maxStack: 5`。
- スプライトは現状のフォールバック（`item_return_thread` と同じ「くすり瓶」系）で一旦許容する。
  差し替えたい場合は別 issue とする。

## 影響ファイル一覧

| ファイル | 変更内容 |
|---|---|
| `src/data/items.ts` | `ITEMS` に `item_floor_reset` を追加。 |
| `src/domain/dive.ts` | `resurrectCurrentFloor(save)` を追加 export。 |
| `src/domain/itemUse.ts` | `applyFieldItem` の先頭 special 分岐に `item_floor_reset` を追加。 |
| `src/pages/dungeon/index.tsx` | `itemPanel` 内の「対象キャラを選ばないアイテム」判定を `item_return_thread` だけから **`noTargetItems: Set<ItemId>`** に拡張し、`item_floor_reset` を含める。 |
| `src/domain/dive.test.ts`（新規テスト追記）または新規 `src/domain/floorReset.test.ts` | `resurrectCurrentFloor` の単体テスト。 |
| `src/domain/itemUse.test.ts` | `item_floor_reset` の使用テスト（3本）。 |

**ショップに並べる追加変更は不要**。`shopCatalog` は `Object.values(ITEMS).filter((it) => it.buyPrice > 0)` で自動列挙するため、`items.ts` に buyPrice を持って登場するだけで武器屋に並ぶ。

## 実装詳細

### 1. `src/data/items.ts` — マスター追加

`item_return_thread` の直後（`// 売却用素材` コメントの直前）に追加:

```ts
item_floor_reset: {
  id: 'item_floor_reset',
  name: '界層還元香',
  description:
    '使うと、いま潜っている階のボス・FOE・採取ポイントが最初の状態に戻る（探索中のみ）。',
  category: 'consumable',
  buyPrice: 5000,
  maxStack: 5,
  useContext: ['field'],
  // 復活処理は使用側で item id 判定して実行（special 効果。resurrectCurrentFloor）
},
```

### 2. `src/domain/dive.ts` — 復活純関数

ファイル末尾（`canAscend` の下）に以下を追加。既存のプライベート `setFoeRuntime` と同じスコープを
使って `towerState` を差し替える純関数:

```ts
/**
 * 現在潜っている階の「敵と採取」を初期状態に戻す（界層還元香の効果）。
 * - foeRuntime を foeSpawns から再構築（`ensureFloor` と同じ式）
 * - depletedGathers を空に戻す
 * - ボス階なら bossGates[depth].defeated を false に戻す
 *
 * 据え置き: openedChests / consumedEvents / record.highestBossDefeated /
 *          bossDefeatLog / warp.unlockedCheckpoints / exploredCells / playerMaps。
 *
 * `diveState` が null（拠点にいる）／該当階の TowerFloor が未生成のときは save をそのまま返す。
 */
export function resurrectCurrentFloor(save: SaveData): SaveData {
  const dive = save.diveState;
  if (!dive) return save;
  const depth = dive.depth;
  const floor = save.towerState.floors[depth];
  if (!floor) return save;

  const foeRuntime: FoeRuntimeState[] = floor.generated.foeSpawns.map((s) => ({
    spawnId: s.id,
    cell: { ...s.startCell },
    defeated: false,
    alerted: false,
  }));

  const nextFloor: TowerFloor = {
    ...floor,
    foeRuntime,
    depletedGathers: [],
  };

  const nextFloors = { ...save.towerState.floors, [depth]: nextFloor };
  const currentGate = save.towerState.bossGates[depth];
  const nextGates =
    floor.isBossFloor && currentGate
      ? { ...save.towerState.bossGates, [depth]: { ...currentGate, defeated: false } }
      : save.towerState.bossGates;

  return {
    ...save,
    towerState: {
      ...save.towerState,
      floors: nextFloors,
      bossGates: nextGates,
    },
    diveState: {
      ...dive,
      // 復活直後にプレイヤー自身のセル上に FOE が現れたら、次の 1 歩で不意打ちを食う。
      // 復活直前に予約されていた FOE 戦（あるならほぼその FOE 自身の再戦予約）はクリアする。
      pendingFoeBattle: null,
    },
  };
}
```

**重要な設計判断**:
- ボス階でボスゲート `defeated=false` に戻すと `canAscend(save, depth)` が false になり、
  ボス階の下り階段が再封鎖される。プレイヤーは「もう一度倒すまで下に進めない」状態。
  これは仕様として意図した挙動（ボスと再戦したいから使うアイテムなので封鎖は自然）。
  帰還の糸で戻れるため詰み無し。
- `record.highestBossDefeated / bossDefeatLog` はプレイヤーの「戦績」なので絶対に戻さない。
- FOE の復活位置は `spawn.startCell`。プレイヤーの現在セルと重なった場合は次の 1 歩で
  接触判定→戦闘へ。これは仕様として許容（ボス階でボスがゴール地点に復活し、プレイヤーが
  ボス直上に立っていた場合など）。プレイヤー現セルを避けて配置し直すロジックは
  実装しない（余計な複雑さ）。

### 3. `src/domain/itemUse.ts` — 使用分岐追加

`applyFieldItem` 内、既存の `if (itemId === 'item_return_thread') { ... }` ブロックの直下に:

```ts
// 界層還元香: 現在階のボス・FOE・採取ポイントを復活させる
if (itemId === 'item_floor_reset') {
  if (!save.diveState) return { save, ok: false, message: '探索中のみ使える' };
  const next = resurrectCurrentFloor(consume(save));
  return { save: next, ok: true, message: 'この階の敵と採取が復活した' };
}
```

`import` に `resurrectCurrentFloor` を追加:
```ts
import { resurrectCurrentFloor, returnToTown } from '@/domain/dive';
```

### 4. `src/pages/dungeon/index.tsx` — UI 分岐

現在 580 行付近に `const isReturn = s.itemId === 'item_return_thread';` があり、
それを起点に「対象キャラを選ばず単押しで使う」UI を出している。これを次のように拡張:

```ts
// 対象キャラを選ばず単押しで使うフィールドアイテム（帰還の糸／界層還元香）。
const NO_TARGET_ITEMS = new Set(['item_return_thread', 'item_floor_reset']);
```

（ファイル上部の import 群の後、コンポーネント外に定数として置く。）

そして `const isReturn = ...` の行を **削除** し、代わりに:

```ts
const noTarget = NO_TARGET_ITEMS.has(s.itemId);
```

`isReturn ? ... : ...` の三項演算を `noTarget ? ... : ...` に置換。

`handleUseItem` の中の「帰還のときは navigate」判定は **`!result.save.diveState` のまま** で
問題ない（界層還元香は diveState を残すのでこの分岐に入らない）。

### 5. テスト

#### 5-1. `src/domain/dive.test.ts` に追記（または `src/domain/floorReset.test.ts` を新規作成）

以下のテストを最低限:

- ✅ **通常階で使用**: FOE が defeated=true → false、cell が startCell に、alerted=false、
  depletedGathers=[] に戻り、bossGates は変化しない、openedChests / consumedEvents は変化しない、
  record は変化しない。
- ✅ **ボス階（depth=10）で使用**: ボスの FOE（isBoss:true 枠）が defeated=false に戻り、
  `bossGates[10].defeated=false` に戻る。`record.highestBossDefeated` と `bossDefeatLog` は
  変化しないこと。
- ✅ **diveState=null では no-op**: 返り値が入力 save 参照そのもの（`===`）。
- ✅ **未生成階（`floors[depth]` 無し）では no-op**: 実際には `diveState` を持って `depth`
  相当の `floors` エントリが無い状態を人工的に作れる。返り値が入力 save 参照そのもの。

セットアップは `src/domain/gather.test.ts` の `diveWithGather` のように手作りで `TowerFloor` を
組み立てる方式か、`startDive(save, 1)` した後で `foeRuntime[0].defeated=true` などに書き替える
方式のどちらでも良い（ボス階だけは `startDive(save, 10)` する必要がある）。

#### 5-2. `src/domain/itemUse.test.ts` に追記

`describe('applyFieldItem', () => { ... })` の中に:

- ✅ **界層還元香で階のリセットが起き、1個消費する**: `item_floor_reset` を追加した save で
  `startDive(save, 1)` して FOE の defeated=true と depletedGathers に何か入れておく →
  `applyFieldItem(save, 'item_floor_reset')` で ok=true / 該当階の foeRuntime[0].defeated=false /
  depletedGathers=[] / 所持数-1。
- ✅ **界層還元香は拠点では使えない**: `diveState=null` の save で使うと ok=false / メッセージ
  「探索中のみ使える」/ 所持数変化なし。
- ✅ **界層還元香を所持していなければ使えない**: ok=false / 変更なし。

### 6. ショップへの露出

`shopCatalog` は buyPrice>0 の消費アイテムを自動列挙するので追加コード不要。既存の
`src/domain/shop.test.ts` が in-catalog を全消費アイテムで expect している場合はカウントが
1個ずれる可能性があるので、実装後に `yarn test` で `shop.test.ts` を通し、失敗したら
そのテストの期待値を +1 する。

## 動作確認シナリオ（実装後に実装エージェントが手動確認するのは不要。テストで担保）

1. 武器屋で「界層還元香」5000G が販売リストに並ぶ。
2. 5F の FOE を1体倒す→採取ポイントを1つ枯渇させる→どうぐ画面から界層還元香を使う→
   FOE がスポーン位置に復活し、採取ポイントも復活していること。
3. 10F でボス撃破→階段が開く→界層還元香を使うと、ボスが復活し、階段が再封鎖される。
   帰還の糸で拠点に戻り、10F に再ワープして再挑戦できる。
4. 拠点（`diveState=null`）で界層還元香を使おうとしても、そもそもダンジョン画面の外なので
   UI 導線が無い（変更なし）。念のためドメイン層で使うと ok=false。

## 検証ゲート

- `yarn test` — 既存 + 新規テスト全緑。
- `yarn lint` — no error。
- `yarn build`（初回のみ、成果物に影響するので）— `tsc -b && vite build`、
  `docs/` と `package.json` の patch 更新を含めてコミット。
- **バージョン**: この PR で `package.json` の version は 1 回だけ上げる（`yarn build` 初回）。
  レビュー指摘で再ビルドが必要になったら `yarn build:nobump`。

## サブエージェントへの指示テンプレ

- 触ってよいファイル: 「影響ファイル一覧」に列挙したファイルのみ。
- 触ってはいけないファイル: `dev-docs/`（本設計書）以下、`design-docs/`、既に存在する他の
  アイテムのマスター、他のドメインコード。
- 自分で Edit/Write/Bash を使って実装し、**さらにサブエージェントを spawn しない**こと。
- 完了時に `yarn test && yarn lint && (yarn build || yarn build:nobump)` を通し、
  緑になったら **commit（`yarn build` した場合は `docs/` と `package.json` も含める）**、
  **push はしない**。commit SHA を報告。
