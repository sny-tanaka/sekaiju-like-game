import { CURRENT_SCHEMA_VERSION } from '@/domain/saveData';
import type { Character, SaveData, SaveMeta, SavePartyPreviewMember } from '@/domain/types';

// ============================================================================
// セーブデータのシリアライズ・マイグレーション・破損判定（[05 §4.2]）。
// IndexedDB I/O から分離した純関数群。乱数・DOM・IndexedDB に依存しない。
//
// 2層バージョニング:
//  - SaveData.schemaVersion … セーブ中身の構造バージョン（ここで扱う migration）
//  - IndexedDB DB バージョン  … オブジェクトストア構造（saveStore.ts で扱う）
// ============================================================================

export type LoadResult = { ok: true; data: SaveData } | { ok: false; reason: string };

/**
 * migration チェーン: fromVersion -> その次のバージョンへ変換する関数。
 * 読み込み時に schemaVersion < CURRENT なら昇順で順次適用する。
 * 新フィールド追加など構造変更時にここへ追記する（現状は v1 が初版なので空）。
 */
const MIGRATIONS: Record<number, (old: Record<string, unknown>) => Record<string, unknown>> = {
  // v1 → v2: 装備のインスタンス化（Phase 4-5b）＋採集/食材枠（4-5a）の正規化。
  1: (old) => migrateV1toV2(old),
  // v2 → v3: 転生ボーナスを per-stat 化（issue #55）。
  2: (old) => migrateV2toV3(old),
  // v3 → v4: Character.strategy を追加（issue #61）。
  3: (old) => migrateV3toV4(old),
};

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

/** v1（装備=itemId 文字列）から v2（装備=EquipInstance 個体）へ変換する。 */
function migrateV1toV2(old: Record<string, unknown>): Record<string, unknown> {
  const next: Record<string, unknown> = { ...old, schemaVersion: 2 };
  let counter = 0;
  const mkInstance = (masterId: string) => ({
    id: `eq_mig_${Date.now().toString(36)}_${counter++}`,
    masterId,
    forgeLevel: 0,
  });

  const guild = isObj(next.guild) ? { ...next.guild } : {};
  // 旧 storage に紛れていた装備個体は無く、装備は各メンバーのスロット文字列のみ。
  // 新フィールド（所有装備プール・食材枠）を用意。
  if (!Array.isArray(guild.equipment)) guild.equipment = [];
  if (!Array.isArray((guild as Record<string, unknown>).foodStorage)) {
    (guild as Record<string, unknown>).foodStorage = [];
  }

  // 各メンバーの equipment スロットを文字列 itemId → EquipInstance|null に変換。
  if (Array.isArray(guild.members)) {
    guild.members = guild.members.map((m) => {
      if (!isObj(m)) return m;
      const eq = isObj(m.equipment) ? { ...m.equipment } : {};
      for (const slot of ['weapon', 'armor', 'accessory']) {
        const cur = eq[slot];
        eq[slot] = typeof cur === 'string' ? mkInstance(cur) : (cur ?? null);
      }
      return { ...m, equipment: eq };
    });
  }
  next.guild = guild;

  // 料理レシピ解放リスト（4-5a で追加）。欠落していれば空で補完（既定解放は新規開始時のみ）。
  if (!Array.isArray(next.unlockedRecipeIds)) next.unlockedRecipeIds = [];
  return next;
}

/** v2→v3: 旧 rebirthBonus {allStats, bonusSp} を per-stat 形式 {stats, bonusSp, count} へ変換。 */
function migrateV2toV3(old: Record<string, unknown>): Record<string, unknown> {
  const next: Record<string, unknown> = { ...old, schemaVersion: 3 };
  const STAT_KEYS = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'] as const;
  const guild = isObj(next.guild) ? { ...next.guild } : {};
  if (Array.isArray(guild.members)) {
    guild.members = guild.members.map((m) => {
      if (!isObj(m)) return m;
      const rb = m.rebirthBonus;
      if (!isObj(rb)) return m; // 転生未経験はそのまま（rebirthBonus 無し）
      // 既に新形式なら触らない
      if ('stats' in rb) return m;
      // 旧仕様は「全ステ一律 allStats」だったため全ステへ同値展開＝数値的に正確に引き継ぐ。
      // 旧データには転生回数・転生時の種族の記録が無いため count=1 とする
      // （以降の転生から種族配分で累積。旧転生者のみ初回ボーナスが均等値になる）。
      const all = typeof rb.allStats === 'number' ? rb.allStats : 0;
      const stats: Record<string, number> = {};
      for (const k of STAT_KEYS) stats[k] = all;
      const bonusSp = typeof rb.bonusSp === 'number' ? rb.bonusSp : 0;
      return { ...m, rebirthBonus: { stats, bonusSp, count: 1 } };
    });
  }
  next.guild = guild;
  return next;
}

