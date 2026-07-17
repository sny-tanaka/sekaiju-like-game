import { itemCount } from '@/domain/inventory';
import { createInitialSaveData } from '@/domain/saveData';
import {
  buy,
  buyMany,
  buyWithGems,
  clampPurchaseQty,
  equipableClassNames,
  exchangeForGems,
  gemEquipCatalog,
  gemExchangeList,
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

  // --- #88 clampPurchaseQty テスト ---
  describe('clampPurchaseQty', () => {
    test('maxStack undefined（上限なし）なら requested をそのまま返す', () => {
      expect(clampPurchaseQty(0, undefined, 99)).toBe(99);
      expect(clampPurchaseQty(50, undefined, 10)).toBe(10);
    });

    test('currentStock が maxStack に達していれば 0 を返す', () => {
      expect(clampPurchaseQty(10, 10, 1)).toBe(0);
      expect(clampPurchaseQty(15, 10, 5)).toBe(0); // 超過済みも 0
    });

    test('currentStock + requested > maxStack のとき空き数まで丸める', () => {
      expect(clampPurchaseQty(7, 10, 5)).toBe(3); // 10 - 7 = 3
      expect(clampPurchaseQty(0, 10, 15)).toBe(10);
    });

    test('currentStock + requested <= maxStack なら requested をそのまま返す', () => {
      expect(clampPurchaseQty(3, 10, 4)).toBe(4); // 3+4=7 <= 10
      expect(clampPurchaseQty(0, 10, 10)).toBe(10);
    });
  });

  // --- #88 buyMany 上限チェック回帰テスト ---
  test('buyMany: maxStack に達しているアイテムは購入できない（save 変わらない）', () => {
    // item_potion の maxStack = 30。30個持っている状態で buyMany → save そのまま返す
    let save = richSave(10000);
    // 倉庫に30個セット
    save = { ...save, guild: { ...save.guild, storage: [{ itemId: 'item_potion', qty: 30 }] } };
    const before = save;
    const result = buyMany(save, 'item_potion', 1);
    expect(result).toBe(before);
    expect(result.guild.gold).toBe(10000);
    expect(itemCount(result, 'item_potion')).toBe(30);
  });

  test('buyMany: maxStack 超え数量を指定しても上限までしか購入されない（代金も上限分だけ）', () => {
    // item_potion の maxStack = 30、現在 25個 → 5個しか買えない
    let save = richSave(10000);
    save = { ...save, guild: { ...save.guild, storage: [{ itemId: 'item_potion', qty: 25 }] } };
    // qty=10 指定でも実際には 5 個だけ
    const result = buyMany(save, 'item_potion', 10);
    expect(itemCount(result, 'item_potion')).toBe(30);
    expect(result.guild.gold).toBe(10000 - 30 * 5); // 30G × 5個 = 150G
  });

  test('buyMany: 上限到達済みアイテムを大量購入しても所持金が余計に減らない（過剰減算バグの回帰）', () => {
    // 上限に達しているとき、gold が不変であることを確認
    let save = richSave(5000);
    save = { ...save, guild: { ...save.guild, storage: [{ itemId: 'item_potion', qty: 30 }] } };
    const result = buyMany(save, 'item_potion', 7);
    // 購入不可なので gold は一切変わらない
    expect(result.guild.gold).toBe(5000);
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

  // --- v3.0.0 §6: ジェム交換所 ---
  describe('v3.0.0 ジェム交換所（exchangeForGems / gemExchangeList / gemEquipCatalog / buyWithGems）', () => {
    test('valuable カテゴリ（換金アイテム・秘宝）はゴールド売却不可', () => {
      let save = richSave(0);
      save = {
        ...save,
        guild: {
          ...save.guild,
          storage: [
            { itemId: 'item_gem_shard', qty: 3 },
            { itemId: 'item_col_slime', qty: 1 },
          ],
        },
      };
      const afterGem = sell(save, 'item_gem_shard', 1);
      expect(afterGem).toBe(save); // 変更なし（no-op）
      const afterCol = sell(save, 'item_col_slime', 1);
      expect(afterCol).toBe(save);
    });

    test('gemExchangeList: 倉庫内の gemValue 付きアイテムを grade 問わず qty 合算して返す', () => {
      let save = createInitialSaveData('g');
      save = {
        ...save,
        guild: {
          ...save.guild,
          storage: [
            { itemId: 'item_gem_shard', qty: 3 },
            { itemId: 'item_gem_shard', qty: 2, grade: 2 },
            { itemId: 'item_gem_stone', qty: 1 },
            { itemId: 'item_potion', qty: 5 }, // gemValue 無し → 対象外
          ],
        },
      };
      const list = gemExchangeList(save);
      expect(list.find((e) => e.itemId === 'item_gem_shard')?.qty).toBe(5);
      expect(list.find((e) => e.itemId === 'item_gem_stone')?.qty).toBe(1);
      expect(list.some((e) => e.itemId === 'item_potion')).toBe(false);
    });

    test('exchangeForGems: 該当アイテムを全数消費し gems += gemValue*qty する', () => {
      let save = createInitialSaveData('g');
      save = {
        ...save,
        guild: {
          ...save.guild,
          storage: [
            { itemId: 'item_gem_shard', qty: 3 },
            { itemId: 'item_gem_shard', qty: 2, grade: 2 },
          ],
        },
      };
      const after = exchangeForGems(save, 'item_gem_shard');
      expect(after.guild.gems).toBe(5); // gemValue(1) * 5個
      expect(itemCount(after, 'item_gem_shard')).toBe(0);
    });

    test('exchangeForGems: 所持していないアイテムは変更しない', () => {
      const save = createInitialSaveData('g');
      expect(exchangeForGems(save, 'item_gem_shard')).toBe(save);
    });

    test('gemEquipCatalog: gemPrice を持つ装備一覧を返す（equip_collector_crown は含まない）', () => {
      const catalog = gemEquipCatalog();
      expect(catalog.some((e) => e.id === 'equip_gem_sword' && e.gemPrice === 120)).toBe(true);
      expect(catalog.some((e) => e.id === 'equip_collector_crown')).toBe(false);
    });

    test('gemEquipCatalog: note に statMods（STR/AGI 等）も含まれる', () => {
      const catalog = gemEquipCatalog();
      const sword = catalog.find((e) => e.id === 'equip_gem_sword')!;
      expect(sword.note).toContain('ATK+93');
      expect(sword.note).toContain('AGI+5');
    });

    test('shopCatalog は gemPrice を持つ装備を除外する（通常カタログに出さない）', () => {
      const save = createInitialSaveData('g');
      const catalog = shopCatalog(save);
      expect(catalog.some((e) => e.id === 'equip_gem_sword')).toBe(false);
      expect(catalog.some((e) => e.id === 'equip_gem_ring')).toBe(false);
    });

    test('buyWithGems: gems が足りれば減算し装備プールに個体が追加される', () => {
      let save = createInitialSaveData('g');
      save = { ...save, guild: { ...save.guild, gems: 200 } };
      const after = buyWithGems(save, 'equip_gem_sword'); // gemPrice 120
      expect(after.guild.gems).toBe(80);
      expect(after.guild.equipment.some((e) => e.masterId === 'equip_gem_sword')).toBe(true);
    });

    test('buyWithGems: gems が不足していれば変更しない', () => {
      let save = createInitialSaveData('g');
      save = { ...save, guild: { ...save.guild, gems: 10 } };
      const after = buyWithGems(save, 'equip_gem_sword'); // gemPrice 120
      expect(after).toBe(save);
    });

    test('buyWithGems: gemPrice の無い装備（通常装備・equip_collector_crown）は購入不可', () => {
      let save = createInitialSaveData('g');
      save = { ...save, guild: { ...save.guild, gems: 99999 } };
      expect(buyWithGems(save, 'equip_short_sword')).toBe(save);
      expect(buyWithGems(save, 'equip_collector_crown')).toBe(save);
    });
  });
});
