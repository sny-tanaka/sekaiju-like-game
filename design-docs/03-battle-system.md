# 03. バトルシステム

担当範囲: ターン制戦闘 / 隊列 / 行動順 / スキルとSP / 属性・状態異常・バフ/デバフ / ダメージ計算 / 召喚（設置）/ ユニオンスキル

参照元: 世界樹の迷宮Ⅴ「システム」より「戦闘」「召喚」「ユニオンスキル」（および強化弱体・ダメージ計算の一般仕様）

> ⚠️ **[06 無限タワー構造](./06-tower-progression.md) との連携**: 敵のステータスは固定値ではなく **出現階に応じてスケール** する（`effectiveEnemyStats(enemy, depth)`、06 §3）。10層ごとに **階層ボス**（進行ゲート、06 §4）が登場する。本書の戦闘ロジック（行動順・ダメージ計算・状態異常）はスケール後の最終ステータスに対して適用する。

---

## 1. 目的・体験

コマンド選択式のターン制バトル。**全員の行動を先に入力 → 行動順に一括解決**する「一括入力型」。隊列・属性相性・状態異常・バフ/デバフ・TP（スキル消費リソース）管理の読み合いが核。雑魚戦は効率、FOE/ボス戦は事故対応とリソース配分が問われる。

---

## 2. 戦闘の基本フロー

```
1. エンカウント発生（先制/不意打ち判定）
2. 各味方キャラのコマンドを入力（攻撃/スキル/アイテム/防御/逃走/ユニオン）
3. 全アクター（味方+敵+召喚体）を AGI 等で行動順ソート
4. 行動を順に解決（命中・ダメージ・状態異常・バフ適用）
5. ターン終了処理（毒/再生などの継続効果、バフ残ターン減算、TP自然回復など）
6. 勝敗判定 → 未決着なら 2 へ
```

```ts
interface BattleState {
  turn: number;
  allies: Combatant[];
  enemies: Combatant[];
  summons: Summon[];          // 設置物（最大3）
  unionGauge: Record<string, number>; // characterId -> 0..100
  log: BattleLogEntry[];
  rng: Rng;                   // 注入された乱数（テスト再現用）
}
```

---

## 3. 隊列（フォーメーション）

- 前衛/後衛の2列。**後衛は近接攻撃の被ダメージが減るが、自分の近接攻撃威力も下がる**（射程の概念）。遠隔・魔法は列の影響を受けにくい。
- 召喚体は **前衛より前の「最前列」** に置かれ、攻撃を引き受ける壁にもなる（§7）。

```ts
type Row = 'front' | 'back';
interface Combatant {
  charId: string;
  row: Row;
  hp: number; maxHp: number;
  tp: number; maxTp: number;  // スキル消費リソース
  stats: Stats;               // 装備・成長込みの最終素ステータス
  buffs: ActiveBuff[];
  ailments: ActiveAilment[];
  isDown: boolean;            // 戦闘不能
}
```

---

## 4. ステータス（Stats）

**正準定義は [05 §0.1](./05-progression-meta.md) の `interface Stats` に確定**（`hp/tp/str/vit/agi/int/mnd/luc` の8項目）。本書の表記揺れ（WIS/TEC 等）は廃し、以下に統一する。

| キー | 意味 | 主な影響 |
| --- | --- | --- |
| `hp` | 体力 | 0で戦闘不能 |
| `tp` | 技ポイント | スキル発動の消費リソース |
| `str` | 腕力 | 物理攻撃力 `patk` の素 |
| `vit` | 頑健 | 物理防御 `pdef` の素 |
| `agi` | 敏捷 | 行動順・命中・回避 |
| `int` | 知力 | 魔法攻撃力 `matk` の素 |
| `mnd` | 精神 | 魔法防御 `mdef` の素 |
| `luc` | 幸運 | 状態異常成否・クリティカル |

> 装備（[04](./04-items-equipment-crafting.md)）は素ステではなく **戦闘派生値 `DerivedCombat`（[05 §0.2](./05-progression-meta.md)）** に効く ATK/MAT/DEF/MDF を加算する。`Combatant.stats` は素ステ `Stats`、戦闘の攻撃/防御は `deriveCombat()` で算出した `DerivedCombat` を使う。

---

## 5. スキルとSP

