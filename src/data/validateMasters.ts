import { BATTLE_SKILLS } from '@/data/battleSkills';
import { COLLECTIBLE_BY_ENEMY } from '@/data/collectibles';
import { MASTERS } from '@/data/index';
import { PASSIVE_SKILLS } from '@/data/passives';
import { QUESTS, type QuestMaster } from '@/data/quests';
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

/**
 * 依頼（v3.0.0 §7）マスタの検証。target の enemyId/itemId/depth・rewards の itemId が
 * 実在すること、hunt/delivery は count>=1、reach/boss は depth>=1 であることを確認する。
 * validateMasters() から呼ぶほか、テストから直接呼んでフェイルケースを検証できるよう分離する。
 */
export function validateQuestMasters(
  quests: Record<string, QuestMaster>,
  enemyIds: ReadonlySet<string>,
  itemIds: ReadonlySet<string>
): string[] {
  const errors: string[] = [];
  checkIdConvention('quests', Object.keys(quests), errors);
  for (const [key, q] of Object.entries(quests)) {
    if (key !== q.id) errors.push(`[quests] キー "${key}" と id "${q.id}" が不一致`);

    if (q.kind === 'hunt') {
      if (!q.target.enemyId || !enemyIds.has(q.target.enemyId)) {
        errors.push(`[quests] "${q.id}" の target.enemyId "${q.target.enemyId}" が未定義`);
      }
      if ((q.target.count ?? 0) < 1) {
        errors.push(`[quests] "${q.id}" (hunt) の target.count が 1 未満`);
      }
    } else if (q.kind === 'delivery') {
      if (!q.target.itemId || !itemIds.has(q.target.itemId)) {
        errors.push(`[quests] "${q.id}" の target.itemId "${q.target.itemId}" が未定義`);
      }
      if ((q.target.count ?? 0) < 1) {
        errors.push(`[quests] "${q.id}" (delivery) の target.count が 1 未満`);
      }
    } else if (q.kind === 'reach' || q.kind === 'boss') {
      if ((q.target.depth ?? 0) < 1) {
        errors.push(`[quests] "${q.id}" (${q.kind}) の target.depth が 1 未満`);
      }
    }

    for (const item of q.rewards.items ?? []) {
      if (!itemIds.has(item.itemId)) {
        errors.push(`[quests] "${q.id}" の報酬アイテム "${item.itemId}" が未定義`);
      }
    }
  }
  return errors;
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

  // 種族: 既定職業が存在するか / 種族スキルツリーの参照整合
  for (const race of Object.values(races)) {
    if (!classIds.has(race.defaultClassId)) {
      errors.push(`[races] "${race.id}" の defaultClassId "${race.defaultClassId}" が未定義`);
    }
    checkSkillTree(`races/${race.id}`, race.raceSkillTree, skillIds, errors);
    // 種族ツリー内のユニオンスキルは raceId が一致すること。
    // （ユニオン以外＝採集スキル等は混在してよいので def 無しはエラーにしない。）
    for (const node of race.raceSkillTree.skills) {
      const def = unionSkills[node.skillId];
      if (def && def.raceId !== race.id) {
        errors.push(
          `[races/${race.id}] ユニオンスキル "${node.skillId}" の raceId "${def.raceId}" が不一致`
        );
      }
    }
  }

  // ユニオンスキルは必ず該当種族の種族スキルツリーに含まれること（[03 §9]）。
  for (const def of Object.values(unionSkills)) {
    const tree = races[def.raceId]?.raceSkillTree;
    if (!tree || !tree.skills.some((n) => n.skillId === def.id)) {
      errors.push(`[unionSkills] "${def.id}" が種族 "${def.raceId}" のスキルツリーに無い`);
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

  // パッシブスキル（[03 §5.4]）: ID 規約・キー一致・skills 実在・他レジストリとの非重複
  checkIdConvention('passiveSkills', Object.keys(PASSIVE_SKILLS), errors);
  for (const [key, def] of Object.entries(PASSIVE_SKILLS)) {
    if (key !== def.id) errors.push(`[passiveSkills] キー "${key}" と id "${def.id}" が不一致`);
    if (!skillIds.has(def.id)) errors.push(`[passiveSkills] "${def.id}" が skills に未定義`);
    // パッシブは「撃つ」スキルではないので BATTLE_SKILLS / UNION_SKILLS に混入してはならない。
    if (def.id in BATTLE_SKILLS) {
      errors.push(`[passiveSkills] "${def.id}" が BATTLE_SKILLS にも存在（戦闘で撃ててしまう）`);
    }
    if (def.id in unionSkills) {
      errors.push(`[passiveSkills] "${def.id}" が UNION_SKILLS にも存在`);
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

  // 秘宝（v3.0.0 §5）: すべての敵に COLLECTIBLE_BY_ENEMY のエントリがあり、参照先アイテムが
  // 実在し collectible===true かつ category==='valuable' であること。
  for (const id of Object.keys(enemies)) {
    const itemId = COLLECTIBLE_BY_ENEMY[id];
    if (!itemId) {
      errors.push(`[COLLECTIBLE_BY_ENEMY] 敵 "${id}" のエントリが無い`);
      continue;
    }
    const item = items[itemId];
    if (!item) {
      errors.push(`[COLLECTIBLE_BY_ENEMY] "${id}" の参照先アイテム "${itemId}" が未定義`);
      continue;
    }
    if (item.collectible !== true) {
      errors.push(`[COLLECTIBLE_BY_ENEMY] "${itemId}" は collectible:true でない`);
    }
    if (item.category !== 'valuable') {
      errors.push(`[COLLECTIBLE_BY_ENEMY] "${itemId}" は category:'valuable' でない`);
    }
  }

  // 換金アイテム（v3.0.0 §3）: gemValue を持つアイテムは gemValue > 0 かつ category==='valuable'。
  for (const it of Object.values(items)) {
    if (it.gemValue === undefined) continue;
    if (it.gemValue <= 0) errors.push(`[items] "${it.id}" の gemValue が正でない`);
    if (it.category !== 'valuable') {
      errors.push(`[items] "${it.id}" は gemValue を持つが category:'valuable' でない`);
    }
  }

  // ジェム限定装備（v3.0.0 §6）: gemPrice を持つ装備は buyPrice===0。
  for (const eq of Object.values(equipment)) {
    if (eq.gemPrice === undefined) continue;
    if (eq.buyPrice !== 0) {
      errors.push(`[equipment] "${eq.id}" は gemPrice を持つが buyPrice が 0 でない`);
    }
  }

  // 依頼（v3.0.0 §7）: キー一致、target の enemyId/itemId/depth・rewards の itemId が実在すること。
  // hunt/delivery は count>=1。reach/boss は depth>=1。
  errors.push(
    ...validateQuestMasters(QUESTS, new Set(Object.keys(enemies)), new Set(Object.keys(items)))
  );

  return { ok: errors.length === 0, errors };
}
