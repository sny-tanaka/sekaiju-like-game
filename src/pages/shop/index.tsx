import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import styles from './style.module.scss';

import { EQUIPMENT } from '@/data/equipment';
import { ITEMS } from '@/data/items';
import { equipDisplayName } from '@/domain/forge';
import { buy, equipSellValue, sell, sellEquipment, sellPriceOf, shopCatalog } from '@/domain/shop';
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
  // 売却可能な所持品（売値 > 0）と所有装備（個体）
  const sellable = save.guild.storage.filter((s) => sellPriceOf(s.itemId, s.grade ?? 1) > 0);
  const sellableEquip = save.guild.equipment;
  const nothingToSell = sellable.length === 0 && sellableEquip.length === 0;

  const nameOf = (id: string, grade = 1) => {
    const base = ITEMS[id]?.name ?? EQUIPMENT[id]?.name ?? id;
    return grade > 1 ? `${base} Lv${grade}` : base;
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
                onClick={() => void applyAndPersist((s) => buy(s, e.id))}
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
                  onClick={() => void applyAndPersist((sv) => sellEquipment(sv, e.id))}
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
                  onClick={() => void applyAndPersist((sv) => sell(sv, s.itemId, 1, s.grade ?? 1))}
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
    </div>
  );
};
