import type { RegisterFormData, LoginFormData } from '@/types';
import { throwError } from '@/utils';
import type { IMyHotelDetailsRes, MyHotelsRes } from 'server/shared/types';

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