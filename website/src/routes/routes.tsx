import { createBrowserRouter } from 'react-router-dom';

import { CityPage } from '../pages/city-page/CityPage';
import { Login } from '../pages/Login';
import { MetroPage } from '../pages/metro-page/MetroPage';
import { MetrosPage } from '../pages/metros-page/MetrosPage';
import { Signup } from '../pages/Signup';
import { AppStore } from '../stores/AppStore';
import {NeighborhoodPage} from "../pages/neighborhood-page/NeighborhoodPage";

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
        await store.fetchMetro(params.metro);
        return null;
      },
      element: <MetroPage store={store}/>,
    },
    {
      path: 'cities/:city',
      loader: async ({ params }) => {
        await store.fetchMetros();
        // @ts-ignore
        await store.fetchCity(params.city);
        return null;
      },
      element: <CityPage store={store}/>,
    },
    {
      path: 'neighborhoods/:neighborhood',
      loader: async ({ params }) => {
        await store.fetchMetros();
        // @ts-ignore
        await store.fetchNeighborhood(params.neighborhood);
        return null;
      },
      element: <NeighborhoodPage store={store}/>,
    },
  ]);
}
