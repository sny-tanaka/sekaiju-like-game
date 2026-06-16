/**
 * balanceSimFaithful.ts – §17 忠実シミュレーション（実 resolveTurn 駆動）
 *
 * src/domain/balanceSim.test.ts の AC1/AC3/AC5 を手動で実行し詳細ログを出力する。
 * vitest ではなく vite-node で直接実行する（node scripts/balanceSim.mjs 経由）。
 *
 * 設計目標:
 *   AC1: ボス 18〜22ターン / 勝利 / 最低パーティHP率 ≤ 15%
 *   AC2: 格下雑魚 3〜5ターン / ボス適正で同雑魚 1〜2ターン
 *   AC3: FOE 6〜10ターン / 勝利
 *   AC5: EXP 自然進行で残り 3〜5Lv
 */

import { APPROPRIATE, expToNext } from '@/data/balance';
import { ENEMIES } from '@/data/enemies';
import { RACES } from '@/data/races';
import { resolveEnemyAilmentResist } from '@/domain/ailment';
import { buildSimBattleState, resolveTurn } from '@/domain/battle';
import { effectiveEnemyStats } from '@/domain/combat';
import { createRng } from '@/domain/rng';
import type {
  BattleCommand,
  BattleState,
  Combatant,
  EnemyId,
  EquipBonuses,
  Rng,
  Stats,
} from '@/domain/types';

// ============================================================================
// 種族ステータス（races.ts データ準拠）
// ============================================================================
const RACE_STATS = {
  race_garon: {
    base: { hp: 55, tp: 12, str: 11, vit: 11, agi: 5, int: 4, mnd: 6, luc: 6 },
    growth: { hp: 12, tp: 2, str: 3, vit: 3, agi: 1, int: 1, mnd: 2, luc: 2 },
  },
  race_human: {
    base: { hp: 40, tp: 20, str: 8, vit: 8, agi: 8, int: 8, mnd: 8, luc: 8 },
    growth: { hp: 8, tp: 4, str: 2, vit: 2, agi: 2, int: 2, mnd: 2, luc: 2 },
  },
  race_golan: {
    base: { hp: 60, tp: 10, str: 12, vit: 13, agi: 4, int: 3, mnd: 6, luc: 5 },
    growth: { hp: 13, tp: 2, str: 3, vit: 3, agi: 1, int: 1, mnd: 1, luc: 2 },
  },
  race_pix: {
    base: { hp: 28, tp: 32, str: 4, vit: 5, agi: 9, int: 12, mnd: 11, luc: 7 },
    growth: { hp: 5, tp: 7, str: 1, vit: 1, agi: 2, int: 3, mnd: 3, luc: 2 },
  },
  race_lunar: {
    base: { hp: 30, tp: 28, str: 5, vit: 6, agi: 8, int: 10, mnd: 12, luc: 10 },
    growth: { hp: 5, tp: 6, str: 1, vit: 1, agi: 2, int: 3, mnd: 3, luc: 3 },
  },
} as const;

type RaceKey = keyof typeof RACE_STATS;

function statsAtLv(raceId: RaceKey, lv: number): Stats {
  const r = RACE_STATS[raceId];
  const keys = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'] as const;
  const s: Record<string, number> = {};
  for (const k of keys) s[k] = r.base[k] + r.growth[k] * (lv - 1);
  return s as Stats;
}

function equipAtk(tier: number, coef = 1.0): number {
  return Math.round(Math.round(8 * Math.pow(1.62, tier)) * coef);
}
function equipDef(tier: number, coef = 1.0): number {
  return Math.round(Math.round(8 * Math.pow(1.55, tier)) * coef);
}

// ============================================================================
// 標準パーティ定義（§13.1）
// ============================================================================
const PARTY_DEFS = [
  {
    id: 'sim_shield',
    name: '盾(ガロン守護兵)',
    raceId: 'race_garon' as RaceKey,
    role: 'shield',
    weaponCoef: 1.0,
    isMag: false,
    defCoef: 1.0,
    mdfCoef: 0.4,
    skillId: 'skill_provoke',
    row: 'front' as const,
  },
  {
    id: 'sim_warrior',
    name: '戦(ヒト戦士)',
    raceId: 'race_human' as RaceKey,
    role: 'warrior',
    weaponCoef: 0.97,
    isMag: false,
    defCoef: 1.0,
    mdfCoef: 0.4,
    skillId: 'skill_power_slash',
    row: 'front' as const,
  },
  {
    id: 'sim_monk',
    name: '拳(ゴラン拳聖)',
    raceId: 'race_golan' as RaceKey,
    role: 'monk',
    weaponCoef: 0.85,
    isMag: false,
    defCoef: 0.7,
    mdfCoef: 0.55,
    skillId: 'skill_triple_strike',
    row: 'front' as const,
  },
  {
    id: 'sim_mage',
    name: '魔(ピクス魔導士)',
    raceId: 'race_pix' as RaceKey,
    role: 'mage',
    weaponCoef: 1.0,
    isMag: true,
    defCoef: 0.4,
    mdfCoef: 0.95,
    skillId: 'skill_fire_bolt',
    row: 'back' as const,
  },
  {
    id: 'sim_medic',
    name: '薬(ルーナ薬師)',
    raceId: 'race_lunar' as RaceKey,
    role: 'medic',
    weaponCoef: 1.0,
    isMag: true,
    defCoef: 0.4,
    mdfCoef: 0.95,
    skillId: null,
    row: 'back' as const,
  },
];

