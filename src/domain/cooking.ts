import { RECIPES } from '@/data/recipes';
import { addFood, foodCount, removeFood } from '@/domain/inventory';
import type { RecipeMaster, SaveData } from '@/domain/types';

// ============================================================================
// 料理（[04 §6]）。調理地点（cookingSpot）で食材を消費して料理を作る純関数。
// レシピは解放済み（unlockedRecipeIds）かつ材料が揃っていれば調理可能。
// ============================================================================

/** 現在地が調理地点か。 */
export function isAtCookingSpot(save: SaveData): boolean {
  const dive = save.diveState;
  if (!dive) return false;
  const cell = save.towerState.floors[dive.depth]?.generated.cells[dive.pos.y]?.[dive.pos.x];
  return cell?.event?.kind === 'cookingSpot';
}

/** 解放済みレシピ一覧。 */
export function unlockedRecipes(save: SaveData): RecipeMaster[] {
  const unlocked = new Set(save.unlockedRecipeIds ?? []);
  return Object.values(RECIPES).filter((r) => unlocked.has(r.id));
}

/** そのレシピの材料が foodStorage に揃っているか。 */
export function canCook(save: SaveData, recipeId: string): boolean {
  const r = RECIPES[recipeId];
  if (!r) return false;
  if (!(save.unlockedRecipeIds ?? []).includes(recipeId)) return false;
  return r.ingredients.every((ing) => foodCount(save, ing.itemId) >= ing.qty);
}

/**
 * 調理する。材料を foodStorage から消費し、結果の料理を foodStorage に加える。
 * 解放前・材料不足なら変更しない。
 */
export function cook(save: SaveData, recipeId: string): { ok: boolean; save: SaveData } {
  if (!canCook(save, recipeId)) return { ok: false, save };
  const r = RECIPES[recipeId];
  let next = save;
  for (const ing of r.ingredients) next = removeFood(next, ing.itemId, ing.qty);
  next = addFood(next, r.result.itemId, r.result.count);
  return { ok: true, save: next };
}

/** レシピを解放する（到達階・ドロップ・購入等のトリガーから呼ぶ。[06 §8]）。 */
export function unlockRecipe(save: SaveData, recipeId: string): SaveData {
  if (!RECIPES[recipeId]) return save;
  const cur = save.unlockedRecipeIds ?? [];
  if (cur.includes(recipeId)) return save;
  return { ...save, unlockedRecipeIds: [...cur, recipeId] };
}
