// ============================================================================
// 共通型定義（全ドキュメント共有の正準）
// 設計書: design-docs/05-progression-meta.md §0 を唯一の正準として実装に落とす。
// ※ enum は使わない（tsconfig erasableSyntaxOnly のため）。文字列ユニオンで表現する。
// ============================================================================

// ----------------------------------------------------------------------------
// 0.1 ステータス Stats（能力名はこの1セットに固定）
// ----------------------------------------------------------------------------

/** キャラ・敵の「素の能力値」。表記揺れはこの定義に統一する。 */
export interface Stats {
  hp: number; // 体力（0で戦闘不能）
  tp: number; // 技ポイント（スキル消費）
  str: number; // 腕力 → 物理攻撃力の素
  vit: number; // 体力/頑健 → 物理防御の素
  agi: number; // 敏捷 → 行動順・命中・回避
  int: number; // 知力 → 魔法攻撃力の素
  mnd: number; // 精神 → 魔法防御の素
  luc: number; // 幸運 → 状態異常成否・クリティカル
}

export type StatKey = keyof Stats;

// ----------------------------------------------------------------------------
// 0.4 乱数 Rng（決定論・テスト再現の前提）。実装は src/domain/rng.ts。
// ----------------------------------------------------------------------------

export interface Rng {
  next(): number; // [0,1)
  int(maxExclusive: number): number;
  range(minInclusive: number, maxInclusive: number): number;
  pick<T>(items: T[]): T;
  fork(label: string): Rng; // 用途別に分岐した子 Rng を得る
  readonly state: number; // セーブ/再開用にシリアライズ可能
}

/** レベルごとの上昇量。computeBaseStats で Lv に掛けて使う。 */
export type StatGrowth = Record<StatKey, number>;

// ----------------------------------------------------------------------------
// 0.2 戦闘派生値 DerivedCombat / 装備ボーナス EquipBonuses
// ----------------------------------------------------------------------------

/** 素ステータス＋装備＋バフから戦闘時に算出する最終値（保存しない）。 */
export interface DerivedCombat {
  patk: number; // 物理攻撃力
  pdef: number; // 物理防御力
  matk: number; // 魔法攻撃力
  mdef: number; // 魔法防御力
  hit: number;
  acc: number;
  eva: number;
  crit: number;
}

/** 装備が与えるフラットボーナス。 */
export interface EquipBonuses {
  atk?: number;
  mat?: number;
  def?: number;
  mdf?: number;
  statMods?: Partial<Stats>; // 「STR+5」等の素ステ補正
}

// ----------------------------------------------------------------------------
// 0.3 属性・対象・状態異常・バフ
// ----------------------------------------------------------------------------

export type PhysElement = 'slash' | 'pierce' | 'bash'; // 斬/突/壊
export type MagElement = 'fire' | 'ice' | 'volt'; // 火/氷/雷（拡張可）
export type Element = PhysElement | MagElement | 'almighty'; // almighty=無属性貫通

export type TargetType = 'enemyOne' | 'enemyRow' | 'enemyAll' | 'allyOne' | 'allyAll' | 'self';

export type AilmentType =
  | 'poison'
  | 'paralysis'
  | 'sleep'
  | 'confusion'
  | 'curse'
  | 'blind'
  | 'instantDeath'
  | 'headBind'
  | 'armBind'
  | 'legBind';

export type BuffStatTarget = 'patk' | 'pdef' | 'matk' | 'mdef' | 'acc' | 'eva' | 'elementResist';

/** 戦闘中に付与される状態異常の実行時表現（[03 §6]）。 */
export interface ActiveAilment {
  type: AilmentType;
  remainingTurns: number;
  magnitude?: number; // 毒ダメージ量など
}

/** 強化/弱体（[03 §6.3]）。残りターン制。同 stackGroup は強い方を1つ保持。 */
export interface ActiveBuff {
  stat: BuffStatTarget;
  modifier: number; // 倍率（例 1.3 / 0.7）。1要素あたり 0.5〜1.5 にクランプ
  remainingTurns: number;
  stackGroup: string; // 'atkBuff' / 'defDebuff' 等
}

/**
 * 反応系の戦闘状態（[03 §6.5]）。反撃／連携追撃／挑発／障壁。残りターン制。
 * バフ/状態異常とは別管理（属性条件・残量を持つため）。保存しない（戦闘内のみ）。
 */
