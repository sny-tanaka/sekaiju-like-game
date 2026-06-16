# Issue #41 追補: リジェネ(HoT)＋ドレイン(HP吸収) 実装設計書

> issue #41 の名称・効果不一致の**第2弾**。プロデューサー合意済み:
> - **リジェネバーム** → 「リジェネ＝継続回復(HoT)」に合わせて **regen 機構を新規実装**。
> - **吸魂 / 魂喰らい** → 「吸魂＝ドレイン」に合わせて **damage に HP吸収(drain) を追加**。
>
> 実装者（sonnet サブエージェント）は本書の式・コード断片を**そのまま**適用すること。対象はスキルのみ。
> 既存のボス受け入れシミュ（`balanceSim.test.ts`）が使う標準PTスキルは含まれないので緑のまま。

---

## 1. リジェネ（継続回復 / HoT）

### 1.1 型（`src/domain/types.ts`）

(a) `SkillEffectDef` ユニオンに追加（`revive` の隣）:

```ts
  // 継続回復（[issue #41]）。対象に regen 状態を付与し、毎ターン終了時に amount(+matk連動) を回復。
  | { kind: 'regen'; amount: (lv: number) => number; turns: number; matkCoef?: 'one' | 'all' | 'minor' }
```

(b) `CombatState` ユニオン（line 109-125、`barrier` の隣）に追加:

```ts
  | { kind: 'regen'; amount: number; remainingTurns: number };
```

### 1.2 エンジン（`src/domain/battle.ts`）

(a) `applySkillEffect` の `switch` に `case 'regen'` を追加（`heal` を参考に matk 連動。既定 coef は `minor`）:

```ts
    case 'regen': {
      const flat = effect.amount(level);
      const coef =
        effect.matkCoef === 'one'
          ? BALANCE.HEAL_MATK_COEF_ONE
          : effect.matkCoef === 'all'
            ? BALANCE.HEAL_MATK_COEF_ALL
            : BALANCE.HEAL_MATK_COEF_MINOR;
      const casterMatk = deriveCombat(actor.stats, actor.equip, actor.buffs, actor.passive).matk;
      const amount = Math.round(flat + casterMatk * coef);
      for (const target of targets) {
        if (target.isDown) continue;
        addState(target, { kind: 'regen', amount, remainingTurns: effect.turns });
      }
      state.log.push({ text: `${actor.name} は継続回復を付与した` });
      break;
    }
```

> `addState` は同 kind を置換する（リジェネ再付与で上書き＝リフレッシュ。スタックしない）。

(b) ターン終了処理（line ~1002-1028）に**リジェネ回復**を追加する。
**毒ダメージ処理ループの直後・バフ/状態の残ターン減算ループの前**に、次の回復ループを挿入する
（amount を読んでから減算したいので順序厳守）:

```ts
  // リジェネ（継続回復・[issue #41]）。毒の後、残ターン減算の前にHPを回復する。
  for (const c of [...next.allies, ...next.enemies, ...next.summons]) {
    if (c.isDown || !c.states) continue;
    for (const s of c.states) {
      if (s.kind !== 'regen') continue;
      const before = c.hp;
      c.hp = clamp(c.hp + s.amount, 0, c.maxHp);
      if (c.hp > before) next.log.push({ text: `${c.name} は ${c.hp - before} 回復した（リジェネ）` });
    }
  }
```

> 既存の状態減算ループ（`c.states = c.states.map(... remainingTurns-1).filter(...)`）はそのまま。
> これにより `turns:3` は「付与ターン終了＋以後2ターン＝計3回」回復する。

### 1.3 攻略ドキュメント生成（`strategyDocsGen.test.ts` の `effectStr`）

```ts
    case 'regen':
      return `継続回復 ${range(e.amount, max)}/ターン×${e.turns}ターン`;
```

### 1.4 戦闘UIラベル（`src/pages/battle/index.tsx` の `effectLabel`）

```ts
    case 'regen':
      return `継続回復${e.amount(lv)}`;
```

### 1.5 スキル変更（`src/data/battleSkills.ts`）

`skill_medic_regen_balm`（リジェネバーム）の `effects` を heal → regen に置換。
`target:'allyOne'`・`tpCost:(lv)=>8+lv`・最大Lv5 は据え置き。

```ts
    // 旧: effects: [{ kind: 'heal', amount: (lv) => 40 + 20 * lv }],
    effects: [{ kind: 'regen', amount: (lv) => 20 + 8 * lv, turns: 3, matkCoef: 'minor' as const }],
```

→ 1ターンあたり 28→60（+魔力×0.30）を3ターン。総回復は概ね旧バースト(60→140)と同等〜やや上で、
即時回復系（フルヒール/サルベーション/パナケイア）と差別化された持続回復になる。

### 1.6 説明文（`src/data/skills.ts`）

```ts
  skill_medic_regen_balm:
    description: '味方1人に継続回復を付与し、数ターンにわたってHPを回復させる霊薬。',
```

---

## 2. ドレイン（HP吸収）

### 2.1 型（`src/domain/types.ts`）

