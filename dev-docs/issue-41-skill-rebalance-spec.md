# Issue #41 スキル・バランス調整＋蘇生システム 実装設計書

> 本書は issue #41（スキルのバランス調整不足）の**実装指示書**。実装者（sonnet サブエージェント）は
> 本書の数値・式・手順を**そのまま**適用すること。判断は残していない。
> 対象は**スキルのみ**（敵HP・装備・経験値・耐性等のゲーム経済は触らない）。

## 0. 背景・方針

issue #41 の指摘は次の2点。

1. **バランス崩壊**: 上位スキルの威力が下位スキル以下（＝上位を取る意味がない／劣化している）。
2. **名称と効果の不一致**: 「蘇生」系スキルが戦闘不能から復帰させず、ただのHP/TP回復になっている。
   そもそもゲーム内に**蘇生（revive）の仕組みが存在しない**。

プロデューサー合意: **蘇生システムを新規実装**し、「蘇生」系3スキルを本物の蘇生スキルにする。

戦闘モデル（`combat.ts`）と既存の受け入れシミュ（`src/domain/balanceSim.test.ts`）は据え置き。
**ボス受け入れシミュが使う標準PTのスキル**（`skill_power_slash` / `skill_triple_strike` /
`skill_fire_bolt` / `skill_heal` / `skill_mass_heal` / `skill_provoke` / `skill_shield_bash`）は
**変更しない**ので、本リバランスでボスsim（18〜22ターンCI）は緑のまま。状態異常の付与確率は
耐性システム（§15 of phase6-4）で系統別に減衰されており、現行レンジ（単体35〜75% / AoE33〜52% /
封じ40〜60%）は妥当と判断し**変更しない**。

---

## 1. 蘇生システム（新規エンジン機能）

### 1.1 型（`src/domain/types.ts`）

`SkillEffectDef` ユニオンに**新メンバを追加**する（`cleanse` の隣に）:

```ts
  // 蘇生（[issue #41]）。戦闘不能の対象を maxHp×ratio で復帰させる。対象が戦闘不能でなければ無効。
  | { kind: 'revive'; ratio: (lv: number) => number }
```

### 1.2 戦闘エンジン（`src/domain/battle.ts`）

`applySkillEffect` の `switch (effect.kind)`（`case 'cleanse'` の後、`default` の前）に追加:

```ts
    case 'revive': {
      for (const target of targets) {
        if (!target.isDown) continue; // 生存者には無効
        target.isDown = false;
        target.hp = clamp(Math.round(target.maxHp * effect.ratio(level)), 1, target.maxHp);
        state.log.push({ text: `${actor.name} は ${target.name} を蘇生した（HP+${target.hp}）` });
      }
      break;
    }
```

- `clamp` は本ファイル内で既出（流用）。
- `target` の解決は既存 `resolveTargets` の `allyOne` 経路を使う（戦闘不能の味方を id 指定で返す。
  `allyOne` は `isDown` を除外しないので変更不要）。
- 行動順は従来通りターン開始時に確定（蘇生された味方はそのターンは動かず次ターンから行動。EO 準拠）。
- 敵スキル・アイテムは revive を使わない（敵AIに revive kit を入れない）。

### 1.3 攻略ドキュメント生成（`src/data/strategyDocsGen.test.ts` の `effectStr`）

`switch (e.kind)` に追加（`pctRange` は既存ヘルパ）:

```ts
    case 'revive':
      return `蘇生（HP${pctRange(e.ratio, max)}で復帰）`;
```

### 1.4 戦闘UI ラベル（`src/pages/battle/index.tsx` の `effectLabel`）

`switch (e.kind)` に追加:

```ts
    case 'revive':
      return `蘇生(HP${Math.round(e.ratio(lv) * 100)}%)`;
```

### 1.5 戦闘UI 対象選択（`src/pages/battle/index.tsx`）

蘇生スキルは `target: 'allyOne'`。対象選択フェーズで**戦闘不能の味方のみ**を選べるようにする。

(a) モジュールスコープにヘルパを追加（`effectLabel` の近く）:

```ts
function skillIsRevive(sid: string): boolean {
  return !!BATTLE_SKILLS[sid]?.effects.some((e) => e.kind === 'revive');
}
```

(b) コンポーネント内、`isAllyTargeting` 定義の近くに:

```ts
  const reviveTargeting = allyTargetMenu !== null && skillIsRevive(allyTargetMenu);
  // 対象選択中に選べる味方（蘇生は戦闘不能のみ／その他は生存のみ）
  const allyTargetCandidates = reviveTargeting
    ? state.allies.filter((a) => a.isDown)
    : aliveAllies;
```

(c) `renderCard` の選択可否・disabled を蘇生対応に変更:

```ts
    // 旧: const isAllySelectable = isAllyTargeting && !a.isDown;
    const isAllySelectable = isAllyTargeting && (reviveTargeting ? a.isDown : !a.isDown);
```

`<button>` の `disabled`:

```ts
    // 旧: disabled={a.isDown || state.outcome !== 'ongoing' || !!anim}
    disabled={
      state.outcome !== 'ongoing' || !!anim || (a.isDown && !(isAllyTargeting && reviveTargeting))
    }
```

