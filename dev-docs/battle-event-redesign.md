# 戦闘実行処理のリデザイン (Event 駆動)

## 1. 背景

### 1.1 現状の構造

- `BattleState.log: BattleLogEntry[]` にテキストログを蓄積
- UI 側 (`src/pages/battle/index.tsx`) は `anim.revealed` を進めながら **log.text を正規表現マッチ** して演出を発火
  - 「は倒れた」→ `play('down')`
  - 「のスキル」「○○！」→ `play('skill')`
  - 「になった」→ `play('debuff')`
  - 「は態勢を整えた」「の構えを取った」→ `play('buff')`
  - `/ に \d+ ダメージ/` → `setHits` + HP 差で `allyHit` 判定
- ログ表示と演出発火が **同じ string にミックス** されていて分離できない

### 1.2 問題点

- ログのテキスト 1 文字でも変わると演出が壊れる (例: 「○○のスキル」を「○○がスキル」に変えたら破綻)
- 演出のために log を増やすと表示も増える、表示のために log を減らすと演出が壊れる
- ログとイベントが同じ単位で分離不能
- HP バーがダメージ Fx より遅れて減るなど、状態更新と演出のタイミングがズレる
- 「1 行動」の単位が log の行数では表現できない (前進・後退の単位と log の単位が一致しない)

### 1.3 ゴール

- **戦闘ロジックが「何が起きたか」を構造化 Event として返す**
- **UI は Event の `kind` で対応 Fx を直接マウント** (正規表現マッチ全廃)
- **ログテキストは Event から派生** (fmt 関数で中央集権、ログとイベントを完全分離)
- **「1 行動 = 1 BattleEvent」** という明示単位 (前進・Fx・後退・ログを 1 event 内で完結)
- **Fx 完了 + ログ表示完了の両方** を待ってから次の event へ進む (厳密同期)
- **ログ表示は queue で 1 メッセージ 500ms 固定** (メッセージが長くても短くても 500ms)

## 2. 新設計

### 2.1 BattleEvent 型

```ts
// src/domain/battleEvent.ts (新規ファイル)

export type Element = 'slash' | 'pierce' | 'bash' | 'fire' | 'ice' | 'volt' | 'almighty';

export type HitResult = {
  targetId: string;
  result: 'miss' | 'hit' | 'crit';
  damage: number;
  element?: Element;
  defeated: boolean;    // この hit の結果として撃破されたか
};

export type HealResult = {
  targetId: string;
  amount: number;
};

export type BuffResult = {
  targetId: string;
  effect: BuffKind;     // 'guard' | 'barrier' | 'taunt' | 'chain-ready' | 'counter-stance' | ...
  turns?: number;
};

export type DebuffResult = {
  targetId: string;
  effect: DebuffKind;   // 'poison' | 'paralyze' | 'sleep' | 'seal' | 'binds-arm' | ...
  turns?: number;
};

// ── イベント本体 ──

export type NormalAttackEvent = {
  kind: 'normal-attack';
  actorId: string;
  hits: HitResult[];                  // 連続攻撃なら複数
  reactions: BattleEvent[];           // 反応 (反撃・連携追撃 等)
};

export type SkillEvent = {
  kind: 'skill';
  actorId: string;
  skillId: string;
  unionActorIds?: string[];           // ユニオン技 (複数キャラ参加)
  targetIds: string[];
  hits: HitResult[];
  heals: HealResult[];
  buffs: BuffResult[];
  debuffs: DebuffResult[];
  reactions: BattleEvent[];
};

export type DefendEvent = {
  kind: 'defend';
  actorId: string;
};

export type FleeEvent = {
  kind: 'flee';
  actorId: string;                    // 「逃げる」を選んだキャラ (party 代表)
  success: boolean;
};

export type ItemUseEvent = {
  kind: 'item-use';
  actorId: string;
  itemId: string;
  targetId?: string;                  // 自分使用なら省略
  effect: ItemEffect;                 // { kind: 'heal', amount } | { kind: 'cure', effects } | { kind: 'tp-restore', amount } | ...
};

export type TickEvent = {
  // ターン経過で自動発生 (毒/再生/効果切れ等)
  // actorId 無し → UI は前進せず target カードに直接 Fx
  kind: 'tick';
  targetId: string;
  effectType: 'poison' | 'regen' | 'buff-expire' | 'debuff-expire';
  amount?: number;                    // poison/regen の場合
  effect?: BuffKind | DebuffKind;     // expire の場合、どの効果が切れたか
  defeated?: boolean;                 // poison で撃破されたか
};

export type SummonEvent = {
  kind: 'summon-appear' | 'summon-dispel';
  summonerId?: string;                // appear のみ
  summonId: string;
  summonName?: string;                // 表示用
};

export type BattleEvent =
  | NormalAttackEvent
  | SkillEvent
  | DefendEvent
  | FleeEvent
  | ItemUseEvent
  | TickEvent
  | SummonEvent;
```

