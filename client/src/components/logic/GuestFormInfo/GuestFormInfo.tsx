import { useForm, type SubmitHandler } from 'react-hook-form';
import type { GuestInfoFormData } from '@/types';
import DatePicker from 'react-datepicker'
import { useMemo } from 'react';
import { useAppContext, useSearchContext } from '@/context';
import { useNavigate } from 'react-router-dom';
import { setRoutes, ERoutes } from '@/types/routes.ts';
import { Button } from '@/components/ui/buttons';


interface IGuestFormInfo {
  hotelId: string,
  pricePerNight: number
}
export const GuestFormInfo = ({ hotelId, pricePerNight }: IGuestFormInfo) => {
  const { user: isLoggedIn } = useAppContext()
  const search = useSearchContext()
  const navigate = useNavigate()

  const {
    register,
    watch,
    setValue,
    formState: { errors },
    handleSubmit
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount
    }
  })

  const checkIn = watch('checkIn')
  const checkOut = watch('checkOut')

  const { minDate, maxDate} = useMemo(() => {
    const minDate = new Date()
    const maxDate = new Date()
    maxDate.setFullYear(minDate.getFullYear() + 1)

    return { minDate, maxDate }
  }, [])

  const onSignInClick = (data: GuestInfoFormData) => {
    data && search.onSearch({
      destination: '',
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      adultCount: data.adultCount,
      childCount: data.childCount,
    })
    navigate(ERoutes.LOGIN);
  }

  const onSubmit: SubmitHandler<GuestInfoFormData> = (data) => {
    search.onSearch({
      destination: '',
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      adultCount: data.adultCount,
      childCount: data.childCount,
    })

    navigate(setRoutes.BOOKING(hotelId))
  }

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">£{pricePerNight}</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="flex bg-white px-2 py-1 gap-2">
            <label className="items-center flex">
              Adults:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="items-center flex">
              Children:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? <Button>Book Now</Button> : <Button>Sign in to Book</Button>}
        </div>
      </form>
    </div>
  )
}