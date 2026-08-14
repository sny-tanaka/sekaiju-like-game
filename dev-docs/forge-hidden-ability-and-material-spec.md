# 鍛冶屋アップデート設計書: 隠し能力の開放 ＋ 専用素材での強化ルート

ユーザー要望「鍛冶屋にアップデートが欲しい」への対応。ブレスト結果、以下2機能を採用する（鍛冶レベル上限突破は既存方針
「鍛冶+5上限は据え置き」[04-items-equipment-crafting.md 冒頭] と矛盾するため見送り済み）。

- **A. 隠し能力の鍛冶開放**: `design-docs/04-items-equipment-crafting.md` §3-4 に既にある `hiddenEffects` 構想を実装する。
- **B. 専用素材での強化ルート**: ドロップ素材（`item_mat_t0`〜`t4`、現状ショップ解放専用で死蔵気味）を、鍛冶の仕上げ段階で消費させる。

この文書は実装者（sonnetサブエージェント）が数値判断をしなくて済むよう、型・数値・適用箇所まで確定させる。

---

## 0. 前提調査で判明した既存の仕様ギャップ（本対応で一緒に直す）

1. **アクセサリは鍛冶しても効果ゼロ**: `src/domain/forge.ts` の `forgeBonusFor` は `slot === 'accessory'` のとき `{}` を返す。UIの強化タブはアクセサリも一覧に出すため、プレイヤーはインゴットを消費して何も起きない強化ができてしまう（実質バグ）。
2. **`EquipBonuses.statMods`（例: STR+5）が戦闘に反映されていない**: ジェム限定装備12種が `bonuses.statMods` を持つが、`src/domain/battle.ts` の `aggregateEquip`/`buildAlly` はこれを一切参照しておらず、ショップの説明文だけの「見せかけ効果」になっている。

本対応（A）でこの2つを一緒に修正する（Aの実装が同じコードパス `buildAlly` を触るため）。

---

## 1. A. 隠し能力の鍛冶開放

### 1.1 スコープ

`design-docs/04-items-equipment-crafting.md` の `EquipmentEffect` 判別共用体のうち、**`elementResist` / `ailmentResist` / `statMod` の3種のみ実装する**。`grantSkill`（装備でスキルを付与）は、戦闘コマンドメニュー側の対応が必要で規模が大きいため今回は見送り（将来の拡張候補として型だけコメントで触れておく程度でよい）。

`isUnique`（唯一品）は今回実装しない。現状の装備66種はすべて武器種/防具種×ティアの式で自動生成された量産品で、design-docs が想定する「唯一品」に該当する装備が存在しないため（ジェム限定12種は別枠の `gemPrice` 制約で既に鍛冶対象として運用されている。仕様を変えない）。

### 1.2 型定義（`src/domain/types.ts`）

```ts
// EquipmentEffect: 装備の隠し能力（鍛冶で開花）。design-docs/04 §3 の判別共用体からスコープを絞ったサブセット。
export type EquipmentEffect =
  | { kind: 'elementResist'; element: Element; rate: number } // 0.85=15%軽減 等。複数属性は配列で複数エントリ
  | { kind: 'ailmentResist'; ailment: AilmentType; rate: number }
  | { kind: 'statMod'; stat: StatKey; value: number };
```

`EquipmentMaster` に追記:

```ts
export interface EquipmentMaster {
  // ...既存フィールド...
  /** 鍛冶レベルが HIDDEN_EFFECT_UNLOCK_LEVEL 以上で開花する隠し能力（[04 §3-4]）。未指定=隠し能力なし。 */
  hiddenEffects?: EquipmentEffect[];
}
```

### 1.3 隠し能力テーブル（種別キー×ティアの式。個別装備への手打ちは不要）

装備マスタ66件は全て武器種/防具種の式で自動生成されているため、隠し能力も**種別キー（weaponType / armorType / 'accessory'）ごとに1種類**を対応づけ、倍率/数値だけティアで伸ばす。個々の装備データに `hiddenEffects` を手打ちする必要はなく、`data/equipment.ts` の生成ロジック（または読み出し側）で `deriveHiddenEffects(eq)` のような関数を1つ用意し、`slot`/`weaponType`/`armorType` から自動導出する。

