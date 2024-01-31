import type { IHotel, SearchQueryMap, SortingOptions } from '@/shared/types/types';
import type { FilterQuery, SortOrder } from 'mongoose';

type ConstructedQueryType = FilterQuery<IHotel>
export const constructedSearchQuery = (query: SearchQueryMap): ConstructedQueryType => {
  const constructedQuery: ConstructedQueryType = {}

  if(query.destination) {
    constructedQuery.$or = [
      {city: new RegExp(query.destination, 'i')},
      {country: new RegExp(query.destination, 'i')}
    ]
  }

  if(query.adultCount) {
    const parsedAdultCount = parseInt(query.adultCount)
    if (!isNaN(parsedAdultCount)) {
      constructedQuery.adultCount = {
        $gte: parsedAdultCount
      }
    }
  }

  if(query.childCount) {
    const parsedChildCount = parseInt(query.childCount)
    if (!isNaN(parsedChildCount)) {
      constructedQuery.childCount = {
        $gte: parsedChildCount
      }
    }
  }

  if(query.facilities) {
    /* TODO: determine facilities list */
    constructedQuery.facilities = {
      $all: query.facilities?.split(',')
    }
  }

  if(query.types) {
    /* TODO: determine types list */
    constructedQuery.type = {
      $in: query.types?.split(',')
    }
  }

  if(query.stars) {
    const starsList = query.stars
      .split(',')
      .map(star => parseInt(star))
      .filter(star => !isNaN(star))

    constructedQuery.starRating = {
      $in: starsList
    }
  }

  if(query.maxPrice) {
    const parsedMaxPrice = parseInt(query.maxPrice)
    if(!isNaN(parsedMaxPrice)) {
      constructedQuery.maxPrice = {
        $lte: parsedMaxPrice
      }
    }
  }

  return constructedQuery
}


type SortOrderType = Partial<Record<'starRating' | 'pricePerNight', SortOrder>>
export const setSortOption = (sortOptions: SortingOptions | null | undefined): SortOrderType => {
  let sorting: SortOrderType = {}

  if(!sortOptions) return sorting

  switch (sortOptions) {
    case 'starRating':
      sorting = { starRating: -1 }
      break;
    case 'pricePerNightAsc':
      sorting = { pricePerNight: 1 }
      break;
    case 'pricePerNightDesc':
      sorting = { pricePerNight: -1 }
      break;
  }

  return sorting
}

