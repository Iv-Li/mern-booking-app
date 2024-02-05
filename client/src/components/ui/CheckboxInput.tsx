import { ChangeEvent, type InputHTMLAttributes } from 'react';

interface ICheckboxInputProps {
  wrapperClassName?: string
  checked: boolean
  value: InputHTMLAttributes<HTMLInputElement>['value']
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  label: string
}
export const CheckboxInput = ({ wrapperClassName, checked, value, onChange, label }: ICheckboxInputProps) => {
  const styles = wrapperClassName ? wrapperClassName : ''

  return (
    <label className={`flex items-center space-x-2 ${styles}`}>
      <input
        type="checkbox"
        className="rounded"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  )
}