import { createBrowserRouter } from 'react-router-dom';
import { ERoutes } from '@/types';
import { MainLayout } from '@/components/layoutes';
import { ProtectedRoute } from '@/components/logic';
import {
  AddHotel,
  Booking,
  DoneBookings,
  EditHotel,
  ForgotPassword,
  Home,
  HotelDetails,
  Login,
  MyHotels,
  NotFound,
  Register,
  ResetPassword,
  Search,
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
        element: (
          <ProtectedRoute>
            <MyHotels />
          </ProtectedRoute>
        ),
        errorElement: <MyHotelErrorBoundary />
      },
      {
        path: ERoutes.HOTEL_DETAILS + '/:hotelId',
        element: <HotelDetails />
      },
      {
        path: ERoutes.EDIT_HOTEL + '/:hotelId',
        element: (
          <ProtectedRoute>
            <EditHotel />
          </ProtectedRoute>
        )
      },
      {
        path: ERoutes.DONE_BOOKINGS,
        element: (
          <ProtectedRoute>
            <DoneBookings />
          </ProtectedRoute>
          )
      },
      {
        path: ERoutes.SEARCH,
        element: <Search />
      },
      {
        path: ERoutes.ADD_HOTEL,
        element: (
          <ProtectedRoute>
            <AddHotel />
          </ProtectedRoute>
        )
      },
      {
        path: ERoutes.BOOKING,
        element: (
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        )
      },
      {
        path: ERoutes.TERMS_OF_USE,
        element: <TermsOfUse />
      },
      {
        path: ERoutes.FORGOT_PASSWORD,
        element: <ForgotPassword />
      },
      {
        path: ERoutes.RESET_PASSWORD,
        element: <ResetPassword />
      },
    ],
  },
  {
    path: ERoutes.NOT_FOUND,
    element: (
      <MainLayout isFooterHidden>
        <NotFound />
      </MainLayout>
    )
  },
  {
    path: '*',
    element: (
      <MainLayout isFooterHidden>
        <NotFound />
      </MainLayout>
    )
  }
])