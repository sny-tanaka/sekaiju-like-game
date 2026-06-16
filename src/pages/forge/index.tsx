import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import styles from './style.module.scss';

import { FORGE } from '@/data/balance';
import { EQUIPMENT } from '@/data/equipment';
import {
  equipDisplayName,
  forgeWithIngot,
  recycle,
  recycleFragments,
  type IngotType,
} from '@/domain/forge';
import { useGameState } from '@/store/gameState';

// 確認待ちの操作（タップ1回での誤強化/誤分解を防ぐ。確認ダイアログ経由でのみ実行）。
type Pending =
  | { kind: 'forge'; instanceId: string; ingot: IngotType; name: string; ingotLabel: string }
  | { kind: 'recycle'; id: string; name: string };

// 鍛冶屋（[04 §4]）。所有装備（個体）の強化（インゴット消費）とリサイクル。
export const Page = () => {
  const navigate = useNavigate();
  const { save, applyAndPersist } = useGameState();
  const [tab, setTab] = useState<'forge' | 'recycle'>('forge');
  const [pending, setPending] = useState<Pending | null>(null);

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

  // 確認ダイアログで「はい」を押したときだけ実際に強化/分解を確定する。
  const confirmPending = () => {
    if (!pending) return;
    if (pending.kind === 'forge') {
      void applyAndPersist((s) => forgeWithIngot(s, pending.instanceId, pending.ingot).save);
    } else {
      void applyAndPersist((s) => recycle(s, pending.id).save);
    }
    setPending(null);
  };

  const ingotBtn = (
    instanceId: string,
    name: string,
    kind: IngotType,
    label: string,
    count: number
  ) => (
    <button
      type="button"
      className={styles.ingot}
      disabled={count <= 0}
      onClick={() =>
        setPending({ kind: 'forge', instanceId, ingot: kind, name, ingotLabel: label })
      }
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
                        {ingotBtn(e.id, equipDisplayName(e), 'copper', '銅', copper)}
                        {ingotBtn(e.id, equipDisplayName(e), 'silver', '銀', silver)}
                        {ingotBtn(e.id, equipDisplayName(e), 'gold', '金', gold)}
                      </>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    className={styles.recycle}
                    onClick={() =>
                      setPending({ kind: 'recycle', id: e.id, name: equipDisplayName(e) })
                    }
                  >
                    分解（断片+{recycleFragments(e.masterId)}）
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

      {/* 強化/分解の確認ダイアログ（誤タップ防止）。 */}
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
              {pending.kind === 'forge' ? (
                <>
                  <strong>{pending.name}</strong> を{pending.ingotLabel}インゴットで強化しますか？
                </>
              ) : (
                <>
                  <strong>{pending.name}</strong> を分解しますか？（装備は失われます）
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
                {pending.kind === 'forge' ? '強化する' : '分解する'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