export type CombatState =
  | {
      kind: 'counter';
      chance: number;
      power: number;
      statBase: 'str' | 'int';
      remainingTurns: number;
    }
  | {
      kind: 'chase';
      element: Element;
      power: number;
      statBase: 'str' | 'int';
      remainingTurns: number;
    }
  | { kind: 'decoy'; weight: number; remainingTurns: number }
  | { kind: 'barrier'; absorb: number; remainingTurns: number };

// ----------------------------------------------------------------------------
// 戦闘の実行時モデル（[03]）。保存しない（戦闘開始時に生成・終了時に結果を反映）。
// ----------------------------------------------------------------------------

export type Row = 'front' | 'back';
export type Side = 'ally' | 'enemy';

export interface Combatant {
  id: string; // 戦闘内で一意（味方は charId、敵は 'enemy_0' 等）
  name: string;
  side: Side;
  row: Row;
  stats: Stats; // 装備・成長込みの最終素ステータス（敵はスケール後）
  equip: EquipBonuses; // 装備の戦闘派生ボーナス（敵は空）
  hp: number;
  maxHp: number;
  tp: number;
  maxTp: number;
  buffs: ActiveBuff[];
  ailments: ActiveAilment[];
  /** 反応系の戦闘状態（反撃/連携/挑発/障壁。[03 §6.5]）。 */
  states?: CombatState[];
  /** パッシブスキル由来の常時倍率（[01 §5]・[03 §5.4]）。戦闘員生成時に確定。 */
  passive?: PassiveMods;
  unionGauge: number; // 0..100
  isDown: boolean;
  enemyId?: EnemyId; // 敵のみ
  /** 敵の属性倍率（弱点1.5 / 耐性0.5 / 無効0。未指定は等倍1.0）。 */
  resist?: Partial<Record<Element, number>>;
  /** 召喚体か（[03 §8]）。true のとき summonKind / ownerId を持つ。 */
  isSummon?: boolean;
  summonKind?: SummonKind; // 召喚体の種別（SUMMONS マスター参照）
  ownerId?: string; // 召喚主の charId
  /** 敵スキルAI のアクション状態（§3）。戦闘中のみ。SaveData には出さない。 */
  actionState?: Record<string, { lastUsedTurn: number; uses: number }>;
  /** 状態異常付与率倍率（[06 §15]）。敵=系統+種別デフォルト/味方=種族。0=完全無効。戦闘中のみ。 */
  ailmentResist?: Partial<Record<AilmentType, number>>;
}

export interface DamageResult {
  damage: number;
  hit: boolean;
  critical: boolean;
}

// ----------------------------------------------------------------------------
// 0.5 ID 規約・座標キー
// ----------------------------------------------------------------------------

export type Dir = 'N' | 'E' | 'S' | 'W';

export type RaceId = string;
export type ClassId = string;
/** 称号 ID は職業 ID と別空間にする（[05 §0.5]）。 */
export type TitleId = string;
export type SkillId = string;
export type EnemyId = string;
export type ItemId = string;
export type SummonKind = string;

/** `cellKey` の正準形は `"x,y"`（カンマ区切り・ゼロ埋めなし）。 */
export type CellKey = string;

/** 座標 → cellKey。Set<CellKey> 保存時の正準化に使う。 */
export const cellKey = (x: number, y: number): CellKey => `${x},${y}`;

// ============================================================================
// マスターデータ型（src/data/ に Record<Id, Master> として配置）
// ============================================================================

export type WeaponType = 'sword' | 'spear' | 'axe' | 'bow' | 'staff' | 'fist';
export type ArmorType = 'heavy' | 'light' | 'clothes';
export type EquipSlotKey = 'weapon' | 'armor' | 'accessory';

/** スキルツリー定義（Phase 3 で本格利用。Phase 0 は枠のみ）。 */
export interface SkillTreeNode {
  skillId: SkillId;
  maxLevel: number;
  /** 前提スキル（指定 Lv 以上の習得が必要）。 */
  requires?: { skillId: SkillId; level: number }[];
}
export interface SkillTreeDef {
  skills: SkillTreeNode[];
}

