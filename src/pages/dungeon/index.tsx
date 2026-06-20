import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from './style.module.scss';

import { useSfx } from '@/audio/useSfx';
import { CharacterPortrait } from '@/components/common/CharacterPortrait/CharacterPortrait';
import { DungeonMap } from '@/components/common/DungeonMap/DungeonMap';
import { CookPopFx } from '@/components/common/effects/CookPopFx/CookPopFx';
import { ItemPopFx } from '@/components/common/effects/ItemPopFx/ItemPopFx';
import { EncounterGauge } from '@/components/common/EncounterGauge/EncounterGauge';
import { FirstPersonView } from '@/components/common/FirstPersonView/FirstPersonView';
import { ItemSprite } from '@/components/common/ItemSprite/ItemSprite';
import { SkillTree } from '@/components/common/SkillTree/SkillTree';
import { SoundSettings } from '@/components/common/SoundSettings';
import { bandThemeFor } from '@/data/bandTheme';
import { CLASSES } from '@/data/classes';
import { GATHER_TYPES } from '@/data/gather';
import { ITEMS } from '@/data/items';
import { RACES } from '@/data/races';
import { RECIPES } from '@/data/recipes';
import { TITLES } from '@/data/titles';
import { canCook, cook, isAtCookingSpot, unlockedRecipes } from '@/domain/cooking';
import {
  canAscend,
  goDeeper,
  goShallower,
  moveStep,
  returnToTown,
  stairsAt,
  turnTo,
} from '@/domain/dive';
import { gaugeLevel } from '@/domain/encounter';
import { canGather, gatherHere, gatheringPointHere, isGatherDepleted } from '@/domain/gather';
import { foodCount } from '@/domain/inventory';
import { applyFieldItem } from '@/domain/itemUse';
import { pathTo, turnBack, turnLeft, turnRight } from '@/domain/movement';
import { createRng } from '@/domain/rng';
import { availableSP, learnSkill } from '@/domain/skillTree';
import { computeBaseStats } from '@/domain/stats';
import type { Dir, Rng } from '@/domain/types';
import { itemSpriteUrl } from '@/sprites/itemSpriteUrl';
import { useGameState } from '@/store/gameState';
import { Redirect, useNavigation } from '@/store/navigation';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// 探索（ダンジョン）。自動生成1階のグリッド移動＋自動マップ＋エンカウントゲージ。
// 階段で上下移動、帰還で拠点へ。オートセーブは階移動・帰還時（[05 §4]）。
export const Page = () => {
  const { navigate } = useNavigation();
  const { save, applySave, applyAndPersist } = useGameState();
  const play = useSfx();
  // 移動中エンカウント抽選用の ephemeral 乱数（ダイブ内で1本。再開時は作り直し）
  const rngRef = useRef<Rng | null>(null);
  // タップ自動移動中フラグ（多重起動防止）
  const walkingRef = useRef(false);
  // 道具メニューの開閉
  const [itemOpen, setItemOpen] = useState(false);
  // 調理メニューの開閉
  const [cookOpen, setCookOpen] = useState(false);
  // メニュー（ステータス/スキル/所持金）の開閉と選択中キャラ
  const [menuOpen, setMenuOpen] = useState(false);
  // サウンド設定モーダルの開閉
  const [soundOpen, setSoundOpen] = useState(false);
  const [menuCharId, setMenuCharId] = useState<string | null>(null);
  const [skillTab, setSkillTab] = useState<'class' | 'race' | 'title'>('class');
  // 採集/調理の一時メッセージ
  const [notice, setNotice] = useState<string | null>(null);
  // 採集成功 Fx
  const [itemPopFx, setItemPopFx] = useState<{ visible: boolean; iconSrc?: string }>({
    visible: false,
  });
  // 料理成功 Fx
  const [cookPopFx, setCookPopFx] = useState<{ visible: boolean; iconSrc?: string }>({
    visible: false,
  });
  // 消費系操作の確認ダイアログ（タップ1回での誤消費を防ぐ）。
  const [confirm, setConfirm] = useState<{
    message: string;
    okLabel: string;
    onYes: () => void;
  } | null>(null);
  // 階段確認カードの dismiss（位置が変わるまで非表示にする）
  const [dismissedStairsAt, setDismissedStairsAt] = useState<{
    depth: number;
    x: number;
    y: number;
  } | null>(null);

  const dive = save?.diveState ?? null;

  // 位置が変わったら階段 dismiss を解除
  useEffect(() => {
    if (!dive) return;
    if (!dismissedStairsAt) return;
    if (
      dismissedStairsAt.depth !== dive.depth ||
      dismissedStairsAt.x !== dive.pos.x ||
      dismissedStairsAt.y !== dive.pos.y
    ) {
      setDismissedStairsAt(null);
    }
  }, [dive, dismissedStairsAt]);
  const floor = useMemo(
    () => (save && dive ? save.towerState.floors[dive.depth]?.generated : null),
    [save, dive]
  );
  // 生存中の FOE（マップ・擬似3Dに自動表示）。
  const foes = useMemo(
    () =>
      save && dive
        ? (save.towerState.floors[dive.depth]?.foeRuntime ?? [])
            .filter((f) => !f.defeated)
            .map((f) => ({ x: f.cell.x, y: f.cell.y, alerted: f.alerted }))
        : [],
    [save, dive]
  );

  // 現在地の採集ポイント / 調理地点（[04 §5-6]）
  const gatherPoint = useMemo(() => (save ? gatheringPointHere(save) : null), [save]);
  const atCookingSpot = useMemo(() => (save ? isAtCookingSpot(save) : false), [save]);
  const depletedGathers = useMemo(
    () => (save && dive ? (save.towerState.floors[dive.depth]?.depletedGathers ?? []) : []),
    [save, dive]
  );

  const handleGather = useCallback(() => {
    if (!save) return;
    if (!rngRef.current) rngRef.current = createRng((save.masterSeed ^ 0x9e3779b9) >>> 0);
    const res = gatherHere(save, rngRef.current);
    if (!res.ok) {
      setNotice(
        res.reason === 'noSkill'
          ? '対応する採集スキルを持つ仲間がいない'
          : res.reason === 'foodFull'
            ? '食料がいっぱいで採れない'
            : '採集できない'
      );
      return;
    }
    const iconSrc = res.itemId ? (itemSpriteUrl(res.itemId) ?? undefined) : undefined;
    setItemPopFx({ visible: true, iconSrc });
    void applyAndPersist(() => res.save);
    setNotice(`${res.itemId ? (ITEMS[res.itemId]?.name ?? '素材') : '素材'} を手に入れた`);
  }, [save, applyAndPersist]);

  const handleCook = useCallback(
    (recipeId: string) => {
      if (!save) return;
      const res = cook(save, recipeId);
      if (!res.ok) return;
      const resultItemId = RECIPES[recipeId]?.result.itemId;
      const iconSrc = resultItemId ? (itemSpriteUrl(resultItemId) ?? undefined) : undefined;
      setCookPopFx({ visible: true, iconSrc });
      void applyAndPersist(() => res.save);
      setNotice(`${RECIPES[recipeId]?.name ?? '料理'} を作った`);
    },
    [save, applyAndPersist]
  );

  const doMove = useCallback(
    (dir: Dir) => {
      if (!save) return;
      setNotice(null);
      if (!rngRef.current) rngRef.current = createRng((save.masterSeed ^ 0x9e3779b9) >>> 0);
      const result = moveStep(save, dir, rngRef.current);
      // 1歩ごとに永続化する（位置・踏破セル＝オートマップ・エンカウント残歩数を失わない）。
      // 書き込みは非同期で UI はブロックしない。
      void applyAndPersist(() => result.save);
      if (result.triggered) {
        // ダミー戦闘へ（戦闘ロジックは Phase 2）。戻ると探索を継続。
        navigate({ name: 'battle' });
      }
    },
    [save, applyAndPersist, navigate]
  );

  const doTurn = useCallback(
    (dir: Dir) => {
      applySave((s) => turnTo(s, dir));
    },
    [applySave]
  );

  const handleStairs = useCallback(async () => {
    if (!save) return;
    const kind = stairsAt(save);
    if (kind === 'stairsUp') {
      // ボス階はボス撃破まで封鎖（[06 §4]）
      if (!canAscend(save, save.diveState!.depth)) {
        setNotice('強大な力に阻まれている。階層ボスを倒さねば先へ進めない。');
        return;
      }
      play('dive');
      await applyAndPersist((s) => goDeeper(s));
    } else if (kind === 'stairsDown') {
      if (save.diveState!.depth <= 1) {
        play('warp');
        await applyAndPersist((s) => returnToTown(s));
        navigate({ name: 'town' });
      } else {
        play('dive');
        await applyAndPersist((s) => goShallower(s));
      }
    }
  }, [save, applyAndPersist, navigate, play]);

  const handleUseItem = useCallback(
    (itemId: string, charId?: string) => {
      if (!save) return;
      const result = applyFieldItem(save, itemId, charId);
      if (!result.ok) return;
      void applyAndPersist(() => result.save);
      if (!result.save.diveState) {
        // 帰還の糸など → 拠点へ
        setItemOpen(false);
        navigate({ name: 'town' });
      }
    },
    [save, applyAndPersist, navigate]
  );

  // タップしたマスまで自動で歩く（[02 §3]・issue #20）。1歩ずつ解決し、エンカウント時は中断して戦闘へ。
  const autoWalk = useCallback(
    async (path: Dir[]) => {
      if (walkingRef.current || path.length === 0) return;
      walkingRef.current = true;
      setNotice(null);
      try {
        for (const dir of path) {
          if (!rngRef.current) continue;
          let triggered = false;
          let moved = false;
          await applyAndPersist((prev) => {
            if (!prev.diveState) return prev;
            const r = moveStep(prev, dir, rngRef.current!);
            triggered = r.triggered;
            moved = r.moved;
            return r.save;
          });
          if (triggered) {
            navigate({ name: 'battle' });
            return;
          }
          if (!moved) return; // 進めなくなったら中断（経路上に想定外の障害）
          await sleep(110); // 1歩ずつ見えるように
        }
      } finally {
        walkingRef.current = false;
      }
    },
    [applyAndPersist, navigate]
  );

  const handleCellClick = useCallback(
    (x: number, y: number) => {
      if (!dive || !floor || walkingRef.current) return;
      if (!rngRef.current) rngRef.current = createRng((save!.masterSeed ^ 0x9e3779b9) >>> 0);
      // タップ先までの最短経路を求めて自動移動（隣接1マスも経路長1として扱う）。
      const path = pathTo(floor, dive.pos, { x, y });
      if (path && path.length > 0) void autoWalk(path);
    },
    [dive, floor, save, autoWalk]
  );

  if (!save) {
    return <Redirect to={{ name: 'title' }} />;
  }
  if (!dive || !floor) {
    return <Redirect to={{ name: 'town' }} />;
  }

  // ボスゲート警告: canAscend=false のとき（ボス階かつ未撃破）
  const bossGateAhead = !canAscend(save, dive.depth);

  const stairKind = stairsAt(save);
  const showStairsCard =
    !!stairKind &&
    !(
      dismissedStairsAt &&
      dismissedStairsAt.depth === dive.depth &&
      dismissedStairsAt.x === dive.pos.x &&
      dismissedStairsAt.y === dive.pos.y
    );

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <div className={styles.depthWrap}>
          <span className={styles.depthChapterMark}>❦ 探索</span>
          <div className={styles.depth}>
            {dive.depth}F <span className={styles.theme}>{bandThemeFor(dive.depth).name}</span>
          </div>
        </div>
        <EncounterGauge level={gaugeLevel(dive.encounter.stepsUntilEncounter)} />
        <button
          type="button"
          className={styles.menuBtn}
          onClick={() => {
            play('cursor');
            setMenuCharId(null);
            setMenuOpen(true);
          }}
        >
          ☰
        </button>
      </header>

      <div className={styles.fpvWrap}>
        <FirstPersonView
          floor={floor}
          pos={dive.pos}
          dir={dive.dir}
          foes={foes}
          theme={bandThemeFor(dive.depth)}
        />
        {bossGateAhead && (
          <div
            className={styles.bossGateWarn}
            aria-hidden="true"
          >
            ⚠ 奥にボスゲートの気配
          </div>
        )}
        {/* 操作ボタンを一人称視点に重ねる（issue #20）。 */}
        <div className={styles.fpvControls}>
          <button
            type="button"
            className={styles.fpvTurn}
            onClick={() => doTurn(turnLeft(dive.dir))}
            aria-label="左を向く"
          >
            ↰
          </button>
          <button
            type="button"
            className={styles.fpvForward}
            onClick={() => doMove(dive.dir)}
          >
            ▲ 前進
          </button>
          <button
            type="button"
            className={styles.fpvTurn}
            onClick={() => doTurn(turnRight(dive.dir))}
            aria-label="右を向く"
          >
            ↱
          </button>
        </div>
        <button
          type="button"
          className={styles.fpvBack}
          onClick={() => doTurn(turnBack(dive.dir))}
          aria-label="振り向く"
        >
          ↻
        </button>
      </div>

      {/* 中段: マップ + 操作ヒント。上部 (header + fpv) の下、下端の操作ボタン群
          までの間で縦に溢れたぶんはこの内側で吸収する。階段/採集/調理/注意は
          画面下端に固定（.mid 外）で、常に可視に保つ。 */}
      <div className={styles.mid}>
        <div className={styles.mapCard}>
          <div className={styles.mapWrap}>
            <DungeonMap
              floor={floor}
              explored={save.exploredCells[dive.depth] ?? []}
              pos={dive.pos}
              dir={dive.dir}
              foes={foes}
              depletedGathers={depletedGathers}
              onCellClick={handleCellClick}
            />
          </div>
        </div>
        <p className={styles.paletteHint}>マップのマスをタップすると、そこまで自動で移動します。</p>
      </div>

      {showStairsCard && (
        <div className={styles.stairsCard}>
          <div className={styles.stairsCardHeader}>
            <span className={styles.stairsCardTitle}>
              {stairKind === 'stairsUp'
                ? '▲ 上り階段'
                : dive.depth <= 1
                  ? '▼ 下り階段（拠点へ）'
                  : '▼ 下り階段'}
            </span>
            <span className={styles.stairsCardSub}>
              {stairKind === 'stairsUp'
                ? `F${dive.depth} → F${dive.depth + 1}`
                : dive.depth <= 1
                  ? 'F1 → 拠点'
                  : `F${dive.depth} → F${dive.depth - 1}`}
            </span>
          </div>
          <div className={styles.stairsCardActions}>
            <button
              type="button"
              className={styles.stairsCancel}
              onClick={() =>
                setDismissedStairsAt({ depth: dive.depth, x: dive.pos.x, y: dive.pos.y })
              }
            >
              やめる
            </button>
            <button
              type="button"
              className={styles.stairsOk}
              onClick={() => void handleStairs()}
            >
              {stairKind === 'stairsUp'
                ? '次階へ進む'
                : dive.depth <= 1
                  ? '拠点へ戻る'
                  : '前階へ戻る'}
            </button>
          </div>
        </div>
      )}

      {gatherPoint && (
        <button
          type="button"
          className={`${styles.gatherCard} ${isGatherDepleted(save, gatherPoint) || !canGather(save, gatherPoint) ? styles.gatherCardDisabled : ''}`}
          disabled={isGatherDepleted(save, gatherPoint) || !canGather(save, gatherPoint)}
          onClick={handleGather}
        >
          <span className={styles.gatherSparkle}>✦</span>
          <span className={styles.gatherCardLabel}>
            {isGatherDepleted(save, gatherPoint)
              ? `${GATHER_TYPES[gatherPoint.type].name}（採集済み）`
              : !canGather(save, gatherPoint)
                ? `${GATHER_TYPES[gatherPoint.type].name}（スキル要）`
                : `採集 — ${GATHER_TYPES[gatherPoint.type].name}`}
          </span>
        </button>
      )}

      {atCookingSpot && (
        <div
          className={styles.cookCard}
          onClick={() => setCookOpen(true)}
        >
          <span className={styles.cookIcon}>🍲</span>
          <span className={styles.cookCardLabel}>調理 — 料理をする</span>
        </div>
      )}

      {notice && <p className={styles.notice}>{notice}</p>}

      {itemOpen ? (
        <div
          className={styles.itemOverlay}
          onClick={() => setItemOpen(false)}
        >
          <div
            className={styles.itemPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.itemTitle}>どうぐ・食料</div>
            {(() => {
              // 倉庫アイテム＋食材（foodStorage）を合わせてフィールド使用可能なものを表示。
              const usable = [...save.guild.storage, ...(save.guild.foodStorage ?? [])].filter(
                (s) => ITEMS[s.itemId]?.useContext?.includes('field') && s.qty > 0
              );
              if (usable.length === 0) {
                return <p className={styles.itemEmpty}>使える道具がありません。</p>;
              }
              return usable.map((s) => {
                const item = ITEMS[s.itemId];
                const isReturn = s.itemId === 'item_return_thread';
                return (
                  <div
                    key={s.itemId}
                    className={styles.itemRow}
                  >
                    <div className={styles.itemHeader}>
                      <ItemSprite
                        itemId={s.itemId}
                        size="sm"
                      />
                      <div className={styles.itemName}>
                        {item.name} ×{s.qty}
                        <span className={styles.itemDesc}>{item.description}</span>
                      </div>
                    </div>
                    {isReturn ? (
                      <button
                        type="button"
                        className={styles.itemUse}
                        onClick={() =>
                          setConfirm({
                            message: `${item.name} を使いますか？`,
                            okLabel: '使う',
                            onYes: () => handleUseItem(s.itemId),
                          })
                        }
                      >
                        使う
                      </button>
                    ) : (
                      <div className={styles.itemTargets}>
                        {dive.party.map((p) => {
                          const c = save.guild.members.find((m) => m.id === p.charId);
                          if (!c) return null;
                          const max = computeBaseStats(c);
                          const isLowHp = p.hp / max.hp < 0.5;
                          return (
                            <div
                              key={p.charId}
                              className={`${styles.itemTargetRow} ${isLowHp ? styles.itemTargetRowRecommended : ''}`}
                            >
                              <CharacterPortrait
                                raceId={c.raceId}
                                classId={c.classId}
                                size={28}
                              />
                              <div className={styles.itemTargetInfo}>
                                <span className={styles.itemTargetName}>{c.name}</span>
                                <span className={styles.itemHp}>
                                  HP {p.hp}/{max.hp}
                                </span>
                              </div>
                              <button
                                type="button"
                                className={styles.itemTargetUseBtn}
                                onClick={() =>
                                  setConfirm({
                                    message: `${c.name} に ${item.name} を使いますか？`,
                                    okLabel: '使う',
                                    onYes: () => handleUseItem(s.itemId, p.charId),
                                  })
                                }
                              >
                                使う
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              });
            })()}
            <button
              type="button"
              className={styles.itemClose}
              onClick={() => setItemOpen(false)}
            >
              とじる
            </button>
          </div>
        </div>
      ) : null}

      {cookOpen ? (
        <div
          className={styles.itemOverlay}
          onClick={() => setCookOpen(false)}
        >
          <div
            className={styles.itemPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.itemTitle}>調理</div>
            {(() => {
              const recipes = unlockedRecipes(save);
              if (recipes.length === 0) {
                return <p className={styles.itemEmpty}>作れるレシピがありません。</p>;
              }
              return recipes.map((r) => {
                const ok = canCook(save, r.id);
                const ing = r.ingredients
                  .map((i) => `${ITEMS[i.itemId]?.name ?? i.itemId}×${i.qty}`)
                  .join(' ＋ ');
                return (
                  <div
                    key={r.id}
                    className={styles.itemRow}
                  >
                    <div className={styles.itemName}>
                      {r.name}
                      <span className={styles.itemDesc}>
                        {ing} → {ITEMS[r.result.itemId]?.name ?? r.result.itemId}（所持
                        {r.ingredients
                          .map((i) => `${ITEMS[i.itemId]?.name ?? ''}${foodCount(save, i.itemId)}`)
                          .join('・')}
                        ）
                      </span>
                    </div>
                    <button
                      type="button"
                      className={styles.itemUse}
                      disabled={!ok}
                      onClick={() =>
                        setConfirm({
                          message: `${r.name} を作りますか？`,
                          okLabel: '作る',
                          onYes: () => handleCook(r.id),
                        })
                      }
                    >
                      作る
                    </button>
                  </div>
                );
              });
            })()}
            <button
              type="button"
              className={styles.itemClose}
              onClick={() => setCookOpen(false)}
            >
              とじる
            </button>
          </div>
        </div>
      ) : null}

      {menuOpen ? (
        <div
          className={styles.menuOverlay}
          onClick={() => {
            play('cursor');
            setMenuOpen(false);
          }}
        >
          <div
            className={styles.menuPanel}
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const selected = menuCharId
                ? save.guild.members.find((m) => m.id === menuCharId)
                : null;
              if (!selected) {
                // メニュー: パーティ一覧 + 2x2 アクショングリッド
                const threadCount =
                  save.guild.storage.find((s) => s.itemId === 'item_return_thread')?.qty ?? 0;
                return (
                  <>
                    <div className={styles.menuHeader}>
                      <div>
                        <div className={styles.menuTitle}>メニュー</div>
                        <div className={styles.menuSubtitle}>
                          {dive.depth}F ・ {bandThemeFor(dive.depth).name}
                        </div>
                      </div>
                      <button
                        type="button"
                        className={styles.menuCloseBtn}
                        onClick={() => {
                          play('cursor');
                          setMenuOpen(false);
                        }}
                        aria-label="とじる"
                      >
                        ✕
                      </button>
                    </div>
                    <div className={styles.menuPartyLabel}>
                      パーティ <span className={styles.menuPartyHint}>タップで詳細・スキル</span>
                    </div>
                    <div className={styles.menuActions}>
                      <div className={styles.menuGrid}>
                        <button
                          type="button"
                          className={`${styles.menuGridItem} ${styles.menuGridItemActive}`}
                          onClick={() => {
                            play('cursor');
                            setMenuOpen(false);
                            setItemOpen(true);
                          }}
                        >
                          <span className={styles.menuGridIcon}>🎒</span>
                          <span className={styles.menuGridLabel}>道具を使う</span>
                        </button>
                        <button
                          type="button"
                          className={styles.menuGridItem}
                          onClick={() => {
                            play('cursor');
                            setMenuOpen(false);
                            setSoundOpen(true);
                          }}
                        >
                          <span className={styles.menuGridIcon}>⚙</span>
                          <span className={styles.menuGridLabel}>設定</span>
                        </button>
                        <button
                          type="button"
                          className={`${styles.menuGridItem} ${styles.menuGridItemThread} ${styles.menuGridItemFull}`}
                          onClick={() => {
                            if (threadCount === 0) {
                              setNotice('帰還の糸がない');
                              return;
                            }
                            setConfirm({
                              message: '帰還の糸を使いますか？拠点へ即帰還します。',
                              okLabel: '使う',
                              onYes: () => handleUseItem('item_return_thread'),
                            });
                          }}
                        >
                          <span className={styles.menuGridIcon}>🪢</span>
                          <div>
                            <div className={styles.menuGridLabel}>帰還の糸</div>
                            <div className={styles.menuGridSub}>町へ戻る ・ 所持{threadCount}</div>
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className={styles.menuMemberList}>
                      {dive.party.map((p, idx) => {
                        const c = save.guild.members.find((m) => m.id === p.charId);
                        if (!c) return null;
                        const st = computeBaseStats(c);
                        const sp = availableSP(c);
                        return (
                          <button
                            type="button"
                            key={p.charId}
                            className={`${styles.menuMember} ${idx === 0 ? styles.menuMemberLeader : ''}`}
                            onClick={() => {
                              setMenuCharId(p.charId);
                              setSkillTab('class');
                            }}
                          >
                            <CharacterPortrait
                              raceId={c.raceId}
                              classId={c.classId}
                              size={28}
                              className={styles.menuMemberPortrait}
                            />
                            <div className={styles.menuMemberInfo}>
                              <div className={styles.menuMemberNameRow}>
                                <span className={styles.menuMemberName}>{c.name}</span>
                                <span className={styles.menuMemberLv}>Lv{c.level}</span>
                              </div>
                              <div className={styles.menuMemberBars}>
                                <span className={styles.menuBarLabel}>H</span>
                                <div className={styles.menuBar}>
                                  <div
                                    className={styles.menuBarFillHp}
                                    style={{ width: `${Math.round((p.hp / st.hp) * 100)}%` }}
                                  />
                                </div>
                                <span className={styles.menuBarLabel}>T</span>
                                <div className={styles.menuBar}>
                                  <div
                                    className={styles.menuBarFillTp}
                                    style={{ width: `${Math.round((p.tp / st.tp) * 100)}%` }}
                                  />
                                </div>
                                {sp > 0 ? <span className={styles.menuSp}>SP {sp}</span> : null}
                              </div>
                            </div>
                            <span className={styles.menuMemberArrow}>➜</span>
                          </button>
                        );
                      })}
                    </div>
                    <div
                      className={styles.menuAutosave}
                      aria-hidden="true"
                    >
                      <span className={styles.menuAutosaveDot} />
                      {(() => {
                        if (!save.savedAt) return '自動保存済';
                        const time = new Date(save.savedAt).toLocaleTimeString('ja-JP', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        });
                        return `自動保存済 ・ ${time}`;
                      })()}
                    </div>
                    <div className={styles.menuFooter}>
                      <button
                        type="button"
                        className={styles.menuCloseAction}
                        onClick={() => {
                          play('cursor');
                          setMenuOpen(false);
                        }}
                      >
                        とじる（探索へ戻る）
                      </button>
                    </div>
                  </>
                );
              }
              // キャラ詳細: ステータス＋スキル振り
              const st = computeBaseStats(selected);
              const nodes =
                skillTab === 'class'
                  ? (CLASSES[selected.classId]?.skillTree.skills ?? [])
                  : skillTab === 'race'
                    ? (RACES[selected.raceId]?.raceSkillTree.skills ?? [])
                    : selected.titleId
                      ? (TITLES[selected.titleId]?.skillTree.skills ?? [])
                      : [];
              return (
                <>
                  <div className={styles.itemTitle}>
                    {selected.name}（{CLASSES[selected.classId]?.name} Lv{selected.level}）
                    <span className={styles.menuSp}>SP {availableSP(selected)}</span>
                  </div>
                  <div className={styles.menuStats}>
                    {(
                      [
                        ['HP', st.hp],
                        ['TP', st.tp],
                        ['STR', st.str],
                        ['VIT', st.vit],
                        ['AGI', st.agi],
                        ['INT', st.int],
                        ['MND', st.mnd],
                        ['LUC', st.luc],
                      ] as const
                    ).map(([k, v]) => (
                      <span
                        key={k}
                        className={styles.menuStat}
                      >
                        {k} {v}
                      </span>
                    ))}
                  </div>
                  <div className={styles.skillTabs}>
                    {(['class', 'race', 'title'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        className={`${styles.skillTab} ${skillTab === t ? styles.skillTabOn : ''}`}
                        onClick={() => setSkillTab(t)}
                        disabled={t === 'title' && !selected.titleId}
                      >
                        {t === 'class' ? '職業' : t === 'race' ? '種族' : '称号'}
                      </button>
                    ))}
                  </div>
                  <SkillTree
                    nodes={nodes}
                    char={selected}
                    onLearn={(skillId) => {
                      play('create');
                      void applyAndPersist((s) => ({
                        ...s,
                        guild: {
                          ...s.guild,
                          members: s.guild.members.map((m) =>
                            m.id === selected.id ? learnSkill(m, skillId) : m
                          ),
                        },
                      }));
                    }}
                  />
                  <button
                    type="button"
                    className={styles.itemClose}
                    onClick={() => setMenuCharId(null)}
                  >
                    ← もどる
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      ) : null}

      {/* 消費系操作の確認ダイアログ（誤タップ防止）。 */}
      {confirm ? (
        <div
          className={styles.confirmOverlay}
          onClick={() => setConfirm(null)}
        >
          <div
            className={styles.confirmBox}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.confirmText}>{confirm.message}</div>
            <div className={styles.confirmActions}>
              <button
                type="button"
                className={styles.confirmCancel}
                onClick={() => setConfirm(null)}
              >
                やめる
              </button>
              <button
                type="button"
                className={styles.confirmOk}
                onClick={() => {
                  confirm.onYes();
                  setConfirm(null);
                }}
              >
                {confirm.okLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* 採集/料理成功 Fx（SE とセット） */}
      <ItemPopFx
        {...itemPopFx}
        onDone={() => setItemPopFx({ visible: false })}
      />
      <CookPopFx
        {...cookPopFx}
        onDone={() => setCookPopFx({ visible: false })}
      />

      {/* サウンド設定モーダル（☰ メニューの「設定」から開く） */}
      {soundOpen ? (
        <div
          className={styles.modalBackdrop}
          onClick={() => {
            play('cursor');
            setSoundOpen(false);
          }}
        >
          <div
            className={styles.modalPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <span>設定</span>
              <button
                type="button"
                className={styles.modalCloseBtn}
                aria-label="閉じる"
                onClick={() => {
                  play('cursor');
                  setSoundOpen(false);
                }}
              >
                ✕
              </button>
            </div>
            <SoundSettings />
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => {
                play('cursor');
                setSoundOpen(false);
              }}
            >
              とじる
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
