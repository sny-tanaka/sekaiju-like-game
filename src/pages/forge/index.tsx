import { useState } from 'react';

import styles from './style.module.scss';

import { useSfx } from '@/audio/useSfx';
import { InkSplatter } from '@/components/common/InkSplatter/InkSplatter';
import { ItemSprite } from '@/components/common/ItemSprite/ItemSprite';
import { FORGE } from '@/data/balance';
import { EQUIP_SLOT_LABEL } from '@/data/equipLabels';
import { EQUIPMENT } from '@/data/equipment';
import {
  equipDisplayName,
  forgeBonusFor,
  forgeWithIngot,
  gradedBaseBonuses,
  recycle,
  recycleFragments,
  recycleMany,
  type IngotType,
} from '@/domain/forge';
import { useGameState } from '@/store/gameState';
import { Redirect, useNavigation } from '@/store/navigation';

// 確認待ちの操作（タップ1回での誤強化/誤分解を防ぐ。確認ダイアログ経由でのみ実行）。
type Pending =
  | {
      kind: 'forge';
      instanceId: string;
      ingot: IngotType;
      name: string;
      ingotLabel: string;
      /** 強化前の forgeLevel */
      curLevel: number;
      /** 強化後の forgeLevel */
      nextLevel: number;
      masterId: string;
    }
  | { kind: 'recycle'; id: string; name: string; masterId: string }
  | { kind: 'recycleBulk'; ids: string[]; totalFragments: number };

/** ステ予測文字列を組み立てる（ATK/MAT/DEF/MDF の中で最初に値がある軸を使う）。 */
function buildStatPreview(
  masterId: string,
  curLevel: number,
  nextLevel: number
): { label: string; curVal: number; nextVal: number } | null {
  const base = gradedBaseBonuses(masterId);
  const curBonus = forgeBonusFor(masterId, curLevel);
  const nextBonus = forgeBonusFor(masterId, nextLevel);

  const axes: Array<{ key: keyof typeof curBonus; label: string }> = [
    { key: 'atk', label: 'ATK' },
    { key: 'mat', label: 'MAT' },
    { key: 'def', label: 'DEF' },
    { key: 'mdf', label: 'MDF' },
  ];
  for (const { key, label } of axes) {
    const baseVal = (base[key] as number | undefined) ?? 0;
    const curVal = baseVal + ((curBonus[key] as number | undefined) ?? 0);
    const nextVal = baseVal + ((nextBonus[key] as number | undefined) ?? 0);
    if (baseVal > 0 || curVal > 0) {
      return { label, curVal, nextVal };
    }
  }
  return null;
}

