import { useState } from 'react';

import styles from './style.module.scss';

import { useSfx } from '@/audio/useSfx';
import { InkSplatter } from '@/components/common/InkSplatter/InkSplatter';
import { ItemSprite } from '@/components/common/ItemSprite/ItemSprite';
import { FORGE } from '@/data/balance';
import { EQUIPMENT } from '@/data/equipment';
import {
  equipDisplayName,
  forgeWithIngot,
  recycle,
  recycleFragments,
  recycleMany,
  type IngotType,
} from '@/domain/forge';
import { useGameState } from '@/store/gameState';
import { Redirect, useNavigation } from '@/store/navigation';

// 確認待ちの操作（タップ1回での誤強化/誤分解を防ぐ。確認ダイアログ経由でのみ実行）。
type Pending =
  | { kind: 'forge'; instanceId: string; ingot: IngotType; name: string; ingotLabel: string }
  | { kind: 'recycle'; id: string; name: string }
  | { kind: 'recycleBulk'; ids: string[]; totalFragments: number };

// 鍛冶屋（[04 §4]）。所有装備（個体）の強化（インゴット消費）とリサイクル。
export const Page = () => {
  const { navigate } = useNavigation();
  const { save, applyAndPersist } = useGameState();
  const play = useSfx();
  const [tab, setTab] = useState<'forge' | 'recycle'>('forge');
  const [pending, setPending] = useState<Pending | null>(null);
  // リサイクル一括選択（タブ切替で破棄）。
  const [selected, setSelected] = useState<Set<string>>(new Set());
  // 強化成功演出（Phase 2）: 確定後に gold InkSplatter を一時表示。
  const [forgeSuccessLabel, setForgeSuccessLabel] = useState<string | null>(null);

  if (!save) {
    return <Redirect to={{ name: 'title' }} />;
  }

  const { copper, silver, gold } = save.forgeInventory.ingots;
  const fragments = save.forgeInventory.fragments.common ?? 0;
  const pool = save.guild.equipment;

  const toggleSelect = (id: string) => {
    play('cursor');
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearSelection = () => setSelected(new Set());

  const switchTab = (t: 'forge' | 'recycle') => {
    play('cursor');
    setTab(t);
    clearSelection();
  };

  // 確認ダイアログで「はい」を押したときだけ実際に強化/分解を確定する。
  const confirmPending = () => {
    if (!pending) return;
    play(pending.kind === 'forge' ? 'forge' : 'recycle');
    if (pending.kind === 'forge') {
      void applyAndPersist((s) => forgeWithIngot(s, pending.instanceId, pending.ingot).save);
      // 強化成功演出（Phase 2）: gold InkSplatter で「+N」を表示
      const inc = FORGE.INGOT_INC[pending.ingot];
      setForgeSuccessLabel(`+${inc}`);
    } else if (pending.kind === 'recycle') {
      void applyAndPersist((s) => recycle(s, pending.id).save);
    } else {
      void applyAndPersist((s) => recycleMany(s, pending.ids).save);
      clearSelection();
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
          onClick={() => switchTab('forge')}
        >
          強化
        </button>
        <button
          type="button"
          className={`${styles.tab} ${tab === 'recycle' ? styles.tabActive : ''}`}
          onClick={() => switchTab('recycle')}
        >
          リサイクル
        </button>
      </div>

      <p className={styles.hint}>
        {tab === 'forge'
          ? 'インゴットで装備を強化（最大 +5）。銅+1・銀+3・金+5。'
          : '不要な装備を断片に変換。断片10個で銅インゴット1個になる。チェックで複数選択 → 一括分解。'}
      </p>

      <div className={styles.list}>
        {pool.length === 0 ? (
          <p className={styles.empty}>所有している装備がありません。</p>
        ) : (
          pool.map((e) => {
            const eq = EQUIPMENT[e.masterId];
            const maxed = e.forgeLevel >= FORGE.MAX_LEVEL;
            const isSelected = selected.has(e.id);
            return (
              <div
                key={e.id}
                className={`${styles.row} ${tab === 'recycle' && isSelected ? styles.rowSelected : ''}`}
              >
                <div className={styles.rowHead}>
                  {tab === 'recycle' && (
                    <input
                      type="checkbox"
                      className={styles.check}
                      checked={isSelected}
                      onChange={() => toggleSelect(e.id)}
                      aria-label={`${equipDisplayName(e)} を選択`}
                    />
                  )}
                  <ItemSprite
                    itemId={e.masterId}
                    size="sm"
                  />
                  <div className={styles.info}>
                    <span className={styles.name}>{equipDisplayName(e)}</span>
                    <span className={styles.note}>{eq?.slot}</span>
                  </div>
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

      {/* リサイクル: 選択中の一括分解バー */}
      {tab === 'recycle' && selected.size > 0 && (
        <div className={styles.bulkBar}>
          <span className={styles.bulkInfo}>
            {selected.size} 件選択 ・ 断片+
            {pool
              .filter((e) => selected.has(e.id))
              .reduce((s, e) => s + recycleFragments(e.masterId), 0)}
          </span>
          <button
            type="button"
            className={styles.bulkClear}
            onClick={clearSelection}
          >
            解除
          </button>
          <button
            type="button"
            className={styles.bulkRecycle}
            onClick={() => {
              const ids = pool.filter((e) => selected.has(e.id)).map((e) => e.id);
              const totalFragments = pool
                .filter((e) => selected.has(e.id))
                .reduce((s, e) => s + recycleFragments(e.masterId), 0);
              setPending({ kind: 'recycleBulk', ids, totalFragments });
            }}
          >
            一括分解
          </button>
        </div>
      )}

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.back}
          onClick={() => navigate({ name: 'town' })}
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
              ) : pending.kind === 'recycle' ? (
                <>
                  <strong>{pending.name}</strong> を分解しますか？（装備は失われます）
                </>
              ) : (
                <>
                  選択した <strong>{pending.ids.length} 件</strong> の装備を分解しますか？
                  <br />
                  （断片 +{pending.totalFragments}・装備は失われます）
                </>
              )}
            </div>
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
                className={pending.kind === 'forge' ? styles.confirmOk : styles.confirmOkDanger}
                onClick={confirmPending}
              >
                {pending.kind === 'forge'
                  ? '強化する'
                  : pending.kind === 'recycleBulk'
                    ? '一括分解する'
                    : '分解する'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* 強化成功 gold InkSplatter（Phase 2） */}
      {forgeSuccessLabel ? (
        <div
          className={styles.forgeGold}
          aria-hidden="true"
        >
          <InkSplatter
            value={forgeSuccessLabel}
            variant="gold"
            size={80}
            onDone={() => setForgeSuccessLabel(null)}
          />
        </div>
      ) : null}
    </div>
  );
};
