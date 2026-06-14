import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import styles from './style.module.scss';

import { StatBar } from '@/components/common/StatBar/StatBar';
import { BATTLE_SKILLS } from '@/data/battleSkills';
import { SKILLS } from '@/data/skills';
import { applyBattleResult, battleRewards, resolveTurn, startBattle } from '@/domain/battle';
import { returnToTown } from '@/domain/dive';
import { rollEncounter } from '@/domain/encounterTable';
import { createRng } from '@/domain/rng';
import type { BattleCommand, BattleState, Combatant, Rng, SkillId } from '@/domain/types';
import { useGameState } from '@/store/gameState';

type AllyCmd = { kind: 'attack' } | { kind: 'guard' } | { kind: 'skill'; skillId: SkillId };

// 戦闘（[03]）。一括入力型ターン制。本家に倣い、味方は前衛/後衛の2段で表示し、
// キャラごとにコマンド（攻撃/防御/スキル/逃走）をメニュー選択する。
export const Page = () => {
  const navigate = useNavigate();
  const { save, applyAndPersist } = useGameState();
  const rngRef = useRef<Rng | null>(null);
  const [state, setState] = useState<BattleState | null>(null);
  const [commands, setCommands] = useState<Record<string, AllyCmd>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [skillMenu, setSkillMenu] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // 初期化（1回のみ）: エンカウント抽選＋戦闘生成
  useEffect(() => {
    if (state || !save?.diveState) return;
    const depth = save.diveState.depth;
    const seed =
      (save.masterSeed ^ (depth * 2654435761) ^ (save.towerState.record.totalDives * 40503)) >>> 0;
    rngRef.current = createRng(seed);
    setState(startBattle(save, rollEncounter(depth, rngRef.current)));
  }, [save, state]);

  const aliveEnemies = useMemo(() => state?.enemies.filter((e) => !e.isDown) ?? [], [state]);
  const aliveAllies = useMemo(() => state?.allies.filter((a) => !a.isDown) ?? [], [state]);

  // 既定ターゲット（最初の生存敵）
  useEffect(() => {
    if (aliveEnemies.length > 0 && !aliveEnemies.some((e) => e.id === targetId)) {
      setTargetId(aliveEnemies[0].id);
    }
  }, [aliveEnemies, targetId]);

  // 入力対象キャラの補正（無効になった場合のみ未入力の先頭へ。全員入力済みなら null）
  useEffect(() => {
    if (state?.outcome !== 'ongoing') return;
    if (activeId && aliveAllies.some((a) => a.id === activeId)) return;
    const next = aliveAllies.find((a) => !commands[a.id]) ?? null;
    setActiveId(next ? next.id : null);
  }, [state, aliveAllies, activeId, commands]);

  const allAssigned =
    aliveAllies.length > 0 && aliveAllies.every((a) => commands[a.id] !== undefined);

  const assign = useCallback(
    (charId: string, cmd: AllyCmd) => {
      const nextCommands = { ...commands, [charId]: cmd };
      setCommands(nextCommands);
      setSkillMenu(false);
      // 次の未入力キャラへ
      const next = aliveAllies.find((a) => a.id !== charId && !nextCommands[a.id]);
      setActiveId(next ? next.id : null);
    },
    [commands, aliveAllies]
  );

  const finish = useCallback(
    async (final: BattleState) => {
      setBusy(true);
      if (final.outcome === 'lose') {
        await applyAndPersist((s) => returnToTown(applyBattleResult(s, final)));
        navigate('/town');
      } else {
        await applyAndPersist((s) => applyBattleResult(s, final));
        navigate('/dungeon');
      }
    },
    [applyAndPersist, navigate]
  );

  const resetInput = useCallback(() => {
    setCommands({});
    setSkillMenu(false);
    setActiveId(aliveAllies[0]?.id ?? null);
  }, [aliveAllies]);

  const handleResolve = useCallback(() => {
    if (!state || !rngRef.current || state.outcome !== 'ongoing') return;
    const tgt = targetId ?? aliveEnemies[0]?.id ?? '';
    const list: BattleCommand[] = aliveAllies.map((a): BattleCommand => {
      const c = commands[a.id] ?? { kind: 'attack' };
      if (c.kind === 'guard') return { kind: 'guard', actorId: a.id };
      if (c.kind === 'skill')
        return { kind: 'skill', actorId: a.id, skillId: c.skillId, targetId: tgt };
      return { kind: 'attack', actorId: a.id, targetId: tgt };
    });
    const nextState = resolveTurn(state, list, rngRef.current);
    setState(nextState);
    setCommands({});
    setSkillMenu(false);
    setActiveId(null);
  }, [state, commands, targetId, aliveAllies, aliveEnemies]);

  const handleFlee = useCallback(() => {
    if (!state || !rngRef.current || state.outcome !== 'ongoing') return;
    const a = aliveAllies[0];
    if (!a) return;
    setState(resolveTurn(state, [{ kind: 'flee', actorId: a.id }], rngRef.current));
    setCommands({});
    setActiveId(null);
  }, [state, aliveAllies]);

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

  const cmdLabel = (a: Combatant): string => {
    const c = commands[a.id];
    if (!c) return '';
    if (c.kind === 'attack') return '攻撃';
    if (c.kind === 'guard') return '防御';
    return BATTLE_SKILLS[c.skillId]?.name ?? 'スキル';
  };

  const active = activeId ? aliveAllies.find((a) => a.id === activeId) : undefined;
  const targetName = state.enemies.find((e) => e.id === targetId)?.name ?? '-';
  const rewards = battleRewards(state);

  const renderCard = (a: Combatant) => (
    <button
      type="button"
      key={a.id}
      className={[
        styles.card,
        a.isDown ? styles.down : '',
        activeId === a.id ? styles.cardActive : '',
        commands[a.id] ? styles.cardDecided : '',
      ].join(' ')}
      disabled={a.isDown || state.outcome !== 'ongoing'}
      onClick={() => {
        setActiveId(a.id);
        setSkillMenu(false);
      }}
    >
      <div className={styles.cardName}>
        {a.name}
        {a.unionGauge >= 100 ? <span className={styles.uni}>★</span> : null}
      </div>
      <StatBar
        value={a.hp}
        max={a.maxHp}
        color="#4caf50"
        showValue={false}
      />
      <StatBar
        value={a.tp}
        max={a.maxTp}
        color="#2196f3"
        showValue={false}
      />
      <div className={styles.cardNums}>
        HP {Math.max(0, a.hp)} · TP {a.tp}
      </div>
      {commands[a.id] ? <div className={styles.cardCmd}>▶ {cmdLabel(a)}</div> : null}
    </button>
  );

  const front = state.allies.filter((a) => a.row === 'front');
  const back = state.allies.filter((a) => a.row === 'back');

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

      {/* 味方: 前衛/後衛の2段 */}
      <div className={styles.party}>
        <div className={styles.rowTag}>前衛</div>
        <div className={styles.cardRow}>{front.map(renderCard)}</div>
        <div className={styles.rowTag}>後衛（近接ダメージ -30%）</div>
        <div className={styles.cardRow}>
          {back.length > 0 ? back.map(renderCard) : <div className={styles.empty}>（なし）</div>}
        </div>
      </div>

      {/* コマンド入力 / 実行 / 結果 */}
      {state.outcome !== 'ongoing' ? (
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
            className={styles.primary}
            disabled={busy}
            onClick={() => void finish(state)}
          >
            つづける
          </button>
        </div>
      ) : (
        <div className={styles.command}>
          <div className={styles.target}>対象: {targetName}（敵をタップで変更）</div>
          {active ? (
            <>
              <div className={styles.cmdHead}>{active.name} のコマンド</div>
              {skillMenu ? (
                <div className={styles.skillList}>
                  {usableSkills(active).map((sid) => (
                    <button
                      type="button"
                      key={sid}
                      className={styles.skillBtn}
                      onClick={() => assign(active.id, { kind: 'skill', skillId: sid })}
                    >
                      <span className={styles.skillTop}>
                        <span className={styles.skillName}>{BATTLE_SKILLS[sid].name}</span>
                        <span className={styles.tp}>TP {BATTLE_SKILLS[sid].tpCost(1)}</span>
                      </span>
                      <span className={styles.skillDesc}>{SKILLS[sid]?.description ?? ''}</span>
                    </button>
                  ))}
                  {usableSkills(active).length === 0 ? (
                    <div className={styles.empty}>使えるスキルがない</div>
                  ) : null}
                  <button
                    type="button"
                    className={styles.menuBack}
                    onClick={() => setSkillMenu(false)}
                  >
                    もどる
                  </button>
                </div>
              ) : (
                <div className={styles.menu}>
                  <button
                    type="button"
                    className={styles.menuBtn}
                    onClick={() => assign(active.id, { kind: 'attack' })}
                  >
                    攻撃
                  </button>
                  <button
                    type="button"
                    className={styles.menuBtn}
                    onClick={() => assign(active.id, { kind: 'guard' })}
                  >
                    防御
                  </button>
                  <button
                    type="button"
                    className={styles.menuBtn}
                    disabled={usableSkills(active).length === 0}
                    onClick={() => setSkillMenu(true)}
                  >
                    スキル
                  </button>
                  <button
                    type="button"
                    className={styles.menuBtn}
                    onClick={handleFlee}
                  >
                    逃走
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.execRow}>
              <button
                type="button"
                className={styles.redo}
                onClick={resetInput}
              >
                やり直す
              </button>
              <button
                type="button"
                className={styles.primary}
                disabled={!allAssigned}
                onClick={handleResolve}
              >
                実行
              </button>
            </div>
          )}
        </div>
      )}

      {/* ログ（最下部・残りエリアを使用） */}
      <div className={styles.log}>
        {state.log.length === 0 ? (
          <div className={styles.logLine}>てきが あらわれた！（{state.turn} ターン目）</div>
        ) : (
          state.log.map((l, i) => (
            <div
              key={i}
              className={styles.logLine}
            >
              {l.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
