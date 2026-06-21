import { resolveInitialTab } from './index';

describe('resolveInitialTab', () => {
  test('undefined を渡すと デフォルトの roster を返す', () => {
    expect(resolveInitialTab(undefined)).toBe('roster');
  });

  test("'roster' を渡すとそのまま返す", () => {
    expect(resolveInitialTab('roster')).toBe('roster');
  });

  test("'create' を渡すとそのまま返す", () => {
    expect(resolveInitialTab('create')).toBe('create');
  });

  test("'party' を渡すとそのまま返す", () => {
    expect(resolveInitialTab('party')).toBe('party');
  });

  test("'banish' を渡すとそのまま返す", () => {
    expect(resolveInitialTab('banish')).toBe('banish');
  });
});
