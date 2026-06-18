# Issue #60 / #61 実装設計書

## 概要

- **Issue #60**: ダイブ中にセーブされたデータで再開した場合、拠点メニューでダイブ再開以外を無効化する。
- **Issue #61**: ドラクエ式の作戦システムを導入。戦闘UIを「全体行動選択 → 個別行動選択（めいれいキャラのみ）」の2段構成にし、キャラごとに作戦を持たせる。

---

## Issue #60: ダイブ中断データの拠点制限

### 対象ファイル
- `src/pages/town/index.tsx` — UI 修正のみ
- （テストは要件 minimal なので追加不要）

### 仕様

`diveState != null`（潜行中）のとき、拠点画面で次のように制限する:

1. **「潜行を再開」ボタン**: 既存どおり有効（ラベル: `潜行を再開`、説明: `${diveState.depth}F から再開`）。
2. **「ワープ」ボタン**: 既存どおり `disabled={!hasMembers || checkpoints.length === 0 || !!diveState}` で無効（変更なし）。
3. **「ギルド管理」「ショップ」「鍛冶屋」「図鑑 / 記録」ボタン**: いずれも `disabled={!!diveState}` を追加して無効化。description に `潜行中は使えません` を表示（既存 description は条件分岐）。
4. **「タイトルへ戻る」ボタン**: 既存どおり有効。
5. **画面上部のヒント文**: `!hasMembers` 用ヒントは既存どおり。`diveState != null` のとき、新たに次のヒントを表示する:
   `潜行中のため、ダイブ再開と「タイトルへ戻る」以外は利用できません。`

### ヒント表示の優先順位
- 団員が0人かつ潜行中の組み合わせは実質起こり得ない（diveState は出撃メンバーが必要）が、念のため `!hasMembers` を優先表示。

### 実装上の注意
- 各 MenuButton の `disabled` と `description` だけを変更し、レイアウトには触らない。
- `description` の値は `!hasMembers` チェックと潜行中チェックの両方を判定する。例:
  ```ts
  description={
    !hasMembers ? '団員が必要です'
    : diveState ? '潜行中は使えません'
    : 'もとの説明文'
  }
  ```

### 変更例（ショップの場合）

```tsx
<MenuButton
  label="ショップ"
  description={diveState ? '潜行中は使えません' : '装備・アイテム売買'}
  disabled={!!diveState}
  onClick={() => navigate({ name: 'shop' })}
/>
```

同様に「ギルド管理」「鍛冶屋」「図鑑 / 記録」も対応。

---

## Issue #61: おまかせ戦闘の導入

### 全体方針

- **作戦** は Character に永続保存（SaveData v3 → v4 へ migration）。
- 戦闘UIは「全体行動選択 → 個別行動選択 → 実行」の2段構成。
- 個別行動選択は「めいれいさせろ」のキャラだけ表示。0人ならスキップして即実行。
- 作戦変更UIは戦闘中の「さくせん」ボタンから開く。

### 作戦の型・既定値

```ts
// types.ts
export type Strategy = 'gungan' | 'batchiri' | 'inochi' | 'tpKeep' | 'meirei';

// Character に追加
export interface Character {
  // ... 既存
  strategy: Strategy; // 必須。デフォルト 'batchiri'
}
```

作戦の表示名:
- `gungan`: ガンガンいこうぜ
- `batchiri`: バッチリがんばれ
- `inochi`: いのちをだいじに
- `tpKeep`: TPつかうな
- `meirei`: めいれいさせろ

### Migration（v3 → v4）

`src/store/saveSerialization.ts` の `MIGRATIONS` に `3: migrateV3toV4` を追加。

```ts
function migrateV3toV4(old: Record<string, unknown>): Record<string, unknown> {
  const next: Record<string, unknown> = { ...old, schemaVersion: 4 };
  const guild = isObj(next.guild) ? { ...next.guild } : {};
  if (Array.isArray(guild.members)) {
    guild.members = guild.members.map((m) =>
      isObj(m) && typeof m.strategy !== 'string' ? { ...m, strategy: 'batchiri' } : m
    );
  }
  next.guild = guild;
  return next;
}
```

