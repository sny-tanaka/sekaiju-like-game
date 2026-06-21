// ============================================================================
// dispOf.ts — 戦闘員の表示用 HP/戦闘不能フラグを返す pure 関数
//
// issue #78 修正: reactions イベントには snapshotAfter が付かないため、
// reaction 再生中に dispMap が baseSnapshot（ターン開始値）を参照し、
// 倒した敵の HP が一瞬元に戻るフレームが生じる問題を解消する。
//
// deadActorIds（そのターンのイベント列で死亡確定済み actor の ID セット）に
// 含まれる actor は、dispMap の値にかかわらず HP=0/isDown=true を強制する。
// ============================================================================

import type { CombatantSnapshot } from '@/domain/battleEvent';
import type { Combatant } from '@/domain/types';

/**
 * 戦闘員 c の表示用 HP/isDown を返す。
 *
 * - anim 再生中（deadActorIds が渡される）かつ dead に含まれるとき → HP=0, isDown=true を強制
 * - dispMap に c.id のスナップショットがあればその値を使う
 * - なければ c.hp / c.isDown の実値を使う
 *
 * @param c          表示対象の戦闘員
 * @param dispMap    anim 再生中の HP スナップショット（anim 外は null）
 * @param deadActorIds  このターンの events で死亡確定した actor ID セット（anim 外は空 Set）
 */
export function applyDeadDisp(
  c: Combatant,
  dispMap: CombatantSnapshot | null,
  deadActorIds: Set<string>
): { hp: number; isDown: boolean } {
  if (dispMap !== null && deadActorIds.has(c.id)) {
    return { hp: 0, isDown: true };
  }
  return dispMap?.[c.id] ?? { hp: c.hp, isDown: c.isDown };
}