type Def = (typeof PARTY_DEFS)[0];

function buildAlly(def: Def, lv: number, tier: number): Combatant {
  const stats = statsAtLv(def.raceId, lv);
  const atk = def.isMag ? 0 : equipAtk(tier, def.weaponCoef);
  const mat = def.isMag ? equipAtk(tier, def.weaponCoef) : 0;
  const defVal = equipDef(tier, def.defCoef);
  const mdf = equipDef(tier, def.mdfCoef);
  const equip: EquipBonuses = { atk, mat, def: defVal, mdf };
  const race = RACES[def.raceId];
  return {
    id: def.id,
    name: def.name,
    side: 'ally',
    row: def.row,
    stats,
    equip,
    hp: stats.hp,
    maxHp: stats.hp,
    tp: stats.tp,
    maxTp: stats.tp,
    buffs: [],
    ailments: [],
    states: [],
    passive: {},
    unionGauge: 0,
    isDown: false,
    resist: race?.elementResist,
    ailmentResist: race?.ailmentResist,
    skillLevels: buildSkillLevels(lv),
  };
}

function buildParty(lv: number, tier: number): Combatant[] {
  return PARTY_DEFS.map((d) => buildAlly(d, lv, tier));
}

function buildEnemyCombatant(enemyId: EnemyId, index: number, depth: number): Combatant {
  const master = ENEMIES[enemyId];
  const stats = effectiveEnemyStats(master, depth);
  return {
    id: `sim_enemy_${index}`,
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
    states: [],
    unionGauge: 0,
    isDown: false,
    enemyId,
    resist: master.resist,
    ailmentResist: resolveEnemyAilmentResist(enemyId),
  };
}

// ============================================================================
// スキルLvモデル（§2）
// ============================================================================

const SKILL_MAX_LEVEL: Record<string, number> = {
  skill_power_slash: 5,
  skill_triple_strike: 5,
  skill_fire_bolt: 5,
  skill_heal: 5,
  skill_mass_heal: 5,
  skill_provoke: 3,
  skill_shield_bash: 5,
};

function skillLvAtCharLv(charLv: number, maxLevel: number): number {
  return Math.max(1, Math.min(maxLevel, 1 + Math.floor((charLv - 1) / 8)));
}

function buildSkillLevels(charLv: number): Record<string, number> {
  const levels: Record<string, number> = {};
  for (const [skillId, maxLv] of Object.entries(SKILL_MAX_LEVEL)) {
    levels[skillId] = skillLvAtCharLv(charLv, maxLv);
  }
  return levels;
}

// ============================================================================
// スクリプトAI（§13.1 / §17-1）
// ============================================================================

function skillTpCost(skillId: string, skillLv: number): number {
  switch (skillId) {
    case 'skill_provoke':
      return 3;
    case 'skill_shield_bash':
      return 3 + skillLv;
    case 'skill_power_slash':
      return 3 + skillLv;
    case 'skill_triple_strike':
      return 4 + skillLv;
    case 'skill_fire_bolt':
      return 4 + skillLv;
    case 'skill_heal':
      return 4 + skillLv;
    case 'skill_mass_heal':
      return 8 + skillLv;
    default:
      return 5;
  }
}

