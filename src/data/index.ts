import { CLASSES } from '@/data/classes';
import { ENEMIES } from '@/data/enemies';
import { EQUIPMENT } from '@/data/equipment';
import { GATHER_TYPES } from '@/data/gather';
import { ITEMS } from '@/data/items';
import { PASSIVE_SKILLS } from '@/data/passives';
import { RACES } from '@/data/races';
import { RECIPES } from '@/data/recipes';
import { SKILLS } from '@/data/skills';
import { SUMMONS } from '@/data/summons';
import { TITLES } from '@/data/titles';
import { UNION_SKILLS } from '@/data/unionSkills';

export { BALANCE } from '@/data/balance';
export { CLASSES } from '@/data/classes';
export { ENEMIES } from '@/data/enemies';
export { EQUIPMENT } from '@/data/equipment';
export { GATHER_TYPES } from '@/data/gather';
export { ITEMS } from '@/data/items';
export { PASSIVE_SKILLS } from '@/data/passives';
export { RACES } from '@/data/races';
export { RECIPES } from '@/data/recipes';
export { SKILLS } from '@/data/skills';
export { SUMMONS } from '@/data/summons';
export { TITLES } from '@/data/titles';
export { UNION_SKILLS } from '@/data/unionSkills';

/** 全マスターデータの集約。validateMasters や起動時参照に使う。 */
export const MASTERS = {
  races: RACES,
  classes: CLASSES,
  titles: TITLES,
  skills: SKILLS,
  passiveSkills: PASSIVE_SKILLS,
  unionSkills: UNION_SKILLS,
  summons: SUMMONS,
  gatherTypes: GATHER_TYPES,
  recipes: RECIPES,
  enemies: ENEMIES,
  items: ITEMS,
  equipment: EQUIPMENT,
} as const;

export type Masters = typeof MASTERS;
