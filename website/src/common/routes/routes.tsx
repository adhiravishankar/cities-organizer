import { createBrowserRouter } from 'react-router-dom';

import { CityPage } from '../../pages/CityDetails/CityPage';
import { Home } from '../../pages/Home/Home';
import { AddCityPage } from '../../pages/InsertPages/AddCityPage';
import { AddMetroPage } from '../../pages/InsertPages/AddMetroPage';
import { AddNeighborhoodPage } from '../../pages/InsertPages/AddNeighborhoodPage';
import { MetroPage } from '../../pages/MetroDetails/MetroPage';
import { NeighborhoodPage } from '../../pages/NeighborhoodDetails/NeighborhoodPage';
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
