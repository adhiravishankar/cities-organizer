import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

const root = createRoot(document.getElementById('root'));

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
root.render(app);