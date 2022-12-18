import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import '../scss/index.scss';

const root = createRoot(document.getElementById('root'));
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
root.render(app);
