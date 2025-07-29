import { useEffect } from 'react'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { POST_MESSAGE_EVENT, createWebBridge } from '@ballog/bridge'
import { toast } from 'sonner'

import { cn } from '@/shared/lib/classnames'
import { GlobalNavigationBar } from '@/widgets/navigation'
import { useModal } from '@/shared/hooks/modal/useModal'
import { OverlayProvider } from '@/hooks/useOverlay'
import { List } from '@/shared/ui/common/List/List'
import { ChangeMyInfoWidget } from '@/widgets/changeMyInfoWidget/ChangeMyInfoWidget'
import { useFlow } from '@/shared/lib/stackflow'

const MyPageInner = () => {
  const { openHorizontalModal } = useModal()
  const { replace } = useFlow()
  const bridge = createWebBridge()

  useEffect(() => {
    bridge.addEventListener(POST_MESSAGE_EVENT.LOGOUT_RESPONSE, (payload) => {
      if (payload.status === 'success') {
        replace('Login', {})
      } else {
        toast.error('로그아웃에 실패했습니다.')
      }
    })
  }, [])

  const HandleClickLogout = () => {
    openHorizontalModal({
      heading: '로그아웃 하시겠어요?',
      body: 'Body text',
      buttons: [
        { label: '취소', onClick: close },
        {
          label: '로그아웃',
          onClick: () => {
            bridge.send(POST_MESSAGE_EVENT.LOGOUT, {
              message: '로그아웃 요청',
            })
            localStorage.removeItem('accessToken')
            close()
            // 로그아웃 로직 작성
          },
        },
      ],
    })
  }

  const HandleClickQuit = () => {
    openHorizontalModal({
      heading: '정말 탈퇴하시겠어요?',
      body: '탈퇴 시 서비스 내 모든 정보가 \n 삭제되어 복구할 수 없습니다.',
      buttons: [
        { label: '취소', onClick: close },
        {
          label: '탈퇴',
          onClick: () => {
            close()
            // 탈퇴 로직 작성
          },
        },
      ],
    })
  }

  return (
    <AppScreen
      appBar={{
        title: <span className="flex text-usage-text-default">마이페이지</span>,
        height: '48px',
      }}
    >
      <div className={cn('flex flex-col w-full px-4 py-4 pb-27.5')}>
        <div>
          <p className="body-sm-bold text-brand-neutral-white">내 정보</p>
          <ChangeMyInfoWidget />
        </div>

        <div className="space-y-4 mb-6">
          <p className="body-sm-bold text-brand-neutral-white">알람 설정</p>
          <List type="switch">경기 시작 알림 받기</List>
          <List type="switch">경기 중 알림 받기</List>
        </div>

        <div className="space-y-4 mb-6">
          <p className="body-sm-bold text-brand-neutral-white">기타 등등</p>
          <List type="arrow">볼로그 인스타그램</List>
          <List type="arrow">문의하기</List>
          <List type="arrow">개인정보 처리방침</List>
          <List type="arrow">서비스 이용약관</List>
        </div>

        <div className="flex items-center gap-4 px-4 mt-4 mb-4">
          <button
            className="flex-1 text-center text-usage-text-hover body-sm-medium"
            onClick={HandleClickLogout}
          >
            로그아웃
          </button>
          <p className="body-sm-light text-usage-text-subtle">|</p>
          <button
            className="flex-1 text-center text-usage-text-hover body-sm-medium"
            onClick={HandleClickQuit}
          >
            탈퇴하기
          </button>
        </div>
        <GlobalNavigationBar />
      </div>
    </AppScreen>
  )
}

const MyPage = () => {
  return (
    <OverlayProvider>
      <MyPageInner />
    </OverlayProvider>
  )
}

export default MyPage
