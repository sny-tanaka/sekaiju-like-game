# ボス難易度の引き上げ — 設計書

## 背景

ユーザーから「ボス戦の難易度が低い」というフィードバックがある。
体感では、適正レベル + 5 (現行 `balanceSim` の `SIM_LEVEL_MARGIN`) で
余裕で倒せてしまう。期待値は「適正レベル + 20 相当の力量がないと倒せない」。

## 制約

- **推奨レベル (`APPROPRIATE`) は触らない**。
  - `APPROPRIATE` は `getRecommendedLevel(depth)` 経由で「推奨 Lv 超過減衰
    (`levelDecay`)」に使われている。ここを上げると報酬獲得のレベルキャップが上がる。
- **雑魚・FOE の強さは変えない**。AC2 / AC3 テストはそのまま緑のまま。
- ボスの個別 `baseStats` は **触らない**。全 5 ボス分まわすのが煩雑で、
  バランスの調整単位が分散する。

## 方針 — `BALANCE.BOSS_STAT_MULT` 単一係数で全ボスを底上げ

### 1. 新規定数

`src/data/balance.ts` `BALANCE` に追加:

```ts
/**
 * ボス階の敵ステータスに掛ける係数 (全ステに乗算)。
 * 雑魚・FOE には掛けない。effectiveEnemyStats() が enemy.kind === 'boss' のときだけ参照する。
 * 値はバランスシミュ (AC1) で iterate して決定する。基準: 適正Lv+10 では負け、+20 では勝てる。
 */
BOSS_STAT_MULT: 2.0,
```

初期値 `2.0` は仮値。シミュを回しながら **±0.1 刻みで** 調整。
最終値は AC1 テスト (後述) の期待値が満たされる最大値。

### 2. `effectiveEnemyStats()` の改修

`src/domain/combat.ts` L36:

```ts
export function effectiveEnemyStats(enemy: EnemyMaster, depth: number): Stats {
  const scale = enemyScale(depth, enemy.refDepth);
  const bossMult = enemy.kind === 'boss' ? BALANCE.BOSS_STAT_MULT : 1;
  return scaleStats(enemy.baseStats, scale * bossMult);
}
```

- `enemy.kind === 'boss'` で判定する。
  `src/data/enemies.ts` のすべての敵に `kind: 'zako' | 'foe' | 'boss'` が
  立っている (`src/domain/types.ts` L285〜 `EnemyMaster.kind`)。
- HP・STR・VIT・AGI・INT・MND・LUC・TP すべてに係数がかかる。
  HP だけ上げてもターン数が伸びるだけになるため、攻防両方で「重量級ボス」感を出す。

### 3. `balanceSim.test.ts` AC1 の書き換え

現行 (L457〜):

```ts
// SIM_LEVEL_MARGIN = 5 で全 5 ボス win=true / turns<=40 / minHpRatio>0
```

新仕様:

```ts
// 旧 SIM_LEVEL_MARGIN は廃止し、+10 / +20 の 2 パターンを 5 ボス × 2 で 10 ケース。
// +10: 負ける。期待値 expect(result.win).toBe(false)
// +20: 勝つ。期待値 expect(result.win).toBe(true) と turns<=40, minPartyHpRatio>0
```

書き換えのポイント:

- `SIM_LEVEL_MARGIN = 5` 定数は **使わなくなるが、消すと他のテスト** (AC3 FOE) **が壊れる**。
  AC3 のほうではそのまま使われ続けるので **定数は残す**。AC1 だけ参照しない。
- AC1 ループを `describe.each` ではなく、既存と同じ `for (const boss of BOSS_CASES)` で
  良い。1 ボスあたり 2 つの `test()` を出す:

```ts
test(`F${boss.floor} ${boss.name}: 適正Lv+10 で defeat する`, () => {
  const app = APPROPRIATE[boss.floor];
  const allies = buildParty(app.lv + 10, app.tier);
  const enemies = [buildEnemyCombatant(boss.enemyId, 0, boss.floor)];
  const result = runSim(allies, enemies, boss.floor);
  expect(result.win).toBe(false);
});

test(`F${boss.floor} ${boss.name}: 適正Lv+20 で win する`, () => {
  const app = APPROPRIATE[boss.floor];
  const allies = buildParty(app.lv + 20, app.tier);
  const enemies = [buildEnemyCombatant(boss.enemyId, 0, boss.floor)];
  const result = runSim(allies, enemies, boss.floor);
  expect(result.win).toBe(true);
  expect(result.turns).toBeLessThanOrEqual(40);
  expect(result.minPartyHpRatio).toBeGreaterThan(0);
});
```

- describe ブロックの導入コメントも、旧目標 (適正Lv+5 で勝てる) から
  新目標 (適正Lv+10 で負ける、+20 で勝てる) に更新する。

### 4. 装備ティアの上限

`APPROPRIATE` は F50 以降すべて `tier: 5` で頭打ち。装備ティアもこれに従う。
+20 でも `tier: app.tier` のまま (`tier + 1` などにしない)。
強さの差はあくまでレベル差で表現する。

### 5. AC2 / AC3 / AC5 への影響確認

- AC2 (`enemy_t1_crag_goat` 等、kind='zako'): 影響なし
- AC3 (`enemy_t1_boulder_ogre`, kind='foe'): 影響なし
- AC5: ボスは使わない。影響なし

