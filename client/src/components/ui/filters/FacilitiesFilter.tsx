import { hotelFacilities } from '@/consts';
import { ChangeEvent, memo } from 'react';
import { CheckboxInput } from '@/components/ui/CheckboxInput.tsx';

interface IFacilitiesFilterProps {
  selectedFacilities: string[]
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export const FacilitiesFilter = memo(({ selectedFacilities, onChange }: IFacilitiesFilterProps) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Facilities</h4>
      {hotelFacilities.map((facility) => (
        <CheckboxInput
          checked={selectedFacilities.includes(facility)}
          value={facility}
          onChange={onChange}
          label={facility}
          key={facility}
        />
      ))}
    </div>
  )
})

FacilitiesFilter.displayName = 'FacilitiesFilter'