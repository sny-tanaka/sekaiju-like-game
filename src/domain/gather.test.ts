import { canGather, gatherHere, gatheringPointHere, isGatherDepleted } from '@/domain/gather';
import { foodCount, itemCount } from '@/domain/inventory';
import { createRng } from '@/domain/rng';
import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
import type { GatherType, SaveData } from '@/domain/types';

// 採集ポイントを1つ持つ階＋現在地をそのポイントに置いた潜行状態を作る。
function diveWithGather(type: GatherType, learnSkillId?: string): SaveData {
  let save = createInitialSaveData('採集団');
  save = addCharacterToGuild(
    save,
    createCharacter({ raceId: 'race_therian', classId: 'class_ranger', name: '狩' })
  );
  if (learnSkillId) {
    const m = save.guild.members[0];
    save = {
      ...save,
      guild: {
        ...save.guild,
        members: [{ ...m, learnedSkills: { ...m.learnedSkills, [learnSkillId]: 1 } }],
      },
    };
  }
  // 手作りの最小フロア（1セルに採集ポイント）
  const cell = {
    walls: { N: true, E: true, S: true, W: true },
    floorType: 'normal' as const,
    passable: true,
    event: { kind: 'gather' as const, gatherId: 'gather_0' },
  };
  const generated = {
    depth: 1,
    width: 1,
    height: 1,
    cells: [[cell]],
    encounterTable: 'band_0',
    foeSpawns: [],
    gatheringPoints: [{ id: 'gather_0', cell: { x: 0, y: 0 }, type }],
    bgmId: 'bgm_dungeon',
  };
  return {
    ...save,
    towerState: {
      ...save.towerState,
      floors: {
        1: {
          depth: 1,
          seed: save.masterSeed,
          generated,
          isBossFloor: false,
          encounterTier: 0,
          foeRuntime: [],
          openedChests: [],
          depletedGathers: [],
          consumedEvents: [],
        },
      },
    },
    diveState: {
      depth: 1,
      pos: { x: 0, y: 0 },
      dir: 'N',
      party: [{ charId: save.guild.members[0].id, hp: 30, tp: 20, unionGauge: 0, ailments: [] }],
      persistentSummons: [],
      encounter: { stepsUntilEncounter: 10 },
      pendingFoeBattle: null,
    },
  };
}

describe('gather', () => {
  test('現在地の採集ポイントを取得できる', () => {
    const save = diveWithGather('mining');
    const p = gatheringPointHere(save);
    expect(p?.id).toBe('gather_0');
    expect(p?.type).toBe('mining');
  });

  test('対応スキルが無いと採集できない', () => {
    const save = diveWithGather('mining'); // skill 未習得
    const p = gatheringPointHere(save)!;
    expect(canGather(save, p)).toBe(false);
    const res = gatherHere(save, createRng(1));
    expect(res.ok).toBe(false);
    expect(res.reason).toBe('noSkill');
  });

  test('対応スキルがあれば素材を採れて倉庫に入る（鉱石）', () => {
    const save = diveWithGather('mining', 'skill_mining');
    const res = gatherHere(save, createRng(1));
    expect(res.ok).toBe(true);
    expect(itemCount(res.save, 'item_ore')).toBe(1);
  });

  test('食材系（釣り）は foodStorage に入る', () => {
    const save = diveWithGather('fishing', 'skill_fishing');
    const res = gatherHere(save, createRng(1));
    expect(res.ok).toBe(true);
    expect(foodCount(res.save, 'item_food_fish')).toBe(1);
  });

  test('食材枠が満杯だと採集を拒否し、枯渇登録もしない（取りこぼし防止）', () => {
    let save = diveWithGather('fishing', 'skill_fishing');
    // 食材を60個まで満たす
    save = {
      ...save,
      guild: { ...save.guild, foodStorage: [{ itemId: 'item_food_fish', qty: 60 }] },
    };
    const res = gatherHere(save, createRng(1));
    expect(res.ok).toBe(false);
    expect(res.reason).toBe('foodFull');
    const p = gatheringPointHere(res.save)!;
    expect(isGatherDepleted(res.save, p)).toBe(false); // 枯渇していない
  });

  test('採集後はそのポイントが枯渇し、再採集できない', () => {
    const save = diveWithGather('mining', 'skill_mining');
    const res = gatherHere(save, createRng(1));
    const p = gatheringPointHere(res.save)!;
    expect(isGatherDepleted(res.save, p)).toBe(true);
    const res2 = gatherHere(res.save, createRng(2));
    expect(res2.ok).toBe(false);
    expect(res2.reason).toBe('depleted');
  });
});
