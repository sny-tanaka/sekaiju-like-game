// ============================================================================
// skipAnimSetting.test.ts — localStorage アニメスキップ設定の単体テスト
// ============================================================================

import { afterEach, beforeEach, describe, expect, test } from 'vitest';

import { loadSkipAnim, saveSkipAnim, SKIP_ANIM_KEY } from './skipAnimSetting';

// ---------------------------------------------------------------------------
// localStorage のモック（vitest の jsdom 環境は本物の localStorage を持つが、
// テスト間分離のため beforeEach/afterEach でクリアする）
// ---------------------------------------------------------------------------

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
});

// ---------------------------------------------------------------------------
// loadSkipAnim
// ---------------------------------------------------------------------------

describe('loadSkipAnim', () => {
  test("localStorage に '1' が入っているとき true を返す", () => {
    localStorage.setItem(SKIP_ANIM_KEY, '1');
    expect(loadSkipAnim()).toBe(true);
  });

  test("localStorage に '0' が入っているとき false を返す", () => {
    localStorage.setItem(SKIP_ANIM_KEY, '0');
    expect(loadSkipAnim()).toBe(false);
  });

  test('localStorage にキーが存在しないとき false を返す（デフォルト）', () => {
    expect(loadSkipAnim()).toBe(false);
  });

  test("localStorage に '1' でも '0' でもない値が入っているとき false を返す", () => {
    localStorage.setItem(SKIP_ANIM_KEY, 'true');
    expect(loadSkipAnim()).toBe(false);
  });

  test('localStorage に空文字が入っているとき false を返す', () => {
    localStorage.setItem(SKIP_ANIM_KEY, '');
    expect(loadSkipAnim()).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// saveSkipAnim
// ---------------------------------------------------------------------------

describe('saveSkipAnim', () => {
  test("true を渡すと localStorage に '1' が書き込まれる", () => {
    saveSkipAnim(true);
    expect(localStorage.getItem(SKIP_ANIM_KEY)).toBe('1');
  });

  test("false を渡すと localStorage に '0' が書き込まれる", () => {
    saveSkipAnim(false);
    expect(localStorage.getItem(SKIP_ANIM_KEY)).toBe('0');
  });

  test('保存後に loadSkipAnim で読み出すとラウンドトリップが成立する（true）', () => {
    saveSkipAnim(true);
    expect(loadSkipAnim()).toBe(true);
  });

  test('保存後に loadSkipAnim で読み出すとラウンドトリップが成立する（false）', () => {
    saveSkipAnim(false);
    expect(loadSkipAnim()).toBe(false);
  });

  test('true → false と切り替えると正しく書き換えられる', () => {
    saveSkipAnim(true);
    saveSkipAnim(false);
    expect(loadSkipAnim()).toBe(false);
  });

  test('false → true と切り替えると正しく書き換えられる', () => {
    saveSkipAnim(false);
    saveSkipAnim(true);
    expect(loadSkipAnim()).toBe(true);
  });
});
