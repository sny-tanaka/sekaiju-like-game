import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { Page as SaveTransferPage } from '@/pages/save-transfer';
import { GameStateProvider } from '@/store/gameState';
import { NavigationProvider, useNavigation } from '@/store/navigation';

// audio 系のモック（useSfx が Web Audio を参照するため）
vi.mock('@/audio/useSfx', () => ({
  useSfx: () => () => undefined,
}));

// saveStore のモック（IndexedDB を使わない）
vi.mock('@/store/saveStore', () => ({
  saveGame: vi.fn(async () => undefined),
  loadGame: vi.fn(async () => ({ ok: false as const, reason: 'empty' as const })),
  deleteGame: vi.fn(async () => undefined),
  getSaveMeta: vi.fn(async () => null),
  _resetDbForTest: vi.fn(async () => undefined),
}));

// URL.createObjectURL / revokeObjectURL のモック
Object.defineProperty(URL, 'createObjectURL', {
  value: vi.fn(() => 'blob:http://localhost/test'),
  configurable: true,
  writable: true,
});
Object.defineProperty(URL, 'revokeObjectURL', {
  value: vi.fn(),
  configurable: true,
  writable: true,
});

// ナビゲーション状態を表示するヘルパー
function NavigationDisplay() {
  const { screen } = useNavigation();
  return <div data-testid="current-screen">{screen.name}</div>;
}

function renderSaveTransferPage() {
  return render(
    <GameStateProvider>
      <NavigationProvider initialScreen={{ name: 'saveTransfer' }}>
        <NavigationDisplay />
        <SaveTransferPage />
      </NavigationProvider>
    </GameStateProvider>
  );
}

describe('SaveTransferPage', () => {
  test('SaveTransfer コンポーネントが描画される', () => {
    renderSaveTransferPage();
    // SaveTransfer コンポーネントのタイトルが表示される
    expect(screen.getByText('セーブの引き継ぎ')).toBeInTheDocument();
  });

  test('「もどる」ボタンクリックで navigate({ name: "title" }) が呼ばれる', async () => {
    const user = userEvent.setup();
    renderSaveTransferPage();

    const backBtn = screen.getByRole('button', { name: 'もどる' });
    expect(backBtn).toBeInTheDocument();

    await user.click(backBtn);

    expect(screen.getByTestId('current-screen').textContent).toBe('title');
  });
});
