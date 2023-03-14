import { createBrowserRouter } from 'react-router-dom';

import { About } from '../pages/About';
import { AddCityPage } from '../pages/AddCityPage';
import { AddMetroPage } from '../pages/AddMetroPage';
import { AddNeighborhoodPage } from '../pages/AddNeighborhoodPage';
import { CityPage } from '../pages/CityPage';
import { Home } from '../pages/Home';
import { MetroPage } from '../pages/MetroPage';
import { NeighborhoodPage } from '../pages/NeighborhoodPage';
import { AppStore } from '../stores/AppStore';

export function createRouter(store: AppStore) {
  return createBrowserRouter([
    {
      path: '/',
      loader: async () => {
        await store.initialize();
        return null;
      },
      element: <Home store={store}/>,
    },
    {
      path: '/about',
      loader: async () => {
        await store.about();
        return null;
      },
      element: <About store={store}/>,
    },
    {
      path: 'metros/:metro',
      loader: async ({ params }) => {
        await store.initialize();
        // @ts-ignore
        await store.fetchMetro(params.metro);
        return null;
      },
      element: <MetroPage store={store}/>,
    },
    {
      path: 'cities/:city',
      loader: async ({ params }) => {
        await store.initialize();
        // @ts-ignore
        await store.fetchCity(params.city);
        return null;
      },
      element: <CityPage store={store}/>,
    },
    {
      path: 'neighborhoods/:neighborhood',
      loader: async ({ params }) => {
        await store.initialize();
        // @ts-ignore
        await store.fetchNeighborhood(params.neighborhood);
        return null;
      },
      element: <NeighborhoodPage store={store}/>,
    },
    {
      path: '/add-city',
      loader: async () => {
        await store.initialize();
        return null;
      },
      element: <AddCityPage store={store}/>,
    },
    {
      path: '/add-metro',
      loader: async () => {
        await store.initialize();
        return null;
      },
      element: <AddMetroPage store={store}/>,
    },
    {
      path: '/add-neighborhood',
      loader: async () => {
        await store.initialize();
        return null;
      },
      element: <AddNeighborhoodPage store={store}/>,
    },
  ]);
}
