import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import styles from './style.module.scss';

import { EQUIPMENT } from '@/data/equipment';
import { ITEMS } from '@/data/items';
import { equipDisplayName } from '@/domain/forge';
import { buy, equipSellValue, sell, sellEquipment, sellPriceOf, shopCatalog } from '@/domain/shop';
import { useGameState } from '@/store/gameState';

// 確認待ちの売買操作（タップ1回での誤購入/誤売却を防ぐ。確認ダイアログ経由でのみ実行）。
type Pending =
  | { kind: 'buy'; id: string; name: string; price: number }
  | { kind: 'sellItem'; itemId: string; grade: number; name: string; price: number }
  | { kind: 'sellEquip'; id: string; name: string; price: number };

// ショップ（[04 §8]）。装備・消費アイテムの売買。
export const Page = () => {
  const navigate = useNavigate();
  const { save, applyAndPersist } = useGameState();
  const [tab, setTab] = useState<'buy' | 'sell'>('buy');
  const [pending, setPending] = useState<Pending | null>(null);

  if (!save) {
    return (
      <Navigate
        to="/title"
        replace
      />
    );
  }

  const gold = save.guild.gold;
  const catalog = shopCatalog(save);
  // 売却可能な所持品（売値 > 0）と所有装備（個体）
  const sellable = save.guild.storage.filter((s) => sellPriceOf(s.itemId, s.grade ?? 1) > 0);
  const sellableEquip = save.guild.equipment;
  const nothingToSell = sellable.length === 0 && sellableEquip.length === 0;

  const nameOf = (id: string, grade = 1) => {
    const base = ITEMS[id]?.name ?? EQUIPMENT[id]?.name ?? id;
    return grade > 1 ? `${base} Lv${grade}` : base;
  };

  // 確認ダイアログで「はい」を押したときだけ実際に売買を確定する。
  const confirmPending = () => {
    if (!pending) return;
    if (pending.kind === 'buy') {
      void applyAndPersist((s) => buy(s, pending.id));
    } else if (pending.kind === 'sellItem') {
      void applyAndPersist((s) => sell(s, pending.itemId, 1, pending.grade));
    } else {
      void applyAndPersist((s) => sellEquipment(s, pending.id));
    }
    setPending(null);
  };

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <h1 className={styles.title}>ショップ</h1>
        <span className={styles.gold}>{gold} G</span>
      </header>

      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${tab === 'buy' ? styles.tabActive : ''}`}
          onClick={() => setTab('buy')}
        >
          買う
        </button>
        <button
          type="button"
          className={`${styles.tab} ${tab === 'sell' ? styles.tabActive : ''}`}
          onClick={() => setTab('sell')}
        >
          売る
        </button>
      </div>

      <div className={styles.list}>
        {tab === 'buy' ? (
          catalog.map((e) => (
            <div
              key={e.id}
              className={styles.row}
            >
              <div className={styles.info}>
                <span className={styles.name}>{e.name}</span>
                {e.note ? <span className={styles.note}>{e.note}</span> : null}
              </div>
              <button
                type="button"
                className={styles.action}
                disabled={gold < e.price}
                onClick={() => setPending({ kind: 'buy', id: e.id, name: e.name, price: e.price })}
              >
                {e.price} G
              </button>
            </div>
          ))
        ) : nothingToSell ? (
          <p className={styles.empty}>売れる物がありません。</p>
        ) : (
          <>
            {sellableEquip.map((e) => (
              <div
                key={e.id}
                className={styles.row}
              >
                <div className={styles.info}>
                  <span className={styles.name}>{equipDisplayName(e)}</span>
                  <span className={styles.note}>装備</span>
                </div>
                <button
                  type="button"
                  className={styles.action}
                  onClick={() =>
                    setPending({
                      kind: 'sellEquip',
                      id: e.id,
                      name: equipDisplayName(e),
                      price: equipSellValue(e),
                    })
                  }
                >
                  売却 {equipSellValue(e)} G
                </button>
              </div>
            ))}
            {sellable.map((s) => (
              <div
                key={`${s.itemId}_${s.grade ?? 1}`}
                className={styles.row}
              >
                <div className={styles.info}>
                  <span className={styles.name}>{nameOf(s.itemId, s.grade ?? 1)}</span>
                  <span className={styles.note}>所持 {s.qty}</span>
                </div>
                <button
                  type="button"
                  className={styles.action}
                  onClick={() =>
                    setPending({
                      kind: 'sellItem',
                      itemId: s.itemId,
                      grade: s.grade ?? 1,
                      name: nameOf(s.itemId, s.grade ?? 1),
                      price: sellPriceOf(s.itemId, s.grade ?? 1),
                    })
                  }
                >
                  売却 {sellPriceOf(s.itemId, s.grade ?? 1)} G
                </button>
              </div>
            ))}
          </>
        )}
      </div>

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.back}
          onClick={() => navigate('/town')}
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
            <div className={styles.confirmText}>
              {pending.kind === 'buy' ? (
                <>
                  <strong>{pending.name}</strong> を {pending.price} G で購入しますか？
                </>
              ) : (
                <>
                  <strong>{pending.name}</strong> を {pending.price} G で売却しますか？
                </>
              )}
            </div>
            <div className={styles.confirmActions}>
              <button
                type="button"
                className={styles.confirmCancel}
                onClick={() => setPending(null)}
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
    </div>
  );
};
