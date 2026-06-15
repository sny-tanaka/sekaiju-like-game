import { BALANCE, canGainExp, enemyScale, expToNext, spGainOnLevelUp } from '@/data/balance';
import { BATTLE_SKILLS } from '@/data/battleSkills';
import { ENEMIES } from '@/data/enemies';
import { EQUIPMENT } from '@/data/equipment';
import { ITEMS } from '@/data/items';
import { SUMMONS } from '@/data/summons';
import { UNION_SKILLS } from '@/data/unionSkills';
import { computeDamage, effectiveEnemyStats, scaleStats } from '@/domain/combat';
import { enemyLapForDepth } from '@/domain/encounterTable';
import { forgeBonusFor, gradedBaseBonuses } from '@/domain/forge';
import { addItem, removeItem } from '@/domain/inventory';
import { computePassiveMods } from '@/domain/passives';
import { computeBaseStats } from '@/domain/stats';
import type {
  ActiveAilment,
  ActiveBuff,
  AilmentType,
  BattleCommand,
  BattleLogEntry,
  BattleSkillDef,
  BattleState,
  Character,
  Combatant,
  CombatState,
  Element,
  EnemyId,
  EquipBonuses,
  FirstStrike,
  Rng,
  SaveData,
  SkillEffectDef,
  StatKey,
  Stats,
  SummonKind,
  TargetType,
} from '@/domain/types';

/** 召喚体の同時最大数（[03 §8]）。 */
const MAX_SUMMONS = 3;

// ============================================================================
// ターン制戦闘エンジン（設計書 03）。すべて純関数・乱数注入でテスト再現可能。
// 一括入力型: 味方コマンド＋敵AI を AGI 順に解決し、状態異常/バフを更新して勝敗判定。
// BattleState は保存しない（開始時に SaveData から生成、終了時に結果を書き戻す）。
// ============================================================================

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

/** 状態異常の表示名（ログ用）。 */
const AILMENT_LABEL: Record<AilmentType, string> = {
  poison: '毒',
  paralysis: '麻痺',
  sleep: '睡眠',
  confusion: '混乱',
  curse: '呪い',
  blind: '盲目',
  instantDeath: '即死',
  headBind: '頭封じ',
  armBind: '腕封じ',
  legBind: '脚封じ',
};

/** 装備のフラットボーナスを合算（[04]）。 */
function aggregateEquip(char: Character): EquipBonuses {
  const acc: Required<Pick<EquipBonuses, 'atk' | 'mat' | 'def' | 'mdf'>> = {
    atk: 0,
    mat: 0,
    def: 0,
    mdf: 0,
  };
  for (const inst of Object.values(char.equipment)) {
    if (!inst) continue;
    const eq = EQUIPMENT[inst.masterId];
    if (!eq) continue;
    const base = gradedBaseBonuses(inst.masterId, inst.grade); // 周回グレードで基礎を倍化（[06 §3]）
    const forge = forgeBonusFor(inst.masterId, inst.forgeLevel); // 鍛冶 +N 反映（[04 §4]）
    acc.atk += (base.atk ?? 0) + (forge.atk ?? 0);
    acc.mat += (base.mat ?? 0) + (forge.mat ?? 0);
    acc.def += (base.def ?? 0) + (forge.def ?? 0);
    acc.mdf += (base.mdf ?? 0) + (forge.mdf ?? 0);
  }
  return acc;
}

/** 味方の戦闘員を組む。HP/TP/ゲージ/状態異常は diveState の現在値を引き継ぐ。 */
function buildAlly(save: SaveData, charId: string): Combatant | null {
  const char = save.guild.members.find((m) => m.id === charId);
  if (!char) return null;
  const member = save.diveState?.party.find((p) => p.charId === charId);
  const stats = computeBaseStats(char);
  // パッシブ常時効果（[03 §5.4]）。最大HP/TP はここで反映し、攻防系は Combatant.passive 経由で派生計算に乗せる。
  const passive = computePassiveMods(char);
  const maxHp = Math.round(stats.hp * (passive.maxHp ?? 1));
  const maxTp = Math.round(stats.tp * (passive.maxTp ?? 1));
  const front = save.guild.party.front.includes(charId);
  return {
    id: charId,
    name: char.name,
    side: 'ally',
    row: front ? 'front' : 'back',
    stats,
    equip: aggregateEquip(char),
    hp: member ? Math.min(member.hp, maxHp) : maxHp,
    maxHp,
    tp: member ? Math.min(member.tp, maxTp) : maxTp,
    maxTp,
    buffs: [],
    ailments: member ? [...member.ailments] : [],
    states: [],
    passive,
    unionGauge: member?.unionGauge ?? 0,
    isDown: member ? member.hp <= 0 : false,
  };
}

/** 敵の戦闘員を組む（出現階でスケール）。2周目以降は名前に LvN（周回数）を付す（[06 §3]）。 */
function buildEnemy(enemyId: EnemyId, index: number, depth: number): Combatant {
  const master = ENEMIES[enemyId];
  const stats = effectiveEnemyStats(master, depth);
  const lap = enemyLapForDepth(depth);
  return {
    id: `enemy_${index}`,
    name: lap >= 2 ? `${master.name} Lv${lap}` : master.name,
    side: 'enemy',
    row: 'front',
    stats,
    equip: {},
    hp: stats.hp,
    maxHp: stats.hp,
    tp: stats.tp,
    maxTp: stats.tp,
    buffs: [],
    ailments: [],
    unionGauge: 0,
    isDown: false,
    enemyId,
    resist: master.resist,
  };
}