`src/domain/saveData.ts`:
- `CURRENT_SCHEMA_VERSION = 4`
- `createCharacter` の戻り値に `strategy: 'batchiri'` を追加

### Strategy 判定ロジック（新規 `src/domain/strategy.ts`）

戦闘1ターン分の「自動行動」を返す純関数を新設する。

```ts
import { BATTLE_SKILLS } from '@/data/battleSkills';
import { computeSkillTpCost } from '@/domain/skillCost';
import type { BattleSkillDef, BattleState, Combatant, SkillId } from '@/domain/types';

export type Strategy = 'gungan' | 'batchiri' | 'inochi' | 'tpKeep' | 'meirei';

/** UI の commands に積む値。battle/index.tsx の AllyCmd と同一構造。 */
export type AutoCmd =
  | { kind: 'attack' }
  | { kind: 'guard' }
  | { kind: 'skill'; skillId: SkillId; targetId?: string };

/** 作戦に従って actor の自動行動を1件決定する純関数。 */
export function pickAutoCommand(
  strategy: Strategy,
  actor: Combatant,
  state: BattleState,
  learnedSkills: Record<SkillId, number>
): AutoCmd;
```

詳細仕様:

#### 共通ヘルパ

- `usableSkills(actor, learnedSkills)`: `actor.tp >= computeSkillTpCost(def, lv)` かつ `BATTLE_SKILLS[sid]` にエントリがあるスキル ID 配列を返す。
- `aliveEnemies(state)`: `state.enemies.filter(e => !e.isDown)`
- `aliveAllies(state)`: `state.allies.filter(a => !a.isDown)`
- `downedAllies(state)`: `state.allies.filter(a => a.isDown)`
- `effectKinds(def)`: `def.effects.map(e => e.kind)` の Set。
- `isAttack(def)`: damage 効果を含む。
- `isHeal(def)`: heal を含み revive を含まない。
- `isRevive(def)`: revive を含む。
- `isOffensiveBuff(def)`: buff の stat が `patk/matk/acc/eva` の正modifier（>1）か、`pdef/mdef` の負modifier（<1: デバフ）。簡易化のため `buff` 効果 or `ailment` 効果を持つ全てを「補助」扱いにする。

#### ダメージ期待値の概算

```ts
function damageScore(
  def: BattleSkillDef,
  actor: Combatant,
  target: Combatant,
  level: number
): number {
  // BATTLE_SKILLS の damage 効果の power × hits × 属性倍率を合算
  // statBase に応じて patk/matk のおおまかな乗数を掛ける（簡易: actor.stats[str|int] を1.0とみなす）。
  // 命中率は無視。耐性のみ考慮（actor.resist は使わず target.resist）。
}
```

実装は以下の単純式でよい:
```
score = Σ (effect.power(level) × (effect.hits ?? 1) × elementMult(target, def.element))
       × (effect.statBase === 'str' ? actor.stats.str : actor.stats.int)
```

そのスキルのダメージ系効果のみ加算する。非ダメージ系のスキルは `damageScore = 0`。

通常攻撃のスコアは `power=1, hits=1, statBase='str', element=武器属性は無視してbash` として計算する（actor.stats.str × elementMult(target, 'bash')）。

#### `pickAutoCommand` 詳細

**`gungan` (ガンガンいこうぜ):**
1. 最初の生存敵 `tgt = aliveEnemies(state)[0]`。なければ `{ kind: 'attack' }`（後段で安全フォールバック）。
2. 候補: `usableSkills(actor, learnedSkills)` のうち damage 効果を含むスキル。
3. 通常攻撃のスコアと、各候補スキルのスコアを比較。最大スコアの選択を返す（同点ならスキル優先）。
4. enemyAll / enemyRow のスコアは「最初の生存敵への score × min(aliveEnemies.length, 3)」とする（複数体ヒットを概算）。

