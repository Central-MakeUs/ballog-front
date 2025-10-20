import { useEffect } from 'react'

import { useModal } from '@/shared/hooks/modal/useModal'

const NoticeModal = () => {
  const { openTextModal } = useModal()

  useEffect(() => {
    openTextModal({
      heading: '서비스 점검 안내',
      body: `앱 점검으로 인해 현재 이용이 제한됩니다 \n 업데이트 소식은 인스타그램 @ballog.kr에서 \n 확인하실 수 있습니다.`,
    })
  }, [])

  return null
}

export { NoticeModal }
