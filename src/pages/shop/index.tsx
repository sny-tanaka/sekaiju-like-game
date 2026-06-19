import { useState } from 'react';

import styles from './style.module.scss';

import { useSfx } from '@/audio/useSfx';
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
  | { kind: 'buy'; id: string; name: string; price: number; note?: string }
  | { kind: 'sellItem'; itemId: string; grade: number; name: string; price: number; maxQty: number }
  | { kind: 'sellEquip'; id: string; masterId: string; name: string; price: number };

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

// 並び替えキー。
type SortKey = 'priceDesc' | 'priceAsc' | 'qtyDesc';
const SORT_LABEL: Record<SortKey, string> = {
  priceDesc: '金額が高い順',
  priceAsc: '金額が安い順',
  qtyDesc: '所持数が多い順',
};

/** アイテムのショップ用カテゴリ（消費系=アイテム / 素材・ドロップ=素材）。 */
const itemCategory = (id: string): ShopCat => {
  const c = ITEMS[id]?.category;
  return c === 'material' || c === 'drop' ? 'material' : 'item';
};

// ショップ（[04 §8]）。装備・消費アイテムの売買。カテゴリ絞り込み・並び替え対応。
export const Page = () => {
  const { navigate } = useNavigation();
  const { save, applyAndPersist } = useGameState();
  const play = useSfx();
  const [tab, setTab] = useState<'buy' | 'sell'>('buy');
  const [pending, setPending] = useState<Pending | null>(null);
  const [pendingQty, setPendingQty] = useState(1);
  const [filter, setFilter] = useState<ShopCat | 'all'>('all');
  const [sort, setSort] = useState<SortKey>('priceDesc');
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
  type BuyRow = { key: string; entry: ShopEntry; category: ShopCat; price: number; qty: number };
  const buyRows: BuyRow[] = shopCatalog(save).map((e) => ({
    key: e.id,
    entry: e,
    category:
      e.kind === 'equip' ? ((EQUIPMENT[e.id]?.slot ?? 'item') as ShopCat) : itemCategory(e.id),
    price: e.price,
    qty:
      e.kind === 'equip'
        ? save.guild.equipment.filter((x) => x.masterId === e.id).length
        : itemCount(save, e.id),
  }));

  // 売る: 所有装備（個体）＋売却可能な所持品（素材/アイテム）。
  type SellRow =
    | {
        key: string;
        kind: 'equip';
        inst: EquipInstance;
        name: string;
        price: number;
        category: ShopCat;
        qty: number;
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
      };
  const sellRows: SellRow[] = [
    ...save.guild.equipment.map(
      (e): SellRow => ({
        key: `eq_${e.id}`,
        kind: 'equip',
        inst: e,
        name: equipDisplayName(e),
        price: equipSellValue(e),
        category: (EQUIPMENT[e.masterId]?.slot ?? 'item') as ShopCat,
        qty: 1,
      })
    ),
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
        })
      ),
  ];

  // 現タブで存在するカテゴリだけチップに出す。
  const activeRows: { category: ShopCat }[] = tab === 'buy' ? buyRows : sellRows;
  const presentCats = CAT_ORDER.filter((c) => activeRows.some((r) => r.category === c));
  // 切替で消えたカテゴリを選んでいたら全件表示に倒す。
  const effFilter = filter !== 'all' && !presentCats.includes(filter) ? 'all' : filter;

  function view<T extends { category: ShopCat; price: number; qty: number }>(rows: T[]): T[] {
    const filtered = effFilter === 'all' ? rows : rows.filter((r) => r.category === effFilter);
    return [...filtered].sort((a, b) =>
      sort === 'priceAsc'
        ? a.price - b.price
        : sort === 'qtyDesc'
          ? b.qty - a.qty
          : b.price - a.price
    );
  }

  const switchTab = (t: 'buy' | 'sell') => {
    play('cursor');
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
    play('coin');
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

  // 数量ステッパーの上限（buy: floor(gold/price)、sellItem: 所持 qty）。
  const pendingMax =
    pending && pending.kind !== 'sellEquip'
      ? pending.kind === 'buy'
        ? Math.max(1, Math.floor(gold / pending.price))
        : pending.maxQty
      : 1;

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
          {/* 装備詳細ヘッダー: ItemSprite + 名前 + スロットタグ */}
          <div className={styles.detailHeader}>
            <div className={styles.detailSprite}>
              <ItemSprite
                itemId={equipDetail.masterId}
                size="sm"
              />
            </div>
            <div className={styles.detailNameBlock}>
              <span className={styles.detailName}>{equipDetail.name}</span>
              <span className={styles.detailSlot}>{slotLabel}</span>
            </div>
          </div>
          {/* 性能グリッド */}
          <div className={styles.detailGrid}>
            {eq.slot === 'weapon' && eq.weaponType && (
              <>
                <span className={styles.detailLabel}>武器種</span>
                <span className={styles.detailValue}>{WEAPON_TYPE_LABEL[eq.weaponType]}</span>
              </>
            )}
            {eq.slot === 'armor' && eq.armorType && (
              <>
                <span className={styles.detailLabel}>防具種</span>
                <span className={styles.detailValue}>{ARMOR_TYPE_LABEL[eq.armorType]}</span>
              </>
            )}
            {bonusParts.length > 0 && (
              <>
                <span className={styles.detailLabel}>性能</span>
                <span className={styles.detailValue}>{bonusParts.join(' / ')}</span>
              </>
            )}
            <span className={styles.detailLabel}>装備可能</span>
            <span className={styles.detailValue}>
              {eq.slot === 'accessory' ? '全職業' : classNames.join('・')}
            </span>
            <span className={styles.detailLabel}>
              {equipDetail.mode === 'buy' ? '購入価格' : '売却額'}
            </span>
            <span className={styles.detailValue}>{equipDetail.price} G</span>
            <span className={styles.detailLabel}>所持数</span>
            <span className={styles.detailValue}>{equipDetail.ownedQty}</span>
          </div>
          <div className={styles.confirmActions}>
            <button
              type="button"
              className={styles.confirmCancel}
              onClick={() => setEquipDetail(null)}
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 買うタブ: 先頭行（最高価格）を強調するかどうか判定。
  const topBuyKey = buyView[0]?.key;

  return (
    <div className={styles.layout}>
      {/* ヘッダー */}
      <header className={styles.head}>
        <h1 className={styles.title}>ショップ</h1>
        <span className={styles.gold}>{gold.toLocaleString()} G</span>
      </header>

      {/* flat underline タブバー */}
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${tab === 'buy' ? styles.tabActive : ''}`}
          onClick={() => switchTab('buy')}
        >
          買う
        </button>
        <button
          type="button"
          className={`${styles.tab} ${tab === 'sell' ? styles.tabActive : ''}`}
          onClick={() => switchTab('sell')}
        >
          売る
        </button>
      </div>

      {/* カテゴリ絞り込み＋並び替え */}
      <div className={styles.controls}>
        <div className={styles.filters}>
          <button
            type="button"
            className={`${styles.chip} ${effFilter === 'all' ? styles.chipActive : ''}`}
            onClick={() => setFilter('all')}
          >
            すべて
          </button>
          {presentCats.map((c) => (
            <button
              key={c}
              type="button"
              className={`${styles.chip} ${effFilter === c ? styles.chipActive : ''}`}
              onClick={() => setFilter(c)}
            >
              {CAT_LABEL[c]}
            </button>
          ))}
        </div>
        <div className={styles.sortRow}>
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
                ⇅ {SORT_LABEL[k]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* リスト本体 */}
      <div className={styles.list}>
        {tab === 'buy' ? (
          buyView.length === 0 ? (
            <p className={styles.empty}>該当する商品がありません。</p>
          ) : (
            buyView.map(({ key, entry: e, qty }) => {
              const isHighlight = sort === 'priceDesc' && key === topBuyKey;
              return (
                <div
                  key={e.id}
                  className={isHighlight ? styles.rowHighlight : styles.row}
                >
                  <div className={styles.spriteCard}>
                    <ItemSprite
                      itemId={e.id as ItemId}
                      size="sm"
                    />
                  </div>
                  <div className={styles.info}>
                    {e.kind === 'equip' ? (
                      <button
                        type="button"
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
                      >
                        {e.name}
                      </button>
                    ) : (
                      <span className={styles.name}>{e.name}</span>
                    )}
                    <span className={styles.note}>
                      {e.note ? `${e.note} ・ ` : ''}所持 {qty}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={isHighlight ? styles.actionHighlight : styles.action}
                    disabled={gold < e.price}
                    onClick={() =>
                      openPending({
                        kind: 'buy',
                        id: e.id,
                        name: e.name,
                        price: e.price,
                        note: e.note,
                      })
                    }
                  >
                    {e.price.toLocaleString()} G
                  </button>
                </div>
              );
            })
          )
        ) : sellView.length === 0 ? (
          <p className={styles.empty}>売れる物がありません。</p>
        ) : (
          sellView.map((r) => {
            if (r.kind === 'equip') {
              // 装備個体行: 強化値を色分け表示
              const baseName = EQUIPMENT[r.inst.masterId]?.name ?? r.name;
              const forgeLvSuffix = r.inst.forgeLevel > 0 ? ` +${r.inst.forgeLevel}` : '';
              return (
                <div
                  key={r.key}
                  className={styles.row}
                >
                  <div className={styles.spriteCardSm}>
                    <ItemSprite
                      itemId={r.inst.masterId as ItemId}
                      size="sm"
                    />
                  </div>
                  <div className={styles.info}>
                    <button
                      type="button"
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
                    >
                      {baseName}
                      {forgeLvSuffix && <span className={styles.forgeLevel}>{forgeLvSuffix}</span>}
                    </button>
                    <span className={styles.note}>
                      {CAT_LABEL[r.category]} ・ 個体 #{r.inst.id.slice(-4)}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={styles.action}
                    onClick={() =>
                      openPending({
                        kind: 'sellEquip',
                        id: r.inst.id,
                        masterId: r.inst.masterId,
                        name: r.name,
                        price: r.price,
                      })
                    }
                  >
                    {r.price.toLocaleString()} G
                  </button>
                </div>
              );
            } else {
              return (
                <div
                  key={r.key}
                  className={styles.row}
                >
                  <div className={styles.spriteCardSm}>
                    <ItemSprite
                      itemId={r.itemId as ItemId}
                      size="sm"
                    />
                  </div>
                  <div className={styles.info}>
                    <span className={styles.name}>{r.name}</span>
                    <span className={styles.note}>
                      {CAT_LABEL[r.category]} ・ 所持 {r.qty}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={styles.action}
                    onClick={() =>
                      openPending({
                        kind: 'sellItem',
                        itemId: r.itemId,
                        grade: r.grade,
                        name: r.name,
                        price: r.price,
                        maxQty: r.qty,
                      })
                    }
                  >
                    {r.price.toLocaleString()} G
                  </button>
                </div>
              );
            }
          })
        )}
      </div>

      {/* フッタ */}
      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.back}
          onClick={() => navigate({ name: 'town' })}
        >
          拠点へ戻る
        </button>
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
            {/* 商品ヘッダー */}
            <div className={styles.dialogHead}>
              <div className={styles.dialogSprite}>
                <ItemSprite
                  itemId={
                    (pending.kind === 'buy'
                      ? pending.id
                      : pending.kind === 'sellEquip'
                        ? pending.masterId
                        : pending.itemId) as ItemId
                  }
                  size="sm"
                />
              </div>
              <div>
                <div className={styles.dialogItemName}>{pending.name}</div>
                {pending.kind === 'buy' && pending.note && (
                  <div className={styles.dialogItemNote}>{pending.note}</div>
                )}
              </div>
            </div>

            {/* 購入ダイアログ: coin pop + ステッパー + 合計 + 購入後所持金 */}
            {pending.kind === 'buy' && (
              <>
                <span className={styles.coinPop}>🪙</span>
                <div className={styles.stepperRow}>
                  <button
                    type="button"
                    className={styles.stepperBtn}
                    disabled={pendingQty <= 1}
                    onClick={() => setPendingQty((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <span className={styles.stepperVal}>×{pendingQty}</span>
                  <button
                    type="button"
                    className={styles.stepperBtn}
                    disabled={pendingQty >= pendingMax}
                    onClick={() => setPendingQty((q) => Math.min(pendingMax, q + 1))}
                  >
                    ＋
                  </button>
                  <button
                    type="button"
                    className={styles.stepperMax}
                    disabled={pendingQty >= pendingMax}
                    onClick={() => setPendingQty(pendingMax)}
                  >
                    最大
                  </button>
                </div>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>合計</span>
                  <span className={styles.totalValue}>
                    {(pending.price * pendingQty).toLocaleString()} G
                  </span>
                </div>
                <div className={styles.postGoldRow}>
                  <span className={styles.postGoldLabel}>購入後の所持金</span>
                  <span className={styles.postGoldValue}>
                    {(gold - pending.price * pendingQty).toLocaleString()} G
                  </span>
                </div>
              </>
            )}

            {/* 売却アイテム: ステッパー + 合計 + 売却後所持金 */}
            {pending.kind === 'sellItem' && (
              <>
                <div className={styles.stepperRow}>
                  <button
                    type="button"
                    className={styles.stepperBtn}
                    disabled={pendingQty <= 1}
                    onClick={() => setPendingQty((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <span className={styles.stepperVal}>×{pendingQty}</span>
                  <button
                    type="button"
                    className={styles.stepperBtn}
                    disabled={pendingQty >= pendingMax}
                    onClick={() => setPendingQty((q) => Math.min(pendingMax, q + 1))}
                  >
                    ＋
                  </button>
                  <button
                    type="button"
                    className={styles.stepperMax}
                    disabled={pendingQty >= pendingMax}
                    onClick={() => setPendingQty(pendingMax)}
                  >
                    最大
                  </button>
                </div>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>売却額</span>
                  <span className={styles.totalValue}>
                    {(pending.price * pendingQty).toLocaleString()} G
                  </span>
                </div>
                <div className={styles.postGoldRow}>
                  <span className={styles.postGoldLabel}>売却後の所持金</span>
                  <span className={styles.postGoldValue}>
                    {(gold + pending.price * pendingQty).toLocaleString()} G
                  </span>
                </div>
              </>
            )}

            {/* 装備売却: 売却額のみ（数量固定） */}
            {pending.kind === 'sellEquip' && (
              <div className={styles.sellPriceRow}>
                <span className={styles.sellPriceLabel}>売却額</span>
                <span className={styles.sellPriceValue}>{pending.price.toLocaleString()} G</span>
              </div>
            )}

            <div className={styles.confirmActions}>
              <button
                type="button"
                className={styles.confirmCancel}
                onClick={() => {
                  play('cancel');
                  setPending(null);
                }}
              >
                やめる
              </button>
              <button
                type="button"
                className={styles.confirmOk}
                onClick={confirmPending}
              >
                {pending.kind === 'buy' ? '購入する' : '売却する'}
              </button>
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