/** 召喚体の戦闘員を組む（[03 §8]・出現階でスケール）。味方側・最前列扱い。 */
function buildSummon(
  kind: SummonKind,
  depth: number,
  ownerId: string,
  instanceId: string,
  hp?: number
): Combatant {
  const m = SUMMONS[kind];
  const stats = scaleStats(m.baseStats, enemyScale(depth, m.refDepth));
  const cur = hp ?? stats.hp;
  return {
    id: instanceId,
    name: m.name,
    side: 'ally',
    row: 'front',
    stats,
    equip: {},
    hp: cur,
    maxHp: stats.hp,
    tp: 0,
    maxTp: 0,
    buffs: [],
    ailments: [],
    unionGauge: 0,
    isDown: cur <= 0,
    isSummon: true,
    summonKind: kind,
    ownerId,
  };
}

/**
 * 戦闘を開始し BattleState を生成する。出撃中の編成メンバーが味方になる。
 * firstStrike は FOE 接触時の先手（[03 §10]）。ランダムエンカウントは 'none'。
 */
export function startBattle(
  save: SaveData,
  enemyIds: EnemyId[],
  firstStrike: FirstStrike = 'none'
): BattleState {
  const depth = save.diveState?.depth ?? 1;
  const partyIds = [...save.guild.party.front, ...save.guild.party.back].filter(
    (id): id is string => id !== null
  );
  const allies = partyIds
    .map((id) => buildAlly(save, id))
    .filter((c): c is Combatant => c !== null);
  const enemies = enemyIds.map((id, i) => buildEnemy(id, i, depth));
  // 戦闘をまたいで残る召喚体（[03 §8]）を復元する。
  const summons = (save.diveState?.persistentSummons ?? [])
    .map((snap, i) =>
      buildSummon(snap.summonKind, depth, snap.ownerId, `summon_persist_${i}`, snap.hp)
    )
    .filter((s) => !s.isDown);
  return {
    turn: 1,
    depth,
    allies,
    enemies,
    summons,
    log: [],
    outcome: 'ongoing',
    firstStrike,
    drops: [],
    consumedItems: [],
  };
}

// ---- 効果適用ヘルパ -------------------------------------------------------

const aliveSide = (state: BattleState, side: 'ally' | 'enemy') =>
  (side === 'ally' ? state.allies : state.enemies).filter((c) => !c.isDown);

/** 生存中の召喚体（[03 §8]）。最前列の壁/攻撃役。 */
const aliveSummons = (state: BattleState) => state.summons.filter((c) => !c.isDown);

function find(state: BattleState, id: string): Combatant | undefined {
  return (
    state.allies.find((c) => c.id === id) ??
    state.enemies.find((c) => c.id === id) ??
    state.summons.find((c) => c.id === id)
  );
}

/** 召喚体で強化弱体が無効な個体か（[03 §8] buffImmune）。 */
const isBuffImmune = (c: Combatant): boolean =>
  !!c.isSummon && !!c.summonKind && SUMMONS[c.summonKind]?.buffImmune;

const elementMult = (target: Combatant, element: Element): number => target.resist?.[element] ?? 1;

function dealDamage(target: Combatant, dmg: number, log: BattleState['log']): void {
  target.hp = clamp(target.hp - dmg, 0, target.maxHp);
  // 睡眠は被ダメージで解除（[03 §6]）。
  if (dmg > 0 && target.ailments.some((a) => a.type === 'sleep')) {
    target.ailments = target.ailments.filter((a) => a.type !== 'sleep');
    log.push({ text: `${target.name} は目を覚ました` });
  }
  if (target.hp === 0 && !target.isDown) {
    target.isDown = true;
    target.unionGauge = Math.floor(target.unionGauge / 2); // 戦闘不能で保有ゲージ半減
    log.push({ text: `${target.name} は倒れた！` });
  }
}

function gainUnion(c: Combatant, amount: number): void {
  if (c.isDown) return;
  c.unionGauge = clamp(c.unionGauge + amount, 0, 100);
}

function addBuff(target: Combatant, buff: ActiveBuff): void {
  if (isBuffImmune(target)) return; // buffImmune な召喚体には効かない（[03 §8]）
  // 同 (stat, stackGroup) は1つに（リフレッシュ）
  target.buffs = target.buffs.filter(
    (b) => !(b.stat === buff.stat && b.stackGroup === buff.stackGroup)
  );
  target.buffs.push(buff);
}

function applyAilment(target: Combatant, a: ActiveAilment): void {
  if (isBuffImmune(target)) return; // buffImmune な召喚体には状態異常も効かない（[03 §8]）
  const existing = target.ailments.find((x) => x.type === a.type);
  if (existing) {
    existing.remainingTurns = Math.max(existing.remainingTurns, a.remainingTurns);
    return;
  }
  target.ailments.push(a);
}

/** 反応系の戦闘状態を付与する（[03 §6.5]）。同種は1つに（リフレッシュ）。buffImmune 個体には効かない。 */
function addState(target: Combatant, st: CombatState): void {
  if (isBuffImmune(target)) return;
  target.states = [...(target.states ?? []).filter((s) => s.kind !== st.kind), st];
}

/** 同陣営の味方（味方側なら召喚体も含む）。連携追撃の発動者探索に使う。 */
function sameSide(state: BattleState, c: Combatant): Combatant[] {
  return c.side === 'ally'
    ? [...aliveSide(state, 'ally'), ...aliveSummons(state)]
    : aliveSide(state, 'enemy');
}

/**
 * 障壁（[03 §6.5]）。被弾ダメージを総量 absorb まで肩代わりする。残量を消費し、尽きたら解除。
 * 返り値は障壁適用後の実ダメージ。
 */
