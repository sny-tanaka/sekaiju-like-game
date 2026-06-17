# TP経済リバランス 設計書（issue #57 第2弾）

実装担当（sonnet）が「判断を残さず」実装するための確定設計。式・初期係数・手順を確定。
**新たな判断（式の発明・数値の勝手な変更）は禁止。本書どおりに実装する。** 係数の最終調整（iterate）はディレクターが balanceSim を回して行うので、実装担当は**本書の初期係数のとおり**に実装すること。

対象: `/Users/shunyatanaka/work/sekaiju-like-game`、ブランチ `feat/tp-economy-rework`（作業中。新規 checkout 不要）。

---

## 0. 目的
1. 戦闘中の TP 自然回復を廃止（**実装済み**: battle.ts のターン終了TP回復を削除、balance.ts の TP_REGEN_RATIO 削除）。TP はアイテム/スキルで管理する有限資源。
2. 消費TPを **「スキルが持つ各効果の TP 価値の合算」** で算出する統一モデルに変更（威力だけでなく状態異常/バフ/回復等も反映）。強い効果ほど割高。
3. 算定式を strategy-docs に記載（新スキル設計の基準）。
4. balanceSim（アイテム補給AI 実装済み）で全ボス 18〜22 ターン・最低HP率≤15%（F30 のみ ≤0.25）を維持するよう係数・敵HPを iterate 調整（ディレクター担当）。

---

## 1. 消費TP算定モデル `computeSkillTpCost(def, lv)`

新規ファイル `src/domain/skillCost.ts` に実装する。

```
消費TP(lv) = max(1, round( Σ_e effectValue(e, lv) ))
```

`def` は `effects: SkillEffectDef[]` と `target: TargetType` を持つ（BattleSkillDef / UnionSkillDef 共通で参照するのは effects と target）。

### 対象範囲倍率 T(target)
- `enemyOne` / `allyOne` / `self` → **1.0**
- `enemyRow` → **1.5**
- `enemyAll` / `allyAll` → **2.0**

### 効果別 TP 価値 effectValue(e, lv)（初期係数）

`balance.ts` に係数オブジェクト `SKILL_TP` として集約する（下記値が初期値）。

| effect.kind | TP価値の式 | 備考 |
|---|---|---|
| `damage` | `Kd * (power(lv) * hits)^Pd * (1 + 0.6*drain) * T` | `Kd=1.95`, `Pd=3`, `hits=e.hits??1`, `drain=e.drain??0` |
| `heal` | `Kh * amount(lv) * T` | `Kh=0.35` |
| `restoreTp` | self(target==='self'): `0.5 * amount(lv)` ／ それ以外: `2.0 * amount(lv)` | **T は掛けない**（専用）。self=純増可／全体=本人実質マイナス |
| `ailment` | `Ka * chance(lv) * turns * SEV[ailment] * T` | `Ka=8` |
| `buff` | `Kb * abs(modifier(lv) - 1) * turns * T` | `Kb=15`（デバフ=modifier<1 も同式） |
| `summon` | `Ksummon` | `Ksummon=14`（固定） |
| `counter` | `Kcounter * chance(lv) * power(lv) * turns` | `Kcounter=2.5` |
| `chase` | `Kchase * power(lv) * turns` | `Kchase=2.0` |
| `decoy` | `Kdecoy * turns` | `Kdecoy=2.5` |
| `barrier` | `Kbarrier * absorb(lv)` | `Kbarrier=0.3` |
| `regen` | `Kregen * amount(lv) * turns * T` | `Kregen=0.4` |
| `cleanse` | `Kcleanse * T` | `Kcleanse=6` |
| `revive` | `Krevive + Kreviveratio * ratio(lv) * 100` | `Krevive=12`, `Kreviveratio=0.15` |

状態異常の強さ `SEV[ailment]`（balance.ts に）:
```
headBind: 1.0, armBind: 1.0, legBind: 1.0,
sleep: 1.3, paralysis: 1.2, instantDeath: 2.5,
poison: 0.5, blind: 0.7, confusion: 0.9, curse: 0.8
```

注:
- `power`/`amount`/`chance`/`modifier`/`absorb`/`ratio` は `(lv)=>number`。lv を渡して評価。
- 合算後 `round`、最低 1。
- ユニオンスキルは**通常の TP 消費を持たない（ゲージ消費）**ため、computeSkillTpCost の対象外。`computeSkillTpCost` は通常スキル（BattleSkillDef）専用。

### 初期係数の妥当性（手計算サンプル・参考）
- power_slash（damage, power≈1.4+0.2lv, 単体）: Lv1 power1.6 → 1.95*1.6^3≈8。Lv5 power2.4 → 1.95*2.4^3≈27。→ ユーザー基準（160%≈8 / 200%≈16 / 240%≈27）に一致。
- fire_bolt（damage int, power1.5+0.25lv, 単体）: Lv1 power1.75 → ≈10。
- heal（amount≈大, 単体）: amount 30 → 0.35*30≈11。
- mass_heal（heal, allyAll, T=2）: amount 20 → 0.35*20*2≈14。
- provoke（decoy, turns≈3）: 2.5*3≈8。
- 出血付与つき斬撃（damage+ailment poison）: damage分 + 8*chance*turns*0.5。複合で自然に割高。

