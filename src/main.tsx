import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from '@/App';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find #root element');

createRoot(container).render(
  <BrowserRouter basename="/__REPO_NAME__">
    <App />
  </BrowserRouter>
);
