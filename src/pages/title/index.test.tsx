import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { deleteDB } from 'idb';

import { createInitialSaveData } from '@/domain/saveData';
import { Page as TitlePage } from '@/pages/title';
import { GameStateProvider } from '@/store/gameState';
import { NavigationProvider, useNavigation } from '@/store/navigation';
import { _resetDbForTest, saveGame } from '@/store/saveStore';

function Harness() {
  const { screen } = useNavigation();
  if (screen.name === 'town') return <div>拠点画面</div>;
  return <TitlePage />;
}

function renderApp() {
  return render(
    <GameStateProvider>
      <NavigationProvider>
        <Harness />
      </NavigationProvider>
    </GameStateProvider>
  );
}

beforeEach(async () => {
  await _resetDbForTest();
  await deleteDB('sekaiju-like-game');
});

describe('TitlePage', () => {
  test('セーブが無い場合は「最初から」で新規作成して拠点へ遷移する', async () => {
    const user = userEvent.setup();
    renderApp();

    await waitFor(() =>
      expect(screen.getByRole('button', { name: '最初から' })).toBeInTheDocument()
    );
    await user.click(screen.getByRole('button', { name: '最初から' }));

    // セーブが無いので確認ダイアログは出ず、直接ギルド名入力
    const input = await screen.findByPlaceholderText('ななしのギルド');
    await user.type(input, '勇者の集い');
    await user.click(screen.getByRole('button', { name: 'はじめる' }));

    await waitFor(() => expect(screen.getByText('拠点画面')).toBeInTheDocument());
  });

  test('既存セーブがある場合「最初から」は確認ダイアログを挟む', async () => {
    await saveGame(createInitialSaveData('既存ギルド'));
    const user = userEvent.setup();
    renderApp();

    // つづきから が出る
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'つづきから' })).toBeInTheDocument()
    );

    // 最初から → 確認ダイアログ
    await user.click(screen.getByRole('button', { name: '最初から' }));
    expect(await screen.findByText('最初から始めますか？')).toBeInTheDocument();
    expect(screen.getByText(/既存ギルド/)).toBeInTheDocument();

    // 消して始める → ギルド名入力へ
    await user.click(screen.getByRole('button', { name: 'データを消して始める' }));
    expect(await screen.findByPlaceholderText('ななしのギルド')).toBeInTheDocument();
  });
});
