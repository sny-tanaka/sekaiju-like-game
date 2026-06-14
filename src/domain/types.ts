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
  unionGauge: number; // 0..100
  isDown: boolean;
  enemyId?: EnemyId; // 敵のみ
  /** 敵の属性倍率（弱点1.5 / 耐性0.5 / 無効0。未指定は等倍1.0）。 */
  resist?: Partial<Record<Element, number>>;
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

export interface RaceMaster {
  id: RaceId;
  name: string;
  statGrowth: StatGrowth; // Lv ごとの各能力上昇量
  baseStatsAtLv1: Stats;
  unionSkillTree: SkillTreeDef; // 種族固有（ユニオンスキル含む）
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
}

// ----------------------------------------------------------------------------
// 戦闘スキル定義（[03 §5]）。マスターデータ（関数値を含むため保存しない）。
// ----------------------------------------------------------------------------

export type SkillEffectDef =
  | { kind: 'damage'; power: (lv: number) => number; statBase: 'str' | 'int'; hits?: number }
  | { kind: 'heal'; amount: (lv: number) => number }
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
    };

export interface BattleSkillDef {
  id: SkillId;
  name: string;
  tree: 'base' | 'master' | 'race' | 'title';
  tpCost: (lv: number) => number;
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
  | { kind: 'guard'; actorId: string }
  | { kind: 'flee'; actorId: string };

export type BattleOutcome = 'ongoing' | 'win' | 'lose' | 'fled';

export interface BattleLogEntry {
  text: string;
}

export interface BattleState {
  turn: number;
  depth: number;
  allies: Combatant[];
  enemies: Combatant[];
  log: BattleLogEntry[];
  outcome: BattleOutcome;
}

export type ItemCategory = 'consumable' | 'material' | 'drop' | 'valuable';

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

export type EquipmentSlots = Record<EquipSlotKey, ItemId | null>;

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
}

export interface Guild {
  name: string;
  gold: number;
  members: Character[]; // 上限あり（例: 30）
  party: PartyFormation; // 出撃中の編成
  storage: ItemStack[]; // 預かり所
  bestiary: BestiaryState; // 図鑑
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
}

export interface FoeRuntimeState {
  spawnId: string;
  cell: { x: number; y: number };
  defeated: boolean;
  alerted: boolean;
}

/** generateFloor(depth, rng) の生成物（[02 §2]・[06 §2]）。 */
export interface FloorMaster {
  depth: number;
  width: number;
  height: number;
  cells: Cell[][]; // [y][x]
  encounterTable: string;
  foeSpawns: FoeSpawn[];
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

/** 探索をまたいで残る召喚体（[03 §8]）。Phase 0 は型のみ。 */
export interface SummonSnapshot {
  summonId: string;
  remainingTurns: number;
}

export interface DiveState {
  depth: number; // 現在いる階
  pos: { x: number; y: number }; // 現在マス
  dir: Dir; // 向き
  party: DivePartyMember[]; // 出撃中キャラの現在 HP/TP/ゲージ/状態異常
  persistentSummons: SummonSnapshot[];
  encounter: { stepsUntilEncounter: number }; // エンカウント内部値（[02 §5]）
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
