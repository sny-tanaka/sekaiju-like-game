// ============================================================================
// 暫定バランス定数（設計書 06 §3.1）
// 調整の起点。マジックナンバーを散らさず、この1ファイルに集約する。
// 「式の構造」は確定済みで、係数だけを後でプレイテストして上書きする方針。
// ============================================================================

export const BALANCE = {
  LEVEL_CAP: 100,
  BOSS_INTERVAL: 10, // 何階ごとにボス階か（=ワープ間隔）
  BAND_SIZE: 10, // 敵プール帯の幅
  ENEMY_SCALE_K: 0.06, // enemyScale の1層あたり伸び
  // 成長（[01 §5]）: 素ステは線形。stat(Lv) = base + growth*(Lv-1)
  // 経験値（[01 §5]）: expToNext(Lv) = round(EXP_CURVE_BASE * Lv^EXP_CURVE_POW)
  EXP_CURVE_BASE: 20,
  EXP_CURVE_POW: 1.6,
  SP_PER_LEVEL: 3, // レベルアップ時の獲得 SP（暫定）
  // ダメージ（[03 §7]）: 除算型
  DAMAGE_DEF_K: 100, // dmg = base * K/(K+def)
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
  POISON_HP_RATIO: 0.05, // 毒の毎ターン割合ダメージ（magnitude 未指定時）
  // TP 自然回復（[03 §2] ターン終了処理）: 毎ターン maxTp の割合だけ回復
  TP_REGEN_RATIO: 0.05,
  // ユニオン（[03 §9]）
  UNION_GAIN_PER_ACTION: [5, 15] as const,
  UNION_GAIN_ON_WIN: 15,
  // 下層ファーム減衰（[06 §9-7]）
  FARM_EXP_DECAY_PER_BAND: 0.85,
} as const;

// ----------------------------------------------------------------------------
// 初期セーブ関連（設計書 05 §4.1 / 07 §4 ＋ ユーザー確定事項）
// ----------------------------------------------------------------------------

/** ニューゲーム開始時の所持金（確定）。 */
export const STARTING_GOLD = 500;

// 初期パーティは 0 人（確定）。初期キャラはプレイヤーがギルドで自分で作成する。
// 団員が 0 人の間はギルドメニュー以外（ダイブ・ショップ等）を使えない。

/** ギルドのメンバー上限（[01 §9]）。 */
export const GUILD_MEMBER_LIMIT = 30;

/** 出撃パーティの最大人数（前衛3 + 後衛2 = 5。確定）。 */
export const FORMATION_FRONT_SLOTS = 3;
export const FORMATION_BACK_SLOTS = 2;
export const PARTY_MAX = FORMATION_FRONT_SLOTS + FORMATION_BACK_SLOTS;

// ----------------------------------------------------------------------------
// 進行解放トリガー（設計書 06 §8。到達階でシステムを解放する）
// ----------------------------------------------------------------------------

// 種族・職業の選択は作成時から自由（全体ゲートなし）。
// 個別の「条件付き職業」の解放階は今後 ClassMaster 側に定義しうる（[01 §4]）。
export const UNLOCK = {
  TITLE_DEPTH: 20, // 称号（第2スキルツリー）解放
  REBIRTH_MIN_LEVEL: 30, // 転生可能な最低レベル
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

/** レベル上限（100）に達したキャラは経験値を獲得しない（確定。[01 §5]）。 */
export const canGainExp = (level: number): boolean => level < BALANCE.LEVEL_CAP;

/** 出現階に応じた敵ステータス係数（[06 §3]）。 */
export const enemyScale = (depth: number, refDepth: number): number =>
  1 + BALANCE.ENEMY_SCALE_K * (depth - refDepth);
