import { applyBattleResult, startBattle } from '@/domain/battle';
import { startDive } from '@/domain/dive';
import { gradeMult, gradedBaseBonuses } from '@/domain/forge';
import { addItem, itemCount, removeItem } from '@/domain/inventory';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
import { buy, buyPriceOf, sell, sellPriceOf, shopCatalog } from '@/domain/shop';
import type { SaveData } from '@/domain/types';

// ============================================================================
// Phase 6-3: 周回グレード（LvN）の素材・装備（[06 §3]）。
// ============================================================================

function gw(): SaveData {
  let s = createInitialSaveData('G');
  s = addCharacterToGuild(
    s,
    createCharacter({ raceId: 'race_garon', classId: 'class_warrior', name: 'A' })
  );
  return s;
}

describe('インベントリのグレード別スタック', () => {
  test('grade 違いは別スタックで保持され、合計/個別に数えられる', () => {
    let s = gw();
    s = addItem(s, 'item_slime_jelly', 2, 1);
    s = addItem(s, 'item_slime_jelly', 3, 2); // Lv2 は別スタック
    expect(itemCount(s, 'item_slime_jelly')).toBe(5); // 合計
    expect(itemCount(s, 'item_slime_jelly', 1)).toBe(2);
    expect(itemCount(s, 'item_slime_jelly', 2)).toBe(3);
    s = removeItem(s, 'item_slime_jelly', 1, 2); // Lv2 を1減らす
    expect(itemCount(s, 'item_slime_jelly', 2)).toBe(2);
    expect(itemCount(s, 'item_slime_jelly', 1)).toBe(2);
  });
});

describe('ドロップのグレード=周回数', () => {
  test('2周目(51-60階)で倒すと素材が grade2 で入る', () => {
    const save = startDive(gw(), 1);
    const state = startBattle(save, ['enemy_slime']);
    const battle = {
      ...state,
      depth: 55,
      outcome: 'win' as const,
      drops: [{ enemyId: 'enemy_slime', itemId: 'item_slime_jelly' }],
    };
    const after = applyBattleResult(save, battle);
    expect(itemCount(after, 'item_slime_jelly', 2)).toBe(1);
    expect(itemCount(after, 'item_slime_jelly', 1)).toBe(0);
  });
});

describe('装備の周回グレード倍率（+50%/Lv）', () => {
  test('gradedBaseBonuses は grade で ×(1+0.5*(grade-1))', () => {
    expect(gradeMult(1)).toBe(1);
    expect(gradeMult(2)).toBe(1.5);
    expect(gradeMult(3)).toBe(2);
    // equip_short_sword は atk8（§7.2リバランス後）→ grade2 で round(12)、grade3 で round(16)
    expect(gradedBaseBonuses('equip_short_sword', 2).atk).toBe(12);
    expect(gradedBaseBonuses('equip_short_sword', 3).atk).toBe(16);
  });
});

describe('素材売却での装備グレード解放', () => {
  test('grade2 素材を売ると装備が Lv2 で並び、その個体が作れる', () => {
    let s = gw();
    s = { ...s, guild: { ...s.guild, gold: 5000 } };
    s = addItem(s, 'item_mat_t1_lord_pelt', 1, 2); // ボス素材 Lv2
    s = sell(s, 'item_mat_t1_lord_pelt', 1, 2); // equip_t2_sword / equip_t2_heavy を Lv2 解放
    expect(s.shopStock.unlockedGrades?.equip_t2_sword).toBe(2);
    // ショップに Lv2 で並ぶ（価格も上昇）
    const entry = shopCatalog(s).find((e) => e.id === 'equip_t2_sword');
    expect(entry?.name).toContain('Lv2');
    expect(entry?.price).toBe(buyPriceOf('equip_t2_sword', 2));
    // 購入すると grade2 の個体が手に入る
    s = buy(s, 'equip_t2_sword');
    const inst = s.guild.equipment.find((e) => e.masterId === 'equip_t2_sword');
    expect(inst?.grade).toBe(2);
  });

  test('素材の売却額は周回グレードで上昇する', () => {
    expect(sellPriceOf('item_slime_jelly', 2)).toBeGreaterThan(sellPriceOf('item_slime_jelly', 1));
  });
});
