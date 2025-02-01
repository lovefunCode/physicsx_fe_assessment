import { createBrowserRouter } from 'react-router';

import mainRoutes from './pages/routes';
import Root from './Root';

const routesConfiguration = [
  {
    children: [
      ...mainRoutes,
    ],
    element: <Root />,
    path: '/',
  },
];

export const router = createBrowserRouter(routesConfiguration);

export default router;
