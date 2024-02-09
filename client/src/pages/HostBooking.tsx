import { useQuery } from '@tanstack/react-query'
import { fetchMyBookings } from '@/api'
import { IAllMyBookingRes } from 'server/shared/types'
import { BookingElements } from '@/components/ui';

export const HostBooking = () => {
  const { data } = useQuery<IAllMyBookingRes>({
    queryKey: ['fetchMyBookings'],
    queryFn: fetchMyBookings
  })

  if (!data?.data || !data?.data.length) {
    return <p>Bookings not found</p>
  }

  return (
    <BookingElements lists={data?.data} title="My Hotels` Bookings" />
  )
}