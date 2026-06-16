const STORAGE_KEY = 'sekaiju-sfx-settings';

export interface SfxSettings {
  volume: number;
  muted: boolean;
}

const DEFAULT_SETTINGS: SfxSettings = {
  volume: 0.6,
  muted: false,
};

export function loadSfxSettings(): SfxSettings {
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
        volume: (parsed as SfxSettings).volume,
        muted: (parsed as SfxSettings).muted,
      };
    }
    return { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSfxSettings(settings: SfxSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // localStorage 書き込み失敗は無視
  }
}
