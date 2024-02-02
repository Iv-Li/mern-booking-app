import type { RegisterFormData, LoginFormData } from '@/types';
import { throwError } from '@/utils';

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