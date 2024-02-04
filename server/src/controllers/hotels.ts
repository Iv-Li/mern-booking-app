import type { Request, Response } from 'express';
import { Hotel } from '@/models';
import { constructedSearchQuery, convertedHotelsWithTimestamp } from '@/utils';
import { StatusCodes } from 'http-status-codes';
import type { SearchQueryMap, IHotelSearchRes } from '@/shared/types';
import { setSortOption } from '@/utils/constructedQuery';

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

export {
  searchHotel
}