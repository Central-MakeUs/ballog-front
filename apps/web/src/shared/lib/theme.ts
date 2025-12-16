type Theme = 'light' | 'dark'
const THEME_KEY = 'theme'

const TRANSITION_MS = 250

export const getTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem(THEME_KEY) as Theme | null
  if (stored === 'light' || stored === 'dark') return stored
  return 'light'
}

export const setTheme = (theme: Theme) => {
  const root = document.documentElement

  // 접근성: 모션 최소화 설정이면 전환 생략
  const reduceMotion = window.matchMedia?.(
    '(prefers-reduced-motion: reduce)',
  )?.matches
  if (!reduceMotion) {
    root.setAttribute('data-theme-transition', '')
    // transition이 확실히 적용되도록 한 프레임 밀어줌
    // (레이아웃 강제: 아래 둘 중 하나만 써도 됨)
    void root.offsetHeight
  }

  root.classList.remove('light', 'dark')
  root.classList.add(theme)
  localStorage.setItem(THEME_KEY, theme)

  if (!reduceMotion) {
    window.setTimeout(() => {
      root.removeAttribute('data-theme-transition')
    }, TRANSITION_MS)
  }
}

export const toggleTheme = () => {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'
  setTheme(next)
}
