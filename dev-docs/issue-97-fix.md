# issue #97: 戦闘の不具合 修正指示書

https://github.com/sny-tanaka/sekaiju-like-game/issues/97

## 直す不具合

### 不具合 1: TP 回復行動でアニメが進まない

「TP 回復だけ」を行う行動（TP 回復アイテム使用、`TP トニック`、`瞑想` のような TP 回復系スキル等）を取ると、
そのキャラの行動アニメが終わらず先に進めなくなる。

#### 原因（特定済み）

戦闘 Fx の `useEffect` deps に `onDone` が含まれており、deps 変化で setTimeout が cleanup されて
onDone が呼ばれない構造バグ。

具体的なシナリオ:

1. `pages/battle/index.tsx` は `<ItemUseFx onDone={() => { setItemUseFxActorId(null); onFxDone(); }} />` のように
   inline closure を毎 render 渡している。
2. `useBattleLogger.ts` は `requestAnimationFrame` で `setRendering` を毎フレーム呼ぶため、
   ログ再生中は親 (battle/index.tsx) が毎フレーム再 render される。
3. 毎 render で `onDone` inline closure が新規生成される。
4. `ItemUseFx` の `useEffect` は `[visible, silent, play, onDone]` を deps に持つので、
   onDone 変化で useEffect 再走。
5. 再走時、cleanup で前回設置した `setTimeout(onDone, ANIM_MS + 50)` を `clearTimeout` する。
6. 新 effect 本体は `if (visible && !prevVisibleRef.current)` の中で setTimeout を設置するが、
   `prevVisibleRef.current` は既に `true` なので **新タイマーは設置されない**。
7. 結果として onDone は永遠に呼ばれず、`fxDoneRef` が立たず、`tryComplete` が次イベントに進めない。

HP 攻撃やスキル攻撃では DamagePop など別の Fx の `onDone` 経路（`<DamagePop onDone={onFxDone} />`）も同時発火していて、
そっち経由で `onFxDone()` が呼ばれて先に進める。**「単独の Fx の onDone だけが完了シグナル」になるケースで
だけ詰まる**：

- TP 回復アイテム（`ItemUseFx` 単独）
- TP 回復スキル / バフ / デバフ / 解除しか効果がないスキル（`SkillCastFx` 単独 + `BuffFx`/`DebuffFx`/`CleanseFx`）

なお、`onFxDone` 自体は `useCallback` で stable。問題は **Fx に渡されている inline onDone** 側。

#### 修正方針

Fx コンポーネント側で `onDone` を ref で逃がして useEffect deps から外す。

対象 5 ファイル:

- `src/components/common/effects/ItemUseFx/ItemUseFx.tsx`
- `src/components/common/effects/SkillCastFx/SkillCastFx.tsx`
- `src/components/common/effects/CleanseFx/CleanseFx.tsx`
- `src/components/common/effects/BuffFx/BuffFx.tsx`
- `src/components/common/effects/DebuffFx/DebuffFx.tsx`

全 5 ファイルが完全に同じ構造で同じバグを持っている。一括で同じ形に直すこと。

##### 各ファイルの修正パターン

```tsx
import { useEffect, useRef } from 'react';
// ... 既存 import そのまま

export const ItemUseFx = ({ visible, silent = false, inline = false, onDone, iconSrc }: ItemUseFxProps) => {
  const play = useSfx();
  const prevVisibleRef = useRef(false);

  // onDone を ref に逃がす。親が onDone を毎 render 新規生成しても useEffect が
  // 再走しないようにする（再走すると cleanup で setTimeout が消えて onDone が呼ばれなくなる）。
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (visible && !prevVisibleRef.current) {
      if (!silent) play('item');
      const t = setTimeout(() => onDoneRef.current?.(), ANIM_MS + 50);
      prevVisibleRef.current = true;
      return () => clearTimeout(t);
    }
    if (!visible) {
      prevVisibleRef.current = false;
    }
    return undefined;
  }, [visible, silent, play]); // onDone を deps から外す
```

ポイント:

- `onDone` を ref で保持し、`useEffect` の deps から `onDone` を除外する。
- setTimeout 内では `onDoneRef.current?.()` を呼ぶことで、タイマー発火時点の最新 `onDone` を呼ぶ。
- 既存の挙動（`visible` false→true エッジで SE 鳴らす、ANIM_MS + 50ms 後に onDone 呼ぶ、再エッジ立ち直しで再発火）は変えない。
- `ItemUseFx` だけ `iconSrc` を扱う構造があるので JSX 本体は触らないこと。他 4 つも JSX は変えない。

##### eslint について

`react-hooks/exhaustive-deps` ルールが `onDone` を deps に入れるよう警告する可能性がある。
警告が出たら、useEffect の直前に以下のコメントを付けて意図的に外していることを明示する:

```tsx
// onDone は ref で逃がしているので deps に含めない。
// 含めると親の毎 render での onDone 再生成で setTimeout が cleanup され、
// 単独 Fx 経路（TP 回復のようなダメージなし行動）で進行不能になる。
// eslint-disable-next-line react-hooks/exhaustive-deps
```

