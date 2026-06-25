# Lv2 装備の能力値強化 — 設計書

## 背景

ユーザフィードバック:
「60 階層などで Lv2 の素材が手に入るようになり、その素材から作れる武器は **ゴーレムソード Lv2** のようなもの。だが Lv2 武器がそのひとつ下のティアの武器より弱い。41〜50 階で作れる武器よりも 51〜60 階の武器の方が強くあるべき」

## 現状

### 数値構造

| tier | 剣 atk | 杖 mat | 重装 def | 上下比 |
|---|---|---|---|---|
| t0 | 8 | 8 | 8 | — |
| t1 (ゴーレム剣等) | 13 | — | 12 | ×1.62 |
| t2 (鋼の剣等) | 20 | 21 | 19 | ×1.54 |
| t3 (銀の剣等) | 33 | 34 | 30 | ×1.65 |
| t4 (ミスリルソード等) | 53 | 55 | 46 | ×1.61 |
| t5 (竜鱗の剣等) | 86 | 89 | 72 | ×1.62 |

ティア 1 段は **atk で約 ×1.62、def で約 ×1.55**。

### 不具合

`gradeMult(grade) = 1 + 0.5*(grade-1)` で Lv2 = **×1.5 倍**。これは「ティア 1 段未満」の伸びにすぎない。
SELL_UNLOCKS で F10 ボス素材 (`item_golem_core`) から解放される `equip_golem_blade` は **base tier 1, atk 13**。Lv2 化しても `atk 20` (= t2 鋼の剣同等)。
51〜60 階で手に入る Lv2 素材 = 周回後の素材だが、生成される装備が **t4 ミスリルソード (atk 53)** にも届かない逆転状態。

## ユーザ要望

ゴーレムソード Lv2 の atk ≈ **86 × 1.6 = 138** くらい。
すなわち **Lv2 = +5 ティア相当のジャンプ** (`1.62^5 ≈ 10.66 倍`)。

## 方針

### `gradeMult` を指数式に置き換える (atk/mat 系)

```ts
const GRADE_TIER_JUMP = 5;
const TIER_BASE_ATK = 1.62;
const TIER_BASE_DEF = 1.55;

export function gradeMult(grade?: number): number {
  const g = Math.max(1, grade ?? 1);
  return Math.pow(TIER_BASE_ATK, GRADE_TIER_JUMP * (g - 1));
}
```

- `Lv1 (grade=1)` → `1.62^0 = 1.0` (既存挙動を破壊しない)
- `Lv2 (grade=2)` → `1.62^5 ≈ 10.66` (= +5 ティア相当)
- `Lv3 (grade=3)` → `1.62^10 ≈ 113.6` (= +10 ティア相当。深周回想定)

### `gradedBaseBonuses` を atk/mat と def/mdf で別倍率で計算

`def/mdf` は装備マスター内では `×1.55` ベースで計算されているため、`atk` と同じ倍率を当てると伸び率がズレる。
atk/mat 系と def/mdf 系で **倍率を分離**:

```ts
export function gradedBaseBonuses(masterId: string, grade?: number): EquipBonuses {
  const eq = EQUIPMENT[masterId];
  if (!eq) return {};
  const g = Math.max(1, grade ?? 1);
  const expSteps = GRADE_TIER_JUMP * (g - 1);
  const atkMult = Math.pow(TIER_BASE_ATK, expSteps);  // ×1.62^N
  const defMult = Math.pow(TIER_BASE_DEF, expSteps);  // ×1.55^N
  const out: EquipBonuses = {};
  if (eq.bonuses.atk) out.atk = Math.round(eq.bonuses.atk * atkMult);
  if (eq.bonuses.mat) out.mat = Math.round(eq.bonuses.mat * atkMult);
  if (eq.bonuses.def) out.def = Math.round(eq.bonuses.def * defMult);
  if (eq.bonuses.mdf) out.mdf = Math.round(eq.bonuses.mdf * defMult);
  if (eq.bonuses.statMods) out.statMods = eq.bonuses.statMods;
  return out;
}
```

### 期待される数値 (Lv2)

| 装備 | base atk/def | Lv2 atk/def | Lv1 同等の tier |
|---|---|---|---|
| ゴーレムの大剣 (T1, atk 13) | 13 | **139** | T6 相当 |
| ねずみ牙の短剣 (T1, atk 13) | 13 | **139** | T6 相当 |
| ショートソード (T0, atk 8) | 8 | **85** | T5 相当 |
| t4 ミスリルソード (T4, atk 53) | 53 | **565** | T9 相当 |
| t5 竜鱗の剣 (T5, atk 86) | 86 | **917** | T10 相当 |
| t5 竜鱗の鎧 (T5, def 72/mdf 29) | 72/29 | **644 / 260** | def T10/mdf T10 相当 |

