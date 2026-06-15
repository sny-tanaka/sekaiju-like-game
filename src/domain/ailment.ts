// ============================================================================
// 耐性システム（[06 §15]）。敵の状態異常耐性を系統別デフォルト＋アーキタイプ＋個別で解決する。
// ============================================================================

import { ENEMIES } from '@/data/enemies';
import type { AilmentType, EnemyId, EnemyMaster } from '@/domain/types';

// ----------------------------------------------------------------------------
// §15.3 種別デフォルト（zako/foe/boss ごとの全状態異常デフォルト値）
// ----------------------------------------------------------------------------

const AILMENT_TYPES: AilmentType[] = [
  'poison',
  'paralysis',
  'sleep',
  'confusion',
  'curse',
  'blind',
  'instantDeath',
  'headBind',
  'armBind',
  'legBind',
];

const KIND_DEFAULT: Record<'zako' | 'foe' | 'boss', number> = {
  zako: 0.7,
  foe: 0.5,
  boss: 0.35,
};

function kindDefaultResist(kind: 'zako' | 'foe' | 'boss'): Partial<Record<AilmentType, number>> {
  const val = KIND_DEFAULT[kind];
  const result: Partial<Record<AilmentType, number>> = {};
  for (const t of AILMENT_TYPES) result[t] = val;
  return result;
}

// ----------------------------------------------------------------------------
// §15.4 系統別アーキタイププロファイル
// ----------------------------------------------------------------------------

export type EnemyArchetype =
  | 'construct'
  | 'spirit'
  | 'undead'
  | 'plant'
  | 'slime'
  | 'insect'
  | 'bird'
  | 'beast';

/** §15.4 系統別の耐性プロファイル（種別デフォルトに上書き合成される） */
const ARCHETYPE_RESIST: Record<EnemyArchetype, Partial<Record<AilmentType, number>>> = {
  // construct(機械/構造): poison・sleep 無効、paralysis 耐性
  construct: { poison: 0, sleep: 0, paralysis: 0.5 },
  // spirit(霊体): 封じ3種・poison 無効、sleep 弱点
  spirit: { armBind: 0, headBind: 0, legBind: 0, poison: 0, sleep: 1.3 },
  // undead(不死/瘴気): poison・sleep 無効
  undead: { poison: 0, sleep: 0 },
  // plant(植物/菌): poison・blind 無効
  plant: { poison: 0, blind: 0 },
  // slime: 腕封じ・脚封じ 無効、paralysis 弱点
  slime: { armBind: 0, legBind: 0, paralysis: 1.3 },
  // insect(蟲): poison 耐性、paralysis 弱点
  insect: { poison: 0.5, paralysis: 1.3 },
  // bird(鳥/飛行): legBind 無効
  bird: { legBind: 0 },
  // beast(獣/人型/その他): 種別デフォルトのみ
  beast: {},
};

/**
 * §15.4 敵のアーキタイプを名前/IDキーワードで機械分類する。
 * 優先順: 機械>霊体>不死>植物>スライム>蟲>鳥>獣
 */
export function enemyArchetypeOf(master: EnemyMaster): EnemyArchetype {
  const name = master.name;
  const id = master.id;

  // 機械/構造: ゴーレム、哨戒機、自動兵器、番犬、歯車、装甲、結晶、クリスタル、タイデン、ホウデン
  if (
    name.includes('ゴーレム') ||
    name.includes('哨戒機') ||
    name.includes('自動兵器') ||
    name.includes('番犬') ||
    name.includes('歯車') ||
    name.includes('装甲') ||
    name.includes('結晶') ||
    name.includes('クリスタル') ||
    name.includes('タイデン') ||
    name.includes('ホウデン') ||
    id.includes('golem') ||
    id.includes('sentinel') ||
    id.includes('automaton') ||
    id.includes('crystal') ||
    id.includes('idol') // ホウデンキョゾウ（discharge_idol）
  ) {
    return 'construct';
  }

  // 霊体: 鬼火、亡霊、残り火、コオリビ、イカズチビ
  if (
    name.includes('鬼火') ||
    name.includes('亡霊') ||
    name.includes('残り火') ||
    name.includes('コオリビ') ||
    name.includes('イカズチビ') ||
    id.includes('wisp') ||
    id.includes('wraith') ||
    id.includes('revenant')
  ) {
    return 'spirit';
  }

  // 不死/瘴気: 骸骨、怨霊、呪詛、墓守、腐肉、疫病、這い虫、亡者
  if (
    name.includes('骸骨') ||
    name.includes('怨霊') ||
    name.includes('呪詛') ||
    name.includes('墓守') ||
    name.includes('腐肉') ||
    name.includes('疫病') ||
    name.includes('這い虫') ||
    name.includes('亡者') ||
    name.includes('腐王') || // 瘴気を統べる腐王
    id.includes('bone') ||
    id.includes('grave') ||
    id.includes('corpse') ||
    id.includes('plague') ||
    id.includes('rotwalker') ||
    id.includes('blight')
  ) {
    return 'undead';
  }

  // 植物/菌: タケ、樹人
  if (
    name.includes('タケ') ||
    name.includes('樹人') ||
    id.includes('mushroom') ||
    id.includes('treant')
  ) {
    return 'plant';
  }

  // スライム
  if (name.includes('スライム') || id.includes('slime')) {
    return 'slime';
  }

  // 蟲: ムシ、ヤスデ、ガニ、ガマ、毒蛾
  if (
    name.includes('ムシ') ||
    name.includes('ヤスデ') ||
    name.includes('ガニ') ||
    name.includes('ガマ') ||
    name.includes('毒蛾') ||
    id.includes('beetle') ||
    id.includes('crawler') ||
    id.includes('crab') ||
    id.includes('toad') ||
    id.includes('moth')
  ) {
    return 'insect';
  }

  // 鳥/飛行: タカ、チョウ、ワシ、フクロウ
  if (
    name.includes('タカ') ||
    name.includes('チョウ') ||
    name.includes('ワシ') ||
    name.includes('フクロウ') ||
    id.includes('hawk') ||
    id.includes('roc') ||
    id.includes('bird') ||
    id.includes('owl')
  ) {
    return 'bird';
  }

  // beast: それ以外すべて
  return 'beast';
}

/**
 * §15 敵の状態異常耐性を解決する。
 * マージ順（後優先）: 種別デフォルト → アーキタイププロファイル → マスター個別指定
 */
export function resolveEnemyAilmentResist(enemyId: EnemyId): Partial<Record<AilmentType, number>> {
  const master = ENEMIES[enemyId];
  if (!master) return {};

  const kind = master.kind ?? 'zako';
  // boss/foe/zako 以外は zako 扱い
  const resolvedKind: 'zako' | 'foe' | 'boss' =
    kind === 'boss' ? 'boss' : kind === 'foe' ? 'foe' : 'zako';

  const archetype = enemyArchetypeOf(master);

  // 後優先マージ
  return {
    ...kindDefaultResist(resolvedKind),
    ...ARCHETYPE_RESIST[archetype],
    ...(master.ailmentResist ?? {}),
  };
}
