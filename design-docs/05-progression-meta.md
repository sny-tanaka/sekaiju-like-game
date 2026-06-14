# 05. メタ進行・データ永続化

担当範囲: 到達記録・進行解放 / 図鑑 / クエスト（任意）/ セーブ・ロード / 全体データモデル / 状態管理方針

参照元: 世界樹の迷宮Ⅴ「システム」より「周回・引き継ぎ」（および図鑑・クエストの一般仕様）。**ストーリー/クリア/NG+ 前提の仕様は本作の無限タワー方針（[06](./06-tower-progression.md)）に合わせて作り替えている。**

> **本作の前提**: ストーリー・エンディング（クリア）の概念が無いため、元ゲームの「メインストーリーを進めるミッション」と「クリア後の周回・引き継ぎ（NEW GAME+）」は **実現不能なので採用しない**。進行解放は到達階・ボス撃破がトリガー（[06 §8](./06-tower-progression.md)）、メタ進行の軸は「最高到達階の更新（`TowerRecord`、[06 §7](./06-tower-progression.md)）」が担う。

---

## 0. 共通型定義（正準・全ドキュメント共有）

他ドキュメント（01〜06）で参照される基礎型を **ここを唯一の正準** として確定する。実装では `src/domain/types.ts`（仮）に集約する。

### 0.1 ステータス `Stats`（能力名はこの1セットに固定）

```ts
// キャラ・敵の「素の能力値」。表記揺れ（WIS/INT/TEC/MND 等）はこの定義に統一する
interface Stats {
  hp: number;   // 体力（0で戦闘不能）
  tp: number;   // 技ポイント（スキル消費）
  str: number;  // 腕力 → 物理攻撃力の素
  vit: number;  // 体力/頑健 → 物理防御の素
  agi: number;  // 敏捷 → 行動順・命中・回避
  int: number;  // 知力 → 魔法攻撃力の素
  mnd: number;  // 精神 → 魔法防御の素
  luc: number;  // 幸運 → 状態異常成否・クリティカル
}
type StatKey = keyof Stats;

// レベルごとの上昇量。computeBaseStats で Lv に掛けて使う
type StatGrowth = Record<StatKey, number>;
```

> 装備が加算するのは素の `Stats` ではなく **戦闘派生値**（下記 `EquipBonuses`）。`Stats`（素質）と派生値（攻撃力・防御力）を混同しないこと。[04](./04-items-equipment-crafting.md) の `EquipmentMaster` はこの方針に合わせる。

### 0.2 戦闘派生値 `DerivedCombat` / 装備ボーナス `EquipBonuses`

```ts
// 素ステータス＋装備＋バフから戦闘時に算出する最終値（保存しない）
interface DerivedCombat {
  patk: number; // 物理攻撃力 = f(str, 装備atk, バフ)
  pdef: number; // 物理防御力 = f(vit, 装備def, バフ)
  matk: number; // 魔法攻撃力 = f(int, 装備mat, バフ)
  mdef: number; // 魔法防御力 = f(mnd, 装備mdf, バフ)
  hit: number; acc: number; eva: number; crit: number; // 命中/回避/クリ率（[03 §7]）
}
// 装備が与えるフラットボーナス（ATK/MAT/DEF/MDF と任意の素ステ補正）
interface EquipBonuses {
  atk?: number; mat?: number; def?: number; mdf?: number;
  statMods?: Partial<Stats>; // 「STR+5」等の素ステ補正があれば
}
```

### 0.3 属性・対象・状態異常・バフ

```ts
type PhysElement = 'slash' | 'pierce' | 'bash';        // 斬/突/壊
type MagElement  = 'fire' | 'ice' | 'volt';            // 火/氷/雷（拡張可）
type Element = PhysElement | MagElement | 'almighty';  // almighty=無属性貫通

type TargetType =
  | 'enemyOne' | 'enemyRow' | 'enemyAll'
  | 'allyOne'  | 'allyAll'  | 'self';

type AilmentType =
  | 'poison' | 'paralysis' | 'sleep' | 'confusion' | 'curse' | 'blind' | 'instantDeath'
  | 'headBind' | 'armBind' | 'legBind';   // バインド（部位封じ）

type BuffStatTarget = 'patk' | 'pdef' | 'matk' | 'mdef' | 'acc' | 'eva' | 'elementResist';
```

