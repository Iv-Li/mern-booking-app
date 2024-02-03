import { AiFillStar } from "react-icons/ai"
import { fetchMyHotelById } from '@/api';
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom';
import { IHotelRes } from 'server/shared/types';
import { GuestFormInfo } from '@/components/logic';

export const HotelDetails = () => {
  const { hotelId } = useParams()
  const { data } = useQuery({
    queryKey: ['fetchMyHotelById'],
    queryFn: () => fetchMyHotelById(hotelId || ''),
    enabled: !!hotelId
  })

  const hotel: IHotelRes | undefined = data?.data

  if(!hotel) {
    return <div>Hotel not found</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotel.starRating }).map((_v, index) => (
            <AiFillStar className="fill-yellow-400" key={index}/>
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotel.imageUrls.map((image: string) => (
          <div className="h-[300px]" key={image}>
            <img
              src={image}
              alt={hotel.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {(hotel.facilities).map((facility: string, index: string) => (
          <div className="border border-slate-300 rounded-sm p-3" key={index}>
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit">
          <GuestFormInfo pricePerNight={hotel.pricePerNight} />
        </div>
      </div>
    </div>
  )
}