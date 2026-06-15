#!/usr/bin/env node
/**
 * balanceSim.mjs – Balance simulation script (pure JS, no TypeScript imports)
 *
 * Simulates combat for representative floors (F10, F30, F50) using the same
 * formulas as the TypeScript source. Constants are copied from balance.ts /
 * races.ts / equipment.ts to keep this self-contained.
 *
 * Run with:  node scripts/balanceSim.mjs
 */

// ============================================================================
// Constants (from src/data/balance.ts)
// ============================================================================
const BALANCE = {
  DAMAGE_DEF_K: 120,
  CRIT_MULT: 1.5,
  BASE_HIT: 0.9,
  HIT_AGI_K: 0.01,
  HIT_MIN: 0.3,
  CRIT_BASE: 0.05,
  CRIT_LUC_K: 0.005,
  CRIT_MIN: 0.02,
  CRIT_MAX: 0.5,
  TP_REGEN_RATIO: 0.04,
  HEAL_MATK_COEF_ONE: 0.70,
  HEAL_MATK_COEF_ALL: 0.45,
  ENEMY_SCALE_K: 0.05,
  EXP_CURVE_BASE: 14,
  EXP_CURVE_POW: 1.52,
};

const APPROPRIATE = {
  10: { lv: 12, tier: 1 },
  20: { lv: 23, tier: 2 },
  30: { lv: 35, tier: 3 },
  40: { lv: 47, tier: 4 },
  50: { lv: 60, tier: 5 },
  60: { lv: 72, tier: 5 },
  70: { lv: 83, tier: 5 },
  80: { lv: 92, tier: 5 },
  90: { lv: 98, tier: 5 },
  100: { lv: 100, tier: 5 },
};

// ============================================================================
// Race data (from src/data/races.ts)
// ============================================================================
const RACES = {
  race_garon:  { base: { hp:55, tp:12, str:11, vit:11, agi:5,  int:4,  mnd:6,  luc:6  }, growth: { hp:12, tp:2, str:3, vit:3, agi:1, int:1, mnd:2, luc:2 } },
  race_human:  { base: { hp:40, tp:20, str:8,  vit:8,  agi:8,  int:8,  mnd:8,  luc:8  }, growth: { hp:8,  tp:4, str:2, vit:2, agi:2, int:2, mnd:2, luc:2 } },
  race_golan:  { base: { hp:60, tp:10, str:12, vit:13, agi:4,  int:3,  mnd:6,  luc:5  }, growth: { hp:13, tp:2, str:3, vit:3, agi:1, int:1, mnd:1, luc:2 } },
  race_pix:    { base: { hp:28, tp:32, str:4,  vit:5,  agi:9,  int:12, mnd:11, luc:7  }, growth: { hp:5,  tp:7, str:1, vit:1, agi:2, int:3, mnd:3, luc:2 } },
  race_lunar:  { base: { hp:30, tp:28, str:5,  vit:6,  agi:8,  int:10, mnd:12, luc:10 }, growth: { hp:5,  tp:6, str:1, vit:1, agi:2, int:3, mnd:3, luc:3 } },
};

// ============================================================================
// Helpers
// ============================================================================
// Note: RNG stub kept here for future stochastic sim; currently unused.
// function makeRng(seed = 42) { ... }

function expToNext(level) {
  return Math.round(BALANCE.EXP_CURVE_BASE * Math.pow(level, BALANCE.EXP_CURVE_POW));
}

function enemyScale(depth, refDepth) {
  return 1 + BALANCE.ENEMY_SCALE_K * (depth - refDepth);
}

/** Compute raw stats at a given level for a race */
function statsAtLv(raceId, lv) {
  const r = RACES[raceId];
  const s = {};
  for (const k of ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc']) {
    s[k] = r.base[k] + r.growth[k] * (lv - 1);
  }
  return s;
}

