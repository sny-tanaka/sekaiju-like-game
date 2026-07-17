import { FORGE } from '@/data/balance';
import { EQUIPMENT, isPreciousEquip } from '@/data/equipment';
import type { EquipBonuses, EquipInstance, EquipSlotKey, SaveData } from '@/domain/types';

// ============================================================================
// 鍛冶（[04 §4]）。強化（インゴットで +N）・リサイクル（→断片→インゴット）。
// 装備は個体（EquipInstance）で所有し、強化値を個体ごとに持つ。すべて純関数。
// ============================================================================

export type IngotType = 'copper' | 'silver' | 'gold';

/** ティア連動の強化1段あたりの上昇量（§7.3）。round(STAT_PER_LEVEL * TIER_STEP^equipTier)。 */
export function forgeIncPerLevel(equipTier: number): number {
  return Math.round(FORGE.STAT_PER_LEVEL * Math.pow(FORGE.TIER_STEP, equipTier));
}

/** リサイクルで得られる断片数（§7.3）。max(2, floor(buyPrice/120))。 */
export function recycleFragments(masterId: string): number {
  const eq = EQUIPMENT[masterId];
  if (!eq) return 2;
  return Math.max(2, Math.floor(eq.buyPrice / 120));
}

/** 強化値による装備ボーナス（武器=ATK/MAT、防具=DEF/MDF、アクセ=なし）。 */
export function forgeBonusFor(masterId: string, forgeLevel: number): EquipBonuses {
  const eq = EQUIPMENT[masterId];
  if (!eq || forgeLevel <= 0) return {};
  const incPerLevel = forgeIncPerLevel(eq.tier ?? 0);
  const inc = forgeLevel * incPerLevel;
  if (eq.slot === 'weapon') return { atk: inc, mat: inc };
  if (eq.slot === 'armor') return { def: inc, mdf: inc };
  return {};
}

// 周回グレード倍率の指数ベース（[06 §3]）。
// Lv2 = +5 ティア相当のジャンプ: atk/mat 系 ×1.62^5 ≈ 10.66、def/mdf 系 ×1.55^5 ≈ 8.59。
const GRADE_TIER_JUMP = 5;
const TIER_BASE_ATK = 1.62;
const TIER_BASE_DEF = 1.55;

/** 周回グレードによる装備ボーナス倍率（atk/mat 系）（[06 §3]）。Lv2 = +5 ティア相当。未指定=1.0。 */
export function gradeMult(grade?: number): number {
  const g = Math.max(1, grade ?? 1);
  return Math.pow(TIER_BASE_ATK, GRADE_TIER_JUMP * (g - 1));
}

/** 装備マスターの基礎ボーナスを周回グレードで倍化した値（[06 §3]）。atk/mat と def/mdf で倍率を分離。 */
export function gradedBaseBonuses(masterId: string, grade?: number): EquipBonuses {
  const eq = EQUIPMENT[masterId];
  if (!eq) return {};
  const g = Math.max(1, grade ?? 1);
  const expSteps = GRADE_TIER_JUMP * (g - 1);
  const atkMult = Math.pow(TIER_BASE_ATK, expSteps); // ×1.62^N
  const defMult = Math.pow(TIER_BASE_DEF, expSteps); // ×1.55^N
  const out: EquipBonuses = {};
  if (eq.bonuses.atk) out.atk = Math.round(eq.bonuses.atk * atkMult);
  if (eq.bonuses.mat) out.mat = Math.round(eq.bonuses.mat * atkMult);
  if (eq.bonuses.def) out.def = Math.round(eq.bonuses.def * defMult);
  if (eq.bonuses.mdf) out.mdf = Math.round(eq.bonuses.mdf * defMult);
  // statMods（「STR+N」等）は周回グレード倍化しない（現データは未使用。付与時はここで要対応）。
  if (eq.bonuses.statMods) out.statMods = eq.bonuses.statMods;
  return out;
}

const SLOTS: EquipSlotKey[] = ['weapon', 'armor', 'accessory'];

