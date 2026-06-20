import {
  BALANCE,
  canGainExp,
  encounterTier,
  enemyScale,
  expToNext,
  levelDecay,
  spGainOnLevelUp,
} from '@/data/balance';
import { BATTLE_SKILLS } from '@/data/battleSkills';
import { ENEMIES } from '@/data/enemies';
import { BASIC_WEIGHT, ENEMY_KITS } from '@/data/enemySkills';
import { EQUIPMENT } from '@/data/equipment';
import { ITEMS } from '@/data/items';
import { RACES } from '@/data/races';
import { SUMMONS } from '@/data/summons';
import { UNION_SKILLS } from '@/data/unionSkills';
import { weaponNormalAttackElement } from '@/data/weaponElement';
import { resolveEnemyAilmentResist } from '@/domain/ailment';
import type {
  BattleEvent,
  BuffKind,
  BuffResult,
  DebuffResult,
  HealResult,
  HitResult,
  NormalAttackEvent,
  SkillEvent,
} from '@/domain/battleEvent';
import { computeDamage, deriveCombat, effectiveEnemyStats, scaleStats } from '@/domain/combat';
import { initEncounter } from '@/domain/encounter';
import { enemyLapForDepth } from '@/domain/encounterTable';
import { forgeBonusFor, gradedBaseBonuses } from '@/domain/forge';
import { addItem, removeItem } from '@/domain/inventory';
import { computePassiveMods } from '@/domain/passives';
import { createRng } from '@/domain/rng';
import { computeSkillTpCost } from '@/domain/skillCost';
import { computeBaseStats } from '@/domain/stats';
import type {
  ActiveAilment,
  ActiveBuff,
  AilmentType,
  BattleCommand,
  BattleSkillDef,
  BattleState,
  Character,
  Combatant,
  CombatState,
  Element,
  EnemyActionDef,
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
  // §15: 種族の属性耐性・状態異常耐性を Combatant に載せる（敵の resist と同形で elementMult が効くようにする）
  const race = RACES[char.raceId];
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
    // 属性耐性（§15.2: 味方 Combatant.resist に race.elementResist を載せる）
    resist: race?.elementResist,
    // 状態異常耐性（§15.2: 味方 Combatant.ailmentResist に race.ailmentResist を載せる）
    ailmentResist: race?.ailmentResist,
    // 学習スキルLv（戦闘でスキル威力/消費に反映）
    skillLevels: char.learnedSkills,
    // 装備武器種から通常攻撃属性を決定（素手・未装備は bash）
    normalAttackElement: weaponNormalAttackElement(
      char.equipment.weapon ? EQUIPMENT[char.equipment.weapon.masterId]?.weaponType : undefined
    ),
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
    // §15: 種別デフォルト＋系統プロファイル＋個別指定でマージした状態異常耐性
    ailmentResist: resolveEnemyAilmentResist(enemyId),
    normalAttackElement: master.attackElement,
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
    normalAttackElement: m.attackElement,
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
    events: [],
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

/**
 * HP を減算し、睡眠解除・戦闘不能の状態変更を行う。
 * 「目を覚ました」「倒れた！」のログは呼び出し側がダメージ本文の後に push できるよう、
 * テキストの配列で返す（ダメージ→撃破の順序を保つため。ログ順バグ修正）。
 */
function dealDamage(target: Combatant, dmg: number): string[] {
  const logs: string[] = [];
  target.hp = clamp(target.hp - dmg, 0, target.maxHp);
  // 睡眠は被ダメージで解除（[03 §6]）。
  if (dmg > 0 && target.ailments.some((a) => a.type === 'sleep')) {
    target.ailments = target.ailments.filter((a) => a.type !== 'sleep');
    logs.push(`${target.name} は目を覚ました`);
  }
  if (target.hp === 0 && !target.isDown) {
    target.isDown = true;
    target.unionGauge = Math.floor(target.unionGauge / 2); // 戦闘不能で保有ゲージ半減
    logs.push(`${target.name} は倒れた！`);
  }
  return logs;
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
function consumeBarrier(target: Combatant, dmg: number): number {
  const st = (target.states ?? []).find((s) => s.kind === 'barrier' && s.absorb > 0);
  if (!st || st.kind !== 'barrier') return dmg;
  const absorbed = Math.min(st.absorb, dmg);
  st.absorb -= absorbed;
  if (st.absorb <= 0) target.states = (target.states ?? []).filter((s) => s !== st);
  return dmg - absorbed;
}

/**
 * 物理/魔法1ヒットを解決する（[03 §7]）。命中判定→障壁→ダメージ→ユニオン。
 * 反応（反撃/連携追撃）は発火しない。呼び出し側が「行動（スキル/通常攻撃）単位」で
 * 対象ごとに1回だけ triggerReactions を呼ぶ（多段ヒットでの過剰発動を防ぐ。[03 §6.5]）。
 * 返り値: 命中したか・実ダメージ・HitResult（events 生成用）。
 */
function strikeOnce(
  _state: BattleState,
  actor: Combatant,
  target: Combatant,
  p: { statBase: 'str' | 'int'; power: number; element: Element },
  rng: Rng,
  opts: { actorUnion?: number; clean?: boolean } = {}
): { hit: boolean; dealt: number; hitResult: HitResult | null } {
  if (target.isDown) return { hit: false, dealt: 0, hitResult: null };
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
    return {
      hit: false,
      dealt: 0,
      hitResult: {
        targetId: target.id,
        result: 'miss',
        damage: 0,
        element: p.element,
        defeated: false,
      },
    };
  }
  const dealt = consumeBarrier(target, res.damage);
  const dealLogs = dealDamage(target, dealt);
  void dealLogs; // ログ廃止のため使わないが dealDamage の副作用（HP減算・isDown 更新）は必要
  if (opts.actorUnion) gainUnion(actor, opts.actorUnion);
  gainUnion(target, 5);
  const defeated = target.isDown;
  return {
    hit: true,
    dealt,
    hitResult: {
      targetId: target.id,
      result: res.critical ? 'crit' : 'hit',
      damage: dealt,
      element: p.element,
      defeated,
    },
  };
}

/**
 * 被弾に対する反応を「行動（スキル/通常攻撃）×対象」単位で1回解決する（[03 §6.5]）。
 * - 反撃（counter）: 被弾した target が生存し攻撃者と敵対していれば確率で反撃。
 * - 連携追撃（chase）: 攻撃側の味方が同属性 chase を持つなら、被弾した敵へ追撃。
 * 反応由来の追加打（strikeOnce）はここからは反応を再発火しないため連鎖しない。
 * 返り値: 発生した反応 BattleEvent[] の配列（呼び出し側が親 event の reactions[] に格納する）。
 */
function triggerReactions(
  state: BattleState,
  attacker: Combatant,
  target: Combatant,
  element: Element,
  dealt: number,
  rng: Rng
): BattleEvent[] {
  const reactionEvents: BattleEvent[] = [];
  // 反撃: target → attacker
  if (!target.isDown && !attacker.isDown && target.side !== attacker.side) {
    for (const st of target.states ?? []) {
      if (st.kind !== 'counter') continue;
      if (rng.next() >= st.chance) continue;
      const el: Element = st.statBase === 'str' ? 'bash' : 'almighty';
      const r = strikeOnce(
        state,
        target,
        attacker,
        { statBase: st.statBase, power: st.power, element: el },
        rng,
        { clean: true }
      );
      const counterEvent: NormalAttackEvent = {
        kind: 'normal-attack',
        actorId: target.id,
        hits: r.hitResult ? [r.hitResult] : [],
        reactions: [],
      };
      reactionEvents.push(counterEvent);
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
        const r = strikeOnce(
          state,
          ch,
          target,
          { statBase: st.statBase, power: st.power, element: st.element },
          rng,
          { clean: true }
        );
        const chaseEvent: NormalAttackEvent = {
          kind: 'normal-attack',
          actorId: ch.id,
          hits: r.hitResult ? [r.hitResult] : [],
          reactions: [],
        };
        reactionEvents.push(chaseEvent);
      }
    }
  }
  return reactionEvents;
}