### 0.4 乱数 `Rng`（決定論・テスト再現の前提）

```ts
// 全ドメイン関数はこの Rng を「注入」で受け取り、Math.random は直接使わない
interface Rng {
  next(): number;            // [0,1)
  int(maxExclusive: number): number;
  range(minInclusive: number, maxInclusive: number): number;
  pick<T>(items: T[]): T;
  fork(label: string): Rng;  // 用途別に分岐した子Rngを得る（後述のシード派生）
  readonly state: number;    // セーブ/再開用にシリアライズ可能
}
```

- 実装PRNGは **mulberry32** 等の軽量・決定論的なものを1つ選定（高速・32bit seed・再現可能）。
- **シード派生ツリー**: `masterSeed`（セーブ固有）→ `fork('floor:'+depth)` で階生成シード、`fork('battle:'+battleId)` で戦闘シード、と用途別に分岐。これにより「ある階の生成」と「ある戦闘」の乱数列が独立・再現可能になる。
- **乱数消費順は固定**（生成: 地形→階段→採集→イベント→FOE→ボスの順、戦闘: 命中→ダメージ振れ→クリ→状態異常付与の順）。要素追加時は末尾に足し、既存順を変えない（既存階の再現が壊れるため）。

### 0.5 ID 規約・座標キー

- マスターデータの ID は `string` だが命名規約を `"<domain>_<name>"` に統一（例 `race_human` / `class_fencer` / `skill_slash` / `enemy_slime` / `item_potion`）。
- **称号 ID は職業 ID と別空間**にする（現状 `titleId: ClassId` を流用しているが、誤参照防止のため実装では `type TitleId = string` を別途定義し `parentClassId` で職業に紐づける）。
- `Dir = 'N' | 'E' | 'S' | 'W'`（[02](./02-exploration-mapping.md) 定義を正準とする）。
- **`cellKey` の正準形は `` `${x},${y}` ``**（カンマ区切り・ゼロ埋めなし）。`Set<cellKey>` を保存する際は `string[]` に変換、ロード時に `Set` へ戻す。
- **フロアの正準キーは `depth: number`**。文字列 `floorId` は使わず、`Record<number, …>` で階を引く（[02](./02-exploration-mapping.md) の `FloorMaster.id` は `depth` に統一）。

---

## 1. 進行解放・到達記録

ストーリーミッションの代わりに、**到達階・階層ボス撃破** がシステム解放と進行の軸になる（詳細は [06 §7・§8](./06-tower-progression.md)）。

- **進行解放**: 転職・称号・10層ワープなどは到達階／ボス撃破で解放する（ストーリー進行ではない）。解放状態は `flags`（§4）で保持。
- **到達記録**: 最高到達階・最高撃破ボス階・挑戦回数などを `TowerRecord`（[06 §7](./06-tower-progression.md)）として永続し、ベスト更新を主目的にする。

### クエスト（任意要素）

ストーリーと切り離した **単発の依頼**（特定モンスター討伐・特定階の到達・特定素材納品など）はサブ目標として置ける。ストーリー主筋ではないため必須ではない。

```ts
interface QuestState {
  id: string;
  status: 'unaccepted' | 'active' | 'done';
  progress?: Record<string, number>; // 討伐数・到達階など
}
```

> ⚠️ 元ゲームの「ストーリーを進めるミッション」は廃止。クエストは **あくまで任意のやり込み**。実装優先度は低い（§7）。

---

## 2. 図鑑（Bestiary / Collection）

- モンスター・アイテム・装備の収集記録。撃破・入手で埋まる。
- 拠点施設（ギルド受付など）への図鑑登録で報酬（インゴット等、[04](./04-items-equipment-crafting.md)）を得る要素を持てる。
  - ※元ゲームの「アルカディア評議会」はストーリー組織なので使わず、**ストーリーに依存しない拠点施設**として再定義する。

