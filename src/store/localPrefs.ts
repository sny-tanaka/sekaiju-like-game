// ============================================================================
// 軽量設定（localStorage）（[05 §4]: 軽量データは localStorage）。
// 「最後に遊んだスロット」だけを保持し、起動時の続きから再開に使う。
// ============================================================================

const LAST_SLOT_KEY = 'sekaiju:lastSlot';

export function getLastSlot(): number | null {
  try {
    const raw = localStorage.getItem(LAST_SLOT_KEY);
    if (raw === null) return null;
    const n = Number(raw);
    return Number.isInteger(n) ? n : null;
  } catch {
    return null;
  }
}

export function setLastSlot(slot: number | null): void {
  try {
    if (slot === null) {
      localStorage.removeItem(LAST_SLOT_KEY);
    } else {
      localStorage.setItem(LAST_SLOT_KEY, String(slot));
    }
  } catch {
    // localStorage 不可（プライベートモード等）でも致命にしない
  }
}
