import type { RecipeMaster } from '@/domain/types';

// ============================================================================
// 料理レシピマスター（[04 §6]）。食材を消費して上位の料理を作る。
// MVP は「焼く」系のみ。解放トリガーは到達階・ドロップ・購入等（[06 §8]）。
// ============================================================================

export const RECIPES: Record<string, RecipeMaster> = {
  recipe_grilled_fish: {
    id: 'recipe_grilled_fish',
    name: '焼き魚',
    ingredients: [{ itemId: 'item_food_fish', qty: 2 }],
    result: { itemId: 'item_dish_grilled_fish', count: 1 },
    unlockedByDefault: true,
  },
  recipe_grilled_meat: {
    id: 'recipe_grilled_meat',
    name: '焼き肉',
    ingredients: [{ itemId: 'item_food_meat', qty: 2 }],
    result: { itemId: 'item_dish_grilled_meat', count: 1 },
    unlockedByDefault: true,
  },
  recipe_nut_platter: {
    id: 'recipe_nut_platter',
    name: '木の実の盛り合わせ',
    ingredients: [{ itemId: 'item_food_nuts', qty: 3 }],
    result: { itemId: 'item_dish_nut_platter', count: 1 },
    unlockedByDefault: false, // 解放後に作れる（[06 §8] 非ストーリー手段）
  },
};

/** 初期解放レシピ ID。 */
export function defaultUnlockedRecipeIds(): string[] {
  return Object.values(RECIPES)
    .filter((r) => r.unlockedByDefault)
    .map((r) => r.id);
}