#### 単体テスト追加（必須）

修正後、各 Fx の `*.test.tsx` に「onDone が毎 render 新規生成されても、初回 visible 立ち上がりから
ANIM_MS + 50ms 後に onDone が 1 回呼ばれる」回帰テストを追加する。

`vi.useFakeTimers()` を使い、次のような形:

```ts
import { act, render } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { ItemUseFx } from './ItemUseFx';

describe('ItemUseFx onDone stability', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('onDone が毎 render 新規関数でも setTimeout がキャンセルされず呼ばれる', () => {
    let onDoneA = vi.fn();
    const { rerender } = render(<ItemUseFx visible silent onDone={onDoneA} />);

    // ANIM_MS の途中で、親が再 render して onDone を新しい関数に差し替える
    act(() => {
      vi.advanceTimersByTime(100);
    });
    const onDoneB = vi.fn();
    rerender(<ItemUseFx visible silent onDone={onDoneB} />);
    act(() => {
      vi.advanceTimersByTime(100);
    });
    const onDoneC = vi.fn();
    rerender(<ItemUseFx visible silent onDone={onDoneC} />);

    // ANIM_MS + 50 を超えるまで時間を進める（残り）
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // 最新の onDone（C）が 1 回呼ばれる。古い A/B は呼ばれない。
    expect(onDoneA).not.toHaveBeenCalled();
    expect(onDoneB).not.toHaveBeenCalled();
    expect(onDoneC).toHaveBeenCalledTimes(1);
  });
});
```

5 つの Fx それぞれの test ファイルに、同じパターンの it ブロックを 1 つずつ追加する。

ANIM_MS は各ファイルで違うので、コンポーネントを軽く確認して値を合わせる:

- `ItemUseFx` ANIM_MS = 600
- `SkillCastFx` ANIM_MS = 800
- `CleanseFx` ANIM_MS = 500
- `BuffFx` ANIM_MS = 400
- `DebuffFx` ANIM_MS = 400

各 Fx の既存テストはそのまま保持すること（破壊しない）。

---

### 不具合 2: 戦闘ログで敵のスキルが英字キーになっている

敵がスキルを使うと、戦闘ログに `〇〇は ea_double_strike を放った！` のように英字 ID がそのまま出る。
味方スキルは日本語が正しく出る。

#### 原因

`src/domain/battleLogFormat.ts` の `resolveSkillName` が `SKILLS` マスタ（味方用）のみを引いている。
敵スキルは `src/data/enemySkills.ts` の `ENEMY_KITS`（雑魚・FOE）と
`src/data/enemies.ts` の各 `<bossName>Actions`（ボス専用）に分散している。

#### 修正方針

`battleLogFormat.ts` 内に「敵スキル ID → 名前」の遅延初期化 Map を作って、
`resolveSkillName` のフォールバックとして使う。

##### 実装案

```ts
// battleLogFormat.ts 先頭の import に追加
import { ENEMIES } from '@/data/enemies';
import { ENEMY_KITS } from '@/data/enemySkills';

// 既存の resolveSkillName を以下に差し替える。

// 敵スキル ID → 名前の lookup（モジュール 1 回だけ構築）
let enemySkillNameMapCache: Map<string, string> | null = null;
const getEnemySkillNameMap = (): Map<string, string> => {
  if (enemySkillNameMapCache) return enemySkillNameMapCache;
  const m = new Map<string, string>();
  // 雑魚・FOE 向け kit
  for (const actions of Object.values(ENEMY_KITS)) {
    for (const a of actions) m.set(a.id, a.name);
  }
  // ボス専用 actions（ENEMIES[].actions が定義されている敵のみ）
  for (const enemy of Object.values(ENEMIES)) {
    const actions = (enemy as { actions?: Array<{ id: string; name: string }> }).actions;
    if (!actions) continue;
    for (const a of actions) m.set(a.id, a.name);
  }
  enemySkillNameMapCache = m;
  return m;
};

/** SKILLS マスタ → 敵スキルマスタの順で名前を引く。両方未定義なら skillId をそのまま返す。 */
const resolveSkillName = (skillId: string): string => {
  const fromAlly = (SKILLS as Record<string, { name: string } | undefined>)[skillId]?.name;
  if (fromAlly) return fromAlly;
  const fromEnemy = getEnemySkillNameMap().get(skillId);
  if (fromEnemy) return fromEnemy;
  return skillId;
};
```

ポイント:

- `ENEMIES` の型に `actions` が optional として入っているはず（EnemyMaster 型）。
  もし型が合わなければ、`(enemy as { actions?: ... })` で軽くキャストする（または `EnemyMaster` 型を import して使う）。
- Map はモジュールロード時に構築せず、最初の `resolveSkillName` 呼び出し時に lazy 初期化する。
  vitest の test isolation で問題を起こしにくくする。
