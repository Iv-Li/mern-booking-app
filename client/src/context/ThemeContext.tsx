import { type PropsWithChildren, createContext, useState, useContext, useEffect, useCallback } from 'react';

export type Theme = 'dark' | 'light'

interface IThemeContext {
  theme: Theme
  updateTheme: (newTheme: Theme) => void
  bgMain: string | null,
  setBgMain: (img: string | null) => void
}

const getSelectedTheme = (): Theme => {
  let selectedTheme = localStorage.getItem('theme') as Theme | null
  if(!selectedTheme && window.matchMedia('(prefers-color-scheme: dark)')) {
    selectedTheme = 'dark'
  } else {
    selectedTheme = 'light'
  }

  document.body.className = selectedTheme
  return selectedTheme
}

const ThemeContext = createContext<IThemeContext | null>(null)
const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>('light')
  const [bgImg, setBgImg] = useState<string | null>(null)

  const updateTheme = useCallback((newTheme: Theme) => {
    localStorage.setItem('theme', newTheme)
    document.body.className = newTheme
    setTheme(newTheme)
  }, [])

  useEffect(() => {
    getSelectedTheme()
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, bgMain: bgImg, setBgMain: setBgImg }}>
      {children}
    </ThemeContext.Provider>
  )
}

const useThemeContext = () => {
  const context = useContext(ThemeContext)
  return context as IThemeContext
}

export {
  ThemeContextProvider,
  // eslint-disable-next-line react-refresh/only-export-components
  useThemeContext
}