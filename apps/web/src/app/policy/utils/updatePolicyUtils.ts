const DISMISS_KEY = 'UPDATE_MODAL_DISMISSED'
const MAX_DISMISS_COUNT = 30
const RE_SHOW_DELAY = 1000 * 60 * 60 * 48

interface DismissData {
  count: number
  lastDismissedAt: number
}

// 업데이트 모달을 띄워야 하는지 판단하는 유틸
export const shouldShowUpdateModal = (): boolean => {
  const stored = localStorage.getItem(DISMISS_KEY)
  if (!stored) return true

  const { count, lastDismissedAt } = JSON.parse(stored) as DismissData

  if (count >= MAX_DISMISS_COUNT) return false

  const now = Date.now()
  if (now - lastDismissedAt < RE_SHOW_DELAY) return false

  return true
}

// 업데이트 모달 몇 회 띄웠는지 카운팅하는 유틸
export const countUpdateModalDismissed = () => {
  const stored = localStorage.getItem(DISMISS_KEY)
  const parsed = stored
    ? (JSON.parse(stored) as DismissData)
    : { count: 0, lastDismissedAt: 0 }

  localStorage.setItem(
    DISMISS_KEY,
    JSON.stringify({
      count: parsed.count + 1,
      lastDismissedAt: Date.now(),
    }),
  )
}