`damage` 効果に任意フィールド `drain` を追加:

```ts
  | { kind: 'damage'; power: (lv: number) => number; statBase: 'str' | 'int'; hits?: number; drain?: number }
```

### 2.2 エンジン（`src/domain/battle.ts` の `applySkillEffect` `case 'damage'`）

与ダメージ合計を蓄積し、`drain` 指定があれば術者のHPに吸収する。既存ループに最小限を追加:

```ts
    case 'damage': {
      const hits = effect.hits ?? 1;
      const power = effect.power(level);
      let drainTotal = 0; // ★追加
      for (const target of targets) {
        if (target.isDown) continue;
        let landed = false;
        let total = 0;
        for (let h = 0; h < hits; h++) {
          if (target.isDown) break;
          const r = strikeOnce(state, actor, target, { statBase: effect.statBase, power, element }, rng);
          if (r.hit) { landed = true; total += r.dealt; }
        }
        if (landed) triggerReactions(state, actor, target, element, total, rng);
        drainTotal += total; // ★追加
      }
      // ★追加: HP吸収
      if (effect.drain && drainTotal > 0 && !actor.isDown) {
        const before = actor.hp;
        actor.hp = clamp(actor.hp + Math.round(drainTotal * effect.drain), 0, actor.maxHp);
        if (actor.hp > before) state.log.push({ text: `${actor.name} は ${actor.hp - before} 吸収した` });
      }
      break;
    }
```

### 2.3 攻略ドキュメント生成（`effectStr` の `case 'damage'`）

吸収率の注記を末尾に追加:

```ts
    case 'damage': {
      const base = e.statBase === 'str' ? '物理' : '魔法';
      const hits = e.hits && e.hits > 1 ? `×${e.hits}ヒット` : '';
      const drain = e.drain ? `／HP吸収${Math.round(e.drain * 100)}%` : '';
      return `${base}ダメージ 威力${range(e.power, max)}${hits}${drain}`;
    }
```

### 2.4 戦闘UIラベル（`effectLabel` の `case 'damage'`）

```ts
    case 'damage':
      return `${e.statBase === 'str' ? '物理' : '魔法'}威力${Math.round(e.power(lv) * 100)}%${e.hits && e.hits > 1 ? `×${e.hits}` : ''}${e.drain ? '・吸収' : ''}`;
```

### 2.5 スキル変更（`src/data/battleSkills.ts`）

`skill_summoner_soul_drain`（吸魂）と `skill_summoner_soul_render`（魂喰らい）の damage 効果に
`drain: 0.3` を追加する。**power は据え置き**（吸魂 `1.2+0.18*lv`＝1.38→2.1、魂喰らい `2.4+0.35*lv`＝2.75→4.15）。

```ts
  // 吸魂
  effects: [{ kind: 'damage', statBase: 'int', power: (lv) => 1.2 + 0.18 * lv, drain: 0.3 }],
  // 魂喰らい
  effects: [{ kind: 'damage', statBase: 'int', power: (lv) => 2.4 + 0.35 * lv, drain: 0.3 }],
```

> ※ 実ファイルの power 式を確認し、**power 式は変えず drain だけ足す**こと（数値が本書と違えば実ファイル優先）。

### 2.6 説明文（`src/data/skills.ts`）

```ts
  skill_summoner_soul_drain:
    description: '単体に無属性魔法ダメージを与え、与ダメージの一部を自身のHPに吸収する。',
  skill_summoner_soul_render:
    description: '単体に極大の無属性魔法ダメージを与え、与ダメージの一部を自身のHPに吸収する奥義。',
```

---

## 3. 検証・テスト

1. `yarn gen:docs` で strategy-docs 再生成（リジェネ＝継続回復表記／吸魂・魂喰らいにHP吸収表記）。
2. `yarn test` / `yarn lint` / `npx tsc -b` の**3点すべて緑**（`regen` を CombatState/SkillEffectDef に足したことで
   全 `switch(kind)` がコンパイルを通ること）。落ちた既存テストは新仕様へ期待値更新。
3. 新規テスト（`src/domain/` 内、例 `regenDrain.test.ts`）:
   - regen: 生存味方に regen を付与→1ターン回す→HPが amount ぶん増える。`turns` 経過で状態が消える。戦闘不能には付与されない。
   - drain: 敵に drain 付き damage→術者HPが「与ダメージ×drain」ぶん回復（maxHp 上限）。HP満タンの術者では増えない。
4. **push しない**。完了後コミットして commit SHA を報告。

## 4. 触ってよい/いけないファイル

- 触ってよい: `src/domain/types.ts` / `src/domain/battle.ts` / `src/pages/battle/index.tsx` /
  `src/data/battleSkills.ts` / `src/data/skills.ts` / `src/data/strategyDocsGen.test.ts` /
  `strategy-docs/*.md`（gen:docs出力）/ 新規・既存テスト。
- 触ってはいけない: `combat.ts` の式・`balance.ts` 定数・`enemies.ts`・`races.ts`・
  `balanceSim.test.ts` の標準PT定義・`docs/`（ビルド出力。ディレクターが別途ビルド）。
