import { convertedToTimestamp } from '@/utils/convertedToTimestamp';
import type { IHotel, IHotelRes } from '@/shared/types';
import type { Document, Types } from 'mongoose';

export const convertOneHotelWithTimestamp = (hotel: IHotel): IHotelRes => {
  return {
    ...hotel,
    lastUpdated: convertedToTimestamp(hotel.lastUpdated)
  }
}

export const convertedHotelsWithTimestamp = <T extends Document<unknown, {}, IHotel> & IHotel & Required<{_id: Types.ObjectId}>>(hotelsData: T[]): IHotelRes[] => {
  return hotelsData.map(hotel => {
    return convertOneHotelWithTimestamp(hotel.toObject())
  });
};