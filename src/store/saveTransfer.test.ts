import { mockMidDive } from '@/__stories__/mockSaves';
import { CURRENT_SCHEMA_VERSION } from '@/domain/saveData';
import { decodeSaveTransfer, encodeSaveTransfer } from '@/store/saveTransfer';

// ============================================================================
// saveTransfer.ts の単体テスト
// ============================================================================

describe('encodeSaveTransfer / decodeSaveTransfer', () => {
  test('round-trip: mockMidDive を encode → decode すると同じ SaveData が復元できる', () => {
    const str = encodeSaveTransfer(mockMidDive);
    const result = decodeSaveTransfer(str);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data).toEqual(mockMidDive);
  });

  test('encode した文字列は SLG1. で始まる', () => {
    const str = encodeSaveTransfer(mockMidDive);
    expect(str.startsWith('SLG1.')).toBe(true);
  });

  test('前後に空白/改行が混じっていても decode できる', () => {
    const str = encodeSaveTransfer(mockMidDive);
    const withWhitespace = `  \n${str}\n  `;
    const result = decodeSaveTransfer(withWhitespace);
    expect(result.ok).toBe(true);
  });

  test('プレフィックス SLG1. が無いと ok:false', () => {
    const result = decodeSaveTransfer('INVALID.base64.checksum');
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBeTruthy();
  });

  test('区切り . が 1 つしかないと ok:false', () => {
    // SLG1. はあるが、残りに . がない
    const result = decodeSaveTransfer('SLG1.onlyone');
    expect(result.ok).toBe(false);
  });

  test('checksum を 1 文字書き換えると ok:false（文字列が壊れています）', () => {
    const str = encodeSaveTransfer(mockMidDive);
    // 末尾の checksum 8 文字の先頭を書き換える
    const parts = str.split('.');
    const lastPart = parts[parts.length - 1]!;
    const corruptedChecksum =
      lastPart[0] === 'a' ? lastPart.slice(0, -1) + 'b' : lastPart.slice(0, -1) + 'a';
    parts[parts.length - 1] = corruptedChecksum;
    const corrupted = parts.join('.');
    const result = decodeSaveTransfer(corrupted);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe('文字列が壊れています');
  });

  test('base64 部分を改ざんすると ok:false', () => {
    const str = encodeSaveTransfer(mockMidDive);
    // base64 部分（2番目の . の前）の先頭数文字を変える → checksum 不一致になるはず
    const firstDot = str.indexOf('.');
    const lastDot = str.lastIndexOf('.');
    const base64 = str.slice(firstDot + 1, lastDot);
    const corruptedBase64 = 'AAAA' + base64.slice(4);
    const corrupted = str.slice(0, firstDot + 1) + corruptedBase64 + str.slice(lastDot);
    const result = decodeSaveTransfer(corrupted);
    expect(result.ok).toBe(false);
  });

  test('空文字列 → ok:false', () => {
    const result = decodeSaveTransfer('');
    expect(result.ok).toBe(false);
  });

  test('空白だけ → ok:false', () => {
    const result = decodeSaveTransfer('   \n  ');
    expect(result.ok).toBe(false);
  });

  test('旧 schema (v1) の SaveData を encode → decode すると migration が走り schemaVersion === CURRENT になる', () => {
    // v1 の SaveData を手動で構築する（schemaVersion:1 + v1 相当の最低限フィールド）
    const v1Save: Record<string, unknown> = {
      schemaVersion: 1,
      masterSeed: 12345,
      savedAt: Date.now(),
      guild: {
        name: 'v1ギルド',
        gold: 0,
        members: [],
        party: {
          front: [null, null, null],
          back: [null, null],
        },
        // v1 には equipment プールが無い
      },
      forgeInventory: {
        fragments: {},
        ingots: { copper: 0, silver: 0, gold: 0 },
      },
      towerState: {
        depth: 1,
        diveState: null,
        record: {
          deepestReached: 0,
          highestBossDefeated: 0,
          totalDives: 0,
          bossDefeatLog: [],
        },
        bossGates: {},
        warp: { unlockedCheckpoints: [] },
      },
      diveState: null,
      bestiary: { monsters: {}, items: {} },
      unlockedRecipeIds: [],
    };

    // v1 SaveData を JSON → base64 → SLG1 形式にする（encodeSaveTransfer は SaveData 型を要求するため直接 JSON を使う）
    const json = JSON.stringify(v1Save);
    const bytes = new TextEncoder().encode(json);
    // chunk encode
    const CHUNK = 0x8000;
    let binary = '';
    for (let i = 0; i < bytes.length; i += CHUNK) {
      const slice = bytes.subarray(i, i + CHUNK);
      binary += String.fromCharCode(...slice);
    }
    const base64 = btoa(binary);
    // FNV-1a 32bit
    let h = 0x811c9dc5;
    for (let i = 0; i < base64.length; i++) {
      h ^= base64.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    const hash = (h >>> 0).toString(16).padStart(8, '0');
    const transferStr = `SLG1.${base64}.${hash}`;

    const result = decodeSaveTransfer(transferStr);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.schemaVersion).toBe(CURRENT_SCHEMA_VERSION);
  });
});
