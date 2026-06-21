import type { SaveData } from '@/domain/types';
import { deserializeSave } from '@/store/saveSerialization';

// ============================================================================
// セーブ引き継ぎ: SaveData ⇔ 文字列（SLG1 フォーマット）の encode/decode。
// 純関数。DOM / IndexedDB に依存しない。
// フォーマット: SLG1.<base64-utf8-json>.<checksum-hex>
// ============================================================================

/**
 * Uint8Array を Base64 文字列に変換する。
 * btoa(String.fromCharCode(...bytes)) は大きなバイト列でスタックオーバーフローするため chunk 化。
 */
function bytesToBase64(bytes: Uint8Array): string {
  const CHUNK = 0x8000; // 32KB
  let binary = '';
  for (let i = 0; i < bytes.length; i += CHUNK) {
    const slice = bytes.subarray(i, i + CHUNK);
    binary += String.fromCharCode(...slice);
  }
  return btoa(binary);
}

/** Base64 文字列を Uint8Array に変換する。 */
function base64ToBytes(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/** FNV-1a 32bit ハッシュを 8 文字の小文字 hex 文字列で返す。 */
function fnv1a32(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

/**
 * SaveData を引き継ぎ用の文字列にエンコードする。
 * 形式: SLG1.<base64>.<checksum>
 */
export function encodeSaveTransfer(save: SaveData): string {
  const json = JSON.stringify(save);
  const bytes = new TextEncoder().encode(json);
  const base64 = bytesToBase64(bytes);
  const hash = fnv1a32(base64);
  return `SLG1.${base64}.${hash}`;
}

export type DecodeResult = { ok: true; data: SaveData } | { ok: false; reason: string };

/**
 * 引き継ぎ用の文字列を SaveData に戻す。schema migration もここで走る。
 */
export function decodeSaveTransfer(input: string): DecodeResult {
  // 前後の空白・改行を許容
  const trimmed = input.trim();

  if (!trimmed) {
    return { ok: false, reason: 'セーブの文字列ではありません' };
  }

  // プレフィックス確認
  const PREFIX = 'SLG1.';
  if (!trimmed.startsWith(PREFIX)) {
    return { ok: false, reason: 'セーブの文字列ではありません' };
  }

  const rest = trimmed.slice(PREFIX.length);

  // 末尾の `.` で base64 と checksum に分割
  const lastDot = rest.lastIndexOf('.');
  if (lastDot === -1) {
    return { ok: false, reason: 'セーブの文字列ではありません' };
  }

  const base64 = rest.slice(0, lastDot);
  const checksum = rest.slice(lastDot + 1);

  if (!base64 || !checksum) {
    return { ok: false, reason: 'セーブの文字列ではありません' };
  }

  // checksum 検証
  const expectedChecksum = fnv1a32(base64);
  if (checksum !== expectedChecksum) {
    return { ok: false, reason: '文字列が壊れています' };
  }

  // base64 → bytes → JSON.parse
  let parsed: unknown;
  try {
    const bytes = base64ToBytes(base64);
    const json = new TextDecoder().decode(bytes);
    parsed = JSON.parse(json);
  } catch {
    return { ok: false, reason: 'セーブの文字列を解析できません' };
  }

  // deserializeSave に渡す（migration も走る）
  const result = deserializeSave(parsed);
  if (!result.ok) {
    return { ok: false, reason: result.reason };
  }

  return { ok: true, data: result.data };
}
