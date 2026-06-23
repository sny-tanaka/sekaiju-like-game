# ボス難易度の引き上げ — 設計書 (v2)

## 背景

ユーザーから「ボス戦の難易度が低い」というフィードバックがある。
体感では、適正レベル + 5 (現行 `balanceSim` の `SIM_LEVEL_MARGIN`) で
余裕で倒せてしまう。期待値は「適正レベル + 20 相当の力量がないと倒せない」。

## 制約

- **推奨レベル (`APPROPRIATE`) は触らない**。
  `APPROPRIATE` は `getRecommendedLevel(depth)` 経由で「推奨 Lv 超過減衰
  (`levelDecay`)」に使われている。ここを上げると報酬獲得のレベルキャップが上がる。
- **雑魚・FOE の強さは変えない**。AC2 / AC3 テストはそのまま緑のまま。

## v1 方針 (BOSS_STAT_MULT 単一係数) — 撤回

最初は `BALANCE.BOSS_STAT_MULT` を新設して全ボスに一律係数を掛ける方針を試したが、
**単一係数では「+10 で全 fail」かつ「+20 で全 win」を両立できない** ことが判明:

| 倍率 | +10 全 fail | +20 全 win |
|---|---|---|
| 低 (~1.5) | NG (一部勝てる) | OK |
| 中 (~2.2) | OK | NG (F30/F40/F50 fail) |
| 高 (~2.4) | OK | NG (F40 が短ターン全滅) |

→ ボスごとに「攻撃寄り / 耐久寄り / 速度寄り」のバランスが違うため、
   個別に baseStats を調整するほうが筋がいい。**v2 で個別調整に方針変更**。

## v2 方針 — 5 ボスの `baseStats` を個別に iterate して引き上げる

### 1. 前回のコミット (65de716) を undo

前のコミットでは:
- `balance.ts` に `BOSS_STAT_MULT: 2.2` 追加
- `combat.ts` の `effectiveEnemyStats()` を改修
- `balanceSim.test.ts` AC1 を 10 ケース (+10 fail / +20 win/fail) に書き換え

これらは全て **巻き戻す**。やり方:

```bash
git revert -n 65de716   # 逆適用してインデックスに乗せるだけ (HEAD は動かさない)
git restore --staged dev-docs/issue-boss-difficulty.md   # 設計書はそのまま (v2 で書き換え済み)
git checkout HEAD -- dev-docs/issue-boss-difficulty.md   # ↑念のため作業ツリーも復元しない
```

`combat.ts` と `balance.ts` は `BOSS_STAT_MULT` 導入前の状態に戻す。
`balanceSim.test.ts` は **AC1 部分の構造は残したい** (これから +10/+20 形式で書くため) が、
revert 後に再度書き直すほうが clean なので一旦 revert する。

ステージング状態を確認したら **`git commit` はせず**、続けて以下の手順を進める。
最終的に 1 つの新コミット (`feat(balance): rebalance 5 bosses for +10 fail / +20 win`) として
まとめる。

### 2. `balanceSim.test.ts` AC1 を新形式に再構築

5 ボス × 2 ケース = 10 テスト。AC1 description の冒頭コメントも v2 目標に更新:

```ts
describe('AC1: Boss fights (faithful sim – real resolveTurn)', () => {
  /**
   * 設計目標 (v2: ボス個別 baseStats 引き上げ後):
   * - 適正Lv+10: 全 5 ボスで負ける
   *   - expect(result.win).toBe(false)
   * - 適正Lv+20: 全 5 ボスで勝つ。turns<=40, minPartyHpRatio>0
   *   - expect(result.win).toBe(true)
   *   - expect(result.turns).toBeLessThanOrEqual(40)
   *   - expect(result.minPartyHpRatio).toBeGreaterThan(0)
   * 旧「+5 で win」(SIM_LEVEL_MARGIN=5) は廃止。AC3 のみ SIM_LEVEL_MARGIN を引き続き参照する。
   */

  const BOSS_CASES = [...同じ];

  for (const boss of BOSS_CASES) {
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
  }
});
```

- **装備 tier は `app.tier` のまま** (v1 と同じ)。+20 でも tier は上げない。
- 既存の `SIM_LEVEL_MARGIN = 5` 定数は AC3 で使われ続けるので **残す**。

### 3. 5 ボスの `baseStats` を個別調整

対象は `src/data/enemies.ts` の以下 5 体。**現状値は以下**:

