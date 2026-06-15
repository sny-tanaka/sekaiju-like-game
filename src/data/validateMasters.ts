import { BATTLE_SKILLS } from '@/data/battleSkills';
import { MASTERS } from '@/data/index';
import { SELL_UNLOCKS } from '@/domain/shop';
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
  const {
    races,
    classes,
    titles,
    skills,
    unionSkills,
    summons,
    gatherTypes,
    recipes,
    enemies,
    items,
    equipment,
  } = MASTERS;

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
    // ユニオンツリーのスキルは UNION_SKILLS に効果定義があり、raceId が一致すること（[03 §9]）
    for (const node of race.unionSkillTree.skills) {
      const def = unionSkills[node.skillId];
      if (!def) {
        errors.push(
          `[races/${race.id}] ユニオンスキル "${node.skillId}" の効果定義が UNION_SKILLS に無い`
        );
      } else if (def.raceId !== race.id) {
        errors.push(
          `[races/${race.id}] ユニオンスキル "${node.skillId}" の raceId "${def.raceId}" が不一致`
        );
      }
    }
  }

  // ユニオンスキル: ID 規約・キー一致・人数/消費の妥当性
  checkIdConvention('unionSkills', Object.keys(unionSkills), errors);
  for (const [key, def] of Object.entries(unionSkills)) {
    if (key !== def.id) errors.push(`[unionSkills] キー "${key}" と id "${def.id}" が不一致`);
    if (!(def.id in skills)) errors.push(`[unionSkills] "${def.id}" が skills に未定義`);
    if (def.requiredParticipants < 1) {
      errors.push(`[unionSkills] "${def.id}" の requiredParticipants が 1 未満`);
    }
    if (def.gaugeCostPerParticipant < 0 || def.gaugeCostPerParticipant > 100) {
      errors.push(`[unionSkills] "${def.id}" の gaugeCostPerParticipant が 0..100 外`);
    }
    // ユニオンは通常スキル一覧（BATTLE_SKILLS）に混入してはならない（別枠コマンドのため）
    if (def.id in BATTLE_SKILLS) {
      errors.push(
        `[unionSkills] "${def.id}" が BATTLE_SKILLS にも存在（通常スキルとして撃ててしまう）`
      );
    }
  }

  // 召喚体（[03 §8]）: ID 規約・キー一致
  checkIdConvention('summons', Object.keys(summons), errors);
  for (const [key, s] of Object.entries(summons)) {
    if (key !== s.id) errors.push(`[summons] キー "${key}" と id "${s.id}" が不一致`);
  }
  // 召喚スキルの summonKind が実在するか（BATTLE_SKILLS の summon 効果）
  for (const def of Object.values(BATTLE_SKILLS)) {
    for (const eff of def.effects) {
      if (eff.kind === 'summon' && !(eff.summonKind in summons)) {
        errors.push(`[battleSkills] "${def.id}" の召喚 "${eff.summonKind}" が未定義`);
      }
    }
  }

  // 採集系統（[04 §5]）: 必要スキル・ドロップ素材の実在
  for (const [key, g] of Object.entries(gatherTypes)) {
    if (key !== g.type) errors.push(`[gatherTypes] キー "${key}" と type "${g.type}" が不一致`);
    if (!skillIds.has(g.requiredSkillId)) {
      errors.push(`[gatherTypes] "${g.type}" の requiredSkillId "${g.requiredSkillId}" が未定義`);
    }
    for (const d of g.drops) {
      if (!(d.itemId in items)) {
        errors.push(`[gatherTypes] "${g.type}" のドロップ "${d.itemId}" が未定義アイテム`);
      } else {
        // food 系統のドロップは food カテゴリ、素材系統は food 以外であること（振り分け先の整合）。
        const isFoodItem = items[d.itemId].category === 'food';
        if (g.food && !isFoodItem) {
          errors.push(`[gatherTypes] 食材系統 "${g.type}" のドロップ "${d.itemId}" が food でない`);
        }
        if (!g.food && isFoodItem) {
          errors.push(`[gatherTypes] 素材系統 "${g.type}" のドロップ "${d.itemId}" が food`);
        }
      }
      if (d.weight <= 0) errors.push(`[gatherTypes] "${g.type}" のドロップ重みが正でない`);
    }
  }

  // 料理レシピ（[04 §6]）: ID 規約・食材・結果の実在と food カテゴリ整合
  checkIdConvention('recipes', Object.keys(recipes), errors);
  for (const [key, r] of Object.entries(recipes)) {
    if (key !== r.id) errors.push(`[recipes] キー "${key}" と id "${r.id}" が不一致`);
    for (const ing of r.ingredients) {
      if (!(ing.itemId in items)) {
        errors.push(`[recipes] "${r.id}" の材料 "${ing.itemId}" が未定義`);
      } else if (items[ing.itemId].category !== 'food') {
        errors.push(`[recipes] "${r.id}" の材料 "${ing.itemId}" が food カテゴリでない`);
      }
    }
    if (!(r.result.itemId in items)) {
      errors.push(`[recipes] "${r.id}" の結果 "${r.result.itemId}" が未定義`);
    } else if (items[r.result.itemId].category !== 'food') {
      errors.push(`[recipes] "${r.id}" の結果 "${r.result.itemId}" が food カテゴリでない`);
    }
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

  // 敵ドロップ: itemId の実在・rate の範囲（[04 §7]）
  for (const e of Object.values(enemies)) {
    for (const d of e.drops ?? []) {
      if (!(d.itemId in items)) {
        errors.push(`[enemies] "${e.id}" のドロップ "${d.itemId}" が未定義アイテム`);
      }
      if (d.rate < 0 || d.rate > 1) {
        errors.push(`[enemies] "${e.id}" のドロップ "${d.itemId}" の rate が 0..1 外`);
      }
    }
  }

  // 素材売却での解放（[04 §8]）: キー素材と解放先装備の実在
  for (const [matId, equipIds] of Object.entries(SELL_UNLOCKS)) {
    if (!(matId in items)) errors.push(`[SELL_UNLOCKS] キー素材 "${matId}" が未定義`);
    for (const eid of equipIds) {
      if (!(eid in equipment)) errors.push(`[SELL_UNLOCKS] 解放先装備 "${eid}" が未定義`);
    }
  }

  return { ok: errors.length === 0, errors };
}
