import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from './style.module.scss';

import { useBgm } from '@/audio/bgm/useBgm';
import { useSfx } from '@/audio/useSfx';
import { BattleExpBar } from '@/components/common/BattleExpBar/BattleExpBar';
import { CharacterPortrait } from '@/components/common/CharacterPortrait/CharacterPortrait';
import { InkSplatter } from '@/components/common/InkSplatter/InkSplatter';
import { ResistBadges } from '@/components/common/ResistBadges/ResistBadges';
import { StatBar } from '@/components/common/StatBar/StatBar';
import { BATTLE_SKILLS } from '@/data/battleSkills';
import { CLASSES } from '@/data/classes';
import { ENEMIES } from '@/data/enemies';
import { ITEMS } from '@/data/items';
import { RACES } from '@/data/races';
import { UNION_SKILLS } from '@/data/unionSkills';
import { resolveEnemyAilmentResist } from '@/domain/ailment';
import {
  applyBattleResult,
  battleRewards,
  partyExpResults,
  resolveTurn,
  startBattle,
} from '@/domain/battle';
import type { LevelUpResult } from '@/domain/battle';
import { resolveFoeBattle, returnToTown } from '@/domain/dive';
import { rollEncounter } from '@/domain/encounterTable';
import { itemCount } from '@/domain/inventory';
import { createRng } from '@/domain/rng';
import { computeSkillTpCost } from '@/domain/skillCost';
import { pickAutoCommand, STRATEGY_LIST, STRATEGY_SHORT_LABEL } from '@/domain/strategy';
import type { Strategy } from '@/domain/strategy';
import type {
  BattleCommand,
  BattleState,
  Combatant,
  EnemyId,
  ItemId,
  Rng,
  SkillEffectDef,
  SkillId,
  UnionSkillDef,
} from '@/domain/types';
import { useGameState } from '@/store/gameState';
import { Redirect, useNavigation } from '@/store/navigation';

// 経験値バーのアニメーション時間(ms)。BattleExpBar の durationMs 既定値と一致させる（issue #52）。
const EXP_ANIM_MS = 1000;

type AllyCmd =
  | { kind: 'attack' }
  | { kind: 'guard' }
  | { kind: 'skill'; skillId: SkillId }
  | { kind: 'item'; itemId: ItemId };

// スキル/ユニオンの効果要約（威力・属性・対象）。issue #18。
const ELEM_LABEL: Record<string, string> = {
  slash: '斬',
  pierce: '突',
  bash: '壊',
  fire: '火',
  ice: '氷',
  volt: '雷',
  almighty: '無',
};
const TARGET_LABEL: Record<string, string> = {
  enemyOne: '敵単体',
  enemyRow: '敵1列',
  enemyAll: '敵全体',
  allyOne: '味方単体',
  allyAll: '味方全体',
  self: '自分',
};
const BUFF_LABEL: Record<string, string> = {
  patk: '物攻',
  pdef: '物防',
  matk: '魔攻',
  mdef: '魔防',
  acc: '命中',
  eva: '回避',
  elementResist: '属性耐性',
};
const AILMENT_LABEL: Record<string, string> = {
  poison: '毒',
  paralysis: '麻痺',
  sleep: '睡眠',
  blind: '盲目',
  headBind: '頭封じ',
  armBind: '腕封じ',
  legBind: '脚封じ',
};

function effectLabel(e: SkillEffectDef, lv: number): string {
  switch (e.kind) {
    case 'damage':
      return `${e.statBase === 'str' ? '物理' : '魔法'}威力${Math.round(e.power(lv) * 100)}%${e.hits && e.hits > 1 ? `×${e.hits}` : ''}${e.drain ? '・吸収' : ''}`;
    case 'heal':
      return `HP回復${e.amount(lv)}`;
    case 'restoreTp':
      return `TP回復${e.amount(lv)}`;
    case 'buff':
      return `${BUFF_LABEL[e.stat]}${e.modifier(lv) < 1 ? '↓' : '↑'}`;
    case 'ailment':
      return `${AILMENT_LABEL[e.ailment] ?? e.ailment}${Math.round(e.chance(lv) * 100)}%`;
    case 'summon':
      return '召喚';
    case 'counter':
      return '反撃の構え';
    case 'chase':
      return '連携追撃の構え';
    case 'decoy':
      return '挑発';
    case 'barrier':
      return '障壁';
    case 'cleanse':
      return '状態異常治療';
    case 'revive':
      return `蘇生(HP${Math.round(e.ratio(lv) * 100)}%)`;
    case 'regen':
      return `継続回復${e.amount(lv)}`;
    default:
      return '';
  }
}

function skillIsRevive(sid: string): boolean {
  return !!BATTLE_SKILLS[sid]?.effects.some((e) => e.kind === 'revive');
}

/** 「属性・対象／効果…」の1行サマリ。 */
function skillSummary(element: string, target: string, effects: SkillEffectDef[], lv = 1): string {
  return `${ELEM_LABEL[element] ?? element}・${TARGET_LABEL[target] ?? target}／${effects
    .map((e) => effectLabel(e, lv))
    .join('・')}`;
}

// レベルアップダイアログのステータス表示名（issue #18）。
const STAT_LABEL: Record<string, string> = {
  hp: 'HP',
  tp: 'TP',
  str: '腕力',
  vit: '体力',
  agi: '敏捷',
  int: '知力',
  mnd: '精神',
  luc: '幸運',
};

/** 戦闘員の現在 HP/戦闘不能のスナップショット（逐次再生の起点。issue #18）。 */
function snapshotOf(s: BattleState): Record<string, { hp: number; isDown: boolean }> {
  const snap: Record<string, { hp: number; isDown: boolean }> = {};
  for (const c of [...s.allies, ...s.enemies, ...s.summons]) {
    snap[c.id] = { hp: c.hp, isDown: c.isDown };
  }
  return snap;
}

type UnionCmd = {
  actorId: string;
  unionSkillId: SkillId;
  participantIds: string[];
  targetId: string;
};

/**
 * 戦闘UIのフェーズ（issue #61 おまかせ戦闘）。
 * - global: 全体行動選択（たたかう / さくせん / にげる）
 * - individual: 個別行動選択（めいれいキャラのみ）
 * - strategy: 作戦変更
 */
type UiMode = { kind: 'global' } | { kind: 'individual' } | { kind: 'strategy' };

/** 逐次再生の状態（issue #18）。base=ターン開始時HP、revealed=表示済みログ行数。 */
type Anim = { base: Record<string, { hp: number; isDown: boolean }>; revealed: number };