/**
 * パッシブスキルの常時倍率（[03 §5.4]）。戦闘員生成時に学習Lvから合算する。
 * combat 系（patk/matk/pdef/mdef/acc/eva）と最大HP/TP・クリ率に作用する。
 * 値は「倍率」（1.0=無効果）。複数パッシブは乗算合成。
 */
export interface PassiveMods {
  patk?: number;
  matk?: number;
  pdef?: number;
  mdef?: number;
  acc?: number;
  eva?: number;
  maxHp?: number;
  maxTp?: number;
  crit?: number; // クリ率への加算（割合）。例 0.05 = +5%
}

/**
 * パッシブスキル定義（[03 §5.4]）。BATTLE_SKILLS とは別レジストリ（戦闘中に「撃つ」ものではない）。
 * mods は学習Lvに応じた常時倍率を返す。weaponType 指定時は対応武器の装備中のみ有効（武器マスタリー）。
 */
export interface PassiveSkillDef {
  id: SkillId;
  name: string;
  tree: 'base' | 'master' | 'race' | 'title';
  weaponType?: WeaponType; // 指定時はこの武器を装備中のみ有効
  mods: (lv: number) => PassiveMods;
}

export interface RaceMaster {
  id: RaceId;
  name: string;
  statGrowth: StatGrowth; // Lv ごとの各能力上昇量
  baseStatsAtLv1: Stats;
  raceSkillTree: SkillTreeDef; // 種族固有スキルツリー（ユニオンスキル・採集スキル等を含む）
  /** 種族の属性被ダメ倍率（[06 §15]。敵 resist と同形。未指定=1.0）。 */
  elementResist?: Partial<Record<Element, number>>;
  /** 種族の状態異常付与率倍率（[06 §15]。0=完全無効。未指定=1.0）。 */
  ailmentResist?: Partial<Record<AilmentType, number>>;
  /** 作成時に割り当てられる既定職業（[01 §4]）。Phase 0 の初期パーティ生成に使う。 */
  defaultClassId: ClassId;
}

export interface ClassMaster {
  id: ClassId;
  name: string;
  skillTree: SkillTreeDef; // 基本スキル + 達人スキル
  equipableWeaponTypes: WeaponType[];
  equipableArmorTypes: ArmorType[];
  titleOptions: [TitleId, TitleId]; // この職業が選べる称号2種
}

export interface TitleMaster {
  id: TitleId;
  name: string;
  parentClassId: ClassId;
  skillTree: SkillTreeDef;
  growthModifier: StatGrowth; // 成長傾向の補正
}

export interface SkillMaster {
  id: SkillId;
  name: string;
  description: string;
}

export interface EnemyMaster {
  id: EnemyId;
  name: string;
  baseStats: Stats; // 基準値
  refDepth: number; // 基準階（この階で baseStats 等倍）
  tierBand: number; // 主に出現する10層帯
  exp: number; // 撃破時の経験値（refDepth 基準。スケールは enemyScale 準拠）
  gold: number; // 撃破時の所持金
  attackElement?: PhysElement; // 通常攻撃の物理属性（既定 bash）
  resist?: Partial<Record<Element, number>>; // 属性倍率（弱点1.5/耐性0.5/無効0）
  /** 状態異常の付与率倍率（[06 §15]）。0=完全無効。未指定は kind 別デフォルト＋系統プロファイルで解決。 */
  ailmentResist?: Partial<Record<AilmentType, number>>;
  /** 通常ドロップ（[04 §7]）。rate=0..1。撃破時に rng で抽選。 */
  drops?: { itemId: ItemId; rate: number }[];
  /** 階層ボスか（[06 §4]）。雑魚プール除外・ボス配置の判定に使う。 */
  isBoss?: boolean;
  /**
   * 敵の役割（[06 §3]）。'zako'=ランダムエンカウント / 'foe'=フィールド徘徊（FOE・強敵）/ 'boss'=階層ボス。
   * 未指定は 'zako' 扱い。ボスは isBoss:true も併せて立てる。
   */
  kind?: 'zako' | 'foe' | 'boss';
  /** 敵スキルキット（§4）。ENEMY_KITS のキー。actions より低優先。 */
  kit?: string;
  /** 個別アクション定義（§4.3 ボス用）。kit より優先。 */
  actions?: EnemyActionDef[];
}

/**
 * 召喚体マスター（[03 §8]）。設置物／使い魔の素ステータスと挙動フラグ。
 * 召喚体は最前列の壁／攻撃役として扱う。
 */
