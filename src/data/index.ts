import { CLASSES } from '@/data/classes';
import { ENEMIES } from '@/data/enemies';
import { EQUIPMENT } from '@/data/equipment';
import { ITEMS } from '@/data/items';
import { RACES } from '@/data/races';
import { SKILLS } from '@/data/skills';
import { TITLES } from '@/data/titles';

export { BALANCE } from '@/data/balance';
export { CLASSES } from '@/data/classes';
export { ENEMIES } from '@/data/enemies';
export { EQUIPMENT } from '@/data/equipment';
export { ITEMS } from '@/data/items';
export { RACES } from '@/data/races';
export { SKILLS } from '@/data/skills';
export { TITLES } from '@/data/titles';

/** 全マスターデータの集約。validateMasters や起動時参照に使う。 */
export const MASTERS = {
  races: RACES,
  classes: CLASSES,
  titles: TITLES,
  skills: SKILLS,
  enemies: ENEMIES,
  items: ITEMS,
  equipment: EQUIPMENT,
} as const;

export type Masters = typeof MASTERS;
