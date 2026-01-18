import { useEffect, useSyncExternalStore } from 'react'

import { useModal } from '@/shared/hooks/modal/useModal'
import { mswEnabledStore } from '@/mocks/browser'

/**
 * MSW 목업 서버 사용 안내 모달
 * MSW 목업 서버 사용 시 표시
 */
export const useMswNotice = () => {
  const { openVerticalModal } = useModal()
  const isMswEnabled = useSyncExternalStore(
    mswEnabledStore.subscribe,
    mswEnabledStore.getSnapshot,
  )

  useEffect(() => {
    if (!isMswEnabled) return

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
  }, [isMswEnabled])
}
