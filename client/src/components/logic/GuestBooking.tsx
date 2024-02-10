import { useQuery } from '@tanstack/react-query'
import { fetchGuestBookings } from '@/api'
import { BookingElements } from '@/components/ui'

export const GuestBooking = () => {
  const { data } = useQuery({
    queryKey: ['fetchGuestBookings'],
    queryFn: fetchGuestBookings
  })

  if (!data?.data || !data?.data.length) {
    return <p>Bookings not found</p>
  }

  return (
    <BookingElements lists={data?.data} />
  )
}