### 2.2 BattleState の改修

```ts
// src/domain/types.ts

type BattleState = {
  allies: Combatant[];
  enemies: Combatant[];
  summons: Combatant[];
  // ...

  events: BattleEvent[];              // 旧 log: BattleLogEntry[] を完全廃止
  outcome: 'ongoing' | 'win' | 'lose' | 'fled';
  turn: number;
  // ...
};
```

`BattleLogEntry` は **削除**。`actorIds` (旧 anim.actorIds) も削除 — 各 event が `actorId` を持つので不要。

### 2.3 useBattleLogger

```ts
// src/hooks/useBattleLogger.ts (新規)

const MESSAGE_DURATION_MS = 500;

type LogMessage = { id: string; text: string };

export const useBattleLogger = () => {
  const [queue, setQueue] = useState<LogMessage[]>([]);
  const [rendering, setRendering] = useState<{ msg: LogMessage; progress: number } | null>(null);
  const [displayed, setDisplayed] = useState<LogMessage[]>([]);

  const append = useCallback((text: string) => {
    setQueue(q => [...q, { id: nanoid(), text }]);
  }, []);

  const reset = useCallback(() => {
    setQueue([]); setRendering(null); setDisplayed([]);
  }, []);

  // queue から 1 つ pop → 500ms かけて progress 0→1 → displayed
  useEffect(() => {
    if (rendering || queue.length === 0) return;
    const [next, ...rest] = queue;
    setQueue(rest);
    setRendering({ msg: next, progress: 0 });
    const startedAt = performance.now();
    let raf: number;
    const tick = () => {
      const elapsed = performance.now() - startedAt;
      const progress = Math.min(elapsed / MESSAGE_DURATION_MS, 1);
      setRendering(r => r ? { ...r, progress } : null);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else {
        setDisplayed(d => [...d, next]);
        setRendering(null);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [queue, rendering]);

  return {
    append,
    reset,
    displayed,
    rendering,
    isIdle: queue.length === 0 && !rendering,
  };
};
```

ログ表示 UI:

```tsx
{logger.displayed.map(m => <div key={m.id}>{m.text}</div>)}
{logger.rendering && (
  <div>
    {logger.rendering.msg.text.slice(
      0,
      Math.floor(logger.rendering.msg.text.length * logger.rendering.progress)
    )}
  </div>
)}
```

**文字単位ではなく `text.length * progress`** で「メッセージが長くても短くても 500ms で完結」を担保。

### 2.4 fmt (event → log text 派生)

