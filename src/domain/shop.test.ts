import { itemCount } from '@/domain/inventory';
import { createInitialSaveData } from '@/domain/saveData';
import {
  buy,
  buyMany,
  equipableClassNames,
  sell,
  sellEquipment,
  sellPriceOf,
  shopCatalog,
  unlockedTier,
} from '@/domain/shop';
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

  test('装備の購入は個体としてプールに入り、売却で所持金が増えプールから減る', () => {
    let save = buy(richSave(200), 'equip_short_sword'); // 120 → gold 80, 個体1
    expect(save.guild.gold).toBe(80);
    expect(save.guild.equipment).toHaveLength(1);
    const inst = save.guild.equipment[0];
    const gold0 = save.guild.gold;
    save = sellEquipment(save, inst.id); // 売却（買値の半額 = 60）
    expect(save.guild.gold).toBe(gold0 + Math.floor(120 / 2));
    expect(save.guild.equipment).toHaveLength(0);
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

  // --- #30 buyMany テスト ---
  test('buyMany: 所持金潤沢なら qty 個ぶん gold が減り倉庫に入る', () => {
    let save = richSave(1000);
    save = buyMany(save, 'item_potion', 3); // ポーション30G × 3 = 90G
    expect(save.guild.gold).toBe(910);
    expect(itemCount(save, 'item_potion')).toBe(3);
  });

  test('buyMany: 所持金不足なら買える上限までに丸められ gold が負にならない', () => {
    // ポーション30G、所持金70G → 最大2個まで
    let save = richSave(70);
    save = buyMany(save, 'item_potion', 5);
    expect(save.guild.gold).toBeGreaterThanOrEqual(0);
    expect(save.guild.gold).toBe(10); // 70 - 30*2 = 10
    expect(itemCount(save, 'item_potion')).toBe(2);
  });

  test('buyMany: 装備を複数購入するとプールに個体が追加される', () => {
    let save = richSave(500);
    save = buyMany(save, 'equip_short_sword', 3); // 120G × 3 = 360G
    expect(save.guild.gold).toBe(140);
    expect(save.guild.equipment.filter((e) => e.masterId === 'equip_short_sword')).toHaveLength(3);
  });

  test('buyMany: 所持金が price 未満なら 0 個（save をそのまま返す）', () => {
    const save = richSave(10);
    const result = buyMany(save, 'item_potion', 3); // 30G 必要なのに10Gしかない
    expect(result).toBe(save);
  });

  // --- #31 equipableClassNames テスト ---
  test('equipableClassNames: sword 装備は戦士を含み魔導士を含まない', () => {
    const names = equipableClassNames('equip_short_sword');
    expect(names).toContain('戦士');
    expect(names).not.toContain('魔導士');
  });

  test('equipableClassNames: accessory は全職業を返す', () => {
    // equip_amulet は tier0 の装飾品 (slot === 'accessory')
    const names = equipableClassNames('equip_amulet');
    // 全職業分の名前が返ること（戦士・魔導士など代表を確認）
    expect(names).toContain('戦士');
    expect(names).toContain('魔導士');
    expect(names.length).toBeGreaterThan(0);
  });

  test('消費アイテム・素材を売ると所持金が増え倉庫から減る（#16 回帰）', () => {
    let save = richSave(0);
    save = {
      ...save,
      guild: {
        ...save.guild,
        storage: [
          { itemId: 'item_potion', qty: 2 },
          { itemId: 'item_slime_jelly', qty: 1 },
        ],
      },
    };
    const afterPotion = sell(save, 'item_potion', 1);
    expect(afterPotion.guild.gold).toBe(sellPriceOf('item_potion'));
    expect(itemCount(afterPotion, 'item_potion')).toBe(1);
    expect(afterPotion).not.toBe(save);
    const afterMat = sell(afterPotion, 'item_slime_jelly', 1);
    expect(afterMat.guild.gold).toBeGreaterThan(afterPotion.guild.gold);
    expect(itemCount(afterMat, 'item_slime_jelly')).toBe(0);
  });
});
