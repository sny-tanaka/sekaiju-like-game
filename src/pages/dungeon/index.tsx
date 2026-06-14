import { useCallback, useMemo, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import styles from './style.module.scss';

import { DungeonMap } from '@/components/common/DungeonMap/DungeonMap';
import { EncounterGauge } from '@/components/common/EncounterGauge/EncounterGauge';
import { FirstPersonView } from '@/components/common/FirstPersonView/FirstPersonView';
import { MAP_ICONS } from '@/data/mapIcons';
import { goDeeper, goShallower, moveStep, returnToTown, stairsAt, turnTo } from '@/domain/dive';
import { gaugeLevel } from '@/domain/encounter';
import { DELTA, turnBack, turnLeft, turnRight } from '@/domain/movement';
import { eraseIcon, placeIcon } from '@/domain/playerMap';
import { createRng } from '@/domain/rng';
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

  const dive = save?.diveState ?? null;
  const floor = useMemo(
    () => (save && dive ? save.towerState.floors[dive.depth]?.generated : null),
    [save, dive]
  );

  const doMove = useCallback(
    (dir: Dir) => {
      if (!save) return;
      if (!rngRef.current) rngRef.current = createRng((save.masterSeed ^ 0x9e3779b9) >>> 0);
      const result = moveStep(save, dir, rngRef.current);
      applySave(() => result.save);
      if (result.triggered) {
        // ダミー戦闘へ（戦闘ロジックは Phase 2）。戻ると探索を継続。
        navigate('/battle');
      }
    },
    [save, applySave, navigate]
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

  const handleCellClick = useCallback(
    (x: number, y: number) => {
      if (!dive) return;
      const depth = dive.depth;
      // マップ編集モード: 探索済みセルにアイコンを配置/消去（オートセーブ）
      if (tool !== null) {
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
    [dive, doMove, tool, applyAndPersist]
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
        />
      </div>

      <div className={styles.mapWrap}>
        <DungeonMap
          floor={floor}
          explored={save.exploredCells[dive.depth] ?? []}
          pos={dive.pos}
          dir={dive.dir}
          icons={save.playerMaps[dive.depth]?.icons ?? []}
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
    </div>
  );
};