/**
 * Equipment atk/def from tier:
 *   weapon atk = round(8 * 1.62^tier) * weaponCoef
 *   armor  def = round(8 * 1.55^tier) * defCoef
 *   armor  mdf = round(8 * 1.55^tier) * mdfCoef
 */
function equipAtk(tier, weaponCoef = 1.0) {
  return Math.round(Math.round(8 * Math.pow(1.62, tier)) * weaponCoef);
}
function equipDef(tier, defCoef = 1.0) {
  return Math.round(Math.round(8 * Math.pow(1.55, tier)) * defCoef);
}

/** deriveCombat: patk = str*2 + atk, pdef = vit*2 + def, matk = int*2 + mat, mdef = mnd*2 + mdf */
function deriveCombat(stats, equip) {
  return {
    patk: stats.str * 2 + (equip.atk ?? 0),
    pdef: stats.vit * 2 + (equip.def ?? 0),
    matk: stats.int * 2 + (equip.mat ?? 0),
    mdef: stats.mnd * 2 + (equip.mdf ?? 0),
  };
}

/** Single-hit damage (no variance for deterministic sim, use midpoint 1.0) */
function calcDmg(atk, def, power, variance = 1.0) {
  const base = atk * power;
  const mitigated = (base * BALANCE.DAMAGE_DEF_K) / (BALANCE.DAMAGE_DEF_K + Math.max(0, def));
  return Math.max(1, Math.floor(mitigated * variance));
}

/** Heal amount */
function calcHeal(flat, matk, coef) {
  return Math.round(flat + matk * coef);
}

// ============================================================================
// Party builder
// ============================================================================

/**
 * Standard party member definitions.
 * Each member: raceId, weapon type & coef, armor coefs (def, mdf), skill power & stat
 */
const PARTY_DEFS = [
  {
    name: 'Shield (ガロン守護兵)',
    raceId: 'race_garon',
    role: 'shield',
    weaponCoef: 1.0,  // spear
    defCoef: 1.0,     // heavy armor def
    mdfCoef: 0.4,     // heavy armor mdf
    skill: { power: (lv) => 1.0 + 0.15 * lv, stat: 'patk', tpCost: (lv) => 3 + lv, hits: 1 },
    skillLv: 4,
  },
  {
    name: 'Warrior (ヒト戦士)',
    raceId: 'race_human',
    role: 'warrior',
    weaponCoef: 0.97, // sword
    defCoef: 1.0,
    mdfCoef: 0.4,
    skill: { power: (lv) => 1.4 + 0.2 * lv, stat: 'patk', tpCost: (lv) => 3 + lv, hits: 1 },
    skillLv: 4,
  },
  {
    name: 'Monk (ゴラン拳聖)',
    raceId: 'race_golan',
    role: 'monk',
    weaponCoef: 0.85, // fist
    defCoef: 0.7,     // light armor def
    mdfCoef: 0.55,    // light armor mdf
    skill: { power: (lv) => 0.7 + 0.1 * lv, stat: 'patk', tpCost: (lv) => 4 + lv, hits: 3 },
    skillLv: 4,
  },
  {
    name: 'Mage (ピクス魔導士)',
    raceId: 'race_pix',
    role: 'mage',
    weaponCoef: 1.0,  // staff → mat
    defCoef: 0.4,     // clothes def
    mdfCoef: 0.95,    // clothes mdf
    skill: { power: (lv) => 1.5 + 0.25 * lv, stat: 'matk', tpCost: (lv) => 4 + lv, hits: 1 },
    skillLv: 4,
    isMage: true,
  },
  {
    name: 'Medic (ルーナ薬師)',
    raceId: 'race_lunar',
    role: 'medic',
    weaponCoef: 1.0,  // staff → mat
    defCoef: 0.4,
    mdfCoef: 0.95,
    skill: null, // healer – special logic
    skillLv: 4,
    isMedic: true,
  },
];