function consumeBarrier(target: Combatant, dmg: number, log: BattleState['log']): number {
  const st = (target.states ?? []).find((s) => s.kind === 'barrier' && s.absorb > 0);
  if (!st || st.kind !== 'barrier') return dmg;
  const absorbed = Math.min(st.absorb, dmg);
  st.absorb -= absorbed;
  if (absorbed > 0) log.push({ text: `${target.name} は障壁で ${absorbed} のダメージを防いだ` });
  if (st.absorb <= 0) target.states = (target.states ?? []).filter((s) => s !== st);
  return dmg - absorbed;
}

/**
 * 物理/魔法1ヒットを解決する（[03 §7]）。命中判定→障壁→ダメージ→ユニオン。
 * 反応（反撃/連携追撃）は発火しない。呼び出し側が「行動（スキル/通常攻撃）単位」で
 * 対象ごとに1回だけ triggerReactions を呼ぶ（多段ヒットでの過剰発動を防ぐ。[03 §6.5]）。
 * 返り値: 命中したか・実ダメージ。
 */
function strikeOnce(
  state: BattleState,
  actor: Combatant,
  target: Combatant,
  p: { statBase: 'str' | 'int'; power: number; element: Element },
  rng: Rng,
  opts: { actorUnion?: number } = {}
): { hit: boolean; dealt: number } {
  if (target.isDown) return { hit: false, dealt: 0 };
  const res = computeDamage(
    actor,
    target,
    {
      statBase: p.statBase,
      power: p.power,
      element: p.element,
      elementMultiplier: elementMult(target, p.element),
    },
    rng
  );
  if (!res.hit) {
    state.log.push({ text: `${actor.name} の攻撃は外れた` });
    return { hit: false, dealt: 0 };
  }
  const dealt = consumeBarrier(target, res.damage, state.log);
  dealDamage(target, dealt, state.log);
  if (opts.actorUnion) gainUnion(actor, opts.actorUnion);
  gainUnion(target, 5);
  // 障壁で全吸収（dealt=0）した場合はダメージログを省く（「障壁で防いだ」は consumeBarrier で出力済み）。
  if (dealt > 0) {
    state.log.push({
      text: `${actor.name} の攻撃！ ${target.name} に ${dealt} ダメージ${res.critical ? '（会心）' : ''}`,
    });
  }
  return { hit: true, dealt };
}

/**
 * 被弾に対する反応を「行動（スキル/通常攻撃）×対象」単位で1回解決する（[03 §6.5]）。
 * - 反撃（counter）: 被弾した target が生存し攻撃者と敵対していれば確率で反撃。
 * - 連携追撃（chase）: 攻撃側の味方が同属性 chase を持つなら、被弾した敵へ追撃。
 * 反応由来の追加打（strikeOnce）はここからは反応を再発火しないため連鎖しない。
 */
function triggerReactions(
  state: BattleState,
  attacker: Combatant,
  target: Combatant,
  element: Element,
  dealt: number,
  rng: Rng
): void {
  // 反撃: target → attacker
  if (!target.isDown && !attacker.isDown && target.side !== attacker.side) {
    for (const st of target.states ?? []) {
      if (st.kind !== 'counter') continue;
      if (rng.next() >= st.chance) continue;
      state.log.push({ text: `${target.name} の反撃！` });
      const el: Element = st.statBase === 'str' ? 'bash' : 'almighty';
      strikeOnce(
        state,
        target,
        attacker,
        { statBase: st.statBase, power: st.power, element: el },
        rng
      );
      if (attacker.isDown) break;
    }
  }
  // 連携追撃: 攻撃側の味方 chase 持ち → 被弾した敵
  if (dealt > 0 && target.side !== attacker.side) {
    for (const ch of sameSide(state, attacker)) {
      if (ch.id === attacker.id || ch.isDown || target.isDown) continue;
      for (const st of ch.states ?? []) {
        if (st.kind !== 'chase') continue;
        if (st.element !== element && st.element !== 'almighty' && element !== 'almighty') continue;
        state.log.push({ text: `${ch.name} の連携追撃！` });
        strikeOnce(
          state,
          ch,
          target,
          { statBase: st.statBase, power: st.power, element: st.element },
          rng
        );
      }
    }
  }
}

/** 状態異常の付与確率（[03 §6.2]）。 */
function ailmentChance(base: number, attacker: Combatant, defender: Combatant): number {
  return clamp(
    base * (1 + (attacker.stats.luc - defender.stats.luc) * BALANCE.AILMENT_LUC_K),
    0,
    BALANCE.AILMENT_MAX
  );
}

/**
 * target 種別から対象 Combatant を解決する（通常スキル・ユニオン共通）。
 * allyOne は actor と同陣営、enemyOne/Row は敵陣営に限定する（誤対象＝味方を攻撃/敵を回復 を防ぐ）。
 * allyAll は味方側のとき召喚体も含む（[03 §8]：召喚体はバフ/回復対象になりうる。buffImmune 個体は addBuff 側で弾く）。
 * 対象 ID が不正なら安全側にフォールバック（単体回復＝自分 / 単体攻撃＝生存敵の先頭）。
 */
function resolveTargets(
  state: BattleState,
  actor: Combatant,
  target: TargetType,
  targetId: string
): Combatant[] {
  const oppSide = actor.side === 'ally' ? 'enemy' : 'ally';
  switch (target) {
    case 'self':
      return [actor];
    case 'allyAll':
      return actor.side === 'ally'
        ? [...aliveSide(state, 'ally'), ...aliveSummons(state)]
        : aliveSide(state, 'enemy');
    case 'allyOne': {
      const t = find(state, targetId);
      return t && t.side === actor.side ? [t] : [actor];
    }
    case 'enemyAll':
      return aliveSide(state, oppSide);
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const t = find(state, targetId);
      if (t && t.side === oppSide && !t.isDown) return [t];
      return aliveSide(state, oppSide).slice(0, 1);
    }
  }
}

