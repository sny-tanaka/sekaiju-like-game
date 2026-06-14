import { Navigate, Route, Routes } from 'react-router';

import { Page as BattlePage } from '@/pages/battle';
import { Page as DungeonPage } from '@/pages/dungeon';
import { Page as NotFoundPage } from '@/pages/not-found';
import { Page as TitlePage } from '@/pages/title';
import { Page as TownPage } from '@/pages/town';

// 画面遷移（[07 §1]）: タイトル / 拠点 / 探索 / 戦闘。
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to="/title"
            replace
          />
        }
      />
      <Route
        path="/title"
        element={<TitlePage />}
      />
      <Route
        path="/town"
        element={<TownPage />}
      />
      <Route
        path="/dungeon"
        element={<DungeonPage />}
      />
      <Route
        path="/battle"
        element={<BattlePage />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;