export interface SummonMaster {
  id: SummonKind;
  name: string;
  baseStats: Stats; // 出現階でスケールする基準値（敵と同様に enemyScale を流用）
  refDepth: number;
  attackElement: PhysElement; // 自律攻撃の物理属性
  actsOnTurn: boolean; // 自律行動（true=毎ターン攻撃 / false=壁のみ）
  buffImmune: boolean; // 強化弱体が効かない個体か
  persistsAfterBattle: boolean; // 戦闘間（同一探索中）に残るか（使い魔系）
  persistsOutOfDungeon: boolean; // 拠点帰還後も残るか（MVP では未使用＝false 運用）
}

// ----------------------------------------------------------------------------
// 戦闘スキル定義（[03 §5]）。マスターデータ（関数値を含むため保存しない）。
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// 敵スキルAI（§3）
// ----------------------------------------------------------------------------

/**
 * 敵の1アクション定義（§3.1）。既存 SkillEffectDef[] を再利用。
 * target は陣営相対: enemyOne/enemyAll → 味方PTを攻撃 / self/allyAll → 自陣をバフ
 */
export interface EnemyActionDef {
  id: string;
  name: string;
  element: Element;
  target: TargetType;
  effects: SkillEffectDef[];
  weight: number; // 条件を満たすアクション間の重み付き抽選値（>0）
  cond?: EnemyActionCond;
}

/** 敵アクションの解禁条件（§3.1）。すべて省略可。 */
export interface EnemyActionCond {
  hpBelow?: number; // 自HP割合がこの値以下で解禁（例 0.5）
  hpAbove?: number; // 自HP割合がこの値以上で解禁
  cooldown?: number; // 使用後このターン数は再使用不可
  minTurn?: number; // 戦闘開始から minTurn ターン目以降で解禁（1始まり）
  maxUses?: number; // 1戦闘あたり使用回数上限
}

export type SkillEffectDef =
  | { kind: 'damage'; power: (lv: number) => number; statBase: 'str' | 'int'; hits?: number }
  | { kind: 'heal'; amount: (lv: number) => number; matkCoef?: 'one' | 'all' | 'minor' }
  | { kind: 'restoreTp'; amount: (lv: number) => number }
  | {
      kind: 'ailment';
      ailment: AilmentType;
      chance: (lv: number) => number;
      turns: number;
      magnitude?: number;
    }
  | {
      kind: 'buff';
      stat: BuffStatTarget;
      modifier: (lv: number) => number;
      turns: number;
      stackGroup: string;
    }
  | { kind: 'summon'; summonKind: SummonKind }
  // 反撃（[03 §6.5]）。付与中、対象が敵から被弾し生存している時に確率で反撃する。
  | {
      kind: 'counter';
      chance: (lv: number) => number;
      power: (lv: number) => number;
      statBase: 'str' | 'int';
      turns: number;
    }
  // 連携追撃（[03 §6.5]）。付与中、味方が同属性ダメージを敵に与えると追撃する。
  | {
      kind: 'chase';
      power: (lv: number) => number;
      statBase: 'str' | 'int';
      turns: number;
    }
  // 挑発（[03 §6.5]）。付与中、敵に狙われやすくなる（ターゲット重み増加）。
  | { kind: 'decoy'; weight: (lv: number) => number; turns: number }
  // 障壁（[03 §6.5]）。付与中、被弾ダメージを総量 absorb まで肩代わりする。
  | { kind: 'barrier'; absorb: (lv: number) => number; turns: number }
  // 状態異常治療（[03 §6.6]）。対象の状態異常（封じ含む）を解除する。
  | { kind: 'cleanse' };

export interface BattleSkillDef {
  id: SkillId;
  name: string;
  tree: 'base' | 'master' | 'race' | 'title';
  tpCost: (lv: number) => number;
  element: Element;
  target: TargetType;
  effects: SkillEffectDef[];
}

/**
 * ユニオンスキル定義（[03 §9]）。種族固有の必殺技。ユニオンゲージを消費。
 * 発動者はゲージ100%が条件。requiredParticipants 人（発動者含む）を選び、
 * 各自から gaugeCostPerParticipant を消費する（協力者は100%でなくてよい）。
 * 通常行動とは別枠で、宣言したターンの冒頭に解決する（行動を消費しない）。
 */
