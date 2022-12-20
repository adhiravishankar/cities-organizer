import { MetrosPage } from './pages/metros/MetrosPage';
import { AppStore } from './stores/AppStore';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MetroPage } from './pages/metros/MetroPage';

export function App() {
  const store = new AppStore();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MetrosPage store={ store }/>,
    },
    {
      path: 'metros/:metro',
      element: <MetroPage />,
    },
  ]);

  return <RouterProvider router={ router } />;
}
