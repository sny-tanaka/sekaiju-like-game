import type { GatherType, ItemId } from '@/domain/types';

// ============================================================================
// 採集系統マスター（[04 §5]）。各系統の必要スキルと重み付きドロップ表。
// 採集には対応スキルの保持者がパーティに必要。素材系は storage、食材系は foodStorage へ。
// ============================================================================

export interface GatherTypeDef {
  type: GatherType;
  name: string;
  requiredSkillId: string;
  /** 食材系（true なら foodStorage、false なら storage へ）。 */
  food: boolean;
  /** 重み付きドロップ表（weight に比例して抽選。1回の採集で1点抽選）。 */
  drops: { itemId: ItemId; weight: number }[];
}

export const GATHER_TYPES: Record<GatherType, GatherTypeDef> = {
  mining: {
    type: 'mining',
    name: '採掘',
    requiredSkillId: 'skill_mining',
    food: false,
    drops: [{ itemId: 'item_ore', weight: 3 }],
  },
  gathering: {
    type: 'gathering',
    name: '採取',
    requiredSkillId: 'skill_gathering',
    food: false,
    drops: [{ itemId: 'item_medic_herb', weight: 3 }],
  },
  logging: {
    type: 'logging',
    name: '伐採',
    requiredSkillId: 'skill_logging',
    food: false,
    drops: [{ itemId: 'item_lumber', weight: 3 }],
  },
  fishing: {
    type: 'fishing',
    name: '釣り',
    requiredSkillId: 'skill_fishing',
    food: true,
    drops: [{ itemId: 'item_food_fish', weight: 3 }],
  },
  harvest: {
    type: 'harvest',
    name: '収穫',
    requiredSkillId: 'skill_harvest',
    food: true,
    drops: [{ itemId: 'item_food_nuts', weight: 3 }],
  },
  hunting: {
    type: 'hunting',
    name: '狩猟',
    requiredSkillId: 'skill_hunting',
    food: true,
    drops: [{ itemId: 'item_food_meat', weight: 3 }],
  },
};

export const GATHER_TYPE_LIST: GatherType[] = Object.keys(GATHER_TYPES) as GatherType[];
