# 武器屋ソート機能: 能力値順を追加 — 設計書

## 背景

ユーザ要望:
「武器屋の並び替えの条件に装備の強さ順を追加してください。atk順、int順、def順などです」

「int 順」はキャラの素ステ INT ではなく、装備にぶら下がる **MAT (魔法攻撃力)** を指すと判断する (装備にぶら下がるのは atk/mat/def/mdf のみ。RPG 慣例で杖の魔力 = mat = "int"と呼ばれる)。

## 現状

### shop ソート UI (`src/pages/shop/index.tsx`)

L67-73 で 3 種定義:

```ts
type SortKey = 'priceDesc' | 'priceAsc' | 'qtyDesc';
const SORT_LABEL: Record<SortKey, string> = {
  priceDesc: '金額が高い順',
  priceAsc: '金額が安い順',
  qtyDesc: '所持数が多い順',
};
```

L234-248 の `view()` 関数で sort 分岐。装備中個体 (locked) は常に末尾固定。

### 装備能力値の取得経路

- BuyRow: 装備マスター `EQUIPMENT[e.id].bonuses` + ショップ表示グレードで `gradedBaseBonuses(e.id, shopEquipGrade(save, e.id))` を計算
- SellRow: 装備個体 `inst.grade` と `inst.forgeLevel` から `gradedBaseBonuses + forgeBonusFor` で実効値

## 追加方針

### 1. `SortKey` を拡張

```ts
type SortKey =
  | 'priceDesc' | 'priceAsc' | 'qtyDesc'
  | 'atkDesc' | 'matDesc' | 'defDesc' | 'mdfDesc';
```

降順のみ追加 (「強い順」は降順が直感的)。昇順は不要。

### 2. ラベル

既存 UI ラベルが日本語なのに揃える:

```ts
const SORT_LABEL: Record<SortKey, string> = {
  priceDesc: '金額が高い順',
  priceAsc: '金額が安い順',
  qtyDesc: '所持数が多い順',
  atkDesc: '攻撃力が高い順',
  matDesc: '魔力が高い順',
  defDesc: '物理防御が高い順',
  mdfDesc: '魔法防御が高い順',
};
```

### 3. BuyRow / SellRow に能力値を保持

UI のソート関数で行ごとに能力値を再計算するのは無駄なので、行生成時に **事前計算した `stats` フィールド** をぶら下げる:

```ts
type RowStats = { atk: number; mat: number; def: number; mdf: number };

type BuyRow = {
  // ... 既存
  stats: RowStats; // 装備は gradedBaseBonuses で計算、非装備は all 0
};

type SellRow = (
  | { kind: 'equip'; /* 既存 */ stats: RowStats }
  | { kind: 'item'; /* 既存 */ stats: RowStats }
);
```

### 4. 能力値計算ヘルパ

`src/pages/shop/sort.ts` (新規) に切り出して純関数化:

```ts
export type RowStats = { atk: number; mat: number; def: number; mdf: number };

const EMPTY_STATS: RowStats = { atk: 0, mat: 0, def: 0, mdf: 0 };

/** 装備マスター ID + grade から RowStats を計算 (購入カタログ向け、forge強化なし)。 */
export function buyRowStats(masterId: string, grade: number): RowStats {
  const b = gradedBaseBonuses(masterId, grade);
  return {
    atk: b.atk ?? 0,
    mat: b.mat ?? 0,
    def: b.def ?? 0,
    mdf: b.mdf ?? 0,
  };
}

/** 装備個体から RowStats を計算 (売却向け、grade + forgeLevel 反映)。 */
export function instanceRowStats(inst: EquipInstance): RowStats {
  const base = gradedBaseBonuses(inst.masterId, inst.grade);
  const forge = forgeBonusFor(inst.masterId, inst.forgeLevel);
  return {
    atk: (base.atk ?? 0) + (forge.atk ?? 0),
    mat: (base.mat ?? 0) + (forge.mat ?? 0),
    def: (base.def ?? 0) + (forge.def ?? 0),
    mdf: (base.mdf ?? 0) + (forge.mdf ?? 0),
  };
}

export { EMPTY_STATS };
```

### 5. ソート関数を純関数化

UI コンポーネント内の比較ロジックを純関数として切り出し:

```ts
/** ソート関数。装備中 (locked) は外側で末尾固定するため、ここでは通常行のみ扱う。 */
export function compareRows<T extends { price: number; qty: number; stats: RowStats }>(
  sort: SortKey,
  a: T,
  b: T,
): number {
  switch (sort) {
    case 'priceAsc': return a.price - b.price;
    case 'priceDesc': return b.price - a.price;
    case 'qtyDesc': return b.qty - a.qty;
    case 'atkDesc': return b.stats.atk - a.stats.atk;
    case 'matDesc': return b.stats.mat - a.stats.mat;
    case 'defDesc': return b.stats.def - a.stats.def;
    case 'mdfDesc': return b.stats.mdf - a.stats.mdf;
  }
}
```

`index.tsx` の `view()` から `compareRows(sort, a, b)` を呼ぶ形に変更。

### 6. ソート時の同値タイブレーク

