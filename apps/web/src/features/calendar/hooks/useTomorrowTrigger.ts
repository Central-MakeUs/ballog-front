import { toZonedTime } from 'date-fns-tz'
import { useEffect } from 'react'

import { TIME_ZONE } from '@/shared/constants/time'

interface UseTomorrowTriggerProps {
  onTomorrow: (date: Date) => void
}

/**
 * @hook useTomorrowTrigger
 * 
 * 한국 시간(`Asia/Seoul`) 기준으로 **자정(00:00)** 이 될 때마다 콜백을 실행하는 훅입니다.
 * 
 * ### 주요 동작 원리
 * 1. 현재 한국 시각(`TIME_ZONE`)을 계산합니다.
 * 2. 다음 자정 시각(00:00:00)을 구하고, 그 시각까지 남은 시간을 밀리초 단위로 계산합니다.
 * 3. `setTimeout`을 사용해 자정이 되었을 때 `onTomorrow` 콜백을 실행합니다.
 * 4. 콜백 실행 후, 다시 다음날 자정을 스케줄링하여 주기적으로 반복됩니다.
 * 
 * ### 사용 예시
 * ```tsx
 * useTomorrowTrigger({
 *   onTomorrow: (newDate) => {
 *     setSelectedDate(newDate)
 *     console.log('자정이 되어 날짜가 변경되었습니다:', newDate)
 *   },
 * })
 * ```
 * 
 * ### 주의사항
 * - 이 훅은 **앱이 실행된 상태에서 자정을 지날 때**만 작동합니다.
 *   (앱을 새로고침하거나 재실행하면 새로 스케줄됩니다.)
 * - React Native WebView 기반 앱처럼 **앱 재시작 시마다 새로 로드되는 환경**에서는
 *   자정 자동 갱신이 실질적으로 필요하지 않을 수 있습니다.
 */
export const useTomorrowTrigger = ({ onTomorrow }: UseTomorrowTriggerProps) => {
  useEffect(() => {
    const getNow = () => toZonedTime(new Date(), TIME_ZONE)

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