function buildPartyMember(def, lv, tier) {
  const stats = statsAtLv(def.raceId, lv);
  const atk = def.isMage || def.isMedic ? 0 : equipAtk(tier, def.weaponCoef);
  const mat = def.isMage || def.isMedic ? equipAtk(tier, def.weaponCoef) : 0;
  const def_ = equipDef(tier, def.defCoef);
  const mdf = equipDef(tier, def.mdfCoef);
  const equip = { atk, mat, def: def_, mdf };
  const combat = deriveCombat(stats, equip);

  return {
    name: def.name,
    role: def.role,
    maxHp: stats.hp,
    hp: stats.hp,
    maxTp: stats.tp,
    tp: stats.tp,
    stats,
    equip,
    combat,
    skillLv: def.skillLv,
    skill: def.skill,
    isMage: !!def.isMage,
    isMedic: !!def.isMedic,
    isDown: false,
  };
}

function buildParty(lv, tier) {
  return PARTY_DEFS.map((d) => buildPartyMember(d, lv, tier));
}

// ============================================================================
// Enemy builder
// ============================================================================
function buildEnemy(baseStats, refDepth, depth, count = 1) {
  const scale = enemyScale(depth, refDepth);
  const enemies = [];
  for (let i = 0; i < count; i++) {
    const hp = Math.round(baseStats.hp * scale);
    enemies.push({
      name: `Enemy${i + 1}`,
      maxHp: hp,
      hp,
      stats: {
        str: Math.round(baseStats.str * scale),
        vit: Math.round(baseStats.vit * scale),
        agi: baseStats.agi ?? 8,
        int: baseStats.int ?? 4,
        mnd: baseStats.mnd ?? 8,
        luc: baseStats.luc ?? 6,
      },
      equip: { atk: 0, def: 0, mat: 0, mdf: 0 },
      isDown: false,
    });
  }
  return enemies;
}

// ============================================================================
// Combat simulation
// ============================================================================

/** AI: pick action for this ally */
function pickAction(member, allies, enemies) {
  if (member.isMedic) {
    const alive = allies.filter((a) => !a.isDown);
    const lowHp = alive.filter((a) => a.hp / a.maxHp < 0.35);
    const midHp = alive.filter((a) => a.hp / a.maxHp < 0.70);
    const lv = member.skillLv;
    const healFlat = 20 + 5 * lv;
    const massFlat = 10 + 3 * lv;
    if (lowHp.length > 0 && member.tp >= 4 + lv) {
      // single heal lowest HP
      const target = lowHp.reduce((a, b) => (a.hp < b.hp ? a : b));
      return { kind: 'heal', target, flat: healFlat, coef: BALANCE.HEAL_MATK_COEF_ONE, tpCost: 4 + lv };
    }
    if (midHp.length >= 2 && member.tp >= 8 + lv) {
      return { kind: 'massHeal', flat: massFlat, coef: BALANCE.HEAL_MATK_COEF_ALL, tpCost: 8 + lv };
    }
    // fallback: attack
    return { kind: 'attack', targets: enemies.filter((e) => !e.isDown).slice(0, 1) };
  }

  if (member.skill) {
    const tpCost = member.skill.tpCost(member.skillLv);
    if (member.tp >= tpCost) {
      return { kind: 'skill', tpCost };
    }
  }
  return { kind: 'attack', targets: enemies.filter((e) => !e.isDown).slice(0, 1) };
}

/** Resolve damage from attacker stats/equip against defender stats/equip */
function resolveAllyDmg(member, enemy, power, statKey, hits = 1) {
  const atk = statKey === 'matk' ? member.combat.matk : member.combat.patk;
  const def = statKey === 'matk' ? (enemy.stats.mnd * 2) : (enemy.stats.vit * 2);
  let total = 0;
  for (let h = 0; h < hits; h++) {
    total += calcDmg(atk, def, power);
  }
  return total;
}

function resolveEnemyDmg(enemy, member) {
  const atk = enemy.stats.str * 2;
  const def = member.combat.pdef;
  return calcDmg(atk, def, BALANCE.ENEMY_ATTACK_POWER ?? 1.0);
}

