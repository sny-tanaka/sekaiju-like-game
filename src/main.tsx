import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import '@/index.scss';

import App from '@/App';
import { SoundProvider } from '@/audio/SoundProvider';
import { validateMasters } from '@/data/validateMasters';
import { GameStateProvider } from '@/store/gameState';

// 起動時にマスターデータの整合性を検証する（[05 §6]）。
// 問題があれば開発時に気づけるよう警告を出す（本番表示は将来検討）。
const validation = validateMasters();
if (!validation.ok) {
  console.error('マスターデータ検証エラー:', validation.errors);
}

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find #root element');

createRoot(container).render(
  <BrowserRouter basename="/sekaiju-like-game">
    <SoundProvider>
      <GameStateProvider>
        <App />
      </GameStateProvider>
    </SoundProvider>
  </BrowserRouter>
);
