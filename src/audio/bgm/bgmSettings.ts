const STORAGE_KEY = 'sekaiju-bgm-settings';

export interface BgmSettings {
  volume: number;
  muted: boolean;
}

const DEFAULT_SETTINGS: BgmSettings = {
  volume: 0.5,
  muted: false,
};

export function loadBgmSettings(): BgmSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw) as unknown;
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'volume' in parsed &&
      'muted' in parsed &&
      typeof (parsed as Record<string, unknown>).volume === 'number' &&
      typeof (parsed as Record<string, unknown>).muted === 'boolean'
    ) {
      return {
        volume: (parsed as BgmSettings).volume,
        muted: (parsed as BgmSettings).muted,
      };
    }
    return { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveBgmSettings(settings: BgmSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // localStorage 書き込み失敗は無視
  }
}