function skillTargets(
  state: BattleState,
  actor: Combatant,
  def: BattleSkillDef,
  targetId: string
): Combatant[] {
  return resolveTargets(state, actor, def.target, targetId);
}

function applySkillEffect(
  state: BattleState,
  actor: Combatant,
  effect: SkillEffectDef,
  element: Element,
  level: number,
  targets: Combatant[],
  rng: Rng
): void {
  switch (effect.kind) {
    case 'damage': {
      const hits = effect.hits ?? 1;
      const power = effect.power(level);
      for (const target of targets) {
        if (target.isDown) continue;
        let landed = false;
        let total = 0;
        for (let h = 0; h < hits; h++) {
          if (target.isDown) break;
          const r = strikeOnce(
            state,
            actor,
            target,
            { statBase: effect.statBase, power, element },
            rng
          );
          if (r.hit) {
            landed = true;
            total += r.dealt;
          }
        }
        // 反応は「スキル×対象」単位で1回（多段でも追撃/反撃は1回。[03 §6.5]）。
        if (landed) triggerReactions(state, actor, target, element, total, rng);
      }
      break;
    }
    case 'heal': {
      const amount = effect.amount(level);
      for (const target of targets) {
        if (target.isDown) continue;
        target.hp = clamp(target.hp + amount, 0, target.maxHp);
      }
      state.log.push({ text: `${actor.name} は回復魔法を使った（+${amount}）` });
      break;
    }
    case 'buff': {
      for (const target of targets) {
        addBuff(target, {
          stat: effect.stat,
          modifier: effect.modifier(level),
          remainingTurns: effect.turns,
          stackGroup: effect.stackGroup,
        });
      }
      state.log.push({ text: `${actor.name} は態勢を整えた` });
      break;
    }
    case 'ailment': {
      for (const target of targets) {
        if (target.isDown) continue;
        const chance = ailmentChance(effect.chance(level), actor, target);
        if (rng.next() < chance) {
          applyAilment(target, {
            type: effect.ailment,
            remainingTurns: effect.turns,
            magnitude: effect.magnitude,
          });
          state.log.push({ text: `${target.name} は${AILMENT_LABEL[effect.ailment]}になった` });
        }
      }
      break;
    }
    case 'summon': {
      if (actor.side !== 'ally') break; // 召喚は味方専用（敵が summon 効果を持っても味方側を生まない）
      if (aliveSummons(state).length >= MAX_SUMMONS) {
        state.log.push({ text: 'これ以上は召喚できない' });
        break;
      }
      const id = `summon_${state.turn}_${state.summons.length}`;
      const s = buildSummon(effect.summonKind, state.depth, actor.id, id);
      state.summons.push(s);
      state.log.push({ text: `${actor.name} は ${s.name} を召喚した！` });
      break;
    }
    case 'counter': {
      for (const target of targets) {
        if (target.isDown) continue;
        addState(target, {
          kind: 'counter',
          chance: effect.chance(level),
          power: effect.power(level),
          statBase: effect.statBase,
          remainingTurns: effect.turns,
        });
      }
      state.log.push({ text: `${actor.name} は反撃の構えを取った` });
      break;
    }
    case 'chase': {
      for (const target of targets) {
        if (target.isDown) continue;
        addState(target, {
          kind: 'chase',
          element, // このスキルの属性に反応して追撃する
          power: effect.power(level),
          statBase: effect.statBase,
          remainingTurns: effect.turns,
        });
      }
      state.log.push({ text: `${actor.name} は連携の構えを取った` });
      break;
    }
    case 'decoy': {
      for (const target of targets) {
        if (target.isDown) continue;
        addState(target, {
          kind: 'decoy',
          weight: effect.weight(level),
          remainingTurns: effect.turns,
        });
      }
      state.log.push({ text: `${actor.name} は敵の注意を引きつけた` });
      break;
    }
    case 'barrier': {
      for (const target of targets) {
        if (target.isDown) continue;
        addState(target, {
          kind: 'barrier',
          absorb: effect.absorb(level),
          remainingTurns: effect.turns,
        });
      }
      state.log.push({ text: `${actor.name} は守りの障壁を張った` });
      break;
    }
    case 'cleanse': {
      for (const target of targets) {
        if (target.isDown || target.ailments.length === 0) continue;
        target.ailments = [];
        state.log.push({ text: `${target.name} の状態異常が治療された` });
      }
      break;
    }
    default:
      break;
  }
}

/** 通常攻撃（物理・武器属性 or 素手 bash）。反撃/連携追撃の対象になる（[03 §6.5]）。 */
function basicAttack(state: BattleState, actor: Combatant, target: Combatant, rng: Rng): void {
  if (target.isDown) return;
  const element: Element = actor.enemyId
    ? (ENEMIES[actor.enemyId].attackElement ?? 'bash')
    : actor.isSummon && actor.summonKind
      ? (SUMMONS[actor.summonKind]?.attackElement ?? 'bash')
      : 'bash';
  const r = strikeOnce(state, actor, target, { statBase: 'str', power: 1, element }, rng, {
    actorUnion: 5,
  });
  // 通常攻撃は単発なのでヒット時に1回だけ反応を判定する（[03 §6.5]）。
  if (r.hit) triggerReactions(state, actor, target, element, r.dealt, rng);
}

const avgAgi = (cs: Combatant[]) =>
  cs.length === 0 ? 0 : cs.reduce((s, c) => s + c.stats.agi, 0) / cs.length;

