import { FormProvider, useForm } from 'react-hook-form';
import { type HotelFormData } from '@/types';
import { DetailsSection } from '@/components/logic/HotelForm/DetailsSection.tsx';
import { TypeSection } from '@/components/logic/HotelForm/TypeSection.tsx';
import { FacilitiesSection } from '@/components/logic/HotelForm/FacilitiesSection.tsx';
import { GuestSection } from '@/components/logic/HotelForm/GuestSection.tsx';
import { ImgSection } from '@/components/logic/HotelForm/ImgSection.tsx';
import { IHotelRes } from 'server/shared/types';
import { useEffect } from 'react';
import { Button } from '@/components/ui/buttons';

interface IAddHotelForm {
  hotel: IHotelRes | undefined
  onSave: (data: FormData) => void
  isLoading: boolean
}
export const HotelForm = ({ onSave, isLoading, hotel }: IAddHotelForm) => {
  const formMethods = useForm<HotelFormData>()
  const { handleSubmit, reset, formState: { isValid  } } = formMethods

  useEffect(() => {
    if (!hotel) return
    const {
      name, city, country, description, type, pricePerNight, starRating, facilities, imageUrls, adultCount, childCount
    } = hotel
    reset({
      name,
      city,
      country,
      description,
      type,
      pricePerNight,
      starRating,
      facilities,
      imageUrls,
      adultCount,
      childCount,
    })
  }, [hotel, reset])

  const onSubmit = handleSubmit((data: HotelFormData, e) => {
    const {
      name,
      city,
      country,
      description,
      type,
      pricePerNight,
      starRating,
      facilities,
      imageUrls,
      imageFiles,
      adultCount,
      childCount } = data
    e?.preventDefault()

    if(!isValid) return
    const formData = new FormData()

    if(hotel) {
      formData.append('hotelId', hotel._id)
    }

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
      formData.append(`imageFiles[${index}]`, url)
    })

    imageUrls.forEach((url, index) => {
      formData.append(`imageUrls[${index}]`, url)
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
          <Button
            disabled={isLoading}
            type="submit"
            className="disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </span>
      </form>
    </FormProvider>
  )
}