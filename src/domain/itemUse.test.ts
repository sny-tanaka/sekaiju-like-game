import { startDive } from '@/domain/dive';
import { addItem, itemCount } from '@/domain/inventory';
import { applyFieldItem } from '@/domain/itemUse';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
import type { SaveData } from '@/domain/types';

function diveSave(): { save: SaveData; charId: string } {
  let save = createInitialSaveData('g');
  const c = createCharacter({ raceId: 'race_human', classId: 'class_warrior', name: 'A' });
  save = addCharacterToGuild(save, c);
  save = startDive(save, 1);
  return { save, charId: c.id };
}

describe('applyFieldItem', () => {
  test('やくそうで HP 回復し、1個消費する', () => {
    const _d = diveSave();
    const charId = _d.charId;
    let save = _d.save;
    save = addItem(save, 'item_potion', 2);
    // HP を減らす
    save = {
      ...save,
      diveState: {
        ...save.diveState!,
        party: save.diveState!.party.map((p) => (p.charId === charId ? { ...p, hp: 1 } : p)),
      },
    };
    const res = applyFieldItem(save, 'item_potion', charId);
    expect(res.ok).toBe(true);
    const member = res.save.diveState!.party.find((p) => p.charId === charId)!;
    expect(member.hp).toBeGreaterThan(1);
    expect(res.save.guild.storage.find((s) => s.itemId === 'item_potion')?.qty).toBe(1);
  });

  test('HP は最大値を超えない', () => {
    const _d = diveSave();
    const charId = _d.charId;
    let save = _d.save;
    save = addItem(save, 'item_potion', 1);
    const res = applyFieldItem(save, 'item_potion', charId); // 満タンで使用
    const member = res.save.diveState!.party.find((p) => p.charId === charId)!;
    expect(member.hp).toBe(save.diveState!.party.find((p) => p.charId === charId)!.hp);
  });

  test('帰還の糸で拠点へ戻る（diveState=null）', () => {
    let { save } = diveSave();
    save = addItem(save, 'item_return_thread', 1);
    const res = applyFieldItem(save, 'item_return_thread');
    expect(res.ok).toBe(true);
    expect(res.save.diveState).toBeNull();
  });

  test('所持していないアイテムは使えない', () => {
    const { save, charId } = diveSave();
    const res = applyFieldItem(save, 'item_potion', charId);
    expect(res.ok).toBe(false);
    expect(res.save).toBe(save);
  });

  // --- v3.0.0 §8: 万能薬（cleanse）・気付けの雫（revive）のフィールド使用 ---
  test('万能薬（item_panacea）で状態異常が解除される', () => {
    const _d = diveSave();
    const charId = _d.charId;
    let save = _d.save;
    save = addItem(save, 'item_panacea', 1);
    save = {
      ...save,
      diveState: {
        ...save.diveState!,
        party: save.diveState!.party.map((p) =>
          p.charId === charId ? { ...p, ailments: [{ type: 'poison', remainingTurns: 3 }] } : p
        ),
      },
    };
    const res = applyFieldItem(save, 'item_panacea', charId);
    expect(res.ok).toBe(true);
    const member = res.save.diveState!.party.find((p) => p.charId === charId)!;
    expect(member.ailments).toHaveLength(0);
    expect(res.save.guild.storage.find((s) => s.itemId === 'item_panacea')).toBeUndefined();
  });

  test('万能薬（item_panacea）は状態異常が無ければ不発（消費しない）', () => {
    const _d = diveSave();
    const charId = _d.charId;
    let save = _d.save;
    save = addItem(save, 'item_panacea', 1);
    const res = applyFieldItem(save, 'item_panacea', charId);
    expect(res.ok).toBe(false);
    expect(itemCount(res.save, 'item_panacea')).toBe(1);
  });

  test('気付けの雫（item_revive_drop）で戦闘不能の対象が最大HPの40%で復活する', () => {
    const _d = diveSave();
    const charId = _d.charId;
    let save = _d.save;
    save = addItem(save, 'item_revive_drop', 1);
    save = {
      ...save,
      diveState: {
        ...save.diveState!,
        party: save.diveState!.party.map((p) => (p.charId === charId ? { ...p, hp: 0 } : p)),
      },
    };
    const res = applyFieldItem(save, 'item_revive_drop', charId);
    expect(res.ok).toBe(true);
    const member = res.save.diveState!.party.find((p) => p.charId === charId)!;
    expect(member.hp).toBeGreaterThan(0);
  });

  test('気付けの雫（item_revive_drop）は生存者には無効（不発・消費しない）', () => {
    const _d = diveSave();
    const charId = _d.charId;
    let save = _d.save;
    save = addItem(save, 'item_revive_drop', 1);
    const res = applyFieldItem(save, 'item_revive_drop', charId);
    expect(res.ok).toBe(false);
    expect(itemCount(res.save, 'item_revive_drop')).toBe(1);
  });

  // --- v3.0.0 §8: heal はフィールドでも事実上の蘇生を禁止する ---
  test('やくすり（heal）は戦闘不能（hp0）の対象には不発（消費しない・蘇生させない）', () => {
    const _d = diveSave();
    const charId = _d.charId;
    let save = _d.save;
    save = addItem(save, 'item_potion', 1);
    save = {
      ...save,
      diveState: {
        ...save.diveState!,
        party: save.diveState!.party.map((p) => (p.charId === charId ? { ...p, hp: 0 } : p)),
      },
    };
    const res = applyFieldItem(save, 'item_potion', charId);
    expect(res.ok).toBe(false);
    const member = res.save.diveState!.party.find((p) => p.charId === charId)!;
    expect(member.hp).toBe(0);
    expect(itemCount(res.save, 'item_potion')).toBe(1);
  });

  // --- 界層還元香（item_floor_reset）: 現在階のボス・FOE・採取ポイントを復活させる ---
  test('界層還元香で階のリセットが起き、1個消費する', () => {
    const { save: base } = diveSave();
    let save = addItem(base, 'item_floor_reset', 1);
    const floor = save.towerState.floors[1];
    // FOE を撃破済みにし、採取ポイントを枯渇させておく
    save = {
      ...save,
      towerState: {
        ...save.towerState,
        floors: {
          ...save.towerState.floors,
          1: {
            ...floor,
            foeRuntime: floor.foeRuntime.map((f) => ({ ...f, defeated: true })),
            depletedGathers: floor.generated.gatheringPoints.map((g) => g.id),
          },
        },
      },
    };
    const res = applyFieldItem(save, 'item_floor_reset');
    expect(res.ok).toBe(true);
    const nextFloor = res.save.towerState.floors[1];
    expect(nextFloor.foeRuntime.every((f) => f.defeated === false)).toBe(true);
    expect(nextFloor.depletedGathers).toEqual([]);
    expect(itemCount(res.save, 'item_floor_reset')).toBe(0);
  });

  test('界層還元香は拠点では使えない', () => {
    let { save } = diveSave();
    save = addItem(save, 'item_floor_reset', 1);
    save = { ...save, diveState: null };
    const res = applyFieldItem(save, 'item_floor_reset');
    expect(res.ok).toBe(false);
    expect(res.message).toBe('探索中のみ使える');
    expect(itemCount(res.save, 'item_floor_reset')).toBe(1);
  });

  test('界層還元香を所持していなければ使えない', () => {
    const { save } = diveSave();
    const res = applyFieldItem(save, 'item_floor_reset');
    expect(res.ok).toBe(false);
    expect(res.save).toBe(save);
  });
});