```ts
interface BestiaryState {
  monsters: Record<string, { seen: boolean; defeated: boolean; dropsFound: string[] }>;
  items: Record<string, boolean>;
}
```

---

## 3. 周回・引き継ぎ（NEW GAME+）は採用しない

> 🚫 **実現不能のため不採用**。NEW GAME+ は「エンディング到達（クリア）後に最初からやり直す」仕組みで、**クリアの概念が無い本作では成立しない**。

- 本作はセーブデータが1本の連続したプレイで、リセット＆引き継ぎの概念は持たない。
- 「育てたキャラを作り直して強化」したい欲求は **転生**（[01 §7](./01-character-system.md)、キャラ単位の作り直し＋ボーナス）が、「もう一度挑戦」の動機は **全滅後の再ダイブ＋最高到達階の更新**（[06 §6・§7](./06-tower-progression.md)）が代替する。
- したがって `CarryOverConfig` / `startNewGamePlus()` のような引き継ぎ処理は **作らない**。所持枠上限超過時の「周回時に消滅」警告も不要（通常の所持上限としてのみ扱う）。

---

## 4. セーブ・ロード（永続化）

本作はフロントエンドのみのSPA/PWAなので、サーバを持たずクライアントに永続化する。

- **保存先**: 大きめのゲーム状態（セーブデータ・図鑑・全フロアの地図）は **IndexedDB**。設定など軽量データは localStorage。
- **セーブは1つ（確定・ユーザー決定）**: 複数スロットは持たない。IndexedDB の固定キー1件で管理する。タイトルでは「つづきから」で読込、「最初から」は既存データがあれば**確認ダイアログ**を挟んで上書き（スロットUIは [07 §6](./07-screens-ux.md)）。
- **オートセーブ**: 後述の契機で自動保存。手動セーブも可（任意）。
- PWA: Service Worker でオフライン起動可能にし、ネット接続なしでもプレイ・セーブできる（本リポジトリの `vite-plugin-pwa` を活用）。

```ts
interface SaveData {
  schemaVersion: number;   // SaveData の論理バージョン（migration 用、IndexedDB のDBバージョンとは別物）
  savedAt: number;         // epoch ms（スタンプは永続化層で付与）
  masterSeed: number;      // このセーブ固有の乱数マスターシード（不変）。階生成・戦闘は createRng(masterSeed).fork(...) で派生（§0.4）
  settings: GameSettings;  // オートマップ/音量等（§4.2）。localStorage と二重持ちでも可
  guild: Guild;            // [01]
  // タワー進行（ストーリー/クリアの代替）
  towerState: {
    floors: Record<number, TowerFloor>;       // depth -> 生成済み階＋ランタイム状態 [06 §2]
    bossGates: Record<number, BossGateState>; // 撃破状況 [06 §4]
    warp: WarpState;                          // 解放済みワープ先 [06 §5]
    record: TowerRecord;                      // 最高到達階などベスト記録 [06 §7]
  };
  // 現在のダイブ（潜行）状態。拠点にいるときは null。★これが無いと「ロスト無し」が成立しない
  diveState: DiveState | null;
  questStates?: QuestState[];               // 任意（サブ依頼）。無くてよい
  bestiary: BestiaryState;
  playerMaps: Record<number, PlayerMap>;    // depth -> [02]（キーは floorId でなく depth）
  exploredCells: Record<number, string[]>;  // depth -> 視認済み cellKey[]（"x,y"）
  forgeInventory: ForgeInventory;           // [04]
  shopStock: ShopStock;                     // [04 §8]
  flags: Record<string, boolean>;           // 到達階トリガーの解放フラグ [06 §8]
  // ※ `cleared`（周回判定）は不採用：クリアの概念が無い（§3）
}

// 潜行中だけ存在する状態。全滅・帰還で null に戻る（失われるのはここだけ）
interface DiveState {
  depth: number;                 // 現在いる階
  pos: { x: number; y: number }; // 現在マス
  dir: Dir;                      // 向き
  party: DivePartyMember[];      // 出撃中キャラの「現在HP/TP/ユニオンゲージ/状態異常」
  persistentSummons: SummonSnapshot[]; // 探索をまたいで残る召喚体（[03 §8] persistsOutOfDungeon）
  encounter: { stepsUntilEncounter: number }; // エンカウント内部値（[02 §5]）
}
interface DivePartyMember {
  charId: string;
  hp: number; tp: number;
  unionGauge: number;            // 0..100
  ailments: ActiveAilment[];     // [03 §6]（探索中も保持する場合）
}
```