/**
 * 状態異常の付与確率（[03 §6.2]）。
 * §15: type を渡すと defender.ailmentResist?.[type] を乗算する。
 * 0（完全無効）なら即 0 を返す（0.95 キャップより優先）。
 */
function ailmentChance(
  base: number,
  attacker: Combatant,
  defender: Combatant,
  type?: AilmentType
): number {
  // §15: 耐性倍率を取得（未指定は 1.0）
  const resistMult = type !== undefined ? (defender.ailmentResist?.[type] ?? 1) : 1;
  // 完全無効（0）は即時 0（LUC 補正や上限キャップより優先）
  if (resistMult === 0) return 0;
  const lucAdjusted =
    base * (1 + (attacker.stats.luc - defender.stats.luc) * BALANCE.AILMENT_LUC_K);
  return clamp(lucAdjusted * resistMult, 0, BALANCE.AILMENT_MAX);
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

/** applySkillEffect の戻り値: SkillEvent 組み立て用の結果蓄積。 */
type SkillEffectResult = {
  hits: HitResult[];
  heals: HealResult[];
  buffs: BuffResult[];
  debuffs: DebuffResult[];
  /** スキルで召喚が行われた場合の召喚 ID（SummonEvent 生成用）。 */
  summonedId?: string;
  /** スキルで召喚が行われた場合の召喚種別。 */
  summonedKind?: SummonKind;
  /** 反応 events（damage 効果が triggerReactions を呼んだ結果）。 */
  reactions: BattleEvent[];
};

function applySkillEffect(
  state: BattleState,
  actor: Combatant,
  effect: SkillEffectDef,
  element: Element,
  level: number,
  targets: Combatant[],
  rng: Rng,
  _target: TargetType
): SkillEffectResult {
  const result: SkillEffectResult = { hits: [], heals: [], buffs: [], debuffs: [], reactions: [] };
  switch (effect.kind) {
    case 'damage': {
      const hits = effect.hits ?? 1;
      const power = effect.power(level);
      let drainTotal = 0; // ★追加
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
            rng,
            { clean: true }
          );
          if (r.hitResult) result.hits.push(r.hitResult);
          if (r.hit) {
            landed = true;
            total += r.dealt;
          }
        }
        // 反応は「スキル×対象」単位で1回（多段でも追撃/反撃は1回。[03 §6.5]）。
        if (landed) {
          const reactionEvts = triggerReactions(state, actor, target, element, total, rng);
          result.reactions.push(...reactionEvts);
        }
        drainTotal += total; // ★追加
      }
      // ★追加: HP吸収
      if (effect.drain && drainTotal > 0 && !actor.isDown) {
        const before = actor.hp;
        actor.hp = clamp(actor.hp + Math.round(drainTotal * effect.drain), 0, actor.maxHp);
        // 吸収量はログに出さない（SkillEvent の hits に drain フラグは持たせていない）
        void before;
      }
      break;
    }
    case 'heal': {
      const flat = effect.amount(level);
      const coef =
        effect.matkCoef === 'one'
          ? BALANCE.HEAL_MATK_COEF_ONE
          : effect.matkCoef === 'minor'
            ? BALANCE.HEAL_MATK_COEF_MINOR
            : BALANCE.HEAL_MATK_COEF_ALL;
      const casterMatk = deriveCombat(actor.stats, actor.equip, actor.buffs, actor.passive).matk;
      const amount = Math.round(flat + casterMatk * coef);
      for (const target of targets) {
        if (target.isDown) continue;
        target.hp = clamp(target.hp + amount, 0, target.maxHp);
        result.heals.push({ targetId: target.id, amount });
      }
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
        // isBuffImmune な対象は addBuff で弾かれるが、event には載せる（UI判断に任せる）
        result.buffs.push({
          targetId: target.id,
          effect: effect.stat as BuffKind,
          turns: effect.turns,
        });
      }
      break;
    }
    case 'ailment': {
      for (const target of targets) {
        if (target.isDown) continue;
        // §15: effect.ailment を type として渡し、defender.ailmentResist を反映する
        const chance = ailmentChance(effect.chance(level), actor, target, effect.ailment);
        if (rng.next() < chance) {
          applyAilment(target, {
            type: effect.ailment,
            remainingTurns: effect.turns,
            magnitude: effect.magnitude,
          });
          result.debuffs.push({ targetId: target.id, effect: effect.ailment, turns: effect.turns });
        }
      }
      break;
    }
    case 'summon': {
      if (actor.side !== 'ally') break; // 召喚は味方専用（敵が summon 効果を持っても味方側を生まない）
      if (aliveSummons(state).length >= MAX_SUMMONS) {
        break; // 満員（ログなし）
      }
      const id = `summon_${state.turn}_${state.summons.length}`;
      const s = buildSummon(effect.summonKind, state.depth, actor.id, id);
      state.summons.push(s);
      result.summonedId = s.id;
      result.summonedKind = effect.summonKind;
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
        result.buffs.push({ targetId: target.id, effect: 'counter', turns: effect.turns });
      }
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
        result.buffs.push({ targetId: target.id, effect: 'chase', turns: effect.turns });
      }
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
        result.buffs.push({ targetId: target.id, effect: 'decoy', turns: effect.turns });
      }
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
        result.buffs.push({ targetId: target.id, effect: 'barrier', turns: effect.turns });
      }
      break;
    }
    case 'cleanse': {
      for (const target of targets) {
        if (target.isDown || target.ailments.length === 0) continue;
        target.ailments = [];
      }
      break;
    }
    case 'revive': {
      for (const target of targets) {
        if (!target.isDown) continue; // 生存者には無効
        target.isDown = false;
        target.hp = clamp(Math.round(target.maxHp * effect.ratio(level)), 1, target.maxHp);
        result.heals.push({ targetId: target.id, amount: target.hp });
      }
      break;
    }
    case 'regen': {
      const flat = effect.amount(level);
      const coef =
        effect.matkCoef === 'one'
          ? BALANCE.HEAL_MATK_COEF_ONE
          : effect.matkCoef === 'all'
            ? BALANCE.HEAL_MATK_COEF_ALL
            : BALANCE.HEAL_MATK_COEF_MINOR;
      const casterMatk = deriveCombat(actor.stats, actor.equip, actor.buffs, actor.passive).matk;
      const amount = Math.round(flat + casterMatk * coef);
      for (const target of targets) {
        if (target.isDown) continue;
        addState(target, { kind: 'regen', amount, remainingTurns: effect.turns });
        result.buffs.push({ targetId: target.id, effect: 'regen', turns: effect.turns });
      }
      break;
    }
    case 'restoreTp': {
      // 対象全員（使用者を含む）の TP を回復する。ratio 指定時は各自の最大TPの割合で回復。
      // 全体回復(allyAll)は使用者の消費TP(tpCost)を回復量の約2倍に設定してあるため、
      // 使用者本人は実質 TP が減る（純増しない）。自己回復(self)は回復が消費を上回ってよい。
      for (const t of targets) {
        if (t.isDown) continue;
        const add = effect.ratio ? Math.round(t.maxTp * effect.ratio) : effect.amount(level);
        t.tp = clamp(t.tp + add, 0, t.maxTp);
      }
      break;
    }
    default:
      break;
  }
  return result;
}

