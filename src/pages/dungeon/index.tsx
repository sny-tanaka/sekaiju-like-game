import { useCallback, useMemo, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import styles from './style.module.scss';

import { DungeonMap } from '@/components/common/DungeonMap/DungeonMap';
import { EncounterGauge } from '@/components/common/EncounterGauge/EncounterGauge';
import { FirstPersonView } from '@/components/common/FirstPersonView/FirstPersonView';
import { GATHER_TYPES } from '@/data/gather';
import { ITEMS } from '@/data/items';
import { MAP_ICONS } from '@/data/mapIcons';
import { RECIPES } from '@/data/recipes';
import { canCook, cook, isAtCookingSpot, unlockedRecipes } from '@/domain/cooking';
import { goDeeper, goShallower, moveStep, returnToTown, stairsAt, turnTo } from '@/domain/dive';
import { gaugeLevel } from '@/domain/encounter';
import { canGather, gatherHere, gatheringPointHere, isGatherDepleted } from '@/domain/gather';
import { foodCount } from '@/domain/inventory';
import { applyFieldItem } from '@/domain/itemUse';
import { DELTA, turnBack, turnLeft, turnRight } from '@/domain/movement';
import { eraseIcon, placeIcon } from '@/domain/playerMap';
import { createRng } from '@/domain/rng';
import { computeBaseStats } from '@/domain/stats';
import type { Dir, Rng } from '@/domain/types';
import { useGameState } from '@/store/gameState';

// マップ編集の選択ツール: null=移動モード / 'erase'=消しゴム / それ以外=アイコンID
type Tool = string | null;

// 探索（ダンジョン）。自動生成1階のグリッド移動＋自動マップ＋エンカウントゲージ。
// 階段で上下移動、帰還で拠点へ。オートセーブは階移動・帰還時（[05 §4]）。
export const Page = () => {
  const navigate = useNavigate();
  const { save, applySave, applyAndPersist } = useGameState();
  // 移動中エンカウント抽選用の ephemeral 乱数（ダイブ内で1本。再開時は作り直し）
  const rngRef = useRef<Rng | null>(null);
  // マップ編集ツール（null=移動）。アイコン配置/消去はオートセーブ。
  const [tool, setTool] = useState<Tool>(null);
  // 道具メニューの開閉
  const [itemOpen, setItemOpen] = useState(false);
  // 調理メニューの開閉
  const [cookOpen, setCookOpen] = useState(false);
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

  const handleCellClick = useCallback(
    (x: number, y: number) => {
      if (!dive) return;
      const depth = dive.depth;
      // マップ編集モード: 探索済みセルにアイコンを配置/消去（オートセーブ）
      if (tool !== null) {
        const explored = (save?.exploredCells[depth] ?? []).includes(`${x},${y}`);
        if (!explored) return; // 未踏破セルには配置・消去しない（描画もされないため）
        if (tool === 'erase') {
          void applyAndPersist((s) => eraseIcon(s, depth, x, y));
        } else {
          void applyAndPersist((s) => placeIcon(s, depth, x, y, tool));
        }
        return;
      }
      // 移動モード: 隣接1マスのみ移動
      const dx = x - dive.pos.x;
      const dy = y - dive.pos.y;
      const dir = (['N', 'E', 'S', 'W'] as Dir[]).find(
        (d) => DELTA[d].dx === dx && DELTA[d].dy === dy
      );
      if (dir) doMove(dir);
    },
    [dive, doMove, tool, save, applyAndPersist]
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
        <div className={styles.depth}>{dive.depth}F</div>
        <EncounterGauge level={gaugeLevel(dive.encounter.stepsUntilEncounter)} />
        <button
          type="button"
          className={styles.return}
          onClick={() => setItemOpen(true)}
        >
          道具
        </button>
        <button
          type="button"
          className={styles.return}
          onClick={() => void handleReturn()}
        >
          帰還
        </button>
      </header>

      <div className={styles.fpvWrap}>
        <FirstPersonView
          floor={floor}
          pos={dive.pos}
          dir={dive.dir}
          foes={foes}
        />
      </div>

      <div className={styles.mapWrap}>
        <DungeonMap
          floor={floor}
          explored={save.exploredCells[dive.depth] ?? []}
          pos={dive.pos}
          dir={dive.dir}
          icons={save.playerMaps[dive.depth]?.icons ?? []}
          foes={foes}
          depletedGathers={depletedGathers}
          onCellClick={handleCellClick}
        />
      </div>

      <div className={styles.palette}>
        <button
          type="button"
          className={`${styles.tool} ${tool === null ? styles.toolActive : ''}`}
          onClick={() => setTool(null)}
          aria-label="移動モード"
        >
          🚶
        </button>
        {MAP_ICONS.map((ic) => (
          <button
            key={ic.id}
            type="button"
            className={`${styles.tool} ${tool === ic.id ? styles.toolActive : ''}`}
            onClick={() => setTool(ic.id)}
            aria-label={ic.label}
          >
            {ic.symbol}
          </button>
        ))}
        <button
          type="button"
          className={`${styles.tool} ${tool === 'erase' ? styles.toolActive : ''}`}
          onClick={() => setTool('erase')}
          aria-label="消しゴム"
        >
          🧽
        </button>
      </div>
      <p className={styles.paletteHint}>
        {tool === null
          ? '隣接マスをタップで移動。アイコンを選ぶとマップに書き込めます。'
          : tool === 'erase'
            ? 'マップ上のマスをタップでアイコンを消去。'
            : 'マップ上の探索済みマスをタップでアイコンを配置（再タップで消去）。'}
      </p>

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

      <div className={styles.controls}>
        <div className={styles.row}>
          <button
            type="button"
            className={styles.turn}
            onClick={() => doTurn(turnLeft(dive.dir))}
            aria-label="左を向く"
          >
            ↰
          </button>
          <button
            type="button"
            className={styles.forward}
            onClick={() => doMove(dive.dir)}
          >
            前進
          </button>
          <button
            type="button"
            className={styles.turn}
            onClick={() => doTurn(turnRight(dive.dir))}
            aria-label="右を向く"
          >
            ↱
          </button>
        </div>
        <button
          type="button"
          className={styles.back}
          onClick={() => doTurn(turnBack(dive.dir))}
          aria-label="振り向く"
        >
          ↻ 振り向く
        </button>
      </div>

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
    </div>
  );
};