降順能力値で同点の場合、`a.price - b.price` (安い順) を fallback にしてカタログが安定するように:

```ts
function compareRows(sort: SortKey, a, b): number {
  const primary = /* switch 文 (上記) */;
  return primary !== 0 ? primary : a.price - b.price;
}
```

### 7. 非装備行の扱い

`stats` 全 0 のため、降順能力値ソートでは自動的に末尾配置 (能力値 0 同士のタイは price で並ぶ)。
例えば「攻撃力が高い順」を選んだ売却タブでは、消耗品・素材は能力値 0 で末尾に並び、その中で価格順。
これで仕様としては十分。装備カテゴリでフィルタしている場合は元から装備のみ。

## 触ってよいファイル

- `src/pages/shop/index.tsx` (`SortKey` 拡張、`SORT_LABEL` 追加、BuyRow/SellRow に stats を追加、`view()` を `compareRows` 呼び出しに変更)
- `src/pages/shop/sort.ts` (新規。`RowStats`, `buyRowStats`, `instanceRowStats`, `compareRows`, `SortKey` のエクスポート)
- `src/pages/shop/sort.test.ts` (新規。`compareRows` の単体テスト)

## 触ってはいけないファイル

- `src/domain/shop.ts` / `shop.test.ts` (ドメインロジックは変更なし)
- `src/data/equipment.ts` / `forge.ts` (装備データ・能力値計算ロジックは変更なし)
- 他の画面 / テストファイル全般
- `package.json` / `docs/`

## 単体テスト要件

`src/pages/shop/sort.test.ts` に追加:

```ts
describe('compareRows', () => {
  const make = (price: number, qty: number, atk = 0, mat = 0, def = 0, mdf = 0) =>
    ({ price, qty, stats: { atk, mat, def, mdf } });

  test('priceAsc は安い順', () => {
    expect(compareRows('priceAsc', make(100, 1), make(200, 1))).toBeLessThan(0);
  });

  test('priceDesc は高い順', () => {
    expect(compareRows('priceDesc', make(200, 1), make(100, 1))).toBeLessThan(0);
  });

  test('qtyDesc は所持数多い順', () => {
    expect(compareRows('qtyDesc', make(0, 5), make(0, 1))).toBeLessThan(0);
  });

  test('atkDesc は ATK 高い順', () => {
    expect(compareRows('atkDesc', make(0, 0, 100), make(0, 0, 50))).toBeLessThan(0);
  });

  test('matDesc は MAT 高い順', () => {
    expect(compareRows('matDesc', make(0, 0, 0, 100), make(0, 0, 0, 50))).toBeLessThan(0);
  });

  test('defDesc は DEF 高い順', () => {
    expect(compareRows('defDesc', make(0, 0, 0, 0, 100), make(0, 0, 0, 0, 50))).toBeLessThan(0);
  });

  test('mdfDesc は MDF 高い順', () => {
    expect(compareRows('mdfDesc', make(0, 0, 0, 0, 0, 100), make(0, 0, 0, 0, 0, 50))).toBeLessThan(0);
  });

  test('能力値同値時は price 昇順でタイブレーク', () => {
    expect(compareRows('atkDesc', make(100, 0, 50), make(200, 0, 50))).toBeLessThan(0);
  });

  test('能力値 0 の装備外行は降順ソートで末尾へ', () => {
    // atk 0 vs atk 100 で降順 → atk 100 が先
    expect(compareRows('atkDesc', make(0, 0, 0), make(0, 0, 100))).toBeGreaterThan(0);
  });
});

describe('buyRowStats / instanceRowStats', () => {
  test('buyRowStats は gradedBaseBonuses 経由で grade を反映', () => {
    // equip_golem_blade: base atk 13, grade=2 → atk ≈ 145
    const s = buyRowStats('equip_golem_blade', 2);
    expect(s.atk).toBeGreaterThanOrEqual(140);
    expect(s.atk).toBeLessThanOrEqual(150);
    expect(s.mat).toBe(0);
    expect(s.def).toBe(0);
  });

  test('instanceRowStats は forgeLevel も加算する', () => {
    const inst: EquipInstance = {
      id: 'i1', masterId: 'equip_short_sword', forgeLevel: 5, grade: 1,
    } as EquipInstance;
    const s = instanceRowStats(inst);
    // base atk 8 + forgeBonusFor(short_sword, 5) → forgeIncPerLevel(0)*5 = 2*5 = 10 → 合計 18
    expect(s.atk).toBe(18);
  });
});
```

## 検証ゲート

```
yarn test
yarn lint
yarn tsc -b
```

すべて緑。`yarn build` はディレクターが回す。

## 完了報告

- 追加した SortKey の一覧
- ラベル表記
- 新規ファイル `sort.ts` / `sort.test.ts`
- index.tsx での変更概要 (行数感)
- 検証ゲート 3 点緑
- コミット SHA (push はしない)

## サブエージェントへの注意

- 自分で Edit/Write/Bash を使って実装。さらにサブエージェント (Agent/Task) を spawn しないこと。
- コミットしたら push しない。ディレクターがレビュー後に push する。
- コミットメッセージは `feat(shop): add ATK/MAT/DEF/MDF sort options to weapon shop` 系。