/** プール・全メンバーの装備スロットを通じて、指定個体を fn で書き換えた save を返す。 */
function updateEquipInstance(
  save: SaveData,
  instanceId: string,
  fn: (inst: EquipInstance) => EquipInstance
): SaveData {
  const equipment = save.guild.equipment.map((e) => (e.id === instanceId ? fn(e) : e));
  const members = save.guild.members.map((m) => {
    let changed = false;
    const slots = { ...m.equipment };
    for (const slot of SLOTS) {
      const e = slots[slot];
      if (e && e.id === instanceId) {
        slots[slot] = fn(e);
        changed = true;
      }
    }
    return changed ? { ...m, equipment: slots } : m;
  });
  return { ...save, guild: { ...save.guild, equipment, members } };
}

export interface ForgeResult {
  ok: boolean;
  save: SaveData;
  reason?: 'notFound' | 'maxLevel' | 'noIngot';
}

/**
 * インゴットで装備を強化する（[04 §4.1]）。銅+1/銀+3/金+5。上限 +5。
 * 装備中・プールどちらの個体でも対象にできる。
 */
export function forgeWithIngot(save: SaveData, instanceId: string, ingot: IngotType): ForgeResult {
  // 個体を探す（プール優先、無ければ装備中）
  let inst: EquipInstance | undefined = save.guild.equipment.find((e) => e.id === instanceId);
  if (!inst) {
    for (const m of save.guild.members)
      for (const slot of SLOTS) {
        const e = m.equipment[slot];
        if (e?.id === instanceId) inst = e;
      }
  }
  if (!inst) return { ok: false, save, reason: 'notFound' };
  if (inst.forgeLevel >= FORGE.MAX_LEVEL) return { ok: false, save, reason: 'maxLevel' };
  if ((save.forgeInventory.ingots[ingot] ?? 0) <= 0) return { ok: false, save, reason: 'noIngot' };

  const nextLevel = Math.min(FORGE.MAX_LEVEL, inst.forgeLevel + FORGE.INGOT_INC[ingot]);
  let next: SaveData = {
    ...save,
    forgeInventory: {
      ...save.forgeInventory,
      ingots: { ...save.forgeInventory.ingots, [ingot]: save.forgeInventory.ingots[ingot] - 1 },
    },
  };
  next = updateEquipInstance(next, instanceId, (e) => ({ ...e, forgeLevel: nextLevel }));
  return { ok: true, save: next };
}

/**
 * 所有プールの装備をリサイクルして断片を得る（[04 §4.2]）。
 * 断片が FRAGMENTS_PER_INGOT たまるごとに銅インゴットへ自動変換。装備中の個体は対象外。
 */
export function recycle(save: SaveData, instanceId: string): ForgeResult {
  const inst = save.guild.equipment.find((e) => e.id === instanceId);
  if (!inst) return { ok: false, save, reason: 'notFound' };
  // v3.0.0 §6: ジェム限定装備・蒐集王の宝冠は再入手不可のため分解不可（no-op）。
  if (isPreciousEquip(inst.masterId)) return { ok: false, save, reason: 'notFound' };
  const pool = save.guild.equipment.filter((e) => e.id !== instanceId);

  const fragments = { ...save.forgeInventory.fragments };
  fragments.common = (fragments.common ?? 0) + recycleFragments(inst.masterId);
  let copper = save.forgeInventory.ingots.copper;
  while (fragments.common >= FORGE.FRAGMENTS_PER_INGOT) {
    fragments.common -= FORGE.FRAGMENTS_PER_INGOT;
    copper += 1;
  }
  return {
    ok: true,
    save: {
      ...save,
      guild: { ...save.guild, equipment: pool },
      forgeInventory: {
        ...save.forgeInventory,
        fragments,
        ingots: { ...save.forgeInventory.ingots, copper },
      },
    },
  };
}

/**
 * 複数の装備個体を一括分解する（純粋）。
 * 内部的に recycle を順次適用するため、断片→銅インゴットの繰り上げも自然に行われる。
 * 未知の instanceId はスキップ（途中で失敗扱いにしない）。
 */
export function recycleMany(save: SaveData, instanceIds: string[]): ForgeResult {
  let cur = save;
  for (const id of instanceIds) {
    const r = recycle(cur, id);
    if (r.ok) cur = r.save;
  }
  return { ok: true, save: cur };
}

/** 表示用: 装備名（+N 付き）。 */
export function equipDisplayName(inst: EquipInstance): string {
  const base = EQUIPMENT[inst.masterId]?.name ?? inst.masterId;
  const name = inst.grade && inst.grade > 1 ? `${base} Lv${inst.grade}` : base;
  return inst.forgeLevel > 0 ? `${name} +${inst.forgeLevel}` : name;
}
