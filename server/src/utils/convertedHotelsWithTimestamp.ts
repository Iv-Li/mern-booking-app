import { convertedToTimestamp } from '@/utils/convertedToTimestamp';
import { IHotel, IHotelRes } from '@/shared/types';

export const convertOneHotelWithTimestamp = (hotel: IHotel): IHotelRes => {
  return {
    ...hotel,
    lastUpdated: convertedToTimestamp(hotel.lastUpdated)
  }
}

export const convertedHotelsWithTimestamp = (hotelsData: IHotel[]): IHotelRes[] => hotelsData.map(hotel => convertOneHotelWithTimestamp(hotel))