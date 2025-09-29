import { toZonedTime } from 'date-fns-tz'
import { useEffect } from 'react'

interface UseTomorrowTriggerProps {
  onTomorrow: (date: Date) => void
}

// 자정 이벤트 감지 훅
export const useTomorrowTrigger = ({ onTomorrow }: UseTomorrowTriggerProps) => {
  useEffect(() => {
    const getNow = () => toZonedTime(new Date(), 'Asia/Seoul')

    const scheduleTomorrow = () => {
      const now = getNow()

      const Tomorrow = new Date(now)
      Tomorrow.setDate(now.getDate() + 1)
      Tomorrow.setHours(0, 0, 0, 0)

      const leftTimeUntilTomorrow = Tomorrow.getTime() - now.getTime()

      return setTimeout(() => {
        onTomorrow(getNow())
        scheduleTomorrow()
      }, leftTimeUntilTomorrow)
    }

    const timeoutId = scheduleTomorrow()
    return () => clearTimeout(timeoutId)
  }, [onTomorrow])
}