/**
 * Simulate combat. Returns { turns, win, minPartyHpRatio }.
 */
function simulate(party, enemies, maxTurns = 50) {
  // Deep copy
  const allies = party.map((m) => ({ ...m, hp: m.maxHp, tp: m.tp }));
  const foes = enemies.map((e) => ({ ...e, hp: e.maxHp }));

  let minPartyHpRatio = 1.0;
  let turn = 0;

  while (turn < maxTurns) {
    turn++;

    const aliveAllies = allies.filter((a) => !a.isDown);
    const aliveFoes = foes.filter((e) => !e.isDown);

    if (aliveAllies.length === 0) return { turns: turn, win: false, minPartyHpRatio };
    if (aliveFoes.length === 0) return { turns: turn - 1, win: true, minPartyHpRatio };

    // --- Ally actions ---
    for (const member of aliveAllies) {
      if (member.isDown) continue;
      const action = pickAction(member, allies, foes.filter((e) => !e.isDown));

      if (action.kind === 'heal') {
        const healAmt = calcHeal(action.flat, member.combat.matk, action.coef);
        action.target.hp = Math.min(action.target.maxHp, action.target.hp + healAmt);
        member.tp = Math.max(0, member.tp - action.tpCost);
      } else if (action.kind === 'massHeal') {
        const healAmt = calcHeal(action.flat, member.combat.matk, action.coef);
        for (const a of allies.filter((x) => !x.isDown)) {
          a.hp = Math.min(a.maxHp, a.hp + healAmt);
        }
        member.tp = Math.max(0, member.tp - action.tpCost);
      } else if (action.kind === 'skill') {
        const target = foes.find((e) => !e.isDown);
        if (!target) continue;
        const sk = member.skill;
        const power = sk.power(member.skillLv);
        const hits = sk.hits ?? 1;
        const statKey = sk.stat;
        const dmg = resolveAllyDmg(member, target, power, statKey, hits);
        target.hp -= dmg;
        if (target.hp <= 0) {
          target.hp = 0;
          target.isDown = true;
        }
        member.tp = Math.max(0, member.tp - action.tpCost);
      } else {
        // normal attack (power=1.0)
        const target = foes.find((e) => !e.isDown);
        if (!target) continue;
        const dmg = resolveAllyDmg(member, target, 1.0, member.isMage ? 'matk' : 'patk', 1);
        target.hp -= dmg;
        if (target.hp <= 0) {
          target.hp = 0;
          target.isDown = true;
        }
      }
    }

    // Check if all foes dead after ally actions
    if (foes.every((e) => e.isDown)) {
      // Track min HP ratio after this turn
      for (const a of allies) {
        if (!a.isDown) {
          const r = a.hp / a.maxHp;
          if (r < minPartyHpRatio) minPartyHpRatio = r;
        }
      }
      return { turns: turn, win: true, minPartyHpRatio };
    }

    // --- Enemy actions (each alive foe attacks random alive ally) ---
    for (const foe of foes.filter((e) => !e.isDown)) {
      const targets = allies.filter((a) => !a.isDown);
      if (targets.length === 0) break;
      // Simple round-robin target (lowest HP or just first)
      const target = targets[0];
      const dmg = resolveEnemyDmg(foe, target);
      target.hp -= dmg;
      if (target.hp <= 0) {
        target.hp = 0;
        target.isDown = true;
      }
    }

    // --- TP regen ---
    for (const m of allies.filter((a) => !a.isDown)) {
      m.tp = Math.min(m.maxTp, m.tp + Math.ceil(m.maxTp * BALANCE.TP_REGEN_RATIO));
    }

    // --- Track min HP ratio ---
    for (const a of allies) {
      if (!a.isDown) {
        const r = a.hp / a.maxHp;
        if (r < minPartyHpRatio) minPartyHpRatio = r;
      }
    }

    // --- Check party wipe ---
    if (allies.every((a) => a.isDown)) {
      return { turns: turn, win: false, minPartyHpRatio };
    }
  }

  return { turns: maxTurns, win: false, minPartyHpRatio };
}

