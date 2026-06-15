import { useCallback, useMemo, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import styles from './style.module.scss';

import { DungeonMap } from '@/components/common/DungeonMap/DungeonMap';
import { EncounterGauge } from '@/components/common/EncounterGauge/EncounterGauge';
import { FirstPersonView } from '@/components/common/FirstPersonView/FirstPersonView';
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

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// 探索（ダンジョン）。自動生成1階のグリッド移動＋自動マップ＋エンカウントゲージ。
// 階段で上下移動、帰還で拠点へ。オートセーブは階移動・帰還時（[05 §4]）。
export const Page = () => {
  const navigate = useNavigate();
  const { save, applySave, applyAndPersist } = useGameState();
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
  const [menuCharId, setMenuCharId] = useState<string | null>(null);
  const [skillTab, setSkillTab] = useState<'class' | 'race' | 'title'>('class');
  // 採集/調理の一時メッセージ
  const [notice, setNotice] = useState<string | null>(null);

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
    void applyAndPersist(() => res.save);
    setNotice(`${res.itemId ? (ITEMS[res.itemId]?.name ?? '素材') : '素材'} を手に入れた`);
  }, [save, applyAndPersist]);

  const handleCook = useCallback(
    (recipeId: string) => {
      if (!save) return;
      const res = cook(save, recipeId);
      if (!res.ok) return;
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
        navigate('/battle');
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
      await applyAndPersist((s) => goDeeper(s));
    } else if (kind === 'stairsDown') {
      if (save.diveState!.depth <= 1) {
        await applyAndPersist((s) => returnToTown(s));
        navigate('/town');
      } else {
        await applyAndPersist((s) => goShallower(s));
      }
    }
  }, [save, applyAndPersist, navigate]);

  const handleReturn = useCallback(async () => {
    await applyAndPersist((s) => returnToTown(s));
    navigate('/town');
  }, [applyAndPersist, navigate]);

  const handleUseItem = useCallback(
    (itemId: string, charId?: string) => {
      if (!save) return;
      const result = applyFieldItem(save, itemId, charId);
      if (!result.ok) return;
      void applyAndPersist(() => result.save);
      if (!result.save.diveState) {
        // 帰還の糸など → 拠点へ
        setItemOpen(false);
        navigate('/town');
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
            navigate('/battle');
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
    return (
      <Navigate
        to="/title"
        replace
      />
    );
  }
  if (!dive || !floor) {
    return (
      <Navigate
        to="/town"
        replace
      />
    );
  }

  const stairKind = stairsAt(save);

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <div className={styles.depth}>
          {dive.depth}F <span className={styles.theme}>{bandThemeFor(dive.depth).name}</span>
        </div>
        <EncounterGauge level={gaugeLevel(dive.encounter.stepsUntilEncounter)} />
        <button
          type="button"
          className={styles.menuBtn}
          onClick={() => {
            setMenuCharId(null);
            setMenuOpen(true);
          }}
        >
          ☰ メニュー
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
      <p className={styles.paletteHint}>マップのマスをタップすると、そこまで自動で移動します。</p>

      {stairKind && (
        <button
          type="button"
          className={styles.stairs}
          onClick={() => void handleStairs()}
        >
          {stairKind === 'stairsUp'
            ? '▲ 次の階へ進む'
            : dive.depth <= 1
              ? '▼ 拠点へ戻る'
              : '▼ 前の階へ戻る'}
        </button>
      )}

      {gatherPoint && (
        <button
          type="button"
          className={styles.action}
          disabled={isGatherDepleted(save, gatherPoint) || !canGather(save, gatherPoint)}
          onClick={handleGather}
        >
          {isGatherDepleted(save, gatherPoint)
            ? `🌿 ${GATHER_TYPES[gatherPoint.type].name}（採集済み）`
            : !canGather(save, gatherPoint)
              ? `🌿 ${GATHER_TYPES[gatherPoint.type].name}（スキル要）`
              : `🌿 ${GATHER_TYPES[gatherPoint.type].name}する`}
        </button>
      )}

      {atCookingSpot && (
        <button
          type="button"
          className={styles.action}
          onClick={() => setCookOpen(true)}
        >
          🍳 調理する
        </button>
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
                    <div className={styles.itemName}>
                      {item.name} ×{s.qty}
                      <span className={styles.itemDesc}>{item.description}</span>
                    </div>
                    {isReturn ? (
                      <button
                        type="button"
                        className={styles.itemUse}
                        onClick={() => handleUseItem(s.itemId)}
                      >
                        使う
                      </button>
                    ) : (
                      <div className={styles.itemTargets}>
                        {dive.party.map((p) => {
                          const c = save.guild.members.find((m) => m.id === p.charId);
                          if (!c) return null;
                          const max = computeBaseStats(c);
                          return (
                            <button
                              type="button"
                              key={p.charId}
                              className={styles.itemTarget}
                              onClick={() => handleUseItem(s.itemId, p.charId)}
                            >
                              {c.name}
                              <span className={styles.itemHp}>
                                HP {p.hp}/{max.hp}・TP {p.tp}/{max.tp}
                              </span>
                            </button>
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
                      onClick={() => handleCook(r.id)}
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
          className={styles.itemOverlay}
          onClick={() => setMenuOpen(false)}
        >
          <div
            className={styles.itemPanel}
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const selected = menuCharId
                ? save.guild.members.find((m) => m.id === menuCharId)
                : null;
              if (!selected) {
                // メニュー: 所持金＋パーティ一覧
                return (
                  <>
                    <div className={styles.itemTitle}>メニュー</div>
                    <p className={styles.menuGold}>所持金 {save.guild.gold} G</p>
                    <div className={styles.menuActions}>
                      <button
                        type="button"
                        className={styles.menuAction}
                        onClick={() => {
                          setMenuOpen(false);
                          setItemOpen(true);
                        }}
                      >
                        🎒 どうぐ・食料
                      </button>
                      <button
                        type="button"
                        className={styles.menuAction}
                        onClick={() => void handleReturn()}
                      >
                        🏠 拠点へ帰還
                      </button>
                    </div>
                    <p className={styles.menuSectionLabel}>パーティ（タップで詳細・スキル振り）</p>
                    {dive.party.map((p) => {
                      const c = save.guild.members.find((m) => m.id === p.charId);
                      if (!c) return null;
                      const st = computeBaseStats(c);
                      const sp = availableSP(c);
                      return (
                        <button
                          type="button"
                          key={p.charId}
                          className={styles.menuMember}
                          onClick={() => {
                            setMenuCharId(p.charId);
                            setSkillTab('class');
                          }}
                        >
                          <span className={styles.menuMemberName}>
                            {c.name}
                            <span className={styles.menuMemberJob}>
                              {CLASSES[c.classId]?.name} Lv{c.level}
                            </span>
                          </span>
                          <span className={styles.menuMemberStat}>
                            HP {p.hp}/{st.hp}・TP {p.tp}/{st.tp}
                            {sp > 0 ? <span className={styles.menuSp}>SP {sp}</span> : null}
                          </span>
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      className={styles.itemClose}
                      onClick={() => setMenuOpen(false)}
                    >
                      とじる
                    </button>
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
                    onLearn={(skillId) =>
                      void applyAndPersist((s) => ({
                        ...s,
                        guild: {
                          ...s.guild,
                          members: s.guild.members.map((m) =>
                            m.id === selected.id ? learnSkill(m, skillId) : m
                          ),
                        },
                      }))
                    }
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
    </div>
  );
};
