import { ERoutes } from '@/types';
import { BsBuilding, BsMap } from "react-icons/bs"
import { BiHotel, BiMoney, BiStar } from "react-icons/bi"
import { useQuery } from '@tanstack/react-query';
import { fetchMyHotels } from '@/api';
import { useAppContext } from '@/context/AppContext.tsx';
import { LinkButton } from '@/components/ui/buttons';
import { type IconType } from 'react-icons';

export const MyHotels = () => {
  const { showToast } = useAppContext()
  const { data: hotelsData} = useQuery({
    queryKey: ['fetchMyHotels'],
    queryFn: fetchMyHotels,
    throwOnError: (error) => {
      showToast({ message: error.message, type: 'error' })
      return false
    }
  })

  if (!hotelsData) {
    return <span>No Hotels found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <LinkButton to={ERoutes.ADD_HOTEL}>
          Add Hotel
        </LinkButton>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelsData?.data?.map((hotel) => (
          <div
            data-testid="hotel-card"
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
            key={hotel._id}
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <IconWrapper icon={BsMap} content={`${hotel.city}, ${hotel.country}`} />
              <IconWrapper icon={BsBuilding} content={`${hotel.type}`} />
              <IconWrapper icon={BiMoney} content={`£${hotel.pricePerNight} per night`} />
              <IconWrapper icon={BiHotel} content={`£${hotel.adultCount} adults, ${hotel.childCount} children`} />
              <IconWrapper icon={BiStar} content={`£${hotel.starRating} Star Rating`} />
            </div>
            <span className="flex justify-end gap-1.5">
              <LinkButton to={`${ERoutes.EDIT_HOTEL}/${hotel._id}`}>
                Edit Hotel
              </LinkButton>
              <LinkButton to={`${ERoutes.HOTEL_DETAILS}/${hotel._id}`}>
                View Details
              </LinkButton>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface IconWrapperProps {
  icon: IconType
  content: string
}
const IconWrapper = ({ icon, content }: IconWrapperProps) => {
  const Component = icon
  return (
    <p className="border border-slate-300 rounded-sm p-3 flex items-center">
      <Component className="mr-1"/>
      {content}
    </p>
  )
}