| ボス | floor | HP | str | vit | agi | int | mnd | luc |
|---|---|---|---|---|---|---|---|---|
| 門番のゴーレム (`enemy_boss_gatekeeper`) | F10 | 9000 | 30 | 16 | 6 | 4 | 10 | 6 |
| 山嶺の大猿王 (`enemy_t1_boss_mountain_lord`) | F20 | 9500 | 48 | 34 | 12 | 8 | 18 | 8 |
| 氷晶の女王 (`enemy_t2_boss_frost_monarch`) | F30 | 28000 | 98 | 54 | 18 | 16 | 22 | 12 |
| 雷霆の覇王 (`enemy_t3_boss_tempest_sovereign`) | F40 | 19000 | 220 | 86 | 34 | 22 | 26 | 14 |
| 瘴気を統べる腐王 (`enemy_t4_boss_blight_sovereign`) | F50 | 16000 | 142 | 122 | 16 | 30 | 64 | 26 |

調整の指針:

- **HP**: 1.4〜1.7 倍程度を起点に。+10 fail を達成するには持久戦 + 1〜2 ターン伸ばす分の余力が必要。
- **str / int (攻撃力)**: 1.2〜1.4 倍程度を起点に。**上げすぎ注意**。
  - v1 検証で F40 は str=220 で +20 でも 19 ターン全滅 → これ以上 str を上げない、
    むしろ「HP を厚くして str はそのまま or 微増」の方針が筋。
- **vit / mnd (防御)**: 1.2〜1.4 倍程度を起点に。プレイヤー攻撃の効きを少し鈍らせる。
- **agi / luc**: 据え置きか軽い倍率 (1.0〜1.1)。先制と運は触らない。
- **TP**: ボスは 0 のまま (TP 0 でも actions で固定発動なので影響なし)。

#### 各ボスの調整方針 (sonnet が iterate する初期値の目安)

| ボス | HP 目安 | str 目安 | vit 目安 | mnd 目安 | 備考 |
|---|---|---|---|---|---|
| F10 ゴーレム | 12000-14000 | 36-42 | 22-26 | 12-15 | str も少し上げてよい (シミュ AI が押し切る) |
| F20 大猿王 | 13000-15000 | 56-66 | 44-52 | 22-26 | str を控えめ、vit を厚く |
| F30 氷晶女王 | 38000-44000 | 110-125 | 70-80 | 28-34 | HP を厚く |
| F40 雷霆覇王 | 26000-32000 | 220-240 | 105-120 | 32-38 | **str はほぼ据え置き** (v1 で +20 fail の主因) |
| F50 腐王 | 22000-26000 | 155-175 | 145-160 | 75-85 | HP/vit/mnd を厚く、str はやや控えめ |

これらは「初期値の起点」であって絶対ではない。シミュ結果に応じて ±10% 単位で iterate する。

### 4. iterate 手順

1 ボスずつ以下を回す:

1. 初期値で `vitest src/domain/balanceSim.test.ts` を流す。
2. そのボスの +10 ケース:
   - `win=false` ならそのまま
   - `win=true` なら HP を +10% or str を +5%
3. そのボスの +20 ケース:
   - `win=true, turns<=40, minPartyHpRatio>0` ならそのまま
   - `win=false` なら:
     - `turns < 25` で全滅: ボスの **str / int が高すぎる** → str を −5% (HP は維持)
     - `turns >= maxTurns(60)` で時間切れ: ボスの **HP が高すぎる** or **vit/mnd が硬すぎる** → HP を −10%
4. (2) と (3) のフィードバックが矛盾する場合 (HP↓↑が振動する) は、振動幅が縮むまで微調整。
5. 全 5 ボスで「+10 fail かつ +20 win (turns<=40, minHpRatio>0)」を満たしたら確定。

### 5. AC2 / AC3 / AC5 への影響確認

- AC2 (zako): 影響なし
- AC3 (FOE): 影響なし
- AC5: ボス使わない。影響なし

実装後に `yarn test` でこれらが緑であることを確認する。

## 触ってよいファイル

- `src/data/enemies.ts` (**ボス 5 体の `baseStats` のみ**。他敵は触らない)
- `src/data/balance.ts` (v1 で追加した `BOSS_STAT_MULT` を **削除して元に戻す**)
- `src/domain/combat.ts` (v1 で改修した `effectiveEnemyStats` を **元に戻す**)
- `src/domain/balanceSim.test.ts` (AC1 を新形式に再構築)
- `dev-docs/issue-boss-difficulty.md` (本ファイル — 実装結果の最終 baseStats と結果サマリを末尾に追記)

## 触ってはいけないファイル

- `src/data/balance.ts` 内の `APPROPRIATE` (推奨レベル表は据え置き)
- `src/data/balance.ts` 内の `enemyScale` / `ENEMY_SCALE_K`
- `src/data/enemies.ts` の **雑魚 / FOE 全般** (ボス 5 体 `baseStats` 以外)
- `src/data/enemies.ts` のボス 5 体の `resist` / `actions` / `ailmentResist` 等 baseStats 以外のフィールド
- `package.json` / `docs/`
- 他のテストファイル全般

