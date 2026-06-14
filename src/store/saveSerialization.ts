import { CURRENT_SCHEMA_VERSION } from '@/domain/saveData';
import type { SaveData, SlotMeta } from '@/domain/types';

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
  // 例: 1: (old) => ({ ...old, schemaVersion: 2, newField: defaultValue }),
};

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

/** タイトルのスロット選択に出すメタ情報を SaveData から導出する。 */
export function deriveSlotMeta(slot: number, data: SaveData): SlotMeta {
  const leader = data.guild.members[0];
  return {
    slot,
    guildName: data.guild.name,
    deepestReached: data.towerState.record.deepestReached,
    level: leader?.level ?? 0,
    savedAt: data.savedAt,
  };
}

/** 破損スロットのメタ情報。 */
export function corruptedSlotMeta(slot: number): SlotMeta {
  return {
    slot,
    guildName: '(破損データ)',
    deepestReached: 0,
    level: 0,
    savedAt: 0,
    corrupted: true,
  };
}