- スキルは **基本ツリー / 達人ツリー / 種族ツリー / 称号ツリー** に分かれる（[01](./01-character-system.md) 参照）。SPを振って習得・レベルアップ。
- スキルは前提（先行スキルのLv条件）を持つツリー構造。
- スキル種別: 攻撃 / 補助（バフ）/ 妨害（デバフ・状態異常）/ 回復 / パッシブ / 探索 / ユニオン。

```ts
interface SkillDef {
  id: string;
  name: string;
  tree: 'base' | 'master' | 'race' | 'title';
  maxLevel: number;
  prereq?: { skillId: string; level: number }[];
  tpCost: (level: number) => number;
  element?: Element;          // [05 §0.3] 物理(斬/突/壊) or 魔法(火/氷/雷/...)
  target: TargetType;         // [05 §0.3]
  effects: SkillEffectDef[];  // 1スキルが複数効果（ダメージ＋状態異常付与 等）を持てる
}

// スキル効果は判別共用体。level を引数に取り倍率/確率/値を返す（データ駆動）
type SkillEffectDef =
  | { kind: 'damage'; power: (lv: number) => number; statBase: 'str' | 'int'; hits?: number }
  | { kind: 'heal'; amount: (lv: number) => number; basis?: 'flat' | 'maxHpRatio' }
  | { kind: 'ailment'; ailment: AilmentType; chance: (lv: number) => number; turns: number }
  | { kind: 'buff'; stat: BuffStatTarget; modifier: (lv: number) => number; turns: number }
  | { kind: 'summon'; summonKind: SummonKind }
  | { kind: 'special'; id: string }; // 個別処理にディスパッチ（逃走補助・ゲージ操作等）
```

---

## 6. 属性・状態異常・バフ/デバフ

### 6.1 属性

- 物理属性（斬撃/貫通/壊打）と魔法属性（火/氷/雷ほか）。敵ごとに耐性/弱点を持つ。弱点を突くと火力が伸び、特定スキルの追加効果（バインド等）も発生しやすくなる。

### 6.2 状態異常（Ailment）

例: 毒（毎ターンHP減）/ 麻痺（行動不能確率）/ 睡眠（行動不能、被ダメで解除）/ 混乱 / 呪い / 盲目（命中低下）/ 即死。
さらに **バインド（封じ）**: 頭・腕・脚の部位封じで、対応スキル/通常攻撃/回避を阻害。

```ts
interface ActiveAilment {
  type: AilmentType;     // [05 §0.3]
  remainingTurns: number;
  magnitude?: number;    // 毒ダメージ量など
}
```

**付与判定・数値ルール（暫定）**:
- 付与確率 = `スキル基本確率 × (1 + (attacker.luc - defender.luc) * 0.01)`、0〜0.95 にクランプ。弱点を突いた攻撃に付随する場合は ×1.2。
- **再付与**: 既に同種が付いている対象への再付与は「残ターンを `max(現在, 新規)` に更新」（延長型・重複させない）。
- **耐性蓄積（任意）**: 同一個体に同種が成功するたび成功率を ×0.8 して効きにくくする（ボスのハメ対策）。MVP では未実装でも可。
- 主要異常の効果（暫定）: 毒=毎ターン `magnitude` のHP減（行動後）/ 麻痺=各行動 30% で行動不能 / 睡眠=行動不能・被ダメで解除 / 盲目=命中 −50% / バインド=対応部位のスキル・通常攻撃・回避を封じる（脚封じ=回避ほぼ0・逃走不可 等）。

### 6.3 バフ/デバフ（強化/弱体）

`patk/pdef/matk/mdef/acc/eva/elementResist`（[05 §0.3](./05-progression-meta.md) `BuffStatTarget`）への倍率補正。**残りターン制**。

```ts
interface ActiveBuff {
  stat: BuffStatTarget; modifier: number; remainingTurns: number; stackGroup: string;
}
```

**重複・上書きルール（確定）**:
- **同じ `stackGroup` 内は共存不可＝強い方（`|modifier|` 最大）を1つだけ保持**。再付与で残ターンはリフレッシュ（上書き）。
- `stackGroup` の例: `'atkBuff'`（攻撃強化系）/ `'defBuff'` / `'atkDebuff'` / `'defDebuff'` / `'elemResist'`。**バフ系とデバフ系は別 group なので共存**し、最終倍率は両者を乗算する。
- 倍率の上下限: 1要素あたり ±50%（0.5〜1.5）にクランプ。乗算後の最終倍率も 0.25〜2.0 にクランプ（インフレ防止）。

---

## 7. ダメージ計算