/** 通常攻撃（物理・武器属性 or 素手 bash）。反撃/連携追撃の対象になる（[03 §6.5]）。
 * pushFn: snapshotAfter を付与して events に積むラッパー（resolveTurn から注入）。
 * 省略時（単体テスト・召喚体の自律攻撃）は state.events.push を直接使う（snapshotAfter なし）。
 */
function basicAttack(
  state: BattleState,
  actor: Combatant,
  target: Combatant,
  rng: Rng,
  pushFn?: (evt: import('./battleEvent').BattleEvent) => void
): void {
  if (target.isDown) return;
  const element: Element = actor.normalAttackElement ?? 'bash';
  const r = strikeOnce(state, actor, target, { statBase: 'str', power: 1, element }, rng, {
    actorUnion: 5,
  });
  // 通常攻撃は単発なのでヒット時に1回だけ反応を判定する（[03 §6.5]）。
  const reactionEvts = r.hit ? triggerReactions(state, actor, target, element, r.dealt, rng) : [];
  // BattleEvent: NormalAttackEvent を生成して push
  const normalAttackEvent: NormalAttackEvent = {
    kind: 'normal-attack',
    actorId: actor.id,
    hits: r.hitResult ? [r.hitResult] : [],
    reactions: reactionEvts,
  };
  if (pushFn) {
    pushFn(normalAttackEvent);
  } else {
    state.events.push(normalAttackEvent);
  }
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
 * pushFn: snapshotAfter を付与して events に積むラッパー（resolveTurn から注入）。
 */
function resolveUnion(
  state: BattleState,
  cmd: Extract<BattleCommand, { kind: 'union' }>,
  rng: Rng,
  pushFn?: (evt: import('./battleEvent').BattleEvent) => void
): void {
  const push = pushFn ?? ((evt) => state.events.push(evt));
  const def = UNION_SKILLS[cmd.unionSkillId];
  if (!def) return;
  const activator = find(state, cmd.actorId);
  if (!activator || activator.isDown || activator.side !== 'ally') return;
  if (activator.unionGauge < 100) {
    return; // ゲージ不足（ログなし）
  }
  // 参加者（発動者を必ず含む）。生存中の味方のみ。
  const ids = new Set(cmd.participantIds);
  ids.add(activator.id);
  const participants = [...ids]
    .map((id) => find(state, id))
    .filter((c): c is Combatant => !!c && !c.isDown && c.side === 'ally');
  if (participants.length < def.requiredParticipants) {
    return; // 人数不足（ログなし）
  }
  // 発動者を先頭に、必要人数ぶんゲージを消費する。
  const payers = [activator, ...participants.filter((p) => p.id !== activator.id)].slice(
    0,
    def.requiredParticipants
  );
  for (const p of payers) {
    p.unionGauge = clamp(p.unionGauge - def.gaugeCostPerParticipant, 0, 100);
  }
  const level = activator.skillLevels?.[cmd.unionSkillId] ?? 1;
  const targets = resolveTargets(state, activator, def.target, cmd.targetId);
  // SkillEvent 組み立て用の蓄積
  const unionHits: HitResult[] = [];
  const unionHeals: HealResult[] = [];
  const unionBuffs: BuffResult[] = [];
  const unionDebuffs: DebuffResult[] = [];
  const unionReactions: BattleEvent[] = [];
  for (const effect of def.effects) {
    const r = applySkillEffect(
      state,
      activator,
      effect,
      def.element,
      level,
      targets,
      rng,
      def.target
    );
    unionHits.push(...r.hits);
    unionHeals.push(...r.heals);
    unionBuffs.push(...r.buffs);
    unionDebuffs.push(...r.debuffs);
    unionReactions.push(...r.reactions);
    // 召喚 effect があれば SummonEvent を push
    if (r.summonedId && r.summonedKind) {
      push({
        kind: 'summon-appear',
        summonerId: activator.id,
        summonId: r.summonedId,
        summonKind: r.summonedKind,
        summonName: SUMMONS[r.summonedKind]?.name,
      });
    }
  }
  // SkillEvent（ユニオン）を push
  const unionSkillEvent: SkillEvent = {
    kind: 'skill',
    actorId: activator.id,
    skillId: cmd.unionSkillId,
    unionActorIds: payers.map((p) => p.id),
    targetIds: targets.map((t) => t.id),
    hits: unionHits,
    heals: unionHeals,
    buffs: unionBuffs,
    debuffs: unionDebuffs,
    reactions: unionReactions,
  };
  push(unionSkillEvent);
}

/**
 * 1ターンを解決する（純関数）。味方コマンド＋敵AI(通常攻撃) を AGI 順に処理。
 * 乱数は注入。新しい BattleState を返す（入力は変更しない）。
 */
export function resolveTurn(state: BattleState, commands: BattleCommand[], rng: Rng): BattleState {
  if (state.outcome !== 'ongoing') return state;
  // ディープコピー（純粋性のため）
  const next: BattleState = structuredClone({ ...state, events: [] });

  /** 現時点のHPスナップショットを取る（snapshotAfter 記録用）。 */
  const takeSnapshot = (): import('./battleEvent').CombatantSnapshot => {
    const snap: import('./battleEvent').CombatantSnapshot = {};
    for (const c of [...next.allies, ...next.enemies, ...next.summons]) {
      snap[c.id] = { hp: c.hp, isDown: c.isDown };
    }
    return snap;
  };

  /** events.push のラッパー: push 直後に snapshotAfter を記録する。 */
  const pushEvent = (evt: import('./battleEvent').BattleEvent): void => {
    const withSnap = { ...evt, snapshotAfter: takeSnapshot() };
    next.events.push(withSnap);
  };

  // 通常行動のコマンド表（ユニオンは別枠なので除外する）。
  const cmdByActor = new Map(commands.filter((c) => c.kind !== 'union').map((c) => [c.actorId, c]));

  // 先制/不意打ち（[03 §10]）。ターン1のみ片側が行動不可。
  const firstStrikeActive = next.turn === 1 && next.firstStrike !== 'none';
  const skipEnemies = firstStrikeActive && next.firstStrike === 'preemptive';
  const skipAllies = firstStrikeActive && next.firstStrike === 'ambush';

  // ユニオンスキル（[03 §9]）: 通常行動とは別枠でターン冒頭に解決する。不意打ちターンは不可。
  if (!skipAllies) {
    for (const c of commands) {
      if (c.kind === 'union') resolveUnion(next, c, rng, pushEvent);
    }
  }

  // 逃走（いずれかが flee 指定 → 1回判定。不意打ちターンは味方が動けず逃走不可）
  const fleeCmd = commands.find((c) => c.kind === 'flee');
  if (!skipAllies && fleeCmd && next.outcome === 'ongoing') {
    const fleer = find(next, fleeCmd.actorId);
    if (fleer && isLegBound(fleer)) {
      // 脚封じで逃走失敗（ログ代わりに flee:success=false を push）
      pushEvent({ kind: 'flee', actorId: fleeCmd.actorId, success: false });
    } else {
      // §8.1 逃走率: base 0.4、ボス逃走不可、FOE は 0.5倍
      let rate = clamp(
        0.4 + (avgAgi(aliveSide(next, 'ally')) - avgAgi(aliveSide(next, 'enemy'))) * 0.02,
        0.05,
        0.9
      );
      if (next.enemies.some((e) => e.enemyId && ENEMIES[e.enemyId]?.kind === 'boss')) {
        rate = 0;
      } else if (next.enemies.some((e) => e.enemyId && ENEMIES[e.enemyId]?.kind === 'foe')) {
        rate *= 0.5;
      }
      if (rate > 0 && rng.next() < rate) {
        next.outcome = 'fled';
        pushEvent({ kind: 'flee', actorId: fleeCmd.actorId, success: true });
        return next;
      }
      pushEvent({ kind: 'flee', actorId: fleeCmd.actorId, success: false });
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
      pushEvent({ kind: 'defend', actorId: actor.id });
    }
  }

  // 敵AI: §3.2 アクション選択アルゴリズム
  // 乱数消費順: 各敵ごとに「①対象抽選 → ②アクション抽選 → ③効果適用」の順で固定。
  // 召喚体は最前列の壁として攻撃対象に含める（[03 §8]）。
  const enemyDecoyTargets = new Map<string, string>(); // enemyId -> picked targetId（decoy込み）
  const enemySelectedAction = new Map<string, EnemyActionDef | null>(); // null = basic
  // §15.6: bound で完全に封じられた敵の ID（行動ログ用）
  const enemyBoundCannotAct = new Set<string>();
  if (!skipEnemies) {
    for (const e of aliveSide(next, 'enemy')) {
      // ①対象抽選（decoyTargetId）
      const potentialTargets = [...aliveSummons(next), ...aliveSide(next, 'ally')];
      if (potentialTargets.length > 0) {
        enemyDecoyTargets.set(e.id, pickByDecoy(potentialTargets, rng).id);
      }
      // ②アクション抽選（候補収集 + weight 抽選）
      const master = e.enemyId ? ENEMIES[e.enemyId] : undefined;
      const actions: EnemyActionDef[] =
        master?.actions ?? (master?.kit ? (ENEMY_KITS[master.kit] ?? []) : []);
      const turn = next.turn;
      const state_ = e;
      // §15.6: 部位封じの判定（effect に str ダメージを含むか）
      const isPhysicalAction = (a: EnemyActionDef): boolean =>
        a.effects.some((ef) => ef.kind === 'damage' && ef.statBase === 'str');
      const armBound = isArmBound(e);
      const headBound = isHeadBound(e);
      const candidates: { action: EnemyActionDef | null; weight: number }[] = [];
      // 通常攻撃（basic）: armBound なら候補に入れない（物理行動）
      if (!armBound) {
        candidates.push({ action: null, weight: BASIC_WEIGHT });
      }
      for (const a of actions) {
        const c = a.cond;
        if (c) {
          if (c.hpBelow !== undefined && state_.hp / state_.maxHp > c.hpBelow) continue;
          if (c.hpAbove !== undefined && state_.hp / state_.maxHp < c.hpAbove) continue;
          if (c.minTurn !== undefined && turn < c.minTurn) continue;
          if (c.maxUses !== undefined) {
            const uses = state_.actionState?.[a.id]?.uses ?? 0;
            if (uses >= c.maxUses) continue;
          }
          if (c.cooldown !== undefined) {
            const lastUsed = state_.actionState?.[a.id]?.lastUsedTurn ?? -Infinity;
            if (turn - lastUsed < c.cooldown) continue;
          }
        }
        // §15.6: 腕封じ = 物理アクション除外、頭封じ = 頭系（非物理）アクション除外
        if (armBound && isPhysicalAction(a)) continue;
        if (headBound && !isPhysicalAction(a)) continue;
        candidates.push({ action: a, weight: a.weight });
      }
      // §15.6: 候補が空なら「封じられて動けない」
      if (candidates.length === 0) {
        enemyBoundCannotAct.add(e.id);
        enemySelectedAction.set(e.id, null);
        continue;
      }
      // weight 抽選
      const totalWeight = candidates.reduce((s, c) => s + c.weight, 0);
      let r = rng.next() * totalWeight;
      let selected: EnemyActionDef | null = null;
      for (const c of candidates) {
        r -= c.weight;
        if (r < 0) {
          selected = c.action;
          break;
        }
      }
      if (selected === undefined) selected = null; // フォールバック
      enemySelectedAction.set(e.id, selected);
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
      continue; // ログなし（UI は event がないことで無行動を表現）
    }
    // 麻痺: 30% で行動不能
    if (isParalyzed(actor) && rng.next() < BALANCE.PARALYSIS_SKIP) {
      continue; // ログなし
    }

    // 召喚体（[03 §8]）: actsOnTurn なら生存敵を1体自律攻撃。壁のみの個体は行動しない。
    if (actor.isSummon) {
      const m = actor.summonKind ? SUMMONS[actor.summonKind] : undefined;
      if (m?.actsOnTurn) {
        const enemies = aliveSide(next, 'enemy');
        if (enemies.length > 0) basicAttack(next, actor, rng.pick(enemies), rng, pushEvent);
      }
      if (aliveSide(next, 'enemy').length === 0) break;
      continue;
    }

    if (actor.side === 'enemy') {
      // §15.6: 候補が空で動けない場合（部位封じで全行動ブロック）
      if (enemyBoundCannotAct.has(actor.id)) {
        continue; // ログなし
      }
      // §3.2 ③効果適用
      const selectedAction = enemySelectedAction.get(actor.id);
      const decoyTargetId = enemyDecoyTargets.get(actor.id);
      if (selectedAction === null || selectedAction === undefined) {
        // basic フォールバック: 通常攻撃
        const target = decoyTargetId ? find(next, decoyTargetId) : undefined;
        const t = target && !target.isDown ? target : aliveSide(next, 'ally')[0];
        if (t) basicAttack(next, actor, t, rng, pushEvent);
      } else {
        // スキルアクション適用
        const targets = resolveTargets(next, actor, selectedAction.target, decoyTargetId ?? '');
        // SkillEvent 組み立て用
        const skillHits: HitResult[] = [];
        const skillHeals: HealResult[] = [];
        const skillBuffs: BuffResult[] = [];
        const skillDebuffs: DebuffResult[] = [];
        const skillReactions: BattleEvent[] = [];
        for (const effect of selectedAction.effects) {
          const r = applySkillEffect(
            next,
            actor,
            effect,
            selectedAction.element,
            1,
            targets,
            rng,
            selectedAction.target
          );
          skillHits.push(...r.hits);
          skillHeals.push(...r.heals);
          skillBuffs.push(...r.buffs);
          skillDebuffs.push(...r.debuffs);
          skillReactions.push(...r.reactions);
          // 召喚 effect があれば SummonEvent を push
          if (r.summonedId && r.summonedKind) {
            pushEvent({
              kind: 'summon-appear',
              summonerId: actor.id,
              summonId: r.summonedId,
              summonKind: r.summonedKind,
              summonName: SUMMONS[r.summonedKind]?.name,
            });
          }
        }
        pushEvent({
          kind: 'skill',
          actorId: actor.id,
          skillId: selectedAction.id,
          targetIds: targets.map((t) => t.id),
          hits: skillHits,
          heals: skillHeals,
          buffs: skillBuffs,
          debuffs: skillDebuffs,
          reactions: skillReactions,
        });
        // actionState 更新
        if (!actor.actionState) actor.actionState = {};
        actor.actionState[selectedAction.id] = {
          lastUsedTurn: next.turn,
          uses: (actor.actionState[selectedAction.id]?.uses ?? 0) + 1,
        };
      }
    } else {
      const cmd = cmdByActor.get(actor.id);
      if (!cmd || cmd.kind === 'guard' || cmd.kind === 'flee') continue;
      if (cmd.kind === 'attack') {
        if (isArmBound(actor)) {
          continue; // 腕封じで攻撃不可（ログなし）
        }
        const target = find(next, cmd.targetId);
        const t = target && !target.isDown ? target : aliveSide(next, 'enemy')[0];
        if (t) basicAttack(next, actor, t, rng, pushEvent);
      } else if (cmd.kind === 'skill') {
        const def = BATTLE_SKILLS[cmd.skillId];
        if (!def) continue;
        // 部位封じでスキル不可（腕系スキル＝armBind / 頭系スキル＝headBind。[03 §6]）
        if (skillUsesArm(def) && isArmBound(actor)) {
          continue; // 腕封じ
        }
        if (!skillUsesArm(def) && isHeadBound(actor)) {
          continue; // 頭封じ
        }
        const level = actor.skillLevels?.[cmd.skillId] ?? 1;
        const cost = computeSkillTpCost(def, level);
        if (actor.tp < cost) {
          continue; // TP 不足（ログなし）
        }
        actor.tp -= cost;
        gainUnion(actor, 10);
        const targets = skillTargets(next, actor, def, cmd.targetId);
        // SkillEvent 組み立て用
        const allySkillHits: HitResult[] = [];
        const allySkillHeals: HealResult[] = [];
        const allySkillBuffs: BuffResult[] = [];
        const allySkillDebuffs: DebuffResult[] = [];
        const allySkillReactions: BattleEvent[] = [];
        for (const effect of def.effects) {
          const r = applySkillEffect(
            next,
            actor,
            effect,
            def.element,
            level,
            targets,
            rng,
            def.target
          );
          allySkillHits.push(...r.hits);
          allySkillHeals.push(...r.heals);
          allySkillBuffs.push(...r.buffs);
          allySkillDebuffs.push(...r.debuffs);
          allySkillReactions.push(...r.reactions);
          // 召喚 effect があれば SummonEvent を push
          if (r.summonedId && r.summonedKind) {
            pushEvent({
              kind: 'summon-appear',
              summonerId: actor.id,
              summonId: r.summonedId,
              summonKind: r.summonedKind,
              summonName: SUMMONS[r.summonedKind]?.name,
            });
          }
        }
        pushEvent({
          kind: 'skill',
          actorId: actor.id,
          skillId: cmd.skillId,
          targetIds: targets.map((t) => t.id),
          hits: allySkillHits,
          heals: allySkillHeals,
          buffs: allySkillBuffs,
          debuffs: allySkillDebuffs,
          reactions: allySkillReactions,
        });
      } else if (cmd.kind === 'item') {
        const item = ITEMS[cmd.itemId];
        if (!item || !item.useContext?.includes('battle')) continue;
        const target = find(next, cmd.targetId) ?? actor;
        let itemEffect: import('@/domain/battleEvent').ItemEffect | undefined;
        for (const eff of item.effects ?? []) {
          if (eff.kind === 'heal') {
            const healAmt = eff.amount(1);
            target.hp = clamp(target.hp + healAmt, 0, target.maxHp);
            itemEffect = { kind: 'heal', amount: healAmt };
          } else if (eff.kind === 'restoreTp') {
            // ratio 指定があれば最大TPの割合で回復（高レベルでも有効）。なければ固定値。
            const add = eff.ratio ? Math.round(target.maxTp * eff.ratio) : eff.amount(1);
            target.tp = clamp(target.tp + add, 0, target.maxTp);
            itemEffect = { kind: 'tp-restore', amount: add };
          }
        }
        next.consumedItems.push(cmd.itemId);
        if (itemEffect) {
          pushEvent({
            kind: 'item-use',
            actorId: actor.id,
            itemId: cmd.itemId,
            targetId: target.id,
            effect: itemEffect,
          });
        }
      }
    }
    // 途中勝敗チェック
    if (aliveSide(next, 'enemy').length === 0 || aliveSide(next, 'ally').length === 0) break;
  }

  // ターン終了処理: 毒ダメージ → バフ/状態異常の残ターン減算（召喚体も含む）
  for (const c of [...next.allies, ...next.enemies, ...next.summons]) {
    if (c.isDown) continue;
    const poison = c.ailments.find((a) => a.type === 'poison');
    if (poison) {
      const dmg = poison.magnitude ?? Math.max(1, Math.floor(c.maxHp * BALANCE.POISON_HP_RATIO));
      const dealLogs = dealDamage(c, dmg);
      void dealLogs; // ログ廃止のため使わないが dealDamage の副作用（HP減算・isDown 更新）は必要
      // TickEvent: poison
      pushEvent({
        kind: 'tick',
        targetId: c.id,
        effectType: 'poison',
        amount: dmg,
        defeated: c.isDown,
      });
    }
  }
  // リジェネ（継続回復・[issue #41]）。毒の後、残ターン減算の前にHPを回復する。
  for (const c of [...next.allies, ...next.enemies, ...next.summons]) {
    if (c.isDown || !c.states) continue;
    for (const s of c.states) {
      if (s.kind !== 'regen') continue;
      const before = c.hp;
      c.hp = clamp(c.hp + s.amount, 0, c.maxHp);
      if (c.hp > before) {
        // TickEvent: regen
        pushEvent({
          kind: 'tick',
          targetId: c.id,
          effectType: 'regen',
          amount: c.hp - before,
        });
      }
    }
  }
  for (const c of [...next.allies, ...next.enemies, ...next.summons]) {
    // 戦闘中の TP 自然回復は廃止（issue #57 第2弾）。TP はアイテム/スキルで管理する有限資源とする。
    // バフ期限切れの TickEvent を生成してから減算する。
    const expiringBuffs = c.buffs.filter((b) => b.remainingTurns <= 1);
    for (const b of expiringBuffs) {
      pushEvent({
        kind: 'tick',
        targetId: c.id,
        effectType: 'buff-expire',
        effect: b.stat as BuffKind,
      });
    }
    c.buffs = c.buffs
      .map((b) => ({ ...b, remainingTurns: b.remainingTurns - 1 }))
      .filter((b) => b.remainingTurns > 0);
    // デバフ（状態異常）期限切れの TickEvent を生成してから減算する。
    const expiringAilments = c.ailments.filter((a) => a.remainingTurns <= 1);
    for (const a of expiringAilments) {
      pushEvent({
        kind: 'tick',
        targetId: c.id,
        effectType: 'debuff-expire',
        effect: a.type,
      });
    }
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
        // ドロップはログなし（リザルト画面で表示する）
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

/**
 * 勝利報酬（経験値・所持金。出現階でスケール）。
 * deepestReached を渡すと §8.3 の下層ファーム減衰を適用する。
 * partyAvgLv を渡すとレベル超過減衰を追加適用する（decay_band * decay_lv の積）。
 */
export function battleRewards(
  state: BattleState,
  deepestReached?: number,
  partyAvgLv?: number
): { exp: number; gold: number } {
  let exp = 0;
  let gold = 0;
  // §8.3 下層ファーム減衰（ドロップ率は据え置き）
  const deepBand = deepestReached !== undefined ? encounterTier(deepestReached) : undefined;
  const curBand = encounterTier(state.depth);
  const decay =
    deepBand !== undefined
      ? Math.pow(BALANCE.FARM_EXP_DECAY_PER_BAND, Math.max(0, deepBand - curBand))
      : 1;
  // レベル超過減衰（decay_band と積算）
  const decay_lv = partyAvgLv !== undefined ? levelDecay(partyAvgLv, state.depth) : 1;
  for (const e of state.enemies) {
    if (!e.enemyId) continue;
    const master = ENEMIES[e.enemyId];
    const scale = enemyScale(state.depth, master.refDepth);
    exp += Math.round(master.exp * scale * decay * decay_lv);
    gold += Math.round(master.gold * scale * decay * decay_lv);
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
  /** 戦闘前の、現レベル内での経験値（バー開始位置）。 */
  fromExp: number;
  /** 戦闘前レベルの次レベル必要経験値（Lv上限なら 0）。 */
  fromExpToNext: number;
  /** レベルアップした場合の素ステータス増分（しなければ空）。 */
  statGains: Partial<Stats>;
}

/**
 * BattleState の生存している味方から guild.members を逆引きしてパーティ平均レベルを返す。
 * Combatant は level を持たないため Character 側を参照する。
 */
function partyAverageLevel(save: SaveData, state: BattleState): number {
  const aliveIds = new Set(state.allies.filter((a) => !a.isDown).map((a) => a.id));
  if (aliveIds.size === 0) return 1;
  const alive = save.guild.members.filter((m) => aliveIds.has(m.id));
  if (alive.length === 0) return 1;
  return alive.reduce((acc, m) => acc + m.level, 0) / alive.length;
}

/** 戦闘勝利時の各メンバーの経験値獲得・レベルアップ結果（リザルト画面用。純粋・副作用なし）。 */
export function partyExpResults(save: SaveData, state: BattleState): LevelUpResult[] {
  if (state.outcome !== 'win' || !save.diveState) return [];
  const deepestReached = save.towerState.record.deepestReached;
  const avgLv = partyAverageLevel(save, state);
  const { exp } = battleRewards(state, deepestReached, avgLv);
  const partyIds = new Set(save.diveState.party.map((p) => p.charId));
  const downedIds = new Set(state.allies.filter((a) => a.isDown).map((a) => a.id));
  // 経験値は生存している出撃メンバーのみで分配する（戦闘不能者は取り分なし。issue #50）
  const aliveCount = [...partyIds].filter((id) => !downedIds.has(id)).length;
  const share = aliveCount > 0 ? Math.floor(exp / aliveCount) : 0;
  const results: LevelUpResult[] = [];
  for (const m of save.guild.members) {
    if (!partyIds.has(m.id)) continue;
    if (downedIds.has(m.id)) {
      results.push({
        charId: m.id,
        name: m.name,
        gainedExp: 0,
        fromLevel: m.level,
        toLevel: m.level,
        exp: m.exp,
        expToNext: canGainExp(m.level) ? expToNext(m.level) : 0,
        fromExp: m.exp,
        fromExpToNext: canGainExp(m.level) ? expToNext(m.level) : 0,
        statGains: {},
      });
      continue;
    }
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
      fromExp: m.exp,
      fromExpToNext: canGainExp(m.level) ? expToNext(m.level) : 0,
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
    const deepestReached = save.towerState.record.deepestReached;
    const avgLv = partyAverageLevel(save, state);
    const { exp, gold: dropGold } = battleRewards(state, deepestReached, avgLv);
    gold += dropGold;
    const partyIds = new Set(party.map((p) => p.charId));
    const downedIds = new Set(state.allies.filter((a) => a.isDown).map((a) => a.id));
    // 経験値は生存している出撃メンバーのみで分配する（issue #50）
    const aliveCount = [...partyIds].filter((id) => !downedIds.has(id)).length;
    const share = aliveCount > 0 ? Math.floor(exp / aliveCount) : 0;
    members = members.map((m) =>
      partyIds.has(m.id) && !downedIds.has(m.id) ? grantExpToChar(m, share) : m
    );
  }

  // 戦闘をまたいで残る召喚体（[03 §8]）: 生存かつ persistsAfterBattle のみ次戦闘へ持ち越す。
  // 戦闘限りの召喚体・戦闘不能の召喚体は破棄。拠点帰還で diveState ごと消える。
  const persistentSummons = state.summons
    .filter((s) => !s.isDown && s.summonKind && SUMMONS[s.summonKind]?.persistsAfterBattle)
    .map((s) => ({ summonKind: s.summonKind as SummonKind, ownerId: s.ownerId ?? '', hp: s.hp }));

  // 戦闘後エンカウント再初期化: levelDecay を反映した新しい stepsUntilEncounter を設定する。
  // これにより過レベル時のエンカウント率低下（減衰）が戦闘後にも正しく反映される。
  const postBattleAvgLv = partyAverageLevel(save, state);
  const postBattleDecay = levelDecay(postBattleAvgLv, save.diveState.depth);
  const postBattleRng = createRng(
    (save.masterSeed ^ (save.diveState.depth * 0x9e3779b9) ^ (state.turn * 0x6c62272e)) >>> 0
  );
  const nextStepsUntilEncounter = initEncounter(postBattleRng, {
    encounterRateDecay: postBattleDecay,
  });

  let next: SaveData = {
    ...save,
    guild: { ...save.guild, members, gold, bestiary },
    bestiary,
    diveState: {
      ...save.diveState,
      party,
      persistentSummons,
      encounter: { stepsUntilEncounter: nextStepsUntilEncounter },
    },
  };

  // 倉庫: 戦闘で使ったアイテムを減算（勝敗問わず）
  for (const id of state.consumedItems) next = removeItem(next, id, 1);
  // 倉庫: 勝利時のみドロップを加算（周回数=グレード。2周目以降は素材が LvN 化。[06 §3]）
  const dropGrade = enemyLapForDepth(state.depth);
  if (win) for (const d of state.drops) next = addItem(next, d.itemId, 1, dropGrade);
  return next;
}

// ---- シミュレーション用ヘルパ（§17 忠実シミュ用。既存挙動は変えない純粋な追加）---

/**
 * シミュレーション専用: Combatant 配列から BattleState を直接構築する。
 * SaveData を必要とせず、balanceSim.test.ts / balanceSim.mjs から呼ぶ。
 * 既存の startBattle / resolveTurn は変更しない。
 */
export function buildSimBattleState(
  allies: Combatant[],
  enemies: Combatant[],
  depth: number
): BattleState {
  return {
    turn: 1,
    depth,
    allies,
    enemies,
    summons: [],
    events: [],
    outcome: 'ongoing',
    firstStrike: 'none',
    drops: [],
    consumedItems: [],
  };
}
