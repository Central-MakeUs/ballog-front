import { SubscribeStore } from '@/shared/lib/subscribeStore'

type Theme = 'light' | 'dark'
const THEME_KEY = 'theme'

export const getCurrentTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export const themeStore = SubscribeStore.getInstance<Theme>(
  'theme',
  getCurrentTheme,
)

export const getTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem(THEME_KEY) as Theme | null
  if (stored === 'light' || stored === 'dark') return stored
  return 'light'
}

export const setTheme = (theme: Theme) => {
  if (typeof window === 'undefined') return

  const root = document.documentElement

  root.classList.remove('light', 'dark')
  root.classList.add(theme)
  localStorage.setItem(THEME_KEY, theme)
  themeStore.notify()
}

export const toggleTheme = () => {
  setTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark')
}

export const subscribeThemeChange = (onChange: () => void) => {
  return themeStore.subscribe(onChange)
}
