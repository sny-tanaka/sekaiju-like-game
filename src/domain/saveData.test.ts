import { STARTER_PARTY_SIZE, STARTING_GOLD } from '@/data/balance';
import { createRng } from '@/domain/rng';
import {
  CURRENT_SCHEMA_VERSION,
  createInitialSaveData,
  createStarterParty,
  defaultFormation,
} from '@/domain/saveData';

describe('saveData', () => {
  test('createStarterParty は規定人数を生成し、Lv1・既定職業・初期装備を持つ', () => {
    const party = createStarterParty(createRng(1));
    expect(party).toHaveLength(STARTER_PARTY_SIZE);
    for (const char of party) {
      expect(char.level).toBe(1);
      expect(char.exp).toBe(0);
      expect(char.classId).toMatch(/^class_/);
      expect(char.equipment.weapon).not.toBeNull();
    }
    // ID が重複しない
    expect(new Set(party.map((c) => c.id)).size).toBe(party.length);
  });

  test('createStarterParty は同一シードで決定論的', () => {
    const a = createStarterParty(createRng(123));
    const b = createStarterParty(createRng(123));
    expect(a.map((c) => c.id)).toEqual(b.map((c) => c.id));
  });

  test('defaultFormation は前衛から順に詰める', () => {
    const party = createStarterParty(createRng(2));
    const f = defaultFormation(party);
    expect(f.front[0]).toBe(party[0].id);
    expect(f.front[1]).toBe(party[1].id);
    // 全メンバーがどこかのスロットに配置される
    const placed = [...f.front, ...f.back].filter(Boolean);
    expect(placed).toHaveLength(party.length);
  });

  test('createInitialSaveData は拠点状態（diveState=null）で初期化される', () => {
    const party = createStarterParty(createRng(3));
    const save = createInitialSaveData('テストギルド', party);
    expect(save.schemaVersion).toBe(CURRENT_SCHEMA_VERSION);
    expect(save.guild.name).toBe('テストギルド');
    expect(save.guild.gold).toBe(STARTING_GOLD);
    expect(save.guild.members).toHaveLength(STARTER_PARTY_SIZE);
    expect(save.diveState).toBeNull();
    expect(save.towerState.record.deepestReached).toBe(0);
    expect(save.towerState.warp.unlockedCheckpoints).toEqual([]);
    expect(Object.keys(save.towerState.floors)).toHaveLength(0);
  });
});
