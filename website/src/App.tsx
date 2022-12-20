import { AppStore } from './stores/AppStore';
import { RouterProvider } from 'react-router-dom';
import { createRouter } from './routes/routes';

export function App() {
  const store = new AppStore();
  const router = createRouter(store);

  return <RouterProvider router={ router } />;
}
