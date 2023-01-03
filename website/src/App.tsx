import { RouterProvider } from 'react-router';

import { createRouter } from './common/routes/routes';
import { AppStore } from './common/stores/AppStore';


export function App() {
  const store = new AppStore();
  const router = createRouter(store);

  return <RouterProvider router={ router } />;
}

