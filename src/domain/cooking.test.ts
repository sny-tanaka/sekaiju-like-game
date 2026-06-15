import { canCook, cook, unlockRecipe, unlockedRecipes } from '@/domain/cooking';
import { addFood, foodCount } from '@/domain/inventory';
import { createInitialSaveData } from '@/domain/saveData';
import type { SaveData } from '@/domain/types';

function freshSave(): SaveData {
  return createInitialSaveData('料理団');
}

describe('cooking', () => {
  test('初期は既定レシピのみ解放されている', () => {
    const save = freshSave();
    const ids = unlockedRecipes(save).map((r) => r.id);
    expect(ids).toContain('recipe_grilled_fish');
    expect(ids).toContain('recipe_grilled_meat');
    expect(ids).not.toContain('recipe_nut_platter'); // 既定では未解放
  });

  test('材料が揃えば調理できる（焼き魚）', () => {
    let save = freshSave();
    save = addFood(save, 'item_food_fish', 2);
    expect(canCook(save, 'recipe_grilled_fish')).toBe(true);
    const res = cook(save, 'recipe_grilled_fish');
    expect(res.ok).toBe(true);
    expect(foodCount(res.save, 'item_food_fish')).toBe(0); // 2 消費
    expect(foodCount(res.save, 'item_dish_grilled_fish')).toBe(1);
  });

  test('材料不足なら調理できない', () => {
    let save = freshSave();
    save = addFood(save, 'item_food_fish', 1); // 2 必要
    expect(canCook(save, 'recipe_grilled_fish')).toBe(false);
    const res = cook(save, 'recipe_grilled_fish');
    expect(res.ok).toBe(false);
  });

  test('未解放レシピは材料があっても作れない', () => {
    let save = freshSave();
    save = addFood(save, 'item_food_nuts', 3);
    expect(canCook(save, 'recipe_nut_platter')).toBe(false);
    save = unlockRecipe(save, 'recipe_nut_platter');
    expect(canCook(save, 'recipe_nut_platter')).toBe(true);
    const res = cook(save, 'recipe_nut_platter');
    expect(res.ok).toBe(true);
    expect(foodCount(res.save, 'item_dish_nut_platter')).toBe(1);
  });
});
