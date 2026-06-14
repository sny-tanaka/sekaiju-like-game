# 03. バトルシステム

担当範囲: ターン制戦闘 / 隊列 / 行動順 / スキルとSP / 属性・状態異常・バフ/デバフ / ダメージ計算 / 召喚（設置）/ ユニオンスキル

参照元: 世界樹の迷宮Ⅴ「システム」より「戦闘」「召喚」「ユニオンスキル」（および強化弱体・ダメージ計算の一般仕様）

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

| 略称 | 意味 | 主な影響 |
| --- | --- | --- |
| HP | 体力 | 0で戦闘不能 |
| TP | 技ポイント | スキル発動の消費リソース |
| STR | 腕力 | 物理攻撃力 |
| VIT | 体力/防御 | 物理被ダメ軽減 |
| AGI | 敏捷 | 行動順・命中・回避 |
| LUC | 幸運 | 状態異常成功/耐性・クリティカル |
| WIS/INT | 知力 | 魔法攻撃力 |
| TEC | 精神/魔防 | 魔法被ダメ軽減 |

> 名称・項目数は本作で確定する。MVPは HP/TP/STR/VIT/AGI/INT/MND/LUC 程度に簡略化してよい。

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
  element?: Element;          // 物理(斬/突/壊) or 属性(火/氷/雷/...)
  target: TargetType;         // 単体/列/全体/自分/味方単体...
  effect: SkillEffectDef;     // ダメージ式・付与効果など（データ駆動）
}
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
  type: AilmentType;     // poison/paralysis/sleep/.../headBind/armBind/legBind
  remainingTurns: number;
  magnitude?: number;    // 毒ダメージ量など
}
```

### 6.3 バフ/デバフ（強化/弱体）

攻撃力上昇・防御上昇・属性耐性付与・命中回避増減など。**残りターン制**で、上書き/重ね掛けの可否はルールで規定（例: 同種は強い方優先、攻撃系と防御系は別枠で共存可）。

```ts
interface ActiveBuff {
  stat: BuffStat; modifier: number; remainingTurns: number; stackGroup: string;
}
```

---

## 7. ダメージ計算

データ駆動かつテスト可能にするため、計算は純関数に集約する。一般的な式の骨子：

```
基礎 = f(攻撃側攻撃力, スキル倍率)
防御 = g(防御側防御力)
属性補正 = 弱点(>1) / 耐性(<1) / 無効(0)
隊列補正 = 近接×後衛なら減衰 等
乱数 = [0.95, 1.05] 程度の振れ
最終ダメージ = max(0, (基礎 - 防御) × 属性補正 × 隊列補正 × バフ補正 × 乱数)
クリティカル = LUC等で確率発生、倍率加算
```

```ts
function computeDamage(attacker: Combatant, defender: Combatant, skill: SkillDef, level: number, rng: Rng): DamageResult;
```

> 実バランスは [元wikiのダメージ計算ページ](https://w.atwiki.jp/sekaiju_mazev/pages/112.html) を参考に、本作独自に調整する。**まず単純な式で動かし、テストで挙動を固定してから精緻化**する方針。

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

---

## 9. ユニオンスキル（必殺技）

種族固有の切り札。**ユニオンゲージ**を消費して発動する。

### 9.1 仕様

- 習得には **種族スキルツリーへのSP割り振り**が必要。種族で使えるユニオンスキルが変わる → 編成段階の戦略要素。
- 発動条件: **発動者のゲージが100%**。スキルに設定された人数に合わせ、追加でゲージを消費する協力者を選ぶ（協力者は100%でなくてよい）。
- **ユニオンスキルは通常行動とは別に撃てる**（そのターンの行動を消費しない）→ 立て直し・とどめのダメ押しに使える。
- ゲージ増加: 行動時に +5〜15、戦闘終了時に全員 +15、戦闘不能時は半減。一部スキルで追加上昇。スキルレベルはゲージ増加量に無関係。

```ts
interface UnionSkillDef {
  id: string;
  raceId: string;          // 種族固有
  requiredParticipants: number; // 必要人数（発動者含む）
  gaugeCostPerParticipant: number;
  effect: SkillEffectDef;
}
function gainUnionGauge(state: BattleState, charId: string, amount: number): void;
```

> **設計意図**: ゲージ管理が戦術リソースになる。雑魚戦でゲージを溜め、FOE/ボス戦で解放する緩急が生まれる。

---

## 10. 行動順・先制・逃走

- 行動順は基本 AGI 順。先制/不意打ちはエンカウント条件（背後から接触したか等、§[02](./02-exploration-mapping.md)のFOE接触方向）で決定。
- 逃走は確率判定（敵とのAGI差等）。ボス・FOEは逃走不可設定を持てる。

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
