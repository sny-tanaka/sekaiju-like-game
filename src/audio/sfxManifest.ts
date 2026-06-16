// 効果音ID（全26種）。ファイルは public/sfx/<id>.wav。
export const SFX_IDS = [
  'cursor',
  'decide',
  'cancel',
  'error',
  'encounter',
  'attack',
  'critical',
  'damage',
  'down',
  'heal',
  'buff',
  'debuff',
  'skill',
  'flee',
  'victory',
  'defeat',
  'levelup',
  'coin',
  'forge',
  'recycle',
  'item',
  'cook',
  'create',
  'dive',
  'warp',
  'save',
] as const;
export type SfxId = (typeof SFX_IDS)[number];

// 個別音量補正（0..1）。大きすぎる/小さすぎる音をここで微調整。デフォルト1。
export const SFX_GAIN: Partial<Record<SfxId, number>> = {
  victory: 0.9,
  levelup: 0.9,
  error: 0.8,
  down: 0.85,
  encounter: 0.85,
};

// public ベースの URL（Vite の import.meta.env.BASE_URL を尊重）。
export const sfxUrl = (id: SfxId): string => `${import.meta.env.BASE_URL}sfx/${id}.wav`;
