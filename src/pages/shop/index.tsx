import { useState } from 'react';

import {
  buyRowStats,
  compareRows,
  EMPTY_STATS,
  instanceRowStats,
  SORT_LABEL,
  type RowStats,
  type SortKey,
} from './sort';
import styles from './style.module.scss';

import { ActionButton } from '@/components/common/ActionButton/ActionButton';
import { CoinPopFx } from '@/components/common/effects/CoinPopFx';
import { InkSplatter } from '@/components/common/InkSplatter/InkSplatter';
import { ItemSprite } from '@/components/common/ItemSprite/ItemSprite';
import { ARMOR_TYPE_LABEL, EQUIP_SLOT_LABEL, WEAPON_TYPE_LABEL } from '@/data/equipLabels';
import { EQUIPMENT } from '@/data/equipment';
import { ITEMS } from '@/data/items';
import { equipDisplayName, gradedBaseBonuses } from '@/domain/forge';
import { itemCount } from '@/domain/inventory';
import {
  buyMany,
  equipableClassNames,
  equipSellValue,
  sell,
  sellEquipment,
  sellPriceOf,
  shopCatalog,
  shopEquipGrade,
  type ShopEntry,
} from '@/domain/shop';
import type { EquipInstance, ItemId } from '@/domain/types';
import { useGameState } from '@/store/gameState';
import { Redirect, useNavigation } from '@/store/navigation';

// 確認待ちの売買操作（タップ1回での誤購入/誤売却を防ぐ。確認ダイアログ経由でのみ実行）。
type Pending =
  | {
      kind: 'buy';
      id: string;
      name: string;
      price: number;
      /** 消費アイテムの所持上限（undefined = 上限なし / 装備）。 */
      maxStack?: number;
      /** openPending 時点の現在所持数（maxStack と合わせて購入可能数を算出）。 */
      currentQty: number;
    }
  | { kind: 'sellItem'; itemId: string; grade: number; name: string; price: number; maxQty: number }
  | { kind: 'sellEquip'; id: string; name: string; price: number };

// 装備詳細モーダル用（#31）。
type EquipDetail = {
  masterId: ItemId;
  name: string;
  ownedQty: number;
  price: number;
  /** 買う=購入価格 / 売る=売却額。価格ラベルの出し分けに使う。 */
  mode: 'buy' | 'sell';
  /** 売る個体の周回グレード。未指定時はショップ表示グレードにフォールバック（買う側）。 */
  grade?: number;
};

// 絞り込みカテゴリ（武器/防具/装飾品/アイテム/素材）。
type ShopCat = 'weapon' | 'armor' | 'accessory' | 'item' | 'material';
const CAT_LABEL: Record<ShopCat, string> = {
  weapon: '武器',
  armor: '防具',
  accessory: '装飾品',
  item: 'アイテム',
  material: '素材',
};
const CAT_ORDER: ShopCat[] = ['weapon', 'armor', 'accessory', 'item', 'material'];

/** アイテムのショップ用カテゴリ（消費系=アイテム / 素材・ドロップ=素材）。 */
const itemCategory = (id: string): ShopCat => {
  const c = ITEMS[id]?.category;
  return c === 'material' || c === 'drop' ? 'material' : 'item';
};