ゴーレムの大剣 Lv2 atk 139 はユーザ要望 (138) とほぼ一致。
t5 base 装備の Lv2 化は爆強化されるが、**それは 2 周目以降のエンドコンテンツ装備として位置付け** (周回を進めるごとに装備が強くなる、を表現)。

### 価格について

`gradeMult` を価格にも使っている (shop.ts):

```ts
buyPriceOf(): EQUIPMENT[id].buyPrice * gradeMult(grade)
sellPriceOf(): 同上を 1/2
```

倍率を上げると価格も同倍率で上がる:
- ゴーレムの大剣 Lv2 buyPrice = 480 × 10.66 ≈ **5118** 円 (= t5 装備 6184 円より少し安い、妥当)
- t5 竜鱗の剣 Lv2 buyPrice = 6184 × 10.66 ≈ **65,920** 円 (周回中の高額装備)

このまま `gradeMult` を共通で使う形でよい。装備強化に応じた価格上昇はゲーム経済の整合性として正しい。

### `balanceSim` への影響

balanceSim は `grade=1` 装備で計算しているため **影響なし**。AC1/AC2/AC3 はそのまま緑。

## 触ってよいファイル

- `src/domain/forge.ts` (`gradeMult` と `gradedBaseBonuses` を改修)
- `src/domain/forge.test.ts` (新規または追記。Lv2 の効果値が +5 ティア相当であることを assert)

## 触ってはいけないファイル

- `src/data/equipment.ts` (装備の base 値は据え置き)
- `src/data/items.ts` / `src/domain/shop.ts` (SELL_UNLOCKS の経路は触らない)
- `src/data/balance.ts` (FORGE/BALANCE 定数は据え置き)
- `package.json` / `docs/`
- 他のテストファイル全般

## 単体テスト要件

`forge.test.ts` に以下を追加 (なければ新規作成):

```ts
describe('gradeMult', () => {
  test('grade=1 は 1.0 (既存挙動)', () => {
    expect(gradeMult(1)).toBe(1);
    expect(gradeMult(undefined)).toBe(1);
  });
  test('grade=2 は +5 tier 相当 (≈10.66)', () => {
    expect(gradeMult(2)).toBeCloseTo(Math.pow(1.62, 5), 5);
  });
  test('grade=3 は +10 tier 相当', () => {
    expect(gradeMult(3)).toBeCloseTo(Math.pow(1.62, 10), 5);
  });
});

describe('gradedBaseBonuses', () => {
  test('Lv1 は base 値そのまま', () => {
    expect(gradedBaseBonuses('equip_golem_blade', 1)).toEqual({ atk: 13 });
  });
  test('ゴーレムの大剣 Lv2 は atk ≈ 139 (T6 sword 相当)', () => {
    const b = gradedBaseBonuses('equip_golem_blade', 2);
    expect(b.atk).toBeGreaterThanOrEqual(135);
    expect(b.atk).toBeLessThanOrEqual(145);
  });
  test('t5 竜鱗の鎧 Lv2 は def/mdf も拡張される', () => {
    const b = gradedBaseBonuses('equip_t5_heavy', 2);
    expect(b.def).toBeGreaterThan(500);
    expect(b.mdf).toBeGreaterThan(200);
  });
  test('atk と def で倍率が異なる (atk=×1.62^5, def=×1.55^5)', () => {
    const sword = gradedBaseBonuses('equip_t5_sword', 2);   // atk
    const armor = gradedBaseBonuses('equip_t5_heavy', 2);    // def
    expect(sword.atk! / 86).toBeCloseTo(Math.pow(1.62, 5), 1);
    expect(armor.def! / 72).toBeCloseTo(Math.pow(1.55, 5), 1);
  });
});
```

## 検証ゲート

```
yarn test    # 既存テストが緑 + 新規 forge.test.ts が緑
yarn lint
yarn tsc -b
```

`yarn build` はディレクターが最後に回す。

## 完了報告

- 変更後の `gradeMult` の挙動 (grade=1〜5 の値)
- 主要装備の Lv2 効果値 (ゴーレムの大剣 / t4 sword / t5 sword / t5 heavy)
- 新規テスト追加件数
- 検証ゲート 3 点緑
- コミット SHA (push はしない)

## サブエージェントへの注意

- **自分で Edit/Write/Bash を使って実装すること。さらにサブエージェント (Agent/Task) を spawn しないこと。**
- コミットしたら **push しない**。ディレクターがレビュー後に push する。
- コミットメッセージは `feat(forge): make Lv2 equipment jump 5 tiers worth of stats` 系。
