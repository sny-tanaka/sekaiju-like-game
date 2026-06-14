# 04. アイテム・装備・生産システム

担当範囲: 装備（武器・防具・アクセサリ・唯一品）/ 装備効果 / 消費アイテム / 採集 / ドロップ / 食材・料理 / 鍛冶（強化・リサイクル）

参照元: 世界樹の迷宮Ⅴ「システム」より「食材・料理」「鍛冶システム」（および装備・アイテム・採集の一般仕様）

---

## 1. 目的・体験

探索で得た素材を街で装備に変え、装備を **鍛冶で育てて長く使う**。迷宮では **食材を集めて料理**し、探索中の回復・強化に使う。「素材を集める → 加工する → 強くなる」の経済ループが探索の動機になる。

---

## 2. アイテム全体像

アイテムは用途で分類する。所持上限の概念があり、種別ごとに枠が分かれる。

| 種別 | 例 | 備考 |
| --- | --- | --- |
| 消費アイテム | 回復薬・解毒薬・帰還アイテム・ゲージ操作アイテム | 戦闘/探索で使用 |
| 採集アイテム（素材） | 鉱石・薬草・木材 | 売却・装備生産の材料 |
| ドロップアイテム | 敵素材 | 通常/条件ドロップ。装備生産の材料 |
| 食材 | 魚・肉・木の実・卵 | **アイテムとは別枠で最大60個**。売却不可 |
| 料理 | 食材を加工した強化/回復品 | 探索時のみ使用可。売却不可 |
| 装備品 | 武器・防具・アクセサリ | 後述 |
| 貴重品 | 鍵・イベント品 | 売却不可 |

```ts
interface ItemMaster {
  id: string;
  name: string;
  category: ItemCategory;
  sellable: boolean;
  stackLimit: number;
  useContext?: ('battle' | 'field')[]; // 使用可能な場面
  effect?: ItemEffectDef;
}
interface ItemStack { itemId: string; count: number; }
```

> **所持枠の分離**: 食材は通常アイテムと別カウント（上限60）。整理系の種族スキルで上限を拡張できる設計も可（[05](./05-progression-meta.md) の引き継ぎ注意点参照）。

---

## 3. 装備

### 3.1 仕様

- スロット: **武器 / 防具（複数部位でも単一でも可）/ アクセサリ**。
- 装備適性は **職業** が規定（[01](./01-character-system.md)）。転職で装備可能種別が変わる。
- 装備はステータス（ATK/MAT/DEF/MDFなど）を加算し、追加効果（属性耐性・状態異常耐性・スキル付与など）を持つことがある。
- **唯一品**: 入手機会の限られた特別装備。最初から固有能力が解放されている代わりに **鍛冶（強化）ができない**。

```ts
type WeaponType = 'sword' | 'spear' | 'fist' | 'gun' | 'staff' | string;
type ArmorType = 'heavy' | 'light' | 'cloth' | string;

interface EquipmentMaster {
  id: string;
  name: string;
  slot: 'weapon' | 'armor' | 'accessory';
  weaponType?: WeaponType;
  armorType?: ArmorType;
  baseStats: Partial<Stats>;      // ATK/MAT/DEF...
  effects: EquipmentEffect[];     // 耐性・付与スキル等
  hiddenEffects?: EquipmentEffect[]; // 鍛冶で開花する隠し能力（唯一品は最初から解放）
  isUnique: boolean;              // true は鍛冶不可
  forgeableMaterialIds?: string[]; // 鍛冶に使える専用素材
}

interface EquipmentSlots {
  weapon: EquipInstance | null;
  armor: EquipInstance | null;
  accessory: EquipInstance | null;
}
interface EquipInstance { masterId: string; forgeLevel: number; } // 鍛冶+N
```

---

## 4. 鍛冶システム（強化・リサイクル）

装備（主に武器）の性能を素材で底上げする。

### 4.1 強化

- 武器ごとの **専用素材** または **インゴット** を使って強化値を上げる。最大 **+5** まで。
- インゴットは金/銀/銅の3種。**銅=+1、銀=+3、金=+5**。強化すると `ATK/MAT` が上昇し、表記が「武器名 +N」になる。
- 武器に **隠し能力** がある場合、鍛冶で開花する（購入時に「↑」やスキル名がグレー表示のもの）。
- 唯一品は鍛冶不可（§3）。

```ts
function forge(equip: EquipInstance, material: 'copper' | 'silver' | 'gold' | string): EquipInstance {
  const inc = material === 'gold' ? 5 : material === 'silver' ? 3 : material === 'copper' ? 1 : customInc(material);
  const next = Math.min(5, equip.forgeLevel + inc);
  // forgeLevel が一定到達で hiddenEffects を解放
  return { ...equip, forgeLevel: next };
}
```