無限スケーリング下では **減算型（`base − def`）は深層で防御が無意味化**しやすいため、**除算型を採用**する（定数 `K=BALANCE.DAMAGE_DEF_K`、[06 §3.1](./06-tower-progression.md)）。式の**形は確定**、係数のみ後で調整。

```
# 1. 攻撃力・防御力（deriveCombat で算出。物理は str/atk、魔法は int/mat）
patk = str * 2 + 装備atk + バフ        # 係数2は暫定
pdef = vit * 2 + 装備def + バフ
（魔法は str→int, atk→mat, vit→mnd, def→mdf に置換）

# 2. 基礎ダメージ（スキル倍率 power(lv) を乗算）
base = atk * skillPower

# 3. 防御を除算型で反映（深層でも防御が一定割合効く）
mitigated = base * K / (K + def)        # K=100暫定。def=K でダメージ半減

# 4. 補正を乗算
属性 = 弱点1.5 / 等倍1.0 / 耐性0.5 / 無効0
隊列 = 近接×後衛なら 0.7（BACK_ROW_MELEE_MULT）
乱数 = uniform(0.95, 1.05)
dmg = mitigated * 属性 * 隊列 * 乱数

# 5. クリティカル（命中後に判定）
critRate = clamp(0.05 + (luc_atk - luc_def)*0.005, 0.02, 0.5)
命中時 rng で crit 判定 → dmg *= CRIT_MULT(1.5)

最終 = max(1, floor(dmg))   # 命中していれば最低1
```

**命中・回避（物理）**: `hitChance = clamp(baseAcc + (agi_atk - agi_def)*0.01 - 盲目0.5, 0.30, 1.0)`。魔法スキルは原則必中（属性補正のみ）にして簡潔化してよい。

**乱数消費順（固定・テスト再現）**: ①命中判定 → ②ダメージ乱数(0.95–1.05) → ③クリ判定 → ④付随状態異常付与。複数ヒット(`hits`)は各ヒットでこの順を繰り返す。

```ts
function deriveCombat(stats: Stats, equip: EquipBonuses, buffs: ActiveBuff[]): DerivedCombat;
function computeDamage(attacker: Combatant, defender: Combatant, skill: SkillDef,
                       effect: Extract<SkillEffectDef,{kind:'damage'}>, level: number, rng: Rng): DamageResult;
interface DamageResult { damage: number; hit: boolean; critical: boolean; ailmentApplied?: AilmentType; }
```