```ts
// src/domain/battleLogFormat.ts (新規)

type FmtResult = {
  pre: string;             // 前進開始時に append
  post: string[];          // Fx マウント時に順次 append (複数可)
};

const name = (id: string, state: BattleState): string => { /* 全 combatants から name 取得 */ };
const skillName = (skillId: string): string => { /* マスタから取得 */ };
const itemName = (itemId: string): string => { /* マスタから取得 */ };
const buffLabel = (kind: BuffKind): string => { /* '構え' '障壁' '挑発' '連携の構え' 等 */ };
const debuffLabel = (kind: DebuffKind): string => { /* '毒' '麻痺' '睡眠' '封じ' 等 */ };

const formatHits = (hits: HitResult[], state: BattleState): string[] =>
  hits.flatMap(h => {
    const lines: string[] = [];
    if (h.result === 'miss') lines.push(`${name(h.targetId, state)}は攻撃をかわした！`);
    else {
      if (h.result === 'crit') lines.push('クリティカル！');
      lines.push(`${name(h.targetId, state)}に${h.damage}のダメージ！`);
    }
    if (h.defeated) lines.push(`${name(h.targetId, state)}は倒れた！`);
    return lines;
  });

export const fmt = (event: BattleEvent, state: BattleState): FmtResult => {
  switch (event.kind) {
    case 'normal-attack':
      return {
        pre: `${name(event.actorId, state)}の攻撃！`,
        post: formatHits(event.hits, state),
      };
    case 'skill':
      return {
        pre: event.unionActorIds
          ? `ユニオン！ ${skillName(event.skillId)}！`
          : `${name(event.actorId, state)}は${skillName(event.skillId)}を放った！`,
        post: [
          ...formatHits(event.hits, state),
          ...event.heals.map(h => `${name(h.targetId, state)}のHPが${h.amount}回復！`),
          ...event.buffs.map(b => `${name(b.targetId, state)}に${buffLabel(b.effect)}が付与された！`),
          ...event.debuffs.map(d => `${name(d.targetId, state)}は${debuffLabel(d.effect)}になった！`),
        ],
      };
    case 'defend':
      return { pre: `${name(event.actorId, state)}は構えを取った！`, post: [] };
    case 'flee':
      return {
        pre: event.success ? 'うまく逃げ切れた！' : `${name(event.actorId, state)}は逃げ出そうとしたが失敗した！`,
        post: [],
      };
    case 'item-use': {
      const pre = `${name(event.actorId, state)}は${itemName(event.itemId)}を使った！`;
      const target = name(event.targetId ?? event.actorId, state);
      let post: string[] = [];
      if (event.effect.kind === 'heal')
        post = [`${target}のHPが${event.effect.amount}回復！`];
      else if (event.effect.kind === 'cure')
        post = event.effect.cureEffects.map(e => `${target}の${debuffLabel(e)}が解けた！`);
      else if (event.effect.kind === 'tp-restore')
        post = [`${target}のTPが${event.effect.amount}回復！`];
      return { pre, post };
    }
    case 'tick': {
      const target = name(event.targetId, state);
      const lines: string[] = [];
      if (event.effectType === 'poison') lines.push(`${target}は毒のダメージを受けた！(${event.amount})`);
      else if (event.effectType === 'regen') lines.push(`${target}のHPが${event.amount}回復！`);
      else if (event.effectType === 'buff-expire') lines.push(`${target}の${buffLabel(event.effect as BuffKind)}の効果が切れた！`);
      else if (event.effectType === 'debuff-expire') lines.push(`${target}の${debuffLabel(event.effect as DebuffKind)}が解けた！`);
      if (event.defeated) lines.push(`${target}は倒れた！`);
      return { pre: '', post: lines };
    }
    case 'summon-appear':
      return { pre: `${event.summonName ?? '召喚体'}が現れた！`, post: [] };
    case 'summon-dispel':
      return { pre: `${event.summonName ?? '召喚体'}は消えた！`, post: [] };
  }
};
```

### 2.5 UI 側の event 処理 (battle/index.tsx)

#### anim 構造の改修

```ts
type Anim = {
  events: BattleEvent[];     // flatten 済み (reactions は親 event の直後に並べる)
  eventIdx: number;
  baseSnapshot: Snapshot;    // ターン開始時の HP/状態 (HP バーの初期値用)
};

const [anim, setAnim] = useState<Anim | null>(null);
const [advancingActorId, setAdvancingActorId] = useState<string | null>(null);
const [hits, setHits] = useState<Map<string, HitFxData>>(new Map());
const [buffFxMap, setBuffFxMap] = useState<Map<string, number>>(new Map());
const [debuffFxMap, setDebuffFxMap] = useState<Map<string, number>>(new Map());
const [castingActorId, setCastingActorId] = useState<string | null>(null);

const fxDoneRef = useRef(false);
const loggerDoneRef = useRef(false);
const actionCompletedRef = useRef(false);
```

#### reaction の flatten

```ts
// runTurn 後、reactions を flatten して events[] に展開
const flattenEvents = (events: BattleEvent[]): BattleEvent[] =>
  events.flatMap(e => {
    if ('reactions' in e && e.reactions.length > 0) {
      const { reactions, ...rest } = e;
      return [{ ...rest, reactions: [] as BattleEvent[] }, ...flattenEvents(reactions)];
    }
    return [e];
  });

// runTurn の return 後:
const flatEvents = flattenEvents(newState.events.slice(prevEventCount));
setAnim({ events: flatEvents, eventIdx: 0, baseSnapshot: prevSnapshot });
```

