import { validateMasters } from '@/data/validateMasters';

describe('validateMasters', () => {
  test('同梱マスターデータは整合性検証を通過する', () => {
    const result = validateMasters();
    expect(result.errors).toEqual([]);
    expect(result.ok).toBe(true);
  });
});
