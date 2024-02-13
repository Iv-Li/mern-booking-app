export enum ERoutes {
  HOME = '/',
  ADD_HOTEL='/add-hotel',
  BOOKING = '/hotels/:hotelId/booking',
  EDIT_HOTEL='/edit-hotel',
  HOTEL_DETAILS='/hotel-details',
  SEARCH = '/hotels/search',
  DONE_BOOKINGS = '/bookings/done',
  HOST_HOTELS = '/hotels/host',
  LOGIN = '/login',
  REGISTER = '/register',
  PRIVACY_POLICY = '/privacy-policy',
  TERMS_OF_USE = '/terms-of-use',
  FORGOT_PASSWORD = '/user/forgot-password',
  RESET_PASSWORD = '/user/reset-password',
  NOT_FOUND = '/not-found',
}

export const setRoutes = {
  BOOKING: (hotelId: string): string => `/hotels/${hotelId}/booking`
} as const