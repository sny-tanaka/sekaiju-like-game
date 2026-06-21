// ============================================================================
// skipAnimSetting.ts — 戦闘アニメスキップ設定の localStorage 永続化ユーティリティ
//
// localStorage キー: 'sekaiju:settings:skipBattleAnim'
// '1' → true（スキップ有効）、'0' → false（スキップ無効）
// キーなし / その他 → デフォルト false
// ============================================================================

export const SKIP_ANIM_KEY = 'sekaiju:settings:skipBattleAnim';

/**
 * localStorage からアニメスキップ設定を読み込む。
 * '1' のときのみ true。キーなし・その他の値・読み込みエラーはすべて false。
 */
export function loadSkipAnim(): boolean {
  try {
    return localStorage.getItem(SKIP_ANIM_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * アニメスキップ設定を localStorage に保存する。
 * true → '1'、false → '0' を書き込む。書き込みエラーは無視する。
 */
export function saveSkipAnim(value: boolean): void {
  try {
    localStorage.setItem(SKIP_ANIM_KEY, value ? '1' : '0');
  } catch {
    // localStorage が使えない環境（プライベートブラウジング等）では無視
  }
}