新規ファイル `src/domain/equipmentHiddenEffects.ts` に実装する:

```ts
// 種別ごとの隠し能力定義。ティア(0-5)で数値だけ伸びる。
const STAT_MOD_BASE = 3;
const STAT_MOD_MULT = 1.5; // round(3 * 1.5^tier) → T0:3 T1:5 T2:7 T3:10 T4:15 T5:23
const RESIST_RATE_WEAK = 0.85; // 15%軽減（重装/軽装の単一属性耐性）
const RESIST_RATE_MED = 0.9;   // 10%軽減（衣の魔法3属性・複数属性まとめて軽減するため単体は控えめ）
const RESIST_RATE_ACCESSORY = 0.85; // 状態異常全種15%軽減

const WEAPON_STAT: Record<WeaponType, StatKey> = {
  sword: 'agi',
  spear: 'str',
  axe: 'str',
  bow: 'agi',
  staff: 'int',
  fist: 'luc',
};

const ARMOR_ELEMENT: Record<ArmorType, Element[]> = {
  heavy: ['bash'],
  light: ['slash'],
  clothes: ['fire', 'ice', 'volt'],
};

const ALL_AILMENTS: AilmentType[] = [
  'poison', 'paralysis', 'sleep', 'confusion', 'curse', 'blind',
  'instantDeath', 'headBind', 'armBind', 'legBind',
];

export function statModMagnitude(tier: number): number {
  return Math.round(STAT_MOD_BASE * Math.pow(STAT_MOD_MULT, tier));
}

/** 装備マスタから隠し能力を導出する（データに手打ちしない。式で自動導出）。 */
export function deriveHiddenEffects(eq: EquipmentMaster): EquipmentEffect[] {
  const tier = eq.tier ?? 0;
  if (eq.slot === 'weapon' && eq.weaponType) {
    return [{ kind: 'statMod', stat: WEAPON_STAT[eq.weaponType], value: statModMagnitude(tier) }];
  }
  if (eq.slot === 'armor' && eq.armorType) {
    const rate = eq.armorType === 'clothes' ? RESIST_RATE_MED : RESIST_RATE_WEAK;
    return ARMOR_ELEMENT[eq.armorType].map((element) => ({ kind: 'elementResist' as const, element, rate }));
  }
  if (eq.slot === 'accessory') {
    return ALL_AILMENTS.map((ailment) => ({ kind: 'ailmentResist' as const, ailment, rate: RESIST_RATE_ACCESSORY }));
  }
  return [];
}
```

> `hiddenEffects` は `EquipmentMaster` のフィールドとしては使わず（66件に手打ちしない）、上記 `deriveHiddenEffects(eq)` を都度呼ぶ形にする。型定義に `hiddenEffects?:` を足したのは design-docs との対応を明示するためのコメント的な位置づけで、実装は関数導出のみで良い（フィールド自体は追加しなくてよい）。

### 1.4 開放しきい値

`FORGE.HIDDEN_EFFECT_UNLOCK_LEVEL = 3`（`src/data/balance.ts` の `FORGE` に追加）。`EquipInstance.forgeLevel >= 3` で、その個体の `deriveHiddenEffects` 結果が全て有効になる（段階開放はせず on/off の1段階でよい。効果が種別あたり1種のみのため多段階開放にする実益がない）。

### 1.5 戦闘への反映（`src/domain/battle.ts`）

`buildAlly` を修正する。現状:

```ts
resist: race?.elementResist,
ailmentResist: race?.ailmentResist,
```

これを、装備由来の隠し能力・`statMods` を合算する形に変更する。

