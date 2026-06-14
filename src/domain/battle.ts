import { BALANCE, canGainExp, enemyScale, expToNext } from '@/data/balance';
import { BATTLE_SKILLS } from '@/data/battleSkills';
import { ENEMIES } from '@/data/enemies';
import { EQUIPMENT } from '@/data/equipment';
import { ITEMS } from '@/data/items';
import { computeDamage, effectiveEnemyStats } from '@/domain/combat';
import { addItem, removeItem } from '@/domain/inventory';
import { computeBaseStats } from '@/domain/stats';
import type {
  ActiveAilment,
  ActiveBuff,
  BattleCommand,
  BattleSkillDef,
  BattleState,
  Character,
  Combatant,
  Element,
  EnemyId,
  EquipBonuses,
  Rng,
  SaveData,
  SkillEffectDef,
} from '@/domain/types';

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
  for (const id of Object.values(char.equipment)) {
    if (!id) continue;
    const eq = EQUIPMENT[id];
    if (!eq) continue;
    acc.atk += eq.bonuses.atk ?? 0;
    acc.mat += eq.bonuses.mat ?? 0;
    acc.def += eq.bonuses.def ?? 0;
    acc.mdf += eq.bonuses.mdf ?? 0;
  }
  return acc;
}

/** 味方の戦闘員を組む。HP/TP/ゲージ/状態異常は diveState の現在値を引き継ぐ。 */
function buildAlly(save: SaveData, charId: string): Combatant | null {
  const char = save.guild.members.find((m) => m.id === charId);
  if (!char) return null;
  const member = save.diveState?.party.find((p) => p.charId === charId);
  const stats = computeBaseStats(char);
  const front = save.guild.party.front.includes(charId);
  return {
    id: charId,
    name: char.name,
    side: 'ally',
    row: front ? 'front' : 'back',
    stats,
    equip: aggregateEquip(char),
    hp: member ? member.hp : stats.hp,
    maxHp: stats.hp,
    tp: member ? member.tp : stats.tp,
    maxTp: stats.tp,
    buffs: [],
    ailments: member ? [...member.ailments] : [],
    unionGauge: member?.unionGauge ?? 0,
    isDown: member ? member.hp <= 0 : false,
  };
}

/** 敵の戦闘員を組む（出現階でスケール）。 */
function buildEnemy(enemyId: EnemyId, index: number, depth: number): Combatant {
  const master = ENEMIES[enemyId];
  const stats = effectiveEnemyStats(master, depth);
  return {
    id: `enemy_${index}`,
    name: master.name,
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

/** 戦闘を開始し BattleState を生成する。出撃中の編成メンバーが味方になる。 */
export function startBattle(save: SaveData, enemyIds: EnemyId[]): BattleState {
  const depth = save.diveState?.depth ?? 1;
  const partyIds = [...save.guild.party.front, ...save.guild.party.back].filter(
    (id): id is string => id !== null
  );
  const allies = partyIds
    .map((id) => buildAlly(save, id))
    .filter((c): c is Combatant => c !== null);
  const enemies = enemyIds.map((id, i) => buildEnemy(id, i, depth));
  return {
    turn: 1,
    depth,
    allies,
    enemies,
    log: [],
    outcome: 'ongoing',
    drops: [],
    consumedItems: [],
  };
}

// ---- 効果適用ヘルパ -------------------------------------------------------

const aliveSide = (state: BattleState, side: 'ally' | 'enemy') =>
  (side === 'ally' ? state.allies : state.enemies).filter((c) => !c.isDown);

function find(state: BattleState, id: string): Combatant | undefined {
  return state.allies.find((c) => c.id === id) ?? state.enemies.find((c) => c.id === id);
}

const elementMult = (target: Combatant, element: Element): number => target.resist?.[element] ?? 1;

function dealDamage(target: Combatant, dmg: number, log: BattleState['log']): void {
  target.hp = clamp(target.hp - dmg, 0, target.maxHp);
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
  // 同 (stat, stackGroup) は1つに（リフレッシュ）
  target.buffs = target.buffs.filter(
    (b) => !(b.stat === buff.stat && b.stackGroup === buff.stackGroup)
  );
  target.buffs.push(buff);
}

function applyAilment(target: Combatant, a: ActiveAilment): void {
  const existing = target.ailments.find((x) => x.type === a.type);
  if (existing) {
    existing.remainingTurns = Math.max(existing.remainingTurns, a.remainingTurns);
    return;
  }
  target.ailments.push(a);
}

/** 状態異常の付与確率（[03 §6.2]）。 */
function ailmentChance(base: number, attacker: Combatant, defender: Combatant): number {
  return clamp(
    base * (1 + (attacker.stats.luc - defender.stats.luc) * BALANCE.AILMENT_LUC_K),
    0,
    BALANCE.AILMENT_MAX
  );
}

function skillTargets(
  state: BattleState,
  actor: Combatant,
  def: BattleSkillDef,
  targetId: string
): Combatant[] {
  switch (def.target) {
    case 'self':
      return [actor];
    case 'allyAll':
      return aliveSide(state, actor.side);
    case 'allyOne': {
      const t = find(state, targetId);
      return t ? [t] : [];
    }
    case 'enemyAll':
      return aliveSide(state, actor.side === 'ally' ? 'enemy' : 'ally');
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const t = find(state, targetId);
      return t ? [t] : [];
    }
  }
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
      for (const target of targets) {
        if (target.isDown) continue;
        for (let h = 0; h < hits; h++) {
          const res = computeDamage(
            actor,
            target,
            {
              statBase: effect.statBase,
              power: effect.power(level),
              element,
              elementMultiplier: elementMult(target, element),
            },
            rng
          );
          if (res.hit) {
            dealDamage(target, res.damage, state.log);
            gainUnion(target, 5);
            state.log.push({
              text: `${actor.name} の攻撃！ ${target.name} に ${res.damage} ダメージ${res.critical ? '（会心）' : ''}`,
            });
          } else {
            state.log.push({ text: `${actor.name} の攻撃は外れた` });
          }
        }
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
          state.log.push({ text: `${target.name} は${effect.ailment}になった` });
        }
      }
      break;
    }
    default:
      break;
  }
}

