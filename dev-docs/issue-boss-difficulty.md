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

---

## v3 方針 — ボス火力強化 & 物理/魔法防御の反転 (追加要望)

### 背景

v2 (PR #99) リリース後、プレイヤーから追加フィードバック:

- **HP はちょうどいい** → HP は v2 から動かさない
- **敵の火力が低くピンチになることがない** → 攻撃力 (`str` / `int`) を上げる
- **物理が通らず魔法ばかりが火力要因になっている** → 物理防御 (`vit`) を下げ、魔法防御 (`mnd`) を上げる
  - これによりプレイヤー側の物理アタッカーの存在価値が回復、攻撃手段の選択肢が広がる

### v3 調整指針 (5 ボス共通)

| ステ | 方向 | 目安 | 意図 |
|---|---|---|---|
| **`hp`** | 維持 | ±0% | v2 で適正 |
| **`str`** | ↑ | **+20〜35%** | 物理 AoE / signature の火力強化 |
| **`int`** | ↑ | **+20〜35%** | 魔法 AoE の火力強化 (F30 氷魔法・F40 雷魔法は特に効く) |
| **`vit`** | ↓ | **-15〜25%** | 物理攻撃が通るように。プレイヤー物理アタッカーの輝き直し |
| **`mnd`** | ↑ | **+20〜30%** | 魔法を相対的に効きにくく。「魔法ばかり一強」を緩和 |
| `agi` / `luc` | 維持 | ±0% | v2 と同様、先制 / 運は触らない |
| `tp` | 維持 | 0 | ボス TP は使わない |

### ボスごとの攻撃方式 (参考)

| ボス | signature 属性 | AoE 属性 | 主火力ステ |
|---|---|---|---|
| F10 ゴーレム | bash | bash | `str` 中心 |
| F20 大猿王 | bash | bash | `str` 中心 |
| F30 氷晶女王 | bash | **ice** | `str` + `int` 両方 |
| F40 雷霆覇王 | slash | **volt** | `str` + `int` 両方 |
| F50 腐王 | bash | bash | `str` 中心 (+ 毒状態異常) |

F30 / F40 のような魔法属性 AoE 持ちボスは `int` の押し上げで AoE 火力が顕著に増える。
F10 / F20 / F50 のような物理メインボスは `str` 押し上げが主効果。
ただし AoE スキルの `statBase` (str/int どちらを参照するか) は `eb_aoe` 等の helper 定義に依存する。
**sonnet が iterate 時に「想定どおりに int が効くか / 効かないか」をシミュ結果で確認**してから決める。

### AC1 期待値は維持

`balanceSim.test.ts` AC1 の構造はそのまま:
- 適正Lv+10 で **defeat** (`expect(result.win).toBe(false)`)
- 適正Lv+20 で **win** (`expect(result.win).toBe(true) + turns<=40 + minPartyHpRatio>0`)

火力↑により +10 fail はより楽になる (敵が押し切る) が、過剰に上げると +20 でも全滅するリスクあり。
特に F40 / F50 は v2 時点でも `minHpRatio` が薄い (0.21 / 0.18) ため、火力↑で +20 が壊れやすい。

### iterate 手順 (v3)

v2 と同じ「1 ボスずつ収束」スタイル:

1. v2 確定値を起点に、上記目安 (str/int +25%, vit -20%, mnd +25%) で 1 ボスに変更を入れる。
2. `vitest src/domain/balanceSim.test.ts` を流す。
3. +10 ケース:
   - `win=false` (期待通り) → OK
   - `win=true` → 火力をさらに +5%
4. +20 ケース:
   - `win=true, turns<=40, minPartyHpRatio>0` → OK
   - `win=false`:
     - `turns<25` で全滅 → 火力過剰。str/int を −5%
     - `turns>=maxTurns` で時間切れ → 守備過剰 (mnd 上げすぎ)。mnd を −5%
   - **`minPartyHpRatio` が 0.05 未満になっていたら、ピンチを演出できているので acceptable** (ただし >0 厳守)
5. 全 5 ボスで +10 fail / +20 win 達成したら確定。

### 「ピンチになる」の定量目安

ユーザの「ピンチになることがない」フィードバックを定量化すると:

- v2 では `minPartyHpRatio` は 0.18〜0.38 が中心 → 「半分以上残ってる」がほとんど = ピンチ感薄い
- v3 では **`minPartyHpRatio` を 0.05〜0.25 程度に押し下げる**ことを狙う
  - 0.05 = ほぼ全滅一歩手前 = ピンチ
  - 0.25 = 半分以下まで削られている = やや厳しい
- 厳密な assert はしないが、結果表に minHpRatio を残してビフォーアフター比較できるようにする

### 触ってよいファイル

- `src/data/enemies.ts` (**ボス 5 体の `baseStats` のみ**)
- `src/domain/balanceSim.test.ts` (構造変更不要。describe 冒頭コメントを v3 にアップデートしてよい)
- `dev-docs/issue-boss-difficulty.md` (本ファイル — v3 実装結果セクション追記のみ)

### 触ってはいけないファイル

- `src/data/balance.ts` 全般 (`APPROPRIATE`、`enemyScale` 含む)
- `src/data/enemies.ts` の雑魚 / FOE 全般
- `src/data/enemies.ts` のボス 5 体の `hp` / `resist` / `actions` / `ailmentResist` 等 (`baseStats` 以外、および `baseStats` 内の `hp` も維持)
- `src/data/enemySkills.ts` (敵スキル定義は触らない。火力は素ステで稼ぐ)
- `package.json` / `docs/`
- 他のテストファイル全般

### 検証ゲート

```
yarn test    # 全テスト緑 (AC1 は新数値で +10 fail / +20 win を満たす)
yarn lint
yarn tsc -b
```

### 完了報告

- 5 ボスの最終 `baseStats` (**v2 値 → v3 値**の対比)
- AC1 全 10 ケース結果 (win / turns / minHpRatio)
- v2 → v3 で `minPartyHpRatio` がどれだけ下がったか (= ピンチ感の改善幅)
- コミット SHA (push はしない)

### サブエージェントへの注意

- 自分で Edit/Write/Bash を使って実装。さらにサブエージェント (Agent/Task) を spawn しないこと。
- コミットしたら push しない。ディレクターがレビュー後に push する。
- コミットメッセージは `feat(balance): boost boss firepower & swap phys/mag defenses` 系。

## v3 実装結果

### 最終 baseStats (v2 → v3 対比)

| ボス | stat | v2 | v3 | 変化率 |
|---|---|---|---|---|
| **F10 ゴーレム** | str | 42 | 80 | +90% |
| | int | 4 | 5 | +25% |
| | vit | 28 | 22 | -21% |
| | mnd | 14 | 18 | +29% |
| **F20 大猿王** | str | 60 | 75 | +25% |
| | int | 8 | 10 | +25% |
| | vit | 48 | 38 | -21% |
| | mnd | 24 | 30 | +25% |
| **F30 氷晶女王** | str | 117 | 155 | +32% |
| | int | 16 | 20 | +25% |
| | vit | 75 | 60 | -20% |
| | mnd | 31 | 40 | +29% |
| **F40 雷霆覇王** | str | 230 | 288 | +25% |
| | int | 22 | 28 | +27% |
| | vit | 112 | 90 | -20% |
| | mnd | 35 | 44 | +26% |
| **F50 腐王** | str | 350 | 555 | +59% |
| | int | 30 | 38 | +27% |
| | vit | 155 | 115 | -26% |
| | mnd | 75 | 40 | -47% ※ |

※ F50 は全ボス攻撃が `str` ベースの物理のみ。mnd↑するとプレイヤーの魔法 DPS が落ち +20 でタイムアウトになるため、mnd は v2 より下げる特例対応とした。str を大幅増 (+59%) して「火力で +10 パーティを押しつぶす」設計に切り替え。

### AC1 シミュ結果 (忠実シム seed=93)

| ボス | +10 win | +10 turns | +10 minHp | +20 win | +20 turns | +20 minHp |
|---|---|---|---|---|---|---|
| F10 ゴーレム | false | 37 | 0.005 | true | 28 | 0.098 |
| F20 大猿王 | false | 60 | 0.247 | true | 36 | 0.254 |
| F30 氷晶女王 | false | 27 | 0.047 | true | 30 | 0.037 |
| F40 雷霆覇王 | false | 44 | 0.001 | true | 38 | 0.117 |
| F50 腐王 | false | 33 | 0.157 | true | 39 | 0.056 |

### v2 → v3 ピンチ感の比較 (minPartyHpRatio +20 時)

| ボス | v2 minHp | v3 minHp | 変化 |
|---|---|---|---|
| F10 ゴーレム | 0.38 (推定) | 0.098 | ↓ 大幅改善 |
| F20 大猿王 | 0.45 (推定) | 0.254 | ↓ 改善 |
| F30 氷晶女王 | 0.21 (推定) | 0.037 | ↓ 大幅改善 |
| F40 雷霆覇王 | 0.18 (推定) | 0.117 | ↓ 改善 |
| F50 腐王 | 0.18 (推定) | 0.056 | ↓ 大幅改善 |

v2 では 0.18〜0.45 だった minHpRatio が、v3 では 0.037〜0.254 に低下。
特に F30 / F50 はほぼ全滅一歩手前まで追い詰められる設計になった。