#### event 再生 useEffect

```ts
useEffect(() => {
  if (!anim) return;
  if (anim.eventIdx >= anim.events.length) {
    // 全 event 終了
    setAnim(null);
    setHits(new Map()); setBuffFxMap(new Map()); setDebuffFxMap(new Map());
    setAdvancingActorId(null); setCastingActorId(null);
    return;
  }

  const event = anim.events[anim.eventIdx];

  // フラグ reset (新 event 開始)
  fxDoneRef.current = false;
  loggerDoneRef.current = logger.isIdle;
  actionCompletedRef.current = false;

  // Step 0: 前進開始 (tick は actor 無しでスキップ)
  if ('actorId' in event) {
    setAdvancingActorId(event.actorId);
  }

  // Step 0: pre メッセージ
  const { pre, post } = fmt(event, state);
  if (pre) logger.append(pre);

  // Step 1: 前進完了 (200ms) 後に Fx マウント + post メッセージ
  const ADVANCE_DURATION = 200;
  const tFx = setTimeout(() => {
    post.forEach(msg => logger.append(msg));
    mountFxFor(event);  // 後述
    
    // Fx が出ない event は fxDone をフォールバック発火
    if (!eventHasFx(event)) {
      setTimeout(() => { fxDoneRef.current = true; tryComplete(); }, 400);
    }
  }, ADVANCE_DURATION);

  return () => clearTimeout(tFx);
}, [anim?.eventIdx]);

// Logger 完了監視
useEffect(() => {
  loggerDoneRef.current = logger.isIdle;
  if (logger.isIdle) tryComplete();
}, [logger.isIdle]);

// 完了判定
const tryComplete = () => {
  if (!fxDoneRef.current || !loggerDoneRef.current) return;
  if (actionCompletedRef.current) return;
  actionCompletedRef.current = true;
  setAdvancingActorId(null);
  setCastingActorId(null);
  setTimeout(() => {
    setAnim(prev => prev ? { ...prev, eventIdx: prev.eventIdx + 1 } : null);
  }, 200);  // 後退完了を待つ
};

// 各 Fx の onDone callback
const onFxDone = () => {
  fxDoneRef.current = true;
  tryComplete();
};
```

#### Fx マウント (mountFxFor)

```ts
const mountFxFor = (event: BattleEvent) => {
  switch (event.kind) {
    case 'normal-attack':
    case 'skill': {
      // skill の場合は cast Fx (詠唱)
      if (event.kind === 'skill') setCastingActorId(event.actorId);
      
      // hits を HitFx に
      const newHits = new Map<string, HitFxData>();
      for (const h of event.hits) {
        newHits.set(h.targetId, {
          value: h.damage,
          variant: h.result === 'crit' ? 'crit' : h.result === 'miss' ? 'miss' : 'damage',
          element: h.element,
          isCrit: h.result === 'crit',
          isAllyTarget: allyIdSet.has(h.targetId),
          defeated: h.defeated,
          seq: anim.eventIdx,
        });
      }
      setHits(newHits);
      
      if (event.kind === 'skill') {
        // heals
        for (const h of event.heals) {
          newHits.set(h.targetId, { value: h.amount, variant: 'heal', ... });
        }
        // buffs / debuffs
        for (const b of event.buffs) setBuffFxMap(prev => new Map(prev).set(b.targetId, anim.eventIdx));
        for (const d of event.debuffs) setDebuffFxMap(prev => new Map(prev).set(d.targetId, anim.eventIdx));
      }
      break;
    }
    case 'defend':
      setBuffFxMap(prev => new Map(prev).set(event.actorId, anim.eventIdx));
      break;
    case 'flee':
      if (event.success) setFleeFxVisible(true);  // DustRiseFx
      break;
    case 'item-use':
      // ItemUseFx (新規 or 流用) + 効果 Fx
      if (event.effect.kind === 'heal') {
        setHits(new Map([[event.targetId ?? event.actorId, { value: event.effect.amount, variant: 'heal', ... }]]));
      }
      break;
    case 'tick':
      // 対象 target に直接 Fx (前進せず)
      if (event.effectType === 'poison') {
        setHits(new Map([[event.targetId, { value: event.amount!, variant: 'damage', element: undefined, ... }]]));
      } else if (event.effectType === 'regen') {
        setHits(new Map([[event.targetId, { value: event.amount!, variant: 'heal', ... }]]));
      }
      // expire 系は Fx 無し (ログのみ)
      break;
    case 'summon-appear':
      setSummonFxActorId(event.summonId);  // SummonAppearFx
      break;
    case 'summon-dispel':
      // SummonDispelFx (新規) or なし
      break;
  }
};

const eventHasFx = (event: BattleEvent): boolean => {
  switch (event.kind) {
    case 'normal-attack': return event.hits.length > 0;
    case 'skill': return event.hits.length + event.heals.length + event.buffs.length + event.debuffs.length > 0;
    case 'defend': return true;       // BuffFx あり
    case 'flee': return event.success; // DustRiseFx
    case 'item-use': return true;     // ItemUseFx or HealFx
    case 'tick': return event.effectType === 'poison' || event.effectType === 'regen';
    case 'summon-appear': return true;
    case 'summon-dispel': return false;
  }
};
```