### 4.2 リサイクル / インゴット変換

- 育て切った（または不要な）武器を **リサイクル** して「断片」に変換できる。リサイクル時にどの断片が何個出るか提示される。
- **断片が10個集まると自動でインゴットに変換**され、鍛冶素材になる。
- インゴットは図鑑登録報酬でも入手しうる。
- 装備中の武器をリサイクル指定した場合は警告（誤操作防止）。

```ts
interface ForgeInventory {
  fragments: Record<string, number>; // 断片種別 -> 個数（10でインゴット化）
  ingots: { copper: number; silver: number; gold: number };
}
```

> **設計意図**: 「次々に新装備を買う」より「1本を育てて使い続ける」方が経済的、という選択肢を作りプレイの方向性に幅を持たせる。

---

## 5. 採集（素材獲得）

- 迷宮の採集ポイントで素材を得る。基本3系統（採掘/採取/伐採）に加え、**食材系（釣り/収穫/狩猟）** を追加。
- それぞれ対応する **種族スキル**（フィッシング/樹海探索/狩猟術 等）の保持者がパーティに必要。
- さらに **飼育系スキル** 保持者がいると、樹海で捕まえた動物を街（宿屋）で育て、一定日数ごとに副産物（卵など）を得られる。育成は「預けて待つ」シンプル方式。
- 採集状況はマップアイコンに反映（[02](./02-exploration-mapping.md) §4.2）。

```ts
interface GatheringPoint {
  cell: { x: number; y: number };
  type: 'mining' | 'gathering' | 'logging' | 'fishing' | 'harvest' | 'hunting';
  requiredSkillId: string;
  dropTable: { itemId: string; weight: number }[];
  exhaustible: boolean; // その日 / その探索で枯渇するか
}
```

---

## 6. 食材・料理

### 6.1 仕様

- 迷宮内で食料を確保する。**食材・料理は探索時のみ使用可**（戦闘中は使えない）。そのため探索中の回復は、戦闘でも使える消費アイテムより食材・料理を優先するのが定石。
- 食材は **アイテムと別枠で最大60個**保持。売却不可。
- 食材はそのままでも食べられるが、迷宮内の **特定地点で調理** するとより効果の高い料理になる。
- 最初は素材を焼く程度。街の人から **レシピ** を教わると作れる料理が増える。迷宮内の特定NPCに食材を渡すと料理してもらえることも。
- 入手経路: 採集（釣り/収穫/狩猟）・飼育の副産物・イベント・クエスト報酬。

### 6.2 データモデル

```ts
interface RecipeMaster {
  id: string;
  name: string;
  ingredients: ItemStack[];   // 必要食材
  result: { itemId: string; count: number };
  unlocked: boolean;          // レシピ習得済みか
}
interface CookingSpot { cell: { x: number; y: number }; allowedRecipeIds: string[] | 'all'; }
```

> **設計意図**: 食材・料理を「探索専用リソース」にすることで、戦闘用アイテムと役割を分離し、探索中の補給計画というレイヤーを追加する。

---

## 7. ドロップ

- 通常ドロップ（撃破で確率取得）と **条件ドロップ**（特定状態異常で倒す/特定部位を封じて倒す等）を区別。
- ドロップ素材は装備生産・鍛冶・売却に使う。図鑑のドロップ収集要素にもなる。

```ts
interface DropTable {
  normal: { itemId: string; rate: number }[];
  conditional: { itemId: string; condition: DropCondition }[];
}
```

---

## 8. ショップ・経済

- 街のショップで装備・アイテムを売買。**素材を売ると新しい装備がショップに並ぶ**（探索→売却→品揃え解放）という世界樹定番の経済ループを採用。
- ショップ在庫・断片/インゴット在庫は周回引き継ぎ対象（[05](./05-progression-meta.md)）。

---

## 9. MVP優先度

| 機能 | 優先度 | 備考 |
| --- | --- | --- |
| 装備（武器/防具/アクセサリ）とステータス加算 | ★★★ | Phase 3 |
| 消費アイテム（回復・帰還） | ★★★ | Phase 1-2 |
| ショップ売買・素材で品揃え解放 | ★★ | Phase 3 |
| 採集（基本3系統） | ★★ | Phase 2-4 |
| ドロップ（通常） | ★★ | Phase 2 |
| 鍛冶（強化＋リサイクル） | ★ | Phase 4 |
| 食材・料理 | ★ | Phase 4 |
| 条件ドロップ・飼育 | ★ | Phase 4-5 |