/** インゴット種別の日本語ラベル。 */
const INGOT_LABEL: Record<IngotType, string> = {
  copper: '銅インゴット',
  silver: '銀インゴット',
  gold: '金インゴット',
};

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

  // 断片→銅インゴット変換（断片10個→銅1個。domain に専用関数なし、recycle の繰り上げロジックを流用）
  // ※ domain/forge.ts に convertFragmentsToCopper 関数が無いため disabled で配置。
  const fragmentsEnough = fragments >= FORGE.FRAGMENTS_PER_INGOT;

  return (
    <div className={styles.layout}>
      {/* ヘッダー */}
      <header className={styles.head}>
        <h1 className={styles.title}>鍛冶屋</h1>
        <div className={styles.stockRow}>
          <span className={styles.stockCopper}>銅 {copper}</span>
          <span className={styles.stockSilver}>銀 {silver}</span>
          <span className={styles.stockGold}>金 {gold}</span>
          <span className={styles.stockFrag}>断片 {fragments}</span>
        </div>
      </header>

      {/* flat underline タブバー */}
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

      {/* ヒント文 */}
      <p className={styles.hint}>
        {tab === 'forge'
          ? 'インゴットで装備を強化（最大 +5）。銅+1・銀+3・金+5。'
          : '不要な装備を分解して断片を得る。断片 10 でインゴット 1 に変換。'}
      </p>

      {/* リスト本体 */}
      <div className={styles.list}>
        {pool.length === 0 ? (
          <p className={styles.empty}>所有している装備がありません。</p>
        ) : (
          <>
            {pool.map((e, index) => {
              const eq = EQUIPMENT[e.masterId];
              const maxed = e.forgeLevel >= FORGE.MAX_LEVEL;
              const isSelected = selected.has(e.id);
              const isHighlight = index === 0; // 先頭行を強調

              if (tab === 'forge') {
                // 強化タブ: 縦並び 2 段カード
                const baseNameOnly = eq?.name ?? e.masterId;
                const forgeLvText = e.forgeLevel > 0 ? ` +${e.forgeLevel}` : '';

                // ステ予測: 銅ボタン（+1）でのプレビューを基準に表示
                const nextLevel = Math.min(FORGE.MAX_LEVEL, e.forgeLevel + FORGE.INGOT_INC.copper);
                const statPrev = buildStatPreview(e.masterId, e.forgeLevel, nextLevel);
                const slotLabel = eq ? EQUIP_SLOT_LABEL[eq.slot] : '';

                const rowClass = maxed
                  ? styles.rowMaxed
                  : isHighlight
                    ? styles.rowHighlight
                    : styles.row;

                return (
                  <div
                    key={e.id}
                    className={rowClass}
                  >
                    {/* 上段 */}
                    <div className={styles.rowTop}>
                      <div className={styles.spriteCard}>
                        <ItemSprite
                          itemId={e.masterId}
                          size="sm"
                        />
                      </div>
                      <div className={styles.info}>
                        <span className={styles.name}>
                          {baseNameOnly}
                          {forgeLvText && <span className={styles.forgeLevel}>{forgeLvText}</span>}
                        </span>
                        <span className={styles.statPreview}>
                          {maxed ? (
                            <>{slotLabel} ・ 最大強化</>
                          ) : statPrev ? (
                            <>
                              {slotLabel} ・ {statPrev.label} +{statPrev.curVal} →{' '}
                              <span className={styles.statNext}>+{statPrev.nextVal}</span>
                            </>
                          ) : (
                            slotLabel
                          )}
                        </span>
                      </div>
                      {maxed && <span className={styles.maxChip}>MAX</span>}
                    </div>
                    {/* 下段: インゴットボタン or MAX チップのみ */}
                    {!maxed && (
                      <div className={styles.ingotRow}>
                        <button
                          type="button"
                          className={styles.ingotCopper}
                          disabled={copper <= 0}
                          onClick={() =>
                            setPending({
                              kind: 'forge',
                              instanceId: e.id,
                              ingot: 'copper',
                              name: equipDisplayName(e),
                              ingotLabel: '銅',
                              curLevel: e.forgeLevel,
                              nextLevel: Math.min(
                                FORGE.MAX_LEVEL,
                                e.forgeLevel + FORGE.INGOT_INC.copper
                              ),
                              masterId: e.masterId,
                            })
                          }
                        >
                          銅+{FORGE.INGOT_INC.copper} ({copper})
                        </button>
                        <button
                          type="button"
                          className={styles.ingotSilver}
                          disabled={silver <= 0}
                          onClick={() =>
                            setPending({
                              kind: 'forge',
                              instanceId: e.id,
                              ingot: 'silver',
                              name: equipDisplayName(e),
                              ingotLabel: '銀',
                              curLevel: e.forgeLevel,
                              nextLevel: Math.min(
                                FORGE.MAX_LEVEL,
                                e.forgeLevel + FORGE.INGOT_INC.silver
                              ),
                              masterId: e.masterId,
                            })
                          }
                        >
                          銀+{FORGE.INGOT_INC.silver} ({silver})
                        </button>
                        <button
                          type="button"
                          className={styles.ingotGold}
                          disabled={gold <= 0}
                          onClick={() =>
                            setPending({
                              kind: 'forge',
                              instanceId: e.id,
                              ingot: 'gold',
                              name: equipDisplayName(e),
                              ingotLabel: '金',
                              curLevel: e.forgeLevel,
                              nextLevel: Math.min(
                                FORGE.MAX_LEVEL,
                                e.forgeLevel + FORGE.INGOT_INC.gold
                              ),
                              masterId: e.masterId,
                            })
                          }
                        >
                          金+{FORGE.INGOT_INC.gold} ({gold})
                        </button>
                      </div>
                    )}
                  </div>
                );
              } else {
                // リサイクルタブ: 横並び 1 段
                const fragCount = recycleFragments(e.masterId);
                return (
                  <div
                    key={e.id}
                    className={isSelected ? styles.recycleRowSelected : styles.recycleRow}
                  >
                    <input
                      type="checkbox"
                      className={styles.check}
                      checked={isSelected}
                      onChange={() => toggleSelect(e.id)}
                      aria-label={`${equipDisplayName(e)} を選択`}
                    />
                    <div className={styles.spriteCardSm}>
                      <ItemSprite
                        itemId={e.masterId}
                        size="sm"
                      />
                    </div>
                    <div className={styles.info}>
                      <span className={styles.name}>{equipDisplayName(e)}</span>
                      <span className={styles.statPreview}>
                        分解で <span className={styles.fragCount}>断片 ×{fragCount}</span>
                      </span>
                    </div>
                    <button
                      type="button"
                      className={styles.recycleChip}
                      onClick={() =>
                        setPending({
                          kind: 'recycle',
                          id: e.id,
                          name: equipDisplayName(e),
                          masterId: e.masterId,
                        })
                      }
                    >
                      分解
                    </button>
                  </div>
                );
              }
            })}

            {/* 断片→インゴット変換ヒント（リサイクルタブ末尾） */}
            {tab === 'recycle' && (
              <div className={styles.convertHint}>
                <span className={styles.convertLabel}>断片 → インゴット変換</span>
                {/* domain に convertFragmentsToCopper が無いため disabled で配置 */}
                <button
                  type="button"
                  className={styles.convertBtn}
                  disabled={!fragmentsEnough}
                  title={fragmentsEnough ? '断片10個を銅インゴット1個に変換' : '断片が10個未満です'}
                  onClick={() => {
                    // 将来実装予定: 断片10→銅1の変換
                    // 現状は disabled のため到達しないが、実装後ここでロジックを呼ぶ
                  }}
                >
                  断片10→銅1
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* リサイクル: 選択中の一括分解バー（リストの下・フッタの上） */}
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

      {/* 強化/分解の確認ダイアログ（誤タップ防止）。 */}
      {pending ? (
        <div
          className={styles.confirmOverlay}
          onClick={() => setPending(null)}
        >
          <div
            className={styles.confirmBox}
            onClick={(ev) => ev.stopPropagation()}
          >
            {pending.kind === 'forge' ? (
              <>
                {/* 72x72 ItemSprite + 3 sparkle */}
                <div className={styles.dialogSpriteWrap}>
                  <div className={styles.dialogSprite}>
                    <ItemSprite
                      itemId={pending.masterId}
                      size="md"
                    />
                  </div>
                  <span className={styles.spark1}>✦</span>
                  <span className={styles.spark2}>✦</span>
                  <span className={styles.spark3}>✦</span>
                </div>

                {/* 装備名 */}
                <div className={styles.dialogTitle}>
                  {EQUIPMENT[pending.masterId]?.name ?? pending.name}
                </div>

                {/* +N → +M */}
                <div className={styles.dialogForgeLevel}>
                  +{pending.curLevel} →{' '}
                  <span className={styles.dialogForgeLevelNext}>+{pending.nextLevel}</span>
                </div>

                {/* 補足ボックス: 消費インゴット + ステ変化 */}
                {(() => {
                  const statPrev = buildStatPreview(
                    pending.masterId,
                    pending.curLevel,
                    pending.nextLevel
                  );
                  const remainAfter =
                    pending.ingot === 'copper'
                      ? copper - 1
                      : pending.ingot === 'silver'
                        ? silver - 1
                        : gold - 1;
                  return (
                    <>
                      <div className={styles.dialogCostBox}>
                        消費:{' '}
                        <span className={styles.dialogCostIngot}>
                          {INGOT_LABEL[pending.ingot]} ×1
                        </span>
                        {statPrev && (
                          <>
                            {' '}
                            ・ {statPrev.label} +{statPrev.curVal} →{' '}
                            <span className={styles.dialogCostNext}>+{statPrev.nextVal}</span>
                          </>
                        )}
                      </div>
                      <div className={styles.dialogRemain}>
                        この強化で残り {pending.ingotLabel} {remainAfter}
                      </div>
                    </>
                  );
                })()}

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
                    強化する
                  </button>
                </div>
              </>
            ) : pending.kind === 'recycle' ? (
              <>
                {/* 分解確認 */}
                <div className={styles.dialogSpriteWrap}>
                  <div className={styles.dialogSprite}>
                    <ItemSprite
                      itemId={pending.masterId}
                      size="md"
                    />
                  </div>
                </div>
                <div className={styles.dialogTitle}>{pending.name}</div>
                <div className={styles.dialogText}>
                  この装備を分解しますか？
                  <br />
                  断片 +{recycleFragments(pending.masterId)}（装備は失われます）
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
                    className={styles.confirmOkDanger}
                    onClick={confirmPending}
                  >
                    分解する
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* 一括分解確認 */}
                <div className={styles.dialogTitle}>一括分解</div>
                <div className={styles.dialogText}>
                  選択した <strong>{pending.ids.length} 件</strong> の装備を分解しますか？
                  <br />
                  断片 +{pending.totalFragments}（装備は失われます）
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
                    className={styles.confirmOkDanger}
                    onClick={confirmPending}
                  >
                    一括分解する
                  </button>
                </div>
              </>
            )}
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
