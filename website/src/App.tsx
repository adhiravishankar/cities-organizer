import { RouterProvider } from 'react-router';

import { createRouter } from './routes/routes';
import { AppStore } from './stores/AppStore';
import { ModalsContainer } from './stores/ModalsStore';


export function App() {
  const store = new AppStore();
  const router = createRouter(store);

  return (
    <ModalsContainer.Provider>
      <RouterProvider router={ router } />
    </ModalsContainer.Provider>
  );
}

