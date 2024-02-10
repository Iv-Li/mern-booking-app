import { createBrowserRouter } from 'react-router-dom';
import { ERoutes } from '@/types';
import { MainLayout } from '@/components/layoutes';
import {
  AddHotel,
  Booking,
  EditHotel,
  Home,
  HotelDetails,
  Login,
  MyHotels,
  Register,
  Search,
  DoneBookings,
  TermsOfUse
} from '@/pages';
import { MyHotelErrorBoundary } from '@/errorBoundaries';

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
        path: ERoutes.HOST_HOTELS,
        element: <MyHotels />,
        errorElement: <MyHotelErrorBoundary />
      },
      {
        path: ERoutes.HOTEL_DETAILS + '/:hotelId',
        element: <HotelDetails />
      },
      {
        path: ERoutes.EDIT_HOTEL + '/:hotelId',
        element: <EditHotel />
      },
      {
        path: ERoutes.DONE_BOOKINGS,
        element: <DoneBookings />
      },
      {
        path: ERoutes.SEARCH,
        element: <Search />
      },
      {
        path: ERoutes.ADD_HOTEL,
        element: <AddHotel />
      },
      {
        path: ERoutes.BOOKING,
        element: <Booking />
      },
      {
        path: ERoutes.TERMS_OF_USE,
        element: <TermsOfUse />
      },
    ]
  }
])