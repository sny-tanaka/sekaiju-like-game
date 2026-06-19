import { useCallback, useMemo, useRef, useState } from 'react';

import styles from './style.module.scss';

import { useSfx } from '@/audio/useSfx';
import { CharacterPortrait } from '@/components/common/CharacterPortrait/CharacterPortrait';
import { DungeonMap } from '@/components/common/DungeonMap/DungeonMap';
import { EncounterGauge } from '@/components/common/EncounterGauge/EncounterGauge';
import { FirstPersonView } from '@/components/common/FirstPersonView/FirstPersonView';
import { ItemSprite } from '@/components/common/ItemSprite/ItemSprite';
import { SkillTree } from '@/components/common/SkillTree/SkillTree';
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
import { useGameState } from '@/store/gameState';
import { Redirect, useNavigation } from '@/store/navigation';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** HP ratio から低下判定（50%以下で低HP色） */
function isLowHp(hp: number, maxHp: number): boolean {
  return maxHp > 0 && hp / maxHp <= 0.5;
}

/** HH:MM 形式の現在時刻文字列 */
function nowHHMM(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

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
  // 道具選択中のアイテムID（bottom sheet 用）
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  // 調理メニューの開閉
  const [cookOpen, setCookOpen] = useState(false);
  // メニュー（ステータス/スキル/所持金）の開閉と選択中キャラ
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuCharId, setMenuCharId] = useState<string | null>(null);
  const [skillTab, setSkillTab] = useState<'class' | 'race' | 'title'>('class');
  // 採集/調理の一時メッセージ
  const [notice, setNotice] = useState<string | null>(null);
  // 消費系操作の確認ダイアログ（タップ1回での誤消費を防ぐ）。
  const [confirm, setConfirm] = useState<{
    message: string;
    okLabel: string;
    onYes: () => void;
  } | null>(null);
  // 自動保存時刻（メニューマウント時に1回計算）
  const savedAt = useMemo(() => nowHHMM(), []);

  const dive = save?.diveState ?? null;
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

  // ボスゲートの気配（canAscend が false = ボス階未撃破）の簡易判定
  const hasBossGate = useMemo(
    () => (save && dive ? !canAscend(save, dive.depth) : false),
    [save, dive]
  );

  // 帰還の糸の所持数
  const threadCount = useMemo(() => {
    if (!save) return 0;
    const all = [...save.guild.storage, ...(save.guild.foodStorage ?? [])];
    return all.filter((s) => s.itemId === 'item_return_thread').reduce((acc, s) => acc + s.qty, 0);
  }, [save]);

  // フィールド使用可能アイテム一覧
  const usableItems = useMemo(() => {
    if (!save) return [];
    return [...save.guild.storage, ...(save.guild.foodStorage ?? [])].filter(
      (s) => ITEMS[s.itemId]?.useContext?.includes('field') && s.qty > 0
    );
  }, [save]);

  // 選択中アイテムのマスタ
  const selectedItemMaster = selectedItemId ? ITEMS[selectedItemId] : null;

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
    play('item');
    void applyAndPersist(() => res.save);
    setNotice(`${res.itemId ? (ITEMS[res.itemId]?.name ?? '素材') : '素材'} を手に入れた`);
  }, [save, applyAndPersist, play]);

  const handleCook = useCallback(
    (recipeId: string) => {
      if (!save) return;
      const res = cook(save, recipeId);
      if (!res.ok) return;
      play('cook');
      void applyAndPersist(() => res.save);
      setCookOpen(false);
      setNotice(`${RECIPES[recipeId]?.name ?? '料理'} を作った`);
    },
    [save, applyAndPersist, play]
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
        setSelectedItemId(null);
        navigate({ name: 'town' });
      } else {
        setSelectedItemId(null);
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

  const stairKind = stairsAt(save);
  const hasAction = !!(stairKind || gatherPoint || atCookingSpot);

  // 階段の方向テキスト
  const stairsLabel = stairKind === 'stairsUp' ? '▲ 上り階段' : '▼ 下り階段';
  const stairsSub =
    stairKind === 'stairsUp'
      ? `F${dive.depth} → F${dive.depth + 1}`
      : dive.depth <= 1
        ? `F${dive.depth} → 拠点`
        : `F${dive.depth} → F${dive.depth - 1}`;
  const stairsPrimaryLabel =
    stairKind === 'stairsUp' ? '次階へ登る' : dive.depth <= 1 ? '拠点へ戻る' : '前の階へ降りる';

  // 採集ボタンラベル
  const gatherBtnLabel = gatherPoint
    ? isGatherDepleted(save, gatherPoint)
      ? `${GATHER_TYPES[gatherPoint.type].name}（採集済み）`
      : !canGather(save, gatherPoint)
        ? `${GATHER_TYPES[gatherPoint.type].name}（スキル要）`
        : `${GATHER_TYPES[gatherPoint.type].name}する`
    : '';

  return (
    <div className={styles.layout}>
      {/* FPV 帯 */}
      <header className={styles.head}>
        <div className={styles.fpvWrap}>
          <FirstPersonView
            floor={floor}
            pos={dive.pos}
            dir={dive.dir}
            foes={foes}
            theme={bandThemeFor(dive.depth)}
          />
          {/* 深度 + テーマ名（左上） */}
          <div className={styles.depthLeft}>
            <div className={styles.depthFloor}>F{dive.depth}</div>
            <div className={styles.depthTheme}>{bandThemeFor(dive.depth).name}</div>
          </div>
          {/* ボスゲート予兆（上端中央） */}
          {hasBossGate && <div className={styles.bossGateOmen}>⚠ 奥にボスゲートの気配</div>}
          {/* ☰ メニューボタン（右上） */}
          <button
            type="button"
            className={styles.menuBtn}
            aria-label="メニュー"
            onClick={() => {
              play('cursor');
              setMenuCharId(null);
              setMenuOpen(true);
            }}
          >
            ☰
          </button>
          {/* D-pad（FPV 内 下中央） */}
          <div className={styles.fpvControls}>
            <div className={styles.fpvControlsRow}>
              <button
                type="button"
                className={styles.fpvTurnLeft}
                aria-label="左を向く"
                onClick={() => doTurn(turnLeft(dive.dir))}
              >
                ↰
              </button>
              <button
                type="button"
                className={styles.fpvForward}
                onClick={() => doMove(dive.dir)}
              >
                ▲
              </button>
              <button
                type="button"
                className={styles.fpvTurnRight}
                aria-label="右を向く"
                onClick={() => doTurn(turnRight(dive.dir))}
              >
                ↱
              </button>
            </div>
            <button
              type="button"
              className={styles.fpvBack}
              aria-label="振り向く"
              onClick={() => doTurn(turnBack(dive.dir))}
            >
              ↻
            </button>
          </div>
        </div>
      </header>

      {/* エンカウントゲージ帯 */}
      <div className={styles.gaugeRow}>
        <span className={styles.gaugeLabel}>エンカウント予兆</span>
        <EncounterGauge level={gaugeLevel(dive.encounter.stepsUntilEncounter)} />
      </div>

      {/* 可変領域: マップ + 凡例 + アクション + ヒント */}
      <div className={styles.mid}>
        <div className={styles.mapHead}>
          <span className={styles.mapHeadLabel}>AUTOMAP ・ F{dive.depth}</span>
          <span className={styles.mapHeadHint}>セルタップで自動移動</span>
        </div>
        <div className={styles.mapCard}>
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
        <div className={styles.mapLegend}>
          <span>▲ 上り階段</span>
          <span>▼ 下り階段</span>
          <span className={styles.legendAlert}>● 警戒FOE</span>
          <span className={styles.legendCalm}>● 未警戒</span>
          <span>🌿 採集</span>
        </div>

        {/* アクション or ヒント */}
        <div>
          {/* 採集カード */}
          {gatherPoint && (
            <div className={styles.gatherCard}>
              <div className={styles.gatherHead}>
                <span className={styles.gatherSparkle}>✦</span>
                <span className={styles.gatherTitle}>
                  採集 — {GATHER_TYPES[gatherPoint.type].name}
                </span>
              </div>
              <button
                type="button"
                className={styles.gatherBtn}
                disabled={isGatherDepleted(save, gatherPoint) || !canGather(save, gatherPoint)}
                onClick={handleGather}
              >
                {gatherBtnLabel}
              </button>
            </div>
          )}

          {/* 調理カード（inline トリガ → cookOpen で既存モーダルを開く） */}
          {atCookingSpot && (
            <div className={styles.cookCard}>
              <div className={styles.cookHead}>
                <span className={styles.cookIcon}>🍲</span>
                <span className={styles.cookTitle}>調理</span>
              </div>
              <p className={styles.cookDesc}>食材を消費して探索バフを得る。</p>
              <div className={styles.cookActions}>
                <button
                  type="button"
                  className={styles.cookCancel}
                  onClick={() => setNotice(null)}
                >
                  やめる
                </button>
                <button
                  type="button"
                  className={styles.cookPrimary}
                  onClick={() => setCookOpen(true)}
                >
                  調理する
                </button>
              </div>
            </div>
          )}

          {/* 階段確認カード（inline — confirm モーダルを通さない） */}
          {stairKind && (
            <div className={styles.stairsCard}>
              <div className={styles.stairsHead}>
                <span className={styles.stairsLabel}>{stairsLabel}</span>
                <span className={styles.stairsSub}>{stairsSub}</span>
              </div>
              <div className={styles.stairsActions}>
                <button
                  type="button"
                  className={styles.stairsCancel}
                  onClick={() => {
                    /* noop: 単に無視 */
                  }}
                >
                  やめる
                </button>
                <button
                  type="button"
                  className={styles.stairsPrimary}
                  onClick={() => void handleStairs()}
                >
                  {stairsPrimaryLabel}
                </button>
              </div>
            </div>
          )}

          {/* 通常マスヒント（アクション無しの場合のみ） */}
          {!hasAction && (
            <p className={styles.tileHint}>
              現在地: 通常マス ・ 足元にオブジェクトがあればアクションが出ます
            </p>
          )}

          {notice && <p className={styles.notice}>{notice}</p>}
        </div>
      </div>

      {/* ============================================================
          道具を使う（itemOpen）
         ============================================================ */}
      {itemOpen ? (
        <div className={styles.itemOverlay}>
          <div className={styles.itemHeader}>
            <span className={styles.itemHeaderTitle}>道具</span>
            <button
              type="button"
              className={styles.itemHeaderClose}
              aria-label="閉じる"
              onClick={() => {
                setItemOpen(false);
                setSelectedItemId(null);
              }}
            >
              ✕
            </button>
          </div>
          <div className={styles.itemList}>
            <p className={styles.itemListLabel}>所持アイテム</p>
            {usableItems.length === 0 ? (
              <p className={styles.itemEmpty}>使える道具がありません。</p>
            ) : (
              usableItems.map((s) => {
                const item = ITEMS[s.itemId];
                return (
                  <button
                    key={s.itemId}
                    type="button"
                    className={`${styles.itemCard} ${selectedItemId === s.itemId ? styles.itemCardSelected : ''}`}
                    onClick={() => setSelectedItemId(s.itemId)}
                  >
                    <ItemSprite
                      itemId={s.itemId}
                      size="sm"
                    />
                    <div className={styles.itemCardMeta}>
                      <span className={styles.itemCardName}>{item.name}</span>
                      <span className={styles.itemCardDesc}>{item.description}</span>
                    </div>
                    <span className={styles.itemCardCount}>×{s.qty}</span>
                  </button>
                );
              })
            )}
          </div>

          {/* bottom sheet — 対象選択 */}
          {selectedItemId && selectedItemMaster && (
            <div
              className={styles.itemSheet}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.itemSheetHandle} />
              <div className={styles.itemSheetHead}>
                <span className={styles.itemSheetIcon}>
                  <ItemSprite
                    itemId={selectedItemId}
                    size="sm"
                  />
                </span>
                <div>
                  <div className={styles.itemSheetTitle}>{selectedItemMaster.name} を使う</div>
                  <div className={styles.itemSheetSub}>{selectedItemMaster.description}</div>
                </div>
              </div>
              <div className={styles.itemTargetList}>
                {selectedItemId === 'item_return_thread' ? (
                  /* 帰還の糸は対象なし → 直接使う */
                  <button
                    type="button"
                    className={styles.itemTargetUseBtn}
                    onClick={() =>
                      setConfirm({
                        message: `${selectedItemMaster.name} を使いますか？`,
                        okLabel: '使う',
                        onYes: () => handleUseItem(selectedItemId),
                      })
                    }
                  >
                    使う（拠点へ帰還）
                  </button>
                ) : (
                  dive.party.map((p) => {
                    const c = save.guild.members.find((m) => m.id === p.charId);
                    if (!c) return null;
                    const maxStat = computeBaseStats(c);
                    const hpRatio = maxStat.hp > 0 ? p.hp / maxStat.hp : 1;
                    const isFull = p.hp >= maxStat.hp;
                    return (
                      <div
                        key={p.charId}
                        className={`${styles.itemTargetRow} ${isFull ? styles.itemTargetRowDisabled : ''}`}
                      >
                        <div className={styles.itemTargetPortraitWrap}>
                          <CharacterPortrait
                            raceId={c.raceId}
                            classId={c.classId}
                            size={24}
                          />
                        </div>
                        <div className={styles.itemTargetInfo}>
                          <div className={styles.itemTargetNameRow}>
                            <span className={styles.itemTargetName}>{c.name}</span>
                            <span
                              className={`${styles.itemTargetHpNum} ${isFull ? styles.itemTargetHpNumFull : ''}`}
                            >
                              {p.hp}/{maxStat.hp}
                            </span>
                          </div>
                          <div className={styles.itemTargetBarTrack}>
                            <div
                              className={`${styles.itemTargetBarFill} ${!isLowHp(p.hp, maxStat.hp) || isFull ? styles.itemTargetBarFillFull : ''}`}
                              style={{ width: `${Math.min(hpRatio * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                        {isFull ? (
                          <span className={styles.itemTargetFullText}>満タン</span>
                        ) : (
                          <button
                            type="button"
                            className={styles.itemTargetUseBtn}
                            onClick={() => handleUseItem(selectedItemId, p.charId)}
                          >
                            使う
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
              <button
                type="button"
                className={styles.itemSheetClose}
                onClick={() => setSelectedItemId(null)}
              >
                もどる
              </button>
            </div>
          )}
        </div>
      ) : null}

      {/* ============================================================
          調理モーダル（cookOpen）
         ============================================================ */}
      {cookOpen ? (
        <div
          className={styles.cookOverlay}
          onClick={() => setCookOpen(false)}
        >
          <div
            className={styles.cookPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.cookPanelHandle} />
            <div className={styles.cookPanelTitle}>調理</div>
            {(() => {
              const recipes = unlockedRecipes(save);
              if (recipes.length === 0) {
                return <p className={styles.cookRecipeEmpty}>作れるレシピがありません。</p>;
              }
              return recipes.map((r) => {
                const ok = canCook(save, r.id);
                const ing = r.ingredients
                  .map((i) => `${ITEMS[i.itemId]?.name ?? i.itemId}×${i.qty}`)
                  .join(' ＋ ');
                return (
                  <div
                    key={r.id}
                    className={styles.cookRecipeRow}
                  >
                    <div className={styles.cookRecipeName}>
                      {r.name}
                      <span className={styles.cookRecipeDesc}>
                        {ing} → {ITEMS[r.result.itemId]?.name ?? r.result.itemId}（所持
                        {r.ingredients
                          .map((i) => `${ITEMS[i.itemId]?.name ?? ''}${foodCount(save, i.itemId)}`)
                          .join('・')}
                        ）
                      </span>
                    </div>
                    <button
                      type="button"
                      className={styles.cookRecipeBtn}
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
              className={styles.cookPanelClose}
              onClick={() => setCookOpen(false)}
            >
              とじる
            </button>
          </div>
        </div>
      ) : null}

      {/* ============================================================
          ☰ メニュー（全画面ディム + flex column パネル）
         ============================================================ */}
      {menuOpen ? (
        <div className={styles.menuOverlay}>
          <div className={styles.menuPanel}>
            {(() => {
              const selected = menuCharId
                ? save.guild.members.find((m) => m.id === menuCharId)
                : null;

              if (!selected) {
                // メニュートップ
                return (
                  <>
                    <div className={styles.menuHead}>
                      <div>
                        <div className={styles.menuTitle}>メニュー</div>
                        <div className={styles.menuSub}>
                          F{dive.depth} ・ {bandThemeFor(dive.depth).name}
                        </div>
                      </div>
                      <button
                        type="button"
                        className={styles.menuClose}
                        aria-label="閉じる"
                        onClick={() => {
                          play('cursor');
                          setMenuOpen(false);
                        }}
                      >
                        ✕
                      </button>
                    </div>

                    <p className={styles.menuPartyLabel}>
                      パーティ
                      <span className={styles.menuPartyLabelSub}>タップで詳細・スキル</span>
                    </p>
                    <div className={styles.menuPartyList}>
                      {dive.party.map((p, i) => {
                        const c = save.guild.members.find((m) => m.id === p.charId);
                        if (!c) return null;
                        const st = computeBaseStats(c);
                        const hpRatio = st.hp > 0 ? p.hp / st.hp : 1;
                        const tpRatio = st.tp > 0 ? p.tp / st.tp : 1;
                        return (
                          <button
                            key={p.charId}
                            type="button"
                            className={`${styles.menuMember} ${i === 0 ? styles.menuMemberLeader : ''}`}
                            onClick={() => {
                              setMenuCharId(p.charId);
                              setSkillTab('class');
                            }}
                          >
                            <div className={styles.menuMemberPortraitWrap}>
                              <CharacterPortrait
                                raceId={c.raceId}
                                classId={c.classId}
                                size={28}
                              />
                            </div>
                            <div className={styles.menuMemberInfo}>
                              <div className={styles.menuMemberNameRow}>
                                <span className={styles.menuMemberName}>{c.name}</span>
                                <span className={styles.menuMemberLv}>Lv{c.level}</span>
                              </div>
                              <div className={styles.menuMemberBars}>
                                <span className={styles.menuMemberBarLabel}>H</span>
                                <div className={styles.menuMemberBarTrack}>
                                  <div
                                    className={`${styles.menuMemberBarHp} ${isLowHp(p.hp, st.hp) ? styles.menuMemberBarLow : ''}`}
                                    style={{ width: `${Math.min(hpRatio * 100, 100)}%` }}
                                  />
                                </div>
                                <span className={styles.menuMemberBarLabel}>T</span>
                                <div className={styles.menuMemberBarTrack}>
                                  <div
                                    className={styles.menuMemberBarTp}
                                    style={{ width: `${Math.min(tpRatio * 100, 100)}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                            <span className={styles.menuMemberArrow}>➜</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* 2x2 アクショングリッド */}
                    <div className={styles.menuActionGrid}>
                      <button
                        type="button"
                        className={styles.menuActionItem}
                        onClick={() => {
                          setMenuOpen(false);
                          setItemOpen(true);
                          setSelectedItemId(null);
                        }}
                      >
                        <span className={styles.menuActionIcon}>🎒</span>
                        <span className={styles.menuActionLabel}>道具を使う</span>
                      </button>
                      <button
                        type="button"
                        className={styles.menuActionSetting}
                        disabled
                      >
                        <span className={styles.menuActionIcon}>⚙</span>
                        <span className={styles.menuActionLabel}>設定</span>
                      </button>
                      <button
                        type="button"
                        className={styles.menuActionThread}
                        onClick={() => {
                          if (threadCount > 0) {
                            setMenuOpen(false);
                            setConfirm({
                              message: '帰還の糸を使いますか？拠点へ帰還します。',
                              okLabel: '使う',
                              onYes: () => handleUseItem('item_return_thread'),
                            });
                          }
                        }}
                      >
                        <span className={styles.menuActionIcon}>🪢</span>
                        <div className={styles.menuActionMeta}>
                          <span className={styles.menuActionLabelGreen}>帰還の糸</span>
                          <span className={styles.menuActionSubGreen}>
                            町へ戻る ・ 所持{threadCount}
                          </span>
                        </div>
                      </button>
                      <button
                        type="button"
                        className={styles.menuActionMap}
                        disabled
                      >
                        <span className={styles.menuActionIcon}>🗺</span>
                        <span className={styles.menuActionLabel}>全体マップ</span>
                      </button>
                    </div>

                    {/* 自動保存表示 */}
                    <div className={styles.menuSavedRow}>
                      <span className={styles.menuSavedDot} />
                      <span>自動保存済 ・ {savedAt}</span>
                    </div>

                    {/* とじる */}
                    <button
                      type="button"
                      className={styles.menuCloseBig}
                      onClick={() => {
                        play('cursor');
                        setMenuOpen(false);
                      }}
                    >
                      とじる（探索へ戻る）
                    </button>
                  </>
                );
              }

              // キャラ詳細: ステータス + スキル振り
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
                  <div className={styles.charDetailTitle}>
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
                    className={styles.charBackBtn}
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

      {/* ============================================================
          消費系操作の確認ダイアログ（誤タップ防止）
         ============================================================ */}
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
    </div>
  );
};