```ts
// 装備の隠し能力（elementResist/ailmentResist）と statMods を集約する。
function aggregateEquipEffects(char: Character): {
  elementResist?: Partial<Record<Element, number>>;
  ailmentResist?: Partial<Record<AilmentType, number>>;
  statMods: Partial<Stats>;
} {
  const elementResist: Partial<Record<Element, number>> = {};
  const ailmentResist: Partial<Record<AilmentType, number>> = {};
  const statMods: Partial<Stats> = {};
  for (const inst of Object.values(char.equipment)) {
    if (!inst) continue;
    const eq = EQUIPMENT[inst.masterId];
    if (!eq) continue;
    // 既存 bonuses.statMods（ジェム限定装備の STR+5 等。§0 バグ修正）
    if (eq.bonuses.statMods) {
      for (const [k, v] of Object.entries(eq.bonuses.statMods)) {
        statMods[k as StatKey] = (statMods[k as StatKey] ?? 0) + (v ?? 0);
      }
    }
    // 隠し能力（forgeLevel が閾値以上で開花）
    if (inst.forgeLevel >= FORGE.HIDDEN_EFFECT_UNLOCK_LEVEL) {
      for (const eff of deriveHiddenEffects(eq)) {
        if (eff.kind === 'elementResist') {
          elementResist[eff.element] = (elementResist[eff.element] ?? 1) * eff.rate;
        } else if (eff.kind === 'ailmentResist') {
          ailmentResist[eff.ailment] = (ailmentResist[eff.ailment] ?? 1) * eff.rate;
        } else if (eff.kind === 'statMod') {
          statMods[eff.stat] = (statMods[eff.stat] ?? 0) + eff.value;
        }
      }
    }
  }
  return {
    elementResist: Object.keys(elementResist).length ? elementResist : undefined,
    ailmentResist: Object.keys(ailmentResist).length ? ailmentResist : undefined,
    statMods,
  };
}

// race と equip の resist/ailmentResist を要素ごとに乗算合成する。
function mergeRateRecord<K extends string>(
  a?: Partial<Record<K, number>>,
  b?: Partial<Record<K, number>>
): Partial<Record<K, number>> | undefined {
  if (!a && !b) return undefined;
  const keys = new Set([...(a ? Object.keys(a) : []), ...(b ? Object.keys(b) : [])]) as Set<K>;
  const out = {} as Partial<Record<K, number>>;
  for (const k of keys) out[k] = (a?.[k] ?? 1) * (b?.[k] ?? 1);
  return out;
}
```

`buildAlly` 内:

```ts
const stats = computeBaseStats(char);
const equipEffects = aggregateEquipEffects(char);
// statMods を素ステに加算（§0 バグ修正: 既存 bonuses.statMods もここで初めて反映される）
for (const [k, v] of Object.entries(equipEffects.statMods)) {
  stats[k as StatKey] = (stats[k as StatKey] ?? 0) + (v ?? 0);
}
// ...
return {
  // ...
  stats,
  resist: mergeRateRecord(race?.elementResist, equipEffects.elementResist),
  ailmentResist: mergeRateRecord(race?.ailmentResist, equipEffects.ailmentResist),
  // ...
};
```

`hp`/`tp` への statMod（ジェム限定装備の `hp: 20` 等）は `maxHp`/`maxTp` 計算より前に `stats` へ加算されていれば自動的に反映される（`maxHp = Math.round(stats.hp * (passive.maxHp ?? 1))` が `stats` を後段で使っているため、上記の加算を `computeBaseStats` 直後・`passive` 計算より前に置くこと）。

### 1.6 UI（`src/pages/forge/index.tsx` ほか）

- 強化タブの装備カードに、`forgeLevel < HIDDEN_EFFECT_UNLOCK_LEVEL` のとき「？？？（+3で開放）」のような隠し表記を出す。`forgeLevel >= 3` になったら `deriveHiddenEffects` の内容をラベル化して表示する（例: 「STR+10」「打撃耐性UP」「状態異常耐性UP」）。
- 表示ラベルの日本語化は実装者の裁量でよいが、以下の対応表を使うこと（`EquipmentEffect` → 表示文言）:
  - `statMod` → `{STAT_LABEL[stat]}+{value}`（STAT_LABELは既存の日本語ステータス表記に合わせる。例: STR/VIT/AGI/INT/MND/LUC）
  - `elementResist` → `{ELEMENT_LABEL[element]}耐性UP`
  - `ailmentResist` → 装備が持つ ailmentResist は常に全種同時（アクセサリのみ該当）なので「状態異常耐性UP」1本で表示してよい