/** 挑発（decoy・[03 §6.5]）を加味した敵のターゲット抽選。重みは基本1＋decoy 合計。 */
function pickByDecoy(targets: Combatant[], rng: Rng): Combatant {
  const weights = targets.map(
    (t) => 1 + (t.states ?? []).reduce((a, s) => a + (s.kind === 'decoy' ? s.weight : 0), 0)
  );
  const total = weights.reduce((a, b) => a + b, 0);
  let r = rng.next() * total;
  for (let i = 0; i < targets.length; i++) {
    r -= weights[i];
    if (r < 0) return targets[i];
  }
  return targets[targets.length - 1];
}

const isParalyzed = (c: Combatant) => c.ailments.some((a) => a.type === 'paralysis');
const isAsleep = (c: Combatant) => c.ailments.some((a) => a.type === 'sleep');

// バインド（部位封じ・[03 §6]）。
const hasAilment = (c: Combatant, t: AilmentType) => c.ailments.some((a) => a.type === t);
const isArmBound = (c: Combatant) => hasAilment(c, 'armBind');
const isHeadBound = (c: Combatant) => hasAilment(c, 'headBind');
const isLegBound = (c: Combatant) => hasAilment(c, 'legBind');

/**
 * スキルが「腕」を使う物理スキルか（str ダメージ効果を含む）。それ以外は「頭」系（魔法/補助/回復）
 * とみなす（[03 §6] の MVP 分類。本来は部位タグだが、効果から推定する）。
 * - 腕封じ: 通常攻撃と腕系スキルを封じる
 * - 頭封じ: 頭系（魔法/補助）スキルを封じる
 * - 脚封じ: 回避ほぼ0・逃走不可（combat.ts / resolveTurn で処理）
 */
function skillUsesArm(def: BattleSkillDef): boolean {
  return def.effects.some((e) => e.kind === 'damage' && e.statBase === 'str');
}

/**
 * ユニオンスキルを解決する（[03 §9]）。ターン冒頭に処理。通常行動は消費しない。
 * 発動者ゲージ100%が条件。発動者を含む requiredParticipants 人から gaugeCostPerParticipant を消費。
 */
function resolveUnion(
  state: BattleState,
  cmd: Extract<BattleCommand, { kind: 'union' }>,
  rng: Rng
): void {
  const def = UNION_SKILLS[cmd.unionSkillId];
  if (!def) return;
  const activator = find(state, cmd.actorId);
  if (!activator || activator.isDown || activator.side !== 'ally') return;
  if (activator.unionGauge < 100) {
    state.log.push({ text: `${activator.name} はユニオンゲージが足りない` });
    return;
  }
  // 参加者（発動者を必ず含む）。生存中の味方のみ。
  const ids = new Set(cmd.participantIds);
  ids.add(activator.id);
  const participants = [...ids]
    .map((id) => find(state, id))
    .filter((c): c is Combatant => !!c && !c.isDown && c.side === 'ally');
  if (participants.length < def.requiredParticipants) {
    state.log.push({ text: `${activator.name} の${def.name}は参加人数が足りない` });
    return;
  }
  // 発動者を先頭に、必要人数ぶんゲージを消費する。
  const payers = [activator, ...participants.filter((p) => p.id !== activator.id)].slice(
    0,
    def.requiredParticipants
  );
  for (const p of payers) {
    p.unionGauge = clamp(p.unionGauge - def.gaugeCostPerParticipant, 0, 100);
  }
  state.log.push({ text: `ユニオン！ ${activator.name} の${def.name}！` });
  const level = 1; // MVP は Lv1 運用
  const targets = resolveTargets(state, activator, def.target, cmd.targetId);
  for (const effect of def.effects) {
    applySkillEffect(state, activator, effect, def.element, level, targets, rng);
  }
}

/**
 * 1ターンを解決する（純関数）。味方コマンド＋敵AI(通常攻撃) を AGI 順に処理。
 * 乱数は注入。新しい BattleState を返す（入力は変更しない）。
 */
