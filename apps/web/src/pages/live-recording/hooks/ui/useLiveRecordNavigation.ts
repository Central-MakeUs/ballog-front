import { useCallback } from 'react'
import { useFlow } from '@stackflow/react/future'
import { toast } from 'sonner'

import { useFlow as useAppFlow } from '@/app/routes/stackflow'

/**
 * 라이브 기록 페이지의 네비게이션 및 에러 핸들링 hook
 *
 * @returns 네비게이션 함수들
 */
export const useLiveRecordNavigation = () => {
  const { pop } = useFlow()
  const { replace } = useAppFlow()

  const goBack = useCallback(() => {
    pop()
  }, [pop])

  const goHome = useCallback(() => {
    replace('Home', {}, { animate: false })
  }, [replace])

  const handleError = useCallback(
    (message = '알 수 없는 오류 발생') => {
      toast.info(message)
      goHome()
    },
    [goHome],
  )

  return {
    goBack,
    goHome,
    handleError,
  }
}