> **オートセーブ契機（正準・[06 §6](./06-tower-progression.md) と統一）**: ①拠点帰還時 ②階層移動（階段/ワープ）時 ③階層ボス撃破時 ④全滅処理後（`diveState=null` 化） ⑤**探索の1歩ごと**（`diveState` の位置・向き・踏破セル＝オートマップ・エンカウント残歩数を保存。中断/リロードで巻き戻らないため。書き込みは軽量・非同期で UI を止めない）。戦闘中の毎ターン保存はしない（戦闘は実行時状態 `BattleState`。中断したい場合のみ、戦闘開始直前の `diveState` から再戦する設計でよい）。
> FOE・宝箱・採集点などの **ランタイム消化状態は `towerState.floors[depth]`（[06 §2](./06-tower-progression.md) の `TowerFloor`）側に保持**。全滅・帰還してもタワーの生成済みデータ・撃破状況・ベスト記録は保持され、失うのは `diveState`（そのダイブの現在地と道中のHP/TP）だけ。

### 4.1 ニューゲーム初期化

```ts
// 新規セーブの初期状態。Phase 0 で最初に必要。
// 団員は 0 人で開始し、プレイヤーが拠点ギルドで作成する（ユーザー決定）。
function createInitialSaveData(guildName: string): SaveData {
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    savedAt: 0,                // 永続化層でスタンプ
    masterSeed: randomSeed(),  // セーブ固有の乱数シード（§0.4）
    settings: DEFAULT_SETTINGS,
    guild: { name: guildName, gold: STARTING_GOLD, members: [],
             party: emptyFormation(), storage: [], bestiary: emptyBestiary() },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: emptyTowerRecord() },
    diveState: null,           // 開始時は拠点
    bestiary: emptyBestiary(),
    playerMaps: {}, exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTiers: [0] }, flags: {},
  };
}
```

- **初期パーティの方針（確定・ユーザー決定）**: 初回は **団員 0 人**で開始する。初回起動フロー（[07 §4](./07-screens-ux.md)）ではギルド名のみ入力し、その後 **拠点のギルドでプレイヤーが種族・職業を選んでキャラを作成**する（[01 §2](./01-character-system.md)）。団員が 0 人の間はギルドメニュー以外（ダイブ・ショップ等）は使えない。
- **出撃パーティは最大5人**（前衛3＋後衛2、[01 §9](./01-character-system.md)）。**`STARTING_GOLD = 500`（確定）**。作成直後のキャラは装備なし（ショップ/ドロップで整える）。`initialShopStock` は MVP では未実装（解放ティアのみ保持）。

### 4.2 設定 `GameSettings` とマイグレーション

```ts
interface GameSettings {
  autoMap: 'off' | 'on' | 'full';   // [02 §3]
  bgmVolume: number; seVolume: number; // 0..1（オーディオ方針は [07 §7]）
  iconPaletteOrder?: string[];      // ICON EDIT 並び順 [02 §4.2]
}
```

- **2層バージョニング**: ①**IndexedDB DBバージョン**（オブジェクトストア構造の変更。`onupgradeneeded` で対応） ②**SaveData.schemaVersion**（セーブ中身の構造変更）。両者は独立。
- **migration チェーン**: `migrate(old: unknown, from: number): SaveData` を `from` の昇順で順次適用。読み込み時に `schemaVersion < CURRENT` なら適用。**失敗時（壊れたセーブ・未知バージョン）はそのスロットを「破損」表示にし、ニューゲーム導線へフォールバック**（既存セーブは上書きしない）。
- マスターデータ（関数値 `tpCost` 等を含む）は **セーブに含めない**。セーブは「プレイヤー進行データ」のみで、マスターは常に最新ビルドのものを参照する。

