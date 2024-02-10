import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type StyleType = 'normal' | 'danger' | 'white'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: StyleType
}

const style: Record<StyleType, string> = {
  normal: 'bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl ',
  danger: 'bg-red-600 text-white p-2 font-bold text-xl hover:bg-red-500 ',
  white: 'text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 '
}


export const Button = ({ children, type = 'button', variant = 'normal', className, ...rest }: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      {...rest}
      type={type}
      className={twMerge(`${style[variant]} ${className}`)}
    >
      {children}
    </button>
  )
}