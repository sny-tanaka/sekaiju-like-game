// ============================================================================
// turnOrder.ts — 行動順帯の計算ロジック（純粋関数）
// battle/index.tsx の useMemo から extract して単体テスト可能にする。
// ============================================================================

import type { BattleEvent } from '@/domain/battleEvent';
import type { BattleState, Combatant } from '@/domain/types';

/**
 * anim.events[0..eventIdx) までで行動した actor の id 集合を返す。
 * actorId を持たない tick 等は完了扱いにしない。
 */
export function computeCompletedActorIds(events: BattleEvent[], eventIdx: number): Set<string> {
  const set = new Set<string>();
  for (let i = 0; i < eventIdx; i++) {
    const e = events[i];
    if ('actorId' in e && typeof e.actorId === 'string') set.add(e.actorId);
  }
  return set;
}

/**
 * anim.events[0..eventIdx) 内で死亡が確定した actor の id 集合を返す。
 * HitResult.defeated=true の targetId と TickEvent.defeated=true の targetId を収集する。
 * NormalAttackEvent.reactions / SkillEvent.reactions も再帰的に辿る。
 */
export function computeDeadActorIds(events: BattleEvent[], eventIdx: number): Set<string> {
  const set = new Set<string>();
  const visit = (e: BattleEvent) => {
    if (e.kind === 'normal-attack' || e.kind === 'skill') {
      for (const h of e.hits) {
        if (h.defeated) set.add(h.targetId);
      }
      for (const r of e.reactions) visit(r);
    } else if (e.kind === 'tick') {
      if (e.defeated) set.add(e.targetId);
    }
  };
  for (let i = 0; i < eventIdx; i++) visit(events[i]);
  return set;
}

/**
 * 行動順帯の表示用 Combatant 配列を返す。
 * - anim 再生中（animActorOrder が非 null かつ要素あり）: anim.actorOrder の id を
 *   state 上の Combatant に解決して返す（存在しない id は除外）。
 * - それ以外: turnOrderPreview をそのまま返す。
 * deadActorIds に含まれる actor は死亡済みとして結果から除外する。
 */
export function computeDisplayedTurnOrder(
  state: BattleState,
  animActorOrder: string[] | null,
  turnOrderPreview: Combatant[],
  deadActorIds: Set<string> = new Set()
): Combatant[] {
  if (animActorOrder && animActorOrder.length > 0) {
    const all = [...state.allies, ...state.enemies, ...state.summons];
    const lookup = new Map(all.map((c) => [c.id, c]));
    return animActorOrder
      .map((id) => lookup.get(id))
      .filter((c): c is Combatant => !!c && !deadActorIds.has(c.id));
  }
  if (deadActorIds.size === 0) return turnOrderPreview;
  return turnOrderPreview.filter((c) => !deadActorIds.has(c.id));
}

/**
 * 指定 actor が完了済みかどうかを返す。
 * CSS クラス turnOrderIconCompleted の付与判定に使う。
 */
export function isActorCompleted(actorId: string, completedActorIds: Set<string>): boolean {
  return completedActorIds.has(actorId);
}
