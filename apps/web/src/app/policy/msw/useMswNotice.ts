import { useEffect } from 'react'

import { useModal } from '@/shared/hooks/modal/useModal'

/**
 * MSW 목업 서버 사용 안내 모달
 * DEV 환경에서 앱 진입 시 표시
 */
export const useMswNotice = () => {
  const { openVerticalModal } = useModal()

  useEffect(() => {
    if (!import.meta.env.DEV) return

    const timer = setTimeout(() => {
      openVerticalModal({
        heading: '목업 서버 안내',
        body: '현재 목업 서버로 연결되어 있습니다.\n실제 데이터가 아닌 목업 데이터가 표시됩니다.',
        dissmissible: true,
        buttons: [
          {
            label: '확인',
            onClick: () => {},
          },
        ],
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])
}