**`batchiri` (バッチリがんばれ):**
優先順位（上から判定し、当てはまれば即決定）:
1. 戦闘不能の味方が1人以上 かつ revive スキルが usableSkills にある → revive スキル。`targetId = downedAllies[0].id`。
2. 味方のHP%（hp/maxHp）が `0.3` 未満の味方が1人以上 → heal スキルがあれば heal。`targetId = HP%最低の生存味方`。
3. 状態異常の味方がいる かつ cleanse スキルがある → cleanse。`targetId = ailments.length>0 の生存味方[0]`。
4. 味方全員HP% ≥ 0.8 かつ actor.tp / actor.maxTp ≤ 0.25 → 通常攻撃（TP温存）。
5. それ以外 → damage スキル候補から `gungan` と同じスコア最大の damage スキル。スキルがなければ 通常攻撃。
6. damage スキルが使えるが actor.tp < cost で全部弾かれた場合は 通常攻撃にフォールバック。

**`inochi` (いのちをだいじに):**
1. 戦闘不能の味方 ≥ 1 かつ revive 使用可 → revive（`targetId = 戦闘不能味方の先頭`）。
2. 味方の最低HP%が 0.8 未満 → heal 使用可なら heal（`targetId = HP%最低の生存味方`）。
3. それ以外 → 防御（`{ kind: 'guard' }`）。
4. 回復スキルを持たない / TP不足の場合も 防御 にフォールバック。

**`tpKeep` (TPつかうな):**
1. TP消費0のスキルがあれば damage スキルから `gungan` と同じスコア最大選択。
   - TP消費0判定: `computeSkillTpCost(def, lv) === 0`。
2. なければ通常攻撃。

**`meirei`:**
- この関数は呼ばれない（UI 側でめいれいキャラは手動入力にフォールバック）。安全側に `{ kind: 'attack' }` を返してもよいが、UI で呼ばないように制御する。

### Strategy ユニットテスト（`src/domain/strategy.test.ts`）

最低限以下のケースを書く:
- gungan: 通常攻撃よりダメージスキルが強ければスキル選択。
- batchiri: 味方HP低下 → heal を選択。HP満タンかつTP低 → 通常攻撃。
- inochi: 回復スキル無し → guard。
- tpKeep: TP消費0のスキルがあれば選択。なければ通常攻撃。

Combatant の作成は `buildAlly` 相当のヘルパか、`buildSimBattleState`（`src/domain/battle.ts`）で簡易構築する。

### 戦闘画面UI（`src/pages/battle/index.tsx`）

#### 画面フェーズ

新しい state `uiMode` を追加:
```ts
type UiMode =
  | { kind: 'global' }                       // 全体行動選択（たたかう / さくせん / にげる）
  | { kind: 'individual' }                   // 個別行動選択（めいれいキャラのみ）
  | { kind: 'strategy' };                    // 作戦変更
```

初期値は `{ kind: 'global' }`。
- ターン解決後（runTurn）は `{ kind: 'global' }` にリセット。
- リザルト表示中は uiMode の表示は隠す（既存どおり outcome != 'ongoing' なら resultOverlay）。

#### 全体行動選択UI（uiMode.kind === 'global'）

`styles.command` の中身を以下に差し替える:

```tsx
<div className={styles.cmdHead}>全体行動</div>
<div className={styles.menu}>
  <button onClick={onClickFight}>たたかう</button>
  <button onClick={() => setUiMode({ kind: 'strategy' })}>さくせん</button>
  <button onClick={handleFlee}>にげる</button>
</div>
```

「対象: …（敵をタップで変更）」の表示は uiMode === 'global' でも表示してよい。

`onClickFight`:
```ts
function onClickFight() {
  // 1) すべての非めいれいキャラに自動コマンドを積む
  const autoFilled: Record<string, AllyCmd> = {};
  const autoTargets: Record<string, string> = {};
  for (const ally of aliveAllies) {
    const char = save.guild.members.find(m => m.id === ally.id);
    const strategy = char?.strategy ?? 'batchiri';
    if (strategy === 'meirei') continue;
    const auto = pickAutoCommand(strategy, ally, state, char?.learnedSkills ?? {});
    // AutoCmd → AllyCmd へ変換（targetId は autoTargets に格納）
    if (auto.kind === 'skill') {
      autoFilled[ally.id] = { kind: 'skill', skillId: auto.skillId };
      if (auto.targetId) autoTargets[ally.id] = auto.targetId;
    } else {
      autoFilled[ally.id] = auto; // attack | guard
    }
  }
  setCommands(autoFilled);
  setCommandTargets(autoTargets);

  // 2) めいれいキャラがいなければ即実行
  const meireiAllies = aliveAllies.filter(a => {
    const ch = save.guild.members.find(m => m.id === a.id);
    return (ch?.strategy ?? 'batchiri') === 'meirei';
  });
  if (meireiAllies.length === 0) {
    // 自動コマンドが入った状態で次のレンダリングを待ってから handleResolve
    // → useEffect で「全員入力済みかつ uiMode === 'individual'」を見て自動実行するか、
    //   ここで同期的に handleResolve を呼ぶ。
    // 同期実行が安全なので、自前で list を組み立てて runTurn を呼ぶ:
    const list = buildCommandList(autoFilled, autoTargets, aliveAllies, targetId);
    runTurn(list);
    return;
  }

  // 3) めいれいキャラがいる → 個別UI へ
  setUiMode({ kind: 'individual' });
  setActiveId(meireiAllies[0].id);
}
```

