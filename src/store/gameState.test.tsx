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

  describe('flag (探索画面の旗 / 戦闘を跨いで保持)', () => {
    test('初期値は null', () => {
      const { result } = renderHook(() => useGameState(), { wrapper });
      expect(result.current.flag).toBeNull();
    });

    test('setFlag で値を直接設定できる', () => {
      const { result } = renderHook(() => useGameState(), { wrapper });
      act(() => result.current.setFlag({ x: 3, y: 5 }));
      expect(result.current.flag).toEqual({ x: 3, y: 5 });
    });

    test('setFlag(null) で解除できる', () => {
      const { result } = renderHook(() => useGameState(), { wrapper });
      act(() => result.current.setFlag({ x: 2, y: 2 }));
      act(() => result.current.setFlag(null));
      expect(result.current.flag).toBeNull();
    });

    test('setFlag は関数形式の updater も受け付ける（既存 useState 互換）', () => {
      const { result } = renderHook(() => useGameState(), { wrapper });
      act(() => result.current.setFlag({ x: 1, y: 1 }));
      act(() => result.current.setFlag((prev) => (prev ? { x: prev.x + 1, y: prev.y } : null)));
      expect(result.current.flag).toEqual({ x: 2, y: 1 });
    });

    test('exitToTitle で flag もクリアされる', async () => {
      const { result } = renderHook(() => useGameState(), { wrapper });
      await act(async () => {
        await result.current.startNewGame('ギルド');
      });
      act(() => result.current.setFlag({ x: 4, y: 4 }));
      expect(result.current.flag).toEqual({ x: 4, y: 4 });
      act(() => result.current.exitToTitle());
      expect(result.current.flag).toBeNull();
    });
  });
});
