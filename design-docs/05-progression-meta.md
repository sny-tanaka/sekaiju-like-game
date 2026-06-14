# 05. メタ進行・データ永続化

担当範囲: クエスト/ミッション / 図鑑 / 周回・引き継ぎ（NEW GAME+）/ セーブ・ロード / 全体データモデル / 状態管理方針

参照元: 世界樹の迷宮Ⅴ「システム」より「周回・引き継ぎ」（および図鑑・クエストの一般仕様）

---

## 1. クエスト・ミッション

- **ミッション**: メインストーリーを進める主筋のタスク。クリアで新システム（転職・称号・フロアジャンプ等）が解放される。
- **クエスト**: 街で受注するサブタスク。報酬は金・アイテム・レシピなど。達成状況を保存。

```ts
interface QuestState {
  id: string;
  status: 'unaccepted' | 'active' | 'cleared';
  progress?: Record<string, number>; // 討伐数など
}
```

---

## 2. 図鑑（Bestiary / Collection）

- モンスター・アイテム・装備の収集記録。撃破・入手で埋まる。
- 評議会（拠点NPC）への図鑑登録で報酬（インゴット等、[04](./04-items-equipment-crafting.md)）を得る要素を持てる。

```ts
interface BestiaryState {
  monsters: Record<string, { seen: boolean; defeated: boolean; dropsFound: string[] }>;
  items: Record<string, boolean>;
}
```

---

## 3. 周回・引き継ぎ（NEW GAME+）

エンディング到達後、データを引き継いで最初から始められる。**何を引き継ぎ、何をリセットするか** を明確に定義する。

### 3.1 引き継げるもの

- ギルドメンバー（キャラ・ギルドカード情報・ボス初討伐によるレベル開放状況を含む）
- 所持金
- 所持アイテム（倉庫/預かり所含む）
- 施設アイテム（ショップ在庫・断片・インゴットの在庫）
- 図鑑
- 地図の塗り / 壁線 / アイコン配置 / メモ / オートパイロット

### 3.2 引き継がれないもの（リセット）

- ギルド名（※周回時に変更可能。変更すると元データのギルドカードを自分で受け取れる）
- 地図の踏破（視認）情報 ← マップは残るが「歩いた事実」はリセット
- アイコンの並べ替え（ICON EDIT）設定
- 評議会への図鑑登録（報酬再取得のため）
- 食材アイテム / 貴重品 / クエストのクリア状況

### 3.3 注意設計

- 所持枠拡張スキルで上限超過のアイテムを持っていた場合、**超過分は周回時に消滅**する → UIで警告。
- 転職は周回後も「最初のミッションクリアまで選択不可」（解放フラグはリセットされる）。

```ts
interface CarryOverConfig {
  members: boolean;        // 既定 true
  gold: boolean;
  items: boolean;
  facilityStock: boolean;
  bestiary: boolean;
  mapPaintAndIcons: boolean;
  // リセット対象は引き継ぎ処理側で常に除外
  newGuildName?: string;
}
function startNewGamePlus(save: SaveData, config: CarryOverConfig): SaveData;
```

> **設計意図**: 育てたギルドと描いた地図を持ち越しつつ、踏破情報と解放フラグをリセットして「もう一度冒険する」動機を残す。やり込み/縛りプレイの受け皿。

---

## 4. セーブ・ロード（永続化）

本作はフロントエンドのみのSPA/PWAなので、サーバを持たずクライアントに永続化する。

- **保存先**: 大きめのゲーム状態（セーブデータ・図鑑・全フロアの地図）は **IndexedDB**。設定など軽量データは localStorage。
- **複数スロット**: セーブスロットを複数持てる構造にする。
- **オートセーブ**: 拠点帰還時・フロア移動時など区切りで自動保存。
- **スキーマバージョニング**: セーブデータに `version` を持たせ、将来のデータ構造変更に migration で対応する。
- PWA: Service Worker でオフライン起動可能にし、ネット接続なしでもプレイ・セーブできる（本リポジトリの `vite-plugin-pwa` を活用）。

```ts
interface SaveData {
  version: number;
  savedAt: number;         // epoch ms
  guild: Guild;            // [01]
  questStates: QuestState[];
  bestiary: BestiaryState;
  playerMaps: Record<string, PlayerMap>;   // floorId -> [02]
  exploredCells: Record<string, string[]>; // floorId -> 視認済みcellKey[]
  foeStates: Record<string, FoeRuntimeState[]>;
  forgeInventory: ForgeInventory;          // [04]
  shopStock: ShopStock;
  flags: Record<string, boolean>;          // ミッション解放等のフラグ
  cleared: boolean;                        // 周回判定用
}
```

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
├── playerMaps: PlayerMap[] (02)
├── foeStates (02)
├── forgeInventory (04)
├── shopStock (04)
├── questStates (05)
└── flags (05)

実行時のみ存在（保存しない）:
└── BattleState (03)  ← 戦闘開始時に Guild から生成、終了時に結果を Guild へ反映
```

---

## 6. 状態管理・アーキテクチャ方針

本リポジトリ（React 19 + TS + Vite）での実装方針。

- **単一ソース**: 永続化対象は `SaveData` を単一の真実とする。実行時の派生状態（戦闘・UI状態）はそこから生成し、確定時に書き戻す。
- **ドメイン層とUI層の分離**:
  - `src/domain/`（仮）に純関数を集約: ダメージ計算・行動順・エンカウント抽選・FOE移動・ステータス算出・引退/転職処理・鍛冶。
  - 乱数は `Rng` インターフェースで注入し、テストでは固定シードを渡す → `vitest` で挙動を固定。
  - マスターデータは `src/data/`（仮）に定数として配置（種族/職業/スキル/敵/アイテム/迷宮）。**バランス調整＝データ編集**で完結。
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
| ミッション解放フラグ | ★★ | Phase 1+ |
| 図鑑 | ★★ | Phase 4 |
| クエスト | ★ | Phase 5 |
| 周回・引き継ぎ | ★ | Phase 5 |
| PWAオフライン対応 | ★ | Phase 5（テンプレ機能を活用） |