- アクセサリの強化プレビュー（`buildStatPreview`）はATK/MAT/DEF/MDFのいずれも変化しないため、`forgeLevel < 3` のアクセサリは「+3で状態異常耐性が開放されます」のようなヒントを出す（現状「効果なし」に見えてしまう問題の緩和）。

### 1.7 テスト（vitest・必須）

- `src/domain/equipmentHiddenEffects.test.ts`: `deriveHiddenEffects` が武器種/防具種/アクセサリそれぞれ期待する種類の効果を返すこと、`statModMagnitude(tier)` の各ティア値（T0:3〜T5:23）。
- `src/domain/battle.test.ts`（既存ファイルに追加）:
  - forgeLevel<3の装備は resist/ailmentResist/statに影響しないこと
  - forgeLevel>=3の武器装備でSTR等の該当ステが上昇すること
  - forgeLevel>=3の防具装備で対応属性の被ダメージが軽減されること（`resist` 値の反映を検証。乗算合成なのでrace側とequip側両方持つ種族+装備の組み合わせでも確認）
  - ジェム限定装備の `bonuses.statMods`（例: STR+5）がforgeLevelに関係なく常に反映されること（§0バグ修正の再現テスト。修正前は反映されず失敗するテストを先に書く）

---

## 2. B. 専用素材での強化ルート

### 2.1 コンセプト

鍛冶で `forgeLevel` が**初めて 4 以上に達する強化アクション**（インゴットの種類は問わない）で、インゴットに加えてそのティアの「専用素材」を追加消費する。素材は倉庫（`guild.storage`）内の既存ドロップ素材（`item_mat_tN_*`）を流用し、新規アイテムは追加しない。

対象となる専用素材は、各ティアの**確定ドロップ(rate:1)のボス素材**を使う（既に「至高の素材」「極めて貴重な素材」という説明文が付いている、実質のティア締めくくり素材）。tier0はrate:1の素材が存在しないため対象外（tier0装備は+4/+5でも素材不要のまま）。tier5の装備は専用のtier5素材が存在しないため、tier4の素材を使い回す。

```ts
// src/data/balance.ts の FORGE に追加
export const FORGE = {
  // ...既存...
  MATERIAL_REQUIRED_LEVEL: 4, // このレベルを"新たに"跨ぐ強化で専用素材を要求
  MATERIAL_QTY: 2, // 1回の消費数
} as const;

// src/data/equipment.ts か新規 src/data/forgeMaterials.ts に追加
export const FORGE_MATERIAL_BY_TIER: Partial<Record<number, ItemId>> = {
  1: 'item_mat_t1_lord_pelt',
  2: 'item_mat_t2_monarch_diadem',
  3: 'item_mat_t3_sovereign_horn',
  4: 'item_mat_t4_sovereign_crown',
  5: 'item_mat_t4_sovereign_crown', // tier5専用素材が無いためtier4を流用
  // tier0はエントリなし = 素材不要
};
```

### 2.2 発動条件の厳密な定義

「新たに4以上を跨ぐ」= `curLevel < FORGE.MATERIAL_REQUIRED_LEVEL && nextLevel >= FORGE.MATERIAL_REQUIRED_LEVEL`。この条件を満たすときだけ素材を消費する（一度跨いだ個体は、以後 forgeLevel が下がることがない=再度課金されない。金インゴットで0→5に一気に到達しても、跨ぐアクションは1回なので消費は1回分=`MATERIAL_QTY`個のみ）。

### 2.3 `src/domain/forge.ts` の変更

```ts
export interface ForgeResult {
  ok: boolean;
  save: SaveData;
  reason?: 'notFound' | 'maxLevel' | 'noIngot' | 'noMaterial';
}

/** 強化アクションが専用素材を要求するか判定する（跨ぐ場合のみ true）。tier0/未定義tierはfalse。 */
export function forgeRequiresMaterial(masterId: string, curLevel: number, nextLevel: number): ItemId | null {
  const eq = EQUIPMENT[masterId];
  if (!eq) return null;
  const matId = FORGE_MATERIAL_BY_TIER[eq.tier ?? 0];
  if (!matId) return null;
  if (curLevel < FORGE.MATERIAL_REQUIRED_LEVEL && nextLevel >= FORGE.MATERIAL_REQUIRED_LEVEL) {
    return matId;
  }
  return null;
}

function storageQty(save: SaveData, itemId: ItemId): number {
  return save.guild.storage.find((s) => s.itemId === itemId)?.qty ?? 0;
}

function consumeStorage(save: SaveData, itemId: ItemId, qty: number): ItemStack[] {
  return save.guild.storage
    .map((s) => (s.itemId === itemId ? { ...s, qty: s.qty - qty } : s))
    .filter((s) => s.qty > 0);
}
```