// 戦闘（[03]）。一括入力型ターン制。本家に倣い、味方は前衛/後衛の2段で表示し、
// キャラごとにコマンド（攻撃/防御/スキル/逃走）をメニュー選択する。
export const Page = () => {
  const { navigate } = useNavigation();
  const { save, applyAndPersist, applySave } = useGameState();
  const play = useSfx();
  const { setBattleVariant } = useBgm();
  const rngRef = useRef<Rng | null>(null);
  const [state, setState] = useState<BattleState | null>(null);
  const [uiMode, setUiMode] = useState<UiMode>({ kind: 'global' });
  const [commands, setCommands] = useState<Record<string, AllyCmd>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [skillMenu, setSkillMenu] = useState(false);
  const [itemMenu, setItemMenu] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  // コマンド単位の対象 ID（味方単体スキルで使用）。charId → targetId。
  const [commandTargets, setCommandTargets] = useState<Record<string, string>>({});
  // 味方単体スキル選択後の対象選択フェーズ（allyOne 確認中のスキル ID）。
  const [allyTargetMenu, setAllyTargetMenu] = useState<SkillId | null>(null);
  const [busy, setBusy] = useState(false);
  // このターンに予約したユニオン（MVP: 1ターン1回）。
  const [unionCmd, setUnionCmd] = useState<UnionCmd | null>(null);
  // 協力者選択中のユニオン（requiredParticipants > 1 のとき）。
  const [unionSetup, setUnionSetup] = useState<{ actorId: string; def: UnionSkillDef } | null>(
    null
  );
  // 行動の逐次再生（issue #18）。再生中はコマンド入力/結果を隠す。
  const [anim, setAnim] = useState<Anim | null>(null);
  // ダメージを受けたカードの点滅対象 ID（issue #18）。
  const [flashIds, setFlashIds] = useState<Set<string>>(new Set());
  // InkSplatter: ID → { value, variant } のマップ（Phase 2）。
  // ログ行が表示されるたびに被弾者のダメージ量を記録し、アニメ終了後に削除。
  const [inkSplatters, setInkSplatters] = useState<
    Map<string, { value: number | string; variant: 'damage' | 'heal' | 'crit' | 'gold' }>
  >(new Map());
  // 勝利演出の gold InkSplatter（Phase 2）。
  const [showVictoryGold, setShowVictoryGold] = useState(false);
  // エンカウント/戦闘終了の暗転エフェクト（issue #18）。
  const [introFx, setIntroFx] = useState(true);
  const [outroFx, setOutroFx] = useState<'win' | 'lose' | 'fled' | null>(null);
  // レベルアップダイアログの表示待ち行列（issue #18）。
  const [levelQueue, setLevelQueue] = useState<LevelUpResult[]>([]);
  // 経験値バーのアニメーションが完了したか（issue #52: バーが伸び切ってからレベルアップ）。
  const [expDone, setExpDone] = useState(false);
  // 戦闘ログ。インラインで最新 3 行を常時表示、タップで全履歴オーバーレイ。
  const [logOpen, setLogOpen] = useState(false);

  // 初期化（1回のみ）: FOE 接触なら予約敵で開始、そうでなければエンカウント抽選
  useEffect(() => {
    if (state || !save?.diveState) return;
    const depth = save.diveState.depth;
    const seed =
      (save.masterSeed ^ (depth * 2654435761) ^ (save.towerState.record.totalDives * 40503)) >>> 0;
    rngRef.current = createRng(seed);
    const pending = save.diveState.pendingFoeBattle;
    if (pending) {
      setState(startBattle(save, [pending.enemyId], pending.firstStrike));
    } else {
      setState(startBattle(save, rollEncounter(depth, rngRef.current)));
    }
  }, [save, state]);

  // 敵種別に応じて戦闘BGMを切替（boss > foe > 通常battle）。/battle 離脱時に解除。
  useEffect(() => {
    if (!state) return;
    const isBoss = state.enemies.some((e) => e.enemyId && ENEMIES[e.enemyId]?.kind === 'boss');
    const isFoe = state.enemies.some((e) => e.enemyId && ENEMIES[e.enemyId]?.kind === 'foe');
    setBattleVariant(isBoss ? 'boss' : isFoe ? 'foe' : 'battle');
  }, [state, setBattleVariant]);
  useEffect(() => () => setBattleVariant(null), [setBattleVariant]);

  // エンカウント演出（issue #18）: 突入直後の暗転を一定時間で晴らす。
  useEffect(() => {
    if (!introFx) return;
    play('encounter');
    const t = setTimeout(() => setIntroFx(false), 700);
    return () => clearTimeout(t);
  }, [introFx, play]);

  // 1ターン解決して逐次再生を開始する（issue #18）。入力状態をクリアする。
  const runTurn = useCallback(
    (list: BattleCommand[]) => {
      if (!state || !rngRef.current || state.outcome !== 'ongoing') return;
      const base = snapshotOf(state);
      const final = resolveTurn(state, list, rngRef.current);
      setState(final);
      setCommands({});
      setCommandTargets({});
      setSkillMenu(false);
      setItemMenu(false);
      setAllyTargetMenu(null);
      setUnionCmd(null);
      setUnionSetup(null);
      setActiveId(null);
      setFlashIds(new Set());
      setInkSplatters(new Map());
      setUiMode({ kind: 'global' });
      setAnim(final.log.length > 0 ? { base, revealed: 0 } : null);
    },
    [state]
  );

  // 不意打ち: ターン1は味方が動けない。突入演出が晴れてから敵の先手1巡を自動解決する。
  const ambushDone = useRef(false);
  useEffect(() => {
    if (!state || !rngRef.current || ambushDone.current || introFx) return;
    if (state.turn === 1 && state.firstStrike === 'ambush' && state.outcome === 'ongoing') {
      ambushDone.current = true;
      runTurn([]);
    }
  }, [state, introFx, runTurn]);

  // 逐次再生（issue #18）: ログ行を1行ずつ開き、被弾したカードを点滅させる。
  useEffect(() => {
    if (!state || !anim) return;
    if (anim.revealed >= state.log.length) {
      const t = setTimeout(() => {
        setAnim(null);
        setFlashIds(new Set());
        setInkSplatters(new Map());
      }, 200);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => {
        const idx = anim.revealed;
        const cur = state.log[idx]?.snapshot;
        const prev = idx > 0 ? (state.log[idx - 1]?.snapshot ?? anim.base) : anim.base;
        const fl = new Set<string>();
        const nextSplatters = new Map<
          string,
          { value: number | string; variant: 'damage' | 'heal' | 'crit' | 'gold' }
        >();
        if (cur) {
          for (const id of Object.keys(cur)) {
            const p = prev?.[id];
            if (p && (cur[id].hp < p.hp || (cur[id].isDown && !p.isDown))) {
              fl.add(id);
              // InkSplatter: HP 差をダメージ値として表示
              const dmg = Math.round(p.hp - cur[id].hp);
              const logText = state.log[idx]?.text ?? '';
              const isCrit = logText.includes('（会心）');
              const isHeal = logText.includes('回復') && cur[id].hp > p.hp;
              nextSplatters.set(id, {
                value: dmg > 0 ? dmg : Math.round(cur[id].hp - p.hp),
                variant: isHeal ? 'heal' : isCrit ? 'crit' : 'damage',
              });
            } else if (p && cur[id].hp > p.hp) {
              // HP 回復
              const healed = Math.round(cur[id].hp - p.hp);
              nextSplatters.set(id, { value: healed, variant: 'heal' });
            }
          }
        }
        setFlashIds(fl);
        setInkSplatters(nextSplatters);
        setAnim({ ...anim, revealed: anim.revealed + 1 });
      },
      anim.revealed === 0 ? 240 : 540
    );
    return () => clearTimeout(t);
  }, [state, anim]);

  // リザルト用の経験値・レベルアップ結果（issue #18）。勝利時のみ算出。
  const expResults = useMemo(
    () => (state && state.outcome === 'win' && save ? partyExpResults(save, state) : []),
    [state, save]
  );
  // 経験値バーのアニメーション(EXP_ANIM_MS)が終わってからレベルアップダイアログを積む（issue #52）。
  // 「バーが伸び切ってからレベルアップ」が自然なため、ダイアログ表示を遅延させる。
  useEffect(() => {
    if (state?.outcome !== 'win' || anim) return;
    const ups = expResults.filter((r) => r.toLevel > r.fromLevel);
    const t = setTimeout(
      () => {
        if (ups.length > 0) setLevelQueue(ups);
        setExpDone(true);
      },
      ups.length > 0 ? EXP_ANIM_MS + 250 : EXP_ANIM_MS
    );
    return () => clearTimeout(t);
  }, [state?.outcome, anim, expResults]);

  // 勝利時に gold InkSplatter を一時表示（Phase 2）。早期リターン前に置く必要あり。
  useEffect(() => {
    if (state?.outcome !== 'win' || anim) return;
    setShowVictoryGold(true);
    const t = setTimeout(() => setShowVictoryGold(false), 500);
    return () => clearTimeout(t);
  }, [state?.outcome, anim]);

  // 戦闘終了 SE（outcome が確定し、anim が終わったタイミングで1回鳴らす）。
  const prevOutcomeRef = useRef<string | null>(null);
  useEffect(() => {
    if (!state) return;
    const outcome = state.outcome;
    if (outcome === 'ongoing') {
      prevOutcomeRef.current = null;
      return;
    }
    // anim がまだ再生中なら待つ（anim=null になってから鳴らす）
    if (anim) return;
    if (prevOutcomeRef.current === outcome) return; // 二重発火防止
    prevOutcomeRef.current = outcome;
    if (outcome === 'win') play('victory');
    else if (outcome === 'lose') play('defeat');
    else if (outcome === 'fled') play('flee');
  }, [state, anim, play]);

  // レベルアップ SE（levelQueue の先頭が表示されるたびに鳴らす）。
  const prevLevelQueueLenRef = useRef(0);
  useEffect(() => {
    if (levelQueue.length > prevLevelQueueLenRef.current) {
      // 新しく積まれた（配列が増えた）場合は levelup を鳴らさない（積み直し）
    } else if (levelQueue.length > 0 && levelQueue.length < prevLevelQueueLenRef.current) {
      // OKを押してキューが1つ減ったら次のレベルアップ表示 → levelup は次のレンダーで鳴らす
    }
    // キューが新規追加されたとき（0→n）に1回鳴らす
    if (prevLevelQueueLenRef.current === 0 && levelQueue.length > 0) {
      play('levelup');
    } else if (prevLevelQueueLenRef.current > levelQueue.length && levelQueue.length > 0) {
      // 次の1人表示
      play('levelup');
    }
    prevLevelQueueLenRef.current = levelQueue.length;
  }, [levelQueue.length, play]);

  // ログ再生 SE: 1行ずつ再生されるたびにログテキストを解析して SE を鳴らす。
  // 味方 ID セット（ダメージが味方か敵かの判定用）。
  const allyIdSetRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (state) {
      allyIdSetRef.current = new Set(state.allies.map((a) => a.id));
    }
  }, [state]);

  const prevRevealedRef = useRef(0);
  useEffect(() => {
    if (!state || !anim) {
      prevRevealedRef.current = 0;
      return;
    }
    const revealed = anim.revealed;
    if (revealed <= prevRevealedRef.current) return;
    // 新しく表示されたログ行を処理
    const newLines = state.log.slice(prevRevealedRef.current, revealed);
    prevRevealedRef.current = revealed;

    for (const line of newLines) {
      const t = line.text;
      // 逃走成功
      if (t === 'うまく逃げ切れた！') {
        play('flee');
        break;
      }
      // 戦闘不能（「は倒れた」）
      if (t.includes('は倒れた')) {
        play('down');
        continue;
      }
      // 回復魔法
      if (t.includes('は回復魔法を使った')) {
        play('heal');
        continue;
      }
      // スキル発動（「の○○！」形式＝スキル名で発動）
      if (
        t.includes('のスキル') ||
        (/の.+！$/.test(t) && !t.includes('の攻撃！') && !t.includes('ユニオン'))
      ) {
        play('skill');
        continue;
      }
      // ユニオン
      if (t.startsWith('ユニオン！')) {
        play('skill');
        continue;
      }
      // 状態異常付与
      if (t.includes('になった')) {
        play('debuff');
        continue;
      }
      // バフ（態勢を整えた = guard/buff系）
      if (
        t.includes('は態勢を整えた') ||
        t.includes('の構えを取った') ||
        t.includes('を引きつけた') ||
        t.includes('の障壁を張った')
      ) {
        play('buff');
        continue;
      }
      // ダメージ命中（通常攻撃＋スキルの clean ダメージ行・会心チェック）
      if (/ に \d+ ダメージ/.test(t)) {
        const isCritical = t.includes('（会心）');
        // 被弾者が味方かどうかを判定（ログ文字列中の名前から特定は難しいのでsnapshotで判定）
        const snap = line.snapshot;
        const prevSnap = anim.base; // ターン開始時
        let allyHit = false;
        if (snap) {
          for (const [id, cur] of Object.entries(snap)) {
            if (allyIdSetRef.current.has(id)) {
              const prev = prevSnap?.[id];
              if (prev && cur.hp < prev.hp) {
                allyHit = true;
                break;
              }
            }
          }
        }
        if (allyHit) play('damage');
        play('attack');
        if (isCritical) play('critical');
        continue;
      }
    }
  }, [state, anim, play]);

  const aliveEnemies = useMemo(() => state?.enemies.filter((e) => !e.isDown) ?? [], [state]);
  const aliveAllies = useMemo(() => state?.allies.filter((a) => !a.isDown) ?? [], [state]);

  // 既定ターゲット（最初の生存敵）
  useEffect(() => {
    if (aliveEnemies.length > 0 && !aliveEnemies.some((e) => e.id === targetId)) {
      setTargetId(aliveEnemies[0].id);
    }
  }, [aliveEnemies, targetId]);

  // 入力対象キャラの補正（無効になった場合のみ未入力の先頭へ。全員入力済みなら null）
  // 個別UI中はめいれいキャラのみが対象。
  useEffect(() => {
    if (state?.outcome !== 'ongoing') return;
    if (uiMode.kind !== 'individual') return;
    if (activeId && aliveAllies.some((a) => a.id === activeId)) return;
    // めいれいキャラのうち未入力の先頭へ
    const meireiAllies = aliveAllies.filter((a) => {
      const ch = save?.guild.members.find((m) => m.id === a.id);
      return (ch?.strategy ?? 'batchiri') === 'meirei';
    });
    const next = meireiAllies.find((a) => !commands[a.id]) ?? null;
    setActiveId(next ? next.id : null);
  }, [state, aliveAllies, activeId, commands, uiMode, save]);

  // 全員入力済み判定: 個別UI中はめいれいキャラのみ。
  const meireiAllies = useMemo(() => {
    if (!save) return aliveAllies;
    return aliveAllies.filter((a) => {
      const ch = save.guild.members.find((m) => m.id === a.id);
      return (ch?.strategy ?? 'batchiri') === 'meirei';
    });
  }, [aliveAllies, save]);

  const allAssigned =
    uiMode.kind === 'individual'
      ? meireiAllies.length > 0 &&
        meireiAllies.every((a) => {
          const cmd = commands[a.id];
          if (!cmd) return false;
          if (cmd.kind === 'skill' && BATTLE_SKILLS[cmd.skillId]?.target === 'allyOne') {
            return commandTargets[a.id] !== undefined;
          }
          return true;
        })
      : aliveAllies.length > 0 &&
        aliveAllies.every((a) => {
          const cmd = commands[a.id];
          if (!cmd) return false;
          if (cmd.kind === 'skill' && BATTLE_SKILLS[cmd.skillId]?.target === 'allyOne') {
            return commandTargets[a.id] !== undefined;
          }
          return true;
        });

  const assign = useCallback(
    (charId: string, cmd: AllyCmd, allyTgtId?: string) => {
      // allyOne スキルの場合: 対象 ID が渡されていなければ味方選択フェーズへ
      if (cmd.kind === 'skill' && BATTLE_SKILLS[cmd.skillId]?.target === 'allyOne' && !allyTgtId) {
        setSkillMenu(false);
        setItemMenu(false);
        setAllyTargetMenu(cmd.skillId);
        // コマンドは一旦保留（対象決定後に完結させる）
        setCommands((prev) => ({ ...prev, [charId]: cmd }));
        return;
      }
      const nextCommands = { ...commands, [charId]: cmd };
      setCommands(nextCommands);
      // allyOne スキルの対象 ID を記録する
      if (cmd.kind === 'skill' && allyTgtId) {
        setCommandTargets((prev) => ({ ...prev, [charId]: allyTgtId }));
      }
      setSkillMenu(false);
      setItemMenu(false);
      setAllyTargetMenu(null);
      // 次の未入力キャラへ（個別UIではめいれいキャラのみ）
      const candidates = uiMode.kind === 'individual' ? meireiAllies : aliveAllies;
      const next = candidates.find((a) => a.id !== charId && !nextCommands[a.id]);
      setActiveId(next ? next.id : null);
    },
    [commands, aliveAllies, meireiAllies, uiMode]
  );

  const finish = useCallback(
    async (final: BattleState) => {
      setBusy(true);
      // 戦闘終了の暗転エフェクト（issue #18）。晴れる前に画面遷移を待つ。
      setOutroFx(final.outcome === 'lose' ? 'lose' : final.outcome === 'fled' ? 'fled' : 'win');
      await new Promise((r) => setTimeout(r, 460));
      // FOE 戦闘なら勝敗に応じて該当 FOE を撃破扱いにし、予約をクリアする（[02 §6]）
      const win = final.outcome === 'win';
      if (final.outcome === 'lose') {
        await applyAndPersist((s) => returnToTown(applyBattleResult(s, final)));
        navigate({ name: 'town' });
      } else {
        await applyAndPersist((s) => resolveFoeBattle(applyBattleResult(s, final), win));
        navigate({ name: 'dungeon' });
      }
    },
    [applyAndPersist, navigate]
  );

  const resetInput = useCallback(() => {
    setCommands({});
    setCommandTargets({});
    setSkillMenu(false);
    setItemMenu(false);
    setAllyTargetMenu(null);
    setUnionCmd(null);
    setUnionSetup(null);
    setActiveId(aliveAllies[0]?.id ?? null);
    setUiMode({ kind: 'global' });
  }, [aliveAllies]);

  /**
   * commands / commandTargets から BattleCommand リストを組み立てる純関数。
   * handleResolve と onClickFight の両方から使う。
   */
  const buildCommandList = useCallback(
    (
      cmds: Record<string, AllyCmd>,
      cmdTargets: Record<string, string>,
      allies: Combatant[],
      tgtId: string | null
    ): BattleCommand[] => {
      const tgt = tgtId ?? aliveEnemies[0]?.id ?? '';
      return allies.map((a): BattleCommand => {
        const c = cmds[a.id] ?? { kind: 'attack' };
        if (c.kind === 'guard') return { kind: 'guard', actorId: a.id };
        if (c.kind === 'skill') {
          const skillDef = BATTLE_SKILLS[c.skillId];
          let skillTgt: string;
          if (skillDef?.target === 'allyOne') {
            skillTgt = cmdTargets[a.id] ?? a.id;
          } else if (skillDef?.target === 'allyAll') {
            skillTgt = a.id;
          } else if (skillDef?.target === 'self') {
            skillTgt = a.id;
          } else {
            skillTgt = tgt;
          }
          return { kind: 'skill', actorId: a.id, skillId: c.skillId, targetId: skillTgt };
        }
        if (c.kind === 'item')
          return { kind: 'item', actorId: a.id, itemId: c.itemId, targetId: a.id };
        return { kind: 'attack', actorId: a.id, targetId: tgt };
      });
    },
    [aliveEnemies]
  );

  const handleResolve = useCallback(() => {
    if (!state || !rngRef.current || state.outcome !== 'ongoing') return;
    play('decide');
    const list = buildCommandList(commands, commandTargets, aliveAllies, targetId);
    // ユニオンは通常行動とは別枠で先頭に積む（[03 §9]）。敵狙いは実行時の最新ターゲットで撃つ。
    const tgt = targetId ?? aliveEnemies[0]?.id ?? '';
    if (unionCmd) {
      const def = UNION_SKILLS[unionCmd.unionSkillId];
      const enemyTargeted =
        def?.target === 'enemyOne' || def?.target === 'enemyRow' || def?.target === 'enemyAll';
      list.unshift({
        kind: 'union',
        ...unionCmd,
        targetId: enemyTargeted ? tgt : unionCmd.targetId,
      });
    }
    runTurn(list);
  }, [
    state,
    commands,
    commandTargets,
    targetId,
    aliveAllies,
    aliveEnemies,
    unionCmd,
    runTurn,
    play,
    buildCommandList,
  ]);

  const handleFlee = useCallback(() => {
    if (!state || !rngRef.current || state.outcome !== 'ongoing') return;
    const a = aliveAllies[0];
    if (!a) return;
    runTurn([{ kind: 'flee', actorId: a.id }]);
  }, [state, aliveAllies, runTurn]);

  /**
   * 「たたかう」ボタン押下: おまかせ戦闘（issue #61）。
   * - 非めいれいキャラに pickAutoCommand で自動コマンドを積む。
   * - めいれいキャラが0人なら即実行。1人以上いれば個別UIへ。
   */
  const onClickFight = useCallback(() => {
    if (!state || !save) return;
    const autoFilled: Record<string, AllyCmd> = {};
    const autoTargets: Record<string, string> = {};

    for (const ally of aliveAllies) {
      const char = save.guild.members.find((m) => m.id === ally.id);
      const strategy: Strategy = char?.strategy ?? 'batchiri';
      if (strategy === 'meirei') continue;
      const auto = pickAutoCommand(strategy, ally, state, char?.learnedSkills ?? {});
      if (auto.kind === 'skill') {
        autoFilled[ally.id] = { kind: 'skill', skillId: auto.skillId };
        if (auto.targetId) autoTargets[ally.id] = auto.targetId;
      } else {
        autoFilled[ally.id] = auto;
      }
    }

    const meireiAllies = aliveAllies.filter((a) => {
      const ch = save.guild.members.find((m) => m.id === a.id);
      return (ch?.strategy ?? 'batchiri') === 'meirei';
    });

    if (meireiAllies.length === 0) {
      // めいれいキャラなし → 自動コマンドリストを直接組んで即実行
      const list = buildCommandList(autoFilled, autoTargets, aliveAllies, targetId);
      play('decide');
      runTurn(list);
    } else {
      // めいれいキャラあり → 個別UIへ
      setCommands(autoFilled);
      setCommandTargets(autoTargets);
      setUiMode({ kind: 'individual' });
      setActiveId(meireiAllies[0].id);
    }
  }, [state, save, aliveAllies, buildCommandList, targetId, runTurn, play]);

  /** 作戦変更（issue #61）。applySave で即時反映。 */
  const changeStrategy = useCallback(
    (charId: string, newStrategy: Strategy) => {
      play('cursor');
      applySave((s) => ({
        ...s,
        guild: {
          ...s.guild,
          members: s.guild.members.map((m) =>
            m.id === charId ? { ...m, strategy: newStrategy } : m
          ),
        },
      }));
    },
    [applySave, play]
  );

  if (!save || !save.diveState) {
    return <Redirect to={{ name: 'town' }} />;
  }
  if (!state) return <div className={styles.layout}>戦闘準備中...</div>;

  /** 習得済みの全戦闘スキルを返す。usable=true のものを先頭に並べる。 */
  const learnedSkillsList = (ally: Combatant): { id: SkillId; usable: boolean }[] => {
    const char = save.guild.members.find((m) => m.id === ally.id);
    if (!char) return [];
    const list = Object.keys(char.learnedSkills)
      .filter((sid) => sid in BATTLE_SKILLS)
      .map((sid) => ({
        id: sid as SkillId,
        usable: ally.tp >= computeSkillTpCost(BATTLE_SKILLS[sid], ally.skillLevels?.[sid] ?? 1),
      }));
    // usable=true を上に、false を下に
    return [...list.filter((x) => x.usable), ...list.filter((x) => !x.usable)];
  };

  // 戦闘で使えるアイテム（倉庫所持 − 既消費 − このターンの予約分 > 0）
  const battleItems = (): { id: ItemId; remaining: number }[] => {
    const pending = (id: ItemId) =>
      Object.values(commands).filter((c) => c.kind === 'item' && c.itemId === id).length;
    const consumed = (id: ItemId) => state.consumedItems.filter((x) => x === id).length;
    return save.guild.storage
      .filter((s) => ITEMS[s.itemId]?.useContext?.includes('battle'))
      .map((s) => ({
        id: s.itemId,
        remaining: itemCount(save, s.itemId) - consumed(s.itemId) - pending(s.itemId),
      }))
      .filter((x) => x.remaining > 0);
  };

  const cmdLabel = (a: Combatant): string => {
    const c = commands[a.id];
    if (!c) return '';
    if (c.kind === 'attack') return '攻撃';
    if (c.kind === 'guard') return '防御';
    if (c.kind === 'item') return ITEMS[c.itemId]?.name ?? 'どうぐ';
    return BATTLE_SKILLS[c.skillId]?.name ?? 'スキル';
  };

  // 状態異常マーク（バインド=🔒 / その他=🌀）。
  const ailmentMark = (c: Combatant): string => {
    const isBind = (t: string) => t === 'headBind' || t === 'armBind' || t === 'legBind';
    let s = '';
    if (c.ailments.some((a) => isBind(a.type))) s += ' 🔒';
    if (c.ailments.some((a) => !isBind(a.type))) s += ' 🌀';
    return s;
  };

  // 味方の職業名（戦闘中も常時表示。issue #18）。
  const classNameOf = (ally: Combatant): string => {
    const char = save.guild.members.find((m) => m.id === ally.id);
    return char ? (CLASSES[char.classId]?.name ?? '') : '';
  };

  // カード右上バッジ用の頭文字 1 文字（戦士=戦/薬師=薬/魔導士=魔...）。
  // 9 職業すべて頭文字が一意のため衝突なし。
  const classInitialOf = (ally: Combatant): string => classNameOf(ally).slice(0, 1);

  // 味方の作戦短縮ラベル（issue #61）。
  const strategyShortLabelOf = (ally: Combatant): string => {
    const char = save.guild.members.find((m) => m.id === ally.id);
    const strategy: Strategy = char?.strategy ?? 'batchiri';
    return STRATEGY_SHORT_LABEL[strategy];
  };

  // 逐次再生中はログ行に紐づく HP スナップショットを表示する（issue #18）。再生外は実値。
  const dispMap: Record<string, { hp: number; isDown: boolean }> | null = anim
    ? anim.revealed > 0
      ? (state.log[anim.revealed - 1]?.snapshot ?? anim.base)
      : anim.base
    : null;
  const dispOf = (c: Combatant): { hp: number; isDown: boolean } =>
    dispMap?.[c.id] ?? { hp: c.hp, isDown: c.isDown };

  // そのキャラが発動できるユニオンスキル（種族スキルツリーのうち UNION_SKILLS に該当・習得済み）。
  const unionSkillOf = (ally: Combatant): UnionSkillDef | null => {
    const char = save.guild.members.find((m) => m.id === ally.id);
    if (!char) return null;
    const node = RACES[char.raceId]?.raceSkillTree.skills.find((n) => n.skillId in UNION_SKILLS);
    if (!node || !(node.skillId in char.learnedSkills)) return null;
    return UNION_SKILLS[node.skillId] ?? null;
  };

  // ユニオンを予約する。敵狙いは現在ターゲット、味方/自身狙いは発動者を対象に入れる。
  const reserveUnion = (actorId: string, def: UnionSkillDef, participantIds: string[]) => {
    const enemyTargeted =
      def.target === 'enemyOne' || def.target === 'enemyRow' || def.target === 'enemyAll';
    const tgt = enemyTargeted ? (targetId ?? aliveEnemies[0]?.id ?? '') : actorId;
    setUnionCmd({ actorId, unionSkillId: def.id, participantIds, targetId: tgt });
    setUnionSetup(null);
  };

  // ユニオンボタン押下: 単独発動はその場で予約、複数人は協力者選択へ。
  const onUnionPressed = (ally: Combatant, def: UnionSkillDef) => {
    if (def.requiredParticipants <= 1) {
      reserveUnion(ally.id, def, [ally.id]);
    } else {
      setUnionSetup({ actorId: ally.id, def });
    }
  };

  const active = activeId ? aliveAllies.find((a) => a.id === activeId) : undefined;
  // 味方対象選択モード: allyTargetMenu が設定されているとき。
  const isAllyTargeting = allyTargetMenu !== null;
  const reviveTargeting = allyTargetMenu !== null && skillIsRevive(allyTargetMenu);
  // 対象選択中に選べる味方（蘇生は戦闘不能のみ／その他は生存のみ）
  const allyTargetCandidates = reviveTargeting ? state.allies.filter((a) => a.isDown) : aliveAllies;
  const targetName = state.enemies.find((e) => e.id === targetId)?.name ?? '-';
  const rewards = battleRewards(state);

  // 経験値バーは戦況再生が終わったらすぐ開始する（issue #52: バーが伸び切ってからレベルアップ演出）。
  const expAnimStart = state.outcome === 'win' && !anim;

  const renderCard = (a: Combatant) => {
    const d = dispOf(a);
    // 味方対象選択中: そのキャラが選ばれているか
    const isAllyTargeted =
      isAllyTargeting && activeId !== null && commandTargets[activeId] === a.id;
    // 味方対象選択中: タップで対象選択できる（蘇生は戦闘不能のみ／その他は生存のみ）
    const isAllySelectable = isAllyTargeting && (reviveTargeting ? a.isDown : !a.isDown);
    return (
      <button
        type="button"
        key={a.id}
        className={[
          styles.card,
          d.isDown ? styles.down : '',
          isAllySelectable ? styles.allySelectable : activeId === a.id ? styles.cardActive : '',
          isAllyTargeted ? styles.allyTargeted : '',
          commands[a.id] && !isAllyTargeting ? styles.cardDecided : '',
          flashIds.has(a.id) ? styles.flash : '',
        ].join(' ')}
        disabled={
          state.outcome !== 'ongoing' ||
          !!anim ||
          (a.isDown && !(isAllyTargeting && reviveTargeting))
        }
        onClick={() => {
          if (isAllyTargeting && activeId) {
            // 味方対象選択: クリックで対象確定
            const cmd: AllyCmd = { kind: 'skill', skillId: allyTargetMenu! };
            assign(activeId, cmd, a.id);
          } else {
            setActiveId(a.id);
            setSkillMenu(false);
            setItemMenu(false);
          }
        }}
      >
        {/* InkSplatter — 被弾/回復時に重ね描画（Phase 2） */}
        {inkSplatters.has(a.id) &&
          (() => {
            const splat = inkSplatters.get(a.id)!;
            return (
              <div
                className={styles.inkOverlay}
                aria-hidden="true"
              >
                <InkSplatter
                  value={splat.value}
                  variant={splat.variant}
                  size={64}
                  onDone={() =>
                    setInkSplatters((prev) => {
                      const next = new Map(prev);
                      next.delete(a.id);
                      return next;
                    })
                  }
                />
              </div>
            );
          })()}
        {/* 職業バッジ（右上に固定） */}
        {!a.isSummon ? <span className={styles.jobBadge}>{classInitialOf(a)}</span> : null}
        {/* 立ち絵 + 名前 + 作戦短縮（横並び） */}
        <div className={styles.cardHeader}>
          {!a.isSummon &&
            (() => {
              const char = save?.guild.members.find((m) => m.id === a.id);
              return char ? (
                <CharacterPortrait
                  raceId={char.raceId}
                  classId={char.classId}
                  size={36}
                  className={styles.cardPortrait}
                />
              ) : null;
            })()}
          <div className={styles.cardHeaderText}>
            <span className={styles.cardName}>
              <span className={styles.cardNameText}>{a.name}</span>
              <span className={styles.cardMarks}>
                {a.unionGauge >= 100 ? <span className={styles.uni}>★</span> : null}
                {ailmentMark(a)}
              </span>
            </span>
            <span className={styles.cardStrategy}>{strategyShortLabelOf(a)}</span>
          </div>
        </div>
        <StatBar
          value={d.hp}
          max={a.maxHp}
          color={d.hp / a.maxHp <= 0.3 ? '#B22C2C' : '#3F6B4A'} // $vermilion / $verdant (≤30%)
          showValue={false}
        />
        <StatBar
          value={a.tp}
          max={a.maxTp}
          color="#B89255" // $illumination-gold
          showValue={false}
        />
        <div className={styles.cardNums}>
          HP {Math.max(0, d.hp)} · TP {a.tp}
        </div>
        {/* ユニオンゲージ（issue #18）。100% で発動可。 */}
        <div className={styles.gaugeRow}>
          <StatBar
            value={a.unionGauge}
            max={100}
            color="#B89255" // $illumination-gold
            showValue={false}
          />
          <span className={styles.gaugeLabel}>U {a.unionGauge}%</span>
        </div>
        <div className={styles.cardCmd}>{commands[a.id] ? `▶ ${cmdLabel(a)}` : ' '}</div>
      </button>
    );
  };

  const front = state.allies.filter((a) => a.row === 'front');
  const back = state.allies.filter((a) => a.row === 'back');

  return (
    <div className={styles.layout}>
      {/* 章マーカー */}
      <p className={styles.chapterMark}>❦ 戦闘</p>
      {/* 敵 */}
      <div className={styles.enemies}>
        {state.enemies.map((e) => {
          const d = dispOf(e);
          const isTargeted = targetId === e.id;
          const masterEnemyId = e.enemyId as EnemyId | undefined;
          const master = masterEnemyId ? ENEMIES[masterEnemyId] : undefined;
          return (
            <button
              type="button"
              key={e.id}
              className={`${styles.enemy} ${d.isDown ? styles.down : ''} ${isTargeted ? styles.targeted : ''} ${flashIds.has(e.id) ? styles.flash : ''}`}
              disabled={e.isDown || !!anim || isAllyTargeting}
              onClick={() => setTargetId(e.id)}
            >
              {/* InkSplatter — 敵への命中時（Phase 2） */}
              {inkSplatters.has(e.id) &&
                (() => {
                  const splat = inkSplatters.get(e.id)!;
                  return (
                    <div
                      className={styles.inkOverlay}
                      aria-hidden="true"
                    >
                      <InkSplatter
                        value={splat.value}
                        variant={splat.variant}
                        size={56}
                        onDone={() =>
                          setInkSplatters((prev) => {
                            const next = new Map(prev);
                            next.delete(e.id);
                            return next;
                          })
                        }
                      />
                    </div>
                  );
                })()}
              <span className={styles.enemyName}>
                <span className={styles.enemyNameText}>{e.name}</span>
                <span className={styles.enemyMarks}>{ailmentMark(e)}</span>
              </span>
              <StatBar
                value={d.hp}
                max={e.maxHp}
                color="#B22C2C" // $vermilion
                showValue={false}
              />
              {/* §16: 選択中の敵の耐性コンパクト表示 */}
              <div className={styles.enemyResist}>
                {isTargeted && master ? (
                  <ResistBadges
                    elementResist={master.resist}
                    ailmentResist={
                      masterEnemyId ? resolveEnemyAilmentResist(masterEnemyId) : undefined
                    }
                    compact
                  />
                ) : null}
              </div>
            </button>
          );
        })}
      </div>

      {/* 召喚体（最前列）。生存中のみ表示。 */}
      {state.summons.length > 0 ? (
        <div className={styles.summons}>
          {state.summons.map((s) => {
            const d = dispOf(s);
            return (
              <div
                key={s.id}
                className={`${styles.summon} ${d.isDown ? styles.down : ''} ${flashIds.has(s.id) ? styles.flash : ''}`}
              >
                <span className={styles.summonName}>🐾 {s.name}</span>
                <StatBar
                  value={d.hp}
                  max={s.maxHp}
                  color="#5A4F36" // $ink-faint
                  showValue={false}
                />
                <span className={styles.summonHp}>HP {Math.max(0, d.hp)}</span>
              </div>
            );
          })}
        </div>
      ) : null}

      {/* 味方: 前衛/後衛の2段 */}
      <div className={styles.party}>
        <div className={styles.rowTag}>前衛</div>
        <div className={styles.cardRow}>{front.map(renderCard)}</div>
        {back.length > 0 && (
          <>
            <div className={styles.rowTag}>後衛（近接ダメージ -30%）</div>
            <div className={styles.cardRow}>{back.map(renderCard)}</div>
          </>
        )}
      </div>

      {/* コマンド入力 / 実行 / 結果（再生中は再生コントロールのみ） */}
      {anim ? (
        <div className={styles.playback}>
          <span className={styles.playbackHint}>戦況を再生中…</span>
          <button
            type="button"
            className={styles.skip}
            onClick={() => {
              setAnim(null);
              setFlashIds(new Set());
            }}
          >
            ▶▶ スキップ
          </button>
        </div>
      ) : state.outcome !== 'ongoing' ? (
        <div className={styles.resultOverlay}>
          <div className={styles.result}>
            <div className={styles.resultTitle}>
              {state.outcome === 'win'
                ? '勝利！'
                : state.outcome === 'fled'
                  ? '逃走した'
                  : '全滅...'}
            </div>
            {/* 勝利時 gold InkSplatter（Phase 2） */}
            {showVictoryGold ? (
              <div
                className={styles.victoryGold}
                aria-hidden="true"
              >
                <InkSplatter
                  value={`${rewards.gold}G`}
                  variant="gold"
                  size={72}
                />
              </div>
            ) : null}
            {state.outcome === 'win' ? (
              <>
                <div className={styles.resultBody}>
                  経験値 {rewards.exp} ／ {rewards.gold} G を獲得
                </div>
                {/* 各キャラの次レベルまでの経験値バー（issue #50） */}
                <div className={styles.expList}>
                  {expResults.map((r) => (
                    <div
                      key={r.charId}
                      className={styles.expRow}
                    >
                      <span className={styles.expName}>
                        <span className={styles.expNameText}>{r.name}</span>
                        <span className={styles.expLv}>
                          {r.toLevel > r.fromLevel ? (
                            <span className={styles.expUp}>
                              Lv{r.fromLevel}→{r.toLevel}（↑{r.toLevel - r.fromLevel}）
                            </span>
                          ) : (
                            <>Lv{r.toLevel}</>
                          )}
                        </span>
                      </span>
                      <BattleExpBar
                        fromLevel={r.fromLevel}
                        fromExp={r.fromExp}
                        gainedExp={r.gainedExp}
                        start={expAnimStart}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : state.outcome === 'lose' ? (
              <div className={styles.resultBody}>拠点へ帰還する</div>
            ) : null}
            <button
              type="button"
              className={styles.primary}
              disabled={busy || levelQueue.length > 0 || (expAnimStart && !expDone)}
              onClick={() => void finish(state)}
            >
              つづける
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.command}>
          {/* 対象表示: global / individual フェーズで表示。作戦変更時は隠す */}
          {uiMode.kind !== 'strategy' &&
            (isAllyTargeting ? (
              <div className={`${styles.target} ${styles.targetAlly}`}>
                {BATTLE_SKILLS[allyTargetMenu!]?.name ?? 'スキル'}: 味方をタップで対象を選択
              </div>
            ) : (
              <div className={styles.target}>
                <span className={styles.targetMark}>❦ 対象</span>
                <span>
                  <span className={styles.targetName}>{targetName}</span>
                  <span className={styles.targetHint}>（敵をタップで変更）</span>
                </span>
              </div>
            ))}

          {/* ---- 全体行動選択UI（uiMode.kind === 'global'） ---- */}
          {uiMode.kind === 'global' && (
            <>
              {unionCmd
                ? (() => {
                    const def = UNION_SKILLS[unionCmd.unionSkillId];
                    return (
                      <div className={styles.unionBanner}>
                        <div className={styles.unionBannerHead}>
                          ⚡ ユニオン予約: {def?.name}
                          <button
                            type="button"
                            className={styles.unionCancel}
                            onClick={() => setUnionCmd(null)}
                          >
                            取消
                          </button>
                        </div>
                        {def ? (
                          <div className={styles.unionBannerDesc}>
                            {skillSummary(
                              def.element,
                              def.target,
                              def.effects,
                              state.allies.find((a) => a.id === unionCmd.actorId)?.skillLevels?.[
                                unionCmd.unionSkillId
                              ] ?? 1
                            )}
                            <br />
                            {def.description}
                          </div>
                        ) : null}
                      </div>
                    );
                  })()
                : null}
              <div className={styles.cmdHead}>全体行動</div>
              <div className={styles.menu}>
                <button
                  type="button"
                  className={styles.menuBtn}
                  onClick={onClickFight}
                >
                  たたかう
                </button>
                <button
                  type="button"
                  className={styles.menuBtn}
                  onClick={() => setUiMode({ kind: 'strategy' })}
                >
                  さくせん
                </button>
                <button
                  type="button"
                  className={styles.menuBtn}
                  onClick={handleFlee}
                >
                  にげる
                </button>
              </div>
            </>
          )}

          {/* ---- 個別行動選択UI（uiMode.kind === 'individual'） ---- */}
          {uiMode.kind === 'individual' && (
            <>
              {unionCmd
                ? (() => {
                    const def = UNION_SKILLS[unionCmd.unionSkillId];
                    return (
                      <div className={styles.unionBanner}>
                        <div className={styles.unionBannerHead}>
                          ⚡ ユニオン予約: {def?.name}
                          <button
                            type="button"
                            className={styles.unionCancel}
                            onClick={() => setUnionCmd(null)}
                          >
                            取消
                          </button>
                        </div>
                        {def ? (
                          <div className={styles.unionBannerDesc}>
                            {skillSummary(
                              def.element,
                              def.target,
                              def.effects,
                              state.allies.find((a) => a.id === unionCmd.actorId)?.skillLevels?.[
                                unionCmd.unionSkillId
                              ] ?? 1
                            )}
                            <br />
                            {def.description}
                          </div>
                        ) : null}
                      </div>
                    );
                  })()
                : null}
              {active ? (
                <>
                  <div className={styles.cmdHead}>{active.name} のコマンド</div>
                  {allyTargetMenu ? (
                    // 味方単体スキルの対象選択フェーズ（カードをタップで選択）
                    <div className={styles.skillList}>
                      <div className={styles.allyTargetHint}>
                        <strong>{BATTLE_SKILLS[allyTargetMenu]?.name}</strong> の対象を選択
                        <br />
                        <span className={styles.allyTargetSub}>
                          上の味方カードをタップしてください
                        </span>
                      </div>
                      {allyTargetCandidates.map((a) => (
                        <button
                          type="button"
                          key={a.id}
                          className={[
                            styles.skillBtn,
                            commandTargets[active.id] === a.id ? styles.allyTargetSelected : '',
                          ].join(' ')}
                          onClick={() => {
                            assign(active.id, { kind: 'skill', skillId: allyTargetMenu }, a.id);
                          }}
                        >
                          <span className={styles.skillTop}>
                            <span className={styles.skillName}>{a.name}</span>
                            <span className={styles.tp}>
                              HP {Math.max(0, dispOf(a).hp)}/{a.maxHp}
                            </span>
                          </span>
                        </button>
                      ))}
                      <button
                        type="button"
                        className={styles.menuBack}
                        onClick={() => {
                          setAllyTargetMenu(null);
                          // 選択中コマンドも未決定に戻す
                          setCommands((prev) => {
                            const next = { ...prev };
                            delete next[active.id];
                            return next;
                          });
                        }}
                      >
                        もどる
                      </button>
                    </div>
                  ) : skillMenu ? (
                    <div className={styles.skillList}>
                      {learnedSkillsList(active).map(({ id: sid, usable }) => (
                        <button
                          type="button"
                          key={sid}
                          className={[styles.skillBtn, !usable ? styles.skillBtnDisabled : ''].join(
                            ' '
                          )}
                          disabled={!usable}
                          onClick={() => assign(active.id, { kind: 'skill', skillId: sid })}
                        >
                          <span className={styles.skillTop}>
                            <span className={styles.skillName}>{BATTLE_SKILLS[sid].name}</span>
                            <span className={styles.tp}>
                              TP{' '}
                              {computeSkillTpCost(
                                BATTLE_SKILLS[sid],
                                active.skillLevels?.[sid] ?? 1
                              )}
                            </span>
                          </span>
                          <span className={styles.skillSummary}>
                            {skillSummary(
                              BATTLE_SKILLS[sid].element,
                              BATTLE_SKILLS[sid].target,
                              BATTLE_SKILLS[sid].effects,
                              active.skillLevels?.[sid] ?? 1
                            )}
                          </span>
                        </button>
                      ))}
                      {learnedSkillsList(active).length === 0 ? (
                        <div className={styles.empty}>学んでいるスキルがありません</div>
                      ) : null}
                      <button
                        type="button"
                        className={styles.menuBack}
                        onClick={() => setSkillMenu(false)}
                      >
                        もどる
                      </button>
                    </div>
                  ) : itemMenu ? (
                    <div className={styles.skillList}>
                      {battleItems().map(({ id, remaining }) => (
                        <button
                          type="button"
                          key={id}
                          className={styles.skillBtn}
                          onClick={() => assign(active.id, { kind: 'item', itemId: id })}
                        >
                          <span className={styles.skillTop}>
                            <span className={styles.skillName}>
                              {ITEMS[id].name} ×{remaining}
                            </span>
                          </span>
                          <span className={styles.skillDesc}>{ITEMS[id].description}</span>
                        </button>
                      ))}
                      {battleItems().length === 0 ? (
                        <div className={styles.empty}>使える道具がない</div>
                      ) : null}
                      <button
                        type="button"
                        className={styles.menuBack}
                        onClick={() => setItemMenu(false)}
                      >
                        もどる
                      </button>
                    </div>
                  ) : unionSetup ? (
                    <div className={styles.skillList}>
                      <div className={styles.unionHint}>
                        <strong>{unionSetup.def.name}</strong>
                        <br />
                        {skillSummary(
                          unionSetup.def.element,
                          unionSetup.def.target,
                          unionSetup.def.effects,
                          state.allies.find((a) => a.id === unionSetup.actorId)?.skillLevels?.[
                            unionSetup.def.id
                          ] ?? 1
                        )}
                        <br />
                        {unionSetup.def.description}
                        <br />
                        協力者を選択（あと{unionSetup.def.requiredParticipants - 1}人。各自ゲージ
                        {unionSetup.def.gaugeCostPerParticipant}消費）
                      </div>
                      {aliveAllies
                        .filter((a) => a.id !== unionSetup.actorId)
                        .map((a) => (
                          <button
                            type="button"
                            key={a.id}
                            className={styles.skillBtn}
                            onClick={() =>
                              reserveUnion(unionSetup.actorId, unionSetup.def, [
                                unionSetup.actorId,
                                a.id,
                              ])
                            }
                          >
                            <span className={styles.skillTop}>
                              <span className={styles.skillName}>{a.name}</span>
                              <span className={styles.tp}>ゲージ {a.unionGauge}</span>
                            </span>
                          </button>
                        ))}
                      {aliveAllies.filter((a) => a.id !== unionSetup.actorId).length === 0 ? (
                        <div className={styles.empty}>協力できる味方がいない</div>
                      ) : null}
                      <button
                        type="button"
                        className={styles.menuBack}
                        onClick={() => setUnionSetup(null)}
                      >
                        もどる
                      </button>
                    </div>
                  ) : (
                    <>
                      {(() => {
                        const def = unionSkillOf(active);
                        if (!def || active.unionGauge < 100 || unionCmd) return null;
                        return (
                          <div className={styles.unionInfo}>
                            ⚡ <strong>{def.name}</strong> 発動可（ゲージ100%）
                            <br />
                            {skillSummary(
                              def.element,
                              def.target,
                              def.effects,
                              active.skillLevels?.[def.id] ?? 1
                            )}
                          </div>
                        );
                      })()}
                      <div className={styles.menu}>
                        <button
                          type="button"
                          className={styles.menuBtn}
                          onClick={() => assign(active.id, { kind: 'attack' })}
                        >
                          攻撃
                        </button>
                        <button
                          type="button"
                          className={styles.menuBtn}
                          onClick={() => assign(active.id, { kind: 'guard' })}
                        >
                          防御
                        </button>
                        <button
                          type="button"
                          className={styles.menuBtn}
                          disabled={learnedSkillsList(active).length === 0}
                          onClick={() => setSkillMenu(true)}
                        >
                          スキル
                        </button>
                        <button
                          type="button"
                          className={styles.menuBtn}
                          disabled={battleItems().length === 0}
                          onClick={() => setItemMenu(true)}
                        >
                          どうぐ
                        </button>
                        {(() => {
                          const def = unionSkillOf(active);
                          if (!def || active.unionGauge < 100 || unionCmd) return null;
                          return (
                            <button
                              type="button"
                              className={`${styles.menuBtn} ${styles.unionBtn}`}
                              onClick={() => onUnionPressed(active, def)}
                            >
                              ⚡ユニオン
                            </button>
                          );
                        })()}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className={styles.execRow}>
                  <button
                    type="button"
                    className={styles.redo}
                    onClick={resetInput}
                  >
                    やり直す
                  </button>
                  <button
                    type="button"
                    className={styles.primary}
                    disabled={!allAssigned}
                    onClick={handleResolve}
                  >
                    実行
                  </button>
                </div>
              )}
            </>
          )}

          {/* ---- 作戦変更UI（uiMode.kind === 'strategy'） ---- */}
          {uiMode.kind === 'strategy' && (
            <>
              <div className={styles.cmdHead}>作戦変更</div>
              <div className={styles.strategyList}>
                {aliveAllies.map((a) => {
                  const ch = save.guild.members.find((m) => m.id === a.id);
                  const cur: Strategy = ch?.strategy ?? 'batchiri';
                  return (
                    <div
                      key={a.id}
                      className={styles.strategyRow}
                    >
                      <div className={styles.strategyAllyHead}>
                        {ch && (
                          <CharacterPortrait
                            raceId={ch.raceId}
                            classId={ch.classId}
                            size={28}
                          />
                        )}
                        <div className={styles.strategyAllyName}>{a.name}</div>
                      </div>
                      <div className={styles.strategyButtons}>
                        {STRATEGY_LIST.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            className={cur === s.id ? styles.strategyOn : styles.strategyOff}
                            onClick={() => changeStrategy(a.id, s.id)}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
                <button
                  type="button"
                  className={styles.menuBack}
                  onClick={() => setUiMode({ kind: 'global' })}
                >
                  もどる
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* 戦闘ログ（インライン 3 行プレビュー）。タップで全履歴オーバーレイ。
          再生中は revealed 行までを順に表示する。 */}
      <button
        type="button"
        className={styles.log}
        onClick={() => setLogOpen(true)}
        aria-label="戦闘ログの全履歴を見る"
      >
        <div className={styles.logHeader}>
          <span>戦闘ログ</span>
          <span className={styles.logHeaderHint}>タップで全履歴</span>
        </div>
        <div className={styles.logBody}>
          {(() => {
            const visible = anim ? state.log.slice(0, anim.revealed) : state.log;
            if (visible.length === 0) {
              return (
                <div className={styles.logLine}>てきが あらわれた！（{state.turn} ターン目）</div>
              );
            }
            // 最新 3 行のみインライン表示
            return visible.slice(-3).map((l, i, arr) => (
              <div
                key={visible.length - arr.length + i}
                className={`${styles.logLine} ${anim && i === arr.length - 1 ? styles.logLineNew : ''}`}
              >
                {l.text}
              </div>
            ));
          })()}
        </div>
      </button>

      {/* 戦闘ログの全履歴オーバーレイ */}
      {logOpen ? (
        <div
          className={styles.logOverlayBackdrop}
          onClick={() => setLogOpen(false)}
        >
          <div
            className={styles.logOverlay}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.logOverlayHeader}>
              <span>❦ 戦闘ログ</span>
              <button
                type="button"
                className={styles.logOverlayClose}
                onClick={() => setLogOpen(false)}
                aria-label="戦闘ログを閉じる"
              >
                ✕
              </button>
            </div>
            <div className={styles.logOverlayBody}>
              {(() => {
                const visible = anim ? state.log.slice(0, anim.revealed) : state.log;
                if (visible.length === 0) {
                  return (
                    <div className={styles.logLine}>
                      てきが あらわれた！（{state.turn} ターン目）
                    </div>
                  );
                }
                return visible.map((l, i) => (
                  <div
                    key={i}
                    className={styles.logLine}
                  >
                    {l.text}
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      ) : null}

      {/* レベルアップダイアログ（issue #18）。レベルアップしたキャラを順に表示する。 */}
      {levelQueue.length > 0
        ? (() => {
            const r = levelQueue[0];
            return (
              <div className={styles.dialogOverlay}>
                <div className={styles.dialog}>
                  {/* レベルアップ gold InkSplatter（Phase 2） */}
                  <div
                    className={styles.levelUpGold}
                    aria-hidden="true"
                  >
                    <InkSplatter
                      value={`Lv${r.toLevel}`}
                      variant="gold"
                      size={72}
                    />
                  </div>
                  <div className={styles.dialogTitle}>レベルアップ！</div>
                  <div className={styles.dialogName}>
                    {r.name} は Lv{r.fromLevel} → <strong>Lv{r.toLevel}</strong> になった！
                  </div>
                  <div className={styles.dialogStats}>
                    {Object.entries(r.statGains).map(([k, v]) => (
                      <span
                        key={k}
                        className={styles.dialogStat}
                      >
                        {STAT_LABEL[k] ?? k} +{v}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className={styles.primary}
                    onClick={() => setLevelQueue((q) => q.slice(1))}
                  >
                    OK
                  </button>
                </div>
              </div>
            );
          })()
        : null}

      {/* エンカウント/戦闘終了の暗転エフェクト（issue #18） */}
      {introFx ? <div className={styles.fxIntro} /> : null}
      {outroFx ? (
        <div className={`${styles.fxOutro} ${outroFx === 'lose' ? styles.fxLose : ''}`} />
      ) : null}
    </div>
  );
};
