// ============================================================================
// battleLogFormat — BattleEvent → ログテキスト派生（設計書: §2.4）
//
// fmt(event, state) は { pre, post[] } を返す。
//   pre  : アクターが動き始めたタイミングでキューに積む 1 行
//   post : FX マウント後にキューに積む 0〜N 行（ヒット・回復・状態変化）
// ============================================================================

import type { BattleEvent, BuffKind, DebuffKind, HitResult } from './battleEvent';
import type { BattleState } from './types';

import { ITEMS } from '@/data/items';
import { SKILLS } from '@/data/skills';

export type FmtResult = {
  pre: string;
  post: string[];
};

// ----------------------------------------------------------------------------
// 名前解決
// ----------------------------------------------------------------------------

/** state.allies / enemies / summons から id → name を解決する。 */
const resolveName = (id: string, state: BattleState): string => {
  const all = [...state.allies, ...state.enemies, ...(state.summons ?? [])];
  return all.find((c) => c.id === id)?.name ?? '?';
};

/** SKILLS マスタからスキル名を取得する。未定義なら skillId をそのまま返す。 */
const resolveSkillName = (skillId: string): string => {
  return (SKILLS as Record<string, { name: string } | undefined>)[skillId]?.name ?? skillId;
};

/** ITEMS マスタからアイテム名を取得する。未定義なら itemId をそのまま返す。 */
const resolveItemName = (itemId: string): string => {
  return (ITEMS as Record<string, { name: string } | undefined>)[itemId]?.name ?? itemId;
};

// ----------------------------------------------------------------------------
// 効果ラベル
// 実際の BuffKind / DebuffKind（AilmentType）の値に合わせて列挙する。
// ----------------------------------------------------------------------------

export const buffLabel = (kind: BuffKind): string => {
  switch (kind) {
    // BuffStatTarget
    case 'patk':
      return '物理攻撃力アップ';
    case 'pdef':
      return '物理防御力アップ';
    case 'matk':
      return '魔法攻撃力アップ';
    case 'mdef':
      return '魔法防御力アップ';
    case 'acc':
      return '命中率アップ';
    case 'eva':
      return '回避率アップ';
    case 'elementResist':
      return '属性耐性アップ';
    // CombatState 系
    case 'counter':
      return '反撃の構え';
    case 'chase':
      return '連携追撃';
    case 'decoy':
      return '挑発';
    case 'barrier':
      return '障壁';
    case 'regen':
      return 'HP再生';
    default:
      return String(kind);
  }
};

export const debuffLabel = (kind: DebuffKind): string => {
  switch (kind) {
    case 'poison':
      return '毒';
    case 'paralysis':
      return '麻痺';
    case 'sleep':
      return '睡眠';
    case 'confusion':
      return '混乱';
    case 'curse':
      return '呪い';
    case 'blind':
      return '盲目';
    case 'instantDeath':
      return '即死';
    case 'headBind':
      return '頭封じ';
    case 'armBind':
      return '腕封じ';
    case 'legBind':
      return '脚封じ';
    default:
      return String(kind);
  }
};

// ----------------------------------------------------------------------------
// ヒット結果テキスト生成
// ----------------------------------------------------------------------------

const formatHits = (hits: HitResult[], state: BattleState): string[] =>
  hits.flatMap((h) => {
    const lines: string[] = [];
    if (h.result === 'miss') {
      lines.push(`${resolveName(h.targetId, state)}は攻撃をかわした！`);
    } else {
      if (h.result === 'crit') lines.push('クリティカル！');
      lines.push(`${resolveName(h.targetId, state)}に${h.damage}のダメージ！`);
    }
    if (h.defeated) lines.push(`${resolveName(h.targetId, state)}は倒れた！`);
    return lines;
  });

// ----------------------------------------------------------------------------
// fmt — メインエクスポート
// ----------------------------------------------------------------------------

export const fmt = (event: BattleEvent, state: BattleState): FmtResult => {
  switch (event.kind) {
    // --------
    // 通常攻撃
    // --------
    case 'normal-attack':
      return {
        pre: `${resolveName(event.actorId, state)}の攻撃！`,
        post: formatHits(event.hits, state),
      };

    // --------
    // スキル
    // --------
    case 'skill': {
      const pre = event.unionActorIds
        ? `ユニオン！ ${resolveSkillName(event.skillId)}！`
        : `${resolveName(event.actorId, state)}は${resolveSkillName(event.skillId)}を放った！`;
      const post = [
        ...formatHits(event.hits, state),
        ...event.heals.map((h) => `${resolveName(h.targetId, state)}のHPが${h.amount}回復！`),
        ...event.buffs.map(
          (b) => `${resolveName(b.targetId, state)}に${buffLabel(b.effect)}が付与された！`
        ),
        ...event.debuffs.map(
          (d) => `${resolveName(d.targetId, state)}は${debuffLabel(d.effect)}になった！`
        ),
      ];
      return { pre, post };
    }

    // --------
    // 防御
    // --------
    case 'defend':
      return {
        pre: `${resolveName(event.actorId, state)}は構えを取った！`,
        post: [],
      };

    // --------
    // 逃げる
    // --------
    case 'flee':
      return {
        pre: event.success
          ? 'うまく逃げ切れた！'
          : `${resolveName(event.actorId, state)}は逃げ出そうとしたが失敗した！`,
        post: [],
      };

    // --------
    // アイテム使用
    // --------
    case 'item-use': {
      const targetName = resolveName(event.targetId ?? event.actorId, state);
      const pre = `${resolveName(event.actorId, state)}は${resolveItemName(event.itemId)}を使った！`;
      let post: string[];
      switch (event.effect.kind) {
        case 'heal':
          post = [`${targetName}のHPが${event.effect.amount}回復！`];
          break;
        case 'cure':
          post = event.effect.cureEffects.map((e) => `${targetName}の${debuffLabel(e)}が解けた！`);
          break;
        case 'tp-restore':
          post = [`${targetName}のTPが${event.effect.amount}回復！`];
          break;
        case 'revive':
          post = [`${targetName}が蘇生した！(HP+${event.effect.hpRestore})`];
          break;
      }
      return { pre, post };
    }

    // --------
    // ターン経過（毒/継続回復/効果切れ）
    // --------
    case 'tick': {
      const targetName = resolveName(event.targetId, state);
      const lines: string[] = [];
      switch (event.effectType) {
        case 'poison':
          lines.push(`${targetName}は毒のダメージを受けた！(${event.amount ?? 0})`);
          break;
        case 'regen':
          lines.push(`${targetName}のHPが${event.amount ?? 0}回復！`);
          break;
        case 'buff-expire':
          lines.push(
            `${targetName}の${event.effect != null ? buffLabel(event.effect as BuffKind) : '効果'}の効果が切れた！`
          );
          break;
        case 'debuff-expire':
          lines.push(
            `${targetName}の${event.effect != null ? debuffLabel(event.effect as DebuffKind) : '状態異常'}が解けた！`
          );
          break;
      }
      if (event.defeated) lines.push(`${targetName}は倒れた！`);
      return { pre: '', post: lines };
    }

    // --------
    // 召喚体
    // --------
    case 'summon-appear':
      return {
        pre: `${event.summonName ?? '召喚体'}が現れた！`,
        post: [],
      };

    case 'summon-dispel':
      return {
        pre: `${event.summonName ?? '召喚体'}は消えた！`,
        post: [],
      };
  }
};
