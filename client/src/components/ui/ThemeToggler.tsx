import { Theme, useThemeContext } from '@/context';
import { memo, ReactNode } from 'react';
import { IoMoonSharp } from 'react-icons/io5';
import { MdOutlineWbSunny } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

const toggles: Record<Theme, ReactNode> = {
  light: <IoMoonSharp />,
  dark: <MdOutlineWbSunny />,
}

interface IThemeTogglerProps {
  className?:  string
}
export const ThemeToggler = memo(({ className }: IThemeTogglerProps) => {
  const { theme, updateTheme } = useThemeContext()

  const isLight = theme === 'light'
  const onToggle = () => {
    updateTheme(isLight ? 'dark' : 'light')
  }


  return (
    <button onClick={onToggle} className={twMerge(`p-4 rounded neomorthin text-white ${className}`)}>
      {toggles[theme]}
    </button>
  )
})

ThemeToggler.displayName = 'ThemeToggler'

