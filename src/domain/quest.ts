import { BALANCE } from '@/data/balance';
import { QUESTS, type QuestMaster } from '@/data/quests';
import { addItem, itemCount, removeItem } from '@/domain/inventory';
import type { ItemId, QuestState, SaveData } from '@/domain/types';

// ============================================================================
// 依頼（クエスト）ドメイン（v3.0.0 §7）。酒場画面が使う純関数群。
// save.questStates（QuestState[]）で受注状態・進捗を管理する。
// QuestState.progress のキー: baseKills（hunt 受注時の起点討伐数） /
// timesCompleted（repeatable の累計達成回数）。
// ============================================================================

export interface QuestBoardEntry {
  quest: QuestMaster;
  status: QuestState['status'];
  /** repeatable の累計達成回数（一回限りは常に 0）。 */
  timesCompleted: number;
}

export interface ActiveQuestEntry {
  quest: QuestMaster;
  progress: { current: number; required: number };
  complete: boolean;
}

function findState(save: SaveData, questId: string): QuestState | undefined {
  return save.questStates.find((qs) => qs.id === questId);
}

function statusOf(save: SaveData, questId: string): QuestState['status'] {
  return findState(save, questId)?.status ?? 'unaccepted';
}

function timesCompletedOf(save: SaveData, questId: string): number {
  return findState(save, questId)?.progress?.timesCompleted ?? 0;
}

/** 掲示条件: unlockDepth <= deepestReached。一回限りで done は除外。repeatable は常に掲示。 */
export function questBoard(save: SaveData): QuestBoardEntry[] {
  const deepest = save.towerState.record.deepestReached;
  const entries: QuestBoardEntry[] = [];
  for (const quest of Object.values(QUESTS)) {
    if (quest.unlockDepth > deepest) continue;
    const status = statusOf(save, quest.id);
    if (!quest.repeatable && status === 'done') continue;
    entries.push({ quest, status, timesCompleted: timesCompletedOf(save, quest.id) });
  }
  return entries;
}

/** 受注中の依頼一覧（進捗数値つき）。 */
export function activeQuests(save: SaveData): ActiveQuestEntry[] {
  const entries: ActiveQuestEntry[] = [];
  for (const qs of save.questStates) {
    if (qs.status !== 'active') continue;
    const quest = QUESTS[qs.id];
    if (!quest) continue;
    entries.push({
      quest,
      progress: questProgress(save, qs.id),
      complete: isQuestComplete(save, qs.id),
    });
  }
  return entries;
}

/**
 * 依頼を受注する。active 数が QUEST_MAX_ACTIVE 以上、対象依頼が存在しない、
 * 既に active、一回限りで既に done の場合は no-op。
 * hunt は progress.baseKills = 現在の討伐数を記録して active にする
 * （timesCompleted 等の既存 progress は保持したままマージする）。
 */
export function acceptQuest(save: SaveData, questId: string): SaveData {
  const quest = QUESTS[questId];
  if (!quest) return save;

  const existing = findState(save, questId);
  if (existing?.status === 'active') return save;
  if (!quest.repeatable && existing?.status === 'done') return save;

  const activeCount = save.questStates.filter((qs) => qs.status === 'active').length;
  if (activeCount >= BALANCE.QUEST_MAX_ACTIVE) return save;

  const progress: Record<string, number> = { ...(existing?.progress ?? {}) };
  if (quest.kind === 'hunt' && quest.target.enemyId) {
    progress.baseKills = save.bestiary.monsters[quest.target.enemyId]?.kills ?? 0;
  }

  const newState: QuestState = {
    id: questId,
    status: 'active',
    progress: Object.keys(progress).length > 0 ? progress : undefined,
  };
  const questStates = existing
    ? save.questStates.map((qs) => (qs.id === questId ? newState : qs))
    : [...save.questStates, newState];
  return { ...save, questStates };
}

/**
 * 受注中の依頼を破棄する（active → unaccepted）。今回の受注分の進捗（baseKills）は
 * 破棄するが、repeatable の累計達成回数（timesCompleted）は保持する。
 */
export function abandonQuest(save: SaveData, questId: string): SaveData {
  const existing = findState(save, questId);
  if (!existing || existing.status !== 'active') return save;

  const timesCompleted = existing.progress?.timesCompleted;
  const newState: QuestState = {
    id: questId,
    status: 'unaccepted',
    progress: timesCompleted !== undefined ? { timesCompleted } : undefined,
  };
  const questStates = save.questStates.map((qs) => (qs.id === questId ? newState : qs));
  return { ...save, questStates };
}