export function resolveTurn(state: BattleState, commands: BattleCommand[], rng: Rng): BattleState {
  if (state.outcome !== 'ongoing') return state;
  // ディープコピー（純粋性のため）
  const next: BattleState = structuredClone({ ...state, log: [] });
  // ログ行ごとに「その時点の全戦闘員 HP」を記録する（issue #18 の逐次再生用）。
  // すべての効果ヘルパは next.log.push でログを積むため、push をラップして自動採取する。
  const origPush = next.log.push.bind(next.log);
  next.log.push = (...entries: BattleLogEntry[]): number => {
    const r = origPush(...entries);
    const snap: Record<string, { hp: number; isDown: boolean }> = {};
    for (const c of [...next.allies, ...next.enemies, ...next.summons]) {
      snap[c.id] = { hp: c.hp, isDown: c.isDown };
    }
    for (const e of entries) e.snapshot = snap;
    return r;
  };
  // 通常行動のコマンド表（ユニオンは別枠なので除外する）。
  const cmdByActor = new Map(commands.filter((c) => c.kind !== 'union').map((c) => [c.actorId, c]));

  // 先制/不意打ち（[03 §10]）。ターン1のみ片側が行動不可。
  const firstStrikeActive = next.turn === 1 && next.firstStrike !== 'none';
  const skipEnemies = firstStrikeActive && next.firstStrike === 'preemptive';
  const skipAllies = firstStrikeActive && next.firstStrike === 'ambush';
  if (skipEnemies) next.log.push({ text: '先制攻撃！ 味方が先手を取った' });
  if (skipAllies) next.log.push({ text: '不意打ち！ 敵に先手を取られた' });

  // ユニオンスキル（[03 §9]）: 通常行動とは別枠でターン冒頭に解決する。不意打ちターンは不可。
  if (!skipAllies) {
    for (const c of commands) {
      if (c.kind === 'union') resolveUnion(next, c, rng);
    }
  }

  // 逃走（いずれかが flee 指定 → 1回判定。不意打ちターンは味方が動けず逃走不可）
  const fleeCmd = commands.find((c) => c.kind === 'flee');
  if (!skipAllies && fleeCmd && next.outcome === 'ongoing') {
    const fleer = find(next, fleeCmd.actorId);
    if (fleer && isLegBound(fleer)) {
      next.log.push({ text: `${fleer.name} は脚を封じられて逃げられない` });
    } else {
      const rate = clamp(
        0.5 + (avgAgi(aliveSide(next, 'ally')) - avgAgi(aliveSide(next, 'enemy'))) * 0.02,
        0.1,
        0.95
      );
      if (rng.next() < rate) {
        next.log.push({ text: 'うまく逃げ切れた！' });
        next.outcome = 'fled';
        return next;
      }
      next.log.push({ text: '逃げられなかった！' });
    }
  }

  // ガード: 防御コマンドは pdef/mdef を一時上昇（このターン）。不意打ちターンは無効。
  if (!skipAllies) {
    for (const c of commands) {
      if (c.kind !== 'guard') continue;
      const actor = find(next, c.actorId);
      if (!actor || actor.isDown) continue;
      addBuff(actor, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' });
      addBuff(actor, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' });
    }
  }

  // 敵AI: 生存敵は生存味方/召喚体の誰かを通常攻撃（先制ターンは敵が動けない）。
  // 召喚体は最前列の壁として攻撃対象に含める（[03 §8]）。
  const enemyCommands = new Map<string, string>(); // enemyId -> targetId
  if (!skipEnemies) {
    for (const e of aliveSide(next, 'enemy')) {
      const targets = [...aliveSummons(next), ...aliveSide(next, 'ally')];
      if (targets.length > 0) enemyCommands.set(e.id, pickByDecoy(targets, rng).id);
    }
  }

  // 行動順（生存者のみ、AGI 降順・rng タイブレーク）。先手側のみ行動するターンは片側を除外。
  // 召喚体は味方側として扱う（不意打ちターンは行動不可）。
  const actors = [...next.allies, ...next.enemies, ...next.summons]
    .filter((c) => !c.isDown)
    .filter((c) => !(skipEnemies && c.side === 'enemy') && !(skipAllies && c.side === 'ally'))
    .map((c) => ({ c, agi: c.stats.agi, tie: rng.next() }))
    .sort((a, b) => b.agi - a.agi || b.tie - a.tie)
    .map((x) => x.c);

  for (const actor of actors) {
    if (actor.isDown) continue;
    if (next.outcome !== 'ongoing') break;
    // 睡眠: 行動不能（被ダメで解除。[03 §6]）。
    if (isAsleep(actor)) {
      next.log.push({ text: `${actor.name} は眠っている` });
      continue;
    }
    // 麻痺: 30% で行動不能
    if (isParalyzed(actor) && rng.next() < BALANCE.PARALYSIS_SKIP) {
      next.log.push({ text: `${actor.name} は麻痺で動けない` });
      continue;
    }

    // 召喚体（[03 §8]）: actsOnTurn なら生存敵を1体自律攻撃。壁のみの個体は行動しない。
    if (actor.isSummon) {
      const m = actor.summonKind ? SUMMONS[actor.summonKind] : undefined;
      if (m?.actsOnTurn) {
        const enemies = aliveSide(next, 'enemy');
        if (enemies.length > 0) basicAttack(next, actor, rng.pick(enemies), rng);
      }
      if (aliveSide(next, 'enemy').length === 0) break;
      continue;
    }

    // 腕封じ（armBind）: 通常攻撃が不可（味方・敵共通。[03 §6]）
    if (actor.side === 'enemy') {
      if (isArmBound(actor)) {
        next.log.push({ text: `${actor.name} は腕を封じられて攻撃できない` });
        continue;
      }
      const targetId = enemyCommands.get(actor.id);
      const target = targetId ? find(next, targetId) : undefined;
      const t = target && !target.isDown ? target : aliveSide(next, 'ally')[0];
      if (t) basicAttack(next, actor, t, rng);
    } else {
      const cmd = cmdByActor.get(actor.id);
      if (!cmd || cmd.kind === 'guard' || cmd.kind === 'flee') continue;
      if (cmd.kind === 'attack') {
        if (isArmBound(actor)) {
          next.log.push({ text: `${actor.name} は腕を封じられて攻撃できない` });
          continue;
        }
        const target = find(next, cmd.targetId);
        const t = target && !target.isDown ? target : aliveSide(next, 'enemy')[0];
        if (t) basicAttack(next, actor, t, rng);
      } else if (cmd.kind === 'skill') {
        const def = BATTLE_SKILLS[cmd.skillId];
        if (!def) continue;
        // 部位封じでスキル不可（腕系スキル＝armBind / 頭系スキル＝headBind。[03 §6]）
        if (skillUsesArm(def) && isArmBound(actor)) {
          next.log.push({ text: `${actor.name} は腕を封じられてスキルを使えない` });
          continue;
        }
        if (!skillUsesArm(def) && isHeadBound(actor)) {
          next.log.push({ text: `${actor.name} は頭を封じられてスキルを使えない` });
          continue;
        }
        const level = 1; // 習得 Lv は呼び出し側で検証済み前提（MVP は Lv1 運用）
        const cost = def.tpCost(level);
        if (actor.tp < cost) {
          next.log.push({ text: `${actor.name} は TP が足りない` });
          continue;
        }
        actor.tp -= cost;
        gainUnion(actor, 10);
        const targets = skillTargets(next, actor, def, cmd.targetId);
        for (const effect of def.effects) {
          applySkillEffect(next, actor, effect, def.element, level, targets, rng);
        }
      } else if (cmd.kind === 'item') {
        const item = ITEMS[cmd.itemId];
        if (!item || !item.useContext?.includes('battle')) continue;
        const target = find(next, cmd.targetId) ?? actor;
        for (const eff of item.effects ?? []) {
          if (eff.kind === 'heal') {
            target.hp = clamp(target.hp + eff.amount(1), 0, target.maxHp);
          } else if (eff.kind === 'restoreTp') {
            target.tp = clamp(target.tp + eff.amount(1), 0, target.maxTp);
          }
        }
        next.consumedItems.push(cmd.itemId);
        next.log.push({ text: `${actor.name} は ${item.name} を使った` });
      }
    }
    // 途中勝敗チェック
    if (aliveSide(next, 'enemy').length === 0 || aliveSide(next, 'ally').length === 0) break;
  }

  // ターン終了処理: 毒ダメージ → TP自然回復 → バフ/状態異常の残ターン減算（召喚体も含む）
  for (const c of [...next.allies, ...next.enemies, ...next.summons]) {
    if (c.isDown) continue;
    const poison = c.ailments.find((a) => a.type === 'poison');
    if (poison) {
      const dmg = poison.magnitude ?? Math.max(1, Math.floor(c.maxHp * BALANCE.POISON_HP_RATIO));
      dealDamage(c, dmg, next.log);
      next.log.push({ text: `${c.name} は毒で ${dmg} のダメージ` });
    }
  }
  for (const c of [...next.allies, ...next.enemies, ...next.summons]) {
    if (!c.isDown && c.maxTp > 0) {
      // TP 自然回復（[03 §2]）。TP枯渇での詰みを防ぐ。
      c.tp = Math.min(c.maxTp, c.tp + Math.ceil(c.maxTp * BALANCE.TP_REGEN_RATIO));
    }
    c.buffs = c.buffs
      .map((b) => ({ ...b, remainingTurns: b.remainingTurns - 1 }))
      .filter((b) => b.remainingTurns > 0);
    c.ailments = c.ailments
      .map((a) => ({ ...a, remainingTurns: a.remainingTurns - 1 }))
      .filter((a) => a.remainingTurns > 0);
    // 反応系の戦闘状態（反撃/連携/挑発/障壁）も残ターンで減衰する（[03 §6.5]）。
    if (c.states && c.states.length > 0) {
      c.states = c.states
        .map((s) => ({ ...s, remainingTurns: s.remainingTurns - 1 }))
        .filter((s) => s.remainingTurns > 0);
    }
  }

  // このターンに新たに倒した敵のドロップを抽選（[04 §7]）
  for (const e of next.enemies) {
    if (!e.isDown || !e.enemyId) continue;
    const wasDown = state.enemies.find((se) => se.id === e.id)?.isDown ?? false;
    if (wasDown) continue; // 既に倒れていた敵は対象外
    for (const d of ENEMIES[e.enemyId].drops ?? []) {
      if (rng.next() < d.rate) {
        next.drops.push({ enemyId: e.enemyId, itemId: d.itemId });
        next.log.push({ text: `${e.name} は ${ITEMS[d.itemId]?.name ?? d.itemId} を落とした` });
      }
    }
  }

  // 倒れた召喚体は盤面から除去する（屍の蓄積・UI への残留を防ぐ。[03 §8]）。
  // ※ ID は `summon_${turn}_${idx}` でターン番号を含むため、除去で配列が縮んでも次ターン以降と衝突しない。
  next.summons = next.summons.filter((s) => !s.isDown);

  next.turn += 1;
  if (aliveSide(next, 'enemy').length === 0) next.outcome = 'win';
  else if (aliveSide(next, 'ally').length === 0) next.outcome = 'lose';
  return next;
}

// ---- 報酬・結果反映 -------------------------------------------------------

/** 勝利報酬（経験値・所持金。出現階でスケール）。 */
export function battleRewards(state: BattleState): { exp: number; gold: number } {
  let exp = 0;
  let gold = 0;
  for (const e of state.enemies) {
    if (!e.enemyId) continue;
    const master = ENEMIES[e.enemyId];
    const scale = enemyScale(state.depth, master.refDepth);
    exp += Math.round(master.exp * scale);
    gold += Math.round(master.gold * scale);
  }
  return { exp, gold };
}

/**
 * リザルト表示用の経験値・レベルアップ結果（issue #18）。
 * 戦闘勝利時、出撃メンバーごとに「獲得経験値・次レベルまでのバー・レベルアップ時のステ増分」を返す。
 * applyBattleResult と同じ grantExpToChar を使うため、表示と実適用は一致する。
 */
export interface LevelUpResult {
  charId: string;
  name: string;
  gainedExp: number;
  fromLevel: number;
  toLevel: number;
  /** 適用後の現在経験値と次レベルに必要な経験値（バー表示用。Lv上限なら expToNext=0）。 */
  exp: number;
  expToNext: number;
  /** レベルアップした場合の素ステータス増分（しなければ空）。 */
  statGains: Partial<Stats>;
}

/** 戦闘勝利時の各メンバーの経験値獲得・レベルアップ結果（リザルト画面用。純粋・副作用なし）。 */
export function partyExpResults(save: SaveData, state: BattleState): LevelUpResult[] {
  if (state.outcome !== 'win' || !save.diveState) return [];
  const { exp } = battleRewards(state);
  const partyIds = new Set(save.diveState.party.map((p) => p.charId));
  const share = partyIds.size > 0 ? Math.floor(exp / partyIds.size) : 0;
  const results: LevelUpResult[] = [];
  for (const m of save.guild.members) {
    if (!partyIds.has(m.id)) continue;
    const after = grantExpToChar(m, share);
    const statGains: Partial<Stats> = {};
    if (after.level > m.level) {
      const before = computeBaseStats(m);
      const aft = computeBaseStats(after);
      for (const k of Object.keys(before) as StatKey[]) {
        const d = Math.round(aft[k] - before[k]);
        if (d !== 0) statGains[k] = d;
      }
    }
    results.push({
      charId: m.id,
      name: m.name,
      gainedExp: canGainExp(m.level) ? share : 0,
      fromLevel: m.level,
      toLevel: after.level,
      exp: after.exp,
      expToNext: canGainExp(after.level) ? expToNext(after.level) : 0,
      statGains,
    });
  }
  return results;
}

/** キャラに経験値を与え、必要ならレベルアップ（Lv上限で経験値は無効）。 */
function grantExpToChar(char: Character, exp: number): Character {
  let level = char.level;
  let curExp = char.exp + (canGainExp(level) ? exp : 0);
  let sp = char.skillPoints.total;
  while (canGainExp(level) && curExp >= expToNext(level)) {
    curExp -= expToNext(level);
    level += 1;
    sp += spGainOnLevelUp(level); // 累計が spTotalForLevel に一致するよう +1/+2 を配分
  }
  return {
    ...char,
    level,
    exp: canGainExp(char.level) ? curExp : char.exp,
    skillPoints: { ...char.skillPoints, total: sp },
  };
}

/**
 * 戦闘結果を SaveData に反映する（純粋）。
 * - 味方の現在 HP/TP/ゲージ/状態異常を diveState に書き戻す。
 * - 勝利時: 所持金・経験値を付与（出撃メンバーに均等）、図鑑に撃破記録、ゲージ +15。
 * 全滅(lose)時の拠点送りは呼び出し側で returnToTown する。
 */
export function applyBattleResult(save: SaveData, state: BattleState): SaveData {
  if (!save.diveState) return save;
  const win = state.outcome === 'win';
  // 戦闘終了時はゲージ +15（勝利・逃走とも。[03 §9.1] 戦闘終了時に全員 +15）
  const ended = state.outcome === 'win' || state.outcome === 'fled';
  const byId = new Map(state.allies.map((a) => [a.id, a]));

  // 味方の戦闘後ステータスを diveState に反映
  const party = save.diveState.party.map((p) => {
    const a = byId.get(p.charId);
    if (!a) return p;
    let gauge = a.unionGauge;
    if (ended && !a.isDown) gauge = clamp(gauge + BALANCE.UNION_GAIN_ON_WIN, 0, 100);
    return { ...p, hp: a.hp, tp: a.tp, unionGauge: gauge, ailments: a.ailments };
  });

  let members = save.guild.members;
  let gold = save.guild.gold;

  // 図鑑: 遭遇した敵は seen、撃破した敵は defeated（勝敗を問わず記録）。
  // 勝利時は入手したドロップを dropsFound に記録。bestiary 確定前にまとめて構築する。
  const monsters = { ...save.bestiary.monsters };
  for (const e of state.enemies) {
    if (!e.enemyId) continue;
    const prev = monsters[e.enemyId] ?? { seen: false, defeated: false, dropsFound: [] };
    monsters[e.enemyId] = { ...prev, seen: true, defeated: prev.defeated || e.isDown };
  }
  if (win) {
    for (const d of state.drops) {
      const prev = monsters[d.enemyId];
      if (prev && !prev.dropsFound.includes(d.itemId)) {
        monsters[d.enemyId] = { ...prev, dropsFound: [...prev.dropsFound, d.itemId] };
      }
    }
  }
  const bestiary = { ...save.bestiary, monsters };

  if (win) {
    const { exp, gold: dropGold } = battleRewards(state);
    gold += dropGold;
    const partyIds = new Set(party.map((p) => p.charId));
    const share = partyIds.size > 0 ? Math.floor(exp / partyIds.size) : 0;
    members = members.map((m) => (partyIds.has(m.id) ? grantExpToChar(m, share) : m));
  }

  // 戦闘をまたいで残る召喚体（[03 §8]）: 生存かつ persistsAfterBattle のみ次戦闘へ持ち越す。
  // 戦闘限りの召喚体・戦闘不能の召喚体は破棄。拠点帰還で diveState ごと消える。
  const persistentSummons = state.summons
    .filter((s) => !s.isDown && s.summonKind && SUMMONS[s.summonKind]?.persistsAfterBattle)
    .map((s) => ({ summonKind: s.summonKind as SummonKind, ownerId: s.ownerId ?? '', hp: s.hp }));

  let next: SaveData = {
    ...save,
    guild: { ...save.guild, members, gold, bestiary },
    bestiary,
    diveState: { ...save.diveState, party, persistentSummons },
  };

  // 倉庫: 戦闘で使ったアイテムを減算（勝敗問わず）
  for (const id of state.consumedItems) next = removeItem(next, id, 1);
  // 倉庫: 勝利時のみドロップを加算（周回数=グレード。2周目以降は素材が LvN 化。[06 §3]）
  const dropGrade = enemyLapForDepth(state.depth);
  if (win) for (const d of state.drops) next = addItem(next, d.itemId, 1, dropGrade);
  return next;
}
