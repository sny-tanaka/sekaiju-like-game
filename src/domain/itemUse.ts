import { ITEMS, isFood } from '@/data/items';
import { returnToTown } from '@/domain/dive';
import { foodCount, itemCount, removeFood, removeItem } from '@/domain/inventory';
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
export function applyFieldItem(save: SaveData, itemId: string, charId?: string): UseResult {
  const item = ITEMS[itemId];
  if (!item) return { save, ok: false, message: 'そのアイテムは無い' };
  if (!item.useContext?.includes('field')) {
    return { save, ok: false, message: 'ここでは使えない' };
  }
  // 食材・料理は foodStorage、それ以外は倉庫から消費する（[04 §6]）。
  const food = isFood(itemId);
  const have = food ? foodCount(save, itemId) : itemCount(save, itemId);
  if (have <= 0) return { save, ok: false, message: '所持していない' };
  const consume = (s: SaveData) => (food ? removeFood(s, itemId, 1) : removeItem(s, itemId, 1));

  // 帰還の糸: 拠点へ戻る
  if (itemId === 'item_return_thread') {
    if (!save.diveState) return { save, ok: false, message: '探索中のみ使える' };
    const next = returnToTown(consume(save));
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
      // ratio 指定があれば最大TP（=stats.tp）の割合で回復。なければ固定値。
      const add = eff.ratio ? Math.round(stats.tp * eff.ratio) : eff.amount(1);
      tp = Math.min(stats.tp, tp + add);
      applied = true;
    }
  }
  if (!applied) return { save, ok: false, message: 'いま使う効果がない' };

  const party = save.diveState.party.map((p) => (p.charId === charId ? { ...p, hp, tp } : p));
  const consumed = consume({ ...save, diveState: { ...save.diveState, party } });
  return { save: consumed, ok: true, message: `${char.name} に ${item.name} を使った` };
}
