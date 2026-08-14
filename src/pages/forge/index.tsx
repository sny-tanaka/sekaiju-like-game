import { useState } from 'react';

import styles from './style.module.scss';

import { useSfx } from '@/audio/useSfx';
import { ActionButton } from '@/components/common/ActionButton/ActionButton';
import { ForgeSparkFx } from '@/components/common/effects/ForgeSparkFx';
import { RecycleFx } from '@/components/common/effects/RecycleFx/RecycleFx';
import { InkSplatter } from '@/components/common/InkSplatter/InkSplatter';
import { ItemSprite } from '@/components/common/ItemSprite/ItemSprite';
import { ELEMENT_LABEL } from '@/components/common/ResistBadges/ResistBadges';
import { FORGE } from '@/data/balance';
import { EQUIP_SLOT_LABEL } from '@/data/equipLabels';
import { EQUIPMENT, isPreciousEquip } from '@/data/equipment';
import { deriveHiddenEffects, HIDDEN_EFFECT_UNLOCK_LEVEL } from '@/domain/equipmentHiddenEffects';
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
import type { EquipmentMaster, StatKey } from '@/domain/types';
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

/** ステータス表示名（隠し能力の statMod ラベル用）。 */
const STAT_LABEL: Record<StatKey, string> = {
  hp: 'HP',
  tp: 'TP',
  str: '腕力',
  vit: '体力',
  agi: '敏捷',
  int: '知力',
  mnd: '精神',
  luc: '幸運',
};

/** 隠し能力（deriveHiddenEffects の結果）を表示ラベルへ変換する（[04 §3-4]）。 */
function hiddenAbilityLabels(eq: EquipmentMaster): string[] {
  const labels: string[] = [];
  let hasAilmentResist = false;
  for (const eff of deriveHiddenEffects(eq)) {
    if (eff.kind === 'statMod') {
      labels.push(`${STAT_LABEL[eff.stat]}+${eff.value}`);
    } else if (eff.kind === 'elementResist') {
      labels.push(`${ELEMENT_LABEL[eff.element]}耐性UP`);
    } else if (eff.kind === 'ailmentResist') {
      // アクセサリの ailmentResist は常に全種同時に付くため「状態異常耐性UP」1本にまとめる。
      hasAilmentResist = true;
    }
  }
  if (hasAilmentResist) labels.push('状態異常耐性UP');
  return labels;
}

/**
 * 強化タブの隠し能力表示テキストを組み立てる（[04 §3-4]）。
 * forgeLevel が HIDDEN_EFFECT_UNLOCK_LEVEL 未満は「？？？」の非開放ヒント、
 * 到達済みなら実際のラベルを返す。
 */