#### HP バー同期

dispMap (HP/状態異常表示) は `hits` のマウント有無で snapshot を切り替え:

```ts
const dispMap = anim
  ? (hits.size > 0
      ? snapshotAtEvent(anim.events, anim.eventIdx, anim.baseSnapshot)
      : snapshotBeforeEvent(anim.events, anim.eventIdx, anim.baseSnapshot))
  : null;
```

snapshotAtEvent: anim.events を 0..eventIdx (inclusive) まで反映した state を返す。
snapshotBeforeEvent: 0..eventIdx-1 まで反映した state。

これで「DAMAGE_AT 後は HP バーがダメージ Fx と同時に下がる」が保証される。

### 2.6 Fx ↔ event kind 対応表

| event.kind | 主体 Fx | 効果 Fx (per item) | 新規 Fx 要否 |
|---|---|---|---|
| `normal-attack` | (なし、味方側) / AttackFx (敵側、HitFx 内) | HitFx (each hit) | 不要 |
| `skill` | SkillCastFx (詠唱) | HitFx, HealFx (=HitFx variant), BuffFx, DebuffFx | **SkillCastFx 新規** (RuneSpinFx 流用) |
| `defend` | BuffFx | - | 不要 |
| `flee` (success) | DustRiseFx | - | 不要 |
| `flee` (fail) | (なし、ログのみ) | - | 不要 |
| `item-use` | ItemUseFx | HitFx (heal), CleanseFx (cure) | **ItemUseFx 新規 (or HealFx 流用), CleanseFx 新規 (or 既存 BuffFx 流用)** |
| `tick` (poison) | (なし) | HitFx (variant=damage, 緑系) | 不要 (HitFx の element に poison 系を追加) |
| `tick` (regen) | (なし) | HitFx (variant=heal) | 不要 |
| `tick` (*-expire) | (なし、ログのみ) | - | 不要 |
| `summon-appear` | SummonAppearFx | - | 既存 |
| `summon-dispel` | (なし or 新規) | - | 任意 (現状なら不要) |

### 2.7 domain/battle.ts の改造

- 各処理関数 (`strikeOnce`, `applySkillEffect`, `triggerReactions`, `resolveTurn` 等) で発生する状態変化を **BattleEvent として生成 + state.events.push** に置き換え
- `state.log.push(...)` 呼び出しを **すべて削除**
- `BattleLogEntry` 型を types.ts から削除

例 (strikeOnce):

```ts
// 旧
const dmg = computeDamage(...);
state.log.push({ text: `${attacker.name}の攻撃！`, element: attacker.element, actorId: attacker.id });
state.log.push({ text: `${target.name}に${dmg}のダメージ！`, element: attacker.element });
target.hp = Math.max(0, target.hp - dmg);
if (target.hp === 0) {
  target.isDown = true;
  state.log.push({ text: `${target.name}は倒れた！`, actorId: target.id });
}

// 新 (戻り値で hit を返す、event 構築は呼び出し側)
const dmg = computeDamage(...);
const wasDefeated = target.hp <= dmg;
target.hp = Math.max(0, target.hp - dmg);
if (wasDefeated) target.isDown = true;
return {
  targetId: target.id,
  result: isCrit ? 'crit' : 'hit',
  damage: dmg,
  element: attacker.element,
  defeated: wasDefeated,
} as HitResult;
```