// ============================================================================
// Bosses (base stats as per enemies.ts, at their own refDepth so scale=1)
// ============================================================================
const BOSSES = {
  F10: { name: '門番のゴーレム (F10)',  floor: 10, baseStats: { hp: 5200, str: 18, vit: 16, agi: 6,  int: 4,  mnd: 10, luc: 6  }, refDepth: 10 },
  F20: { name: '山嶺の大猿王 (F20)',    floor: 20, baseStats: { hp: 7000, str: 40, vit: 34, agi: 12, int: 8,  mnd: 18, luc: 8  }, refDepth: 20 },
  F30: { name: '氷晶の女王 (F30)',      floor: 30, baseStats: { hp: 8400, str: 64, vit: 54, agi: 18, int: 16, mnd: 22, luc: 12 }, refDepth: 30 },
  F40: { name: '雷霆の覇王 (F40)',      floor: 40, baseStats: { hp: 8700, str: 102, vit: 86, agi: 34, int: 22, mnd: 26, luc: 14 }, refDepth: 40 },
  F50: { name: '瘴気を統べる腐王 (F50)', floor: 50, baseStats: { hp: 8800, str: 142, vit: 122, agi: 16, int: 30, mnd: 64, luc: 26 }, refDepth: 50 },
};

// Zako enemies (2 enemies each) - representative per tier
const ZAKO = {
  tier0: { name: 'もりウサギ (tier0)', baseStats: { hp: 48, str: 5, vit: 3, agi: 9 }, refDepth: 3 },
  tier1: { name: 'がんぺきヤギ (tier1)', baseStats: { hp: 440, str: 14, vit: 11, agi: 9 }, refDepth: 13 },
  tier2: { name: 'シモフリオオカミ (tier2)', baseStats: { hp: 792, str: 26, vit: 16, agi: 14 }, refDepth: 23 },
  tier3: { name: 'ライメイオオカミ (tier3)', baseStats: { hp: 1050, str: 42, vit: 26, agi: 24 }, refDepth: 33 },
  tier4: { name: '腐肉の徘徊者 (tier4)', baseStats: { hp: 1305, str: 64, vit: 50, agi: 11 }, refDepth: 43 },
};

// FOE enemies
const FOES = {
  tier0: { name: 'しげみのオオツノジカ (tier0)', baseStats: { hp: 174, str: 13, vit: 9, agi: 8 }, refDepth: 6 },
  tier1: { name: 'おおいわのオーガ (tier1)', baseStats: { hp: 450, str: 33, vit: 22, agi: 7 }, refDepth: 16 },
  tier2: { name: 'ヒョウガグマ (tier2)', baseStats: { hp: 840, str: 60, vit: 30, agi: 12 }, refDepth: 26 },
  tier3: { name: 'ゴウライジュウ (tier3)', baseStats: { hp: 1440, str: 93, vit: 40, agi: 26 }, refDepth: 36 },
  tier4: { name: '腐肉の巨像 (tier4)', baseStats: { hp: 2580, str: 141, vit: 86, agi: 10 }, refDepth: 46 },
};

