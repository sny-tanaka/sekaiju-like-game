/**
 * 攻略ドキュメント（/strategy-docs）をマスターデータから生成する。
 * 副作用（ファイル書き込み）は GEN_DOCS=1 のときだけ実行する（通常の vitest では no-op）。
 * 再生成: `yarn gen:docs`（= GEN_DOCS=1 vitest run src/data/strategyDocsGen.test.ts）。
 * バランス調整でデータを変えたら本コマンドで strategy-docs を更新する。
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { test, expect } from 'vitest';

import { BATTLE_SKILLS } from '@/data/battleSkills';
import { CLASSES } from '@/data/classes';
import { PASSIVE_SKILLS } from '@/data/passives';
import { RACES } from '@/data/races';
import { SKILLS } from '@/data/skills';
import { SUMMONS } from '@/data/summons';
import { TITLES } from '@/data/titles';
import { UNION_SKILLS } from '@/data/unionSkills';
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
const range = (f: (lv: number) => number, max: number) =>
  f(1) === f(max) ? n2(f(1)) : `${n2(f(1))}→${n2(f(max))}`;
const pctRange = (f: (lv: number) => number, max: number) => {
  const a = Math.round(f(1) * 100);
  const b = Math.round(f(max) * 100);
  return a === b ? `${a}%` : `${a}%→${b}%`;
};
const tpStr = (def: BattleSkillDef, max: number) =>
  def.tpCost(1) === def.tpCost(max) ? `${def.tpCost(1)}` : `${def.tpCost(1)}→${def.tpCost(max)}`;

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
      return `${base}ダメージ 威力${range(e.power, max)}${hits}`;
    }
    case 'heal':
      return `HP回復 ${range(e.amount, max)}`;
    case 'restoreTp':
      return `TP回復 ${range(e.amount, max)}`;
    case 'buff': {
      const verb = e.modifier(1) < 1 ? '低下' : '上昇';
      return `${BUFFSTAT[e.stat]}${verb} ×${range(e.modifier, max)} / ${e.turns}ターン`;
    }
    case 'ailment':
      return `${ailmentLabel(e.ailment)} 付与 ${pctRange(e.chance, max)} / ${e.turns}ターン`;
    case 'summon':
      return `召喚: ${SUMMONS[e.summonKind]?.name ?? e.summonKind}`;
    case 'counter':
      return `反撃の構え 発動率${pctRange(e.chance, max)}・威力${range(e.power, max)} / ${e.turns}ターン`;
    case 'chase':
      return `連携追撃の構え 威力${range(e.power, max)} / ${e.turns}ターン`;
    case 'decoy':
      return `挑発（狙われ重み +${range(e.weight, max)}） / ${e.turns}ターン`;
    case 'barrier':
      return `障壁（被弾を計${range(e.absorb, max)}まで肩代わり） / ${e.turns}ターン`;
    case 'cleanse':
      return `状態異常を全解除`;
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
    const a = def.mods(1)[k];
    const b = def.mods(max)[k];
    if (a === undefined || b === undefined) continue;
    parts.push(`${label} +${Math.round((a - 1) * 100)}%→+${Math.round((b - 1) * 100)}%`);
  }
  const cA = def.mods(1).crit;
  const cB = def.mods(max).crit;
  if (cA !== undefined && cB !== undefined)
    parts.push(`クリ率 +${Math.round(cA * 100)}%→+${Math.round(cB * 100)}%`);
  const cond = def.weaponType ? `（${def.weaponType} 装備時のみ）` : '';
  return `常時: ${parts.join('・')}${cond}`;
}
function nodeRow(node: SkillTreeNode): string {
  const id = node.skillId;
  const max = node.maxLevel;
  const name = SKILLS[id]?.name ?? id;
  const req =
    node.requires && node.requires.length > 0
      ? node.requires.map((r) => `${SKILLS[r.skillId]?.name ?? r.skillId} Lv${r.level}`).join('・')
      : '―';
  if (id in PASSIVE_SKILLS)
    return `| ${name} | パッシブ | ${max} | ― | ― | ― | ${passiveStr(id, max)} | ${req} |`;
  if (id in BATTLE_SKILLS) {
    const def = BATTLE_SKILLS[id];
    return `| ${name} | アクティブ(${TREE[def.tree]}) | ${max} | ${tpStr(def, max)} | ${TARGET[def.target]} | ${ELEM[def.element]} | ${def.effects.map((e) => effectStr(e, max)).join('／')} | ${req} |`;
  }
  if (id in UNION_SKILLS) {
    const u = UNION_SKILLS[id];
    return `| ${name} | ユニオン | ${max} | ゲージ${u.gaugeCostPerParticipant}×${u.requiredParticipants}人 | ${TARGET[u.target]} | ${ELEM[u.element]} | ${u.effects.map((e) => effectStr(e, max)).join('／')} | ${req} |`;
  }
  return `| ${name} | 探索 | ${max} | ― | ― | ― | ${SKILLS[id]?.description ?? ''} | ${req} |`;
}

const TABLE_HEAD =
  '| スキル | 種別 | 最大Lv | TP | 対象 | 属性 | 効果（Lv1→最大Lv） | 前提 |\n| --- | --- | --- | --- | --- | --- | --- | --- |';
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
  race_garon: '物理特化の大型種。高HP・高STRだが素早さと知力に乏しい。',
  race_pix: '魔法特化の小型種。高TP・高INT/MNDだが打たれ弱い。',
  race_therian: '獣使い種。素早く幸運が高い、命中・回避と食料調達に長ける。',
  race_lunar: '月の民。魔法・幸運寄りの癒し手で、魔法防御とTPが伸びる。',
  race_golan: '岩の民。最高峰の耐久と剛力を持つが、極端に鈍重。',
};
const statKeys: StatKey[] = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];

/** strategy-docs/*.md を生成して書き出す。 */
export function generateStrategyDocs(): void {
  const out = resolve(process.cwd(), 'strategy-docs');
  mkdirSync(out, { recursive: true });

  let classes = `# 職業（クラス）一覧\n\n> 数値は \`src/data\` のマスターデータから自動生成（\`yarn gen:docs\`）。スキルは**レベルで自動習得ではなく SP で習得**し、表の「前提」を満たすと解放される（3段の前提チェーン。詳細は [README](./README.md)）。\n\n`;
  for (const cid of classOrder) {
    const c = CLASSES[cid];
    classes += `## ${c.name}（全${c.skillTree.skills.length}スキル）\n\n${classRole[cid] ?? ''}\n\n`;
    classes += `- **装備可能武器**: ${c.equipableWeaponTypes.join(' / ')}\n- **装備可能防具**: ${c.equipableArmorTypes.join(' / ')}\n- **称号（第2スキルツリー）**: ${c.titleOptions.map((t) => TITLES[t]?.name ?? t).join(' / ')}\n- **起点スキル（作成/転職時に Lv1 で無料習得）**: ${SKILLS[c.skillTree.skills[0].skillId]?.name}\n\n`;
    classes += `### スキルツリー\n\n${TABLE_HEAD}\n`;
    for (const node of c.skillTree.skills) classes += nodeRow(node) + '\n';
    classes += '\n';
  }
  writeFileSync(resolve(out, 'classes.md'), classes, 'utf-8');

  let races = `# 種族（レース）一覧\n\n> 基礎ステータスは種族で決まり、Lvごとに成長値ぶん上昇する（\`stat(Lv) = 初期値 + 成長 × (Lv-1)\`）。種族スキル（ユニオン・採集・種族パッシブ）は**転職しても保持**される。\n\n`;
  for (const rid of raceOrder) {
    const r = RACES[rid];
    races += `## ${r.name}\n\n${raceRole[rid] ?? ''}\n\n- **既定職業（作成時の初期値）**: ${CLASSES[r.defaultClassId]?.name ?? r.defaultClassId}\n\n`;
    races += `| ステ | ${statKeys.map((k) => STAT_LABEL[k]).join(' | ')} |\n| --- | ${statKeys.map(() => '---').join(' | ')} |\n`;
    races += `| 初期値(Lv1) | ${statKeys.map((k) => r.baseStatsAtLv1[k]).join(' | ')} |\n`;
    races += `| 成長/Lv | ${statKeys.map((k) => r.statGrowth[k]).join(' | ')} |\n`;
    races += `| Lv100時 | ${statKeys.map((k) => r.baseStatsAtLv1[k] + r.statGrowth[k] * 99).join(' | ')} |\n\n`;
    races += `### 種族スキルツリー\n\n${TABLE_HEAD}\n`;
    for (const node of r.raceSkillTree.skills) races += nodeRow(node) + '\n';
    races += '\n';
  }
  writeFileSync(resolve(out, 'races.md'), races, 'utf-8');

  let titles = `# 称号（二つ名 / 第2スキルツリー）一覧\n\n> 到達階20で解放。1職業につき2種から1つ選び、第2スキルツリー（各3スキル）と**成長傾向の補正**を得る（習得時 SP+5）。称号は転職で外れる。\n\n`;
  for (const cid of classOrder) {
    for (const tid of CLASSES[cid].titleOptions) {
      const t = TITLES[tid];
      if (!t) continue;
      const growth = statKeys
        .filter((k) => t.growthModifier[k] !== 0)
        .map((k) => `${STAT_LABEL[k]}+${t.growthModifier[k]}`)
        .join('・');
      titles += `## ${t.name}（${CLASSES[cid].name}）\n\n- **成長補正**: ${growth || '―'}\n\n${TABLE_HEAD}\n`;
      for (const node of t.skillTree.skills) titles += nodeRow(node) + '\n';
      titles += '\n';
    }
  }
  writeFileSync(resolve(out, 'titles.md'), titles, 'utf-8');

  let summons = `# 召喚体一覧\n\n> 召喚スキルで最前列に呼び出す。出現階で敵と同じ係数によりスケールする。\n\n| 召喚体 | HP | STR | VIT | AGI | 攻撃属性 | 自律行動 | 強化/状態異常 | 永続 |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n`;
  for (const s of Object.values(SUMMONS))
    summons += `| ${s.name} | ${s.baseStats.hp} | ${s.baseStats.str} | ${s.baseStats.vit} | ${s.baseStats.agi} | ${ELEM[s.attackElement]} | ${s.actsOnTurn ? '攻撃する' : '壁のみ'} | ${s.buffImmune ? '無効' : '有効'} | ${s.persistsAfterBattle ? '戦闘またぎ' : '戦闘限り'} |\n`;
  writeFileSync(resolve(out, 'summons.md'), summons, 'utf-8');
}

test('strategy-docs generator', () => {
  // 通常実行では no-op。GEN_DOCS=1 のときだけ書き出す（yarn gen:docs）。
  if (process.env.GEN_DOCS) generateStrategyDocs();
  expect(typeof generateStrategyDocs).toBe('function');
});
