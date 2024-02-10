import { BookingForm } from '@/components/logic/BookingForm/BookingForm.tsx'
import { useAppContext, useSearchContext } from '@/context'
import { BookingDetailSummary } from '@/components/ui'
import { useQuery } from '@tanstack/react-query';
import { fetchHotelById } from '@/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


export const Booking = () => {
  const { showToast, user } = useAppContext()
  const { hotelId} = useParams()
  const search = useSearchContext()
  const [numberOfNights, setNumberOfNights] = useState<number>(0)

  const onError = (err: Error) => {
    requestAnimationFrame(() => {
      showToast({ message: err.message, type: 'error' })
    })

    return false
  }

  const { data: hotelData } = useQuery({
    queryKey: ['fetchHotelById'],
    queryFn: () => fetchHotelById(hotelId as string),
    enabled: !!hotelId,
    throwOnError: onError
  })

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const day = 1000 * 60 * 60 * 24
      const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / day

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  if (!hotelData?.data) {
    return <p>Hotel not found</p>
  }

  if (!user) {
    return <p>Please, sign in at first</p>
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotelData?.data}
      />
      <BookingForm
        currentUser={user}
      />
    </div>
  )
}