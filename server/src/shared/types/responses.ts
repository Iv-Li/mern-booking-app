import type { IHotel } from '@/shared/types/types';

export interface ResMessage {
  message: 'success' | 'failed'
}
export interface IHotelSearchRes extends ResMessage{
  data: IHotel[],
  pagination: {
    total: number,
    page: number,
    pages: number
  }
}

export interface MyHotelsRes extends ResMessage {
  data: IHotel[]
}