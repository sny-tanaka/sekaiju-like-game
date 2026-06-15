import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import styles from './style.module.scss';

import { FORGE } from '@/data/balance';
import { EQUIPMENT } from '@/data/equipment';
import { equipDisplayName, forgeWithIngot, recycle, type IngotType } from '@/domain/forge';
import { useGameState } from '@/store/gameState';

// 鍛冶屋（[04 §4]）。所有装備（個体）の強化（インゴット消費）とリサイクル。
export const Page = () => {
  const navigate = useNavigate();
  const { save, applyAndPersist } = useGameState();
  const [tab, setTab] = useState<'forge' | 'recycle'>('forge');

  if (!save) {
    return (
      <Navigate
        to="/title"
        replace
      />
    );
  }

  const { copper, silver, gold } = save.forgeInventory.ingots;
  const fragments = save.forgeInventory.fragments.common ?? 0;
  const pool = save.guild.equipment;

  const ingotBtn = (instanceId: string, kind: IngotType, label: string, count: number) => (
    <button
      type="button"
      className={styles.ingot}
      disabled={count <= 0}
      onClick={() => void applyAndPersist((s) => forgeWithIngot(s, instanceId, kind).save)}
    >
      {label}+{FORGE.INGOT_INC[kind]}（{count}）
    </button>
  );

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <h1 className={styles.title}>鍛冶屋</h1>
        <span className={styles.stock}>
          銅{copper}・銀{silver}・金{gold}／断片{fragments}
        </span>
      </header>

      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${tab === 'forge' ? styles.tabActive : ''}`}
          onClick={() => setTab('forge')}
        >
          強化
        </button>
        <button
          type="button"
          className={`${styles.tab} ${tab === 'recycle' ? styles.tabActive : ''}`}
          onClick={() => setTab('recycle')}
        >
          リサイクル
        </button>
      </div>

      <p className={styles.hint}>
        {tab === 'forge'
          ? 'インゴットで装備を強化（最大 +5）。銅+1・銀+3・金+5。'
          : '不要な装備を断片に変換。断片10個で銅インゴット1個になる。'}
      </p>

      <div className={styles.list}>
        {pool.length === 0 ? (
          <p className={styles.empty}>所有している装備がありません。</p>
        ) : (
          pool.map((e) => {
            const eq = EQUIPMENT[e.masterId];
            const maxed = e.forgeLevel >= FORGE.MAX_LEVEL;
            return (
              <div
                key={e.id}
                className={styles.row}
              >
                <div className={styles.info}>
                  <span className={styles.name}>{equipDisplayName(e)}</span>
                  <span className={styles.note}>{eq?.slot}</span>
                </div>
                {tab === 'forge' ? (
                  <div className={styles.actions}>
                    {maxed ? (
                      <span className={styles.maxed}>最大強化</span>
                    ) : (
                      <>
                        {ingotBtn(e.id, 'copper', '銅', copper)}
                        {ingotBtn(e.id, 'silver', '銀', silver)}
                        {ingotBtn(e.id, 'gold', '金', gold)}
                      </>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    className={styles.recycle}
                    onClick={() => void applyAndPersist((s) => recycle(s, e.id).save)}
                  >
                    分解（断片+{FORGE.RECYCLE_FRAGMENTS}）
                  </button>
                )}
              </div>
            );
          })
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