/** v3→v4: Character.strategy を追加。既存メンバー全員に strategy: 'batchiri' を補完。 */
function migrateV3toV4(old: Record<string, unknown>): Record<string, unknown> {
  const next: Record<string, unknown> = { ...old, schemaVersion: 4 };
  const guild = isObj(next.guild) ? { ...next.guild } : {};
  if (Array.isArray(guild.members)) {
    guild.members = guild.members.map((m) =>
      isObj(m) && typeof m.strategy !== 'string' ? { ...m, strategy: 'batchiri' } : m
    );
  }
  next.guild = guild;
  return next;
}

/** 保存用にプレーンな構造へ変換する。現状の SaveData は構造化複製可能なのでディープコピーのみ。 */
export function serializeSave(data: SaveData): SaveData {
  return structuredClone(data);
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/** 最低限の構造チェック（壊れたセーブの検出）。後続の参照でクラッシュしない程度まで見る。 */
function looksLikeSaveData(v: unknown): v is SaveData {
  if (!isPlainObject(v)) return false;
  if (typeof v.schemaVersion !== 'number') return false;
  if (typeof v.masterSeed !== 'number') return false;
  if (!isPlainObject(v.guild)) return false;
  const guild = v.guild;
  if (typeof guild.name !== 'string') return false;
  if (!Array.isArray(guild.members)) return false;
  if (!Array.isArray(guild.equipment)) return false; // 装備個体プール（v2 以降は必須）
  if (!isPlainObject(v.forgeInventory)) return false;
  if (!isPlainObject(v.towerState)) return false;
  if (!isPlainObject(v.towerState.record)) return false;
  if (typeof v.towerState.record.deepestReached !== 'number') return false;
  return true;
}

/**
 * 永続化された生データを SaveData へ復元する。
 * - 構造不正・未知の未来バージョン → 破損（既存スロットは上書きしない方針）。
 * - schemaVersion < CURRENT → migration を順次適用。
 */
export function deserializeSave(raw: unknown): LoadResult {
  if (!isPlainObject(raw) || typeof raw.schemaVersion !== 'number') {
    return { ok: false, reason: 'セーブデータの構造が不正です' };
  }

  let version = raw.schemaVersion;
  if (version > CURRENT_SCHEMA_VERSION) {
    return {
      ok: false,
      reason: `未知のバージョン (${version} > ${CURRENT_SCHEMA_VERSION}) のセーブデータです`,
    };
  }

  let working: Record<string, unknown> = { ...raw };
  while (version < CURRENT_SCHEMA_VERSION) {
    const migrate = MIGRATIONS[version];
    if (!migrate) {
      return { ok: false, reason: `バージョン ${version} の migration が未定義です` };
    }
    working = migrate(working);
    version = typeof working.schemaVersion === 'number' ? working.schemaVersion : version + 1;
  }

  if (!looksLikeSaveData(working)) {
    return { ok: false, reason: 'migration 後のデータが SaveData の形をしていません' };
  }
  return { ok: true, data: working };
}

/** タイトルに出すセーブの概況メタ情報を SaveData から導出する。 */
export function deriveSaveMeta(data: SaveData): SaveMeta {
  const { members, party } = data.guild;
  const ids = [
    ...party.front.filter((id): id is string => id !== null),
    ...party.back.filter((id): id is string => id !== null),
  ];
  const partyPreview: SavePartyPreviewMember[] = ids
    .map((id) => members.find((m) => m.id === id))
    .filter((m): m is Character => m !== undefined)
    .slice(0, 5)
    .map((m) => ({ id: m.id, name: m.name, raceId: m.raceId, classId: m.classId }));

  return {
    guildName: data.guild.name,
    deepestReached: data.towerState.record.deepestReached,
    memberCount: data.guild.members.length,
    savedAt: data.savedAt,
    partyPreview,
  };
}

/** 破損セーブのメタ情報。 */
export function corruptedSaveMeta(): SaveMeta {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: true,
  };
}