`runTurn` または `executeAction` (新) が `BattleEvent` を組み立てて `state.events.push(event)`:

```ts
const event: NormalAttackEvent = {
  kind: 'normal-attack',
  actorId: attacker.id,
  hits: [strikeOnce(state, attacker, target, rng)],
  reactions: triggerReactions(state, attacker, target, rng),   // BattleEvent[]
};
state.events.push(event);
```

### 2.8 既存テストの書き換え

`battle.test.ts` 等で `state.log` を assert している箇所を `state.events` ベースに書き換え:

```ts
// 旧
expect(state.log[0].text).toContain('攻撃');
expect(state.log.some(l => /に \d+ ダメージ/.test(l.text))).toBe(true);

// 新
expect(state.events[0].kind).toBe('normal-attack');
expect(state.events[0].hits[0].damage).toBeGreaterThan(0);
expect(state.events.some(e => e.kind === 'normal-attack' && e.hits.some(h => h.defeated))).toBe(true);
```

テスト書き換えは sonnet に丸投げ可。

### 2.9 outcome / ターン構造

- `state.outcome: 'ongoing' | 'win' | 'lose' | 'fled'` は **events[] に含めない**、別フィールドとして維持
- events 再生終了後、UI が `state.outcome` を見てリザルト/敗北画面を表示 (既存ロジック維持)
- 戦闘開始時の奇襲も events[] として記録 (敵の自動行動 → 通常の `NormalAttackEvent` / `SkillEvent`)

### 2.10 ユニオン技

- `SkillEvent` の `unionActorIds: string[]` を追加 (参加者全員の id)
- UI 側: 前進は `event.actorId` (代表者) で実行、ログ pre は「ユニオン！ ○○！」、その他参加者は前進しない (代表のみ前進、他は静止)

### 2.11 反応の連鎖

`reactions[]` は再帰的にネスト可能。`flattenEvents` で平坦化して events[] に直列化 → UI は順次再生 (各 reaction は独立 actor で前進・Fx・後退)。

例: アリス攻撃 → ゴブリン反撃 → ボブ連携追撃 → ゴブリン反撃 (連鎖) の場合、flatten 後は 4 event の直列。

## 3. 移行手順 (一気書き換え)

| Step | 内容 | 並列 |
|---|---|---|
| 1 | 型定義 (`battleEvent.ts`, `types.ts` の BattleState 修正、`BattleLogEntry` 削除) | 単独 |
| 2 | domain/battle.ts の改造 + `battle.test.ts` の書き換え | 単独 (大規模) |
| 3 | `useBattleLogger` 実装 + テスト | 単独 |
| 4 | `battleLogFormat.ts` (fmt 関数) 実装 + テスト | 単独 |
| 5 | UI 側 (battle/index.tsx) の改造: anim 構造、event 再生 useEffect、Fx マウントロジック、ログ表示 | 単独 (大規模) |
| 6 | 新規 Fx (SkillCastFx, ItemUseFx 等) の作成 | 5 と並列可 |
| 7 | 検証 (yarn lint / test / tsc 全緑、Storybook 動作確認、実機確認) | ディレクター |

Step 1 → 2 → 3,4 (並列) → 5,6 (並列) → 7 の順。

## 4. 削除する code

- `src/domain/types.ts` の `BattleLogEntry` 型
- `BattleState.log` フィールド
- `src/pages/battle/index.tsx` 内の log.text 正規表現マッチ (DAMAGE_AT setTimeout 内の if/else)
- `anim.actorIds[]` (各 event が actorId を持つので不要)
- 旧ログ表示 UI (新 useBattleLogger 経由に切替)

## 5. 残課題 / 検討事項

- **SkillCastFx の duration**: 詠唱表現として 600-800ms 程度? RuneSpinFx を `visible` 制御で流用可
- **`miss` の Fx**: 「MISS」テキストポップ (DamagePop の新 variant) + AttackFx (味方の攻撃モーション) は出すが hit Fx は出さない
- **`tick (poison)` の Fx 色**: HitFx に「毒色 variant」を追加するか、専用 PoisonTickFx を作るか
- **ログ表示の最大行数 / スクロール挙動**: 既存挙動を維持
- **既存 anim.base snapshot 廃止**: snapshotBeforeEvent で代替可能
- **action 単位完了の SE**: 後退完了時に何か SE を鳴らすか (現状無し、維持)
