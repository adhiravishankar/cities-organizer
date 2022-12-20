import { createBrowserRouter } from 'react-router-dom';

import { MetroPage } from '../pages/metros/MetroPage';
import { MetrosPage } from '../pages/metros/metros-page/MetrosPage';
import { AppStore } from '../stores/AppStore';

export function createRouter(store: AppStore) {
  return createBrowserRouter([
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
      loader: async () => {
        await store.fetchMetros();
        return null;
      },
      element: <MetroPage store={store}/>,
    },
  ]);
}
