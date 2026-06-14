import { ITEMS } from '@/data/items';
import { returnToTown } from '@/domain/dive';
import { removeItem } from '@/domain/inventory';
import { computeBaseStats } from '@/domain/stats';
import type { SaveData } from '@/domain/types';

// ============================================================================
// 探索中（フィールド）のアイテム使用（[04 §2]）。
// 回復/TP回復/帰還。戦闘中のアイテム使用は別途（Phase 3 後続）。
// ============================================================================

export interface UseResult {
  save: SaveData;
  ok: boolean;
  message: string;
}

/**
 * 探索中にアイテムを使う。charId は対象の出撃メンバー（帰還アイテムは対象不要）。
 * 倉庫から1つ消費し、効果を diveState のパーティに適用する。
 */
export function useFieldItem(save: SaveData, itemId: string, charId?: string): UseResult {
  const item = ITEMS[itemId];
  if (!item) return { save, ok: false, message: 'そのアイテムは無い' };
  if (!item.useContext?.includes('field')) {
    return { save, ok: false, message: 'ここでは使えない' };
  }
  if ((save.guild.storage.find((s) => s.itemId === itemId)?.qty ?? 0) <= 0) {
    return { save, ok: false, message: '所持していない' };
  }

  // 帰還の糸: 拠点へ戻る
  if (itemId === 'item_return_thread') {
    if (!save.diveState) return { save, ok: false, message: '探索中のみ使える' };
    const next = returnToTown(removeItem(save, itemId, 1));
    return { save: next, ok: true, message: '拠点へ帰還した' };
  }

  if (!save.diveState) return { save, ok: false, message: '探索中のみ使える' };
  const member = save.diveState.party.find((p) => p.charId === charId);
  const char = save.guild.members.find((m) => m.id === charId);
  if (!member || !char) return { save, ok: false, message: '対象がいない' };

  const stats = computeBaseStats(char);
  let hp = member.hp;
  let tp = member.tp;
  let applied = false;
  for (const eff of item.effects ?? []) {
    if (eff.kind === 'heal') {
      hp = Math.min(stats.hp, hp + eff.amount(1));
      applied = true;
    } else if (eff.kind === 'restoreTp') {
      tp = Math.min(stats.tp, tp + eff.amount(1));
      applied = true;
    }
  }
  if (!applied) return { save, ok: false, message: 'いま使う効果がない' };

  const party = save.diveState.party.map((p) => (p.charId === charId ? { ...p, hp, tp } : p));
  const consumed = removeItem({ ...save, diveState: { ...save.diveState, party } }, itemId, 1);
  return { save: consumed, ok: true, message: `${char.name} に ${item.name} を使った` };
}