function hiddenAbilityText(eq: EquipmentMaster | undefined, forgeLevel: number): string | null {
  if (!eq) return null;
  if (forgeLevel >= HIDDEN_EFFECT_UNLOCK_LEVEL) {
    const labels = hiddenAbilityLabels(eq);
    return labels.length > 0 ? `隠し能力: ${labels.join('・')}` : null;
  }
  // アクセサリは ATK/MAT/DEF/MDF が強化で一切変化しない（forgeBonusFor が常に {} を返す）ため、
  // 「効果なし」に見えてしまう問題を緩和する専用ヒントにする（[04 §3-4]・§0）。
  if (eq.slot === 'accessory') {
    return `？？？（+${HIDDEN_EFFECT_UNLOCK_LEVEL}で状態異常耐性が開放されます）`;
  }
  return `？？？（+${HIDDEN_EFFECT_UNLOCK_LEVEL}で開放）`;
}

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
  // 分解演出: RecycleFx 表示フラグ（分解確定時に true → onDone で false）。
  const [recycleFxVisible, setRecycleFxVisible] = useState(false);

  if (!save) {
    return <Redirect to={{ name: 'title' }} />;
  }

  const { copper, silver, gold } = save.forgeInventory.ingots;
  const fragments = save.forgeInventory.fragments.common ?? 0;
  const pool = save.guild.equipment;
  // v3.0.0 §6: ジェム限定装備・蒐集王の宝冠は再入手不可のため分解対象から除外する（強化は可能）。
  const recyclablePool = pool.filter((e) => !isPreciousEquip(e.masterId));
  const listPool = tab === 'forge' ? pool : recyclablePool;

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
    setTab(t);
    clearSelection();
  };

  // 確認ダイアログで「はい」を押したときだけ実際に強化/分解を確定する。
  const confirmPending = () => {
    if (!pending) return;
    // forge SE は ForgeSparkFx visible=true 時（ダイアログ表示時）に発火するため削除
    // recycle SE は RecycleFx mount 時に発火するため削除
    if (pending.kind === 'forge') {
      void applyAndPersist((s) => forgeWithIngot(s, pending.instanceId, pending.ingot).save);
      // 強化成功演出（Phase 2）: gold InkSplatter で「+N」を表示
      const inc = FORGE.INGOT_INC[pending.ingot];
      setForgeSuccessLabel(`+${inc}`);
    } else if (pending.kind === 'recycle') {
      setRecycleFxVisible(true);
      void applyAndPersist((s) => recycle(s, pending.id).save);
    } else {
      setRecycleFxVisible(true);
      void applyAndPersist((s) => recycleMany(s, pending.ids).save);
      clearSelection();
    }
    setPending(null);
  };

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
        <ActionButton
          label="強化"
          sfx="cursor"
          className={`${styles.tab} ${tab === 'forge' ? styles.tabActive : ''}`}
          onClick={() => switchTab('forge')}
        />
        <ActionButton
          label="リサイクル"
          sfx="cursor"
          className={`${styles.tab} ${tab === 'recycle' ? styles.tabActive : ''}`}
          onClick={() => switchTab('recycle')}
        />
      </div>

      {/* ヒント文 */}
      <p className={styles.hint}>
        {tab === 'forge'
          ? 'インゴットで装備を強化（最大 +5）。銅+1・銀+3・金+5。'
          : '不要な装備を分解して断片を得る。断片 10 でインゴット 1 に変換。'}
      </p>

      {/* リスト本体 */}
      <div className={styles.list}>
        {listPool.length === 0 ? (
          <p className={styles.empty}>
            {tab === 'forge' ? '所有している装備がありません。' : '分解できる装備がありません。'}
          </p>
        ) : (
          <>
            {listPool.map((e, index) => {
              const eq = EQUIPMENT[e.masterId];
              const maxed = e.forgeLevel >= FORGE.MAX_LEVEL;
              const isSelected = selected.has(e.id);
              const isHighlight = index === 0; // 先頭行を強調

              if (tab === 'forge') {
                // 強化タブ: 縦並び 2 段カード
                const baseNameOnly = eq?.name ?? e.masterId;
                const forgeLvText = e.forgeLevel > 0 ? ` +${e.forgeLevel}` : '';

                // 強化後レベル（銅+1 を基準に表示）
                const nextLevel = Math.min(FORGE.MAX_LEVEL, e.forgeLevel + FORGE.INGOT_INC.copper);
                const slotLabel = eq ? EQUIP_SLOT_LABEL[eq.slot] : '';
                // 隠し能力（[04 §3-4]）: forgeLevel>=3 で開放。未開放時は「？？？」ヒントを出す。
                const hiddenLocked = e.forgeLevel < HIDDEN_EFFECT_UNLOCK_LEVEL;
                const hiddenText = hiddenAbilityText(eq, e.forgeLevel);

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
                          ) : (
                            <>
                              {slotLabel} ・ 攻撃強化 +{e.forgeLevel} →{' '}
                              <span className={styles.statNext}>+{nextLevel}</span>
                            </>
                          )}
                        </span>
                        {hiddenText && (
                          <span
                            className={
                              hiddenLocked ? styles.hiddenAbilityLocked : styles.hiddenAbilityOpen
                            }
                          >
                            {hiddenText}
                          </span>
                        )}
                      </div>
                      {maxed && <span className={styles.maxChip}>MAX</span>}
                    </div>
                    {/* 下段: インゴットボタン or MAX チップのみ */}
                    {!maxed && (
                      <div className={styles.ingotRow}>
                        <ActionButton
                          label={`銅+${FORGE.INGOT_INC.copper} (${copper})`}
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
                        />
                        <ActionButton
                          label={`銀+${FORGE.INGOT_INC.silver} (${silver})`}
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
                        />
                        <ActionButton
                          label={`金+${FORGE.INGOT_INC.gold} (${gold})`}
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
                        />
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
                    className={`${styles.recycleRow} ${isSelected ? styles.recycleRowSelected : ''}`}
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
                    <ActionButton
                      label="分解"
                      className={styles.recycleChip}
                      onClick={() =>
                        setPending({
                          kind: 'recycle',
                          id: e.id,
                          name: equipDisplayName(e),
                          masterId: e.masterId,
                        })
                      }
                    />
                  </div>
                );
              }
            })}

            {/* 断片自動変換注記（リサイクルタブ末尾）— v3 */}
            {tab === 'recycle' && (
              <div className={styles.convertHint}>
                <span
                  className={styles.convertIcon}
                  aria-hidden="true"
                >
                  ♺
                </span>
                <span className={styles.convertText}>
                  断片は 10 個ごとに <span className={styles.convertAccent}>銅インゴット 1</span> へ
                  <span className={styles.convertDim}>自動変換</span>されます（変換操作は不要）
                </span>
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
            {recyclablePool
              .filter((e) => selected.has(e.id))
              .reduce((s, e) => s + recycleFragments(e.masterId), 0)}
          </span>
          <ActionButton
            label="解除"
            sfx="cancel"
            className={styles.bulkClear}
            onClick={clearSelection}
          />
          <ActionButton
            label="一括分解"
            className={styles.bulkRecycle}
            onClick={() => {
              const ids = recyclablePool.filter((e) => selected.has(e.id)).map((e) => e.id);
              const totalFragments = recyclablePool
                .filter((e) => selected.has(e.id))
                .reduce((s, e) => s + recycleFragments(e.masterId), 0);
              setPending({ kind: 'recycleBulk', ids, totalFragments });
            }}
          />
        </div>
      )}

      {/* フッタ */}
      <footer className={styles.foot}>
        <ActionButton
          label="拠点へ戻る"
          className={styles.back}
          onClick={() => navigate({ name: 'town' })}
        />
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
                  <ForgeSparkFx
                    visible
                    count={3}
                  />
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
                  <ActionButton
                    label="やめる"
                    sfx="cancel"
                    className={styles.confirmCancel}
                    onClick={() => setPending(null)}
                  />
                  <ActionButton
                    label="強化する"
                    className={styles.confirmOk}
                    onClick={confirmPending}
                  />
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
                  <RecycleFx
                    visible={recycleFxVisible}
                    onDone={() => setRecycleFxVisible(false)}
                  />
                </div>
                <div className={styles.dialogTitle}>{pending.name}</div>
                <div className={styles.dialogText}>
                  この装備を分解しますか？
                  <br />
                  断片 +{recycleFragments(pending.masterId)}（装備は失われます）
                </div>
                <div className={styles.confirmActions}>
                  <ActionButton
                    label="やめる"
                    sfx="cancel"
                    className={styles.confirmCancel}
                    onClick={() => setPending(null)}
                  />
                  <ActionButton
                    label="分解する"
                    className={styles.confirmOkDanger}
                    onClick={confirmPending}
                  />
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
                  <ActionButton
                    label="やめる"
                    sfx="cancel"
                    className={styles.confirmCancel}
                    onClick={() => setPending(null)}
                  />
                  <ActionButton
                    label="一括分解する"
                    className={styles.confirmOkDanger}
                    onClick={confirmPending}
                  />
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
