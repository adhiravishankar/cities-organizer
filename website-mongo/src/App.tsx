import { RouterProvider } from 'react-router';

import { createRouter } from './routes/routes';
import { AppStore } from './stores/AppStore';


export function App() {
  const store = new AppStore();
  const router = createRouter(store);

  return <RouterProvider router={ router } />;
}