> 係数（`str*2`・`K=100`・各倍率）は [06 §3.1 `BALANCE`](./06-tower-progression.md) に集約した **暫定値**。元ゲームの[ダメージ計算](https://w.atwiki.jp/sekaiju_mazev/pages/112.html)も参考に、**まずこの式で動かし `vitest` で固定→プレイテストで係数調整**する。

---

## 8. 召喚（設置）

一部の職業は、パーティメンバーとは **別枠** で召喚体／設置物を場に出せる。

### 8.1 仕様

- 召喚枠は **混合で同時最大3体**。
- 召喚位置は **前衛より前の最前列扱い**（盾役・攻撃役）。
- 種類で性質が異なる（例）:
  - 戦闘中のみ設置でき戦闘終了で消えるタイプ（攻撃/防御設置物）。複数設置可。
  - **探索中も召喚でき戦闘をまたいで残るタイプ**（使い魔・死霊など）。1体制限のものもある。
- 召喚体は味方のバフ/デバフ対象に **できるが効果を受けない**ものがある（設計でフラグ管理）。

```ts
interface Summon {
  id: string;
  ownerId: string;          // 召喚主
  kind: SummonKind;
  hp?: number;              // 耐久を持つ設置物
  persistsAfterBattle: boolean;
  persistsOutOfDungeon?: boolean;
  actsOnTurn: boolean;      // 自律行動するか
  buffImmune: boolean;      // 強化弱体が効かない個体か
}
```

> **MVP 実装メモ（Phase 4-4b・実装済み）**: 召喚を実装。
> - 召喚体は `Combatant`（`isSummon:true` / `summonKind` / `ownerId`）として `BattleState.summons` に持ち、最前列の壁/攻撃役。同時最大3体。**味方の全滅判定には数えない**（パーティ全滅＝lose）。
> - 行動: `actsOnTurn` の個体は毎ターン生存敵を1体自律攻撃（属性は `SummonMaster.attackElement`）。壁専用個体（石像）は攻撃しない。敵AIは召喚体も攻撃対象に含める（壁機能）。`buffImmune` の個体は強化弱体・状態異常を受けない。
> - 種別マスターは `data/summons.ts`（`SUMMONS`）。スキル効果 `{kind:'summon', summonKind}` で `BATTLE_SKILLS` から召喚（狩人=狼 / 守護兵=石像 / 魔導士=使い魔）。
> - 持ち越し: `persistsAfterBattle` の個体は勝利/逃走後に `diveState.persistentSummons`（`{summonKind, ownerId, hp}`）へ保存し次戦闘で復元。**拠点帰還で diveState ごと消える**（`persistsOutOfDungeon` は MVP 未使用）。

---

## 9. ユニオンスキル（必殺技）

種族固有の切り札。**ユニオンゲージ**を消費して発動する。

### 9.1 仕様

- 習得には **種族スキルツリーへのSP割り振り**が必要。種族で使えるユニオンスキルが変わる → 編成段階の戦略要素。
- 発動条件: **発動者のゲージが100%**。スキルに設定された人数に合わせ、追加でゲージを消費する協力者を選ぶ（協力者は100%でなくてよい）。
- **ユニオンスキルは通常行動とは別に撃てる**（そのターンの行動を消費しない）→ 立て直し・とどめのダメ押しに使える。
- ゲージ増加（暫定の確定ルール）: **通常攻撃 +5 / スキル使用 +10 / 被弾 +5**（行動種別で固定。乱数にしない＝再現性確保）。戦闘終了時に全員 +15。戦闘不能時は **現在値を半減**（増加量でなく保有値）。スキルレベルは増加量に無関係。一部スキルで追加上昇。
- **探索を跨ぐ保持**: ユニオンゲージは `diveState.party[].unionGauge`（[05 §4](./05-progression-meta.md)）に保存し、**戦闘間・探索中も保持**（戦闘ごとリセットしない）。拠点帰還でリセット。

```ts
interface UnionSkillDef {
  id: string;
  raceId: string;          // 種族固有
  requiredParticipants: number; // 必要人数（発動者含む）
  gaugeCostPerParticipant: number;
  effects: SkillEffectDef[];
}
function gainUnionGauge(state: BattleState, charId: string, amount: number): void;
```

> **設計意図**: ゲージ管理が戦術リソースになる。雑魚戦でゲージを溜め、FOE/ボス戦で解放する緩急が生まれる。

---

## 10. 行動順・先制・逃走

- **行動順**: 各アクターの実効 AGI 降順。**同値のタイブレークは `rng` で決定**（消費順固定）し、完全に非決定にしない。素早さ補正バフ/デバフは AGI に反映してからソート。
- **ユニオンスキルの割り込み**: ユニオンは通常行動とは別枠（§9）。発動宣言したターンの **冒頭**（通常行動順の前）に解決する。
- **先制/不意打ち（具体）**: 戦闘突入時に判定。
  - **FOE接触**: プレイヤーが背後/側面からFOEに接触＝**先制**（味方が初手に1巡先行）。FOEがプレイヤーの背後から接触＝**不意打ち**（敵が初手に1巡先行、味方は1巡行動不可）。
  - **ランダムエンカウント**: `先制率 = clamp(0.2 + (partyAvgAgi - enemyAvgAgi)*0.01, 0.05, 0.6)` で先制/通常を抽選（不意打ちは低確率）。
- **逃走**: `逃走成功率 = clamp(0.5 + (partyAvgAgi - enemyAvgAgi)*0.02, 0.1, 0.95)`。ボス・FOEは `escapable=false` を持てる（逃走不可）。

---

## 11. 報酬処理

- 勝利で経験値・所持金・ドロップアイテム獲得。条件ドロップ（特定状態異常で倒す等）に対応。
- 図鑑（[05](./05-progression-meta.md)）へ撃破記録を反映。

---

## 12. MVP優先度

| 機能 | 優先度 | 備考 |
| --- | --- | --- |
| ターン制・行動順・通常攻撃 | ★★★ | Phase 2 |
| 隊列（前衛/後衛の被ダメ補正） | ★★★ | Phase 2 |
| TP消費スキル・回復・基本バフ/デバフ | ★★★ | Phase 2-3 |
| 属性弱点・状態異常 | ★★ | Phase 2-3 |
| ダメージ計算の純関数化＋テスト | ★★★ | 全Phaseの土台 |
| ユニオンスキル | ★★ | Phase 4 |
| 召喚（設置） | ★ | Phase 4 |
| バインド（部位封じ） | ★ | Phase 4 |