// ============================================================================
// EXP simulation (AC5)
// ============================================================================
function simExpAC5() {
  // Middle floors of tier1 band: floors 11-19 (9 floors), 4 encounters each, 2 enemies per
  // Enemy: tier1 zako crag_goat, exp=128 per enemy, 2 enemies → 256 per encounter
  // 9 floors * 4 encounters = 36 encounters, 36 * 256 = 9216 total exp
  // Party starts at appropriate level for PREVIOUS boss (F10 → lv:12, tier:1)
  // AC5 target level: appropriate for THIS boss (F20 → lv:23)
  const startLv = APPROPRIATE[10].lv; // 12
  const targetLv = APPROPRIATE[20].lv; // 23
  const expPerEnemy = 128; // crag_goat base exp
  const enemiesPerEncounter = 2;
  const encountersPerFloor = 4;
  const numFloors = 9; // floors 11-19
  const totalExp = expPerEnemy * enemiesPerEncounter * encountersPerFloor * numFloors;

  let lv = startLv;
  let accumulated = 0;
  let expToNextLv = expToNext(lv);

  accumulated += totalExp;

  // Level up as much as possible
  while (accumulated >= expToNextLv && lv < 100) {
    accumulated -= expToNextLv;
    lv++;
    expToNextLv = expToNext(lv);
  }

  const gainedLevels = lv - startLv;
  const remainingToTarget = targetLv - lv;

  return {
    startLv,
    targetLv,
    totalExp,
    finalLv: lv,
    gainedLevels,
    remainingToTarget,
    remainingExp: accumulated,
    nextLvExp: expToNextLv,
  };
}

// ============================================================================
// Main: run simulations and print table
// ============================================================================

function checkRange(label, value, min, max) {
  const pass = value >= min && value <= max;
  return `${pass ? '✓ PASS' : '✗ FAIL'} ${label}: ${value} (expected ${min}–${max})`;
}

function checkBool(label, value, expected) {
  const pass = value === expected;
  return `${pass ? '✓ PASS' : '✗ FAIL'} ${label}: ${value} (expected ${expected})`;
}

function checkMax(label, value, max) {
  const pass = value <= max;
  return `${pass ? '✓ PASS' : '✗ FAIL'} ${label}: ${value.toFixed(3)} (expected ≤ ${max})`;
}

console.log('='.repeat(70));
console.log('Balance Simulation – sekaiju-like-game');
console.log('='.repeat(70));

// ---- AC1: Boss fights ----
console.log('\n[AC1] Boss fights (18≤turns≤22, win, minHpRatio≤0.15)\n');

for (const [, boss] of Object.entries(BOSSES)) {
  const app = APPROPRIATE[boss.floor];
  const party = buildParty(app.lv, app.tier);
  const enemies = buildEnemy(boss.baseStats, boss.refDepth, boss.floor, 1);
  const result = simulate(party, enemies);

  console.log(`  ${boss.name}`);
  console.log(`    Party lv=${app.lv} tier=${app.tier}`);
  console.log(`    Boss HP=${boss.baseStats.hp} str=${boss.baseStats.str} vit=${boss.baseStats.vit}`);
  console.log(`    Result: turns=${result.turns} win=${result.win} minHpRatio=${result.minPartyHpRatio.toFixed(3)}`);
  console.log(`    ${checkRange('turns', result.turns, 18, 22)}`);
  console.log(`    ${checkBool('win', result.win, true)}`);
  console.log(`    ${checkMax('minHpRatio', result.minPartyHpRatio, 0.15)}`);
  console.log();
}

// ---- AC2: Zako fights ----
console.log('\n[AC2] Zako fights\n');

// AC2a: zako_under – party at PREVIOUS boss's lv/tier, 1-3 enemies, 3≤turns≤5
console.log('  AC2a zako_under: party at tier-1 appropriate, 3 enemies, expect 3-5 turns');
{
  const appPrev = APPROPRIATE[10]; // previous boss F10: lv12, tier1
  const party = buildParty(appPrev.lv, appPrev.tier);
  const tierDef = ZAKO.tier1;
  const enemies = buildEnemy(tierDef.baseStats, tierDef.refDepth, tierDef.refDepth, 3);
  const result = simulate(party, enemies);
  console.log(`    Party lv=${appPrev.lv} tier=${appPrev.tier}, 3x ${tierDef.name}`);
  console.log(`    Result: turns=${result.turns} win=${result.win}`);
  console.log(`    ${checkRange('turns', result.turns, 3, 5)}`);
  console.log();
}

