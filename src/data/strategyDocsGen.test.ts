/**
 * 攻略ドキュメント（/strategy-docs）をマスターデータから生成する。
 * 副作用（ファイル書き込み）は GEN_DOCS=1 のときだけ実行する（通常の vitest では no-op）。
 * 再生成: `yarn gen:docs`（= GEN_DOCS=1 vitest run src/data/strategyDocsGen.test.ts）。
 * バランス調整でデータを変えたら本コマンドで strategy-docs を更新する。
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { test, expect } from 'vitest';

import {
  APPROPRIATE,
  BALANCE,
  CLASS_CHANGE_LEVEL_PENALTY,
  FORGE,
  GUILD_MEMBER_LIMIT,
  PARTY_MAX,
  REBIRTH,
  STARTING_GOLD,
  TITLE_BONUS_SP,
  UNLOCK,
  enemyScale,
  expToNext,
  spGainOnLevelUp,
  spTotalForLevel,
} from '@/data/balance';
import { BATTLE_SKILLS } from '@/data/battleSkills';
import { CLASSES } from '@/data/classes';
import { ENEMIES } from '@/data/enemies';
import { ITEMS } from '@/data/items';
import { PASSIVE_SKILLS } from '@/data/passives';
import { RACES } from '@/data/races';
import { SKILLS } from '@/data/skills';
import { SUMMONS } from '@/data/summons';
import { TITLES } from '@/data/titles';
import { UNION_SKILLS } from '@/data/unionSkills';
import { rebirthStatBonusForRace } from '@/domain/charProgress';
import { skillDepth, spCostForDepth } from '@/domain/skillTree';
import type { BattleSkillDef, SkillEffectDef, SkillTreeNode, StatKey } from '@/domain/types';

const TREE = { base: '基本', master: '達人', title: '称号', race: '種族' } as const;
const TARGET: Record<string, string> = {
  enemyOne: '敵単体',
  enemyRow: '敵1列',
  enemyAll: '敵全体',
  allyOne: '味方単体',
  allyAll: '味方全体',
  self: '自分',
};
const ELEM: Record<string, string> = {
  slash: '斬',
  pierce: '突',
  bash: '壊',
  fire: '火',
  ice: '氷',
  volt: '雷',
  almighty: '無',
};
const BUFFSTAT: Record<string, string> = {
  patk: '物理攻撃',
  pdef: '物理防御',
  matk: '魔法攻撃',
  mdef: '魔法防御',
  acc: '命中',
  eva: '回避',
  elementResist: '属性耐性',
};
const STAT_LABEL: Record<StatKey, string> = {
  hp: 'HP',
  tp: 'TP',
  str: 'STR',
  vit: 'VIT',
  agi: 'AGI',
  int: 'INT',
  mnd: 'MND',
  luc: 'LUC',
};

const n2 = (v: number) => `${Math.round(v * 100) / 100}`;

// 全レベル列挙ヘルパ（設計書 §2.1）
const allLv = (f: (lv: number) => number, max: number) =>
  Array.from({ length: max }, (_, i) => n2(f(i + 1))).join('/');
const allLvPct = (f: (lv: number) => number, max: number) =>
  Array.from({ length: max }, (_, i) => `${Math.round(f(i + 1) * 100)}%`).join('/');
const tpAll = (def: BattleSkillDef, max: number) =>
  Array.from({ length: max }, (_, i) => def.tpCost(i + 1)).join('/');

function ailmentLabel(a: string): string {
  const m: Record<string, string> = {
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
  return m[a] ?? a;
}

function effectStr(e: SkillEffectDef, max: number): string {
  switch (e.kind) {
    case 'damage': {
      const base = e.statBase === 'str' ? '物理' : '魔法';
      const hits = e.hits && e.hits > 1 ? `×${e.hits}ヒット` : '';
      const drain = e.drain ? `／HP吸収${Math.round(e.drain * 100)}%` : '';
      return `${base}ダメージ 威力${allLv(e.power, max)}${hits}${drain}`;
    }
    case 'heal':
      return `HP回復 ${allLv(e.amount, max)}`;
    case 'restoreTp':
      return `TP回復 ${allLv(e.amount, max)}`;
    case 'buff': {
      const verb = e.modifier(1) < 1 ? '低下' : '上昇';
      return `${BUFFSTAT[e.stat]}${verb} ×${allLv(e.modifier, max)} / ${e.turns}ターン`;
    }
    case 'ailment':
      return `${ailmentLabel(e.ailment)} 付与 ${allLvPct(e.chance, max)} / ${e.turns}ターン`;
    case 'summon':
      return `召喚: ${SUMMONS[e.summonKind]?.name ?? e.summonKind}`;
    case 'counter':
      return `反撃の構え 発動率${allLvPct(e.chance, max)}・威力${allLv(e.power, max)} / ${e.turns}ターン`;
    case 'chase':
      return `連携追撃の構え 威力${allLv(e.power, max)} / ${e.turns}ターン`;
    case 'decoy':
      return `挑発（狙われ重み +${allLv(e.weight, max)}） / ${e.turns}ターン`;
    case 'barrier':
      return `障壁（被弾を計${allLv(e.absorb, max)}まで肩代わり） / ${e.turns}ターン`;
    case 'cleanse':
      return `状態異常を全解除`;
    case 'revive':
      return `蘇生（HP${allLvPct(e.ratio, max)}で復帰）`;
    case 'regen':
      return `継続回復 ${allLv(e.amount, max)}/ターン×${e.turns}ターン`;
    default:
      return '';
  }
}

function passiveStr(skillId: string, max: number): string {
  const def = PASSIVE_SKILLS[skillId];
  if (!def) return '';
  const parts: string[] = [];
  const keys: { k: keyof ReturnType<typeof def.mods>; label: string }[] = [
    { k: 'patk', label: '物理攻撃' },
    { k: 'matk', label: '魔法攻撃' },
    { k: 'pdef', label: '物理防御' },
    { k: 'mdef', label: '魔法防御' },
    { k: 'acc', label: '命中' },
    { k: 'eva', label: '回避' },
    { k: 'maxHp', label: '最大HP' },
    { k: 'maxTp', label: '最大TP' },
  ];
  for (const { k, label } of keys) {
    const allVals = Array.from({ length: max }, (_, i) => def.mods(i + 1)[k]).filter(
      (v): v is number => v !== undefined
    );
    if (allVals.length === 0) continue;
    const pctVals = allVals.map((v) => `+${Math.round((v - 1) * 100)}%`);
    parts.push(`${label} ${pctVals.join('/')}`);
  }
  const critVals = Array.from({ length: max }, (_, i) => def.mods(i + 1).crit).filter(
    (v): v is number => v !== undefined
  );
  if (critVals.length > 0) {
    const pctVals = critVals.map((v) => `+${Math.round(v * 100)}%`);
    parts.push(`クリ率 ${pctVals.join('/')}`);
  }
  const cond = def.weaponType ? `（${def.weaponType} 装備時のみ）` : '';
  return `常時: ${parts.join('・')}${cond}`;
}

function nodeRow(node: SkillTreeNode, sp: number): string {
  const id = node.skillId;
  const max = node.maxLevel;
  const name = SKILLS[id]?.name ?? id;
  const req =
    node.requires && node.requires.length > 0
      ? node.requires.map((r) => `${SKILLS[r.skillId]?.name ?? r.skillId} Lv${r.level}`).join('・')
      : '―';
  if (id in PASSIVE_SKILLS)
    return `| ${name} | パッシブ | ${max} | ${sp} | ― | ― | ― | ${passiveStr(id, max)} | ${req} |`;
  if (id in BATTLE_SKILLS) {
    const def = BATTLE_SKILLS[id];
    return `| ${name} | アクティブ(${TREE[def.tree]}) | ${max} | ${sp} | ${tpAll(def, max)} | ${TARGET[def.target]} | ${ELEM[def.element]} | ${def.effects.map((e) => effectStr(e, max)).join('／')} | ${req} |`;
  }
  if (id in UNION_SKILLS) {
    const u = UNION_SKILLS[id];
    return `| ${name} | ユニオン | ${max} | ${sp} | ゲージ${u.gaugeCostPerParticipant}×${u.requiredParticipants}人 | ${TARGET[u.target]} | ${ELEM[u.element]} | ${u.effects.map((e) => effectStr(e, max)).join('／')} | ${req} |`;
  }
  return `| ${name} | 探索 | ${max} | ${sp} | ― | ― | ― | ${SKILLS[id]?.description ?? ''} | ${req} |`;
}

/** 1ツリーを表に。SP/Lv は前提チェーンの深さ別コスト。 */
function treeTable(nodes: SkillTreeNode[]): string {
  let s = `${TABLE_HEAD}\n`;
  for (const node of nodes)
    s += nodeRow(node, spCostForDepth(skillDepth(nodes, node.skillId))) + '\n';
  return s;
}

