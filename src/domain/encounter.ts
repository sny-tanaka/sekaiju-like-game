import type { Rng } from '@/domain/types';

// ============================================================================
// エンカウント（エネミーアピアランス、設計書 02 §5）。
// 「いきなり」ではなく予兆ゲージで可視化。満タン（残り0）まで安全。
// 内部値 stepsUntilEncounter は diveState.encounter に保存される。
// ============================================================================

/** 区間ごとの初期残り歩数のレンジ（暫定）。 */
const MIN_STEPS = 8;
const MAX_STEPS = 16;

/** ゲージの段階数（02 §5: 5段階表示）。 */
export const GAUGE_LEVELS = 5;

/**
 * 区間開始時（戦闘後・階移動・離脱後）の残り歩数を抽選する。
 * encounterRateDecay を渡すと歩数を decay で割って延長する（過レベル時に敵が出にくくなる）。
 * decay の下限は 0.25（歩数が 4 倍止まり）。
 */
export function initEncounter(rng: Rng, opts?: { encounterRateDecay?: number }): number {
  const base = rng.range(MIN_STEPS, MAX_STEPS);
  const decay = opts?.encounterRateDecay ?? 1;
  const effective = Math.max(0.25, decay);
  return Math.round(base / effective);
}

/**
 * 1歩進めた結果を返す。残り0でエンカウント発生→区間リセット（新しい残り歩数を抽選）。
 * 満タン前（triggered=false）は安全に動ける。
 */
export function onStep(
  stepsUntilEncounter: number,
  rng: Rng
): { stepsUntilEncounter: number; triggered: boolean } {
  const next = stepsUntilEncounter - 1;
  if (next <= 0) {
    return { stepsUntilEncounter: initEncounter(rng), triggered: true };
  }
  return { stepsUntilEncounter: next, triggered: false };
}

/**
 * ゲージの充填段階（0..GAUGE_LEVELS）。残りが少ないほど満タンに近い。
 * プレイヤーには「あと何歩か」は見せず、5段階の充填率だけ見せる親切設計。
 */
export function gaugeLevel(stepsUntilEncounter: number): number {
  const filled = Math.max(0, MAX_STEPS - stepsUntilEncounter);
  const level = Math.round((filled / MAX_STEPS) * GAUGE_LEVELS);
  return Math.min(GAUGE_LEVELS, Math.max(0, level));
}