(d) 対象選択パネルの味方リスト（現在 `aliveAllies.map(...)` の箇所、「もどる」ボタンの直前のリスト）を
`allyTargetCandidates.map(...)` に変更する。

> これにより、蘇生スキル選択時は戦闘不能の味方カード（および下部パネルの戦闘不能者）だけがタップ可能になり、
> 戦闘不能者がいなければ「もどる」で取り消せる（ソフトロックしない）。

### 1.6 SFX（任意・推奨）

`runTurn` 後のログ反映でHP増加を検知して `play('heal')` が鳴る既存挙動に乗る場合は追加対応不要。
必要なら蘇生ログ行に対しても回復SEを鳴らす（既存の heal 判定を流用、過剰実装はしない）。

---

## 2. 「蘇生」系3スキルを蘇生に変更（`src/data/battleSkills.ts`）

3スキルとも `target` を `allyAll` → **`allyOne`** に変更し、`effects` を revive 1つに置換する。
TP コストは据え置き。最大Lvは各ツリー定義（`classes.ts`/`titles.ts`）の通り**全て3**。

| skill id | 名称 | tree | target(新) | tpCost(据え置き) | effects(新) | ratio(Lv1→3) |
| --- | --- | --- | --- | --- | --- | --- |
| `skill_medic_revive_draft` | 蘇生薬 | master | `allyOne` | `(lv)=>8+lv` | `[{ kind:'revive', ratio:(lv)=>0.2+0.1*lv }]` | 30%→50% |
| `skill_dancer_revival_dance` | 蘇生の舞 | master | `allyOne` | `(lv)=>8+lv` | `[{ kind:'revive', ratio:(lv)=>0.2+0.1*lv }]` | 30%→50% |
| `skill_medic_t_revive_light` | 蘇生の光 | title | `allyOne` | `(lv)=>10+lv` | `[{ kind:'revive', ratio:(lv)=>0.3+0.1*lv }]` | 40%→60% |

各 `element` は `almighty` のまま。元の `// §7.4 回復魔力連動 ...` コメントは削除（revive は魔力連動しない）。

### 2.1 スキル説明文（`src/data/skills.ts`）

`description` を効果に合わせて更新:

| skill id | 新 description |
| --- | --- |
| `skill_medic_revive_draft` | `戦闘不能の味方1人を復帰させる秘薬（HPの一部を回復して蘇生）。` |
| `skill_dancer_revival_dance` | `戦闘不能の味方1人を蘇らせる祈りの舞（HPの一部を回復して復帰）。` |
| `skill_medic_t_revive_light` | `戦闘不能の味方1人を癒やしの光で蘇生する聖者の奇跡（HPを大きく回復して復帰）。` |

---

## 3. バランス調整（威力の単調化・劣化解消）。`src/data/battleSkills.ts` の power/absorb/chance を編集

各スキルの `tpCost`・`tree`・`target`・最大Lv・状態異常付与率は**据え置き**。下表の関数だけ差し替える。
（「最大Lv」は参考。`power` の Lv1→最大Lv が下位＜上位になるよう設定済み。）

### 3.1 回復（薬師）

| skill id | 名称 | 旧 amount | 新 amount | 備考 |
| --- | --- | --- | --- | --- |
| `skill_medic_full_heal` | フルヒール(allyOne,最大5) | `(lv)=>20+5*lv`（25→45） | `(lv)=>30+10*lv`（40→80） | ヒール(25→45)＜フルヒール＜リジェネバーム(60→140)。`matkCoef:'one'` 据え置き |
| `skill_medic_party_cure` | パーティキュア(allyAll,最大5) | `(lv)=>10+3*lv`（13→25） | `(lv)=>18+6*lv`（24→48） | マスヒール(13→25)＜パーティキュア＜サルベーション(40→100)。`matkCoef:'all'` 据え置き |

> ヒール／マスヒール／リジェネバーム／サルベーション／パナケイア／大円舞曲／癒しの歌／救護指示は**変更しない**。

### 3.2 障壁（守護兵・降霊術士。`absorb` 関数を差し替え。`turns` 据え置き）

守護兵の障壁チェーン（ラインガード→イージスウォール→ファランクス→グレートウォール）を単調増加に。

| skill id | 名称 | 旧 absorb | 新 absorb | 備考(turns) |
| --- | --- | --- | --- | --- |
| `skill_line_guard` | ラインガード | `(lv)=>30+15*lv`（45→75） | **据え置き** | 2t |
| `skill_guardian_aegis` | イージスウォール | `(lv)=>25+12*lv`（37→61） | `(lv)=>35+15*lv`（50→80） | 3t |
| `skill_guardian_phalanx` | ファランクス | `(lv)=>30+15*lv`（45→75） | `(lv)=>38+15*lv`（53→83） | 2t |
| `skill_guardian_great_wall` | グレートウォール | `(lv)=>40+15*lv`（55→85） | `(lv)=>43+15*lv`（58→88） | 3t |
| `skill_summoner_soul_ward` | 霊障の壁 | `(lv)=>25+12*lv`（37→61） | `(lv)=>33+12*lv`（45→69） | 3t。基本「無慈悲な盾」(37→61)より上に |

