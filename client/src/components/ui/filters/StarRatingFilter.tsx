import { CheckboxInput } from '@/components/ui/CheckboxInput.tsx';
import { ChangeEvent, memo } from 'react';

interface IStarRatingFilterProps {
  selectedStars: string[]
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const starsOptions = ["5", "4", "3", "2", "1"]
export const StarRatingFilter = memo(({ selectedStars, onChange } : IStarRatingFilterProps) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Property Rating</h4>
      {starsOptions.map((star) => (
        <CheckboxInput
          label={`${star} Stars`}
          checked={selectedStars.includes(star)}
          onChange={onChange}
          value={star}
        />
      ))}
    </div>
  )
})

StarRatingFilter.displayName = 'StarRatingFilter'