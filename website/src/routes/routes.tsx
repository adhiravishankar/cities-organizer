import { createBrowserRouter } from 'react-router-dom';

import { About } from '../pages/About';
import { AddCityPage } from '../pages/AddCityPage';
import { AddMetroPage } from '../pages/AddMetroPage';
import { AddNeighborhoodPage } from '../pages/AddNeighborhoodPage';
import { CityPage } from '../pages/CityPage';
import { Home } from '../pages/Home';
import { MetroPage } from '../pages/MetroPage';
import { NeighborhoodPage } from '../pages/NeighborhoodPage';

export function createRouter() {
  return createBrowserRouter([
    {
      path: '/',
      loader: async () => {
        return null;
      },
      element: <Home />,
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: 'metros/:metro',
      loader: async ({ params }) => {
        return null;
      },
      element: <MetroPage />,
    },
    {
      path: 'cities/:city',
      loader: async ({ params }) => {
        return null;
      },
      element: <CityPage />,
    },
    {
      path: 'neighborhoods/:neighborhood',
      loader: async ({ params }) => {
        return null;
      },
      element: <NeighborhoodPage />,
    },
    {
      path: '/add-city',
      loader: async () => {
        return null;
      },
      element: <AddCityPage />,
    },
    {
      path: '/add-metro',
      loader: async () => {
        return null;
      },
      element: <AddMetroPage />,
    },
    {
      path: '/add-neighborhood',
      loader: async () => {
        return null;
      },
      element: <AddNeighborhoodPage />,
    },
  ]);
}