export interface UnionSkillDef {
  id: SkillId;
  name: string;
  description: string;
  raceId: RaceId; // 種族固有
  requiredParticipants: number; // 発動者を含む必要人数
  gaugeCostPerParticipant: number; // 各参加者から消費するゲージ
  element: Element;
  target: TargetType;
  effects: SkillEffectDef[];
}

// ----------------------------------------------------------------------------
// 戦闘コマンド・状態（実行時。保存しない）
// ----------------------------------------------------------------------------

export type BattleCommand =
  | { kind: 'attack'; actorId: string; targetId: string }
  | { kind: 'skill'; actorId: string; skillId: SkillId; targetId: string }
  | { kind: 'item'; actorId: string; itemId: ItemId; targetId: string }
  | { kind: 'guard'; actorId: string }
  | { kind: 'flee'; actorId: string }
  | {
      // ユニオンスキル（[03 §9]）。通常行動とは別枠でターン冒頭に解決する。
      kind: 'union';
      actorId: string; // 発動者（ゲージ100%が条件）
      unionSkillId: SkillId;
      participantIds: string[]; // 発動者を含む参加者（各自からゲージ消費）
      targetId: string;
    };

export type BattleOutcome = 'ongoing' | 'win' | 'lose' | 'fled';

/**
 * 戦闘突入時の先手（[03 §10]）。
 * - none: 通常（ランダムエンカウントや正面接触）
 * - preemptive: 先制（味方が初手に1巡先行＝敵はターン1行動不可）
 * - ambush: 不意打ち（敵が初手に1巡先行＝味方はターン1行動不可）
 */
export type FirstStrike = 'none' | 'preemptive' | 'ambush';

export interface BattleLogEntry {
  text: string;
  /**
   * このログ行が表示された時点の全戦闘員の HP/戦闘不能状態のスナップショット（issue #18）。
   * UI が行動を1行ずつ再生し、カードの HP バーを段階的に減らす/点滅させるために使う。
   * 戦闘エンジンが resolveTurn 内で各 push 時に記録する（保存しない）。
   */
  snapshot?: Record<string, { hp: number; isDown: boolean }>;
}

export interface BattleState {
  turn: number;
  depth: number;
  allies: Combatant[];
  enemies: Combatant[];
  /** 召喚体（[03 §8]）。最前列の壁/攻撃役。最大3体。味方の全滅判定には数えない。 */
  summons: Combatant[];
  log: BattleLogEntry[];
  outcome: BattleOutcome;
  /** 突入時の先手（[03 §10]）。FOE接触時に preemptive/ambush になる。 */
  firstStrike: FirstStrike;
  /** 撃破で抽選されたドロップ（勝利時に倉庫・図鑑へ反映）。 */
  drops: { enemyId: EnemyId; itemId: ItemId }[];
  /** 戦闘中に使用して消費したアイテム（終了時に倉庫から減算）。 */
  consumedItems: ItemId[];
}

export type ItemCategory = 'consumable' | 'material' | 'drop' | 'valuable' | 'food';

/**
 * 料理レシピ（[04 §6]）。食材を消費して上位の食材（料理）を作る。
 * 解放トリガーは到達階・ドロップ・購入等の非ストーリー手段（[06 §8]）。
 */
export interface RecipeMaster {
  id: string;
  name: string;
  ingredients: ItemStack[]; // 必要食材（foodStorage から消費）
  result: { itemId: ItemId; count: number };
  unlockedByDefault: boolean; // 初期から作れるか
}

export interface ItemMaster {
  id: ItemId;
  name: string;
  description: string;
  category: ItemCategory;
  buyPrice: number; // ショップ購入価格（売却はこの半額）。0=非売品
  /** 消費アイテムの使用効果（[03 §5] の SkillEffectDef を再利用）。 */
  effects?: SkillEffectDef[];
  /** 使用可能な場面。未指定は使用不可（素材等）。 */
  useContext?: ('battle' | 'field')[];
}

export interface EquipmentMaster {
  id: ItemId;
  name: string;
  slot: EquipSlotKey;
  tier: number; // 10層帯ティア（解放階＝tier*10 目安）
  buyPrice: number; // ショップ購入価格（売却は半額）
  weaponType?: WeaponType;
  armorType?: ArmorType;
  bonuses: EquipBonuses;
}