const TABLE_HEAD =
  '| スキル | 種別 | 最大Lv | 習得SP/Lv | TP | 対象 | 属性 | 効果（Lv1..最大Lv の全レベル値） | 前提 |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |';
const classOrder = [
  'class_warrior',
  'class_guardian',
  'class_mage',
  'class_ranger',
  'class_medic',
  'class_dancer',
  'class_monk',
  'class_hexer',
  'class_summoner',
];
const classRole: Record<string, string> = {
  class_warrior: '剣の連携追撃と反撃を備えた前衛物理アタッカー。剣／斧でビルドが分岐する。',
  class_guardian: '盾と挑発で敵を引きつけ、障壁と反撃で味方を守るタンク。',
  class_mage: '火・氷・雷の属性魔法で敵を殲滅する後衛アタッカー。',
  class_ranger: '弓の射撃・部位封じ・召喚獣・救護をこなす器用な後衛。',
  class_medic: '回復・状態異常治療・防御支援の要となるメインヒーラー。',
  class_dancer: '舞と歌でパーティを強化・回復する支援職。',
  class_monk: '素手の多段攻撃・部位封じ・反撃を操る近接アタッカー。',
  class_hexer: '状態異常と弱体で敵を崩すデバッファー。',
  class_summoner: '死霊を召喚・使役し、障壁と爆裂で戦う変則召喚職。',
};
const raceOrder = [
  'race_human',
  'race_garon',
  'race_pix',
  'race_therian',
  'race_lunar',
  'race_golan',
];
const raceRole: Record<string, string> = {
  race_human: 'バランス型。クセがなく、どの職業にも適応する。',
  race_garon:
    '物理攻撃特化のアタッカー。種族屈指の STR を持つが VIT は控えめ。素早さ・魔法は不得手。',
  race_pix: '魔法特化の小型種。高TP・高INT/MNDだが打たれ弱い。',
  race_therian: '獣使い種。素早く幸運が高い、命中・回避と食料調達に長ける。',
  race_lunar: '月の民。魔法・幸運寄りの癒し手で、魔法防御とTPが伸びる。',
  race_golan:
    '防御特化のタンク（種族名: ドーム）。最高峰の HP・VIT で前線を支えるが攻撃力は控えめ、極端に鈍重。',
};
const statKeys: StatKey[] = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];

