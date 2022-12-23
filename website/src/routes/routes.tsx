import { createBrowserRouter } from 'react-router-dom';

import { Login } from '../pages/Login';
import { MetroPage } from '../pages/metro-page/MetroPage';
import { MetrosPage } from '../pages/metros-page/MetrosPage';
import { Signup } from '../pages/Signup';
import { AppStore } from '../stores/AppStore';

export function createRouter(store: AppStore) {
  return createBrowserRouter([
    {
      path: '/login',
      element: <Login store={ store } />,
    },
    {
      path: '/signup',
      element: <Signup store={ store } />,
    },
    {
      path: '/',
      loader: async () => {
        await store.fetchMetros();
        return null;
      },
      element: <MetrosPage store={store}/>,
    },
    {
      path: 'metros/:metro',
      loader: async ({ params }) => {
        await store.fetchMetros();
        // @ts-ignore
        await store.fetchMetroPics(params.metro);
        return null;
      },
      element: <MetroPage store={store}/>,
    },
  ]);
}