（最終値は iterate で変わる。実装担当は上記初期係数で入れること。）

---

## 2. 実装手順

### (A) `src/domain/skillCost.ts`（新規）
`computeSkillTpCost(def: { effects: SkillEffectDef[]; target: TargetType }, lv: number): number` を実装。上記モデルどおり。balance.ts の `SKILL_TP` 係数を参照。

### (B) `src/data/balance.ts`
`SKILL_TP` 係数オブジェクトと `AILMENT_SEVERITY` を追加（上記の初期値）。

### (C) `src/domain/types.ts`
`BattleSkillDef` から **`tpCost` フィールドを削除**（消費TPは式で算出するため）。

### (D) `src/data/battleSkills.ts`
全スキル定義から **`tpCost: ...` 行を削除**（型変更に追従）。effects/target/element 等はそのまま。

### (E) `src/domain/battle.ts`
スキル消費の箇所 `const cost = def.tpCost(level);` を `const cost = computeSkillTpCost(def, level);` に変更（味方スキル処理）。`computeSkillTpCost` を import。
（敵スキルは EnemyActionDef で別管理＝TP消費しないので対象外。確認のみ。）

### (F) `src/domain/balanceSim.test.ts`
独自の `skillTpCost(skillId, skillLv)`（switch テーブル）を廃止し、**`computeSkillTpCost(BATTLE_SKILLS[skillId], skillLv)` で算出**するよう変更（本体と同じ値にして makeCommands の判定と resolveTurn の実消費を一致させる）。`BATTLE_SKILLS` を import。
- 注意: 既存の `skillTpCost(...)` 呼び出し箇所をすべて置換。

### (G) `src/data/strategyDocsGen.test.ts`
スキル表の TP 列を `computeSkillTpCost(def, lv)` で全レベル算出するよう変更（`tpAll`/`tpStr` を式ベースに）。

### (H) UI（`src/pages` でスキルの消費TP表示があれば）
`def.tpCost(lv)` 参照を `computeSkillTpCost(def, lv)` に置換（grep で要確認。skill メニュー等）。

### (I) テスト
- `src/domain/skillCost.test.ts`（新規）: 代表スキルで「damage は威力^3 で割高」「複合（damage+ailment）は単体damageより高い」「全体は単体の約2倍」「restoreTp self<amount, 全体=2*amount」「最低1」を検証。
- 既存テストで `tpCost` を直接参照しているものがあれば computeSkillTpCost に修正。

---

## 3. 検証・iterate（ディレクター担当。実装担当は初期係数で緑にできる範囲まで）

実装担当は (A)-(I) を入れて `yarn lint` / `yarn tsc -b` を通すこと。`yarn test` のうち **balanceSim 以外**を緑にすること（balanceSim AC はディレクターが係数 iterate で合わせるため、実装担当時点で赤でも可。ただしどのボスが何ターンかを報告すること）。

ディレクターが以降:
- balanceSim を回し、`SKILL_TP` 係数と必要なら敵HP（enemies.ts / enemyScale）を調整し、全ボス 18〜22 ターン・最低HP率を満たす。
- 最終係数を確定し strategy-docs（balance.md）に算定式・係数・状態異常重みを記載。

---

## 4. 触ってよいファイル
- `src/domain/skillCost.ts`（新規）, `src/domain/skillCost.test.ts`（新規）
- `src/data/balance.ts`（SKILL_TP / AILMENT_SEVERITY 追加。TP_REGEN_RATIO は削除済み）
- `src/domain/types.ts`（BattleSkillDef.tpCost 削除）
- `src/data/battleSkills.ts`（tpCost 行削除）
- `src/domain/battle.ts`（computeSkillTpCost 使用。自然回復削除は実装済み）
- `src/domain/balanceSim.test.ts`（skillTpCost を computeSkillTpCost へ。アイテム補給AIは実装済み）
- `src/data/strategyDocsGen.test.ts`（TP 列を式ベースに）
- UI（消費TP表示箇所のみ）

**触ってはいけない**: 敵データ（enemies.ts。敵HP調整はディレクターが iterate で行う）、docs/（ビルド成果物）、隊列/種族/転生まわり。

---

## 5. 注意
- **自分で実装すること。孫エージェントを spawn しない。**
- 係数は本書の初期値どおり。勝手に変えない（iterate はディレクター）。
- balanceSim の makeCommands 判定TP（computeSkillTpCost）と resolveTurn 実消費（computeSkillTpCost）を必ず一致させる。
- すべて日本語で報告。
