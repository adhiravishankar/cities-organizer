import { RouterProvider } from 'react-router';

import { createRouter } from './routes/routes';
import { AppStore } from './stores/AppStore';
import { MetrosContainer } from './stores/MetrosStore';
import { ModalsContainer } from './stores/ModalsStore';


export function App() {
  const store = new AppStore();
  const router = createRouter(store);

  return (
    <ModalsContainer.Provider>
      <MetrosContainer.Provider>
        <RouterProvider router={ router } />
      </MetrosContainer.Provider>
    </ModalsContainer.Provider>
  );
}