function makeCommands(state: BattleState): BattleCommand[] {
  const commands: BattleCommand[] = [];
  const aliveAllies = state.allies.filter((a) => !a.isDown);
  const aliveEnemies = state.enemies.filter((e) => !e.isDown);
  if (aliveEnemies.length === 0 || aliveAllies.length === 0) return commands;
  const firstEnemy = aliveEnemies[0];

  for (const ally of aliveAllies) {
    const def = PARTY_DEFS.find((d) => d.id === ally.id);
    if (!def) continue;

    if (def.role === 'medic') {
      const alive = aliveAllies;
      const critical = alive.filter((a) => a.hp / a.maxHp < 0.35);
      const hurt = alive.filter((a) => a.hp / a.maxHp < 0.7);
      const healSkillLv = ally.skillLevels?.['skill_heal'] ?? 1;
      const massSkillLv = ally.skillLevels?.['skill_mass_heal'] ?? 1;
      const healCost = skillTpCost('skill_heal', healSkillLv);
      const massCost = skillTpCost('skill_mass_heal', massSkillLv);
      if (critical.length > 0 && ally.tp >= healCost) {
        const tgt = critical.reduce((a, b) => (a.hp < b.hp ? a : b));
        commands.push({ kind: 'skill', actorId: ally.id, skillId: 'skill_heal', targetId: tgt.id });
      } else if (hurt.length >= 2 && ally.tp >= massCost) {
        commands.push({
          kind: 'skill',
          actorId: ally.id,
          skillId: 'skill_mass_heal',
          targetId: ally.id,
        });
      } else {
        commands.push({ kind: 'attack', actorId: ally.id, targetId: firstEnemy.id });
      }
    } else if (def.role === 'shield') {
      const hasDecoy = (ally.states ?? []).some((s) => s.kind === 'decoy');
      const provSkillLv = ally.skillLevels?.['skill_provoke'] ?? 1;
      const provoceCost = skillTpCost('skill_provoke', provSkillLv);
      if (!hasDecoy && ally.tp >= provoceCost) {
        commands.push({
          kind: 'skill',
          actorId: ally.id,
          skillId: 'skill_provoke',
          targetId: ally.id,
        });
      } else {
        commands.push({ kind: 'attack', actorId: ally.id, targetId: firstEnemy.id });
      }
    } else if (def.skillId) {
      const skLv = ally.skillLevels?.[def.skillId] ?? 1;
      const cost = skillTpCost(def.skillId, skLv);
      if (ally.tp >= cost) {
        commands.push({
          kind: 'skill',
          actorId: ally.id,
          skillId: def.skillId as string,
          targetId: firstEnemy.id,
        });
      } else {
        commands.push({ kind: 'attack', actorId: ally.id, targetId: firstEnemy.id });
      }
    } else {
      commands.push({ kind: 'attack', actorId: ally.id, targetId: firstEnemy.id });
    }
  }
  return commands;
}

function runSim(
  allies: Combatant[],
  enemies: Combatant[],
  depth: number,
  seed = 93,
  maxTurns = 60
): { turns: number; win: boolean; minPartyHpRatio: number } {
  let state = buildSimBattleState(allies, enemies, depth);
  const rng: Rng = createRng(seed);
  let minPartyHpRatio = 1.0;

  for (let t = 0; t < maxTurns; t++) {
    if (state.outcome !== 'ongoing') break;
    for (const a of state.allies) {
      if (!a.isDown) {
        const r = a.hp / a.maxHp;
        if (r < minPartyHpRatio) minPartyHpRatio = r;
      }
    }
    state = resolveTurn(state, makeCommands(state), rng);
  }
  for (const a of state.allies) {
    if (!a.isDown) {
      const r = a.hp / a.maxHp;
      if (r < minPartyHpRatio) minPartyHpRatio = r;
    }
  }
  const turns = state.turn - 1;
  const win = state.outcome === 'win';
  return { turns, win, minPartyHpRatio };
}

function check(label: string, value: number | boolean, cond: boolean): string {
  return `${cond ? '✓ PASS' : '✗ FAIL'} ${label}: ${typeof value === 'number' ? value.toFixed(3) : value}`;
}

// ============================================================================
// メイン: 全AC を実行・出力
// ============================================================================

console.log('\n[AC1] Boss fights (18〜22ターン / 勝利 / minHpRatio ≤ 15%)\n');

const BOSS_CASES = [
  { floor: 10, enemyId: 'enemy_boss_gatekeeper' as EnemyId, name: '門番のゴーレム' },
  { floor: 20, enemyId: 'enemy_t1_boss_mountain_lord' as EnemyId, name: '山嶺の大猿王' },
  { floor: 30, enemyId: 'enemy_t2_boss_frost_monarch' as EnemyId, name: '氷晶の女王' },
  { floor: 40, enemyId: 'enemy_t3_boss_tempest_sovereign' as EnemyId, name: '雷霆の覇王' },
  { floor: 50, enemyId: 'enemy_t4_boss_blight_sovereign' as EnemyId, name: '瘴気を統べる腐王' },
];