// ============================================================================
// キャラクター・ギルド（[01]）
// ============================================================================

/** 転生由来の補正（[01 §7]）。 */
export interface RebirthBonus {
  allStats: number; // 全能力に加算
  bonusSp: number; // 追加 SP
}

/**
 * 装備個体（[04 §4]）。鍛冶の強化値を個体ごとに持つため、装備は masterId 参照ではなく
 * インスタンスとして所有する（同じ装備でも +N が異なりうる）。
 */
export interface EquipInstance {
  id: string; // 個体一意 ID
  masterId: ItemId; // EQUIPMENT のマスター ID
  forgeLevel: number; // 強化値 0..5（[04 §4.1]）
  /** 周回グレード（[06 §3]）。未指定=1。ボーナスは ×(1+0.5*(grade-1))。名前に LvN を付す。 */
  grade?: number;
}

/** 装備中スロット。各スロットに装備個体（未装備は null）。 */
export type EquipmentSlots = Record<EquipSlotKey, EquipInstance | null>;

/**
 * キャラクターの永続データ。
 * ※ baseStats（素ステータス）/ DerivedCombat は保存せず computeBaseStats で導出する
 *   （[01 §2.2]: 保存するのは level/exp/learnedSkills/equipment/rebirthBonus 等の「入力」だけ）。
 */
export interface Character {
  id: string;
  name: string;
  raceId: RaceId; // 不変（作成時に確定）
  classId: ClassId; // 転職で変更される
  titleId: TitleId | null; // 称号（第2スキルツリー）。未習得は null
  level: number;
  exp: number;
  skillPoints: { total: number; spent: number };
  learnedSkills: Record<SkillId, number>; // skillId -> 習得 Lv
  equipment: EquipmentSlots;
  rebirthBonus?: RebirthBonus;
}

export interface PartyFormation {
  front: (string | null)[]; // 前衛スロット（characterId）
  back: (string | null)[]; // 後衛スロット
}

/** 所持アイテムのスタック（[04]）。 */
export interface ItemStack {
  itemId: ItemId;
  qty: number;
  /** 周回グレード（[06 §3]）。素材のみ使用。未指定=1。grade 違いは別スタック・名前に LvN。 */
  grade?: number;
}

export interface Guild {
  name: string;
  gold: number;
  members: Character[]; // 上限あり（例: 30）
  party: PartyFormation; // 出撃中の編成
  storage: ItemStack[]; // 預かり所（消費アイテム・素材。装備は equipment 個体で管理）
  /** 所有する未装備の装備個体（[04 §4]）。鍛冶・リサイクルの対象。 */
  equipment: EquipInstance[];
  /** 食材・料理の保管（[04 §6]）。アイテムと別枠・最大60個・売却不可。 */
  foodStorage: ItemStack[];
  /**
   * 図鑑。※正典は SaveData.bestiary（トップレベル）。こちらは後方互換のミラーで、
   * 読み取りは SaveData.bestiary を使う。新規の更新経路を guild 側に作らないこと。
   */
  bestiary: BestiaryState;
}

// ============================================================================
// 図鑑（[05 §2]）
// ============================================================================

export interface BestiaryState {
  monsters: Record<string, { seen: boolean; defeated: boolean; dropsFound: string[] }>;
  items: Record<string, boolean>;
}

// ============================================================================
// 探索・マッピング（[02]）。Phase 0 では型のみ用意し中身は Phase 1+ で生成。
// ============================================================================

export type FloorType = 'normal' | 'damage' | 'water' | 'dark' | 'oneway' | 'slippery' | 'pit';

export type CellEventRef =
  | { kind: 'stairsUp' }
  | { kind: 'stairsDown' }
  | { kind: 'chest'; chestId: string; tableId: string }
  | { kind: 'gather'; gatherId: string }
  | { kind: 'event'; eventId: string }
  | { kind: 'cookingSpot'; spotId: string }
  | { kind: 'shortcut'; shortcutId: string };

export interface Cell {
  walls: { N: boolean; E: boolean; S: boolean; W: boolean };
  floorType: FloorType;
  event?: CellEventRef;
  passable: boolean;
}

export type PatrolPattern =
  | { kind: 'static' }
  | { kind: 'loop'; waypoints: { x: number; y: number }[] }
  | { kind: 'wander' }
  | { kind: 'charge'; dir: Dir };