- 既存挙動: 「未定義なら skillId をそのまま返す」フォールバックは維持。

#### 単体テスト追加（必須）

`src/domain/battleLogFormat.test.ts` に以下のテストを追加:

1. 敵スキル `ea_double_strike` の skill event を `fmt` した結果の `pre` が
   `〇〇は二連撃を放った！` のように **日本語名** を含むこと。
2. ボス専用スキル（例: `eb_gk_sig` "大地割り"）の skill event を `fmt` した結果の `pre` が
   `〇〇は大地割りを放った！` を含むこと。
3. 未定義スキル ID（例: `'totally_unknown_skill'`）で `fmt` した場合は、フォールバックで
   ID 文字列がそのまま `pre` に含まれること（既存挙動の維持確認）。

state には test 用の最小限の敵 actor を入れる。既存のテストヘルパー（`mockBattle` 等）を参考に、
1 体の敵 actor を含んだ state を作って fmt に渡す。

---

## 触ってよいファイル

### 修正（コード）

- `src/components/common/effects/ItemUseFx/ItemUseFx.tsx`
- `src/components/common/effects/SkillCastFx/SkillCastFx.tsx`
- `src/components/common/effects/CleanseFx/CleanseFx.tsx`
- `src/components/common/effects/BuffFx/BuffFx.tsx`
- `src/components/common/effects/DebuffFx/DebuffFx.tsx`
- `src/domain/battleLogFormat.ts`

### 修正（テスト）

- `src/components/common/effects/ItemUseFx/ItemUseFx.test.tsx`
- `src/components/common/effects/SkillCastFx/SkillCastFx.test.tsx`
- `src/components/common/effects/CleanseFx/CleanseFx.test.tsx`
- `src/components/common/effects/BuffFx/BuffFx.test.tsx`
- `src/components/common/effects/DebuffFx/DebuffFx.test.tsx`
- `src/domain/battleLogFormat.test.ts`

## 触ってはいけないファイル

- `src/pages/battle/index.tsx`（onFxDone は stable のため触らない。Fx 側で吸収する。）
- `src/hooks/useBattleLogger.ts`（毎フレーム再 render は本質的な仕様、触らない。）
- `src/domain/battle.ts`（skill event の組み立て直書きは今回触らない。）
- `src/data/enemies.ts`, `src/data/enemySkills.ts`（マスタ読み込みのみ。マスタ自体を直さない。）
- 上記以外のすべて

並列タスクではないので worktree 不要。**自分で Edit/Write/Bash を使って実装すること。
さらにサブエージェント（Agent/Task）を spawn しないこと。**

## 検証ゲート

完了前に必ず全部緑にする:

```bash
yarn lint
yarn test
yarn tsc -b
```

その上で、コミットして commit SHA を報告。push はしない（ディレクターが build 後にやる）。

## コミットメッセージ案

```
fix(battle): 単独 Fx で onDone が再 render に殺されて行動が進まないのを修正

ItemUseFx / SkillCastFx / BuffFx / DebuffFx / CleanseFx の useEffect deps に
onDone を含めていたため、useBattleLogger の rAF 駆動で親が毎フレーム再 render
されると inline onDone closure が新規生成 → effect 再走 → cleanup で setTimeout
がキャンセル → 新タイマーは prevVisibleRef ガードで再設置されず onDone が永遠に
呼ばれない、という構造バグがあった。

TP 回復アイテム / TP トニックのような単独 Fx 経路（HP/状態変化を伴わず、Fx の
onDone 単独が完了シグナルになるケース）で行動が永久に進まなくなる症状の根因。
HP 攻撃やスキル攻撃は DamagePop 等の別 Fx の onDone も併走するので表面化しなかった。

5 つ全 Fx の onDone を ref に逃がして useEffect deps から外す。回帰テストで
「onDone を毎 render 新規生成しても ANIM_MS+50ms 後に最新 onDone が 1 回呼ばれる」
ことを assert する。

同時に、戦闘ログで敵スキル ID が英字キーで表示される不具合も修正。
battleLogFormat.resolveSkillName のフォールバックに ENEMY_KITS と
ENEMIES.actions（ボス専用）を加え、敵スキル ID から日本語名を引けるようにする。

closes #97
```

---

## 受け入れ条件チェックリスト

- [ ] 5 つの Fx で `useEffect` deps から `onDone` を外し、ref 経由で呼ぶように変更
- [ ] 5 つの Fx のテストに「onDone 再生成耐性」回帰テストを追加
- [ ] `battleLogFormat.ts` の `resolveSkillName` に敵スキル lookup フォールバックを追加
- [ ] `battleLogFormat.test.ts` に敵スキル名解決テストを 3 件追加（雑魚・ボス・未定義）
- [ ] `yarn lint` 緑
- [ ] `yarn test` 緑（既存テスト破壊なし + 新規 8 件 pass）
- [ ] `yarn tsc -b` 緑
- [ ] 1 コミットでまとめて commit SHA を報告
