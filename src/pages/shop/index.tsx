import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import styles from './style.module.scss';

import { EQUIPMENT } from '@/data/equipment';
import { ITEMS } from '@/data/items';
import { buy, sell, sellPriceOf, shopCatalog } from '@/domain/shop';
import { useGameState } from '@/store/gameState';

// ショップ（[04 §8]）。装備・消費アイテムの売買。
export const Page = () => {
  const navigate = useNavigate();
  const { save, applyAndPersist } = useGameState();
  const [tab, setTab] = useState<'buy' | 'sell'>('buy');

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
  // 売却可能な所持品（売値 > 0）
  const sellable = save.guild.storage.filter((s) => sellPriceOf(s.itemId) > 0);

  const nameOf = (id: string) => ITEMS[id]?.name ?? EQUIPMENT[id]?.name ?? id;

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
                onClick={() => void applyAndPersist((s) => buy(s, e.id))}
              >
                {e.price} G
              </button>
            </div>
          ))
        ) : sellable.length === 0 ? (
          <p className={styles.empty}>売れる物がありません。</p>
        ) : (
          sellable.map((s) => (
            <div
              key={s.itemId}
              className={styles.row}
            >
              <div className={styles.info}>
                <span className={styles.name}>{nameOf(s.itemId)}</span>
                <span className={styles.note}>所持 {s.qty}</span>
              </div>
              <button
                type="button"
                className={styles.action}
                onClick={() => void applyAndPersist((sv) => sell(sv, s.itemId, 1))}
              >
                売却 {sellPriceOf(s.itemId)} G
              </button>
            </div>
          ))
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
    </div>
  );
};
