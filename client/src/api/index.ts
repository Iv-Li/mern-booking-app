import type { RegisterFormData, LoginFormData, ForgotPasswordForm } from '@/types';
import { throwError } from '@/utils';
import {
  IHotelSearchRes,
  IMyHotelDetailsRes,
  MyHotelsRes,
  IUserRes,
  ILogout,
  IHotelRes,
  IAllUserBookingRes,
  IResetPasswordReq
} from 'server/shared/types';

const BASE_URL = import.meta.env.VITE_BASE_URL

export type RegisterFn = (formData: RegisterFormData) => Promise<IUserRes> | never
export const register: RegisterFn = async (formData) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })

  const resBody = await res.json()

  if (!res.ok) {
    throwError(resBody)
  }

  return resBody
}

export const login = async (formData: LoginFormData): Promise<IUserRes> | never => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })

  const resBody = await res.json()

  if (!res.ok) {
    throwError(resBody)
  }

  return resBody as IUserRes
}

export const logout = async (): Promise<ILogout | never> => {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  })

  if(!res.ok) {
    throwError('Error signing out')
  }

  return res.json()
}

export const validateToken = async (): Promise<IUserRes> | never => {
  const res = await fetch(`${BASE_URL}/auth/validate-token`, {
    credentials: 'include'
  })

  if(!res.ok) {
    throwError('Error validating token')
  }

  return res.json()
}

export const forgotPassword = async (data: ForgotPasswordForm): Promise<void> | never => {
  const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const resData = await res.json()

  if(!res.ok) {
    throwError(resData || 'Error getting forgetting password link')
  }
}

export const resetPassword = async (data: IResetPasswordReq): Promise<void> | never => {
  const res = await fetch(`${BASE_URL}/auth/reset-password`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const resData = await res.json()

  if(!res.ok) {
    throwError(resData || 'Error getting resetting password')
  }
}

export const addHotel = async (formData: FormData): Promise<IHotelRes> | never => {
  const res = await fetch(`${BASE_URL}/my-hotels`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })

  const resBody = await res.json()

  if (!res.ok) {
    throwError(resBody)
  }

  return resBody
}

export const fetchMyHotels = async (): Promise<MyHotelsRes> | never => {
  const res = await fetch(`${BASE_URL}/my-hotels`, {
    method: 'GET',
    credentials: 'include',
  })

  if(!res.ok) {
    throwError('Error fetching hotels')
  }

  return res.json()
}

export const fetchHotelById = async (hotelId: string): Promise<IMyHotelDetailsRes> | never => {
  const res = await fetch(`${BASE_URL}/hotels/${hotelId}`, {
    method: 'GET',
    credentials: 'include',
  })

  const resBody = await res.json()

  if(!res.ok) {
    throwError(resBody)
  }

  return resBody
}

export const editMyHotel = async (formData: FormData): Promise<IMyHotelDetailsRes> => {
  const res = await fetch(`${BASE_URL}/my-hotels/${formData.get('hotelId')}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(formData)
  })

  const resBody = await res.json()

  if(!res.ok) {
    throwError(resBody)
  }

  return resBody
}

export interface  ISearchQuery {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
}
export const searchHotels = async (searchParams: ISearchQuery): Promise<IHotelSearchRes> => {
  const {
    destination,
    checkIn,
    checkOut,
    adultCount,
    childCount,
    page,
    facilities,
    types,
    stars,
    maxPrice,
    sortOption
  } = searchParams

  const queryParams = new URLSearchParams()

  destination && queryParams.append('destination', destination)
  checkIn && queryParams.append('checkIn', checkIn)
  checkOut && queryParams.append('checkOut', checkOut)
  adultCount && queryParams.append('adultCount', adultCount)
  childCount && queryParams.append('childCount', childCount)
  page && queryParams.append('page', page)
  facilities && queryParams.append('facilities', facilities.join(','))
  types && queryParams.append('types', types.join(','))
  stars && queryParams.append('stars', stars.join(','))
  maxPrice && queryParams.append('maxPrice', maxPrice)
  sortOption && queryParams.append('sortOption', sortOption)

  const res = await fetch(`${BASE_URL}/hotels/search?${queryParams}`)

  const resBody = await res.json()

  if(!res.ok) {
    throwError(resBody)
  }

  return resBody
}

export const fetchCurrentUser = async (): Promise<IUserRes | never> => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    credentials: 'include'
  })

  if(!res.ok) {
    throwError('User not found')
  }
  return res.json()
}

export const fetchMyBookings = async (): Promise<IAllUserBookingRes | never> => {
  const res = await fetch(`${BASE_URL}/bookings/host`, {
    credentials: 'include'
  })

  if(!res.ok) {
    throwError('Bookings not found')
  }
  return res.json()
}

export const fetchGuestBookings = async (): Promise<IAllUserBookingRes | never> => {
  const res = await fetch(`${BASE_URL}/bookings/guest`, {
    credentials: 'include'
  })

  if(!res.ok) {
    throwError('Bookings not found')
  }
  return res.json()
}