/** 通常攻撃（物理・武器属性 or 素手 bash）。 */
function basicAttack(state: BattleState, actor: Combatant, target: Combatant, rng: Rng): void {
  if (target.isDown) return;
  const element: Element = actor.enemyId
    ? (ENEMIES[actor.enemyId].attackElement ?? 'bash')
    : 'bash';
  const res = computeDamage(
    actor,
    target,
    { statBase: 'str', power: 1, element, elementMultiplier: elementMult(target, element) },
    rng
  );
  if (res.hit) {
    dealDamage(target, res.damage, state.log);
    gainUnion(actor, 5);
    gainUnion(target, 5);
    state.log.push({
      text: `${actor.name} の攻撃！ ${target.name} に ${res.damage} ダメージ${res.critical ? '（会心）' : ''}`,
    });
  } else {
    state.log.push({ text: `${actor.name} の攻撃は外れた` });
  }
}

const avgAgi = (cs: Combatant[]) =>
  cs.length === 0 ? 0 : cs.reduce((s, c) => s + c.stats.agi, 0) / cs.length;

const isParalyzed = (c: Combatant) => c.ailments.some((a) => a.type === 'paralysis');

/**
 * 1ターンを解決する（純関数）。味方コマンド＋敵AI(通常攻撃) を AGI 順に処理。
 * 乱数は注入。新しい BattleState を返す（入力は変更しない）。
 */