/**
 * 進捗を返す。
 * hunt: (現在の kills - baseKills) を count でクランプ（未受注時は差分0扱い）。
 * delivery: 倉庫所持数（全 grade 合算）を count でクランプ。
 * reach: deepestReached を depth でクランプ。
 * boss: 撃破済みなら 1/1、未撃破なら 0/1。
 */
export function questProgress(
  save: SaveData,
  questId: string
): { current: number; required: number } {
  const quest = QUESTS[questId];
  if (!quest) return { current: 0, required: 0 };

  switch (quest.kind) {
    case 'hunt': {
      const required = quest.target.count ?? 0;
      const enemyId = quest.target.enemyId;
      const kills = enemyId ? (save.bestiary.monsters[enemyId]?.kills ?? 0) : 0;
      const baseKills = findState(save, questId)?.progress?.baseKills ?? kills;
      const current = Math.min(required, Math.max(0, kills - baseKills));
      return { current, required };
    }
    case 'delivery': {
      const required = quest.target.count ?? 0;
      const itemId = quest.target.itemId;
      const current = itemId ? Math.min(required, itemCount(save, itemId)) : 0;
      return { current, required };
    }
    case 'reach': {
      const required = quest.target.depth ?? 0;
      const current = Math.min(required, save.towerState.record.deepestReached);
      return { current, required };
    }
    case 'boss': {
      const depth = quest.target.depth ?? 0;
      const defeated = save.towerState.bossGates[depth]?.defeated === true;
      return { current: defeated ? 1 : 0, required: 1 };
    }
  }
}

/** 進捗が目標に達しているか。 */
export function isQuestComplete(save: SaveData, questId: string): boolean {
  const { current, required } = questProgress(save, questId);
  return required > 0 && current >= required;
}

/** 倉庫のスタックを grade 昇順に count 個消費する（delivery 報告用）。 */
function consumeItemByGradeAscending(save: SaveData, itemId: ItemId, count: number): SaveData {
  const grades = Array.from(
    new Set(save.guild.storage.filter((s) => s.itemId === itemId).map((s) => s.grade ?? 1))
  ).sort((a, b) => a - b);

  let next = save;
  let remaining = count;
  for (const grade of grades) {
    if (remaining <= 0) break;
    const available = itemCount(next, itemId, grade);
    const take = Math.min(available, remaining);
    if (take <= 0) continue;
    next = removeItem(next, itemId, take, grade);
    remaining -= take;
  }
  return next;
}

/**
 * 依頼を報告する。未達成なら no-op。
 * delivery は対象アイテムを count 個消費（grade 昇順）。rewards を付与
 * （gold/gems/items）。repeatable は 'unaccepted' に戻し progress を
 * { timesCompleted: 前回+1 } にリセット（baseKills はクリア）。一回限りは 'done'。
 */
export function turnInQuest(save: SaveData, questId: string): SaveData {
  const quest = QUESTS[questId];
  if (!quest) return save;

  const state = findState(save, questId);
  if (!state || state.status !== 'active') return save;
  if (!isQuestComplete(save, questId)) return save;

  let next = save;

  if (quest.kind === 'delivery' && quest.target.itemId && quest.target.count) {
    next = consumeItemByGradeAscending(next, quest.target.itemId, quest.target.count);
  }

  const rewards = quest.rewards;
  if (rewards.gold || rewards.gems) {
    next = {
      ...next,
      guild: {
        ...next.guild,
        gold: next.guild.gold + (rewards.gold ?? 0),
        gems: next.guild.gems + (rewards.gems ?? 0),
      },
    };
  }
  for (const item of rewards.items ?? []) {
    next = addItem(next, item.itemId, item.qty);
  }

  const prevTimesCompleted = state.progress?.timesCompleted ?? 0;
  const newState: QuestState = quest.repeatable
    ? { id: questId, status: 'unaccepted', progress: { timesCompleted: prevTimesCompleted + 1 } }
    : { id: questId, status: 'done' };

  const questStates = next.questStates.map((qs) => (qs.id === questId ? newState : qs));
  return { ...next, questStates };
}

/** 達成済み active の数（バッジ用）。 */
export function reportableCount(save: SaveData): number {
  return save.questStates.filter((qs) => qs.status === 'active' && isQuestComplete(save, qs.id))
    .length;
}
