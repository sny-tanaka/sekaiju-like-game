import { Route, Routes } from 'react-router';

import { Page as HomePage } from '@/pages/home';
import { Page as NotFoundPage } from '@/pages/not-found';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;
