import { createContext, useCallback, useContext, useMemo, useReducer, useRef } from 'react';
import type { Dispatch, ReactNode, RefObject } from 'react';

import { createInitialSaveData } from '@/domain/saveData';
import type { SaveData } from '@/domain/types';
import { loadGame, saveGame } from '@/store/saveStore';

// ============================================================================
// ゲーム状態ストア（[05 §6]）。セーブは1つ。
// 永続化対象 SaveData を単一の真実とする。状態遷移は純粋な reducer に寄せ、
// 永続化（IndexedDB 書き込み）は provider の effect 層（async メソッド）で行う。
// ============================================================================

interface GameState {
  save: SaveData | null;
  saving: boolean;
}

type Action =
  | { type: 'load'; save: SaveData }
  | { type: 'updateSave'; updater: (prev: SaveData) => SaveData }
  | { type: 'setSave'; save: SaveData }
  | { type: 'saving'; saving: boolean }
  | { type: 'clear' };

const initialState: GameState = { save: null, saving: false };

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'load':
      return { ...state, save: action.save };
    case 'updateSave':
      return state.save ? { ...state, save: action.updater(state.save) } : state;
    case 'setSave':
      return { ...state, save: action.save };
    case 'saving':
      return { ...state, saving: action.saving };
    case 'clear':
      return { ...initialState };
  }
}

interface GameStateContextValue extends GameState {
  /** 新規ゲームを開始して初期セーブを書き込む（既存セーブは上書き）。 */
  startNewGame: (guildName: string) => Promise<void>;
  /** セーブを読み込む。成功可否を返す。 */
  continueGame: () => Promise<{ ok: boolean; reason?: string }>;
  /** メモリ上の SaveData を純粋に更新する。 */
  applySave: (updater: (prev: SaveData) => SaveData) => void;
  /** SaveData を更新し、その結果を即座に永続化する（階移動・帰還などのオートセーブ契機）。 */
  applyAndPersist: (updater: (prev: SaveData) => SaveData) => Promise<void>;
  /** 現在の SaveData を永続化する（オートセーブ契機で呼ぶ）。 */
  persist: () => Promise<void>;
  /** タイトルへ戻る（メモリ状態クリア。セーブは消さない）。 */
  exitToTitle: () => void;
}

const GameStateContext = createContext<GameStateContextValue | null>(null);

/** 最新 state を ref で保持し、async コールバックから参照できるようにする。 */
function useStateRef<T>(value: T): RefObject<T> {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}

export function GameStateProvider({
  children,
  initialSave,
}: {
  children: ReactNode;
  initialSave?: SaveData;
}) {
  const [state, dispatch] = useReducer(
    reducer,
    initialSave ? { save: initialSave, saving: false } : initialState
  );
  const stateRef = useStateRef(state);

  const startNewGame = useCallback(async (guildName: string) => {
    const save = createInitialSaveData(guildName);
    const stamped = await saveGame(save);
    dispatch({ type: 'load', save: stamped });
  }, []);

  const continueGame = useCallback(async () => {
    const result = await loadGame();
    if (!result.ok) {
      return { ok: false, reason: result.reason };
    }
    dispatch({ type: 'load', save: result.data });
    return { ok: true };
  }, []);

  const applySave = useCallback((updater: (prev: SaveData) => SaveData) => {
    dispatch({ type: 'updateSave', updater });
  }, []);

  const applyAndPersist = useCallback(
    async (updater: (prev: SaveData) => SaveData) => {
      const prev = stateRef.current.save;
      if (!prev) return;
      const next = updater(prev);
      dispatch({ type: 'setSave', save: next });
      dispatch({ type: 'saving', saving: true });
      try {
        const stamped = await saveGame(next);
        dispatch({ type: 'setSave', save: stamped });
      } finally {
        dispatch({ type: 'saving', saving: false });
      }
    },
    [stateRef]
  );

  const persist = useCallback(async () => {
    const { save } = stateRef.current;
    if (!save) return;
    dispatch({ type: 'saving', saving: true });
    try {
      const stamped = await saveGame(save);
      dispatch({ type: 'setSave', save: stamped });
    } finally {
      dispatch({ type: 'saving', saving: false });
    }
  }, [stateRef]);

  const exitToTitle = useCallback(() => {
    dispatch({ type: 'clear' });
  }, []);

  const value = useMemo<GameStateContextValue>(
    () => ({
      ...state,
      startNewGame,
      continueGame,
      applySave,
      applyAndPersist,
      persist,
      exitToTitle,
    }),
    [state, startNewGame, continueGame, applySave, applyAndPersist, persist, exitToTitle]
  );

  return <GameStateContext.Provider value={value}>{children}</GameStateContext.Provider>;
}

export function useGameState(): GameStateContextValue {
  const ctx = useContext(GameStateContext);
  if (!ctx) {
    throw new Error('useGameState は GameStateProvider の内側で使ってください');
  }
  return ctx;
}

export type { GameState };
export type GameStateDispatch = Dispatch<Action>;