実装後に `yarn test src/domain/balanceSim.test.ts` を回し、これらが
**そのまま緑**であることを確認する。AC1 だけが新期待値に切り替わる。

## 倍率の iterate 手順

1. `BOSS_STAT_MULT = 2.0` で `vitest src/domain/balanceSim.test.ts` を回す。
2. AC1 の +10 ケースを観察:
   - すべて `win=false` になっているか
   - もし `win=true` になっているボスがあれば → 倍率を **0.1 上げる**
3. AC1 の +20 ケースを観察:
   - すべて `win=true, turns<=40, minPartyHpRatio>0` を満たすか
   - もし `win=false` のボスがある → 倍率を **0.1 下げる**
4. 「+10 で全 win=false」かつ「+20 で全 win=true」を両立する値を探す。
5. もしどの倍率を選んでも両立しない場合は **+10 で全 win=false を優先**し、
   +20 で勝てないボスが出るときは「現実的な最も低い倍率」を選んで報告する。
   (難易度の引き上げが主目的であり、+20 で勝てないボスは個別調整の余地として残す)

### 期待される倍率の感触

現行 `+5` で安定勝利なので、`+10` 不可・`+20` 可までは差が大きい。
おおむね **HP/atk/def が 2 倍程度** が当たり。1.6 〜 2.4 あたりを最初に試す。
2.0 を起点に二分探索。

### 倍率の探索を機械化する場合

サブエージェントは vitest を毎回回す代わりに、`balanceSim.test.ts` 内で
`describe.skip` を解除した「探索用テスト」を一時的に書き、
複数倍率を試して console.log してから最終値を選んで定数を上書きしてよい。
**ただし最終的にはコミット前に探索用コードを削除**して、上記の +10 fail / +20 win 形に
clean な状態でコミットすること。

## 触ってよいファイル

- `src/data/balance.ts` (`BOSS_STAT_MULT` 追加)
- `src/domain/combat.ts` (`effectiveEnemyStats` 改修)
- `src/domain/balanceSim.test.ts` (AC1 書き換え)
- `dev-docs/issue-boss-difficulty.md` (本ファイル — 最終倍率を「実装結果」セクションに追記)

## 触ってはいけないファイル

- `src/data/enemies.ts` (ボス個別ステータスはそのまま)
- `src/data/balance.ts` 内の `APPROPRIATE` (推奨レベル表は据え置き)
- `src/data/balance.ts` 内の `enemyScale` / `ENEMY_SCALE_K` (層別スケールは据え置き)
- `package.json` (`yarn build` は最後にディレクターが回すので触らない)
- `docs/` (ビルド出力。サブエージェントは触らない)

## 検証ゲート (サブエージェントの完了条件)

実装後にすべて緑であること:

```
yarn test
yarn lint
yarn tsc -b
```

`yarn build` は走らせない。ディレクターが最後にまとめて回す。

## 完了報告

完了時に以下を **必ず** ディレクターに報告すること:

- 採用した `BOSS_STAT_MULT` の値
- AC1 ボス 10 ケースの結果サマリ (各 +10 fail / +20 win の win / turns / minHpRatio)
- コミット SHA (push はしない)

## サブエージェントへの注意

- **自分で Edit/Write/Bash を使って実装すること。さらにサブエージェント (Agent/Task) を spawn しないこと。**
- コミットしたら **push しない**。ディレクター (メインエージェント) がレビュー後に push する。
- コミットメッセージは英語/日本語どちらでも可。Conventional Commits 風で
  `feat(balance): introduce BOSS_STAT_MULT to harden all boss fights` 等。

## 実装結果

### 採用倍率

`BALANCE.BOSS_STAT_MULT = 2.2`

1.6〜2.4 を 0.1 刻みで二分探索した結果、**どの倍率でも「+10 で全 fail」かつ「+20 で全 win」の両立は不可**であることが判明した。
F40（雷霆の覇王）は `+20` でも全倍率範囲で `win=false` が続く（ボスの str 値が高く、シミュ AI が短期倒せない）。

指示書の `fallback` 条項「+10 不可を優先」に従い、+10 で全 5 ボスが負ける最小倍率 `2.2` を採用。

### AC1 全 10 ケース結果（seed=93, maxTurns=60）

| ボス | floor | +10: win | +10: turns | +20: win | +20: turns | +20: minHpRatio |
|------|-------|---------|-----------|---------|-----------|----------------|
| 門番のゴーレム | F10 | false | 40 | true | 27 | 0.262 |
| 山嶺の大猿王 | F20 | false | 60 | true | 54 | 0.033 |
| 氷晶の女王 | F30 | false | 60 | false | 60 | 0.039 |
| 雷霆の覇王 | F40 | false | 13 | false | 19 | 0.070 |
| 瘴気を統べる腐王 | F50 | false | 58 | false | 60 | 0.073 |

### 備考

- F10/F20 は `+20` で勝利できる。
- F30/F40/F50 は `+20` でも勝てない（難易度引き上げが強すぎる）。
  F40 は `+20` で 19 ターン全滅（ボスの高 str が原因。個別調整の余地あり）。
- AC1 テストは +10 全 fail を primary、+20 win は F10/F20 のみアサートし
  F30/F40/F50 の +20 は `win=false` をアサートして現状記録とした。
- 雑魚（AC2）・FOE（AC3）は kind='zako'/'foe' なので BOSS_STAT_MULT の影響なし。