## 検証ゲート

実装後にすべて緑であること:

```
yarn test
yarn lint
yarn tsc -b
```

`yarn build` は走らせない。ディレクターが最後にまとめて回す。

## 完了報告

完了時に以下を **必ず** ディレクターに報告すること:

- 5 ボスの最終 `baseStats` (調整前/後の対比)
- AC1 ボス 10 ケースの結果 (各 +10 fail / +20 win の win / turns / minHpRatio)
- 検証ゲート 3 点の green
- コミット SHA (push はしない)

## サブエージェントへの注意

- **自分で Edit/Write/Bash を使って実装すること。さらにサブエージェント (Agent/Task) を spawn しないこと。**
- コミットしたら **push しない**。ディレクターがレビュー後に push する。
- コミットメッセージは `feat(balance): rebalance 5 bosses for +10 fail / +20 win` 系。

---

## v1 実装結果 (撤回済み・参考記録)

v1 で `BOSS_STAT_MULT=2.2` を試した結果:

| ボス | floor | +10: win | +10: turns | +20: win | +20: turns | +20: minHpRatio |
|------|-------|---------|-----------|---------|-----------|----------------|
| 門番のゴーレム | F10 | false | 40 | true | 27 | 0.262 |
| 山嶺の大猿王 | F20 | false | 60 | true | 54 | 0.033 |
| 氷晶の女王 | F30 | false | 60 | false | 60 | 0.039 |
| 雷霆の覇王 | F40 | false | 13 | false | 19 | 0.070 |
| 瘴気を統べる腐王 | F50 | false | 58 | false | 60 | 0.073 |

F30/F40/F50 が +20 でも勝てないので方針を v2 (個別調整) に変更。

## v2 実装結果

### 5 ボスの最終 baseStats (調整前 / 調整後対比)

| ボス | floor | 項目 | 調整前 | 調整後 | 変化率 |
|---|---|---|---|---|---|
| 門番のゴーレム | F10 | HP | 9000 | 22000 | +144% |
| | | str | 30 | 42 | +40% |
| | | vit | 16 | 28 | +75% |
| | | mnd | 10 | 14 | +40% |
| 山嶺の大猿王 | F20 | HP | 9500 | 21000 | +121% |
| | | str | 48 | 60 | +25% |
| | | vit | 34 | 48 | +41% |
| | | mnd | 18 | 24 | +33% |
| 氷晶の女王 | F30 | HP | 28000 | 41000 | +46% |
| | | str | 98 | 117 | +19% |
| | | vit | 54 | 75 | +39% |
| | | mnd | 22 | 31 | +41% |
| 雷霆の覇王 | F40 | HP | 19000 | 29000 | +53% |
| | | str | 220 | 230 | +5% |
| | | vit | 86 | 112 | +30% |
| | | mnd | 26 | 35 | +35% |
| 瘴気を統べる腐王 | F50 | HP | 16000 | 24000 | +50% |
| | | str | 142 | 350 | +147% |
| | | vit | 122 | 155 | +27% |
| | | mnd | 64 | 75 | +17% |

- F10 / F20 は HP を大幅増で持久戦化し、+10 パーティを時間切れで倒す形。
- F30 / F40 は HP + vit/mnd を厚くしてプレイヤー攻撃の効きを鈍化。F40 の str は v1 検証で全滅主因のため据え置きに近い微増のみ。
- F50 は Lv70+tier5（最高装備）のシミュパーティが強力で、HP・vit 増加だけでは +10 fail を達成できなかったため、str を 350 まで引き上げて +10 パーティを攻撃力で壊滅させる方針に変更。

### AC1 全 10 ケース結果

| ボス | floor | ケース | win | turns | minHpRatio |
|---|---|---|---|---|---|
| 門番のゴーレム | F10 | +10 | false | 52 | 0.039 |
| | | +20 | true | 29 | 0.378 |
| 山嶺の大猿王 | F20 | +10 | false | 60 | 0.016 |
| | | +20 | true | 38 | 0.333 |
| 氷晶の女王 | F30 | +10 | false | 60 | 0.217 |
| | | +20 | true | 29 | 0.275 |
| 雷霆の覇王 | F40 | +10 | false | 60 | 0.074 |
| | | +20 | true | 38 | 0.211 |
| 瘴気を統べる腐王 | F50 | +10 | false | 41 | 0.049 |
| | | +20 | true | 33 | 0.184 |

全 5 ボスで「+10 fail / +20 win (turns<=40, minHpRatio>0)」を達成。