export interface FoeSpawn {
  id: string;
  enemyId: EnemyId;
  startCell: { x: number; y: number };
  patrol: PatrolPattern;
  moveSpeed: number;
  sightRange: number;
  respawn: boolean;
  /** 階層ボスか（[06 §4]）。撃破でゲート解放・ワープ解放・記録更新の対象。 */
  isBoss?: boolean;
}

export interface FoeRuntimeState {
  spawnId: string;
  cell: { x: number; y: number };
  defeated: boolean;
  alerted: boolean;
}

/** generateFloor(depth, rng) の生成物（[02 §2]・[06 §2]）。 */
/** 採集の系統（[04 §5]）。鉱石/採取/伐採＋食材系（釣り/収穫/狩猟）。 */
export type GatherType = 'mining' | 'gathering' | 'logging' | 'fishing' | 'harvest' | 'hunting';

/** 階に配置された採集ポイント（[04 §5]）。ドロップ表・必要スキルは GATHER_TYPES から引く。 */
export interface GatheringPoint {
  id: string;
  cell: { x: number; y: number };
  type: GatherType;
}

export interface FloorMaster {
  depth: number;
  width: number;
  height: number;
  cells: Cell[][]; // [y][x]
  encounterTable: string;
  foeSpawns: FoeSpawn[];
  /** 採集ポイント（[04 §5]）。cell には event {kind:'gather'} も併置される。 */
  gatheringPoints: GatheringPoint[];
  bgmId: string;
}

export interface WallEdge {
  x: number;
  y: number;
  side: 'N' | 'W';
  style?: 'solid' | 'dashed';
  colorId?: string;
}
export interface PlacedIcon {
  x: number;
  y: number;
  iconId: string;
}
export interface MapNote {
  x: number;
  y: number;
  text: string;
}
export interface AutoRoute {
  colorId: string;
  points: { x: number; y: number }[];
}

/** プレイヤーが手描きする地図レイヤー（[02 §4]）。 */
export interface PlayerMap {
  depth: number;
  floorPaint: (string | null)[][];
  wallDraw: WallEdge[];
  icons: PlacedIcon[];
  notes: MapNote[];
  autopilotRoutes: AutoRoute[];
}

// ============================================================================
// タワー進行（[06]）。ストーリー/クリアの代替。
// ============================================================================

/** 自動生成され初回固定保存される階＋ランタイム消化状態（[06 §2]）。 */
export interface TowerFloor {
  depth: number;
  seed: number;
  generated: FloorMaster; // 初回生成時に確定し以後は再生成しない
  isBossFloor: boolean; // depth % BOSS_INTERVAL === 0
  encounterTier: number; // floor((depth-1) / BAND_SIZE)
  foeRuntime: FoeRuntimeState[];
  openedChests: string[]; // 開封済み宝箱の cellKey
  depletedGathers: string[]; // 枯渇した採集点の cellKey
  consumedEvents: string[]; // 消化済みイベントの id（oneShot 用）
}

/** 階層ボスゲートの撃破状況（[06 §4]）。 */
export interface BossGateState {
  depth: number; // 10, 20, 30, ...
  defeated: boolean;
}

/** 解放済みワープチェックポイント（[06 §5]）。 */
export interface WarpState {
  unlockedCheckpoints: number[]; // [10, 20, 30, ...]
}

/** 最高到達階などのベスト記録（[06 §7]）。 */
export interface TowerRecord {
  deepestReached: number; // 最深踏破階
  highestBossDefeated: number; // 最高撃破ボス階
  totalDives: number; // 挑戦回数
  bossDefeatLog: { depth: number; at: number }[]; // 撃破履歴
}

export interface TowerState {
  floors: Record<number, TowerFloor>;
  bossGates: Record<number, BossGateState>;
  warp: WarpState;
  record: TowerRecord;
}

// ============================================================================
// 潜行（ダイブ）状態（[05 §4]）。拠点にいるときは null。
// ============================================================================

export interface DivePartyMember {
  charId: string;
  hp: number;
  tp: number;
  unionGauge: number; // 0..100
  ailments: ActiveAilment[];
}

/**
 * 戦闘をまたいで残る召喚体のスナップショット（[03 §8]）。
 * persistsAfterBattle な召喚体を diveState に保存し、次戦闘で復元する。
 */
