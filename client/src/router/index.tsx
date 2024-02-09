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
  HostBooking,
  GuestBooking
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
        path: ERoutes.MY_HOTELS,
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
        path: ERoutes.HOST_BOOKINGS,
        element: <HostBooking />
      },
      {
        path: ERoutes.GUEST_BOOKINGS,
        element: <GuestBooking />
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
        path: ERoutes.BOOKING + '/:hotelId',
        element: <Booking />
      },
    ]
  }
])