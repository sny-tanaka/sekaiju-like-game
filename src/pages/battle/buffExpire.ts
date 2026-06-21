// ============================================================================
// buffExpire.ts — バフ切れイベントの判定ユーティリティ（pure 関数）
//
// 防御コマンド（guard）由来のバフ（pdef/mdef）が切れた場合は BuffFx 演出を発火しない。
// 攻撃力UP等その他のバフ切れは通常通り BuffFx を発火する。
// ============================================================================

import type { TickEvent } from '@/domain/battleEvent';

/**
 * tick buff-expire イベントが「防御バフ切れ」かどうかを判定する。
 *
 * 防御コマンド由来のバフ（pdef / mdef）の期限切れは演出なし扱いにする方針（issue #78）。
 * その他のバフ切れ（攻撃力UP等）は false を返し、呼び出し元が BuffFx を発火する。
 *
 * @param event - buff-expire effectType を持つ TickEvent
 * @returns effect が 'pdef' または 'mdef' のとき true
 */
export function isGuardBuffExpire(event: TickEvent): boolean {
  return event.effectType === 'buff-expire' && (event.effect === 'pdef' || event.effect === 'mdef');
}
