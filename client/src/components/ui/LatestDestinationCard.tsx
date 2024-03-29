import { Link } from 'react-router-dom';
import type { IHotelRes } from 'server/shared/types';
import { ERoutes } from '@/types';

interface ILatestDestinationCardProps {
  hotel: IHotelRes
}

export const LatestDestinationCard = ({ hotel }: ILatestDestinationCardProps) => {
  return (
    <Link
      to={`${ERoutes.HOTEL_DETAILS}/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
        <span className="text-white font-bold tracking-tight text-3xl">
          {hotel.name}
        </span>
      </div>
    </Link>
  )
}