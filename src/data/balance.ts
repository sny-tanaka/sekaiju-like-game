// ============================================================================
// 暫定バランス定数（設計書 06 §3.1）
// 調整の起点。マジックナンバーを散らさず、この1ファイルに集約する。
// 「式の構造」は確定済みで、係数だけを後でプレイテストして上書きする方針。
// ============================================================================

export const BALANCE = {
  LEVEL_CAP: 100,
  BOSS_INTERVAL: 10, // 何階ごとにボス階か（=ワープ間隔）
  BAND_SIZE: 10, // 敵プール帯の幅
  ENEMY_SCALE_K: 0.05, // enemyScale の1層あたり伸び（0.06 → 0.05）
  // 成長（[01 §5]）: 素ステは線形。stat(Lv) = base + growth*(Lv-1)
  // 経験値（[01 §5]）: expToNext(Lv) = round(EXP_CURVE_BASE * Lv^EXP_CURVE_POW)
  EXP_CURVE_BASE: 14, // 20 → 14
  EXP_CURVE_POW: 1.52, // 1.6 → 1.52
  // レベルアップ時の獲得 SP（平均）。Lv100 で総 SP ≈ 160 になるよう調整（端数は累計を四捨五入し、
  // 各レベルアップで +1 か +2 を配分する。spTotalForLevel / spGainOnLevelUp 参照）。
  SP_PER_LEVEL: 1.62,
  // ダメージ（[03 §7]）: 除算型
  DAMAGE_DEF_K: 120, // 100 → 120
  CRIT_MULT: 1.5,
  WEAK_MULT: 1.5,
  RESIST_MULT: 0.5,
  BACK_ROW_MELEE_MULT: 0.7, // 後衛の近接被弾/与弾減衰（攻撃側・防御側で独立に乗算）
  DMG_VARIANCE: [0.95, 1.05] as const,
  // 命中（物理。[03 §7]）: hit = clamp(BASE_HIT + (acc-eva)*HIT_AGI_K - 盲目, HIT_MIN, 1)
  BASE_HIT: 0.9,
  HIT_AGI_K: 0.01,
  HIT_MIN: 0.3,
  BLIND_ACC_PENALTY: 0.5,
  // クリティカル（[03 §7]）
  CRIT_BASE: 0.05,
  CRIT_LUC_K: 0.005,
  CRIT_MIN: 0.02,
  CRIT_MAX: 0.5,
  // 状態異常（[03 §6.2]）
  AILMENT_LUC_K: 0.01,
  AILMENT_MAX: 0.95,
  PARALYSIS_SKIP: 0.3, // 麻痺で行動不能になる確率
  POISON_HP_RATIO: 0.03, // 毒の毎ターン割合ダメージ（magnitude 未指定時）（§15: 0.05→0.03）
  // 戦闘中の TP 自然回復は廃止（issue #57 第2弾）。TP はアイテム/スキルで管理する。
  // ユニオン（[03 §9]）
  UNION_GAIN_PER_ACTION: [5, 15] as const,
  UNION_GAIN_ON_WIN: 15,
  // 下層ファーム減衰（[06 §9-7]）
  FARM_EXP_DECAY_PER_BAND: 0.85,
  // ▼ 新規（§1 / §7.4 / §10）
  ENEMY_ATTACK_POWER: 1.0, // 敵通常攻撃の倍率（将来微調整用）
  HEAL_MATK_COEF_ONE: 0.7, // 単体回復＝flat + casterMatk*coef（§7.4）
  HEAL_MATK_COEF_ALL: 0.45, // 全体回復
  HEAL_MATK_COEF_MINOR: 0.3, // 歌・救護等の軽回復
  SURPLUS_SP_PER_STAT: 4, // 余剰SP 4 ごとに全ステ +1（§10）
} as const;

// ----------------------------------------------------------------------------
// 適正レベル・ティア スケジュール（§2）
// ----------------------------------------------------------------------------

/** 各ボス階の (適正Lv, 想定装備ティア)。ゲームロジックは参照しないが、テストが参照する。 */
export const APPROPRIATE: Record<number, { lv: number; tier: number }> = {
  10: { lv: 12, tier: 1 },
  20: { lv: 23, tier: 2 },
  30: { lv: 35, tier: 3 },
  40: { lv: 47, tier: 4 },
  50: { lv: 60, tier: 5 },
  60: { lv: 72, tier: 5 },
  70: { lv: 83, tier: 5 },
  80: { lv: 92, tier: 5 },
  90: { lv: 98, tier: 5 },
  100: { lv: 100, tier: 5 },
};

// ----------------------------------------------------------------------------
// 初期セーブ関連（設計書 05 §4.1 / 07 §4 ＋ ユーザー確定事項）
// ----------------------------------------------------------------------------

/** ニューゲーム開始時の所持金（確定）。 */
export const STARTING_GOLD = 500;

// 初期パーティは 0 人（確定）。初期キャラはプレイヤーがギルドで自分で作成する。
// 団員が 0 人の間はギルドメニュー以外（ダイブ・ショップ等）を使えない。

/** ギルドのメンバー上限（[01 §9]）。 */
export const GUILD_MEMBER_LIMIT = 30;

/** 出撃パーティの最大人数（前衛・後衛それぞれ最大3、合計は5まで）。 */
export const FORMATION_FRONT_SLOTS = 3;
export const FORMATION_BACK_SLOTS = 3;
/** 出撃パーティの合計人数上限（各列は最大3だが合計は5まで）。 */
export const PARTY_MAX = 5;