export function resolveTurn(state: BattleState, commands: BattleCommand[], rng: Rng): BattleState {
  if (state.outcome !== 'ongoing') return state;
  // ディープコピー（純粋性のため）
  const next: BattleState = structuredClone({ ...state, log: [] });
  const cmdByActor = new Map(commands.map((c) => [c.actorId, c]));

  // 逃走（いずれかが flee 指定 → 1回判定）
  if (commands.some((c) => c.kind === 'flee')) {
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

  // ガード: 防御コマンドは pdef/mdef を一時上昇（このターン）
  for (const c of commands) {
    if (c.kind !== 'guard') continue;
    const actor = find(next, c.actorId);
    if (!actor || actor.isDown) continue;
    addBuff(actor, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' });
    addBuff(actor, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' });
  }

  // 敵AI: 生存敵は生存味方の誰かを通常攻撃
  const enemyCommands = new Map<string, string>(); // enemyId -> targetAllyId
  for (const e of aliveSide(next, 'enemy')) {
    const targets = aliveSide(next, 'ally');
    if (targets.length > 0) enemyCommands.set(e.id, rng.pick(targets).id);
  }

  // 行動順（生存者のみ、AGI 降順・rng タイブレーク）
  const actors = [...next.allies, ...next.enemies]
    .filter((c) => !c.isDown)
    .map((c) => ({ c, agi: c.stats.agi, tie: rng.next() }))
    .sort((a, b) => b.agi - a.agi || b.tie - a.tie)
    .map((x) => x.c);

  for (const actor of actors) {
    if (actor.isDown) continue;
    if (next.outcome !== 'ongoing') break;
    // 麻痺: 30% で行動不能
    if (isParalyzed(actor) && rng.next() < BALANCE.PARALYSIS_SKIP) {
      next.log.push({ text: `${actor.name} は麻痺で動けない` });
      continue;
    }

    if (actor.side === 'enemy') {
      const targetId = enemyCommands.get(actor.id);
      const target = targetId ? find(next, targetId) : undefined;
      const t = target && !target.isDown ? target : aliveSide(next, 'ally')[0];
      if (t) basicAttack(next, actor, t, rng);
    } else {
      const cmd = cmdByActor.get(actor.id);
      if (!cmd || cmd.kind === 'guard' || cmd.kind === 'flee') continue;
      if (cmd.kind === 'attack') {
        const target = find(next, cmd.targetId);
        const t = target && !target.isDown ? target : aliveSide(next, 'enemy')[0];
        if (t) basicAttack(next, actor, t, rng);
      } else if (cmd.kind === 'skill') {
        const def = BATTLE_SKILLS[cmd.skillId];
        if (!def) continue;
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

  // ターン終了処理: 毒ダメージ → TP自然回復 → バフ/状態異常の残ターン減算
  for (const c of [...next.allies, ...next.enemies]) {
    if (c.isDown) continue;
    const poison = c.ailments.find((a) => a.type === 'poison');
    if (poison) {
      const dmg = poison.magnitude ?? Math.max(1, Math.floor(c.maxHp * BALANCE.POISON_HP_RATIO));
      dealDamage(c, dmg, next.log);
      next.log.push({ text: `${c.name} は毒で ${dmg} のダメージ` });
    }
  }
  for (const c of [...next.allies, ...next.enemies]) {
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

/** キャラに経験値を与え、必要ならレベルアップ（Lv上限で経験値は無効）。 */
function grantExpToChar(char: Character, exp: number): Character {
  let level = char.level;
  let curExp = char.exp + (canGainExp(level) ? exp : 0);
  let sp = char.skillPoints.total;
  while (canGainExp(level) && curExp >= expToNext(level)) {
    curExp -= expToNext(level);
    level += 1;
    sp += BALANCE.SP_PER_LEVEL;
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

  // 図鑑: 遭遇した敵は seen、撃破した敵は defeated（勝敗を問わず記録）
  const monsters = { ...save.bestiary.monsters };
  for (const e of state.enemies) {
    if (!e.enemyId) continue;
    const prev = monsters[e.enemyId] ?? { seen: false, defeated: false, dropsFound: [] };
    monsters[e.enemyId] = { ...prev, seen: true, defeated: prev.defeated || e.isDown };
  }
  const bestiary = { ...save.bestiary, monsters };

  if (win) {
    const { exp, gold: dropGold } = battleRewards(state);
    gold += dropGold;
    const partyIds = new Set(party.map((p) => p.charId));
    const share = partyIds.size > 0 ? Math.floor(exp / partyIds.size) : 0;
    members = members.map((m) => (partyIds.has(m.id) ? grantExpToChar(m, share) : m));
    // 図鑑: 入手したドロップを記録
    for (const d of state.drops) {
      const prev = monsters[d.enemyId];
      if (prev && !prev.dropsFound.includes(d.itemId)) {
        monsters[d.enemyId] = { ...prev, dropsFound: [...prev.dropsFound, d.itemId] };
      }
    }
  }

  let next: SaveData = {
    ...save,
    guild: { ...save.guild, members, gold, bestiary },
    bestiary,
    diveState: { ...save.diveState, party },
  };

  // 倉庫: 戦闘で使ったアイテムを減算（勝敗問わず）
  for (const id of state.consumedItems) next = removeItem(next, id, 1);
  // 倉庫: 勝利時のみドロップを加算
  if (win) for (const d of state.drops) next = addItem(next, d.itemId, 1);
  return next;
}
