import { FormProvider, useForm } from 'react-hook-form';
import { type HotelFormData } from '@/types';
import { DetailsSection } from '@/components/logic/AddHotelForm/DetailsSection.tsx';
import { TypeSection } from '@/components/logic/AddHotelForm/TypeSection.tsx';
import { FacilitiesSection } from '@/components/logic/AddHotelForm/FacilitiesSection.tsx';
import { GuestSection } from '@/components/logic/AddHotelForm/GuestSection.tsx';
import { ImgSection } from '@/components/logic/AddHotelForm/ImgSection.tsx';

interface IAddHotelForm {
  onSave: (data: FormData) => void
  isLoading: boolean
}
export const AddHotelForm = ({ onSave, isLoading }: IAddHotelForm) => {
  const formMethods = useForm<HotelFormData>()
  const { handleSubmit } = formMethods

  const onSubmit = handleSubmit((data: HotelFormData) => {
    const {
      name,
      city,
      country,
      description,
      type,
      pricePerNight,
      starRating,
      facilities,
      imageFiles,
      adultCount,
      childCount } = data
    const formData = new FormData()

    formData.append('name', name)
    formData.append('city', city)
    formData.append('country', country)
    formData.append('description', description)
    formData.append('type', type)
    formData.append('pricePerNight', pricePerNight.toString())
    formData.append('starRating', starRating.toString())
    formData.append('adultCount', adultCount.toString())
    formData.append('childCount', childCount.toString())

    facilities.forEach((facility, index) => {
      formData.append(`facility[${index}]`, facility)
    })

    Array.from(imageFiles).forEach((url, index) => {
      formData.append(`url[${index}]`, url)
    })

    onSave(formData)
  })

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit}>
        <DetailsSection/>
        <TypeSection/>
        <FacilitiesSection/>
        <GuestSection/>
        <ImgSection/>
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  )
}