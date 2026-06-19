import type { Element, WeaponType } from '@/domain/types';

// 武器種 → 通常攻撃属性。staff は STR 物理で殴る扱いのため bash。
// （マップを const で持ち、helper も export）
export const WEAPON_NORMAL_ATTACK_ELEMENT: Record<WeaponType, Element> = {
  sword: 'slash',
  spear: 'pierce',
  axe: 'slash',
  bow: 'pierce',
  fist: 'bash',
  staff: 'bash',
};

/** 武器種から通常攻撃の element を求める。未装備（undefined）は bash。 */
export const weaponNormalAttackElement = (weaponType: WeaponType | undefined): Element =>
  weaponType ? WEAPON_NORMAL_ATTACK_ELEMENT[weaponType] : 'bash';
