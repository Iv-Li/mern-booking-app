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
}

export const setRoutes = {
  BOOKING: (hotelId: string): string => `/hotels/${hotelId}/booking`
} as const