// ショップ（[04 §8]）。装備・消費アイテムの売買。カテゴリ絞り込み・並び替え対応。
export const Page = () => {
  const { navigate } = useNavigation();
  const { save, applyAndPersist } = useGameState();
  const [tab, setTab] = useState<'buy' | 'sell'>('buy');
  const [pending, setPending] = useState<Pending | null>(null);
  const [pendingQty, setPendingQty] = useState(1);
  const [filter, setFilter] = useState<ShopCat | 'all'>('all');
  const [sort, setSort] = useState<SortKey>('priceAsc');
  const [equipDetail, setEquipDetail] = useState<EquipDetail | null>(null);
  // 購入確定演出（Phase 2）: damage（墨色）variant の InkSplatter + チェックマーク。
  const [buyConfirmed, setBuyConfirmed] = useState(false);

  if (!save) {
    return <Redirect to={{ name: 'title' }} />;
  }

  const gold = save.guild.gold;

  const nameOf = (id: string, grade = 1) => {
    const base = ITEMS[id]?.name ?? EQUIPMENT[id]?.name ?? id;
    return grade > 1 ? `${base} Lv${grade}` : base;
  };

  // 買う: 解放済みカタログ（装備＝スロット、アイテム＝消費）。qty は所持数。
  type BuyRow = {
    key: string;
    entry: ShopEntry;
    category: ShopCat;
    price: number;
    qty: number;
    /** 消費アイテムの所持上限（undefined = 上限なし / 装備）。 */
    maxStack?: number;
    /** 所持が上限に達しているか（購入ボタン disabled 判定）。 */
    atStockMax: boolean;
    stats: RowStats;
  };
  const buyRows: BuyRow[] = shopCatalog(save).map((e) => {
    const qty =
      e.kind === 'equip'
        ? save.guild.equipment.filter((x) => x.masterId === e.id).length
        : itemCount(save, e.id);
    const maxStack = e.kind === 'item' ? ITEMS[e.id]?.maxStack : undefined;
    const atStockMax = maxStack !== undefined && qty >= maxStack;
    return {
      key: e.id,
      entry: e,
      category:
        e.kind === 'equip' ? ((EQUIPMENT[e.id]?.slot ?? 'item') as ShopCat) : itemCategory(e.id),
      price: e.price,
      qty,
      maxStack,
      atStockMax,
      stats: e.kind === 'equip' ? buyRowStats(e.id, shopEquipGrade(save, e.id)) : EMPTY_STATS,
    };
  });

  // 売る: 所有装備（個体）＋売却可能な所持品（素材/アイテム）。
  type SellRow =
    | {
        key: string;
        kind: 'equip';
        locked?: false;
        inst: EquipInstance;
        name: string;
        price: number;
        category: ShopCat;
        qty: number;
        stats: RowStats;
      }
    | {
        key: string;
        kind: 'equip';
        locked: true;
        ownerName: string;
        inst: EquipInstance;
        name: string;
        price: number;
        category: ShopCat;
        qty: number;
        stats: RowStats;
      }
    | {
        key: string;
        kind: 'item';
        itemId: string;
        grade: number;
        name: string;
        price: number;
        category: ShopCat;
        qty: number;
        stats: RowStats;
      };

  // 装備中の個体 id → 装備者名 のマップ。
  const equipOwnerMap = new Map<string, string>();
  for (const m of save.guild.members) {
    for (const slot of ['weapon', 'armor', 'accessory'] as const) {
      const eq = m.equipment[slot];
      if (eq) equipOwnerMap.set(eq.id, m.name);
    }
  }

  const allEquipRows: SellRow[] = save.guild.equipment.map((e): SellRow => {
    const ownerName = equipOwnerMap.get(e.id);
    if (ownerName) {
      return {
        key: `eq_${e.id}`,
        kind: 'equip',
        locked: true,
        ownerName,
        inst: e,
        name: equipDisplayName(e),
        price: equipSellValue(e),
        category: (EQUIPMENT[e.masterId]?.slot ?? 'item') as ShopCat,
        qty: 1,
        stats: instanceRowStats(e),
      };
    }
    return {
      key: `eq_${e.id}`,
      kind: 'equip',
      inst: e,
      name: equipDisplayName(e),
      price: equipSellValue(e),
      category: (EQUIPMENT[e.masterId]?.slot ?? 'item') as ShopCat,
      qty: 1,
      stats: instanceRowStats(e),
    };
  });

  const sellRows: SellRow[] = [
    ...allEquipRows.filter((r) => !(r.kind === 'equip' && r.locked)),
    ...save.guild.storage
      .filter((s) => sellPriceOf(s.itemId, s.grade ?? 1) > 0)
      .map(
        (s): SellRow => ({
          key: `it_${s.itemId}_${s.grade ?? 1}`,
          kind: 'item',
          itemId: s.itemId,
          grade: s.grade ?? 1,
          name: nameOf(s.itemId, s.grade ?? 1),
          price: sellPriceOf(s.itemId, s.grade ?? 1),
          category: itemCategory(s.itemId),
          qty: s.qty,
          stats: EMPTY_STATS,
        })
      ),
    // ロック行（装備中個体）は常に末尾に配置。
    ...allEquipRows.filter(
      (r): r is Extract<SellRow, { kind: 'equip'; locked: true }> =>
        r.kind === 'equip' && r.locked === true
    ),
  ];

  // 現タブで存在するカテゴリだけチップに出す。
  const activeRows: { category: ShopCat }[] = tab === 'buy' ? buyRows : sellRows;
  const presentCats = CAT_ORDER.filter((c) => activeRows.some((r) => r.category === c));
  // 切替で消えたカテゴリを選んでいたら全件表示に倒す。
  const effFilter = filter !== 'all' && !presentCats.includes(filter) ? 'all' : filter;

  function view<T extends { category: ShopCat; price: number; qty: number; stats: RowStats }>(
    rows: T[]
  ): T[] {
    const filtered = effFilter === 'all' ? rows : rows.filter((r) => r.category === effFilter);
    // ロック行（装備中個体）があれば常に末尾に固定し、ソート対象から外す。
    const isLocked = (r: T) => 'locked' in r && (r as { locked?: boolean }).locked === true;
    const lockedRows = filtered.filter(isLocked);
    const normalRows = filtered.filter((r) => !isLocked(r));
    const sorted = [...normalRows].sort((a, b) => compareRows(sort, a, b));
    return [...sorted, ...lockedRows];
  }

  const switchTab = (t: 'buy' | 'sell') => {
    setTab(t);
    setFilter('all');
  };

  // pending を開くときに qty を 1 にリセット。
  const openPending = (p: Pending) => {
    setPending(p);
    setPendingQty(1);
  };

  // 確認ダイアログで「はい」を押したときだけ実際に売買を確定する。
  const confirmPending = () => {
    if (!pending) return;
    // coin SE は CoinPopFx visible=true 時に発火するため削除
    if (pending.kind === 'buy') {
      void applyAndPersist((s) => buyMany(s, pending.id, pendingQty));
      // 購入確定演出（Phase 2）: damage（墨インク）InkSplatter
      setBuyConfirmed(true);
    } else if (pending.kind === 'sellItem') {
      void applyAndPersist((s) => sell(s, pending.itemId, pendingQty, pending.grade));
    } else {
      void applyAndPersist((s) => sellEquipment(s, pending.id));
    }
    setPending(null);
  };

  const buyView = view(buyRows);
  const sellView = view(sellRows);

  // 数量ステッパーの上限（buy: floor(gold/price) かつ maxStack 空き、sellItem: 所持 qty）。
  const pendingMax = (() => {
    if (!pending || pending.kind === 'sellEquip') return 1;
    if (pending.kind === 'buy') {
      const affordableMax = Math.max(1, Math.floor(gold / pending.price));
      // maxStack がある消費アイテムは「上限 - 現在所持数」も考慮する
      const stockRoom =
        pending.maxStack !== undefined
          ? Math.max(0, pending.maxStack - pending.currentQty)
          : affordableMax;
      return Math.min(affordableMax, stockRoom) || 1;
    }
    return pending.maxQty;
  })();

  // 装備詳細モーダル用情報の組み立て（#31）。
  const renderEquipDetail = () => {
    if (!equipDetail) return null;
    const eq = EQUIPMENT[equipDetail.masterId];
    if (!eq) return null;
    const grade = equipDetail.grade ?? shopEquipGrade(save, equipDetail.masterId);
    const bonuses = gradedBaseBonuses(equipDetail.masterId, grade);
    const slotLabel = EQUIP_SLOT_LABEL[eq.slot];
    const classNames = equipableClassNames(equipDetail.masterId);

    const bonusParts: string[] = [];
    if (bonuses.atk) bonusParts.push(`ATK+${bonuses.atk}`);
    if (bonuses.mat) bonusParts.push(`MAT+${bonuses.mat}`);
    if (bonuses.def) bonusParts.push(`DEF+${bonuses.def}`);
    if (bonuses.mdf) bonusParts.push(`MDF+${bonuses.mdf}`);
    if (bonuses.statMods) {
      const statLabelMap: Record<string, string> = {
        hp: 'HP',
        tp: 'TP',
        str: 'STR',
        vit: 'VIT',
        agi: 'AGI',
        int: 'INT',
        mnd: 'MND',
        luc: 'LUC',
      };
      for (const [k, v] of Object.entries(bonuses.statMods)) {
        if (v) bonusParts.push(`${statLabelMap[k] ?? k}${v >= 0 ? '+' : ''}${v}`);
      }
    }

    return (
      <div
        className={styles.confirmOverlay}
        onClick={() => setEquipDetail(null)}
      >
        <div
          className={styles.confirmBox}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.detailHeader}>
            <span className={styles.detailName}>{equipDetail.name}</span>
            <span className={styles.detailSlot}>{slotLabel}</span>
          </div>
          {eq.slot === 'weapon' && eq.weaponType && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>武器種</span>
              <span>{WEAPON_TYPE_LABEL[eq.weaponType]}</span>
            </div>
          )}
          {eq.slot === 'armor' && eq.armorType && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>防具種</span>
              <span>{ARMOR_TYPE_LABEL[eq.armorType]}</span>
            </div>
          )}
          {bonusParts.length > 0 && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>性能</span>
              <span>{bonusParts.join(' / ')}</span>
            </div>
          )}
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>装備可能</span>
            <span>{eq.slot === 'accessory' ? '全職業' : classNames.join('・')}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>
              {equipDetail.mode === 'buy' ? '購入価格' : '売却額'}
            </span>
            <span>{equipDetail.price} G</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>所持数</span>
            <span>{equipDetail.ownedQty}</span>
          </div>
          <div className={styles.confirmActions}>
            <ActionButton
              label="閉じる"
              sfx="cancel"
              className={styles.confirmCancel}
              onClick={() => setEquipDetail(null)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <h1 className={styles.title}>ショップ</h1>
        <span className={styles.gold}>{gold} G</span>
      </header>

      <div className={styles.tabs}>
        <ActionButton
          label="買う"
          sfx="cursor"
          className={tab === 'buy' ? styles.activeTab : ''}
          onClick={() => switchTab('buy')}
        />
        <ActionButton
          label="売る"
          sfx="cursor"
          className={tab === 'sell' ? styles.activeTab : ''}
          onClick={() => switchTab('sell')}
        />
      </div>

      {/* カテゴリ絞り込み＋並び替え */}
      <div className={styles.controls}>
        <div className={styles.filters}>
          <ActionButton
            label="すべて"
            sfx="cursor"
            className={`${styles.chip} ${effFilter === 'all' ? styles.activeTab : ''}`}
            onClick={() => setFilter('all')}
          />
          {presentCats.map((c) => (
            <ActionButton
              key={c}
              label={CAT_LABEL[c]}
              sfx="cursor"
              className={`${styles.chip} ${effFilter === c ? styles.activeTab : ''}`}
              onClick={() => setFilter(c)}
            />
          ))}
        </div>
        <label className={styles.sortRow}>
          <select
            className={styles.sort}
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
          >
            {(Object.keys(SORT_LABEL) as SortKey[]).map((k) => (
              <option
                key={k}
                value={k}
              >
                {SORT_LABEL[k]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.list}>
        {tab === 'buy' ? (
          buyView.length === 0 ? (
            <p className={styles.empty}>該当する商品がありません。</p>
          ) : (
            buyView.map(({ entry: e, qty, maxStack, atStockMax }) => (
              <div
                key={e.id}
                className={styles.row}
              >
                <ItemSprite
                  itemId={e.id as ItemId}
                  size="sm"
                />
                <div className={styles.info}>
                  {e.kind === 'equip' ? (
                    <ActionButton
                      label={e.name}
                      sfx="cursor"
                      className={styles.nameBtn}
                      onClick={() =>
                        setEquipDetail({
                          masterId: e.id as ItemId,
                          name: e.name,
                          ownedQty: qty,
                          price: e.price,
                          mode: 'buy',
                        })
                      }
                    />
                  ) : (
                    <span className={styles.name}>{e.name}</span>
                  )}
                  <span className={styles.note}>
                    {e.note ? `${e.note} ・ ` : ''}
                    {/* 上限あり消費アイテムは n/N 表記、それ以外は数のみ */}
                    {maxStack !== undefined ? `所持 ${qty}/${maxStack}` : `所持 ${qty}`}
                    {atStockMax && <span className={styles.stockMaxLabel}> 所持上限</span>}
                  </span>
                </div>
                {atStockMax ? (
                  <span className={styles.stockMaxBadge}>所持上限です</span>
                ) : (
                  <ActionButton
                    label={`${e.price} G`}
                    className={styles.action}
                    disabled={gold < e.price}
                    onClick={() =>
                      openPending({
                        kind: 'buy',
                        id: e.id,
                        name: e.name,
                        price: e.price,
                        maxStack,
                        currentQty: qty,
                      })
                    }
                  />
                )}
              </div>
            ))
          )
        ) : sellView.length === 0 ? (
          <p className={styles.empty}>売れる物がありません。</p>
        ) : (
          sellView.map((r) => {
            // 装備中ロック行（売却不可）
            if (r.kind === 'equip' && r.locked) {
              return (
                <div
                  key={r.key}
                  className={styles.rowLocked}
                >
                  <ItemSprite
                    itemId={r.inst.masterId as ItemId}
                    size="sm"
                  />
                  <div className={styles.info}>
                    <span className={styles.noteName}>{r.name}</span>
                    <span className={styles.noteLocked}>装備中（{r.ownerName}）・ 売却不可</span>
                  </div>
                  <span className={styles.lockIcon}>🔒</span>
                </div>
              );
            }
            // 通常の売却行
            return (
              <div
                key={r.key}
                className={styles.row}
              >
                <ItemSprite
                  itemId={(r.kind === 'equip' ? r.inst.masterId : r.itemId) as ItemId}
                  size="sm"
                />
                <div className={styles.info}>
                  {r.kind === 'equip' ? (
                    <ActionButton
                      label={r.name}
                      sfx="cursor"
                      className={styles.nameBtn}
                      onClick={() =>
                        setEquipDetail({
                          masterId: r.inst.masterId as ItemId,
                          name: r.name,
                          ownedQty: 1,
                          price: r.price,
                          mode: 'sell',
                          grade: r.inst.grade ?? 1,
                        })
                      }
                    />
                  ) : (
                    <span className={styles.name}>{r.name}</span>
                  )}
                  <span className={styles.note}>
                    {CAT_LABEL[r.category]}
                    {r.kind === 'item' ? ` ・ 所持 ${r.qty}` : ''}
                  </span>
                </div>
                <ActionButton
                  label={`売却 ${r.price} G`}
                  className={styles.action}
                  onClick={() =>
                    openPending(
                      r.kind === 'equip'
                        ? { kind: 'sellEquip', id: r.inst.id, name: r.name, price: r.price }
                        : {
                            kind: 'sellItem',
                            itemId: r.itemId,
                            grade: r.grade,
                            name: r.name,
                            price: r.price,
                            maxQty: r.qty,
                          }
                    )
                  }
                />
              </div>
            );
          })
        )}
      </div>

      <footer className={styles.foot}>
        <ActionButton
          label="拠点へ戻る"
          className={styles.back}
          onClick={() => navigate({ name: 'town' })}
        />
      </footer>

      {/* 売買の確認ダイアログ（誤タップ防止）。 */}
      {pending ? (
        <div
          className={styles.confirmOverlay}
          onClick={() => setPending(null)}
        >
          <div
            className={styles.confirmBox}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.confirmText}>
              {pending.kind === 'buy' ? (
                <>
                  <strong>{pending.name}</strong> を購入しますか？
                </>
              ) : pending.kind === 'sellEquip' ? (
                <>
                  <strong>{pending.name}</strong> を {pending.price} G で売却しますか？
                </>
              ) : (
                <>
                  <strong>{pending.name}</strong> を売却しますか？
                </>
              )}
            </div>
            {/* coinPop 演出（buy 時のみ）— 5c */}
            <CoinPopFx visible={pending.kind === 'buy'} />
            {/* 数量ステッパー（sellEquip は数量1固定なので非表示）。 */}
            {pending.kind !== 'sellEquip' && (
              <div className={styles.stepperRow}>
                <ActionButton
                  label="−"
                  sfx="cursor"
                  className={styles.stepperBtn}
                  disabled={pendingQty <= 1}
                  onClick={() => setPendingQty((q) => Math.max(1, q - 1))}
                />
                <span className={styles.stepperVal}>{pendingQty}</span>
                <ActionButton
                  label="＋"
                  sfx="cursor"
                  className={styles.stepperBtn}
                  disabled={pendingQty >= pendingMax}
                  onClick={() => setPendingQty((q) => Math.min(pendingMax, q + 1))}
                />
                <ActionButton
                  label="+10"
                  sfx="cursor"
                  className={styles.stepperBtn}
                  disabled={pendingQty >= pendingMax}
                  onClick={() => setPendingQty((q) => Math.min(pendingMax, q + 10))}
                />
                <ActionButton
                  label="最大"
                  sfx="cursor"
                  className={styles.stepperMax}
                  disabled={pendingQty >= pendingMax}
                  onClick={() => setPendingQty(pendingMax)}
                />
              </div>
            )}
            {/* 合計金額（sellEquip 以外）。 */}
            {pending.kind !== 'sellEquip' && (
              <div className={styles.totalRow}>
                合計: <strong>{pending.price * pendingQty} G</strong>
              </div>
            )}
            <div className={styles.confirmActions}>
              <ActionButton
                label="やめる"
                sfx="cancel"
                className={styles.confirmCancel}
                onClick={() => setPending(null)}
              />
              <ActionButton
                label={pending.kind === 'buy' ? '購入する' : '売却する'}
                className={styles.confirmOk}
                onClick={confirmPending}
              />
            </div>
          </div>
        </div>
      ) : null}

      {/* 装備詳細モーダル（#31）。 */}
      {equipDetail ? renderEquipDetail() : null}

      {/* 購入確定 InkSplatter（Phase 2）: 墨色インク跡 + チェックマーク */}
      {buyConfirmed ? (
        <div
          className={styles.buyConfirmedFx}
          aria-hidden="true"
        >
          <InkSplatter
            value="✓"
            variant="damage"
            size={72}
            onDone={() => setBuyConfirmed(false)}
          />
        </div>
      ) : null}
    </div>
  );
};