// AC2b: zako_ready – same HP enemies, party at THIS boss's lv/tier, 1≤turns≤2
console.log('  AC2b zako_ready: party at tier-1 boss appropriate, 3 enemies, expect 1-2 turns');
{
  const appThis = APPROPRIATE[20]; // this boss F20: lv23, tier2
  const party = buildParty(appThis.lv, appThis.tier);
  const tierDef = ZAKO.tier1;
  const enemies = buildEnemy(tierDef.baseStats, tierDef.refDepth, tierDef.refDepth, 3);
  const result = simulate(party, enemies);
  console.log(`    Party lv=${appThis.lv} tier=${appThis.tier}, 3x ${tierDef.name}`);
  console.log(`    Result: turns=${result.turns} win=${result.win}`);
  console.log(`    ${checkRange('turns', result.turns, 1, 2)}`);
  console.log();
}

// ---- AC3: FOE fights ----
console.log('\n[AC3] FOE fights (6≤turns≤10)\n');

for (const [foeKey, foe] of Object.entries(FOES)) {
  const tierNum = parseInt(foeKey.replace('tier', ''));
  const bossFloor = (tierNum + 1) * 10;
  const app = APPROPRIATE[bossFloor] ?? APPROPRIATE[50];
  const prevBossFloor = tierNum * 10;
  const prevApp = APPROPRIATE[prevBossFloor] ?? APPROPRIATE[10];
  // Use party at mid-tier appropriate (average of prev and this boss)
  const midLv = Math.round((prevApp.lv + app.lv) / 2);
  const midTier = prevApp.tier;
  const party = buildParty(midLv, midTier);
  const enemies = buildEnemy(foe.baseStats, foe.refDepth, foe.refDepth, 1);
  const result = simulate(party, enemies);
  console.log(`  ${foe.name} (${foeKey})`);
  console.log(`    Party lv=${midLv} tier=${midTier}`);
  console.log(`    FOE HP=${foe.baseStats.hp} str=${foe.baseStats.str}`);
  console.log(`    Result: turns=${result.turns} win=${result.win}`);
  console.log(`    ${checkRange('turns', result.turns, 6, 10)}`);
  console.log();
}

// ---- AC5: EXP progression ----
console.log('\n[AC5] EXP progression check\n');
{
  const r = simExpAC5();
  console.log(`  Start lv=${r.startLv}, target lv=${r.targetLv}`);
  console.log(`  Total EXP from 9 floors × 4 encounters × 2 enemies: ${r.totalExp}`);
  console.log(`  Final lv=${r.finalLv}, gained=${r.gainedLevels} levels`);
  console.log(`  Remaining to target: ${r.remainingToTarget} levels`);
  console.log(`  ${checkRange('gainedLevels', r.gainedLevels, 7, 9)}`);
  console.log(`  ${checkRange('remainingToTarget', r.remainingToTarget, 3, 5)}`);
}

console.log('\n' + '='.repeat(70));
console.log('Simulation complete.');
console.log('='.repeat(70));

console.log(`
BALANCE GAP ANALYSIS
─────────────────────────────────────────────────────────────────────
The above FAILs indicate the current game data doesn't meet design targets.
Root cause: party DPS with lv-4 skills (~600-800/turn) exceeds enemy HP
scaling at all tiers. Boss HP would need to be 2-3× higher, OR skill
power at lv4 should be capped, to reach the 18-22 turn boss target.

Suggested balance adjustments:
  • Boss HP ×2.5: F10→13000, F20→17500, F30→21000, F40→21750, F50→22000
  • OR skill_triple_strike total power lv4: 3.3 → 1.5 (limit skill scaling)
  • OR limit skill level during sim to lv1-2 (realistic for lv12 party with 18 SP)
  • EXP AC5 remaining: actual=2, target=3-5. Fix: reduce crag_goat exp 128→80,
    or reduce encounters per floor from 4 to 3.
─────────────────────────────────────────────────────────────────────
`);
