import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import styles from './style.module.scss';

import { StatBar } from '@/components/common/StatBar/StatBar';
import { BATTLE_SKILLS } from '@/data/battleSkills';
import { applyBattleResult, battleRewards, resolveTurn, startBattle } from '@/domain/battle';
import { returnToTown } from '@/domain/dive';
import { rollEncounter } from '@/domain/encounterTable';
import { createRng } from '@/domain/rng';
import type { BattleCommand, BattleState, Combatant, Rng, SkillId } from '@/domain/types';
import { useGameState } from '@/store/gameState';

type AllyCmd = { kind: 'attack' | 'guard' } | { kind: 'skill'; skillId: SkillId };

// 戦闘（[03]）。一括入力型ターン制。エンカウントで遷移してくる。
export const Page = () => {
  const navigate = useNavigate();
  const { save, applyAndPersist } = useGameState();
  const rngRef = useRef<Rng | null>(null);
  const [state, setState] = useState<BattleState | null>(null);
  const [cmds, setCmds] = useState<Record<string, AllyCmd>>({});
  const [targetId, setTargetId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // 初期化（1回のみ）: エンカウント抽選＋戦闘生成
  useEffect(() => {
    if (state || !save?.diveState) return;
    const depth = save.diveState.depth;
    const seed =
      (save.masterSeed ^ (depth * 2654435761) ^ (save.towerState.record.totalDives * 40503)) >>> 0;
    rngRef.current = createRng(seed);
    const enemyIds = rollEncounter(depth, rngRef.current);
    setState(startBattle(save, enemyIds));
  }, [save, state]);

  const aliveEnemies = useMemo(() => state?.enemies.filter((e) => !e.isDown) ?? [], [state]);

  // ターゲットの既定値（最初の生存敵）
  useEffect(() => {
    if (
      aliveEnemies.length > 0 &&
      (targetId === null || !aliveEnemies.some((e) => e.id === targetId))
    ) {
      setTargetId(aliveEnemies[0].id);
    }
  }, [aliveEnemies, targetId]);

  const setCmd = useCallback((charId: string, cmd: AllyCmd) => {
    setCmds((prev) => ({ ...prev, [charId]: cmd }));
  }, []);

  const finish = useCallback(
    async (final: BattleState) => {
      setBusy(true);
      if (final.outcome === 'lose') {
        await applyAndPersist((s) => returnToTown(applyBattleResult(s, final)));
        navigate('/town');
      } else {
        // win / fled: 結果を反映して探索へ戻る
        await applyAndPersist((s) => applyBattleResult(s, final));
        navigate('/dungeon');
      }
    },
    [applyAndPersist, navigate]
  );

  const handleResolve = useCallback(() => {
    if (!state || !rngRef.current || state.outcome !== 'ongoing') return;
    const tgt = targetId ?? aliveEnemies[0]?.id;
    const list: BattleCommand[] = state.allies
      .filter((a) => !a.isDown)
      .map((a): BattleCommand => {
        const c = cmds[a.id] ?? { kind: 'attack' };
        if (c.kind === 'guard') return { kind: 'guard', actorId: a.id };
        if (c.kind === 'skill') {
          return { kind: 'skill', actorId: a.id, skillId: c.skillId, targetId: tgt ?? '' };
        }
        return { kind: 'attack', actorId: a.id, targetId: tgt ?? '' };
      });
    setState(resolveTurn(state, list, rngRef.current));
  }, [state, cmds, targetId, aliveEnemies]);

  const handleFlee = useCallback(() => {
    if (!state || !rngRef.current || state.outcome !== 'ongoing') return;
    const a = state.allies.find((x) => !x.isDown);
    if (!a) return;
    setState(resolveTurn(state, [{ kind: 'flee', actorId: a.id }], rngRef.current));
  }, [state]);

  if (!save || !save.diveState) {
    return (
      <Navigate
        to="/town"
        replace
      />
    );
  }
  if (!state) return <div className={styles.layout}>戦闘準備中...</div>;

  const usableSkills = (ally: Combatant): SkillId[] => {
    const char = save.guild.members.find((m) => m.id === ally.id);
    if (!char) return [];
    return Object.keys(char.learnedSkills).filter(
      (sid) => sid in BATTLE_SKILLS && ally.tp >= BATTLE_SKILLS[sid].tpCost(1)
    );
  };

  const rewards = battleRewards(state);

  return (
    <div className={styles.layout}>
      {/* 敵 */}
      <div className={styles.enemies}>
        {state.enemies.map((e) => (
          <button
            type="button"
            key={e.id}
            className={`${styles.enemy} ${e.isDown ? styles.down : ''} ${targetId === e.id ? styles.targeted : ''}`}
            disabled={e.isDown}
            onClick={() => setTargetId(e.id)}
          >
            <span className={styles.enemyName}>
              {e.name}
              {e.ailments.length > 0 ? ' 🌀' : ''}
            </span>
            <StatBar
              value={e.hp}
              max={e.maxHp}
              color="#e57373"
              showValue={false}
            />
          </button>
        ))}
      </div>

      {/* ログ */}
      <div className={styles.log}>
        {state.log.length === 0 ? (
          <div className={styles.logLine}>てきが あらわれた！（{state.turn} ターン目）</div>
        ) : (
          state.log.slice(-5).map((l, i) => (
            <div
              key={i}
              className={styles.logLine}
            >
              {l.text}
            </div>
          ))
        )}
      </div>

      {/* 味方 */}
      <div className={styles.allies}>
        {state.allies.map((a) => {
          const skills = usableSkills(a);
          const cmd = cmds[a.id] ?? { kind: 'attack' };
          return (
            <div
              key={a.id}
              className={`${styles.ally} ${a.isDown ? styles.down : ''}`}
            >
              <div className={styles.allyHead}>
                <span className={styles.allyName}>{a.name}</span>
                {a.unionGauge >= 100 ? <span className={styles.uni}>UNION!</span> : null}
              </div>
              <StatBar
                value={a.hp}
                max={a.maxHp}
                color="#4caf50"
                label="HP"
              />
              <StatBar
                value={a.tp}
                max={a.maxTp}
                color="#2196f3"
                label="TP"
              />
              {!a.isDown && state.outcome === 'ongoing' ? (
                <div className={styles.cmdRow}>
                  <button
                    type="button"
                    className={`${styles.cmd} ${cmd.kind === 'attack' ? styles.cmdActive : ''}`}
                    onClick={() => setCmd(a.id, { kind: 'attack' })}
                  >
                    攻撃
                  </button>
                  <button
                    type="button"
                    className={`${styles.cmd} ${cmd.kind === 'guard' ? styles.cmdActive : ''}`}
                    onClick={() => setCmd(a.id, { kind: 'guard' })}
                  >
                    防御
                  </button>
                  {skills.map((sid) => (
                    <button
                      type="button"
                      key={sid}
                      className={`${styles.cmd} ${cmd.kind === 'skill' && cmd.skillId === sid ? styles.cmdActive : ''}`}
                      onClick={() => setCmd(a.id, { kind: 'skill', skillId: sid })}
                    >
                      {BATTLE_SKILLS[sid].name}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* 操作 */}
      {state.outcome === 'ongoing' ? (
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.flee}
            onClick={handleFlee}
          >
            逃走
          </button>
          <button
            type="button"
            className={styles.resolve}
            onClick={handleResolve}
          >
            実行
          </button>
        </div>
      ) : (
        <div className={styles.result}>
          <div className={styles.resultTitle}>
            {state.outcome === 'win' ? '勝利！' : state.outcome === 'fled' ? '逃走した' : '全滅...'}
          </div>
          {state.outcome === 'win' ? (
            <div className={styles.resultBody}>
              経験値 {rewards.exp} ／ {rewards.gold} G を獲得
            </div>
          ) : state.outcome === 'lose' ? (
            <div className={styles.resultBody}>拠点へ帰還する</div>
          ) : null}
          <button
            type="button"
            className={styles.resolve}
            disabled={busy}
            onClick={() => void finish(state)}
          >
            つづける
          </button>
        </div>
      )}
    </div>
  );
};
