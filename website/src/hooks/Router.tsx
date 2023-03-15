import { RouterProvider } from 'react-router';

import { createRouter } from '../routes/routes';

export function Router() {
  return <RouterProvider router={ createRouter() } />;
}
