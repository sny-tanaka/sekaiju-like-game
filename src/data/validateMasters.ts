import { MASTERS } from '@/data/index';
import type { SkillTreeDef } from '@/domain/types';

// ============================================================================
// マスターデータ整合性検証（[05 §6]）。
// 起動時に1回呼び、ID 命名規約・参照整合（前提スキル・称号の親職業など）を検証する。
// バランス調整＝データ編集で完結させるため、データの誤りを早期に検出する。
// ============================================================================

export interface ValidationResult {
  ok: boolean;
  errors: string[];
}

/** ID 命名規約 `"<domain>_<name>"`（[05 §0.5]）。 */
const ID_PATTERN = /^[a-z]+_[a-z0-9_]+$/;

function checkIdConvention(domain: string, ids: string[], errors: string[]): void {
  for (const id of ids) {
    if (!ID_PATTERN.test(id)) {
      errors.push(`[${domain}] ID 命名規約違反: "${id}"（期待: <domain>_<name>）`);
    }
  }
}

function checkSkillTree(
  context: string,
  tree: SkillTreeDef,
  skillIds: Set<string>,
  errors: string[]
): void {
  const treeSkillIds = new Set(tree.skills.map((n) => n.skillId));
  for (const node of tree.skills) {
    if (!skillIds.has(node.skillId)) {
      errors.push(`[${context}] 未定義スキルを参照: "${node.skillId}"`);
    }
    for (const req of node.requires ?? []) {
      if (!treeSkillIds.has(req.skillId)) {
        errors.push(
          `[${context}] スキル "${node.skillId}" の前提 "${req.skillId}" が同ツリーに存在しない`
        );
      }
    }
  }
}

export function validateMasters(): ValidationResult {
  const errors: string[] = [];
  const { races, classes, titles, skills, enemies, items, equipment } = MASTERS;

  // ID 命名規約
  checkIdConvention('races', Object.keys(races), errors);
  checkIdConvention('classes', Object.keys(classes), errors);
  checkIdConvention('titles', Object.keys(titles), errors);
  checkIdConvention('skills', Object.keys(skills), errors);
  checkIdConvention('enemies', Object.keys(enemies), errors);
  checkIdConvention('items', Object.keys(items), errors);
  checkIdConvention('equipment', Object.keys(equipment), errors);

  // Record のキーと中身の id が一致しているか
  const checkKeyMatch = (domain: string, record: Record<string, { id: string }>) => {
    for (const [key, value] of Object.entries(record)) {
      if (key !== value.id) {
        errors.push(`[${domain}] キー "${key}" と id "${value.id}" が不一致`);
      }
    }
  };
  checkKeyMatch('races', races);
  checkKeyMatch('classes', classes);
  checkKeyMatch('titles', titles);
  checkKeyMatch('skills', skills);
  checkKeyMatch('enemies', enemies);
  checkKeyMatch('items', items);
  checkKeyMatch('equipment', equipment);

  const skillIds = new Set(Object.keys(skills));
  const classIds = new Set(Object.keys(classes));
  const titleIds = new Set(Object.keys(titles));

  // 種族: 既定職業が存在するか / ユニオンツリーの参照整合
  for (const race of Object.values(races)) {
    if (!classIds.has(race.defaultClassId)) {
      errors.push(`[races] "${race.id}" の defaultClassId "${race.defaultClassId}" が未定義`);
    }
    checkSkillTree(`races/${race.id}`, race.unionSkillTree, skillIds, errors);
  }

  // 職業: スキルツリー / 称号オプションが存在し、親職業が一致するか
  for (const cls of Object.values(classes)) {
    checkSkillTree(`classes/${cls.id}`, cls.skillTree, skillIds, errors);
    for (const titleId of cls.titleOptions) {
      if (!titleIds.has(titleId)) {
        errors.push(`[classes] "${cls.id}" の称号 "${titleId}" が未定義`);
        continue;
      }
      if (titles[titleId].parentClassId !== cls.id) {
        errors.push(`[classes] 称号 "${titleId}" の parentClassId が "${cls.id}" と不一致`);
      }
    }
  }

  // 称号: 親職業が存在し、スキルツリーの参照整合
  for (const title of Object.values(titles)) {
    if (!classIds.has(title.parentClassId)) {
      errors.push(`[titles] "${title.id}" の parentClassId "${title.parentClassId}" が未定義`);
    }
    checkSkillTree(`titles/${title.id}`, title.skillTree, skillIds, errors);
  }

  // 装備: slot と weaponType/armorType の整合、価格の非負
  for (const eq of Object.values(equipment)) {
    if (eq.slot === 'weapon' && !eq.weaponType) {
      errors.push(`[equipment] "${eq.id}" は weapon だが weaponType が未設定`);
    }
    if (eq.slot === 'armor' && !eq.armorType) {
      errors.push(`[equipment] "${eq.id}" は armor だが armorType が未設定`);
    }
    if (eq.buyPrice < 0 || eq.tier < 0) {
      errors.push(`[equipment] "${eq.id}" の buyPrice/tier が負`);
    }
  }

  // アイテム: 価格非負、消費アイテムは使用手段（effects か useContext）を持つ
  for (const it of Object.values(items)) {
    if (it.buyPrice < 0) errors.push(`[items] "${it.id}" の buyPrice が負`);
    if (it.category === 'consumable' && !it.useContext && !it.effects) {
      errors.push(`[items] 消費アイテム "${it.id}" に useContext も effects も無い（使用不能）`);
    }
  }

  return { ok: errors.length === 0, errors };
}
