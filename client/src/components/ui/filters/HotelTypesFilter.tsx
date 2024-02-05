import { CheckboxInput } from '@/components/ui/CheckboxInput.tsx';
import { ChangeEvent, memo } from 'react';
import { hotelTypes } from '@/consts';

interface IHotelTypesFilterProps {
  selectedHotelTypes: string[]
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export const HotelTypesFilter = memo(({ selectedHotelTypes, onChange }: IHotelTypesFilterProps) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
      {hotelTypes.map((hotelType) => (
        <CheckboxInput
          checked={selectedHotelTypes.includes(hotelType)}
          value={hotelType}
          onChange={onChange}
          label={hotelType}
        />
      ))}
    </div>
  )
})

HotelTypesFilter.displayName = 'HotelTypesFilter'