`buildCommandList` は `handleResolve` の中で commands/commandTargets から組んでいるロジックを切り出した純関数。

#### 個別行動選択UI（uiMode.kind === 'individual'）

既存の個別UI（コマンドメニュー）を流用するが、以下を変更:
- **「逃走」ボタンを削除**（全体に移動したため）。
- めいれいキャラのみ activeId 候補に入れる。
- 全員入力完了で `setUiMode({ kind: 'global' })` に戻し、`実行 / やり直す` を全体UI として全体メニューに表示するのではなく、個別UI 内で `実行 / やり直す` ボタンを既存どおり表示する（既存どおり）。
- 「やり直す」は commands/commandTargets をクリアして uiMode を 'global' に戻す。

具体的には、`active = aliveAllies.find(a => a.id === activeId)` の判定で、めいれい以外のキャラは除外（既存の `cmdByActor` フィルタを変更）。

シンプルにする実装:
- `meireiAllies` を `aliveAllies.filter(a => strategyOf(a) === 'meirei')` で算出。
- `activeId` の補正 useEffect で、`meireiAllies.find(a => !commands[a.id])` を次の active 候補にする（個別UI 中のみ）。
- `allAssigned` の判定も `meireiAllies.every(a => commands[a.id] && ...)` に変更（個別UI 中のみ）。
- 個別UI 中で全員入力済みになると active が null になり、既存の「実行 / やり直す」UIが出る。これを `uiMode.kind === 'individual'` ガードで表示する。

#### 作戦変更UI（uiMode.kind === 'strategy'）

```tsx
<div className={styles.cmdHead}>作戦変更</div>
<div className={styles.strategyList}>
  {aliveAllies.map(a => {
    const ch = save.guild.members.find(m => m.id === a.id);
    const cur = ch?.strategy ?? 'batchiri';
    return (
      <div key={a.id} className={styles.strategyRow}>
        <div className={styles.strategyAllyName}>{a.name}</div>
        <div className={styles.strategyButtons}>
          {STRATEGY_LIST.map(s => (
            <button
              key={s.id}
              type="button"
              className={cur === s.id ? styles.strategyOn : styles.strategyOff}
              onClick={() => changeStrategy(a.id, s.id)}
            >{s.label}</button>
          ))}
        </div>
      </div>
    );
  })}
  <button onClick={() => setUiMode({ kind: 'global' })}>もどる</button>
</div>
```

`STRATEGY_LIST`:
```ts
const STRATEGY_LIST: { id: Strategy; label: string }[] = [
  { id: 'gungan',   label: 'ガンガンいこうぜ' },
  { id: 'batchiri', label: 'バッチリがんばれ' },
  { id: 'inochi',   label: 'いのちをだいじに' },
  { id: 'tpKeep',   label: 'TPつかうな' },
  { id: 'meirei',   label: 'めいれいさせろ' },
];
```

`changeStrategy(charId, newStrategy)`:
- `applySave((s) => ({ ...s, guild: { ...s.guild, members: s.guild.members.map(m => m.id === charId ? { ...m, strategy: newStrategy } : m) } }))`
- play SFX `cursor` または `decide` で。

戻った先（uiMode = 'global'）で「たたかう」を押すと最新作戦で自動行動が決まる。

#### キャラカード内の作戦表示

