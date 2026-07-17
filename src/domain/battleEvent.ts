// ============================================================================
// BattleEvent — 戦闘イベントの ADT（設計書: dev-docs/battle-event-redesign.md §2.1）
// 戦闘ロジックが生成し、UI がアニメーション再生に使う構造化イベントリスト。
// ============================================================================

import type { AilmentType, BuffStatTarget, Element, SummonKind } from './types';

// ----------------------------------------------------------------------------
// バフ種別 / デバフ種別
// 既存の BuffStatTarget（patk/pdef/matk/mdef/acc/eva/elementResist）を再利用し、
// CombatState の kind 値（counter/chase/decoy/barrier/regen）も列挙する。
// ----------------------------------------------------------------------------

export type BuffKind =
  | BuffStatTarget // 'patk' | 'pdef' | 'matk' | 'mdef' | 'acc' | 'eva' | 'elementResist'
  | 'counter' // 反撃
  | 'chase' // 連携追撃
  | 'decoy' // 挑発
  | 'barrier' // 障壁
  | 'regen'; // 継続回復

/** デバフ種別は状態異常（AilmentType）に統一する。 */
export type DebuffKind = AilmentType;

// ----------------------------------------------------------------------------
// ヒット・回復・バフ・デバフの個別結果
// ----------------------------------------------------------------------------

export type HitResult = {
  targetId: string;
  result: 'miss' | 'hit' | 'crit';
  damage: number;
  element?: Element;
  defeated: boolean;
};

export type HealResult = {
  targetId: string;
  amount: number;
};

export type BuffResult = {
  targetId: string;
  effect: BuffKind;
  turns?: number;
};

export type DebuffResult = {
  targetId: string;
  effect: DebuffKind;
  turns?: number;
};

// ----------------------------------------------------------------------------
// アイテム効果の判別共用体
// ----------------------------------------------------------------------------

export type ItemEffect =
  | { kind: 'heal'; amount: number }
  | { kind: 'cure'; cureEffects: DebuffKind[] }
  | { kind: 'tp-restore'; amount: number }
  | { kind: 'revive'; hpRestore: number }
  | { kind: 'buff'; stat: BuffStatTarget; turns: number };

// ----------------------------------------------------------------------------
// BattleEvent の各バリアント
// ----------------------------------------------------------------------------

export type NormalAttackEvent = {
  kind: 'normal-attack';
  actorId: string;
  hits: HitResult[];
  reactions: BattleEvent[];
};

export type SkillEvent = {
  kind: 'skill';
  actorId: string;
  skillId: string;
  /** ユニオンスキル参加者（発動者を含む）。通常スキルでは undefined。 */
  unionActorIds?: string[];
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
  actorId: string;
  success: boolean;
};

export type ItemUseEvent = {
  kind: 'item-use';
  actorId: string;
  itemId: string;
  targetId?: string;
  effect: ItemEffect;
};

export type TickEvent = {
  kind: 'tick';
  targetId: string;
  /** 毒ダメージ / 継続回復 / バフ切れ / デバフ切れ */
  effectType: 'poison' | 'regen' | 'buff-expire' | 'debuff-expire';
  /** poison / regen で変動した量。切れイベントでは undefined。 */
  amount?: number;
  /** buff-expire / debuff-expire で切れた効果種別。 */
  effect?: BuffKind | DebuffKind;
  /** poison ティックで戦闘不能になった場合 true。 */
  defeated?: boolean;
};

export type SummonEvent = {
  kind: 'summon-appear' | 'summon-dispel';
  summonerId?: string;
  summonId: string;
  summonKind?: SummonKind;
  summonName?: string;
};

// ----------------------------------------------------------------------------
// snapshotAfter: イベント実行直後の HP/戦闘不能スナップショット（Step 5 HP バー同期用）
// battle.ts が各 events.push 直後に記録する。オプショナル（全 event 必須ではない）。
// ----------------------------------------------------------------------------

export type CombatantSnapshot = Record<string, { hp: number; isDown: boolean }>;

// ----------------------------------------------------------------------------
// 統合型
// ----------------------------------------------------------------------------

export type BattleEvent = (
  | NormalAttackEvent
  | SkillEvent
  | DefendEvent
  | FleeEvent
  | ItemUseEvent
  | TickEvent
  | SummonEvent
) & {
  /** battle.ts がイベント push 直後に記録するスナップショット（HP バー同期用）。 */
  snapshotAfter?: CombatantSnapshot;
};
