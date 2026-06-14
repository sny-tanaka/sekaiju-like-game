import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { deleteDB } from 'idb';
import { MemoryRouter, Route, Routes } from 'react-router';

import { Page as TitlePage } from '@/pages/title';
import { GameStateProvider } from '@/store/gameState';
import { _resetDbForTest } from '@/store/saveStore';

function renderApp() {
  return render(
    <GameStateProvider>
      <MemoryRouter initialEntries={['/title']}>
        <Routes>
          <Route
            path="/title"
            element={<TitlePage />}
          />
          <Route
            path="/town"
            element={<div>拠点画面</div>}
          />
        </Routes>
      </MemoryRouter>
    </GameStateProvider>
  );
}

beforeEach(async () => {
  await _resetDbForTest();
  await deleteDB('sekaiju-like-game');
  localStorage.clear();
});

describe('TitlePage', () => {
  test('空スロットから新規作成して拠点へ遷移する', async () => {
    const user = userEvent.setup();
    renderApp();

    // スロット一覧が読み込まれる
    await waitFor(() => expect(screen.getAllByText('空きスロット').length).toBeGreaterThan(0));

    // 最初のスロットで新規作成
    await user.click(screen.getAllByRole('button', { name: '新規作成' })[0]);

    // ギルド名入力
    const input = screen.getByPlaceholderText('ななしのギルド');
    await user.type(input, '勇者の集い');
    await user.click(screen.getByRole('button', { name: 'はじめる' }));

    // 拠点へ遷移
    await waitFor(() => expect(screen.getByText('拠点画面')).toBeInTheDocument());
  });
});
