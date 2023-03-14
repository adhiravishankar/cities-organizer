import { RouterProvider } from 'react-router';

import { createRouter } from './routes/routes';
import { CitiesContainer } from './stores/CitiesStore';
import { MetrosContainer } from './stores/MetrosStore';
import { ModalsContainer } from './stores/ModalsStore';
import { NeighborhoodsContainer } from './stores/NeighborhoodsStore';


export function App() {
  const router = createRouter();

  return (
    <ModalsContainer.Provider>
      <MetrosContainer.Provider>
        <CitiesContainer.Provider>
          <NeighborhoodsContainer.Provider>
            <RouterProvider router={ router } />
          </NeighborhoodsContainer.Provider>
        </CitiesContainer.Provider>
      </MetrosContainer.Provider>
    </ModalsContainer.Provider>
  );
}