/** strategy-docs/*.md を生成して書き出す。 */
export function generateStrategyDocs(): void {
  const out = resolve(process.cwd(), 'strategy-docs');
  mkdirSync(out, { recursive: true });

  const classesIntro =
    `# 職業（クラス）一覧\n\n` +
    `> 数値は \`src/data\` のマスターデータから自動生成（\`yarn gen:docs\`）。スキルは**レベルで自動習得ではなく SP で習得**し、表の「前提」を満たすと解放される（3段の前提チェーン。詳細は [README](./README.md)）。数値は各レベル値を \`/\` 区切りで全レベル分記載。\n\n`;
  let classes = classesIntro;
  for (const cid of classOrder) {
    const c = CLASSES[cid];
    classes += `## ${c.name}（全${c.skillTree.skills.length}スキル）\n\n${classRole[cid] ?? ''}\n\n`;
    classes += `- **装備可能武器**: ${c.equipableWeaponTypes.join(' / ')}\n- **装備可能防具**: ${c.equipableArmorTypes.join(' / ')}\n- **称号（第2スキルツリー）**: ${c.titleOptions.map((t) => TITLES[t]?.name ?? t).join(' / ')}\n- **起点スキル（作成/転職時に Lv1 で無料習得）**: ${SKILLS[c.skillTree.skills[0].skillId]?.name}\n\n`;
    classes += `### スキルツリー\n\n${treeTable(c.skillTree.skills)}`;
    classes += '\n';
  }
  writeFileSync(resolve(out, 'classes.md'), classes, 'utf-8');

  const racesIntro =
    `# 種族（レース）一覧\n\n` +
    `> 基礎ステータスは種族で決まり、Lvごとに成長値ぶん上昇する（\`stat(Lv) = 初期値 + 成長 × (Lv-1)\`）。種族スキル（ユニオン・採集・種族パッシブ）は**転職しても保持**される。数値は各レベル値を \`/\` 区切りで全レベル分記載。\n\n`;
  let races = racesIntro;
  for (const rid of raceOrder) {
    const r = RACES[rid];
    races += `## ${r.name}\n\n${raceRole[rid] ?? ''}\n\n- **既定職業（作成時の初期値）**: ${CLASSES[r.defaultClassId]?.name ?? r.defaultClassId}\n\n`;
    races += `| ステ | ${statKeys.map((k) => STAT_LABEL[k]).join(' | ')} |\n| --- | ${statKeys.map(() => '---').join(' | ')} |\n`;
    races += `| 初期値(Lv1) | ${statKeys.map((k) => r.baseStatsAtLv1[k]).join(' | ')} |\n`;
    races += `| 成長/Lv | ${statKeys.map((k) => r.statGrowth[k]).join(' | ')} |\n`;
    races += `| Lv100時 | ${statKeys.map((k) => r.baseStatsAtLv1[k] + r.statGrowth[k] * 99).join(' | ')} |\n\n`;
    races += `### 種族スキルツリー\n\n${treeTable(r.raceSkillTree.skills)}`;
    races += '\n';
  }
  writeFileSync(resolve(out, 'races.md'), races, 'utf-8');

  const titlesIntro =
    `# 称号（二つ名 / 第2スキルツリー）一覧\n\n` +
    `> 到達階20で解放。1職業につき2種から1つ選び、第2スキルツリー（各3スキル）と**成長傾向の補正**を得る（習得時 SP+5）。称号は転職で外れる。数値は各レベル値を \`/\` 区切りで全レベル分記載。\n\n`;
  let titles = titlesIntro;
  for (const cid of classOrder) {
    for (const tid of CLASSES[cid].titleOptions) {
      const t = TITLES[tid];
      if (!t) continue;
      const growth = statKeys
        .filter((k) => t.growthModifier[k] !== 0)
        .map((k) => `${STAT_LABEL[k]}+${t.growthModifier[k]}`)
        .join('・');
      titles += `## ${t.name}（${CLASSES[cid].name}）\n\n- **成長補正**: ${growth || '―'}\n\n${treeTable(t.skillTree.skills)}`;
      titles += '\n';
    }
  }
  writeFileSync(resolve(out, 'titles.md'), titles, 'utf-8');

  let summons = `# 召喚体一覧\n\n> 召喚スキルで最前列に呼び出す。出現階で敵と同じ係数によりスケールする。\n\n| 召喚体 | HP | STR | VIT | AGI | 攻撃属性 | 自律行動 | 強化/状態異常 | 永続 |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n`;
  for (const s of Object.values(SUMMONS))
    summons += `| ${s.name} | ${s.baseStats.hp} | ${s.baseStats.str} | ${s.baseStats.vit} | ${s.baseStats.agi} | ${ELEM[s.attackElement]} | ${s.actsOnTurn ? '攻撃する' : '壁のみ'} | ${s.buffImmune ? '無効' : '有効'} | ${s.persistsAfterBattle ? '戦闘またぎ' : '戦闘限り'} |\n`;
  writeFileSync(resolve(out, 'summons.md'), summons, 'utf-8');

  // ---- enemies.md（帯ごとの敵・ドロップ素材） ----
  const KIND_LABEL: Record<string, string> = { zako: '雑魚', foe: 'FOE', boss: 'ボス' };
  const resistStr = (r?: Partial<Record<string, number>>): string => {
    if (!r) return '―';
    const weak: string[] = [];
    const res: string[] = [];
    const imm: string[] = [];
    for (const [el, m] of Object.entries(r)) {
      if (m === undefined) continue;
      if (m > 1) weak.push(ELEM[el] ?? el);
      else if (m === 0) imm.push(ELEM[el] ?? el);
      else if (m < 1) res.push(ELEM[el] ?? el);
    }
    const parts: string[] = [];
    if (weak.length) parts.push(`弱点:${weak.join('')}`);
    if (res.length) parts.push(`耐性:${res.join('')}`);
    if (imm.length) parts.push(`無効:${imm.join('')}`);
    return parts.join(' / ') || '―';
  };
  const TIER_THEME = ['森・洞窟', '岩山・獣', '氷雪', '雷雨・嵐', '瘴気・不死・機械'];
  const bands = [...new Set(Object.values(ENEMIES).map((e) => e.tierBand))].sort((a, b) => a - b);
  let enemies = `# 敵・ドロップ素材一覧\n\n> 敵は「基準ステータス × 出現階係数（enemyScale）」で強くなる（基準階=表の「基準階」）。\n> 1〜50階は tier0〜4、**50階以降は全帯（tier0〜${Math.max(...bands)}）を循環**し、敵名に **LvN（周回数）** を付して再登場・強化される（例: 51〜60階=tier0の2周目=「スライム Lv2」）。\n> ドロップ素材も周回数に応じて **LvN** にグレードアップ（別スタック・売却額上昇）。LvN 素材を売ると、その装備が **LvN** でショップに並び、性能は **Lvごとに +50%**（基礎×(1+0.5×(Lv−1))）。\n\n`;
  for (const band of bands) {
    enemies += `## tier${band}（${band * 10 + 1}〜${band * 10 + 10}階・${TIER_THEME[band] ?? ''}）\n\n`;
    enemies += `| 敵 | 種別 | 基準階 | HP | STR | VIT | AGI | 攻撃 | 弱点/耐性 | ドロップ(確率) |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n`;
    const inBand = Object.values(ENEMIES).filter((e) => e.tierBand === band);
    const order = (e: (typeof inBand)[number]) =>
      e.kind === 'boss' || e.isBoss ? 2 : e.kind === 'foe' ? 1 : 0;
    for (const e of inBand.sort((a, b) => order(a) - order(b) || a.refDepth - b.refDepth)) {
      const drops =
        (e.drops ?? [])
          .map((d) => `${ITEMS[d.itemId]?.name ?? d.itemId}(${Math.round(d.rate * 100)}%)`)
          .join('、') || '―';
      enemies += `| ${e.name} | ${KIND_LABEL[e.kind ?? 'zako']} | ${e.refDepth} | ${e.baseStats.hp} | ${e.baseStats.str} | ${e.baseStats.vit} | ${e.baseStats.agi} | ${ELEM[e.attackElement ?? 'bash']} | ${resistStr(e.resist)} | ${drops} |\n`;
    }
    enemies += '\n';
  }
  // ドロップ素材一覧
  enemies += `## ドロップ素材\n\n> 素材を売ると対応する装備がショップに並ぶ（[04 §8]）。周回時は「素材名 LvN」にグレードアップ。\n\n| 素材 | 説明 |\n| --- | --- |\n`;
  for (const it of Object.values(ITEMS).filter((i) => i.category === 'material'))
    enemies += `| ${it.name} | ${it.description} |\n`;
  writeFileSync(resolve(out, 'enemies.md'), enemies, 'utf-8');

  // ---- balance.md（§2.3 バランス定数一覧）----
  let balance = `# バランス定数（balance.md）\n\n`;
  balance += `> 本書は \`src/data/balance.ts\` から自動生成。調整はこのファイル（と各マスター）を編集し \`yarn gen:docs\` で再生成。\n\n`;

  // §1 基本進行
  balance += `## 基本進行\n\n`;
  balance += `| 定数 | 値 | 意味 |\n| --- | --- | --- |\n`;
  balance += `| LEVEL_CAP | ${BALANCE.LEVEL_CAP} | レベル上限 |\n`;
  balance += `| BOSS_INTERVAL | ${BALANCE.BOSS_INTERVAL} | 何階ごとにボス階か（＝ワープ間隔） |\n`;
  balance += `| BAND_SIZE | ${BALANCE.BAND_SIZE} | 敵プール帯の幅 |\n`;
  balance += `| ENEMY_SCALE_K | ${BALANCE.ENEMY_SCALE_K} | enemyScale の1層あたり伸び |\n\n`;

  // §2 レベル別テーブル（Lv1〜100全行）
  balance += `## レベル別テーブル（Lv1〜${BALANCE.LEVEL_CAP}）\n\n`;
  balance += `> 経験値式: \`expToNext(Lv) = round(${BALANCE.EXP_CURVE_BASE} × Lv^${BALANCE.EXP_CURVE_POW})\`\n`;
  balance += `> SP式: \`spTotal(Lv) = round(${BALANCE.SP_PER_LEVEL} × (Lv-1))\`\n\n`;
  balance += `| Lv | 次Lvまで必要EXP | 累計SP | そのLvで得るSP |\n| --- | --- | --- | --- |\n`;
  for (let lv = 1; lv <= BALANCE.LEVEL_CAP; lv++) {
    balance += `| ${lv} | ${expToNext(lv)} | ${spTotalForLevel(lv)} | ${lv === 1 ? 0 : spGainOnLevelUp(lv)} |\n`;
  }
  balance += '\n';

  // §3 適正レベル/ティア
  balance += `## 適正レベル/ティア（APPROPRIATE）\n\n`;
  balance += `| ボス階 | 適正Lv | 装備ティア |\n| --- | --- | --- |\n`;
  for (const [depth, val] of Object.entries(APPROPRIATE)) {
    balance += `| ${depth} | ${val.lv} | ${val.tier} |\n`;
  }
  balance += '\n';

  // §4 ダメージ式の係数
  balance += `## ダメージ式の係数\n\n`;
  balance += `| 定数 | 値 | 意味 |\n| --- | --- | --- |\n`;
  balance += `| DAMAGE_DEF_K | ${BALANCE.DAMAGE_DEF_K} | 防御係数（除算型ダメージ軽減） |\n`;
  balance += `| CRIT_MULT | ${BALANCE.CRIT_MULT} | 会心倍率 |\n`;
  balance += `| WEAK_MULT | ${BALANCE.WEAK_MULT} | 弱点属性倍率 |\n`;
  balance += `| RESIST_MULT | ${BALANCE.RESIST_MULT} | 耐性属性倍率 |\n`;
  balance += `| BACK_ROW_MELEE_MULT | ${BALANCE.BACK_ROW_MELEE_MULT} | 後衛の近接物理補正（攻撃側・防御側で独立乗算） |\n`;
  balance += `| DMG_VARIANCE | ${BALANCE.DMG_VARIANCE[0]}〜${BALANCE.DMG_VARIANCE[1]} | ダメージブレ幅 |\n\n`;

  // §5 命中・クリティカル
  balance += `## 命中・クリティカル\n\n`;
  balance += `| 定数 | 値 | 意味 |\n| --- | --- | --- |\n`;
  balance += `| BASE_HIT | ${BALANCE.BASE_HIT} | 基礎命中率 |\n`;
  balance += `| HIT_AGI_K | ${BALANCE.HIT_AGI_K} | AGI差1あたりの命中補正 |\n`;
  balance += `| HIT_MIN | ${BALANCE.HIT_MIN} | 命中率の下限 |\n`;
  balance += `| BLIND_ACC_PENALTY | ${BALANCE.BLIND_ACC_PENALTY} | 盲目による命中ペナルティ |\n`;
  balance += `| CRIT_BASE | ${BALANCE.CRIT_BASE} | 基礎クリティカル率 |\n`;
  balance += `| CRIT_LUC_K | ${BALANCE.CRIT_LUC_K} | LUC差1あたりのクリ率補正 |\n`;
  balance += `| CRIT_MIN | ${BALANCE.CRIT_MIN} | クリ率の下限 |\n`;
  balance += `| CRIT_MAX | ${BALANCE.CRIT_MAX} | クリ率の上限 |\n\n`;

  // §6 状態異常・TP回復・ユニオン・回復係数など
  balance += `## 状態異常・TP回復・ユニオン・回復係数\n\n`;
  balance += `| 定数 | 値 | 意味 |\n| --- | --- | --- |\n`;
  balance += `| AILMENT_LUC_K | ${BALANCE.AILMENT_LUC_K} | LUC差1あたりの状態異常付与補正 |\n`;
  balance += `| AILMENT_MAX | ${BALANCE.AILMENT_MAX} | 状態異常付与率の上限 |\n`;
  balance += `| PARALYSIS_SKIP | ${BALANCE.PARALYSIS_SKIP} | 麻痺で行動不能になる確率 |\n`;
  balance += `| POISON_HP_RATIO | ${BALANCE.POISON_HP_RATIO} | 毒の毎ターン割合ダメージ（magnitude未指定時） |\n`;
  balance += `| TP_REGEN_RATIO | ${BALANCE.TP_REGEN_RATIO} | 毎ターン終了時のTP自然回復率 |\n`;
  balance += `| UNION_GAIN_PER_ACTION | ${BALANCE.UNION_GAIN_PER_ACTION[0]}〜${BALANCE.UNION_GAIN_PER_ACTION[1]} | 行動1回あたりのユニオンゲージ増加量 |\n`;
  balance += `| UNION_GAIN_ON_WIN | ${BALANCE.UNION_GAIN_ON_WIN} | 戦闘勝利時のユニオンゲージ増加量 |\n`;
  balance += `| FARM_EXP_DECAY_PER_BAND | ${BALANCE.FARM_EXP_DECAY_PER_BAND} | 下層ファーム時の帯あたりEXP減衰率 |\n`;
  balance += `| ENEMY_ATTACK_POWER | ${BALANCE.ENEMY_ATTACK_POWER} | 敵通常攻撃の倍率 |\n`;
  balance += `| HEAL_MATK_COEF_ONE | ${BALANCE.HEAL_MATK_COEF_ONE} | 単体回復スキルの魔法攻撃係数 |\n`;
  balance += `| HEAL_MATK_COEF_ALL | ${BALANCE.HEAL_MATK_COEF_ALL} | 全体回復スキルの魔法攻撃係数 |\n`;
  balance += `| HEAL_MATK_COEF_MINOR | ${BALANCE.HEAL_MATK_COEF_MINOR} | 軽回復（歌・救護等）の魔法攻撃係数 |\n`;
  balance += `| SURPLUS_SP_PER_STAT | ${BALANCE.SURPLUS_SP_PER_STAT} | 余剰SP何点で全ステ+1 |\n\n`;

  // §7 敵スケール
  balance += `## 敵スケール\n\n`;
  balance += `> \`enemyScale(depth, refDepth) = 1 + ${BALANCE.ENEMY_SCALE_K} × (depth - refDepth)\`\n\n`;
  balance += `| refDepth | depth=10 | depth=30 | depth=50 | depth=80 | depth=110 |\n| --- | --- | --- | --- | --- | --- |\n`;
  for (const ref of [10, 30, 50]) {
    balance += `| ${ref} | ${enemyScale(10, ref).toFixed(2)} | ${enemyScale(30, ref).toFixed(2)} | ${enemyScale(50, ref).toFixed(2)} | ${enemyScale(80, ref).toFixed(2)} | ${enemyScale(110, ref).toFixed(2)} |\n`;
  }
  balance += '\n';

  // §8 鍛冶
  balance += `## 鍛冶（FORGE）\n\n`;
  balance += `| 定数 | 値 | 意味 |\n| --- | --- | --- |\n`;
  balance += `| MAX_LEVEL | ${FORGE.MAX_LEVEL} | 強化上限 |\n`;
  balance += `| STAT_PER_LEVEL | ${FORGE.STAT_PER_LEVEL} | 強化値1あたりのATK/MAT上昇 |\n`;
  balance += `| TIER_STEP | ${FORGE.TIER_STEP} | ティア連動係数 |\n`;
  balance += `| INGOT_INC.copper | ${FORGE.INGOT_INC.copper} | 銅インゴットの強化量 |\n`;
  balance += `| INGOT_INC.silver | ${FORGE.INGOT_INC.silver} | 銀インゴットの強化量 |\n`;
  balance += `| INGOT_INC.gold | ${FORGE.INGOT_INC.gold} | 金インゴットの強化量 |\n`;
  balance += `| FRAGMENTS_PER_INGOT | ${FORGE.FRAGMENTS_PER_INGOT} | 断片何個でインゴット1個 |\n\n`;

  // §9 解放・コスト
  balance += `## 解放・コスト\n\n`;
  balance += `| 定数 | 値 | 意味 |\n| --- | --- | --- |\n`;
  balance += `| UNLOCK.TITLE_DEPTH | ${UNLOCK.TITLE_DEPTH} | 称号（第2スキルツリー）解放到達階 |\n`;
  balance += `| UNLOCK.REBIRTH_MIN_LEVEL | ${UNLOCK.REBIRTH_MIN_LEVEL} | 転生可能レベル（Lv上限到達時のみ） |\n`;
  balance += `| CLASS_CHANGE_LEVEL_PENALTY | ${CLASS_CHANGE_LEVEL_PENALTY} | 転職時のレベル低下量 |\n`;
  balance += `| TITLE_BONUS_SP | ${TITLE_BONUS_SP} | 称号習得時のボーナスSP |\n\n`;

  // §10 初期値
  balance += `## 初期値\n\n`;
  balance += `| 定数 | 値 | 意味 |\n| --- | --- | --- |\n`;
  balance += `| STARTING_GOLD | ${STARTING_GOLD} | ニューゲーム開始時の所持金 |\n`;
  balance += `| GUILD_MEMBER_LIMIT | ${GUILD_MEMBER_LIMIT} | ギルドのメンバー上限 |\n`;
  balance += `| PARTY_MAX | ${PARTY_MAX} | 出撃パーティの最大人数（前衛3+後衛2） |\n\n`;

  // §11 転生（REBIRTH）
  balance += `## 転生（REBIRTH）\n\n`;
  balance += `> 仕様: Lv${UNLOCK.REBIRTH_MIN_LEVEL}到達時のみ可能。転生後はLv1から再スタート。永続ボーナスは累積（転生のたびに加算・頭打ちなし）。ボーナスは転生時に選んだ種族の成長傾向に応じて配分。\n\n`;
  balance += `| 定数 | 値 | 意味 |\n| --- | --- | --- |\n`;
  balance += `| STAT_TOTAL | ${REBIRTH.STAT_TOTAL} | 1回の転生で配る全ステ合計ボーナスポイント（基準30×8ステ）。種族傾向で按分。 |\n`;
  balance += `| BONUS_SP | ${REBIRTH.BONUS_SP} | 1回の転生で得る追加SP（種族非依存・固定・累積） |\n\n`;
  balance += `### 配分式\n\n`;
  balance += `\`\`\`\n`;
  balance += `avgGrowth[key] = (Σ_r RACES[r].statGrowth[key]) / N  // 全種族のステ別平均成長\n`;
  balance += `w[key]         = RACES[raceId].statGrowth[key] / avgGrowth[key]  // 対象種族の相対重み\n`;
  balance += `sumW           = Σ_key w[key]\n`;
  balance += `bonus[key]     = Math.round(STAT_TOTAL × w[key] / sumW)  // 合計がSTAT_TOTALになるよう正規化\n`;
  balance += `\`\`\`\n\n`;
  balance += `### 全種族の転生ボーナス配分（1回あたり）\n\n`;
  balance += `| 種族 | HP | TP | STR | VIT | AGI | INT | MND | LUC | 合計 |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n`;
  for (const rid of raceOrder) {
    const rb = rebirthStatBonusForRace(rid);
    const total = statKeys.reduce((s, k) => s + (rb[k] ?? 0), 0);
    balance += `| ${RACES[rid].name} | ${statKeys.map((k) => rb[k] ?? 0).join(' | ')} | ${total} |\n`;
  }
  balance += '\n';

  writeFileSync(resolve(out, 'balance.md'), balance, 'utf-8');
}

test('strategy-docs generator', () => {
  // 通常実行では no-op。GEN_DOCS=1 のときだけ書き出す（yarn gen:docs）。
  if (process.env.GEN_DOCS) generateStrategyDocs();
  expect(typeof generateStrategyDocs).toBe('function');
});
