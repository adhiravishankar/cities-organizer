import { RouterProvider } from 'react-router';
import { Router } from './hooks/Router';

import { createRouter } from './routes/routes';
import { CitiesContainer } from './stores/CitiesStore';
import { MetrosContainer } from './stores/MetrosStore';
import { ModalsContainer } from './stores/ModalsStore';
import { NeighborhoodsContainer } from './stores/NeighborhoodsStore';


export function App() {

  return (
    <ModalsContainer.Provider>
      <MetrosContainer.Provider>
        <CitiesContainer.Provider>
          <NeighborhoodsContainer.Provider>
            <Router />
          </NeighborhoodsContainer.Provider>
        </CitiesContainer.Provider>
      </MetrosContainer.Provider>
    </ModalsContainer.Provider>
  );
}

