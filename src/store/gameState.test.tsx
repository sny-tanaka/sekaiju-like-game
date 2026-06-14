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
});

describe('gameState store (単一セーブ)', () => {
  test('startNewGame で団員0人の SaveData が生成される', async () => {
    const { result } = renderHook(() => useGameState(), { wrapper });
    await act(async () => {
      await result.current.startNewGame('マイギルド');
    });
    expect(result.current.save?.guild.name).toBe('マイギルド');
    expect(result.current.save?.guild.members).toHaveLength(0);
    expect(result.current.save?.diveState).toBeNull();
  });

  test('continueGame で保存済みセーブを再開できる', async () => {
    const first = renderHook(() => useGameState(), { wrapper });
    await act(async () => {
      await first.result.current.startNewGame('リロードギルド');
    });

    const second = renderHook(() => useGameState(), { wrapper });
    await act(async () => {
      const r = await second.result.current.continueGame();
      expect(r.ok).toBe(true);
    });
    expect(second.result.current.save?.guild.name).toBe('リロードギルド');
  });

  test('continueGame はセーブが無ければ ok:false', async () => {
    const { result } = renderHook(() => useGameState(), { wrapper });
    let res: { ok: boolean } = { ok: true };
    await act(async () => {
      res = await result.current.continueGame();
    });
    expect(res.ok).toBe(false);
  });

  test('applySave で更新し、persist で永続化される', async () => {
    const { result } = renderHook(() => useGameState(), { wrapper });
    await act(async () => {
      await result.current.startNewGame('ギルド');
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

    const reload = renderHook(() => useGameState(), { wrapper });
    await act(async () => {
      await reload.result.current.continueGame();
    });
    expect(reload.result.current.save?.guild.gold).toBe(9999);
  });

  test('exitToTitle で state がクリアされる（セーブは残る）', async () => {
    const { result } = renderHook(() => useGameState(), { wrapper });
    await act(async () => {
      await result.current.startNewGame('ギルド');
    });
    act(() => result.current.exitToTitle());
    expect(result.current.save).toBeNull();

    // セーブ自体は残っているので再開できる
    await act(async () => {
      await result.current.continueGame();
    });
    expect(result.current.save?.guild.name).toBe('ギルド');
  });
});
