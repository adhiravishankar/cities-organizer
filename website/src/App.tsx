import { RouterProvider } from 'react-router';

import { createRouter } from './routes/routes';
import { MetrosContainer } from './stores/MetrosStore';
import { ModalsContainer } from './stores/ModalsStore';


export function App() {
  const router = createRouter();

  return (
    <ModalsContainer.Provider>
      <MetrosContainer.Provider>
        <RouterProvider router={ router } />
      </MetrosContainer.Provider>
    </ModalsContainer.Provider>
  );
}

