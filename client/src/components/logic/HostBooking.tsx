import { useQuery } from '@tanstack/react-query'
import { fetchMyBookings } from '@/api'
import { BookingElements } from '@/components/ui';

export const HostBooking = () => {
  const { data } = useQuery({
    queryKey: ['fetchHostBookings'],
    queryFn: fetchMyBookings
  })

  if (!data?.data || !data?.data.length) {
    return <p>Bookings not found</p>
  }

  return (
    <>

      <BookingElements lists={data?.data} />
    </>
  )
}