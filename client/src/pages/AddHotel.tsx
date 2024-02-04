import { HotelForm } from '@/components/logic';
import { useMutation } from '@tanstack/react-query';
import { addHotel } from '@/api';
import { useAppContext } from '@/context/AppContext.tsx';

export const AddHotel = () => {
  const { showToast } = useAppContext()
  const { mutate, isPending } = useMutation({
    mutationFn: addHotel,
    onSuccess: () => {
      showToast({ message: 'Hotel saved!', type: 'success' })
    },
    onError: (error: Error) => {
      showToast({ message: `Error saving hotel: ${error.message}`, type: 'success' })
    }
  })

  const onSave = (data: FormData) => {
    mutate(data)
  }
  return (
    <HotelForm onSave={onSave} isLoading={isPending}/>
  )
}