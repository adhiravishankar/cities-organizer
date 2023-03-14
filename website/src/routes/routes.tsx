import { createBrowserRouter } from 'react-router-dom';

import { CitiesAPI } from '../apis/CitiesAPI';
import { MetroAPI } from '../apis/MetroAPI';
import { NeighborhoodAPI } from '../apis/NeighborhoodAPI';
import { About } from '../pages/About';
import { AddCityPage } from '../pages/AddCityPage';
import { AddMetroPage } from '../pages/AddMetroPage';
import { AddNeighborhoodPage } from '../pages/AddNeighborhoodPage';
import { CityPage } from '../pages/CityPage';
import { Home } from '../pages/Home';
import { MetroPage } from '../pages/MetroPage';
import { NeighborhoodPage } from '../pages/NeighborhoodPage';

export function createRouter() {
  const metroAPI = new MetroAPI();
  const cityAPI = new CitiesAPI();
  const neighborhoodAPI = new NeighborhoodAPI();
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
      loader: async ({ params }) => metroAPI.getMetro(params.metro),
      element: <MetroPage />,
    },
    {
      path: 'cities/:city',
      loader: async ({ params }) => cityAPI.readCity(params.city),
      element: <CityPage />,
    },
    {
      path: 'neighborhoods/:neighborhood',
      loader: async ({ params }) => neighborhoodAPI.getNeighborhood(params.neighborhood),
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
