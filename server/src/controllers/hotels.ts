import type { Request, Response } from 'express';
import { Hotel } from '@/models';
import { constructedSearchQuery, convertedHotelsWithTimestamp, convertOneHotelWithTimestamp } from '@/utils';
import { StatusCodes } from 'http-status-codes';
import type { SearchQueryMap, IHotelSearchRes, IMyHotelDetailsRes } from '@/shared/types';
import { setSortOption } from '@/utils/constructedQuery';
import { NotFound } from '@/errors';

// eslint-disable-next-line @typescript-eslint/ban-types
const searchHotel = async (req: Request<{}, {}, {}, SearchQueryMap>, res: Response<IHotelSearchRes>): Promise<void> => {
  const query = constructedSearchQuery(req.query)

  const pageSize = 5
  const page = parseInt(req.query.page ?? '1')
  const skip = (page - 1) * pageSize

  const sortOprions  = setSortOption(req.query.sortOption)
  const hotels = await Hotel.find(query).sort(sortOprions).skip(skip).limit(pageSize)
  const total = await Hotel.countDocuments(query)

  const response = {
    message: 'success',
    data: convertedHotelsWithTimestamp(hotels),
    pagination: {
      total,
      page: hotels.length > 0 ? page : 0,
      pages: Math.ceil(total / pageSize)
    }
  } as const

  res.status(StatusCodes.OK).json(response)
}

const getOneHotel = async (req: Request, res: Response<IMyHotelDetailsRes>): Promise<void> => {
  const { hotelId } = req.params

  const hotel = await Hotel.findOne({ _id: hotelId })

  if(!hotel) {
    throw new NotFound('Hotel not found')
  }

  res.status(StatusCodes.OK).json({ message: 'success', data: convertOneHotelWithTimestamp(hotel.toObject()) })
}

export {
  searchHotel,
  getOneHotel
}