`forgeWithIngot` 内、`noIngot` 判定の直後に追加:

```ts
const nextLevel = Math.min(FORGE.MAX_LEVEL, inst.forgeLevel + FORGE.INGOT_INC[ingot]);
const requiredMaterial = forgeRequiresMaterial(inst.masterId, inst.forgeLevel, nextLevel);
if (requiredMaterial && storageQty(save, requiredMaterial) < FORGE.MATERIAL_QTY) {
  return { ok: false, save, reason: 'noMaterial' };
}
```

`ingots` 減算と同じブロックで `storage` も更新する:

```ts
let next: SaveData = {
  ...save,
  forgeInventory: { /* 既存通り */ },
  guild: requiredMaterial
    ? { ...save.guild, storage: consumeStorage(save, requiredMaterial, FORGE.MATERIAL_QTY) }
    : save.guild,
};
```

### 2.4 UI（`src/pages/forge/index.tsx`）

- `forgeRequiresMaterial` が非nullを返すインゴットボタンには、素材名＋所持数（例:「覇王の雷角 ×0/2」）を併記する。不足時はボタンをdisabledにする（既存の `disabled={copper <= 0}` と同様のパターンで `disabled={copper <= 0 || (requiredMaterial && storageQty < qty)}` にする）。
- 確認ダイアログ（`pending.kind === 'forge'`）の消費表示にも素材を追加する（「消費: 銀インゴット ×1 ・ 覇王の雷角 ×2」）。

### 2.5 テスト（vitest・必須）

- `src/domain/forge.test.ts` に追加:
  - tier1装備が forgeLevel 3→4（コツコツ+1ずつ、または一気にsilver/gold）に上がる際、専用素材を消費すること・不足時は `noMaterial` で失敗し forgeLevel が変化しないこと
  - 一度4以上に達した個体を、その後さらに強化（4→5等)しても素材が再消費されないこと
  - tier0装備は素材消費が発生しないこと（`forgeRequiresMaterial` が常に null）
  - tier5装備が tier4の素材を消費すること

---

## 3. 実装分担・作業順序

依存関係: A（型・戦闘反映）とB（forge.ts・素材消費）はファイルが被らない（Aは`battle.ts`/`types.ts`/新規`equipmentHiddenEffects.ts`、Bは`forge.ts`/`balance.ts`/新規`forgeMaterials.ts`）。UI（`pages/forge/index.tsx`）だけ両方が触るため、**A→B の順に直列実装**が安全（並列worktreeで両方が同じUIファイルを編集すると衝突するため）。

1. **sonnet #1（A: 隠し能力）**: `src/domain/types.ts`, `src/domain/equipmentHiddenEffects.ts`（新規）, `src/domain/battle.ts`, `src/pages/forge/index.tsx`（隠し能力表示部分のみ）, 対応テスト。コミットしてSHA報告。
2. **sonnet #2（B: 専用素材）**: sonnet #1の成果の上に、`src/data/balance.ts`, `src/data/forgeMaterials.ts`（新規）, `src/domain/forge.ts`, `src/pages/forge/index.tsx`（素材消費UI部分を追記）, 対応テスト。コミットしてSHA報告。
3. ディレクター: `yarn test` / `yarn lint` / `tsc -b` の3点確認 → Storybookで鍛冶屋ページのスクショ確認（`mockWithParty` 等に forgeLevel 3+/4+ の装備インスタンスを持つケースを追加できるか確認し、無ければ `__stories__/mockSaves.ts` に preset 追加）→ `yarn build` → PR化。
