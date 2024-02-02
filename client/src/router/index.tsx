import { createBrowserRouter } from 'react-router-dom';
import { ERoutes } from '@/types';
import { MainLayout } from '@/components/layoutes';
import { Home, Login, Register, AddHotel } from '@/pages';

export const router = createBrowserRouter([
  {
    path: ERoutes.HOME,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: ERoutes.REGISTER,
        element: <Register />
      },
      {
        path: ERoutes.LOGIN,
        element: <Login />
      },
      {
        path: ERoutes.MY_HOTELS,
        element: <>My Hotels</>
      },
      {
        path: ERoutes.MY_HOTELS + '/:hotelId',
        element: <>One My Hotel</>
      },
      {
        path: ERoutes.SEARCH,
        element: <>Search</>
      },
      {
        path: ERoutes.ADD_HOTEL,
        element: <AddHotel />
      },
    ]
  }
])