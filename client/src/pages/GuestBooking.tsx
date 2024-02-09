import { useQuery } from '@tanstack/react-query'
import { fetchGuestBookings } from '@/api'
import { IAllMyBookingRes } from 'server/shared/types'
import { BookingElements } from '@/components/ui'

export const GuestBooking = () => {
  const { data } = useQuery<IAllMyBookingRes>({
    queryKey: ['fetchGuestBookings'],
    queryFn: fetchGuestBookings
  })

  if (!data?.data || !data?.data.length) {
    return <p>Bookings not found</p>
  }

  return (
    <BookingElements lists={data?.data} title="My Bookings"/>
  )
}