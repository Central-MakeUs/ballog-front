type Theme = 'light' | 'dark'
const THEME_KEY = 'theme'

export const getTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem(THEME_KEY) as Theme | null
  if (stored === 'light' || stored === 'dark') return stored
  return 'light'
}

export const setTheme = (theme: Theme) => {
  const root = document.documentElement

  root.classList.remove('light', 'dark')
  root.classList.add(theme)
  localStorage.setItem(THEME_KEY, theme)
}

export const toggleTheme = () => {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark')
}