---

## 5. 全体データモデル俯瞰

各ドキュメントの型を統合した依存関係：

```
SaveData
├── Guild (01)
│   ├── Character[] (01) ── EquipmentSlots (04), learnedSkills (03)
│   ├── PartyFormation (01)
│   ├── storage: ItemStack[] (04)
│   └── bestiary: BestiaryState (05)
├── towerState (06)            ← floors/bossGates/warp/record。ストーリー/クリアの代替
│   └── floors[depth] ── 生成地形＋FOE/宝箱/採集の消化ランタイムを内包 (06)
├── diveState | null (05)      ← 潜行中のみ。現在地/向き/現HP・TP/ゲージ。全滅で null
├── playerMaps[depth] (02)
├── exploredCells[depth] (02)
├── forgeInventory (04)
├── shopStock (04)
├── settings (05)
├── questStates? (05・任意)
└── flags (05)                 ← 到達階トリガーの解放フラグ

実行時のみ存在（保存しない）:
└── BattleState (03)  ← 戦闘開始時に Guild から生成、終了時に結果を Guild へ反映
```

---

## 6. 状態管理・アーキテクチャ方針

本リポジトリ（React 19 + TS + Vite）での実装方針。

- **単一ソース**: 永続化対象は `SaveData` を単一の真実とする。実行時の派生状態（戦闘・UI状態）はそこから生成し、確定時に書き戻す。
- **ドメイン層とUI層の分離**:
  - `src/domain/`（仮）に純関数を集約。乱数は `Rng`（§0.4）を注入し `Math.random` を直接使わない → `vitest` で固定シードにより挙動を固定。
  - **純関数化＆テスト必須リスト（最低限）**: `generateFloor(depth, rng)` / `computeBaseStats(char)` / `deriveCombat(char, buffs)` / `computeDamage(atk, def, skill, lv, rng)` / `enemyScale(depth, refDepth)` / `resolveTurnOrder(combatants)` / `stepFoes(floor, foes, playerPos, rng)` / `onStep(encounter, rng)` / `reincarnate(char)` / `transferClass(char, classId)` / `forge(equip, material)` / `applyAilment / applyBuff`。これらは UI・IndexedDB に依存させない。
  - マスターデータは `src/data/`（仮）に **ドメイン別ファイル**で配置（`races.ts` / `classes.ts` / `skills.ts` / `enemies.ts` / `items.ts` / `equipment.ts`）。各ファイルは `Record<Id, Master>` を export し、起動時に前提スキルの整合などを検証する `validateMasters()` を1本用意。**バランス調整＝データ編集**で完結。
- **状態更新**: React Context + `useReducer` の reducer から domain関数を呼ぶ。状態が複雑化したら Zustand 等の軽量ストアへ。reducer/domain関数は副作用を持たせず、永続化（IndexedDB書き込み）は effect 層で行う。
- **画面遷移**: React Router 7 で「拠点 / 迷宮 / 戦闘 / メニュー」をルーティング。

> 既存テンプレートの構成（`src/components`・`src/hooks`・`src/pages`）に、`src/domain`・`src/data`・`src/store` を追加する想定。

---

## 7. MVP優先度

| 機能 | 優先度 | 備考 |
| --- | --- | --- |
| SaveData構造 + IndexedDBセーブ/ロード | ★★★ | Phase 0。全機能の土台 |
| マスターデータ駆動の基盤 | ★★★ | Phase 0 |
| ドメイン層（純関数）+ vitest | ★★★ | Phase 0-2 |
| 到達階トリガーの解放フラグ | ★★ | Phase 3-4（ミッションの代替） |
| 到達記録（TowerRecord） | ★★ | Phase 3（[06](./06-tower-progression.md)） |
| 図鑑 | ★★ | Phase 4 |
| クエスト（任意のサブ依頼） | ★ | Phase 5。必須ではない |
| 周回・引き継ぎ（NG+） | — | **不採用**（クリアの概念が無い。§3） |
| PWAオフライン対応 | ★ | Phase 5（テンプレ機能を活用） |
