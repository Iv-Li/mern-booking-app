import { useSearchContext } from '@/context';
import { ChangeEvent, useCallback, useState } from 'react';
import { FacilitiesFilter, HotelTypesFilter, PriceFilter, StarRatingFilter } from '@/components/ui/filters';
import { useQuery } from '@tanstack/react-query';
import { searchHotels } from '@/api';
import { Pagination, SearchResultCard } from '@/components/ui';

export const Search = () => {
  const search = useSearchContext()
  const [selectedSortOption, setSelectedSortOption] = useState<string>('')
  const [starRating, setStarRating] = useState<string[]>([])
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([])
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>()
  const [activePage, setActivePage] = useState<number>(1)

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    stars: starRating,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption: selectedSortOption,
    page: activePage.toString()
  }

  const { data } = useQuery({
    queryKey: ['searchHotels', searchParams],
    queryFn: async () => {
      return await searchHotels(searchParams)
    }
  })

  const hotels = data?.data

  const onStarRatingChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const star = e.target.value
    const isChecked = e.target.checked

    setStarRating(prevState => {
      return isChecked
        ? [...prevState, star]
        : prevState.filter(i => star !== i)
    })
  }, [setStarRating])

  const onHotelTypesChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const hotelTypes = e.target.value
    const isChecked = e.target.checked

    setSelectedHotelTypes(prevState => {
      return isChecked
        ? [...prevState, hotelTypes]
        : prevState.filter(i => hotelTypes !== i)
    })
  }, [setSelectedHotelTypes])

  const onFacilitiesChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const facilities = e.target.value
    const isChecked = e.target.checked

    setSelectedFacilities(prevState => {
      return isChecked
        ? [...prevState, facilities]
        : prevState.filter(i => facilities !== i)
    })
  }, [setSelectedFacilities])

  const onPriceChange = useCallback((price?: number) => {
    setSelectedPrice(price)
  }, [setSelectedPrice])
  console.log({ pagination: data?.pagination})
  console.log(data?.pagination?.pages)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter selectedStars={starRating} onChange={onStarRatingChange}/>
          <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={onHotelTypesChange}/>
          <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={onFacilitiesChange}/>
          <PriceFilter selectedPrice={selectedPrice} onChange={onPriceChange} />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotels?.length} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <select
            value={selectedSortOption}
            onChange={(event) => setSelectedSortOption(event.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (high to low)
            </option>
          </select>
        </div>
        {hotels?.map(hotel => (
          <SearchResultCard hotel={hotel} key={hotel._id}/>
        ))}
        <div>
          {(
            <Pagination
              currentPage={activePage}
              totalPagesAmount={data?.pagination.pages || 0}
              onPageChange={setActivePage}
            />
          )}
        </div>
      </div>
    </div>
  )
}