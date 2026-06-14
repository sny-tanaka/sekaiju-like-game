import { itemCount } from '@/domain/inventory';
import { createInitialSaveData } from '@/domain/saveData';
import { buy, sell, sellPriceOf, shopCatalog, unlockedTier } from '@/domain/shop';
import type { SaveData } from '@/domain/types';

function richSave(gold: number): SaveData {
  const save = createInitialSaveData('g');
  return { ...save, guild: { ...save.guild, gold } };
}

describe('shop', () => {
  test('unlockedTier は到達階で決まる', () => {
    const save = createInitialSaveData('g');
    expect(unlockedTier(save)).toBe(0);
    const deep = {
      ...save,
      towerState: { ...save.towerState, record: { ...save.towerState.record, deepestReached: 25 } },
    };
    expect(unlockedTier(deep)).toBe(2);
  });

  test('カタログに tier0 装備と消費アイテムが並ぶ', () => {
    const catalog = shopCatalog(createInitialSaveData('g'));
    expect(catalog.some((e) => e.id === 'equip_short_sword' && e.kind === 'equip')).toBe(true);
    expect(catalog.some((e) => e.id === 'item_potion' && e.kind === 'item')).toBe(true);
  });

  test('購入で所持金が減り倉庫に入る／所持金不足なら不可', () => {
    let save = richSave(100);
    save = buy(save, 'item_potion'); // 30
    expect(save.guild.gold).toBe(70);
    expect(itemCount(save, 'item_potion')).toBe(1);

    // 高額（鉄の鎧180）は買えない
    const before = save;
    save = buy(save, 'equip_iron_armor');
    expect(save).toBe(before);
  });

  test('売却で所持金が増え倉庫から減る', () => {
    let save = richSave(0);
    save = buy(richSave(200), 'equip_short_sword'); // 120 → gold 80, 在庫1
    expect(save.guild.gold).toBe(80);
    const gold0 = save.guild.gold;
    save = sell(save, 'equip_short_sword', 1); // 売却 60
    expect(save.guild.gold).toBe(gold0 + sellPriceOf('equip_short_sword'));
    expect(itemCount(save, 'equip_short_sword')).toBe(0);
  });

  test('持っていない物は売れない', () => {
    const save = richSave(0);
    expect(sell(save, 'item_potion', 1)).toBe(save);
  });

  test('素材を売ると関連装備がショップに並ぶ（恒久解放）', () => {
    let save = createInitialSaveData('g');
    // 第1帯では tier1 の equip_slime_shield は並ばない
    expect(shopCatalog(save).some((e) => e.id === 'equip_slime_shield')).toBe(false);
    // スライムゼリーを入手して売却
    save = { ...save, guild: { ...save.guild, storage: [{ itemId: 'item_slime_jelly', qty: 1 }] } };
    save = sell(save, 'item_slime_jelly', 1);
    expect(save.shopStock.unlockedItemIds).toContain('equip_slime_shield');
    expect(shopCatalog(save).some((e) => e.id === 'equip_slime_shield')).toBe(true);
  });
});