> 守護兵 ラインガード・降霊術士「無慈悲な盾」(`skill_soul_barrier`)・称号系は**変更しない**。

### 3.3 反撃の構え（守護兵。`chance`/`power` を差し替え。`turns` 据え置き）

カウンターガード→リトリビューション→アイアンカウンターを発動率・威力とも単調増加に。

| skill id | 名称 | 旧 chance / power | 新 chance / power |
| --- | --- | --- | --- |
| `skill_counter_guard` | カウンターガード | `0.5+0.04*lv` / `1.1+0.1*lv`（54→62% / 1.2→1.4） | **据え置き** |
| `skill_guardian_retribution` | リトリビューション | `0.4+0.05*lv` / `1.1+0.1*lv`（45→55% / 1.2→1.4） | `0.54+0.04*lv` / `1.2+0.1*lv`（58→66% / 1.3→1.5） |
| `skill_guardian_iron_counter` | アイアンカウンター | `0.5+0.04*lv` / `1.3+0.1*lv`（54→62% / 1.4→1.6） | `0.58+0.04*lv` / `1.3+0.1*lv`（62→70% / 1.4→1.6） |

### 3.4 魔導士ランス（基本ボルトより強い単体魔法に。`power` 差し替え）

ファイア/アイス/ボルトの各ボルト（基本 1.75→2.75）より下だったランス系を**上位**へ。

| skill id | 名称 | 旧 power | 新 power | 備考 |
| --- | --- | --- | --- | --- |
| `skill_mage_fire_lance` | ファイアランス(最大5) | `(lv)=>1.5+0.2*lv`（1.7→2.5） | `(lv)=>1.75+0.25*lv`（2.0→3.0） | >ファイアボルト |
| `skill_mage_frost_lance` | フロストランス(最大5) | `(lv)=>1.5+0.2*lv`（1.7→2.5） | `(lv)=>1.75+0.25*lv`（2.0→3.0） | 麻痺(35→55%)据え置き |
| `skill_mage_volt_lance` | ボルトランス(最大5) | `(lv)=>1.5+0.2*lv`（1.7→2.5） | `(lv)=>1.75+0.25*lv`（2.0→3.0） | <サンダーボルト(2.3→3.5) |

### 3.5 上位＝下位の同値解消（劣化していた上位スキルを明確に上へ）

| skill id | 名称 | 旧 power | 新 power | 理由 |
| --- | --- | --- | --- | --- |
| `skill_warrior_armor_crush` | アーマークラッシュ(最大5) | `(lv)=>1.5+0.2*lv`（1.7→2.5） | `(lv)=>1.7+0.2*lv`（1.9→2.7） | 前提ヘビースイング(1.7→2.5)と同値だった。腕封じ(35→55%)据え置き |
| `skill_ranger_binding_volley` | 封鎖の斉射(最大3) | `(lv)=>0.85+0.13*lv`（0.98→1.24） | `(lv)=>0.92+0.16*lv`（1.08→1.40） | 前提 矢の雨(同Lvで同値)＋腕封じだったので威力を上乗せ。腕封じ(33→39%)据え置き、<空裂の斉射(1.5→2.3) |

---

## 4. ドキュメント再生成・検証ゲート（実装者が実施）

1. `yarn gen:docs` を実行し `strategy-docs/classes.md` `titles.md` を再生成（蘇生表記・新威力を反映）。
2. **検証ゲートを全て緑にする**:
   - `yarn test`（vitest）… 既存テストが落ちたら期待値を新仕様へ更新。特に `balanceSim.test.ts` は
     標準PTスキルを変えていないので**緑のはず**（落ちたら原因を調査）。
   - `yarn lint`（eslint）
   - `tsc -b`（型チェック。`revive` の追加で全 `switch(effect.kind)` がコンパイルを通ること）
3. 新規テストを追加: `src/domain/` 内のいずれか（例 `revive.test.ts`）で
   「戦闘不能の味方に revive 効果を適用→`isDown=false` かつ `hp=round(maxHp*ratio)`」「生存者には無効」を assert。
   `applySkillEffect` は export されていなければ `resolveTurn` 経由で1ターン回して検証する。
4. **push はしない**。完了後にコミットして commit SHA を報告（ビルドはディレクターが実施）。

## 5. 触ってよい/いけないファイル

- 触ってよい: `src/domain/types.ts` / `src/domain/battle.ts` / `src/pages/battle/index.tsx` /
  `src/data/battleSkills.ts` / `src/data/skills.ts` / `src/data/strategyDocsGen.test.ts` /
  `strategy-docs/classes.md` / `strategy-docs/titles.md`（gen:docs 出力）/ 新規テストファイル /
  既存テストの期待値更新。
- 触ってはいけない: `combat.ts` の式・`balance.ts` 定数・`enemies.ts`・`equipment.ts`・`races.ts`・
  `src/domain/balanceSim.test.ts` の標準PT定義・`docs/`（ビルド出力。ディレクターが別途ビルド）。
