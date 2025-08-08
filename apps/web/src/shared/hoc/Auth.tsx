import { type ComponentType, useEffect } from 'react'

import { useFlow } from '@/shared/lib/stackflow'
import { useOverlay } from '@/shared/hooks/useOverlay'

import { OverlayModal } from '../ui/common/OverlayModal'
import { useStack } from '../hooks/stackflow/useStack'

/**
 * 인증이 필요한 컴포넌트를 감싸는 HOC
 * localStorage에 accessToken이 없으면 Login 페이지로 이동
 */
export const withAuth = <P extends object>(Component: ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const { replace } = useFlow()
    const overlay = useOverlay()
    const { popAll } = useStack()

    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken')

      if (!accessToken) {
        overlay.open(({ isOpen, close }) => (
          <OverlayModal.Root open={isOpen} onOpenChange={close}>
            <OverlayModal.Text heading="로그인이 필요합니다." />
            <OverlayModal.Buttons
              layout="horizontal"
              buttons={[
                {
                  label: '확인',
                  onClick: () => {
                    overlay.close()
                    popAll()
                    replace('Login', {})
                  },
                },
              ]}
            />
          </OverlayModal.Root>
        ))
      }
    }, [replace])

    // accessToken이 있는지 확인
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      // 토큰이 없으면 아무것도 렌더링하지 않음 (useEffect에서 이동 처리)
      return null
    }

    return <Component {...props} />
  }

  return AuthenticatedComponent
}

export default withAuth
