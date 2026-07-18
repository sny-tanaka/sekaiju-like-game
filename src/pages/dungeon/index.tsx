import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { canWarpReturnFromHere, isReturnThreadDisabled } from './checkpointWarp';
import { isAutoMoveDisabled, nextFlagOnCellTap } from './flag';
import styles from './style.module.scss';

import { useSfx } from '@/audio/useSfx';
import { ActionButton } from '@/components/common/ActionButton/ActionButton';
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
import { activeQuests, formatQuestGoal, formatQuestRewards, reportableCount } from '@/domain/quest';
import { createRng } from '@/domain/rng';
import { availableSP, learnSkill } from '@/domain/skillTree';
import { computeBaseStats } from '@/domain/stats';
import type { Dir, Rng } from '@/domain/types';
import { itemSpriteUrl } from '@/sprites/itemSpriteUrl';
import { useGameState } from '@/store/gameState';
import { Redirect, useNavigation } from '@/store/navigation';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// 対象キャラを選ばず単押しで使うフィールドアイテム（帰還の糸／界層還元香）。
const NO_TARGET_ITEMS = new Set(['item_return_thread', 'item_floor_reset']);

// 探索（ダンジョン）。自動生成1階のグリッド移動＋自動マップ＋エンカウントゲージ。
// 階段で上下移動（下り階段=深く進む方向、上り階段=浅く拠点へ戻る方向）、帰還で拠点へ。オートセーブは階移動・帰還時（[05 §4]）。
export const Page = () => {
  const { navigate } = useNavigation();
  const { save, applySave, applyAndPersist, flag, setFlag } = useGameState();
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
  // 依頼進捗パネル（read-only）の開閉
  const [questsOpen, setQuestsOpen] = useState(false);
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
  // 旗（自動移動の目標地点）は GameState Context が保持する。
  // 戦闘で dungeon が unmount しても消えないが、リロード（Provider 再生成）では消える。

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
      setFlag(null); // 階層移動で旗をクリア
      play('dive');
      await applyAndPersist((s) => goDeeper(s));
    } else if (kind === 'stairsDown') {
      setFlag(null); // 階層移動で旗をクリア
      if (save.diveState!.depth <= 1) {
        play('warp');
        await applyAndPersist((s) => returnToTown(s));
        navigate({ name: 'town' });
      } else {
        play('dive');
        await applyAndPersist((s) => goShallower(s));
      }
    }
  }, [save, applyAndPersist, navigate, play, setFlag]);

  const handleUseItem = useCallback(
    (itemId: string, charId?: string) => {
      if (!save) return;
      const result = applyFieldItem(save, itemId, charId);
      if (!result.ok) return;
      void applyAndPersist(() => result.save);
      if (!result.save.diveState) {
        // 帰還の糸など → 拠点へ。旗もクリア
        setFlag(null);
        setItemOpen(false);
        navigate({ name: 'town' });
      }
    },
    [save, applyAndPersist, navigate, setFlag]
  );

  // 旗の位置まで自動で歩く（issue #80）。1歩ずつ解決し、エンカウント時は中断して戦闘へ。
  const autoWalk = useCallback(
    async (target: { x: number; y: number }) => {
      if (walkingRef.current) return;
      if (!save) return;
      // 戦闘から戻った直後は dungeon が remount されていて rngRef が null。
      // doMove / handleGather / handleCellClick を経ずに自動移動ボタンを直接押した
      // ケースをカバーするため、ここで lazy init する（旗は戦闘を跨いで残る仕様）。
      if (!rngRef.current) rngRef.current = createRng((save.masterSeed ^ 0x9e3779b9) >>> 0);
      walkingRef.current = true;
      setNotice(null);
      try {
        // 経路計算は毎ステップ applyAndPersist コールバック内で行う（最新 save から取得）
        let keepGoing = true;
        while (keepGoing) {
          let triggered = false;
          let moved = false;
          await applyAndPersist((prev) => {
            if (!prev.diveState) {
              keepGoing = false;
              return prev;
            }
            const fl = prev.towerState.floors[prev.diveState.depth]?.generated;
            if (!fl) {
              keepGoing = false;
              return prev;
            }
            const path = pathTo(fl, prev.diveState.pos, target);
            if (!path || path.length === 0) {
              keepGoing = false;
              return prev;
            }
            const dir = path[0];
            if (!rngRef.current) {
              keepGoing = false;
              return prev;
            }
            const r = moveStep(prev, dir, rngRef.current);
            triggered = r.triggered;
            moved = r.moved;
            // 目標に到達（path.length===1 の最後の1歩）後は停止
            if (path.length === 1) keepGoing = false;
            return r.save;
          });
          if (triggered) {
            // 自動移動中にエンカウントしても旗は残す（戦闘終了後に同じ目的地を
            // 引き継げるように。旗は階層移動・拠点帰還でしか消えない仕様）。
            navigate({ name: 'battle' });
            return;
          }
          if (!moved) break; // 進めなくなったら中断
          if (!keepGoing) break;
          await sleep(110); // 1歩ずつ見えるように
        }
        setFlag(null);
      } finally {
        walkingRef.current = false;
      }
    },
    [save, applyAndPersist, navigate, setFlag]
  );

  const handleCellClick = useCallback(
    (x: number, y: number) => {
      if (!dive || !floor || walkingRef.current) return;
      if (!rngRef.current) rngRef.current = createRng((save!.masterSeed ^ 0x9e3779b9) >>> 0);
      // タップしたマスが現在の旗と同じなら旗を解除、異なるなら旗を移す（即移動しない）
      setFlag((prev) => {
        // 現在地へのタップは無視
        if (dive.pos.x === x && dive.pos.y === y) return null;
        // 到達不能なマスも旗設置対象外にする
        const path = pathTo(floor, dive.pos, { x, y });
        if (!path || path.length === 0) return null;
        // 同じマスなら解除、異なるマスなら上書き
        return nextFlagOnCellTap(prev, { x, y });
      });
    },
    [dive, floor, save, setFlag]
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
            地下{dive.depth}階 <span className={styles.theme}>{bandThemeFor(dive.depth).name}</span>
          </div>
        </div>
        <EncounterGauge level={gaugeLevel(dive.encounter.stepsUntilEncounter)} />
        <ActionButton
          ariaLabel="メニューを開く"
          sfx="cursor"
          className={styles.menuBtn}
          onClick={() => {
            setMenuCharId(null);
            setMenuOpen(true);
          }}
        >
          ☰
        </ActionButton>
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
          <ActionButton
            ariaLabel="左を向く"
            sfx={null}
            className={styles.fpvTurn}
            onClick={() => doTurn(turnLeft(dive.dir))}
          >
            ↰
          </ActionButton>
          <ActionButton
            label="▲ 前進"
            sfx={null}
            className={styles.fpvForward}
            onClick={() => doMove(dive.dir)}
          />
          <ActionButton
            ariaLabel="右を向く"
            sfx={null}
            className={styles.fpvTurn}
            onClick={() => doTurn(turnRight(dive.dir))}
          >
            ↱
          </ActionButton>
        </div>
        <ActionButton
          ariaLabel="振り向く"
          sfx={null}
          className={styles.fpvBack}
          onClick={() => doTurn(turnBack(dive.dir))}
        >
          ↻
        </ActionButton>
      </div>

      {/* 中段: マップ + 操作ヒント。上部 (header + fpv) の下、下端の操作ボタン群
          までの間で縦に溢れたぶんはこの内側で吸収する。階段/採集/調理/注意は
          画面下端に固定（.mid 外）で、常に可視に保つ。 */}
      <div className={styles.mid}>
        <div className={styles.mapCard}>
          <div className={`${styles.mapWrap} ${styles.mapWrapRelative}`}>
            <DungeonMap
              floor={floor}
              explored={save.exploredCells[dive.depth] ?? []}
              pos={dive.pos}
              dir={dive.dir}
              foes={foes}
              depletedGathers={depletedGathers}
              onCellClick={handleCellClick}
            />
            {/* 旗 overlay: DungeonMap の canvas と同サイズの SVG を重ねて旗を描画 */}
            {flag &&
              (() => {
                // DungeonMap と同じセルサイズ計算
                const cellSize = Math.max(10, Math.min(26, Math.floor(360 / floor.width)));
                const mapW = floor.width * cellSize;
                const mapH = floor.height * cellSize;
                const fx = flag.x * cellSize + cellSize / 2;
                const fy = flag.y * cellSize;
                return (
                  <svg
                    className={styles.flagOverlay}
                    width={mapW}
                    height={mapH}
                    viewBox={`0 0 ${mapW} ${mapH}`}
                    style={{ width: mapW, height: mapH }}
                    aria-hidden="true"
                  >
                    {/* 旗: 縦棒 + 三角旗 */}
                    <line
                      x1={fx}
                      y1={fy + 2}
                      x2={fx}
                      y2={fy + cellSize - 2}
                      stroke="var(--danger, #b23c30)"
                      strokeWidth={1.5}
                    />
                    <polygon
                      points={`${fx},${fy + 2} ${fx + cellSize * 0.45},${fy + cellSize * 0.3} ${fx},${fy + cellSize * 0.55}`}
                      fill="var(--danger, #b23c30)"
                    />
                  </svg>
                );
              })()}
          </div>
        </div>
        <p className={styles.paletteHint}>
          {flag
            ? 'マスをタップして旗を移動。自動移動ボタンで移動開始。'
            : 'マップのマスをタップすると旗を設置できます。'}
        </p>
        <ActionButton
          label="自動移動"
          sfx={null}
          className={styles.autoWalkBtn}
          disabled={isAutoMoveDisabled(flag, walkingRef.current)}
          onClick={() => {
            if (flag) void autoWalk(flag);
          }}
        />
      </div>

      {showStairsCard && (
        <div className={styles.stairsCard}>
          <div className={styles.stairsCardHeader}>
            <span className={styles.stairsCardTitle}>
              {stairKind === 'stairsUp'
                ? '▼ 下り階段'
                : dive.depth <= 1
                  ? '▲ 上り階段（拠点へ）'
                  : '▲ 上り階段'}
            </span>
            <span className={styles.stairsCardSub}>
              {stairKind === 'stairsUp'
                ? `地下${dive.depth}階 → 地下${dive.depth + 1}階`
                : dive.depth <= 1
                  ? '地下1階 → 拠点'
                  : `地下${dive.depth}階 → 地下${dive.depth - 1}階`}
            </span>
          </div>
          <div className={styles.stairsCardActions}>
            <ActionButton
              label="やめる"
              sfx="cancel"
              className={styles.stairsCancel}
              onClick={() =>
                setDismissedStairsAt({ depth: dive.depth, x: dive.pos.x, y: dive.pos.y })
              }
            />
            {canWarpReturnFromHere(
              save.towerState.warp.unlockedCheckpoints,
              dive.depth,
              stairKind
            ) && (
              <ActionButton
                label="拠点に戻る"
                sfx="warp"
                className={styles.stairsCancel}
                onClick={() => {
                  setFlag(null);
                  void applyAndPersist((s) => returnToTown(s)).then(() =>
                    navigate({ name: 'town' })
                  );
                }}
              />
            )}
            <ActionButton
              label={
                stairKind === 'stairsUp'
                  ? '次階へ進む'
                  : dive.depth <= 1
                    ? '拠点へ戻る'
                    : '前階へ戻る'
              }
              className={styles.stairsOk}
              onClick={() => void handleStairs()}
            />
          </div>
        </div>
      )}

      {gatherPoint && (
        <ActionButton
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
        </ActionButton>
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
                const noTarget = NO_TARGET_ITEMS.has(s.itemId);
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
                    {noTarget ? (
                      <ActionButton
                        label="使う"
                        className={styles.itemUse}
                        onClick={() =>
                          setConfirm({
                            message: `${item.name} を使いますか？`,
                            okLabel: '使う',
                            onYes: () => handleUseItem(s.itemId),
                          })
                        }
                      />
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
                                <div className={styles.itemStats}>
                                  <span className={styles.itemHp}>
                                    HP {p.hp}/{max.hp}
                                  </span>
                                  <span className={styles.itemTp}>
                                    TP {p.tp}/{max.tp}
                                  </span>
                                </div>
                              </div>
                              <ActionButton
                                label="使う"
                                className={styles.itemTargetUseBtn}
                                onClick={() =>
                                  setConfirm({
                                    message: `${c.name} に ${item.name} を使いますか？`,
                                    okLabel: '使う',
                                    onYes: () => handleUseItem(s.itemId, p.charId),
                                  })
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              });
            })()}
            <ActionButton
              label="とじる"
              sfx="cancel"
              className={styles.itemClose}
              onClick={() => setItemOpen(false)}
            />
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
                    <ActionButton
                      label="作る"
                      className={styles.itemUse}
                      disabled={!ok}
                      onClick={() =>
                        setConfirm({
                          message: `${r.name} を作りますか？`,
                          okLabel: '作る',
                          onYes: () => handleCook(r.id),
                        })
                      }
                    />
                  </div>
                );
              });
            })()}
            <ActionButton
              label="とじる"
              sfx="cancel"
              className={styles.itemClose}
              onClick={() => setCookOpen(false)}
            />
          </div>
        </div>
      ) : null}

      {questsOpen ? (
        <div
          className={styles.itemOverlay}
          onClick={() => setQuestsOpen(false)}
        >
          <div
            className={styles.itemPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.itemTitle}>受注中の依頼</div>
            {(() => {
              const active = activeQuests(save);
              if (active.length === 0) {
                return (
                  <p className={styles.itemEmpty}>
                    受注中の依頼はありません。酒場で受注しましょう。
                  </p>
                );
              }
              return (
                <>
                  {active.some((a) => a.complete) ? (
                    <p className={styles.questsHint}>達成した依頼は酒場で報告できます。</p>
                  ) : null}
                  {active.map(({ quest, progress, complete }) => {
                    const pct =
                      progress.required > 0
                        ? Math.min(100, Math.round((progress.current / progress.required) * 100))
                        : 0;
                    return (
                      <div
                        key={quest.id}
                        className={`${styles.questRow} ${complete ? styles.questRowComplete : ''}`}
                      >
                        <div className={styles.questHead}>
                          <span className={styles.questName}>{quest.name}</span>
                          {complete ? <span className={styles.questBadge}>達成！</span> : null}
                          {quest.repeatable ? (
                            <span className={styles.questChip}>くり返し</span>
                          ) : null}
                        </div>
                        <div className={styles.questClient}>依頼主: {quest.client}</div>
                        <div className={styles.questGoal}>
                          {formatQuestGoal(quest, progress.current, progress.required)}
                        </div>
                        <div className={styles.questProgressTrack}>
                          <div
                            className={styles.questProgressFill}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className={styles.questRewards}>
                          {formatQuestRewards(quest.rewards).join(' ・ ')}
                        </div>
                      </div>
                    );
                  })}
                </>
              );
            })()}
            <ActionButton
              label="とじる"
              sfx="cancel"
              className={styles.itemClose}
              onClick={() => setQuestsOpen(false)}
            />
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
                          地下{dive.depth}階 ・ {bandThemeFor(dive.depth).name}
                        </div>
                      </div>
                      <ActionButton
                        ariaLabel="とじる"
                        sfx="cursor"
                        className={styles.menuCloseBtn}
                        onClick={() => setMenuOpen(false)}
                      >
                        ✕
                      </ActionButton>
                    </div>
                    <div className={styles.menuPartyLabel}>
                      パーティ <span className={styles.menuPartyHint}>タップで詳細・スキル</span>
                    </div>
                    <div className={styles.menuActions}>
                      <div className={styles.menuGrid}>
                        <ActionButton
                          sfx="cursor"
                          className={`${styles.menuGridItem} ${styles.menuGridItemActive}`}
                          onClick={() => {
                            setMenuOpen(false);
                            setItemOpen(true);
                          }}
                        >
                          <span className={styles.menuGridIcon}>🎒</span>
                          <span className={styles.menuGridLabel}>道具を使う</span>
                        </ActionButton>
                        <ActionButton
                          sfx="cursor"
                          className={styles.menuGridItem}
                          onClick={() => {
                            setMenuOpen(false);
                            setSoundOpen(true);
                          }}
                        >
                          <span className={styles.menuGridIcon}>⚙</span>
                          <span className={styles.menuGridLabel}>設定</span>
                        </ActionButton>
                        <ActionButton
                          sfx="cursor"
                          className={`${styles.menuGridItem} ${styles.menuGridItemFull}`}
                          onClick={() => {
                            setMenuOpen(false);
                            setQuestsOpen(true);
                          }}
                        >
                          <span className={styles.menuGridIcon}>📜</span>
                          <div>
                            <span className={styles.menuGridLabel}>依頼</span>
                            {reportableCount(save) > 0 ? (
                              <div className={styles.menuGridSub}>
                                達成 {reportableCount(save)} 件（酒場で報告）
                              </div>
                            ) : (
                              <div className={styles.menuGridSub}>
                                受注中 {activeQuests(save).length} 件
                              </div>
                            )}
                          </div>
                        </ActionButton>
                        <ActionButton
                          sfx={null}
                          disabled={isReturnThreadDisabled(threadCount)}
                          className={`${styles.menuGridItem} ${styles.menuGridItemThread} ${styles.menuGridItemFull}`}
                          onClick={() => {
                            setMenuOpen(false);
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
                        </ActionButton>
                      </div>
                    </div>
                    <div className={styles.menuMemberList}>
                      {dive.party.map((p, idx) => {
                        const c = save.guild.members.find((m) => m.id === p.charId);
                        if (!c) return null;
                        const st = computeBaseStats(c);
                        const sp = availableSP(c);
                        return (
                          <ActionButton
                            key={p.charId}
                            sfx="cursor"
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
                          </ActionButton>
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
                      <ActionButton
                        label="とじる（探索へ戻る）"
                        sfx="cursor"
                        className={styles.menuCloseAction}
                        onClick={() => setMenuOpen(false)}
                      />
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
                      <ActionButton
                        key={t}
                        label={t === 'class' ? '職業' : t === 'race' ? '種族' : '称号'}
                        sfx="cursor"
                        className={`${styles.skillTab} ${skillTab === t ? styles.skillTabOn : ''}`}
                        onClick={() => setSkillTab(t)}
                        disabled={t === 'title' && !selected.titleId}
                      />
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
                  <ActionButton
                    label="← もどる"
                    sfx="cancel"
                    className={styles.itemClose}
                    onClick={() => setMenuCharId(null)}
                  />
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
              <ActionButton
                label="やめる"
                sfx="cancel"
                className={styles.confirmCancel}
                onClick={() => setConfirm(null)}
              />
              <ActionButton
                label={confirm.okLabel}
                className={styles.confirmOk}
                onClick={() => {
                  confirm.onYes();
                  setConfirm(null);
                }}
              />
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
              <ActionButton
                ariaLabel="閉じる"
                sfx="cursor"
                className={styles.modalCloseBtn}
                onClick={() => setSoundOpen(false)}
              >
                ✕
              </ActionButton>
            </div>
            <SoundSettings />
            <ActionButton
              label="とじる"
              sfx="cursor"
              className={styles.modalClose}
              onClick={() => setSoundOpen(false)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