export interface SummonSnapshot {
  summonKind: SummonKind;
  ownerId: string;
  hp: number;
}

/**
 * FOE 接触で発生した戦闘の予約（[02 §6]・[03 §10]）。
 * 移動解決時に確定し、戦闘画面はランダム抽選ではなくこの敵で戦闘を開始する。
 * 戦闘終了時に勝利なら該当 FOE を defeated にしてクリアする。
 */
export interface PendingFoeBattle {
  spawnId: string;
  enemyId: EnemyId;
  /** 接触方向で決まる先手（[03 §10]）。 */
  firstStrike: FirstStrike;
  /** 階層ボス戦か（[06 §4]）。勝利でゲート解放・ワープ解放・記録更新を行う。 */
  isBoss?: boolean;
}

export interface DiveState {
  depth: number; // 現在いる階
  pos: { x: number; y: number }; // 現在マス
  dir: Dir; // 向き
  party: DivePartyMember[]; // 出撃中キャラの現在 HP/TP/ゲージ/状態異常
  persistentSummons: SummonSnapshot[];
  encounter: { stepsUntilEncounter: number }; // エンカウント内部値（[02 §5]）
  /** FOE 接触で予約された戦闘（無ければ null）。戦闘画面が消費する。 */
  pendingFoeBattle: PendingFoeBattle | null;
}

// ============================================================================
// 生産・ショップ（[04]）。Phase 0 は型のみ。
// ============================================================================

export interface ForgeInventory {
  fragments: Record<string, number>;
  ingots: { copper: number; silver: number; gold: number };
}

export interface ShopStock {
  /**
   * 解放済みの最大ティア（[04 §8]）。
   * ※ Phase 3 では品揃えティアを towerState.record.deepestReached から算出するため
   *   このフィールドは未使用。Phase 4 でショップ独自の解放管理に使う。
   */
  unlockedTier: number;
  /** 売却で恒久解放された商品 ID（素材を売ると並ぶ。Phase 4 で実装）。 */
  unlockedItemIds: string[];
  /**
   * 売却で解放された装備の最大グレード（[06 §3]）。未指定/未登録=1。
   * 高グレード素材（周回ドロップ）を売ると、その装備が LvN として並ぶ。
   */
  unlockedGrades?: Record<string, number>;
}

// ============================================================================
// クエスト（[05 §1]・任意）
// ============================================================================

export interface QuestState {
  id: string;
  status: 'unaccepted' | 'active' | 'done';
  progress?: Record<string, number>;
}

// ============================================================================
// 設定（[05 §4.2]）
// ============================================================================

export interface GameSettings {
  autoMap: 'off' | 'on' | 'full';
  bgmVolume: number; // 0..1
  seVolume: number; // 0..1
  iconPaletteOrder?: string[];
}

// ============================================================================
// セーブデータ（[05 §4]）
// ============================================================================

export interface SaveData {
  schemaVersion: number; // SaveData の論理バージョン（migration 用）
  savedAt: number; // epoch ms
  /**
   * このセーブ固有のマスターシード（[05 §0.4]）。不変。
   * 階生成・戦闘などの乱数は createRng(masterSeed).fork('floor:'+depth) のように
   * ここから決定論的に派生させる。fork ツリーの再現性の起点。
   */
  masterSeed: number;
  settings: GameSettings;
  guild: Guild;
  towerState: TowerState;
  diveState: DiveState | null; // 拠点にいるときは null
  questStates?: QuestState[];
  bestiary: BestiaryState;
  playerMaps: Record<number, PlayerMap>; // depth -> 手描きマップ
  exploredCells: Record<number, CellKey[]>; // depth -> 視認済み cellKey[]
  forgeInventory: ForgeInventory;
  shopStock: ShopStock;
  /** 解放済みの料理レシピ ID（[04 §6]）。 */
  unlockedRecipeIds: string[];
  flags: Record<string, boolean>; // 到達階トリガーの解放フラグ
}

/** タイトルに出すセーブの概況メタ情報（SaveData から導出）。セーブは1つ。 */
export interface SaveMeta {
  guildName: string;
  deepestReached: number;
  memberCount: number; // 団員数（概況）
  savedAt: number;
  corrupted?: boolean;
}
