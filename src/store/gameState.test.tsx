import { act, renderHook, waitFor } from '@testing-library/react';
import { deleteDB } from 'idb';
import type { ReactNode } from 'react';

import { GameStateProvider, useGameState } from '@/store/gameState';
import { _resetDbForTest } from '@/store/saveStore';

const wrapper = ({ children }: { children: ReactNode }) => (
  <GameStateProvider>{children}</GameStateProvider>
);

beforeEach(async () => {
  await _resetDbForTest();
  await deleteDB('sekaiju-like-game');
  localStorage.clear();
});

describe('gameState store', () => {
  test('startNewGame で SaveData が生成され state に載る', async () => {
    const { result } = renderHook(() => useGameState(), { wrapper });
    await act(async () => {
      await result.current.startNewGame(0, 'マイギルド');
    });
    expect(result.current.slot).toBe(0);
    expect(result.current.save?.guild.name).toBe('マイギルド');
    expect(result.current.save?.diveState).toBeNull();
  });

  test('continueGame で保存済みスロットを再開できる', async () => {
    const first = renderHook(() => useGameState(), { wrapper });
    await act(async () => {
      await first.result.current.startNewGame(1, 'リロードギルド');
    });

    // 別ツリーで続きから
    const second = renderHook(() => useGameState(), { wrapper });
    await act(async () => {
      const r = await second.result.current.continueGame(1);
      expect(r.ok).toBe(true);
    });
    expect(second.result.current.save?.guild.name).toBe('リロードギルド');
  });

  test('continueGame は空スロットで ok:false', async () => {
    const { result } = renderHook(() => useGameState(), { wrapper });
    let res: { ok: boolean } = { ok: true };
    await act(async () => {
      res = await result.current.continueGame(2);
    });
    expect(res.ok).toBe(false);
  });

  test('applySave で SaveData を純粋に更新し、persist で永続化される', async () => {
    const { result } = renderHook(() => useGameState(), { wrapper });
    await act(async () => {
      await result.current.startNewGame(0, 'ギルド');
    });

    act(() => {
      result.current.applySave((prev) => ({
        ...prev,
        guild: { ...prev.guild, gold: 9999 },
      }));
    });
    expect(result.current.save?.guild.gold).toBe(9999);

    await act(async () => {
      await result.current.persist();
    });
    await waitFor(() => expect(result.current.saving).toBe(false));

    // 再読込で gold が永続化されている
    const reload = renderHook(() => useGameState(), { wrapper });
    await act(async () => {
      await reload.result.current.continueGame(0);
    });
    expect(reload.result.current.save?.guild.gold).toBe(9999);
  });

  test('exitToTitle で state がクリアされる', async () => {
    const { result } = renderHook(() => useGameState(), { wrapper });
    await act(async () => {
      await result.current.startNewGame(0, 'ギルド');
    });
    act(() => result.current.exitToTitle());
    expect(result.current.slot).toBeNull();
    expect(result.current.save).toBeNull();
  });
});