`renderCard` 内、`classNameOf(a)` の表示を「職業名 / 作戦名」に変更:
```tsx
<div className={styles.cardJob}>
  {classNameOf(a)} <span className={styles.cardStrategy}>[{strategyLabelOf(a)}]</span>
</div>
```

`strategyLabelOf(a)`: `STRATEGY_LIST.find(s => s.id === (ch?.strategy ?? 'batchiri'))?.label ?? ''`。

短くするため `STRATEGY_SHORT_LABEL`:
- gungan: ガンガン
- batchiri: バッチリ
- inochi: いのち
- tpKeep: TP温存
- meirei: めいれい

カード内表示はこの短縮形を使う。

#### スタイル追加（`src/pages/battle/style.module.scss`）

```scss
.cardStrategy {
  font-size: 11px;
  color: var(--ui-text-dim, #aaa);
  margin-left: 4px;
}
.strategyList { display: flex; flex-direction: column; gap: 8px; }
.strategyRow { display: flex; flex-direction: column; gap: 4px; }
.strategyAllyName { font-weight: bold; }
.strategyButtons { display: flex; flex-wrap: wrap; gap: 4px; }
.strategyOn { background: #4caf50; color: #fff; padding: 4px 8px; border-radius: 4px; border: none; }
.strategyOff { background: #333; color: #ddd; padding: 4px 8px; border-radius: 4px; border: 1px solid #555; }
```

既存スタイル系列に揃えてカスタムしてよい（雰囲気は既存 `.menu` `.menuBtn` を参考に）。

#### 実装上の留意

- `commands` `commandTargets` 内の auto-fill 分は、ユーザが「やり直す」を押すとクリアされて 'global' に戻る（既存 `resetInput` を流用、最後に `setUiMode({ kind: 'global' })` を追加）。
- 「たたかう」を押した後、めいれいキャラがいなければ即 `runTurn` する流れで、`React.setState` の非同期性を避けるため、自動入力された commands は `runTurn` の引数 list を直接組み立てて渡す（state 更新を待たない）。
- ユニオン関連UI（`unionCmd` `unionSetup`）は個別UI（めいれいキャラのみ）でこれまで通り動作。自動キャラはユニオンを発動しない（仕様どおり）。
- 不意打ち（ambush）ターンは既存どおり敵が先手を取って `runTurn([])` する仕組みなので、味方コマンド入力UIは出ない。
- 全体UI（'global'）ではターゲット選択（敵タップでターゲット変更）も有効にしておく（自動キャラのデフォルトターゲットは AI が決めるが、めいれいキャラ用に target を選ぶ意味がある）。

### `applySave` を battle 画面で呼ぶための既存API確認

`useGameState()` には `applySave: (updater: (prev: SaveData) => SaveData) => void` が既にある。これを使って作戦変更を即時反映する。永続化は次の applyAndPersist（戦闘終了時など）で行われる。

---

## 検証ゲート

1. `yarn test` — 既存戦闘テスト + 新規 strategy.test.ts が緑。
2. `yarn lint` — eslint エラーなし。
3. `yarn build`（= `tsc -b` + `vite build`）— 型エラーなし、`docs/` 出力更新。バージョンは bump される。

---

## 実装手順（サブエージェント向け）

1. **Issue #60**: `src/pages/town/index.tsx` を編集。
2. **Issue #61 型**: `src/domain/types.ts` に `Strategy` 型と `Character.strategy: Strategy` を追加。
3. **Issue #61 初期化**: `src/domain/saveData.ts` の `createCharacter` で `strategy: 'batchiri'` を初期化。`CURRENT_SCHEMA_VERSION = 4`。
4. **Issue #61 migration**: `src/store/saveSerialization.ts` に `migrateV3toV4` を追加。
5. **Issue #61 ドメイン**: `src/domain/strategy.ts` 新規作成 + `strategy.test.ts` 新規作成。
6. **Issue #61 UI**: `src/pages/battle/index.tsx` + `src/pages/battle/style.module.scss` を編集。
7. 検証: `yarn test && yarn lint && yarn build` を回す。
8. 完了したら `git add` + `git commit`。push はしない。
9. 触ってよいファイルは上記のみ。それ以外（ルーティング、wave、storybook、他のページ等）には触らない。