for (const boss of BOSS_CASES) {
  const app = APPROPRIATE[boss.floor];
  const allies = buildParty(app.lv, app.tier);
  const enemies = [buildEnemyCombatant(boss.enemyId, 0, boss.floor)];
  const result = runSim(allies, enemies, boss.floor);
  const bossHp = ENEMIES[boss.enemyId].baseStats.hp;

  console.log(`  F${boss.floor} ${boss.name} (HP=${bossHp})`);
  console.log(`    Party lv=${app.lv} tier=${app.tier}`);
  console.log(
    `    Result: turns=${result.turns} win=${result.win} minHpRatio=${result.minPartyHpRatio.toFixed(3)}`
  );
  console.log(
    `    ${check('turns ∈ [18,22]', result.turns, result.turns >= 18 && result.turns <= 22)}`
  );
  console.log(`    ${check('win', result.win, result.win)}`);
  console.log(
    `    ${check('minHpRatio ≤ 0.15', result.minPartyHpRatio, result.minPartyHpRatio <= 0.15)}`
  );
  console.log();
}

console.log('\n[AC2] Zako fights\n');
const ZAKO_ID = 'enemy_t1_crag_goat' as EnemyId;

{
  const app = APPROPRIATE[10];
  const allies = buildParty(app.lv, app.tier);
  const enemies = [0, 1, 2].map((i) => buildEnemyCombatant(ZAKO_ID, i, 13));
  const r = runSim(allies, enemies, 13);
  console.log(
    `  AC2a zako_under (lv=${app.lv} tier=${app.tier}, 3体 HP=${ENEMIES[ZAKO_ID].baseStats.hp}): turns=${r.turns}`
  );
  console.log(`    ${check('turns ∈ [3,5]', r.turns, r.turns >= 3 && r.turns <= 5)}`);
}

{
  const app = APPROPRIATE[20];
  const allies = buildParty(app.lv, app.tier);
  const enemies = [0, 1, 2].map((i) => buildEnemyCombatant(ZAKO_ID, i, 13));
  const r = runSim(allies, enemies, 13);
  console.log(
    `  AC2b zako_ready (lv=${app.lv} tier=${app.tier}, 3体 HP=${ENEMIES[ZAKO_ID].baseStats.hp}): turns=${r.turns}`
  );
  console.log(`    ${check('turns ∈ [1,2]', r.turns, r.turns >= 1 && r.turns <= 2)}`);
}

console.log('\n[AC3] FOE fights (6〜10ターン / 勝利)\n');
{
  const FOE_ID = 'enemy_t1_boulder_ogre' as EnemyId;
  const prevApp = APPROPRIATE[10];
  const nextApp = APPROPRIATE[20];
  const midLv = Math.round((prevApp.lv + nextApp.lv) / 2);
  const allies = buildParty(midLv, prevApp.tier);
  const enemies = [buildEnemyCombatant(FOE_ID, 0, 16)];
  const r = runSim(allies, enemies, 16);
  console.log(`  tier1 FOE ${ENEMIES[FOE_ID].name} (HP=${ENEMIES[FOE_ID].baseStats.hp})`);
  console.log(`  Party lv=${midLv} tier=${prevApp.tier}`);
  console.log(`  Result: turns=${r.turns} win=${r.win}`);
  console.log(`  ${check('turns ∈ [6,10]', r.turns, r.turns >= 6 && r.turns <= 10)}`);
  console.log(`  ${check('win', r.win, r.win)}`);
}

console.log('\n[AC5] EXP progression (残りグラインド 3〜5Lv)\n');
{
  const startLv = APPROPRIATE[10].lv;
  const targetLv = APPROPRIATE[20].lv;
  const expPerEnemy = ENEMIES[ZAKO_ID].exp;
  const total = expPerEnemy * 2 * 4 * 9;
  let lv = startLv,
    acc = total;
  while (lv < 100) {
    const need = expToNext(lv);
    if (acc < need) break;
    acc -= need;
    lv++;
  }
  const gained = lv - startLv;
  const remaining = targetLv - lv;
  console.log(`  enemy_t1_crag_goat exp=${expPerEnemy}`);
  console.log(`  9階×4エンカ×2体 = totalExp=${total}`);
  console.log(`  Lv${startLv} → Lv${lv} (+${gained}Lv), 残り${remaining}Lv to Lv${targetLv}`);
  console.log(`  ${check('gained ∈ [7,9]', gained, gained >= 7 && gained <= 9)}`);
  console.log(`  ${check('remaining ∈ [3,5]', remaining, remaining >= 3 && remaining <= 5)}`);
}

console.log('\n' + '='.repeat(70));
console.log('Faithful simulation complete. For CI assertions: yarn test');
console.log('='.repeat(70));