// ----------------------------------------------------------------------------
// 進行解放トリガー（設計書 06 §8。到達階でシステムを解放する）
// ----------------------------------------------------------------------------

// 種族・職業の選択は作成時から自由（全体ゲートなし）。
// 個別の「条件付き職業」の解放階は今後 ClassMaster 側に定義しうる（[01 §4]）。
export const UNLOCK = {
  TITLE_DEPTH: 20, // 称号（第2スキルツリー）解放
  REBIRTH_MIN_LEVEL: 100, // 転生可能レベル（Lv上限到達時のみ）
} as const;

/** 転生（[01 §7]）。Lv100到達時のみ・Lv1再スタート・永続ボーナスは累積。 */
export const REBIRTH = {
  /** 1回の転生で配る「全ステ合計」ボーナスポイント（= 基準 30 × 8 ステ）。種族の成長傾向で按分する。 */
  STAT_TOTAL: 240,
  /** 1回の転生で得る追加 SP（種族非依存・固定・累積）。 */
  BONUS_SP: 10,
} as const;

/** 転職時のレベル低下（[01 §6]）。 */
export const CLASS_CHANGE_LEVEL_PENALTY = 5;
/** 称号習得時のボーナス SP（[01 §8]）。 */
export const TITLE_BONUS_SP = 5;

// ----------------------------------------------------------------------------
// 鍛冶（[04 §4]）
// ----------------------------------------------------------------------------

export const FORGE = {
  MAX_LEVEL: 5, // 強化上限 +5
  /** 強化値1あたりの ATK/MAT 上昇（武器は両方、防具は DEF/MDF に適用）。 */
  STAT_PER_LEVEL: 2,
  /** ティア連動係数: 強化+1の上昇 = round(STAT_PER_LEVEL * TIER_STEP^equipTier)（§7.3）。 */
  TIER_STEP: 1.6,
  /** インゴット種別の強化量（[04 §4.1]）。 */
  INGOT_INC: { copper: 1, silver: 3, gold: 5 } as const,
  /** 断片が何個でインゴット1個に自動変換されるか（[04 §4.2]）。 */
  FRAGMENTS_PER_INGOT: 10,
} as const;

// ----------------------------------------------------------------------------
// 派生ヘルパ（式の形を1か所に置く）
// ----------------------------------------------------------------------------

/** ボス階かどうか（depth が BOSS_INTERVAL の倍数）。 */
export const isBossFloor = (depth: number): boolean =>
  depth > 0 && depth % BALANCE.BOSS_INTERVAL === 0;

/** その階の敵プール帯（0 始まり）。 */
export const encounterTier = (depth: number): number => Math.floor((depth - 1) / BALANCE.BAND_SIZE);

/** 次のレベルに必要な経験値（[01 §5]）。 */
export const expToNext = (level: number): number =>
  Math.round(BALANCE.EXP_CURVE_BASE * Math.pow(level, BALANCE.EXP_CURVE_POW));

/**
 * その Lv 到達時点で得ている総 SP（[01 §5]）。平均 SP_PER_LEVEL を線形に累計し四捨五入。
 * Lv1=0、Lv100≈160。SP 総量の正準はこの関数（per-level の加算ではなく累計で持つ）。
 */
export const spTotalForLevel = (level: number): number =>
  Math.round(BALANCE.SP_PER_LEVEL * Math.max(0, level - 1));

/** Lv (level-1)→level に上がった時に得る SP（累計の差分。+1 か +2）。 */
export const spGainOnLevelUp = (newLevel: number): number =>
  spTotalForLevel(newLevel) - spTotalForLevel(newLevel - 1);

/** レベル上限（100）に達したキャラは経験値を獲得しない（確定。[01 §5]）。 */
export const canGainExp = (level: number): boolean => level < BALANCE.LEVEL_CAP;

/** 出現階に応じた敵ステータス係数（[06 §3]）。 */
export const enemyScale = (depth: number, refDepth: number): number =>
  1 + BALANCE.ENEMY_SCALE_K * (depth - refDepth);

// ----------------------------------------------------------------------------
// スキルTP消費算定係数（設計書: dev-docs/tp-cost-model.md §1）
// computeSkillTpCost が参照する係数オブジェクト。値の意味は設計書を参照。
// 係数の最終調整は balanceSim を回してディレクターが iterate する。
// ----------------------------------------------------------------------------

/** TP消費算定の効果別係数（初期値）。 */
export const SKILL_TP = {
  Kd: 2.83, // damage 係数（200%=TP16 を固定して再フィット）
  Pd: 2.5, // damage 指数（power^Pd）。高威力の効率低下を緩やかに（3→2.5）
  Kh: 0.35, // heal 係数
  Ka: 8, // ailment 係数
  Kb: 15, // buff/debuff 係数
  Ksummon: 14, // summon 固定値
  Kcounter: 2.5, // counter 係数
  Kchase: 2.0, // chase 係数
  Kdecoy: 2.5, // decoy 係数
  Kbarrier: 0.3, // barrier 係数
  Kregen: 0.4, // regen 係数
  Kcleanse: 6, // cleanse 係数
  Krevive: 12, // revive 固定部分
  Kreviveratio: 0.15, // revive 割合部分
} as const;

/** 状態異常の強さ（ailment TP価値の乗数）。 */
export const AILMENT_SEVERITY: Record<string, number> = {
  headBind: 1.0,
  armBind: 1.0,
  legBind: 1.0,
  sleep: 1.3,
  paralysis: 1.2,
  instantDeath: 2.5,
  poison: 0.5,
  blind: 0.7,
  confusion: 0.9,
  curse: 0.8,
};
