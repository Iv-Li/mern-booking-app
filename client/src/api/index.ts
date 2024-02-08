import { RegisterFormData, LoginFormData } from '@/types';
import { throwError } from '@/utils';
import type { IHotelSearchRes, IMyHotelDetailsRes, MyHotelsRes, IUserRes } from 'server/shared/types';

const BASE_URL = import.meta.env.VITE_BASE_URL

export type RegisterFn = (formData: RegisterFormData) => Promise<void>
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
}

export const login = async (formData: LoginFormData) => {
  console.log({ url: BASE_URL})
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

  return resBody
}

export const addHotel = async (formData: FormData) => {
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

export const fetchMyHotelById = async (hotelId: string): Promise<IMyHotelDetailsRes> | never => {
  const res = await fetch(`${BASE_URL}/my-hotels/${hotelId}`, {
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
  console.log('WORK')
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