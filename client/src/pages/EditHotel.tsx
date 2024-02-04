import { HotelForm } from '@/components/logic';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchMyHotelById, editMyHotel } from '@/api';
export const EditHotel = () => {
  const { hotelId } = useParams()
  const { data } = useQuery({
    queryKey: ['fetchHotelQuery'],
    queryFn: () => fetchMyHotelById(hotelId || ''),
    enabled: true
  })
  const hotel = data?.data
  const { mutate, isPending } = useMutation({
    mutationFn: editMyHotel
  })

  const onSave = (data: FormData) => {
    mutate(data)
  }

  return (
    <HotelForm onSave={onSave} isLoading={isPending} hotel={hotel} />
  )
}